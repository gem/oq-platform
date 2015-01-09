#!/bin/bash

# Copyright (c) 2015, GEM Foundation.
#
# OpenQuake is free software: you can redistribute it and/or modify it
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# OpenQuake is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with OpenQuake.  If not, see <http://www.gnu.org/licenses/>.

### Please note
# This scripts removes an old OpenQuake platform installation
# made using the deploy.sh script and the GeoNode ppa.
# Use it carefully.
###

set -x

# You must be root
if [ $(id -u) -gt 0 ]; then
    echo >&2 "Please use 'sudo ./$0'"
    exit 1
fi

# Stop services
service tomcat7 stop
service apache2 stop

# Remove deb packages
apt-get remove --purge -y geonode geoserver-geonode

# Remove pip packages (geonode is not removed by apt-get)
pip uninstall -y openquakeplatform
pip uninstall -y geonode

# Cleanup the DB
sudo -u postgres dropdb geonode
sudo -u postgres dropdb openquakeplatform
sudo -u postgres dropuser geonode
sudo -u postgres dropuser openquakeplatform

# Remove leaves
rm -Rf /var/www/geonode/ /var/www/openquake/ /etc/openquake/ /usr/local/lib/python2.7/dist-packages/openquakeplatform* /usr/local/lib/python2.7/dist-packages/geonode /usr/share/geonode
rm -f /etc/apache2/sites-available/oqplatform /etc/apache2/sites-enabled/*

