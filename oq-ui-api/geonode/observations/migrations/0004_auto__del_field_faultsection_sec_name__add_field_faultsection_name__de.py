# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Deleting field 'FaultSection.sec_name'
        db.delete_column('observations_faultsection', 'sec_name')

        # Adding field 'FaultSection.name'
        db.add_column('observations_faultsection', 'fault_section_name', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'Trace.name'
        db.add_column('observations_trace', 'trace_name', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Deleting field 'FaultSource.source_nm'
        db.delete_column('observations_faultsource', 'source_nm')

        # Deleting field 'FaultSource.fault_name'
        db.delete_column('observations_faultsource', 'fault_name')

        # Adding field 'FaultSource.name'
        db.add_column('observations_faultsource', 'fault_source_name', self.gf('django.db.models.fields.CharField')(default='', max_length=255), keep_default=False)

        # Deleting field 'Fault.fault_name'
        db.delete_column('observations_fault', 'fault_name')

        # Adding field 'Fault.name'
        db.add_column('observations_fault', 'name', self.gf('django.db.models.fields.CharField')(max_length=30, null=True, blank=True), keep_default=False)


    def backwards(self, orm):
        
        # Adding field 'FaultSection.sec_name'
        db.add_column('observations_faultsection', 'sec_name', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Deleting field 'FaultSection.name'
        db.delete_column('observations_faultsection', 'name')

        # User chose to not deal with backwards NULL issues for 'FaultSource.source_nm'
        raise RuntimeError("Cannot reverse this migration. 'FaultSource.source_nm' and its values cannot be restored.")

        # User chose to not deal with backwards NULL issues for 'FaultSource.fault_name'
        raise RuntimeError("Cannot reverse this migration. 'FaultSource.fault_name' and its values cannot be restored.")

        # Deleting field 'FaultSource.name'
        db.delete_column('observations_faultsource', 'name')

        # Adding field 'Fault.fault_name'
        db.add_column('observations_fault', 'fault_name', self.gf('django.db.models.fields.CharField')(max_length=30, null=True, blank=True), keep_default=False)

        # Deleting field 'Fault.name'
        db.delete_column('observations_fault', 'name')


    models = {
        'observations.displacement': {
            'Meta': {'object_name': 'Displacement'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'dis_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_total': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'horizontal_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'net_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {}),
            'vertical_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.event': {
            'Meta': {'object_name': 'Event'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'marker_age': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            'pre_historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {})
        },
        'observations.fault': {
            'Meta': {'object_name': 'Fault'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_total': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'episodic_behaviour': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'horizontal_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'marker_age': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fault_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'net_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'pre_historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'rake_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'rake_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'rake_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            're_int_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'simple_geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {'null': 'True', 'blank': 'True'}),
            'slip_rate_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.faultgeometry': {
            'Meta': {'object_name': 'FaultGeometry'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'surface_dip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.faultsection': {
            'Meta': {'object_name': 'FaultSection'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_total': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'episodic_behaviour': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'fault': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['observations.Fault']", 'symmetrical': 'False'}),
            'geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {'null': 'True', 'blank': 'True'}),
            'historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'horizontal_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'marker_age': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fault_name': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'net_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'pre_historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'rake_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'rake_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'rake_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            're_int_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_rate_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'surface_dip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.faultsource': {
            'Meta': {'object_name': 'FaultSource'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'area_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'area_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'area_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_total': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fault': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.Fault']"}),
            'geom': ('django.contrib.gis.db.models.fields.PolygonField', [], {'dim': '3', 'null': 'True', 'blank': 'True'}),
            'historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'horizontal_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'marker_age': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mom_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mov_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fault_source_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'net_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'pre_historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'rake_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'rake_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'rake_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            're_int_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_rate_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.sliprate': {
            'Meta': {'object_name': 'SlipRate'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'hv_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'net_slip_rate_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            'rake_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'rake_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'rake_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {}),
            'slip_rate_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.trace': {
            'Meta': {'object_name': 'Trace'},
            'trace_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'fault_section': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['observations.FaultSection']", 'symmetrical': 'False'}),
            'geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {}),
            'geomorphic_expression': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'loc_meth': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {})
        }
    }

    complete_apps = ['observations']
