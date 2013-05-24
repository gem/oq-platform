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
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.views.decorators.http import condition
from django.db import connections
from forms import ExposureExportForm
from django.shortcuts import render_to_response


@csrf_exempt
def get_exposure_export_form(request):
    #debug*******
    #import pdb; pdb.set_trace()
    #debug*******

    if request.method == 'POST':
        # get the lat long variables from the client
        lat1 = request.POST['lat1']
        lng1 = request.POST['lng1']
        lat2 = request.POST['lat2']
        lng2 = request.POST['lng2']
        #form = ExposureForm()

        #find all the admin levels available inside bounding box
        cursor = connections['geddb'].cursor()
        cursor.execute("""
            SELECT
            MIN(
            CASE
            WHEN gadm_admin_3_id IS NOT NULL THEN 3
            WHEN gadm_admin_2_id IS NOT NULL THEN 2
            WHEN gadm_admin_1_id IS NOT NULL THEN 1
            ELSE 0
            END)
            FROM ged2.grid_point WHERE the_geom && ST_MakeEnvelope
                (%s, %s, %s, %s, 4326);""", [lng1, lat1, lng2, lat2])
        admin_level_flag = cursor.fetchall()

        result = []

        #print some stfuff
                #html = '<html><body>%s</body></html>'
        #return HttpResponse(html % test_table)

        admin_level = admin_level_flag[0][0]

        # Make sure it is a valid admin admin level.
        # If not, respond with an 'error' message.
        # (Valid values are 0-5)
        if not admin_level in range(6):
            html = ('<html><body>'
                    'Your request cannot be processed.'
                    ' Invalid admin level %s.'
                    '</body></html>' % admin_level)
            return HttpResponse(html)

        # if the admin level is okay, display the admin level selection form
        form = ExposureExportForm(highest_admin_level=admin_level)
        return render_to_response('exposure-export-wizard-1.html',
                                  {'exposure_form': form,
                                   'lat1': lat1,
                                   'lng1': lng1,
                                   'lat2': lat2,
                                   'lng2': lng2},
                                  context_instance=RequestContext(request))
    else:
        html = '<html><body>Not implemented</body></html>'
        return HttpResponse(html)


#disabling etag for streaming
@condition(etag_func=None)
def export_exposure(request):
    # output_type = request.GET['output_type']
    # TODO: from request.GET, get:
    #  * 'outputype'
    #  * 'residential'
    #  * 'timeofday'
    #  * 'adminlevel'

    content_disp = None
    mimetype = None
    output_type = request.GET['outputType']

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
    # possible values are 'res', 'non-res', or 'both'
    res_select = request.GET['residential']
    tod_select = request.GET['timeOfDay']
    admin_select = request.GET['adminLevel']
    lat1 = request.GET['lat1']
    lng1 = request.GET['lng1']
    lat2 = request.GET['lat2']
    lng2 = request.GET['lng2']

    if res_select == 'res':
        occupancy = [0]
    elif res_select == 'non-res':
        occupancy = [1]
    else:
        # assume that it's 'both'
        occupancy = [0, 1]

    if output_type not in ('csv', 'nrml'):
        raise RuntimeError(
            "Unrecognized output type '%s', only 'nrml' and 'csv' are "
            "supported" % output_type
        )

    cursor = connections['geddb'].cursor()
    cursor.execute("""
        SELECT country.gadm_country_id, geo.id AS geographic_region_id
        FROM (
            SELECT DISTINCT gadm_country_id
            FROM ged2.grid_point grid
            JOIN ged2.gadm_country gadm ON gadm.id=grid.gadm_country_id
            WHERE ST_intersects(ST_MakeEnvelope(%s, %s, %s, %s, 4326),
                                grid.the_geom)
        ) country
        JOIN ged2.geographic_region geo
            ON country.gadm_country_id=geo.gadm_country_id
        """, [lng1, lat1, lng2, lat2])

    country_reg_codes = cursor.fetchall()
    country_codes = [r[0] for r in country_reg_codes]
    region_codes = [r[1] for r in country_reg_codes]

    ccStr = ', '.join(str(e) for e in country_codes)

    #get the dwelling fractions table
    cursor.execute("""
        SELECT
        dv.building_type, dv.dwelling_fraction, dg.is_urban, dg.occupancy_id,
            dg.study_region_id, geo.id AS geo_id
        FROM ged2.geographic_region geo
        JOIN ged2.study_region sr ON sr.geographic_region_id=geo.id
        JOIN ged2.study s ON s.id=sr.study_id
        JOIN ged2.distribution_group dg ON dg.study_region_id=sr.id
        JOIN ged2.distribution_value dv ON dv.distribution_group_id=dg.id
        WHERE geo.gadm_country_id IN (%s)
        AND dg.occupancy_id=0 AND dg.is_urban;""", [country_codes])

    df_table = cursor.fetchall()

    #get the time of day table
    #TODO make the geographic_region_id dynamic
    cursor.execute("""
        SELECT night_pop_ratio FROM ged2.pop_allocation WHERE
            geographic_region_id IN = (%s)
            AND is_urban
            AND occupancy_id IN (%s);
    """, [', '.join(region_codes),
          ', '.join(occupancy)])

    tod_table = cursor.fetchall()

    result = []

    #get the population table
    cursor.execute("""
        SELECT grid.gadm_country_id, grid.is_urban, grid.pop_value,
            grid.the_geom, gadm.iso, ST_X(grid.the_geom), ST_Y(grid.the_geom)
        FROM ged2.grid_point grid
        JOIN ged2.gadm2 gadm ON gadm.id_0=grid.gadm_country_id
        WHERE grid.gadm_country_id IN (%s);""", [country_codes])

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
        yield ('ISO, pop_calculated_value, pop_cell_ID, lon, lat, '
               'study_region, gadm country id, GEM taxonomy')
        yield "\n"

        # csv exposure table
        for pop in cursor.fetchall():
            pop_gadm_country_id = pop[0]
            pop_value = pop[2]
            pop_grid_id = pop[3]
            pop_iso = pop[4]
            pop_lat = pop[5]
            pop_lon = pop[6]
            for tod in tod_table:
                tod_night_pop_ratio = tod[0]
                for df in df_table:
                    df_building_type = df[0]
                    df_dwelling_fraction = df[1]
                    df_is_urban = df[2]
                    df_study_region = df[4]
                    if pop_gadm_country_id == df_gadm_country_id:
                        yield ",".join([
                            str(pop_iso),
                            str(pop_value * tod_night_pop_ratio
                                * df_dwelling_fraction),
                            str(pop_grid_id),
                            str(pop_lon),
                            str(pop_lat),
                            str(df_study_region),
                            str(country_codes), str(df_building_type)
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
            pop_value = pop[2]
            pop_grid_id = pop[3]
            pop_iso = pop[4]
            pop_lat = pop[5]
            pop_lon = pop[6]
            for tod in tod_table:
                tod_night_pop_ratio = tod[0]
                for df in df_table:
                    df_building_type = df[0]
                    df_dwelling_fraction = df[1]
                    df_is_urban = df[2]
                    df_study_region = df[4]
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
                             pop_value * tod_night_pop_ratio * df_is_urban,
                             df_building_type))
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
