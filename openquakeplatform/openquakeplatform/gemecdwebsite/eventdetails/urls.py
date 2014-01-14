__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from eventdetails import EventDetailsPage

urlpatterns = patterns('',
    url(r'^$', EventDetailsPage.as_view())
)