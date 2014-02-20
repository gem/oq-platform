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
from django.http import HttpResponse

SIGN_IN_REQUIRED = ('You must be signed into the OpenQuake Platform to use '
                    'this feature.')


class allowed_methods(object):
    def __init__(self, methods):
        self.methods = methods

    def __call__(self, func):
        def wrapped(request):
            if not request.method in self.methods:
                return HttpResponse(status=405)
            else:
                return func(request)
        return wrapped


def sign_in_required(func):
    """
    View decorator. This can be used as an alternative to
    `django.contrib.auth.decorators.login_required`, but the function is
    distinctly different.

    Instead of immediately redirecting to a login URL, simply return a 401
    ("Unauthorized") and let the client figure out what to do with it. If the
    client then wants to authenticate to allow the wrapped view to be used, it
    needs to have some intimate knowledge of the server application in order to
    do so.

    In this way, the wrapped view can be used a bit more generically by any
    client (and not just a Django application).
    """
    def wrapped(request):
        if not request.user.is_authenticated():
            return HttpResponse(content=SIGN_IN_REQUIRED,
                                content_type="text/plain",
                                status=401)
        else:
            return func(request)
    return wrapped


#: Convert a Python list (containing numbers, such as record IDs as integers)
#: to the format required for a SQL query.
num_list_to_sql_array = lambda a_list: (
    '(' + ', '.join(str(x) for x in a_list) + ')'
)


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


def _get_sv_data_by_indices(indices):
    """
    For each country, retrieve iso, country_name and a variable number of
    columns corresponding to the values of the social vulnerability indices
    selected by the user

    :param indices: a string of comma-separated index names
    """
    query = """\
SELECT iso, country_name, %s
FROM svir.svir_national
ORDER BY iso;
""" % indices
    cursor = connections['geddb'].cursor()
    cursor.execute(query)

    return cursor.fetchall()
