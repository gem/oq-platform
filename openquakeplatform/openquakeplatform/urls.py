from django.conf.urls import include, patterns, url
from django.conf import settings
from django.http import HttpResponseBadRequest
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from geonode.sitemap import LayerSitemap, MapSitemap
from django.views.generic import TemplateView

import openquakeplatform.gemecdwebsite.eventsmap.urls
import openquakeplatform.gemecdwebsite.eventoverview.urls
import openquakeplatform.gemecdwebsite.eventdetails.urls
import openquakeplatform.gemecdwebsite.location.urls
import openquakeplatform.gemecdwebsite.inventoryclass.urls
import openquakeplatform.gemecdwebsite.damagelevel.urls
import openquakeplatform.gemecdwebsite.casualtylevel.urls
import openquakeplatform.gemecdwebsite.surveyvalue.urls
import openquakeplatform.gemecdwebsite.photo.urls
import openquakeplatform.gemecdwebsite.uploadnrml.urls
import openquakeplatform.gemecdwebsite.lookup.urls
#import openquakeplatform.vulnerability.views
import photologue.urls


from django.conf import settings

# TODO. Use context_processors instead of a custom TemplateView
from openquakeplatform.utils import OQTemplateView

import geonode.proxy.urls

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

urlpatterns = patterns('',

    # gemecd website
    url(r'^ecd/eventsmap/(?P<ix>.*)$', include(openquakeplatform.gemecdwebsite.eventsmap.urls.urlpatterns)),
    url(r'^ecd/locationjson',include(openquakeplatform.gemecdwebsite.eventoverview.urls.urlpatternsjson)),
    url(r'^ecd/eventoverview/(?P<ix>.*)$', include(openquakeplatform.gemecdwebsite.eventoverview.urls.urlpatterns)),

    url(r'^ecd/eventdetails/(?P<ix>.*)/(?P<editmode>.*)/$',include(openquakeplatform.gemecdwebsite.eventdetails.urls.urlpatterns)), # edit mode
    url(r'^ecd/eventdetails/(?P<ix>.*)$',include(openquakeplatform.gemecdwebsite.eventdetails.urls.urlpatterns)), # display mode

    url(r'^ecd/location/(?P<ix>.*)/(?P<editmode>.*)/$',include(openquakeplatform.gemecdwebsite.location.urls.urlpatterns)), #location edit mode
    url(r'^ecd/location/(?P<ix>.*)$',include(openquakeplatform.gemecdwebsite.location.urls.urlpatterns)), #location display mode

    url(r'^ecd/inventoryclass/(?P<ix>.*)/(?P<editmode>.*)/$',include(openquakeplatform.gemecdwebsite.inventoryclass.urls.urlpatterns)), #edit mode
    url(r'^ecd/inventoryclass/(?P<ix>.*)$',include(openquakeplatform.gemecdwebsite.inventoryclass.urls.urlpatterns)), #display mode

    url(r'^ecd/damagelevel/(?P<ix>.*)/(?P<editmode>.*)/$',include(openquakeplatform.gemecdwebsite.damagelevel.urls.urlpatterns)), #edit mode
    url(r'^ecd/damagelevel/(?P<ix>.*)$',include(openquakeplatform.gemecdwebsite.damagelevel.urls.urlpatterns)), #display mode

    url(r'^ecd/casualtylevel/(?P<ix>.*)/(?P<editmode>.*)/$',include(openquakeplatform.gemecdwebsite.casualtylevel.urls.urlpatterns)), #edit mode
    url(r'^ecd/casualtylevel/(?P<ix>.*)$',include(openquakeplatform.gemecdwebsite.casualtylevel.urls.urlpatterns)), #display mode

    url(r'^ecd/surveyvalue/(?P<ix>.*)/(?P<editmode>.*)/$',include(openquakeplatform.gemecdwebsite.surveyvalue.urls.urlpatterns)), #edit mode
    url(r'^ecd/surveyvalue/(?P<ix>.*)$',include(openquakeplatform.gemecdwebsite.surveyvalue.urls.urlpatterns)), #display mode

    url(r'^ecd/photo/(?P<ix>.*)/(?P<editmode>.*)/$',include(openquakeplatform.gemecdwebsite.photo.urls.urlpatterns)), #edit mode
    url(r'^ecd/photo/(?P<ix>.*)$',include(openquakeplatform.gemecdwebsite.photo.urls.urlpatterns)), #display mode

    url(r'^ecd/uploadnrml',include(openquakeplatform.gemecdwebsite.uploadnrml.urls.urlpatterns)), #display mode

    url(r'^ecd/(?P<name>lookup.*)/(?P<ix>.*)/$',include(openquakeplatform.gemecdwebsite.lookup.urls.urlpatterns)), #display mode
    url(r'^ecd/(?P<name>unifieddamagelevel)/(?P<ix>.*)/$',include(openquakeplatform.gemecdwebsite.lookup.urls.urlpatterns)), #display mode



    #photologue
    url(r'^photologue/', include(photologue.urls)),

    url(r'^isc_viewer/$', OQTemplateView.as_view(
        template_name="isc_viewer.html"), name='isc_viewer'),
    url(r'^ghec_viewer/$', OQTemplateView.as_view(
        template_name="ghec_viewer.html"), name='ghec_viewer'),
    url(r'^geodetic/$', OQTemplateView.as_view(
        template_name="geodetic.html"), name='geodetic'),
    url(r'^geojson/$', OQTemplateView.as_view(
        template_name="geojson.html"), name='geojson'),
    url(r'^hazard_models/$', OQTemplateView.as_view(
        template_name="hazard_models.html"), name='hazard_models'),
    url(r'^gaf_viewer/$', OQTemplateView.as_view(
        template_name="gaf_viewer.html"), name='gaf_viewer'),
    url(r'^svir_viewer/$', TemplateView.as_view(
        template_name="svir_viewer.html"), name='svir_viewer'),
    url(r'^hazus/$', TemplateView.as_view(
        template_name="hazus.html"), name='hazus'),
    url(r'^hazard_viewer/$', TemplateView.as_view(
        template_name="hazard_viewer.html"), name='hazard_viewer'),

    (r'^faulted_earth/', include('openquakeplatform.faulted_earth.urls')),
    (r'^icebox/', include('openquakeplatform.icebox.urls')),
    (r'^exposure/', include('openquakeplatform.exposure.urls')),
    (r'^svir/', include('openquakeplatform.svir.urls')),
    (r'^icebox/', include('openquakeplatform.icebox.urls')),
    #url(r'^vulnerability/index', openquakeplatform.vulnerability.views.index,
        #name='index'),
    (r'^vulnerability/', include('openquakeplatform.vulnerability.urls')),

    # Static pages
    url(r'^$', 'geonode.views.index', {'template': 'index.html'}, name='home'),
    url(r'^help/$', TemplateView.as_view(template_name='help.html'), name='help'),
    url(r'^tools/$', TemplateView.as_view(template_name='tools.html'), name='tools'),
    url(r'^developer/$', TemplateView.as_view(template_name='developer.html'), name='developer'),
    url(r'^about/$', TemplateView.as_view(template_name='about.html'), name='about'),
    url(r'^share/$', TemplateView.as_view(template_name='share.html'), name='share'),
    url(r'^explore/$', TemplateView.as_view(template_name='explore.html'), name='explore'),
    url(r'^calculate/$', TemplateView.as_view(template_name='calculate.html'), name='calculate'),

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

    # GeoServer Helper Views
    (r'^gs/', include('geonode.geoserver.urls')),

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
    (r'^social/', include('geonode.social.urls')),
    # Accounts
    url(r'^account/ajax_login$', 'geonode.views.ajax_login',
                                       name='account_ajax_login'),
    url(r'^account/ajax_lookup$', 'geonode.views.ajax_lookup',
                                       name='account_ajax_lookup'),

    # Meta
    url(r'^lang\.js$', TemplateView.as_view(template_name='lang.js', content_type='text/javascript'), name='lang'),
    url(r'^jsi18n/$', 'django.views.i18n.javascript_catalog',
                                  js_info_dict, name='jscat'),
    url(r'^sitemap\.xml$', 'django.contrib.sitemaps.views.sitemap',
                                  {'sitemaps': sitemaps}, name='sitemap'),
    (r'^i18n/', include('django.conf.urls.i18n')),
    (r'^admin/', include(admin.site.urls)),

    )

#Documents views
if 'geonode.documents' in settings.INSTALLED_APPS:
    urlpatterns += patterns('',
        (r'^documents/', include('geonode.documents.urls')),
    )

urlpatterns += geonode.proxy.urls.urlpatterns

# Serve static files
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
handler403 = 'geonode.views.err403'
