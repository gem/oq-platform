__author__ = 'Simon Ruffle, CAR'

from django.db import models

######################
# VIEWS
######################

class EventsQuick ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='eventid') # impersonate a primary key from the event id
    eventname = models.CharField(max_length=255)
    yearint = models.IntegerField()
    country = models.CharField(max_length=255)
    partner = models.CharField(max_length=255)

    class Meta:
        db_table = u'econd\".\"gemecdevents_quick'     #note this is a VIEW
        managed = False
        ordering = ['-yearint']

    def __unicode__(self):
        return self.country + ' ' + unicode(self.yearint)


class LocationsForJSON ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='locationid') # impersonate a primary key from the location id
    locationname = models.CharField(max_length=255)
    photocount= models.IntegerField()
    samplephotoid = models.ForeignKey( 'WebLibPhoto', db_column='samplephotoid',null=True, blank=True)  # returns the photo with the lowest id number to use as a sample iconic image
    event = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    yearint = models.IntegerField()
    study = models.CharField(max_length=255)
    inventoryclassname = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    unifieddamagelevelname = models.CharField(max_length=255)
    assetclass = models.CharField(max_length=255)
    assettype = models.CharField(max_length=255)
    assetsubtype = models.CharField(max_length=255)
    designcode = models.CharField(max_length=300)

    class Meta:
        db_table = u'econd\".\"gemecdlocationsforjson'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.locationname

class Locations ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='locationid') # impersonate a primary key from the location id
    locationname = models.CharField(max_length=255)
    event = models.CharField(max_length=255)
    eventid = models.IntegerField()
    country = models.CharField(max_length=255)
    yearint = models.IntegerField()
    study = models.CharField(max_length=255)
    studyid = models.IntegerField()
    locationaggregateflag = models.IntegerField()
    inventoryclassname = models.CharField(max_length=255)
    inventoryclassid = models.IntegerField()
    unifieddamagelevelname = models.CharField(max_length=255)
    unifieddamagelevelid = models.IntegerField()
    assetclass = models.CharField(max_length=255)
    assetclassid = models.CharField(max_length=10)

    class Meta:
        db_table = u'econd\".\"gemecdlocations'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.locationname


class LocationsQuick ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='locationid') # impersonate a primary key from the location id
    locationname = models.CharField(max_length=255)
    event = models.CharField(max_length=255)
    eventid = models.IntegerField()
    country = models.CharField(max_length=255)
    yearint = models.IntegerField()
    study = models.CharField(max_length=255)
    studytypecode = models.CharField(max_length=10)
    studyid = models.IntegerField()
    locationaggregateflag = models.IntegerField() # 0 if a single; 1 if aggregated
    numberofsurveyvalues = models.IntegerField() # number of survey values. If locationaggregateflag=0 this shoud be 1

    class Meta:
        db_table = u'econd\".\"gemecdlocations_quick'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.locationname