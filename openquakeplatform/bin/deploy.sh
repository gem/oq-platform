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

oq_platform_install () {
    local norm_user="$1" norm_dir="$2" norm_home ret a distdesc rv
    local cur_step

    cur_step=0

    norm_home="$(grep "$norm_user" /etc/passwd | cut -d ":" -f 6)"
    GEM_DB_PASS="$(passwd_create)"

    # reset and install disabled
    if [ "$GEM_IS_REINSTALL" = "y" ]; then
        su - -c "dropdb oqplatform" postgres   || true
        su - -c "dropuser oqplatform" postgres || true
        rm -rf /etc/openquake/platform         || true
        a2dissite geonode || true
        a2dissite oqplatform || true
    fi

    apt-get install -y python-software-properties
    add-apt-repository -y ppa:geonode/testing
    apt-get update
    apt-get install -y geonode

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
    if [ $# -eq 2 ]; then
        norm_user="$1"
        norm_dir="$2"
        oq_platform_install "$norm_user" "$norm_dir"
        exit $?
    else
        usage "$0" 1
    fi
elif [ $# -eq 0 ]; then
    echo "You are running the openquake platform installation script."
    echo
    echo "During this operation some git repositories will be downloaded into the current"
    echo "directory $PWD."
    echo
    read -p "press ENTER to continue or CTRL+C to abort:" a
    echo
    sudo -p "To install openquake platform root permissions are required.${NL}Please type password for $wai: " $0 "$wai" "$PWD"
    exit $?
else
    usage "$0" 1
fi

