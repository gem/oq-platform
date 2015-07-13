#!/usr/bin/env python
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

import logging
import sys
import os
import StringIO
import json
import unittest

from openquakeplatform.updatures.app import updatures_app
from openquakeplatform import updatures

import pdb, traceback
def info(typ, value, trbk):
    traceback.print_exception(typ, value, trbk)
    pdb.pm()
sys.excepthook = info


TEST_LIST_ORIG = [ '000pk-rewrite', '001pk-already-exists', '002identical',
                   '003nat-identical', '004nat-pk-already-exists',
                   '005inher-ok', '006inher-skip-generic',
                   '007inher-change-pk', '008strategies',
                   '100auth-vulnerability', '101group-replace-ok',
                   '102group-replace-fail',  '300taggit',
                   '400maps', '401maps-pkrename' ]

TEST_LIST = TEST_LIST_ORIG

class UpdaturesTestCase(unittest.TestCase):

    def test_updatures(self):
        updatures.UPD_LOG = logging.getLogger("updatures")
        updatures.UPD_LOG.setLevel(30)

        logging_curr = updatures.UPD_LOG.getEffectiveLevel()
        updatures.UPD_LOG.log(20, "LOGGING LEVEL TEST: %d" % logging_curr)

        test_result = 0
        for test in TEST_LIST:
            output = StringIO.StringIO()
            data_dir = os.path.dirname(os.path.realpath(__file__)) + '/data/'
            # NOTE: sort must be False to be able to upload
            #       fixture to a real environment
            result = updatures_app([data_dir + test + '_new.json'],
                                   output=output, fakeold=data_dir + test +
                                   '_old.json', sort_output=True)

            exp = file(data_dir + test + '_exp.json', 'r').read()

            if result == 0:
                if output.getvalue() == exp:
                    print "TEST SUCCESS %s" % test
                else:
                    test_result = 1
                    fnameout = data_dir + test + '_out.json'
                    file(fnameout, 'w').write(output.getvalue())
                    print ("TEST DIFFER %s, OUTPUT IS SAVED IN %s"
                           % (test, fnameout))
            else:
                exp = json.loads(exp)
                if [result] == exp:
                    print "TEST SUCCESS %s, failure was expected" % test
                else:
                    test_result = 1
                    print ("TEST FAILS executing %s a failure %s was expected"
                           " but %s was returned" % (test, exp, [ result ]))

        self.assertEqual(test_result, 0)

if __name__ == "__main__":
    print "Use nose to run these tests."
