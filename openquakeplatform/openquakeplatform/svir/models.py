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


class Data(models.Model):
    # TODO: json contianing the data
    pass


class Metadata(models.Model):
    # TODO: json contianing the metadata
    pass


class Comment(models.Model):
    # user = TODO: add reference to the user who writes the comment
    # timestamp = TODO: when the comment has been saved
    body = models.CharField(max_length=1024)
    pass
