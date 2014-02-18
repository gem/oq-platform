Openquake Platform
==================

Development Installation
------------------------

Install the following dependencies::

    for Ubuntu: build-essential python-dev python-virtualenv virtualenvwrapper git postgresql-9.1 postgresql-server-dev-9.1 postgresql-9.1-postgis openjdk-6-jre libxml2 libxml2-dev libxslt1-dev libxslt1.1 libblas-dev liblapack-dev curl wget xmlstarlet
Create a virtual environment::

    $ mkvirtualenv platform  # or whatever you want to call it

Clone the git repo::

    $ git clone https://github.com/gem/oq-platform -b geonode2-integration

Change directory to the downloaded repository directory::

    $ cd oq-platform

Initialize submodules::

    $ git submodule init
    $ git submodule update

Install PostgreSQL and PostGIS. For best results, stick with PostgreSQL 9.1
and PostGIS 1.5.

Install and run the application::

    $ pip install -e openquakeplatform  # installs `fabric` to enable `fab` commands (see below)

    $ cd openquakeplatform

(Optional.) Set Global Exposure Database (GED) settings. Copy the sample config
file and customize the settings according to your database configuration::

    $ cp openquakeplatform/ged_settings.py.sample openquakeplatform/ged_settings.py

Set create and start dev environment::

    $ fab bootstrap  # automatically runs the app

Once this is once is done, you can run several other `fab` commands. See below.

Usage
-----

Once your development environment is set up, you can just run the application
from the `openquakeplatform` dir in the root of the git clone::

    $ source /usr/local/bin/virtualenvwrapper.sh  # to enable venv
    $ workon platform  # activate virtualenv
    $ fab start

To stop the application at any time::

    $ fab stop

To re-start the application::

    $ fab start

To stop, clean, and re-bootstrap the dev environment::

    $ fab stop clean bootstrap  # removes the development database and user
