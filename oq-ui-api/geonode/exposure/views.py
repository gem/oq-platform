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

#test communication with JS
def xhr_test(request):
    if request.is_ajax():
        message = "Hello AJAX"
    else:
        message = "Hello"
    return HttpResponse(message)


def read_pop(request):
        lat1 = request.GET['lat1']
        #return HttpResponse(lat1)

        population_cells = models.grump_pop_ur2.objects.raw("""
SELECT * from grump_pop_ur2
""", [])

        result = []

        for cell in population_cells:
                result.append( { "id": cell.id, "lat": cell.lat })

        # openquake.db.models.AssetManager.contained_in

        return HttpResponse(simplejson.dumps(result))
