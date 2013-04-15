# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding model 'Measure'
        db.create_table('ghec_viewer_measure', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('src', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('yea', self.gf('django.db.models.fields.IntegerField')()),
            ('mon', self.gf('django.db.models.fields.IntegerField')(default=None, null=True, blank=True)),
            ('day', self.gf('django.db.models.fields.IntegerField')(default=None, null=True, blank=True)),
            ('hou', self.gf('django.db.models.fields.IntegerField')(default=None, null=True, blank=True)),
            ('min', self.gf('django.db.models.fields.IntegerField')(default=None, null=True, blank=True)),
            ('sec', self.gf('django.db.models.fields.IntegerField')(default=None, null=True, blank=True)),
            ('are', self.gf('django.db.models.fields.CharField')(default='', max_length=255, null=True, blank=True)),
            ('lat', self.gf('django.db.models.fields.FloatField')()),
            ('lon', self.gf('django.db.models.fields.FloatField')()),
            ('the_geom', self.gf('django.contrib.gis.db.models.fields.PointField')()),
            ('latunc', self.gf('django.db.models.fields.FloatField')(default=None, null=True, blank=True)),
            ('lonunc', self.gf('django.db.models.fields.FloatField')(default=None, null=True, blank=True)),
            ('epdet', self.gf('django.db.models.fields.CharField')(default='', max_length=5, null=True, blank=True)),
            ('dep', self.gf('django.db.models.fields.FloatField')(default=None, null=True, blank=True)),
            ('io', self.gf('django.db.models.fields.CharField')(default='', max_length=255, null=True, blank=True)),
            ('msrc', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('m', self.gf('django.db.models.fields.FloatField')()),
            ('munc', self.gf('django.db.models.fields.FloatField')(default=None, null=True, blank=True)),
            ('mtyp', self.gf('django.db.models.fields.CharField')(default='', max_length=5, null=True, blank=True)),
            ('mdet', self.gf('django.db.models.fields.CharField')(default='', max_length=5, null=True, blank=True)),
            ('mdpsrc', self.gf('django.db.models.fields.CharField')(default='', max_length=255, null=True, blank=True)),
            ('mdpn', self.gf('django.db.models.fields.IntegerField')(default=None, null=True, blank=True)),
            ('mdpix', self.gf('django.db.models.fields.CharField')(default='', max_length=255, null=True, blank=True)),
            ('mdpsc', self.gf('django.db.models.fields.CharField')(default='', max_length=5, null=True, blank=True)),
            ('rem', self.gf('django.db.models.fields.CharField')(default='', max_length=1024, null=True, blank=True)),
        ))
        db.send_create_signal('ghec_viewer', ['Measure'])


    def backwards(self, orm):
        
        # Deleting model 'Measure'
        db.delete_table('ghec_viewer_measure')


    models = {
        'ghec_viewer.measure': {
            'Meta': {'object_name': 'Measure'},
            'are': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'day': ('django.db.models.fields.IntegerField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'dep': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'epdet': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '5', 'null': 'True', 'blank': 'True'}),
            'hou': ('django.db.models.fields.IntegerField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'io': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'latunc': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'lon': ('django.db.models.fields.FloatField', [], {}),
            'lonunc': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'm': ('django.db.models.fields.FloatField', [], {}),
            'mdet': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '5', 'null': 'True', 'blank': 'True'}),
            'mdpix': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'mdpn': ('django.db.models.fields.IntegerField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'mdpsc': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '5', 'null': 'True', 'blank': 'True'}),
            'mdpsrc': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'min': ('django.db.models.fields.IntegerField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'mon': ('django.db.models.fields.IntegerField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'msrc': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'mtyp': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '5', 'null': 'True', 'blank': 'True'}),
            'munc': ('django.db.models.fields.FloatField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'rem': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '1024', 'null': 'True', 'blank': 'True'}),
            'sec': ('django.db.models.fields.IntegerField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'src': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'the_geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'yea': ('django.db.models.fields.IntegerField', [], {})
        }
    }

    complete_apps = ['ghec_viewer']
