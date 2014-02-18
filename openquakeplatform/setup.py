import os
from distutils.core import setup


def read(*rnames):
    return open(os.path.join(os.path.dirname(__file__), *rnames)).read()


setup(
    name="openquakeplatform",
    version="0.1",
    author="",
    author_email="",
    description="openquakeplatform, based on GeoNode",
    long_description=(read('README.rst')),
    # Full list of classifiers can be found at:
    # http://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        'Development Status :: 2 - Pre-Alpha'
    ],
    license="BSD",
    keywords="openquakeplatform geonode django",
    url='https://github.com/oq-platform/openquakeplatform',
    packages=['openquakeplatform'],
    install_requires=[
        "agon-ratings==0.2",
        "beautifulsoup4==4.1.0",
        "dialogos==0.3",
        "django-activity-stream==0.4.5beta1",
        "django-announcements==1.0.2",
        "django-appconf==0.6",
        "django-downloadview==1.2",
        "django-extensions==1.1.1",
        "django-forms-bootstrap==2.0.3.post1",
        "django-friendly-tag-loader==1.1",
        "django-geoexplorer==3.0.5",
        "django-jsonfield==0.9.10",
        "django-nose==1.2",
        "django-notification==1.0",
        "django-pagination==1.0.7",
        "django-taggit==0.10a1",
        "django-taggit-templatetags==0.4.6dev",
        "django-templatetag-sugar==0.1",
        "django-user-accounts==1.0b14",
        "geonode-avatar==2.1.1",
        "gisdata==0.5.4",
        "gsconfig==0.6.6",
        "lxml==2.3.2",
        "OWSLib==0.7.2",
        "pinax-theme-bootstrap==3.0a11",
        "pinax-theme-bootstrap-account==1.0b2",
        "pycsw==1.6.0",
        "httplib2==0.7.4",
        "Paver==1.2.2",
        "user-messages==0.1.1",
        "psycopg2==2.4.5",
        "numpy==1.6.1",
        "Django==1.5.5",
        "GeoNode==2.0",
        "django-photologue==2.6.1",
        "fabric"
    ],
    include_package_data=True,
    zip_safe=False,
)
