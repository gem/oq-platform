from django.conf.urls import include, patterns, url
from django.conf import settings
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
import photologue.urls

import openquakeplatform.common.views as oq_common_views

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

    url(r'^isc_viewer/$', TemplateView.as_view(
        template_name="isc_viewer.html"), name='isc_viewer'),
    url(r'^ghec_viewer/$', TemplateView.as_view(
        template_name="ghec_viewer.html"), name='ghec_viewer'),
    url(r'^geodetic/$', TemplateView.as_view(
        template_name="geodetic.html"), name='geodetic'),
    url(r'^gaf_viewer/$', TemplateView.as_view(
        template_name="gaf_viewer.html"), name='gaf_viewer'),
    url(r'^grv/$', TemplateView.as_view(
        template_name="grv/grv_viewer.html"), name='grv'),
    url(r'^hazus/$', TemplateView.as_view(
        template_name="hazus/hazus.html"), name='hazus'),
    url(r'^hrde/$', TemplateView.as_view(
        template_name="hrde/hrde.html"), name='hrde'),
    url(r'^irv/', include('openquakeplatform.irv.urls')),

    url(r'^ipt/', include('openquakeplatform_ipt.urls', namespace='ipt')),
 
    (r'^world/', include('openquakeplatform.world.urls')),
    (r'^faulted_earth/', include('openquakeplatform.faulted_earth.urls')),
    (r'^exposure/', include('openquakeplatform.exposure.urls')),
    (r'^svir/', include('openquakeplatform.svir.urls')),
    (r'^vulnerability/', include('openquakeplatform.vulnerability.urls')),
    (r'^taxtweb/', include('openquakeplatform_taxtweb.urls', namespace='taxtweb')),
    (r'^building-class/', include('openquakeplatform_building_class.urls', namespace='building_class')),

    # Static pages
    url(r'^$', 'geonode.views.index', {'template': 'index.html'}, name='home'),
    url(r'^account/terms/$', TemplateView.as_view(template_name='account/terms.html'), name='terms'),
    url(r'^help/$', TemplateView.as_view(template_name='help.html'), name='help'),
    url(r'^tools/$', TemplateView.as_view(template_name='tools.html'), name='tools'),
    url(r'^developer/$', TemplateView.as_view(template_name='developer.html'), name='developer'),
    url(r'^about/$', TemplateView.as_view(template_name='about.html'), name='about'),
    url(r'^share/$', TemplateView.as_view(template_name='share.html'), name='share'),
    url(r'^explore/$', TemplateView.as_view(template_name='explore.html'), name='explore'),
    url(r'^calculate/$', TemplateView.as_view(template_name='calculate.html'), name='calculate'),
    url(r'^versions/$', oq_common_views.versions, name='oq_common_versions'),

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

# Example of an experimental application
# if settings.GEM_EXPERIMENTAL:
#     urlpatterns += patterns('',
#         url(r'^irv_viewer/$', TemplateView.as_view(
#             template_name="irv_viewer.html"), name='irv_viewer'),
#     )

# Documents views
if 'geonode.documents' in settings.INSTALLED_APPS:
    urlpatterns += patterns('',
        (r'^documents/', include('geonode.documents.urls')),
    )
# Enable internal geoserver proxy in development mode.
# In production it must be done by Apache/Nginx, not by Django
if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^geoserver/', 'openquakeplatform.proxy.geoserver',
            name="geoserver"),
    )

urlpatterns += geonode.proxy.urls.urlpatterns

# Serve static files
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
handler403 = 'geonode.views.err403'
