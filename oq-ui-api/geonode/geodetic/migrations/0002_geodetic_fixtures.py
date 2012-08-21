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
        # This was the old stratagy for loading the fixtures using Django 1.2
        # from django.core.management import call_command
        #call_command("loaddata", "geodetic_fixtures.json")
        pass
    
    def backwards(self, orm):
        "Write your backwards methods here."
    
    models = {
        'geodetic.geodetic': {
            'Meta': {'object_name': 'Geodetic'},
            'cc_xx_xy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'cc_xx_yy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'cc_yy_xy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'exx': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'principal_exx': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'exy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'eyy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'principal_eyy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'second_inv': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'gid': ('django.db.models.fields.IntegerField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'lon': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'the_geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'var_exx': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'var_exy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'var_eyy': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'x_azimuth': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        }
    }
    
    complete_apps = ['geodetic']
