#!/bin/bash
 set -x
# export PS4='+${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]}: '

# Version: v1.12.8
# Guidelines
#
#    Configuration file manglings are done only if they not appear already made.
#

# TIPS
#    to remove all:
# # apt-get remove --purge geonode ; rm -rf gem_tmp/ /var/lib/openquake/* /etc/geonode
#
#    to reset a oq-platform git repo:
# $ rm -rf oq-ui-client2/build/  oq-ui-client/build/ ; cd oq-ui-client/app/static/externals/openlayers ; git checkout lib/OpenLayers/Layer/Google/v3.js ; cd - 
#
# PUBLIC GLOBAL VARS
# version managements - use "master" or tagname to move to other versions

export GEM_OQ_PLATF_GIT_REPO=git://github.com/bwyss/oq-platform.git
export GEM_OQ_PLATF_GIT_VERS=master

export GEM_OQ_PLATF_SUBMODS="oq-ui-client/app/static/externals/geoext
oq-ui-client/app/static/externals/gxp
oq-ui-client/app/static/externals/openlayers"

export GEM_DB_NAME="geonode"

#
# PRIVATE GLOBAL VARS
export GEM_JAVA_HOME="/usr/lib/jvm/java-6-openjdk"
export GEM_DB_USER="geonode"
export GEM_POSTGIS_PATH=/usr/share/postgresql/8.4/contrib/postgis-1.5
export GEM_HOSTNAME="$(hostname)"
export GEM_DJANGO_SUSER="$1"
export GEM_DJANGO_SPASS=""
export GEM_DJANGO_SMAIL="$1@$(hostname)"
export GEM_TMPDIR="gem_tmp"
# GEM_BASEDIR ==REQUIRES== "/" at the end
export GEM_BASEDIR="/var/lib/openquake/"
export GEM_GN_LOCSET="/etc/geonode/local_settings.py"
export GEM_DJANGO_MENU="${GEM_BASEDIR}oq-ui-api/etc/geonode/templates/oq-platform/includes/menu.html"
export GEM_GN_SETTINGS="/var/lib/geonode/src/GeoNodePy/geonode/settings.py"
export GEM_GN_URLS="/var/lib/geonode/src/GeoNodePy/geonode/urls.py"
export GEM_NW_SETTINGS="/etc/geonode/geonetwork/config.xml"
export GEM_TOMCAT_LOGFILE="/var/log/geonode/tomcat.log"
export GEM_WSGI_CONFIG="/var/www/geonode/wsgi/geonode.wsgi"
export NL='
'
export TB='	'

#
# FUNCTIONS
usage () {
    local name err
    
    name="$1"
    err="$2"
cat <<EOF
Usage:
  $name
  Run the command from your normal user account

  $name <-s|--setgit>
  Set current git repo and commit into oq_ui_api script variables

  $name <-h|--help>
  This help

To export users data from a previous installation you can run on it:
  sudo <oq-ui-api>/bin/export-users.sh >users_data.json

To import users data into the new installation you can copy previous
  created users_data.json file into 'private_data' dire of your working dir.

EOF
    exit $err
}

# tomcat_wait_start is a function that check if the tomcat daemon complete it's boot
# looking inside it's log file searching the "INFO: Server startup" line
tomcat_wait_start () {
    local tws_i log_cur every nloop

    log_cur=$1
    every=$2
    nloop=$3

    for tws_i in $(seq 1 $nloop); do
        tail -n +$log_cur $GEM_TOMCAT_LOGFILE | grep -q "^INFO: Server startup "
        if [ $? -eq 0 ]; then
            return 0
        fi
        sleep $every
    done
    return 1
    }

# this function create a required directory. if fails the script exits with error level 2
# with '-d' flag try to remove the dir before creation
mkreqdir () {
    local d

    if [ $# -gt 1 -a "$1" = "-d" ]; then
        rm -rf "$2"
        shift
    fi
    d="$1"

    if [ ! -d "$d" ]; then
        mkdir -p "$d"
    fi

    if [ ! -d "$d" ]; then
        echo "ERROR: '$d' dir creation failed" 
        exit 2
    fi
    return 0
}

staticfiles_add() {
    local stat_files stat_file_new a

    stat_file_new="$1"

    if [ ! -d "$stat_file_new" ]; then
        mkdir "$stat_file_new"
    fi

    stat_files="$(sed -n '/^STATICFILES_DIRS *= *\[ */,/^\]$/p' "$GEM_GN_LOCSET" | tail -n +2 | tr -d '\n' )"
    echo "$stat_files" | grep -q "^[ 	]*'$stat_file_new',"
    if [ $? -ne 0 ]; then
        sed -i "s@^\(^STATICFILES_DIRS *= *\[ *\)@\1\n    '$stat_file_new',@g" "$GEM_GN_LOCSET"
    else
        echo "WARNING: $stat_file_new already exists into STATICFILES_DIR entry of $GEM_GN_LOCSET"
        echo "$stat_files"
        read -p "If it isn't correct, edit it and continue" a
    fi
}

template_add() {
    local templ_files templ_file_new a

    templ_file_new="$1"

    if [ ! -d "$templ_file_new" ]; then
        mkdir "$templ_file_new"
    fi

    templ_files="$(sed -n '/^TEMPLATE_DIRS *= *( */,/^)$/p' "$GEM_GN_LOCSET" | tail -n +2 | tr -d '\n' )"
    echo "$templ_files" | grep -q "^[ 	]*'$templ_file_new',"
    if [ $? -ne 0 ]; then
        sed -i "s@^\(^TEMPLATE_DIRS *= *( *\)@\1\n    '$templ_file_new',@g" "$GEM_GN_LOCSET"
    else
        echo "WARNING: $templ_file_new already exists into TEMPLATE_DIR entry of $GEM_GN_LOCSET"
        echo "$templ_files"
        read -p "If it isn't correct, edit it and continue" a
    fi
}

installed_apps_add() {
    local new_app inst_apps

    new_app="$1"

    inst_apps="$(sed -n '/^INSTALLED_APPS[ 	]*=[ 	]*/,/)/p' "$GEM_GN_SETTINGS")"
    echo "$inst_apps" | grep -q "'$new_app'"
    if [ $? -ne 0 ]; then
        sed -i "s/^\(INSTALLED_APPS[ 	]*=[ 	]*.*\)/\1\n    '$new_app',/g"   "$GEM_GN_SETTINGS"
    fi
}

##
# verify host distro compatibility
check_distro () {
    local distro rel
    dpkg -l lsb-release | grep -q 'ii[ 	]*lsb-release[ 	]*' >/dev/null 2>&1
    if [ $? -ne 0 ]; then
        apt-get install -y lsb-release >/dev/null 2>&1
        if [ $? -ne 0 ]; then
            echo " lsb-release installation failed" 
            return 2
        fi
    fi
    distro="$(lsb_release -i | sed 's/^Distributor ID:[ 	]*//g')"     
    rel="$(lsb_release -r  | sed 's/^Release:[ 	]*//g')" 
    if [ "$distro" != "Ubuntu" ]; then
        return 2
    elif [ "$rel" != "12.04" ]; then
        return 1
    fi
    return 0
}

    
apache_append_proxy () {
    local pa

    pa="$1"
    grep -q "$pa" /etc/apache2/sites-available/geonode
    if [ $? -ne 0 ]; then
        sed -i "s@\(</VirtualHost>.*\)@$pa\n\1@g" /etc/apache2/sites-available/geonode
    fi
}

oq_platform_install () {
    local norm_user norm_dir norm_home ret a distdesc rv
    local cur_step

    cur_step=0

    norm_user="$1"
    norm_dir="$2"
    norm_home="$(grep "$norm_user" /etc/passwd | cut -d ":" -f 6)"

    ###
    # Verify if the distribution is compliant with the script.
    check_distro
    ret=$?
    distdesc=" $(lsb_release  -d | sed 's/Description:[ 	]*//g')" 
    if [ $ret -eq 1 ]; then
        echo "WARNING: this script is designed to run on Ubuntu 12.04, not on ${distdesc}."
        read -p "press ENTER to continue AT YOUR OWN RISK or CTRL+C to abort." a
    elif [ $ret -eq 2 ]; then
        echo "ERROR: ${distdesc} not supported" 
        exit 1
    fi

    declare -a GEM_REQ_VARS=('SITE_HOST' 'GEM_DJANGO_SUSER' 'GEM_DJANGO_SPASS' 'GEM_DJANGO_SMAIL')
    if [ -f "$norm_home/.oq-platform-install.conf" ]; then
        if [ "$(stat -c %a "$norm_home/.oq-platform-install.conf" | cut -c 2-)" != "00" ]; then
            echo "ERROR: the config file $norm_home/.oq-platform-install.conf exists but with too much relaxed access permissions (try chmod 600 $norm_home/.oq-platform-install.conf and run this script again)"
            exit 1
        fi
        source "$norm_home/.oq-platform-install.conf"
    else
        # Get public name info
        SITE_HOST="$GEM_HOSTNAME"
        read -p "Public site url or public IP address (start with '.' to add domain) [$SITE_HOST]: " newval
        if [ "$(echo "$newval" | cut -c 1)" = "." ]; then
            SITE_HOST="${SITE_HOST}${newval}"
        elif [ "$newval" != "" ]; then
            SITE_HOST="$newval"
        fi
        export SITE_HOST
        
        # Get django superuser name
        read -p "MANDATORY: django superuser name [$GEM_DJANGO_SUSER]: " newval
        if [ "$newval" != "" ]; then
            GEM_DJANGO_SUSER="$newval"
        fi
        export GEM_DJANGO_SUSER
        
        # Get django superuser password
        # TODO: password confirm.
        while [ true ]; do
            read -s -p "MANDATORY: django superuser password (not displayed): " newval
            echo
            if [ "$newval" != "" ]; then
                break
            fi
        done
        GEM_DJANGO_SPASS="$newval"
        export GEM_DJANGO_SPASS
        
        # Get django superuser email
        export GEM_DJANGO_SMAIL="$1@${SITE_HOST}"
        read -p "Django superuser email [$GEM_DJANGO_SMAIL]: " newval
        if [ "$newval" != "" ]; then
            GEM_DJANGO_SMAIL="$newval"
        fi
        export GEM_DJANGO_SMAIL
    fi
    for rv in ${GEM_REQ_VARS[*]}; do
        export $rv
        if [ -z "${!rv}" ]; then
            echo "ERROR: $norm_home/.oq-platform-install.conf exists but the $rv variable is not set"
            exit 1
        fi
    done
   
        while [ true ]; do
            # Get exposure info
            read -p "Do you want to install the Exposure Export tool (this requires a database connection to the EQGED database) (y/n)?" GEM_WITH_EXPOSURE
	    export GEM_WITH_EXPOSURE
            if [ $GEM_WITH_EXPOSURE = "y" -o "$GEM_WITH_EXPOSURE" = "Y" ]; then
                #get the user
                read -p "MANDATORY: GED DB user [$GED_USERNAME]: " newval
                if [ "$newval" != "" ]; then
                    GED_USERNAME="$newval"
                fi
                export GED_USERNAME

                #get the password
                read -p "MANDATORY: GED DB password [$GED_PASSWORD]: " newval
                if [ "$newval" != "" ]; then
                    GED_PASSWORD="$newval"
                fi
                export GED_PASSWORD

                #get the host
                read -p "MANDATORY: GED DB host [$GED_HOST]: " newval
                if [ "$newval" != "" ]; then
                    GED_HOST="$newval"
                fi
                export GED_HOST

                #get the port
                read -p "MANDATORY: GED DB port [$GED_PORT]: " newval
                if [ "$newval" != "" ]; then
                    GED_PORT="$newval"
                fi
                export GED_PORT

                echo "You have input: GED DB User: [$GED_USERNAME], GED DB Password: [$GED_PASSWORD], GED DB host: [$GED_HOST], GED DB port: [$GED_PORT]"
                read -p "do you wish to proceed? (y/n)" a
                    if [ "$a" = "y" -o "$a" = "Y" ]; then
                        break
                    fi
            fi
            if [ $GEM_WITH_EXPOSURE = "n" -o "$GEM_WITH_EXPOSURE" = "N" ]; then
		break 
	    fi
        done
    mkreqdir "$GEM_TMPDIR"
    rm -rf "$GEM_TMPDIR"/*

    mkreqdir "$GEM_BASEDIR"
    
    ###
    echo "== General requirements ==" 
    apt-get install -y python-software-properties
    add-apt-repository -y ppa:geonode/release
    add-apt-repository -y ppa:openquake/ppa
    apt-get update

    apt-get install -y git wget ant openjdk-6-jdk make python-lxml python-jpype python-newt python-shapely libopenshalite-java curl

    ###
    echo "== Geonode installation ==" 

#
# NOTE: this part was used to change the apt geonode repository
#
#    if [ -f /etc/apt/sources.list.d/geonode-release-maverick.list ]; then
#        mv /etc/apt/sources.list.d/geonode-release-maverick.list /etc/apt/sources.list.d/geonode-release-natty.list
#        sed -i 's/maverick/natty/g' /etc/apt/sources.list.d/geonode-release-natty.list
#    else
#        echo "add-apt-repository ppa:geonode/release command failed"
#        echo "installation ABORTED"
#        exit 1
#    fi  
#
    apt-get install -y geonode
   #  gdebi -n /home/bmw/geonode_1.2+xfinal_all.deb
   

    sed -i "s@^ *SITEURL *=.*@SITEURL = 'http://$SITE_HOST/'@g" "$GEM_GN_LOCSET"
    grep -q '^WSGIDaemonProcess.*:/var/lib/geonode/src/GeoNodePy/geonode' /etc/apache2/sites-available/geonode 
    if [ $? -ne 0 ]; then
        sed -i 's@\(^WSGIDaemonProcess.*$\)@\1:/var/lib/geonode/src/GeoNodePy/geonode@g' /etc/apache2/sites-available/geonode
    fi

    cp /etc/apache2/sites-available/geonode /tmp/geonode.$$
    cat /tmp/geonode.$$ | \
        grep -v '^[ 	]*AliasMatch[ 	]*^/oq-platform/(.*[^(\.html)])$[	]*/var/www/geonode/static/oq-platform/$1' | \
        sed 's@\(\(^[ 	]*\)Alias /static/ /var/www/geonode/static/\)@\1\n\2AliasMatch ^/oq-platform/(.*[^(\.html)])$ /var/www/geonode/static/oq-platform/$1@g' | \
        grep -v '^[ 	]*AliasMatch[ 	]*^/oq-platform2/(.*[^(\.html)])$[	]*/var/www/geonode/static/oq-platform2/$1' | \
        sed 's@\(\(^[ 	]*\)Alias /static/ /var/www/geonode/static/\)@\1\n\2AliasMatch ^/oq-platform2/(.*[^(\.html)])$ /var/www/geonode/static/oq-platform2/$1@g' >/etc/apache2/sites-available/geonode
    rm /tmp/geonode.$$

    # this fix the bug 972202 to inform jpype module where is the java installation
    sed -i "s@os.environ\['DJANGO_SETTINGS_MODULE'\] *= *'geonode.settings'@os.environ['DJANGO_SETTINGS_MODULE'] = 'geonode.settings'\nos.environ['JAVA_HOME'] = '$GEM_JAVA_HOME'@g" "$GEM_WSGI_CONFIG"

    service tomcat6 restart
    service apache2 restart
    wget --save-headers -O "$GEM_TMPDIR/test_geonode.html" "http://$SITE_HOST/"

    head -n 1 "$GEM_TMPDIR/test_geonode.html" > "$GEM_TMPDIR/test_geonode.http"
    grep -q 200 "$GEM_TMPDIR/test_geonode.http"
    if [ $? -ne 0 ]; then
        echo 
        echo "WARNING: GEONODE WEB TEST FAILED!"
        cat test_geonode.http
        echo
        read -p "press ENTER to continue or CTRL+C to abort:" a
    fi

    ###
    echo "== Django-South configuration =="

    # add 'django.contrib.gis' fix migration problem with south
    installed_apps_add 'django.contrib.gis'

    installed_apps_add 'south'

    ##
    # /etc/geonode/local_settings.py
    grep -q "^[ 	]*'ENGINE':.*" "$GEM_GN_LOCSET"
    if [ $? -ne 0 ]; then
        echo "Required 'ENGINE' entry into $GEM_GN_LOCSET not found"
        exit 3
    fi
    # FIXME(lp) is it needed?
    sed -i "s/^\([ 	]*'ENGINE':\)\(.*\)/# \1\2\n\1 'django.contrib.gis.db.backends.postgis',/g" "$GEM_GN_LOCSET"

    grep -q '^SOUTH_DATABASE_ADAPTERS[ 	]*=[ 	]*' "$GEM_GN_LOCSET"
    if [ $? -ne 0 ]; then
        echo "\
SOUTH_DATABASE_ADAPTERS = { 
    'default': 'south.db.postgresql_psycopg2',
}" >> "$GEM_GN_LOCSET"
    fi

    ###
    echo "== Database recreation ==" 
    
    service apache2 stop 
    service tomcat6 stop

#    sudo su - postgres -c "
#dropdb $GEM_DB_NAME || true
#createdb -O $GEM_DB_USER $GEM_DB_NAME
#createlang plpgsql $GEM_DB_NAME
#psql -f $GEM_POSTGIS_PATH/postgis.sql $GEM_DB_NAME
#psql -f $GEM_POSTGIS_PATH/spatial_ref_sys.sql $GEM_DB_NAME
#"
    
    sed -i "s/DATABASE_NAME[ 	]*=[ 	]*'\([^']*\)'/DATABASE_NAME = '$GEM_DB_NAME'/g" "$GEM_GN_LOCSET"
    sed -i "s@\(<url>jdbc:postgresql:\)[^<]*@\1$GEM_DB_NAME@g" "$GEM_NW_SETTINGS"

    #exposure tool options 
    if [ $GEM_WITH_EXPOSURE = "y" -o "$GEM_WITH_EXPOSURE" = "Y" ]; then
        sed -i 's/^\(DB_DATASTORE=True.*\)/\1\n\nDATABASE_ROUTERS = ["exposure.router.GedRouter"]\n/g' "$GEM_GN_LOCSET"
        sed -i 's/^\(DATABASES = {.*\)/\1\n     "geddb": {\n         "ENGINE": "django.db.backends.postgresql_psycopg2",\n         "NAME": "ged",\n         "USER": "'$GED_USERNAME'",\n         "PASSWORD": "'$GED_PASSWORD'",\n         "HOST": "'$GED_HOST'",\n         "PORT": '$GED_PORT',\n         "OPTIONS": {\n             "sslmode": "require",\n         }\n    },/g' "$GEM_GN_LOCSET"
    fi

    service apache2 start
    service tomcat6 start

    postgis_vers="$(dpkg-query --show -f '${Version}' postgis 2>/dev/null)"
    if [ $? -ne 0 ]; then
        echo "Postgis not found, verify your system."
        exit 3
    fi
    postgis_vers="$(echo "$postgis_vers" | sed 's/-.*//g')"

    grep -q '^POSTGIS_VERSION[ 	]*=[ 	]*' "$GEM_GN_LOCSET"
    if [ $? -eq 0 ]; then
        sed -i "s/^\(POSTGIS_VERSION[ 	]*=[ 	]*['\"]\)[0-9\.]\+\(.*\)/\1$postgis_vers\2/g" "$GEM_GN_LOCSET"
    else
        echo "POSTGIS_VERSION = '$postgis_vers'" >> "$GEM_GN_LOCSET"
    fi

    grep -q '^GEOCLUDGE_JAR_PATH[ 	]*=[ 	]*' "$GEM_GN_LOCSET"
    if [ $? -eq 0 ]; then
        sed -i "s@^\(GEOCLUDGE_JAR_PATH[ 	]*=[ 	]*\)\(['\"]\).*@\1\2/usr/share/java\2@g" "$GEM_GN_LOCSET"
    else
        echo "GEOCLUDGE_JAR_PATH = '/usr/share/java'" >> "$GEM_GN_LOCSET"
    fi

    ###
    echo "== Add 'geodetic', 'ged4gem', 'observations' and 'isc_viewer' Django applications =="

sudo su - $norm_user -c "
cd $norm_dir 
GEM_OQ_PLATF_SUBMODS=\"$GEM_OQ_PLATF_SUBMODS\"
if [ ! -d oq-platform ]; then
    echo \"oq-platform not found, clone it\"
    # case without repo checkout
    git clone $GEM_OQ_PLATF_GIT_REPO
    cd oq-platform
    git checkout $GEM_OQ_PLATF_GIT_VERS
    git submodule init
    git submodule update
    cd -
elif [ ! -d oq-platform/.git ]; then
    echo \"oq-platform found and seems an archive\"
    # case with an extracted archive (we must check for submodules)
    oldifs=\"\$IFS\"
    IFS=\"
\"
    for sdir in \$GEM_OQ_PLATF_SUBMODS; do
        is_void=\"\$(ls oq-platform/\$sdir | wc -l )\"
        if [ \$is_void -eq 0 ]; then
            echo \"The submodule directory oq-platform/$sdir is void, installation failed\"
            IFS=\"\$oldifs\"
            exit 1
        fi
    done
else
    echo \"oq-platform repository found\"
    cd oq-platform
    git submodule init
    git submodule update
    cd -
fi
exit 0"
    ret="$?"
    if [ $ret -ne 0 ]; then
        return 1
    fi

    ##
    # /etc/geonode/local_settings.py (require manage.py collectstatic runned by make deploy below
    staticfiles_add '/etc/geonode/static'
    staticfiles_add '/etc/geonode/static.apps'

    template_add '/etc/geonode/templates.apps'

    cd oq-platform/oq-ui-api
    make fix
    make MKREQDIR_ARG="-d" deploy
     
    ##
    # /var/lib/geonode/src/GeoNodePy/geonode/settings.py    
    installed_apps_add 'geonode.ged4gem'
    installed_apps_add 'geonode.observations'
    installed_apps_add 'geonode.geodetic'
    installed_apps_add 'geonode.isc_viewer'

    # add exposure when indicated by user
    if [ $GEM_DJANGO_MENU = "y" -o "$GEM_DJANGO_MENU" = "Y" ]; then
        installed_apps_add 'geonode.exposure'
    fi

    ## add observations to urls.py
    #     (r'^observations/', include('geonode.observations.urls')),
    sed -i "s@urlpatterns *= *patterns('',@urlpatterns = patterns('',\n    url(r'^oq-platform2/faulted_earth.html$', 'django.views.generic.simple.direct_to_template',\n    {'template': 'oq-platform2/faulted_earth.html'}, name='faultedearth'),\n@g" "$GEM_GN_URLS"
    sed -i "s@urlpatterns *= *patterns('',@urlpatterns = patterns('',\n    url(r'^oq-platform/geodetic_index.html$', 'django.views.generic.simple.direct_to_template',\n    {'template': 'oq-platform/geodetic_index.html'}, name='geodetic'),\n@g" "$GEM_GN_URLS"
    sed -i "s@urlpatterns *= *patterns('',@urlpatterns = patterns('',\n    url(r'^oq-platform/exposure_country_index.html$', 'django.views.generic.simple.direct_to_template',\n    {'template': 'oq-platform/exposure_country_index.html'}, name='exposure_country'),\n@g" "$GEM_GN_URLS"
    sed -i "s@urlpatterns *= *patterns('',@urlpatterns = patterns('',\n    url(r'^oq-platform2/isc_viewer.html$', 'django.views.generic.simple.direct_to_template',\n    {'template': 'oq-platform2/isc_viewer.html'}, name='isc_viewer'),\n@g" "$GEM_GN_URLS"
    sed -i "s@urlpatterns *= *patterns('',@urlpatterns = patterns('',\n    # added by geonode-installation.sh script\n    (r'^observations/', include('geonode.observations.urls')),@g" "$GEM_GN_URLS"

    # add exposure when indicated by user
    if [ "$GEM_WITH_EXPOSURE" = "y" -o "$GEM_WITH_EXPOSURE" = "Y" ]; then
    sed -i "s@urlpatterns *= *patterns('',@urlpatterns = patterns('',\n    url(r'^oq-platform2/exposure_export.html$', 'django.views.generic.simple.direct_to_template',\n    {'t    emplate': 'oq-platform2/exposure_export.html'}, name='exposure_grid'),\n@g" "$GEM_GN_URLS"
    sed -i "s@urlpatterns *= *patterns('',@urlpatterns = patterns('',\n    (r'^exposure/', include('geonode.exposure.urls')),\n@g" "$GEM_GN_URLS"
    fi


    ##
    # deploy database
    cd /var/lib/geonode/
    source bin/activate
    cd src/GeoNodePy/geonode/
    echo "Upgrading httplib2 to 0.7.4 version to fix an https bug"
    pip install --upgrade "$norm_dir/oq-platform/oq-ui-api/data/httplib2.pybundle"
    python ./manage.py syncdb --noinput
    python ./manage.py migrate geodetic
    python ./manage.py migrate isc_viewer
    if [ -f "$norm_dir/private_data/isc_data.csv" ]; then
        GEM_ISC_DATA_CAT="$norm_dir/private_data/isc_data.csv"
        GEM_ISC_DATA_APP="$norm_dir/private_data/isc_data_app.csv"
    else
        GEM_ISC_DATA_CAT="$norm_dir/oq-platform/oq-ui-api/data/isc_data.csv"
        GEM_ISC_DATA_APP="$norm_dir/oq-platform/oq-ui-api/data/isc_data_app.csv"
    fi
    python ./manage.py importcsv "$GEM_ISC_DATA_CAT" "$GEM_ISC_DATA_APP"
    python ./manage.py migrate observations
    export JAVA_HOME="$GEM_JAVA_HOME"
    python ./manage.py updatecomputedfields
    unset JAVA_HOME
    python ./manage.py migrate ged4gem

    cd $norm_dir

    ##
    echo "Add 'faultedearth', 'geodetic', 'isc_viewer', 'exposure_country' and 'exposure_grid' client applications"
    sudo su - $norm_user -c "
cd \"$norm_dir/oq-platform/oq-ui-client\"
ant init
ant deploy-deps"

# ant debug -Dapp.port=8081 &
# debug_pid=\$!
# sleep 10
# kill -0 \$debug_pid
# if [ \$? -ne 0 ]; then
#     echo \"oq-ui-client checkpoint\"
#     echo \"ERROR: 'ant debug' failed\"
#     exit 4
# fi
# kill -TERM \$debug_pid
# exit 0
# "
    ret=$?
    if [ $ret -ne 0 ]; then
        exit $ret
    fi

    cd oq-platform/oq-ui-client
    ant deploy
    cd "$norm_dir"


    ##
    echo "Add tool based on the new sdk"
    rm -rf "${norm_home}/.opengeo/logs/suite-sdk.log"
    sudo su - $norm_user -c "
cd \"$norm_dir/oq-platform/oq-ui-client2\"
rm -rf ./build
../opengeosuite-sdk/bin/suite-sdk deploy-deps -b ./build ."

# ant debug -Dapp.port=8081 &
# debug_pid=\$!
# sleep 10
# kill -0 \$debug_pid
# if [ \$? -ne 0 ]; then
#     echo \"oq-ui-client checkpoint\"
#     echo \"ERROR: 'ant debug' failed\"
#     exit 4
# fi
# kill -TERM \$debug_pid
# exit 0
# "
    ret=$?
    if [ $ret -ne 0 ]; then
        exit $ret
    fi

    # cd oq-platform/oq-ui-client2/build
    # if [ -d "${GEM_BASEDIR}/oq-ui-client2" ]; then
    #     rm -rf "${GEM_BASEDIR}/oq-ui-client2"
    # fi
    # mkdir "${GEM_BASEDIR}/oq-ui-client2"
    # cp -r oq-platform "${GEM_BASEDIR}/oq-ui-client2"
    # cd "$norm_dir"
    cd oq-platform/oq-ui-client2
    ../opengeosuite-sdk/bin/suite-sdk deploy -b ./build .
    cd "$norm_dir"

    service tomcat6 restart
    service apache2 restart

    ###
    echo "== Custom geoserver installation =="

    service tomcat6 stop
    
    sudo su - $norm_user -c "
cd $norm_dir/oq-platform/oq-ui-geoserver
"
    mkreqdir -d "$GEM_BASEDIR"oq-ui-geoserver
    cd oq-platform/oq-ui-geoserver
    make deploy
    if [ -d /var/lib/tomcat6/webapps/geoserver -a ! -L /var/lib/tomcat6/webapps/geoserver ]; then
        mv /var/lib/tomcat6/webapps/geoserver "$GEM_BASEDIR"geoserver.orig
    fi

    ln -s "$GEM_BASEDIR"oq-ui-geoserver/geoserver /var/lib/tomcat6/webapps/geoserver
    cd -

    ##
    # configuration
    if [ ! -f /var/lib/tomcat6/webapps/geoserver/WEB-INF/web.xml -o ! -f /etc/geonode/geoserver/web.xml ]; then
        echo "geoserver configuration file not found"
        return 6
    fi

    tc_log_cur="$(cat /var/log/geonode/tomcat.log  | wc -l)"
    service tomcat6 start
    ##
    # final alignment

    # check if tomcat had finish it's startup (try every 5 secs for 24 times => 2 mins)
    tomcat_wait_start $tc_log_cur 5 24
    service apache2 restart
    sleep 20

    #
    #  NOTE: for some unknown reasons the last step fails the first time that we run.
    #        To not waste time to investigate this strage problem we use a "retry approach".
    #
    cd /var/lib/geonode/
    source bin/activate
    cd src/GeoNodePy/geonode/
    if [ -f "$norm_dir/private_data/users_data.json" ]; then
        # this json data below are generated in the previous installation with
        # "python ./manage.py dumpdata --format=json auth >users_data.json"
        python ./manage.py loaddata "$norm_dir/private_data/users_data.json"
    fi
    python ./manage.py createsuperuser --noinput "--username=$GEM_DJANGO_SUSER" "--email=$GEM_DJANGO_SMAIL" 2>/dev/null

    python ./manage.py dumpdata auth.user > "$norm_dir/$GEM_TMPDIR/auth.user.json"
    suser_hash_pass="$(python -c "from django.contrib.auth.hashers import PBKDF2PasswordHasher as hasher ; a = hasher() ; h = a.encode('$GEM_DJANGO_SPASS', a.salt()) ; print h" | sed 's@/@\\/@g')"

    # change the password to the superuser and add superuser perms
    # to eventually previous defined user with the same name
    cat "$norm_dir/$GEM_TMPDIR/auth.user.json" | sed "s/\({\"username\": \"$GEM_DJANGO_SUSER\"[^}]*\"password\": \)\"[^\"]*\"/\1\"$suser_hash_pass\"/g;s/\({\"username\": \"$GEM_DJANGO_SUSER\"[^}]*\"is_superuser\": \)[^,]*,/\1true,/g" > "$norm_dir/$GEM_TMPDIR/auth.user.new.json"
    python ./manage.py loaddata "$norm_dir/$GEM_TMPDIR/auth.user.new.json"
    python ./manage.py collectstatic --noinput
    for i in $(seq 1 5); do
	python ./manage.py updatelayers
	if [ $? -eq 0 ]; then
            break
        fi
        sleep 20
    done
    deactivate

    #
    #  customization of geoserver using the rest API
    cd "$norm_dir/oq-platform/oq-ui-geoserver"
    make populate
    cd -

    #
    #  remove the geonode repo to avoid breaking upgrade of geonode package
    add-apt-repository -r -y ppa:geonode/release

#
#  THE END
#

    # echo "From root we have: norm_user: $norm_user  norm_dir: $norm_dir SITE_HOST: $SITE_HOST"
    return 0    
}



#
#  MAIN
#
wai="$(whoami)"
setgit=
#
#  args management
while [ $# -gt 0 ]; do
    case $1 in
        -s | --setgit)
            setgit=1
            shift            
            ;;
        *)
            break
            ;;
    esac
done

if [ $setgit ]; then
    echo "settato"
    git_commit="$(git log -1 --pretty=format:%H)"
    if [ $? -ne 0 ]; then
        echo "Git commit version not found"
        exit 1
    fi
    git_repos="$(git remote -v | grep "(fetch)$")"
    git_repos_n="$(echo "$git_repos" | wc -l)"

    if [ $git_repos_n -eq 1 ]; then
        git_repo="$(echo "$git_rems" | awk '{ printf("%s\n", $2); }')"
    else
        echo "More then 1 remote repository found:"
        while [ true ]; do
            IFS="$NL"
            ct=1
            for rem_item in $git_repos; do
                echo "$ct)${TB}$rem_item"
                ct=$((ct + 1))
            done
            read -p "Choose (1 - $git_repos_n): " ch
            echo "$ch" | grep -q '^[-+]\?[0-9]\+$'
            if [ $? -ne 0 ]; then
                continue
            fi
            if [ "$ch" -ge 1 -a "$ch" -le $git_repos_n ]; then
                break
            fi
        done
        IFS='$NL	 '
        git_repo="$(echo "$git_repos" | tail -n +$ch | head -n 1 | awk '{ printf("%s\n", $2); }' )"
        
        echo "GIT_REPO:   $git_repo"
        echo "GIT_COMMIT: $git_commit"

        sed -i "s|^\(export[ 	]\+GEM_OQ_UI_API_GIT_REPO=\).*|\1$git_repo|g;s|^\(export[ 	]\+GEM_OQ_UI_API_GIT_VERS=\).*|\1$git_commit|g" $0 
    fi
    exit 0
fi

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
    echo "You are running the geonode installation script."
    echo
    echo "During this operation some git repositories will be downloaded into the current"
    echo "directory $PWD."
    echo
    read -p "press ENTER to continue or CTRL+C to abort:" a
    echo 
    sudo -p "To install geonode root permissions are needed.${NL}Please type password for $wai: " $0 "$wai" "$PWD"
    exit $?
else
    usage "$0" 1
fi


