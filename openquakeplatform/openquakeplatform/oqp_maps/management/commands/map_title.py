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


class Command(models.Model):

    def handle(self):
        table_id = base_resourcebase.objects.get(id=1)
        table_id.title = "Instrumental Seismic Catalogue"
        table_id.save()
        
