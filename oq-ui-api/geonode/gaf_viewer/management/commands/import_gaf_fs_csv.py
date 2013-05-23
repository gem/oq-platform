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
from gaf_viewer.models import FaultSource


class Command(BaseCommand):
    args = '<csv catalogue filename> <csv appendix filename>'
    help = 'Import csv of GEM Global Active Faults fault sources'

    def handle(self, filename, *args, **options):
        field_list = ['fault_source_id', 'fault_summary_id', 'aseismic_slip_factor', 'compiler_id', 'completion_id', 'contributor_id', 'dip', 'dip_dir', 'last_movement', 'length', 'lower_sm_depth', 'magnitude', 'name', 'recurrence_interval', 'slip_rate', 'slip_type_id', 'upper_sm_depth', 'created_date', 'modified_date', 'tectonic_region', 'area', 'width', 'geom', 'compiler_name', 'contributor_name', 'pref_magnitude', 'pref_dip', 'pref_slip_rate', 'pref_length', 'pref_width', 'pref_area', 'pref_lsd', 'pref_usd', 'pref_recint', 'slip_type']

        intfld_list = ['id', 'fault_summary_id', 'aseismic_slip_factor', 'compiler_id', 'completion_id', 'contributor_id', 'dip', 'dip_dir', 'last_movement', 'length', 'lower_sm_depth', 'magnitude', 'name', 'recurrence_interval', 'slip_rate', 'slip_type_id', 'upper_sm_depth', 'created_date', 'modified_date', 'tectonic_region', 'area', 'width', 'the_geom', 'compiler_name', 'contributor_name', 'pref_magnitude', 'pref_dip', 'pref_slip_rate', 'pref_length', 'pref_width', 'pref_area', 'pref_lsd', 'pref_usd', 'pref_recint', 'slip_type']
        nullab_fld = ['fault_summary_id', 'completion_id', 'last_movement', 'length', 'lower_sm_depth', 'recurrence_interval', 'upper_sm_depth', 'created_date', 'modified_date', 'area', 'width', 'the_geom', 'pref_magnitude', 'pref_dip', 'pref_slip_rate', 'pref_length', 'pref_width', 'pref_area', 'pref_lsd', 'pref_usd', 'pref_recint', 'slip_type']

        rows_in = [line for line in file(filename) if not line.startswith("#")]
        rows = csv.reader(rows_in, delimiter = '|')

        FaultSource.objects.all().delete()

        # TEST
        is_first = True
        for data_id, row in enumerate(rows):
            if is_first:
                # check the first row to verify columns names
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
            d = dict(zip(intfld_list, row))
            m = FaultSource(src_id=data_id, **d)

            print m
            m.save()
