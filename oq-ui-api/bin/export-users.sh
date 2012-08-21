#!/bin/bash
set -e
cd /var/lib/geonode/
source bin/activate
cd src/GeoNodePy/geonode/
export DJANGO_SCHEMATA_DOMAIN=django
# the name used by geonode-installation.sh is 'users_data.json'
python ./manage.py dumpdata --format=json auth
