__author__ = 'Simon Ruffle, CAR'

from django.db import models

########################
# Static lookup tables
########################


class Lookupassetclass(models.Model):
    id = models.CharField(max_length=10, primary_key=True, unique=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupassetclass'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmagnitudeunit(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupmagnitudeunit'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupqualitymetric(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupqualitymetric'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupregion(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupregion'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupstatus(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupstatus'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupstudytype(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupstudytype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupunit(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupunit'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupassettype(models.Model):
    id = models.CharField(max_length=10, primary_key=True, unique=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    parentid = models.ForeignKey(Lookupassetclass, db_column='parentid', )
    class Meta:
        db_table = u'econd\".\"lookupassettype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupassetsubtype(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    parentid = models.ForeignKey(Lookupassettype, db_column='parentid', )
    class Meta:
        db_table = u'econd\".\"lookupassetsubtype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupassetconstruction(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    parentid = models.ForeignKey(Lookupassetsubtype, db_column='parentid', )
    class Meta:
        db_table = u'econd\".\"lookupassetconstruction'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupintensityzone(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupintensityzone'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmetric(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupmetric'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupsoilclass(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupsoilclass'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuptypeofdamage(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookuptypeofdamage'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupyesno(models.Model):
    id = models.IntegerField(primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupyesno'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


# photo related lookup tables

class Lookupyesnonull(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'econd\".\"lookupyesnonull'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupsubjectmastercode(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'econd\".\"lookupsubjectmastercode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupsubjectsubcode(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    parentid = models.ForeignKey(Lookupsubjectmastercode, db_column='parentid')
    class Meta:
        db_table = u'econd\".\"lookupsubjectsubcode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuptypeofstructurecode(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'econd\".\"lookuptypeofstructurecode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupcityscalecode(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'econd\".\"lookupcityscalecode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


# this table ultimately to be removed as it has been superceded
class Lookupdetailcode(models.Model):
    id = models.CharField(max_length=100, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupdetailcode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuporientationcode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookuporientationcode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupphotoqualitycode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupphotoqualitycode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuptimeofdaycode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookuptimeofdaycode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupphotographerprofessioncode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupphotographerprofessioncode'
        ordering = ['weight']

    def __unicode__(self):
        return  self.name


# end of photo related lookup tables

class Lookupmaterialtype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupmaterialtype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmaterialtechnology(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupmaterialtechnology'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmasonrymortartype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupmasonrymortartype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmasonryreinforcement(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupmasonryreinforcement'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupsteelconnectiontype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupsteelconnectiontype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuploadresistingsystem(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookuploadresistingsystem'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupductility(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupductility'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name

class Lookuproofmaterial(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookuproofmaterial'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuprooftype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookuprooftype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupfloormaterial(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupfloormaterial'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupfloortype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupfloortype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupheight(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupheight'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupdateofconstruction(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupdateofconstruction'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupirregularityqualifier(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupirregularityqualifier'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupirregularitytype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupirregularitytype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuphorizontalirregularity(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookuphorizontalirregularity'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupverticalirregularity(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupverticalirregularity'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupoccupancy(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupoccupancy'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupoccupancydetail(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd\".\"lookupoccupancydetail'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name

        #end of static lookup tables
