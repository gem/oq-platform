__author__ = 'Simon Ruffle, CAR'

from django.db import models
from openquakeplatform.weblib.models import WebLibPhoto
######################
# VIEWS
######################


class EventsQuick ( models.Model ):
    id = models.IntegerField(primary_key=True, db_column='eventid', ) # impersonate a primary key from the event id
    eventname = models.CharField(max_length=50, blank=True, )
    yearint = models.IntegerField(null=True, blank=True, )
    country = models.CharField(max_length=50, blank=True, )
    partner = models.CharField(max_length=255, blank=True, )
    studyname = models.CharField(max_length=255, blank=True, )
    studytypecode = models.CharField(max_length=10, blank=True, )

    class Meta:
        db_table = u'gemecdevents_quick'     #note this is a VIEW
        managed = False
        ordering = ['-yearint']

    def __unicode__(self):
        return self.country + ' ' + unicode(self.yearint)

class LocationsForJSON ( models.Model ):
    id = models.IntegerField(primary_key=True, db_column='locationid', ) # impersonate a primary key from the location id
    locationname = models.CharField(max_length=255, blank=True, )
    photocount= models.IntegerField(null=True, blank=True, )
    samplephotoid = models.ForeignKey('weblib.WebLibPhoto', db_column='samplephotoid', null=True, blank=True, )  # returns the photo with the lowest id number to use as a sample iconic image
    event = models.CharField(max_length=50, blank=True, )
    country = models.CharField(max_length=50, blank=True, )
    yearint = models.IntegerField(null=True, blank=True, )
    study = models.CharField(max_length=255, blank=True, )
    inventoryclassname = models.CharField(max_length=255, blank=True, )
    description = models.CharField(max_length=255, blank=True, )
    unifieddamagelevelname = models.CharField(max_length=255, blank=True, )
    assetclass = models.CharField(max_length=255, blank=True, )
    assettype = models.CharField(max_length=255, blank=True, )
    assetsubtype = models.CharField(max_length=255, blank=True, )
    designcode = models.CharField(max_length=300, blank=True, )

    class Meta:
        db_table = u'gemecdlocationsforjson'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.locationname

class LocationsForJSONAggregated ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='locationid', ) # impersonate a primary key from the location id
    locationname = models.CharField(max_length=255, blank=True, )
    photocount= models.IntegerField(null=True, blank=True, )
    samplephotoid = models.ForeignKey( 'weblib.WebLibPhoto', db_column='samplephotoid',null=True, blank=True, )  # returns the photo with the lowest id number to use as a sample iconic image
    event = models.CharField(max_length=50, blank=True, )
    country = models.CharField(max_length=50, blank=True, )
    yearint = models.IntegerField(null=True, blank=True, )
    study = models.CharField(max_length=255, blank=True, )

    class Meta:
        db_table = u'gemecdlocationsforjsonaggregated'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.locationname


class Locations ( models.Model ):
    id = models.IntegerField(primary_key=True, db_column='locationid', ) # impersonate a primary key from the location id
    locationname = models.CharField(max_length=255, blank=True, )
    event = models.CharField(max_length=50, blank=True, )
    eventid = models.IntegerField(null=True, blank=True, )
    country = models.CharField(max_length=50, blank=True, )
    yearint = models.IntegerField(null=True, blank=True, )
    study = models.CharField(max_length=255, blank=True, )
    studyid = models.IntegerField(null=True, blank=True, )
    studytypecode = models.CharField(max_length=10, blank=True, )
    locationaggregateflag = models.IntegerField(null=True, blank=True, )
    numberofsurveyvalues = models.IntegerField(null=True, blank=True, )
    photocount = models.IntegerField(null=True, blank=True, )

    class Meta:
        db_table = u'gemecdlocations'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.locationname


class LocationsQuick ( models.Model ):
    id = models.IntegerField(primary_key=True, db_column='locationid', ) # impersonate a primary key from the location id
    locationname = models.CharField(max_length=255, blank=True, )
    event = models.CharField(max_length=50, blank=True, )
    eventid = models.IntegerField(null=True, blank=True, )
    country = models.CharField(max_length=50, blank=True, )
    yearint = models.IntegerField(null=True, blank=True, )
    study = models.CharField(max_length=255, blank=True, )
    studytypecode = models.CharField(max_length=10, blank=True, )
    studyid = models.IntegerField(null=True, blank=True, )
    locationaggregateflag = models.IntegerField(null=True, blank=True, ) # 0 if a single; 1 if aggregated
    numberofsurveyvalues = models.IntegerField(null=True, blank=True, ) # number of survey values. If locationaggregateflag=0 this shoud be 1

    class Meta:
        db_table = u'gemecdlocations_quick'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.locationname
