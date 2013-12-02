from django.db import models
from photologue.models import ImageModel,PhotoSize
import platform

# Models that support basic content management. Stored in the public schema along with admin related tables

class PhotologueWatermark(models.Model):
    id = models.IntegerField(primary_key=True, blank=True, )
    name = models.CharField(max_length=30, unique=True, )
    description = models.TextField(max_length=30, unique=True, )
    image = models.CharField(max_length=100, unique=True, )
    style = models.CharField(max_length=5, unique=True, )
    opacity = models.FloatField(max_length=5, unique=True, )
    class Meta:
        db_table = u'photologue_watermark'
        managed=False

class PhotologuePhotoeffect(models.Model):
    id = models.IntegerField(primary_key=True, unique=True, )
    name = models.CharField(max_length=30, unique=True, )
    description = models.TextField(max_length=30, unique=True, )
    transpose_method = models.CharField(max_length=15, unique=True, )
    color = models.FloatField(max_length=15, unique=True, )
    brightness = models.FloatField(max_length=15, unique=True, )
    contrast = models.FloatField(max_length=15, unique=True, )
    sharpness = models.FloatField(max_length=15, unique=True, )
    filters = models.CharField(max_length=200, unique=True, )
    reflection_size = models.FloatField(max_length=200, unique=True, )
    reflection_strength = models.FloatField(max_length=200, unique=True, )
    background_color = models.CharField(max_length=7, unique=True, )
    class Meta:
        db_table = u'photologue_photoeffect'
        managed=False

class PhotologuePhotosize(models.Model):
    id = models.IntegerField(primary_key=True, unique=True, )
    name = models.CharField(max_length=40, unique=True, )
    width = models.IntegerField(max_length=40, unique=True, )
    height = models.IntegerField(max_length=40, unique=True, )
    quality = models.IntegerField(max_length=40, unique=True, )
    upscale = models.BooleanField(max_length=40, unique=True, )
    crop = models.BooleanField(max_length=40, unique=True, )
    pre_cache = models.BooleanField(max_length=40, unique=True, )
    increment_count = models.BooleanField(max_length=40, unique=True, )
    effect = models.ForeignKey(PhotologuePhotoeffect, null=True, blank=True, )
    watermark = models.ForeignKey(PhotologueWatermark, null=True, blank=True, )
    class Meta:
        db_table = u'photologue_photosize'
        managed=False

    def __unicode__(self):
        return  self.name + '(' + str(self.width) + 'x' + str(self.height) + ')'

    def get_name(self):
        return  self.name

class PhotologuePhoto(models.Model):
    id = models.IntegerField(primary_key=True, null=True, blank=True, )
    image = models.CharField(max_length=100, primary_key=True, null=True, blank=True, )
    date_taken = models.DateTimeField(null=True, blank=True, primary_key=True, )
    view_count = models.IntegerField(primary_key=True, null=True, blank=True, )
    crop_from = models.CharField(max_length=10, null=True, blank=True, )
    effect = models.ForeignKey(PhotologuePhotoeffect, null=True, blank=True, )
    title = models.CharField(max_length=255, unique=True, null=True, blank=True, )
    title_slug = models.CharField(max_length=50, unique=True, null=True, blank=True, )
    caption = models.TextField(max_length=255, blank=True, blank=True, )
    date_added = models.DateTimeField(null=True, blank=True, blank=True, )
    is_public = models.BooleanField(null=True, blank=True, blank=True, )
    tags = models.CharField(max_length=255, blank=True, blank=True, )
    class Meta:
        db_table = u'photologue_photo'
        managed=False


class WebLibPhoto(ImageModel):
    id = models.IntegerField(primary_key=True, blank=True, blank=True, )
    title = models.CharField(max_length=255, unique=True, blank=True, blank=True, )
    title_slug = models.CharField(max_length=50, unique=True, blank=True, blank=True, )
    caption = models.TextField(max_length=255, blank=True, blank=True, )
    date_added = models.DateTimeField(null=True, blank=True, blank=True, )
    is_public = models.BooleanField(null=True, blank=True, blank=True, )
    tags = models.CharField(max_length=255, blank=True, blank=True, )

    class Meta:
        db_table = u'photologue_photo'
        managed = False

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

    class Meta:
        db_table = u'weblib_pagetype'

    def __unicode__(self):
        return self.name


class Page(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    introtext = models.TextField(null=True, blank=True, verbose_name='Intro text')
    image1 = models.ForeignKey('WebLibPhoto', db_column='image1id',null=True, blank=True, verbose_name='Iconic image') #if using syncdb change this to PhotologuePhoto and comment out WebLibPhoto
    #image1 = models.ForeignKey( 'PhotologuePhoto', db_column='image1id',null=True, blank=True)
    image1size = models.ForeignKey('PhotologuePhotosize', db_column='image1photosizeid',null=True, blank=True)
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
    id = models.AutoField(primary_key=True, blank=True, blank=True, )
    parentid = models.IntegerField(null=True, blank=True, blank=True, )
    parenttype = models.CharField(max_length=25, blank=True, blank=True, )
    name = models.CharField(max_length=255, blank=True, blank=True, )
    subtitle = models.CharField(max_length=255, blank=True, )
    url = models.CharField(max_length=600, blank=True, )
    year = models.IntegerField(null=True, blank=True, )
    displayorder = models.IntegerField(null=True, blank=True, )
    introtext = models.TextField(blank=True, )
    image1 = models.ForeignKey('WebLibPhoto', db_column='image1id', null=True, blank=True, ) #if using syncdb change this to PhotologuePhoto and comment out WebLibPhoto
    #image1id = models.ForeignKey(PhotologuePhoto, null=True, db_column='image1id', blank=True)
    image1photosizeid = models.ForeignKey(PhotologuePhotosize, null=True, db_column='image1photosizeid', blank=True, )
    maintext = models.TextField(blank=True, )
    lastupdate = models.DateTimeField(null=True, blank=True, )
    lastupdatebyid = models.IntegerField(null=True, blank=True, )
    ownerid = models.IntegerField(null=True, blank=True, )

    class Meta:
        db_table = u'weblib_link'

    def __unicode__(self):
        return self.name


class ResourceConnection(models.Model):
    id = models.AutoField(primary_key=True)
    parentmodel = models.CharField(max_length=50)
    parentpk = models.IntegerField()
    childmodel = models.CharField(max_length=50)
    childpk = models.IntegerField()
    timeline = models.IntegerField()

    class Meta:
        db_table = u'weblib_resourceconnection'

    def __unicode__(self):
        return self.parentmodel + '/' + str(self.parentpk) + '->' + self.childmodel + '/' + str(self.childpk) + ' (' + str(self.timeline) + ')'


from django.core.files.storage import FileSystemStorage
from django.conf import settings
the_media_root = settings.MEDIA_ROOT
try:
    the_media_root = settings.SECURE_MEDIA_ROOT # see if the secure media root is set, if so use it
except:
    pass

fs = FileSystemStorage(location=the_media_root, base_url='/accessdenied')  #because /accessdenied is not accessible via urls.py, this folder cannot be accessed directly from the web

class Document(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    url = models.FileField(storage=fs, upload_to='documents', max_length=255,verbose_name="Upload document")
    introtext = models.TextField(null=True, blank=True, verbose_name='Intro text')
    image1 = models.ForeignKey('WebLibPhoto', db_column='image1id',null=True, blank=True, verbose_name='Iconic image') #if using syncdb change this to PhotologuePhoto and comment out WebLibPhoto
    image1size = models.ForeignKey('PhotologuePhotosize', db_column='image1photosizeid',null=True, blank=True)
    grouplist = models.CharField(null=True, blank=True,max_length=50, verbose_name='Security group list', help_text='Comma separated list of user groups that can download this document. Leave blank for public download')
    lastupdate = models.DateTimeField(null=True, blank=True)
    lastupdatebyid = models.IntegerField(null=True, blank=True)
    ownerid = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = u'weblib_document'

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

    class Meta:
        db_table = u'weblib_downloadlog'

    def __unicode__(self):
        return self.entity + '/' + str(self.entityid)

