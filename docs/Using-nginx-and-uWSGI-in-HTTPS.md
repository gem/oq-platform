**Work in progress**

```bash
sudo apt-get install nginx uwsgi
```

## nginx config example
```nginx
server {
        listen       80;
        server_name myhost.domain.tld;

        rewrite        ^ https://$server_name$request_uri? permanent;
}

server {
        listen   443; ## listen for ipv4; this line is default and implied

        server_name myhost.domain.tld;

        ssl on;
        ssl_certificate     /etc/ssl/mycert/mycert-bundle.crt;
        ssl_certificate_key /etc/ssl/mycert/mycert.key;

        location / {
                include     uwsgi_params;
                uwsgi_pass  unix:///tmp/geonode.sock;
                uwsgi_param HTTPS on;
                uwsgi_param UWSGI_SCHEME https;
        }

        location /geoserver {
                proxy_pass http://127.0.0.1:8080;
                proxy_set_header   Host              $host;
                proxy_set_header   X-Real-IP         $remote_addr;
                proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Proto $scheme;
                proxy_redirect     http:// https://;
        }

        location /uploaded/  {
                alias /var/www/openquake/platform/uploaded/;
        }

        location  /static/ {
                alias /var/www/openquake/platform/static/;
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
                root /usr/share/nginx/www;
        }

        location ~ /\.ht {
                deny all;
        }
}
```

## uWSGI config example
```nginx
[uwsgi]
socket = /tmp/geonode.sock
vhost = true
plugins = python
master = true
enable-threads = true
uid = www-data
wsgi-file = /usr/local/lib/python2.7/dist-packages/openquakeplatform/wsgi.py
processes = 4
```