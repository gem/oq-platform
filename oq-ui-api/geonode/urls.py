from django.conf.urls import include, patterns, url
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from geonode.sitemap import LayerSitemap, MapSitemap
import geonode.proxy.urls
import geonode.maps.urls

import gemecdwebsite.eventsmap.urls
import photologue.urls

# Uncomment the next two lines to enable the admin:
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
    url(r'^ecd/eventsmap/(?P<ix>.*)$', include(gemecdwebsite.eventsmap.urls.urlpatterns)),  


    #photologue
    url(r'^photologue/', include('photologue.urls')),



    # OQ
    url(r'^oq-platform2/hazard_models.html$', 'django.views.generic.simple.direct_to_template',
    {'template': 'oq-platform2/hazard_models.html'}, name='hazard_models'),

    # added by geonode-installation.sh script
    (r'^observations/', include('geonode.observations.urls')),
    url(r'^oq-platform2/isc_viewer.html$', 'django.views.generic.simple.direct_to_template',
    {'template': 'oq-platform2/isc_viewer.html'}, name='isc_viewer'),

    url(r'^oq-platform/exposure_country_index.html$', 'django.views.generic.simple.direct_to_template',
    {'template': 'oq-platform/exposure_country_index.html'}, name='exposure_country'),

    url(r'^oq-platform/geodetic_index.html$', 'django.views.generic.simple.direct_to_template',
    {'template': 'oq-platform/geodetic_index.html'}, name='geodetic'),

    url(r'^oq-platform2/faulted_earth.html$', 'django.views.generic.simple.direct_to_template',
    {'template': 'oq-platform2/faulted_earth.html'}, name='faultedearth'),


    # Static pages
    url(r'^$', 'django.views.generic.simple.direct_to_template',
                {'template': 'index.html'}, name='home'),
    url(r'^help/$', 'django.views.generic.simple.direct_to_template',
                {'template': 'help.html'}, name='help'),
    url(r'^developer/$', 'django.views.generic.simple.direct_to_template',
                {'template': 'developer.html'}, name='dev'),

    # Data views
    (r'^data/', include(geonode.maps.urls.datapatterns)),
    (r'^maps/', include(geonode.maps.urls.urlpatterns)),

    (r'^comments/', include('dialogos.urls')),
    (r'^ratings/', include('agon_ratings.urls')),

    # Accounts
    url(r'^accounts/ajax_login$', 'geonode.views.ajax_login',
                                       name='auth_ajax_login'),
    url(r'^accounts/ajax_lookup$', 'geonode.views.ajax_lookup',
                                       name='auth_ajax_lookup'),
    (r'^accounts/', include('registration.urls')),
    (r'^profiles/', include('profiles.urls')),
    (r'^avatar/', include('avatar.urls')),

    # Meta
    url(r'^lang\.js$', 'django.views.generic.simple.direct_to_template',
         {'template': 'lang.js', 'mimetype': 'text/javascript'}, name='lang'),
    url(r'^jsi18n/$', 'django.views.i18n.javascript_catalog',
                                  js_info_dict, name='jscat'),
    url(r'^sitemap\.xml$', 'django.contrib.sitemaps.views.sitemap',
                                  {'sitemaps': sitemaps}, name='sitemap'),
    (r'^i18n/', include('django.conf.urls.i18n')),
    (r'^admin/', include(admin.site.urls)),
    )

urlpatterns += geonode.proxy.urls.urlpatterns

# Serve static files
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
