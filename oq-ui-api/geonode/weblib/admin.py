__author__ = 'ruffles'

from django.contrib import admin
from weblib.models import Page
from weblib.models import Link

admin.site.register(Page)
admin.site.register(Link)
