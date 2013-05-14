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
