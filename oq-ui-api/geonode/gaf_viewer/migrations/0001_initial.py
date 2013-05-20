# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding model 'Measure'
        db.create_table('gaf_viewer_measure', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('src_id', self.gf('django.db.models.fields.IntegerField')(default=-1)),
            ('the_geom', self.gf('django.contrib.gis.db.models.fields.LineStringField')(null=True, blank=True)),
            ('accuracy', self.gf('django.db.models.fields.IntegerField')(default=-1, null=True, blank=True)),
            ('ns_neotectonic_section_id', self.gf('django.db.models.fields.IntegerField')()),
            ('ns_fault_summary_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ns_average_dip', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_is_active', self.gf('django.db.models.fields.NullBooleanField')(null=True, blank=True)),
            ('ns_is_episodic', self.gf('django.db.models.fields.NullBooleanField')(null=True, blank=True)),
            ('ns_surface_dip', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_name', self.gf('django.db.models.fields.CharField')(default='', max_length=96, null=True, blank=True)),
            ('ns_aseismic_slip_factor', self.gf('django.db.models.fields.DecimalField')(max_digits=3, decimal_places=2)),
            ('ns_compiler_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ns_completion_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ns_contributor_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ns_dip_dir', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ns_disp', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_downthrown_side_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ns_last_movement', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_length', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_lower_sm_depth', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_recurrence_interval', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_net_slip_rate', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_slip_type_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ns_strike', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ns_strike_slip_rate', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_upper_sm_depth', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_vert_slip_rate', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('ns_created_date', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
            ('ns_modified_date', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
            ('fs_fault_summary_id', self.gf('django.db.models.fields.IntegerField')()),
            ('fs_aseismic_slip_factor', self.gf('django.db.models.fields.DecimalField')(max_digits=3, decimal_places=2)),
            ('fs_compiler_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('fs_completion_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('fs_contributor_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('fs_average_dip', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('fs_dip_dir', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('fs_displacement', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('fs_downthrown_side_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('fs_is_active', self.gf('django.db.models.fields.NullBooleanField')(null=True, blank=True)),
            ('fs_is_episodic', self.gf('django.db.models.fields.NullBooleanField')(null=True, blank=True)),
            ('fs_is_section_summary', self.gf('django.db.models.fields.NullBooleanField')(null=True, blank=True)),
            ('fs_last_movement', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('fs_length', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('fs_lower_sm_depth', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('fs_name', self.gf('django.db.models.fields.CharField')(default='', max_length=96, null=True, blank=True)),
            ('fs_recurrence_interval', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('fs_strike_slip_rate', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('fs_slip_type_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('fs_strike', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('fs_upper_sm_depth', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('fs_created_date', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
            ('fs_modified_date', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
            ('fs_net_slip_rate', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('fs_vert_slip_rate', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
            ('slip_type', self.gf('django.db.models.fields.CharField')(default='', max_length=64, null=True, blank=True)),
        ))
        db.send_create_signal('gaf_viewer', ['Measure'])


    def backwards(self, orm):
        
        # Deleting model 'Measure'
        db.delete_table('gaf_viewer_measure')


    models = {
        'gaf_viewer.measure': {
            'Meta': {'object_name': 'Measure'},
            'accuracy': ('django.db.models.fields.IntegerField', [], {'default': '-1', 'null': 'True', 'blank': 'True'}),
            'fs_aseismic_slip_factor': ('django.db.models.fields.DecimalField', [], {'max_digits': '3', 'decimal_places': '2'}),
            'fs_average_dip': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'fs_compiler_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fs_completion_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fs_contributor_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fs_created_date': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'fs_dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fs_displacement': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'fs_downthrown_side_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fs_fault_summary_id': ('django.db.models.fields.IntegerField', [], {}),
            'fs_is_active': ('django.db.models.fields.NullBooleanField', [], {'null': 'True', 'blank': 'True'}),
            'fs_is_episodic': ('django.db.models.fields.NullBooleanField', [], {'null': 'True', 'blank': 'True'}),
            'fs_is_section_summary': ('django.db.models.fields.NullBooleanField', [], {'null': 'True', 'blank': 'True'}),
            'fs_last_movement': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'fs_length': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'fs_lower_sm_depth': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'fs_modified_date': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'fs_name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '96', 'null': 'True', 'blank': 'True'}),
            'fs_net_slip_rate': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'fs_recurrence_interval': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'fs_slip_type_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fs_strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'fs_strike_slip_rate': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'fs_upper_sm_depth': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'fs_vert_slip_rate': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'ns_aseismic_slip_factor': ('django.db.models.fields.DecimalField', [], {'max_digits': '3', 'decimal_places': '2'}),
            'ns_average_dip': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_compiler_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ns_completion_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ns_contributor_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ns_created_date': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'ns_dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ns_disp': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_downthrown_side_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ns_fault_summary_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ns_is_active': ('django.db.models.fields.NullBooleanField', [], {'null': 'True', 'blank': 'True'}),
            'ns_is_episodic': ('django.db.models.fields.NullBooleanField', [], {'null': 'True', 'blank': 'True'}),
            'ns_last_movement': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_length': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_lower_sm_depth': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_modified_date': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'ns_name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '96', 'null': 'True', 'blank': 'True'}),
            'ns_neotectonic_section_id': ('django.db.models.fields.IntegerField', [], {}),
            'ns_net_slip_rate': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_recurrence_interval': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_slip_type_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ns_strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'ns_strike_slip_rate': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_surface_dip': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_upper_sm_depth': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'ns_vert_slip_rate': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '64', 'null': 'True', 'blank': 'True'}),
            'src_id': ('django.db.models.fields.IntegerField', [], {'default': '-1'}),
            'the_geom': ('django.contrib.gis.db.models.fields.LineStringField', [], {'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['gaf_viewer']
