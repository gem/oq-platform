__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from lookup import BasicPage

urlpatterns = patterns('',
    url(r'^$', BasicPage.as_view())
)
