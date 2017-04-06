These are the main steps to install the OpenQuake Platform on Ubuntu 12.04 LTS using the Django development server

## Install the base dependencies

```bash
sudo apt-get install build-essential python-dev python-imaging python-virtualenv git postgresql-9.1 postgresql-server-dev-9.1 postgresql-contrib-9.1 postgresql-9.1-postgis openjdk-6-jre libxml2 libxml2-dev libxslt1-dev libxslt1.1 libblas-dev liblapack-dev curl wget xmlstarlet imagemagick gfortran python-nose libgeos-dev python-software-properties

```

## Change the PostgreSQL configuration

On top of `/etc/postgresql/9.1/main/pg_hba.conf` add:

```
local   all             all                                     trust
```

Then restart PostgreSQL: `sudo service postgresql restart`

## Clone the GitHub repo
```bash
cd ~
git clone http://github.com/gem/oq-platform.git
```

## Create the virtualenv
```bash
cd ~
virtualenv --system-site-packages platform-env
. platform-env/bin/activate
```

## Install software dependencies
### Install OpenQuake Engine and Hazardlib

```bash
sudo add-apt-repository -y ppa:openquake/ppa
sudo apt-get update
sudo apt-get install python-oq-engine
```

### Install OpenQuake Platform

```bash
cd ~/oq-platform
pip install -e openquakeplatform
```

### Install standalone apps

```bash 
# IPT
pip install https://github.com/gem/oq-platform-ipt/tarball/master
# Taxtweb
pip install https://github.com/gem/oq-platform-taxtweb/tarball/master
# Building class
pip install https://github.com/gem/oq-platform-building-class/tarball/master
```

## Per-user installation
If you want to have more than one running **oq-platform** on the same machine at the same time you can follow a *per-user* approach setting, for each user, a group of environment variables:

```GEM_DB_NAME```, ```GEM_DB_USER```, ```GEM_GEONODE_PORT``` and ```GEM_GEOSERVER_PORT```

and than excute ```fab``` commands as usual.

## Execute bootstrap
```bash
cd ~/oq-platform/openquakeplatform
fab bootstrap
```
And follow given instructions. At the end
```bash
fab stop
```

## Adjust the python configuration
```bash
cd ~/oq-platform/openquakeplatform/openquakeplatform
vim local_settings.py
```

## Start GeoServer and Django webserver
```bash
cd ~/oq-platform/openquakeplatform
fab start
```

