#!/usr/bin/env python
import time
import sys

# from IPython.core import ultratb
# sys.excepthook = ultratb.FormattedTB(mode='Verbose',
#      color_scheme='Linux', call_pdb=1)

from openquake.platform_test.utils import *

try:
    from config import pla_basepath, pla_user, pla_passwd, pla_debugger
except ImportError:
    print "ERROR: config.py not found. Copy config.py in config_my.py and configure it properl ."
    sys.exit(1)


# Create a new instance of the Firefox driver

driver = pla_driver("firefox", pla_debugger)
driver.maximize_window()
pla_homepage_login(driver, pla_basepath, pla_user, pla_passwd)

pla_navigate(driver, pla_basepath, 'explore')

pla_isc_test(driver, pla_basepath)

pla_logout(driver, pla_basepath, pla_user)

driver.quit()
