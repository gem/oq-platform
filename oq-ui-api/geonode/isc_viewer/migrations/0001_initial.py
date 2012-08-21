# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):
    
    def forwards(self, orm):
        
        # Adding model 'Measure'
        db.create_table('isc_viewer_measure', (
            ('date', self.gf('django.db.models.fields.DateTimeField')()),
            ('lat', self.gf('django.db.models.fields.FloatField')()),
            ('lon', self.gf('django.db.models.fields.FloatField')()),
            ('smajaz', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('sminax', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('strike', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('depth', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('depth_unc', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mw', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mw_unc', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('s', self.gf('django.db.models.fields.CharField')(default='', max_length=1, blank=True)),
            ('mo', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('fac', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('auth', self.gf('django.db.models.fields.CharField')(default='', max_length=255, blank=True)),
            ('mpp', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mpr', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mrr', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mrt', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mtp', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('mtt', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('the_geom', self.gf('django.contrib.gis.db.models.fields.PointField')(dim=2)),
        ))
        db.send_create_signal('isc_viewer', ['Measure'])
    
    
    def backwards(self, orm):
        
        # Deleting model 'Measure'
        db.delete_table('isc_viewer_measure')
    
    #       date          ,    lat   ,    lon   , smajaz, sminax, strike,  depth ,   unc ,  mw  ,  unc , s ,   mo  , fac, auth ,  mpp  ,  mpr  ,  mrr  ,  mrt  ,  mtp  ,  mtt

    models = {
        'isc_viewer.measure': {
            'Meta': {'object_name': 'Measure'},

            'date': ('django.db.models.fields.DateTimeField', [], {}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'lon': ('django.db.models.fields.FloatField', [], {}),
            'smajaz': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'sminax': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'depth': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'depth_unc': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mw': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mw_unc': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            's': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '1', 'blank': 'True'}),
            'mo': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fac': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'auth': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'blank': 'True'}),  
            'mpp': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mpr': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mrr': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mrt': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mtp': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mtt': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'the_geom': ('django.contrib.gis.db.models.fields.PointField', [], {'dim': '2'}),
        }
    }
    
    complete_apps = ['isc_viewer']
