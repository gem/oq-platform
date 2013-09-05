import os
from urlparse import urljoin as _urljoin

from fabric.api import env
from fabric.api import local
from fabric.api import sudo
from fabric.api import settings

# NOTE(LB): This script is designed to be run only on the local machine.
env.hosts = ['localhost']
env.shell = '/bin/bash -c '

#: Base dir for postgis extension code
POSTGIS_DIR = '/usr/share/postgresql/9.1/contrib/postgis-1.5'
POSTGIS_FILES = [os.path.join(POSTGIS_DIR, f) for f in
                 ('postgis.sql', 'spatial_ref_sys.sql')]

GEOSERVER_BASE_URL = 'http://127.0.0.1:8080'
DB_PASSWORD = 'openquake'


def bootstrap(dbname='oqplatform', dbuser='oqplatform',
              dbpassword=DB_PASSWORD):
    """
    :param str dbpassword:
        Should match the one in settings.py.
    """
    # Create the user if it doesn't already exist
    # User will have superuser privileges for running
    # syncdb (part of `paver setup` below), etc.
    user_created = _maybe_createuser(dbuser, dbpassword)
    # Add database
    _maybe_createdb(dbname)
    # Add postgis
    _maybe_install_postgis(dbname)
    # Install geonode/geoserver and syncdb for oq-platform apps
    local('paver setup')

    # We need to start geoserver
    local('paver start')
    # GeoServer: create workspace
    _geoserver_api(
        'geoserver/rest/workspaces',
        '<workspace><name>oqplatform</name></workspace>'
    )
    # GeoServer: create store
    store_content = """\
<dataStore>
<name>oqplatform</name>
<connectionParameters>
     <host>localhost</host>
     <port>5432</port>
     <database>%(dbname)s</database>
     <schema>public</schema>
     <user>%(dbuser)s</user>
     <passwd>%(dbpassword)s</passwd>
     <dbtype>postgis</dbtype>
</connectionParameters>
</dataStore>"""
    store_content %= dict(dbname=dbname, dbuser=dbuser, dbpassword=dbpassword)

    _geoserver_api(
        'geoserver/rest/workspaces/oqplatform/datastores',
        store_content
    )

    # Add the isc_viewer app
    _add_isc_viewer()

    local('python manage.py updatelayers')
    # Finally, remove the superuser privileges, but only if this was a user we
    # created:
    if user_created:
        _pgquery('ALTER USER %s WITH NOSUPERUSER' % dbuser)


def clean(dbname='oqplatform', dbuser='oqplatform'):
    with settings(warn_only=True):
        _pgsudo('dropdb %s' % dbname)
        _pgsudo('dropuser %s' % dbuser)


def start():
    local('paver start')


def stop():
    local('paver stop')


def _pgsudo(command, **kwargs):
    # NOTE(LB): We change the directory here to avoid some login weirdness
    # with being unable to read the `fab` invoker's home dir.
    # Without this leading `cd /tmp && `, we get errors like this:
    # `could not change directory to "/home/lars"`
    # I observed this only on Linux, but not on OSX.
    return sudo('cd /tmp && ' + command, user='postgres', **kwargs)


def _pgquery(query):
    return _pgsudo('psql -t -c "%s" ' % query)


def _maybe_createuser(dbuser, dbpassword):
    """
    Returns `True` if the specified database user ``dbuser`` is create, `False`
    if it already exists.

    Note: The user will be created with superuser privileges, needed for
    syncdb, etc.
    """
    dbuser_exists = _pgsudo(
        "psql -c '\du' | awk '{print $1}' | grep %s | wc -l" % dbuser
    )
    dbuser_exists = int(dbuser_exists)
    if dbuser_exists:
        print('Database user "%s" already exists!' % dbuser)
        return False
    else:
        print('Creating user "%(dbuser)s". Please choose a password (it should'
              'match your settings.py). Recommended: "%(dbpassword)s".'
              % dict(dbuser=dbuser, dbpassword=DB_PASSWORD))
        _pgsudo('createuser --superuser --password %(dbuser)s'
                % dict(dbpassword=dbpassword, dbuser=dbuser))
        _pgquery('ALTER USER %s WITH SUPERUSER' % dbuser)
        return True


def _maybe_createdb(dbname):
    """
    Returns `True` if the specified database ``dbname`` is created, `False` if
    it already exists.
    """
    dbs = _pgquery('SELECT datname FROM pg_database')
    dbs = dbs.split('\n')
    dbs = [x.strip() for x in dbs]
    if dbname in dbs:
        print('Database "%s" already exists!' % dbname)
        return False
    else:
        _pgsudo('createdb %s' % dbname)
        return True


def _maybe_install_postgis(dbname):
    """
    Return `True` if this function decides to install PostGIS, `False` if they
    are already installed for the given ``dbname``.
    """
    # Check if postgis is installed:
    with settings(warn_only=True):
        postgis_version = _pgquery('SELECT PostGIS_full_version()')

    if 'error' in postgis_version.lower():
        # No PostGIS installed
        print('PostGIS extensions are not installed in database "%s"!'
              ' Installing...' % dbname)
        if not all([os.path.exists(f) for f in POSTGIS_FILES]):
            # If postgis extensions are not found, raise and error
            raise RuntimeError('PostGIS extensions not found in "%s"!'
                               % POSTGIS_DIR)
        for postgis_file in POSTGIS_FILES:
            _pgsudo(
                'psql -f %(file)s -d %(dbname)s -q' %
                dict(file=postgis_file, dbname=dbname)
            )
        return True
    else:
        print('PostGIS extensions are already installed in database "%s"!'
              % dbname)
        return False


def _add_isc_viewer():
    _create_isc_viewer_layers()
    _load_isc_viewer_data()


def _load_isc_viewer_data():
    local('python manage.py import_isccsv ../oq-ui-api/data/isc_data.csv'
          ' ../oq-ui-api/data/isc_data_app.csv')


def _create_isc_viewer_layers(workspace='oqplatform', datastore='oqplatform'):
    # RAGE: Apparently, you can't actually create layers with the geoserver
    # rest API. If you try to POST to it, you just get a 405. But it's okay,
    # the 405 is well documented. >:(
    # No, instead you need to create a "featuretype", which implicitly creates
    # a layer. The docs fail to mention this.
    url = 'geoserver/rest/workspaces/%(ws)s/datastores/%(ds)s/featuretypes.xml'
    url %= dict(ws=workspace, ds=datastore)

    feature_file = 'gs_data/isc_viewer/features/isc_viewer_measure.xml'
    with open(feature_file) as fh:
        content = fh.read()
    _geoserver_api(url, content)


def _geoserver_api(url, content, base_url=GEOSERVER_BASE_URL, username='admin',
                   password='geoserver', method='POST'):
    """
    Utility for creating various artifacts in geoserver (workspaces, layers,
    etc.).
    """
    # TODO(LB): It would be cleaner to use urllib2 or similar in pure Python,
    # but it was quicker to make this work just with curl.
    cmd = ("curl -u %(username)s:%(password)s -v -X%(method)s -H "
           "'Content-type:text/xml' -d '%(content)s' %(url)s")
    cmd %= dict(username=username, password=password, content=content,
                url=_urljoin(base_url, url), method=method)
    local(cmd)
