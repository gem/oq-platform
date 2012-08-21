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

#ged4gem schema
#ged4gem table

class gadm_country_facts_00(models.Model):
    gadm_country_id = models.IntegerField()
    gadm_country_name = models.CharField(max_length=150)
    gadm_country_alias = models.CharField(null=True, max_length=150)
    gadm_country_iso = models.CharField(max_length=3)
    gadm_country_shape_perimeter = models.FloatField()
    gadm_country_shape_area = models.FloatField()
    gadm_country_date = models.DateField(null=True, blank=True)
    urban_rural_source = models.CharField(max_length=150)
    people_dwelling = models.FloatField(null=True, blank=True)
    dwellings_building = models.FloatField(null=True, blank=True)
    building_area = models.FloatField(null=True, blank=True)
    replacement_cost = models.FloatField(null=True, blank=True)
    num_buildings = models.FloatField(null=True, blank=True)
    gadm_country_attribute_date = models.DateField(null=True, blank=True)
    population_src_id = models.IntegerField(null=True, blank=True)
    population_src_source = models.CharField(max_length=150)
    population_src_description = models.CharField(max_length=150)
    population_src_date = models.DateField(null=True, blank=True)
    population = models.FloatField(null=True, blank=True)
    populated_ratio = models.FloatField(null=True, blank=True)
    built_ratio = models.FloatField(null=True, blank=True)
    mapping_schemes = models.CharField(null=True,max_length=150)
    moresimplegeom = models.MultiPolygonField(srid=4326)


class gadm_country_facts_05(models.Model):
    gadm_country_id = models.IntegerField()
    gadm_country_name = models.CharField(max_length=150)
    gadm_country_alias = models.CharField(null=True, max_length=150)
    gadm_country_iso = models.CharField(max_length=3)
    gadm_country_shape_perimeter = models.FloatField()
    gadm_country_shape_area = models.FloatField()
    gadm_country_date = models.DateField(null=True, blank=True)
    urban_rural_source = models.CharField(max_length=150)
    people_dwelling = models.FloatField(null=True, blank=True)
    dwellings_building = models.FloatField(null=True, blank=True)
    building_area = models.FloatField(null=True, blank=True)
    replacement_cost = models.FloatField(null=True, blank=True)
    num_buildings = models.FloatField(null=True, blank=True)
    gadm_country_attribute_date = models.DateField(null=True, blank=True)
    population_src_id = models.IntegerField(null=True, blank=True)
    population_src_source = models.CharField(max_length=150)
    population_src_description = models.CharField(max_length=150)
    population_src_date = models.DateField(null=True, blank=True)
    population = models.FloatField(null=True, blank=True)
    populated_ratio = models.FloatField(null=True, blank=True)
    built_ratio = models.FloatField(null=True, blank=True)
    mapping_schemes = models.CharField(null=True, max_length=150)
    moresimplegeom = models.MultiPolygonField(srid=4326)


class gadm_country_facts_10(models.Model):
    gadm_country_id = models.IntegerField()
    gadm_country_name = models.CharField(max_length=150)
    gadm_country_alias = models.CharField(null=True, max_length=150)
    gadm_country_iso = models.CharField(max_length=3)
    gadm_country_shape_perimeter = models.FloatField()
    gadm_country_shape_area = models.FloatField()
    gadm_country_date = models.DateField(null=True, blank=True)
    urban_rural_source = models.CharField(max_length=150)
    people_dwelling = models.FloatField(null=True, blank=True)
    dwellings_building = models.FloatField(null=True, blank=True)
    building_area = models.FloatField(null=True, blank=True)
    replacement_cost = models.FloatField(null=True, blank=True)
    num_buildings = models.FloatField(null=True, blank=True)
    gadm_country_attribute_date = models.DateField(null=True, blank=True)
    population_src_id = models.IntegerField(null=True, blank=True)
    population_src_source = models.CharField(max_length=150)
    population_src_description = models.CharField(max_length=150)
    population_src_date = models.DateField(null=True, blank=True)
    population = models.FloatField(null=True, blank=True)
    populated_ratio = models.FloatField(null=True, blank=True)
    built_ratio = models.FloatField(null=True, blank=True)
    mapping_schemes = models.CharField(null=True, max_length=150)
    moresimplegeom = models.MultiPolygonField(srid=4326)


class gadm_country_facts_90(models.Model):
    gadm_country_id = models.IntegerField()
    gadm_country_name = models.CharField(max_length=150)
    gadm_country_alias = models.CharField(null=True, max_length=150)
    gadm_country_iso = models.CharField(max_length=3)
    gadm_country_shape_perimeter = models.FloatField()
    gadm_country_shape_area = models.FloatField()
    gadm_country_date = models.DateField(null=True, blank=True)
    urban_rural_source = models.CharField(max_length=150)
    people_dwelling = models.FloatField(null=True, blank=True)
    dwellings_building = models.FloatField(null=True, blank=True)
    building_area = models.FloatField(null=True, blank=True)
    replacement_cost = models.FloatField(null=True, blank=True)
    num_buildings = models.FloatField(null=True, blank=True)
    gadm_country_attribute_date = models.DateField(null=True, blank=True)
    population_src_id = models.IntegerField(null=True, blank=True)
    population_src_source = models.CharField(max_length=150)
    population_src_description = models.CharField(max_length=150)
    population_src_date = models.DateField(null=True, blank=True)
    population = models.FloatField(null=True, blank=True)
    populated_ratio = models.FloatField(null=True, blank=True)
    built_ratio = models.FloatField(null=True, blank=True)
    mapping_schemes = models.CharField(null=True, max_length=150)
    moresimplegeom = models.MultiPolygonField(srid=4326)


class gadm_country_facts_95(models.Model):
    gadm_country_id = models.IntegerField()
    gadm_country_name = models.CharField(max_length=150)
    gadm_country_alias = models.CharField(null=True, max_length=150)
    gadm_country_iso = models.CharField(max_length=3)
    gadm_country_shape_perimeter = models.FloatField()
    gadm_country_shape_area = models.FloatField()
    gadm_country_date = models.DateField(null=True, blank=True)
    urban_rural_source = models.CharField(max_length=150)
    people_dwelling = models.FloatField(null=True, blank=True)
    dwellings_building = models.FloatField(null=True, blank=True)
    building_area = models.FloatField(null=True, blank=True)
    replacement_cost = models.FloatField(null=True, blank=True)
    num_buildings = models.FloatField(null=True, blank=True)
    gadm_country_attribute_date = models.DateField(null=True, blank=True)
    population_src_id = models.IntegerField(null=True, blank=True)
    population_src_source = models.CharField(max_length=150)
    population_src_description = models.CharField(max_length=150)
    population_src_date = models.DateField(null=True, blank=True)
    population = models.FloatField(null=True, blank=True)
    populated_ratio = models.FloatField(null=True, blank=True)
    built_ratio = models.FloatField(null=True, blank=True)
    mapping_schemes = models.CharField(null=True, max_length=150)
    moresimplegeom = models.MultiPolygonField(srid=4326)
