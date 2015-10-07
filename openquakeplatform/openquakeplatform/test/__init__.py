import time
import sys
import nose

from openquakeplatform.test.platform import Platform

# uncomment to run pdb when untrapped exception is raised
#
# from IPython.core import ultratb
# sys.excepthook = ultratb.FormattedTB(mode='Verbose',
#      color_scheme='Linux', call_pdb=1)


pla = Platform()


def setup_package():
    pla.init()


def teardown_package():
    pla.screenshot('latest_page.png')
    pla.fini()
