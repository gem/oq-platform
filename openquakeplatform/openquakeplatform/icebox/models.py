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


import os
from openquakeplatform.icebox import fields
from openquakeplatform import geoserver_api as geoserver
from django.contrib.gis.db import models
from django.db import connection
from geonode.maps import models as geonode


import logging

logger = logging.getLogger(__name__)


class Calculation(models.Model):
    calculation_type = models.TextField(choices=(('hazard', 'hazard'),
                                                 ('risk', 'risk')))
    status = models.TextField(default="queued")
    engine_id = models.TextField(null=True)
    description = models.TextField(null=True)
    map = models.ForeignKey(geonode.Map, null=True)

    def process_layers(self):
        cursor = connection.cursor()
        layers = []

        for olayer in self.outputlayer_set.all():
            for related_object in olayer._meta.get_all_related_objects():
                model = related_object.model
                if not model.objects.filter(output_layer=olayer).exists():
                    continue
                layers.append(
                    olayer.create_geonode_layer(
                        model.create_geoserver_layer(
                            model.create_schema(cursor, olayer))))
                break
            else:
                logger.warning(
                    "Layer creation for %s is not supported" % olayer)
        self.create_geonode_map(layers)
        self.status = 'complete'
        self.save()

    def create_geonode_map(self, layers):
        return
        raise NotImplementedError


class OutputLayer(models.Model):
    display_name = models.TextField()
    calculation = models.ForeignKey(Calculation)
    layer = models.ForeignKey(geonode.Layer, null=True)
    engine_id = models.TextField()


    def create_geonode_layer(self, geoserver_layer):
        raise NotImplementedError


class Output(models.Model):
    output_layer = models.ForeignKey(OutputLayer, null=True)

    class Meta:
        abstract = True

    @classmethod
    def create_geoserver_layer(cls, view_name):
        cls.create_featuretype(view_name)
        cls.create_style(view_name)
        cls.create_layer(view_name)

    @classmethod
    def create_schema(cls, cursor, output_layer):
        view_name = "icebox_output_%s" % output_layer.id
        cursor.execute("""
        CREATE VIEW %s AS
        SELECT %s FROM %s
        WHERE output_layer_id = %d""" % (view_name,
                                         cls._get_layer_fields(),
                                         cls._meta.db_table,
                                         output_layer.id))
        return view_name

    @classmethod
    def _get_layer_fields(cls):
        raise NotImplementedError

    @classmethod
    def _xml(cls, request_type):
        return [os.path.abspath(
            os.path.join(
                os.path.dirname(__file__), "gs_data/%s_%s.xml" % (
                    cls.__name__, request_type)))]
    @classmethod
    def create_featuretype(cls, view_name):
        geoserver.load_features(
            cls.__name__,
            files=cls._xml("featuretype"),
            substitions=dict(view_name=view_name))

    @classmethod
    def create_style(cls, view_name):
        geoserver.load_styles(
            cls.__name__, files=cls._xml("style"),
            substitions=dict(view_name=view_name))

    @classmethod
    def create_layer(cls, view_name):
        geoserver.load_layers(
            cls.__name__, files=cls._xml("layer"),
            substitions=dict(view_name=view_name))


class HazardMap(Output):
    location = models.PointField(srid=4326, dim=2)
    iml = models.FloatField()

    @classmethod
    def _get_layer_fields(cls):
        return "location, iml"


class HazardCurve(Output):
    location = models.PointField(srid=4326, dim=2)
    imls = fields.FloatArrayField()
    poes = fields.FloatArrayField()

    @classmethod
    def _get_layer_fields(cls):
        return """location,
                  array_to_string(imls, ',') as imls,
                  array_to_string(poes, ',') as poes"""


class GMF(Output):
    location = models.PointField(srid=4326, dim=2)
    iml = models.FloatField()
    rupture_tag = models.TextField()

    @classmethod
    def _get_layer_fields(cls):
        return "location, iml, rupture_tag"


class SES(Output):
    hypocenter = models.PointField(srid=4326, dim=2)
    rupture_tag = models.TextField()
    magnitude = models.FloatField()

    @classmethod
    def _get_layer_fields(cls):
        return "hypocenter, magnitude, rupture_tag"


class AggregateLossCurve(Output):
    region = models.PolygonField()
    losses = fields.FloatArrayField()
    poes = fields.FloatArrayField()
    mean_loss = models.FloatField()
    stddev_loss = models.FloatField()

    @classmethod
    def _get_layer_fields(cls):
        return """region,
                  array_to_string(losses, ',') as losses,
                  array_to_string(poes, ',') as poes,
                  mean_loss, stddev_loss"""


class AggregateLoss(Output):
    region = models.PolygonField()
    mean_loss = models.FloatField()
    stddev_loss = models.FloatField()

    @classmethod
    def _get_layer_fields(cls):
        return "region, mean_loss, stddev_loss"


class BCRDistribution(Output):
    asset_ref = models.TextField()
    average_annual_loss_original = models.FloatField()
    average_annual_loss_retrofitted = models.FloatField()
    bcr = models.FloatField()
    location = models.PointField(srid=4326, dim=2)

    @classmethod
    def _get_layer_fields(cls):
        return """location, asset_ref,
                  average_annual_loss_original,
                  average_annual_loss_retrofitted,
                  bcr"""


class CollapseMap(Output):
    mean = models.FloatField()
    stddev = models.FloatField()
    asset_ref = models.TextField()
    location = models.PointField(srid=4326, dim=2)

    @classmethod
    def _get_layer_fields(cls):
        return "location, mean, stddev, asset_ref"


class DamageDistributionPerAsset(Output):
    damage_state = models.TextField()
    mean = models.FloatField()
    stddev = models.FloatField()
    asset_ref = models.TextField()
    location = models.PointField(srid=4326, dim=2)

    @classmethod
    def _get_layer_fields(cls):
        return "location, asset_ref, damage_state, mean, stddev"


class DamageDistributionPerTaxonomy(Output):
    damage_state = models.TextField()
    mean = models.FloatField()
    stddev = models.FloatField()
    taxonomy = models.TextField()
    region = models.PolygonField(srid=4326, dim=2)

    @classmethod
    def _get_layer_fields(cls):
        return "region, taxonomy, damage_state, mean, stddev"


class TotalDamageDistribution(Output):
    damage_state = models.TextField()
    mean = models.FloatField()
    stddev = models.FloatField()
    region = models.PolygonField(srid=4326, dim=2)

    @classmethod
    def _get_layer_fields(cls):
        return "region, damage_state, mean, stddev"


class LossCurve(Output):
    location = models.PointField(srid=4326, dim=2)
    losses = fields.FloatArrayField()
    poes = fields.FloatArrayField()
    average_loss = models.FloatField()
    stddev_loss = models.FloatField(null=True)
    asset_ref = models.TextField()

    @classmethod
    def _get_layer_fields(cls):
        return """location, asset_ref,
                  array_to_string(losses, ',') as losses,
                  array_to_string(poes, ',') as poes,
                  average_loss, stddev_loss"""


class LossMap(Output):
    location = models.PointField(srid=4326, dim=2)
    loss = models.FloatField()
    stddev_loss = models.FloatField(null=True)
    asset_ref = models.TextField()

    @classmethod
    def _get_layer_fields(cls):
        return "location, asset_ref, loss, stddev_loss"

# TODO
# DisaggResult, EventLoss, LossFraction
