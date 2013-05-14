__author__ = 'Simon Ruffle, CAR'

from django.db import models
from photologue.models import ImageModel

# Static lookup tables
from econd.static_lookup_models import *

##############################
# GeoArchive and Photo related
##############################

class WebLibPhoto(ImageModel):
    id = models.IntegerField(primary_key=True)
    #you cant put title here , it wont save
    #title = models.CharField(max_length=50, unique=True,db_column='name',verbose_name='File name', help_text='Photograph filename, all lowercase, including suffix .jpg/.tif/.gif/.bmp/.png')
    title_slug = models.CharField(max_length=50, unique=True)
    caption = models.CharField(max_length=255,verbose_name='Caption', blank=True, help_text='Caption for the photograph, please keep short')
    date_added = models.DateTimeField(verbose_name='Date added')
    is_public = models.BooleanField()
    tags = models.CharField(max_length=255)
    photographername = models.CharField(null=True, blank=True, max_length=255,verbose_name='Photographer name')
    photographerorganisation = models.CharField(null=True, blank=True,max_length=255,verbose_name='Photographer organisation')
    photographerprofessioncode = models.ForeignKey(Lookupphotographerprofessioncode, null=True, db_column='photographerprofessioncode', blank=True,verbose_name='Photographer profession',default='0')
    #photographerprofessioncode = models.CharField(max_length=10,verbose_name='Photographer profession',default='0')
    copyright_c = models.TextField(null=True, blank=True, verbose_name='Copyright message', help_text='Information about the copyright of the photograph')
    description_c = models.TextField(null=True, blank=True, verbose_name='Photo description')
    daysafterevent = models.FloatField(null=True, blank=True, verbose_name='Days after event', help_text='Approximate number of days after event that photo was taken')
    timeofdaystring = models.CharField(null=True, blank=True, max_length=20,verbose_name='Time of day taken')
    timeofdaycode = models.ForeignKey(Lookuptimeofdaycode, null=True, db_column='timeofdaycode', blank=True,verbose_name='AM/PM',default='0')
    #timeofdaycode = models.CharField(max_length=20,verbose_name='AM/PM',default='0')
    qualitycode = models.ForeignKey(Lookupphotoqualitycode, null=True, db_column='qualitycode', blank=True,verbose_name='Image quality code',default='0')
    #qualitycode = models.CharField(max_length=10,verbose_name='Image quality code',default='0')
    subjectcode = models.CharField(null=True, blank=True, max_length=50,verbose_name='Subject code', help_text='Describes the main subject matter of the photograph as a coded string. Not a lookup field at present')
    detailcode = models.ForeignKey(Lookupdetailcode, null=True, db_column='detailcode', blank=True,verbose_name='Detail code',default='0')
    #detailcode = models.CharField(max_length=100,verbose_name='Detail code',default='0')
    gpsdirectioncode = models.CharField(max_length=10, verbose_name='Camera GPS code', help_text='Direction code taken from GPS information embedded in image')
    gpsdirection = models.FloatField(null=True, blank=True, verbose_name='Camera GPS bearing', help_text='Orientation in degrees indicated on camera, taken from GPS information embedded in image')
    orientationcode = models.ForeignKey(Lookuporientationcode, null=True, db_column='orientationcode', blank=True, verbose_name='Observed orientation',default='0', help_text='If the facade of a building is shown, in what direction does that facade face. If orientation is obtained from GPS, leave unset or select GPS')
    #orientationcode = models.CharField(max_length=10, verbose_name='Observed orientation',default='0', help_text='If the facade of a building is shown, in what direction does that facade face. If orientation is obtained from GPS, leave unset or select GPS')

    ownerid = models.IntegerField()
    lastupdatebyid = models.IntegerField()
    lastupdate = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = u'econd\".\"photologue_photo'
        managed = False

    def __unicode__(self):
        #if self.title is None:
        #    self.title = ''
        #if self.caption is None:
        #    self.caption = ''
        #return  self.title + ': "' + self.caption + '"'
        return_value = 'untitled photo'
        if self.caption is not None:
            if self.caption != '':
                return_value = self.caption
        return return_value

    # get the url of the thumbnail (size given by photosizename) from the image cache
    def get_url(self,photosizename):
        return self._get_SIZE_url(photosizename)


class GeoArchiveMasterOverview ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='photoid')  # impersonate a primary key from the photo id
    thephoto = models.ForeignKey( 'WebLibPhoto', db_column='photoid',null=True, blank=True)
    photofilename = models.CharField(max_length=255, unique=True)
    locationname = models.CharField(max_length=255)
    locationid = models.IntegerField()
    event = models.CharField(max_length=255)
    eventid = models.IntegerField()
    country = models.CharField(max_length=255)
    yearint = models.IntegerField()
    study = models.CharField(max_length=255)
    studyid = models.IntegerField()
    inventoryclassid = models.IntegerField()
    inventoryclassname = models.CharField(max_length=255, verbose_name='Inventory class')
    unifieddamagelevelid = models.IntegerField()
    unifieddamagelevelname = models.CharField(max_length=255, verbose_name='Damage level')
    assetclassid = models.CharField(max_length=10)
    assetclass = models.CharField(max_length=255, verbose_name='Asset class')
    aggregationtest = models.IntegerField()
    qualitycode = models.ForeignKey( 'Lookupphotoqualitycode', db_column='qualitycode',null=True, blank=True)

    class Meta:
        db_table = u'econd\".\"geoarchivemasteroverview'   #note this is a VIEW
        managed = False

    def __unicode__(self):
        if self.photofilename is None:
            self.photofilename = 'unknown'
        return self.photofilename

class GeoArchiveLocations ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='locationid',verbose_name='Location id') # impersonate a primary key from the location id
    locationname = models.CharField(max_length=255,verbose_name='Location name')
    event = models.CharField(max_length=255,verbose_name='Event name')
    yearint = models.IntegerField(verbose_name='Year')
    country = models.CharField(max_length=255,verbose_name='Country')
    photocount= models.IntegerField(verbose_name='Number of photos')
    inventoryclassname = models.CharField(max_length=255,verbose_name='Inventory class')
    unifieddamagelevelname = models.CharField(max_length=255,verbose_name='Unified damage level')
    assetclass = models.CharField(max_length=255,verbose_name='Asset class')
    samplephotoid = models.ForeignKey( 'WebLibPhoto', db_column='samplephotoid',null=True, blank=True)  # returns the photo with the lowest id number to use as a sample iconic image
    eventid = models.IntegerField()
    study = models.CharField(max_length=255)
    studyid = models.IntegerField()
    inventoryclassid = models.IntegerField()
    unifieddamagelevelid = models.IntegerField()
    assetclassid = models.CharField(max_length=10)


    class Meta:
        db_table = u'econd\".\"geoarchivelocations'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.locationname

class GeoArchiveLocationsForJSON ( models.Model ):
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
        db_table = u'econd\".\"geoarchivelocationsforjson'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.locationname

class GeoArchiveEvents ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='eventid') # impersonate a primary key from the event id
    event = models.CharField(max_length=255)
    yearint = models.IntegerField()
    country = models.CharField(max_length=255)

    class Meta:
        db_table = u'econd\".\"geoarchiveevents'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.event

class GeoArchiveEventsQuick ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='eventid') # impersonate a primary key from the event id
    event = models.CharField(max_length=255)
    yearint = models.IntegerField()
    country = models.CharField(max_length=255)

    class Meta:
        db_table = u'econd\".\"geoarchiveevents_quick'     #note this is a VIEW
        managed = False
        ordering = ['-yearint']

    def __unicode__(self):
        return self.country + ' ' + unicode(self.yearint)

class GeoArchiveDamageLevels ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='damagelevelid') # impersonate a primary key from the event id
    damagelevelname = models.CharField(max_length=255)

    class Meta:
        db_table = u'econd\".\"geoarchivedamagelevels'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.damagelevelname


class GeoArchiveDamageLevelsQuick ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='damagelevelid') # impersonate a primary key from the event id
    damagelevelname = models.CharField(max_length=255)

    class Meta:
        db_table = u'econd\".\"geoarchivedamagelevels_quick'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.damagelevelname

class GeoArchiveInventoryClasses ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='inventoryclassid') # impersonate a primary key from the event id
    inventoryclassname = models.CharField(max_length=255)

    class Meta:
        db_table = u'econd\".\"geoarchiveinventoryclasses'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.inventoryclassname

class GeoArchiveAssetClasses ( models.Model ):
    id = models.IntegerField(primary_key=True,db_column='assetclassid') # impersonate a primary key from the event id
    assetclass = models.CharField(max_length=255)

    class Meta:
        db_table = u'econd\".\"geoarchiveassetclasses'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.assetclass

class GeoArchiveAssetClassesQuick ( models.Model ):
    id = models.CharField(max_length=10,primary_key=True,db_column='assetclassid') # impersonate a primary key from the event id
    assetclass = models.CharField(max_length=255)

    class Meta:
        db_table = u'econd\".\"geoarchiveassetclasses_quick'     #note this is a VIEW
        managed = False

    def __unicode__(self):
        return self.assetclass

# used to underpin the search page
class GeoArchiveOverviewFull (models.Model):
    id = models.IntegerField(primary_key=True,db_column='photoid')  # impersonate a primary key from the photo id
    event = models.CharField(max_length=50, blank=True)
    eventid = models.ForeignKey(GeoArchiveEventsQuick, null=True, db_column='eventid', blank=True,verbose_name='Event',default='0')
    country = models.CharField(max_length=50, blank=True)
    yearint = models.IntegerField(null=True, blank=True)
    event_geom = models.TextField(blank=True) # This field type is a guess.
    study = models.CharField(max_length=255, blank=True)
    studyid = models.IntegerField(null=True, blank=True)
    locationid = models.IntegerField(null=True, blank=True)
    locationname = models.CharField(max_length=255, blank=True)
    location_geom = models.TextField(blank=True) # This field type is a guess.
    locationaggregateflag = models.IntegerField(null=True, blank=True)
    thephoto = models.ForeignKey( 'WebLibPhoto', db_column='photoid',null=True, blank=True)

    qualitycode = models.ForeignKey(Lookupphotoqualitycode, null=True, db_column='qualitycode', blank=True,verbose_name='Photo quality code',default='0')

    photofilename = models.CharField(max_length=255, blank=True)
    subjectcode = models.CharField(max_length=50, blank=True)
    detailcode = models.ForeignKey(Lookupdetailcode, null=True, db_column='detailcode', blank=True,verbose_name='Photo detail code',default='0', help_text='A code describing the structural detail that is pictured')
    daysafterevent = models.FloatField(null=True, blank=True)
    timeofdaycode = models.ForeignKey(Lookuptimeofdaycode, null=True, db_column='timeofdaycode', blank=True,verbose_name='Time of day',default='0')
    orientationcode = models.ForeignKey(Lookuporientationcode, null=True, db_column='orientationcode', blank=True,verbose_name='Subject orientation',default='0', help_text='What facade of the building is pictured')
    photographerprofessioncode = models.ForeignKey(Lookupphotographerprofessioncode, null=True, db_column='photographerprofessioncode', blank=True,verbose_name='Photographer profession',default='0')

    name = models.CharField(max_length=255, blank=True)
    parentid = models.IntegerField(null=True, blank=True)
    parenttype = models.CharField(max_length=25, blank=True)
    mat_type_l = models.CharField(max_length=20, blank=True)
    mat_tech_l = models.CharField(max_length=20, blank=True)
    mas_mort_l = models.CharField(max_length=20, blank=True)
    mas_rein_l = models.CharField(max_length=20, blank=True)
    steel_conn_l = models.CharField(max_length=20, blank=True)
    llrs_l = models.CharField(max_length=20, blank=True)
    llrs_duct_l = models.CharField(max_length=20, blank=True)
    roofsysmat = models.CharField(max_length=20, blank=True)
    roofsystyp = models.CharField(max_length=20, blank=True)
    floor_mat = models.CharField(max_length=20, blank=True)
    floor_type = models.CharField(max_length=20, blank=True)
    story_ag_q = models.CharField(max_length=20, blank=True)
    story_ag_1 = models.IntegerField(null=True, blank=True)
    story_ag_2 = models.IntegerField(null=True, blank=True)
    yr_built_q = models.CharField(max_length=20, blank=True)
    yr_built_1 = models.IntegerField(null=True, blank=True)
    yr_built_2 = models.IntegerField(null=True, blank=True)
    str_irreg = models.CharField(max_length=20, blank=True)
    str_hzir_p = models.CharField(max_length=20, blank=True)
    str_veir_p = models.CharField(max_length=20, blank=True)
    occupcy = models.CharField(max_length=20, blank=True)
    occpcy_dt = models.CharField(max_length=20, blank=True)
    designcode = models.CharField(max_length=300, blank=True)
    retrofit = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    inventoryclass_c = models.TextField(blank=True)
    ownerid = models.IntegerField(null=True, blank=True)
    lastupdatebyid = models.IntegerField(null=True, blank=True)
    lastupdate = models.DateTimeField(null=True, blank=True)
    levelorder = models.IntegerField(null=True, blank=True)
    llrs_qual = models.CharField(max_length=20, blank=True)
    plan_shape = models.CharField(max_length=20, blank=True)
    position = models.CharField(max_length=20, blank=True)
    nonstrcexw = models.CharField(max_length=20, blank=True)
    roof_conn = models.CharField(max_length=20, blank=True)
    roofcovmat = models.CharField(max_length=20, blank=True)
    roof_shape = models.CharField(max_length=20, blank=True)
    floor_conn = models.CharField(max_length=20, blank=True)
    foundn_sys = models.CharField(max_length=20, blank=True)
    story_bg_q = models.CharField(max_length=20, blank=True)
    story_bg_1 = models.IntegerField(null=True, blank=True)
    story_bg_2 = models.IntegerField(null=True, blank=True)
    ht_gr_gf_q = models.CharField(max_length=20, blank=True)
    ht_gr_gf_1 = models.IntegerField(null=True, blank=True)
    ht_gr_gf_2 = models.IntegerField(null=True, blank=True)
    slope = models.IntegerField(null=True, blank=True)
    irreg_q = models.CharField(max_length=20, blank=True)
    unifieddamagelevelname = models.CharField(max_length=255, blank=True)
    unifieddamagelevelid = models.ForeignKey(GeoArchiveDamageLevelsQuick, null=True, db_column='unifieddamagelevelid', blank=True,verbose_name='Damage level',default='0')
    assetclass = models.CharField(max_length=255, blank=True)
    assetclassid = models.ForeignKey(GeoArchiveAssetClassesQuick, null=True, db_column='assetclassid', blank=True,verbose_name='Asset class',default='0')
    aggregationtest = models.BigIntegerField(null=True, blank=True)
    class Meta:
        db_table = u'econd\".\"geoarchivemasterfull'