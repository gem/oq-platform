# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

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

from django.contrib.gis.db import models


class Geodetic(models.Model):
    gid = models.IntegerField()
    lat = models.FloatField(null=True, blank=True)
    lon = models.FloatField(null=True, blank=True)
    exx = models.FloatField(null=True, blank=True)
    eyy = models.FloatField(null=True, blank=True)
    exy = models.FloatField(null=True, blank=True)
    var_exx = models.FloatField(null=True, blank=True)
    var_eyy = models.FloatField(null=True, blank=True)
    var_exy = models.FloatField(null=True, blank=True)
    cc_xx_yy = models.FloatField(null=True, blank=True)
    cc_xx_xy = models.FloatField(null=True, blank=True)
    cc_yy_xy = models.FloatField(null=True, blank=True)
    x_azimuth = models.FloatField(null=True, blank=True)
    principal_exx = models.FloatField(null=True, blank=True)
    principal_eyy = models.FloatField(null=True, blank=True)
    second_inv = models.FloatField(null=True, blank=True)
    the_geom = models.PointField(srid=4326, dim=2)

