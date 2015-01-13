from django.contrib.gis.db import models

# WARNING: this model is unmanaged, custom SQL is used to create the table (look inside sql/*.sql)

# date, lat, lon, smajax, sminax, strike, depth, unc , mw, unc , s, mo, fac, auth ,  mpp  ,  mpr  ,  mrr  ,  mrt  ,  mtp  ,  mtt


class Measure(models.Model):
    src_id = models.IntegerField(null=False, blank=False, default=-1)
    date = models.DateTimeField(null=False, blank=False)
    lat = models.FloatField(null=False, blank=False)
    lon = models.FloatField(null=False, blank=False)
    the_geom = models.PointField(srid=4326, dim=2)
    smajax = models.FloatField(null=True, blank=True)
    sminax = models.FloatField(null=True, blank=True)
    strike = models.FloatField(null=True, blank=True)
    epic_q = models.CharField(max_length=1, choices=(('A', 'Highest quality'), ('B', 'Medium quality'), ('C', 'Lowest quality')), default = '', null=False, blank=True)
    depth = models.FloatField(null=True, blank=True)
    depth_unc = models.FloatField(null=True, blank=True)
    depth_q = models.CharField(max_length=1, choices=(('A', 'Highest quality'), ('B', 'Medium quality'), ('C', 'Lowest quality')), default = '', null=False, blank=True)
    mw = models.FloatField(null=True, blank=True)
    mw_unc = models.FloatField(null=True, blank=True)
    mw_q = models.CharField(max_length=1, choices=(('A', 'Highest quality'), ('B', 'Medium quality'), ('C', 'Lowest quality')), default = '', null=False, blank=True)
    s = models.CharField(max_length=1, choices=(('p', 'Mw proxy'), ('d', 'direct Mw computation')), default='', null=False, blank=True)
    mo = models.FloatField(null=True, blank=True)
    fac = models.FloatField(null=True, blank=True)
    mo_auth = models.CharField(max_length=255, default='', null=False, blank=True)
    mpp = models.FloatField(null=True, blank=True)
    mpr = models.FloatField(null=True, blank=True)
    mrr = models.FloatField(null=True, blank=True)
    mrt = models.FloatField(null=True, blank=True)
    mtp = models.FloatField(null=True, blank=True)
    mtt = models.FloatField(null=True, blank=True)
    eventid = models.IntegerField(null=False, default=-1)

    class Meta:
        managed = False

    def __unicode__(self):
        return "%s %s %s" % (self.date, self.lat, self.lon)
