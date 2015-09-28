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


def _get_iso_and_name_for_all_countries():
    """
    Get iso and name for each of the countries for which at least one study
    is present in the DB
    """
    # NOTE: this approach is OK only because we know that we always have
    #       at least one study for each nation. If this were not the case
    #       we would have to do a
    #       SELECT DISTINCT(iso) FROM ged2.geographic_region_gadm.
    query = """\
SELECT iso, name
FROM ged2.gadm_country
ORDER BY name;
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()

    return results


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
    results = cursor.fetchall()
    cursor.close()

    return results


def _get_all_studies():
    """
    Get GED studies for all national levels
    Records will be in the format:
    iso, num_l1_studies, study_id, country_name, study_name, has_nonres
    """
    query = """\
SELECT
  iq.iso, iq.num_studies, iq.num_l1_names, iq.num_l2_names,
  iq.study_id, iq.g0name AS country_name,
  -- Construct sensible study name
  CASE WHEN s2.notes LIKE '%%PAGER%%'
        THEN 'PAGER national study'
        ELSE s2.name
  END AS study_name,
  -- Only PAGER studies have non residential data
  s2.notes LIKE '%%PAGER%%' AS has_nonres
  FROM (
     SELECT
            grg.g0name,
            s.id AS study_id,
            grg.iso,
            COUNT(sr.id) AS num_studies,
            -- Number of Distinct Admin 1 names != NOT necessarily studies,
            -- if Admin 2 studies are present

            COUNT(DISTINCT(grg.g1name)) AS num_l1_names,

            -- Number of Admin 2 names - need to include Parent to hand
            -- Use || rather than , since NULL,NULL is not NULL and
            -- so count > 0
            COUNT(grg.g1name||grg.g2name) AS num_l2_names

       FROM ged2.geographic_region_gadm grg
       JOIN ged2.study_region sr
         ON sr.geographic_region_id=grg.region_id
       JOIN ged2.study s ON s.id=sr.study_id
      -- Filter out a couple of studies that will likely be removed
      WHERE s.id NOT IN (447,449,257)
      GROUP BY grg.g0name, s.id, grg.iso
      ORDER BY g0name
  ) iq  -- inner query
  JOIN ged2.study s2 ON s2.id=iq.study_id
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()

    return results


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
    results = cursor.fetchall()
    cursor.close()

    return results


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
    cursor.close()
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
    results = cursor.fetchall()
    cursor.close()

    return results


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
    cursor.close()
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
    cursor.close()
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
SELECT DISTINCT
    ON (replace_cost_per_area_currency, taxonomy_name, taxonomy_version)
       replace_cost_per_area_currency, taxonomy_name, taxonomy_version
  FROM ged2.study_region sr
  JOIN ged2.distribution_group dg
    ON dg.study_region_id=sr.id
 WHERE sr.id=%s
   AND occupancy_id=%s;
"""
    cursor = connections['geddb'].cursor()
    cursor.execute(query, [sr_id, occupancy])
    results = cursor.fetchone()
    cursor.close()

    return results
