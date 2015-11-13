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


class StudyManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class Study(models.Model):
    name = models.CharField(max_length=CHMAX, unique=True)
    description = models.CharField(max_length=CHMAX)
    # author/s = models.CharField(max_length=CHMAX)
    wiki_link = models.URLField(null=True, blank=True)

    objects = StudyManager()

    @property
    def admin_levels(self):
        return set(
            zone.admin_level for zone in Zone.objects.filter(study=self))

    def natural_key(self):
        return self.name

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'studies'


class ZoneManager(models.Manager):
    def get_by_natural_key(self, name, country_iso, parent_label):
        return self.get(name=name,
                        country_iso=country_iso,
                        parent_label=parent_label)


class Zone(models.Model):
    name = models.CharField(max_length=CHMAX)
    sanitized_name = models.CharField(max_length=CHMAX, null=True, blank=True)
    # for countries, code is None and country_iso becomes the identifier
    # NOTE: code is not the key or part of a composite key
    code = models.CharField(max_length=CHMAX, null=True, blank=True)
    country_iso = models.CharField(max_length=3)
    admin_level = models.IntegerField()
    parent_label = models.CharField(max_length=CHMAX, null=True, blank=True)
    sanitized_parent_label = models.CharField(
        max_length=CHMAX, null=True, blank=True)
    variant_names = models.CharField(max_length=CHMAX, null=True, blank=True)
    study = models.ForeignKey('Study', null=True, blank=True)
    the_geom = models.MultiPolygonField()
    # manytomany relationship with CustomRegion defined at the other side

    objects = ZoneManager()

    def natural_key(self):
        return (self.name, self.country_iso, self.parent_label)

    def __unicode__(self):
        return "%s (%s, %s)" % (self.name, self.country_iso, self.parent_label)

    class Meta:
        unique_together = ('name', 'country_iso', 'parent_label')
        ordering = ['name', 'country_iso', 'parent_label']


class IndicatorManager(models.Manager):
    def get_by_natural_key(self, code):
        return self.get(code=code)


class Indicator(models.Model):
    code = models.CharField(max_length=CHMAX, unique=True)
    # NOTE: Some field names were changed with respect to those written in the
    #       spreadsheet containing the socioeconomic data. The original names
    #       are added here as comments
    # ~"Variable Name"
    name = models.TextField()
    # ~"Variable Description"
    description = models.TextField()
    subtheme = models.ForeignKey('Subtheme')
    notes = models.TextField(null=True, blank=True)
    keywords = models.ManyToManyField('Keyword', null=True, blank=True)
    zones = models.ManyToManyField('Zone', through='ZoneIndicator')

    objects = IndicatorManager()

    def __unicode__(self):
        return self.name

    @property
    def theme(self):
        return self.subtheme.theme

    @property
    def keywords_str(self):
        return ', '.join([keyword.name for keyword in self.keywords.all()])

    def natural_key(self):
        return self.code

    # FIXME
    # @property
    # def data_completeness(self):
    #     # NOTE: It is counted with respect to the total of countries for
    #     # which socioeconomic data have been collected, i.e., a custom region
    #     # containing countries which population is above 200k people
    #     countries_with_socioeconomic_data = CustomRegion.objects.get(
    #         name='Countries with socioeconomic data')
    #     return self.data_completeness_for_region(
    #         countries_with_socioeconomic_data)

    # def data_completeness_for_region(self, region):
    #     # count how many countries are in the specified custom region
    #     num_countries_in_region = region.zones.count()
    #     # count how many of these countries have a value for the indicator
    #     num_countries_in_region_with_value = 0
    #     for country in region.countries.all():
    #         if ZoneIndicator.objects.filter(
    #                 country=country, indicator=self):
    #             num_countries_in_region_with_value += 1
    #     # divide the latter by the former
    #     return (
    #         1.0 * num_countries_in_region_with_value /
    #         num_countries_in_region)


class KeywordManager(models.Manager):
    def get_by_natural_key(self, name):
            return self.get(name=name)


class Keyword(models.Model):
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, unique=True)

    objects = KeywordManager()

    def __unicode__(self):
        return self.name

    def natural_key(self):
        return self.name


class CustomRegionManager(models.Manager):
    def get_by_natural_key(self, name):
            return self.get(name=name)


# For the svir application, we want to provide the possibility to have
# user-defined zones in a many-to-many relationship with countries, in order to
# be able to select countries by different kinds of zones (e.g. a group of
# countries that share the same currency, regardless from their geographical
# location)
class CustomRegion(models.Model):
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, unique=True)
    zones = models.ManyToManyField('Zone')

    objects = CustomRegionManager()

    def __unicode__(self):
        return self.name

    def natural_key(self):
        return self.name


class ThemeManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class Theme(models.Model):
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, unique=True)

    objects = ThemeManager()

    def __unicode__(self):
        return self.name

    def natural_key(self):
        return self.name


class SubthemeManager(models.Manager):
    def get_by_natural_key(self, theme, name):
        return self.get(theme=theme, name=name)


class Subtheme(models.Model):
    theme = models.ForeignKey('Theme')
    name = models.CharField(max_length=CHMAX)

    objects = SubthemeManager()

    def natural_key(self):
        return (self.theme.name, self.name)

    class Meta:
        unique_together = ('theme', 'name')
        ordering = ['theme', 'name']

    def __unicode__(self):
        return '(%s) %s' % (self.theme.name, self.name)


class MeasurementTypeManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class MeasurementType(models.Model):
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, primary_key=True)

    objects = MeasurementTypeManager()

    def __unicode__(self):
        return self.name

    def natural_key(self):
        return self.name


class InternalConsistencyMetricManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class InternalConsistencyMetric(models.Model):
    name = models.CharField(max_length=CHMAX, primary_key=True)

    objects = InternalConsistencyMetricManager()

    def __unicode__(self):
        return self.name

    def natural_key(self):
        return self.name


class SourceManager(models.Manager):
    def get_by_natural_key(self, description):
        return self.get(description=description)


class Source(models.Model):
    description = models.TextField()
    year_min = models.IntegerField()
    year_max = models.IntegerField()
    update_periodicity = models.ForeignKey('UpdatePeriodicity')

    objects = SourceManager()

    @property
    def year_range(self):
        return self.year_max - self.year_min

    def __unicode__(self):
        return '%s (%s - %s)' % (self.description,
                                 self.year_min,
                                 self.year_max)

    def natural_key(self):
        return (self.description, self.year_min, self.year_max)

    class Meta:
        unique_together = ('description', 'year_min', 'year_max')


class UpdatePeriodicityManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class UpdatePeriodicity(models.Model):
    class Meta:
        ordering = ['name']
        verbose_name_plural = 'update periodicity'

    name = models.CharField(max_length=CHMAX, unique=True)

    objects = UpdatePeriodicityManager()

    def __unicode__(self):
        return self.name

    def natural_key(self):
        return self.name


class AggregationMethodManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class AggregationMethod(models.Model):
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=CHMAX, unique=True)

    objects = AggregationMethodManager()

    def __unicode__(self):
        return self.name

    def natural_key(self):
        return self.name


class ZoneIndicatorManager(models.Manager):
    def get_by_natural_key(self, zone, indicator):
        return self.get(zone=zone, indicator=indicator)


class ZoneIndicator(models.Model):
    zone = models.ForeignKey('Zone')
    indicator = models.ForeignKey('Indicator')
    value = models.FloatField()
    source = models.ForeignKey('Source')
    # ~"Unit of Measurement"
    measurement_type = models.ForeignKey('MeasurementType')
    aggregation_method = models.ForeignKey('AggregationMethod')
    internal_consistency_metric = models.ForeignKey(
        'InternalConsistencyMetric', null=True, blank=True)

    objects = ZoneIndicatorManager()

    def natural_key(self):
        return (self.zone, self.indicator)

    def __unicode__(self):
        return "%s: %s = %s [%s]" % (
            self.zone.name, self.indicator, self.value,
            self.measurement_type)

    class Meta:
        # NOTE: I am not sure, but it looks like changing the automatic name
        #       assigned to the table, it might create problems when building
        #       the "updatures"
        # db_table = 'svir_zone_indicators'
        unique_together = ('zone', 'indicator')
