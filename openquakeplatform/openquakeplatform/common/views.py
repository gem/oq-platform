#!/usr/bin/env python
from django.shortcuts import render_to_response
from django.template import RequestContext
from importlib import import_module

from openquakeplatform.settings import INSTALLED_APPS


def versions(request, **kwargs):
    page_title = 'Application Versions'

    apps_list = []
    for app_name in INSTALLED_APPS:
        if not app_name.startswith('openquakeplatform'):
            continue

        app = import_module(app_name)
        header_info = getattr(app, 'header_info', None)
        vers = getattr(app, '__version__', None)

        if header_info:
            name = header_info['title']
        else:
            name = app_name

        if vers is None:
            continue

        apps_list.append({'name': name, 'vers': vers})

    return render_to_response(
        "common/versions.html",
        dict(page_title=page_title,
             user=request.user,
             apps_list=apps_list,
             body_class='bodyclass'),
        context_instance=RequestContext(request))
