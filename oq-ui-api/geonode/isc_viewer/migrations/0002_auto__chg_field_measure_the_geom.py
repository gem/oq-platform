# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Changing field 'Measure.the_geom'
        db.alter_column('isc_viewer_measure', 'the_geom', self.gf('django.contrib.gis.db.models.fields.PointField')())


    def backwards(self, orm):
        
        # Changing field 'Measure.the_geom'
        db.alter_column('isc_viewer_measure', 'the_geom', self.gf('django.contrib.gis.db.models.fields.PointField')(dim=2))


    models = {
        'isc_viewer.measure': {
            'Meta': {'object_name': 'Measure'},
            'auth': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'blank': 'True'}),
            'date': ('django.db.models.fields.DateTimeField', [], {}),
            'depth': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'depth_unc': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fac': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'lon': ('django.db.models.fields.FloatField', [], {}),
            'mo': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mpp': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mpr': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mrr': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mrt': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mtp': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mtt': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mw': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mw_unc': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            's': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '1', 'blank': 'True'}),
            'smajaz': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'sminax': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'the_geom': ('django.contrib.gis.db.models.fields.PointField', [], {})
        }
    }

    complete_apps = ['isc_viewer']
