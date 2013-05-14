from django.db import models
from photologue.models import ImageModel,PhotoSize

# Models that support basic content management. Stored in the public schema along with admin related tables

class PhotologueWatermark(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, unique=True)
    description = models.TextField()
    image = models.CharField(max_length=100)
    style = models.CharField(max_length=5)
    opacity = models.FloatField()
    class Meta:
        db_table = u'photologue_watermark'

class PhotologuePhotoeffect(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, unique=True)
    description = models.TextField()
    transpose_method = models.CharField(max_length=15)
    color = models.FloatField()
    brightness = models.FloatField()
    contrast = models.FloatField()
    sharpness = models.FloatField()
    filters = models.CharField(max_length=200)
    reflection_size = models.FloatField()
    reflection_strength = models.FloatField()
    background_color = models.CharField(max_length=7)
    class Meta:
        db_table = u'photologue_photoeffect'

class PhotologuePhotosize(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=40, unique=True)
    width = models.IntegerField()
    height = models.IntegerField()
    quality = models.IntegerField()
    upscale = models.BooleanField()
    crop = models.BooleanField()
    pre_cache = models.BooleanField()
    increment_count = models.BooleanField()
    effect = models.ForeignKey(PhotologuePhotoeffect, null=True, blank=True)
    watermark = models.ForeignKey(PhotologueWatermark, null=True, blank=True)
    class Meta:
        db_table = u'photologue_photosize'

    def __unicode__(self):
        return  self.name + '(' + str(self.width) + 'x' + str(self.height) + ')'

    def get_name(self):
        return  self.name

class PhotologuePhoto(models.Model):
    id = models.IntegerField(primary_key=True)
    image = models.CharField(max_length=100,db_column='name')
    date_taken = models.DateTimeField(null=True, blank=True)
    view_count = models.IntegerField()
    crop_from = models.CharField(max_length=10)
    effect = models.ForeignKey(PhotologuePhotoeffect, null=True, blank=True)
    title = models.CharField(max_length=50, unique=True)
    title_slug = models.CharField(max_length=50, unique=True)
    caption = models.TextField()
    date_added = models.DateTimeField()
    is_public = models.BooleanField()
    tags = models.CharField(max_length=255)
    class Meta:
        db_table = u'photologue_photo'


class WebLibPhoto(ImageModel):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=50, unique=True)
    title_slug = models.CharField(max_length=50, unique=True)
    caption = models.TextField()
    date_added = models.DateTimeField()
    is_public = models.BooleanField()
    tags = models.CharField(max_length=255)

    class Meta:
        db_table = u'photologue_photo'
        managed = False

    def __unicode__(self):
        if self.title is None:
            self.title = ''
        if self.caption is None:
            self.caption = ''
        return  self.title + ': "' + self.caption + '"'

    def get_url(self,photosizename):
        return self._get_SIZE_url(photosizename)

class Page(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    introtext = models.TextField(null=True, blank=True, verbose_name='Intro text')
    image1 = models.ForeignKey( 'WebLibPhoto', db_column='image1id',null=True, blank=True) #if using syncdb change this to PhotologuePhoto and comment out WebLibPhoto
    #image1 = models.ForeignKey( 'PhotologuePhoto', db_column='image1id',null=True, blank=True)
    image1size = models.ForeignKey( 'PhotologuePhotosize', db_column='image1photosizeid',null=True, blank=True)
    maintext = models.TextField(null=True, blank=True, verbose_name='Main text')
    lastupdate = models.DateTimeField(null=True, blank=True)
    lastupdatebyid = models.IntegerField(null=True, blank=True)
    ownerid = models.IntegerField(null=True, blank=True)

    class Meta:
        managed = False

    def __unicode__(self):
        return self.name

class Link(models.Model):
    id = models.AutoField(primary_key=True)
    parentid = models.IntegerField()
    parenttype = models.CharField(max_length=25)
    name = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    url = models.CharField(max_length=600, blank=True)
    year = models.IntegerField(null=True, blank=True)
    displayorder = models.IntegerField(null=True, blank=True)
    introtext = models.TextField(blank=True)
    image1 = models.ForeignKey( 'WebLibPhoto', db_column='image1id',null=True, blank=True) #if using syncdb change this to PhotologuePhoto and comment out WebLibPhoto
    #image1id = models.ForeignKey(PhotologuePhoto, null=True, db_column='image1id', blank=True)
    image1photosizeid = models.ForeignKey(PhotologuePhotosize, null=True, db_column='image1photosizeid', blank=True)
    maintext = models.TextField(blank=True)
    lastupdate = models.DateTimeField(null=True, blank=True)
    lastupdatebyid = models.IntegerField(null=True, blank=True)
    ownerid = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'weblib_link'

    def __unicode__(self):
        return self.name