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
import csv
from collections import namedtuple

from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.http import condition

from openquakeplatform.utils import allowed_methods, sign_in_required
from openquakeplatform.exposure import util

COPYRIGHT_HEADER = """\
 Copyright (C) 2014 GEM Foundation

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

XML_HEADER = "<?xml version='1.0' encoding='utf-8'?> \n"
NRML_HEADER = """
<nrml xmlns="http://openquake.org/xmlns/nrml/0.4">
    <exposureModel id="ep" category="%(cat)s" taxonomySource="%(taxonomy_name)s %(taxonomy_version)s">
        <description>Source: OQP exposure export tool</description>%(conversions)s
        <assets>"""
NRML_CONVERSIONS_FMT = """
            <conversions>
                <costTypes>
                    <costType name="structural" unit="%s" type="aggregated"/>
                </costTypes>
            </conversions>"""
NRML_ASSET_FMT = """
            <asset id="%(gml_id)s" number="%(bldg_count)s" taxonomy="%(tax)s">
                <location lon="%(lon)s" lat="%(lat)s" />%(costs)s
                <occupancies>%(occ)s
                </occupancies>
            </asset>"""
NRML_COSTS_FMT = """
                <costs>
                    <cost type="structural" value="%s"/>
                </costs>"""
NRML_OCCUPANCY_FMT = """
                    <occupancy occupants="%s" period="%s" />"""
NRML_FOOTER = """
        </assets>
    </exposureModel>
</nrml>
"""

#: The maximum bounding box area which can be exported.
MAX_EXPORT_AREA_SQ_DEG = settings.EXPOSURE_MAX_AREA
MAX_TOT_GRID_COUNT = settings.EXPOSURE_MAX_COUNT


def _export_area_valid(
        lat1, lng1, lat2, lng2, max_area=MAX_EXPORT_AREA_SQ_DEG):
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
                    area=area, max_area=max_area)
        return False, msg
    return True, ''


def _tot_grid_count_valid(sr_id):
    StudyRegionInfoRecord = namedtuple(
        'StudyRegionInfoRecord', 'tot_pop tot_grid_count bounding_box')
    sr_info = []
    for info in map(StudyRegionInfoRecord._make, util._get_study_region_info(
            sr_id)):
        sr_info.append(dict(info._asdict()))
        assert len(sr_info) == 1, ('_get_study_region_info(sr_id) returned '
                                   '%d rows. It should return one') % len(sr_info)
    sr_info = sr_info[0]
    if sr_info['tot_grid_count'] > MAX_TOT_GRID_COUNT:
        msg = ('The export can not be performed because the '
               'total grid count for study region id %s exceeds the '
               'threshold (%s > %s)') % (sr_id,
                                         sr_info['tot_grid_count'],
                                         MAX_TOT_GRID_COUNT)
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
def export_exposure(request):
    """
    Perform a streaming export of the requested exposure data.

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing the
        following parameters:

            * 'output_type' ('csv' or 'nrml')
            * 'lng1'
            * 'lat1'
            * 'lng2'
            * 'lat2'
            * 'sr_id': a study region id
            * 'occupancy_filter' (optional, default is residential
                                            specify non_residential otherwise)
    """
    sr_id = request.GET.get('sr_id')
    if sr_id:
        try:
            sr_id = int(sr_id)
        except ValueError:
            msg = 'Please provide a valid (numeric) study region id'
            response = HttpResponse(msg, status="400")
            return response
    else:
        msg = 'Please provide a study region id (numeric parameter sr_id)'
        response = HttpResponse(msg, status="400")
        return response
    occupancy_filter = request.GET.get('occupancy_filter')
    if occupancy_filter:
        if occupancy_filter == 'residential':
            occupancy = 0
        elif occupancy_filter == 'non-residential':
            occupancy = 1
        else:
            msg = ("Invalid 'occupancy_filter' selection: '%s'."
                   " Expected 'residential' or 'non-residential'."
                   % occupancy_filter)
            response = HttpResponse(msg, status="400")
            return response
    else:
        occupancy = 0  # 'residential' by default
    data = util._get_currency_and_taxonomy_name(sr_id, occupancy)
    if data:
        currency, taxonomy_name, taxonomy_version = data
    else:
        # No records were found, corresponding to the given sr_id and occupancy
        # ==> we return a 204 (the server successfully processed the request,
        #                      but is not returning any content)
        #     because it means there's no study corresponding to
        #     the given combination of parameters
        response = HttpResponse(status="204")
        return response
    output_type = request.GET.get('output_type')
    if not output_type or output_type not in ('csv', 'nrml'):
        msg = ('Please provide the parameter "output_type".'
               ' Available choices are "csv" and "nrml".')
        response = HttpResponse(msg, status="400")
        return response
    if output_type == "csv":
        content_disp = 'attachment; filename="exposure_export.csv"'
        mimetype = 'text/csv'
    elif output_type == "nrml":
        content_disp = 'attachment; filename="exposure_export.xml"'
        mimetype = 'text/plain'
    else:
        msg = ("Unrecognized output type '%s', only 'nrml' and 'csv' are "
               "supported" % output_type)
        response = HttpResponse(msg, status="400")
        return response
    filter_by_bounding_box = False
    lng1 = request.GET.get('lng1')
    lat1 = request.GET.get('lat1')
    lng2 = request.GET.get('lng2')
    lat2 = request.GET.get('lat2')
    # If only a subset of lng1, lat1, lng2, lat2 is provided, raise an error
    if lng1 or lat1 or lng2 or lat2:
        if not lng1 or not lat1 or not lng2 or not lat2:
            msg = 'Incomplete bounding box coordinates'
            response = HttpResponse(msg, status="400")
            return response
    if lng1 and lat1 and lng2 and lat2:
        filter_by_bounding_box = True
        # the default max_area would be MAX_EXPORT_AREA_SQ_DEG
        valid, error = _export_area_valid(lat1, lng1, lat2, lng2, max_area=4)
        if not valid:
            return HttpResponse(content=error,
                                content_type="text/html",
                                status=403)
    else:  # no bounding box provided; we need to check the tot_grid_count
        valid, error = _tot_grid_count_valid(sr_id)
        if not valid:
            return HttpResponse(content=error,
                                content_type="text/html",
                                status=403)
    if filter_by_bounding_box:
        if output_type == 'csv':
            response_data = _stream_exposure_by_bb_and_sr_id_as_csv(
                lng1, lat1, lng2, lat2, sr_id, occupancy, currency,
                taxonomy_name, taxonomy_version)
        elif output_type == 'nrml':
            req_pars = dict(lng1=lng1, lat1=lat1, lng2=lng2, lat2=lat2,
                            sr_id=sr_id, occupancy=occupancy,
                            filter_by_bounding_box=filter_by_bounding_box,
                            currency=currency, taxonomy_name=taxonomy_name,
                            taxonomy_version=taxonomy_version)
            response_data = _stream_exposure_as_nrml(req_pars)
        else:
            raise NotImplementedError(
                'output_type [%s] is not available' % output_type)
    else:
        if output_type == 'csv':
            response_data = _stream_exposure_by_sr_id_as_csv(
                sr_id, occupancy, currency, taxonomy_name, taxonomy_version)
        elif output_type == 'nrml':
            req_pars = dict(sr_id=sr_id, occupancy=occupancy,
                            filter_by_bounding_box=filter_by_bounding_box,
                            currency=currency, taxonomy_name=taxonomy_name,
                            taxonomy_version=taxonomy_version)
            response_data = _stream_exposure_as_nrml(req_pars)
        else:
            raise NotImplementedError(
                'output_type [%s] is not available' % output_type)
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    return response

def _csv_currency_and_taxonomy_header(currency, taxonomy_name, taxonomy_version):
    details_str = ""
    if currency is not None:
        details_str += "# currency = %s" % currency
    details_str += """
# taxonomy = %s %s
#
""" % (taxonomy_name, taxonomy_version)
    return details_str

def raw_to_csv_row(row):
    elements = ["\"" + str(x) + "\"" if type(x) == unicode
                else str(x) if x is not None
                else ""
                for x in row]
    row_str = ','.join(elements) + "\n"
    return row_str

def _stream_exposure_by_bb_and_sr_id_as_csv(
        lng1, lat1, lng2, lat2, sr_id, occupancy,
        currency, taxonomy_name, taxonomy_version):
    copyright = copyright_csv(COPYRIGHT_HEADER)
    yield copyright
    yield _csv_currency_and_taxonomy_header(
        currency, taxonomy_name, taxonomy_version)
    for row in util._stream_exposure_by_bb_and_sr_id(
            lng1, lat1, lng2, lat2, sr_id, occupancy):
        row_str = raw_to_csv_row(row)
        yield row_str

def _stream_exposure_by_sr_id_as_csv(
        sr_id, occupancy, currency, taxonomy_name, taxonomy_version):
    copyright = copyright_csv(COPYRIGHT_HEADER)
    yield copyright
    yield _csv_currency_and_taxonomy_header(
        currency, taxonomy_name, taxonomy_version)
    for row in util._stream_exposure_by_sr_id(sr_id, occupancy):
        row_str = raw_to_csv_row(row)
        yield row_str

def _stream_exposure_as_nrml(req_pars):
    yield XML_HEADER
    copyright = copyright_nrml(COPYRIGHT_HEADER)
    currency = req_pars['currency']
    yield copyright
    if currency is not None:
        conversions = NRML_CONVERSIONS_FMT % currency
    else:
        conversions = ""
    yield NRML_HEADER % dict(cat='buildings',
                             conversions=conversions,
                             taxonomy_name=req_pars['taxonomy_name'],
                             taxonomy_version=req_pars['taxonomy_version'])
    if req_pars['filter_by_bounding_box']:
        exposure_data = util._stream_exposure_by_bb_and_sr_id(
            req_pars['lng1'],
            req_pars['lat1'],
            req_pars['lng2'],
            req_pars['lat2'],
            req_pars['sr_id'],
            req_pars['occupancy'])
    else:  # no bounding box provided
        exposure_data = util._stream_exposure_by_sr_id(
            req_pars['sr_id'],
            req_pars['occupancy'])
    # discard column_names
    column_names = exposure_data.next()
    for (grid_id, lon, lat, bldg_type, occ_type, is_urban, dwelling_fraction,
         bldg_fraction, type_pop, day_pop, night_pop, transit_pop, bldg_count,
         bldg_count_quality, bldg_area, bldg_area_quality, bldg_cost,
         bldg_cost_quality) in exposure_data:
        occ = ''
        for tod, occupants in (('all', type_pop),
                               ('day', day_pop),
                               ('night', night_pop),
                               ('transit', transit_pop)):
            occ += NRML_OCCUPANCY_FMT % (occupants, tod)
            if bldg_cost is not None:
                costs = NRML_COSTS_FMT % bldg_cost
            else:
                costs = ""
        asset_params = dict(
            gml_id='%s_%s' % (grid_id, bldg_type),
            lon=lon,
            lat=lat,
            bldg_count=bldg_count,
            tax=bldg_type,
            costs=costs,
            occ=occ,
        )
        asset = NRML_ASSET_FMT % asset_params
        yield '%s' % asset
    # finalize the document:
    yield NRML_FOOTER

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
             num_studies: number of studies
             num_l1_names: number of level 1 names
             (NOTE: it corresponds to the number of level 1 studies,
                    unless higher admin level studies are present)
             num_l2_names: number of level 2 names
             (NOTE: it corresponds to the number of level 2 studies,
                    unless higher admin level studies are present)
             country_name: name of the country
             study_name: name of the study
             has_nonres: boolean that indicates if the study has
                         non residential data
    """
    studies = []
    StudyRecord = namedtuple(
        'StudyRecord',
        'iso num_studies num_l1_names num_l2_names study_id'
        ' country_name study_name has_nonres')
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
def get_study_region_info(request):
    """
    For a given study region id, retrieve
    total population, total grid count and bounding box

    :param sr_id: study region id

    :return: json object containing tot_pop, tot_grid_count, bounding_box
    """
    sr_id = request.GET.get('sr_id')
    if sr_id:
        try:
            sr_id = int(sr_id)
        except ValueError:
            msg = 'Please provide a valid (numeric) study region id'
            response = HttpResponse(msg, status="400")
            return response
    else:
        msg = 'Please provide a study region id (numeric parameter sr_id)'
        response = HttpResponse(msg, status="400")
        return response
    StudyRegionInfoRecord = namedtuple(
        'StudyRegionInfoRecord', 'tot_pop tot_grid_count bounding_box')
    sr_info = []
    for info in map(StudyRegionInfoRecord._make, util._get_study_region_info(
            sr_id)):
        sr_info.append(dict(info._asdict()))
        assert len(sr_info) == 1, ('_get_study_region_info(sr_id) returned '
                                   '%d rows. It should return one') % len(sr_info)
    response_data = json.dumps(sr_info[0])
    response = HttpResponse(response_data, mimetype='text/json')
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def export_fractions_by_study_region_id(request):
    """
    Export, as csv file, the fractions for the given study region id.

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing the
        following parameters:

            * 'sr_id': a study region id
    """
    sr_id = request.GET.get('sr_id')
    if sr_id:
        try:
            sr_id = int(sr_id)
        except ValueError:
            msg = 'Please provide a valid (numeric) study region id'
            response = HttpResponse(msg, status="400")
            return response
    else:
        msg = 'Please provide a study region id (numeric parameter sr_id)'
        response = HttpResponse(msg, status="400")
        return response
    filename = 'fractions_export.csv'
    content_disp = 'attachment; filename="%s"' % filename
    mimetype = 'text/csv'
    response = HttpResponse(mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    copyright = copyright_csv(COPYRIGHT_HEADER)
    response.write(copyright)
    writer = csv.writer(response, delimiter=',', quotechar='"')
    for row in util._stream_fractions_by_study_region_id(sr_id):
        writer.writerow(row)
    return response


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines) + "\n"


def copyright_nrml(cr_text):
    return '<!-- \n%s\n -->' % cr_text
