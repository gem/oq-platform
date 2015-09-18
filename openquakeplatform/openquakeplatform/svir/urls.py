# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2014, GEM Foundation.
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


from django.conf.urls import patterns, include, url
from openquakeplatform.svir.views import (list_themes,
                                          list_subthemes_by_theme,
                                          export_variables_info,
                                          export_variables_data,
                                          export_countries_info,
                                          get_layer_metadata_url,
                                          add_project_definition,
                                          get_project_definitions,
                                          get_supplemental_information,
                                          )

from django.contrib import admin
admin.autodiscover()


urlpatterns = patterns(
    'openquakeplatform.svir.views',
    url(r'^list_themes', list_themes),
    url(r'^list_subthemes_by_theme', list_subthemes_by_theme),
    url(r'^export_variables_info', export_variables_info),
    # export_variables_data_by_ids has been renamed; the following line
    # is to avoid breaking clients using the old API
    url(r'^export_variables_data_by_ids', export_variables_data),
    url(r'^export_variables_data', export_variables_data),
    url(r'^export_countries_info', export_countries_info),
    url(r'^get_layer_metadata_url', get_layer_metadata_url),
    url(r'^add_project_definition', add_project_definition),
    url(r'^get_project_definitions', get_project_definitions),
    url(r'^get_supplemental_information', get_supplemental_information),
)
