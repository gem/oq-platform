__author__ = 'Simon Ruffle, CAR'

from django.conf.urls import patterns, include, url
from uploadnrml import UploadNRML

urlpatterns = patterns('',
    url(r'^$', UploadNRML.as_view())
)