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
from django.shortcuts import redirect
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import send_mail
from django.views import generic
from django.forms.models import model_to_dict

from openquakeplatform.icebox import models as icebox

import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


#: Got from
# https://docs.djangoproject.com/en/1.5/topics/class-based-views/mixins/
class JSONResponseMixin(object):
    """
    A mixin that can be used to render a JSON response.
    """
    response_class = HttpResponse

    def render_to_response(self, context, **response_kwargs):
        """
        Returns a JSON response, transforming 'context' to make the payload.
        """
        response_kwargs['content_type'] = 'application/json'
        return self.response_class(
            self.convert_context_to_json(context),
            **response_kwargs
        )

    def convert_context_to_json(self, context):
        "Convert the context dictionary into a JSON object"
        return json.dumps(model_to_dict(context['object']))


class CalculationsView(JSONResponseMixin, generic.list.ListView):
    model = icebox.Calculation

    def post(self, request):
        """
        Create a new calculation object, and submit synchronously a
        request to the oq-engine-server.
        """
        return redirect(
            'calculation', pk=icebox.Calculation.objects.create(
                user=request.user,
                calculation_type=request.POST['calculation_type']).pk)


class CalculationView(JSONResponseMixin, generic.detail.DetailView):
    model = icebox.Calculation

    def post(self, request, pk=None):
        """
        Update a calculation object.

        A post without the status argument signals that the results
        are ready to be imported.
        """
        assert pk is not None, "No multiple updates"

        calculation = self.get_object()
        if request.POST.get('description'):
            calculation.description = request.POST['description']
            calculation.save()

        if request.POST.get('engine_id'):
            calculation.engine_id = request.POST['engine_id']
            calculation.save()

        if request.POST.get('status'):
            calculation.status = request.POST['status']
            calculation.save()

            if calculation.status == "creating layers":
                calculation.process_layers()

        return redirect('calculation', pk=pk)


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
