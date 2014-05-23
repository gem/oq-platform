__author__ = 'ruffles'

from django.contrib import admin
from openquakeplatform.weblib.models import Page
from openquakeplatform.weblib.models import Link

admin.site.register(Page)
admin.site.register(Link)
