# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2014, GEM Foundation.
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


from django.contrib.gis.db import models
from fields import DictField

CH_MAX = 256


class Project(models.Model):
    name = models.CharField(max_length=CH_MAX)
    description = models.CharField(max_length=CH_MAX)
    data = DictField(blank=True, null=True)
    metadata = DictField(blank=True, null=True)

    def __unicode__(self):
        return self.name


class Comment(models.Model):
    project = models.ForeignKey('Project')
    user = models.ForeignKey('auth.User')  # FIXME Check if the reference is ok
    # auto_now_add=True ==> Automatically set the field to now when
    #                       the object is first created
    # (auto_now would set the field to now every time the object is saved)
    created = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=1024)
    parent_comment = models.ForeignKey('Comment', blank=True, null=True)

    def __unicode__(self):
        return self.body
