# Copyright (c) 2012-2014, GEM Foundation.
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
from geonode.maps.models import Map
from geonode.base.models import ResourceBase


class Command(BaseCommand):
	
    def handle(self, *args, **options):
    	titles = ((1, "Instrumental Seismic Catalogue"), (2, "Global Historic Catalogue"), (3, "Global Active Faults"))

    	for id, name in titles:
        	table_row = ResourceBase.objects.get(id=id)
        	table_row.title = name
        	table_row.save()

