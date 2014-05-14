# -*- coding: utf-8 -*-

# Django settings for the Openquake Platform project.
import os
import geonode

try:
    from geonode.settings import *
except ImportError:
    RaiseException ("Error!")

try:
    from local_settings import *
except ImportError:
    pass
