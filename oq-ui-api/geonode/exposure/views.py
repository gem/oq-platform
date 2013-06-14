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
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import condition

from exposure import forms
from exposure import util

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

BLDG_CSV_HEADER = ('ISO, pop_calculated_value, pop_cell_ID, lon, lat, '
                   'study_region, gadm_level_id, GEM_taxonomy\n')
POP_CSV_HEADER = ('ISO, population_value, pop_cell_ID, lon, lat\n')

XML_HEADER = "<?xml version='1.0' encoding='utf-8'?> \n"

NRML_HEADER = """
<nrml xmlns="http://openquake.org/xmlns/nrml/0.4"
      xmlns:gml="http://www.opengis.net/gml">
    <exposureModel gml:id="ep">
        <exposureList gml:id="exposure" assetCategory="population">
            <gml:description>Source: OQP exposure export tool</gml:description>
"""

NRML_ASSET_FMT = """
                <assetDefinition gml:id=%(gml_id)s>
                    <site>
                        <gml:Point>
                            <gml:pos>%(lon)s %(lat)s</gml:pos>
                        </gml:Point>
                    </site>
                    <number>%(pop)s</number>
                    <taxonomy>%(tax)s</taxonomy>
                </assetDefinition>"""

NRML_FOOTER = """
        </exposureList>
    </exposureModel>
</nrml>\n"""

#: The maximum bounding box area which can be exported.
MAX_EXPORT_AREA_SQ_DEG = 4  # 2 * 2 degrees, for example


@csrf_exempt
@util.allowed_methods(('GET', ))
@util.sign_in_required
def get_exposure_building_form(request):
    # get the lat long variables from the client
    lat1 = request.GET['lat1']
    lng1 = request.GET['lng1']
    lat2 = request.GET['lat2']
    lng2 = request.GET['lng2']

    valid, error = _export_area_valid(lat1, lng1, lat2, lng2)
    if not valid:
        return HttpResponse(content=error,
                            content_type="text/html",
                            status=403)

    admin_levels = util._get_available_admin_levels(lng1, lat1, lng2, lat2)

    if not admin_levels:
        # There is no grid data for any admin level; this can happen if, for
        # example, the bounding box is drawn over the ocean somewhere.
        return HttpResponse(status=204)

    # if the admin level is okay, display the admin level selection form
    form = forms.BuildingExposureForm(admin_levels=admin_levels)
    return render_to_response('oq-platform2/exposure_building_form.html',
                              {'exposure_form': form,
                               'lat1': lat1,
                               'lng1': lng1,
                               'lat2': lat2,
                               'lng2': lng2},
                              context_instance=RequestContext(request))


@csrf_exempt
@util.allowed_methods(('GET', ))
@util.sign_in_required
def get_exposure_population_form(request):
    lat1 = request.GET['lat1']
    lng1 = request.GET['lng1']
    lat2 = request.GET['lat2']
    lng2 = request.GET['lng2']

    valid, error = _export_area_valid(lat1, lng1, lat2, lng2)
    if not valid:
        return HttpResponse(content=error,
                            content_type="text/html",
                            status=403)

    else:
        form = forms.PopulationExposureForm()
        return render_to_response('oq-platform2/exposure_population_form.html',
                              {'exposure_form': form,
                               'lat1': lat1,
                               'lng1': lng1,
                               'lat2': lat2,
                               'lng2': lng2},
                              context_instance=RequestContext(request))


def _export_area_valid(lat1, lng1, lat2, lng2):
    """
    Simple validation to check the bounding box size.

    If the area is too large, return False and an error message.
    Else, (True, '').
    """
    width = abs(float(lng2) - float(lng1))
    height = abs(float(lat2) - float(lat1))
    area = width * height
    if area > MAX_EXPORT_AREA_SQ_DEG:
        msg = (
            'Bounding box (lat1=%(lat1)s, lng1=%(lng1)s),'
            ' (lat2=%(lat2)s, lng2=%(lng2)s) exceeds the max allowed size.'
            '<br />Selected area: %(area)s square degrees.'
            '<br />Max allowed selection area: %(max_area)s square degrees.'
        )
        msg %= dict(lat1=lat1, lng1=lng1, lat2=lat2, lng2=lng2,
                    area=area, max_area=MAX_EXPORT_AREA_SQ_DEG)
        return False, msg
    return True, ''


def validate_export(request):
    """
    Check that the given export parameters are okay, and if the export should
    be allowed.

    At the moment, we just check that the selected area is not too large to
    export. If the area is too large, throw back a 403 response (forbidden).
    Otherwise, return a 200 (OK).
    """
    lat1 = request.GET['lat1']
    lng1 = request.GET['lng1']
    lat2 = request.GET['lat2']
    lng2 = request.GET['lng2']

    valid, error = _export_area_valid(lat1, lng1, lat2, lng2)
    if not valid:
        return HttpResponse(content=error,
                            content_type="text/html",
                            status=403)
    else:
        return HttpResponse(
            content='Export is allowed with the given parameters'
        )


@condition(etag_func=None)
@util.allowed_methods(('GET', ))
@util.sign_in_required
def export_building(request):
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
    lng1 = request.GET['lng1']
    lat1 = request.GET['lat1']
    lng2 = request.GET['lng2']
    lat2 = request.GET['lat2']

    valid, error = _export_area_valid(lat1, lng1, lat2, lng2)
    if not valid:
        return HttpResponse(content=error,
                            content_type="text/html",
                            status=403)

    output_type = request.GET['outputType']
    content_disp = None
    mimetype = None

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

    response_data = _stream_building_exposure(request, output_type)
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    return response


@condition(etag_func=None)
@util.allowed_methods(('GET', ))
@util.sign_in_required
def export_population(request):
    """
    Perform a streaming export of the requested exposure data.

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing the
        following parameters::

            * 'outputType' ('csv' or 'nrml')
            * 'lng1'
            * 'lat1'
            * 'lng2'
            * 'lat2'
    """
    lng1 = request.GET['lng1']
    lat1 = request.GET['lat1']
    lng2 = request.GET['lng2']
    lat2 = request.GET['lat2']

    valid, error = _export_area_valid(lat1, lng1, lat2, lng2)
    if not valid:
        return HttpResponse(content=error,
                            content_type="text/html",
                            status=403)

    output_type = request.GET['outputType']
    content_disp = None
    mimetype = None

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

    response_data = _stream_population_exposure(request, output_type)
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    return response


def _stream_building_exposure(request, output_type):
    """
    Stream building exposure data from the database into a file of the
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
    lng1 = request.GET['lng1']
    lat1 = request.GET['lat1']
    lng2 = request.GET['lng2']
    lat2 = request.GET['lat2']

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

    if admin_select == 'admin0':
        # National
        exposure_data = util._get_national_exposure(lng1, lat1, lng2, lat2,
                                                    tod_select, occupancy)

        if output_type == 'csv':
            copyright = copyright_csv(COPYRIGHT_HEADER)
            yield copyright
            yield BLDG_CSV_HEADER

            for (grid_id, lon, lat, pop_value, country_id, iso,
                     study_region_id, building_type, dwelling_fraction,
                     pop_ratio) in exposure_data:

                calc_pop_value = pop_value * dwelling_fraction * pop_ratio
                row = [iso, calc_pop_value, grid_id, lon, lat, study_region_id,
                       country_id, building_type]
                row = [str(x) for x in row]
                yield '%s\n' % ','.join(row)
        elif output_type == 'nrml':
            copyright = copyright_nrml(COPYRIGHT_HEADER)
            yield XML_HEADER
            yield copyright
            yield NRML_HEADER

            for (grid_id, lon, lat, pop_value, country_id, iso,
                     study_region_id, building_type, dwelling_fraction,
                     pop_ratio) in exposure_data:

                calc_pop_value = pop_value * dwelling_fraction * pop_ratio

                asset = NRML_ASSET_FMT % dict(
                    gml_id='%s_%s' % (grid_id, building_type),
                    lon=lon,
                    lat=lat,
                    pop=calc_pop_value,
                    tax=building_type,
                )
                yield '%s' % asset
            # finalize the document:
            yield NRML_FOOTER

    elif admin_select in ('admin1', 'admin2', 'admin3'):
        # Subnational
        exposure_data = util._get_subnational_exposure(lng1, lat1, lng2, lat2,
                                                       occupancy, admin_select)

        if output_type == 'csv':
            copyright = copyright_csv(COPYRIGHT_HEADER)
            yield copyright
            yield BLDG_CSV_HEADER

            for (grid_id, lon, lat, pop_value, country_id, iso,
                     study_region_id, building_type,
                     dwelling_fraction) in exposure_data:
                calc_pop_value = pop_value * dwelling_fraction
                row = [iso, calc_pop_value, grid_id, lon, lat, study_region_id,
                       country_id, building_type]
                row = [str(x) for x in row]
                yield '%s\n' % ','.join(row)

        elif output_type == 'nrml':
            copyright = copyright_nrml(COPYRIGHT_HEADER)
            yield XML_HEADER
            yield copyright
            yield NRML_HEADER

            for (grid_id, lon, lat, pop_value, country_id, iso,
                     study_region_id, building_type,
                     dwelling_fraction) in exposure_data:
                calc_pop_value = pop_value * dwelling_fraction

                asset = NRML_ASSET_FMT % dict(
                    gml_id='%s_%s' % (grid_id, building_type),
                    lon=lon,
                    lat=lat,
                    pop=calc_pop_value,
                    tax=building_type,
                )
                yield asset
            # finalize the document:
            yield NRML_FOOTER
    else:
        msg = (
            "Invalid 'adminLevel' selection: '%s'."
            " Expected 'admin0', 'admin1', 'admin2', or 'admin3'."
            % admin_select
        )
        raise ValueError(msg)


def _stream_population_exposure(request, output_type):
    """
    Stream population exposure data from the database into a file of the
    specified ``output_type``.

    :param request:
        A :class:`django.http.request.HttpRequest` object.
    :param str output_type:
        A string indicating the desired output type. Valid values are 'csv'
        and 'nrml' (XML).
    """
    lng1 = request.GET['lng1']
    lat1 = request.GET['lat1']
    lng2 = request.GET['lng2']
    lat2 = request.GET['lat2']

    exposure_data = util._get_population_exposure(lng1, lat1, lng2, lat2)

    if output_type == 'csv':
        copyright = copyright_csv(COPYRIGHT_HEADER)
        yield copyright
        yield POP_CSV_HEADER
        for grid_id, lon, lat, pop_value, iso in exposure_data:
            row = [iso, pop_value, grid_id, lon, lat]
            row = [str(x) for x in row]
            yield '%s\n' % ','.join(row)

    elif output_type == 'nrml':
        copyright = copyright_nrml(COPYRIGHT_HEADER)
        yield XML_HEADER
        yield copyright
        yield NRML_HEADER
        for grid_id, lon, lat, pop_value, iso in exposure_data:
            asset = NRML_ASSET_FMT % dict(
                gml_id=grid_id,
                lon=lon,
                lat=lat,
                pop=pop_value,
                tax='',
            )
            yield asset


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines)


def copyright_nrml(cr_text):
    return '<!-- \n%s\n -->' % cr_text
