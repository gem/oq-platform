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

import csv
from django.core.management.base import BaseCommand, CommandError
from openquakeplatform.isc_viewer.models import Measure


class Command(BaseCommand):
    args = '<csv catalogue filename> <csv appendix filename>'
    help = 'Import csv of GEM Global Instrumental Catalogue (catalogue and appendix)'

    def handle(self, filename_cat, filename_app, *args, **options):
        # 'unc' and 'unc' are renamed to 'depth_unc' and 'mw_unc'
        # 'q', 'q' and 'q'are renamed to 'epic_q', 'depth_q' and 'mw_q'
        wk_list = ['date', 'lat', 'lon', 'smajax', 'sminax', 'strike', 'epic_q', 'depth', 'depth_unc', 'depth_q', 'mw', 'mw_unc', 'mw_q', 's', 'mo', 'fac', 'mo_auth', 'mpp', 'mpr', 'mrr', 'mrt', 'mtp', 'mtt', 'eventid' ]

        data_cat=csv.reader(open(filename_cat))
        data_app=csv.reader(open(filename_app))
        data_arr=[ data_cat, data_app ]

        data_desc=[ 'catalogue', 'appendix' ]

        for data in data_arr:
            while True:
                fields_ns = data.next()
                if len(fields_ns) < 1:
                    continue
                s = fields_ns[0].strip()
                if s == '' or s[0] == '#':
                    continue
                break

        fields = [ field.strip() for field in fields_ns ]

        unc_cur=0
        q_cur=0
        for ct, value in enumerate(fields): 
            if value == 'unc':
                if unc_cur == 0:
                    fields[ct] = 'depth_unc'
                elif unc_cur == 1:
                    fields[ct] = 'mw_unc'
                else:
                    return False
                unc_cur += 1
            elif value == 'q':
                if q_cur == 0:
                    fields[ct] = 'epic_q'
                elif q_cur == 1:
                    fields[ct] = 'depth_q'
                elif q_cur == 2:
                    fields[ct] = 'mw_q'
                else:
                    return False
                q_cur += 1

        if fields != wk_list:
            return False

        Measure.objects.all().delete()

        data_id=0
        for data in data_arr:
            print 'Loading %s ...\n' % data_desc[data_id]
            for row in data:
                items = zip(fields, row)
                item = {}

                for (name, value) in items:
                    if name != 'date' and name != 's' and name != 'mo_auth' and name != 'epic_q' and name != 'depth_q' and name != 'mw_q':

                        if value.strip() == '':
                            item[name] = None
                        else:
                            item[name] = float(value.strip())
                    else:
                        item[name] = value.strip()

                m = Measure(src_id=data_id, date=item['date'], lat=item['lat'], lon=item['lon'],
                            the_geom="POINT(%s %s)" % (item['lon'], item['lat']),
                            smajax=item['smajax'], sminax=item['sminax'], strike=item['strike'],  epic_q=item['epic_q'],
                            depth=item['depth'], depth_unc=item['depth_unc'],  depth_q=item['depth_q'],
                            mw=item['mw'], mw_unc=item['mw_unc'], mw_q=item['mw_q'], s=item['s'],
                            mo=item['mo'], fac=item['fac'], mo_auth=item['mo_auth'],
                            mpp=item['mpp'], mpr=item['mpr'], mrr=item['mrr'],
                            mrt=item['mrt'], mtp=item['mtp'], mtt=item['mtt'], eventid=item['eventid'])

                print m
                m.save()
            data_id = data_id + 1
