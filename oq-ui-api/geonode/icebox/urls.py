# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2013, GEM Foundation.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.

from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import url
from icebox.views import list_results
from icebox.views import get_result
from icebox.views import import_results


urlpatterns = patterns(
    'geonode.icebox.views',
    url(r'^results$', list_results),
    url(r'^result/(\d+)$', get_result),
    url(r'^results/import$', import_results),
)
