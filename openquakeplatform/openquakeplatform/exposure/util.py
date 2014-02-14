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


def _get_available_admin_levels(lng1, lat1, lng2, lat2):
    """
    Given a geographical bounding box, get the admin levels for which there is
    grid data.

    :returns:
        A list containing any or none of the following values: [0, 1, 2, 3],
        representing admin 0 (national) and admin 1, 2, and 3 (sub-national),
        respectively.
    """
    query = """
SELECT BOOL_AND(a0) as has_a0,
       BOOL_AND(a1) AS has_a1,
       BOOL_AND(a2) AS has_a2,
       BOOL_AND(a3) AS has_a3
FROM (
    SELECT gr0.id IS NOT NULL as a0,
           gr1.id IS NOT NULL AS a1,
           gr2.id IS NOT NULL AS a2,
           gr3.id IS NOT NULL AS a3
      FROM ged2.grid_point grid
      LEFT JOIN ged2.geographic_region gr0
        ON gr0.gadm_country_id=grid.gadm_country_id
      LEFT JOIN ged2.geographic_region gr1
        ON gr1.gadm_admin_1_id=grid.gadm_admin_1_id
      LEFT JOIN ged2.geographic_region gr2
        ON gr2.gadm_admin_2_id=grid.gadm_admin_2_id
      LEFT JOIN ged2.geographic_region gr3
        ON gr3.gadm_admin_3_id=grid.gadm_admin_3_id
     WHERE grid.the_geom && ST_MakeEnvelope
        (%s, %s, %s, %s, 4326)
) inner_query
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query, [lng1, lat1, lng2, lat2])

    [admin_level_bools] = cursor.fetchall()
    admin_levels = [i for i, b in enumerate(admin_level_bools) if b]
    return admin_levels


def _get_national_exposure(lng1, lat1, lng2, lat2, tod, occupancy):
    """
    :param lng1, lat1, lng2, lat2:
        Lat/lon of the selected bounding box.
    :param tod_select:
        'day', 'night', 'transit', 'all', or 'off'
    :param occupancy:
        List. [0], [1], or [0, 1]. 0 represents residential, 1 represents
        non-residential.
    """
    tod_map = {
        'day': 'pop_alloc.day_pop_ratio',
        'night': 'pop_alloc.night_pop_ratio',
        'transit': 'pop_alloc.transit_pop_ratio',
    }
    query = """\
SELECT
    grid_point.id,
    ST_X(grid_point.the_geom) AS lon,
    ST_Y(grid_point.the_geom) AS lat,
    grid_point.pop_value,
    grid_point.gadm_country_id,
    gadm_country.iso,
    dist_group.study_region_id,
    dist_value.building_type,
    dist_value.dwelling_fraction,
    %(day)s as day_pop_ratio,
    %(night)s as night_pop_ratio,
    %(transit)s as transit_pop_ratio
FROM ged2.grid_point AS grid_point

JOIN ged2.gadm_country AS gadm_country
    ON grid_point.gadm_country_id = gadm_country.id
JOIN ged2.geographic_region AS geo_region
    ON geo_region.gadm_country_id = grid_point.gadm_country_id
JOIN ged2.pop_allocation AS pop_alloc
    ON pop_alloc.geographic_region_id = geo_region.id
JOIN ged2.study_region AS study_region
    ON study_region.geographic_region_id = geo_region.id
JOIN ged2.distribution_group AS dist_group
    ON dist_group.study_region_id = study_region.id
JOIN ged2.distribution_value AS dist_value
    ON dist_value.distribution_group_id = dist_group.id

WHERE
    grid_point.pop_value > 0
    AND ST_intersects(ST_MakeEnvelope(%%s, %%s, %%s, %%s, 4326),
                      grid_point.the_geom)
    AND grid_point.is_urban = pop_alloc.is_urban
    AND grid_point.is_urban = dist_group.is_urban
    AND dist_group.occupancy_id IN %(occ)s
    AND pop_alloc.occupancy_id IN %(occ)s
ORDER BY grid_point.id
"""
    args = dict(day='NULL', night='NULL', transit='NULL',
                occ=num_list_to_sql_array(occupancy))
    if tod == 'day':
        args['day'] = tod_map['day']
    elif tod == 'night':
        args['night'] = tod_map['night']
    elif tod == 'transit':
        args['transit'] = tod_map['transit']
    elif tod == 'all':
        args['day'] = tod_map['day']
        args['night'] = tod_map['night']
        args['transit'] = tod_map['transit']

    query %= args
    cursor = connections['geddb'].cursor()
    cursor.execute(query, [lng1, lat1, lng2, lat2])

    return cursor.fetchall()


def _get_subnational_exposure(lng1, lat1, lng2, lat2, occupancy, admin_level):
    """
    :param lng1, lat1, lng2, lat2:
        Lat/lon of the selected bounding box.
    :param occupancy:
        List. [0], [1], or [0, 1]. 0 represents residential, 1 represents
        non-residential.
    :param admin_level:
        'admin1', 'admin2', or 'admin3'
    """
    admin_level_column_map = {
        'admin1': 'gadm_admin_1_id',
        'admin2': 'gadm_admin_2_id',
        'admin3': 'gadm_admin_3_id',
    }

    query = """\
SELECT
    grid_point.id,
    ST_X(grid_point.the_geom) AS lon,
    ST_Y(grid_point.the_geom) AS lat,
    grid_point.pop_value,
    grid_point.%(admin_level_id)s,
    gadm_country.iso,
    dist_group.study_region_id,
    dist_value.building_type,
    dist_value.dwelling_fraction
FROM ged2.grid_point AS grid_point

JOIN ged2.gadm_country AS gadm_country
    ON grid_point.gadm_country_id = gadm_country.id
JOIN ged2.geographic_region AS geo_region
    ON geo_region.%(admin_level_id)s = grid_point.%(admin_level_id)s
JOIN ged2.study_region AS study_region
    ON study_region.geographic_region_id = geo_region.id
JOIN ged2.distribution_group AS dist_group
    ON dist_group.study_region_id = study_region.id
JOIN ged2.distribution_value AS dist_value
    ON dist_value.distribution_group_id = dist_group.id

WHERE
    grid_point.pop_value > 0
    AND ST_intersects(ST_MakeEnvelope(%%s, %%s, %%s, %%s, 4326),
                      grid_point.the_geom)
    AND grid_point.is_urban = dist_group.is_urban
    AND dist_group.occupancy_id IN %(occ)s
ORDER BY grid_point.id
"""
    query %= dict(admin_level_id=admin_level_column_map.get(admin_level),
                  occ=num_list_to_sql_array(occupancy))
    cursor = connections['geddb'].cursor()
    cursor.execute(query, [lng1, lat1, lng2, lat2])

    return cursor.fetchall()


def _get_population_exposure(lng1, lat1, lng2, lat2):
    """
    Get population-only exposure data (no building/taxonomy information).

    :param lng1, lat1, lng2, lat2:
        Bounding box coordinates.
    """
    query = """\
SELECT
    grid_point.id,
    ST_X(grid_point.the_geom) AS lon,
    ST_Y(grid_point.the_geom) AS lat,
    grid_point.pop_value,
    gadm_country.iso
FROM ged2.grid_point AS grid_point

JOIN ged2.gadm_country AS gadm_country
    ON grid_point.gadm_country_id = gadm_country.id

WHERE
    grid_point.pop_value > 0
    AND ST_intersects(ST_MakeEnvelope(%s, %s, %s, %s, 4326),
                      grid_point.the_geom)
ORDER BY grid_point.id;
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query, [lng1, lat1, lng2, lat2])

    return cursor.fetchall()


def _get_sv_themes():
    """
    Get all the dinstinct themes from table svir.column_info
    """
    query = "SELECT DISTINCT theme FROM svir.column_info"
    cursor = connections['geddb'].cursor()
    cursor.execute(query)

    return cursor.fetchall()
