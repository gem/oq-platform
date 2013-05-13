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
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.

from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt, csrf_response_exempt
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseBadRequest
from django.contrib.contenttypes.models import ContentType
from django.utils import simplejson
from django.views.decorators.http import condition
from django.db import connections
#from exposure.template import .......
from forms import ExposureAdmin0, ExposureAdmin1, ExposureAdmin2, ExposureAdmin3, ExposureAdmin4, ExposureAdmin5, ExposureTOD
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render_to_response

from libs import render_to_wizard

import cStringIO as StringIO
import csv
import time

def exposure_form(request):
        #debug*******
        #import pdb; pdb.set_trace()
        #debug*******
        if request.method =='GET':
                #form = ExposureForm()

                #find all the admin levels available inside bounding box
                #for now, lets just do a silly simple queriy.....******* 
                cursor = connections['geddb'].cursor()
                cursor.execute("""
			SELECT
			MIN( 
			CASE
			WHEN gadm_admin_3_id IS NOT NULL THEN 3
			WHEN gadm_admin_2_id IS NOT NULL THEN 2
			WHEN gadm_admin_1_id IS NOT NULL THEN 1
			ELSE 0 
			END)
			FROM ged2.grid_point WHERE the_geom && ST_MakeEnvelope(5.93262, 46.96526, 6.63574, 46.60417, 4326)""")
                test_table = cursor.fetchall()

                result = []

		#print some stfuff
                #html = '<html><body>%s</body></html>'
		#return HttpResponse(html % test_table)

		admin_level = test_table[0][0]

		if admin_level == 0:
			form = ExposureAdmin0()
			#print something	
			#html = '<html><body>%s</body></html>'
			#return HttpResponse(html % admin_level)

                	return render_to_response('exposure-export-wizard-1.html', {'form': form}, context_instance=RequestContext(request))
		elif admin_level == 1:
			form = ExposureAdmin1()
			return render_to_response('exposure-export-wizard-1.html', {'form': form}, context_instance=RequestContext(request))
                elif admin_level == 2:
			form = ExposureAdmin2()
                        return render_to_response('exposure-export-wizard-1.html', {'form': form}, context_instance=RequestContext(request))
                elif admin_level == 3:
			form = ExposureAdmin3()
                        return render_to_response('exposure-export-wizard-1.html', {'form': form}, context_instance=RequestContext(request))
                elif admin_level == 4:
			form = ExposureAdmin4()
                        return render_to_response('exposure-export-wizard-1.html', {'form': form}, context_instance=RequestContext(request))
                elif admin_level == 5:
			form = ExposureAdmin5()
                        return render_to_response('exposure-export-wizard-1.html', {'form': form}, context_instance=RequestContext(request))
        else:
                html = '<html><body>Your request cannot be processed</body></html>'
                return HttpResponse(html)

def exposure_form2(request):
  form = ExposureTOD()
  return render_to_response('exposure-export-wizard-2.html', {'form': form}, context_instance=RequestContext(request))

#disabling etag for streaming
@condition(etag_func=None)
def read_pop(request):

    output_type = request.GET['output_type']

    content_disp = None
    mimetype = None

    if output_type == "csv":
        content_disp = 'attachment; filename="exposure_export.csv"'
        mimetype = 'text/csv'
    elif output_type == "nrml":
        content_disp = 'attachment; filename="exposure_export.xml"'
        mimetype = 'text/plain'
    else:
        raise RuntimeError(
            "Unrecognized output type '%s', only 'nrml' and 'csv' are "
            "supported" % output_type
        )

    # build the response object
    response_data = stream_response_generator(request, output_type)
    response = HttpResponse(response_data, mimetype=mimetype)
    response['Content-Disposition'] = content_disp
    return response


def stream_response_generator(request, output_type):
    """
    Stream exposure/population data from the database into a file of the
    specified ``output_type``.

    :param request:
        A :class:`django.http.request.HttpRequest` object.
    :param str output_type:
        A string indicating the desired output type. Valid values are 'csv'
        and 'nrml' (XML).
    """
    if output_type not in ('csv', 'nrml'):
        raise RuntimeError(
            "Unrecognized output type '%s', only 'nrml' and 'csv' are "
            "supported" % output_type
        )

    # get the lat long variables from the client
    lat1 = request.GET['lat1']
    lng1 = request.GET['lng1']
    lat2 = request.GET['lat2']
    lng2 = request.GET['lng2']

    cursor = connections['geddb'].cursor()
    cursor.execute("""
        SELECT country.gadm_country_id, geo.id AS geographic_region_id
        FROM (
            SELECT DISTINCT gadm_country_id
            FROM ged2.grid_point grid
            JOIN ged2.gadm_country gadm ON gadm.id=grid.gadm_country_id
            WHERE ST_intersects(ST_MakeEnvelope(5.93262, 46.96526, 6.63574, 46.60417, 4326),grid.the_geom) 
        ) country
        JOIN ged2.geographic_region geo ON country.gadm_country_id=geo.gadm_country_id
        """)
    country_reg_codes = cursor.fetchall()
    country_codes = [r[0] for r in country_reg_codes]
    region_codes = [r[1] for r in country_reg_codes]

    ccStr = ', '.join(str(e) for e in country_codes)

    #get the dwelling fractions table
    cursor.execute("""
	SELECT
	dv.dwelling_fraction, dg.is_urban, dg.occupancy_id, dg.study_region_id, 
 	geo.gadm_country_id, geo.id AS geo_id, dv.building_type
	FROM ged2.geographic_region geo 
	JOIN ged2.study_region sr ON sr.geographic_region_id=geo.id
	JOIN ged2.study s ON s.id=sr.study_id
	JOIN ged2.distribution_group dg ON dg.study_region_id=sr.id
	JOIN ged2.distribution_value dv ON dv.distribution_group_id=dg.id
	WHERE geo.gadm_country_id IN (
	SELECT DISTINCT gadm_country_id
	FROM ged2.grid_point grid
	JOIN ged2.gadm_country gadm ON gadm.id=grid.gadm_country_id
	WHERE ST_intersects(ST_MakeEnvelope(%s, %s, %s, %s, 4326),grid.the_geom))
 	AND dg.occupancy_id=0 AND dg.is_urban;""", [lng1, lat1, lng2, lat2])

    df_table = cursor.fetchall()

    #get the time of day table
    cursor.execute("""
	SELECT night_pop_ratio FROM ged2.pop_allocation 
	WHERE geographic_region_id = 65
	AND is_urban AND occupancy_id=0""")

    tod_table = cursor.fetchall()

    result = []

    #get the population table
    cursor.execute("""
	SELECT grid.gadm_country_id, grid.the_geom, ST_X(grid.the_geom), 
	ST_Y(grid.the_geom), grid.pop_value, grid.is_urban, gadm.iso
	FROM ged2.grid_point grid
	JOIN ged2.gadm_country gadm ON gadm.id=grid.gadm_country_id
	WHERE ST_intersects(ST_MakeEnvelope(%s, %s, %s, %s, 4326),grid.the_geom)
	;""", [lng1, lat1, lng2, lat2])

    copyright_text = '''\
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

 More information on licensing: http://www.globalquakemodel.org/licensing\n
'''


    if output_type == "csv":
        # export csv
        # export copyright
        copyright = copyright_csv(copyright_text)
        yield copyright

        # csv header
        yield '''ISO, pop_calculated_value, lon, lat, study_region, gadm country id, GEM taxonomy'''
        yield "\n"

        # csv exposure table
        for pop in cursor.fetchall():
            for tod in tod_table:
                for df in df_table:
                    if pop[0] == df[4]:
                        yield ",".join([
                            str(pop[6]), str(pop[4] * tod[0] * df[0]),
                            str(pop[2]), str(pop[3]), str(df[3]),
                            str(df[4]), str(df[6])
                        ])
                        yield "\n"

    elif output_type == "nrml":
        # export nrml
        # nrml header
        copyright = copyright_nrml(copyright_text)
        yield "<?xml version='1.0' encoding='utf-8'?> \n"
        yield copyright
        yield '''
<nrml xmlns="http://openquake.org/xmlns/nrml/0.4"
      xmlns:gml="http://www.opengis.net/gml>\n'''

        # nrml exposure file
        for pop in cursor.fetchall():
            for tod in tod_table:
                for df in df_table:
                    if pop[0] == df[4]:
                        yield ('''\
    <exposureModel gml:id="ep">
        <exposureList gml:id="exposure" assetCategory="population">
            <gml:description>Source: OQP exposure export tool</gml:description>
                <assetDefinition gml:id=%s_%s>
                    <site>
                        <gml:Point srsName="epsg:4326">
                            <gml:pos>%s %s</gml:pos>
                        </mgl:Point>
                    </site>
                    <number>%s</number>
                    <taxonomy>%s</taxonomy>
                </assetDefinition>
        </exposureList>
    </exposureModel>\n''' % (pop[0], df[0], pop[3], pop[2],
                             pop[4] * tod[0] * df[1], df[6]))
        # for loop ends here
        # finalize the document:
        yield "</nrml>\n"


def copyright_csv(cr_text):
    lines = cr_text.split('\n')
    # prepend the # comment character to each line
    lines = ['#%s' % line for line in lines]
    # rejoin into a single multiline string:
    return '\n'.join(lines)


def copyright_nrml(cr_text):
    return '<!-- \n%s\n -->' % cr_text
