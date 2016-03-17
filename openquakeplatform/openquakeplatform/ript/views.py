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

from django.http import (HttpResponse,
                         HttpResponseBadRequest,
                         )


def _get_error_line(exc_msg):
    # check if the exc_msg contains a line number indication
    search_match = re.search(r'line \d+', exc_msg)
    if search_match:
        error_line = int(search_match.group(0).split()[1])
    else:
        error_line = None
    return error_line


def _make_response(error_msg, error_line, valid):
    response_data = dict(error_msg=error_msg,
                         error_line=error_line,
                         valid=valid)
    return HttpResponse(
        content=json.dumps(response_data), content_type=JSON)

JSON = 'application/json'


def _do_validate_nrml(xml_text):
    from openquake.baselib.general import writetmp
    from openquake.commonlib import nrml
    xml_file = writetmp(xml_text, suffix='.xml')
    nrml.parse(xml_file)


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
    try:
        _do_validate_nrml(xml_text)
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
            # but we can attempt anyway to extract it
            error_line = _get_error_line(unicode(exc_msg))
            return _make_response(
                error_msg=unicode(exc_msg), error_line=error_line,
                valid=False)
        error_msg = exc_msg
        error_line = _get_error_line(exc_msg)
        return _make_response(
            error_msg=error_msg, error_line=error_line, valid=False)
    else:
        return _make_response(error_msg=None, error_line=None, valid=True)


def sendback_nrml(request):
    """
    Leverage oq-risklib to check if a given XML text is a valid NRML. If it is,
    save it as a XML file.

    :param request:
        a `django.http.HttpRequest` object containing the mandatory
        parameter 'xml_text': the text of the XML to be validated as NRML
        and the optional parameter 'func_type': the function type (known types
        are ['exposure', 'fragility', 'vulnerability', 'sites_conditions'])

    :returns: an XML file, containing the given NRML text
    """
    xml_text = request.POST.get('xml_text')
    func_type = request.POST.get('func_type')
    if not xml_text:
        return HttpResponseBadRequest(
            'Please provide the "xml_text" parameter')
    known_func_types = [
        'exposure', 'fragility', 'vulnerability', 'sites_conditions']
    try:
        _do_validate_nrml(xml_text)
    except:
        return HttpResponseBadRequest(
            'Invalid NRML')
    else:
        if func_type in known_func_types:
            filename = func_type + '_model.xml'
        else:
            filename = 'unknown_model.xml'
        resp = HttpResponse(content=xml_text,
                            content_type='application/xml')
        resp['Content-Disposition'] = (
            'attachment; filename="' + filename + '"')
        return resp
