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
# You should have received a copy of the GNU Affero General Public
# License along with this program. If not, see
# <https://www.gnu.org/licenses/agpl.html>.

from django.contrib.auth.decorators import login_required
from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import url
from django.views.generic import TemplateView
from openquakeplatform.icebox import views


urlpatterns = patterns(
    'geonode.icebox.views',
    url(r'^$', login_required(TemplateView.as_view(
        template_name="icebox.html")), name="icebox"),
    url(r'^calculations$', login_required(views.CalculationsView.as_view()),
        name="calculations"),
    url(r'^outputs$', login_required(views.OutputsView.as_view()),
        name="outputs"),
    url(r'^download/input/(?P<calculation_type>\S+)/(?P<pk>\d+)$',
        login_required(views.input_download), name="input_download"),
    url(r'^calculation/(?P<pk>\d+)$', views.CalculationView.as_view(),
        name="calculation"),
    url(r'^remove_calculation/(?P<pk>\d+)$',
        login_required(views.remove_calculation), name="remove_calculation")
)
