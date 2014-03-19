import os
import sys
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
POSTGIS_DIR = '/usr/share/postgresql/9.1/contrib/postgis-1.5'
POSTGIS_FILES = [os.path.join(POSTGIS_DIR, f) for f in
                 ('postgis.sql', 'spatial_ref_sys.sql')]


DB_PASSWORD = 'openquake'

PYTHON_TEST_LIBS = ['mock', 'nose', 'coverage' ]

#: Template for local_settings.py
GEM_LOCAL_SETTINGS_TMPL = 'openquakeplatform/local_settings.py.template'


def bootstrap(dbname='oqplatform', dbuser='oqplatform',
              dbpass=DB_PASSWORD, host='oq-platform',
              hazard_calc_addr='http://oq-platform:8800',
              risk_calc_addr='http://oq-platform:8800',
              oq_engserv_key='oq-platform'):

    """
    :param str dbpass:
        Should match the one in settings.py.
    """
    # check for xmlstarlet installation
    local("which xmlstarlet")

    baseenv(dbname=dbname, dbuser=dbuser, dbpassword=dbpassword,
            siteurl=siteurl, hazard_calc_addr=hazard_calc_addr,
            risk_calc_addr=risk_calc_addr, oq_engserv_key=oq_engserv_key)
    # fix it in a proper way
    apps()

    # Install the libs needs to `test` and `test_with_xunit`:
    local('pip install %s' % ' '.join(PYTHON_TEST_LIBS))

    # Finally, remove the superuser privileges, but only if this was a user we
    # created:
    # TODO: Some apps require that oqplatform db user has SUPERUSER.
    # We need to deal with this in production. For a dev install,
    # leave the user with superuser privs.
    #if user_created:
    #    _pgquery('ALTER USER %s WITH NOSUPERUSER' % dbuser)

def baseenv(siteurl, hazard_calc_addr, risk_calc_addr, oq_engserv_key,
            dbname='oqplatform', dbuser='oqplatform', dbpassword=DB_PASSWORD):
    _write_local_settings(dbname, dbuser, dbpassword, siteurl, hazard_calc_addr, risk_calc_addr, oq_engserv_key)
    # Create the user if it doesn't already exist
    # User will have superuser privileges for running
    # syncdb (part of `paver setup` below), etc.
    user_created = _maybe_createuser(dbuser, dbpass)
    # Add database
    _maybe_createdb(dbname)
    # Add postgis
    _maybe_install_postgis(dbname)
    # Install geonode/geoserver and syncdb for oq-platform apps
    setup()

    # We need to start geoserver
    init_start()

    geoserver_init(dbname=dbname, dbuser=dbuser, dbpassword=dbpassword)


def geoserver_init(dbname='oqplatform', dbuser='oqplatform', dbpassword=DB_PASSWORD):
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
    _add_gaf_viewer()
    _add_econd()
    _add_weblib()
    _add_gemecdwebsite()
    add_icebox()

    local('openquakeplatform/bin/oq-gs-builder.sh drop')
    local('openquakeplatform/bin/oq-gs-builder.sh restore gs_data')
    local('python manage.py updatelayers')


def clean(dbname='oqplatform', dbuser='oqplatform'):
    with settings(warn_only=True):
        _pgsudo('dropdb %s' % dbname)
        _pgsudo('dropuser %s' % dbuser)
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


def _write_local_settings(dbname, dbuser, dbpassword, siteurl, hazard_calc_addr, risk_calc_addr, oq_engserv_key):
    local_settings = open(GEM_LOCAL_SETTINGS_TMPL, 'r').read()
    with open('openquakeplatform/local_settings.py', 'w') as fh:
        fh.write(local_settings % dict(dbname=dbname,
                                       dbuser=dbuser,
                                       dbpass=dbpass,
                                       host=host,
                                       hazard_calc_addr=hazard_calc_addr,
                                       risk_calc_addr=risk_calc_addr,
                                       oq_engserv_key=oq_engserv_key))


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


def _do_curl(cmd):
    with hide('stderr', 'stdout', 'running'):
        result = run(cmd)
    http_resp = [x for x in result.split('\n') if '< HTTP' in x]
    for resp in http_resp:
        print(resp)


def _maybe_createuser(dbuser, dbpass):
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
        print('Creating user "%(dbuser)s" with password "%(dbpass)s.'
              % dict(dbuser=dbuser, dbpass=DB_PASSWORD))
        _pgquery("CREATE ROLE %(dbuser)s ENCRYPTED PASSWORD '%(dbpass)s' SUPERUSER CREATEDB NOCREATEROLE INHERIT LOGIN" % dict(dbuser=dbuser, dbpass=DB_PASSWORD))
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
    local('python manage.py import_isccsv ../oq-ui-api/data/isc_data.csv'
          ' ../oq-ui-api/data/isc_data_app.csv')


def add_icebox():
    local('mkdir -p ./geoserver/data/templates/')
    local('cp ./gs_data/icebox/content.ftl ./geoserver/data/templates/')


def _add_faulted_earth():
    pass


def _add_ghec_viewer():
    local('python manage.py import_gheccsv ../oq-ui-api/data/ghec_data.csv')


def _add_gaf_viewer():
    local('python manage.py import_gaf_fs_csv '
          '../oq-ui-api/data/gaf_data_fs.csv')
    local('python manage.py import_gaf_ft_csv '
          '../oq-ui-api/data/gaf_data_ft.csv')

def _add_econd():
    local('cat openquakeplatform/econd/sql.d/*.sql | sudo -u postgres psql -e -U oqplatform oqplatform')
    local('openquakeplatform/econd/bin/photo_synt.sh openquakeplatform/econd/data/photo_synt_list.csv openquakeplatform/econd/data/placeholder.png openquakeplatform/uploaded')

def _add_weblib():
    pass

def _add_gemecdwebsite():
    pass

