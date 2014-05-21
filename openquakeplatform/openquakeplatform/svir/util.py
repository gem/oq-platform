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
# along with this program.
# If not, see <https://www.gnu.org/licenses/agpl.html>.

from django.db import connections


def _get_sv_themes():
    """
    Get all the dinstinct themes from table svir.column_info
    """
    query = "SELECT DISTINCT theme FROM svir.column_info ORDER BY theme;"
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    return cursor.fetchall()


def _get_sv_subthemes(theme):
    """
    Given a theme, get all its dinstinct subthemes

    :param theme: theme selected by the user
    """
    query = """\
SELECT DISTINCT subtheme
FROM svir.column_info
WHERE theme='%s'
ORDER BY subtheme;
""" % theme
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    return cursor.fetchall()


def _get_sv_tags(theme, subtheme):
    """
    Given a theme and a subtheme, get all the corresponding dinstinct tags

    :param theme: theme selected by the user
    :param subtheme: subtheme selected by the user
    """
    query = """\
SELECT DISTINCT tag
FROM svir.column_info
WHERE theme='%s' AND subtheme='%s'
ORDER BY tag;
""" % (theme, subtheme)
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    return cursor.fetchall()


def _get_sv_ids_and_names(theme, subtheme, tag):
    """
    Given a theme, a subtheme and a tag, get all corresponding distinct names

    :param theme: theme selected by the user
    :param subtheme: subtheme selected by the user
    :param tag: tab selected by the user
    """
    query = """\
SELECT id, name
FROM svir.column_info
WHERE theme='%s' AND subtheme='%s' AND tag='%s'
ORDER BY name;
""" % (theme, subtheme, tag)
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    return cursor.fetchall()


def _get_sv_data_by_variables_ids(sv_variables_ids):
    """
    For each country, retrieve iso, country_name and a number of
    columns corresponding to the social vulnerability variables
    selected by the user

    :param sv_variables_ids: a string of comma-separated ids of social
                             vulnerability variables
    """
    id_list = sv_variables_ids.split(',')
    id_list = ['n.' + index.strip() for index in id_list]
    id_str = ",".join(id_list)
    query = """\
SELECT
    n.iso, n.country_name, %s, ST_AsText(p.the_geom)
FROM
    svir.world_poly as p,
    svir.svir_national as n
WHERE
    n.iso = p.gadm_iso
ORDER BY n.iso;
""" % id_str
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    return cursor.fetchall()
