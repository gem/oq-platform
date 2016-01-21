#!/usr/bin/env python
import time
import sys
import unittest

from openquakeplatform.test import pla
from openquakeplatform.test.utils import *


class IrvTest(unittest.TestCase):
    def irv_test(self):
        # go to test page
        pla.get('/static/irv/test/IRVTests.html')

        # wait DOM population via async JS
        pla.xpath_finduniq(
            "//div[@class='jasmine_html-reporter']/div"
            "[@class='results']/div[@class='summary']",
            100, 1)

        # check the result of tests
        pla.xpath_finduniq(
            "//span[@class='bar passed' and contains"
            "(normalize-space(text()), ', 0 failures')]")
