#!/usr/bin/env python
import sys
import StringIO

import pdb, sys, traceback
def info(type, value, tb):
    traceback.print_exception(type, value, tb)
    pdb.pm()
sys.excepthook = info

sys.path.append('..')

from updatures import updatures

test_list_orig = [ '000pk-rewrite', '001pk-already-exists', '002identical',
              '003nat-identical', '004nat-pk-already-exists',
              '100auth-vulnerability' ]

if __name__ == "__main__":
    argv = []
    debug = 0
    check_consistency = False
    for arg in sys.argv[1:]:
        if arg in [ '-v', '--verbose' ]:
            debug += 1
        elif arg in [ '-c', '--check_consistency' ]:
            check_consistency = True
        else:
            argv.append(arg)

    if argv == []:
        test_list = test_list_orig
    else:
        test_list = argv

    for test in test_list:
        output = StringIO.StringIO()
        updatures(['data/' + test + '_new.json'], output=output,
                  fakeold='data/' + test + '_old.json',
                  check_consistency=check_consistency, debug=debug)

        exp = file('data/' + test + '_exp.json', 'r').read()

        if output.getvalue() == exp:
            print "TEST SUCCESS %s" % test
        else:
            fnameout = 'data/' + test + '_out.json'
            file(fnameout, 'w').write(output.getvalue())
            print "TEST DIFFER %s, OUTPUT IS SAVED IN %s" % (test, fnameout)

    sys.exit(0)
