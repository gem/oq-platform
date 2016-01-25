#!/usr/bin/env python
import unittest

from openquakeplatform.test import pla
from selenium.webdriver.common.keys import Keys


class RiptTest(unittest.TestCase):

    def _get_convert_btn(self):
        convert_btn = pla.xpath_finduniq(
            "//button[@id='saveBtnEX' and @type='button'"
            " and normalize-space(text())='Convert to NRML']")
        return convert_btn

    def check_empty_cells_test(self):
        pla.get('/ript')

        # initially, we are in the exposure tab, and the handson table is empty

        # <button id="saveBtnEX" type="button" style="display: block;"
        #     class="btn btn-primary">Convert to NRML</button>

        convert_btn = self._get_convert_btn()

        win_cur = pla.current_window_handle()
        convert_btn.click()

        alert = pla.switch_to_alert()
        self.assertEquals(
            alert.text, "whoops, there seem to be some empty cells")
        alert.accept()
        pla.switch_to_window(win_cur)

    def correct_input_test(self):
        pla.get('/ript')
        handsontable_xpath = (
            "//div[@id='tabs-1']/div[@id='table']/div["
            "contains(concat(' ', normalize-space(@class), ' '),"
            " 'ht_master')]")
        # at the beginning, the handsontable should not contain the column
        # "structural"
        try:
            pla.xpath_finduniq(
                handsontable_xpath +
                "//span[@class='colHeader' and text()='structural']")
        except ValueError:
            # that's fine, because the column shouldn't be there yet
            pass
        else:
            raise ValueError('The column "structural" should not be there yet')
        # select aggregated structural cost
        dom_structural_cost = pla.xpath_finduniq(
            "//div[@id='exposureForm']/div/select[@id='defineCostStruc']")
        pla.select_item_set(dom_structural_cost, 'Aggregated')
        # the selection should add to the handsontable the column "structural"
        # NOTE: in order to match the class 'ht_master' regardless if it is the
        #       only class or the tag has many classes, we must do as follows:
        # tag[contains(concat(' ', normalize-space(@class), ' '), 'ht_master')]
        pla.xpath_finduniq(
            handsontable_xpath +
            "//span[@class='colHeader' and text()='structural']")
        # The table should have 1 row; let's fill it with all '1'
        i = 1
        while True:
            try:
                cell = pla.xpath_finduniq(
                    handsontable_xpath +
                    "//tbody/tr/td[%d]" % i)
                cell.click()
                cell.send_keys('1')
                cell.send_keys(Keys.RETURN)
                i += 1
            except ValueError:
                break
        convert_btn = self._get_convert_btn()
        convert_btn.click()
        # TODO: We should check that it does not give any error message
