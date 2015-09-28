import time
import sys
import nose

from openquakeplatform.test.platform import Platform

pla = Platform()

def setup_package():
    pla.init()

def teardown_package():
    pla.screenshot('latest_page.png')
    # FIXME just for test
    time.sleep(30000)
    pla.fini()
