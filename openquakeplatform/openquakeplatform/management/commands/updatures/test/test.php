#!/usr/bin/env python
import sys
sys.path.append('..')

from updatures import updatures

test_list = [ '000pk_rewrite' ]

if __name__ == "__main__":
    for test in test_list:
        print "TEST: [%s]\n" % test
        updatures(['data/' + test + '_new.json'], fakeold='data/' + test + '_old.json')
        print 

