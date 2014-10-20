#!/bin/bash
# set -x
export GEM_GN_LOCSET="/etc/openquake/platform/local_settings.py"
export GEM_CERT_KEY=oq-platform.key
export GEM_CERT_CRT=oq-platform.crt
export GEM_CA_CERT=oq-platform_CA.pem
export GEM_APACHE_CONF=/etc/apache2/sites-available/oqplatform
export GEM_GEOSERVER_CONFIG="/usr/share/geoserver/WEB-INF/web.xml"
export GEM_GEOSERVER_GLOBAL="/usr/share/geoserver/data/global.xml"
export TB='	'
export NL='
'

#
#  FUNCTIONS
usage () {
    local name ret
    name=$1
    ret=$2
    cat <<EOF

USAGE (with root permissions):
    $name <help|-h|--help> - this help
    $name http2https       - perform migration from http to https protocol
    $name revert           - recovery all configuration to http protocol

EOF
    exit $ret
}

#
#  MAIN

if [ "$1" = "help" -o "$1" = "-h" -o "$1" = "--help" ]; then
    usage $0 0
fi

if [ $(id -u) -ne 0 ]; then
    usage $0 2
fi
#
#  save current directory
export norm_dir="$(pwd)/"


if [ "$1" = "revert" ]; then
    service tomcat7 stop
    service apache2 stop

    for cfg in "$GEM_GN_LOCSET" "$GEM_APACHE_CONF" "$GEM_GEOSERVER_CONFIG" "$GEM_GEOSERVER_GLOBAL"; do
        if [ ! -f "$cfg".ht2hts ]; then
            echo "${cfg}.ht2hts file not found, revert failed"
            exit 1
        else
            cp "${cfg}.ht2hts" "${cfg}"
        fi
    done

    echo "The keystore password for the keytool command below is 'changeit'."
    # keytool -delete -noprompt -alias <alias_name> -keystore /etc/ssl/certs/java/cacerts
    keytool -delete -noprompt -alias gem_ca -keystore /etc/ssl/certs/java/cacerts
    keytool -delete -noprompt -alias geonodessl -trustcacerts -keystore /etc/ssl/certs/java/cacerts

    service tomcat7 start
    service apache2 start

    exit 0
elif [ "$1" != "http2https" ]; then
    usage $0 1
fi

#
#  verify existence of required files
for reqfile in "${norm_dir}private_data/$GEM_CERT_KEY" "${norm_dir}private_data/$GEM_CERT_CRT" "${norm_dir}private_data/$GEM_CA_CERT" "$GEM_GN_LOCSET" "$GEM_APACHE_CONF" "$GEM_GEOSERVER_CONFIG" "$GEM_GEOSERVER_GLOBAL" ; do
    if [ ! -f "$reqfile" ]; then
        echo "$reqfile not found"
        exit 1
    fi
done

#
# backup all config files to allow revert command
for cfg in "$GEM_GN_LOCSET" "$GEM_APACHE_CONF" "$GEM_GEOSERVER_CONFIG" "$GEM_GEOSERVER_GLOBAL"; do
    if [ ! -f "$cfg".ht2hts ]; then
        cp "$cfg" "$cfg".ht2hts
    fi
done

apt-get install xmlstarlet
export SITEHOST="$(grep '^SITEURL' "$GEM_GN_LOCSET" | sed 's@.*https\?://@@g;s@/.*@@g')"
if [ ! $SITEHOST ]; then
    echo "SITEHOST not identified"
    exit 1
fi

service tomcat7 stop
service apache2 stop

#
# enable ssl module
a2enmod ssl

#
# copy certificates
cp "${norm_dir}private_data/$GEM_CERT_KEY" /etc/ssl/private/
chown root:ssl-cert "/etc/ssl/private/$GEM_CERT_KEY"
chmod 640 "/etc/ssl/private/$GEM_CERT_KEY"
cp "${norm_dir}private_data/$GEM_CERT_CRT" /etc/ssl/certs/
chown root:root "/etc/ssl/certs/$GEM_CERT_CRT"
chmod 644 "/etc/ssl/certs/$GEM_CERT_CRT"
cp "${norm_dir}private_data/$GEM_CA_CERT" /etc/ssl/certs/
chown root:root "/etc/ssl/certs/$GEM_CA_CERT"
chmod 644 "/etc/ssl/certs/$GEM_CA_CERT"

for cacerts in /var/lib/geonode/build/httplib2/python2/httplib2/cacerts.txt /var/lib/geonode/build/httplib2/python3/httplib2/cacerts.txt /usr/share/pyshared/httplib2/cacerts.txt /usr/lib/python2.6/dist-packages/httplib2/cacerts.txt /usr/lib/python2.7/dist-packages/httplib2/cacerts.txt /var/lib/geonode/local/lib/python2.7/site-packages/httplib2/cacerts.txt; do
    if [ -f "$cacerts" ]; then
        grep -q "/etc/ssl/certs/$GEM_CERT_CRT" "$cacerts"
        if [ $? -ne 0 ]; then
            echo "/etc/ssl/certs/$GEM_CERT_CRT"  >> $cacerts
            cat "/etc/ssl/certs/$GEM_CERT_CRT" >> $cacerts
        fi
        grep -q "/etc/ssl/certs/$GEM_CA_CERT" "$cacerts"
        if [ $? -ne 0 ]; then
            echo "/etc/ssl/certs/$GEM_CA_CERT"  >> $cacerts
            cat "/etc/ssl/certs/$GEM_CA_CERT" >> $cacerts
        fi
    fi
done

echo "The keystore password for the keytool command below is 'changeit'."
# keytool -delete -noprompt -alias <alias_name> -keystore /etc/ssl/certs/java/cacerts
keytool -import -noprompt -alias gem_ca -keystore /etc/ssl/certs/java/cacerts -file "${norm_dir}private_data/$GEM_CA_CERT"
openssl x509 -in "${norm_dir}private_data/${GEM_CERT_CRT}" >"${norm_dir}private_data/${GEM_CERT_CRT}.notxt"
keytool -import -noprompt -alias geonodessl -trustcacerts -keystore /etc/ssl/certs/java/cacerts -file "${norm_dir}private_data/${GEM_CERT_CRT}.notxt"

#
# update apache configuration
grep -q "^<VirtualHost \*:80>$" "$GEM_APACHE_CONF" && sed -i "s@^<VirtualHost \*:80>@<IfModule mod_ssl.c>\n<VirtualHost _default_:443>@g;\
s@</VirtualHost>@\
    SSLEngine on\n\
    SSLCertificateFile    /etc/ssl/certs/oq-platform.crt\n\
    SSLCertificateKeyFile /etc/ssl/private/oq-platform.key\n\
    SSLProtocol All -SSLv2 -SSLv3\n\
    BrowserMatch \"MSIE [2-6]\" nokeepalive ssl-unclean-shutdown downgrade-1.0 force-response-1.0\n\
    # MSIE 7 and newer should be able to use keepalive\n\
    BrowserMatch \"MSIE [17-9]\" ssl-unclean-shutdown\n\
</VirtualHost>\n\
</IfModule>\n\
\n\
<VirtualHost  *:80>\n\
    Redirect permanent / https://$SITEHOST/\n\
</VirtualHost>\
@g" "$GEM_APACHE_CONF"

#
# geonode local config file fix
sed -i "s@\([ 	]*SITEURL *= *['\"]\)https\?://\([^'\"]*[^'\"]\)@\1https://\2@g" "$GEM_GN_LOCSET"
echo "AVATAR_GRAVATAR_SSL = True" >> "$GEM_GN_LOCSET"

#
# geoserver config configuration
xmlstarlet ed -S -L \
    -u '//context-param[param-name="GEONODE_BASE_URL"]/param-value' -v "https://${SITEHOST}/" \
    -s '/web-app' -t elem -n 'context-param-oq-temp' -v '' \
    -s '/web-app/context-param-oq-temp' -t elem -n 'param-name' -v 'PROXY_BASE_URL' \
    -s '/web-app/context-param-oq-temp' -t elem -n 'param-value' -v "https://${SITEHOST}/geoserver/" \
    -r '/web-app/context-param-oq-temp' -v 'context-param' \
"$GEM_GEOSERVER_CONFIG"

#
# geoserver global configuration
xmlstarlet ed -S -L -O -s '//global' -t elem -n "proxyBaseUrl" -v "https://${SITEHOST}/geoserver/" "$GEM_GEOSERVER_GLOBAL"

c_rehash

service apache2 start
service tomcat7 start

echo "wait for the real tomcat start (tail -f /var/log/geonode/tomcat.log to be sure)"
