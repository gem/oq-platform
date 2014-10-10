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
from django.contrib.auth.models import User
from fields import DictField
from openquakeplatform.world.models import Country


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


class UserData(models.Model):
    # '%(class)s' is replaced by the lower-cased name of the child class
    # that the field is used in.
    # '%(app_label)s' is replaced by the lower-cased name of the app the
    # child class is contained within.
    # Each installed application name must be unique and the model class
    # names within each app must also be unique, therefore the resulting
    # name will end up being different.
    created_by = models.ForeignKey(
        User, editable=False,
        related_name="%(app_label)s_%(class)s_created_by")
    # auto_now_add=True ==> Automatically set the field to now
    #                       when the object is first created
    created_on = models.DateTimeField(auto_now_add=True, editable=False)
    updated_by = models.ForeignKey(
        User, editable=False, null=True, blank=True,
        related_name="%(app_label)s_%(class)s_updated_by")
    # auto_now=True ==> Automatically set the field to now
    #                   every time the object is saved
    updated_on = models.DateTimeField(
        auto_now=True, editable=False, null=True, blank=True)

    class Meta:
        abstract = True


class Project(UserData):
    name = models.CharField(max_length=CHMAX, unique=True)
    description = models.TextField()
    # FIXME: If we are uploading data through the geonode web interface, we
    # don-t need to store the layer here (but perhaps we should have some kind
    # of link to the geonode layer?)
    # data = DictField(blank=True, null=True)

    # The project definition json, containing indicators, weights and operators
    metadata = DictField(blank=True, null=True)

    def __unicode__(self):
        return self.name


# FIXME: Check about this. We are commenting this out, because we decided to
# upload layers through geonode and add comments directly to layers
# class Comment(UserData):
#     project = models.ForeignKey('Project')
#     parent_comment = models.ForeignKey('Comment', blank=True, null=True)
#     body = models.TextField()

#     def __unicode__(self):
#         return self.body


class Indicator(models.Model):
    code = models.CharField(max_length=CHMAX)
    theme = models.ForeignKey('Theme')
    subtheme = models.ForeignKey('Subtheme')
    # ~"Variable Name"
    name = models.TextField()
    # ~"Unit of Measurement"
    measurement_type = models.ForeignKey('MeasurementType')
    # ~"Variable Description"
    description = models.TextField()
    source = models.ForeignKey('Source')
    keywords = models.ManyToManyField('Keyword', null=True, blank=True)
    aggregation_method = models.ForeignKey('AggregationMethod')
    internal_consistency_metric = models.ForeignKey(
        'InternalConsistencyMetric')
    countries = models.ManyToManyField(
        'world.Country', through='CountryIndicator',
        null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    def __unicode__(self):
        return self.name

    @property
    def data_completeness(self):
        # count how many countries have a value for this indicator
        # and divide by the number of countries
        tot_countries_with_indicator_data = len(self.countries)
        tot_countries = Country.objects.all().count()
        return tot_countries_with_indicator_data / tot_countries

    @property
    def data_completeness_for_region(self, region):
        # count how many countries are in the specified custom region
        # count how many of these countries have a value for the indicator
        # divide the latter by the former
        # countries_in_region = Country.objects.filter(FIXME).count()
        # countries_in_region_with_indicator_data
        pass


# For the svir application, we want to provide the possibility to have
# user-defined zones in a many-to-many relationship with countries, in order to
# be able to select countries by different kinds of zones (e.g. a group of
# countries that share the same currency, regardless from their geographical
# location)
class CustomRegion(models.Model):
    name = models.CharField(max_length=CHMAX)
    countries = models.ManyToManyField('world.Country')

    def __unicode__(self):
        return self.name


class Theme(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class Subtheme(models.Model):
    theme = models.ForeignKey('Theme')
    name = models.CharField(max_length=CHMAX)

    class Meta:
        unique_together = ('theme', 'name')
        ordering = ['theme', 'name']

    def __unicode__(self):
        return '(%s) %s' % (self.theme.name, self.name)


class MeasurementType(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class InternalConsistencyMetric(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class Keyword(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class Source(models.Model):
    description = models.TextField()
    year_min = models.IntegerField()
    year_max = models.IntegerField()
    update_periodicity = models.ForeignKey('UpdatePeriodicity')

    @property
    def year_range(self):
        return self.year_max - self.year_min

    def __unicode__(self):
        return '%s (%s - %s)' % (self.description, self.year_min, self.year_max)


class UpdatePeriodicity(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'update periodicity'


class AggregationMethod(models.Model):

    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class CountryIndicator(models.Model):
    country = models.ForeignKey('world.Country')
    indicator = models.ForeignKey('Indicator')
    value = models.FloatField()

    def __unicode__(self):
        return "%s: %s = %s [%s]" % (
            self.country.iso3, self.indicator, self.value,
            self.indicator.measurement_type)

    class Meta:
        db_table = 'svir_country_indicators'
        unique_together = ('country', 'indicator')
