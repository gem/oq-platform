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

import csv
import json
from django.http import (HttpResponse,
                         HttpResponseBadRequest,
                         HttpResponseNotFound,)
from django.views.decorators.http import condition
from django.core.exceptions import ValidationError
from openquakeplatform.utils import (allowed_methods,
                                     sign_in_required)
from openquakeplatform.svir import util
from openquakeplatform.svir.models import (Project,
                                           Theme,
                                           Subtheme,
                                           Keyword,
                                           Indicator,
                                           CustomRegion,
                                           CountryIndicator,)

COPYRIGHT_HEADER = u"""\
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

 More information on licensing: http://www.globalquakemodel.org/licensing
"""


@condition(etag_func=None)
@allowed_methods(('POST', ))
@sign_in_required
def create_project(request):
    """
    Create a new SVIR project, given its name and description
    :param request:
        A "POST" :class:`django.http.HttpRequest` object containing
        the following parameters::
            * 'name'
            * 'description'
    :return:
        a json object containing
            * 'project_id': the id of the new project saved (if the project is
                            correctly saved)
            * the names of the invalid fields, in case of validation errors
            * a generic 'error' if the project is not saved for another reason
    """
    name = request.GET.get('name', None)
    description = request.GET.get('description', None)
    # if not name or not description:
    #     return HttpResponse('Project name and description are mandatory')
    try:
        project = Project(name=name, description=description)
        project.created_by = request.user
        project.full_clean()
        project.save()
    except ValidationError, e:
        return HttpResponse(json.dumps(e), content_type="application/json")
    except Exception, e:
        return HttpResponse(json.dumps(e), content_type="application/json")
    return HttpResponse(json.dumps(dict(project_id=project.pk)),
                        content_type="application/json")


@condition(etag_func=None)
@allowed_methods(('POST', ))
@sign_in_required
def upload_project_data(request):
    """
    Upload into Project a GeoJSON object containing project data
    """
    pass


@condition(etag_func=None)
@allowed_methods(('POST', ))
@sign_in_required
def upload_project_definition(request):
    """
    Upload into Project JSON object containing project definition
    """
    project_id = request.GET.get('project_id', None)
    project_definition = request.GET.get('project_definition', None)
    try:
        project = Project.objects.get(pk=project_id)
    except:
        return HttpResponseNotFound(
            'Project with id [%s] not found' % project_id)
    project.metadata = project_definition
    project.save()
    return HttpResponse('Project definition successfully uploaded')


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def list_themes(request):
    themes = Theme.objects.all()
    if not themes:
        return HttpResponseNotFound('No themes available in the DB')
    response = HttpResponse()
    first=True
    for theme in themes:
        if first:
            first=False
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
            'Please provide a theme to get the corresponding subthemes.')
    try:
        theme_obj = Theme.objects.get(name=theme_str)
    except:
        return HttpResponseNotFound('Theme not found')
    subthemes = theme_obj.subtheme_set.all()
    if not subthemes:
        return HttpResponseNotFound(
            'No subtheme corresponds to the given theme')
    response = HttpResponse()
    first=True
    for subtheme in subthemes:
        if first:
            first=False
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
    indicators which have the specified keywords and/or subtheme 

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing at least
        one of the following parameters:
            * 'name'
            * 'keywords'
            * 'theme'
            * 'subtheme'
        If the indicator name (or part of it) is provided, the indicators
        which name contain the provided string will be included in the csv.
        If one or more keywords are provided, the csv will list the
        indicators which keywords contain the user-provided string/s.
        If the theme is provided, the list will be filtered by theme, unless
        also the subtheme is provided, then the list will be filtered by subtheme.

    :return:
        a csv file in which each line contains the following data: 
            * indicator.code 
            * indicator.name
            * indicator.theme
            * indicator.subtheme
            * indicator.description
            * indicator.source (unicode which also displays year_min and year_max)
            * indicator.aggregation_method
            * indicator.keywords
    """
    # We don't need 'Tag' anymore, but we need to show other fields
    # We don't display update_periodicity and internal_consistency_metric
    response = HttpResponse(content_type='text/csv')
    content_disp = 'attachment; filename="socioeconomic_indicators_export.csv"'
    response['Content-Disposition'] = content_disp
    name_str = request.GET.get('name')
    keywords_str = request.GET.get('keywords')
    theme_str = request.GET.get('theme')
    subtheme_str = request.GET.get('subtheme')
    copyright = copyright_csv(COPYRIGHT_HEADER)
    response.write(copyright + "\n")
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
        theme_obj = Theme.objects.get(name=theme_str)

    subtheme_obj = None
    if subtheme_str:
        subtheme_obj = Subtheme.objects.get(name=subtheme_str)
 
    # start with the whole set of indicators, then refine filtering
    indicators = Indicator.objects.all()

    if name_str:
        indicators = indicators.filter(name__icontains=name_str)

    if keywords:
        indicators = indicators.filter(keywords__in=keywords).distinct()

    if theme_obj:
        if not subtheme_obj:
            indicators = indicators.filter(theme=theme_obj)
        else:
            indicators = indicators.filter(subtheme=subtheme_obj)
    elif subtheme_obj:
        indicators = indicators.filter(subtheme=subtheme_obj)

    writer.writerow(["Code",
                     "Name",
                     "Theme",
                     "Subtheme",
                     "Description",
                     "Measurement Type",
                     "Source",
                     "Aggregation Method",
                     "Keywords"])
    for ind in indicators:
        writer.writerow([
            ind.code.encode('utf-8'),
            ind.name.encode('utf-8'),
            ind.theme.name.encode('utf-8'),
            ind.subtheme.name.encode('utf-8'),
            ind.description.encode('utf-8'),
            ind.measurement_type.name.encode('utf-8'),
            ind.source.__unicode__().encode('utf-8'),
            ind.aggregation_method.name.encode('utf-8'),
            ind.keywords_str.encode('utf-8'),
        ])
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def export_sv_category_names(request):
    """
    Export a csv file containing the requested social vulnerability category
    names

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing zero or more
        of the following parameters::
            * 'theme'
            * 'subtheme'
            * 'tag'
        If none of those parameters is provided, the csv file will contain the
        list of distinct themes in the svir DB.
        If theme is provided, the csv file will contain the corresponding list
        of distinct subthemes.
        If also the subtheme is provided, the csv file will contain the
        corresponding list of tags.
        If also the tag is provided, the csv file will contain the names of the
        corresponding social vulnerability variables and their ids
    """
    response = HttpResponse(content_type='text/csv')
    content_disp = 'attachment; filename="sv_category_names_export.csv"'
    response['Content-Disposition'] = content_disp
    theme = request.GET.get('theme')
    subtheme = request.GET.get('subtheme')
    tag = request.GET.get('tag')
    copyright = copyright_csv(COPYRIGHT_HEADER)
    response.write(copyright + "\n")
    writer = csv.writer(response)
    if theme and subtheme and tag:
        sv_items = util._get_sv_ids_and_names(theme, subtheme, tag)
        writer.writerow(["ID", "NAME"])
    elif theme and subtheme:
        sv_items = util._get_sv_tags(theme, subtheme)
        writer.writerow(["TAG"])
    elif theme:
        sv_items = util._get_sv_subthemes(theme)
        writer.writerow(["SUBTHEME"])
    else:
        writer.writerow(["THEME"])
        sv_items = util._get_sv_themes()
    for sv_item in sv_items:
        encoded_sv_item = tuple([col.encode('utf-8') for col in sv_item])
        writer.writerow(encoded_sv_item)
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def export_variables_data_by_ids(request):
    """
    Export a csv file containing data corresponding to the social vulnerability
    variables which ids are given in input

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing the
        following parameter:
            * 'sv_variables_ids': a string of comma-separated ids of social
                                  vulnerability variables
    """
    if not request.GET.get('sv_variables_ids'):
        msg = ('A list of comma-separated social vulnerability variable names'
               ' must be specified')
        response = HttpResponse(msg, status="400")
        return response
    response = HttpResponse(content_type='text/csv')
    content_disp = 'attachment; filename="sv_data_by_variables_ids_export.csv"'
    response['Content-Disposition'] = content_disp
    copyright = copyright_csv(COPYRIGHT_HEADER)
    writer = csv.writer(response)
    response.write(copyright + "\n")
    sv_variables_ids = request.GET['sv_variables_ids']
    sv_variables_ids_list = sv_variables_ids.split(",")
    # build the header, appending sv_variables_ids properly
    header_list = ["ISO", "COUNTRY_NAME"]
    for sv_variable_id in sv_variables_ids_list:
        header_list.append(sv_variable_id)
    # TODO: Currently not retreiving the geometries (they still aren't in DB)
    # header_list.append("GEOMETRY")
    writer.writerow(header_list)
    indicators = Indicator.objects.filter(code__in=sv_variables_ids_list)
    inclusive_region = CustomRegion.objects.get(
        name='Countries with socioeconomic data')
    for country in inclusive_region.countries.all():
        row = [country.iso3, country.name.encode('utf-8')]
        ind_vals = []
        for indicator in indicators:
            try:
                val = CountryIndicator.objects.get(
                    country=country, indicator=indicator).value
            except:
                val = ''
            ind_vals.append(val)
        row.extend(ind_vals)
        writer.writerow(row)
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def export_sv_data_by_variables_ids(request):
    """
    Export a csv file containing data corresponding to the social vulnerability
    variables which ids are given in input

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing the
        following parameter:
            * 'sv_variables_ids': a string of comma-separated ids of social
                                  vulnerability variables
    """
    if not request.GET.get('sv_variables_ids'):
        msg = ('A list of comma-separated social vulnerability variable names'
               ' must be specified')
        response = HttpResponse(msg, status="400")
        return response
    response = HttpResponse(content_type='text/csv')
    content_disp = 'attachment; filename="sv_data_by_variables_ids_export.csv"'
    response['Content-Disposition'] = content_disp
    copyright = copyright_csv(COPYRIGHT_HEADER)
    writer = csv.writer(response)
    response.write(copyright + "\n")
    sv_variables_ids = request.GET['sv_variables_ids']
    sv_variables_ids_list = sv_variables_ids.split(",")
    # build the header, appending sv_variables_ids properly
    header_list = ["ISO", "COUNTRY_NAME"]
    for sv_variable_id in sv_variables_ids_list:
        header_list.append(sv_variable_id)
    header_list.append("GEOMETRY")
    writer.writerow(header_list)
    sv_data_by_variables_ids = \
        util._get_sv_data_by_variables_ids(sv_variables_ids)
    for row in sv_data_by_variables_ids:
        encoded_row = []
        for element in row:
            if isinstance(element, unicode):
                encoded_element = element.encode('utf-8')
            else:
                encoded_element = unicode(element).encode('utf-8')
            encoded_row.append(encoded_element)
        writer.writerow(encoded_row)
    return response


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines)
