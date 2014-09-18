from django.views.generic import TemplateView
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render_to_response

SIGN_IN_REQUIRED = ('You must be signed into the OpenQuake Platform to use '
                    'this feature.')


class OQTemplateView(TemplateView):
    """
    A view utility which renders templates and allows for injection of
    additional context variables.

    This utility is deprecated and it's replaced by oq_context_processor
    """

    # FIXME(dv). This class has been superseded by the oq_context_processor
    # and the TEMPLATE_CONTEXT_PROCESSORS setting.
    # It's still present to keep backward compability and it will removed
    # after urls.py refactoring.

    # FIXME(lp). In order to avoid duplication in view code, use a
    # custom django context processor
    def get_context_data(self, **kwargs):
        context = super(OQTemplateView, self).get_context_data(**kwargs)

        context['third_party_urls'] = settings.THIRD_PARTY_URLS
        context['tilestream_url'] = settings.TILESTREAM_URL
        context['bing_key'] = settings.BING_KEY
        context['is_gem_experimental'] = settings.GEM_EXPERIMENTAL

        return context

class allowed_methods(object):
    def __init__(self, methods):
        self.methods = methods

    def __call__(self, func):
        def wrapped(request):
            if not request.method in self.methods:
                return HttpResponse(status=405)
            else:
                return func(request)
        return wrapped

def oq_context_processor(request):
    """
    A custom context processor which allows injection of additional
    context variables.
    """

    context = {}

    context['third_party_urls'] = settings.THIRD_PARTY_URLS
    context['tilestream_url'] = settings.TILESTREAM_URL
    context['bing_key'] = settings.BING_KEY
    context['is_gem_experimental'] = settings.GEM_EXPERIMENTAL

    return context

def sign_in_required(func):
    """
    View decorator. This can be used as an alternative to
    `django.contrib.auth.decorators.login_required`, but the function is
    distinctly different.

    Instead of immediately redirecting to a login URL, simply return a 401
    ("Unauthorized") and let the client figure out what to do with it. If the
    client then wants to authenticate to allow the wrapped view to be used, it
    needs to have some intimate knowledge of the server application in order to
    do so.

    In this way, the wrapped view can be used a bit more generically by any
    client (and not just a Django application).
    """
    def wrapped(request):
        if not request.user.is_authenticated():
            return HttpResponse(content=SIGN_IN_REQUIRED,
                                content_type="text/plain",
                                status=401)
        else:
            return func(request)
    return wrapped
