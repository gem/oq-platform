__author__ = 'Simon Ruffle, CAR Ltd'

from django.db import models


class ShakeMap(models.Model):
    id = models.AutoField(primary_key=True, help_text='Primary Key: Internal database id', )
    shakemapid = models.CharField(max_length=12, blank=True, default='unknown', verbose_name='USGS shake map id', )
    lon = models.FloatField(verbose_name='Longitude', null=True, blank=True, )
    lat = models.FloatField(verbose_name='Latitude', null=True, blank=True, )
    pga = models.FloatField(verbose_name='PGA', null=True, blank=True, )
    pgv = models.FloatField(verbose_name='PGV', null=True, blank=True, )
    mmi = models.FloatField(verbose_name='MMI', null=True, blank=True, )
    psa03 = models.FloatField(verbose_name='PSA03', null=True, blank=True, )
    psa10 = models.FloatField(verbose_name='PSA10', null=True, blank=True, )
    psa30 = models.FloatField(verbose_name='PSA30', null=True, blank=True, )
    stdpga = models.FloatField(verbose_name='STDPGA', null=True, blank=True, )
    urat = models.FloatField(verbose_name='URAT', null=True, blank=True, )
    svel = models.FloatField(verbose_name='SVEL', null=True, blank=True, )
    ownerid = models.IntegerField(default='1', verbose_name='Owner ID', help_text='ID of the creator/owner of the record', null=True, blank=True, )
    lastupdatebyid = models.IntegerField(default='1', verbose_name='Last update by ID', help_text='ID of the last person to update this record', null=True, blank=True, )
    lastupdate = models.DateTimeField(help_text='Last record update date', null=True, blank=True, )
    the_geom = models.TextField(blank=True) # This field type is a guess.

    class Meta:
        db_table = u'shakemaps\".\"shakemap'

    def __unicode__(self):
        return self.shakemapid

