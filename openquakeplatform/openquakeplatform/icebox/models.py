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


from django.contrib.gis.db import models
from django.contrib.auth.models import User


class Artifact(models.Model):
    user = models.ForeignKey(User)
    artifact_type = models.TextField(
        help_text=('Indicates the type of artifact ("hazard_curve", '
                   '"loss_map", etc.')
    )
    name = models.TextField(help_text='Name of the artifact')
    artifact_data = models.TextField(
        help_text='Raw artifact data, as a text blob'
    )
    content_type = models.TextField(
        help_text='Content type (xml, geojson, csv, etc.'
    )


class ArtifactGroup(models.Model):
    user = models.ForeignKey(User)
    group_type = models.TextField(
        help_text=('Indicates the type of artifact group ("map", '
                   '"calculation", etc.)')
    )
    name = models.TextField(help_text='Name of the artifact group')


class ArtifactGroupLink(models.Model):
    artifact = models.ForeignKey('Artifact')
    artifact_group = models.ForeignKey('ArtifactGroup')
