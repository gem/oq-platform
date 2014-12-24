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


from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import url
from django.views.generic import TemplateView
from openquakeplatform.exposure.views import (validate_export,
                                              get_country_list,
                                              get_geographic_regions_by_iso,
                                              get_all_studies,
                                              get_studies_by_country,
                                              export_fractions_by_study_region_id,
                                              get_study_region_info,
                                              export_exposure)


urlpatterns = patterns(
    'geonode.exposure.views',
    url(r'^$', TemplateView.as_view(
        template_name="exposure/export.html"), name='exposure'),
    url(r'^exposure_old', TemplateView.as_view(
        template_name="exposure/export_old.html"), name='exposure_old'),


    url(r'^validate_export', validate_export),
    url(r'^get_country_list', get_country_list),
    url(r'^get_geographic_regions_by_iso', get_geographic_regions_by_iso),
    url(r'^get_all_studies', get_all_studies),
    url(r'^get_studies_by_country', get_studies_by_country),
    url(r'^export_fractions_by_study_region_id',
        export_fractions_by_study_region_id),
    url(r'^get_study_region_info', get_study_region_info),
    url(r'^export_exposure', export_exposure),
)
