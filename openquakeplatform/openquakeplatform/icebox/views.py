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
# You should have received a copy of the GNU Affero General Public
# License along with this program. If not, see
# <https://www.gnu.org/licenses/agpl.html>.

import json
import urllib
import urllib2
import urlparse

from django.conf import settings
from django.contrib.auth import models
from django.core.mail import send_mail
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.http import HttpResponse
from django.http import HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from openquakeplatform.icebox import models as icebox_models

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
            url=urlparse.urljoin(base_url,
                                 'icebox/artifact/%s/' % artifact.id),
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
        artifacts = json.loads(url.read())
    except urllib2.HTTPError:
        # Something is the wrong with this url. We can't get anything from it.
        # TODO(LB): Is a 404 appropriate here?
        # TODO(LB): Or should we send something else?
        return HttpResponseNotFound(
            'Unable to import artifacts from %s' % import_url
        )
    else:
        url.close()

    # Attempt to determine the url of the calculation summary from the import
    # url. This assumes some knowledge of the oq-engine-server API.
    # For example, if the import url is
    # "http://openquake.org:11188/v1/calc/hazard/1234/results", we can try to
    # extract the calculation summary URL by stripping off the "results" part.
    # TODO(LB): This is a bit hackish, and perhaps we need to redesign
    # (slightly) the API touchpoints between icebox and oq-engine-server.
    url_obj = urlparse.urlparse(import_url)
    calculation_url = urlparse.urlunparse((
        url_obj.scheme,
        url_obj.netloc,
        url_obj.path.rsplit('/', 1)[0],
        None,  # params
        None,  # query
        None,  # fragment
    ))
    artifact_group = _do_import_artifacts(
        artifacts, calculation_url, owner_user)

    _do_send_email(owner_user.email, artifact_group)

    return HttpResponse('%s items imported from %s' % (
        artifact_group.artifacts.count(), import_url))


@transaction.commit_on_success
def _do_import_artifacts(artifacts, calculation_url, owner_user):
    """
    :param list artifacts:
        List of dict objects representing the artifact data read from the
        oq-engine-server.

        Each dict should have the following keys::

            * type ("hazard_curve", "loss_map", etc.)
            * name
            * url (pointing to the full artifact data, which this function will
              access)

    :param str calculation_url:
        URL where we can find the JSON-formatted calculation summary (with the
        name, description, status, calculation geometry, and other parameters).
    :param owner_user:
        Django `User` object/record to which newly-imported
        :class:`openquakeplatform.icebox.models.Artifact` and
        :class:`openquakeplatform.icebox.models.ArtifactGroup` records will
        belong.
    :returns:
        a newly created ArtifactGroup (with type `calculation`)
    """
    # First, try to get the calculation summary and add it as an artifact.
    try:
        calc_summary_url = urllib2.urlopen(calculation_url)
        calc_summary = calc_summary_url.read()
        calc_summary_dict = json.loads(calc_summary)

        art_group = icebox_models.ArtifactGroup.objects.create(
            name=calc_summary_dict['description'],
            group_type='calculation',
            user=owner_user,
        )

        icebox_models.ArtifactGroupLink.objects.create(
            artifact=icebox_models.Artifact.objects.create(
                user=owner_user,
                artifact_type='calculation',
                name=calc_summary_dict['description'],
                artifact_data=calc_summary,
                content_type=JSON,
            ),
            artifact_group=art_group,
        )
    except urllib2.HTTPError:
        # TODO(LB): We need to log this
        return HttpResponse(
            content='Unable to fetch calc summary from %s' % calculation_url,
            status_code=500
        )
    else:
        calc_summary_url.close()

    # Then, iterate over artifacts and attempt to import each.
    for artifact in artifacts:
        # Get all artifact types available. Currently, xml and geojson.
        for content_type in IMPORT_CONTENT_TYPES:
            try:
                params = urllib.urlencode(dict(export_type=content_type))
                # This is a GET request to an oq-engine-server API:
                artifact_url = urllib2.urlopen('%s?%s'
                                               % (artifact['url'], params))
                artifact_data = artifact_url.read()

                art = icebox_models.Artifact.objects.create(
                    user=owner_user,
                    artifact_type=artifact['type'],
                    name=artifact['name'],
                    artifact_data=artifact_data,
                    content_type=content_type,
                )
                icebox_models.ArtifactGroupLink.objects.create(
                    artifact=art,
                    artifact_group=art_group,
                )
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
    return art_group


@require_http_methods(['GET'])
def list_artifact_groups(request):
    """
    Get a summarized list--as JSON--of the artifact groups available.

    A GET request can include an optional parameter `group_type` to specify
    which type of results to fetch. Typical group types are "map" and
    "calculation".
    """
    base_url = _get_base_url(request)

    group_type = request.GET.get('group_type')
    art_groups = icebox_models.ArtifactGroup.objects.all()
    if group_type is not None:
        art_groups = art_groups.filter(group_type=group_type)

    groups = []

    for group in art_groups:
        groups.append(dict(
            id=group.id,
            name=group.name,
            group_type=group.group_type,
            url=urlparse.urljoin(base_url,
                                 'icebox/artifact_group/%s/' % group.id),
        ))

    if not groups:
        # No data matches the request parameters.
        return HttpResponseNotFound()

    return HttpResponse(json.dumps(groups), content_type=JSON)


@require_http_methods(['GET'])
def get_artifact_group(request, art_group_id):
    """
    Get an artifact group, as JSON, including a summarized list of the
    artifacts which belong to the group.

    :param int art_group_id:
        ID of an :class:`openquakeplatform.icebox.models.ArtifactGroup` record.
    """
    base_url = _get_base_url(request)

    art_group = icebox_models.ArtifactGroup.objects.get(id=art_group_id)
    group = dict(
        id=art_group.id,
        group_type=art_group.group_type,
        name=art_group.name,
    )

    try:
        artifacts = []
        for artifact in icebox_models.Artifact.objects\
                .filter(artifactgrouplink__artifact_group=art_group_id):
            artifacts.append(dict(
                id=artifact.id,
                name=artifact.name,
                content_type=artifact.content_type,
                artifact_type=artifact.artifact_type,
                url=urlparse.urljoin(base_url,
                                     'icebox/artifact/%s/' % artifact.id),
            ))

        group['artifacts'] = artifacts
    except ObjectDoesNotExist:
        return HttpResponseNotFound()
    else:
        return HttpResponse(json.dumps(group), content_type=JSON)


def _do_send_email(email, artifact_group):
    send_mail("A new %s is available" % artifact_group.name,
              """
The following new artifacts are available:
%s

Login into Openquake platform to see them.
""" % "\n".join([a.name
                 for a in artifact_group.artifacts.all()]),
              [settings.THEME_ACCOUNT_CONTACT_EMAIL],
              [email], fail_silently=False)
