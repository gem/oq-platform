import httplib2

from django.conf import settings
from django.http import HttpResponse

from geonode.utils import ogc_server_settings


def geoserver(request):
    """
    Simple proxy to access geoserver and avoid Same-domain Access
    Control Policy restrictions
    """
    url = "".join([
        ogc_server_settings.LOCATION,
        request.get_full_path()[len("/geoserver/"):]])

    headers = {}
    if settings.SESSION_COOKIE_NAME in request.COOKIES:
        headers["Cookie"] = request.META["HTTP_COOKIE"]

    if request.method in ("POST", "PUT") and "CONTENT_TYPE" in request.META:
        headers["Content-Type"] = request.META["CONTENT_TYPE"]

    http = httplib2.Http()
    response, content = http.request(
        url, request.method,
        body=request.raw_post_data or None,
        headers=headers)

    return HttpResponse(
        content=content,
        status=response.status,
        mimetype=response.get("content-type", "text/plain"))
