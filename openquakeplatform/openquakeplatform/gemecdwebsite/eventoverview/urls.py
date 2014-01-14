__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from eventoverview import EventOverview
import eventoverview

urlpatterns = patterns('',
    url(r'^$', EventOverview.as_view()),
    #url(r'locationjson',eventoverview.locationjson),
)

urlpatternsjson = patterns('',
    url(r'^$', eventoverview.locationjson),
    )
