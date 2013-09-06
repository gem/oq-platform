# Copyright (c) 2013, GEM Foundation.
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

import csv
from django.core.management.base import BaseCommand, CommandError
from openquakeplatform.ghec_viewer.models import Measure


class Command(BaseCommand):
    args = '<csv catalogue filename> <csv appendix filename>'
    help = 'Import csv of GEM Global Historical Catalogue'

    def handle(self, filename, *args, **options):
        # 'unc' and 'unc' are renamed to 'depth_unc' and 'mw_unc'
        # 'q', 'q' and 'q'are renamed to 'epic_q', 'depth_q' and 'mw_q'
        field_list = ['En', 'Source', 'Year', 'Mo', 'Da', 'Ho', 'Mi', 'Se', 'Area', 'Lat', 'Lon', 'LatUnc', 'LonUnc', 'EpDet', 'Dep', 'Io', 'Msource', 'M', 'MUnc', 'MType', 'MDet', 'MDPSource', 'MDPn', 'MDPIx', 'MDPsc', 'Remarks', 'GEHid']
        intfld_list = ['en', 'src', 'yea', 'mon', 'day', 'hou', 'min', 'sec', 'are', 'lat', 'lon', 'latunc', 'lonunc', 'epdet', 'dep', 'io', 'msrc', 'm', 'munc', 'mtyp', 'mdet', 'mdpsrc', 'mdpn', 'mdpix', 'mdpsc', 'rem', 'id']

        nullab_fld = ['mon', 'day', 'hou', 'min', 'sec' ,'latunc', 'lonunc', 'dep', 'munc', 'mdpn']

#suppall_in = [line for line in file(supp_name) if not line.startswith("#")]
#    suppall_cs = csv.reader(suppall_in, delimiter = '|', escapechar = '\\' )

        rows_in = [line for line in file(filename) if not line.startswith("#")]
        rows = csv.reader(rows_in, delimiter = '	')

        Measure.objects.all().delete()

        is_first = True
        for data_id, row in enumerate(rows):
            if is_first:
                # check the first row with 
                for i, field in enumerate(field_list):
                    if field != row[i]:
                        print "Field [%s] expected, [%s] is provided" % (field, row[i])
                        return False
                is_first = False
                continue

            if len(intfld_list) != len(row):
                return False
            
            for i, field in enumerate(row):
                if intfld_list[i] in nullab_fld and field == '':
                    row[i] = None
            # TODO m = Measure(src_id=data_id, **dict(zip(intfld_list, row)))
            d = dict(zip(intfld_list, row))
            m = Measure(the_geom="POINT(%(lon)s %(lat)s)" % d, **d)

            print m
            m.save()
            
