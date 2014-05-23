__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from eventsmap import EventsMap

urlpatterns = patterns('',
    url(r'^$', EventsMap.as_view()),
)