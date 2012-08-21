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

from django.conf.urls.defaults import *

urlpatterns = patterns('geonode.observations.views',
   (r'^obsform/edit/(?P<observation_id>\d+)/summary_id/(?P<summary_id>\d+)$',
        'edit'),
   (r'^obsform/new/summary_id/(?P<summary_id>\d+)$',
        'new'),
   (r'^observations/', include('observations.urls')),
)
