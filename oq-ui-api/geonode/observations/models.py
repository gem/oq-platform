# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2010-2012, GEM Foundation.
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.

from django.contrib.gis.db import models


DEFAULT_FIELD_ATTRIBUTES = {'null': True, 'blank': True}

SLIP_TYPE_CHOICES = ( 
    ('Reverse', 'Reverse'),
    ('Thrust (dip <45 deg)', 'Thrust (dip <45 deg)'),
    ('Normal', 'Normal'),
    ('Dextral', 'Dextral'),
    ('Sinistral', 'Sinistral'),
    ('Normal Dextral', 'Normal Dextral'),
    ('Dextral Normal', 'Dextral Normal'),
    ('Sinistral Normal', 'Sinistral Normal'),
    ('Normal Sinistral', 'Normal Sinisrtal'),
    ('Dextral Reverse', 'Dextral Reverse'),
    ('Sinistral Reverse', 'Sinistral Reverse'),)

RECURRENCE_INTERVAL_CATEGORY_CHOICES = (
    ('10 - <100', '10 - <100'),
    ('100 - <1,000', '100 - <1,000'),
    ('1,000 - <2,000', '1,000 - <2,000'),
    ('2,000 - <5,000', '2,000 - <5,000'),
    ('5,000 - <10,000', '5,000 - <10,000'),
    ('10,000 - <100,000', '10,000 - <100,000'),
    ('100,000 - <500,000', '100,000 - <500,000'),
    ('500,000 - <1,000,000', '500,000 - <1,000,000'),
    ('1,000,000 - <10,000,000', '1,000,000 - <10,000,000'), )

AGE_OF_LAST_MOVEMENT_CATEGORY_CHOICES = (
    ('0 - <1,000', '0 - <1,000'),
    ('1,000 - <11,700 (Holocene)', '1,000 - <11,700 (Holocene)'),
    ('11,700 - <50,000', '11,700 - <50,000'),
    ('100,000 - <1,000,000', '100,000 - <1,000,000'),
    ('1,000,000 - <10,000,000', '1,000,000 - <10,000,000'))


class WithLength(models.Model):
    length_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    length_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    length_pre = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True


class WithSeismogenicDepth(models.Model):
    # Upper seismogenic depth
    u_sm_d_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    u_sm_d_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    u_sm_d_pre = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    u_sm_d_com = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    # Lower seismogenic depth
    low_d_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    low_d_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    low_d_pref = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    low_d_com = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True

class WithWidth(models.Model):
    width_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    width_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    width_pref = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True

class WithArea(models.Model):
    area_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    area_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    area_pref = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True


class WithDip(models.Model):
    dip_min = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    dip_max = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    dip_pref = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    dip_com = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    dip_dir = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True

class WithSlip(models.Model):
    slip_type = models.CharField(max_length=30, default='', choices=SLIP_TYPE_CHOICES)
    slip_com = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    slip_r_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    slip_r_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    slip_r_pre = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    slip_r_com = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    aseis_slip = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    aseis_com = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True

class WithMagnitude(models.Model):
    mag_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    mag_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    mag_pref = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True

class WithSeismicMoment(models.Model):
    mom_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    mom_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    mom_pref = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True

class WithDisplacement(models.Model):
    # Displacement
    dis_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    dis_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    dis_pref = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True


class WithRecurrence(models.Model):
    # Recurrence Interval
    re_int_min = models.IntegerField(verbose_name="Recurrence interval min (yr)", **DEFAULT_FIELD_ATTRIBUTES)
    re_int_max = models.IntegerField(verbose_name="Recurrence interval min (yr)", **DEFAULT_FIELD_ATTRIBUTES)
    re_int_pref = models.IntegerField(verbose_name="Recurrence interval min (yr)", **DEFAULT_FIELD_ATTRIBUTES)
    mov_min = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    mov_max = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    mov_pref = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    
    class Meta:
        abstract = True


class Observation(models.Model):
    compiler = models.CharField(max_length=30, default='', **DEFAULT_FIELD_ATTRIBUTES)
    contrib = models.CharField(max_length=30, default='', **DEFAULT_FIELD_ATTRIBUTES)
    created = models.DateField(**DEFAULT_FIELD_ATTRIBUTES)
    all_com = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)

    class Meta:
        abstract = True


class FaultSource(Observation, WithLength, WithSeismogenicDepth, WithWidth, WithArea, WithDip, WithSlip,
                  WithMagnitude, WithSeismicMoment, WithDisplacement, WithRecurrence):
    fault = models.ForeignKey('Fault')
    source_nm  = models.CharField(max_length=30)
    fault_name = models.CharField(max_length=30)

    geom = models.PolygonField(srid=4326, dim=3)


class Fault(Observation, WithLength, WithSeismogenicDepth, WithDip, WithSlip, WithDisplacement, WithRecurrence):
    fault_name = models.CharField(max_length=30, **DEFAULT_FIELD_ATTRIBUTES)
    strike = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    episodic_behaviour = models.CharField(max_length=30, **DEFAULT_FIELD_ATTRIBUTES)
    down_thro = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    simple_geom = models.MultiLineStringField(srid=4326, **DEFAULT_FIELD_ATTRIBUTES)

    def __unicode__(self):
        return "Fault %s %s" % (self.pk, self.fault_name)

class FaultSection(Observation, WithLength, WithSeismogenicDepth, WithDip, WithSlip, WithDisplacement,
                   WithRecurrence):
    fault = models.ManyToManyField('Fault')
    geom = models.MultiLineStringField(srid=4326, **DEFAULT_FIELD_ATTRIBUTES)
    sec_name = models.CharField(max_length=255, **DEFAULT_FIELD_ATTRIBUTES)
    strike = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    episodic_behaviour = models.CharField(max_length=30, **DEFAULT_FIELD_ATTRIBUTES)
    down_thro = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)


class LocatedObservation(models.Model):
    scale = models.BigIntegerField()
    accuracy = models.BigIntegerField()
    notes = models.TextField()

    class Meta:
        abstract = True

class Trace(LocatedObservation):
    fault_section = models.ManyToManyField('FaultSection')
    loc_meth = models.CharField(max_length=30)
    geom = models.MultiLineStringField(srid=4326)

class SiteObservation(LocatedObservation):
    geom = models.PointField(srid=4326)
    fault_section = models.ForeignKey('FaultSection', **DEFAULT_FIELD_ATTRIBUTES)
    s_feature = models.CharField(max_length=30)

    class Meta:
        abstract = True

class Event(SiteObservation, WithRecurrence):
    historical_earthquake = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    pre_historical_earthquake = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    marker_age = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    re_int_category = models.CharField(max_length=255,
                                       choices=RECURRENCE_INTERVAL_CATEGORY_CHOICES,
                                       blank=True,
                                       null=True)

    mov_category = models.CharField(max_length=255,
                                    verbose_name="Age of last movement category",
                                    choices=AGE_OF_LAST_MOVEMENT_CATEGORY_CHOICES,
                                    **DEFAULT_FIELD_ATTRIBUTES)

    
class FaultGeometry(SiteObservation):
    DOWNTHROWN_SIDE_CHOICES = (('N', 'N'),
                               ('S', 'S'),
                               ('W', 'W'),
                               ('E', 'E'),
                               ('NE', 'NE'),
                               ('NW', 'NW'),
                               ('SE', 'SE'),
                               ('SW', 'SW'))

    dip_dir = models.IntegerField(verbose_name="Dip Direction", **DEFAULT_FIELD_ATTRIBUTES)

    down_thro = models.CharField(max_length=255,
                                 verbose_name="Downthrown side",
                                 choices=DOWNTHROWN_SIDE_CHOICES,
                                 **DEFAULT_FIELD_ATTRIBUTES)

    strike = models.IntegerField(**DEFAULT_FIELD_ATTRIBUTES)
    surface_dip = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

class Displacement(SiteObservation, WithDisplacement):
    DISPLACEMENT_CATEGORY_CHOICES = (('0.1 - <0.5', '0.1 - <0.5'),
                                     ('0.5 - <1', '0.5 - <1'),
                                     ('1 - <5', '1 - <5'),
                                     ('5 - <10', '5 - <10'),
                                     ('10 - <30', '10 - <30'))

    dis_total = models.FloatField(verbose_name="Total displacement", **DEFAULT_FIELD_ATTRIBUTES)

    dis_category = models.CharField(max_length=255,
                                    verbose_name="Displacement Category",
                                    choices=DISPLACEMENT_CATEGORY_CHOICES,
                                    **DEFAULT_FIELD_ATTRIBUTES)

    horizontal_displacement = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    vertical_displacement = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    net_displacement = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

class SlipRate(SiteObservation):
    SLIP_RATE_CATEGORY_CHOICES = ( ('0.001 - <0.01', '0.001 - <0.01'),
                                   ('0.01 - <0.1', '0.01 - <0.1'),
                                   ('0.1 - <1', '0.1 - <1'),
                                   ('0.1 - <1', '0.1 - <1'),
                                   ('1 - <5', '1 - <5'),
                                   ('5 - <10', '5 - <10'),
                                   ('10 - <50', '10 - <50'),
                                   ('50 - <100', '50 - <100'),
                                   ('100 - <200', '100 - <200'))

    dip_slip_rate_min = models.FloatField(verbose_name="Dip Slip Rate Min", **DEFAULT_FIELD_ATTRIBUTES)
    dip_slip_rate_pref = models.FloatField(verbose_name="Dip Slip Rate Max", **DEFAULT_FIELD_ATTRIBUTES)
    dip_slip_rate_max = models.FloatField(verbose_name="Dip Slip Rate Pref", **DEFAULT_FIELD_ATTRIBUTES)

    strike_slip_rate_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    strike_slip_rate_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    strike_slip_rate_pref = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    vertical_slip_rate_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    vertical_slip_rate_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    vertical_slip_rate_pref = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    hv_ratio = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    net_slip_rate_min = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    net_slip_rate_max = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)
    net_slip_rate_pref = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    rake = models.FloatField(**DEFAULT_FIELD_ATTRIBUTES)

    slip_rate_category = models.CharField(max_length=255,
                                          choices=SLIP_RATE_CATEGORY_CHOICES,
                                          blank=True,
                                          null=True)

    slip_type = models.CharField(max_length=255,
                                 choices=SLIP_TYPE_CHOICES,
                                 blank=True,
                                 null=True)
