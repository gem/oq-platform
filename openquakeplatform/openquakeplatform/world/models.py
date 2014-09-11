# Copyright (c) 2012-2013, GEM Foundation.
#
# This program is free software: you can redistribute it and/or modify
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

from django.contrib.gis.db import models
# from django.db import models


class CustomRegion(models.Model):
    name = models.CharField(max_length=50)
    countries = models.ManyToManyField('Country')


class Country(models.Model):
    class Meta:
        verbose_name_plural = "countries"

    name = models.CharField(max_length=150)
    iso = models.CharField(max_length=6)
    # the_geom = models.GeometryField(srid=4326, dim=2, null=True, blank=True)
    # is_visible = models.BooleanField(default=True)

    def __unicode__(self):
        return '%s (%s)' % (self.name, self.iso)

    class Meta:
        managed = False
        db_table = u'gadm_countries'
