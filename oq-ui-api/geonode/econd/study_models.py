__author__ = 'Simon Ruffle, CAR'

from django.db import models

###############
# Study Models
###############

class Study ( models.Model) :
    id = models.IntegerField(primary_key=True)
    copyrightmessage = models.CharField(max_length=600)

    class Meta:
        db_table = u'econd\".\"study'
        managed = False

