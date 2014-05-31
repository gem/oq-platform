import os
import sys
import string
import random

from urlparse import urljoin as _urljoin

from openquakeplatform.geoserver_api import (
    GEOSERVER_BASE_URL, WS_NAME, DS_NAME, FEATURETYPES_URL,
    WS_NAME, DS_NAME, XML_CONTENT_TYPE, SLD_CONTENT_TYPE)


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
POSTGIS_DIR = '/Applications/Postgres.app/Contents/MacOS/share/contrib/postgis-2.0'
POSTGIS_FILES = [os.path.join(POSTGIS_DIR, f) for f in
                 ('postgis.sql', 'spatial_ref_sys.sql')]


DB_PASSWORD = 'openquake'

PYTHON_TEST_LIBS = ['mock', 'nose', 'coverage' ]

#: Template for local_settings.py
GEM_LOCAL_SETTINGS_TMPL = 'openquakeplatform/local_settings.py.template'


def bootstrap(db_name='oqplatform', db_user='oqplatform',
              db_pass=DB_PASSWORD, host='oq-platform',
              hazard_calc_addr='http://oq-platform:8800',
              risk_calc_addr='http://oq-platform:8800',
              oq_engserv_key='oq-platform',
              mediaroot='/tmp', staticroot='/home'):

    """
    :param str db_pass:
        Should match the one in settings.py.
    """
    # check for xmlstarlet installation
    local("which xmlstarlet")

    oq_secret_key=''.join(random.choice(string.ascii_letters + string.digits +
    '%$&()=+-|#@?') for _ in range(50))

    baseenv(db_name=db_name, db_user=db_user, db_pass=db_pass,
            host=host, hazard_calc_addr=hazard_calc_addr,
            risk_calc_addr=risk_calc_addr, oq_engserv_key=oq_engserv_key,
            oq_secret_key=oq_secret_key, mediaroot=mediaroot,
            staticroot=staticroot)

    # fix it in a proper way
    apps(db_name, db_user, db_pass)

    # Install the libs needs to `test` and `test_with_xunit`:
    local('ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future pip install %s' % ' '.join(PYTHON_TEST_LIBS))

    # Finally, remove the superuser privileges, but only if this was a user we
    # created:
    # TODO: Some apps require that oqplatform db user has SUPERUSER.
    # We need to deal with this in production. For a dev install,
    # leave the user with superuser privs.
    #if user_created:
    #    _pgquery('ALTER USER %s WITH NOSUPERUSER' % db_user)

def baseenv(
            host, hazard_calc_addr, risk_calc_addr, oq_engserv_key, oq_secret_key,
            db_name='oqplatform', db_user='oqplatform', db_pass=DB_PASSWORD,
            mediaroot='/tmp', staticroot='/home'):
    _write_local_settings(db_name,  db_user, db_pass, host, hazard_calc_addr, risk_calc_addr, oq_engserv_key, oq_secret_key, mediaroot, staticroot)
    # Create the user if it doesn't already exist
    # User will have superuser privileges for running
    # syncdb (part of `paver setup` below), etc.
    user_created = _maybe_createuser(db_user, db_pass)
    # Add database
    _maybe_createdb(db_name)
    # Add postgis
    _maybe_install_postgis(db_name)
    # Install geonode/geoserver and syncdb for oq-platform apps
    setup()

    # We need to start geoserver
    init_start()

APPS_LIST=['isc_viewer', 'faulted_earth', 'ghec_viewer', 'gaf_viewer',
           'econd', 'weblib', 'gemecdwebsite', 'icebox']

def apps(db_name, db_user, db_pass):
    globs = globals()
    apps_list=""
    # Add the apps
    for app in APPS_LIST:
        apps_list += " '"+app+"'"
        try:
            add_fn = globs["_add_" + app]
        except KeyError:
            pass
        else:
            add_fn()

    local("openquakeplatform/bin/oq-gs-builder.sh populate 'openquakeplatform/' 'openquakeplatform/' 'openquakeplatform/bin' 'oqplatform' 'oqplatform' '" + db_name + "' '" + db_user + "' '" + db_pass + "' 'geoserver/data' " + apps_list)
    local('openquakeplatform/bin/oq-gs-builder.sh drop')
    local("openquakeplatform/bin/oq-gs-builder.sh restore 'openquakeplatform/build-gs-tree'")
    local('python manage.py updatelayers')


def clean(db_name='oqplatform', db_user='oqplatform'):
    with settings(warn_only=True):
        _pgsudo('dropdb %s' % db_name)
        _pgsudo('dropuser %s' % db_user)
        local('rm -r geoserver')


def setup():
    local('paver setup')


def init_start():
    local('paver init_start -b 0.0.0.0:8000')


def start():
    local('paver start -b 0.0.0.0:8000')


def stop():
    local('paver stop')


def test():
    local('./run_tests.sh -v --with-coverage '
          '--cover-package=openquakeplatform')


def test_with_xunit():
    """
    Same as :func:`test`, but outputs test results to a file.
    """
    local('./run_tests.sh -v --with-coverage '
          '--cover-package=openquakeplatform --with-xunit '
          '--xunit-file=../nosetests.xml')


def _write_local_settings(db_name, db_user, db_pass, host, hazard_calc_addr, risk_calc_addr, oq_engserv_key, oq_secret_key, mediaroot, staticroot):
    local_settings = open(GEM_LOCAL_SETTINGS_TMPL, 'r').read()
    with open('openquakeplatform/local_settings.py', 'w') as fh:
        fh.write(local_settings % dict(db_name=db_name,
                                       db_user=db_user,
                                       db_pass=db_pass,
                                       host=host,
                                       hazard_calc_addr=hazard_calc_addr,
                                       risk_calc_addr=risk_calc_addr,
                                       oq_engserv_key=oq_engserv_key,
                                       oq_secret_key=oq_secret_key,
                                       mediaroot=mediaroot,
                                       staticroot=staticroot))


def _pgsudo(command, **kwargs):
    # NOTE(LB): We change the directory here to avoid some login weirdness
    # with being unable to read the `fab` invoker's home dir.
    # Without this leading `cd /tmp && `, we get errors like this:
    # `could not change directory to "/home/lars"`
    # I observed this only on Linux, but not on OSX.
    return sudo('cd /tmp && ' + command, user='bmwyss', **kwargs)


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


def _do_curl(cmd):
    with hide('stderr', 'stdout', 'running'):
        result = run(cmd)
    http_resp = [x for x in result.split('\n') if '< HTTP' in x]
    for resp in http_resp:
        print(resp)


def _maybe_createuser(db_user, db_pass):
    """
    Returns `True` if the specified database user ``db_user`` is create, `False`
    if it already exists.

    Note: The user will be created with superuser privileges, needed for
    syncdb, etc.
    """
    db_user_exists = _pgsudo(
        "psql -c '\du' | awk '{print $1}' | grep %s | wc -l" % db_user
    )
    db_user_exists = int(db_user_exists)
    if db_user_exists:
        print('Database user "%s" already exists!' % db_user)
        return False
    else:
        print('Creating user "%(db_user)s" with password "%(db_pass)s.'
              % dict(db_user=db_user, db_pass=DB_PASSWORD))
        _pgquery("CREATE ROLE %(db_user)s ENCRYPTED PASSWORD '%(db_pass)s' SUPERUSER CREATEDB NOCREATEROLE INHERIT LOGIN" % dict(db_user=db_user, db_pass=DB_PASSWORD))
        return True


def _maybe_createdb(db_name):
    """
    Returns `True` if the specified database ``db_name`` is created, `False` if
    it already exists.
    """
    dbs = _pgquery('SELECT datname FROM pg_database')
    dbs = dbs.split('\n')
    dbs = [x.strip() for x in dbs]
    if db_name in dbs:
        print('Database "%s" already exists!' % db_name)
        return False
    else:
        _pgsudo('createdb %s' % db_name)
        return True


def _maybe_install_postgis(db_name):
    """
    Return `True` if this function decides to install PostGIS, `False` if they
    are already installed for the given ``db_name``.
    """
    # Check if postgis is installed:
    with settings(warn_only=True):
        postgis_version = _pgquery('SELECT PostGIS_full_version()')

    if 'error' in postgis_version.lower():
        # No PostGIS installed
        print('PostGIS extensions are not installed in database "%s"!'
              ' Installing...' % db_name)
        if not all([os.path.exists(f) for f in POSTGIS_FILES]):
            # If postgis extensions are not found, raise and error
            raise RuntimeError('PostGIS extensions not found in "%s"!'
                               % POSTGIS_DIR)
        for postgis_file in POSTGIS_FILES:
            _pgsudo(
                'psql -f %(file)s -d %(db_name)s -q' %
                dict(file=postgis_file, db_name=db_name)
            )
        return True
    else:
        print('PostGIS extensions are already installed in database "%s"!'
              % db_name)
        return False


def _add_isc_viewer():
    local('python manage.py import_isccsv ./openquakeplatform/isc_viewer/dev_data/isc_data.csv'
          ' ./openquakeplatform/isc_viewer/dev_data/isc_data_app.csv')


def _add_icebox():
    pass

def _add_faulted_earth():
    pass


def _add_ghec_viewer():
    local('python manage.py import_gheccsv ./openquakeplatform/ghec_viewer/dev_data/ghec_data.csv')


def _add_gaf_viewer():
    local('python manage.py import_gaf_fs_csv '
          './openquakeplatform/gaf_viewer/dev_data/gaf_data_fs.csv')
    local('python manage.py import_gaf_ft_csv '
          './openquakeplatform/gaf_viewer/dev_data/gaf_data_ft.csv')

def _add_econd():
    local('cat openquakeplatform/econd/sql.d/*.sql | sudo -u bmwyss psql -e -U oqplatform oqplatform')
    local('openquakeplatform/econd/bin/photo_synt.sh openquakeplatform/econd/data/photo_synt_list.csv openquakeplatform/econd/data/placeholder.png openquakeplatform/uploaded')

def _add_weblib():
    pass

def _add_gemecdwebsite():
    pass

