#!/bin/bash
#
# Description.
#
# This is a workaround to allow our old-fashion applications
# to work with the new django 1.4 that add a new security
# tool (csrf) to POST and PUT methods using hidden vars.
#
# To fix problem with https proxy we need to detect protocol
# and use the correct httplib object.
#

cat <<EOF | patch -p0
--- null	2012-08-07 23:18:57.229832916 +0200
+++ /var/lib/geonode/src/GeoNodePy/geonode/proxy/views.py	2012-08-07 23:18:06.449830750 +0200
@@ -1,9 +1,12 @@
 from django.http import HttpResponse
 from httplib import HTTPConnection
+from httplib import HTTPSConnection
 from urlparse import urlsplit
 import httplib2
 from django.conf import settings
+from django.views.decorators.csrf import csrf_exempt
 
+@csrf_exempt
 def proxy(request):
     if 'url' not in request.GET:
         return HttpResponse(
@@ -26,7 +29,10 @@
     if request.method in ("POST", "PUT") and "CONTENT_TYPE" in request.META:
         headers["Content-Type"] = request.META["CONTENT_TYPE"]
 
-    conn = HTTPConnection(url.hostname, url.port)
+    if url.scheme == 'https':
+        conn = HTTPSConnection(url.hostname, url.port)
+    else:
+        conn = HTTPConnection(url.hostname, url.port)
     conn.request(request.method, locator, request.raw_post_data, headers)
     result = conn.getresponse()
     response = HttpResponse(
EOF

