# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2013, GEM Foundation.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public
# License along with this program. If not, see
# <https://www.gnu.org/licenses/agpl.html>.

# FIXME. This module contains both the django model definition and the
# workflow logic (e.g. process_layers, create_geoserver_layers, etc.).
# We should move them to a separate file


import json
import uuid
import collections
import os
import logging

from django.conf import settings
from django.contrib.gis.db import models
from django.contrib.auth import models as auth_models
from django.db import connection

from geonode.geoserver.helpers import gs_slurp
from geonode.maps import models as maps
from geonode.maps.signals import map_changed_signal
from geonode.layers.models import set_attributes
from geonode.layers.utils import layer_set_permissions
from geonode.utils import http_client, ogc_server_settings

from openquakeplatform.icebox import fields
from openquakeplatform import geoserver_api as geoserver

logger = logging.getLogger(__name__)

DS_NAME='icebox'

class Calculation(models.Model):
    calculation_type = models.TextField(choices=(('hazard', 'hazard'),
                                                 ('risk', 'risk')))
    status = models.TextField(default="queued")
    einfo = models.TextField(null=True)
    engine_id = models.TextField(null=True)
    description = models.TextField(null=True)
    map = models.ForeignKey(maps.Map, null=True)
    user = models.ForeignKey(auth_models.User)

    class Meta:
        ordering = ('-pk',)

    def process_layers(self):
        """
        Create geoserver and geonode layers (for each calculation
        output) and a geonode map holding all the outputs
        """
        layers = []

        # we create a database View per each output, then we publish the
        # db view on geoserver as a postgis vector layer. Finally, we
        # let geonode slurp the geoserver layer
        for olayer in self.outputlayer_set.all():
            model = olayer.output_type
            if model:
                layers.append(
                    olayer.create_geonode_layer(
                        olayer.geoserver_publish_view(
                            olayer.create_view())))
        self.create_geonode_map(layers)
        self.status = 'complete'
        self.save()

    def create_geonode_map(self, layers):
        """
        Create a geonode Map holding all the results

        :param list layers:
           the :class:`geonode.maps.Layer` instances representing the results
        """
        map = maps.Map.objects.create(
            owner=self.user,
            title=self.description,
            abstract="",
            zoom=0,
            center_x=0, center_y=0,
            projection="EPSG:900913",
            uuid=str(uuid.uuid1()))

        baselayers = [l for l in settings.MAP_BASELAYERS
                      if l.get("group") == "background"]

        for i, baselayer in enumerate(baselayers):
            name = baselayer.get(
                "name", baselayer.get("args", [baselayer.get("type")])[0])
            map.layer_set.add(
                maps.MapLayer.objects.create(
                    map=map,
                    stack_order=i,
                    name=name,
                    group=baselayer["group"],
                    visibility=name == "osm",
                    layer_params=json.dumps(
                        dict(title=name, selected=name == "osm",
                             type=baselayer.get("type"))),
                    source_params=json.dumps(
                        dict(id=str(i),
                             args=baselayer.get("args", []),
                             ptype=baselayer["source"]["ptype"]))))

        for i, layer in enumerate(layers):
            if layer.outputlayer.output_type in [HazardCurve,
                                                 LossCurve,
                                                 AggregateLossCurve]:
                info_format = "text/html"
            else:
                info_format = "application/vnd.ogc.gml"
            perm_spec = {
                'authenticated': '_none',
                'users': [[self.user, 'layer_readwrite'],
                          [self.user, 'layer_admin']],
                'anonymous': '_none'
                }
            layer_set_permissions(layer, perm_spec)

            map.layer_set.add(
                maps.MapLayer.objects.create(
                    map=map,
                    stack_order=i + len(baselayers),
                    name=layer.typename,
                    format="image/png",
            # The following commented line makes GeoExplorer break
            # group=layer.outputlayer.output_type.__name__,

            # show only the first output layer
                    visibility=(i == 0),
                    transparent=True,
                    ows_url=ogc_server_settings.public_url + "wms",
                    layer_params=json.dumps({"infoFormat": info_format}),
                    local=True))
        map.set_bounds_from_layers(map.local_layers)
        map.set_default_permissions()
        perm_spec = {
            'authenticated': '_none',
            'users': [[self.user, 'map_readwrite'],
                      [self.user, 'map_admin']],
            'anonymous': '_none'
            }
        # GeoNode doesn't provide a 'map_set_permissions' function so the
        # 'layer_set_permissions' function is used instead. It works also
        # with maps (maps and layers are both mapped as ObjectRole by
        # the security app)
        layer_set_permissions(map, perm_spec)
        map.save()
        map_changed_signal.send_robust(sender=map, what_changed='layers')

        self.map = map
        self.save()

    @staticmethod
    def remove_map(sender, instance, using, **_kwargs):
        if instance.map_id:
            instance.map.delete()

    def __unicode__(self):
        return u"Calculation: %s" % self.description


class OutputLayer(models.Model):
    """
    Model a calculation output associated with a geonode Layer
    """
    display_name = models.TextField(help_text="output display name")
    calculation = models.ForeignKey(
        Calculation,
        help_text="the calculation this output belongs to")
    layer = models.OneToOneField(
        maps.Layer, null=True,
        help_text="the geonode layer associated with this calculation output")
    # FIXME. Use an output uuid instead of an database id (as the
    # engine database is a temporary storage)
    engine_id = models.TextField(
        help_text=("the id used in the engine to identify "
                   "this calculation output."))

    def __init__(self, *args, **kwargs):
        super(OutputLayer, self).__init__(*args, **kwargs)

        self._output_type = None

    def create_geonode_layer(self, geoserver_layer):
        """
        Create a :class:`geonode.maps.Layer` instance for this calculation
        result.

        :param str geoserver_layer: the name of the geoserver layer
        """
        gs_slurp(workspace=geoserver.WS_NAME, store=DS_NAME,
                 filter=geoserver_layer)
        layer = maps.Layer.objects.get(name=geoserver_layer)
        self.layer = layer
        self.save()

        self.layer.owner = self.calculation.user
        self.layer.save()

        set_attributes(self.layer)
        self.layer.set_default_permissions()
        return self.layer

    @property
    def output_type(self):
        """
        :returns:
            the django model class associated with the output, e.g.
            :class:`icebox.models.HazardMap`,
            :class:`icebox.models.HazardCurve`, etc.
        """
        if self._output_type:
            return self._output_type

        for related_object in self._meta.get_all_related_objects():
            model = related_object.model
            if not model.objects.filter(output_layer=self).exists():
                continue
            self._output_type = model
            return model

        logger.warning("Layer creation for %s is not supported" % self)

    def __unicode__(self):
        return u"OL %s <%d>" % (self.display_name, self.pk)

    def create_view(self):
        """
        Create a db View for the calculation results

        :returns: the name of the generated database view
        """
        cursor = connection.cursor()
        view_name = "icebox_output_%s_%s" % (
            self.output_type.__name__, self.id)
        view_name = view_name.lower()

        cursor.execute("""
        CREATE OR REPLACE VIEW %s AS
        SELECT %s FROM %s
        WHERE output_layer_id = %d""" % (
            view_name,
            ','.join(self.output_type.sql_attributes()),
            self.output_type._meta.db_table,
            self.id))

        # Commit to actually create the view as Geoserver will look at
        # it in another process
        cursor.connection.commit()
        return view_name

    def geoserver_publish_view(self, view_name):
        """
        Publish a db view named `view_name` on geoserver

        :returns: the name of the published layer
        """
        # During development, it might be handy to uncomment this
        # self.delete_layer(view_name)
        self.update_layer(self.create_featuretype(view_name))

        return view_name

    # FIXME: this function is not called. Geoserver layers survive
    # when a calculation is deleted!
    def delete_layer(self, view_name):
        geoserver.geoserver_rest(
            geoserver.LAYER_URL % view_name, method='DELETE',
            raise_errors=False)
        geoserver.geoserver_rest(
            (geoserver.FEATURETYPE_URL % dict(ws=geoserver.WS_NAME, ds=DS_NAME)) % view_name, method='DELETE',
            raise_errors=False)

    @staticmethod
    def _xml(request_type):
        """
        :param str request_type:
            the kind of geoserver object we are going
            to create (currently either featuretype or layer)
        :returns: the path to the xml posted to geoserver
        """
        return os.path.abspath(
            os.path.join(
                os.path.dirname(
                    os.path.dirname(__file__)),
            "build-gs-tree/tmpl/icebox/%s.xml.tmpl" % request_type))

    def create_featuretype(self, view_name):
        """
        Create a featuretype for the given database view `view_name`

        :returns: the name of the featuretype created
        """
        substitutions = dict(
            view_name=view_name,
            attributes=self.xml_attributes(),
            title=self.display_name,
            class_name=self.output_type.__name__)
        substitutions.update(self.output_type.bbox_for_output(self))
        geoserver.load_features(
            self.output_type.__name__,
            files=[self._xml("featuretype")],
            substitutions=substitutions,
            fe_dict=dict(ws=geoserver.WS_NAME, ds=DS_NAME))
        return view_name

    def update_layer(self, layer_name):
        """
        Update the layer named `layer_name`
        """
        geoserver.geoserver_rest(
            geoserver.LAYER_URL % layer_name,
            self._xml("layer"),
            method='PUT',
            message='Updating %s layer...' % layer_name,
            substitutions=dict(layer_name=layer_name,
                               class_name=self.output_type.__name__))

    def xml_attributes(self):
        """
        :returns:
            an xml string describing the attributes of the
            vector layer. The schema used to build the xml is the
            one compatible with the geoserver rest api
        """
        # FIXME. by default every attribute is declared to be nillable
        return "\n".join(
            ["""<attribute>
                  <name>%s</name>
                  <minOccurs>0</minOccurs> <maxOccurs>1</maxOccurs>
                  <nillable>true</nillable> <binding>%s</binding>
                </attribute>""" % (attr_name, attr_type)
             for attr_name, attr_type in self.output_type.attributes()])


class Output(models.Model):
    """
    Base abstract django model for storing calculation outputs.
    """

    Attribute = collections.namedtuple("Attribute", "name binding")

    output_layer = models.ForeignKey(OutputLayer, null=True)

    objects = models.GeoManager()

    class Meta:
        abstract = True

    @classmethod
    def sql_attributes(cls):
        """
        :returns: a list of all the attributes of a vector layer
        describing this output. They are used in the db view created
        by `create_view`. Each attribute might also be a SQL
        expression meant to work on the output table associated with
        `cls`
        """
        raise NotImplementedError

    @classmethod
    def attributes(cls):
        """
        :returns: a list of `Attribute` instances holding the
        geoserver attributes of the vector layer associated with
        output of `cls`.

        This is used to build the layer configuration to be pushed on
        geoserver
        """

        raise NotImplementedError

    @staticmethod
    def remove_layer(_sender, instance, _using, **_kwargs):
        """
        Remove the geonode layer as well
        """
        instance.layer.delete()

    @staticmethod
    def drop_view(_sender, instance, _using, **_kwargs):
        cursor = connection.cursor()
        view_name = "icebox_output_%s_%s" % (
            instance.__class__.__name__, instance.output_layer_id)
        view_name = view_name.lower()
        cursor.execute("DROP VIEW IF EXISTS %s view_name")
        cursor.connection.commit()

    @classmethod
    def bbox_for_output(cls, output_layer):
        return dict(
            zip(["minx", "miny", "maxx", "maxy"],
                cls.objects.filter(output_layer=output_layer).extent()))


models.signals.post_delete.connect(Calculation.remove_map, sender=Calculation)
models.signals.post_delete.connect(Output.remove_layer, sender=Output)
models.signals.post_delete.connect(Output.drop_view, sender=Output)


class HazardMap(Output):
    location = models.PointField(srid=4326, dim=2)
    iml = models.FloatField()

    @classmethod
    def sql_attributes(cls):
        return ["location", "iml"]

    @classmethod
    def attributes(cls):
        return [cls.Attribute("location",
                              "com.vividsolutions.jts.geom.Geometry"),
                cls.Attribute("iml", "java.lang.Double")]


class HazardCurve(Output):
    location = models.PointField(srid=4326, dim=2)
    imls = fields.FloatArrayField()
    poes = fields.FloatArrayField()

    @classmethod
    def sql_attributes(cls):
        return ["location",
                "array_to_string(imls, ',') as imls",
                "array_to_string(poes, ',') as poes"]

    @classmethod
    def attributes(cls):
        return [cls.Attribute("location",
                              "com.vividsolutions.jts.geom.Geometry"),
                cls.Attribute("imls", "java.lang.String"),
                cls.Attribute("poes", "java.lang.String")]


class GMF(Output):
    location = models.PointField(srid=4326, dim=2)
    iml = models.FloatField()
    rupture_tag = models.TextField()

    @classmethod
    def sql_attributes(cls):
        return ["location", "iml", "rupture_tag"]

    @classmethod
    def attributes(cls):
        return [cls.Attribute("location",
                              "com.vividsolutions.jts.geom.Geometry"),
                cls.Attribute("iml", "java.lang.Double"),
                cls.Attribute("rupture_tag", "java.lang.String")]


class SES(Output):
    hypocenter = models.PointField(srid=4326, dim=2)
    rupture_tag = models.TextField()
    magnitude = models.FloatField()

    @classmethod
    def sql_attributes(cls):
        return ["hypocenter", "magnitude", "rupture_tag"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("hypocenter",
                          "com.vividsolutions.jts.geom.Geometry"),
            cls.Attribute("magnitude", "java.lang.Double"),
            cls.Attribute("rupture_tag", "java.lang.String")]


class AggregateLossCurve(Output):
    region = models.PolygonField()
    losses = fields.FloatArrayField()
    poes = fields.FloatArrayField()
    mean_loss = models.FloatField()
    stddev_loss = models.FloatField()

    @classmethod
    def sql_attributes(cls):
        return ["region",
                "array_to_string(losses, ',') as losses",
                "array_to_string(poes, ',') as poes",
                "mean_loss, stddev_loss"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("region", "com.vividsolutions.jts.geom.Polygon"),
            cls.Attribute("losses", "java.lang.String"),
            cls.Attribute("poes", "java.lang.String"),
            cls.Attribute("mean_loss", "java.lang.Double"),
            cls.Attribute("stddev_loss", "java.lang.Double")]


class AggregateLoss(Output):
    region = models.PolygonField()
    mean_loss = models.FloatField()
    stddev_loss = models.FloatField()

    @classmethod
    def sql_attributes(cls):
        return ["region", "mean_loss", "stddev_loss"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("region", "com.vividsolutions.jts.geom.Polygon"),
            cls.Attribute("mean_loss", "java.lang.Double"),
            cls.Attribute("stddev_loss", "java.lang.Double")]


class BCRDistribution(Output):
    asset_ref = models.TextField()
    average_annual_loss_original = models.FloatField()
    average_annual_loss_retrofitted = models.FloatField()
    bcr = models.FloatField()
    location = models.PointField(srid=4326, dim=2)

    @classmethod
    def sql_attributes(cls):
        return ["location", "asset_ref",
                "average_annual_loss_original",
                "average_annual_loss_retrofitted",
                "bcr"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("location", "com.vividsolutions.jts.geom.Geometry"),
            cls.Attribute("asset_ref", "java.lang.String"),
            cls.Attribute("average_annual_loss_original", "java.lang.Double"),
            cls.Attribute(
                "average_annual_loss_retrofitted", "java.lang.Double"),
            cls.Attribute("bcr", "java.lang.Double")]


class CollapseMap(Output):
    means = models.FloatField()
    stddevs = models.FloatField()
    asset_refs = models.TextField()
    location = models.PointField(srid=4326, dim=2)

    @classmethod
    def sql_attributes(cls):
        return ["location", "means", "stddevs", "asset_refs"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("location", "com.vividsolutions.jts.geom.Geometry"),
            cls.Attribute("asset_refs", "java.lang.String"),
            cls.Attribute("means", "java.lang.String"),
            cls.Attribute("stddevs", "java.lang.String")]


class DamageDistributionPerAsset(Output):
    damage_states = models.TextField()
    means = models.TextField()
    stddevs = models.TextField()
    asset_ref = models.TextField()
    location = models.PointField(srid=4326, dim=2)

    @classmethod
    def sql_attributes(cls):
        return ["location", "asset_refs", "damage_states", "means", "stddevs"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("location", "com.vividsolutions.jts.geom.Geometry"),
            cls.Attribute("asset_refs", "java.lang.String"),
            cls.Attribute("damage_states", "java.lang.String"),
            cls.Attribute("means", "java.lang.String"),
            cls.Attribute("stddevs", "java.lang.String")]


class DamageDistributionPerTaxonomy(Output):
    damage_states = models.TextField()
    means = models.FloatField()
    stddevs = models.FloatField()
    taxonomies = models.TextField()
    region = models.PolygonField(srid=4326, dim=2)

    @classmethod
    def sql_attributes(cls):
        return ["region", "taxonomies", "damage_states", "means", "stddevs"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("region", "com.vividsolutions.jts.geom.Polygon"),
            cls.Attribute("taxonomies", "java.lang.String"),
            cls.Attribute("damage_states", "java.lang.String"),
            cls.Attribute("means", "java.lang.String"),
            cls.Attribute("stddevs", "java.lang.String")]


class TotalDamageDistribution(Output):
    damage_states = models.TextField()
    means = models.FloatField()
    stddevs = models.FloatField()
    region = models.PolygonField(srid=4326, dim=2)

    @classmethod
    def sql_attributes(cls):
        return ["region", "damage_states", "means", "stddevs"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("region", "com.vividsolutions.jts.geom.Polygon"),
            cls.Attribute("damage_states", "java.lang.String"),
            cls.Attribute("means", "java.lang.String"),
            cls.Attribute("stddevs", "java.lang.String")]


class LossCurve(Output):
    location = models.PointField(srid=4326, dim=2)
    losses = fields.FloatArrayField()
    poes = fields.FloatArrayField()
    average_loss = models.FloatField()
    stddev_loss = models.FloatField(null=True)
    asset_ref = models.TextField()

    @classmethod
    def sql_attributes(cls):
        return ["location", "asset_ref",
                "array_to_string(losses, ',') as losses",
                "array_to_string(poes, ',') as poes",
                "average_loss", "stddev_loss"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("location", "com.vividsolutions.jts.geom.Geometry"),
            cls.Attribute("asset_ref", "java.lang.String"),
            cls.Attribute("losses", "java.lang.String"),
            cls.Attribute("poes", "java.lang.String"),
            cls.Attribute("average_loss", "java.lang.Double"),
            cls.Attribute("stddev_loss", "java.lang.Double")]


class LossMap(Output):
    location = models.PointField(srid=4326, dim=2)
    loss = models.FloatField()
    stddev_loss = models.FloatField(null=True)
    asset_ref = models.TextField()

    @classmethod
    def sql_attributes(cls):
        return ["location", "asset_ref", "loss", "stddev_loss"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("location", "com.vividsolutions.jts.geom.Geometry"),
            cls.Attribute("asset_ref", "java.lang.String"),
            cls.Attribute("loss", "java.lang.Double"),
            cls.Attribute("stddev_loss", "java.lang.Double")]

# TODO
# DisaggResult, EventLoss, LossFraction
