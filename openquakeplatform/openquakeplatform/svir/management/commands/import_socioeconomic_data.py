# Copyright (c) 2012-2013, GEM Foundation.
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
# from django.db import connections, transaction
from django.core.management.base import BaseCommand
from openquakeplatform.world.models import Country
from openquakeplatform.svir.models import (Indicator,
                                           Theme,
                                           Subtheme,
                                           MeasurementType,
                                           Source,
                                           UpdatePeriodicity,
                                           Keyword,
                                           AggregationMethod,
                                           InternalConsistencyMetric,
                                           CountryIndicator,
                                           CustomRegion)

COUNTRIES_COUNT = 197
COUNTRIES_STARTING_IDX = 14
REGIONS_STARTING_IDX = COUNTRIES_STARTING_IDX + COUNTRIES_COUNT + 1  # discarding data completeness

class Command(BaseCommand):
    args = '<csv filename>'
    help = 'Import csv of socioeconomic data'

    def handle(self, filename, *args, **options):

        with open(filename, 'rb') as f:
            sys.stdout.write('Loading socioeconomic data...\n')

            reader = csv.reader(f)
            # read row containing field names, country names and region names
            first_row = reader.next()
            # read row containing the region names to which countries belong
            second_row = reader.next()
            assoc_regions  = second_row[COUNTRIES_STARTING_IDX:COUNTRIES_STARTING_IDX+COUNTRIES_COUNT]
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
            countries_with_socioeconomic_data, _ = CustomRegion.objects.get_or_create(
                name='Countries with socioeconomic data')

            iso_reg_dict = dict(zip(isos, assoc_regions))
            for iso in iso_reg_dict:
                country = Country.objects.get(iso3=iso)
                region, _ = CustomRegion.objects.get_or_create(
                    name=iso_reg_dict[iso])
                region.countries.add(country)
                countries_with_socioeconomic_data.countries.add(country)

            for row in reader:
                code = row[0]
                indicators = Indicator.objects.filter(code=code)
                if indicators:
                    sys.stdout.write('Indicator [%s] already imported.\n' % code)
                    continue

                ind = Indicator()

                ind.code = row[0]

                theme = row[1]
                ind.theme, _ = Theme.objects.get_or_create(name=theme)

                subtheme = row[2]
                ind.subtheme, _ = Subtheme.objects.get_or_create(
                    theme=ind.theme, name=subtheme)

                ind.name = row[3]

                measurement_type = row[4]
                ind.measurement_type, _ = MeasurementType.objects.get_or_create(
                    name=measurement_type)

                ind.description = row[5]

                update_periodicity = row[11]
                period, _ = UpdatePeriodicity.objects.get_or_create(
                        name=update_periodicity)

                source = row[6]
                year_min = row[8]
                year_max = row[9]
                ind.source, _ = Source.objects.get_or_create(
                    description=source,
                    defaults={'year_min': year_min,
                              'year_max': year_max,
                              'update_periodicity': period})

                # year_range column will be discarded

                aggregation_method = row[12]
                ind.aggregation_method, _ = AggregationMethod.objects.get_or_create(
                    name=aggregation_method)

                internal_consistency_metric = row[13]
                ind.internal_consistency_metric, _ = InternalConsistencyMetric.objects.get_or_create(
                    name=internal_consistency_metric)

                notes = row[-1] if row[-1] != "None" else None
                ind.notes = notes

                ind.save()

                keyword_names = row[7].split(',')
                for keyword_name in keyword_names:
                    keyword, _ = Keyword.objects.get_or_create(
                        name=keyword_name)
                    ind.keywords.add(keyword)

                ind.save()

                values = row[
                    COUNTRIES_STARTING_IDX:COUNTRIES_STARTING_IDX+COUNTRIES_COUNT]
                float_values = [float(v) if v != '' else None for v in values]
                iso_val_dict = dict(zip(isos, float_values))

                for iso in iso_val_dict:
                    value = iso_val_dict[iso]
                    if value is not None:
                        country = Country.objects.get(iso3=iso)
                        ci, _ = CountryIndicator.objects.get_or_create(
                            country=country,
                            indicator=ind,
                            defaults={'value': value})

                # discard from csv data completeness
                sys.stdout.write(
                    'Indicator [%s] values for each country have been saved...\n' % ind)
