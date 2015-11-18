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
import os
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    args = ('')
    help = ('Import csv files of subnational-level socioeconomic indicators,'
            'from all available folders.\n'
            'NOTE: errors and warnings will be written to files inside'
            'data input folders, like foldername.txt')

    def handle(self, *args, **options):
        sara_dir = os.path.join('openquakeplatform',
                                'svir',
                                'dev_data',
                                'subnational',
                                'SARA')

        for dir_name in os.listdir(sara_dir):
            to_launch = ("python manage.py"
                         " import_subnational_level_socioeconomic_data"
                         " %s"
                         " > %s_importation_log.txt"
                         " 2> %s_importation_warnings.txt\n"
                         % (os.path.join(sara_dir, dir_name),
                            os.path.join(sara_dir, dir_name, dir_name),
                            os.path.join(sara_dir, dir_name, dir_name)))
            sys.stdout.write(to_launch)
            os.system(to_launch)
