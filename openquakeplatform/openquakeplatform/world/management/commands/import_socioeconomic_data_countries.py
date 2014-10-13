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
from django.db import connections, transaction
from django.core.management.base import BaseCommand
from openquakeplatform.world.models import Country

COUNTRIES_COUNT = 197
COUNTRIES_STARTING_IDX = 14
REGIONS_STARTING_IDX = COUNTRIES_STARTING_IDX + COUNTRIES_COUNT + 1  # discarding data completeness

class Command(BaseCommand):
    args = '<csv filename>'
    help = 'Import csv of socioeconomic data'

    def handle(self, filename, *args, **options):

        with open(filename, 'rb') as f:
            sys.stdout.write('Loading countries from the csv containing socioeconomic data...\n')

            reader = csv.reader(f)
            # read row containing field names, country names and region names
            first_row = reader.next()
            # read row containing the region names to which countries belong
            second_row = reader.next()
            # read row containing country iso codes
            third_row = reader.next()

        isos = third_row[
            COUNTRIES_STARTING_IDX:COUNTRIES_STARTING_IDX+COUNTRIES_COUNT]
        names = first_row[
            COUNTRIES_STARTING_IDX:COUNTRIES_STARTING_IDX+COUNTRIES_COUNT]

        iso_name_dict = dict(zip(isos, names))

        for iso in iso_name_dict:
            country , _ = Country.objects.get_or_create(
                iso3=iso, defaults={'name': iso_name_dict[iso]})
