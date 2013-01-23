# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2010-2012, GEM Foundation.
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.

from django.contrib.gis.db import models

class grump_pop_ur2(models.Model):
    lat = models.FloatField(null=False, blank=False)
    lon = models.FloatField(null=False, blank=False)
    pop_value = models.FloatField(null=False, blank=False)
    is_urban = models.BooleanField()
    the_geom = models.PointField(srid=4326, dim=2)

class agg_build_infra_src(models.Model):
    shape_perimeter = models.IntegerField()
    shape_area = models.IntegerField()
    data = models.DateField()
    notes = models.CharField()
    mapping_scheme_src_id = models.IntegerField()
    study_region_id = models.IntegerField()
    gadm_country_id = models.IntegerField()
    gadm_admin_1_id = models.IntegerField()
    gadm_admin_2_id = models.IntegerField()
    the_geom = models.PointField(srid=4326, dim=2)

class mapping_scheme_src(models.Model):
    source = models.CharField()
    date_created = models.DateField()
    data_source = models.CharField()
    data_source_date = models.DateField()
    use_notes = models.CharField()
    quality = models.CharField()
    oq_user_id = models.IntegerField()
    taxonomy = models.CharField()
    is_urban = models.BooleanField()
    occupancy = models.CharField()
    id_bk = models.IntegerField()

class gadm_country(models.Model):
    name = models.CharField()
    alias = models.CharField()
    iso = models.CharField()
    shape_perimeter = models.IntegerField()
    shape_area = models.IntegerField()
    date =  models.DateField()
    the_geom = models.PointField(srid=4326, dim=2)
    simple_geom = models.PointField(srid=4326, dim=2)
    gadm_id_0 = models.IntegerField()

class mapping_scheme(models.Model):
    mapping_scheme_src_id = models.IntegerField()
    ms_name = models.CharField()
    ms_value = models.FloatField(null=False, blank=False)

class pop_allocation(models.Model):
    gadm_country_id = models.IntegerField()
    is_urban = models.BooleanField()
    day_pop_ratio = models.FloatField(null=False, blank=False)
    night_pop_ratio = models.FloatField(null=False, blank=False)
    transit_pop_ratio = models.FloatField(null=False, blank=False)
    occupancy_id = models.IntegerField()
    occupancy = models.CharField()
     
