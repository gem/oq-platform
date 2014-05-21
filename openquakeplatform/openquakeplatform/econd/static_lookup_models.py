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
        db_table = u'econd__lookupassetclass'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmagnitudeunit(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupmagnitudeunit'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupqualitymetric(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupqualitymetric'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupregion(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupregion'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupstatus(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupstatus'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupstudytype(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupstudytype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupunit(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupunit'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupassettype(models.Model):
    id = models.CharField(max_length=10, primary_key=True, unique=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    parentid = models.ForeignKey(Lookupassetclass, db_column='parentid', )
    class Meta:
        db_table = u'econd__lookupassettype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupassetsubtype(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    parentid = models.ForeignKey(Lookupassettype, db_column='parentid', )
    class Meta:
        db_table = u'econd__lookupassetsubtype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupassetconstruction(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    parentid = models.ForeignKey(Lookupassetsubtype, db_column='parentid', )
    class Meta:
        db_table = u'econd__lookupassetconstruction'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupintensityzone(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupintensityzone'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmetric(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupmetric'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupsoilclass(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupsoilclass'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuptypeofdamage(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookuptypeofdamage'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupyesno(models.Model):
    id = models.IntegerField(primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupyesno'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


# photo related lookup tables

class Lookupyesnonull(models.Model):
    id = models.IntegerField(primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupyesnonull'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupsubjectmastercode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupsubjectmastercode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupsubjectsubcode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    parentid = models.ForeignKey(Lookupsubjectmastercode, db_column='parentid', )
    class Meta:
        db_table = u'econd__lookupsubjectsubcode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuptypeofstructurecode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookuptypeofstructurecode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupcityscalecode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupcityscalecode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


# this table ultimately to be removed as it has been superceded
class Lookupdetailcode(models.Model):
    id = models.CharField(max_length=100, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupdetailcode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuporientationcode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookuporientationcode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupphotoqualitycode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupphotoqualitycode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuptimeofdaycode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookuptimeofdaycode'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupphotographerprofessioncode(models.Model):
    id = models.CharField(max_length=10, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupphotographerprofessioncode'
        ordering = ['weight']

    def __unicode__(self):
        return  self.name


# end of photo related lookup tables

class Lookupmaterialtype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupmaterialtype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmaterialtechnology(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupmaterialtechnology'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmasonrymortartype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupmasonrymortartype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupmasonryreinforcement(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupmasonryreinforcement'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupsteelconnectiontype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupsteelconnectiontype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuploadresistingsystem(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookuploadresistingsystem'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupductility(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupductility'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name

class Lookuproofmaterial(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookuproofmaterial'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuprooftype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookuprooftype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupfloormaterial(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupfloormaterial'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupfloortype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupfloortype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupheight(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupheight'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupdateofconstruction(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupdateofconstruction'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupirregularityqualifier(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupirregularityqualifier'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupirregularitytype(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupirregularitytype'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookuphorizontalirregularity(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookuphorizontalirregularity'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupverticalirregularity(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupverticalirregularity'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupoccupancy(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupoccupancy'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name


class Lookupoccupancydetail(models.Model):
    id = models.CharField(max_length=20, primary_key=True, )
    name = models.CharField(max_length=255, blank=True, )
    weight = models.IntegerField(null=True, blank=True, )
    class Meta:
        db_table = u'econd__lookupoccupancydetail'
        ordering = ['weight']
    def __unicode__(self):
        return  self.name

        #end of static lookup tables
