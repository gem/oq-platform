# Copyright (c) 2014, GEM Foundation.
#
# This program is free software: you can redistribute it and/or modify
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
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


class AggregationMethod(models.Model):
    name = models.CharField(max_length=CHMAX)

    def __unicode__(self):
        return self.name


class CountryIndicator(models.Model):
    country = models.ForeignKey('vulnerability.Country')
    indicator = models.ForeignKey('Indicator')
    value = models.FloatField()

    class Meta:
        unique_together = ('country', 'indicator')


class Indicator(models.Model):
    code = models.CharField(max_length=CHMAX)
    old_code = models.CharField(max_length=CHMAX, null=True, blank=True)
    name = models.CharField(max_length=CHMAX)
    measurement_type = models.ForeignKey('MeasurementType')
    theme = models.ForeignKey('Theme')
    subtheme = models.ForeignKey('Subtheme')
    statistical_tag = models.ForeignKey('StatisticalTag')
    keyword = models.ManyToManyField('Keyword', null=True, blank=True)
    definition = models.CharField(max_length=CHMAX)
    source = models.ForeignKey('Source')
    periodicity = models.ForeignKey('Periodicity')
    aggregation_method = models.ForeignKey('AggregationMethod')
    additional_comments = models.CharField(
        max_length=1024, null=True, blank=True)
    countries = models.ManyToManyField(
        'vulnerability.Country', through='CountryIndicator',
        null=True, blank=True)

    @property
    def min_value(self):
        pass

    @property
    def max_value(self):
        pass

    @property
    def mean_value(self):
        pass

    @property
    def data_completeness(self):
        pass
