__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from uploadsqlite import UploadSQLite

urlpatterns = patterns('',
    url(r'^$', UploadSQLite.as_view())
)