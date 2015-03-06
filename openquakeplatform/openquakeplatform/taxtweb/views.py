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

def populate(s):
    """
function populate(s) {
    var sar, subar, dirx, diry, el, i;

    sar = s.split('/');

    //
    //  DIRECTION
    dirx = acheck(sar, 'DX');

    if (dirx == null || dirx == "DX" || dirx == "DX+D99") {
        $("#Direction1RB1").prop("checked", true);
        taxt_Direction1RB1Click(null);
    }
    else if (dirx == "DX+PF") {
        $("#Direction1RB2").prop("checked", true);
        taxt_Direction1RB2Click(null);
    }
    else {
        alert("Not valid 'Direction X' found.");
        return false;
    }

    diry = acheck(sar, 'DY');

    // find sub-section for DirX material
    if (dirx == null && diry == null) {
        subar = sar;
    }
    else if (dirx == null && diry != null) {
        alert("Invalid format: DY specified without DX.");
        return false;
    }
    else {
        dirx_idx =

for (i = 0 ; i < sar.length ; i++) {
        }

    }
    //
    //  MATERIAL (Dir X)



}
    """

    return True

def index(request, **kwargs):

    try:
        tab_id = int(request.GET.get("tab_id", 1))
        if tab_id < 1 or tab_id > 4:
            tab_id = 1
    except ValueError as e:
        tab_id = 1

    desc = [ 'Structural System', 'Building Information', 'Exterior Attributes', 'Roof/Floor/Foundation' ]
    tab_content = ""
    for i in range(0, len(desc)):
        tab_content = (tab_content +
                        '<li id="tab_id-%d" class="tab%s%s" onclick="tab_set(this);"><span>%s</span></li>' %
                        (i+1, ("_selected" if i + 1 == tab_id else ""),
                        (" tab_first" if i == 0 else ""), desc[i]))



    sub1desc = ['Direction X', 'Direction Y']
    sub1tab_content = ""
    for i in range(0, len(sub1desc)):
        sub1tab_content = (sub1tab_content +
                            '<li id="sub1tab_id-%d" class="subtab%s%s" onclick="sub1tab_set(this);"><span>%s</span></li>' %
                            (i+1, ("_selected" if i + 1 == 1 else ""),
                             (" subtab_first" if i == 0 else ""), sub1desc[i]))

    is_popup = (False if request.GET.get("is_popup", False) == False else True)

    return render_to_response("taxtweb/index.html",
                              dict(is_popup=is_popup,
                                   tab_id=tab_id,
                                   tab_content=tab_content,
                                   sub1tab_content=sub1tab_content,
                                   ),
                              context_instance=RequestContext(request))

