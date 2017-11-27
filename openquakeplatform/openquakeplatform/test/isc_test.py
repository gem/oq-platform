#!/usr/bin/env python
import unittest
import time

from openquake.moon import platform_get
from selenium.webdriver.common.action_chains import ActionChains

# @unittest.skip("temporarily disabled")


class IscTest(unittest.TestCase):
    def isc_test(self):
        pla = platform_get()
        pla.get('/explore')
        pla.wait_new_page("//b[contains(text(), 'Seismic Hazard Data Sets and Models')]",
                          "/explore", strategy="next", timeout=10)

        #  <li>
        #  <a href="/maps/23">
        enter_button = pla.xpath_finduniq(
            "//li/a[@href='/maps/23' and normalize-space(text()) = 'Global "
            "Instrumental Earthquake Catalogue (1900 - 2009)']")
        enter_button.click()
        pla.wait_new_page(enter_button, '/maps/23')

        enter_button = pla.xpath_finduniq(
            "//a[@href='/maps/23/view' and "
            "normalize-space(text()) = 'View Map']")
        enter_button.click()
        pla.wait_new_page(enter_button, '/maps/23/view', timeout=15)

        # <button id="ext-gen159" class=" x-btn-text gxp-icon-getfeatureinfo"
        # type="button">Identify
        enter_button = pla.xpath_finduniq(
            "//button[@type='button' and normalize-space(text())"
            "= 'Identify']", 50)
        enter_button.click()

        action = ActionChains(pla.driver)
        action.move_by_offset(500, 400)
        action.click_and_hold()
        action.move_by_offset(150, 150)
        action.release()
        action.perform()

        time.sleep(3)

        # wait info button will be clicked
        pla.xpath_finduniq(
            "//button[@type='button' and normalize-space(text())"
            "= 'Identify']/../../../../..[contains(concat(' ', @class, ' '),"
            " ' x-btn-pressed ')]", 100)

        tile = pla.xpath_finduniq(
            "//img[contains(@src, 'wms?LAYERS=oqplatform%3Aisc_viewer_measure"
            "&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1"
            "&REQUEST=GetMap&STYLES=&TILED=true&SRS=EPSG%3A900913&BBOX="
            "-10018754.17,0,-5009377.085,5009377.085&WIDTH=256&HEIGHT=256')]",
            50)

        action = ActionChains(pla.driver)
        action.move_to_element_with_offset(tile, 107, 115)
        action.click()
        action.perform()

        pla.xpath_finduniq("//div[text() = '1951-03-19T04:23:00']", 50)
