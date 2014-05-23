__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from photo import PhotoPage

urlpatterns = patterns('',
    url(r'^$', PhotoPage.as_view()),

)