#!/usr/bin/python
import sys
sys.path.append('/var/lib/geonode/src/GeoNodePy')
sys.path.append('/var/lib/geonode/src/GeoNodePy/geonode')

import local_settings
from lxml import etree

def usage(name, ret):
    print "USAGE:"
    print "  %s <install|template> <file> [<file2> ...]" % name
    sys.exit(ret)

def add_or_repl(doc, name, value):
    matcs = doc.xpath("//dataStore/connectionParameters/entry[@key='%s']" % name);

    if len(matcs) > 1:
        print "wrong number of passwd tags into [%s] file" % fname
        sys.exit(1)

    elif len(matcs) == 1:
        matc = matcs[0]
        matc.text = value

    else:
        matcs = doc.xpath("//dataStore/connectionParameters");
        if len(matcs) != 1:
            print "wrong number of connectionParameters tags into [%s] file" % fname
            sys.exit(1)
        matc = matcs[0]
        newel = etree.SubElement(matc, "entry", key=name)
        newel.text = value
    return


if __name__ == '__main__':
    if len(sys.argv) < 3:
	usage(sys.argv[0], 3)

    if sys.argv[1] == 'install':
        db_host     = local_settings.DATABASE_HOST
        db_port     = local_settings.DATABASE_PORT
        db_database = local_settings.DATABASE_NAME
        db_user     = local_settings.DATABASE_USER
        db_passwd   = local_settings.DATABASE_PASSWORD
    elif sys.argv[1] == 'template':
        db_host     = 'DATABASE_HOST'
        db_port     = 'DATABASE_PORT'
        db_database = 'DATABASE_NAME'
        db_user     = 'DATABASE_USER'
        db_passwd   = 'DATABASE_PASSWORD'
    else:
        usage(sys.argv[0],3)

    for fid in range(2,len(sys.argv)):
        fname = sys.argv[fid]
        print "Processing [%s]" % fname
        doc = etree.parse(fname)
        if doc == None:
            print "an error occur during [%s] xml parsing" % fname

        add_or_repl(doc, "host",     db_host)
        add_or_repl(doc, "port",     db_port)
        add_or_repl(doc, "database", db_database)
        add_or_repl(doc, "user",     db_user)
        add_or_repl(doc, "passwd",   db_passwd)
                
        try:
            f = file(fname, 'w')
        except:
            print "file [%s] not found" % fname
            sys.exit(1)

        f.write(etree.tostring(doc))
        f.close()
 
        del doc

    sys.exit(0)

