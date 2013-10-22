#!/bin/bash

# To run tests, you'll need to have the `geonode` python package in your
# PYTHONPATH (for example, /var/lib/geonode/src/GeoNodePy), as well as the
# `oq-ui-api/geonode` package.
# Then, DJANGO_SETTINGS_MODULE="geonode.settings".
# Finally, active the geonode virtualenv:
#
# $ source /var/lib/geonode/bin/activate

python $(which nosetests) "$@" geonode/exposure/tests.py geonode/icebox/tests.py
