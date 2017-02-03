#!/bin/bash

get -x

sudo apt-get update
sudo apt-get install -y build-essential libxml2-dev libxslt1-dev libpq-dev zlib1g-dev
sudo apt-get install -y python-dev python-imaging python-lxml python-pyproj python-shapely python-nose python-httplib2 python-pip python-virtualenv python-software-properties

sudo apt-get install -y postgresql-9.3-postgis-2.1 postgresql-9.3-postgis-scripts
sudo -u postgres createdb geonode_dev
sudo -u postgres createdb geonode_dev-imports
cat << EOF | sudo -u postgres psql
postgres
CREATE USER geonode_dev WITH PASSWORD 'geonode_dev';
GRANT ALL PRIVILEGES ON DATABASE "geonode_dev" to geonode_dev;
GRANT ALL PRIVILEGES ON DATABASE "geonode_dev-imports" to geonode_dev;
EOF


sudo -u postgres psql -d geonode_dev-imports -c 'CREATE EXTENSION postgis;'
sudo -u postgres psql -d geonode_dev-imports -c 'GRANT ALL ON geometry_columns TO PUBLIC;'
sudo -u postgres psql -d geonode_dev-imports -c 'GRANT ALL ON spatial_ref_sys TO PUBLIC;'

sudo sed '1 i local   all             all                                trust' /etc/postgresql/9.3/main/pg_hba.conf


sudo service postgresql restart
sudo apt-get install -y software-properties-common
#sudo apt-get install python-software-properties
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install -y oracle-java8-installer
sudo apt-get install -y git gettext libgdal-dev

sudo apt-get -y install python-pip
sudo pip install --upgrade pip


mkdir ~/dev
cd ~/dev
virtualenv env
source env/bin/activate
pip install pip -U

export CPLUS_INCLUDE_PATH=/usr/include/gdal
export C_INCLUDE_PATH=/usr/include/gdal
pip install gdal==1.10.0


git clone -b 2.5.x https://github.com/GeoNode/geonode.git
cd ~/dev/geonode/geonode
cp -a local_settings.py.geoserver.sample local_settings.py.geoserver

cd ~/dev/geonode
pip install -r requirements.txt
pip install -e .
pip install psycopg2==2.4.5
python manage.py syncdb --noinput
paver setup
paver sync
paver start -b 0.0.0.0:8000
