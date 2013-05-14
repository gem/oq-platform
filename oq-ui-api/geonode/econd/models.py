__author__ = 'Simon Ruffle, CAR'

from django.db import models

# Study models
from econd.study_models import *

# GeoArchive and Photo related
from econd.photo_models import *

# Static lookup tables
from econd.static_lookup_models import *

# SQL Views
from econd.sql_views import *

#####################
# core data structure
#####################

class Unifiedcasualtylevel(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'unifiedcasualtylevel'

    def __unicode__(self):
        return  self.name

class Casualtylevel(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    parentid = models.IntegerField()
    mappingid = models.ForeignKey(Unifiedcasualtylevel, db_column='mappingid')
    description = models.CharField(max_length=255, blank=True)
    ownerid = models.IntegerField()
    lastupdatebyid = models.IntegerField()
    lastupdate = models.DateTimeField(null=True, blank=True)
    parenttype = models.CharField(max_length=25, blank=True)
    levelorder = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'casualtylevel'

    def __unicode__(self):
        return  self.name

class Unifieddamagelevel(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'unifieddamagelevel'

    def __unicode__(self):
        return  self.name

class Damagelevel(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    parentid = models.IntegerField()
    mappingid = models.ForeignKey(Unifieddamagelevel, db_column='mappingid')
    description = models.CharField(max_length=255, blank=True)
    ownerid = models.IntegerField()
    lastupdatebyid = models.IntegerField()
    lastupdate = models.DateTimeField(null=True, blank=True)
    parenttype = models.CharField(max_length=25, blank=True)
    levelorder = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'damagelevel'

    def __unicode__(self):
        return  self.name


class Location(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Primary Key: Internal database id', help_text='')
    name = models.CharField(max_length=255, verbose_name='Location name', help_text='')
    parentid = models.IntegerField(verbose_name='Parent study or subevent', help_text='The  primary study or subevent which owns this location. Set on creation, this must not be changed.')
    parenttype = models.CharField(max_length=25, blank=True, verbose_name='Parent study or subevent type', help_text='The type of primary study or subevent which owns this location. Set on creation, this must not be changed.')
    address = models.CharField(max_length=255, blank=True, verbose_name='Address or location', help_text='')
    boundaryid = models.IntegerField(verbose_name='User defined boundary or administrative area name', help_text='User defined boundary or administrative area name')
    location = models.CharField(max_length=50, blank=True, verbose_name='Geometry (long/lat)', help_text='The location or boundary in WKT GIS format eg POINT (long lat).')
    boundary_c = models.TextField(blank=True, verbose_name='Location precision notes', help_text='A comment on the precision of the location or boundary')
    originalsurveyreference = models.CharField(max_length=50, blank=True, verbose_name='Original survey reference', help_text='')
    isaggregated = models.ForeignKey(Lookupyesno, db_column='isaggregated', verbose_name='Is the data aggregated', help_text='This field determines if this location is an aggregation of assets (yes - default) or a single asset (no)')
    intensityzonecode = models.ForeignKey(Lookupintensityzone, db_column='intensityzonecode', verbose_name='USGS Intensity zone', help_text='Optional. Only use this if the location is an intensity zone: The intensity zone on a standard scale.')
    soilclasscode = models.ForeignKey(Lookupsoilclass, db_column='soilclasscode', verbose_name='Soil class', help_text='Optional. NEHRP Soil Class.')
    generalsoilconditions_c = models.TextField(blank=True, verbose_name='General soil conditions', help_text='')
    location_c = models.TextField(blank=True, verbose_name='Location: comment', help_text='An optional comment on the location and loss at the location')

    location_q = models.CharField(max_length=10, default=0)
    guid = models.CharField(max_length=36, blank=True, verbose_name='Globally unique ID', help_text='For future use')

    ownerid = models.IntegerField()
    lastupdatebyid = models.IntegerField()
    lastupdate = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = u'econd\".\"location'

    def __unicode__(self):
        return  self.name

# test code for Taxonomy lookups
class LookupMaterialType(models.Model):
    id = models.CharField(max_length=10, primary_key=True)   # lookup to a VIEW
    name = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = u'econd\".\"lookupmaterialtype'

    def __unicode__(self):
        return  self.name


class Inventoryclass(models.Model):
    id = models.AutoField(primary_key=True, null=False, help_text='Primary Key: Internal database id', )
    name = models.CharField(max_length=255, null=False, default='Inventory class name', verbose_name='Inventory class name', help_text='Inventory class name from original survey', )
    parentid = models.IntegerField(null=False, default='0', verbose_name='Parent study', help_text='The study which owns this inventory class. Set on creation, this must not be changed.', )
    parenttype = models.CharField(max_length=25, null=True, blank=True, verbose_name='Parent study type', help_text='The type of study which owns this inventory class. Set on creation, this must not be changed.', )
    mat_type_l = models.ForeignKey(Lookupmaterialtype, db_column='mat_type_l', max_length=20, null=False, default='0', verbose_name='Material type', help_text='Material type: GEM Building Taxonomy Table 2 Level 1 attribute', )
    mat_tech_l = models.ForeignKey(Lookupmaterialtechnology, db_column='mat_tech_l', max_length=20, null=False, default='0', verbose_name='Material technology', help_text='Material technology: GEM Building Taxonomy Table 2 Level 2 attribute', )
    mas_mort_l = models.ForeignKey(Lookupmasonrymortartype, db_column='mas_mort_l', max_length=20, null=False, default='0', verbose_name='Masonry mortar type', help_text='Masonry mortar type: GEM Building Taxonomy Table 2 Level 3 attribute', )
    mas_rein_l = models.ForeignKey(Lookupmasonryreinforcement, db_column='mas_rein_l', max_length=20, null=False, default='0', verbose_name='Masonry reinforcement', help_text='Masonry reinforcement: GEM Building Taxonomy Table 2 Level 3 attribute', )
    steel_conn_l = models.ForeignKey(Lookupsteelconnectiontype, db_column='steel_conn_l', max_length=20, null=False, default='0', verbose_name='Steel connection type', help_text='Steel connection: GEM Basic Building Taxonomy Table 2 Level 3 attribute', )
    llrs_l = models.ForeignKey(Lookuploadresistingsystem, db_column='llrs_l', max_length=20, null=False, default='0', verbose_name='Type of lateral load-resisting system', help_text='Type of lateral load-resisting system: GEM Building Taxonomy Table 3 Level 1 attribute', )
    llrs_duct_l = models.ForeignKey(Lookupductility, db_column='llrs_duct_l', max_length=20, null=False, default='0', verbose_name='System ductility', help_text='System ductility: GEM Building Taxonomy Table 3 Level 2 attribute', )
    roofsysmat = models.ForeignKey(Lookuproofmaterial, db_column='roofsysmat', max_length=20, null=False, default='0', verbose_name='Roof system material', help_text='Roof material: GEM Building Taxonomy Table 12 Level 3 attribute', )
    roofsystyp = models.ForeignKey(Lookuprooftype, db_column='roofsystyp', max_length=20, null=False, default='0', verbose_name='Roof system type', help_text='Roof type: GEM Building Taxonomy Table 12 Level 4 attribute', )
    floor_mat = models.ForeignKey(Lookupfloormaterial, db_column='floor_mat', max_length=20, null=False, default='0', verbose_name='Floor material', help_text='Floor material: GEM Building Taxonomy Table 11 Level 1 attribute', )
    floor_type = models.ForeignKey(Lookupfloortype, db_column='floor_type', max_length=20, null=False, default='0', verbose_name='Floor type', help_text='Floor type: GEM Building Taxonomy Table 11 Level 2 attribute', )
    story_ag_q = models.ForeignKey(Lookupheight, db_column='story_ag_q', max_length=20, null=False, default='0', verbose_name='Height qualifier', help_text='Height: GEM Building Taxonomy Table 4', )
    story_ag_1 = models.IntegerField(null=True, blank=True,verbose_name='Upper bound of height range', help_text='Upper bound of height range (storeys)', )
    story_ag_2 = models.IntegerField(null=True, blank=True,verbose_name='Lower bound of height range', help_text='Lower bound of height range (storeys)', )
    yr_built_q = models.ForeignKey(Lookupdateofconstruction, db_column='yr_built_q', max_length=20, null=False, default='0', verbose_name='Date of construction or retrofit qualifier', help_text='Date of construction or retrofit: GEM Building Taxonomy Table 5', )
    yr_built_1 = models.IntegerField(null=True, blank=True,verbose_name='Upper bound of date of construction or retrofit range', help_text='Upper bound of date of construction or retrofit range (year)', )
    yr_built_2 = models.IntegerField(null=True, blank=True,verbose_name='Lower bound of date of construction or retrofit range', help_text='Lower bound of date of construction or retrofit range (year)', )
    irreg_q = models.ForeignKey(Lookupirregularityqualifier, db_column='irreg_q', max_length=20, null=False, default='0', verbose_name='Regular or irregular', help_text='Regular or irregular: GEM Building Taxonomy Table 9 Level 1 attribute', )
    str_irreg = models.ForeignKey(Lookupirregularitytype, db_column='str_irreg', max_length=20, null=False, default='0', verbose_name='Structural irregularity type', help_text='Structural irregularity type: GEM Building Taxonomy Table 9 Level 3 attribute', )
    str_hzir_p = models.ForeignKey(Lookuphorizontalirregularity, db_column='str_hzir_p', max_length=20, null=False, default='0', verbose_name='Horizontal irregularity description', help_text='Structural horizontal irregularity description: GEM Building Taxonomy Table 9 Level 2 attribute', )
    str_veir_p = models.ForeignKey(Lookupverticalirregularity, db_column='str_veir_p', max_length=20, null=False, default='0', verbose_name='Vertical irregularity description', help_text='Structural vertical irregularity description: GEM Building Taxonomy Table 9 Level 2 attribute', )
    occupcy = models.ForeignKey(Lookupoccupancy, db_column='occupcy', max_length=20, null=False, default='0', verbose_name='Occupancy', help_text='Occupancy: GEM Building Taxonomy Table 6 Level 1 attribute', )
    occpcy_dt = models.ForeignKey(Lookupoccupancydetail, db_column='occpcy_dt', max_length=20, null=False, default='0', verbose_name='Occupancy detail', help_text='Occupancy detail: GEM Building Taxonomy Table 6 Level 2 attribute', )
    designcode = models.CharField(max_length=300, null=True, blank=True, verbose_name='Design code', help_text='Applicable design code(s) from original survey. Either enter the name(s) or you can use the following abbreviations: HIGHC = Recent (High) Code; INTC = Interim code; LOWC - Early (low) code; PREC = None / pre-code; SVRLC = Several codes', )
    retrofit = models.CharField(max_length=255, null=True, blank=True, verbose_name='Retrofit', help_text='Type of retrofit from original survey', )
    description = models.CharField(max_length=255, null=True, blank=True, verbose_name='Inventory class description', help_text='Inventory class description from original survey', )
    inventoryclass_c = models.TextField(null=True, blank=True, verbose_name='Inventory class: comment', help_text='A comment on the inventory class', )
    levelorder = models.IntegerField(null=True, blank=True, default='0', verbose_name='Display order', help_text='Use this field when the inventory classes need to be in a particular order, eg when used in a survey matrix', )
    ownerid = models.IntegerField(null=False, default='1', verbose_name='Owner ID', help_text='ID of the creator/owner of the record', )
    lastupdatebyid = models.IntegerField(null=False, default='1', verbose_name='Last update by ID', help_text='ID of the last person to update this record', )
    lastupdate = models.DateTimeField(null=True, blank=True, help_text='Last record update date', )

    class Meta:
        db_table = u'econd\".\"inventoryclass'
        managed = False

    def __unicode__(self):
        return self.name


class Surveyvalue(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    parentid = models.IntegerField()
    metriccode = models.ForeignKey(Lookupmetric, db_column='metriccode')
    damagelevelid = models.ForeignKey(Damagelevel, db_column='damagelevelid')
    casualtylevelid = models.ForeignKey(Casualtylevel, db_column='casualtylevelid')
    inventoryclassid = models.ForeignKey(Inventoryclass, db_column='inventoryclassid')
    assetclasscode = models.ForeignKey(Lookupassetclass, db_column='assetclasscode')
    assettypecode = models.ForeignKey(Lookupassettype, db_column='assettypecode')
    assetsubtypecode = models.ForeignKey(Lookupassetsubtype, db_column='assetsubtypecode')
    typeofdamagecode = models.ForeignKey(Lookuptypeofdamage, db_column='typeofdamagecode', related_name="%(app_label)s_%(class)s_related",)
    value = models.FloatField(null=True, blank=True)
    value_q = models.CharField(max_length=10)
    ownerid = models.IntegerField()
    lastupdatebyid = models.IntegerField()
    lastupdate = models.DateTimeField(null=True, blank=True)
    assetconstructioncode = models.ForeignKey(Lookupassetconstruction, db_column='assetconstructioncode')
    parentdamagesurveymatrixid = models.IntegerField()
    parentcasualtysurveymatrixid = models.IntegerField()
    typeofdamagecode2 = models.ForeignKey(Lookuptypeofdamage, db_column='typeofdamagecode2', related_name="%(app_label)s_%(class)s_related2",)
    originalsurveyreference = models.CharField(max_length=50, blank=True)

    class Meta:
        db_table = u'econd\".\"surveyvalue'

    def __unicode__(self):
        return  self.name


