from django.contrib.gis.db import models

class grump_pop_ur2(models.Model):
    lat = models.FloatField(null=False, blank=False)
    lon = models.FloatField(null=False, blank=False)
    pop_value = models.FloatField(null=False, blank=False)
    is_urban = models.BooleanField()
    the_geom = models.PointField(srid=4326, dim=2)

class agg_build.infra_src(models.Model):
    shape_perimeter = models.IntegerField()
    shape_area = models.IntegerField()
    data = models.DateField()
    notes = models.CharField()
    mapping_scheme_src_id = models.IntegerField()
    study_region_id = models.IntegerField()
    gadm_country_id = models.IntegerField()
    gadm_admin_1_id = models.IntegerField()
    gadm_admin_2_id = models.IntegerField()
    the_geom = models.PointField(srid=4326, dim=2)

class mapping_scheme_src(models.Model):
    source = models.CharField()
    date_created = models.DateField()
    data_source = models.CharField()
    data_source_date = models.DateField()
    use_notes = models.CharField()
    quality = models.CharField()
    oq_user_id = models.IntegerField()
    taxonomy = models.CharField()
    is_urban = models.BooleanField()
    occupancy = models.CharField()
    id_bk = models.IntegerField()

class gadm_country(models.Model):
    name = models.CharField()
    alias = models.CharField()
    iso = models.CharField()
    shape_perimeter = models.IntegerField()
    shape_area = models.IntegerField()
    date =  models.DateField()
    the_geom = models.PointField(srid=4326, dim=2)
    simple_geom = models.PointField(srid=4326, dim=2)
    gadm_id_0 = models.IntegerField()

class mapping_scheme(models.Model):
    mapping_scheme_src_id = models.IntegerField()
    ms_name = models.CharField()
    ms_value = models.FloatField(null=False, blank=False)
