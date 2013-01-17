from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt, csrf_response_exempt
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseBadRequest
from django.utils import simplejson
from django.contrib.contenttypes.models import ContentType
from geonode.exposure import models, utils

def read_pop(request):
        lat1, lon1, lat2, lon2 = request.POST['lat1'], request.POST['lon1'], request.POST['lat2'], request.POST['lon2']
	
	population = models.Population.objects.raw("""
SELECT * from ...
""")

	# openquake.db.models.AssetManager.contained_in

	# $.getJson('/exposure/population.json', { lat1: 0.333, lat2: 0.2 }, function(result) {
# console.log(result)
#})

	return HttpResponse(simplejson.dumps(adictionary))some json stuff...
