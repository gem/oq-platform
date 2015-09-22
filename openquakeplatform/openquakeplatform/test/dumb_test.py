import sys
import nose
import unittest

class DumbTest(unittest.TestCase):
    def dumb_test(self):
        sys.stderr.write("test_dumb: pass")

