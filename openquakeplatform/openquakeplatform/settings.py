# -*- coding: utf-8 -*-

# Django settings for the Openquake Platform project.
import os
import geonode

#
# General Django development settings
#

SITENAME = 'openquakeplatform'

# Defines the directory that contains the settings file as the PROJECT_ROOT
# It is used for relative settings elsewhere.
PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
GEONODE_ROOT = os.path.abspath(os.path.dirname(geonode.__file__))


# Setting debug to true makes Django serve static media and
# present pretty error pages.
DEBUG = TEMPLATE_DEBUG = True

# Set to True to load non-minified versions of (static) client dependencies
DEBUG_STATIC = False

# This is needed for integration tests, they require
# geonode to be listening for GeoServer auth requests.
os.environ['DJANGO_LIVE_TEST_SERVER_ADDRESS'] = 'localhost:8000'

# Defines settings for development
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': "oqplatform",
        'USER': 'oqplatform',
        'PASSWORD': 'openquake',
    },
    'geonode': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': "geonode",
        'USER': 'oqplatform',
        'PASSWORD': 'openquake',
    },
}

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en'

LANGUAGES = (
    ('en', 'English'),
    ('es', 'Español'),
    ('it', 'Italiano'),
    ('fr', 'Français'),
    ('de', 'Deutsch'),
    ('el', 'Ελληνικά'),
    ('id', 'Bahasa Indonesia'),
    ('zh-cn', '中文'),
    ('ja', '日本人'),
    ('fa', 'Persian'),
    ('pt', 'Portuguese'),
    ('ru', 'Russian'),
    ('vi', 'Vietnamese'),
    #('fil', 'Filipino'),
)

WSGI_APPLICATION = "openquakeplatform.wsgi.application"

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"
MEDIA_ROOT = os.path.join(PROJECT_ROOT, "uploaded/GeoArchive/")

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = "/uploaded/"

# Absolute path to the directory that holds static files like app media.
# Example: "/home/media/media.lawrence.com/apps/"
STATIC_ROOT = os.path.join(PROJECT_ROOT, "static_root")

# URL that handles the static files like app media.
# Example: "http://media.lawrence.com"
STATIC_URL = "/static/"

# Additional directories which hold static files
STATICFILES_DIRS = [
    os.path.join(PROJECT_ROOT, "static"),
    os.path.join(GEONODE_ROOT, "static"),
]

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # 'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Note that Django automatically includes the "templates" dir in all the
# INSTALLED_APPS, se there is no need to add maps/templates or admin/templates
TEMPLATE_DIRS = (
    os.path.join(PROJECT_ROOT, "templates"),
    os.path.join(GEONODE_ROOT, "templates"),
)

# Location of translation files
LOCALE_PATHS = (
    os.path.join(PROJECT_ROOT, "locale"),
    os.path.join(GEONODE_ROOT, "locale"),
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'e3enk@hpfyv)qc+_nm0mmt&hz+#l7fotm01oub*lz1^)5a*8(^'

# Location of url mappings
ROOT_URLCONF = 'openquakeplatform.urls'

# Site id in the Django sites framework
SITE_ID = 1

# Login and logout urls override
LOGIN_URL = '/account/login/'
LOGOUT_URL = '/account/logout/'

# Activate the Documents application
DOCUMENTS_APP = True
ALLOWED_DOCUMENT_TYPES = [
    'doc', 'docx', 'xls', 'xslx', 'pdf', 'zip', 'jpg', 'jpeg', 'tif',
    'tiff', 'png', 'gif', 'txt'
]

MAX_DOCUMENT_SIZE = 2  # MB


INSTALLED_APPS = (

    # Apps bundled with Django
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.sitemaps',
    'django.contrib.staticfiles',
    'django.contrib.messages',
    'django.contrib.humanize',
    'django.contrib.gis',

    # Third party apps
    'photologue',

    # Utility
    'pagination',
    'taggit',
    'taggit_templatetags',
    'south',
    'friendlytagloader',
    'geoexplorer',
    'django_extensions',

    # Development
    # 'devserver',

    # Theme
    "pinax_theme_bootstrap_account",
    "pinax_theme_bootstrap",
    'django_forms_bootstrap',

    # Social
    'account',
    'avatar',
    'dialogos',
    'agon_ratings',
    'notification',
    'announcements',
    'actstream',
    'user_messages',

    # GeoNode internal apps
    'geonode.people',
    'geonode.base',
    'geonode.layers',
    'geonode.upload',
    'geonode.maps',
    'geonode.proxy',
    'geonode.security',
    'geonode.search',
    'geonode.social',
    'geonode.catalogue',
    'geonode.documents',
    'geonode.social',

    # Our apps
    'openquakeplatform.isc_viewer',
    'openquakeplatform.ghec_viewer',
    'openquakeplatform.gaf_viewer',
    'openquakeplatform.geodetic',
    'openquakeplatform.exposure',
    'openquakeplatform.faulted_earth',
    'openquakeplatform.icebox',

    # gemecd
    'openquakeplatform.weblib',
    'openquakeplatform.econd',
    'openquakeplatform.gemecdwebsite',
)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s '
                      '%(process)d %(thread)d %(message)s'
        },
        'simple': {
            'format': '%(message)s',
        },
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
     }
    },
    'handlers': {
        'null': {
            'level': 'ERROR',
            'class': 'django.utils.log.NullHandler',
        },
        'console': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler',
        }
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "WARN",
        },
        "geonode": {
            "handlers": ["console"],
            "level": "ERROR",
        },
        "openquakeplatform": {
            "handlers": ["console"],
            "level": "DEBUG",
        },
        "gsconfig.catalog": {
            "handlers": ["console"],
            "level": "ERROR",
        },
        "owslib": {
            "handlers": ["console"],
            "level": "ERROR",
        },
        "pycsw": {
            "handlers": ["console"],
            "level": "ERROR",
        },
        'south': {
            "handlers": ["console"],
            "level": "ERROR",
        },
    },
}

#
# Customizations to built in Django settings required by GeoNode
#


TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    "django.core.context_processors.tz",
    'django.core.context_processors.media',
    "django.core.context_processors.static",
    'django.core.context_processors.request',
    'django.contrib.messages.context_processors.messages',
    'account.context_processors.account',
    'pinax_theme_bootstrap_account.context_processors.theme',
    # The context processor below adds things like SITEURL
    # and GEOSERVER_BASE_URL to all pages that use a RequestContext
    'geonode.context_processors.resource_urls',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # The setting below makes it possible to serve different languages per
    # user depending on things like headers in HTTP requests.
    'django.middleware.locale.LocaleMiddleware',
    'pagination.middleware.PaginationMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    # This middleware allows to print private layers for the users
    # that have the permissions to view them. It sets temporary the
    # involved layers as public before restoring the permissions.
    # Beware that for few seconds the involved layers are public there
    # could be risks. 'geonode.middleware.PrintProxyMiddleware',
)


# Replacement of default authentication backend in order to support
# permissions per object.
AUTHENTICATION_BACKENDS = ('geonode.security.auth.GranularBackend',)


def get_user_url(u):
    return u.profile.get_absolute_url()


ABSOLUTE_URL_OVERRIDES = {
    'auth.user': get_user_url
}

# Redirects to home page after login
# FIXME(Ariel): I do not know why this setting is needed,
# it would be best to use the ?next= parameter
LOGIN_REDIRECT_URL = "/"

#
# Settings for default search size
#
DEFAULT_SEARCH_SIZE = 10


#
# Settings for third party apps
#

# Agon Ratings
AGON_RATINGS_CATEGORY_CHOICES = {
    "maps.Map": {
        "map": "How good is this map?"
    },
    "layers.Layer": {
        "layer": "How good is this layer?"
    },
    "documents.Document": {
        "document": "How good is this document?"
    }
}

# Activity Stream
ACTSTREAM_SETTINGS = {
    'MODELS': ('auth.user', 'layers.layer', 'maps.map', 'dialogos.comment'),
    'FETCH_RELATIONS': True,
    'USE_PREFETCH': True,
    'USE_JSONFIELD': True,
    'GFK_FETCH_DEPTH': 1,
}

# For South migrations
SOUTH_MIGRATION_MODULES = {
    'avatar': 'geonode.migrations.avatar',
}
SOUTH_TESTS_MIGRATE = False

# Settings for Social Apps
AUTH_PROFILE_MODULE = 'people.Profile'
REGISTRATION_OPEN = False

# Email for users to contact admins.
THEME_ACCOUNT_CONTACT_EMAIL = 'admin@example.com'

#
# Test Settings
#

# Setting a custom test runner to avoid running the tests for
# some problematic 3rd party apps
TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

# Arguments for the test runner
NOSE_ARGS = [
    '--nocapture',
    '--detailed-errors',
    ]

#
# GeoNode specific settings
#

# If you override this settings in local_settings, please remember to
# also update the settings below which depends on SITEURL
SITEURL = "http://localhost:8000/"

# OGC (WMS/WFS/WCS) Server Settings
OGC_SERVER = {
    'default': {
        'BACKEND': 'geonode.geoserver',
        'LOCATION': 'http://localhost:8080/geoserver/',
        'PUBLIC_LOCATION' : SITEURL + 'geoserver/',
        'USER': 'admin',
        'PASSWORD': 'geoserver',
        'DATASTORE': 'default',   # 'datastore',
        'OPTIONS': {
            'MAPFISH_PRINT_ENABLED': True,
            'PRINTNG_ENABLED': True,
            'GEONODE_SECURITY_ENABLED': True,
            'GEOGIT_ENABLED': False,
            'WMST_ENABLED': False,
            'WPS_ENABLED': True,
            # Set to name of database in DATABASES dictionary to enable
        }
    }
}

# CSW settings
CATALOGUE = {
    'default': {
        # The underlying CSW implementation
        # default is pycsw in local mode (tied directly to GeoNode Django DB)
        'ENGINE': 'geonode.catalogue.backends.pycsw_local',
        # pycsw in non-local mode
        #'ENGINE': 'geonode.catalogue.backends.pycsw_http',
        # GeoNetwork opensource
        #'ENGINE': 'geonode.catalogue.backends.geonetwork',
        # deegree and others
        #'ENGINE': 'geonode.catalogue.backends.generic',

        # The FULLY QUALIFIED base url to the CSW instance for this GeoNode
        'URL': '%scatalogue/csw' % SITEURL,
        #'URL': 'http://localhost:8080/geonetwork/srv/en/csw',
        #'URL': 'http://localhost:8080/deegree-csw-demo-3.0.4/services',

        # login credentials (for GeoNetwork)
        'USER': 'admin',
        'PASSWORD': 'admin',
    }
}

# pycsw settings
PYCSW = {
    # pycsw configuration
    'CONFIGURATION': {
        'metadata:main': {
            'identification_title': 'OQ Catalogue',
            'identification_abstract': 'OQ abstract',
            'identification_keywords': (
                'sdi,catalogue,discovery,metadata,GeoNode'),
            'identification_keywords_type': 'theme',
            'identification_fees': 'None',
            'identification_accessconstraints': 'None',
            'provider_name': 'Organization Name',
            'provider_url': SITEURL,
            'contact_name': 'Lastname, Firstname',
            'contact_position': 'Position Title',
            'contact_address': 'Mailing Address',
            'contact_city': 'City',
            'contact_stateorprovince': 'Administrative Area',
            'contact_postalcode': 'Zip or Postal Code',
            'contact_country': 'Country',
            'contact_phone': '+xx-xxx-xxx-xxxx',
            'contact_fax': '+xx-xxx-xxx-xxxx',
            'contact_email': 'Email Address',
            'contact_url': 'Contact URL',
            'contact_hours': 'Hours of Service',
            'contact_instructions': 'openquake-users@google-groups.com',
            'contact_role': 'pointOfContact',
        },
        'metadata:inspire': {
            'enabled': 'true',
            'languages_supported': 'eng,gre',
            'default_language': 'eng',
            'date': 'YYYY-MM-DD',
            'gemet_keywords': 'Utility and governmental services',
            'conformity_service': 'notEvaluated',
            'contact_name': 'Organization Name',
            'contact_email': 'Email Address',
            'temp_extent': 'YYYY-MM-DD/YYYY-MM-DD',
        }
    }
}


# Default TopicCategory to be used for resources. Use the slug field here
DEFAULT_TOPICCATEGORY = 'location'
# Topic Categories list should not be modified (they are ISO). In case
# you absolutely need it set to True this variable
MODIFY_TOPICCATEGORY = False

MISSING_THUMBNAIL = 'geonode/img/missing_thumb.png'

# Search Snippet Cache Time in Seconds
CACHE_TIME = 0


# Uploader Settings
UPLOADER = {
    'BACKEND' : 'geonode.rest',
    'OPTIONS': {
        'TIME_ENABLED': False,
        'GEOGIT_ENABLED': False,
    }
}

# GeoNode javascript client configuration

# Where should newly created maps be focused?
DEFAULT_MAP_CENTER = (0, 0)

# How tightly zoomed should newly created maps be?
# 0 = entire world;
# maximum zoom is between 12 and 15 (for Google Maps, coverage varies by area)
DEFAULT_MAP_ZOOM = 0

MAP_BASELAYERS = [{
    "source": {
        "ptype": "gxp_wmscsource",
        "url": OGC_SERVER['default']['LOCATION'] + "wms",
        "restUrl": "/gs/rest"
        }
    }, {
    "source": {"ptype": "gxp_olsource"},
    "type": "OpenLayers.Layer",
    "args": ["No background"],
    "visibility": False,
    "fixed": True,
    "group":"background"
    }, {
    "source": {"ptype": "gxp_osmsource"},
    "type": "OpenLayers.Layer.OSM",
    "name":"mapnik",
    "visibility": False,
    "fixed": True,
    "group": "background"
    }, {
    "source": {"ptype": "gxp_mapquestsource"},
    "name": "osm",
    "group": "background",
    "visibility": True
    }, {
    "source": {"ptype": "gxp_mapquestsource"},
    "name": "naip",
    "group": "background",
    "visibility": False
    }, {
    "source": {"ptype": "gxp_bingsource"},
    "name": "AerialWithLabels",
    "fixed": True,
    "visibility": False,
    "group": "background"
    }, {
    "source": {"ptype": "gxp_mapboxsource"},
    }, {
    "source": {"ptype": "gxp_olsource"},
    "type": "OpenLayers.Layer.WMS",
    "group": "background",
    "visibility": False,
    "fixed": True,
    "args": [
        "bluemarble",
        "http://maps.opengeo.org/geowebcache/service/wms",
        {
            "layers": ["bluemarble"],
            "format": "image/png",
            "tiled": True,
            "tilesOrigin": [-20037508.34, -20037508.34]
        }, {"buffer": 0}
    ]
}]

LEAFLET_CONFIG = {
    'TILES_URL': 'http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png'
}


OQ_ENGINE_SERVER_DATABASE = "platform"


# Require users to authenticate before using Geonode
LOCKDOWN_GEONODE = True

# Add additional paths (as regular expressions) that don't require
# authentication. This URL needs to be hit by the oq-engine-server.
AUTH_EXEMPT_URLS = ('/icebox/calculation/(\d+)', '/geoserver/')

if LOCKDOWN_GEONODE:
    MIDDLEWARE_CLASSES = MIDDLEWARE_CLASSES + (
        'geonode.security.middleware.LoginRequiredMiddleware',)


# Load more settings from a file called local_settings.py if it exists
try:
    from local_settings import *
except ImportError:
    pass
