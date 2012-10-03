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


@csrf_exempt
def join_traces(request):

    response = HttpResponse()
    if request.method == 'POST':

        json_data = simplejson.loads(request.raw_post_data)
        fault_section = models.FaultSection.objects.create(sec_name=json_data['name'])

        for trace in json_data['trace_ids']:
            trace = models.Trace.objects.get(pk=trace.split('.')[1])
            trace.fault_section.add(fault_section)

    return response

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
        return HttpResponse("Fault created")
    else:
        return HttpResponseBadRequest()


@csrf_exempt
def create_faultsource(request):
    if request.method == 'POST':
        json_data = simplejson.loads(request.raw_post_data)
        fault_id = json_data['fault_id'].split('.')[-1]
        fault = models.Fault.objects.get(pk=fault_id)
        utils.create_faultsource(fault)
        return HttpResponse('ok')
    else:
        return HttpResponseBadRequest()
    
@csrf_exempt
def export(request):
    if request.method == 'PUT':
        
        json_data = simplejson.loads(request.raw_post_data)
        
    return HttpResponse('ok')


