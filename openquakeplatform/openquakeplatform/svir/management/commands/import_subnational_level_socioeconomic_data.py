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
import os
import unicodedata
from collections import namedtuple
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


class Command(BaseCommand):
    args = ('<csv indicators_filename> <csv values_filename>')
    help = ('Import csv files of subnational-level socioeconomic indicators.\n'
            'File naming convention: XXX_N_indicators.csv XXX_N_values.csv\n'
            '(XXX = country iso code, N = administration level)')

    def handle(self, indicators_filename, values_filename, *args, **options):
        UNKNOWN_STR = 'Unknown'
        country_iso = os.path.basename(indicators_filename)[:3]
        admin_level = int(os.path.basename(indicators_filename)[4])
        country = Zone.objects.get(country_iso=country_iso, admin_level=0)
        sys.stdout.write('Loading subnational socioeconomic data for %s...\n'
                         % country)
        IndicatorRecord = namedtuple(
            'IndicatorRecord',
            'theme, theme_code, subtheme, subtheme_code, indicator_name,'
            ' indicator_name_code, measurement_type, aggregation_method,'
            ' indicator_code, indicator_description, keywords, source, '
            ' year_min, year_max, update_periodicity, notes')
        # read a file containing information about indicators, measurement
        # types, aggregation methods, and sources
        first = True
        # for each indicator code, save in a dictionary those fields that
        # will not be directly linked to the indicator, but to the
        # ZoneIndicator
        additional_info = dict()
        sys.stdout.write('Loading details about indicators...\n')
        for ind in map(IndicatorRecord._make,
                       csv.reader(open(indicators_filename, 'rb'))):
            # discard header containing column names
            if first:
                first = False
                continue
            # read the actual information for each indicator
            code = ind.indicator_code.strip().decode('utf8')
            if len(code) < 9:
                sys.stdout.write(
                    'WARNING! Indicator code %s seems to be incomplete!\n'
                    % code)
            name = ind.indicator_name.strip().decode('utf8')
            sys.stdout.write("Indicator: '%s'..." % code)
            description = ind.indicator_description.strip().decode('utf8')
            theme_str = ind.theme.strip().decode('utf8')
            theme, _ = Theme.objects.get_or_create(
                name__iexact=theme_str,
                defaults={'name': theme_str})
            subtheme_str = ind.subtheme.strip().decode('utf8')
            subtheme, _ = Subtheme.objects.get_or_create(
                theme=theme,
                name__iexact=subtheme_str,
                defaults={'theme': theme,
                          'name': subtheme_str})
            notes = ind.notes.strip().decode('utf8')
            keywords_set = set()
            for keyword_str in ind.keywords.split(','):
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
                # In any case, re-use the existing version
                # (not the newly imported one)
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
                if notes and indicator.notes != notes:
                    inconsistencies.append(
                        error_fmt % ('notes',
                                     indicator.notes,
                                     notes))
                if inconsistencies:
                    sys.stdout.write("WARNING! Inconsistency found!\n")
                    for inconsistency in inconsistencies:
                        sys.stdout.write(inconsistency)
                else:
                    sys.stdout.write('OK')
                sys.stdout.write(" (re-using the existing version)\n")
                # merge the keywords
                for keyword in keywords_set:
                    indicator.keywords.add(keyword)
                indicator.save()
            # for each indicator code, save in a dictionary those fields
            # that will not be directly linked to the indicator, but to the
            # ZoneIndicator
            measurement_type_str = ind.measurement_type.strip().decode('utf8')
            measurement_type, _ = MeasurementType.objects.get_or_create(
                name__iexact=measurement_type_str,
                defaults={'name': measurement_type_str})
            aggregation_method_str = ind.aggregation_method.strip().decode(
                'utf8')
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
            source_description = ind.source.strip().decode('utf8')
            source_year_min = ind.year_min.strip().decode('utf8')
            source_year_max = ind.year_max.strip().decode('utf8')
            source_update_periodicity_str = \
                ind.update_periodicity.strip().decode('utf8')
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
        with open(values_filename, 'rb') as f:
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
            # first columns are:
            #0  |1       |2  |3       | ...|4  |5       |6    |7
            # P1| P1_Stzd| P2| P2_Stzd| ...| Pn| Pn_Stzd| CODE| FirstIndicator
            ind_codes = [code.decode('utf8')
                         for code in second_row[2 * admin_level + 1:]]
            sys.stdout.write('Indicator codes: %s\n' % ', '.join(ind_codes))
            for row in reader:
                # read zone identifiers and values
                raw_zone_name = row[2 * admin_level - 2].strip()
                zone_name = raw_zone_name.decode('utf8')
                sanitized_name = row[2 * admin_level - 1].strip()
                sanitized_name_ok = False
                if sanitized_name:
                    # check that it's actually sanitized
                    try:
                        unicode(sanitized_name)
                    except:
                        sys.stdout.write(
                            "Sanitized name '%s' is not actually sanitized.\n"
                            % sanitized_name)
                    else:
                        sanitized_name_ok = True
                # if the input file did not contain a sanitized name or the
                # sanitized name was not actually sanitized, then we attempt
                # to sanitize it automatically
                if not sanitized_name_ok:
                    try:
                        unicode(raw_zone_name)
                    except UnicodeDecodeError:
                        sanitized_name = unicodedata.normalize(
                            'NFKD', zone_name).encode('ascii', 'ignore')
                        sys.stdout.write(
                            "Name '%s' incompatible with shapefiles. "
                            "Proposed sanitization: %s\n"
                            % (zone_name, sanitized_name))
                    else:
                        sanitized_name = None
                zone_code = row[2 * admin_level].strip()
                # row[a:b:2] means only even indices will be taken
                # i.e., the raw names and not the sanitized ones
                raw_parent_labels = row[:2 * admin_level - 2: 2]
                decoded_parent_labels = [x.decode('utf8').strip()
                                         for x in raw_parent_labels]
                zone_parent_label = ", ".join(decoded_parent_labels)
                sanitized_parent_labels = row[1: 2 * admin_level - 1: 2]
                sanitized_parent_labels_ok = False
                if any([x for x in sanitized_parent_labels]):
                    sanitized_parent_labels_ok = True
                    for label in sanitized_parent_labels:
                        if label:
                            try:
                                unicode(label)
                            except UnicodeDecodeError:
                                sanitized_parent_labels_ok = False
                                sys.stdout.write(
                                    "Sanitized label '%s' is not"
                                    " actually sanitized.\n" % label)
                        else:
                            sanitized_parent_labels_ok = False
                            sys.stdout.write(
                                "Not all parent labels are explicitly"
                                " sanitized. The automatic sanitization"
                                " of %s will be used instead.\n"
                                % zone_parent_label)
                if sanitized_parent_labels_ok:
                    sanitized_zone_parent_label = ", ".join(
                        sanitized_parent_labels)
                else:  # sanitized labels were not provided or they are not
                       # actually sanitized
                    try:
                        [unicode(x) for x in raw_parent_labels]
                    except UnicodeDecodeError:
                        sanitized_zone_parent_label = unicodedata.normalize(
                            'NFKD', zone_parent_label).encode('ascii',
                                                              'ignore')
                        sys.stdout.write(
                            "Parent label '%s' incompatible with shapefiles. "
                            "Proposed sanitization: %s\n"
                            % (zone_parent_label, sanitized_zone_parent_label))
                    else:
                        sanitized_zone_parent_label = None
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
                        'sanitized_name': sanitized_name,
                        'code': zone_code,
                        'country_iso': country_iso,
                        'admin_level': admin_level,
                        'parent_label': zone_parent_label,
                        'sanitized_parent_label': sanitized_zone_parent_label,
                        'the_geom': san_marino.the_geom,
                        'study': study})
                if zone.sanitized_name != sanitized_name:
                    zone.sanitized_name = sanitized_name
                    zone.save()
                if zone.sanitized_parent_label != sanitized_zone_parent_label:
                    zone.sanitized_parent_label = sanitized_zone_parent_label
                    zone.save()
                sys.stdout.write(
                    'Importing data for zone %s...\n' % zone)
                ind_code_idx = 0
                for value in row[2 * admin_level + 1:]:
                    ind_code = ind_codes[ind_code_idx]
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
                            "Ignoring value '%s' for indicator %s"
                            " and zone %s\n"
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
                    ind_code_idx += 1
