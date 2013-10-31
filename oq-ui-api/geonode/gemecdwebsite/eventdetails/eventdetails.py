__author__ = 'Simon Ruffle, CAR'

import platform
from weblib.baseclasses.pagebase import Pagebase
import urllib2
from django import forms
from django.http import HttpResponseRedirect
from django.shortcuts import render
from datetime import datetime
from django.forms import ModelForm
from econd.event_models import Event
from econd.models import Study, Location, Locations, Inventoryclass, Surveyvalue, Damagelevel, Casualtylevel
from econd.sql_views import LocationsQuick

# parameters for simple location editing as used when adding a new loaction
appname = 'econd'
modelname = 'Event'
formphotosize = 'admin_thumbnail'

editfields = {'include': None, 'exclude': ['ownerid', 'lastupdatebyid', 'lastupdate', 'guid', ] }
displayfields = {'include': None, 'exclude': ['guid', ]}

class EventDetailsPage (Pagebase):

    template_name = 'eventdetails/templates/eventdetails.html'

    class EventFullForm (ModelForm):
        class Meta:
            model = Event
            exclude = ('ownerid', 'lastupdatebyid', 'lastupdate', )

    class EventOverviewForm (ModelForm):
        class Meta:
            model = Event
            fields = ('magnitude', 'depth', 'eventdate', 'eventtime', 'peoplekilled', 'partner', )

    class KeyFactsForm (ModelForm):
        class Meta:
            model = Event
            fields = ('name', 'usgsshakemapid', 'country', 'region', 'regioncode', 'location', 'eventdate', 'eventtime', 'dayofweeklocal', 'magnitude', 'depth', 'magnitudeunitcode', )

    class HumanCasualtyForm (ModelForm):
        class Meta:
            model = Event
            fields = ('peopleinjured', 'peopleseriouslyinjured', 'peoplemissing', 'peoplekilled', 'peopledyingpostcatastrophe', 'peoplehomeless',)

    class BuildingDamageForm (ModelForm):
        class Meta:
            model = Event
            fields = ('numberofbuildingsdestroyed', 'numberofbuildingsdamaged', 'numberofdwellingsdestroyed', 'numberofdwellingsdamaged',  )

    class SocioeconomicForm (ModelForm):
        class Meta:
            model = Event
            fields = ('directeconomicloss', 'indirecteconomicloss', 'insuredloss', )

    class DemographicsForm (ModelForm):
        class Meta:
            model = Event
            fields = ('population', 'numberofhouseholds', 'numberofhouseholdsshake', 'totalnumberofbuildings', 'totalnumberofbuildingsshake', 'contemporaneousdate',  )

    class StudiesForm (ModelForm):
        class Meta:
            model = Study
            fields = ('name', 'authors', 'studydate',  )


    def dispatch(self, request, *args, **kwargs):

        self.preProcessPage(request, **kwargs)
        if self.page_context['addmode']:
            self.page_context['page_title'] = 'Add new event'
            return self.processSimpleForm(request, appname, modelname, formphotosize, self.template_name, displayfields, editfields, {'errortemplate': 'errorpage.html', 'foreignkeylinkprefix': '/ecd'})

        ##############################################
        # Read the querystring
        ##############################################

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

        # event id
        eventid = kwargs.get('ix')
        try:
            if eventid is None or eventid == '':
                eventid = 0
            eventid = int(eventid) # check its a number
        except:
            eventid = 0 # in case of input error

        studytype = ''

        if filter_buildings:
            studytype = 'B'
        if filter_casualty:
            studytype = 'C'
        if filter_infrastructure:
            studytype = 'CRI'
        if filter_photos:
            studytype = 'PHOTO'

        # study id
        studyid = request.GET.get('studyid')
        try:
            if studyid is None or studyid == '':
                studyid = 0
            studyid = int(studyid) # check it is a number

        except:
            studyid = 0 # in case of input error

        ########################
        # Get the event
        ########################

        try:
            event = Event.objects.get(pk=eventid)
            self.page_context['paneltitle'] = unicode(event.yearint) + ' ' + event.name + ' ' + event.country
            self.page_context['page_title'] = self.page_context['paneltitle']
            self.page_context['page_backlink'] = '<a href="/ecd/eventoverview/' + str(eventid) +  '?&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) +'&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all) +'">&laquo; Back to event overview</a>'
            epicentreWKT = event.location.split(' ')
            self.page_context['epicentre'] = {'lat': epicentreWKT[1][:-1], 'lon': epicentreWKT[0][6:]}
            self.page_context['shakemapid'] = str(event.usgsshakemapid) # in case we want to add it to map
            self.page_context['eventid'] = str(eventid)
            self.page_context['narrative'] = event.eventnarrative.replace('\r', '<br \>').replace('\n','')
            self.page_context['impact'] = event.overallimpact.replace('\r', '<br \>').replace('\n','')
        except:
            return self.showErrorPage(request, 'Cannot find event with id ' + unicode(eventid), 'errorpage.html')


        ########################
        # Data displays
        ########################

        self.page_context['pageclass'] = 'eventdetailspage'

        ##############################################################################
        # Set up full event details for input
        ##############################################################################

        eventfullForm = self.EventFullForm(instance=event, prefix="eventoverviewform")  # create the ModelForm
        eventfullfieldstructure = self.createFormFieldStructure( eventfullForm, event, {'foreignkeylinkprefix': '/ecd'} ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['eventfullfields'] = eventfullfieldstructure # for display
        self.page_context['eventfullform'] = eventfullForm # for editing


        ##############################################################################
        # Set up overviews for display
        ##############################################################################

        eventoverviewForm = self.EventOverviewForm(instance=event, prefix="eventoverviewform")  # create the ModelForm
        eventoverviewfieldstructure = self.createFormFieldStructure( eventoverviewForm, event, {'foreignkeylinkprefix': '/ecd'} ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['eventoverviewfields'] = eventoverviewfieldstructure # for display
        self.page_context['eventoverviewform'] = eventoverviewForm # for editing

        keyfactsForm = self.KeyFactsForm(instance=event, prefix="keyfactsform")  # create the ModelForm
        keyfactsfieldstructure = self.createFormFieldStructure( keyfactsForm, event, {'foreignkeylinkprefix': '/ecd'} ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['keyfactsfields'] = keyfactsfieldstructure # for display
        self.page_context['keyfactsform'] = keyfactsForm # for editing

        humancasualtyForm = self.HumanCasualtyForm(instance=event, prefix="humancasualtyform")  # create the ModelForm
        humancasualtyfieldstructure = self.createFormFieldStructure( humancasualtyForm, event, {'foreignkeylinkprefix': '/ecd'} ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['humancasualtyfields'] = humancasualtyfieldstructure # for display
        self.page_context['humancasualtyform'] = humancasualtyForm # for editing

        buildingdamageForm = self.BuildingDamageForm(instance=event, prefix="buildingdamageform")  # create the ModelForm
        buildingdamagefieldstructure = self.createFormFieldStructure( buildingdamageForm, event, {'foreignkeylinkprefix': '/ecd'} ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['buildingdamagefields'] = buildingdamagefieldstructure # for display
        self.page_context['buildingdamageform'] = buildingdamageForm # for editing

        socioeconomicForm = self.SocioeconomicForm(instance=event, prefix="socioeconomicform")  # create the ModelForm
        socioeconomicfieldstructure = self.createFormFieldStructure( socioeconomicForm, event, {'foreignkeylinkprefix': '/ecd'} ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['socioeconomicfields'] = socioeconomicfieldstructure # for display
        self.page_context['socioeconomicform'] = socioeconomicForm # for editing

        demographicsForm = self.DemographicsForm(instance=event, prefix="demographicsform")  # create the ModelForm
        demographicsfieldstructure = self.createFormFieldStructure( demographicsForm, event, {'foreignkeylinkprefix': '/ecd'} ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['demographicsfields'] = demographicsfieldstructure # for display
        self.page_context['demographicsform'] = demographicsForm # for editing

        studies = Study.objects.filter(parentid=eventid)
        studiesForm = self.StudiesForm()
        studiesliststructure = self.createListFieldStructure( studiesForm, studies, '',  {'foreignkeylinkprefix': '/ecd'} ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['studieslist'] = studiesliststructure # for display

        # fudge for dealing with different locations of the "src" static directory on the development system
        self.page_context['src_folder'] = '/oq-platform2/'
        if platform.system() == 'Windows':
            self.page_context['src_folder'] = '/static/'

        # set up the filter string for returns
        self.page_context['filterstring'] = '?&studyid=' + str(studyid) + '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) + '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all)

        self.page_context['iconicimage'] = 'event' + str(eventid) + '.jpg'

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

            # get event epicentre
            event = Event.objects.get(pk=eventid)
            epicentreWKT = event.location.split(' ')
            self.page_context['epicentre'] = {'lat': epicentreWKT[1][:-1], 'lon': epicentreWKT[0][6:]}

            # edit mode
            if self.page_context['editmode']:
                # Create the form for either the new dummy record or an existing one; prefix allows multiple forms
                pass
            else:
                pass

            return render(request, self.template_name, self.page_context)

        ###############
        # POST
        ###############
        if request.method == 'POST':

            self.page_context['input_errors'] = False

            # As this stage page contains different forms
            # we must check to see which forms we are processing
            # by testing for a field in the form
            if 'eventfullform-name' in request.POST:
                # we are editing the location
                eventfullForm = self.EventFullForm(request.POST, instance=event , prefix='eventfullform') # A form bound to the POST data, prefix allows multiple forms
                eventfullFormvalid = eventfullForm.is_valid()

                if eventfullFormvalid:
                    event.lastupdate = datetime.now()
                    event.lastupdatebyid = request.user.id
                    event.save()
                else:
                    self.page_context['eventfullform'] = eventfullForm
                    self.page_context['input_errors'] = True
                    return render(request, self.template_name, self.page_context)  # Error - return just the form when there is an error - the template must not try and render anything outside the form because the context data is not present

            # now do the page redirect back to the eventdetails page in display mode
            pagename = '/ecd/eventdetails'
            return HttpResponseRedirect(pagename + '/' + str(eventid) + self.page_context['filterstring']) # Redirect after POST

