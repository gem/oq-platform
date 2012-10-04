# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding model 'gadm_country_facts_00'
        db.create_table('ged4gem_gadm_country_facts_00', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('gadm_country_id', self.gf('django.db.models.fields.IntegerField')()),
            ('gadm_country_name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gadm_country_alias', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('gadm_country_iso', self.gf('django.db.models.fields.CharField')(max_length=3)),
            ('gadm_country_shape_perimeter', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_shape_area', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('urban_rural_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('people_dwelling', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dwellings_building', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('building_area', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('replacement_cost', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('num_buildings', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('gadm_country_attribute_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population_src_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('population_src_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_description', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('populated_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('built_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mapping_schemes', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('moresimplegeom', self.gf('django.contrib.gis.db.models.fields.MultiPolygonField')()),
        ))
        db.send_create_signal('ged4gem', ['gadm_country_facts_00'])

        # Adding model 'gadm_country_facts_05'
        db.create_table('ged4gem_gadm_country_facts_05', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('gadm_country_id', self.gf('django.db.models.fields.IntegerField')()),
            ('gadm_country_name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gadm_country_alias', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('gadm_country_iso', self.gf('django.db.models.fields.CharField')(max_length=3)),
            ('gadm_country_shape_perimeter', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_shape_area', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('urban_rural_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('people_dwelling', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dwellings_building', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('building_area', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('replacement_cost', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('num_buildings', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('gadm_country_attribute_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population_src_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('population_src_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_description', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('populated_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('built_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mapping_schemes', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('moresimplegeom', self.gf('django.contrib.gis.db.models.fields.MultiPolygonField')()),
        ))
        db.send_create_signal('ged4gem', ['gadm_country_facts_05'])

        # Adding model 'gadm_country_facts_10'
        db.create_table('ged4gem_gadm_country_facts_10', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('gadm_country_id', self.gf('django.db.models.fields.IntegerField')()),
            ('gadm_country_name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gadm_country_alias', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('gadm_country_iso', self.gf('django.db.models.fields.CharField')(max_length=3)),
            ('gadm_country_shape_perimeter', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_shape_area', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('urban_rural_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('people_dwelling', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dwellings_building', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('building_area', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('replacement_cost', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('num_buildings', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('gadm_country_attribute_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population_src_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('population_src_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_description', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('populated_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('built_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mapping_schemes', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('moresimplegeom', self.gf('django.contrib.gis.db.models.fields.MultiPolygonField')()),
        ))
        db.send_create_signal('ged4gem', ['gadm_country_facts_10'])

        # Adding model 'gadm_country_facts_90'
        db.create_table('ged4gem_gadm_country_facts_90', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('gadm_country_id', self.gf('django.db.models.fields.IntegerField')()),
            ('gadm_country_name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gadm_country_alias', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('gadm_country_iso', self.gf('django.db.models.fields.CharField')(max_length=3)),
            ('gadm_country_shape_perimeter', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_shape_area', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('urban_rural_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('people_dwelling', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dwellings_building', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('building_area', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('replacement_cost', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('num_buildings', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('gadm_country_attribute_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population_src_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('population_src_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_description', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('populated_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('built_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mapping_schemes', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('moresimplegeom', self.gf('django.contrib.gis.db.models.fields.MultiPolygonField')()),
        ))
        db.send_create_signal('ged4gem', ['gadm_country_facts_90'])

        # Adding model 'gadm_country_facts_95'
        db.create_table('ged4gem_gadm_country_facts_95', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('gadm_country_id', self.gf('django.db.models.fields.IntegerField')()),
            ('gadm_country_name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gadm_country_alias', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('gadm_country_iso', self.gf('django.db.models.fields.CharField')(max_length=3)),
            ('gadm_country_shape_perimeter', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_shape_area', self.gf('django.db.models.fields.FloatField')()),
            ('gadm_country_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('urban_rural_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('people_dwelling', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dwellings_building', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('building_area', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('replacement_cost', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('num_buildings', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('gadm_country_attribute_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population_src_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('population_src_source', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_description', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('population_src_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('population', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('populated_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('built_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mapping_schemes', self.gf('django.db.models.fields.CharField')(max_length=150, null=True)),
            ('moresimplegeom', self.gf('django.contrib.gis.db.models.fields.MultiPolygonField')()),
        ))
        db.send_create_signal('ged4gem', ['gadm_country_facts_95'])

        # Adding model 'mapping_schema_rural_non_res'
        db.create_table('ged4gem_mapping_schema_rural_non_res', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gmi_cntry', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('region', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gem_shorth', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('mapping_sc', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ms_name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('ms_value', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('src_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('is_urban', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('occupancy', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gadm_count', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('the_geom', self.gf('django.contrib.gis.db.models.fields.MultiPolygonField')()),
        ))
        db.send_create_signal('ged4gem', ['mapping_schema_rural_non_res'])

        # Adding model 'mapping_schema_rural_res'
        db.create_table('ged4gem_mapping_schema_rural_res', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gmi_cntry', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('region', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gem_shorth', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('mapping_sc', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ms_name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('ms_value', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('src_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('is_urban', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('occupancy', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gadm_count', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('the_geom', self.gf('django.contrib.gis.db.models.fields.MultiPolygonField')()),
        ))
        db.send_create_signal('ged4gem', ['mapping_schema_rural_res'])

        # Adding model 'mapping_schema_urban_non_res'
        db.create_table('ged4gem_mapping_schema_urban_non_res', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gmi_cntry', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('region', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gem_shorth', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('mapping_sc', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ms_name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('ms_value', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('src_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('is_urban', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('occupancy', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gadm_count', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('the_geom', self.gf('django.contrib.gis.db.models.fields.MultiPolygonField')()),
        ))
        db.send_create_signal('ged4gem', ['mapping_schema_urban_non_res'])

        # Adding model 'mapping_schema_urban__res'
        db.create_table('ged4gem_mapping_schema_urban_res', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gmi_cntry', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('region', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gem_shorth', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('mapping_sc', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ms_name', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('ms_value', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('src_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('is_urban', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('occupancy', self.gf('django.db.models.fields.CharField')(max_length=150)),
            ('gadm_count', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('the_geom', self.gf('django.contrib.gis.db.models.fields.MultiPolygonField')()),
        ))
        db.send_create_signal('ged4gem', ['mapping_schema_urban__res'])


    def backwards(self, orm):
        
        # Deleting model 'gadm_country_facts_00'
        db.delete_table('ged4gem_gadm_country_facts_00')

        # Deleting model 'gadm_country_facts_05'
        db.delete_table('ged4gem_gadm_country_facts_05')

        # Deleting model 'gadm_country_facts_10'
        db.delete_table('ged4gem_gadm_country_facts_10')

        # Deleting model 'gadm_country_facts_90'
        db.delete_table('ged4gem_gadm_country_facts_90')

        # Deleting model 'gadm_country_facts_95'
        db.delete_table('ged4gem_gadm_country_facts_95')

        # Deleting model 'mapping_schema_rural_non_res'
        db.delete_table('ged4gem_mapping_schema_rural_non_res')

        # Deleting model 'mapping_schema_rural_res'
        db.delete_table('ged4gem_mapping_schema_rural_res')

        # Deleting model 'mapping_schema_urban_non_res'
        db.delete_table('ged4gem_mapping_schema_urban_non_res')

        # Deleting model 'mapping_schema_urban__res'
        db.delete_table('ged4gem_mapping_schema_urban_res')


    models = {
        'ged4gem.gadm_country_facts_00': {
            'Meta': {'object_name': 'gadm_country_facts_00'},
            'building_area': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'built_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dwellings_building': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
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
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
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
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
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
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
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
            'gadm_country_alias': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
            'gadm_country_attribute_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'gadm_country_id': ('django.db.models.fields.IntegerField', [], {}),
            'gadm_country_iso': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'gadm_country_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gadm_country_shape_area': ('django.db.models.fields.FloatField', [], {}),
            'gadm_country_shape_perimeter': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mapping_schemes': ('django.db.models.fields.CharField', [], {'max_length': '150', 'null': 'True'}),
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
        'ged4gem.mapping_schema_rural_non_res': {
            'Meta': {'object_name': 'mapping_schema_rural_non_res'},
            'gadm_count': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'gem_shorth': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gmi_cntry': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_urban': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'mapping_sc': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ms_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'ms_value': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'occupancy': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'region': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'src_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'the_geom': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {})
        },
        'ged4gem.mapping_schema_rural_res': {
            'Meta': {'object_name': 'mapping_schema_rural_res'},
            'gadm_count': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'gem_shorth': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gmi_cntry': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_urban': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'mapping_sc': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ms_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'ms_value': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'occupancy': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'region': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'src_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'the_geom': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {})
        },
        'ged4gem.mapping_schema_urban__res': {
            'Meta': {'object_name': 'mapping_schema_urban__res'},
            'gadm_count': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'gem_shorth': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gmi_cntry': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_urban': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'mapping_sc': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ms_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'ms_value': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'occupancy': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'region': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'src_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'the_geom': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {})
        },
        'ged4gem.mapping_schema_urban_non_res': {
            'Meta': {'object_name': 'mapping_schema_urban_non_res'},
            'gadm_count': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'gem_shorth': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'gmi_cntry': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_urban': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'mapping_sc': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ms_name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'ms_value': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'occupancy': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'region': ('django.db.models.fields.CharField', [], {'max_length': '150'}),
            'src_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'the_geom': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {})
        }
    }

    complete_apps = ['ged4gem']
