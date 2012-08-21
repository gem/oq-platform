#!/bin/bash

GEM_BASEDIR="$1"
GEM_TMPDIR="$2"
SITE_HOST="$3"

for conf_file in "$GEM_BASEDIR"oq-ui-geoserver/geoserver/WEB-INF/web.xml /etc/geonode/geoserver/web.xml; do
    fname="$(basename "$conf_file")"
    cat "$conf_file" | \
        sed -n '/^.*<param-name>GEONODE_BASE_URL<\/param-name>/{p;n;x;d};p'   | sed "s@^\( *\)\(<param-name>GEONODE_BASE_URL</param-name>.*\)@\1\2\n\1<param-value>http://$SITE_HOST/</param-value>@g" | \
        sed -n '/^.*<param-name>GEOSERVER_DATA_DIR<\/param-name>/{p;n;x;d};p' | sed "s@^\( *\)\(<param-name>GEOSERVER_DATA_DIR</param-name>.*\)@\1\2\n\1<param-value>/var/lib/tomcat6/webapps/geoserver/data/</param-value>@g" > $GEM_TMPDIR/${fname}.new
    cp $GEM_TMPDIR/${fname}.new "$conf_file"
done
