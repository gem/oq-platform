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
from openquakeplatform.icebox.views import get_artifact
from openquakeplatform.icebox.views import get_artifact_group
from openquakeplatform.icebox.views import import_artifacts
from openquakeplatform.icebox.views import list_artifact_groups
from openquakeplatform.icebox.views import list_artifacts


urlpatterns = patterns(
    'geonode.icebox.views',
    # TODO(LB): Used named urls.
    # See https://github.com/gem/oq-platform/pull/98#discussion_r6825031
    url(r'^artifacts/$', list_artifacts),
    url(r'^artifact/(\d+)/$', get_artifact),
    url(r'^artifacts/import/$', import_artifacts),
    url(r'^artifact_groups/$', list_artifact_groups),
    url(r'^artifact_group/(\d+)/$', get_artifact_group),
)
