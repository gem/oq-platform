# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2014, GEM Foundation.
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

from cStringIO import StringIO
import csv
import json
import unicodedata
from django.http import (HttpResponse,
                         HttpResponseBadRequest,
                         HttpResponseNotFound,
                         HttpResponseForbidden,
                         )
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from django.views.decorators.http import condition
from openquakeplatform.utils import (allowed_methods,
                                     sign_in_required)
from openquakeplatform.svir.models import (Theme,
                                           Subtheme,
                                           Keyword,
                                           Indicator,
                                           ZoneIndicator,
                                           Study,
                                           Zone,
                                           )

from geonode.base.models import Link
from geonode.layers.views import (_resolve_layer,
                                  _PERMISSION_MSG_MODIFY,
                                  _PERMISSION_MSG_VIEW,
                                  )


COPYRIGHT_HEADER = u"""\
 Copyright (C) 2014-2015 GEM Foundation

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

 More information on licensing: http://www.globalquakemodel.org/licensing
"""


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def get_supplemental_information(request):
    """
    Given a layer name, read the corresponding supplemental_information from
    the layer's metadata and return it as a json

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing
        the following parameter:
            * 'layer_name': the layer identifier

    :return:
        A JSON containing the layer's supplemental_information
    """
    layer_name = request.GET.get('layer_name')
    if not layer_name:
        return HttpResponseBadRequest(
            'Please provide the layer_name parameter')
    try:
        layer = _resolve_layer(
            request, layer_name, 'layers.view_layer', _PERMISSION_MSG_VIEW)
    except PermissionDenied:
        return HttpResponse(
            'You are not allowed to view this layer',
            mimetype='text/plain',
            status=401)
    supplemental_information_str = layer.supplemental_information
    try:
        supplemental_information = json.loads(supplemental_information_str)
    except Exception as e:
        return HttpResponseBadRequest(
            "The layer's supplemental information is not in a valid"
            "json format: %s", str(e))
    return HttpResponse(json.dumps(supplemental_information,
                                   sort_keys=False,
                                   indent=2,
                                   separators=(',', ': ')),
                        content_type="application/json")


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def get_project_definitions(request):
    """
    Given a layer name, read the corresponding project definitions from
    the layer's metadata and return them as a json

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing
        the following parameter:
            * 'layer_name': the layer identifier

    :return:
        A JSON containing the layer's project definitions
    """
    layer_name = request.GET.get('layer_name')
    if not layer_name:
        return HttpResponseBadRequest(
            'Please provide the layer_name parameter')
    try:
        layer = _resolve_layer(
            request, layer_name, 'layers.view_layer', _PERMISSION_MSG_VIEW)
    except PermissionDenied:
        return HttpResponse(
            'You are not allowed to view this layer',
            mimetype='text/plain',
            status=401)
    supplemental_information_str = layer.supplemental_information
    try:
        supplemental_information = json.loads(supplemental_information_str)
    except Exception as e:
        return HttpResponseBadRequest(
            "The layer's supplemental information is not in a valid"
            "json format: %s", str(e))
    if 'project_definitions' in supplemental_information:
        project_definitions = supplemental_information['project_definitions']
    else:
        # if this is an old project, the project definitions are not nested
        # into the 'project_definitions' key
        project_definitions = supplemental_information
    return HttpResponse(json.dumps(project_definitions,
                                   sort_keys=False,
                                   indent=2,
                                   separators=(',', ': ')),
                        content_type="application/json")


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def get_layer_metadata_url(request):
    """
    Given a layer name, return the url to be called to download the layer's
    TC211 metadata XML

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing
        the following parameter:
            * 'layer_name': the layer identifier

    :return:
        The url needed to download the layer's metadata
    """
    layer_name = request.GET.get('layer_name')
    if not layer_name:
        return HttpResponseBadRequest(
            'Please provide the layer_name parameter')
    try:
        resource_id = Link.objects.get(name=layer_name).resource_id
        response_url = Link.objects.get(
            resource_id=resource_id, name='TC211').url
    except ObjectDoesNotExist:
        return HttpResponseNotFound('Metadata url not found')
    response = HttpResponse()
    response.write(response_url)
    return HttpResponse(response)


@condition(etag_func=None)
@allowed_methods(('POST', ))
@sign_in_required
def add_project_definition(request):
    """
    Given a layer identifier and a project definition, if the logged user
    is enabled to modify the layer, the project definition will be added to
    the layer's supplemental information. In order to ensure backward
    compatibility, the supplemental information can contain a single json
    object. In that case, it will be converted into an array, and both the
    existing project definition and the new one will be sequentially appended.

    :param request:
        A "POST" :class:`django.http.HttpRequest` object containing
        the following parameter:
            * 'layer_name': the layer identifier
            * 'project_definition': the project definition to be added to the
                                    layer's supplemental information
    """
    layer_name = request.POST.get('layer_name')
    if not layer_name:
        return HttpResponseBadRequest(
            'Please provide the layer_name parameter')
    project_definition_str = request.POST.get('project_definition')
    if not project_definition_str:
        return HttpResponseBadRequest(
            'Please provide the project_definition parameter')
    try:
        project_definition = json.loads(project_definition_str)
    except Exception as e:
        return HttpResponseBadRequest(
            'Invalid project_definition: %s' % str(e))
    try:
        layer = _resolve_layer(
            request, layer_name, 'layers.change_layer', _PERMISSION_MSG_MODIFY)
    except PermissionDenied:
        return HttpResponse(
            'You are not allowed to modify this layer',
            mimetype='text/plain',
            status=401)
    supplemental_information_str = layer.supplemental_information
    try:
        supplemental_information = json.loads(supplemental_information_str)
    except Exception as e:
        return HttpResponseBadRequest(
            "The layer's supplemental information does not have a valid"
            "json format: %s", str(e))
    try:
        old_project_definitions = supplemental_information[
            'project_definitions']
    except KeyError:
        # for backwards compatibility, attempt to read the list of
        # project_definitions directly from the root of
        # supplemental_information, instead of nested into the
        # project_definitions key, and upgrade the supplemental_information to
        # the new format
        old_project_definitions = supplemental_information
        supplemental_information = dict()
        supplemental_information[
            'project_definitions'] = old_project_definitions
    try:
        new_title = project_definition['title']
    except KeyError:
        return HttpResponseBadRequest(
            "The project definition should have a title.")
    if not new_title:
        return HttpResponseBadRequest(
            "The project definition's title must not be blank.")
    old_titles = [proj_def['title'] for proj_def in old_project_definitions]
    if new_title in old_titles:
        return HttpResponseForbidden(
            "The title '%s' was already assigned to another project"
            " definition. Please provide a new unique one." % new_title)
    supplemental_information['project_definitions'].append(project_definition)
    layer.supplemental_information = json.dumps(supplemental_information,
                                                sort_keys=False,
                                                indent=2,
                                                separators=(',', ': '))
    layer.save()
    return HttpResponse("The new project definition has been added")


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def list_admin_levels_for_study(request):
    study_name = request.GET.get('study_name')
    if not study_name:
        return HttpResponseBadRequest(
            'Please provide the study_name parameter')
    try:
        study_obj = Study.objects.get(name=study_name)
    except ObjectDoesNotExist:
        return HttpResponseNotFound('Study %s not found' % study_name)
    response = HttpResponse()
    first = True
    for admin_level in study_obj.admin_levels:
        if first:
            first = False
        else:
            response.write(',')
        response.write('"' + str(admin_level) + '"')
    return HttpResponse(response)


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def list_studies(request):
    studies = Study.objects.all()
    if not studies:
        return HttpResponseNotFound('No studies available in the DB')
    response = HttpResponse()
    first = True
    for study in studies:
        if first:
            first = False
        else:
            response.write(',')
        response.write('"' + study.name + '"')
    return HttpResponse(response)


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def list_themes(request):
    themes = Theme.objects.all()
    if not themes:
        return HttpResponseNotFound('No themes available in the DB')
    response = HttpResponse()
    first = True
    for theme in themes:
        if first:
            first = False
        else:
            response.write(',')
        response.write('"' + theme.name + '"')
    return HttpResponse(response)


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def list_subthemes_by_theme(request):
    theme_str = request.GET.get('theme')
    if not theme_str:
        return HttpResponseBadRequest(
            'Please provide the theme parameter')
    try:
        theme_obj = Theme.objects.get(name=theme_str)
    except ObjectDoesNotExist:
        return HttpResponseNotFound('Theme %s not found' % theme_str)
    subthemes = theme_obj.subtheme_set.all()
    if not subthemes:
        return HttpResponseNotFound(
            'No subtheme corresponds to the given theme')
    response = HttpResponse()
    first = True
    for subtheme in subthemes:
        if first:
            first = False
        else:
            response.write(',')
        response.write('"' + subtheme.name + '"')
    return HttpResponse(response)


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def export_variables_info(request):
    """
    Export a csv file containing information about the socioeconomic
    indicators which have the specified name, keywords, theme and/or subtheme.
    If also a study is provided, only indicators that are relevant to the
    study are returned.

    :param request:
        A "GET" :class:`django.http.HttpRequest` object that can contain
        the following optional parameters:
            * 'name'
            * 'keywords'
            * 'theme'
            * 'subtheme'
            * 'study'
        If the indicator name (or part of it) is provided, the indicators
        which name contain the provided string will be included in the csv.
        If one or more keywords are provided, the csv will list the
        indicators which keywords contain the user-provided string/s.
        If the theme is provided, the list will be filtered by theme, unless
        also the subtheme is provided, then the list will be filtered by
        subtheme.
        If the study is provided, only indicators for which at least one
        value is available for any of the zones belonging to that study
        are provided.
        If none of the above parameters is provided, the whole set of
        indicators is retrieved.

    :return:
        a csv file in which each line contains the following data:
            * indicator.code
            * indicator.name
            * indicator.theme
            * indicator.subtheme
            * indicator.description
            * indicator.keywords
    """
    # We don't need 'Tag' anymore, but we need to show other fields
    # We don't display update_periodicity and internal_consistency_metric
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = \
        'attachment; filename="socioeconomic_indicators_export.csv"'
    name_str = request.GET.get('name')
    keywords_str = request.GET.get('keywords')
    theme_str = request.GET.get('theme')
    subtheme_str = request.GET.get('subtheme')
    study_str = request.GET.get('study')
    copyright = copyright_csv(COPYRIGHT_HEADER)
    response.write(copyright)
    writer = csv.writer(response)

    keywords = []
    if keywords_str:
        keywords_str_list = [
            keyword.strip() for keyword in keywords_str.split(',')]
        for keyword_str in keywords_str_list:
            keyword_objs = Keyword.objects.filter(name__icontains=keyword_str)
            keywords.extend(keyword_objs)

    theme_obj = None
    if theme_str:
        try:
            theme_obj = Theme.objects.get(name=theme_str)
        except ObjectDoesNotExist:
            return HttpResponseNotFound('Theme %s not found' % theme_str)

    subtheme_obj = None
    if subtheme_str:
        try:
            subtheme_obj = Subtheme.objects.get(name=subtheme_str)
        except ObjectDoesNotExist:
            return HttpResponseNotFound('Subtheme %s not found' % subtheme_str)

    if study_str:
        try:
            study_obj = Study.objects.get(name=study_str)
        except ObjectDoesNotExist:
            return HttpResponseNotFound('Study %s not found' % study_str)

    # start with the whole set of indicators, then refine filtering
    indicators = Indicator.objects.all()

    if name_str:
        indicators = indicators.filter(name__icontains=name_str)

    if keywords_str:
        indicators = indicators.filter(keywords__in=keywords).distinct()

    if theme_obj:
        if not subtheme_obj:
            indicators = indicators.filter(subtheme__theme=theme_obj)
        else:
            indicators = indicators.filter(subtheme=subtheme_obj)
    elif subtheme_obj:
        indicators = indicators.filter(subtheme=subtheme_obj)

    if study_str:
        zones_for_study = Zone.objects.filter(study=study_obj)
        indicators = indicators.filter(zones__in=zones_for_study).distinct()

    writer.writerow(["Code",
                     "Name",
                     "Theme",
                     "Subtheme",
                     "Description",
                     "Keywords"])
    for ind in indicators:
        writer.writerow([
            ind.code.encode('utf-8'),
            ind.name.encode('utf-8'),
            ind.theme.name.encode('utf-8'),
            ind.subtheme.name.encode('utf-8'),
            ind.description.encode('utf-8'),
            ind.keywords_str.encode('utf-8'),
        ])
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def export_countries_info(request):
    """
    Export a csv file containing iso codes and names of countries implied in
    a given study
    """
    study_name = request.GET.get('study_name')
    if not study_name:
        print "Missing 'study_name' parameter"
        return HttpResponseBadRequest(
            'Please provide the study_name parameter')
    try:
        study_obj = Study.objects.get(name=study_name)
    except ObjectDoesNotExist:
        return HttpResponseNotFound('Study %s not found' % study_name)
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = \
        'attachment; filename="zones_info_export.csv"'
    copyright = copyright_csv(COPYRIGHT_HEADER)
    writer = csv.writer(response)
    response.write(copyright)
    writer.writerow(['ISO', 'NAME'])
    iso_codes = [zone.country_iso
                 for zone in Zone.objects.filter(study=study_obj)]
    countries = Zone.objects.filter(country_iso__in=iso_codes, admin_level=0)
    for zone in countries:
        # NOTE: It depends on which country model is being used
        # row = [country.iso, country.name_engli.encode('utf-8')]
        row = [zone.country_iso, zone.name.encode('utf-8')]
        writer.writerow(row)
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def export_countries_info_old(request):
    """
    Export a csv file containing iso codes and names of countries implied in
    a given study
    """
    study_name = request.GET.get('study_name')
    if not study_name:
        print "Missing 'study_name' parameter"
        return HttpResponseBadRequest(
            'Please provide the study_name parameter')
    try:
        study_obj = Study.objects.get(name=study_name)
    except ObjectDoesNotExist:
        return HttpResponseNotFound('Study %s not found' % study_name)
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = \
        'attachment; filename="zones_info_export.csv"'
    copyright = copyright_csv(COPYRIGHT_HEADER)
    writer = csv.writer(response)
    response.write(copyright)
    writer.writerow(['ISO', 'NAME'])
    for zone in Zone.objects.filter(study=study_obj, admin_level=0):
        # NOTE: It depends on which country model is being used
        # row = [country.iso, country.name_engli.encode('utf-8')]
        row = [zone.country_iso, zone.name.encode('utf-8')]
        writer.writerow(row)
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def export_zones_info(request):
    """
    Export a csv file containing details of zones having the given country_iso,
    for the selected study
    """
    country_iso = request.GET.get('country_iso')
    if not country_iso:
        print "Missing 'country_iso' parameter"
        return HttpResponseBadRequest(
            'Please provide the country_iso parameter')
    study_name = request.GET.get('study_name')
    if not study_name:
        print "Missing 'study_name' parameter"
        return HttpResponseBadRequest(
            'Please provide the study_name parameter')
    try:
        study_obj = Study.objects.get(name=study_name)
    except ObjectDoesNotExist:
        return HttpResponseNotFound('Study %s not found' % study_name)
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = \
        'attachment; filename="zones_info_export.csv"'
    copyright = copyright_csv(COPYRIGHT_HEADER)
    writer = csv.writer(response)
    response.write(copyright)
    writer.writerow(['NAME', 'COUNTRY_ISO', 'PARENT_LABEL', 'ADMIN_LEVEL'])
    for zone in Zone.objects.filter(study=study_obj, country_iso=country_iso):
        # NOTE: It depends on which country model is being used
        # row = [country.iso, country.name_engli.encode('utf-8')]
        row = [zone.name.encode('utf-8'),
               zone.country_iso,
               zone.parent_label.encode('utf-8'),
               zone.admin_level]
        writer.writerow(row)
    return response


@condition(etag_func=None)
@allowed_methods(('GET', 'POST',))
@sign_in_required
def export_variables_data_national(request):
    """
    Export a csv file containing data corresponding to the social vulnerability
    variables which ids are given in input
    If country iso codes are also provided, only the corresponding data will
    be exported

    :param request:
        A "GET" or "POST" :class:`django.http.HttpRequest` object containing
        the following parameters:
            * 'sv_variables_ids': a string of comma-separated ids of social
                                  vulnerability variables
            * 'country_iso_codes': a string of comma-separated country iso
                                   codes (optional - default: all countries)
            * 'export_geometries': 'True' or 'False', indicating if also the
                                   geometries of countries have to be exported
                                   (optional - default: 'False')
    """
    req_dict = request.GET if request.method == 'GET' else request.POST
    if not req_dict.get('sv_variables_ids'):
        msg = ('Please specify the sv_variables_ids parameter: a list of'
               ' comma-separated codes of social vulnerability variables.'
               ' Optional parameters: country_iso_codes (default: get data'
               ' for all countries); export_geometries (default: False)')
        response = HttpResponse(msg, status="400")
        return response
    sv_variables_ids = req_dict['sv_variables_ids']
    country_iso_codes = req_dict.get('country_iso_codes')
    export_geometries = (req_dict.get('export_geometries') == 'True')
    country_iso_codes_list = []
    if country_iso_codes:
        country_iso_codes_list = [iso.strip()
                                  for iso in country_iso_codes.split(',')]
    response_data = _stream_variables_data_as_csv_national(
        sv_variables_ids, export_geometries, country_iso_codes_list)
    filename = 'sv_data_by_variables_ids_export.csv'
    content_disp = 'attachment; filename="%s"' % filename
    mimetype = 'text/csv'
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    # response['content-length'] = len(response.content)
    return response


@condition(etag_func=None)
@allowed_methods(('GET', 'POST',))
@sign_in_required
def export_variables_data_subnational(request):
    """
    Export a csv file containing data corresponding to the social vulnerability
    variables which ids are given in input
    If zone identifiers are also provided, only the corresponding data will
    be exported

    :param request:
        A "GET" or "POST" :class:`django.http.HttpRequest` object containing
        the following parameters:
            * 'sv_variables_ids': a string of comma-separated ids of social
                                  vulnerability variables
            * 'zone_ids': a string of pipe-separated tuples
                          (name, country_iso, parent_label)
            * 'export_geometries': 'True' or 'False', indicating if also the
                                   geometries of countries have to be exported
                                   (optional - default: 'False')
    """
    req_dict = request.GET if request.method == 'GET' else request.POST
    if not req_dict.get('sv_variables_ids'):
        msg = ('Please specify the sv_variables_ids parameter: a list of'
               ' comma-separated codes of social vulnerability variables.')
        response = HttpResponse(msg, status="400")
        return response
    if not req_dict.get('zone_ids'):
        msg = ('Please specify the zone_ids parameter: a list of'
               ' comma-separated tuples (name, country_iso, parent_label)')
        response = HttpResponse(msg, status="400")
        return response
    sv_variables_ids = req_dict['sv_variables_ids']
    zone_ids = req_dict.get('zone_ids')
    export_geometries = (req_dict.get('export_geometries') == 'True')
    zone_ids_list = []
    if zone_ids:
        for zone_id in zone_ids.split('|'):
            # the zone_id string is formatted as
            # 'name (country_iso: parent_label)'
            name = zone_id.split('(')[0].strip()
            country_iso = zone_id.split('(')[1].split(':')[0].strip()
            parent_label = zone_id.split(':')[1].split(')')[0].strip()
            zone_ids_list.append(dict(name=name,
                                      country_iso=country_iso,
                                      parent_label=parent_label))
    response_data = _stream_variables_data_as_csv_subnational(
        sv_variables_ids, export_geometries, zone_ids_list)
    filename = 'sv_data_by_variables_ids_export.csv'
    content_disp = 'attachment; filename="%s"' % filename
    mimetype = 'text/csv'
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    # response['content-length'] = len(response.content)
    return response


def _stream_variables_data_as_csv_subnational(
        sv_variables_ids, export_geometries, zone_ids_list):
    copyright = copyright_csv(COPYRIGHT_HEADER)
    yield copyright
    sv_variables_ids_list = [var_id.strip()
                             for var_id in sv_variables_ids.split(",")]
    # build the header, appending sv_variables_ids properly
    header_list = ["ZONE_NAME", "CNTRY_ISO", "PARENT_LBL"]
    indicators = Indicator.objects.filter(code__in=sv_variables_ids_list)
    # NOTE: unavailable indicators will be ignored
    for indicator in indicators:
        header_list.append(indicator.code)
    if export_geometries:
        header_list.append("GEOMETRY")
    csvfile = StringIO()
    csvwriter = csv.writer(csvfile, delimiter=',', quotechar='"')
    csvwriter.writerow(header_list)
    yield csvfile.getvalue()
    for zone_id in zone_ids_list:
        zone = Zone.objects.get(name=zone_id['name'],
                                country_iso=zone_id['country_iso'],
                                parent_label=zone_id['parent_label'])
        if zone.sanitized_name:
            sanitized_name = zone.sanitized_name.encode('utf-8')
        else:
            sanitized_name = unicodedata.normalize(
                'NFKD', zone.name).encode('ascii', 'ignore')
        sanitized_parent_label = unicodedata.normalize(
            'NFKD', zone.parent_label).encode('ascii', 'ignore')
        # NOTE: It depends on which country model is being used
        # row = [country.iso, country.name_engli.encode('utf-8')]
        row = [sanitized_name,
               zone.country_iso,
               sanitized_parent_label]
        ind_vals = []
        for indicator in indicators:
            try:
                val = ZoneIndicator.objects.get(
                    zone=zone, indicator=indicator).value
            except:
                val = ''
            ind_vals.append(val)
        row.extend(ind_vals)
        if export_geometries:
            row.append(zone.the_geom)
        # redefine csvfile and csvwriter to avoid yielding again previous stuff
        csvfile = StringIO()
        csvwriter = csv.writer(csvfile, delimiter=',', quotechar='"')
        csvwriter.writerow(row)
        yield csvfile.getvalue()


def _stream_variables_data_as_csv_national(
        sv_variables_ids, export_geometries, country_iso_codes_list):
    copyright = copyright_csv(COPYRIGHT_HEADER)
    yield copyright
    sv_variables_ids_list = [var_id.strip()
                             for var_id in sv_variables_ids.split(",")]
    # build the header, appending sv_variables_ids properly
    header_list = ["ISO", "CNTRY_NAME"]
    indicators = Indicator.objects.filter(code__in=sv_variables_ids_list)
    # NOTE: unavailable indicators will be ignored
    for indicator in indicators:
        header_list.append(indicator.code)
    if export_geometries:
        header_list.append("GEOMETRY")
    csvfile = StringIO()
    csvwriter = csv.writer(csvfile, delimiter=',', quotechar='"')
    csvwriter.writerow(header_list)
    yield csvfile.getvalue()
    study = Study.objects.get(
        name='Social and Economic Vulnerability Global Indicator Database')
    for zone in Zone.objects.filter(study=study):
        if (zone.admin_level > 0 or country_iso_codes_list
                and zone.country_iso not in country_iso_codes_list):
            continue
        # NOTE: It depends on which country model is being used
        # row = [country.iso, country.name_engli.encode('utf-8')]
        row = [zone.country_iso, zone.name.encode('utf-8')]
        ind_vals = []
        for indicator in indicators:
            try:
                val = ZoneIndicator.objects.get(
                    zone=zone, indicator=indicator).value
            except:
                val = ''
            ind_vals.append(val)
        row.extend(ind_vals)
        if export_geometries:
            row.append(zone.the_geom)
        # redefine csvfile and csvwriter to avoid yielding again previous stuff
        csvfile = StringIO()
        csvwriter = csv.writer(csvfile, delimiter=',', quotechar='"')
        csvwriter.writerow(row)
        yield csvfile.getvalue()


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines) + "\n"
