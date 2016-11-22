These are the main steps to install the OpenQuake Platform on Ubuntu 12.04 LTS in a production environment

## Clone the GitHub repo
```bash
cd ~
git clone http://github.com/gem/oq-platform.git
```

## Add production data
Create a folder named ```private_data``` sibling of ```oq-platform``` folder.
### Vulnerability
Download complete geographical data information from: [http://ftp.openquake.org/oq-platform/vulnerability/vuln_geo_applicability_data.csv.bz2](http://ftp.openquake.org/oq-platform/vulnerability/vuln_geo_applicability_data.csv.bz2) ( use sha1sum to check the integrity of the file comparing the result with the content of [http://ftp.openquake.org/oq-platform/vulnerability/vuln_geo_applicability_data.csv.bz2.sha1](http://ftp.openquake.org/oq-platform/vulnerability/vuln_geo_applicability_data.csv.bz2.sha1) ).

Decompress the ```vuln_geo_applicability_data.csv.bz2``` file with bunzip2 . 

Copy the file ```vuln_geo_applicability_data.csv``` into ```private_data``` folder .


## Execute the deployment script
```bash
cd ~
oq-platform/openquakeplatform/bin/deploy.sh --host <serverhost>
```
where ```<serverhost>``` is the FQDN of the server which hosts the installation (i.e. platform.openquake.org)

To see all the ```deploy.sh``` options execute:
```
oq-platform/openquakeplatform/bin/deploy.sh --help
```

## Extra optional steps 

### Tune local_settings

Customize the ```/etc/openquake/platform/local_settings.py``` as you need; for example add:
```python

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'localhost'
EMAIL_PORT = 25

DEFAULT_FROM_EMAIL = 'info@mydomain.tld'
THEME_ACCOUNT_CONTACT_EMAIL = 'info@mydomain.tld'
```

### Speedups
To improve the performances see:
* [GeoServer speedups](GeoServer-speedups.md)
* [HTTPS using NGiNX and uWSGI](Using-nginx-and-uWSGI-in-HTTPS.md)
