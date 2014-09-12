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

import os
import json
import smtplib
import zipfile
import tempfile

import requests
from django.core.urlresolvers import reverse
from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseServerError
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
            **response_kwargs)

    def convert_context_to_json(self, context):
        "Convert the context dictionary into a JSON object"
        raise NotImplementedError


class CalculationsView(JSONResponseMixin, generic.list.ListView):
    model = icebox.Calculation

    def post(self, request):
        """
        Create a new calculation object, and submit synchronously a
        request to the oq-engine-server.
        """
        calculation_type = request.POST['calculation_type']

        calculation = self.model.objects.create(
            user=request.user,
            calculation_type=calculation_type)

        if calculation_type == "hazard":
            url = settings.OQ_ENGINE_SERVER_URLS['run_hazard_calc_form']
        elif calculation_type == "risk":
            url = settings.OQ_ENGINE_SERVER_URLS['run_risk_calc_form']
        else:
            raise RuntimeError(
                "Unknown calculation_type %s" % calculation_type)

        archive = request.FILES['calc_archive']
        try:
            hazard_output_id = request.POST.get('hazard_output_id')
            hazard_job_id = request.POST.get('hazard_job_id')

            post_data=dict(
                database=settings.OQ_ENGINE_SERVER_DATABASE,
                callback_url="%s%s" % (
                    settings.SITEURL.rstrip("/"), reverse(
                        "calculation", args=(calculation.pk,))),
                foreign_calculation_id=calculation.pk)
            # Risk only
            if hazard_output_id:
                post_data['hazard_output_id'] = hazard_output_id
            if hazard_job_id:
                post_data['hazard_job_id'] = hazard_job_id
            requests.post(
                url,
                data=post_data,
                files=dict(archive=archive))
        except requests.exceptions.RequestException as e:
            logger.error(
                "POST to engine server (url=%s) failed: %s" % (url, e))
            return HttpResponseServerError(
                "An error has occurred while queing your calculation")
        finally:
            archive.close()

        return self.response_class(
            json.dumps(dict(id=calculation.id,
                            calculation_type=calculation.calculation_type,
                            engine_id="New",
                            status=calculation.status)),
            content_type='application/json')

    def convert_context_to_json(self, context):
        "Convert the context dictionary into a JSON object"
        return json.dumps([
            model_to_dict(obj) for obj in context['object_list']])


class OutputsView(JSONResponseMixin, generic.list.ListView):
    model = icebox.OutputLayer

    def convert_context_to_json(self, context):
        "Convert the context dictionary into a JSON object"
        outputs = []
        for obj in context['object_list']:
            output = model_to_dict(obj)
            if obj.layer:
                output['layername'] = obj.layer.typename
            outputs.append(output)
        return json.dumps(outputs)


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
                try:
                    calculation.process_layers()
                except:
                    calculation.status = "failed"
                    calculation.save()
                    raise
                else:
                    calculation.status = "complete"
                #self._send_email(calculation)
        if request.POST.get('einfo'):
            calculation.einfo = request.POST['einfo']
            calculation.save()

        return redirect('calculation', pk=pk)

    def convert_context_to_json(self, context):
        "Convert the context dictionary into a JSON object"
        return json.dumps(model_to_dict(context['object']))

    def _send_email(self, calculation):
        """
        Send an email to inform the user that the calculation is
        complete. If the email can not be sent (e.g. because no smtp
        server has been configured), it catches the error and just
        logs the exception.
        """
        subject = ("The calculation %s you have launched has run succesfully" %
                   (calculation.description))

        message = """
The following new outputs are available:
%s

Login into Openquake platform to see them.
"""

        outputs = "\n".join(
            ["<a href=\"%s%s\">%s</a>" % (
                settings.SITEURL,
                reverse('layer_detail', args=(output_layer.layer.name,)),
                output_layer.display_name)
             for output_layer in calculation.outputlayer_set.all()
             if output_layer.layer])

        try:
            send_mail(subject, message % outputs,
                      [settings.THEME_ACCOUNT_CONTACT_EMAIL],
                      [calculation.user.email], fail_silently=False)
        except smtplib.SMTPException as e:
            logger.warn(
                "Failed to send mail to %s: %s" % (calculation.user.email, e))


def remove_calculation(request, pk):
    if request.method == "POST":
        icebox.Calculation.objects.get(pk=pk).delete()
    # TODO: This should be an error
    return HttpResponse("OK")

