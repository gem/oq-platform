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
from econd.models import EventsQuick, LocationsForJSON, LocationsForJSONAggregated,Study, Location, Locations
from econd.event_models import Event
from econd.sql_views import LocationsQuick
from econd.photo_models import Photos

template_name = 'location/templates/location.html'
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

    class LocationForm (ModelForm):
        class Meta:
            model = Location
            exclude = ('id', 'parentid','parenttype','guid', 'location_q', 'ownerid', 'lastupdatebyid', 'lastupdate', )

    class PanelForm(forms.Form):

        location = forms.ChoiceField(label='Quick link to related location', required=False) #required=False allows field to be disabled
        location.widget.attrs['title'] = "Quick link to a location in this event"
        location.widget.attrs['onchange'] = 'submit()'  # this is how you add a change event to a form element - fires this javascript
        location.widget.attrs['class'] = 'locationdropdown'

        # if we were to want the event dropdown on this page:
        #event = forms.ChoiceField(label='Event', required=False) #required=False allows field to be disabled
        #event.widget.attrs['title'] = "Quick link to event details"
        #event.widget.attrs['onchange'] = 'submit()'  # this is how you add a change event to a form element - fires this javascript
        #event.widget.attrs['class'] = 'eventdropdown'

        # if we were to want the study dropdown on this page
        #study = forms.ChoiceField(label='Study', required=False) #required=False allows field to be disabled
        #study.widget.attrs['title'] = "Filter by study"
        #study.widget.attrs['onchange'] = 'submit()'  # this is how you add a change event to a form element - fires this javascript
        #study.widget.attrs['class'] = 'studydropdown'

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

        studytype = ''

        if filter_buildings:
            studytype = 'B'
        if filter_casualty:
            studytype = 'C'
        if filter_infrastructure:
            studytype = 'CRI'
        if filter_photos:
            studytype = 'PHOTO'

        # study id so we can return to the overview page with the right study selection
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
        except:
            return self.showErrorPage(request, 'Cannot find location with id ' + unicode(locationid), 'errorpage.html')

        #get overview record for the location, so we can derive its parent event etc
        overview_record = Locations.objects.get(id=locationid)

        # get the study and event for this location
        eventid = overview_record.eventid
        studyid = overview_record.studyid
        self.page_context['event_name'] = unicode(overview_record.yearint) + ' ' + overview_record.event + ' ' + overview_record.country
        self.page_context['study_name'] = overview_record.study
        self.page_context['location_name'] = overview_record.locationname
        self.page_context['page_title'] = self.page_context['location_name']
        self.page_context['page_backlink'] = '<a href="/ecd/eventoverview/' + str(eventid) + '?&studyid=' + str(rememberstudyid) + '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty)\
                                             + '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' \
                                             + str(filter_socioeconomic) + '&all=' + str(filter_all) + '">&laquo; Back to Event Overview</a>'

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

        # fudge for dealing with different locations of the "src" static directory on the development system
        self.page_context['src_folder'] = '/oq-platform2/'
        if platform.system() == 'Windows':
            self.page_context['src_folder'] = '/static/'

        ###############
        # POST
        ###############
        if request.method == 'POST':

            # As this page can contain different forms depending on its mode
            # we must check to see which forms we are processing
            # by testing for a field in the content management form
            if 'locationform-name' in request.POST:
                # we are editing the location
                locationForm = self.LocationForm(request.POST, instance=location_record , prefix='locationform') # A form bound to the POST data, prefix allows multiple forms
                locationFormvalid = locationForm.is_valid()

                if locationFormvalid:
                    location_record.lastupdate = datetime.now()
                    location_record.lastupdatebyid = request.user.id
                    locationForm.save()
                    return HttpResponseRedirect('/ecd/location/' + str(locationid)) # Redirect after successful POST to the non editing version
                else:
                    self.page_context['locationform'] = locationForm
                    return render(request, self.template_name, self.page_context)  # Error - return just the form when there is an error - the template must not try and render anything outside the form because the contact data is not present

            else:
                # the user has used a form on the page; which one?
                if 'panelform-location' in request.POST:
                    # the study dropdown
                    panelform = self.PanelForm(request.POST, prefix='panelform')
                    valid_panelform = panelform.is_valid()

                    #if valid_panelform: # All validation rules pass
                    #    locationid = panelform.cleaned_data['location']

                    locationid = panelform.data['panelform-location']

                else:
                    pass

                pagename = '/ecd/location'
                return HttpResponseRedirect(pagename + '/' + str(locationid) + '?&studyid=' + str(rememberstudyid) + '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) +
                                            '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all) ) # Redirect after POST


        ###############
        # GET
        ###############
        if request.method == 'GET':

            # edit mode
            if self.page_context['editmode']:
                # Create the form for either the new dummy record or an existing one; prefix allows multiple forms
                pass
            else:
                # display mode

                # points

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

                panelform = self.PanelForm

                # populate event dropdown
                #eventlist = [('0','All ECD events')]
                #events = EventsQuick.objects.all().order_by('-yearint')
                #for event in events:
                #    eventlist.append((unicode(event.id),unicode(event.yearint) + ' ' + event.eventname + ' ' + unicode(event.country) + ' (' + event.partner + ')' ))

                #panelform.base_fields['event'].choices = eventlist
                #panelform.base_fields['event'].initial = eventid

                # populate study dropdown
                #studies = Study.objects.filter(parentid=eventid).order_by('name')
                #if studytype is not '':
                #    studies = studies.filter(studytypecode=studytype)

                #if len(studies) > 0:
                #    studylist = [('0','All studies')]
                #    for study in studies:
                #        studylist.append((unicode(study.id), study.name))
                #else:
                #    studylist = [('0','NO STUDIES')]

                #panelform.base_fields['study'].choices = studylist
                #panelform.base_fields['study'].initial = studyid

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

                ##############################################
                # Set up location for input form and display
                ##############################################
                location_record = Location.objects.get(pk=locationid) # get the location record
                locationForm = self.LocationForm(instance=location_record, prefix="locationform")  # create the ModelForm
                locationfieldstructure = self.createFormFieldStructure( locationForm, location_record ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
                self.page_context['locationfields'] = locationfieldstructure
                self.page_context['pageclass'] = 'locationpage'

                # filter settings for the link on the dropdown
                self.page_context['filterstring'] = '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) + '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all)
                self.page_context['locationform'] = locationForm
                self.page_context['panelform'] = panelform(prefix="panelform", label_suffix='')

            return render(request, template_name, self.page_context)