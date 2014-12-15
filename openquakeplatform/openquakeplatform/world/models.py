# Copyright (c) 2014, GEM Foundation.
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


class CountrySimplified1000M(models.Model):
    # gid = models.IntegerField(primary_key=True)
    # id_0 = models.IntegerField(null=True, blank=True)
    # iso = models.CharField(max_length=3, blank=True)
    iso = models.CharField(max_length=3, primary_key=True)
    name_0 = models.CharField(max_length=75, blank=True)
    the_geom = models.MultiPolygonField(null=True, blank=True)
    # objects = models.GeoManager()

    class Meta:
        # NOTE: We might decide to set managed = False
        # managed = False
        db_table = 'gadm_countries_simplified_1000m'
        verbose_name_plural = "countries simplified (1000m tolerance)"

    def __unicode__(self):
        return '%s (%s)' % (self.name_0, self.iso)


class Country(models.Model):
    class Meta:
        managed = False
        db_table = 'gadm_country_geom'
        verbose_name_plural = "countries"

    # name = models.CharField(max_length=150)
    # iso = models.CharField(max_length=3, primary_key=True)
    # the_geom = models.GeometryField(srid=4326, dim=2, null=True, blank=True)
    # is_visible = models.BooleanField(default=True)

    gid = models.IntegerField(primary_key=True)
    id_0 = models.IntegerField(null=True, blank=True)
    iso = models.CharField(max_length=3, blank=True)
    name_engli = models.CharField(max_length=50, blank=True)
    name_iso = models.CharField(max_length=54, blank=True)
    name_fao = models.CharField(max_length=50, blank=True)
    name_local = models.CharField(max_length=54, blank=True)
    name_obsol = models.CharField(max_length=150, blank=True)
    name_varia = models.CharField(max_length=160, blank=True)
    name_nonla = models.CharField(max_length=50, blank=True)
    name_frenc = models.CharField(max_length=50, blank=True)
    name_spani = models.CharField(max_length=50, blank=True)
    name_russi = models.CharField(max_length=50, blank=True)
    name_arabi = models.CharField(max_length=50, blank=True)
    name_chine = models.CharField(max_length=50, blank=True)
    waspartof = models.CharField(max_length=100, blank=True)
    contains = models.CharField(max_length=50, blank=True)
    sovereign = models.CharField(max_length=40, blank=True)
    iso2 = models.CharField(max_length=4, blank=True)
    www = models.CharField(max_length=2, blank=True)
    fips = models.CharField(max_length=6, blank=True)
    ison = models.DecimalField(null=True, max_digits=65535,
                               decimal_places=65535, blank=True)
    validfr = models.CharField(max_length=12, blank=True)
    validto = models.CharField(max_length=10, blank=True)
    eumember = models.DecimalField(null=True, max_digits=65535,
                                   decimal_places=65535, blank=True)
    the_geom = models.GeometryField(srid=4326, dim=2, null=True, blank=True)

    def __unicode__(self):
        return '%s (%s)' % (self.name_engli, self.iso)
