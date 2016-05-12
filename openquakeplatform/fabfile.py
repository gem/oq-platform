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
# env.password = 'openquake'

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

PYTHON_TEST_LIBS = ['mock==0.7.2', 'nose==1.1.2', 'coverage==3.4']

#: External parametric values
GEM_GEONODE_PORT = os.getenv('GEM_GEONODE_PORT', '8000')
GEM_GEOSERVER_PORT = os.getenv('GEM_GEOSERVER_PORT', '8080')
GEM_DB_NAME = os.getenv('GEM_DB_NAME', 'oqplatform')
GEM_DB_USER = os.getenv('GEM_DB_USER', 'oqplatform')

#: Template for local_settings.py
GEM_LOCAL_SETTINGS_TMPL = 'openquakeplatform/local_settings.py.template'

def _check_risklib_nrmllib():
    try:
        local('python -c "from openquake.commonlib import nrml" >/dev/null 2>&1')
    except SystemExit:
        print """
WARNING: 'openquake.commonlib.nrml' from 'oq-risklib' not found,
'ript' application will not work properly; to add it you can choice one
of these solutions:

- install 'oq-hazardlib' and 'oq-risklib' as packages running:
   sudo apt-get install python-software-properties
   sudo add-apt-repository ppa:openquake/ppa
   sudo apt-get update
   sudo apt-get install python-decorator python-h5py python-psutil python-concurrent.futures python-oq-hazardlib python-oq-risklib

- install 'oq-hazardlib' and 'oq-risklib' packages with pip directly from git running:
   sudo apt-get install python-software-properties
   sudo add-apt-repository ppa:openquake/ppa
   sudo apt-get update
   sudo apt-get install python-decorator python-h5py python-psutil python-concurrent.futures
   # (into virtualenv)
   pip install 'http://github.com/gem/oq-hazardlib/tarball/master'
   pip install 'http://github.com/gem/oq-risklib/tarball/master'

- download 'oq-hazardlib' and 'oq-risklib' manually from github and make available via PYTHONPATH
  before run any python applications
"""

def bootstrap(db_name=None, db_user=None,
              db_pass=DB_PASSWORD, hostname='oq-platform.localdomain',
              geonode_port=None,
              geoserver_port=None,
              hazard_calc_addr='http://oq-platform.localdomain:8800',
              risk_calc_addr='http://oq-platform.localdomain:8800',
              oq_engserv_key='oq-platform',
              oq_bing_key='',
              mediaroot=None, staticroot='/home'):

    """
    :param str db_pass:
        Should match the one in settings.py.
    """

    global GEM_GEONODE_PORT, GEM_GEOSERVER_PORT, GEM_DB_NAME, GEM_DB_USER

    if not geonode_port:
        geonode_port = GEM_GEONODE_PORT
    if not geoserver_port:
        geoserver_port = GEM_GEOSERVER_PORT
    if not db_name:
        db_name = GEM_DB_NAME
    if not db_user:
        db_user = GEM_DB_USER
    os.environ['GEM_GEONODE_PORT'] = geonode_port
    os.environ['GEM_GEOSERVER_PORT'] = geoserver_port
    os.environ['GEM_DB_NAME'] = db_name
    os.environ['GEM_DB_USER'] = db_user
    GEM_GEONODE_PORT = geonode_port
    GEM_GEOSERVER_PORT = geoserver_port
    GEM_DB_NAME = db_name
    GEM_DB_USER = db_user

    if mediaroot is None:
        mediaroot = os.path.join(os.getcwd(), "uploaded")

    # check for xmlstarlet installation
    local("which xmlstarlet")

    oq_secret_key = ''.join(random.choice(string.ascii_letters + string.digits
                    + '%$&()=+-|#@?') for _ in range(50))

    baseenv(hostname, db_name=db_name, db_user=db_user, db_pass=db_pass,
            geonode_port=geonode_port, geoserver_port=geoserver_port,
            hazard_calc_addr=hazard_calc_addr,
            risk_calc_addr=risk_calc_addr, oq_engserv_key=oq_engserv_key,
            oq_secret_key=oq_secret_key, oq_bing_key=oq_bing_key,
            mediaroot=mediaroot, staticroot=staticroot)

    # populate static APPS_LIST list with all openquakeplatform.<apps> applications
    # (without 'openquakeplatform.' prefix
    apps_list_populate()

    apps(db_name, db_user, db_pass, geonode_port, geoserver_port, mediaroot, oq_bing_key)

    # Install the libs needs to `test` and `test_with_xunit`:
    local('pip install %s' % ' '.join(PYTHON_TEST_LIBS))

    # Finally, remove the superuser privileges, but only if this was a user we
    # created:
    # TODO: Some apps require that oqplatform db user has SUPERUSER.
    # We need to deal with this in production. For a dev install,
    # leave the user with superuser privs.
    # if user_created:
    #    _pgquery('ALTER USER %s WITH NOSUPERUSER' % db_user)
    _check_risklib_nrmllib()

def baseenv(hostname, db_name='oqplatform', db_user='oqplatform', db_pass=DB_PASSWORD,
            geonode_port=None, geoserver_port=None,
            hazard_calc_addr='http://oq-platform.localdomain:8800',
            risk_calc_addr='http://oq-platform.localdomain:8800',
            oq_engserv_key='oq-platform',
            oq_secret_key=None, oq_bing_key='',
            mediaroot=None, staticroot='/home'):

    if not geonode_port:
        geonode_port = GEM_GEONODE_PORT
    if not geoserver_port:
        geoserver_port = GEM_GEOSERVER_PORT
    os.environ['GEM_GEONODE_PORT'] = geonode_port
    os.environ['GEM_GEOSERVER_PORT'] = geoserver_port
    if mediaroot is None:
        mediaroot = os.path.join(os.getcwd(), "uploaded")

    _write_local_settings(hostname, db_name, db_user, db_pass, geonode_port, geoserver_port, hazard_calc_addr, risk_calc_addr, oq_engserv_key, oq_secret_key, oq_bing_key, mediaroot, staticroot)
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
    # Import our users
    _set_auth()
    # Update Django 'sites' with real hostname
    _set_sites()


APPS_LIST = []

def apps_list_populate():
    global APPS_LIST

    from openquakeplatform.local_settings import INSTALLED_APPS
    for i in INSTALLED_APPS:
        if i.startswith("openquakeplatform."):
             APPS_LIST.append(i[18:])


def apps(db_name, db_user, db_pass, geonode_port, geoserver_port, mediaroot, bing_key):
    globs = globals()
    for sfx in range(1, 20):
        # Add the apps
        for app in APPS_LIST:
            try:
                add_fn = globs["_add_" + app + "_" + str(sfx)]
            except KeyError:
                pass
            else:
                add_fn(db_name, db_user, db_pass)

    apps_list = ""
    for app in APPS_LIST:
        apps_list += " '"+app+"'"

    # reset .json files to original version
    local("for i in $(find -name '*.json.orig'); do mv \"$i\" \"$(echo $i | sed 's/\.orig//g')\" ; done")
    local("openquakeplatform/bin/oq-gs-builder.sh populate 'openquakeplatform/' 'openquakeplatform/' 'openquakeplatform/bin' 'oqplatform' 'oqplatform' '" + db_name + "' '" + db_user + "' '" + db_pass + "' 'geoserver/data' " + apps_list)
    local('openquakeplatform/bin/oq-gs-builder.sh drop')
    local("openquakeplatform/bin/oq-gs-builder.sh restore 'openquakeplatform/build-gs-tree'")
    local('python manage.py updatelayers')
    local('python manage.py categories_cleanup')
    local('python manage.py loaddata openquakeplatform/common/post_fixtures/*.json')
    local('mkdir -p ' + mediaroot + '/thumbs/')
    local('cp openquakeplatform/common/thumbs/*.png ' + mediaroot + '/thumbs/')
    # updatelayers must be run again after the fixtures have been pushed
    # to allow synchronization of keywords and metadata from GN to GS
    local('python manage.py updatelayers')

    if bing_key:
        local("echo \"UPDATE maps_maplayer SET source_params = regexp_replace(source_params, '\\\"ptype\\\": \\\"gxp_bingsource\\\"',\
    '\\\"apiKey\\\": \\\"%s\\\", \\\"ptype\\\": \\\"gxp_bingsource\\\"')\
    WHERE  name = 'AerialWithLabels' AND source_params NOT LIKE '%%\\\"apiKey\\\":%%';\" | sudo -u postgres psql -e -U %s %s" % (bing_key, db_user, db_name))
    else:
        local("echo \"DELETE FROM maps_maplayer WHERE NAME = 'AerialWithLabels';\" |  sudo -u postgres psql -e -U %s %s" % (db_user, db_name))

    for sfx in range(80, 100):
        # Add the apps
        for app in APPS_LIST:
            try:
                add_fn = globs["_add_" + app + "_" + str(sfx)]
            except KeyError:
                pass
            else:
                add_fn(db_name, db_user, db_pass)

def clean(db_name=None, db_user=None):
    global GEM_DB_NAME, GEM_DB_USER

    if not db_name:
        db_name = GEM_DB_NAME
    if not db_user:
        db_user = GEM_DB_USER
    os.environ['GEM_DB_NAME'] = db_name
    os.environ['GEM_DB_USER'] = db_user
    GEM_DB_NAME = db_name
    GEM_DB_USER = db_user

    with settings(warn_only=True):
        _pgsudo('dropdb %s' % db_name)
        _pgsudo('dropuser %s' % db_user)
        local('rm -r geoserver')
        local('rm -rf openquakeplatform/build-gs-tree')


def setup():
    local('paver setup')


def init_start():
    local('paver init_start -b 0.0.0.0:' + GEM_GEONODE_PORT)


def start(geonode_port=None, geoserver_port=None):
    global GEM_GEONODE_PORT, GEM_GEOSERVER_PORT

    if not geonode_port:
        geonode_port = GEM_GEONODE_PORT
    if not geoserver_port:
        geoserver_port = GEM_GEOSERVER_PORT
    os.environ['GEM_GEONODE_PORT'] = geonode_port
    os.environ['GEM_GEOSERVER_PORT'] = geoserver_port
    GEM_GEONODE_PORT = geonode_port
    GEM_GEOSERVER_PORT = geoserver_port

    local('paver start -b 0.0.0.0:' + GEM_GEONODE_PORT)


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


def _write_local_settings(hostname, db_name, db_user, db_pass,
                          geonode_port, geoserver_port,
                          hazard_calc_addr, risk_calc_addr,
                          oq_engserv_key, oq_secret_key,
                          oq_bing_key, mediaroot, staticroot):
    local_settings = open(GEM_LOCAL_SETTINGS_TMPL, 'r').read()
    with open('openquakeplatform/local_settings.py', 'w') as fh:
        fh.write(local_settings % dict(hostname=hostname,
                                       db_name=db_name,
                                       db_user=db_user,
                                       db_pass=db_pass,
                                       geonode_port=geonode_port,
                                       geoserver_port=geoserver_port,
                                       siteurl="%s:%s" % (hostname, geonode_port),
                                       hazard_calc_addr=hazard_calc_addr,
                                       risk_calc_addr=risk_calc_addr,
                                       oq_engserv_key=oq_engserv_key,
                                       oq_secret_key=oq_secret_key,
                                       oq_bing_key=oq_bing_key,
                                       mediaroot=mediaroot,
                                       staticroot=staticroot,
                                       is_gem_experimental=True,
                                       ))


def _pgsudo(command, **kwargs):
    # NOTE(LB): We change the directory here to avoid some login weirdness
    # with being unable to read the `fab` invoker's home dir.
    # Without this leading `cd /tmp && `, we get errors like this:
    # `could not change directory to "/home/lars"`
    # I observed this only on Linux, but not on OSX.
    return local('cd /tmp && sudo -u postgres ' + command, capture=True)


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
        postgis_version = _pgquery("SELECT count(*) FROM pg_proc WHERE proname = 'postgis_full_version'")

    if '0' in postgis_version.lower():
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


def _add_isc_viewer_1(db_name, db_user, db_pass):
    local('python manage.py import_isccsv ./openquakeplatform/isc_viewer/dev_data/isc_data.csv'
          ' ./openquakeplatform/isc_viewer/dev_data/isc_data_app.csv')


def _add_faulted_earth_1(db_name, db_user, db_pass):
    pass


def _add_ghec_viewer_1(db_name, db_user, db_pass):
    local('python manage.py import_gheccsv ./openquakeplatform/ghec_viewer/dev_data/ghec_data.csv')


def _add_gaf_viewer_1(db_name, db_user, db_pass):
    local('python manage.py import_gaf_fs_csv '
          './openquakeplatform/gaf_viewer/dev_data/gaf_data_fs.csv')
    local('python manage.py import_gaf_ft_csv '
          './openquakeplatform/gaf_viewer/dev_data/gaf_data_ft.csv')


def _add_econd_1(db_name, db_user, db_pass):
    local('cat openquakeplatform/econd/sql.d/*.sql | sudo -u postgres psql -e -U ' + db_user + ' ' +  db_name)
    local('openquakeplatform/econd/bin/photo_synt.sh openquakeplatform/econd/data/photo_synt_list.csv openquakeplatform/econd/data/placeholder.png uploaded')


def _add_weblib_1(db_name, db_user, db_pass):
    pass


def _add_gemecdwebsite_1(db_name, db_user, db_pass):
    pass


def _add_vulnerability_1(db_name, db_user, db_pass):
    local('python manage.py loaddata '
          './openquakeplatform/vulnerability/post_fixtures/initial_data.json')
    local('python manage.py import_vuln_geo_applicability_csv '
          './openquakeplatform/vulnerability/dev_data/vuln_geo_applicability_data.csv')
    local('python manage.py vuln_groups_create')

def _add_svir_99(db_name, db_user, db_pass):
    local('./openquakeplatform/bin/simqgis-layer-up.sh -s "http://localhost:%s"'
          % GEM_GEONODE_PORT)

def _set_auth():
    local('python manage.py loaddata '
          './openquakeplatform/common/fixtures/*.json')

def _set_sites():
    local('python manage.py fixsitename')
