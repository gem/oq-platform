# Copyright (c) 2012-2015, GEM Foundation.
#
# This program is free software: you can redistribute it and/or modify
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


import re
import json
from lxml import etree
# from scipy import stats
# import numpy
# import re
# try:
#     from django.contrib.admin.options import force_unicode
# except ImportError:
#     from django.utils.encoding import force_text as force_unicode

# from django.core.exceptions import ObjectDoesNotExist
# from django.http import (HttpResponse,
#                          HttpResponseNotFound,
#                          Http404,
#                          )
# from django.shortcuts import render_to_response
# from django.core import serializers
# from django.core.serializers.json import DjangoJSONEncoder
# from django.template import RequestContext
# from django.views.generic.detail import BaseDetailView
# from django.utils.cache import add_never_cache_headers
# from django.utils.text import slugify
# from django.contrib import messages
# from django.contrib.auth.models import User
# from django.shortcuts import redirect

# from models import (GeneralInformation,
#                     CAT, CATEGORIES,
#                     IMT, INTENSITY_MEASURE_TYPES,
#                     IMU,
#                     EDP,
#                     RVP, RESP_VAR_PAR,
#                     RVU, RESP_VAR_UNITS,
#                     EDU,
#                     TA, TYPES_OF_ASSESSMENT,
#                     FDT,
#                     FUNC_DISTR_TYPES,  # NOTE: Never used
#                     RV, FDS, FUNC_DISTR_SHAPES_ALL,
#                     FUNC_DISTR_SHAPES_NRML_ALL)
# from forms import FiltersForm

# SERIALIZE_NS_MAP = {None: 'http://openquake.org/xmlns/nrml/0.4',
#                     'gml': 'http://www.opengis.net/gml'}
# CART_INFO_SFX = "collection of curves to export as a single NRML file"
from django.http import (HttpResponse,
                         HttpResponseNotFound,
                         HttpResponseBadRequest,
                         )

from openquake.baselib.general import groupby, writetmp
from openquake.commonlib import nrml, readinput, valid

def _make_response(error_msg, error_line, valid):
    response_data = dict(error_msg=error_msg,
                         error_line=error_line,
                         valid=valid)
    return HttpResponse(
        content=json.dumps(response_data), content_type=JSON)

JSON = 'application/json'

def validate_nrml(request):
    """
    Leverage oq-risklib to check if a given XML text is a valid NRML

    :param request:
        a `django.http.HttpRequest` object containing the mandatory
        parameter 'xml_text': the text of the XML to be validated as NRML

    :returns: a JSON object, containing:
        * 'valid': a boolean indicating if the provided text is a valid NRML
        * 'error_msg': the error message, if any error was found
                       (None otherwise)
        * 'error_line': line of the given XML where the error was found
                        (None if no error was found or if it was not a
                        validation error)
    """
    xml_text = request.POST.get('xml_text')
    if not xml_text:
        return HttpResponseBadRequest(
            'Please provide the "xml_text" parameter')
    xml_file = writetmp(xml_text, suffix='.xml')
    try:
        nrml.read(xml_file)
    except etree.ParseError as exc:
        return _make_response(error_msg=exc.message.message,
                              error_line=exc.message.lineno,
                              valid=False)
    except Exception as exc:
        # get the exception message
        exc_msg = exc.args[0]
        if isinstance(exc_msg, bytes):
            exc_msg = exc_msg.decode('utf-8')   # make it a unicode object
        elif isinstance(exc_msg, unicode):
            pass
        else:
            # if it is another kind of object, it is not obvious a priori how
            # to extract the error line from it
            return _make_response(
                error_msg=unicode(exc_msg), error_line=None, valid=False)
        # if the line is not mentioned, the whole message is taken
        error_msg = exc_msg.split(', line')[0]
        # check if the exc_msg contains a line number indication
        search_match = re.search(r'line \d+', exc_msg)
        if search_match:
            error_line = int(search_match.group(0).split()[1])
        else:
            error_line = None
        return _make_response(
            error_msg=error_msg, error_line=error_line, valid=False)
    else:
        return _make_response(error_msg=None, error_line=None, valid=True)

