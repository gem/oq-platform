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


CHMAX = 200


class Indicator(models.Model):
    code = models.CharField(max_length=CHMAX, unique=True)
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
    def keywords_str(self):
        return ', '.join([keyword.name for keyword in self.keywords.all()])

    @property
    def data_completeness(self):
        # NOTE: It is counted with respect to the total of countries for which
        # socioeconomic data have been collected, i.e., a custom region
        # containing countries which population is above 200k people
        countries_with_socioeconomic_data = CustomRegion.objects.get(
            name='Countries with socioeconomic data')
        return self.data_completeness_for_region(
            countries_with_socioeconomic_data)

    def data_completeness_for_region(self, region):
        # count how many countries are in the specified custom region
        num_countries_in_region = region.countries.count()
        # count how many of these countries have a value for the indicator
        num_countries_in_region_with_value = 0
        for country in region.countries.all():
            if CountryIndicator.objects.filter(
                    country=country, indicator=self):
                num_countries_in_region_with_value += 1
        # divide the latter by the former
        return (
            1.0 * num_countries_in_region_with_value / num_countries_in_region)


# For the svir application, we want to provide the possibility to have
# user-defined zones in a many-to-many relationship with countries, in order to
# be able to select countries by different kinds of zones (e.g. a group of
# countries that share the same currency, regardless from their geographical
# location)
class CustomRegion(models.Model):
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, unique=True)
    countries = models.ManyToManyField('world.Country')

    def __unicode__(self):
        return self.name


class Theme(models.Model):
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, unique=True)

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
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, unique=True)

    def __unicode__(self):
        return self.name


class InternalConsistencyMetric(models.Model):
    name = models.CharField(max_length=CHMAX, unique=True)

    def __unicode__(self):
        return self.name


class Keyword(models.Model):
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, unique=True)

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
        return '%s (%s - %s)' % (self.description,
                                 self.year_min,
                                 self.year_max)


class UpdatePeriodicity(models.Model):
    class Meta:
        ordering = ['name']
        verbose_name_plural = 'update periodicity'

    name = models.CharField(max_length=CHMAX, unique=True)

    def __unicode__(self):
        return self.name


class AggregationMethod(models.Model):
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, unique=True)

    def __unicode__(self):
        return self.name


class CountryIndicator(models.Model):
    country = models.ForeignKey('world.Country')
    indicator = models.ForeignKey('Indicator')
    value = models.FloatField()

    def __unicode__(self):
        return "%s: %s = %s [%s]" % (
            self.country.iso, self.indicator, self.value,
            self.indicator.measurement_type)

    class Meta:
        db_table = 'svir_country_indicators'
        unique_together = ('country', 'indicator')
