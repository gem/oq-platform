#!/usr/bin/env python
import unittest

from openquakeplatform.test import pla


class RiptTest(unittest.TestCase):
    def check_empty_cells_test(self):
        pla.get('/ript')

        # initially, we are in the exposure tab, and the handson table is empty

        # <button id="saveBtnEX" type="button" style="display: block;"
        #     class="btn btn-primary">Convert to NRML</button>

        convert_btn = pla.xpath_finduniq(
            "//div[contains(concat(' ',normalize-space(@class),' '),"
            "' ex_gid ')]//button[@id='convertBtn' and @type='button'"
            " and normalize-space(text())='Convert to NRML']")

        convert_btn.click()

        pla.xpath_finduniq(
            "//div[contains(concat(' ',normalize-space(@class),' '),"
            "' ex_gid ')]//div[@id='outputDiv']//div[@id='validationErrorMsg'"
            " and normalize-space(text())='Validation error:"
            " empty cell at coords (1, 1).']")
