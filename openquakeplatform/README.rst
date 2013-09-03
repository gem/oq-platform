Openquakeplatform
========================

You should write some docs, it's good for the soul.

Installation
------------

Create the virtualenv and install the required dependencies::

    $ mkvirtualenv platform
    $ cd platform
    $ git clone https://github.com/gem/oq-platform -b geonode2-integration
    $ cd oq-platform
    $ pip install -e openquakeplatform

Then, setup Openquakeplatform for usage the first time::

    $ cd openquakeplatform
    $ paver setup # downloads geoserver
    
Create the database, setup geoserver, manage.py updatelayers


Usage
-----

Start the application::

    $ paver start 
