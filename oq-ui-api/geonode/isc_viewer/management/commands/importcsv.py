import csv
from django.core.management.base import BaseCommand, CommandError
from isc_viewer.models import Measure

class Command(BaseCommand):
    args = '<csv filename>'
    help = 'Import csv of GEM Global Instrumental Catalogue'


    def handle(self, filename, *args, **options):
        # 'unc' and 'unc' are renamed to 'depth_unc' and 'mw_unc'
        wk_list = ['date', 'lat', 'lon', 'smajaz', 'sminax', 'strike', 'depth', 'depth_unc', 'mw', 'mw_unc', 's', 'mo', 'fac', 'auth', 'mpp', 'mpr', 'mrr', 'mrt', 'mtp', 'mtt']

        data=csv.reader(open(filename))
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
        for ct, value in enumerate(fields): 
            if value == 'unc':
                if unc_cur == 0:
                    fields[ct] = 'depth_unc'
                elif unc_cur == 1:
                    fields[ct] = 'mw_unc'
                else:
                    return False
                unc_cur += 1

        if fields != wk_list:
            return False

        Measure.objects.all().delete()
        for row in data:
            items = zip(fields, row)
            item = {}

            for (name, value) in items:
                if name != 'date' and name != 's' and name != 'auth':
                    if value.strip() == '':
                        item[name] = None
                    else:
                        item[name] = float(value.strip())
                else:
                    item[name] = value.strip()

            m = Measure(date=item['date'], lat=item['lat'], lon=item['lon'], 
                        the_geom="POINT(%s %s)" % (item['lon'], item['lat']),
                        smajaz=item['smajaz'], sminax=item['sminax'], strike=item['strike'], 
                        depth=item['depth'], depth_unc=item['depth_unc'], 
                        mw=item['mw'], mw_unc=item['mw_unc'], s=item['s'], 
                        mo=item['mo'], fac=item['fac'], auth=item['auth'], 
                        mpp=item['mpp'], mpr=item['mpr'], mrr=item['mrr'],
                        mrt=item['mrt'], mtp=item['mtp'], mtt=item['mtt'])

            print m
            m.save()


        
