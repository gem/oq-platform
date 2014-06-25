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
#    You should have received a copy of the GNU Affero General Public
#    License along with this program. If not, see
#    <https://www.gnu.org/licenses/agpl.html>.


# from django.conf.urls.defaults import patterns
# from django.conf.urls.defaults import url
from django.conf.urls import patterns, include, url
from openquakeplatform.svir.views import export_sv_category_names
from openquakeplatform.svir.views import export_sv_data_by_variables_ids
from openquakeplatform.svir.views import (create_project,
                                          upload_project_definition,
                                          upload_project_data)

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()


urlpatterns = patterns(
    'geonode.svir.views',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^export_sv_category_names', export_sv_category_names),
    url(r'^export_sv_data_by_variables_ids', export_sv_data_by_variables_ids),
    url(r'^create_project', create_project),
    url(r'^upload_project_data', upload_project_data),
    url(r'^upload_project_definition', upload_project_definition),
)
