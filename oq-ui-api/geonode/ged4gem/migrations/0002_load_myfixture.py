# encoding: utf-8

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


# encoding: utf-8
import datetime
from south.db import db
from south.v2 import DataMigration
from django.db import models

class Migration(DataMigration):
    
    def forwards(self, orm):
        from django.core.management import call_command
        call_command("loaddata", "ged4gem_fixtures.json")
    
    
    def backwards(self, orm):
        "Write your backwards methods here."
    
    models = {
        'ged4gem.gadm_country_facts_00': {
            'Meta': {'object_name': 'gadm_country_facts_00'},
            'building_area': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'built_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dwellings_building': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'moresimplegeom': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {}),
            'num_buildings': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'people_dwelling': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'populated_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_description': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'population_src_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_source': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'replacement_cost': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'urban_rural_source': ('django.db.models.fields.CharField', [], {'max_length': '150'})
        },
        'ged4gem.gadm_country_facts_05': {
            'Meta': {'object_name': 'gadm_country_facts_05'},
            'building_area': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'built_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dwellings_building': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'moresimplegeom': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {}),
            'num_buildings': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'people_dwelling': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'populated_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_description': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'population_src_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_source': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'replacement_cost': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'urban_rural_source': ('django.db.models.fields.CharField', [], {'max_length': '150'})
        },
        'ged4gem.gadm_country_facts_10': {
            'Meta': {'object_name': 'gadm_country_facts_10'},
            'building_area': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'built_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dwellings_building': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'moresimplegeom': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {}),
            'num_buildings': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'people_dwelling': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'populated_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_description': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'population_src_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_source': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'replacement_cost': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'urban_rural_source': ('django.db.models.fields.CharField', [], {'max_length': '150'})
        },
        'ged4gem.gadm_country_facts_90': {
            'Meta': {'object_name': 'gadm_country_facts_90'},
            'building_area': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'built_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dwellings_building': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'moresimplegeom': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {}),
            'num_buildings': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'people_dwelling': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'populated_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_description': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'population_src_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_source': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'replacement_cost': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'urban_rural_source': ('django.db.models.fields.CharField', [], {'max_length': '150'})
        },
        'ged4gem.gadm_country_facts_95': {
            'Meta': {'object_name': 'gadm_country_facts_95'},
            'building_area': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'built_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dwellings_building': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'null': 'True'}),
            'moresimplegeom': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {}),
            'num_buildings': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'people_dwelling': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'populated_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_description': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'population_src_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'population_src_source': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'replacement_cost': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'urban_rural_source': ('django.db.models.fields.CharField', [], {'max_length': '150'})
        }
    }
    
    complete_apps = ['ged4gem']
