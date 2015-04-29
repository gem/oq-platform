# Copyright (c) 2015, GEM Foundation.
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

from django.conf import settings

import json
from scipy import stats
import numpy
from lxml import etree
from django.http import HttpResponse, HttpResponseNotFound, Http404
from django.shortcuts import render_to_response
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.template import RequestContext
from django.views.generic.detail import BaseDetailView
from django.utils.cache import add_never_cache_headers
from django.utils.text import slugify
from django.contrib.messages.api import get_messages

from openquakeplatform.vulnerability.models import TA, TYPES_OF_ASSESSMENT 

def index(request, **kwargs):
    
    try:
        type_of_assessment = int(request.GET.get("type_of_assessment",
                                                 TA.FRAGILITY))
        if type_of_assessment not in dict(TYPES_OF_ASSESSMENT):
            type_of_assessment = TA.FRAGILITY
    except ValueError as e:
        type_of_assessment = TA.FRAGILITY

    desc = [ 'Structural System', 'Building Information', 'Exterior Attributes', 'Roof/Floor/foundation' ]
    menu_content = ""
    for i in range(0, len(desc)):
        menu_content = (menu_content +
                        '<li id="menu_id-%d" class="vuln_menu%s%s" onclick="menu_set(this);"><span>%s</span></li>' %
                        (i+1, ("_selected" if i + 1 == type_of_assessment else ""), 
                        (" vuln_menu_first" if i == 0 else ""), desc[i]))



    sub1desc = ['Direction X', 'Direction Y']
    sub1menu_content = ""
    for i in range(0, len(sub1desc)):
        sub1menu_content = (sub1menu_content +
                            '<li id="sub1menu_id-%d" class="vuln_submenu%s%s" onclick="sub1menu_set(this);"><span>%s</span></li>' %
                            (i+1, ("_selected" if i + 1 == 1 else ""), 
                             (" vuln_submenu_first" if i == 0 else ""), sub1desc[i]))

    is_popup = (False if request.GET.get("is_popup", False) == False else True)

    return render_to_response("taxtweb/index.html",
                              dict(is_popup=is_popup,
                                   type_of_assessment=type_of_assessment,
                                   menu_content=menu_content,
                                   sub1menu_content=sub1menu_content,
                                   ),
                              context_instance=RequestContext(request))

