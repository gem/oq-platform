#!/usr/bin/env python
import time
import sys
import unittest

# from IPython.core import ultratb
# sys.excepthook = ultratb.FormattedTB(mode='Verbose',
#      color_scheme='Linux', call_pdb=1)

from openquakeplatform.test import pla
from openquakeplatform.test.utils import *


class IscTest(unittest.TestCase):
    def isc_test(self):
        pla.navigate('explore')

        #<li>
        #<a href="/maps/23">
        enter_button = pla.xpath_finduniq(
            "//li/a[@href='/maps/23' and normalize-space(text()) = 'Global "
            "Instrumental Earthquake Catalogue (1900 - 2009)']")
        enter_button.click()
        pla.wait_new_page(enter_button, '/maps/23')

        enter_button = pla.xpath_finduniq(
            "//a[@href='/maps/23/view' and "
            "normalize-space(text()) = 'View Map']")
        enter_button.click()
        pla.wait_new_page(enter_button, '/maps/23/view')

        # <button id="ext-gen159" class=" x-btn-text gxp-icon-getfeatureinfo"
        # type="button">Identify
        enter_button = pla.xpath_finduniq(
            "//button[@type='button' and normalize-space(text())"
            "= 'Identify']", 50)
        enter_button.click()

        tail_ptr = pla.xpath_finduniq(
            "//img[contains(@src, 'wms?LAYERS=oqplatform%3Aisc_viewer_measure"
            "&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1"
            "&REQUEST=GetMap&STYLES=&TILED=true&SRS=EPSG%3A900913&BBOX="
            "-10018754.17,0,-5009377.085,5009377.085&WIDTH=256&HEIGHT=256')]",
            50)

        pla.add_click_event()
        pla.click_at(107 + tail_ptr.location['x'],
                     115 + tail_ptr.location['y'])
        # raise ValueError

        popup_ctx = pla.xpath_finduniq("//div[text() = '1951-03-19T04:23:00']",
                                       50)
