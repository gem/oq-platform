__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from surveyvalue import BasicPage

urlpatterns = patterns('',
    url(r'^$', BasicPage.as_view())
)