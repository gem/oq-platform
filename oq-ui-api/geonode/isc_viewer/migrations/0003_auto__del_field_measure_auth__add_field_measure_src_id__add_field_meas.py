# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Deleting field 'Measure.auth'
        db.delete_column('isc_viewer_measure', 'auth')

        # Adding field 'Measure.src_id'
        db.add_column('isc_viewer_measure', 'src_id', self.gf('django.db.models.fields.IntegerField')(default=-1), keep_default=False)

        # Adding field 'Measure.epic_q'
        db.add_column('isc_viewer_measure', 'epic_q', self.gf('django.db.models.fields.CharField')(default='', max_length=1, blank=True), keep_default=False)

        # Adding field 'Measure.depth_q'
        db.add_column('isc_viewer_measure', 'depth_q', self.gf('django.db.models.fields.CharField')(default='', max_length=1, blank=True), keep_default=False)

        # Adding field 'Measure.mw_q'
        db.add_column('isc_viewer_measure', 'mw_q', self.gf('django.db.models.fields.CharField')(default='', max_length=1, blank=True), keep_default=False)

        # Adding field 'Measure.mo_auth'
        db.add_column('isc_viewer_measure', 'mo_auth', self.gf('django.db.models.fields.CharField')(default='', max_length=255, blank=True), keep_default=False)

        # Adding field 'Measure.eventid'
        db.add_column('isc_viewer_measure', 'eventid', self.gf('django.db.models.fields.IntegerField')(default=-1), keep_default=False)


    def backwards(self, orm):
        
        # Adding field 'Measure.auth'
        db.add_column('isc_viewer_measure', 'auth', self.gf('django.db.models.fields.CharField')(default='', max_length=255, blank=True), keep_default=False)

        # Deleting field 'Measure.src_id'
        db.delete_column('isc_viewer_measure', 'src_id')

        # Deleting field 'Measure.epic_q'
        db.delete_column('isc_viewer_measure', 'epic_q')

        # Deleting field 'Measure.depth_q'
        db.delete_column('isc_viewer_measure', 'depth_q')

        # Deleting field 'Measure.mw_q'
        db.delete_column('isc_viewer_measure', 'mw_q')

        # Deleting field 'Measure.mo_auth'
        db.delete_column('isc_viewer_measure', 'mo_auth')

        # Deleting field 'Measure.eventid'
        db.delete_column('isc_viewer_measure', 'eventid')


    models = {
        'isc_viewer.measure': {
            'Meta': {'object_name': 'Measure'},
            'date': ('django.db.models.fields.DateTimeField', [], {}),
            'depth': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'depth_q': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '1', 'blank': 'True'}),
            'depth_unc': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'epic_q': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '1', 'blank': 'True'}),
            'eventid': ('django.db.models.fields.IntegerField', [], {'default': '-1'}),
            'fac': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'lon': ('django.db.models.fields.FloatField', [], {}),
            'mo': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mo_auth': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'blank': 'True'}),
            'mpp': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mpr': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mrr': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mrt': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mtp': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mtt': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mw': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mw_q': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '1', 'blank': 'True'}),
            'mw_unc': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            's': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '1', 'blank': 'True'}),
            'smajaz': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'sminax': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'src_id': ('django.db.models.fields.IntegerField', [], {'default': '-1'}),
            'strike': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'the_geom': ('django.contrib.gis.db.models.fields.PointField', [], {})
        }
    }

    complete_apps = ['isc_viewer']
