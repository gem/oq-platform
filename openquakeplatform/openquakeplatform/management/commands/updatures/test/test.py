#!/usr/bin/env python
import sys
import StringIO

sys.path.append('..')

from updatures import updatures

test_list = [ '000pk-rewrite', '001pk-already-exists', '002identical', '003nat-identical', '004nat-pk-already-exists' ]

if __name__ == "__main__":
    debug = False
    if '-v' in sys.argv or '--verbose' in sys.argv:
        debug = True

    for test in test_list:
        output = StringIO.StringIO()
        updatures(['data/' + test + '_new.json'], output=output, fakeold='data/' + test + '_old.json', debug=debug)

        exp = file('data/' + test + '_exp.json', 'r').read()

        if output.getvalue() == exp:
            print "TEST SUCCESS %s" % test
        else:
            fnameout = 'data/' + test + '_out.json'
            file(fnameout, 'w').write(output.getvalue())
            print "TEST DIFFER %s, OUTPUT IS SAVED IN %s" % (test, fnameout)

    sys.exit(0)
