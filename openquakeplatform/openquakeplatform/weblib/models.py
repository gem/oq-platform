from django.db import models
from photologue.models import ImageModel, PhotoSize, Watermark, PhotoEffect, Photo
from openquakeplatform.econd.static_lookup_models import (Lookupdetailcode, 
                                                          Lookupphotographerprofessioncode,
                                                          Lookupphotoqualitycode, Lookuporientationcode,
                                                          Lookuptimeofdaycode)
import platform

# Models that support basic content management. Stored in the public schema along with admin related tables

class PhotologuePhotoSize(PhotoSize):
    def __unicode__(self):
        return  self.name + '(' + str(self.width) + 'x' + str(self.height) + ')'

    def get_name(self):
        return  self.name

# From models.Model
 #   id = models.IntegerField(primary_key=True)

# From photologue.ImageModel
 #   image = models.CharField(max_length=255, blank=True)
 #   datetaken = models.DateTimeField(null=True, blank=True) # was date_taken
 #   view_count = models.IntegerField()
 #   crop_from = models.CharField(max_length=10)
 #   effect = models.ForeignKey('PhotologuePhotoeffect', null=True, blank=True)

# From photologue.Photo
 #   title = models.CharField(max_length=255)
 #   title_slug = models.CharField(max_length=50)
 #   caption = models.CharField(max_length=255, blank=True)
 #   date_added = models.DateTimeField(null=True, blank=True)
 #   is_public = models.BooleanField()
 #   tags = models.CharField(max_length=255, blank=True)

class WebLibPhoto(Photo):
    parentid = models.IntegerField()
    parenttype = models.CharField(max_length=25, blank=True)
    detailcode = models.ForeignKey(Lookupdetailcode, null=True, db_column='detailcode', blank=True)
    photographername = models.CharField(max_length=255, blank=True)
    photographerorganisation = models.CharField(max_length=255, blank=True)
    photographerprofessioncode = models.ForeignKey(Lookupphotographerprofessioncode, null=True, db_column='photographerprofessioncode', related_name='weblib_weblibphoto', blank=True)
    qualitycode = models.ForeignKey(Lookupphotoqualitycode, null=True, db_column='qualitycode', related_name='weblib_weblibphoto', blank=True)
    orientationcode = models.ForeignKey(Lookuporientationcode, null=True, db_column='orientationcode', related_name='weblib_weblibphoto', blank=True)
    gpsdirectioncode = models.CharField(max_length=10, blank=True)
    gpsdirection = models.FloatField(null=True, blank=True)
    subjectcode = models.CharField(max_length=50, blank=True)
    daysafterevent = models.FloatField(null=True, blank=True)
    timeofdaystring = models.CharField(max_length=20, blank=True)
    timeofdaycode = models.ForeignKey(Lookuptimeofdaycode, null=True, db_column='timeofdaycode', related_name='weblib_weblibphoto', blank=True)
    description_c = models.TextField(blank=True)
    ownerid = models.IntegerField()
    lastupdate = models.DateTimeField(null=True, blank=True)
    lastupdatebyid = models.IntegerField()
    ph_originalsurveyreference = models.CharField(max_length=60, blank=True)
    photographercontactinfo = models.CharField(max_length=255, blank=True)
    copyright_c = models.TextField(blank=True)
    timeofday = models.DateTimeField(null=True, blank=True)
    subjectmastercode = models.CharField(max_length=10, blank=True)
    subjectsubcode = models.CharField(max_length=10, blank=True)
    typeofstructurecode = models.CharField(max_length=10, blank=True)
    cityscalecode = models.CharField(max_length=10, blank=True)
    isdetail = models.IntegerField()
    hasscaleindication = models.IntegerField()
    isinternal = models.IntegerField()
    hasowner = models.IntegerField()
    haspeople = models.IntegerField()

    def __unicode__(self):
        return  self.title + ': "' + self.caption + '"'

    def get_url(self,photosizename):
        return self._get_SIZE_url(photosizename)


class Pagetype (models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    containerclass = models.CharField(max_length=255)
    listapp = models.CharField(max_length=50, default='weblib')
    listmodel = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name

class Page(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    introtext = models.TextField(null=True, blank=True, verbose_name='Intro text')
    image1 = models.ForeignKey('WebLibPhoto', db_column='image1id',null=True, blank=True, verbose_name='Iconic image')
    image1size = models.ForeignKey('PhotologuePhotoSize', db_column='image1photosizeid',null=True, blank=True)
    maintext = models.TextField(null=True, blank=True, verbose_name='Main text')
    righttext = models.TextField(null=True, blank=True, verbose_name='Right hand text')
    pagetype = models.ForeignKey('Pagetype', db_column='pagetype', null=True, blank=True, verbose_name='Page type')
    nextlink = models.CharField(max_length=255, null=True, blank=True, verbose_name='Next link for wizard')
    prevlink = models.CharField(max_length=255, null=True, blank=True, verbose_name = 'Previous link for wizard')
    lastupdate = models.DateTimeField(null=True, blank=True)
    lastupdatebyid = models.IntegerField(null=True, blank=True)
    ownerid = models.IntegerField(null=True, blank=True)

    def __unicode__(self):
        return self.name

class Link(models.Model):
    id = models.AutoField(primary_key=True, )
    parentid = models.IntegerField(null=True, blank=True, )
    parenttype = models.CharField(max_length=25, blank=True, )
    name = models.CharField(max_length=255, )
    subtitle = models.CharField(max_length=255, blank=True, )
    url = models.CharField(max_length=600, blank=True, )
    year = models.IntegerField(null=True, blank=True, )
    displayorder = models.IntegerField(null=True, blank=True, )
    introtext = models.TextField(blank=True, )
    image1 = models.ForeignKey( 'WebLibPhoto', db_column='image1id',null=True, blank=True, ) 
    image1photosizeid = models.ForeignKey(PhotologuePhotoSize, null=True, db_column='image1photosizeid', blank=True, )
    maintext = models.TextField(blank=True, )
    lastupdate = models.DateTimeField(null=True, blank=True, )
    lastupdatebyid = models.IntegerField(null=True, blank=True, )
    ownerid = models.IntegerField(null=True, blank=True, )

    def __unicode__(self):
        return self.name


class ResourceConnection(models.Model):
    id = models.AutoField(primary_key=True)
    parentmodel = models.CharField(max_length=50)
    parentpk = models.IntegerField()
    childmodel = models.CharField(max_length=50)
    childpk = models.IntegerField()
    timeline = models.IntegerField()

    def __unicode__(self):
        return self.parentmodel + '/' + str(self.parentpk) + '->' + self.childmodel + '/' + str(self.childpk) + ' (' + str(self.timeline) + ')'


from django.core.files.storage import FileSystemStorage
from django.conf import settings
the_media_root = getattr(settings, "SECURE_MEDIA_ROOT", settings.MEDIA_ROOT)

fs = FileSystemStorage(location=the_media_root, base_url='/accessdenied')  #because /accessdenied is not accessible via urls.py, this folder cannot be accessed directly from the web

class Document(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    url = models.FileField(storage=fs, upload_to='documents', max_length=255,verbose_name="Upload document")
    introtext = models.TextField(null=True, blank=True, verbose_name='Intro text')
    image1 = models.ForeignKey('WebLibPhoto', db_column='image1id',null=True, blank=True, verbose_name='Iconic image') #if using syncdb change this to PhotologuePhoto and comment out WebLibPhoto
    image1size = models.ForeignKey('PhotologuePhotoSize', db_column='image1photosizeid',null=True, blank=True)
    grouplist = models.CharField(null=True, blank=True,max_length=50, verbose_name='Security group list', help_text='Comma separated list of user groups that can download this document. Leave blank for public download')
    lastupdate = models.DateTimeField(null=True, blank=True)
    lastupdatebyid = models.IntegerField(null=True, blank=True)
    ownerid = models.IntegerField(null=True, blank=True)

    def __unicode__(self):
        return self.name

class DownloadLog(models.Model):
    id = models.AutoField(primary_key=True)
    entity = models.CharField(max_length=50, verbose_name='The type of entity that was downloaded')
    entityid = models.IntegerField(verbose_name='The id of the entity that was downloaded')
    userid = models.IntegerField(verbose_name='The user id of the person who downloaded the entity')
    timestamp = models.DateTimeField(null=True, blank=True, verbose_name='Timestamp of the download')
    statusmessage = models.CharField(max_length=255, verbose_name='Status message describing the download')
    clientipv4 = models.CharField(max_length=20, verbose_name='IP Address of client')
    size = models.IntegerField(verbose_name='Size in bytes of download')
    lastupdate = models.DateTimeField(null=True, blank=True)
    lastupdatebyid = models.IntegerField(null=True, blank=True)
    ownerid = models.IntegerField(null=True, blank=True)

    def __unicode__(self):
        return self.entity + '/' + str(self.entityid)

