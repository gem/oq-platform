#!/usr/bin/env python
import sys
import StringIO

sys.path.append('..')

from updatures import updatures

test_list = [ '000pk-rewrite', '001pk-already-exists' ]

if __name__ == "__main__":
    for test in test_list:
        output = StringIO.StringIO()
        updatures(['data/' + test + '_new.json'], output=output, fakeold='data/' + test + '_old.json')

        exp = file('data/' + test + '_exp.json', 'r').read()

        if output.getvalue() == exp:
            print "TEST %s SUCCESS" % test
        else:
            file('data/' + test + '_out.json', 'w').write(output.getvalue())
            print "TEST %s DIFFER" % test
        
    sys.exit(0)
