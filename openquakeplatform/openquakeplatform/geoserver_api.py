import os
import urllib2
from urlparse import urljoin as _urljoin

# try to guess the geoserver base url from the settings. If settings
# can not be imported (this module can be used also by the
# installation script), then guess a reasonable default for a
# development environment
try:
    from django.conf import settings
    GEOSERVER_BASE_URL = "%srest/" % settings.OGC_SERVER['default']['LOCATION']
except:
    GEOSERVER_BASE_URL = 'http://127.0.0.1:8080/geoserver/rest/'

#: GeoServer workspace name
WS_NAME = 'oqplatform'
#: GeoServer datastore name
DS_NAME = 'oqplatform'
FEATURETYPES_URL_DICT = dict(ws=WS_NAME, ds=DS_NAME)
FEATURETYPES_URL = 'workspaces/%(ws)s/datastores/%(ds)s/featuretypes.xml'
FEATURETYPE_URL = 'workspaces/%(ws)s/datastores/%(ds)s/featuretypes/%%s.xml'
STYLE_URL = 'styles/%s.xml'
LAYER_URL = 'layers/%(ws)s:%%s' % dict(ws=WS_NAME)

XML_CONTENT_TYPE = 'text/xml'
SLD_CONTENT_TYPE = 'application/vnd.ogc.sld+xml'


def geoserver_rest(
        url, file_path=None, base_url=GEOSERVER_BASE_URL,
        username='admin', password='geoserver',
        content_type=XML_CONTENT_TYPE,
        method='POST',
        message=None,
        substitutions=None,
        raise_errors=True):
    headers = {}
    authinfo = urllib2.HTTPPasswordMgrWithDefaultRealm()
    authinfo.add_password(None, base_url, username, password)
    urllib2.install_opener(
        urllib2.build_opener(
            urllib2.HTTPBasicAuthHandler(authinfo)))
    headers['Content-Type'] = content_type
    if file_path is not None:
        content = file(file_path).read()
        if substitutions:
            content = content % substitutions
        headers['Content-Length'] = len(content)
    else:
        content = None
    url = _urljoin(base_url, url)
    request = urllib2.Request(url,
                              data=content,
                              headers=headers)
    request.get_method = lambda: method
    if message is not None:
        print message
    else:
        print "Url: %s, method: %s" % (url, method)

    try:
        print urllib2.urlopen(request).read()
    except urllib2.HTTPError as e:
        print "Error %s: %s" % (e.code, e.reason)
        print "Url: %s, method: %s" % (url, method)
        print content
        if raise_errors:
            raise e


def _collect(directory, ext='xml'):
    """
    Given a directory, collect all .xml (or whatever type) files in the
    directory (not recursive) and return as a list of absolute file paths.
    """
    ext = ext.lower()

    return [os.path.abspath(os.path.join(directory, x))
            for x in os.listdir(directory)
            if x.lower().endswith('.%s' % ext)]


def load_features(app_name, files=None, substitutions=None, fe_dict=None):
    if fe_dict is None:
	fe_dict = FEATURETYPES_URL_DICT

    features_files = files or _collect('gs_data/%s/features' % app_name)
    for ff in features_files:
        geoserver_rest(
            (FEATURETYPES_URL % fe_dict), ff,
            message='Creating %s layer...' % app_name,
            substitutions=substitutions)


def load_styles(app_name, files=None, substitutions=None):
    # Add styles:
    styles_files = files or _collect('gs_data/%s/styles' % app_name)
    for style in styles_files:
        sld = os.path.splitext(style)[0] + ".sld"
        # XML first:
        geoserver_rest(
            'styles.xml',
            style,
            message='Creating %s style...' % app_name,
            substitutions=substitutions)

        # Then update (PUT) the SLD:
        sld_basename = os.path.basename(sld)
        geoserver_rest(
            'styles/%s' % sld_basename,
            sld,
            method='PUT',
            content_type=SLD_CONTENT_TYPE,
            message='Creating %s SLD...' % app_name,
            substitutions=substitutions)


def load_layers(app_name, files=None, substitutions=None):
    layer_files = files or (_collect('gs_data/%s/layers' % app_name))
    for layer_file in layer_files:
        layer_basename = os.path.basename(layer_file)
        layer_name, _ext = os.path.splitext(layer_basename)
        geoserver_rest(
            LAYER_URL % layer_name,
            layer_file,
            method='PUT',
            message='Updating %s layer...' % app_name,
            substitutions=substitutions)
