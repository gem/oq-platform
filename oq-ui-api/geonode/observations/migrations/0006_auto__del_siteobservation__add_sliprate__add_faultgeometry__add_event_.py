# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'SiteObservation'
        db.delete_table('observations_siteobservation')

        # Adding model 'SlipRate'
        db.create_table('observations_sliprate', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('geom', self.gf('django.contrib.gis.db.models.fields.PointField')()),
            ('fault_section', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['observations.FaultSection'], null=True, blank=True)),
            ('scale', self.gf('django.db.models.fields.BigIntegerField')()),
            ('accuracy', self.gf('django.db.models.fields.BigIntegerField')()),
            ('s_feature', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('notes', self.gf('django.db.models.fields.TextField')()),
            ('dip_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dip_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dip_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('strike_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('strike_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('strike_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('vertical_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('vertical_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('vertical_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('hv_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('net_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('net_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('net_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('rake', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('slip_rate_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('slip_type', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal('observations', ['SlipRate'])

        # Adding model 'FaultGeometry'
        db.create_table('observations_faultgeometry', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('geom', self.gf('django.contrib.gis.db.models.fields.PointField')()),
            ('fault_section', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['observations.FaultSection'], null=True, blank=True)),
            ('scale', self.gf('django.db.models.fields.BigIntegerField')()),
            ('accuracy', self.gf('django.db.models.fields.BigIntegerField')()),
            ('s_feature', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('notes', self.gf('django.db.models.fields.TextField')()),
            ('dip_dir', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('down_thro', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('strike', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('surface_dip', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
        ))
        db.send_create_signal('observations', ['FaultGeometry'])

        # Adding model 'Event'
        db.create_table('observations_event', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('geom', self.gf('django.contrib.gis.db.models.fields.PointField')()),
            ('fault_section', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['observations.FaultSection'], null=True, blank=True)),
            ('scale', self.gf('django.db.models.fields.BigIntegerField')()),
            ('accuracy', self.gf('django.db.models.fields.BigIntegerField')()),
            ('s_feature', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('notes', self.gf('django.db.models.fields.TextField')()),
            ('mov_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('mov_min', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('mov_max', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('mov_pref', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('historical_earthquake', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('pre_historical_earthquake', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('marker_age', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('re_int_min', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('re_int_max', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('re_int_pref', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('re_int_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal('observations', ['Event'])

        # Adding model 'Displacement'
        db.create_table('observations_displacement', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('geom', self.gf('django.contrib.gis.db.models.fields.PointField')()),
            ('fault_section', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['observations.FaultSection'], null=True, blank=True)),
            ('scale', self.gf('django.db.models.fields.BigIntegerField')()),
            ('accuracy', self.gf('django.db.models.fields.BigIntegerField')()),
            ('s_feature', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('notes', self.gf('django.db.models.fields.TextField')()),
            ('dis_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dis_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dis_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dis_total', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('dis_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('horizontal_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('vertical_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('net_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
        ))
        db.send_create_signal('observations', ['Displacement'])


        # Changing field 'FaultSource.geom'
        db.alter_column('observations_faultsource', 'geom', self.gf('django.contrib.gis.db.models.fields.PolygonField')(dim=3))

    def backwards(self, orm):
        # Adding model 'SiteObservation'
        db.create_table('observations_siteobservation', (
            ('scale', self.gf('django.db.models.fields.BigIntegerField')()),
            ('geom', self.gf('django.contrib.gis.db.models.fields.PointField')()),
            ('s_feature', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('notes', self.gf('django.db.models.fields.TextField')()),
            ('fault_section', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['observations.FaultSection'], null=True, blank=True)),
            ('accuracy', self.gf('django.db.models.fields.BigIntegerField')()),
        ))
        db.send_create_signal('observations', ['SiteObservation'])

        # Deleting model 'SlipRate'
        db.delete_table('observations_sliprate')

        # Deleting model 'FaultGeometry'
        db.delete_table('observations_faultgeometry')

        # Deleting model 'Event'
        db.delete_table('observations_event')

        # Deleting model 'Displacement'
        db.delete_table('observations_displacement')


        # Changing field 'FaultSource.geom'
        db.alter_column('observations_faultsource', 'geom', self.gf('django.contrib.gis.db.models.fields.PolygonField')())

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
            'compiler': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'episodi_ac': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'episodi_is': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'fault_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pre': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'simple_geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {'null': 'True', 'blank': 'True'}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_typ': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
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
            'compiler': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'episodi_ac': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'episodi_is': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'fault': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['observations.Fault']", 'symmetrical': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pre': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'sec_name': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_typ': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.faultsource': {
            'Meta': {'object_name': 'FaultSource'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'area_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'area_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'area_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30'}),
            'contrib': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fault': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.Fault']"}),
            'fault_name': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'geom': ('django.contrib.gis.db.models.fields.PolygonField', [], {'dim': '3'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pre': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_typ': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30'}),
            'source_nm': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.sliprate': {
            'Meta': {'object_name': 'SlipRate'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'dip_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'hv_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'net_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            'rake': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {}),
            'slip_rate_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.trace': {
            'Meta': {'object_name': 'Trace'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'fault_section': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['observations.FaultSection']", 'symmetrical': 'False'}),
            'geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'loc_meth': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {})
        }
    }

    complete_apps = ['observations']