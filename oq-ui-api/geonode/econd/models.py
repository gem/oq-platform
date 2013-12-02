__author__ = 'Simon Ruffle, CAR'

from django.db import models

# Study level models
from econd.study_models import *

# Event level models
from econd.event_models import *

# GeoArchive and Photo related
from econd.photo_models import *

# Static lookup tables
from econd.static_lookup_models import *

# SQL Views
from econd.sql_views import *

# Sub events
from econd.subevent_models import *

#####################
# core data structure
#####################


class Unifiedcasualtylevel(models.Model):
    id = models.IntegerField(primary_key=True, null=False, help_text='Primary Key: lookup code', )
    name = models.CharField(max_length=255, null=True, blank=True, default='', help_text='The name', )
    weight = models.IntegerField(null=True, blank=True, default='0', help_text='Controls order in which items are displayed in menus', )

    class Meta:
        db_table = u'econd\".\"unifiedcasualtylevel'

    def __unicode__(self):
        return self.name


class Casualtylevel(models.Model):
    id = models.AutoField(primary_key=True, null=False, help_text='Primary Key: Internal database id', blank=True, )
    name = models.CharField(max_length=255, null=False, default='casualty level name', verbose_name='casualty level name', help_text='casualty level name', blank=True, )
    parentid = models.IntegerField(default='0', verbose_name='Parent study', help_text='The study which owns this casualty level - normally no need to change this', max_length=255, blank=True, )
    parenttype = models.CharField(max_length=25, null=True, blank=True, verbose_name='Parent type', help_text='The type of parent which owns this. Set on creation, this must not be changed.', )
    mappingid = models.ForeignKey(Unifiedcasualtylevel, db_column='mappingid', related_name='+', null=False, default='0', verbose_name='Mapping to unified casualty level', help_text='Mapping to unified casualty level in the unified scale mapping', max_length=25, blank=True, )
    description = models.CharField(max_length=255, null=True, blank=True, verbose_name='casualty level description', help_text='casualty level description', )
    levelorder = models.IntegerField(null=True, blank=True, default='0', verbose_name='Level order', help_text='Use this field when the scale levels need to be in a particular order, eg when used in a survey matrix', )
    ownerid = models.IntegerField(null=True, default='1', verbose_name='Owner ID', help_text='ID of the creator/owner of the record', blank=True, )
    lastupdatebyid = models.IntegerField(null=True, default='1', verbose_name='Last update by ID', help_text='ID of the last person to update this record', blank=True, )
    lastupdate = models.DateTimeField(null=True, blank=True, help_text='Last record update date', )

    class Meta:
        db_table = u'econd\".\"casualtylevel'

    def __unicode__(self):
        return self.name


class Unifieddamagelevel(models.Model):
    id = models.IntegerField(primary_key=True, null=False, help_text='Primary Key: lookup code', unique=True, blank=True, )
    name = models.CharField(max_length=255, null=True, blank=True, default='', help_text='The name', )
    weight = models.IntegerField(null=True, blank=True, default='0', help_text='Controls order in which items are displayed in menus', )

    class Meta:
        db_table = u'econd\".\"unifieddamagelevel'

    def __unicode__(self):
        return self.name


class Damagelevel(models.Model):
    id = models.AutoField(primary_key=True, null=False, help_text='Primary Key: Internal database id', blank=True, )
    name = models.CharField(max_length=255, null=False, default='Damage level name', verbose_name='Damage level name', help_text='Damage level name eg "collapsed", or "D3", or "yellow"', blank=True, )
    parentid = models.IntegerField(default='0', verbose_name='Parent study', help_text='The study which owns this damage level - normally no need to change this', max_length=255, blank=True, )
    parenttype = models.CharField(max_length=25, null=True, blank=True, verbose_name='Parent type', help_text='The type of parent which owns this. Set on creation, this must not be changed.', )
    mappingid = models.ForeignKey(Unifieddamagelevel, db_column='mappingid', related_name='+', null=False, default='0', verbose_name='Mapping to unified damage level', help_text='Mapping to unified damage level in the unified scale mapping', max_length=25, blank=True, )
    description = models.CharField(max_length=255, null=True, blank=True, verbose_name='Damage level description', help_text='Damage level description', )
    levelorder = models.IntegerField(null=True, blank=True, default='0', verbose_name='Level order', help_text='Use this field when the scale levels need to be in a particular order, eg when used in a survey matrix', )
    ownerid = models.IntegerField(null=True, default='1', verbose_name='Owner ID', help_text='ID of the creator/owner of the record', blank=True, )
    lastupdatebyid = models.IntegerField(null=True, default='1', verbose_name='Last update by ID', help_text='ID of the last person to update this record', blank=True, )
    lastupdate = models.DateTimeField(null=True, blank=True, help_text='Last record update date', )

    class Meta:
        db_table = u'econd\".\"damagelevel'
        ordering = ['levelorder']

    def __unicode__(self):
        return self.name


class Location(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Primary Key: Internal database id', help_text='', unique=True, blank=True, )
    name = models.CharField(max_length=255, verbose_name='Location name', help_text='', blank=True, )
    parentid = models.IntegerField(verbose_name='Parent study or subevent', help_text='The  primary study or subevent which owns this location. Set on creation, this must not be changed.', max_length=255, blank=True, )
    parenttype = models.CharField(max_length=25, blank=True, verbose_name='Parent study or subevent type', help_text='The type of primary study or subevent which owns this location. Set on creation, this must not be changed.', )
    address = models.CharField(max_length=255, blank=True, verbose_name='Address or location', help_text='', )
    boundaryid = models.IntegerField(verbose_name='User defined boundary or administrative area id', help_text='User defined boundary or administrative area id', max_length=255, blank=True, )
    location = models.CharField(max_length=50, blank=True, verbose_name='Geometry (long/lat)', help_text='The location or boundary in WKT GIS format eg POINT (long lat).', )
    boundary_c = models.TextField(blank=True, verbose_name='Location precision notes', help_text='A comment on the precision of the location or boundary', )
    originalsurveyreference = models.CharField(max_length=50, blank=True, verbose_name='Original survey reference', help_text='', )
    isaggregated = models.ForeignKey(Lookupyesno, db_column='isaggregated', default='0', verbose_name='Is the data aggregated', help_text='This field determines if this location is an aggregation of assets (yes - default) or a single asset (no)', max_length=50, blank=True, )
    intensityzonecode = models.ForeignKey(Lookupintensityzone, db_column='intensityzonecode', default='0', verbose_name='USGS Intensity zone', help_text='Optional. Only use this if the location is an intensity zone: The intensity zone on a standard scale.', max_length=50, blank=True, )
    soilclasscode = models.ForeignKey(Lookupsoilclass, db_column='soilclasscode', default='0', verbose_name='Soil class', help_text='Optional. NEHRP Soil Class.', max_length=50, blank=True, )
    generalsoilconditions_c = models.TextField(blank=True, verbose_name='General soil conditions', help_text='', )
    location_c = models.TextField(blank=True, verbose_name='Location: comment', help_text='An optional comment on the location and loss at the location', )

    location_q = models.CharField(max_length=10, default=0)
    guid = models.CharField(max_length=36, blank=True, verbose_name='Globally unique ID', help_text='For future use', default='00000000-0000-0000-0000-000000000000')

    ownerid = models.IntegerField(null=False, default='1', verbose_name='Owner ID', help_text='ID of the creator/owner of the record', )
    lastupdatebyid = models.IntegerField(null=False, default='1', verbose_name='Last update by ID', help_text='ID of the last person to update this record', )
    lastupdate = models.DateTimeField(null=True, blank=True, help_text='Last record update date', )

    class Meta:
        db_table = u'econd\".\"location'

    def __unicode__(self):
        return self.name


class Inventoryclass(models.Model):
    id = models.AutoField(primary_key=True, null=False, help_text='Primary Key: Internal database id', unique=True, blank=True, )
    name = models.CharField(max_length=255, null=False, default='Inventory class name', verbose_name='Inventory class name', help_text='Inventory class name from original survey', blank=True, )
    parentid = models.IntegerField(null=False, default='0', verbose_name='Parent study', help_text='The study which owns this inventory class. Set on creation, this must not be changed.', max_length=255, blank=True, )
    parenttype = models.CharField(max_length=25, null=True, blank=True, verbose_name='Parent study type', help_text='The type of study which owns this inventory class. Set on creation, this must not be changed.', )
    mat_type_l = models.ForeignKey(Lookupmaterialtype, db_column='mat_type_l', max_length=25, null=False, default='0', verbose_name='Material type', help_text='Material type: GEM Building Taxonomy Table 2 Level 1 attribute', related_name='+', blank=True, )
    mat_tech_l = models.ForeignKey(Lookupmaterialtechnology, db_column='mat_tech_l', max_length=25, null=False, default='0', verbose_name='Material technology', help_text='Material technology: GEM Building Taxonomy Table 2 Level 2 attribute', related_name='+', blank=True, )
    mas_mort_l = models.ForeignKey(Lookupmasonrymortartype, db_column='mas_mort_l', max_length=25, null=False, default='0', verbose_name='Masonry mortar type', help_text='Masonry mortar type: GEM Building Taxonomy Table 2 Level 3 attribute', related_name='+', blank=True, )
    mas_rein_l = models.ForeignKey(Lookupmasonryreinforcement, db_column='mas_rein_l', max_length=25, null=False, default='0', verbose_name='Masonry reinforcement', help_text='Masonry reinforcement: GEM Building Taxonomy Table 2 Level 3 attribute', related_name='+', blank=True, )
    steel_conn_l = models.ForeignKey(Lookupsteelconnectiontype, db_column='steel_conn_l', max_length=25, null=False, default='0', verbose_name='Steel connection type', help_text='Steel connection: GEM Basic Building Taxonomy Table 2 Level 3 attribute', related_name='+', blank=True, )
    llrs_l = models.ForeignKey(Lookuploadresistingsystem, db_column='llrs_l', max_length=25, null=False, default='0', verbose_name='Type of lateral load-resisting system', help_text='Type of lateral load-resisting system: GEM Building Taxonomy Table 3 Level 1 attribute', related_name='+', blank=True, )
    llrs_duct_l = models.ForeignKey(Lookupductility, db_column='llrs_duct_l', max_length=25, null=False, default='0', verbose_name='System ductility', help_text='System ductility: GEM Building Taxonomy Table 3 Level 2 attribute', related_name='+', blank=True, )
    mat_type_t = models.ForeignKey(Lookupmaterialtype, db_column='mat_type_t', max_length=25, null=False, default='0', verbose_name='Material type (transverse)', help_text='Material type: GEM Building Taxonomy Table 2 Level 1 attribute', related_name='+', blank=True, )
    mat_tech_t = models.ForeignKey(Lookupmaterialtechnology, db_column='mat_tech_t', max_length=25, null=False, default='0', verbose_name='Material technology (transverse)', help_text='Material technology: GEM Building Taxonomy Table 2 Level 2 attribute', related_name='+', blank=True, )
    mas_mort_t = models.ForeignKey(Lookupmasonrymortartype, db_column='mas_mort_t', max_length=25, null=False, default='0', verbose_name='Masonry mortar type (transverse)', help_text='Masonry mortar type: GEM Building Taxonomy Table 2 Level 3 attribute', related_name='+', blank=True, )
    mas_rein_t = models.ForeignKey(Lookupmasonryreinforcement, db_column='mas_rein_t', max_length=25, null=False, default='0', verbose_name='Masonry reinforcement (transverse)', help_text='Masonry reinforcement: GEM Building Taxonomy Table 2 Level 3 attribute', related_name='+', blank=True, )
    steel_conn_t = models.ForeignKey(Lookupsteelconnectiontype, db_column='steel_conn_t', max_length=25, null=False, default='0', verbose_name='Steel connection type (transverse)', help_text='Steel connection: GEM Basic Building Taxonomy Table 2 Level 3 attribute', related_name='+', blank=True, )
    llrs_t = models.ForeignKey(Lookuploadresistingsystem, db_column='llrs_t', max_length=25, null=False, default='0', verbose_name='Type of lateral load-resisting system (transverse)', help_text='Type of lateral load-resisting system: GEM Building Taxonomy Table 3 Level 1 attribute', related_name='+', blank=True, )
    llrs_duct_t = models.ForeignKey(Lookupductility, db_column='llrs_duct_t', max_length=25, null=False, default='0', verbose_name='System ductility (transverse)', help_text='System ductility: GEM Building Taxonomy Table 3 Level 2 attribute', related_name='+', blank=True, )
    roofsysmat = models.ForeignKey(Lookuproofmaterial, db_column='roofsysmat', max_length=25, null=False, default='0', verbose_name='Roof system material', help_text='Roof material: GEM Building Taxonomy Table 12 Level 3 attribute', blank=True, )
    roofsystyp = models.ForeignKey(Lookuprooftype, db_column='roofsystyp', max_length=25, null=False, default='0', verbose_name='Roof system type', help_text='Roof type: GEM Building Taxonomy Table 12 Level 4 attribute', blank=True, )
    floor_mat = models.ForeignKey(Lookupfloormaterial, db_column='floor_mat', max_length=25, null=False, default='0', verbose_name='Floor material', help_text='Floor material: GEM Building Taxonomy Table 11 Level 1 attribute', blank=True, )
    floor_type = models.ForeignKey(Lookupfloortype, db_column='floor_type', max_length=25, null=False, default='0', verbose_name='Floor type', help_text='Floor type: GEM Building Taxonomy Table 11 Level 2 attribute', blank=True, )
    story_ag_q = models.ForeignKey(Lookupheight, db_column='story_ag_q', max_length=25, null=False, default='0', verbose_name='Height qualifier', help_text='Height: GEM Building Taxonomy Table 4', blank=True, )
    story_ag_1 = models.IntegerField(null=True, blank=True, verbose_name='Upper bound of height range', help_text='Upper bound of height range (storeys)', )
    story_ag_2 = models.IntegerField(null=True, blank=True, verbose_name='Lower bound of height range', help_text='Lower bound of height range (storeys)', )
    yr_built_q = models.ForeignKey(Lookupdateofconstruction, db_column='yr_built_q', max_length=20, null=True, default='0', verbose_name='Date of construction or retrofit qualifier', help_text='Date of construction or retrofit: GEM Building Taxonomy Table 5', blank=True, )
    yr_built_1 = models.IntegerField(null=True, blank=True, verbose_name='Upper bound of date of construction or retrofit range', help_text='Upper bound of date of construction or retrofit range (year)', )
    yr_built_2 = models.IntegerField(null=True, blank=True, verbose_name='Lower bound of date of construction or retrofit range', help_text='Lower bound of date of construction or retrofit range (year)', )
    irreg_q = models.ForeignKey(Lookupirregularityqualifier, db_column='irreg_q', max_length=20, null=True, default='0', verbose_name='Regular or irregular', help_text='Regular or irregular: GEM Building Taxonomy Table 9 Level 1 attribute', blank=True, )
    str_irreg = models.ForeignKey(Lookupirregularitytype, db_column='str_irreg', max_length=20, null=True, default='0', verbose_name='Structural irregularity type', help_text='Structural irregularity type: GEM Building Taxonomy Table 9 Level 3 attribute', blank=True, )
    str_hzir_p = models.ForeignKey(Lookuphorizontalirregularity, db_column='str_hzir_p', max_length=20, null=True, default='0', verbose_name='Horizontal irregularity description', help_text='Structural horizontal irregularity description: GEM Building Taxonomy Table 9 Level 2 attribute', blank=True, )
    str_veir_p = models.ForeignKey(Lookupverticalirregularity, db_column='str_veir_p', max_length=20, null=True, default='0', verbose_name='Vertical irregularity description', help_text='Structural vertical irregularity description: GEM Building Taxonomy Table 9 Level 2 attribute', blank=True, )
    occupcy = models.ForeignKey(Lookupoccupancy, db_column='occupcy', max_length=20, null=True, default='0', verbose_name='Occupancy', help_text='Occupancy: GEM Building Taxonomy Table 6 Level 1 attribute', blank=True, )
    occpcy_dt = models.ForeignKey(Lookupoccupancydetail, db_column='occpcy_dt', max_length=20, null=True, default='0', verbose_name='Occupancy detail', help_text='Occupancy detail: GEM Building Taxonomy Table 6 Level 2 attribute', blank=True, )
    designcode = models.CharField(max_length=300, null=True, blank=True, verbose_name='Design code', help_text='Applicable design code(s) from original survey. Either enter the name(s) or you can use the following abbreviations: HIGHC = Recent (High) Code; INTC = Interim code; LOWC - Early (low) code; PREC = None / pre-code; SVRLC = Several codes', )
    retrofit = models.CharField(max_length=255, null=True, blank=True, verbose_name='Retrofit', help_text='Type of retrofit from original survey', )
    description = models.CharField(max_length=255, null=True, blank=True, verbose_name='Inventory class description', help_text='Inventory class description from original survey', )
    inventoryclass_c = models.TextField(null=True, blank=True, verbose_name='Inventory class: comment', help_text='A comment on the inventory class', )
    levelorder = models.IntegerField(null=True, blank=True, default='0', verbose_name='Display order', help_text='Use this field when the inventory classes need to be in a particular order, eg when used in a survey matrix', )
    ownerid = models.IntegerField(null=True, default='1', verbose_name='Owner ID', help_text='ID of the creator/owner of the record', blank=True, )
    lastupdatebyid = models.IntegerField(null=True, default='1', verbose_name='Last update by ID', help_text='ID of the last person to update this record', blank=True, )
    lastupdate = models.DateTimeField(null=True, blank=True, help_text='Last record update date', )

    # Taxonomy attributes not supported in GEMECD 1.0
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

    class Meta:
        db_table = u'econd\".\"inventoryclass'
        ordering = ['levelorder']

    def __unicode__(self):
        return self.name

class Surveyvalue(models.Model):
    id = models.AutoField(primary_key=True, null=False, help_text='Primary Key: Internal database id', blank=True, )
    name = models.CharField(max_length=64, null=False, default='GUID', verbose_name='Name', help_text='Optional name for the survey value', blank=True, )
    parentid = models.ForeignKey(Location, db_column='parentid', related_name='+', null=False, default='0', verbose_name='For location', help_text='The location which owns this survey value record - normally no need to change this', max_length=64, blank=True, )
    parentdamagesurveymatrixid = models.IntegerField(null=False, default='0', verbose_name='Parent damage survey matrix id', help_text='If this survey value was created through a survey matrix this records its id', max_length=64, blank=True, )
    parentcasualtysurveymatrixid = models.IntegerField(null=False, default='0', verbose_name='Parent casualty survey matrix id', help_text='If this survey value was created through a survey matrix this records its id', max_length=64, blank=True, )
    metriccode = models.ForeignKey(Lookupmetric, db_column='metriccode', related_name='+', max_length=64, null=False, default='N', verbose_name='Metric', help_text='The metric of the value - number of buildings/assets, number of people, length m, height m, area sq m, volume cu m, cost $, ratio, damage per km', blank=True, )
    damagelevelid = models.ForeignKey(Damagelevel, db_column='damagelevelid', related_name='+', null=False, default='0', verbose_name='Damage level', help_text='Damage level in the chosen damage scale', max_length=64, blank=True, )
    casualtylevelid = models.ForeignKey(Casualtylevel, db_column='casualtylevelid', related_name='+', null=False, default='0', verbose_name='Casualty level', help_text='casualty level in the chosen casualty scale', max_length=64, blank=True, )
    inventoryclassid = models.ForeignKey(Inventoryclass, db_column='inventoryclassid', related_name='+', null=False, default='0', verbose_name='Inventory class', help_text='Inventory class', max_length=64, blank=True, )
    assetclasscode = models.ForeignKey(Lookupassetclass, db_column='assetclasscode', related_name='+', max_length=64, null=False, default='0', verbose_name='Asset class', help_text='Asset class', blank=True, )
    assettypecode = models.ForeignKey(Lookupassettype, db_column='assettypecode', related_name='+', max_length=64, null=False, default='0', verbose_name='Asset type', help_text='Asset type', blank=True, )
    assetsubtypecode = models.ForeignKey(Lookupassetsubtype, db_column='assetsubtypecode', related_name='+', max_length=64, null=False, default='0', verbose_name='Asset sub type', help_text='Asset sub type', blank=True, )
    assetconstructioncode = models.ForeignKey(Lookupassetconstruction, db_column='assetconstructioncode', related_name='+', max_length=64, null=False, default='0', verbose_name='Asset form of construction', help_text='Asset form of construction', blank=True, )
    typeofdamagecode = models.ForeignKey(Lookuptypeofdamage, db_column='typeofdamagecode', related_name='+', max_length=64, null=False, default='0', verbose_name='Type of damage', help_text='Type of damage', blank=True, )
    typeofdamagecode2 = models.ForeignKey(Lookuptypeofdamage, db_column='typeofdamagecode2', related_name='+', max_length=64, null=False, default='0', verbose_name='Type of damage - secondary', help_text='Type of damage - secondary', blank=True, )
    structuretypecode = models.CharField(max_length=10, null=False, default='0', verbose_name='Structure type code IMS 2014', help_text='Structure type code for future compatibility with IMS 2014', blank=True, )
    vulnerabilityclasscode = models.CharField(max_length=-1, null=False, default='0', verbose_name='Vulnerability class IMS 2014', help_text='Vulnerability class for future compatibility with IMS 2014', blank=True, )
    value = models.FloatField(verbose_name='Value', help_text='The survey value, a single number or percentage', null=True, blank=True, )
    value_q = models.ForeignKey(Lookupstatus, db_column='value_q', related_name='+', max_length=10, null=True, default='0', verbose_name='Value: status', help_text='The status of the data', blank=True, )
    ownerid = models.IntegerField(null=True, default='1', verbose_name='Owner ID', help_text='ID of the creator/owner of the record', blank=True, )
    lastupdatebyid = models.IntegerField(null=True, default='1', verbose_name='Last update by ID', help_text='ID of the last person to update this record', blank=True, )
    lastupdate = models.DateTimeField(null=True, blank=True, help_text='Last record update date', )

    class Meta:
        db_table = u'econd\".\"surveyvalue'

    def __unicode__(self):
        return self.name

class Uploadedfile(models.Model):
      id = models.AutoField(primary_key=True, null=False, help_text='Primary Key: Internal database id', blank=True, )
      name = models.CharField(max_length=255, null=True, blank=True, default='unknown', verbose_name='File title', help_text='An optional descriptive title for the file', )
      fileuri = models.CharField(max_length=255, null=True, blank=True, default='', verbose_name='File URI', help_text='The location of the file in the filesystem', )
      filetype = models.CharField(max_length=50, null=True, blank=True, default='', verbose_name='File type', help_text='Type of the file', )
      status = models.CharField(max_length=255, null=True, blank=True, verbose_name='Status', help_text='The status of the file. Any error message about the file will be placed here', )
      filesize = models.IntegerField(null=True, blank=True, default='0', verbose_name='Size', help_text='Size of the file', )
      ownerid = models.IntegerField(null=True, default='1', verbose_name='Owner ID', help_text='ID of the creator/owner of the record', blank=True, )
      lastupdatebyid = models.IntegerField(null=True, default='1', verbose_name='Last update by ID', help_text='ID of the last person to update this record', blank=True, )
      lastupdate = models.DateTimeField(null=True, blank=True, help_text='Last record update date', )

      class Meta:
            db_table = u'econd\".\"uploadedfile'

      def __unicode__(self):
            return self.name

