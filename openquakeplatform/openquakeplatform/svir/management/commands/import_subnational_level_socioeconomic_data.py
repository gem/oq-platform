# Copyright (c) 2014-2015, GEM Foundation.
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

import sys
import csv
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from openquakeplatform.svir.models import (AggregationMethod,
                                           Indicator,
                                           Keyword,
                                           MeasurementType,
                                           Source,
                                           Study,
                                           Subtheme,
                                           Theme,
                                           UpdatePeriodicity,
                                           Zone,
                                           ZoneIndicator,
                                           InternalConsistencyMetric,
                                           )

COUNTRIES_COUNT = 197
COUNTRIES_STARTING_IDX = 14
REGIONS_STARTING_IDX = (COUNTRIES_STARTING_IDX
                        + COUNTRIES_COUNT + 1)  # discarding data completeness


class Command(BaseCommand):
    args = ('<csv indicators_file> <csv values_file>'
            ' <country iso> <admin level>')
    help = 'Import csv files of subnational-level socioeconomic indicators'

    def handle(self, indicators_file, values_file, country_iso, admin_level,
               *args, **options):
        UNKNOWN_STR = 'Unknown'
        admin_level = int(admin_level)
        country = Zone.objects.get(country_iso=country_iso, admin_level=0)
        sys.stdout.write('Loading subnational socioeconomic data for %s...\n'
                         % country)
        # read a file containing information about indicators, measurement
        # types, aggregation methods, and sources
        with open(indicators_file, 'rb') as f:
            reader = csv.reader(f)
            # discard header containing column names
            reader.next()
            # for each indicator code, save in a dictionary those fields that
            # will not be directly linked to the indicator, but to the
            # ZoneIndicator
            additional_info = dict()
            sys.stdout.write('Loading details about indicators...\n')
            # read the actual information for each indicator
            for row in reader:
                code = row[8].strip().decode('utf8')
                if len(code) < 9:
                    sys.stdout.write(
                        'WARNING! Indicator code %s seems to be incomplete!\n'
                        % code)
                name = row[4].strip().decode('utf8')
                sys.stdout.write("Indicator: '%s'..." % code)
                description = row[9].strip().decode('utf8')
                theme_str = row[0].strip().decode('utf8')
                theme, _ = Theme.objects.get_or_create(
                    name__iexact=theme_str,
                    defaults={'name': theme_str})
                subtheme_str = row[2].strip().decode('utf8')
                subtheme, _ = Subtheme.objects.get_or_create(
                    theme=theme,
                    name__iexact=subtheme_str,
                    defaults={'theme': theme,
                              'name': subtheme_str})
                notes = row[15].strip().decode('utf8')
                keywords_set = set()
                for keyword_str in row[10].split(','):
                    keyword_str_clean = \
                        keyword_str.strip().decode('utf8').lower()
                    if keyword_str_clean:  # for cases like "population, "
                        keyword, _ = Keyword.objects.get_or_create(
                            name__iexact=keyword_str_clean,
                            defaults={'name': keyword_str_clean})
                        keyword.save()
                        keywords_set.add(keyword)
                try:
                    indicator = Indicator.objects.get(code=code)
                except ObjectDoesNotExist:
                    # create a new indicator
                    indicator = Indicator(code=code,
                                          name=name,
                                          description=description,
                                          subtheme=subtheme,
                                          notes=notes,
                                          )
                    indicator.save()
                    for keyword in keywords_set:
                        indicator.keywords.add(keyword)
                    indicator.save()
                    sys.stdout.write("OK (created as new)\n")
                else:  # if the indicator already existed
                    # check that the data for the indicator is consistent with
                    # what we already had
                    error_fmt = ("\tInconsistency in field '%s':\n"
                                 "\t\t(existing) %s\n"
                                 "\t\t(   new  ) %s\n")
                    inconsistencies = []
                    if indicator.name != name:
                        inconsistencies.append(
                            error_fmt % ('name',
                                         indicator.name,
                                         name))
                    if indicator.description != description:
                        inconsistencies.append(
                            error_fmt % ('description',
                                         indicator.description,
                                         description))
                    if indicator.subtheme != subtheme:
                        inconsistencies.append(
                            error_fmt % ('subtheme',
                                         indicator.subtheme,
                                         subtheme))
                    if indicator.theme != theme:
                        inconsistencies.append(
                            error_fmt % ('theme',
                                         indicator.theme,
                                         theme))
                    if indicator.notes != notes:
                        inconsistencies.append(
                            error_fmt % ('notes',
                                         indicator.notes,
                                         notes))
                    if inconsistencies:
                        sys.stdout.write("WARNING! Inconsistency found."
                                         " Re-using the existing version.\n")
                        for inconsistency in inconsistencies:
                            sys.stdout.write(inconsistency)
                    else:
                        sys.stdout.write('OK\n')
                    # merge the keywords
                    for keyword in keywords_set:
                        indicator.keywords.add(keyword)
                    indicator.save()
                # for each indicator code, save in a dictionary those fields
                # that will not be directly linked to the indicator, but to the
                # ZoneIndicator
                measurement_type_str = row[6].strip().decode('utf8')
                measurement_type, _ = MeasurementType.objects.get_or_create(
                    name__iexact=measurement_type_str,
                    defaults={'name': measurement_type_str})
                aggregation_method_str = row[7].strip().decode('utf8')
                if aggregation_method_str:
                    aggregation_method, _ = \
                        AggregationMethod.objects.get_or_create(
                            name__iexact=aggregation_method_str,
                            defaults={'name': aggregation_method_str})
                else:
                    aggregation_method, _ = \
                        AggregationMethod.objects.get_or_create(
                            name__iexact=UNKNOWN_STR,
                            defaults={'name': UNKNOWN_STR})
                source_description = row[11].strip().decode('utf8')
                source_year_min = row[12].strip().decode('utf8')
                source_year_max = row[13].strip().decode('utf8')
                source_update_periodicity_str = row[14].strip().decode('utf8')
                if source_update_periodicity_str:
                    source_update_periodicity, _ = \
                        UpdatePeriodicity.objects.get_or_create(
                            name__iexact=source_update_periodicity_str,
                            defaults={'name': source_update_periodicity_str})
                else:
                    source_update_periodicity, _ = \
                        UpdatePeriodicity.objects.get_or_create(
                            name__iexact=UNKNOWN_STR,
                            defaults={'name': UNKNOWN_STR})
                source, _ = Source.objects.get_or_create(
                    description__iexact=source_description,
                    year_min=source_year_min,
                    year_max=source_year_max,
                    defaults={
                        'description': source_description,
                        'year_min': source_year_min,
                        'year_max': source_year_max,
                        'update_periodicity': source_update_periodicity})
                additional_info[code] = dict(
                    measurement_type=measurement_type,
                    aggregation_method=aggregation_method,
                    source=source)

        # read a file containing in each row the values of all the indicators
        # for one single zone
        with open(values_file, 'rb') as f:
            name_south_america_study = 'South America Risk Assessment (SARA)'
            study, _ = Study.objects.get_or_create(
                name__iexact=name_south_america_study,
                defaults={'name': name_south_america_study,
                          'description': 'FIXME',
                          'wiki_link': 'FIXME'})
            reader = csv.reader(f)
            # the first row contains redundant information that we will not
            # store into the DB (e.g. the indicators' names)
            reader.next()  # row discarded
            # read row containing the indicators' codes
            second_row = reader.next()
            ind_codes = [code.decode('utf8')
                         for code in second_row[admin_level + 1:]]
            sys.stdout.write('Indicator codes: %s\n' % ', '.join(ind_codes))
            for row in reader:
                # read zone localization and values
                zone_name = row[admin_level - 1].strip().decode('utf8')
                zone_code = row[admin_level].strip()
                decoded_row = [x.decode('utf8') for x in row[:admin_level - 1]]
                zone_parent_label = ", ".join(decoded_row)
                # FIXME: load the actual geometry instead of copying the
                # geometry of San Marino for all the subnational zones
                san_marino = Zone.objects.get(country_iso='SMR')
                # FIXME: load also the variant names, if available
                zone, _ = Zone.objects.get_or_create(
                    name__iexact=zone_name,
                    code__iexact=zone_code,
                    country_iso__iexact=country_iso,
                    admin_level=admin_level,
                    parent_label__iexact=zone_parent_label,
                    defaults={
                        'name': zone_name,
                        'code': zone_code,
                        'country_iso': country_iso,
                        'admin_level': admin_level,
                        'parent_label': zone_parent_label,
                        'the_geom': san_marino.the_geom,
                        'study': study})
                sys.stdout.write(
                    'Importing data for zone %s...\n' % zone)
                column = admin_level + 1
                for value in row[admin_level + 1:]:
                    # NOTE: Ignoring all non-numeric values
                    ind_code = ind_codes[column]
                    if len(ind_code) < 9:
                        sys.stdout.write(
                            'Indicator code %s seems to be incomplete!\n'
                            % ind_code)
                        break
                    try:
                        indicator = Indicator.objects.get(code=ind_code)
                    except ObjectDoesNotExist:
                        sys.stdout.write(
                            'Indicator %s does not exist\n' % ind_code)
                        break
                    try:
                        value = float(value)
                    except ValueError:
                        sys.stdout.write(
                            'Ignoring value %s for indicator %s and zone %s\n'
                            % (value, indicator, zone))
                        break
                    measurement_type = additional_info[
                        ind_code]['measurement_type']
                    aggregation_method = additional_info[
                        ind_code]['aggregation_method']
                    source = additional_info[ind_code]['source']
                    # FIXME: get internal_consistency_metric from the csv
                    internal_consistency_metric, _ = \
                        InternalConsistencyMetric.objects.get_or_create(
                            name__iexact=UNKNOWN_STR,
                            defaults={'name': UNKNOWN_STR})
                    zone_indicator, _ = ZoneIndicator.objects.get_or_create(
                        zone=zone,
                        indicator=indicator,
                        defaults={
                            'zone': zone,
                            'indicator': indicator,
                            'value': value,
                            'measurement_type': measurement_type,
                            'aggregation_method': aggregation_method,
                            'internal_consistency_metric':
                            internal_consistency_metric,
                            'source': source})
                    zone_indicator.save()
                    column += 1
