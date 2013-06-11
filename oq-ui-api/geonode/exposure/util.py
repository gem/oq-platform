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


def exec_query(cursor, query, *args):
    """
    Helper function for executing DB queries.

    Makes testing and mocking easier.
    """
    cursor.execute(query, args)
    return cursor.fetchall()


def _get_admin_level_ids_region_ids(lng1, lat1, lng2, lat2, admin_level_col):
    """
    Query the GED database and get all of the admin level IDs and region IDs
    for the bouding box given by the input coordinates.

    :param lng1, lat1, lng2, lat2:
        Longitude and latitude values of the user selected bounding box.
    :param str admin_level_col:
        Valid values are 'gadm_country_id', 'gadm_admin_1_id',
        'gadm_admin_2_id', 'gadm_admin_3_id'

        This determines which column is selected from `ged2.grid_point`.
    """
    cursor = connections['geddb'].cursor()
    cursor.execute("""
        SELECT country.admin_level_id, geo.id AS geographic_region_id
        FROM (
            SELECT DISTINCT %(admin_level_col)s AS admin_level_id
            FROM ged2.grid_point grid
            WHERE ST_intersects(ST_MakeEnvelope(%(lng1)s, %(lat1)s,
                                                %(lng2)s, %(lat2)s, 4326),
                                grid.the_geom)
        ) country
        JOIN ged2.geographic_region geo
            ON country.admin_level_id=geo.%(admin_level_col)s
        """ % dict(admin_level_col=admin_level_col,
                   lng1=lng1,
                   lat1=lat1,
                   lng2=lng2,
                   lat2=lat2))

    country_reg_codes = cursor.fetchall()
    admin_level_ids = [r[0] for r in country_reg_codes]
    region_ids = [r[1] for r in country_reg_codes]
    return admin_level_ids, region_ids


def _get_dwelling_fractions(admin_level_ids, occupancy, admin_level_col):
    """
    For the given country codes, return a table (2d list) of the following::

        * building_type
        * dwelling_fraction
        * study_region_id
        * gadm_country_id (same as ``admin_level_ids``)
        * region_id
        * dist_group.is_urban

    :param list occupancy:
        List containing 0, 1, or both (indicating 0=residential,
        1=non-residential).
    :param str admin_level_col:
        Valid values are 'gadm_country_id', 'gadm_admin_1_id',
        'gadm_admin_2_id', 'gadm_admin_3_id'

        This determines which column is selected from `ged2.geographic_region`.
    """
    cursor = connections['geddb'].cursor()
    cursor.execute("""
        SELECT
            dist_value.building_type,
            dist_value.dwelling_fraction,
            dist_group.study_region_id,
            geo_region.%(admin_level_col)s,
            geo_region.id,
            dist_group.is_urban
        FROM ged2.geographic_region as geo_region
        JOIN ged2.study_region AS study_region
            ON study_region.geographic_region_id = geo_region.id
        JOIN ged2.distribution_group AS dist_group
            ON dist_group.study_region_id = study_region.id
        JOIN ged2.distribution_value AS dist_value
            ON dist_value.distribution_group_id = dist_group.id
        WHERE
            geo_region.%(admin_level_col)s IN %(admin_level_ids)s
            AND dist_group.occupancy_id IN %(occupancy_ids)s
        ORDER BY geo_region.%(admin_level_col)s;
        """
        % dict(admin_level_col=admin_level_col,
               admin_level_ids=num_list_to_sql_array(admin_level_ids),
               occupancy_ids=num_list_to_sql_array(occupancy)))

    df_table = cursor.fetchall()
    return df_table


def _get_reg_codes_pop_ratios(region_ids, tod, occupancy):
    """
    :param list region_ids:
        List of GADM region codes (as ints).
    :param tod:
        Possible values are::

            * 'day'
            * 'night'
            * 'transit'
            * 'all'
            * 'off' (pop ratio is 1)

    :param list occupancy:
        List containing 0, 1, or both (indicating 0=residential,
        1=non-residential).
    :returns:
        A list of 2-tuples containing (region_code, pop_ratio).
    """
    cursor = connections['geddb'].cursor()
    query = """
        SELECT
            geographic_region_id AS region_code,
            %(pop_ratio_column)s AS pop_ratio,
            is_urban
        FROM ged2.pop_allocation
        WHERE geographic_region_id IN %%s
        AND occupancy_id IN %%s
    """
    if tod not in ('day', 'night', 'transit', 'all', 'off'):
        msg = ("Invalid time of day: '%s'. Expected 'day', 'night', 'transit',"
               " 'all', or 'off'")
        msg %= tod
        raise ValueError(msg)

    if tod == 'off':
        # pop_ratio is hard-coded to 1 for each region code
        query %= {'pop_ratio_column': '1'}
    elif tod == 'all':
        query %= {
            'pop_ratio_column': ('(day_pop_ratio + night_pop_ratio + '
                                 'transit_pop_ratio)')}
    elif tod in ('day', 'night', 'transit'):
        # otherwise, query the database for the population ratio
        # select the correct pop ratio column, depending on the ``tod``
        tod_column_map = {
            'day': 'day_pop_ratio',
            'night': 'night_pop_ratio',
            'transit': 'transit_pop_ratio',
        }
        query %= dict(pop_ratio_column=tod_column_map[tod])

    reg_codes_pop_ratios = exec_query(
        cursor,
        query % (num_list_to_sql_array(region_ids),
                 num_list_to_sql_array(occupancy))
    )
    return reg_codes_pop_ratios


def _get_pop_table(lng1, lat1, lng2, lat2, admin_level_table):
    """
    Given the lon/lat of a bounding box, query the following data from the GED
    DB::

        * admin_level_id
        * pop_value
        * the_geom
        * iso
        * longitude
        * latitude
        * is_urban

    :param str admin_level_table:
        Valid values are 'gadm_country', 'gadm_admin_1', 'gadm_admin_2',
        'gadm_admin_3'.
    """
    cursor = connections['geddb'].cursor()
    query = """
        SELECT
            grid.%(admin_level_table)s_id,
            grid.pop_value,
            grid.id,
            gadm.iso,
            ST_X(grid.the_geom),
            ST_Y(grid.the_geom),
            grid.is_urban
        FROM ged2.grid_point grid
        JOIN ged2.%(admin_level_table)s gadm ON gadm.id=grid.%(admin_level_table)s_id
        WHERE ST_intersects(ST_MakeEnvelope(%(lng1)s, %(lat1)s,
                                            %(lng2)s, %(lat2)s, 4326),
                            grid.the_geom)
    """ % dict(admin_level_table=admin_level_table,
               lng1=lng1,
               lat1=lat1,
               lng2=lng2,
               lat2=lat2)
    cursor.execute(query)

    pop_table = cursor.fetchall()
    return pop_table
