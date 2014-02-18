__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from home import HomePage

urlpatterns = patterns('',
    url(r'^$', HomePage.as_view()),
)