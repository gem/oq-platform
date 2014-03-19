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

GEM_APP_LIST=('faulted_earth' 'gaf_viewer' 'ghec_viewer' 'isc_viewer' 'icebox' 'econd' 'gemecdwebsite' 'weblib')

GEM_WEBDIR=/var/www/openquake/platform

GEM_LOCAL_SETTINGS_TMPL="local_settings.py.template"
GEM_LOCAL_SETTINGS="/etc/openquake/platform/local_settings.py"

#
#   geoserver related vars
#
# base data dir in ubuntu production environment
GEM_GS_DATADIR="/usr/share/geoserver/data"
# geoserver default workspace
GEM_GS_WS_NAME="oqplatform"
# geoserver default datastore
GEM_GS_DS_NAME="oqplatform"

#
#   postgis related vars
#
POSTGIS_DIR=/usr/share/postgresql/9.1/contrib/
POSTGIS_FILES=( ${POSTGIS_DIR}{postgis-1.5/postgis,postgis-1.5/spatial_ref_sys,postgis_comments}.sql )
export NL='
'
export TB='	'

#
#  functions

#
#
faulted_earth_dataloader () {
    return 0
}

#
#
gaf_viewer_dataloader () {
    local oqpdir="$1" bdir

    if [ -f "private_data/gaf_data_fs.csv" -a -f "private_data/gaf_data_ft.csv" ]; then
        bdir="private_data"
    else
        bdir="${oqpdir}/gaf_viewer/dev_data"
    fi
    openquakeplatform import_gaf_fs_csv "${bdir}/gaf_data_fs.csv"
    openquakeplatform import_gaf_ft_csv "${bdir}/gaf_data_ft.csv"
}

#
#
ghec_viewer_dataloader () {
    local oqpdir="$1" bdir

    if [ -f "private_data/ghec_data.csv" ]; then
        bdir="private_data"
    else
        bdir="${oqpdir}/ghec_viewer/dev_data"
    fi
    openquakeplatform import_gheccsv "${bdir}/ghec_data.csv"
}

#
#
isc_viewer_dataloader () {
    local oqpdir="$1" bdir

    if [ -f "private_data/isc_data.csv" -a -f "private_data/isc_data_app.csv" ]; then
        bdir="private_data"
    else
        bdir="${oqpdir}/isc_viewer/dev_data"
    fi
    openquakeplatform import_isccsv "${bdir}/isc_data.csv" "${bdir}/isc_data_app.csv"
}


#
#
econd_dataloader () {
    cat oq-platform/openquakeplatform/openquakeplatform/econd/sql.d/*.sql | sudo -u postgres psql -e oqplatform

    if [ -d "private_data/econd/pictures" ]; then
        if [ -d "/var/www/openquake/platform/uploaded/" ]; then
            rm -rf "/var/www/openquake/platform/uploaded/"
        fi
        cp -r private_data/econd/pictures /var/www/openquake/platform/uploaded
    else
        mkdir -p /var/www/openquake/platform/uploaded/
        oq-platform/openquakeplatform/openquakeplatform/econd/bin/photo_synt.sh oq-platform/openquakeplatform/openquakeplatform/econd/data/photo_synt_list.csv oq-platform/openquakeplatform/openquakeplatform/econd/data/placeholder.png /var/www/openquake/platform/uploaded
    fi
    chown -R www-data.www-data /var/www/openquake/platform/uploaded/
}

econd_fixtureupdate () {
    oqpdir="$1"

    if [ -f "private_data/econd/initial_data.json" ]; then
        cp private_data/econd/initial_data.json ${oqpdir}/econd/fixtures
    fi
}
#
#
passwd_create () { 
    python -c "import string ; import random
def id_generator(size=8, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))
print id_generator()"
}

#
#
function_exists () {
    local fname="$1"
    set | grep -q "^$fname "
}

#
#
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
                                   staticroot='/var/www/openquake/platform/static/',
                                   hazard_calc_addr='http://oq-platform:8800',
                                   risk_calc_addr='http://oq-platform:8800',
                                   oq_engserv_key='oq-platform'))"
}

#
#
db_user_exists () {
    local user="$1"

    su - -c "echo \"SELECT rolname FROM pg_roles WHERE rolname = '${user}';\" \
             | psql -A -t | wc -l" postgres
}

#
#
db_base_exists () {
    local dbname="$1"

    su - -c "echo \"SELECT datname FROM pg_database WHERE datname = '$dbname';\" | psql -A -t | wc -l" postgres
}

#
#
db_gis_exists () {
    local dbname="$1"

    su - -c "echo \"SELECT proname FROM pg_proc WHERE proname = 'postgis_full_version';\" | psql -A -t \"$dbname\" | wc -l" postgres
}

#
#
db_user_create () {
    local user="$1" pass="$2" aex

    aex="$(db_user_exists "$user")"
    if [ $aex -gt 0 ]; then
        echo "WARNING: database user [$user] already exists!" >&2
        return 1
    fi

    su - -c "echo \"CREATE ROLE ${user} ENCRYPTED PASSWORD '${pass}' SUPERUSER CREATEDB NOCREATEROLE INHERIT LOGIN;\" | psql" postgres
}

#
#
db_base_create () {
    local dbname="$1" owner="$2" aex

    aex="$(db_base_exists "$dbname")"
    if [ $aex -gt 0 ]; then
        echo "WARNING: database [$dbname] already exists!" >&2
        return 1
    fi

    su - -c "echo \"CREATE DATABASE ${dbname} OWNER ${owner};\" | psql" postgres
}

#
#
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

#
# obsolete
geoserver_population () {
    local srcdir="$1" dstdir="$2" bindir="$3"
    local workspace_name="$GEM_GS_WS_NAME" datastore_name="$GEM_GS_DS_NAME"

    rm -rf "$dstdir/build-gstree"
    mkdir -p "$dstdir/build-gs-tree"
    mkdir -p "$dstdir/build-gs-tree/styles"
    mkdir -p "$dstdir/build-gs-tree/layers"
    mkdir -p "$dstdir/build-gs-tree/workspaces"
    mkdir -p "$dstdir/build-gs-tree/workspaces/${workspace_name}/datastores"
    featuretypes_dir="workspaces/${workspace_name}/datastores/${datastore_name}/featuretypes"
    mkdir -p "$dstdir/build-gs-tree/${featuretypes_dir}"
    cp -rn "$srcdir/common/gs_data/"* "$dstdir/build-gs-tree"
    for app in "${GEM_APP_LIST[@]}"; do
        if [ ! -d "${srcdir}/${app}/gs_data" ]; then
            continue
        fi
        if [ -d "${srcdir}/${app}/gs_data/datastores" ]; then
            cp "${srcdir}/${app}/gs_data/datastores/"* "$dstdir/build-gs-tree/workspaces/${workspace_name}/datastores"
            datastore_name="$(basename "${srcdir}/${app}/gs_data/datastores/"* .xml)"
        else
            datastore_name="$GEM_GS_DS_NAME"
        fi
        featuretypes_dir="workspaces/${workspace_name}/datastores/${datastore_name}/featuretypes"
        if [ ! -d "$featuretypes_dir" ]; then
            mkdir -p "$dstdir/build-gs-tree/${featuretypes_dir}"
        fi

        if [ -d "${srcdir}/${app}/gs_data/layers" ]; then
            cp -rn "${srcdir}/${app}/gs_data/layers/"*       "${dstdir}/build-gs-tree/layers"
        fi
        if [ -d "${srcdir}/${app}/gs_data/styles" ]; then
            cp -rn "${srcdir}/${app}/gs_data/styles/"*       "${dstdir}/build-gs-tree/styles"
        fi
        if [ -d "${srcdir}/${app}/gs_data/featuretypes" ]; then
            cp -rn "${srcdir}/${app}/gs_data/featuretypes/"* "${dstdir}/build-gs-tree/${featuretypes_dir}"
        fi
        if [ -d "${srcdir}/${app}/gs_data/"tmpl ]; then
            mkdir -p "${dstdir}/build-gs-tree/tmpl/${app}"
            cp -rn "${srcdir}/${app}/gs_data/tmpl/"* "${dstdir}/build-gs-tree/tmpl/${app}"
        fi
    done

    sed -i "s@#DB_PASS#@$GEM_DB_PASS@g" $(find "${dstdir}/build-gs-tree" -name '*.xml')

    rm -rf output
    ${bindir}/oq-gs-builder.sh drop
    ${bindir}/oq-gs-builder.sh restore "${dstdir}/build-gs-tree"

    #
    #  post population
    for app in "${GEM_APP_LIST[@]}"; do
        if [ -d "${dstdir}/build-gs-tree/tmpl/${app}/datastore" ]; then
            cp -rn "${dstdir}/build-gs-tree/tmpl/${app}/datastore/"* "${GEM_GS_DATADIR}/workspaces/${workspace_name}/"
        fi
    done
}

#
#
oq_platform_install () {
    local norm_user="$1" norm_dir="$2" gem_host_name="$3" norm_home ret a distdesc rv
    local cur_step

    cur_step=0

    norm_home="$(grep "$norm_user" /etc/passwd | cut -d ":" -f 6)"
    
    if [ 1 -eq 1 ]; then
        GEM_DB_PASS="$(passwd_create)"
        GEM_DB_PASS="K020VGFA"
    else
        GEM_DB_PASS="$(python -c "execfile('/etc/openquake/platform/local_settings.py',globals() ,locals() ); print DATABASES['default']['PASSWORD']" )" ;

        exit 123
    fi

    # reset and install disabled
    if [ "$GEM_IS_REINSTALL" = "y" ]; then
        service tomcat7 stop                   || true
        sleep 5                                || true
        pip uninstall -y openquakeplatform     || true
        su - -c "dropdb oqplatform" postgres   || true
        su - -c "dropuser oqplatform" postgres || true
        rm -rf /etc/openquake/platform         || true
        a2dissite geonode                      || true
        a2dissite oqplatform                   || true
        service tomcat7 start                  || true
    fi

    # temporarly disabled for geoserver-geonode package trouble
    apt-get install -y python-software-properties
    add-apt-repository -y ppa:geonode/release
    apt-get update
    apt-get install -y geonode

    # TODO: add an enhancement to try to manage connection to <hostname>:80 before fallback to localhost:80
    sed -i 's@<baseUrl>[^<]*</baseUrl>@<baseUrl>http://localhost:80/</baseUrl>@g' /usr/share/geoserver/data/security/auth/geonodeAuthProvider/config.xml

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

    #
    #  database population
    for app in "${GEM_APP_LIST[@]}"; do
        if function_exists "${app}_fixtureupdate"; then
            "${app}_fixtureupdate" "$oqpdir"
        fi
    done

    openquakeplatform syncdb --all --noinput
    openquakeplatform collectstatic --noinput

    openquakeplatform createsuperuser --username=the_user --email=the_mail@openquake.org --noinput

    service apache2 restart

    #
    #  database population
    for app in "${GEM_APP_LIST[@]}"; do 
        if function_exists "${app}_dataloader"; then
            "${app}_dataloader" "$oqpdir"
        fi
    done

    #
    #  geoserver structure population
    ${oqpdir}/bin/oq-gs-builder.sh populate "$oqpdir" "$oqpdir" "${oqpdir}/bin" "$GEM_GS_WS_NAME" "$GEM_GS_DS_NAME" "$GEM_DB_PASS" "${GEM_GS_DATADIR}" "${GEM_APP_LIST[@]}"

    openquakeplatform updatelayers
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

