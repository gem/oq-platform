These are the main steps to install the OpenQuake Platform on Ubuntu 12.04 LTS using the Django development server

## Install the base dependencies

```bash
sudo apt-get install build-essential python-dev python-mock python-imaging python-virtualenv git postgresql-9.1 postgresql-server-dev-9.1 postgresql-contrib-9.1 postgresql-9.1-postgis openjdk-6-jre libxml2 libxml2-dev libxslt1-dev libxslt1.1 libblas-dev liblapack-dev curl wget xmlstarlet imagemagick gfortran python-nose libgeos-dev
```

### Install optional dependencies to be able to use nrml validator from risklib package

#### Using a virtualenv with access to the global site-packages

```bash
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:openquake/ppa
sudo apt-get update
sudo apt-get install python-decorator python-h5py python-psutil python-concurrent.futures

pip install 'http://github.com/gem/oq-hazardlib/tarball/master'
pip install 'http://github.com/gem/oq-engine/tarball/master'

# OR download 'oq-hazardlib' and 'oq-engine' manually from github and make available via PYTHONPATH
# before run any python applications
```

#### Using a virtualenv without access to the global site-packages

```bash
# you can install all required packages using pip:
pip install futures
pip install decorator
pip install psutil
pip install Cython
pip install h5py
pip install selenium
pip install nose
pip install 'http://github.com/gem/oq-hazardlib/tarball/master'
pip install 'http://github.com/gem/oq-engine/tarball/master'

```

## Change the PostgreSQL configuration

On top the `pg_hba.conf` add:

```
local   all             all                                     trust
```

Then restart PostgreSQL

## Clone the GitHub repo
```bash
git clone http://github.com/gem/oq-platform.git
```

## Create the virtualenv
```bash
cd ~/oq-platform
virtualenv --system-site-packages platform-env
. platform-env/bin/activate
```
## Install the software local dependencies
```bash
cd ~/oq-platform
# Workaround for https://github.com/scipy/scipy/pull/453
pip install numpy==1.6.1
pip install -e openquakeplatform
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
fab start
```

