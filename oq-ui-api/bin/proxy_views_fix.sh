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
--- null	2013-09-18 17:20:26.013554830 +0200
+++ /var/lib/geonode/src/GeoNodePy/geonode/proxy/views.py	2013-09-19 09:20:29.255145698 +0200
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
@@ -50,7 +56,7 @@
     path = strip_prefix(request.get_full_path(), proxy_path)
     url = "".join([settings.GEOSERVER_BASE_URL, downstream_path, path])
 
-    http = httplib2.Http()
+    http = httplib2.Http(disable_ssl_certificate_validation=True)
     http.add_credentials(*settings.GEOSERVER_CREDENTIALS)
     headers = dict()
 

EOF
