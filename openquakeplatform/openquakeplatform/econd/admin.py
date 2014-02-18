__author__ = 'Simon Ruffle, CAR'

from django.contrib import admin
from openquakeplatform.econd.models import Inventoryclass,Surveyvalue,Location

admin.site.register(Inventoryclass)
admin.site.register(Surveyvalue)
admin.site.register(Location)
