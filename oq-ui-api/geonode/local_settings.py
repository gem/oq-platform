import os
import geonode

DEBUG = TEMPLATE_DEBUG = True

SITENAME = 'GeoNode'
SITEURL = 'http://176.58.122.113/'

DATABASE_ENGINE = 'postgresql_psycopg2'
DATABASE_NAME = 'geonode'
DATABASE_USER = 'geonode'
DATABASE_PASSWORD = 'PEKEAlgK'
DATABASE_HOST = 'localhost'
DATABASE_PORT = '5432'

# Make geonode upload vector layers directly to postgis
DB_DATASTORE_NAME = 'postgres_imports'
DB_DATASTORE_DATABASE = DATABASE_NAME
DB_DATASTORE_USER = DATABASE_USER
DB_DATASTORE_PASSWORD = DATABASE_PASSWORD
DB_DATASTORE_HOST = DATABASE_HOST
DB_DATASTORE_PORT = DATABASE_PORT
DB_DATASTORE_TYPE='postgis'

# Django 1.3 compatibility
DATABASES = {
      'default': {
#             'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'ENGINE': 'django.contrib.gis.db.backends.postgis',
            'NAME': DATABASE_NAME,
            'USER': DATABASE_USER,
            'PASSWORD': DATABASE_PASSWORD,
            'HOST': DATABASE_HOST,
            'PORT': DATABASE_PORT,
        }
    }

DB_DATASTORE=True

LANGUAGE_CODE = 'en'

MEDIA_ROOT = '/var/www/geonode/uploaded'
STATIC_ROOT = '/var/www/geonode/static/'

# secret key used in hashing, should be a long, unique string for each
# site.  See http://docs.djangoproject.com/en/1.2/ref/settings/#secret-key
SECRET_KEY = '1XtHOrY3tzig5gt7Ey'

# The FULLY QUALIFIED url to the GeoServer instance for this GeoNode.
GEOSERVER_BASE_URL = SITEURL + 'geoserver/'

# The FULLY QUALIFIED url to the GeoNetwork instance for this GeoNode
GEONETWORK_BASE_URL = SITEURL + 'geonetwork/'

# The username and password for a user with write access to GeoNetwork
GEONETWORK_CREDENTIALS = 'admin', 'admin'
GEOSERVER_CREDENTIALS = 'geoserver', SECRET_KEY

# A Google Maps API key is needed for the 3D Google Earth view of maps
# See http://code.google.com/apis/maps/signup.html
GOOGLE_API_KEY = ''

GEONODE_ROOT = os.path.dirname(geonode.__file__)

TEMPLATE_DIRS = (
    '/etc/geonode/templates.apps',
    '/etc/geonode/templates',
    os.path.join(GEONODE_ROOT, 'templates'),
    os.path.join(GEONODE_ROOT, 'gemecdwebsite'),
    os.path.join(GEONODE_ROOT, 'gemecdwebsite/templates'),

)

# Additional directories which hold static files
STATICFILES_DIRS = [
    '/etc/geonode/static.apps',
    '/etc/geonode/static',
    '/etc/geonode/media',
    os.path.join(GEONODE_ROOT, 'static'),
]

MAP_BASELAYERS = [{
    'source': {'ptype': 'gxp_tilestreamsource'}, 
    }, {  

    "source": {
        "ptype": "gxp_wmscsource",
        "url": GEOSERVER_BASE_URL + "wms",
        "restUrl": "/gs/rest"
     }
  },{
    "source": {"ptype": "gx_olsource"},
    "type":"OpenLayers.Layer",
    "args":["No background"],
    "visibility": False,
    "fixed": True,
    "group":"background"
  }, {
    "source": {"ptype": "gx_olsource"},
    "type":"OpenLayers.Layer.OSM",
    "args":["OpenStreetMap"],
    "visibility": False,
    "fixed": True,
    "group":"background"
  }, {
    "source": {"ptype": "gxp_mapquestsource"},
    "name":"osm",
    "group":"background",
    "visibility": True
  }, {
    "source": {"ptype": "gxp_mapquestsource"},
    "name":"naip",
    "group":"background",
    "visibility": False
  }, {
    "source": {"ptype": "gxp_bingsource"},
    "name": "AerialWithLabels",
    "fixed": True,
    "visibility": False,
    "group":"background"
  },{
    "source": {"ptype": "gxp_mapboxsource"},
  }
]

# Uncomment the following to receive emails whenever there are errors in GeoNode
#ADMINS = (
#            ('John', 'john@example.com'), 
#         )

# Uncomment the following to use a Gmail account as the email backend
#EMAIL_USE_TLS = True
#EMAIL_HOST = 'smtp.gmail.com'
#EMAIL_HOST_USER = 'youremail@gmail.com'
#EMAIL_HOST_PASSWORD = 'yourpassword'
#EMAIL_PORT = 587

# For more information on available settings please consult the Django docs at
# https://docs.djangoproject.com/en/dev/ref/settings
SOUTH_DATABASE_ADAPTERS = { 
    'default': 'south.db.postgresql_psycopg2',
}
POSTGIS_VERSION = '1.5.3'
GEOCLUDGE_JAR_PATH = '/usr/share/java'
