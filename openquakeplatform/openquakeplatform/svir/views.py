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

from django.http import HttpResponse
from django.views.decorators.http import condition
import util

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

 More information on licensing: http://www.globalquakemodel.org/licensing
"""

SV_THEMES_CSV_HEADER = ('\ntheme\n')
SV_SUBTHEMES_CSV_HEADER = ('\nsubtheme\n')
SV_TAGS_CSV_HEADER = ('\ntag\n')
SV_IDS_AND_NAMES_CSV_HEADER = ('\nid, name\n')


@condition(etag_func=None)
@util.allowed_methods(('GET', ))
@util.sign_in_required
def export_sv_items(request):
    """
    Export a csv file containing the requested social vulnerability items

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
        corresponding indices and their ids
    """
    content_disp = 'attachment; filename="sv_items_export.csv"'
    mimetype = 'text/csv'
    response_data = _stream_sv_items(request)
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    return response


@condition(etag_func=None)
@util.allowed_methods(('GET', ))
@util.sign_in_required
def export_sv_data_by_indices(request):
    """
    Export a csv file containing social vulnerability data corresponding to the
    index names provided

    :param request:
        A "GET" :class:`django.http.HttpRequest` object containing the
        following parameter:
            * 'indices': a string of comma-separated social vulnerability index
                         names
    """
    content_disp = 'attachment; filename="sv_data_by_indices_export.csv"'
    mimetype = 'text/csv'
    response_data = _stream_sv_data_by_indices(request)
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    return response


def _stream_sv_items(request):
    theme = request.GET.get('theme')
    subtheme = request.GET.get('subtheme')
    tag = request.GET.get('tag')
    copyright = copyright_csv(COPYRIGHT_HEADER)
    yield copyright
    if theme and subtheme and tag:
        sv_ids_and_names = util._get_sv_ids_and_names(theme, subtheme, tag)
        yield SV_IDS_AND_NAMES_CSV_HEADER
        for id, name in sv_ids_and_names:
            row = [id, name]
            row = ["\"" + str(x) + "\"" for x in row]
            yield '%s\n' % ','.join(row)
        return
    elif theme and subtheme:
        sv_items = util._get_sv_tags(theme, subtheme)
        yield SV_TAGS_CSV_HEADER
    elif theme:
        sv_items = util._get_sv_subthemes(theme)
        yield SV_SUBTHEMES_CSV_HEADER
    else:
        sv_items = util._get_sv_themes()
        yield SV_THEMES_CSV_HEADER
    for sv_item in sv_items:
        yield '%s\n' % sv_item


def _stream_sv_data_by_indices(request):
    indices = request.GET['indices']
    copyright = copyright_csv(COPYRIGHT_HEADER)
    yield copyright
    sv_data_by_indices = util._get_sv_data_by_indices(indices)
    yield ('\niso, country_name, %s\n' % indices)
    for row in sv_data_by_indices:
        row = [unicode(x) for x in row]
        yield '%s\n' % ','.join(row)


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines)
