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
# You should have received a copy of the GNU Affero General Public
# License along with this program. If not, see
# <https://www.gnu.org/licenses/agpl.html>.
import json
from collections import namedtuple

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.http import condition

from openquakeplatform.exposure import forms
from openquakeplatform.utils import allowed_methods, sign_in_required
from openquakeplatform.exposure import util

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

BLDG_ADMIN_0_CSV_HEADER = ('ISO, pop_calculated_value, pop_cell_ID, lon, lat, '
                           'study_region, gadm_level_id, GEM_taxonomy, '
                           'time_of_day\n')
BLDG_SUBNAT_CSV_HEADER = ('ISO, pop_calculated_value, pop_cell_ID, lon, lat, '
                          'study_region, gadm_level_id, GEM_taxonomy\n')

POP_CSV_HEADER = ('ISO, population_value, pop_cell_ID, lon, lat\n')

XML_HEADER = "<?xml version='1.0' encoding='utf-8'?> \n"
NRML_HEADER = """
<nrml xmlns="http://openquake.org/xmlns/nrml/0.4">
    <exposureModel
        id="ep"
        category="%(cat)s"
        taxonomySource="GEM/PAGER">

        <description>Source: OQP exposure export tool</description>
        <assets>
"""
NRML_ASSET_FMT = """
            <asset id="%(gml_id)s" number="%(pop)s" taxonomy="%(tax)s">
                <location lon="%(lon)s" lat="%(lat)s" />
            </asset>"""
NRML_ASSET_ADMIN_0_FMT = """
            <asset id="%(gml_id)s" number="%(pop)s" taxonomy="%(tax)s">
                <location lon="%(lon)s" lat="%(lat)s" />

                <occupancies>%(occ)s
                </occupancies>
            </asset>"""
OCCUPANCY_FMT = """
                    <occupancy occupants="%s" period="%s" />"""
NRML_FOOTER = """
        </assets>
    </exposureModel>
</nrml>
"""

#: The maximum bounding box area which can be exported.
MAX_EXPORT_AREA_SQ_DEG = 4  # 2 * 2 degrees, for example


@allowed_methods(('GET', ))
@sign_in_required
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
    return render_to_response('exposure/building_form.html',
                              {'exposure_form': form,
                               'lat1': lat1,
                               'lng1': lng1,
                               'lat2': lat2,
                               'lng2': lng2},
                              context_instance=RequestContext(request))

@allowed_methods(('GET', ))
@sign_in_required
def get_exposure_building_form_region(request):
    # get the lat long variables from the client
    regionId = request.GET['regionId']
    admin_levels = util._get_available_admin_levels(regionId)

    if not admin_levels:
        # There is no grid data for any admin level; this can happen if, for
        # example, the bounding box is drawn over the ocean somewhere.
        return HttpResponse(status=204)

    # if the admin level is okay, display the admin level selection form
    form = forms.BuildingExposureForm(admin_levels=admin_levels)
    return render_to_response('exposure/building_form.html',
                              {'exposure_form': form,
                               'lat1': lat1,
                               'lng1': lng1,
                               'lat2': lat2,
                               'lng2': lng2},
                              context_instance=RequestContext(request))


@allowed_methods(('GET', ))
@sign_in_required
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
        return render_to_response('exposure/population_form.html',
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
@allowed_methods(('GET', ))
@sign_in_required
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

def export_building_region(request):
    """
    Perform a streaming export of the requested exposure data.

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing the
        following parameters::

            * 'outputType' ('csv' or 'nrml')
            * 'timeOfDay' ('day', 'night', 'transit', 'all', 'off')
            * 'adminLevel' ('admin0', 'admin1', 'admin2', or 'admin3')
            * 'regionId'

    """
    regionId = request.GET['regionId']
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
@allowed_methods(('GET', ))
@sign_in_required
def get_country_list(request):
    """
    Get the list of countries available in the GED database

    :returns: json containing iso and name of each country
    """
    country_list = util._get_iso_and_name_for_all_countries()
    response_data = json.dumps(country_list)
    response = HttpResponse(response_data, mimetype='text/json')
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def get_geographic_regions_by_iso(request):
    """
    Given an ISO code, get the list of geographic regions belonging to the
    country specified, for which studies are available in the GED database

    :param iso: country's ISO code
    :returns: json containing, for each geographic region,
              geographic_region_id: id of the geographic region
              g1name: name of the administrative level 1 region
              g2name: name of the administrative level 2 region
              g3name: name of the administrative level 3 region
    """
    iso = request.GET.get('iso')
    if not iso:
        msg = ('A country ISO code must be provided.')
        response = HttpResponse(msg, status="400")
        return response
    iso = request.GET['iso']
    geographic_regions = util._get_geographic_region_id_and_name_by_iso(iso)
    response_data = json.dumps(geographic_regions)
    response = HttpResponse(response_data, mimetype='text/json')
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def get_all_studies(request):
    """
    Get GED studies for all national levels

    :return: json object containing, for each study, a dictionary with the
             following keys:
             iso: ISO code of the country
             num_l1_studies: number of level 1 studies
             country_name: name of the country
             study_name: name of the study
             has_nonres: boolean that indicates if the study has
                         non residential data
    """
    studies = []
    StudyRecord = namedtuple(
        'StudyRecord',
        'iso num_l1_studies study_id country_name study_name has_nonres')
    for sr in map(StudyRecord._make, util._get_all_studies()):
        studies.append(dict(sr._asdict()))
    response_data = json.dumps(studies)
    response = HttpResponse(response_data, mimetype='text/json')
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def get_studies_by_country(request):
    """
    Get GED studies for the country having the provided ISO code

    :param iso: ISO code of the country (mandatory)
    :param level_filter: optional filter. Available values are:
                         national: only national studies are retrieved
                         subnational: only subnational studies are retrieved
                         If this parameter is not provided, all studies are
                         retrieved.
    :param study_filter: (optional) study id
    :return: json object containing the list of studies. For each study,
             the output contains the following fields:
             study_region_id, g1name, g2name, g3name, study_name, has_nonres,
             tot_pop, tot_grid_count, xmin, ymin, xmax, ymax
    """
    iso = request.GET.get('iso')
    if not iso:
        msg = 'A country ISO code must be provided.'
        response = HttpResponse(msg, status="400")
        return response
    if len(iso) != 3:
        msg = 'Please use a 3 characters ISO code.'
        response = HttpResponse(msg, status="400")
        return response
    level_filter = request.GET.get('level_filter')
    if level_filter is not None and level_filter not in ('national',
                                                         'subnational'):
        msg = 'Valid values for level_filter are "national" or "subnational".'
        response = HttpResponse(msg, status="400")
        return response
    study_filter = request.GET.get('study_filter')
    studies = []
    StudyRecord = namedtuple(
        'StudyRecord',
        'study_region_id g1name g2name g3name study_name has_nonres'
        ' tot_pop tot_grid_count xmin ymin xmax ymax')
    for sr in map(StudyRecord._make, util._get_studies_by_country(
            iso, level_filter, study_filter)):
        studies.append(dict(sr._asdict()))
    response_data = json.dumps(studies)
    response = HttpResponse(response_data, mimetype='text/json')
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def get_fractions_by_study_region_id(request):
    """
    FIXME Missing docstring
    """
    sr_id = request.GET.get('sr_id')
    if not sr_id:
        msg = 'A study region id (parameter "sr_id") must be provided.'
        response = HttpResponse(msg, status="400")
        return response
    fractions = []
    FractionRecord = namedtuple(
        'FractionRecord',
        'is_urban is_residential building_type building_fraction'
        ' dwelling_fraction replace_cost_per_area avg_dwelling_per_build'
        ' avg_floor_area')
    for sr in map(FractionRecord._make, util._get_fractions_by_study_region_id(
            sr_id)):
        fractions.append(dict(sr._asdict()))
    response_data = json.dumps(fractions)
    response = HttpResponse(response_data, mimetype='text/json')
    return response



@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
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


def _bldg_csv_admin0_generator(exposure_data):
    """
    Helper function for generating admin level 0 CSV data for building
    exposure.
    """
    copyright = copyright_csv(COPYRIGHT_HEADER)
    yield copyright
    yield BLDG_ADMIN_0_CSV_HEADER

    for (grid_id, lon, lat, pop_value, country_id, iso,
         study_region_id, building_type, dwelling_fraction,
         day_pop_ratio, night_pop_ratio,
         transit_pop_ratio) in exposure_data:

        if all([x is None for x in (day_pop_ratio,
                                    night_pop_ratio,
                                    transit_pop_ratio)]):
            row = [iso, pop_value, grid_id, lon, lat,
                   study_region_id, country_id, building_type, '']
            row = [str(x) for x in row]
            yield '%s\n' % ','.join(row)
        else:
            for tod, pop_ratio in (('day', day_pop_ratio),
                                   ('night', night_pop_ratio),
                                   ('transit', transit_pop_ratio)):
                if pop_ratio is not None:
                    calc_pop_value = pop_value * dwelling_fraction * pop_ratio
                    row = [iso, calc_pop_value, grid_id, lon, lat,
                           study_region_id, country_id, building_type, tod]
                    row = [str(x) for x in row]
                    yield '%s\n' % ','.join(row)


def _bldg_nrml_admin0_generator(exposure_data):
    """
    Helper function for generating admin level 0 NRML data for building
    exposure.
    """
    yield XML_HEADER
    copyright = copyright_nrml(COPYRIGHT_HEADER)
    yield copyright
    yield NRML_HEADER % dict(cat='buildings')

    for (grid_id, lon, lat, pop_value, country_id, iso,
         study_region_id, building_type, dwelling_fraction,
         day_pop_ratio, night_pop_ratio,
         transit_pop_ratio) in exposure_data:

        if all([x is None for x in (day_pop_ratio,
                                    night_pop_ratio,
                                    transit_pop_ratio)]):
            asset_params = dict(
                gml_id='%s_%s' % (grid_id, building_type),
                lon=lon,
                lat=lat,
                pop=pop_value,
                tax=building_type,
            )
            asset = NRML_ASSET_FMT % asset_params
            yield '%s' % asset
        else:
            occ = ''
            for tod, pop_ratio in (('day', day_pop_ratio),
                                   ('night', night_pop_ratio),
                                   ('transit', transit_pop_ratio)):
                if pop_ratio is not None:
                    calc_pop_value = pop_value * dwelling_fraction * pop_ratio
                    occ += OCCUPANCY_FMT % (calc_pop_value, tod)

            asset_params = dict(
                gml_id='%s_%s' % (grid_id, building_type),
                lon=lon,
                lat=lat,
                pop=calc_pop_value,
                tax=building_type,
                occ=occ,
            )
            asset = NRML_ASSET_ADMIN_0_FMT % asset_params
            yield '%s' % asset
    # finalize the document:
    yield NRML_FOOTER


def _bldg_csv_subnat_generator(exposure_data):
    """
    Helper function for generating admin level 1-3 CSV data for building
    exposure.
    """
    copyright = copyright_csv(COPYRIGHT_HEADER)
    yield copyright
    yield BLDG_SUBNAT_CSV_HEADER

    for (grid_id, lon, lat, pop_value, country_id, iso,
         study_region_id, building_type,
         dwelling_fraction) in exposure_data:
        calc_pop_value = pop_value * dwelling_fraction
        row = [iso, calc_pop_value, grid_id, lon, lat, study_region_id,
               country_id, building_type]
        row = [str(x) for x in row]
        yield '%s\n' % ','.join(row)


def _bldg_nrml_subnat_generator(exposure_data):
    """
    Helper function for generating admin level 1-3 NRML data for building
    exposure.
    """
    yield XML_HEADER
    copyright = copyright_nrml(COPYRIGHT_HEADER)
    yield copyright
    yield NRML_HEADER % dict(cat='buildings')

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


def _pop_csv_generator(exposure_data):
    """
    Helper function for generating CSV data for population exposure.
    """
    copyright = copyright_csv(COPYRIGHT_HEADER)
    yield copyright
    yield POP_CSV_HEADER
    for grid_id, lon, lat, pop_value, iso in exposure_data:
        row = [iso, pop_value, grid_id, lon, lat]
        row = [str(x) for x in row]
        yield '%s\n' % ','.join(row)


def _pop_nrml_generator(exposure_data):
    """
    Helper function for generating CSV data for population exposure.
    """
    yield XML_HEADER
    copyright = copyright_nrml(COPYRIGHT_HEADER)
    yield copyright
    yield NRML_HEADER % dict(cat='population')

    for grid_id, lon, lat, pop_value, iso in exposure_data:
        asset = NRML_ASSET_FMT % dict(
            gml_id=grid_id,
            lon=lon,
            lat=lat,
            pop=pop_value,
            tax='',
        )
        yield asset
    yield NRML_FOOTER


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
            for text in _bldg_csv_admin0_generator(exposure_data):
                yield text
        elif output_type == 'nrml':
            for text in _bldg_nrml_admin0_generator(exposure_data):
                yield text

    elif admin_select in ('admin1', 'admin2', 'admin3'):
        # Subnational
        exposure_data = util._get_subnational_exposure(lng1, lat1, lng2, lat2,
                                                       occupancy, admin_select)

        if output_type == 'csv':
            for text in _bldg_csv_subnat_generator(exposure_data):
                yield text

        elif output_type == 'nrml':
            for text in _bldg_nrml_subnat_generator(exposure_data):
                yield text
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
        for text in _pop_csv_generator(exposure_data):
            yield text

    elif output_type == 'nrml':
        for text in _pop_nrml_generator(exposure_data):
            yield text


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines)


def copyright_nrml(cr_text):
    return '<!-- \n%s\n -->' % cr_text
