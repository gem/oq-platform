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
#from geonode.exposure import models
import simplejson
from django.views.decorators.http import condition
import cStringIO as StringIO
import csv

@condition(etag_func=None)
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
    from django.db import connections
    cursor = connections['geddb'].cursor()
    cursor.execute("SELECT ms.ms_name, ms.ms_value, mss.is_urban, mss.occupancy, abis.study_region_id, abis.gadm_country_id, pg.gem_shorthand_form FROM eqged.agg_build_infra_src abis JOIN eqged.mapping_scheme_src mss ON abis.mapping_scheme_src_id=mss.id JOIN eqged.mapping_scheme ms ON ms.mapping_scheme_src_id=mss.id JOIN eqged.pager_to_gem pg ON ms.ms_name=pg.pager_str WHERE ST_Intersects(the_geom, ST_MakeEnvelope(%s, %s, %s, %s, 4326)) AND is_urban AND occupancy='Res';", [lng1, lat1, lng2, lat2])

    df_table = cursor.fetchall()
    
    #get the time of day table 
    cursor.execute("select night_pop_ratio from eqged.pop_allocation where gadm_country_id=65 AND occupancy='Res' AND is_urban")
    tod_table = cursor.fetchall() 

    result = []

    #get the population table
    cursor.execute("SELECT grid.id,grid.the_geom,grid.lat,grid.lon,pop.pop_value,gpa.is_urban, country.id,country.iso FROM eqged.grid_point grid JOIN eqged.population pop ON pop.grid_point_id=grid.id JOIN eqged.grid_point_country gpc ON gpc.grid_point_id=grid.id JOIN eqged.gadm_country country ON gpc.gadm_country_id=country.id JOIN eqged.grid_point_attribute gpa ON grid.id=gpa.grid_point_id WHERE ST_intersects(ST_MakeEnvelope(%s, %s, %s, %s, 4326), grid.the_geom) AND pop.population_src_id=3 LIMIT 10;", [lng1, lat1, lng2, lat2])

    pops = cursor.fetchall()

    # copyright header
    copyright = '''
# Version 1.0 released on 31.01.2013
#
# Copyright (C) 2013 GEM Foundation
#
# Contributions by: see http://www.globalquakemodel.org/contributors
#
# You may use this work under the terms of the CC-BY-NC-SA 3.0 (unported)
# [http://creativecommons.org/licenses/by-nc-sa/3.0/]
#
# THE WORK IS PROTECTED BY COPYRIGHT AND/OR OTHER APPLICABLE LAW. INSOFAR 
# AS THIS WORK IS PROTECTED BY LAWS THAT NEIGHBOUR OR ARE SIMILARLY RELATED
# TO COPYRIGHT, SUCH AS DATABASE RIGHTS AS INTRODUCED IN EUROPE BY THE 
# DIRECTIVE 96/9/EC, YOU ALSO MAY USE THIS WORK UNDER THE TERMS OF 
# CC-BY-NC-SA 3.0 (unported).
# [http://creativecommons.org/licenses/by-nc-sa/3.0/]
#
# ANY USE OF THE WORK OTHER THAN AS AUTHORIZED UNDER THIS LICENSE OR 
# DIRECTLY ALLOWED BY THE APPLICABLE LAW IS PROHIBITED.
#
# If you have any questions or if you wish to seek permission to use this 
# data beyond what is offered by CC-BY-NC-SA 3.0 (unported), please contact 
# the GEM Foundation at: licensing@globalquakemodel.org 
# 
# More information on licensing: http://www.globalquakemodel.org/licensing

'''

    writer.writerow([copyright])

    #export metadata
    coordinates =  '(%s, %s, %s, %s)' % (lat1, lng1, lat2, lng2)
    metadata = '''# Metadata: Dataset Version X.X.X, Selection Bounding Box: %s, EPSG: 4326, Admin Level: 0, Time of Day: Night, Res/NonRes/Both: Res, Dwelling Fractions(s) Selected: PAGER
'''% coordinates

    writer.writerow([metadata]) 

    # csv header
    writer.writerow(['''ISO, pop_calculated_value, pop_cell_ID, lon, lat, study_region, gadm country id, PAGER taxonomy, GEM taxonomy'''])

    # Exposure table
    for pop in pops:
      for tod in tod_table:
        for df in df_table:
	    if pop[6] == df[5]:
	        writer.writerow([pop[7], pop[4] * tod[0] * df[1], pop[0], pop[2], pop[3], df[4], df[5], df[0], df[5]])
    return response

    # Stream file to client
#from django.views.decorators.http import condition

#@condition(etag_func=None)
#def stream_response(request):
#    resp = HttpResponse( stream_response_generator(), mimetype='text/html')
#    return resp

def stream_response_generator():
    yield "<html><body>\n"
    for x in range(1,11):
        yield "<div>%s</div>\n" % x
        yield " " * 1024  # Encourage browser to render incrementally
        time.sleep(1)
    yield "</body></html>\n"
