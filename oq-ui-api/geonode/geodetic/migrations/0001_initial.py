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
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):
    
    def forwards(self, orm):
        
        # Adding model 'Geodetic'
        db.create_table('geodetic_geodetic', (
            ('gid', self.gf('django.db.models.fields.IntegerField')()),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('lat', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('lon', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('exx', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('eyy', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('exy', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('var_exx', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('var_exy', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('var_eyy', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('cc_xx_yy', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('cc_xx_xy', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('cc_yy_xy', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('x_azimuth', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('principal_exx', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('principal_eyy', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('second_inv', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('the_geom', self.gf('django.contrib.gis.db.models.fields.PointField')(dim=2)),
            ))
        db.send_create_signal('geodetic', ['Geodetic'])
    
    
    def backwards(self, orm):
        
        # Deleting model 'Geodetic'
        db.delete_table('geodetic_geodetic')
    
    
    models = {
        'geodetic.geodetic': {
            'Meta': {'object_name': 'Geodetic'},
            'gid': ('django.db.models.fields.IntegerField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'lon': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'exx': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'eyy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'exy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'var_exx': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'var_eyy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'var_exy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'cc_xx_yy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'cc_xx_xy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'cc_yy_xy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'x_azimuth': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'principal_exx': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'principal_eyy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'second_inv': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'the_geom': ('django.contrib.gis.db.models.fields.PointField', [], {'dim': '2'})
        }
    }
    
    complete_apps = ['geodetic']
