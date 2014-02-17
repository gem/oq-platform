from django.views.generic import TemplateView
from django.conf import settings


class OQTemplateView(TemplateView):
    """
    A view utility which renders templates and allows for injection of
    additional context variables.
    """

    # FIXME(lp). In order to avoid duplication in view code, use a
    # custom django context processor
    def get_context_data(self, **kwargs):
        context = super(OQTemplateView, self).get_context_data(**kwargs)

        context['third_party_urls'] = settings.THIRD_PARTY_URLS
        return context
