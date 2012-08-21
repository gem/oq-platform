#!/bin/bash
#
# Description: 
#
# this is a workaround to allow our old-fashion applications
# to work with the new django 1.4 that add a new security
# tool (csrf) to POST and PUT methods using hidden vars 
#

cat <<EOF | patch -p0
--- null	2012-07-12 15:05:57.000000000 +0200
+++ /var/lib/geonode/src/GeoNodePy/geonode/proxy/views.py	2012-07-12 15:31:22.748093848 +0200
@@ -3,7 +3,9 @@
 from urlparse import urlsplit
 import httplib2
 from django.conf import settings
+from django.views.decorators.csrf import csrf_exempt
 
+@csrf_exempt
 def proxy(request):
     if 'url' not in request.GET:
         return HttpResponse(
EOF

