__author__ = 'Simon Ruffle, CAR'


from django.db.models import get_model
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from openquakeplatform.econd import models
from lxml import etree
#import networkx
#from openquake import producer
import platform
from datetime import datetime
from django.db.models import Max
from email.utils import parsedate_tz
from django.utils.encoding import smart_str, smart_unicode

import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


class NRMLImporter:

    PATH_FILE='' #folder containing the input files
    LOG_PATH_FILE='' #folder containing the log files
    CURRENT_FILE_NAME = ''  #the name of the input file we are reading from. The log file is the same name with .log on the end.
    logmessages = []        #list containing messages to write to the log file
    aborted = False         #global flag set true if the process has been self.aborted, causes rollback of transaction
    abortmessage = ''       #global message set at self.abort
    uid = 0                 # global - the current users user id from drupal
    current_study_type = '' # global we keep track of the current study because inventory classes, damage levels and casualty levels all parent off the current study
    current_study_id = 0

    def __init__(self):
        # set up class constants
        if platform.system() == 'Windows':
            self.PATH_FILE='C:\\inetpub\\wwwroot\\Python\\gemecd\\uploads\\' #folder containing the input files
            self.LOG_PATH_FILE='C:\\inetpub\\wwwroot\\Python\\gemecd\\uploads\\' #folder containing the log files
        else:
            self.PATH_FILE='/var/lib/geonode/src/GeoNodePy/geonode/uploads/' #folder containing the input files
            self.LOG_PATH_FILE='/var/lib/geonode/src/GeoNodePy/geonode/uploads/' #folder containing the log files
     
    def abort (self, message ):
        #global self.aborted,self.abortmessage
        self.abortmessage = message
        self.aborted = True
        self.logmessages.append('<b>abort: ' + message + '</b>')
        self.write_logfile(self.LOG_PATH_FILE + self.CURRENT_FILE_NAME + '.htm',self.logmessages)
        #raise CommandError(message)

    def getabortmessage(self):
        return self.abortmessage
    
    def write_logfile(self, path, values):
        # write out the log file. Entries for the log file are appended to the global list self.logmessages
        out_file = open(path,"w")
        out_file.write('Log file for GEMECD NRML file import version 1.1 ' + str(datetime.now()) + '<br />\n')
    
        for i in range(len(values)):
            out_file.write(smart_str(values[i]) + '<br />\n')
    
        out_file.close()
    
    
    def process_entity (self, parenttype, parentid, element, level):
        #recursively process a database entity
        current_record_id = 0
        current_record = None
    
        level += 1
    
        current_model = get_model('econd', element.tag)
    
        if current_model is not None:
    
            num_records = 0
    
            #special code to identify USGS event id
            name = element.find("usgsshakemapid")
            if name is not None:
                self.logmessages.append('finding record with usgsshakemapid ' + name.text + ' in table ' + element.tag)
    
                try:
                    current_record = current_model.objects.filter(usgsshakemapid=name.text)
                    if parentid != 0 :
                        current_record = current_record.filter(parentid=parentid)
                        if  parenttype != '0':
                            current_record = current_record.filter(parenttype=parenttype)
                    num_records = len(current_record)  #actually reads the record
    
                except BaseException, e:
                    errmsg = 'failed to read table ' + element.tag + ': ' + str(e)
                    logger.error(errmsg, exc_info=True)
                    self.abort(errmsg)

            #end of special code to identify USGS event id
    
            # normal name lookup if the USGS lookup did not yield anything
            if num_records == 0:
                name =  element.find("name")
    
            if name is not None:
    
                if num_records == 0: #if the usgs lookup did not find anything proceed as normal
                    self.logmessages.append('finding record with name ' + name.text + ' in table ' + element.tag)
    
                    try:
                        current_record = current_model.objects.filter(name=name.text)
                        if parentid != 0 :
                            current_record = current_record.filter(parentid=parentid)
                            if  parenttype != '0':
                                current_record = current_record.filter(parenttype=parenttype)
                        num_records = len(current_record)  #actually reads the record
    
                    except BaseException, e:
                        errmsg = 'failed to read table ' + element.tag + ': ' + str(e))
                        logger.error(errmsg, exc_info=True)
                        self.abort(errmsg)
    
                if num_records > 1:
                    self.abort('more than one record with same name found')

                if not self.aborted:
                    if num_records == 1:
                        current_record_id = current_record[0].id
    
                        if current_record[0].ownerid != uid:
                            self.abort('attempt to update record not owned by this user (' + str(uid) + '):' + element.tag + ' ' + name.text + ', record id ' + str(current_record_id))
                        if not self.aborted:
                            # found record, can now update it
                            self.logmessages.append('updating '  + element.tag + ' ' + name.text + ' (' + str(current_record_id) + ')')
    
                            # update last updated fields
                            current_record[0].lastupdatebyid = uid
                            current_record[0].lastupdate = datetime.now()
                            current_record[0].save()
    
                            # now iterate all the remaining fields to populate them (see below)
    
                    else:
                        # create a new record
                        self.logmessages.append('creating record with name ' + name.text + ' in table ' + element.tag)
    
                        new_record = current_model()
    
                        try:
                            # set the up new record
    
                            # populate any null integer fields
                            for field in current_model._meta.get_all_field_names():
                                if field not in ['parentid', 'name']:
                                    if current_model._meta.get_field(field).get_internal_type() == 'IntegerField' and not current_model._meta.get_field(field).null:
                                        #field does not allow nulls
                                        setattr(new_record, field, 0 )
    
                                    # set any defaults
                                #for field in current_model._meta.get_all_field_names():
                                    if current_model._meta.get_field(field).has_default():
                                        if new_record._meta.get_field(field).get_internal_type() == 'ForeignKey':
                                            fkdefault = new_record._meta.get_field(field).rel.to.objects.get(pk=current_model._meta.get_field(field).get_default())
                                            setattr(new_record, field, fkdefault)
                                        else:
                                            setattr(new_record, field, current_model._meta.get_field(field).get_default() )
    
                                #for field in current_model._meta.get_all_field_names():
                                    if current_model._meta.get_field(field).name == 'guid' and not current_model._meta.get_field(field).null:
                                        #field does not allow nulls
                                        setattr(new_record, field, '00000000-0000-0000-0000-000000000000' )  # a valid value for uuid type in PostGres
    
                        except BaseException, e :
                            errmsg = 'unable to initialise new record ' + name.text + ' in table ' + element.tag + ': ' + str(e)
                            logger.error(errmsg, exc_info=True)
                            self.abort(errmsg)
    
                        # now provide the field values we know
                        new_record.name = name.text
    
                        # set back to null because previous code will have set it to zero and we dont want to create a record with id = 0
                        new_record.id = None
    
                        try:
                            if parentid != 0 :
                                if new_record._meta.get_field('parentid').get_internal_type() == 'ForeignKey':
                                    new_record.parentid = new_record._meta.get_field('parentid').rel.to.objects.get(pk=parentid)
                                else:
                                    new_record.parentid = parentid # when the parent is not set up as a FK
                        except BaseException, e:
                            errmsg = 'failed to create new record ' + name.text + ' in table ' + element.tag + ': ' + str(e)
                            logger.error(errmsg, exc_info=True)
                            self.abort(errmsg)
    
                        if parenttype != '0' :
                            new_record.parenttype = parenttype
    
                        new_record.ownerid = uid
                        new_record.lastupdatebyid = uid
                        new_record.lastupdate = datetime.now()
    
                        # need to handle geometry columns here
                        if element.tag == 'event':
                            new_record.the_geom = None
    
                        try:
                            new_record.save()
                        except BaseException, e:
                            errmsg = 'failed to create new record ' + name.text + ' in table ' + element.tag + ': ' + str(e)
                            logger.error(errmsg, exc_info=True)
                            self.abort(errmsg)
    
                        if not self.aborted:
                            # get the newly created record
                            current_record_id = new_record.id
                            current_record = current_model.objects.filter(pk=current_record_id)
    
                if not self.aborted and len(current_record) == 0:
                    self.abort('current_record is empty at ' + name.text + ' in table ' + element.tag)
    
        if level==2 and current_record is not None and current_model is not None:
            if len(current_record) == 0:
                if not self.aborted:
                    self.abort('event element is missing name or usgsshakemapid child elements')
    
        if level == 3:
            # we must be in one of the study types, so set the globals for the current study
            global current_study_id
            current_study_id = current_record_id
            global current_study_type
            current_study_type = element.tag
    
        for child in element.iterchildren():
            if not self.aborted :
                # populate fields in current record, unless we find a child entity in which case recurse
    
                text = child.text
                tag = child.tag
                logaction = ' '
    
                if text and current_record is not None:
    
                    if text.strip().__len__() > 0:
                        if tag[:7] == 'lookup_':
                            #this is a lookup field
                            lookuptablename = tag[7:]
                            #logaction = ' looking up value ' + text + ' in table ' + lookuptablename + ' to field ' + lookuptablename + 'id' + ' in table ' + element.tag
    
                            if ( lookuptablename == 'boundary'):
                                # geobases: note at the moment specific geobase tables need have an entry in models.py for this importer to work
                                # this is trying to find a record in a specific geobase table, so we need to look up the specific geobase_ table in the geobase table
                                geobase_list = get_model('econd', 'geobase')
                                parent_study = get_model('econd', current_study_type)
                                try:
                                    #find out the id of the geobase from the study
                                    parent_study_record = parent_study.objects.filter(pk=current_study_id)
                                    num_study_records = len(parent_study_record)  #actually reads the record
                                except BaseException, e:
                                    errmsg = 'failed to read study table ' + current_study_type + ' '  + str(e)
                                    logger.error(errmsg, exc_info=True)
                                    self.abort(errmsg)
    
                                geobase_id = parent_study_record[0].geobaseid
    
                                # now we know the id of the geobase we can find out the name, namecolumn and idcolumn of the specific geobase_ table
    
                                try:
                                    geobase_record = geobase_list.objects.filter(pk=geobase_id)
                                    num_geobase_records = len(geobase_record)  #actually reads the record
                                except BaseException, e:
                                    errmsg = 'failed to read geobase table ' + str(e)
                                    logger.error(errmsg, exc_info=True)
                                    self.abort(errmsg)
    
                                lookuptablename = geobase_record[0].tablename
                                lookuptable = get_model('econd', lookuptablename)
                                namecolumn = geobase_record[0].namecolumnname
                                idcolumn = geobase_record[0].idcolumnname
    
                            else:
                                lookuptable = get_model('econd', lookuptablename)
                                namecolumn = 'name'
                                idcolumn = 'id'
    
                            #try:
                            #    namecolumn = lookuptable._meta.get_field('name')
                            ##except BaseException, e:
                            #    self.abort('failed to find name column in table ' + lookuptablename + ': ' + str(e))
    
    
                            try:
                                lookup_record = lookuptable.objects.filter(**{namecolumn:text})  #uses **{} to allow variables to be passed in here
                                if (lookuptablename[:7] != 'geobase'): #geobase table and geobase_* tables are not parented off a study but all others are
                                    lookup_record = lookup_record.filter(parentid=current_study_id)
                                    lookup_record = lookup_record.filter(parenttype=current_study_type)
                                num_lookup_records = len(lookup_record)  #actually reads the record
    
                            except BaseException, e:
                                errmsg = 'failed to read table ' + lookuptablename + ': ' + str(e)
                                logger.error(errmsg, exc_info=True)
                                self.abort(errmsg)
    
                            if (lookuptablename[:8] == 'geobase_'):
                                lookuptablename = 'boundary' #if we have been looking up in a specific geobase table need to write the looked up record value back into the boundaryid column
    
                            if not self.aborted and num_lookup_records > 1:
                                self.abort('more than one record with same name found')
    
                            if not self.aborted and num_lookup_records == 0:
                                self.abort('<span style="color:red">could not look up record</span> with name "' + text + '" in ' + lookuptablename + ' table, parentid=' + str(current_study_id) + ', parenttype=' + current_study_type)
    
                            if not self.aborted and num_lookup_records == 1:
                                lookup_id = getattr(lookup_record[0],idcolumn)
                                try:
                                    fkvalue = current_record[0]._meta.get_field(lookuptablename + 'id').rel.to.objects.get(pk=lookup_id)
                                    setattr(current_record[0], lookuptablename + 'id', fkvalue )
                                    current_record[0].save()
                                    logaction =  str(lookup_id)
                                except BaseException, e:
                                    logger.error('failed to write value "' + str(lookup_id) + '" to field ' + lookuptablename + 'id in table ' + element.tag + ': ' + str(e), exc_info=True)
                                    self.abort('<span style="color:red">failed to write value</span> "' + str(lookup_id) + '" to field ' + lookuptablename + 'id' + ' in table ' + element.tag + ': ' + str(e))
    
                            # end of lookup field code
                        else:
                            #logaction = ' writing value ' + text + ' to field ' + tag + ' in table ' + element.tag
    
                            try:
                                if current_record[0]._meta.get_field(tag).get_internal_type() == 'ForeignKey':
                                    fkvalue = current_record[0]._meta.get_field(tag).rel.to.objects.get(pk=text)
                                    setattr(current_record[0], tag, fkvalue)
                                else:
                                    setattr(current_record[0], tag, text)
                            except BaseException, e:
                                errmsg = 'unable to set value in table ' + element.tag + ' to column ' + tag + ' : ' + str(e)
                                logger.error(errmsg, exc_info=True)
                                self.abort(errmsg)
    
                            try:
                                if current_model._meta.get_field(tag).get_internal_type() == 'DateTimeField':
                                    #convert the rfc822 format output by CEQID into the only one permissible by django - keep in the try block because it can detect errors in date formats
                                    d = parsedate_tz ( text )
                                    datetext = str(d[0]) + '-' + str(d[1]) + '-' + str(d[2]) + ' ' + str(d[3]) + ':' + str(d[4]) + ':' + str(d[5])
                                    setattr(current_record[0], tag, datetext )
    
                                current_record[0].save()
                                logaction =  text
    
                            except BaseException, e:
                                logger.error('failed to write value "' + text + '" to field ' + tag + ' in table ' + element.tag + ': ' + str(e), exc_info=True)
                                self.abort('<span style="color:red">failed to write value</span> "' + text + '" to field ' + tag + ' in table ' + element.tag + ': ' + str(e))
    
                if not self.aborted:
                    # deal with some inconsistencies
                    #if element.tag == 'location' and tag == 'location_c' and current_record is not None:
                    #    appendedtext = ''
                    #    if text:
                    #        appendedtext = text
                    #    setattr(current_record[0],'location_c', getattr(current_record[0], 'notes') + ' ' + appendedtext)
                    #    current_record[0].save()
    
                    # write an entry to the log file
                    tabs = ''
                    for i in range(level):
                        tabs += '\t'
                    self.logmessages.append(tabs + tag + ': ' + logaction)
    
                    # recurse into this entity's children
                    parenttype = element.tag
                    parentid = current_record_id
                    if parenttype == 'nrml':
                        parenttype = '0'
                        parentid = 0
                    if parenttype == 'event' :
                        parenttype = '0'
                    if parenttype == 'location' and child.tag == 'surveyvalue':
                        parenttype = '0'
                    level = self.process_entity(parenttype, parentid, child, level)
    
    
    
        # come back up a level
        level -= 1
    
        #keep writing log file at each stage in case we get a crash - this does slow things down a lot
        #so we comment it out
        #write_logfile(LOG_PATH_FILE + CURRENT_FILE_NAME + '.htm',self.logmessages)
    
        return level

    def savetodisc(self, inmemoryfile, file_name):
        # helper function to save a copy of a file from memory to disc
        # this is so we have a copy of all uploaded files for debugging
        f = open(self.PATH_FILE + file_name, 'wb+')
        f.write(inmemoryfile)
        f.close()

    def importfile(self, file_name):

        # before we start write out a log file header in case the import crashes
        self.write_logfile(self.LOG_PATH_FILE + file_name + '.htm', self.logmessages)

        self.CURRENT_FILE_NAME = file_name
    
        try:
            parser = etree.XMLParser(remove_comments=True)
            tree = etree.parse(self.PATH_FILE + file_name, parser=parser)
        except BaseException, e:
            logger.error(str(e), exc_info=True)
            self.abort (str(e))
    
        level = 0
    
        if not self.aborted:
            for element in tree.iter("nrml"):
                # process the top level nrml tag
                text = element.text
                tag = element.tag
                self.logmessages.append(tag)
    
                try:
                    rowmode = element.attrib['rowmode']
                except KeyError:
                    self.abort ( '"nrml" element is missing attribute "rowmode"')
    
                if rowmode != 'element':
                    self.abort ('"rowmode" attribute must be "element"')
    
                try:
                    global uid
                    uid = int(element.attrib['uid'])
                except (ValueError, KeyError):
                    self.abort ( '"nrml" element is missing attribute "uid"')
    
                try:
                    version = element.attrib['version']
                except KeyError:
                    self.abort ( '"nrml" element is missing attribute "version"')
    
                if version != '1.0':
                    self.abort ( '"version" attribute is not 1.0, that is only version of nrml that can be imported')
    
                if tag != 'nrml':
                    self.abort ('root element must be "nrml"')
    
                if not self.aborted:
                    # now recurse into the data in the file
                    with transaction.commit_manually():
                        level = self.process_entity(0,0,element, level)
    
                        if self.aborted:
                            transaction.rollback()
                            self.logmessages.append('rollback')
                        else:
                            transaction.commit()
                            self.logmessages.append('commit')
    
        # we have finished so write out the log file
        self.write_logfile(self.LOG_PATH_FILE + file_name + '.htm',self.logmessages)
    
        try:
            # run a series of native PostGIS queries to post-process the newly uploaded data
            from django.db import connection
            cursor = connection.cursor()
            cursor.execute('UPDATE event SET location = NULL WHERE location=\'\' ')
            transaction.commit_unless_managed()
            cursor.execute('UPDATE event SET the_geom=ST_GeomFromText(location,4326) ')
            transaction.commit_unless_managed()
            cursor.execute('UPDATE event set yearint=EXTRACT(YEAR FROM eventdate)')
            transaction.commit_unless_managed()
            cursor.execute('UPDATE location set location=NULL WHERE location=\'\' ')
            transaction.commit_unless_managed()
            cursor.execute('UPDATE location SET the_geom=ST_GeomFromText(location,4326) ')
            transaction.commit_unless_managed()
    
        except BaseException, e:
            errmsg = 'Failed in post processing database queries: ' + str(e)
            logger.error(errmsg, exc_info=True)
            self.abort(errmsg)
    
        #if not self.aborted:
        #    self.stdout.write('File ' + file_name + ' imported successfully.\n')
        #else:
        #    message = 'Import of ' + file_name + ' was self.aborted, ' + self.abortmessage.encode('utf-8')
        #    raise CommandError(message)

        return not self.aborted;
    
    
    
    
    
    
    
    
    
    
