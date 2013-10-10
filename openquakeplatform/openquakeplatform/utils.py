from django.views.generic import TemplateView
from openquakeplatform import local_settings


class OQTemplateView(TemplateView):
    """
    A view utility which renders templates and allows for injection of
    additional context variables.
    """

    def get_context_data(self, **kwargs):
        context = super(OQTemplateView, self).get_context_data(**kwargs)

        # At the moment, we just need to get the location of the icebox
        # artifacts. Other icebox URLs may need to be added as well in the
        # future.
        context['icebox_urls'] = local_settings.ICEBOX_URLS
        context['oq_engine_server_urls'] = local_settings.OQ_ENGINE_SERVER_URLS
        context['third_party_urls'] = local_settings.THIRD_PARTY_URLS
        return context
