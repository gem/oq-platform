import unittest
from inspect import isclass

def import_by_name(clsname):
    components = clsname.split('.')
    leaf = components[-1]
    mod = __import__(clsname, fromlist=[leaf])
    return mod

def get_checks(clsname):
    cls = import_by_name(clsname)
    for objname in dir(cls):
         obj = getattr(cls, objname)
         if isclass(obj):
             if issubclass(obj, unittest.TestCase):
                 newname = "%s__%s" % (clsname.replace('.', '__'), objname)
                 globals()[newname] = obj
                 obj.__name__ = newname

for clsname in ['openquakeplatform_ipt.test', 'openquakeplatform_taxtweb.test']:
    try:
        get_checks(clsname)
    except:
        pass
