# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2010-2013, GEM Foundation.
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

from django.conf.urls.defaults import *
from exposure.forms import ExposureAdmin0, ExposureAdmin1, ExposureAdmin2, ExposureAdmin3, ExposureAdmin4, ExposureAdmin5, ExposureTOD
from exposure.views import exposure_form, exposure_form2


urlpatterns = patterns('geonode.exposure.views',
			url(r'wizard1', exposure_form),
			url(r'wizard2', exposure_form2),
                       (r'^population.json', 'read_pop'),
)
