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
from openquakeplatform.svir.models import (AggregationMethod,
                                           CustomRegion,
                                           Indicator,
                                           InternalConsistencyMetric,
                                           Keyword,
                                           MeasurementType,
                                           Source,
                                           Study,
                                           Subtheme,
                                           Theme,
                                           UpdatePeriodicity,
                                           Zone,
                                           ZoneIndicator,
                                           )

COUNTRIES_COUNT = 197
COUNTRIES_STARTING_IDX = 14
REGIONS_STARTING_IDX = (COUNTRIES_STARTING_IDX
                        + COUNTRIES_COUNT + 1)  # discarding data completeness


class Command(BaseCommand):
    args = '<csv filename>'
    help = 'Import csv of country-level socioeconomic data'

    def handle(self, filename, *args, **options):

        with open(filename, 'rb') as f:
            sys.stdout.write('Loading country-level socioeconomic data...\n')
            study, _ = Study.objects.get_or_create(
                name__iexact=('Social and Economic Vulnerability'
                              ' Global Indicator Database'),
                defaults={'description': 'FIXME',
                          'wiki_link': 'FIXME'})

            reader = csv.reader(f)
            # read row containing field names, country names and region names
            reader.next()  # the first row is not used
            # read row containing the region names to which countries belong
            second_row = reader.next()
            assoc_regions = second_row[
                COUNTRIES_STARTING_IDX:COUNTRIES_STARTING_IDX+COUNTRIES_COUNT]
            # read row containing country iso codes
            third_row = reader.next()
            isos = third_row[
                COUNTRIES_STARTING_IDX:COUNTRIES_STARTING_IDX+COUNTRIES_COUNT]

            sys.stdout.write(
                'Importing custom regions and assigining countries...\n')

            # Also create a custom region containing all the countries for
            # which socioeconomic data are available (those with a population
            # above 200000 individuals)
            # It will be used to quantify general data completeness, which
            # would be meaningless if we calculate it with respect of the whole
            # set of countries in GADM
            countries_with_socioeconomic_data, _ = \
                CustomRegion.objects.get_or_create(
                    name__iexact='Countries with socioeconomic data')

            iso_reg_dict = dict(zip(isos, assoc_regions))
            for iso in iso_reg_dict:
                country = Zone.objects.get(country_iso=iso)
                region, _ = CustomRegion.objects.get_or_create(
                    name__iexact=iso_reg_dict[iso])
                region.zones.add(country)
                countries_with_socioeconomic_data.zones.add(country)

                # each zone belongs to one and only one study
                country.study = study
                country.save()

            for row in reader:
                code = row[0].strip()
                try:
                    ind = Indicator.objects.get(code=code)
                    sys.stdout.write(
                        'Updating values for indicator [%s]...\n' % code)
                except:
                    ind = Indicator()
                    sys.stdout.write(
                        'Loading data for indicator [%s]...\n' % code)

                ind.code = code

                theme_name = row[1].strip()
                theme, _ = Theme.objects.get_or_create(name__iexact=theme_name)

                subtheme_name = row[2].strip()
                ind.subtheme, _ = Subtheme.objects.get_or_create(
                    theme=theme, name__iexact=subtheme_name)

                ind.name = row[3].strip()

                measurement_type_name = row[4].strip()
                # to be inserted into ZoneIndicator
                measurement_type, _ = \
                    MeasurementType.objects.get_or_create(
                        name__iexact=measurement_type_name)

                ind.description = row[5].strip()

                update_periodicity = row[11].strip()
                period, _ = UpdatePeriodicity.objects.get_or_create(
                    name__iexact=update_periodicity)

                source_description = row[6].strip()
                year_min = row[8].strip()
                year_max = row[9].strip()
                # to be inserted into ZoneIndicator
                source, _ = Source.objects.get_or_create(
                    description__iexact=source_description,
                    defaults={'year_min': year_min,
                              'year_max': year_max,
                              'update_periodicity': period})

                # year_range column will be discarded

                aggregation_method_name = row[12].strip()
                # to be inserted into ZoneIndicator
                aggregation_method, _ = \
                    AggregationMethod.objects.get_or_create(
                        name__iexact=aggregation_method_name)

                internal_consistency_metric_name = row[13].strip()
                # to be inserted into ZoneIndicator
                internal_consistency_metric, _ = \
                    InternalConsistencyMetric.objects.get_or_create(
                        name__iexact=internal_consistency_metric_name)

                notes = row[-1].strip() if row[-1] != "None" else None
                ind.notes = notes

                ind.save()

                keyword_names = [keyword.strip()
                                 for keyword in row[7].split(',')]
                for keyword_name in keyword_names:
                    keyword, _ = Keyword.objects.get_or_create(
                        name__iexact=keyword_name)
                    ind.keywords.add(keyword)

                ind.save()

                values = row[
                    COUNTRIES_STARTING_IDX:
                    COUNTRIES_STARTING_IDX + COUNTRIES_COUNT]
                float_values = [float(v) if v != '' else None for v in values]
                iso_val_dict = dict(zip(isos, float_values))

                for iso in iso_val_dict:
                    value = iso_val_dict[iso]
                    if value is not None:
                        country = Zone.objects.get(country_iso=iso)
                        zi, _ = ZoneIndicator.objects.get_or_create(
                            zone=country,
                            indicator=ind,
                            defaults={
                                'value': value,
                                'source': source,
                                'aggregation_method': aggregation_method,
                                'measurement_type': measurement_type,
                                'internal_consistency_metric':
                                internal_consistency_metric,
                            })

                # discard from csv data completeness
                sys.stdout.write(
                    'Indicator [%s] values for each'
                    ' country have been saved...\n' % ind)
