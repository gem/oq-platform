#!/bin/bash

set -x

#install essential lib and python
sudo apt-get update
sudo apt-get install -y build-essential libxml2-dev libxslt1-dev libpq-dev zlib1g-dev
sudo apt-get install -y python-dev python-imaging python-lxml python-pyproj python-shapely python-nose python-httplib2 python-pip python-virtualenv python-software-properties

#install and configuration postgres
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

#insert line in pg_hba.conf postgres
sudo sed '1 i local   all             all                                trust' /etc/postgresql/9.3/main/pg_hba.conf

#restart postgres
sudo service postgresql restart

#install java8
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:webupd8team/java
sudo apt-get update
echo "oracle-java8-installer shared/accepted-oracle-license-v1-1 select true" | sudo debconf-set-selections
sudo apt-get install -y oracle-java8-installer
sudo apt-get install -y git gettext libgdal-dev

#install pip
sudo apt-get -y install python-pip
sudo pip install --upgrade pip

#create folder and virtual env
mkdir ~/dev
cd ~/dev
virtualenv env
source env/bin/activate
pip install pip -U

#install gdal
export CPLUS_INCLUDE_PATH=/usr/include/gdal
export C_INCLUDE_PATH=/usr/include/gdal
pip install gdal==1.10.0

#clone geonode from official repo github
git clone -b 2.5.x https://github.com/GeoNode/geonode.git
cd ~/dev/geonode/geonode
cp -a local_settings.py.geoserver.sample local_settings.py

#set and start geonode
cd ~/dev/geonode
pip install -r requirements.txt
pip install -e .
pip install psycopg2==2.4.5
python manage.py syncdb --noinput
paver setup
paver sync
paver start -b 0.0.0.0:8000

