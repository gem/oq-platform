from django.contrib.gis.db import models

# WARNING: this model is unmanaged, custom SQL is used to create the table (look inside sql/*.sql)

# En    Source    Year      Mo        Da        Ho        Mi        Se        Area      Lat       Lon       LatUnc    LonUnc    EpDet     Dep       Io        Msource   M         MUnc      MType     MDet      MDPSource         MDPn      MDPIx     MDPsc     Remarks GEHid
# en(y) src(y)    yea(y)    mon(n)    day(n)    hou(n)    min(n)    sec(n)    are(n)    lat(y)    lon(y)    latunc(n) lonunc(n) epdet(n)  dep(n)    io(n)     msrc(y)   m(y)      munc(n)   mtyp(n)   mdet(n)   mdpsrc(n)         mdpn(n)   mdpix(n)  mdpsc(n)  rem(n)  gid(y)


class Measure(models.Model):
    id = models.IntegerField(primary_key=True, null=False, blank=False)
    the_geom = models.PointField(srid=4326)
    en = models.CharField(max_length=255, null=False, blank=False)
    src = models.CharField(max_length=255, null=False, blank=False)
    yea = models.IntegerField(null=False, blank=False)
    mon = models.IntegerField(default=None, null=True, blank=True)
    day = models.IntegerField(default=None, null=True, blank=True)
    hou = models.IntegerField(default=None, null=True, blank=True)
    min = models.IntegerField(default=None, null=True, blank=True)
    sec = models.FloatField(default=None, null=True, blank=True)
    are = models.CharField(max_length=255, default='', null=True, blank=True)
    lat = models.FloatField(null=False, blank=False)  #10
    lon = models.FloatField(null=False, blank=False)
    latunc = models.FloatField(default=None, null=True, blank=True)
    lonunc = models.FloatField(default=None, null=True, blank=True)
    epdet = models.CharField(max_length=5, choices=(('bx', 'determined according to the method by Gasperini et al. (1999; 2010'), ('bw', 'determined according to the method by Bakun and Wenthworth (1997)'), ('cat', 'derived from another catalogue'), ('instr', 'instrumental')), default = '', null=True, blank=True)
    dep = models.FloatField(default=None, null=True, blank=True)
    io = models.CharField(max_length=255, default = '', null=True, blank=True)
    msrc = models.CharField(max_length=255, null=False, blank=False)
    m = models.FloatField(null=False, blank=False)
    munc = models.FloatField(default=None, null=True, blank=True)
    mtyp = models.CharField(max_length=5, choices=(('w', 'Mw'), ('s', 'Ms'), ('jma', 'Mjma')), default = '', null=True, blank=True)  # 20
    mdet = models.CharField(max_length=5, choices=(('bx', 'determined according to the method by Gasperini et al. (1999; 2010)'), ('bw', 'determined according to the method by Bakun and Wenthworth (1997)'), ('int', 'converted from epicentral or maximum intensity'), ('cat', 'derived from another catalogue'), ('instr', 'instrumental')), default = '', null=True, blank=True)
    mdpsrc = models.CharField(max_length=255, default='', null=True, blank=True)
    mdpn = models.IntegerField(default=None, null=True, blank=True)
    mdpix = models.CharField(max_length=255, default='', null=True, blank=True)
    mdpsc = models.CharField(max_length=5, choices=(('MM', 'modified Mercalli'), ('MSK', 'Medvedev-Sponheuer-Karnik'), ('EMS', 'European Macroseimic Scale'), ('MCS', 'Mercalli-Cancani-Sieberg'), ('JMA', 'Japan Meteorological Agency')), default='', null=True, blank=True)
    rem = models.CharField(max_length=1024, default='', null=True, blank=True)

    class Meta:
        managed = False

    def __unicode__(self):
        return "%s %s %s" % (self.en, self.lat, self.lon)
