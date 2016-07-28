import unittest
from inspect import isclass

def import_by_name(dotname):
    components = dotname.split('.')
    leaf = components[-1]
    mod = __import__(dotname, fromlist=[leaf])
    return mod

def get_checks(pkgname):
    cls = import_by_name(pkgname)
    for objname in dir(cls):
         obj = getattr(cls, objname)
         if isclass(obj) and issubclass(obj, unittest.TestCase):
             newname = "%s__%s" % (pkgname.replace('.', '__'), objname)
             globals()[newname] = obj
             obj.__name__ = newname

for pkgname in ['openquakeplatform_ipt.test', 'openquakeplatform_taxtweb.test']:
    try:
        get_checks(pkgname)
    except:
        pass
