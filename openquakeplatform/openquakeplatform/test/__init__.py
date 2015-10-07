import time
import sys
import nose

from openquakeplatform.test.platform import Platform

pla = Platform()


def setup_package():
    pla.init()


def teardown_package():
    pla.screenshot('latest_page.png')
    pla.fini()
