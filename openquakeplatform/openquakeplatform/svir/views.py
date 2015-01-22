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

import csv
from django.http import (HttpResponse,
                         HttpResponseBadRequest,
                         HttpResponseNotFound,)
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import condition
from openquakeplatform.utils import (allowed_methods,
                                     sign_in_required)
from openquakeplatform.svir.models import (Theme,
                                           Subtheme,
                                           Keyword,
                                           Indicator,
                                           CustomRegion,
                                           CountryIndicator,)

COPYRIGHT_HEADER = u"""\
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

 More information on licensing: http://www.globalquakemodel.org/licensing
"""


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
            'Please provide a theme to get the corresponding subthemes.')
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
    indicators which have the specified name, keywords, theme and/or subtheme

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
        also the subtheme is provided, then the list will be filtered by
        subtheme.

    :return:
        a csv file in which each line contains the following data:
            * indicator.code
            * indicator.name
            * indicator.theme
            * indicator.subtheme
            * indicator.description
            * indicator.source (unicode which also displays
                                year_min and year_max)
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

    # start with the whole set of indicators, then refine filtering
    indicators = Indicator.objects.all()

    if name_str:
        indicators = indicators.filter(name__icontains=name_str)

    if keywords_str:
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
def export_countries_info(request):
    """
    Export a csv file containing iso codes and names of countries for which
    socioeconomic data are available
    """
    response = HttpResponse(content_type='text/csv')
    content_disp = 'attachment; filename="countries_info_export.csv"'
    response['Content-Disposition'] = content_disp
    copyright = copyright_csv(COPYRIGHT_HEADER)
    writer = csv.writer(response)
    response.write(copyright + "\n")
    writer.writerow(['ISO', 'NAME'])
    inclusive_region = CustomRegion.objects.get(
        name='Countries with socioeconomic data')
    for country in inclusive_region.countries.all():
        # NOTE: It depends on which country model is being used
        # row = [country.iso, country.name_engli.encode('utf-8')]
        row = [country.iso, country.name_0.encode('utf-8')]
        writer.writerow(row)
    return response


@condition(etag_func=None)
@allowed_methods(('GET', ))
@sign_in_required
def export_variables_data(request):
    """
    Export a csv file containing data corresponding to the social vulnerability
    variables which ids are given in input
    If country iso codes are also provided, only the corresponding data will
    be exported

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing the
        following parameter:
            * 'sv_variables_ids': a string of comma-separated ids of social
                                  vulnerability variables
            * 'country_iso_codes': a string of comma-separated country iso
                                   codes
            * 'export_geometries': a boolean indicating if the geometries of
                                   countries need to be exported too
    """
    if not request.GET.get('sv_variables_ids'):
        msg = ('A list of comma-separated social vulnerability variable names'
               ' must be specified')
        response = HttpResponse(msg, status="400")
        return response
    country_iso_codes = request.GET.get('country_iso_codes')
    country_iso_codes_list = []
    if country_iso_codes:
        country_iso_codes_list = [iso.strip()
                                  for iso in country_iso_codes.split(',')]
    response = HttpResponse(content_type='text/csv')
    content_disp = 'attachment; filename="sv_data_by_variables_ids_export.csv"'
    response['Content-Disposition'] = content_disp
    copyright = copyright_csv(COPYRIGHT_HEADER)
    writer = csv.writer(response)
    response.write(copyright + "\n")
    sv_variables_ids = request.GET['sv_variables_ids']
    sv_variables_ids_list = [var_id.strip()
                             for var_id in sv_variables_ids.split(",")]
    # build the header, appending sv_variables_ids properly
    header_list = ["ISO", "COUNTRY_NAME"]
    for sv_variable_id in sv_variables_ids_list:
        header_list.append(sv_variable_id)
    export_geometries = request.GET.get('export_geometries') == 'True'
    if export_geometries:
        header_list.append("GEOMETRY")
    writer.writerow(header_list)
    indicators = Indicator.objects.filter(code__in=sv_variables_ids_list)
    inclusive_region = CustomRegion.objects.get(
        name='Countries with socioeconomic data')
    for country in inclusive_region.countries.all():
        if country_iso_codes and country.iso not in country_iso_codes_list:
            continue
        # NOTE: It depends on which country model is being used
        # row = [country.iso, country.name_engli.encode('utf-8')]
        row = [country.iso, country.name_0.encode('utf-8')]
        ind_vals = []
        for indicator in indicators:
            try:
                val = CountryIndicator.objects.get(
                    country=country, indicator=indicator).value
            except:
                val = ''
            ind_vals.append(val)
        row.extend(ind_vals)
        if export_geometries:
            row.append(country.the_geom)
        writer.writerow(row)
    response['content-length'] = len(response.content)
    return response


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines)
