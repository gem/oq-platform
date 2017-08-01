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
from openquakeplatform.svir.models import Zone

maxInt = sys.maxsize
csv.field_size_limit(maxInt)


class Command(BaseCommand):
    args = ('<csv file containing geometries> <country iso code>'
            ' <attribute name for zone names> <attribute name for zone codes>')
    help = ('Import subnational geometries from a csv file and update the'
            ' geometries in the DB accordingly.')

    def handle(self, geometries_file=None, iso=None,
               zone_name_attr=None, zone_code_attr=None, *args, **options):
        # geometries_file = \
        #     '../../dev_data/subnational/sara_shapefiles/ARG_shapefile.csv'
        if geometries_file is None:
            print "No geometries file provided!"
            sys.exit(1)
        if iso is None:
            print "No iso code provided"
            sys.exit(1)
        if zone_name_attr is None:
            print "No attribute name for zone names provided"
            sys.exit(1)
        if zone_code_attr is None:
            print "No attribute name for zone codes provided"
            sys.exit(1)
        with open(geometries_file, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                zone_name = row[zone_name_attr]
                print "Updating geometry for '%s'" % zone_name
                zone_code = int(float(row[zone_code_attr]))
                zone_geometry = row['WKT']
                try:
                    zone = Zone.objects.get(code=zone_code, country_iso=iso)
                except ObjectDoesNotExist:
                    print "Zone with code %s does not exist!" % zone_code
                    continue
                zone.the_geom = zone_geometry
                zone.save()
