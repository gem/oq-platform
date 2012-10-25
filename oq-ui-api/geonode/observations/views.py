# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2010-2012, GEM Foundation.
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.

from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt, csrf_response_exempt
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseBadRequest
from django.utils import simplejson

from geonode.observations import models, utils


OK_RESPONSE = HttpResponse('Ok')


@csrf_exempt
def join_traces(request):
    if request.method == 'POST':
        json_data = simplejson.loads(request.raw_post_data)
        fault_section = models.FaultSection.objects.create(sec_name=json_data['section_name'])

        traces = [models.Trace.objects.get(pk=trace_fid.split('.')[1])
                  for trace_fid in json_data['trace_ids']]
        utils.join_traces(traces, fault_section)

    return OK_RESPONSE

@csrf_exempt
def join_faultsections(request):
    """
    Create a fault from fault sections
    """
    if request.method == 'POST':
        json_data = simplejson.loads(request.raw_post_data)
        fault_sections = [models.FaultSection.objects.get(pk=fault_section_id)
                          for fault_section_id in json_data['fault_section_ids']]
        fault_name = json_data['fault_name']
        utils.join_fault_sections(fault_sections, fault_name)
        return OK_RESPONSE
    else:
        return HttpResponseBadRequest()


@csrf_exempt
def create_faultsource(request):
    if request.method == 'POST':
        json_data = simplejson.loads(request.raw_post_data)
        fault_id = json_data['fault_id'].split('.')[-1]
        fault = models.Fault.objects.get(pk=fault_id)
        error = utils.create_faultsource(fault)
        if not error:
            return OK_RESPONSE
        else:
            return HttpResponseBadRequest(error)
    else:
        return HttpResponseBadRequest()
    
@csrf_exempt
def updatecomputedfields(request):
    models.updatecomputedfields()
    return OK_RESPONSE
