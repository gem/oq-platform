These are the main steps to install the OpenQuake Platform on Ubuntu 12.04 LTS with nginx and uwsgi

## Install the base dependencies

```bash
sudo apt-get install build-essential python-dev python-imaging python-virtualenv git postgresql-9.1 postgresql-server-dev-9.1 postgresql-9.1-postgis openjdk-6-jre libxml2 libxml2-dev libxslt1-dev libxslt1.1 libblas-dev liblapack-dev curl wget xmlstarlet imagemagick gfortran
```

## Change the PostgreSQL configuration

On top the `pg_hba.conf` add:

```
local   all             all                                     trust
host    all             all             <cidr-address>          md5
```
Where **&lt;cidr-address&gt;** (i.e.: 10.0.3.0/24) is the network containing the **OpenQuake Engine Server** and the **OpenQuake Platform** servers. If both are installed locally on the same machine the "host" line can be skipped.


In `postgresql.conf` change:

`listen_addresses = '*'`

Then restart PostgreSQL

## Clone the GitHub repo
```bash
git clone http://github.com/gem/oq-platform.git
```

## Create the virtualenv
```bash
cd ~/oq-platform
virtualenv platform-env
. platform-env/bin/activate
```

## Install the software local dependencies
```bash
cd ~/oq-platform
pip install -e openquakeplatform
```

## Execute bootstrap
```bash
cd ~/oq-platform/openquakeplatform
fab bootstrap
```
And follow given instructions. At the end
```bash
fab stop
```

## Adjust the python configuration
```bash
cd ~/oq-platform/openquakeplatform/openquakeplatform
vim local_settings.py
```

## Change the GeoServer data security
```bash
cd ~/oq-platform/openquakeplatform
vim geoserver/data/security/auth/geonodeAuthProvider/config.xml
```
Change `<baseUrl>http://localhost:8000/</baseUrl>` to `<baseUrl>http://localhost:80/</baseUrl>`

## Modify paver to not start django webserver
```bash
cd ~/oq-platform/openquakeplatform
vim pavement.py
```
Comment lines `302,303`

## Start GeoServer
```bash
cd ~/oq-platform/openquakeplatform
fab start
```

## Collect static files
```bash
cd ~/oq-platform/openquakeplatform
python manage.py collectstatic
```

## Install nginx and uwsgi
```bash
sudo apt-get install nginx uwsgi uwsgi-plugin-python
```

## Configure nginx
```bash
cat <<'EOF' > /etc/nginx/conf.d/proxy.conf
client_max_body_size        100m;
send_timeout                1200;
proxy_connect_timeout       1200;
proxy_send_timeout          1200;
proxy_read_timeout          1200;
uwsgi_connect_timeout       1200;
uwsgi_send_timeout          1200;
uwsgi_read_timeout          1200;
EOF
```
```bash
vim /etc/nginx/sites-available/oq-platform
```
See https://github.com/gem/oq-platform/wiki/nginx-template

```bash
cd /etc/nginx/sites-enabled
rm default
ln -s ../sites-available/oq-platform .

service nginx restart
```

## Configure uwsgi
```bash
sudo -i

cat <<'EOF' > /etc/uwsgi/apps-available/geonode.ini
[uwsgi]
socket = /tmp/geonode.sock
vhost = true
plugins = python
master = true
enable-threads = true
uid = openquake
wsgi-file = /home/openquake/oq-platform/openquakeplatform/openquakeplatform/wsgi.py
virtualenv = /home/openquake/oq-platform/platform-env
EOF

cd /etc/uwsgi/apps-enabled && ln -s ../apps-available/geonode.ini

service uwsgi restart
```