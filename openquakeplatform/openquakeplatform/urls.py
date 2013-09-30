from django.conf.urls import include, patterns, url
from django.conf import settings
from django.http import HttpResponseBadRequest
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from geonode.sitemap import LayerSitemap, MapSitemap
from django.views.generic import TemplateView

import geonode.proxy.urls

# Import *_signals.py
import geonode.social_signals

# Setup Django Admin
from django.contrib import admin
admin.autodiscover()

js_info_dict = {
    'domain': 'djangojs',
    'packages': ('geonode',)
}

sitemaps = {
    "layer": LayerSitemap,
    "map": MapSitemap
}

urlpatterns = patterns(
    '',

    # disable open proxy provided by geonode
    url(r'^proxy/$', lambda _r: HttpResponseBadRequest("Proxy disabled")),
    url(r'^geoserver/', 'openquakeplatform.proxy.geoserver',
        name="geoserver"),

    url(r'^isc_viewer/$', TemplateView.as_view(
        template_name="isc_viewer.html"), name='isc_viewer'),
    url(r'^ghec_viewer/$', TemplateView.as_view(
        template_name="ghec_viewer.html"), name='ghec_viewer'),
    url(r'^geodetic/$', TemplateView.as_view(
        template_name="geodetic.html"), name='geodetic'),
    url(r'^explore_leaflet/$', TemplateView.as_view(
        template_name="explore_leaflet.html"), name='explore_leaflet'),
    url(r'^geojson/$', TemplateView.as_view(
        template_name="geojson.html"), name='geojson'),
    url(r'^hazard_models/$', TemplateView.as_view(
        template_name="hazard_models.html"), name='hazard_models'),
    url(r'^gaf_viewer/$', TemplateView.as_view(
        template_name="gaf_viewer.html"), name='gaf_viewer'),

    (r'^faulted_earth/', include('openquakeplatform.faulted_earth.urls')),
    (r'^exposure/', include('openquakeplatform.exposure.urls')),
    (r'^icebox/', include('openquakeplatform.icebox.urls')),

    # Static pages
    url(r'^$', 'geonode.views.index', {'template': 'index.html'}, name='home'),
    url(r'^help/$', TemplateView.as_view(template_name='help.html'), name='help'),
    url(r'^developer/$', TemplateView.as_view(template_name='developer.html'), name='developer'),
    url(r'^about/$', TemplateView.as_view(template_name='about.html'), name='about'),

    # Layer views
    (r'^layers/', include('geonode.layers.urls')),

    # Map views
    (r'^maps/', include('geonode.maps.urls')),

    # Catalogue views
    (r'^catalogue/', include('geonode.catalogue.urls')),

    # Search views
    (r'^search/', include('geonode.search.urls')),

    # Upload views
    (r'^upload/', include('geonode.upload.urls')),

    # Social views
    (r"^account/", include("account.urls")),
    (r'^people/', include('geonode.people.urls')),
    (r'^avatar/', include('avatar.urls')),
    (r'^comments/', include('dialogos.urls')),
    (r'^ratings/', include('agon_ratings.urls')),
    (r'^activity/', include('actstream.urls')),
    (r'^announcements/', include('announcements.urls')),
    #(r'^notifications/', include('notification.urls')),
    (r'^messages/', include('user_messages.urls')),

    # Accounts
    url(r'^account/ajax_login$', 'geonode.views.ajax_login',
        name='account_ajax_login'),
    url(r'^account/ajax_lookup$', 'geonode.views.ajax_lookup',
        name='account_ajax_lookup'),

    # Meta
    url(r'^lang\.js$',
        TemplateView.as_view(
            template_name='lang.js', content_type='text/javascript'),
        name='lang'),
    url(r'^jsi18n/$', 'django.views.i18n.javascript_catalog',
        js_info_dict, name='jscat'),
    url(r'^sitemap\.xml$', 'django.contrib.sitemaps.views.sitemap',
        {'sitemaps': sitemaps}, name='sitemap'),
    (r'^i18n/', include('django.conf.urls.i18n')),
    (r'^admin/', include(admin.site.urls)),

    )

#Documents views
if settings.DOCUMENTS_APP:
    urlpatterns += patterns(
        '',
        (r'^documents/', include('geonode.documents.urls')),
    )

urlpatterns += geonode.proxy.urls.urlpatterns

# Serve static files
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
