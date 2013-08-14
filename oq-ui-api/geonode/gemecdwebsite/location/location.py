__author__ = 'Simon Ruffle, CAR'

import platform
from weblib.baseclasses.pagebase import Pagebase
import urllib2
from django import forms
from django.http import HttpResponseRedirect
from django.shortcuts import render
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from django.forms import ModelForm
from django.db.models import get_model
from econd.models import EventsQuick, LocationsForJSON, LocationsForJSONAggregated,Study, Location, Locations, Inventoryclass, Surveyvalue
from econd.event_models import Event
from econd.sql_views import LocationsQuick
from econd.photo_models import Photos,GeoArchiveLocations


appname = 'weblib'
modelname = 'Page'
editfields = {'include': ('name', 'subtitle', 'introtext', 'image1', 'maintext', ), 'exclude': None}
displayfields = {'include': ( 'introtext', 'image1', 'maintext', ), 'exclude': None}
formphotosize = 'admin_thumbnail'

class PageFormEdit (ModelForm):
    class Meta:
        model = get_model(appname, modelname)
        fields = editfields['include']
        exclude = editfields['exclude']

class PageFormDisplay (ModelForm):
    class Meta:
        model = get_model(appname, modelname)
        fields = displayfields['include']
        exclude = displayfields['exclude']

class LocationPage (Pagebase):

    template_name = 'location/templates/location.html'

    class NonaggOverviewForm (ModelForm):
        class Meta:
            model = GeoArchiveLocations
            fields = ( 'unifieddamagelevelname', 'assetclass', 'inventoryclassname')

    class LocationForm (ModelForm):
        class Meta:
            model = Location
            exclude = ('id', 'parentid','parenttype','guid', 'location_q', 'ownerid', 'lastupdatebyid', 'lastupdate', )

    class InventoryclassForm (ModelForm):
        class Meta:
            model = Inventoryclass
            exclude = ('levelorder', 'parentid','parenttype', 'ownerid', 'lastupdatebyid', 'lastupdate', 'llrs_qual','plan_shape','position','nonstrcexw','roof_conn','roofcovmat','roof_shape','floor_conn','foundn_sys','story_bg_q','story_bg_1','story_bg_2','ht_gr_gf_q','ht_gr_gf_1','ht_gr_gf_2','slope',)

    class SurveyForm (ModelForm):
        class Meta:
            model = Surveyvalue
            exclude = ('id', 'parentid', 'ownerid', 'lastupdatebyid', 'lastupdate','parentdamagesurveymatrixid', 'parentcasualtysurveymatrixid', 'structuretypecode', 'vulnerabilityclasscode' )

    class DamageMatrixSurveyForm (ModelForm):
        class Meta:
            model = Surveyvalue
            fields = ('value',  )

    class CasualtyMatrixSurveyForm (ModelForm):
        class Meta:
            model = Surveyvalue
            fields = ('value',  )

    class PanelForm(forms.Form):
        location = forms.ChoiceField(label='Quick link to related location', required=False) #required=False allows field to be disabled
        location.widget.attrs['title'] = "Quick link to a location in this event"
        location.widget.attrs['onchange'] = 'submit()'  # this is how you add a change event to a form element - fires this javascript
        location.widget.attrs['class'] = 'locationdropdown'

    class PhotoGridForm (ModelForm):
        class Meta:
            model = Photos
            fields = ( 'thephoto', 'photofilename', 'locationname',   )

    def dispatch(self, request, *args, **kwargs):

        self.preProcessPage(request, **kwargs)

        ##############################################
        # Read the querystring
        ##############################################

        # get checkbox defaults from the querystring, not that we use them here
        # but we pass them back when going back to the eventoverview
        checked = request.GET.get('all')
        filter_all = False
        try:
            if checked is None or checked == '' or checked == 'True':
                filter_all = True # defaults to true
            else:
                filter_all = False
        except:
            filter_all = True # defaults to true

        checked = request.GET.get('f_b')
        filter_buildings = False
        try:
            if checked is None or checked == '' or checked == 'False':
                filter_buildings = False # defaults to false
            else:
                filter_buildings = True
        except:
            filter_buildings = False # defaults to false

        checked = request.GET.get('f_c')
        filter_casualty = False
        try:
            if checked is None or checked == '' or checked == 'False':
                filter_casualty = False
            else:
                filter_casualty = True
        except:
            filter_casualty = False

        checked = request.GET.get('f_i')
        filter_infrastructure = False
        try:
            if checked is None or checked == '' or checked == 'False':
                filter_infrastructure = False
            else:
                filter_infrastructure = True
        except:
            filter_infrastructure = False

        checked = request.GET.get('f_p')
        filter_photos = False
        try:
            if checked is None or checked == '' or checked == 'False':
                filter_photos = False
            else:
                filter_photos = True

        except:
            filter_photos = False

        checked = request.GET.get('f_s')
        filter_socioeconomic = False
        try:
            if checked is None or checked == '' or checked == 'False':
                filter_socioeconomic = False # defaults to false
            else:
                filter_socioeconomic = True
        except:
            filter_socioeconomic = False # defaults to false

        # remember study id so we can return to the overview page with the right study selection
        rememberstudyid = request.GET.get('studyid')
        try:
            if rememberstudyid is None or rememberstudyid == '':
                rememberstudyid = 0
            rememberstudyid = int(rememberstudyid) # check it is a number
        except:
            rememberstudyid = 0 # in case of input error

        # location id
        locationid = kwargs.get('ix')
        try:
            if locationid is None or locationid == '':
                locationid = 0
            locationid = int(locationid) # check it is a number
        except:
            locationid = 0 # in case of input error

        #######################################
        # Process the chosen location
        #######################################

        # get location record
        try:
            location_record = Location.objects.get(pk=locationid)

            #get overview record for the location, so we can derive its parent event etc
            overview_record = Locations.objects.get(id=locationid)
        except:
            return self.showErrorPage(request, 'Cannot find location with id ' + unicode(locationid), 'errorpage.html')

        # get the study and event for this location
        eventid = overview_record.eventid
        studyid = overview_record.studyid
        studytype = overview_record.studytypecode
        self.page_context['event_name'] = unicode(overview_record.yearint) + ' ' + overview_record.event + ' ' + overview_record.country
        self.page_context['study_name'] = overview_record.study
        self.page_context['location_name'] = overview_record.locationname
        self.page_context['page_title'] = self.page_context['location_name']
        self.page_context['page_backlink'] = '<a href="/ecd/eventoverview/' + str(eventid) + '?&studyid=' + str(rememberstudyid) + '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty)\
                                             + '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' \
                                             + str(filter_socioeconomic) + '&all=' + str(filter_all) + '">&laquo; Back to Event Overview</a>'

        isAggregated = str(location_record.isaggregated) == 'Yes'


        ########################
        # Data displays
        ########################

        # the display varies according to the settings of the studytype and isaggregated variables
        self.page_context['pageclass'] = 'locationpage'

        ##############################################################################
        # Set up location for input form and display - common to all types of location
        ##############################################################################

        locationForm = self.LocationForm(instance=location_record, prefix="locationform")  # create the ModelForm
        locationfieldstructure = self.createFormFieldStructure( locationForm, location_record ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['locationfields'] = locationfieldstructure # for display
        self.page_context['locationform'] = locationForm # for editing

        #######################################################
        # Set up overview for display only; non aggregated only
        #######################################################

        # we borrow GeoArchives' locations because it sorts out Unified Damage Levels etc (but cant click on them)
        try:
            nonaggoverview_record = GeoArchiveLocations.objects.get(id=locationid)
            nonaggoverviewqueryset = []
            nonaggoverviewqueryset.append(nonaggoverview_record) # to make it iterable
            nonaggoverviewForm = self.NonaggOverviewForm (instance=nonaggoverview_record)
            nonaggoverviewfields = self.createFormFieldStructure( nonaggoverviewForm, nonaggoverview_record )
            self.page_context['nonaggoverviewfields'] = nonaggoverviewfields
        except:
            self.page_context['nonaggoverviewfields'] = ''

        ##########################################################################
        # Set up inventory class record for input and display - non aggregate only
        ##########################################################################

        try:
            inventoryclassid = nonaggoverview_record.inventoryclassid
            inventoryclass_record = Inventoryclass.objects.get(pk=inventoryclassid)
            inventoryclassForm = self.InventoryclassForm(instance=inventoryclass_record, prefix='inventoryclassform')
            inventoryclassfields = self.createFormFieldStructure( inventoryclassForm, inventoryclass_record)
            self.page_context['inventoryclassfields'] = inventoryclassfields # for display
            self.page_context['inventoryclassform'] = inventoryclassForm # for editing
        except:
            self.page_context['inventoryclassfields'] = ''
            self.page_context['inventoryclassform'] = ''

        ##################################################
        # Set up survey value record(s) for input and display
        ##################################################

        # get the survey records for this location.
        survey_record_list = Surveyvalue.objects.filter(parentid=locationid)

        # build a list of survey records for display and editing
        if len(survey_record_list) > 0:
            surveyfieldlist = []
            surveyformlist = []
            damagematrix = []
            damagematrixform = []
            casualtymatrix = []
            casualtymatrixform = []

            for survey_record in survey_record_list:

                # if its an aggregated study we need to pick out the damage and casualty matrix values
                isInDamageMatrix = False
                isInCasualtyMatrix = False
                if isAggregated:
                    if survey_record.inventoryclassid_id > 0 and survey_record.damagelevelid_id > 0:
                        isInDamageMatrix = True
                    if survey_record.inventoryclassid_id > 0 and survey_record.casualtylevelid_id > 0:
                        isInCasualtyMatrix = True

                if isAggregated and (isInDamageMatrix or isInCasualtyMatrix):
                    if isInDamageMatrix:
                        surveyForm = self.DamageMatrixSurveyForm(instance=survey_record, prefix='damagecell' + str(survey_record.id))
                        damagematrixform.append({'cell': surveyForm, 'damagelevelid': survey_record.damagelevelid_id, 'inventoryclassid': survey_record.inventoryclassid_id, })
                        surveyfields = self.createFormFieldStructure(surveyForm, survey_record )
                        damagematrix.append({'cell': surveyfields, 'damagelevelid': survey_record.damagelevelid_id, 'inventoryclassid': survey_record.inventoryclassid_id, })
                    if isInCasualtyMatrix:
                        surveyForm = self.CasualtyMatrixSurveyForm(instance=survey_record, prefix='casualtycell' + str(survey_record.id))
                        casualtymatrixform.append({'cell': surveyForm, 'casualtylevelid': survey_record.casualtylevelid_id, 'inventoryclassid': survey_record.inventoryclassid_id, })
                        surveyfields = self.createFormFieldStructure(surveyForm, survey_record )
                        casualtymatrix.append({'cell': surveyfields, 'casualtylevelid': survey_record.casualtylevelid_id, 'inventoryclassid': survey_record.inventoryclassid_id, })
                else:
                    surveyForm = self.SurveyForm(instance=survey_record, prefix='surveyform' + str(survey_record.id))
                    surveyformlist.append(surveyForm)
                    surveyfields = self.createFormFieldStructure(surveyForm, survey_record )
                    surveyfieldlist.append(surveyfields)

            self.page_context['surveyfieldlist'] = surveyfieldlist # for display
            self.page_context['surveyformlist'] = surveyformlist # for editing
            self.page_context['damagematrix'] = damagematrix # for display
            self.page_context['damagematrixform'] = damagematrixform # for edit
            self.page_context['casualtymatrix'] = casualtymatrix # for display
            self.page_context['casualtymatrixform'] = casualtymatrixform # for edit

        # fudge for dealing with different locations of the "src" static directory on the development system
        self.page_context['src_folder'] = '/oq-platform2/'
        if platform.system() == 'Windows':
            self.page_context['src_folder'] = '/static/'

        # set up the filter string for returns
        self.page_context['filterstring'] = '?&studyid=' + str(rememberstudyid) + '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) + '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all)


        ###############
        # GET
        ###############
        if request.method == 'GET':

            self.page_context['input_errors'] = False

            # Actions on GET only - as the mini map and photos cannot be edited here
            # (so dont need to be involved in the POST) we can put them here,
            # thus reducing the load when processing the POST. By putting the code here
            # we can still see the map while editing

            #######################
            # Set up the mini - map
            #######################

            # this code could be simplified

            # Prepare GeoServer request for point-based layers.
            urlStrPoints = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:gemecdlocations&maxFeatures=5000&outputFormat=json'
            urlStrPoints += '&viewparams=override_e:0;eventid:' + unicode(eventid) + ';'

            # study selection
            #if studyid > 0:
            #    urlStrPoints += 'override_s:0;studyid:' + unicode(studyid) + ';'

            #if not filter_all:
            #    urlStrPoints += 'override_c:0;studytypecode:' + studytype + ';'

            # now select the individual location point
            urlStrPoints += 'override_i:0;locationid:' + unicode(locationid) + ';'

            # now deal with polygon layers
            urlStrPolygonsList = []
            if studyid > 0:
                # just one study is selected
                studies = Study.objects.filter(pk=studyid)
            else:
                # multiple studies
                studies = Study.objects.filter(parentid=eventid)
                if not filter_all:
                    studies = studies.filter(studytypecode=studytype)

            # iterate through studies, to pick out those that have polygon layers
            for study in studies:
                try:
                    geobase = study.geobaseid # will give an exception if this study does not have a geobese

                    # we have a geobase, so
                    # Prepare GeoServer request for polygon-based locations
                    urlStrPolygons = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:gemecdlocationquerygeobase&maxFeatures=5000&outputFormat=json'
                    urlStrPolygons += '&viewparams=parenttype:study;parentid:' + unicode(study.id) + ';jointable:' + geobase.tablename + ';joincolumn:' + geobase.idcolumnname + ';boundarygeom:' + geobase.geomcolumnname + ';override:0;'
                    # now select the individual location point
                    urlStrPolygons += 'override_i:0;locationid:' + unicode(locationid) + ';'

                    urlStrPolygonsList.append(urlStrPolygons)
                except:
                    pass

                # get the map overlay points GeoJSON from Geoserver
                geoJsonStrPoints = urllib2.urlopen(urlStrPoints).read()

                # trap errors coming back from Geoserver and dont send them on to the webpage
                if 'ServiceExceptionReport' in geoJsonStrPoints:
                    geoJsonStrPoints = ''

                self.page_context['geojsonpoints'] = geoJsonStrPoints

                # polygons

                geoJsonStrPolygonsList = []

                 # get the map overlay polygons GeoJSON from Geoserver - we may have multiple polygon layers
                for urlStrPolygons in urlStrPolygonsList:
                    geoJsonStrPolygons = urllib2.urlopen(urlStrPolygons).read()

                    if 'ServiceExceptionReport' in geoJsonStrPolygons:
                        geoJsonStrPolygons = ''
                    else:
                        geoJsonStrPolygonsList.append(geoJsonStrPolygons)


                self.page_context['geojsonpolygonslist'] = geoJsonStrPolygonsList
                self.page_context['maptype'] = 'location'

            #################################
            # Photos
            #################################

            photoqueryset = Photos.objects.all().order_by('id').filter(locationid=locationid)

            photocount = len(photoqueryset)
            photomessage = unicode(photocount) + ' photo(s)'

            photoGridForm = self.PhotoGridForm()  # create the ModelForm
            photogrid = self.createListFieldStructure(photoGridForm, photoqueryset, '/ecd/photo/')

            # intercept the dictionary for "thephoto" field and change the type to WebLibPhoto and provide the photo size
            index = 0
            for i in photoGridForm.visible_fields():
                if i.name == 'thephoto':
                    break
                index = index + 1
            photogrid['fields'][index][0]['thephoto']['type'] = 'WebLibPhoto'
            photogrid['fields'][index][0]['thephoto']['photosize'] = 'overview_grid'

            self.page_context['photogrid'] = photogrid
            self.page_context['photomessage'] = photomessage


            # edit mode
            if self.page_context['editmode']:
                # Create the form for either the new dummy record or an existing one; prefix allows multiple forms
                pass
            else:
                # set up the left hand panel which shows the location dropdown
                panelform = self.PanelForm

                # populate location dropdown
                locations = LocationsQuick.objects.filter(eventid=eventid).order_by('locationname')
                if rememberstudyid > 0 :
                    locations = locations.filter(studyid=rememberstudyid)

                if studytype is not '':
                    locations = locations.filter(studytypecode=studytype)

                if len(locations) > 0:
                    locationlist = []
                    for location in locations:
                        locationlist.append((unicode(location.id), location.locationname))
                else:
                    locationlist = [('0','NO LOCATIONS')]

                panelform.base_fields['location'].choices = locationlist
                panelform.base_fields['location'].initial = locationid

                self.page_context['panelform'] = panelform(prefix="panelform", label_suffix='')

            return render(request, self.template_name, self.page_context)


        ###############
        # POST
        ###############
        if request.method == 'POST':

            self.page_context['input_errors'] = False

            # As this stage page contains different forms
            # we must check to see which forms we are processing
            # by testing for a field in the form
            if 'locationform-name' in request.POST:
                # we are editing the location
                locationForm = self.LocationForm(request.POST, instance=location_record , prefix='locationform') # A form bound to the POST data, prefix allows multiple forms
                locationFormvalid = locationForm.is_valid()

                if locationFormvalid:
                    location_record.lastupdate = datetime.now()
                    location_record.lastupdatebyid = request.user.id
                    locationForm.save()
                else:
                    self.page_context['locationform'] = locationForm
                    self.page_context['input_errors'] = True
                    return render(request, self.template_name, self.page_context)  # Error - return just the form when there is an error - the template must not try and render anything outside the form because the context data is not present


            if 'inventoryclassform-name' in request.POST:
                # we are editing the inventory class
                inventoryclassForm = self.InventoryclassForm(request.POST, instance=inventoryclass_record , prefix='inventoryclassform') # A form bound to the POST data, prefix allows multiple forms
                inventoryclassFormvalid = inventoryclassForm.is_valid()

                if inventoryclassFormvalid:
                    inventoryclass_record.lastupdate = datetime.now()
                    inventoryclass_record.lastupdatebyid = request.user.id
                    inventoryclassForm.save()
                else:
                    self.page_context['inventoryclassform'] = inventoryclassForm
                    self.page_context['input_errors'] = True
                    return render(request, self.template_name, self.page_context)  # Error - return just the form when there is an error - the template must not try and render anything outside the form because the context data is not present

            # iterate all the possible survey value records
            for survey_record in survey_record_list:
                if 'surveyform' + str(survey_record.id) + '-value' in request.POST:
                    # we are editing a survey value
                    surveyForm = self.SurveyForm(request.POST, instance=survey_record , prefix='surveyform' + str(survey_record.id)) # A form bound to the POST data, prefix allows multiple forms
                    surveyFormvalid = surveyForm.is_valid()

                    if surveyFormvalid:
                        survey_record.lastupdate = datetime.now()
                        survey_record.lastupdatebyid = request.user.id
                        surveyForm.save()
                    else:
                        for errorsurveyform in surveyformlist:
                            if errorsurveyform.prefix == 'surveyform' + str(survey_record.id):
                                pos = surveyformlist.index(errorsurveyform)
                                surveyformlist[pos] = surveyForm
                        self.page_context['surveyformlist'] = surveyformlist
                        self.page_context['input_errors'] = True
                        return render(request, self.template_name, self.page_context)  # Error - return just the form when there is an error - the template must not try and render anything outside the form because the context data is not present

                if 'damagecell' + str(survey_record.id) + '-value' in request.POST:
                    # we are editing a damage matrix survey value
                    surveyForm = self.DamageMatrixSurveyForm(request.POST, instance=survey_record , prefix='damagecell' + str(survey_record.id)) # A form bound to the POST data, prefix allows multiple forms
                    surveyFormvalid = surveyForm.is_valid()
                    if surveyFormvalid:
                        survey_record.lastupdate = datetime.now()
                        survey_record.lastupdatebyid = request.user.id
                        surveyForm.save()
                    else:
                        for errorsurveyform in damagematrixform:
                            if errorsurveyform['cell'].prefix == 'damagecell' + str(survey_record.id):
                                pos = damagematrixform.index(errorsurveyform)
                                damagematrixform[pos] = {'cell': surveyForm, 'damagelevelid': survey_record.damagelevelid_id, 'inventoryclassid': survey_record.inventoryclassid_id, }
                        self.page_context['damagematrix'] = damagematrix
                        self.page_context['input_errors'] = True
                        return render(request, self.template_name, self.page_context)  # Error - return just the form when there is an error - the template must not try and render anything outside the form because the context data is not present

                # TODO: copy above damagecell code and do for casualtycell
                # if 'casualtycell' + str(survey_record.id) + '-value' in request.POST:
                # etc

            # the user has used the quick link location dropdown
            if 'panelform-location' in request.POST:
                # the study dropdown
                panelform = self.PanelForm(request.POST, prefix='panelform')
                valid_panelform = panelform.is_valid()

                #if valid_panelform: # All validation rules pass
                #    locationid = panelform.cleaned_data['location']

                locationid = panelform.data['panelform-location']

            # now do the page redirect back to the location page in display mode
            pagename = '/ecd/location'
            return HttpResponseRedirect(pagename + '/' + str(locationid) + self.page_context['filterstring']) # Redirect after POST

