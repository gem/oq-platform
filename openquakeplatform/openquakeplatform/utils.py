from django.views.generic import TemplateView
from django.conf import settings


class OQTemplateView(TemplateView):
    """
    A view utility which renders templates and allows for injection of
    additional context variables.
    """

    def get_context_data(self, **kwargs):
        context = super(OQTemplateView, self).get_context_data(**kwargs)

        context['oq_engine_server_urls'] = settings.OQ_ENGINE_SERVER_URLS
        context['third_party_urls'] = settings.THIRD_PARTY_URLS
        return context
