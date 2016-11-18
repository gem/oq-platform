import time
import sys
import nose

from openquake.moon import Moon

pla = Moon()
pla.primary_set()

def setup_package():
    pla.init()

def teardown_package():
    pla.fini()
