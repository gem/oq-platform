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
from gaf_viewer.models import FaultTrace


class Command(BaseCommand):
    args = '<csv catalogue filename> <csv appendix filename>'
    help = 'Import csv of GEM Global Active Faults'

    def handle(self, filename, *args, **options):
        field_list = ['id', 'geom', 'accuracy', 'ns_neotectonic_section_id', 'ns_fault_summary_id', 'ns_average_dip', 'ns_is_active', 'ns_is_episodic', 'ns_surface_dip', 'ns_name', 'ns_aseismic_slip_factor', 'ns_compiler_id', 'ns_completion_id', 'ns_contributor_id', 'ns_dip_dir', 'ns_disp', 'ns_downthrown_side_id', 'ns_last_movement', 'ns_length', 'ns_lower_sm_depth', 'ns_recurrence_interval', 'ns_net_slip_rate', 'ns_slip_type_id', 'ns_strike', 'ns_strike_slip_rate', 'ns_upper_sm_depth', 'ns_vert_slip_rate', 'ns_created_date', 'ns_modified_date', 'fs_fault_summary_id', 'fs_aseismic_slip_factor', 'fs_compiler_id', 'fs_completion_id', 'fs_contributor_id', 'fs_average_dip', 'fs_dip_dir', 'fs_displacement', 'fs_downthrown_side_id', 'fs_is_active', 'fs_is_episodic', 'fs_is_section_summary', 'fs_last_movement', 'fs_length', 'fs_lower_sm_depth', 'fs_name', 'fs_recurrence_interval', 'fs_strike_slip_rate', 'fs_slip_type_id', 'fs_strike', 'fs_upper_sm_depth', 'fs_created_date', 'fs_modified_date', 'fs_net_slip_rate', 'fs_vert_slip_rate', 'ns_net_slip_rate_comp', 'slip_type']

        intfld_list = ['id', 'the_geom', 'accuracy', 'ns_neotectonic_section_id', 'ns_fault_summary_id', 'ns_average_dip', 'ns_is_active', 'ns_is_episodic', 'ns_surface_dip', 'ns_name', 'ns_aseismic_slip_factor', 'ns_compiler_id', 'ns_completion_id', 'ns_contributor_id', 'ns_dip_dir', 'ns_disp', 'ns_downthrown_side_id', 'ns_last_movement', 'ns_length', 'ns_lower_sm_depth', 'ns_recurrence_interval', 'ns_net_slip_rate', 'ns_slip_type_id', 'ns_strike', 'ns_strike_slip_rate', 'ns_upper_sm_depth', 'ns_vert_slip_rate', 'ns_created_date', 'ns_modified_date', 'fs_fault_summary_id', 'fs_aseismic_slip_factor', 'fs_compiler_id', 'fs_completion_id', 'fs_contributor_id', 'fs_average_dip', 'fs_dip_dir', 'fs_displacement', 'fs_downthrown_side_id', 'fs_is_active', 'fs_is_episodic', 'fs_is_section_summary', 'fs_last_movement', 'fs_length', 'fs_lower_sm_depth', 'fs_name', 'fs_recurrence_interval', 'fs_strike_slip_rate', 'fs_slip_type_id', 'fs_strike', 'fs_upper_sm_depth', 'fs_created_date', 'fs_modified_date', 'fs_net_slip_rate', 'fs_vert_slip_rate', 'ns_net_slip_rate_comp', 'slip_type']
        nullab_fld = ['geom', 'accuracy', 'ns_fault_summary_id', 'ns_average_dip', 'ns_is_active', 'ns_is_episodic', 'ns_surface_dip', 'ns_name', 'ns_compiler_id', 'ns_completion_id', 'ns_contributor_id', 'ns_dip_dir', 'ns_disp', 'ns_downthrown_side_id', 'ns_last_movement', 'ns_length', 'ns_lower_sm_depth', 'ns_recurrence_interval', 'ns_net_slip_rate', 'ns_slip_type_id', 'ns_strike', 'ns_strike_slip_rate', 'ns_upper_sm_depth', 'ns_vert_slip_rate', 'ns_created_date', 'ns_modified_date', 'fs_compiler_id', 'fs_completion_id', 'fs_contributor_id', 'fs_average_dip', 'fs_dip_dir', 'fs_displacement', 'fs_downthrown_side_id', 'fs_is_active', 'fs_is_episodic', 'fs_is_section_summary', 'fs_last_movement', 'fs_length', 'fs_lower_sm_depth', 'fs_name', 'fs_recurrence_interval', 'fs_strike_slip_rate', 'fs_slip_type_id', 'fs_strike', 'fs_upper_sm_depth', 'fs_created_date', 'fs_modified_date', 'fs_net_slip_rate', 'fs_vert_slip_rate', 'ns_net_slip_rate_comp', 'slip_type']

        rows_in = [line for line in file(filename) if not line.startswith("#")]
        rows = csv.reader(rows_in, delimiter = '|')

        FaultTrace.objects.all().delete()

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
            m = FaultTrace(src_id=data_id, **d)

            print m
            m.save()
