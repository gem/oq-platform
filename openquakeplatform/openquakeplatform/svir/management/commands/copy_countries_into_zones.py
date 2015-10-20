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

from django.core.management.base import BaseCommand
from openquakeplatform.world.models import CountrySimplified1000M as Country
from openquakeplatform.svir.models import Zone, Study


class Command(BaseCommand):
    help = 'Copy GADM simplified countries into the zones table'

    def handle(self, *args, **options):
        study, _ = Study.objects.get_or_create(
            name__iexact=
            'Social and Economic Vulnerability Global Indicator Database',
            defaults={'description': 'FIXME',
                      'wiki_link': 'FIXME'})
        for country in Country.objects.all():
            print "Copying %s..." % country.name_0
            Zone.objects.get_or_create(name__iexact=country.name_0,
                                       country_iso__iexact=country.iso,
                                       defaults={'the_geom': country.the_geom,
                                                 'admin_level': 0})
