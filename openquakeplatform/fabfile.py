import os
import sys
from urlparse import urljoin as _urljoin

from fabric.api import env
from fabric.api import local
from fabric.api import run
from fabric.api import settings
from fabric.api import sudo
from fabric.context_managers import hide

# NOTE(LB): This script is designed to be run only on the local machine.
env.hosts = ['localhost']

# NOTE(LB): There are some minor differences with respect to how OSX and Linux
# shells behave. Thus the following is required:
if 'linux' in sys.platform:
    # This script works on OSX with the default shell, but Linux has trouble
    # with the default `-l` option. So, we drop it.
    env.shell = '/bin/bash -c'

#: Base dir for postgis extension code
POSTGIS_DIR = '/usr/share/postgresql/9.1/contrib/postgis-1.5'
POSTGIS_FILES = [os.path.join(POSTGIS_DIR, f) for f in
                 ('postgis.sql', 'spatial_ref_sys.sql')]

GEOSERVER_BASE_URL = 'http://127.0.0.1:8080/geoserver/rest/'
#: GeoServer workspace name
WS_NAME = 'oqplatform'
#: GeoServer datastore name
DS_NAME = 'oqplatform'
FEATURETYPES_URL = ('workspaces/%(ws)s/datastores/%(ds)s/featuretypes.xml'
                    % dict(ws=WS_NAME, ds=DS_NAME))

XML_CONTENT_TYPE = 'text/xml'
SLD_CONTENT_TYPE = 'application/vnd.ogc.sld+xml'

DB_PASSWORD = 'openquake'

#: Template for local_settings.py
LOCAL_SETTINGS = """\
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': "%(dbname)s",
        'USER': '%(dbuser)s',
        'PASSWORD': '%(dbpassword)s'
    },
}
"""


def bootstrap(dbname='oqplatform', dbuser='oqplatform',
              dbpassword=DB_PASSWORD):
    """
    :param str dbpassword:
        Should match the one in settings.py.
    """
    baseenv(dbname=dbname, dbuser=dbuser, dbpassword=dbpassword)
    apps()
    # Finally, remove the superuser privileges, but only if this was a user we
    # created:
    # TODO: Some apps require that oqplatform db user has SUPERUSER.
    # We need to deal with this in production. For a dev install,
    # leave the user with superuser privs.
    #if user_created:
    #    _pgquery('ALTER USER %s WITH NOSUPERUSER' % dbuser)


def baseenv(dbname='oqplatform', dbuser='oqplatform', dbpassword=DB_PASSWORD):
    _write_local_settings(dbname, dbuser)
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
        'workspaces.xml',
        '<workspace><name>%s</name></workspace>' % WS_NAME,
        message='Creating workspace...'
    )
    # GeoServer: create store
    store_content = """\
<dataStore>
<name>%(dsname)s</name>
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
    store_content %= dict(dsname=DS_NAME, dbname=dbname, dbuser=dbuser,
                          dbpassword=dbpassword)

    _geoserver_api(
        'workspaces/%s/datastores.xml' % WS_NAME,
        store_content, message='Creating workspace...'
    )


def apps():
    # Add the apps
    _add_isc_viewer()
    _add_faulted_earth()
    _add_ghec_viewer()

    local('python manage.py updatelayers')


def clean(dbname='oqplatform', dbuser='oqplatform'):
    with settings(warn_only=True):
        _pgsudo('dropdb %s' % dbname)
        _pgsudo('dropuser %s' % dbuser)
        local('rm -r geoserver')


def start():
    local('paver start')


def stop():
    local('paver stop')


def _write_local_settings(dbname, dbuser):
    with open('openquakeplatform/local_settings.py', 'w') as fh:
        fh.write(LOCAL_SETTINGS % dict(dbname=dbname,
                                       dbuser=dbuser,
                                       dbpassword=DB_PASSWORD))


def _pgsudo(command, **kwargs):
    # NOTE(LB): We change the directory here to avoid some login weirdness
    # with being unable to read the `fab` invoker's home dir.
    # Without this leading `cd /tmp && `, we get errors like this:
    # `could not change directory to "/home/lars"`
    # I observed this only on Linux, but not on OSX.
    return sudo('cd /tmp && ' + command, user='postgres', **kwargs)


def _pgquery(query):
    return _pgsudo('psql -t -c "%s" ' % query)


def _geoserver_api(url, content, base_url=GEOSERVER_BASE_URL, username='admin',
                   password='geoserver', method='POST',
                   content_type=XML_CONTENT_TYPE, message=None):
    """
    Utility for creating various artifacts in geoserver (workspaces, layers,
    etc.).
    """
    if message:
        print('> GeoServer(%(meth)s): %(msg)s'
              % dict(meth=method, msg=message))

    # TODO(LB): It would be cleaner to use urllib2 or similar in pure Python,
    # but it was quicker to make this work just with curl.
    cmd = ("curl -u %(username)s:%(password)s -v -X%(method)s -H "
           "'Content-type:%(content_type)s' -d '%(content)s' %(url)s")
    cmd %= dict(username=username, password=password, content=content,
                url=_urljoin(base_url, url), method=method,
                content_type=content_type)

    _do_curl(cmd)


def _geoserver_api_from_file(url, file_path, base_url=GEOSERVER_BASE_URL,
                             username='admin', password='geoserver',
                             method='POST', content_type=XML_CONTENT_TYPE,
                             message=None):
    # Since we are using fabric's `run`, the file path needs to be absolute.
    # `run` performs a login and thus changes the working directory.
    file_path = os.path.abspath(file_path)

    cmd = ("curl -u %(username)s:%(password)s -v -X%(method)s -H "
           "'Content-type:%(content_type)s' -d @%(file_path)s %(url)s")
    cmd %= dict(username=username, password=password, file_path=file_path,
                url=_urljoin(base_url, url), method=method,
                content_type=content_type)

    _do_curl(cmd)


def _do_curl(cmd):
    with hide('stderr', 'stdout', 'running'):
        result = run(cmd)
    http_resp = [x for x in result.split('\n') if '< HTTP' in x]
    for resp in http_resp:
        print(resp)


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
              'match your local_settings.py). Recommended: "%(dbpassword)s".'
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


def _collect(directory, ext='xml'):
    """
    Given a directory, collect all .xml (or whatever type) files in the
    directory (not recursive) and return as a list of absolute file paths.
    """
    ext = ext.lower()

    return [os.path.abspath(os.path.join(directory, x))
            for x in os.listdir(directory)
            if x.lower().endswith('.%s' % ext)]


def _add_isc_viewer():
    feature_file = 'gs_data/isc_viewer/features/isc_viewer_measure.xml'
    _geoserver_api_from_file(FEATURETYPES_URL, feature_file,
                             message='Creating isc_viewer layer...')

    # Style:
    style_xml = 'gs_data/isc_viewer/styles/isc_viewer_measure.xml'
    _geoserver_api_from_file(
        'styles.xml',
        style_xml,
        message='Creating isc_viewer style...'
    )
    style_sld = 'gs_data/isc_viewer/styles/isc_viewer_measure.sld'
    _geoserver_api_from_file(
        'styles/isc_viewer_measure.sld',
        style_sld,
        method='PUT',
        content_type=SLD_CONTENT_TYPE,
        message='Creating isc_viewer SLD...'
    )

    # Update layer with new style:
    layer_file = 'gs_data/isc_viewer/layers/isc_viewer_measure.xml'
    _geoserver_api_from_file(
        'layers/%s:isc_viewer_measure' % WS_NAME,
        layer_file,
        method='PUT',
        message='Updating isc_viewer layer...'
    )

    local('python manage.py import_isccsv ../oq-ui-api/data/isc_data.csv'
          ' ../oq-ui-api/data/isc_data_app.csv')


def _add_faulted_earth():
    # Add faulted_earth features/layers
    features_dir = 'gs_data/faulted_earth/features'
    features_files = _collect(features_dir)
    for ff in features_files:
        _geoserver_api_from_file(FEATURETYPES_URL, ff,
                                 message='Creating faulted_earth layer...')

    # Add styles:
    styles_dir = 'gs_data/faulted_earth/styles'
    styles_files = _collect(styles_dir)
    sld_files = _collect(styles_dir, ext='sld')
    for style, sld in zip(styles_files, sld_files):
        # XML first:
        _geoserver_api_from_file(
            'styles.xml',
            style,
            message='Creating faulted_earth style...'
        )

        # Then update (PUT) the SLD:
        sld_basename = os.path.basename(sld)
        _geoserver_api_from_file(
            'styles/%s' % sld_basename,
            sld,
            method='PUT',
            message='Creating faulted_earth SLD...'
        )

    # Finally, update the layer with the correct style:
    layer_files = _collect('gs_data/faulted_earth/layers')
    for layer in layer_files:
        layer_basename = os.path.basename(layer)
        layer_name = os.path.splitext(layer)
        _geoserver_api_from_file(
            'layers/%(ws)s:%(layer)s' % dict(ws=WS_NAME, layer=layer_name),
            layer_basename,
            method='PUT',
            message='Updating faulted_earth layer...'
        )


def _add_ghec_viewer():
    # Feature:
    feature_file = 'gs_data/ghec_viewer/features/ghec_viewer_measure.xml'
    _geoserver_api_from_file(FEATURETYPES_URL, feature_file,
                             message='Creating ghec_viewer layer...')

    # Style:
    style_xml = 'gs_data/ghec_viewer/styles/ghec_viewer_measure.xml'
    _geoserver_api_from_file(
        'styles.xml',
        style_xml,
        message='Creating ghec_viewer style...'
    )
    style_sld = 'gs_data/ghec_viewer/styles/ghec_viewer_measure.sld'
    _geoserver_api_from_file(
        'styles/ghec_viewer_measure.sld',
        style_sld,
        method='PUT',
        content_type=SLD_CONTENT_TYPE,
        message='Creating ghec_viewer SLD...'
    )

    # Update the layer/feature with the new style.
    layer_file = 'gs_data/ghec_viewer/layers/ghec_viewer_measure.xml'
    _geoserver_api_from_file(
        'layers/%s:ghec_viewer_measure' % WS_NAME,
        layer_file,
        method='PUT',
        message='Updating ghec_viewer layer...'
    )

    local('python manage.py import_gheccsv ../oq-ui-api/data/ghec_data.csv')
