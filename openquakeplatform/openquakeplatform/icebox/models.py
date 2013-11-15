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

import collections
import os
from openquakeplatform.icebox import fields
from openquakeplatform import geoserver_api as geoserver
from geonode.geoserver.helpers import gs_slurp
from django.contrib.gis.db import models
from django.contrib.auth import models as auth_models
from django.db import connection
from geonode.maps import models as geonode
from geonode.layers.models import set_attributes


import logging

logger = logging.getLogger(__name__)


class Calculation(models.Model):
    calculation_type = models.TextField(choices=(('hazard', 'hazard'),
                                                 ('risk', 'risk')))
    status = models.TextField(default="queued")
    engine_id = models.TextField(null=True)
    description = models.TextField(null=True)
    map = models.ForeignKey(geonode.Map, null=True)
    user = models.ForeignKey(auth_models.User)

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
        map = geonode.Map()
        map.create_from_layer_list(
            self.user,
            [l.typename for l in layers],
            self.description, "Powered by Openquake")

        # hide all the results by default
        for maplayer in map.layers:
            maplayer.visibility = False
            maplayer.save()

        self.map = map
        self.save()

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
    layer = models.ForeignKey(
        geonode.Layer, null=True,
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
        gs_slurp(workspace=geoserver.WS_NAME, store=geoserver.DS_NAME,
                 filter=geoserver_layer)
        layer = geonode.Layer.objects.get(name=geoserver_layer)
        self.layer = layer
        self.save()

        self.layer.owner = self.calculation.user
        self.layer.save()

        set_attributes(self.layer)
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
        geoserver.geoserver_rest(
            geoserver.LAYER_URL % view_name, method='DELETE',
            raise_errors=False)
        geoserver.geoserver_rest(
            geoserver.FEATURETYPE_URL % view_name, method='DELETE',
            raise_errors=False)

        self.update_layer(self.create_featuretype(view_name))

        return view_name

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
                os.path.dirname(__file__), "gs_data/%s.xml" % request_type))

    def create_featuretype(self, view_name):
        """
        Create a featuretype for the given database view `view_name`

        :returns: the name of the featuretype created
        """
        geoserver.load_features(
            self.output_type.__name__,
            files=[self._xml("featuretype")],
            substitutions=dict(
                view_name=view_name,
                attributes=self.xml_attributes(),
                title=self.display_name,
                class_name=self.output_type.__name__))
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
        """

        raise NotImplementedError


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
    mean = models.FloatField()
    stddev = models.FloatField()
    asset_ref = models.TextField()
    location = models.PointField(srid=4326, dim=2)

    @classmethod
    def sql_attributes(cls):
        return ["location", "mean", "stddev", "asset_ref"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("location", "com.vividsolutions.jts.geom.Geometry"),
            cls.Attribute("asset_ref", "java.lang.String"),
            cls.Attribute("mean", "java.lang.Double"),
            cls.Attribute("stddev", "java.lang.Double")]


class DamageDistributionPerAsset(Output):
    damage_state = models.TextField()
    mean = models.FloatField()
    stddev = models.FloatField()
    asset_ref = models.TextField()
    location = models.PointField(srid=4326, dim=2)

    @classmethod
    def sql_attributes(cls):
        return ["location", "asset_ref", "damage_state", "mean", "stddev"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("location", "com.vividsolutions.jts.geom.Geometry"),
            cls.Attribute("asset_ref", "java.lang.String"),
            cls.Attribute("damage_state", "java.lang.String"),
            cls.Attribute("mean", "java.lang.Double"),
            cls.Attribute("stddev", "java.lang.Double")]


class DamageDistributionPerTaxonomy(Output):
    damage_state = models.TextField()
    mean = models.FloatField()
    stddev = models.FloatField()
    taxonomy = models.TextField()
    region = models.PolygonField(srid=4326, dim=2)

    @classmethod
    def sql_attributes(cls):
        return ["region", "taxonomy", "damage_state", "mean", "stddev"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("region", "com.vividsolutions.jts.geom.Polygon"),
            cls.Attribute("taxonomy", "java.lang.String"),
            cls.Attribute("damage_state", "java.lang.String"),
            cls.Attribute("mean", "java.lang.Double"),
            cls.Attribute("stddev", "java.lang.Double")]


class TotalDamageDistribution(Output):
    damage_state = models.TextField()
    mean = models.FloatField()
    stddev = models.FloatField()
    region = models.PolygonField(srid=4326, dim=2)

    @classmethod
    def sql_attributes(cls):
        return ["region", "damage_state", "mean", "stddev"]

    @classmethod
    def attributes(cls):
        return [
            cls.Attribute("region", "com.vividsolutions.jts.geom.Polygon"),
            cls.Attribute("damage_state", "java.lang.String"),
            cls.Attribute("mean", "java.lang.Double"),
            cls.Attribute("stddev", "java.lang.Double")]


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
