# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2014, GEM Foundation.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

from django.contrib.gis.db import models
from fields import DictField

CHMAX = 200

# In the vulnerability-db application, regions are not stored in the DB and
# they are read from a tuple to group countries in order to simplify the
# process of country selection.
# REGIONS = (
#     (1, 'Australia/New Zealand'),
#     (2, 'Caribbean'),
#     (3, 'Central America'),
#     (4, 'Central Asia'),
#     (5, 'Eastern Africa'),
#     (6, 'Eastern Asia'),
#     (7, 'Eastern Europe'),
#     (8, 'Melanesia'),
#     (9, 'Micronesia'),
#     (10, 'Middle Africa'),
#     (11, 'Northern Africa'),
#     (12, 'Northern America'),
#     (13, 'Northern Europe'),
#     (14, 'Polynesia'),
#     (15, 'South America'),
#     (16, 'South-Eastern Asia'),
#     (17, 'Southern Europe'),
#     (18, 'Western Africa'),
#     (19, 'Western Asia'),
#     (20, 'Western Europe'),
# )


# For the svir application, we want to provide the possibility to have
# user-defined zones in a many-to-many relationship with countries, in order to
# be able to select countries by different kinds of zones (e.g. a group of
# countries that share the same currency, regardless from their geographical
# location)
class Zone(models.Model):
    name = models.CharField(max_length=CHMAX)
    countries = models.ManyToManyField(
        'vulnerability.Country', blank=True, null=True)

    def __unicode__(self):
        return self.name


class Theme(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class Subtheme(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


# TODO Check if this name sounds fine
class MeasurementType(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


# TODO Check if we can rename this into something PCA-related
class StatisticalTag(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class Keyword(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class Source(models.Model):
    name = models.CharField(max_length=CHMAX)
    year_min = models.IntegerField()
    year_max = models.IntegerField()

    @property
    def year_range(self):
        return self.year_max - self.year_min

    def __unicode__(self):
        return self.name


class Periodicity(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'periodicities'


class AggregationMethod(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class CountryIndicator(models.Model):
    country = models.ForeignKey('vulnerability.Country')
    indicator = models.ForeignKey('Indicator')
    value = models.FloatField()

    def __unicode__(self):
        return "%s: %s = %s [%s]" % (
            self.country, self.indicator, self.value,
            self.indicator.measurement_type)

    class Meta:
        db_table = 'svir_country_indicators'
        unique_together = ('country', 'indicator')


class Indicator(models.Model):
    code = models.CharField(max_length=CHMAX)
    name = models.CharField(max_length=CHMAX)
    measurement_type = models.ForeignKey('MeasurementType')
    theme = models.ForeignKey('Theme')
    subtheme = models.ForeignKey('Subtheme')
    statistical_tag = models.ForeignKey('StatisticalTag')
    keywords = models.ManyToManyField('Keyword', null=True, blank=True)
    definition = models.CharField(max_length=CHMAX)
    source = models.ForeignKey('Source')
    periodicity = models.ForeignKey('Periodicity')
    aggregation_method = models.ForeignKey('AggregationMethod')
    additional_notes = models.TextField(null=True, blank=True)
    countries = models.ManyToManyField(
        'vulnerability.Country', through='CountryIndicator',
        null=True, blank=True)

    def __unicode__(self):
        return self.name

    @property
    def min_value(self):
        # TODO: Check if we want this considering the whole set of countries,
        # or a subset (e.g. a zone)
        pass

    @property
    def max_value(self):
        # TODO: Check if we want this considering the whole set of countries,
        # or a subset (e.g. a zone)
        pass

    @property
    def mean_value(self):
        # TODO: Check if we want this considering the whole set of countries,
        # or a subset (e.g. a zone)
        pass

    @property
    def data_completeness(self):
        # TODO: Check if we want this considering the whole set of countries,
        # or a subset (e.g. a zone)
        pass


class Project(models.Model):
    name = models.CharField(max_length=CHMAX)
    description = models.TextField()
    data = DictField(blank=True, null=True)
    metadata = DictField(blank=True, null=True)

    def __unicode__(self):
        return self.name


class Comment(models.Model):
    project = models.ForeignKey('Project')
    parent_comment = models.ForeignKey('Comment', blank=True, null=True)
    user = models.ForeignKey('auth.User')  # FIXME Check if the reference is ok
    # auto_now_add=True ==> Automatically set the field to now when
    #                       the object is first created
    # (auto_now would set the field to now every time the object is saved)
    created = models.DateTimeField(auto_now_add=True)
    body = models.TextField()

    def __unicode__(self):
        return self.body
