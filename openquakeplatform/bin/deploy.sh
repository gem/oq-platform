#!/bin/bash
# Copyright (c) 2013-2015, GEM Foundation.
#
# OpenQuake is free software: you can redistribute it and/or modify it
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# OpenQuake is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with OpenQuake.  If not, see <http://www.gnu.org/licenses/>.

if [ $GEM_SET_DEBUG ]; then
    set -x
fi
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

export GEM_OQ_PLATF_SUBMODS="openquakeplatform/openquakeplatform/static/Leaflet
openquakeplatform/openquakeplatform/static/Leaflet.draw
openquakeplatform/openquakeplatform/static/wax"

export MIGRATIONS_HISTORY="/var/lib/openquake/platform/migrations/history"

if [ -f /etc/openquake/platform/local_settings.py ]; then
    GEM_IS_INSTALL=n
else
    GEM_IS_INSTALL=y
fi

GEM_DB_NAME='oqplatform'
GEM_DB_USER='oqplatform'
GEM_DB_PASS='the-password'
GEM_HAZARD_CALC_ADDR='http://localhost:8800'
GEM_RISK_CALC_ADDR='http://localhost:8800'
GEM_OQ_ENGSERV_KEY='oq-platform'
GEM_OQ_BING_KEY=''

GEM_APP_LIST=('common' 'world' 'faulted_earth' 'gaf_viewer' 'ghec_viewer' 'isc_viewer' 'icebox' 'econd' 'gemecdwebsite' 'weblib' 'vulnerability' 'svir')

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
#  <name_long>|<opt>[:],[...]
#
declare -A globargs

parsargs () {
    local frmt="$1"
    local st=0 skip=0
    local i e
    shift
    declare -a args=("$@")
    for i in $(seq 0 $(( ${#args[*]} - 1 )) ); do
        arg="${args[$i]}"
        if [ $skip -gt 0 ]; then
            skip=$((skip - 1))
            continue
        fi
        # echo "ARG: [${args[$i]}]"
        if [ $st -eq 0 ]; then
            if [ "${arg:0:2}" = "--" ]; then
                if [ "${arg:2:1}" = "" ]; then
                    return
                fi
                # long name case
                name="$(echo "${arg:2}" | cut -d '=' -f 1)"
                if ! echo "$frmt" | tr ',' '\n' | grep -q "$name|[a-zA-Z:]\+" ; then
                    echo "argument --$name not found"
                    exit 1
                fi

                if echo "$frmt" | tr ',' '\n' | grep -q "\b$name|[a-zA-Z]\+:" ; then
                    # echo "WITH PARAMETER"
                    if echo "$arg" | grep "^--${name}=" ; then
                        # with equal case
                        value="$(echo "${arg:2}" | cut -d '=' -f 2-)"
                    else
                        value=${args[$(( i + 1 ))]}
                        skip=1
                    fi
                else
                    value="true"
                fi
                # echo "LONG NAME: [$name] VAL: [$value]"
                globargs[$name]="$value"
            elif [ "${arg:0:1}" = "-" -a "${arg:1:1}" != "-" ]; then
                args_short="${arg:1}"
                for e in $(seq 0 $(( ${#args_short} - 1 )) ); do
                    arg_short="${args_short:$e:1}"
                    if ! echo "$frmt" | tr ',' '\n' | grep -q "|$arg_short:\?$"; then
                        echo "argument -$arg_short not found"
                        exit 1
                    fi
                    name="$(echo "$frmt" | tr ',' '\n' | grep "|$arg_short:\?$" | cut -d '|' -f 1)"
                    # echo "LETTER[$e]: $arg_short  NAME [$name]"
                    if echo "$frmt" | tr ',' '\n' | grep -q "\b$name|[a-zA-Z]\+:" ; then
                        # echo "WITH PARAMETER"
                        if [ "${args_short:$((e + 1)):1}" != "" ]; then
                            echo "argument -$arg_short require argument"
                            exit 1
                        fi
                        value=${args[$(( i + 1 ))]}
                        skip=1
                        # echo "SHORT NAME: [$name] VAL: [$value]"
                        globargs[$name]="$value"
                        break
                    else
                        value="true"
                        # echo "SHORT NAME: [$name] VAL: [$value]"
                        globargs[$name]="$value"
                    fi
                done
            fi
        fi
    done
}

#
#
world_dataloader () {
    local oqpdir="$1" db_name="$2" bdir

    if [ -f "private_data/world.json.bz2" ]; then
        bdir="private_data"
    else
        bdir="${oqpdir}/world/dev_data"
    fi
    openquakeplatform loaddata "${bdir}/world.json.bz2"
}

#
#
svir_dataloader () {
    local oqpdir="$1" db_name="$2" bdir

    if [ -f "private_data/svir.json.bz2" ]; then
        bdir="private_data"
    else
        bdir="${oqpdir}/svir/dev_data"
    fi
    openquakeplatform loaddata "${bdir}/svir.json.bz2"
}

#
#
gaf_viewer_dataloader () {
    local oqpdir="$1" db_name="$2" bdir

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
    local oqpdir="$1" db_name="$2" bdir

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
    local oqpdir="$1" db_name="$2" bdir

    if [ -f "private_data/isc_data.csv" -a -f "private_data/isc_data_app.csv" ]; then
        bdir="private_data"
    else
        bdir="${oqpdir}/isc_viewer/dev_data"
    fi
    openquakeplatform import_isccsv "${bdir}/isc_data.csv" "${bdir}/isc_data_app.csv"
}

#
#
common_postlayers () {
    local oqpdir="$1" db_name="$2" bdir wdir

    bdir="${oqpdir}/common"
    wdir="${GEM_WEBDIR}/uploaded/thumbs"
    openquakeplatform categories_cleanup
    openquakeplatform loaddata "${bdir}/post_fixtures/*.json"
    mkdir -p  "$wdir"
    cp ${bdir}/thumbs/*.png $wdir/
    chown -R www-data.www-data ${bdir}/thumbs/
}

#
#
econd_dataloader () {
    local oqpdir="$1" db_name="$2"

    cat oq-platform/openquakeplatform/openquakeplatform/econd/sql.d/*.sql | sudo -u postgres psql -e "$db_name"

    if [ "$GEM_IS_INSTALL" != "y" ]; then
        if ls /var/www/openquake/platform/uploaded/*.jpg >/dev/null 2>&1 ; then
            echo "WARNING: all images of ecd application will be overwritten by images from private_data/econd/pictures or created syntetically."
            while [ true ]; do
                read -p "Do you want to preserve them (y/n): " qvest
                qvest="$(echo "$qvest" | tr 'A-Z' 'a-z')"
                if [ "$qvest" == "y" -o "$qvest" == "n"  ]; then
                    break
                fi
            done
        fi
    fi
    if [ "$qvest" != "y" ]; then
        if [ -d "private_data/econd/pictures" ]; then
            if [ -d "/var/www/openquake/platform/uploaded/" ]; then
                rm -rf "/var/www/openquake/platform/uploaded/"
            fi
            cp -r private_data/econd/pictures /var/www/openquake/platform/uploaded
        else
            mkdir -p /var/www/openquake/platform/uploaded/
            oq-platform/openquakeplatform/openquakeplatform/econd/bin/photo_synt.sh oq-platform/openquakeplatform/openquakeplatform/econd/data/photo_synt_list.csv oq-platform/openquakeplatform/openquakeplatform/econd/data/placeholder.png /var/www/openquake/platform/uploaded
        fi
        if [ -d /var/www/openquake/platform/uploaded/ ]; then
            chown -R www-data.www-data /var/www/openquake/platform/uploaded/
        fi
    fi
}

#
#
vulnerability_dataloader () {
    local oqpdir="$1" db_name="$2" bdir

    openquakeplatform loaddata ${oqpdir}/vulnerability/post_fixtures/initial_data.json
    if [ "$GEM_IS_INSTALL" == "y" ]; then
        # if it is an update we assume an already populated set of curves.
        # Changing the country table produce with high probability a corruption of the db.
        if [ -f "private_data/vuln_geo_applicability_data.csv" ]; then
            bdir="private_data"
        else
            bdir="${oqpdir}/vulnerability/dev_data"
        fi
        openquakeplatform import_vuln_geo_applicability_csv "${bdir}/vuln_geo_applicability_data.csv"
    fi
    openquakeplatform vuln_groups_create
}

#
#
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
    local oqpdir gem_host_name gem_secr_key gem_db_name gem_db_user gem_db_pass
    local gem_hazard_calc_addr gem_risk_calc_addr gem_oq_engserv_key gem_oq_bing_key
    oqpdir="$1" ; shift
    gem_host_name="$1" ; shift
    gem_secr_key="$1" ; shift
    gem_db_name="$1" ; shift
    gem_db_user="$1" ; shift
    gem_db_pass="$1" ; shift
    gem_hazard_calc_addr="$1" ; shift
    gem_risk_calc_addr="$1" ; shift
    gem_oq_engserv_key="$1"; shift
    gem_oq_bing_key="$1"

    if [ -f "$GEM_LOCAL_SETTINGS" ]; then
        return 1
    fi
    python -c "
import string, random
local_settings = open('${oqpdir}/$GEM_LOCAL_SETTINGS_TMPL', 'r').read()
with open('$GEM_LOCAL_SETTINGS', 'w') as fh:
    fh.write(local_settings % dict(host='${gem_host_name}',
                                   siteurl='${gem_host_name}',
                                   db_name='${gem_db_name}',
                                   db_user='${gem_db_user}',
                                   db_pass='${gem_db_pass}',
                                   geonode_port=80,
                                   geoserver_port=8080,
                                   hazard_calc_addr='${gem_hazard_calc_addr}',
                                   risk_calc_addr='${gem_risk_calc_addr}',
                                   oq_engserv_key='${gem_oq_engserv_key}',
                                   oq_bing_key='${gem_oq_bing_key}',
                                   oq_secret_key='${gem_secr_key}',
                                   mediaroot='/var/www/openquake/platform/uploaded',
                                   staticroot='/var/www/openquake/platform/static/',
                                   is_gem_experimental=False,
                                   ))"
}

#
#
db_user_exists () {
    local db_user="$1"

    su - -c "echo \"SELECT rolname FROM pg_roles WHERE rolname = '${db_user}';\" \
             | psql -A -t | wc -l" postgres
}

#
#
db_base_exists () {
    local db_name="$1"

    su - -c "echo \"SELECT datname FROM pg_database WHERE datname = '$db_name';\" | psql -A -t | wc -l" postgres
}

#
#
db_gis_exists () {
    local db_name="$1"

    su - -c "echo \"SELECT proname FROM pg_proc WHERE proname = 'postgis_full_version';\" | psql -A -t \"$db_name\" | wc -l" postgres
}

#
#
db_user_create () {
    local db_user="$1" db_pass="$2" aex

    aex="$(db_user_exists "$db_user")"
    if [ $aex -gt 0 ]; then
        echo "WARNING: database user [$db_user] already exists!" >&2
        return 1
    fi

    su - -c "echo \"CREATE ROLE ${db_user} ENCRYPTED PASSWORD '${db_pass}' SUPERUSER CREATEDB NOCREATEROLE INHERIT LOGIN;\" | psql" postgres
}

#
#
db_base_create () {
    local db_name="$1" owner="$2" aex

    aex="$(db_base_exists "$db_name")"
    if [ $aex -gt 0 ]; then
        echo "WARNING: database [$db_name] already exists!" >&2
        return 1
    fi

    su - -c "echo \"CREATE DATABASE ${db_name} OWNER ${owner};\" | psql" postgres
}

#
#
db_gis_create () {
    local db_name="$1" aex

    aex="$(db_gis_exists "$db_name")"
    if [ $aex -gt 0 ]; then
        echo "WARNING: database [$db_name] has already GIS extensions!" >&2
        return 1
    fi

    for i in "${POSTGIS_FILES[@]}"; do
        su - -c "cat "$i" | psql ${db_name}" postgres
    done
}

deps_info () {
        cat <<EOF
    sudo apt-get install imagemagick xmlstarlet python-scipy
    sudo pip install Pillow==2.3.1 --no-deps
    sudo pip install South==0.8.4 --no-deps
    sudo pip install django-photologue==2.6.1 --no-deps
EOF
}

deps_install () {
    local old_IFS pkg
    # FIXME these lines must be integrated into the oq-platform deb package
    # since they are our own, direct dependencies.
    # Other dependencies are already satisfied by the GeoNode deb package.
    sudo apt-get install imagemagick xmlstarlet python-scipy postgresql-contrib-9.1
    sudo pip install Pillow==2.3.1 --no-deps
    sudo pip install South==0.8.4 --no-deps
    sudo pip install django-photologue==2.6.1 --no-deps

    # FIXME currently 'pip install -U --no-deps' is used to install
    #       openquakeplatform, until '-U --nodeps' will be removed we must install
    #       real not-developmental dependencies manually
    pipsrc="/usr/local/openquake/platform"
    mkdir -p "$pipsrc"
    old_IFS="$IFS"
    for pkg in $(sed -n '/.*dependency_links = /,/.*\].*/p' setup.py  | sed "s/^[^']\+'//g;s/'.*//g" | head -n -1 | grep -v '^http://github.com/gem/geonode/tarball'); do
        pip install "$pkg"
    done
    IFS="$old_IFS"
}

#
#
oq_platform_install () {
    local norm_user norm_dir gem_host_name norm_home ret a distdesc rv
    local cur_step

    if [ "${globargs['norm_user']}" == "" -o "${globargs['norm_dir']}" == ""  -o "${globargs['host']}" == "" ]; then
        usage "$0" 1
    fi
    norm_user="${globargs['norm_user']}"
    norm_dir="${globargs['norm_dir']}"
    gem_host_name="${globargs['host']}"

    gem_db_name="${globargs['db_name']:-$GEM_DB_NAME}"
    gem_db_user="${globargs['db_user']:-$GEM_DB_USER}"
    gem_db_pass="${globargs['db_pass']:-$GEM_DB_PASS}"

    gem_hazard_calc_addr="${globargs['hazard_calc_addr']:-$GEM_HAZARD_CALC_ADDR}"
    gem_risk_calc_addr="${globargs['risk_calc_addr']:-$GEM_RISK_CALC_ADDR}"
    gem_oq_engserv_key="${globargs['oq_engserv_key']:-$GEM_OQ_ENGSERV_KEY}"
    gem_oq_bing_key="${globargs['oq_bing_key']:-$GEM_OQ_BING_KEY}"

    cur_step=0

    norm_home="$(grep "$norm_user" /etc/passwd | cut -d ":" -f 6)"

    # switch to false to extract previous password value
    if [ "$GEM_IS_INSTALL" == "y" ]; then
        gem_db_pass="$(passwd_create)"
        gem_secr_key="$(python -c "import string, random ; print ''.join(random.choice(string.ascii_letters + string.digits + '%$&()=+-|#@?') for _ in range(50))")"

    else
        gem_db_pass="$(python -c "execfile('/etc/openquake/platform/local_settings.py',globals() ,locals() ); print DATABASES['default']['PASSWORD']" )" ;
        gem_secr_key="$(python -c "execfile('/etc/openquake/platform/local_settings.py',globals() ,locals() ); print SECRET_KEY" )" ;
        if [ -z "$gem_oq_bing_key" ]; then
            gem_oq_bing_key="$(python -c "execfile('/etc/openquake/platform/local_settings.py',globals() ,locals() ); print BING_KEY['bing_key']" )" ;
        fi
    fi

    # reset and install disabled
    if [ "$GEM_IS_INSTALL" == "y" ]; then
        service tomcat7 stop                       || true
        sleep 5                                    || true
        pip uninstall -y openquakeplatform         || true
        su - -c "dropdb ${gem_db_name}" postgres   || true
        su - -c "dropuser ${gem_db_user}" postgres || true
        rm -rf /etc/openquake/platform             || true
        a2dissite geonode                          || true
        a2dissite oqplatform                       || true
        service tomcat7 start                      || true
    fi

    apt-get update
    apt-get install -y python-software-properties
    add-apt-repository -y "deb http://ftp.openquake.org/ubuntu precise main"
    add-apt-repository -y ppa:openquake/ppa
    apt-get update
    apt-get install -y geonode python-geonode-user-accounts

    # FIXME this code will be used in the future
    ## check for oq-platform packaged dependencies
    #for pkg in imagemagick xmlstarlet; do
    #    if [ "$(dpkg-query -W --showformat="\${Status}" "$pkg")" != "install ok installed" ]; then
    #        echo "ERROR: missing Ubuntu package $pkg."
    #        echo "To satisfy oq-platform dependencies perform the following commands"
    #        deps_info
    #    exit 1
    #    fi
    #done

    # FIXME this code will be used in the future
    ## check for oq-platform external dependencies
    #check_pippkg="$(pip freeze 2>/dev/null | egrep '^django-photologue==2.6.1|^South==0.8.4|^Pillow==2.3.1' | wc -l)"
    #if [ "$check_pippkg" != "3" ]; then
    #    echo "ERROR: missing pip installed packages or wrong versions."
    #    echo "Current version are:"
    #    pip freeze 2>/dev/null | egrep '^django-photologue==|^South==|^Pillow=='
    #    echo "check Pillow, django-photologue, South, if missing perform the following commands"
    #    deps_info
    #    exit 1
    #fi
    #sed -i 's@<baseUrl>[^<]*</baseUrl>@<baseUrl>http://localhost:80/</baseUrl>@g' /usr/share/geoserver/data/security/auth/geonodeAuthProvider/config.xml

    cd oq-platform/openquakeplatform
    deps_install
    pip install . -U --no-deps
    cd -
    oqpdir="$(python -c "import openquakeplatform;import os;print os.path.dirname(openquakeplatform.__file__)")"

    if [ "$GEM_IS_INSTALL" != "y" ]; then
        rm -rf output.bak
        rm -rf geoserver.dump.bak
        if [ -e output ]; then
            mv output output.bak
        fi
        if [ -e geoserver.dump ]; then
            mv geoserver.dump geoserver.dump.bak
        fi
        ${oqpdir}/bin/oq-gs-builder.sh dump
        mv output geoserver.dump
    fi
    mkdir -p /etc/openquake/platform
    if [ "$GEM_IS_INSTALL" != "y" ]; then
        mv /etc/openquake/platform/local_settings.py /etc/openquake/platform/local_settings.py.orig
    fi

    locset_create "$oqpdir" "$gem_host_name" "$gem_secr_key" "$gem_db_name" "$gem_db_user" "$gem_db_pass" "${gem_hazard_calc_addr}" "${gem_risk_calc_addr}" "${gem_oq_engserv_key}"  "${gem_oq_bing_key}"

    if [ "$GEM_IS_INSTALL" != "y" ]; then
	mv /etc/openquake/platform/local_settings.py /etc/openquake/platform/local_settings.py.new
	mv /etc/openquake/platform/local_settings.py.orig /etc/openquake/platform/local_settings.py

        while [ true ]; do
            diff -u /etc/openquake/platform/local_settings.py /etc/openquake/platform/local_settings.py.new || true
            read -p "Ctrl+C to interrupt or open a new terminal and edit /etc/openquake/platform/local_settings.py.new, then type 'y' to continue or press <enter> to update the diff output: " qvest
            qvest="$(echo "$qvest" | tr 'A-Z' 'a-z')"
            if [ "$qvest" == "y" ]; then
                break
            fi
        done

        mv /etc/openquake/platform/local_settings.py.new /etc/openquake/platform/local_settings.py
    fi

    cp "${oqpdir}/apache2/oqplatform" /etc/apache2/sites-available/
    ln -sf /etc/openquake/platform/local_settings.py "${oqpdir}"
    a2dissite geonode
    a2ensite oqplatform
    mkdir -p "$GEM_WEBDIR"
    cp "${oqpdir}/wsgi.py"* "$GEM_WEBDIR"
    cp "${oqpdir}/bin/openquakeplatform" "/usr/sbin/"
    chmod a+x "/usr/sbin/openquakeplatform"
    mkdir -p /etc/openquake/platform/media

    if (kill -0 $(cat /var/run/apache2.pid)) >/dev/null 2>&1; then
        service apache2 restart
    elif (kill -0 $(cat /var/run/gunicorn/platform-prod.pid)) >/dev/null 2>&1; then
        service gunicorn restart
    fi

    if [ "$GEM_IS_INSTALL" == "y" ]; then
        db_user_create "$gem_db_user" "$gem_db_pass"
        db_base_create "$gem_db_name" "$gem_db_user"
        db_gis_create  "$gem_db_name"

        #
        #  database population (fixtures)
        #  FIXME this must be run also on NEW applications (if any exists) during upgrades;
        #        OLD applications that changed should use migrations and must be skipped here
        for app in "${GEM_APP_LIST[@]}"; do
            if function_exists "${app}_fixtureupdate"; then
                "${app}_fixtureupdate" "$oqpdir"
            fi
        done
        openquakeplatform syncdb --all --noinput
    else
        echo "WARNING: this operation could be destructive for the current version of oqplatform database schema, do proper backup before proceeding."
        read -p "Open a new terminal, migrate the application database schema manually and then press <enter> to continue: " qvest
        openquakeplatform syncdb --noinput
    fi

    openquakeplatform collectstatic --noinput

    #
    # Update Django 'sites' with real hostname
    openquakeplatform fixsitename

    if [ "$GEM_IS_INSTALL" == "y" ]; then
        # Load our users. Default password must be changed
        openquakeplatform loaddata ${oqpdir}/common/fixtures/*.json

        #
        #  database population (external datasets)
        #  FIXME this must be run also on NEW applications (if any exists) during upgrades;
        #        OLD applications that changed should use migrations and must be skipped here
        for app in "${GEM_APP_LIST[@]}"; do
            if function_exists "${app}_dataloader"; then
                "${app}_dataloader" "$oqpdir" "$gem_db_name"
            fi
        done
    fi

    #
    #  geoserver structure population
    rm -rf "${oqpdir}/build-gs-tree"
    if [ "$GEM_IS_INSTALL" != "y" ]; then
        cp -r geoserver.dump "${oqpdir}/build-gs-tree"
    fi
    ${oqpdir}/bin/oq-gs-builder.sh populate "$oqpdir" "$oqpdir" "${oqpdir}/bin" "$GEM_GS_WS_NAME" "$GEM_GS_DS_NAME" "$gem_db_name" "$gem_db_user" "$gem_db_pass" "${GEM_GS_DATADIR}" "${GEM_APP_LIST[@]}"

    if [ "$GEM_IS_INSTALL" == "y" ]; then
        openquakeplatform updatelayers

        #
        #  post layers creation apps customizations
        #  FIXME this must be run also on NEW applications (if any exists) during upgrades;
        #        OLD applications that changed should use migrations and must be skipped here
        for app in "${GEM_APP_LIST[@]}"; do
            if function_exists "${app}_postlayers"; then
                "${app}_postlayers" "$oqpdir" "$gem_db_name"
            fi
        done
    fi

    chown -R www-data.www-data /var/www/openquake

    if [ ! -d "$MIGRATIONS_HISTORY" ]; then
        mkdir -p "$MIGRATIONS_HISTORY"
    fi
    find oq-platform/openquakeplatform/migrations -type f \( -name "*.py" -or -name "*.sql" -or -name "*.sh" \) -exec cp "{}" "${MIGRATIONS_HISTORY}/" \;

    if [ "$gem_oq_bing_key" != "" ]; then
        echo "UPDATE maps_maplayer SET source_params = regexp_replace(source_params, '\"ptype\": \"gxp_bingsource\"',
     '\"apiKey\": \"$gem_oq_bing_key\", \"ptype\": \"gxp_bingsource\"')
     WHERE  name = 'AerialWithLabels' AND source_params NOT LIKE '%\"apiKey\":%'; " | sudo -u postgres psql -e "$gem_db_name"
    else
        echo "DELETE FROM maps_maplayer WHERE NAME = 'AerialWithLabels';" | sudo -u postgres psql -e "$gem_db_name"
    fi

    if [ "$GEM_IS_INSTALL" == "y" ]; then
        # updatelayers must be run again after the fixtures have been pushed
        # to allow synchronization of keywords and metadata from GN to GS
        openquakeplatform updatelayers
    else
        # the updatelayers is very expensive during upgrades due the number of layers
        # that could be hosted in the Platform. Let the user run it in a convinient way for him,
        # i.e. in background, avoiding a long downtime.
        echo "WARNING: please run 'sudo openquakeplatform updatelayers' to complete the upgrade."
        echo "         The 'updatelayers' process could be very expensive in matter of time, IO and CPU"
        echo "         depending on the number of layers hosted by the Platform. It can be run in background."
    fi

}


usage() {
    local com="$1" ret="$2"
    echo "${com} <--help|-p> <--host|-H> hostname [<--db_name|-d> db_name] [<--db_user|-u> db_user] [<--hazard_calc_addr|-h> <addr>] [<--risk_calc_addr|-r> <addr>] [<--oq_engserv_key|-k> <key>] [<--oq_bing_key|-B> <bing-key>]"
    exit $ret
}

#
#  MAIN
#

# check the current path
fil_inode="$(ls -i "$0" | cut -d ' ' -f 1)"
ext_inode="$(ls -i "$PWD/oq-platform/openquakeplatform/bin/deploy.sh" 2>/dev/null | cut -d ' ' -f 1)"

if [ "$fil_inode" != "$ext_inode" ]; then
    echo "  This script must be run from the parent directory of oq-platform repository."
    echo "  Change the current directory and run ./oq-platform/openquakeplatform/bin/deploy.sh script again."
    exit 1
fi

wai="$(whoami)"

if [ "$wai" = "root" ]; then
    parsargs "norm_user|U:,norm_dir|D:,help|p,host|H:,db_name|d:,db_user|u:,hazard_calc_addr|h:,risk_calc_addr|r:,oq_engserv_key|k:,oq_bing_key|B:" "$@"
    if [ "${globargs['host']}" == "" ]; then
        usage "$0" 1
    fi

    oq_platform_install
    exit $?
else
    parsargs "help|p,host|H:,db_name|d:,db_user|u:,hazard_calc_addr|h:,risk_calc_addr|r:,oq_engserv_key|k:,oq_bing_key|B:" "$@"

    if [ "${globargs['host']}" == "" -o "${globargs['help']}" ]; then
        usage "$0" 1
    fi

    echo "You are running the openquake platform installation script."
    echo
    echo "During this operation some git repositories will be downloaded into the current"
    echo "directory $PWD"
    echo
    read -p "press ENTER to continue or CTRL+C to abort:" a
    echo
    sudo -p "To install openquake platform root permissions are required.${NL}Please type password for $wai: " GEM_SET_DEBUG=$GEM_SET_DEBUG $0 --norm_user="$wai" --norm_dir="$PWD" "$@"
    exit $?
fi
