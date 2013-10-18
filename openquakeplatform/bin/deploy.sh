#!/bin/bash
set -x
set -e
# export PS4='+${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]}: '

#
# Guidelines
#
#    Configuration file manglings are done only if they not appear already made.
#

# TIPS
#    to remove all:
#
# PUBLIC GLOBAL VARS
# version managements - use "master" or tagname to move to other versions

export GEM_OQ_PLATF_GIT_REPO=git://github.com/gem/oq-platform.git
export GEM_OQ_PLATF_GIT_VERS="gn2-prod-install"

export GEM_OQ_PLATF_SUBMODS="openquakeplatform/openquakeplatform/static/Leaflet
openquakeplatform/openquakeplatform/static/Leaflet.draw
openquakeplatform/openquakeplatform/static/wax"

GEM_IS_REINSTALL=y

GEM_DB_NAME='oqplatform'
GEM_DB_USER='oqplatform'
GEM_DB_PASS='the-password'

GEM_APP_LIST=('faulted_earth' 'gaf_viewer' 'ghec_viewer' 'isc_viewer')

GEM_WEBDIR=/var/www/openquake/platform

GEM_LOCAL_SETTINGS_TMPL="local_settings.py.template"
GEM_LOCAL_SETTINGS="/etc/openquake/platform/local_settings.py"

POSTGIS_DIR=/usr/share/postgresql/9.1/contrib/
POSTGIS_FILES=( ${POSTGIS_DIR}{postgis-1.5/postgis,postgis-1.5/spatial_ref_sys,postgis_comments}.sql )
export NL='
'
export TB='	'

#
#  functions

passwd_create () { 
    python -c "import string ; import random
def id_generator(size=8, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))
print id_generator()"
}

locset_create () {
    local oqpdir="$1" gem_host_name="$2"

    if [ -f "$GEM_LOCAL_SETTINGS" ]; then
        return 1
    fi
    python -c "
local_settings = open('${oqpdir}/$GEM_LOCAL_SETTINGS_TMPL', 'r').read()
with open('$GEM_LOCAL_SETTINGS', 'w') as fh:
    fh.write(local_settings % dict(host='$gem_host_name',
                                   dbname='$GEM_DB_NAME',
                                   dbuser='$GEM_DB_USER',
                                   dbpass='$GEM_DB_PASS',
                                   mediaroot='/var/www/openquake/platform/uploaded',
                                   staticroot='/var/www/openquake/platform/static/'))"
}

db_user_exists () {
    local user="$1"

    su - -c "echo \"SELECT rolname FROM pg_roles WHERE rolname = '${user}';\" \
             | psql -A -t | wc -l" postgres
}

db_base_exists () {
    local dbname="$1"

    su - -c "echo \"SELECT datname FROM pg_database WHERE datname = '$dbname';\" | psql -A -t | wc -l" postgres
}

db_gis_exists () {
    local dbname="$1"

    su - -c "echo \"SELECT proname FROM pg_proc WHERE proname = 'postgis_full_version';\" | psql -A -t \"$dbname\" | wc -l" postgres
}

db_user_create () {
    local user="$1" pass="$2" aex

    aex="$(db_user_exists "$user")"
    if [ $aex -gt 0 ]; then
        echo "WARNING: database user [$user] already exists!" >&2
        return 1
    fi

    su - -c "echo \"CREATE ROLE ${user} ENCRYPTED PASSWORD '${pass}' SUPERUSER CREATEDB NOCREATEROLE INHERIT LOGIN;\" | psql" postgres
}

db_base_create () {
    local dbname="$1" owner="$2" aex

    aex="$(db_base_exists "$dbname")"
    if [ $aex -gt 0 ]; then
        echo "WARNING: database [$dbname] already exists!" >&2
        return 1
    fi

    su - -c "echo \"CREATE DATABASE ${dbname} OWNER ${owner};\" | psql" postgres
}

db_gis_create () {
    local dbname="$1" aex

    aex="$(db_gis_exists "$dbname")"
    if [ $aex -gt 0 ]; then
        echo "WARNING: database [$dbname] has already GIS extensions!" >&2
        return 1
    fi

    for i in "${POSTGIS_FILES[@]}"; do
        su - -c "cat "$i" | psql ${dbname}" postgres
    done
}

oq_platform_install () {
    local norm_user="$1" norm_dir="$2" gem_host_name="$3" norm_home ret a distdesc rv
    local cur_step

    cur_step=0

    norm_home="$(grep "$norm_user" /etc/passwd | cut -d ":" -f 6)"
    GEM_DB_PASS="$(passwd_create)"

    # reset and install disabled
    if [ "$GEM_IS_REINSTALL" = "y" ]; then
        service tomcat7 stop
        sleep 5
        pip uninstall -y openquakeplatform
        su - -c "dropdb oqplatform" postgres   || true
        su - -c "dropuser oqplatform" postgres || true
        rm -rf /etc/openquake/platform         || true
        a2dissite geonode || true
        a2dissite oqplatform || true
        service tomcat7 start
    fi

if [ 0 -eq 1 ]; then
    # temporarly disabled for geoserver-geonode package trouble
    apt-get install -y python-software-properties
    add-apt-repository -y ppa:geonode/testing
    apt-get update
    apt-get install -y geonode
fi
    cd oq-platform/openquakeplatform
    pip install . -U --no-deps
    cd -
    oqpdir="$(python -c "import openquakeplatform;import os;print os.path.dirname(openquakeplatform.__file__)")"

    mkdir -p /etc/openquake/platform
    locset_create "$oqpdir" "$gem_host_name"

    cp "${oqpdir}/apache2/oqplatform" /etc/apache2/sites-available/
    ln -sf /etc/openquake/platform/local_settings.py "${oqpdir}"
    a2dissite geonode
    a2ensite oqplatform
    mkdir -p "$GEM_WEBDIR"
    cp "${oqpdir}/wsgi.py"* "$GEM_WEBDIR"
    cp "${oqpdir}/bin/openquakeplatform" "/usr/sbin/"
    chmod a+x "/usr/sbin/openquakeplatform"
    mkdir -p /etc/openquake/platform/media

    db_user_create "$GEM_DB_USER" "$GEM_DB_PASS"
    db_base_create "$GEM_DB_NAME" "$GEM_DB_USER"
    db_gis_create  "$GEM_DB_NAME"

    openquakeplatform syncdb --all --noinput
    openquakeplatform collectstatic --noinput


}


#
#  MAIN
#
wai="$(whoami)"
#
#  args management
while [ $# -gt 0 ]; do
    case $1 in
        *)
            break
            ;;
    esac
done

if [ "$wai" = "root" ]; then
    if [ $# -eq 3 ]; then
        norm_user="$1"
        norm_dir="$2"
        gem_host_name="$3"
        oq_platform_install "$norm_user" "$norm_dir" "$gem_host_name"
        exit $?
    else
        usage "$0" 1
    fi
elif [ $# -eq 1 ]; then
    gem_host_name="$1"
    echo "You are running the openquake platform installation script."
    echo
    echo "During this operation some git repositories will be downloaded into the current"
    echo "directory $PWD."
    echo
    read -p "press ENTER to continue or CTRL+C to abort:" a
    echo
    sudo -p "To install openquake platform root permissions are required.${NL}Please type password for $wai: " $0 "$wai" "$PWD" "$gem_host_name"
    exit $?
else
    usage "$0" 1
fi

