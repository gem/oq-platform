__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from location import LocationPage

urlpatterns = patterns('',
    url(r'^$', LocationPage.as_view())
)