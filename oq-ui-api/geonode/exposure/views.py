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

from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt, csrf_response_exempt
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseBadRequest
#from django.utils import simplejson
from django.contrib.contenttypes.models import ContentType
from geonode.exposure import models
import simplejson
from django.db import connection
from django.views.decorators.http import condition
import cStringIO as StringIO
import csv

#test communication with JS
def xhr_test(request):
    if request.is_ajax():
        message = "Hello AJAX"
    else:
        message = "Hello"
    return HttpResponse(message)

    
#def read_pop(request):
#        lat1 = request.GET['lat1']
#	lng1 = request.GET['lng1']
#	lat2 = request.GET['lat2']
#	lng2 = request.GET['lng2']

	#population_cells = models.grump_pop_ur2.objects.raw("""
#SELECT grid.id,grid.the_geom,pop.pop_value,gpa.is_urban, country.id,country.iso FROM eqged.grid_point grid JOIN eqged.population pop ON pop.grid_point_id=grid.id JOIN eqged.grid_point_country gpc ON gpc.grid_point_id=grid.id JOIN eqged.gadm_country country ON gpc.gadm_country_id=country.id JOIN eqged.grid_point_attribute gpa ON grid.id=gpa.grid_point_id WHERE ST_intersects(ST_MakeEnvelope(%s, %s, %s, %s, 4326), grid.the_geom) LIMIT 10;
#""", [lat1, lng1, lat2, lng2])

#	result = []

#	for cell in population_cells:
#		result.append( { "id": cell.id, "pop_value": cell.pop_value })

        #get the time of day table
#        tod_table = models.pop_allocation.objects.raw("""
#select * from eqged.pop_allocation where gadm_country_id=65 AND occupancy='Res' AND is_urban;
#""", [])

#        todResult = []

#        for cell in tod_table:
#                todResult.append( { "id": cell.id, "night_pop_ratio": cell.night_pop_ratio })

        #get the dwelling fractions table
	#cursor = connection.cursor()

        #df_table = models.agg_build_infra_src.objects.raw("""
#SELECT ms.ms_name, ms.ms_value, mss.is_urban, mss.occupancy, abis.study_region_id FROM eqged.agg_build_infra_src abis JOIN eqged.mapping_scheme_src mss ON abis.mapping_scheme_src_id=mss.id JOIN eqged.mapping_scheme ms ON ms.mapping_scheme_src_id=mss.id WHERE ST_Intersects(the_geom, ST_MakeEnvelope(%s, %s, %s, %s, 4326)) AND is_urban AND occupancy='Res';
#""", [lat1, lng1, lat2, lng2])

#        dfResult = []

#        for cell in df_table:
#                dfResult.append( { "ms_name": cell.ms_name, "ms_value": cell.ms_value })

#	openquake.db.models.AssetManager.contained_in

#	return HttpResponse(simplejson.dumps(todResult))
#	return HttpResponse(lat1 +" "+ lng1 )

	#stream an HttpResponse with Django

def read_pop(request):
    #get the lat long variables from the client
    lat1 = request.GET['lat1']
    lng1 = request.GET['lng1']
    lat2 = request.GET['lat2']
    lng2 = request.GET['lng2']
    # get the response object, this can be used as a stream.
    response = HttpResponse(mimetype='text/csv')
    # force download.
    response['Content-Disposition'] = 'attachment;filename="export.csv"'

    # the csv writer
    writer = csv.writer(response)

    #get the dwelling fractions table
    cursor = connection.cursor()

    df_table = models.agg_build_infra_src.objects.raw("""
SELECT ms.ms_name, ms.ms_value, mss.is_urban, mss.occupancy, abis.study_region_id FROM eqged.agg_build_infra_src abis JOIN eqged.mapping_scheme_src mss ON abis.mapping_scheme_src_id=mss.id JOIN eqged.
mapping_scheme ms ON ms.mapping_scheme_src_id=mss.id WHERE ST_Intersects(the_geom, ST_MakeEnvelope(%s, %s, %s, %s, 4326)) AND is_urban AND occupancy='Res';
""", [lat1, lng1, lat2, lng2])

    dfResult = []

    for cell in df_table:
        dfResult.append( { "ms_name": cell.ms_name, "ms_value": cell.ms_value })

    #get the time of day table
    tod_table = models.pop_allocation.objects.raw("""
select * from eqged.pop_allocation where gadm_country_id=65 AND occupancy='Res' AND is_urban;
""", [])

    todResult = []

    for cell in tod_table:
        todResult.append( { "id": cell.id, "night_pop_ratio": cell.night_pop_ratio })

    return response

