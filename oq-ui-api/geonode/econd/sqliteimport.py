__author__ = 'Simon Ruffle, CAR'


from django.db.models import get_model
from django.db import transaction
from lxml import etree
import platform
from datetime import datetime
from email.utils import parsedate_tz
from django.utils.encoding import smart_str, smart_unicode
import sqlite3
from econd.models import Location, Surveyvalue, Inventoryclass
from econd.study_models import Study

class SQLiteImporter:
    VERSION = '1.0'
    PATH_FILE='' #folder containing the input files
    LOG_PATH_FILE='' #folder containing the log files
    CURRENT_FILE_NAME = ''  #the name of the input file we are reading from. The log file is the same name with .log on the end.
    logmessages = []        #list containing messages to write to the log file
    aborted = False         #global flag set true if the process has been self.aborted, causes rollback of transaction
    abortmessage = ''       #global message set at self.abort
    uid = 0                 # global - the current users user id from drupal
    current_study_type = '' # global we keep track of the current study because inventory classes, damage levels and casualty levels all parent off the current study
    current_study_id = 0
    columnsStr = 'OBJ_UID,PROJ_UID,X,Y,SOURCE,COMMENTS,PLAN_SHAPE,POSITION,NONSTRCEXW,ROOF_CONN,ROOFSYSMAT,ROOFCOVMAT,ROOF_SHAPE,ROOFSYSTYP,MAS_MORT_L,MAS_MORT_T,MAS_REIN_L,MAS_REIN_T,MAT_TECH_L,MAT_TECH_T,\
    MAT_TYPE_L,MAT_TYPE_T,STEELCON_L,STEELCON_T,LLRS_QUAL,LLRS_L,LLRS_T,LLRS_DCT_L,LLRS_DCT_T,STR_HZIR_P,STR_HZIR_S,STR_VEIR_P,STR_VEIR_S,STR_IRREG,FLOOR_CONN,FLOOR_MAT,FLOOR_TYPE,FOUNDN_SYS,\
    STORY_AG_Q,STORY_AG_1,STORY_AG_2,STORY_BG_Q,STORY_BG_1,STORY_BG_2,HT_GR_GF_Q,HT_GR_GF_1,HT_GR_GF_2,SLOPE,YR_BUILT_Q,YR_BUILT_1,YR_BUILT_2,YR_RETRO,OCCUPCY,OCCUPCY_DT,SAMPLE_GRP,DIRECT_1,\
    DIRECT_2,DATE_MADE,USER_MADE,DATE_CHNG,USER_CHNG' # the columns found in the GEM_OBJECT table in the SQLite file

    def __init__(self):
        # set up class constants
        if platform.system() == 'Windows':
            self.PATH_FILE='C:\\inetpub\\wwwroot\\Python\\gemecd\\uploads\\' #folder containing the input files
            self.LOG_PATH_FILE='C:\\inetpub\\wwwroot\\Python\\gemecd\\uploads\\' #folder containing the log files
        else:
            self.PATH_FILE='/var/lib/geonode/src/GeoNodePy/geonode/uploads/' #folder containing the input files
            self.LOG_PATH_FILE='/var/lib/geonode/src/GeoNodePy/geonode/uploads/' #folder containing the log files

        # generate a list from the column list string
        self.columnsList = self.columnsStr.split(',')
     
    def abort (self, message ):
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
        out_file.write('Log file for GEMECD SQLite file import version ' + self.VERSION + ' ' + str(datetime.now()) + '<br />\n')
    
        for i in range(len(values)):
            out_file.write(smart_str(values[i]) + '<br />\n')
    
        out_file.close()

    def savetodisc(self, inmemoryfile, file_name):
        # helper function to save a copy of a file from memory to disc
        # this is so we have a copy of all uploaded files for debugging
        f = open(self.PATH_FILE + file_name, 'wb+')
        f.write(inmemoryfile)
        f.close()

    def process(self, sqlitecursor):
        sqlitecursor.execute('SELECT ' + self.columnsStr + '  from GEM_OBJECT;')

        # make another list of column names
        quickCols = self.columnsStr.split(',')

        # iterate rows in the table
        for self.columnsList in sqlitecursor.fetchall():

            if not self.aborted:
                # convert the returned list of values in the row into a dictionary. There is probably a better way to do this.
                columns = dict()
                for idx, columnvalue in enumerate(self.columnsList):
                    columns[quickCols[idx]] = columnvalue

                # First check if the parent study exists, if
                parentstudyid = 0
                parenteventid = 190 # reserved event for IDCT uploads
                studyname = columns['PROJ_UID']
                authors = 'IDCT Direct Observation Tools'
                partner = 'IDCT'
                parentstudylist = Study.objects.filter(parentid=parenteventid,name=studyname)

                if not parentstudylist:
                    # create a study
                    study = Study()
                    study.name = studyname
                    study.authors = authors
                    study.parentid_id = parenteventid
                    study.studydate = datetime.now()
                    study.partner = partner
                    study.ownerid = 1
                    study.lastupdatebyid = 1
                    study.lastupdate = datetime.now()
                    study.studytypecode_id = 'IDCT'
                    study.sources = 'Uploaded by GEMECD SQLite Uploader version ' + self.VERSION
                    # save the study
                    try:
                        study.save()
                    except BaseException, e:
                        self.abort('Failed to save study record: ' + str(e))

                    parentstudyid = study.id
                else:
                    parentstudyid = parentstudylist[0].id # only one should be returned but if more than one is, take the first

            if not self.aborted:
                # create a new location record and copy in values from the SQLite record
                location = Location()
                location.parentid = parentstudyid
                location.parenttype = 'study'
                location.boundaryid = 0
                location.ownerid = 1
                location.lastupdatebyid = 1
                location.lastupdate = datetime.now()

                location.name = columns['OBJ_UID']
                location.originalsurveyreference = columns['OBJ_UID']
                location.location = 'POINT(' + str(columns['X']) + ' ' + str(columns['Y']) + ')'
                comments = columns['COMMENTS']
                source = columns['SOURCE']
                if comments is None:
                    comments = ''
                if source is None:
                    source = ''
                location.location_c = unicode(comments + ' ' + source)

                # save the location
                try:
                    location.save()
                except BaseException, e:
                    self.abort('Failed to save location record: ' + str(e))

            if not self.aborted:
                # create a new inventory class
                inventoryclass = Inventoryclass()
                inventoryclass.parentid = parentstudyid
                inventoryclass.parenttype = 'study'
                inventoryclass.name = columns['OBJ_UID']

                # copy over the Taxonomy attributes, assuming they all have the same column names except IDCT are all in caps
                for fieldname in inventoryclass._meta.get_all_field_names():
                    if fieldname.upper() in columns:
                        value = columns[fieldname.upper()]
                        if value is None and inventoryclass._meta.get_field(fieldname).get_internal_type() == 'ForeignKey':
                            if not inventoryclass._meta.get_field(fieldname).blank:
                                value = '0' # all the fields will be charfields

                        if inventoryclass._meta.get_field(fieldname).get_internal_type() == 'ForeignKey':
                            setattr(inventoryclass, fieldname + '_id', value)
                        else:
                            setattr(inventoryclass, fieldname, value)

                # unfortunately not all column names are the same that would be too much to expect...
                inventoryclass.occpcy_dt_id = columns['OCCUPCY_DT'] # IDCT does not use the column heading as defined by Helen Crowley

                inventoryclass.ownerid = 1
                inventoryclass.lastupdatebyid = 1
                inventoryclass.lastupdate = datetime.now()

                try:
                    inventoryclass.save()
                except BaseException, e:
                    self.abort('Failed to save inventoryclass record: ' + str(e))

            if not self.aborted:
                # create a new survey value record
                surveyvalue = Surveyvalue()
                surveyvalue.parentid_id = location.id
                surveyvalue.inventoryclassid_id = inventoryclass.id
                surveyvalue.name = columns['OBJ_UID']
                surveyvalue.value = 1
                surveyvalue.value_q_id = 'OK'
                surveyvalue.metriccode_id = 'N'
                surveyvalue.ownerid = 1
                surveyvalue.lastupdatebyid = 1
                surveyvalue.lastupdate = datetime.now()

                try:
                    surveyvalue.save()
                except BaseException, e:
                    self.abort('Failed to save surveyvalue record: ' + str(e))

        return not self.aborted

    def importfile(self, file_name):

        # before we start write out a log file header in case the import crashes
        self.write_logfile(self.LOG_PATH_FILE + file_name + '.htm', self.logmessages)

        self.CURRENT_FILE_NAME = file_name

        sqlitecursor = None

        try:
            sqliteconnection = sqlite3.connect(self.PATH_FILE + file_name)
            sqlitecursor = sqliteconnection.cursor()
        except BaseException, e:
            self.abort (str(e))

        if not self.aborted:
            with transaction.commit_manually():
                self.process(sqlitecursor)

                if self.aborted:
                    transaction.rollback()
                    self.logmessages.append('rollback')
                else:
                    transaction.commit()
                    self.logmessages.append('commit')
    
        # we have finished so write out the log file
        self.write_logfile(self.LOG_PATH_FILE + file_name + '.htm',self.logmessages)

        if not self.aborted:
            try:
                # run a series of native PostGIS queries to post-process the newly uploaded data
                from django.db import connection
                cursor = connection.cursor()
                cursor.execute('UPDATE location set location=NULL WHERE location=\'\' ')
                transaction.commit_unless_managed()
                cursor.execute('UPDATE location SET the_geom=ST_GeomFromText(location,4326) ')
                transaction.commit_unless_managed()

            except BaseException, e:
                self.abort('Failed in post processing database queries: ' + str(e))

        return not self.aborted;
    
    
    
    
    
    
    
    
    
    
