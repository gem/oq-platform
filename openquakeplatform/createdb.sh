#!/bin/bash


export GEM_POSTGIS_PATH=/usr/share/postgresql/9.1/contrib/postgis-1.5
    sudo su - postgres -c "
if [ -d /opt/local/lib/postgresql90/bin ]; then
    export PATH=$PATH:/opt/local/lib/postgresql90
fi


createdb template_postgis
psql -d postgres -c \"UPDATE pg_database SET datistemplate='true' WHERE datname='template_postgis';\"
psql -f $GEM_POSTGIS_PATH/postgis.sql template_postgis
psql -f $GEM_POSTGIS_PATH/spatial_ref_sys.sql template_postgis
"


sudo su - postgres -c "
if [ -d /opt/local/lib/postgresql90/bin ]; then
    export PATH=$PATH:/opt/local/lib/postgresql90
fi

dropdb oqplatform 2> /dev/null
createdb oqplatform -T template_postgis
"
