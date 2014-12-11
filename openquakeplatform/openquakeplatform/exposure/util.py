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


def _get_iso_and_name_for_all_countries():
    """
    Get iso and name for each of the countries for which at least one study
    is present in the DB
    """
    query = """\
SELECT iso, name
FROM ged2.gadm_country
ORDER BY name;
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query)

    return cursor.fetchall()


def _get_geographic_region_id_and_name_by_iso(iso):
    """
    Get the geographic_region's id and name for a given iso code
    :param iso: ISO code of a country
    """
    query = """\
SELECT region_id AS geographic_region_id, g1name, g2name, g3name
FROM ged2.geographic_region_gadm
WHERE iso=%s
ORDER BY g1name, g2name, g3name;
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query, [iso])

    return cursor.fetchall()


def _get_all_studies():
    """
    Get GED studies for all national levels
    Records will be in the format:
    iso, num_l1_studies, study_id, country_name, study_name, has_nonres
    """
    query = """\
SELECT
  iq.iso, iq.num_l1_studies, iq.study_id, iq.g0name AS country_name,
  -- Construct sensible study name
  CASE WHEN s2.notes LIKE '%%PAGER%%'
        THEN 'PAGER national study'
        ELSE s2.name
  END AS study_name,
  -- Only PAGER studies have non residential data
  s2.notes LIKE '%%PAGER%%' AS has_nonres
  FROM (
        -- List of countries with number of sub-national studies
        SELECT grg.g0name, s.id AS study_id,
               grg.iso, COUNT(sr.id) AS num_l1_studies
          FROM ged2.geographic_region_gadm grg
          JOIN ged2.study_region sr
            ON sr.geographic_region_id=grg.region_id
          JOIN ged2.study s ON s.id=sr.study_id
         -- Filter out a couple of studies that will likely be removed
         WHERE s.id NOT IN (447,449)
         GROUP BY grg.g0name, s.id, grg.iso ORDER BY g0name
   ) iq  -- inner query
   JOIN ged2.study s2 ON s2.id=iq.study_id
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    return cursor.fetchall()


def _get_studies_by_country(iso, level_filter, study_filter):
    """
    Get GED studies for the country having the provided ISO code
    If level_filter is not specified, all studies are retrieved
    Otherwise, if level_filter is 'national' or 'subnational',
    only national or only subnational studies are retrieved.
    The output includes grid counts and bounding boxes.
    """
    if level_filter is None:
        query_filter = ""  # Get all studies
    elif level_filter == 'national':
        query_filter = "\n AND grg.g1name IS NULL\n"
    elif level_filter == 'subnational':
        query_filter = "\n AND grg.g1name IS NOT NULL\n"
    else:
        raise ValueError('level_filter ' + level_filter + 'is not implemented')
    if study_filter is not None:
        try:
            study_filter = float(study_filter)  # This also escapes the value
            query_filter += "\n AND s.id = %s\n" % study_filter
        except ValueError:
            raise
    query = """\
SELECT
  -- Study Region ID (NOT geo region ID)
  sr.id AS study_region_id,
  -- grg.g0name,
  grg.g1name, grg.g2name, grg.g3name,
  -- sensible study name
  CASE WHEN s.notes LIKE '%%PAGER%%'
        THEN 'PAGER national study'
        ELSE s.name
  END AS study_name,
  -- Only PAGER studies hav non residential data
  s.notes LIKE '%%PAGER%%' AS has_nonres,
  gr.tot_pop, gr.tot_grid_count,
  -- Corners of bounding box - null if grid_count==0
  ST_XMin(bounding_box) AS xmin, ST_YMin(bounding_box) AS ymin,
  ST_XMax(bounding_box) AS xmax, ST_YMax(bounding_box) AS ymax
  FROM ged2.geographic_region_gadm grg
  JOIN ged2.study_region sr
    ON sr.geographic_region_id=grg.region_id
  JOIN ged2.study s
    ON s.id=sr.study_id
  JOIN ged2.geographic_region gr
    ON gr.id=sr.geographic_region_id
 WHERE grg.iso=%s{}
 ORDER BY sr.id
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query.format(query_filter), [iso])

    return cursor.fetchall()


def _stream_fractions_by_study_region_id(sr_id):
    """
    FIXME Missing docstring

    """
    query = """\
SELECT
  -- sr.id AS sr_id,
  -- grg.iso,grg.g0name,grg.g1name,grg.g2name,grg.g3name,
  dg.is_urban, (dg.occupancy_id=0) AS is_residential,
  dv.building_type, building_fraction, dwelling_fraction,
  replace_cost_per_area, avg_dwelling_per_build, avg_floor_area
  FROM ged2.study_region sr
  JOIN ged2.distribution_group dg
    ON dg.study_region_id=sr.id
  JOIN ged2.distribution_value dv
    ON dv.distribution_group_id = dg.id
  JOIN ged2.geographic_region_gadm grg
    ON grg.region_id=sr.geographic_region_id
 WHERE sr.id=%s
   -- Residential = 0, non-res=1
    -- AND dg.occupancy_id=0 AND dg.is_urban
  ORDER BY dg.id
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query, [sr_id])
    column_names = tuple(description[0] for description in cursor.description)
    is_first_iteration = True
    while True:
        if is_first_iteration:
            is_first_iteration = False
            yield column_names
        else:
            row = cursor.fetchone()
            if row is None:
                break
            yield row
    return


def _get_study_region_info(sr_id):
    """
    Retrieve total population, total grid count and bounding box for
    a study region, provided the study region id
    """
    query = """\
SELECT gr.tot_pop, gr.tot_grid_count, ST_AsText(gr.bounding_box)
  FROM ged2.study_region sr
  JOIN ged2.geographic_region gr
    ON gr.id=sr.geographic_region_id
 WHERE sr.id=%s
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query, [sr_id])

    return cursor.fetchall()


def _stream_exposure_by_sr_id(sr_id, occupancy=0):
    """
    Generator exporting the exposure, given a study region id
    Return fields: grid_id,lon,lat,bldg_type,occ_type,is_urban,
                   dwelling_fraction,bldg_fraction,type_pop,
                   day_pop,night_pop,transit_pop,bldg_count,
                   bldg_count_quality,bldg_area,bldg_area_quality,
                   bldg_cost,bldg_cost_quality
    """
    query = \
        "SELECT * FROM ged2.build_study_region_retrec(%s,%s)" % (sr_id,
                                                                         occupancy)
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    column_names = tuple(description[0] for description in cursor.description)
    is_first_iteration = True
    while True:
        if is_first_iteration:
            is_first_iteration = False
            yield column_names
        else:
            row = cursor.fetchone()
            if row is None:
                break
            yield row
    return


def _stream_exposure_by_bb_and_sr_id(
        lng1, lat1, lng2, lat2, sr_id, occupancy=0):
    """
    Generator exporting the exposure, given a bounding box and a study region id
    Return fields: grid_id,lon,lat,bldg_type,occ_type,is_urban,
                   dwelling_fraction,bldg_fraction,type_pop,
                   day_pop,night_pop,transit_pop,bldg_count,
                   bldg_count_quality,bldg_area,bldg_area_quality,
                   bldg_cost,bldg_cost_quality
    """
    query = \
        "SELECT * FROM ged2.build_study_region_retrec_bb(%s,%s,%s,%s,%s,%s)" % (
            lng1, lat1, lng2, lat2, sr_id, occupancy)
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    column_names = tuple(description[0] for description in cursor.description)
    is_first_iteration = True
    while True:
        if is_first_iteration:
            is_first_iteration = False
            yield column_names
        else:
            row = cursor.fetchone()
            if row is None:
                break
            yield row
    return


def _get_currency_and_taxonomy_name(sr_id, occupancy=0):
    """
    Given a study region id and an occupancy code (0 is the default, for
    'residential', 1 stands for 'non-residential), get the currency name
    and the taxonomy name, as a tuple
    """
    # NOTE: There could be ambiguity in case rural and urban are not consistent
    #       i.e., there are different currencies, or different taxonomies, for
    #       the same study
    query = """\
SELECT DISTINCT ON (replace_cost_per_area_currency, taxonomy_name)
       replace_cost_per_area_currency, taxonomy_name
  FROM ged2.study_region sr
  JOIN ged2.distribution_group dg
    ON dg.study_region_id=sr.id
 WHERE sr.id=%s
   AND occupancy_id=%s;
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query, [sr_id, occupancy])

    return cursor.fetchone()
