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

from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt, csrf_response_exempt
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseBadRequest
from django.contrib.contenttypes.models import ContentType
from django.utils import simplejson
from django.views.decorators.http import condition
from django.db import connections
from django.http import HttpResponse
from django.shortcuts import render_to_response

import cStringIO as StringIO
import csv
import time

#disabling etag for streaming
@condition(etag_func=None)
def read_pop(request):

    output_type = request.GET['output_type']

    content_disp = None
    mimetype = None

    if output_type == "csv":
        content_disp = 'attachment; filename="exposure_export.csv"'
        mimetype = 'text/csv'
    elif output_type == "nrml":
        content_disp = 'attachment; filename="exposure_export.xml"'
        mimetype = 'text/plain'
    else:
        raise RuntimeError(
            "Unrecognized output type '%s', only 'nrml' and 'csv' are "
            "supported" % output_type
        )

    # build the response object
    response_data = stream_response_generator(request, output_type)
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    return response


def stream_response_generator(request, output_type):
    """
    Stream exposure/population data from the database into a file of the
    specified ``output_type``.

    :param request:
        A :class:`django.http.request.HttpRequest` object.
    :param str output_type:
        A string indicating the desired output type. Valid values are 'csv'
        and 'nrml' (XML).
    """
    if output_type not in ('csv', 'nrml'):
        raise RuntimeError(
            "Unrecognized output type '%s', only 'nrml' and 'csv' are "
            "supported" % output_type
        )

    # get the lat long variables from the client
    lat1 = request.GET['lat1']
    lng1 = request.GET['lng1']
    lat2 = request.GET['lat2']
    lng2 = request.GET['lng2']

    #get the dwelling fractions table
    cursor = connections['geddb'].cursor()
    cursor.execute("""
	SELECT dv.dwelling_fraction, dg.is_urban, dg.occupancy_id, dg.study_region_id, 
 	    geo.gadm_country_id, geo.id AS geo_id, dv.building_type
	FROM ged2.geographic_region geo 
	JOIN ged2.study_region sr ON sr.geographic_region_id=geo.id
	JOIN ged2.study s ON s.id=sr.study_id
	JOIN ged2.distribution_group dg ON dg.study_region_id=sr.id
	JOIN ged2.distribution_value dv ON dv.distribution_group_id=dg.id
	WHERE geo.gadm_country_id IN (
	    SELECT DISTINCT gadm_country_id
	    FROM ged2.grid_point grid
	    JOIN ged2.gadm_country gadm ON gadm.id=grid.gadm_country_id
	    WHERE ST_intersects(ST_MakeEnvelope(%s, %s, %s, %s, 4326),grid.the_geom))
 	AND dg.occupancy_id=0 AND dg.is_urban;""", [lng1, lat1, lng2, lat2])

    df_table = cursor.fetchall()

    #get the time of day table
    #TODO make the geographic_region_id dynamic
    cursor.execute("""
	SELECT night_pop_ratio FROM ged2.pop_allocation 
	WHERE geographic_region_id = 65
	AND is_urban AND occupancy_id=0""")

    tod_table = cursor.fetchall()

    result = []

    #get the population table
    cursor.execute("""
	SELECT grid.gadm_country_id, grid.the_geom, ST_X(grid.the_geom), 
	ST_Y(grid.the_geom), grid.pop_value, grid.is_urban, gadm.iso, grid.id
	FROM ged2.grid_point grid
	JOIN ged2.gadm_country gadm ON gadm.id=grid.gadm_country_id
	WHERE ST_intersects(ST_MakeEnvelope(%s, %s, %s, %s, 4326),grid.the_geom)
	;""", [lng1, lat1, lng2, lat2])

    copyright_text = '''\
 Version 1.0 released on 31.01.2013

 Copyright (C) 2013 GEM Foundation

 Contributions by: see http://www.globalquakemodel.org/contributors

 You may use this work under the terms of the CC-BY-NC-SA 3.0 (unported)
 [http://creativecommons.org/licenses/by-nc-sa/3.0/]

 THE WORK IS PROTECTED BY COPYRIGHT AND/OR OTHER APPLICABLE LAW. INSOFAR
 AS THIS WORK IS PROTECTED BY LAWS THAT NEIGHBOUR OR ARE SIMILARLY RELATED
 TO COPYRIGHT, SUCH AS DATABASE RIGHTS AS INTRODUCED IN EUROPE BY THE
 DIRECTIVE 96/9/EC, YOU ALSO MAY USE THIS WORK UNDER THE TERMS OF
 CC-BY-NC-SA 3.0 (unported).
 [http://creativecommons.org/licenses/by-nc-sa/3.0/]

 ANY USE OF THE WORK OTHER THAN AS AUTHORIZED UNDER THIS LICENSE OR
 DIRECTLY ALLOWED BY THE APPLICABLE LAW IS PROHIBITED.

 If you have any questions or if you wish to seek permission to use this
 data beyond what is offered by CC-BY-NC-SA 3.0 (unported), please contact
 the GEM Foundation at: licensing@globalquakemodel.org

 More information on licensing: http://www.globalquakemodel.org/licensing\n
'''


    if output_type == "csv":
        # export csv
        # export copyright
        copyright = copyright_csv(copyright_text)
        yield copyright

        # csv header
        yield '''ISO, pop_calculated_value, pop_cell_ID, lon, lat, study_region, gadm country id, GEM taxonomy'''
        yield "\n"

        # csv exposure table
	for pop in cursor.fetchall():
            pop_gadm_country_id = pop[0]
            pop_lat = pop[2]
            pop_lon = pop[3]
            pop_value = pop[4]
            pop_iso = pop[6]
            pop_grid_id = pop[7]
            for tod in tod_table:
                tod_night_pop_ratio = tod[0]
                for df in df_table:
                    df_dwelling_fraction = df[0]
                    df_is_urban = df[1]
                    df_study_region = df[3]
                    df_gadm_country_id = df[4]
                    df_geo = df[5]
                    df_building_type = df[6]
                    if pop_gadm_country_id == df_gadm_country_id:
                        yield ",".join([
                            str(pop_iso),
                            str(pop_value * tod_night_pop_ratio * df_dwelling_fraction),
                            str(pop_grid_id), str(pop_lon), str(pop_lat), str(df_study_region),
                            str(df_gadm_country_id), str(df_building_type)
                        ])
                        yield "\n"


    elif output_type == "nrml":
        # export nrml
        # nrml header
        copyright = copyright_nrml(copyright_text)
        yield "<?xml version='1.0' encoding='utf-8'?> \n"
        yield copyright
        yield '''
<nrml xmlns="http://openquake.org/xmlns/nrml/0.4"
      xmlns:gml="http://www.opengis.net/gml>\n'''

        # nrml exposure file
        for pop in cursor.fetchall():
            pop_gadm_country_id = pop[0]
            pop_lat = pop[2]
            pop_lon = pop[3]
            pop_value = pop[4]
            pop_iso = pop[6]
            pop_grid_id = pop[7]
            for tod in tod_table:
                tod_night_pop_ratio = tod[0]
                for df in df_table:
                    df_dwelling_fraction = df[0]
                    df_is_urban = df[1]
                    df_study_region = df[3]
                    df_gadm_country_id = df[4]
                    df_geo = df[5]
                    df_building_type = df[6]
                    if pop_gadm_country_id == df_gadm_country_id:
                        yield ('''\
    <exposureModel gml:id="ep">
        <exposureList gml:id="exposure" assetCategory="population">
            <gml:description>Source: OQP exposure export tool</gml:description>
                <assetDefinition gml:id=%s_%s>
                    <site>
                        <gml:Point srsName="epsg:4326">
                            <gml:pos>%s %s</gml:pos>
                        </mgl:Point>
                    </site>
                    <number>%s</number>
                    <taxonomy>%s</taxonomy>
                </assetDefinition>
        </exposureList>
    </exposureModel>\n''' % (pop_grid_id, df_building_type, pop_lon, pop_lat,
                             pop_value * tod_night_pop_ratio * df_is_urban, df_building_type))
        # for loop ends here
        # finalize the document:
        yield "</nrml>\n"


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines)


def copyright_nrml(cr_text):
    return '<!-- \n%s\n -->' % cr_text
