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

import json
import urllib
import urllib2
import urlparse

from django.contrib.auth import models
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.http import HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from icebox import models as icebox_models

IMPORT_CONTENT_TYPES = ['geojson']  # TODO(LB): Support 'xml' as well.

#: JSON mime type
JSON = 'application/json'
#: plain text mime type
PLAIN_TEXT = 'text/plain'


def _get_base_url(request):
    """
    Construct a base URL, given a request object.

    This comprises the protocol prefix (http:// or https://) and the host,
    which can include the port number. For example:
    http://www.openquake.org or https://www.openquake.org:8000.
    """
    if request.is_secure():
        base_url = 'https://%s'
    else:
        base_url = 'http://%s'
    base_url %= request.META['HTTP_HOST']
    return base_url


@require_http_methods(['GET'])
def list_artifacts(request):
    base_url = _get_base_url(request)

    artifacts = []
    for artifact in icebox_models.Artifact.objects.all():
        artifacts.append(dict(
            id=artifact.id,
            name=artifact.name,
            content_type=artifact.content_type,
            artifact_type=artifact.artifact_type,
            url=urlparse.urljoin(base_url, 'icebox/artifact/%s' % artifact.id),
        ))
    return HttpResponse(json.dumps(artifacts), content_type=JSON)


@require_http_methods(['GET'])
def get_artifact(request, artifact_id):
    """
    Get the raw data content of an artifact with a given ``artifact_id``.

    This is pretty much just a simple wrapper around a DB query.
    """
    try:
        art = icebox_models.Artifact.objects.get(id=artifact_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()
    else:
        return HttpResponse(art.artifact_data, content_type=PLAIN_TEXT)


@csrf_exempt
@require_http_methods(['POST'])
def import_artifacts(request):
    """
    We expect two POST parameters:

        * "import_url"
        * "owner"

    This defines from where we want to import artifacts. We assume that this is
    a URL which implements the oq-engine-server's API.
    """
    # 1) List artifacts from `import_url`.
    # 2) Import each artifact.
    # 3) Return acknowledgement of import.
    import_url = request.POST.get('import_url')
    owner = request.POST.get('owner')

    # Check for required parameters.
    if None in (import_url, owner):
        return HttpResponseNotFound(
            'POST requires the following parameters: "import_url", "owner"'
        )

    # Try to find the user the client is referring to.
    try:
        owner_user = models.User.objects.get(username=owner)
    except ObjectDoesNotExist:
        # Invalid user.
        return HttpResponseNotFound(
            'Specified `owner` "%s" not found' % owner
        )

    # Get the list of artifacts to import from a service which implements
    # the oq-engine-server API.
    try:
        url = urllib2.urlopen(import_url)
        data = json.loads(url.read())
    except urllib2.HTTPError:
        # Something is the wrong with this url. We can't get anything from it.
        # TODO(LB): Is a 404 appropriate here?
        # TODO(LB): Or should we send something else?
        return HttpResponseNotFound(
            'Unable to import artifacts from %s' % import_url
        )
    else:
        url.close()

    # Iterate over artifacts and attempt to import each.
    count = 0
    for artifact in data:
        # Get all artifact types available. Currently, xml and geojson.
        for content_type in IMPORT_CONTENT_TYPES:
            try:
                params = urllib.urlencode(dict(export_type=content_type))
                # This is a GET request to an oq-engine-server API:
                artifact_url = urllib2.urlopen('%s?%s'
                                               % (artifact['url'], params))
                artifact_data = artifact_url.read()

                icebox_models.Artifact.objects.create(
                    user=owner_user,
                    artifact_type=artifact['type'],
                    name=artifact['name'],
                    artifact_data=artifact_data,
                    content_type=content_type,
                )
                count += 1
            except urllib2.HTTPError:
                # Be forgiving of 404s, since the not all artifacts will be
                # available in all formats.
                continue
            else:
                # if there's no 404 when trying to get the artifact,
                # that means we succesfully open the connection
                # (and probably succssfully imported), so we need
                # to close the connection
                artifact_url.close()

    return HttpResponse('%s items imported from %s.' % (count, import_url))
