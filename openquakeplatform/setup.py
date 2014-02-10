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
        'Development Status :: 1 - Planning',
    ],
    license="BSD",
    keywords="openquakeplatform geonode django",
    url='https://github.com/openquakeplatform/openquakeplatform',
    packages=['openquakeplatform'],
    install_requires=[
        "django==1.5.5",
        "geonode==2.0.0",
        "psycopg2",
        "numpy",
        "fabric",
        "django-photologue"
    ],
    include_package_data=True,
    zip_safe=False,
)
