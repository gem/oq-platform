#!/usr/bin/env python
import sys
import StringIO
import json

from updatures.app import updatures_app

import pdb, sys, traceback
def info(type, value, tb):
    traceback.print_exception(type, value, tb)
    pdb.pm()
sys.excepthook = info


test_list_orig = [ '000pk-rewrite', '001pk-already-exists', '002identical',
                   '003nat-identical', '004nat-pk-already-exists',
                   '005inher-ok', '006inher-skip-generic',
                   '007inher-change-pk', '008strategies',
                   '100auth-vulnerability', '101group-replace-ok',
                   '102group-replace-fail',  '300taggit',
                   '400maps', '401maps-pkrename' ]

if __name__ == "__main__":
    argv = []
    debug = 0
    for arg in sys.argv[1:]:
        if arg in [ '-v', '--verbose' ]:
            debug += 1
        else:
            argv.append(arg)

    if argv == []:
        test_list = test_list_orig
    else:
        test_list = argv

    test_result = 0
    for test in test_list:
        output = StringIO.StringIO()
        # NOTE: sort must be False to be able to upload fixture to a real environment
        result = updatures_app(['data/' + test + '_new.json'], output=output,
                           fakeold='data/' + test + '_old.json',
                           sort_output=True, debug=debug)

        exp = file('data/' + test + '_exp.json', 'r').read()

        if result == 0:
            if output.getvalue() == exp:
                print "TEST SUCCESS %s" % test
            else:
                test_result = 1
                fnameout = 'data/' + test + '_out.json'
                file(fnameout, 'w').write(output.getvalue())
                print "TEST DIFFER %s, OUTPUT IS SAVED IN %s" % (test, fnameout)
        else:
            exp = json.loads(exp)
            if [ result ] == exp:
                print "TEST SUCCESS %s, failure was expected" % test
            else:
                test_result = 1
                print "TEST FAILS %s excting a failure %s was expected but %s was returned" % (test, exp, [ result ])

    sys.exit(test_result)
