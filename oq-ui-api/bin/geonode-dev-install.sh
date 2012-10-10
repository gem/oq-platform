#!/bin/bash

# Python native dependencies
sudo apt-get install python-virtualenv python-imaging python-lxml python-pyproj python-shapely python-nose python-httplib2

# Java dependencies
sudo apt-get install -y --force-yes openjdk-6-jdk ant maven2 --no-install-recommends

# Supporting tools
sudo apt-get install -y  git gettext

# Create virtualenv and activate it
virtualenv venv --system-site-packages
source venv/bin/activate

# Clone GeoNode and switch to dev branch
git clone https://github.com/GeoNode/geonode.git -b dev

# Install GeoNode in the local virtualenv
pip install -e geonode --use-mirrors

cd geonode

# Compile GeoServer
paver setup

# Start the servers
paver start -b 0.0.0.0:8000
