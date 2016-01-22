#!/usr/bin/env python
import unittest

from openquakeplatform.test import pla


class RiptTest(unittest.TestCase):
    def check_empty_cells(self):
        pla.get('/ript')

        # initially, we are in the exposure tab, and the handson table is empty

        # <button id="saveBtnEX" type="button" style="display: block;"
        #     class="btn btn-primary">Convert to NRML</button>

        convert_btn = pla.xpath_finduniq(
            "//button[@id='saveBtnEX' and @type='button'"
            " and normalize-space(text())='Convert to NRML']")

        win_cur = pla.current_window_handle()
        convert_btn.click()

        alert = pla.switch_to_alert()
        self.assertEquals(
            alert.text, "whoops, there seem to be some empty cells")
        alert.accept()
        pla.switch_to_window(win_cur)
