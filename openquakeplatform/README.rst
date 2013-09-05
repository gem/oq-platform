Openquake Platform
==================

You should write some docs, it's good for the soul.

Development Installation
------------------------

Clone the git repo::

    $ git clone https://github.com/gem/oq-platform -b geonode2-integration

Install PostgreSQL and PostGIS. For best results, stick with PostgreSQL 9.1
and PostGIS 1.5.

Install and run the application::

    $ mkvirtualenv platform  # or whatever you want to call it
    $ cd oq-platform
    $ pip install -e openquakeplatform  # installs `fabric` to enable `fab` commands (see below)
    $ cd openquakeplatform
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

To start the application::

    $ fab start

To clean and re-bootstrap the dev environment::

    $ fab clean  # removes the development database and user
    $ fab bootstrap
