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
from exposure import forms
from exposure import util
from django.shortcuts import render_to_response

COPYRIGHT_HEADER = """\
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
"""

CSV_HEADER = ('ISO, pop_calculated_value, pop_cell_ID, lon, lat, '
              'study_region, gadm level id, GEM taxonomy\n')

XML_HEADER = "<?xml version='1.0' encoding='utf-8'?> \n"

NRML_HEADER = """
<nrml xmlns="http://openquake.org/xmlns/nrml/0.4"
      xmlns:gml="http://www.opengis.net/gml">
    <exposureModel gml:id="ep">
        <exposureList gml:id="exposure" assetCategory="population">
            <gml:description>Source: OQP exposure export tool</gml:description>
"""

NRML_ASSET_FMT = """
                <assetDefinition gml:id=%s_%s>
                    <site>
                        <gml:Point srsName="epsg:4326">
                            <gml:pos>%s %s</gml:pos>
                        </mgl:Point>
                    </site>
                    <number>%s</number>
                    <taxonomy>%s</taxonomy>
                </assetDefinition>"""

NRML_FOOTER = """
        </exposureList>
    </exposureModel>
</nrml>\n"""

ADMIN_LEVEL_TO_COLUMN_MAP = {
    'admin0': 'gadm_country_id',
    'admin1': 'gadm_admin_1_id',
    'admin2': 'gadm_admin_2_id',
    'admin3': 'gadm_admin_3_id',
}


@csrf_exempt
def get_exposure_export_form(request):
    if not request.method == 'GET':
        # "Method not allowed"
        return HttpResponse(status=405)
    else:
        # get the lat long variables from the client
        lat1 = request.GET['lat1']
        lng1 = request.GET['lng1']
        lat2 = request.GET['lat2']
        lng2 = request.GET['lng2']

        #find all the admin levels available inside bounding box
        cursor = connections['geddb'].cursor()
        # Get the lowest admin level (0, 1, 2, or 3) which is common to all
        # grid points in the selected area:
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
        form = forms.ExposureExportForm(highest_admin_level=admin_level)
        return render_to_response('oq-platform2/exposure-export-wizard-1.html',
                                  {'exposure_form': form,
                                   'lat1': lat1,
                                   'lng1': lng1,
                                   'lat2': lat2,
                                   'lng2': lng2},
                                  context_instance=RequestContext(request))


#disabling etag for streaming
@condition(etag_func=None)
def export_exposure(request):
    """
    Perform a streaming export of the requested exposure data.

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing the
        following parameters::

            * 'outputType' ('csv' or 'nrml')
            * 'timeOfDay' ('day', 'night', 'transit', 'all', 'off')
            * 'adminLevel' ('admin0', 'admin1', 'admin2', or 'admin3')
            * 'lng1'
            * 'lat1'
            * 'lng2'
            * 'lat2'
    """
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
        raise ValueError(
            "Unrecognized output type '%s', only 'nrml' and 'csv' are "
            "supported" % output_type
        )

    # build the response object
    response_data = stream_response_generator(request, output_type)
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    return response


def _asset_generator(pop_table, reg_codes_pop_ratios, df_table):
    """
    A helper function which implements the looping logic for contructing
    assets.

    Generates tuples of the following information (each datum as a string)::

        * ISO
        * Calculated population value (taking into account dwelling fraction
          and popluation ratio, based on the time of day)
        * Population cell ID
        * Longitude
        * Latitude
        * Study Region ID
        * GADM Country ID
        * GEM Taxonomy

    :param pop_table:
        Population data. See :func:`exposure.util._get_pop_table`.
    :param reg_codes_pop_ratios:
        Region codes and population ratios. See
        :func:`exposure.util._get_reg_codes_pop_ratios`.
    :param df_table:
        Dwelling fraction data. See
        :func:`exposure.util._get_dwelling_fractions`.
    """
    for pop in pop_table:
        pop_admin_level_id = pop[0]
        pop_value = pop[1]
        pop_grid_id = pop[2]
        pop_iso = pop[3]
        pop_lat = pop[4]
        pop_lon = pop[5]
        pop_is_urban = pop[6]
        for reg_code, pop_ratio, is_urban in reg_codes_pop_ratios:
            for df in df_table:
                df_building_type = df[0]
                df_dwelling_fraction = df[1]
                df_study_region = df[2]
                df_admin_level_id = df[3]
                df_region_id = df[4]
                df_is_urban = df[5]

                # only generate asset results for the current region_id and
                # country_id, to avoid writing out incorrect/extra data
                if (df_region_id == reg_code
                        and df_admin_level_id == pop_admin_level_id
                        and pop_is_urban == is_urban
                        and df_is_urban == is_urban):
                    asset = (pop_iso,
                             (pop_value * pop_ratio * df_dwelling_fraction),
                             pop_grid_id,
                             pop_lon,
                             pop_lat,
                             df_study_region,
                             df_admin_level_id,
                             df_building_type)
                    yield tuple([str(x) for x in asset])


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
        raise ValueError(
            "Unrecognized output type '%s', only 'nrml' and 'csv' are "
            "supported" % output_type
        )

    # possible values are 'res', 'non-res', or 'both'
    res_select = request.GET['residential']
    tod_select = request.GET['timeOfDay']
    admin_select = request.GET['adminLevel']
    lng1 = request.GET['lng1']
    lat1 = request.GET['lat1']
    lng2 = request.GET['lng2']
    lat2 = request.GET['lat2']

    admin_level_col = ADMIN_LEVEL_TO_COLUMN_MAP.get(admin_select)
    if admin_level_col is None:
        msg = ("Invalid 'adminLevel' selection: '%s'."
               " Expected 'admin0', 'admin1', 'admin2', or 'admin3'."
               % admin_select)
        raise ValueError(msg)

    if res_select == 'res':
        occupancy = [0]
    elif res_select == 'non-res':
        occupancy = [1]
    elif res_select == 'both':
        occupancy = [0, 1]
    else:
        msg = ("Invalid 'residential' selection: '%s'."
               " Expected 'res', 'non-res', or 'both'."
               % res_select)
        raise ValueError(msg)

    admin_level_ids, region_ids = util._get_admin_level_ids_region_ids(
        lng1, lat1, lng2, lat2, admin_level_col
    )

    # Get all of the data we need for the loops below:
    pop_table = util._get_pop_table(lng1, lat1, lng2, lat2, admin_level_col)
    reg_codes_pop_ratios = util._get_reg_codes_pop_ratios(
        region_ids, tod_select, occupancy
    )
    df_table = util._get_dwelling_fractions(
        admin_level_ids, occupancy, admin_level_col
    )

    if output_type == "csv":
        # export csv
        # export copyright
        copyright = copyright_csv(COPYRIGHT_HEADER)
        yield copyright

        # csv header
        yield CSV_HEADER

        # csv exposure table
        for asset in _asset_generator(pop_table, reg_codes_pop_ratios,
                                      df_table):
            yield '%s\n' % ','.join(asset)

    elif output_type == "nrml":
        # export nrml
        # nrml header
        copyright = copyright_nrml(COPYRIGHT_HEADER)
        yield XML_HEADER
        yield copyright
        yield NRML_HEADER

        for (_, pop_value, pop_grid_id, pop_lon, pop_lat, _, _,
            df_building_type) in _asset_generator(pop_table,
                                                  reg_codes_pop_ratios,
                                                  df_table):
            asset = NRML_ASSET_FMT % (
                pop_grid_id, df_building_type,
                pop_lon, pop_lat,
                pop_value, df_building_type
            )
            yield '%s' % asset
        # finalize the document:
        yield NRML_FOOTER


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines)


def copyright_nrml(cr_text):
    return '<!-- \n%s\n -->' % cr_text
