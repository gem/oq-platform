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

from django.core.management.base import BaseCommand, CommandError
from openquakeplatform.updatures.app import updatures_app, pdebug
from openquakeplatform.updatures.models_descr import MODELS_DESCR
from optparse import make_option

class Command(BaseCommand):
    args = '[-s|--sort] [-f|--fakeold <old_filename>] <updates file>'
    help = ('Starting from the current database and a json dump try to '
            'produce a new json file that could be used as update '
            'input without corrupting previous database status.')

    option_list = BaseCommand.option_list + (
        make_option('-s', '--sort',
                    action='store_true',
                    dest='sort',
                    default=False,
                    help='sort the output'),

        make_option('-f', '--fakeold',
                    action='store',
                    dest='fakeold',
                    type='string',
                    default=None,
                    help='use an old json dump instead of the current data'), )

    def handle(self, updates_filename, *args, **options):
        for k,v in MODELS_DESCR.iteritems():
            if not v.refs:
                continue
            for kr,r in v.refs.iteritems():
                if r.is_many:
                    pdebug(2, "model: %s, field %s is_many" % (k, kr) )

        argv = []
        check_consistency = False
        kwarg = {}
        kwarg['debug'] = int(options['verbosity']) - 1
        kwarg['sort_output'] = options['sort']
        if options['fakeold']:
            kwarg['fakeold'] = options['fakeold']
        argv += [ updates_filename ]

        updatures_app(argv, **kwarg)

