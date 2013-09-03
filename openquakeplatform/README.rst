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

    
Once that you have created the database (see the settings.py file), setup geoserver with the proper store, layers, workspaces and styles, run::

    $ python manage.py updatelayers


Usage
-----

Start the application (NOTE: it will run syncdb, start an instance of geoserver and a django development server)::

    $ paver start 
