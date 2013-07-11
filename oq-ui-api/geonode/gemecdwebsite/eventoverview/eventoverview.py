__author__ = 'Simon Ruffle, CAR'

import platform
from weblib.baseclasses.pagebase import Pagebase
import urllib2
from django import forms
from django.forms.widgets import CheckboxSelectMultiple
from django.http import HttpResponseRedirect
from django.shortcuts import render
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from django.forms import ModelForm
from django.db.models import get_model
from econd.models import EventsQuick, LocationsForJSON, Study
from weblib.utils import JSONResponse

template_name = 'eventoverview/templates/eventoverview.html'
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

# location AJAX POST callback
def locationjson (request, *args, **kwargs):
    markerid = ''
    try:
        markerid = request.REQUEST['markerid']
        markerid = int(markerid)
    except:
        markerid = 0

    locationid = ''
    try:
        locationid = request.REQUEST['locationid']
        locationid = int(locationid)
    except:
        locationid = 0

    json = []

    location = LocationsForJSON.objects.filter(id=locationid)

    if ( len(location) ) > 0:
        locationrecord = location[0]; # for CRI and PHOTO studies there is only one record in the queryset; for aggregated studies there may be more than one, so take the first

        if getattr(locationrecord,'samplephotoid') is not None:
            photourl = getattr(locationrecord,'samplephotoid').get_url('overview_grid')  # get url of cached photo thumbnail (this is the first photo with lowest id if there are multiple photos)

            # fudge to allow image to be got directly from geoarchive
            if platform.system() == 'Windows':
                photourl = 'http://geoarchive.net/photos/cache/' + photourl[18:]
            else:
                photourl = 'http://geoarchive.net/photos/cache/' + photourl[16:]
        else:
            photourl = ''

        locationname = getattr(locationrecord,'locationname')
        photocount = getattr(locationrecord,'photocount')
        eventtitle =  getattr(locationrecord,'event') + ' ' + getattr(locationrecord,'country') + ' ' + unicode(getattr(locationrecord,'yearint'))
        studyname = getattr(locationrecord,'study')

        # the following attributes only make sense at location level if this is a non aggregate study
        if ( len(location) ) == 1:
            inventoryclass = getattr(locationrecord,'inventoryclassname')
            inventorydescription = getattr(locationrecord,'description')
            damagelevel = getattr(locationrecord,'unifieddamagelevelname')
            assetclass = getattr(locationrecord,'assetclass')
            assettype = getattr(locationrecord,'assettype')
            assetsubtype = getattr(locationrecord,'assetsubtype')
            designcode = getattr(locationrecord,'designcode')
        else:
            inventoryclass = ''
            inventorydescription = ''
            damagelevel = ''
            assetclass = ''
            assettype = ''
            assetsubtype = ''
            designcode = ''

        json =\
        {
            'markerid': markerid,
            'locationid' : locationid,
            'photourl' : photourl,
            'locationname' : locationname,
            'photocount' : photocount,
            'eventtitle' : eventtitle,
            'study' : studyname,
            'inventoryclass' : inventoryclass,
            'inventorydescription' : inventorydescription,
            'damagelevel' : damagelevel,
            'assetclass' : assetclass,
            'assettype' : assettype,
            'assetsubtype' : assetsubtype,
            'designcode' : designcode,
        }
    else:
        json =\
        {
            'markerid': markerid,
            'locationid': locationid,
            'locationname': 'error in json request',
        }

    return JSONResponse(json)


class EventOverview (Pagebase):

    class FilterBarForm(forms.Form):
        all = forms.BooleanField(label='All', required=False)
        all.widget.attrs['title'] = "All"
        #all.widget.attrs['onchange'] = 'submit()'
        all.widget.attrs['class'] = 'iconbutton'

        buildings = forms.BooleanField(label='Buildings', required=False)
        buildings.widget.attrs['title'] = "Consequences to aggregated buildings"
        #buildings.widget.attrs['onchange'] = 'submit()'
        buildings.widget.attrs['class'] = 'iconbutton'

        casualty = forms.BooleanField(label='Casualty', required=False)
        casualty.widget.attrs['title'] = "Consequences to casualty"
        #casualty.widget.attrs['onchange'] = 'submit()'
        casualty.widget.attrs['class'] = 'iconbutton'

        infrastructure = forms.BooleanField(label='CBI', required=False)
        infrastructure.widget.attrs['title'] = "Consequences to infrastructure"
        #infrastructure.widget.attrs['onchange'] = 'submit()'
        infrastructure.widget.attrs['class'] = 'iconbutton'

        #photos = forms.BooleanField(label='Photos', required=False)
        #photos.widget.attrs['title'] = "Photos"
        ##photos.widget.attrs['onchange'] = 'submit()'
        #photos.widget.attrs['class'] = 'iconbutton'

        #socioeconomic = forms.BooleanField(label='Socioeconomic', required=False)
        #socioeconomic.widget.attrs['title'] = "Socioeconomic"
        ##socioeconomic.widget.attrs['onchange'] = 'submit()'
        #socioeconomic.widget.attrs['class'] = 'iconbutton'



    class EventQuickLinksForm(forms.Form):
        study = forms.ChoiceField(label='Study', required=False) #required=False allows field to be disabled
        study.widget.attrs['title'] = "Filter by study"
        study.widget.attrs['onchange'] = 'submit()'  # this is how you add a change event to a form element - fires this javascript
        study.widget.attrs['class'] = 'studydropdown'

        event = forms.ChoiceField(label='Event', required=False) #required=False allows field to be disabled
        event.widget.attrs['title'] = "Quick link to event details"
        event.widget.attrs['onchange'] = 'submit()'  # this is how you add a change event to a form element - fires this javascript
        event.widget.attrs['class'] = 'eventdropdown'


        #buttonArray = forms.MultipleChoiceField(label='', required=False, widget = CheckboxSelectMultiple())

    def dispatch(self, request, *args, **kwargs):

        self.preProcessPage(request, **kwargs)

        # get checkbox defaults from the querystring
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

        # event drop down default from querystring
        eventid = request.GET.get('eventid')
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

        # study id default
        studyid = request.GET.get('studyid')
        try:
            if studyid is None or studyid == '':
                studyid = 0
            studyid = int(studyid) # check it is a number

            # need to check this study is available according to current filter settings and event choice
            study_found = False
            studies = Study.objects.filter(parentid=eventid)
            if not filter_all:
                studies = studies.filter(studytypecode=studytype)
            for study in studies:
                if study.id == studyid:
                    study_found = True

            if not study_found:
                studyid = 0

        except:
            studyid = 0 # in case of input error

        # Prepare GeoServer request. We are viewing an individual event, so show the locations
        urlStr = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:gemecdlocations&maxFeatures=5000&outputFormat=json'
        urlStr += '&viewparams=override_e:0;eventid:' + unicode(eventid) + ';'

        # study selection
        if studyid > 0:
            urlStr += 'override_s:0;studyid:' + unicode(studyid) + ';'

        if not filter_all:
            urlStr += 'override_c:0;studytypecode:' + studytype + ';'

        # fudge for dealing with different locations of the "src" static directory on the development system
        self.page_context['src_folder'] = '/oq-platform2/'
        if platform.system() == 'Windows':
            self.page_context['src_folder'] = '/static/'

        self.page_context['ix'] = '5' # override ix parameter which is 5 for the events map page
        current_object = None

        try:
            current_object = get_model(appname, modelname).objects.get(pk=self.page_context['ix'])
        except ObjectDoesNotExist:
            return self.showErrorPage(request, 'Error: ' + modelname + ' ' + str(self.page_context['ix']) + ' does not exist', 'errorpage.html')
        except:
            return self.showErrorPage(request, 'Error: invalid parameter supplied', 'errorpage.html')

        self.page_context['current_object'] = current_object
        if hasattr(current_object,'name'):
            self.page_context['page_title'] = current_object.name
        if hasattr(current_object,'subtitle'):
            self.page_context['page_subtitle'] = current_object.subtitle
        if hasattr(current_object,'righttext'):
            self.page_context['righttext'] = current_object.righttext

        # display
        pageFormDisplay = PageFormDisplay (instance=current_object)
        pagefields = self.createFormFieldStructure( pageFormDisplay, current_object )

        # intercept the field structure dictionary for "image1" field and
        # change the type to WebLibPhoto and provide the photo size
        # this only affects generictablerenderer so is only for display
        index = 0
        for i in pageFormDisplay.visible_fields():
            if i.name == 'image1':
                pagefields['fields'][index][0]['image1']['type'] = 'WebLibPhoto'
                pagefields['fields'][index][0]['image1']['photosize'] = formphotosize
                break
            index += 1

        self.page_context['simpleformfields1'] = pagefields  #pass field structure to generictablerenderer

        # other info to pass through the page context
        self.page_context['pageclass'] = 'basicpage'
        self.page_context['editlink'] = ('/' + modelname + '/' + str(self.page_context['ix'])).lower()



        ###############
        # POST
        ###############
        if request.method == 'POST':

            # As this page can contain different forms depending on its mode
            # we must check to see which forms we are processing
            # by testing for a field in the content management form
            if 'mainpageform-name' in request.POST:
                # we are editing the content management form

                # Create a form bound to the POST data, prefix allows multiple forms
                pageFormEdit = PageFormEdit(request.POST, instance=current_object, prefix='mainpageform')
                if pageFormEdit.is_valid():
                    # All validation rules pass
                    self.page_context['editmode'] = False  # no errors
                    current_object.lastupdate = datetime.now()
                    current_object.lastupdatebyid = request.user.id

                    # save the user input from the form to the record
                    pageFormEdit.save()

                    # Redirect after successful POST to the display version of the page
                    return HttpResponseRedirect(('/' + modelname + '/' + str(self.page_context['ix'])).lower())
                else:
                    # Validation Error - return just the form when there is an error -
                    # the template must not try and render anything outside the form
                    # because the context data is not present
                    self.page_context['form'] = pageFormEdit
                    return render(request, template_name, self.page_context)
            else:
                # the user has used a form on the page; which one?
                if 'eventquicklinksform-event' in request.POST:
                    # the event quick link dropdown
                    eventquicklinksform = self.EventQuickLinksForm(request.POST, prefix='eventquicklinksform')
                    valid_eventquicklinksform = eventquicklinksform.is_valid()

                    if valid_eventquicklinksform: # All validation rules pass
                        eventid = eventquicklinksform.cleaned_data['event']
                        studyid = eventquicklinksform.cleaned_data['study']

                else:
                    # the filter bar was changed
                    filterbarform = self.FilterBarForm(request.POST, prefix='filterbarform')
                    valid_filterbarform = filterbarform.is_valid()

                    if valid_filterbarform : # All validation rules pass
                        filter_buildings = filterbarform.cleaned_data['buildings']
                        filter_casualty = filterbarform.cleaned_data['casualty']
                        filter_infrastructure = filterbarform.cleaned_data['infrastructure']
                        #filter_photos = filterbarform.cleaned_data['photos']
                        #filter_socioeconomic = filterbarform.cleaned_data['socioeconomic']
                        filter_all = filterbarform.cleaned_data['all']

                pagename = '/ecd/eventsmap'
                if eventid != '0':
                    pagename = '/ecd/eventoverview' # locations page
                return HttpResponseRedirect(pagename + '?eventid=' + str(eventid) + '&studyid=' + str(studyid) + '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) +
                                            '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all) ) # Redirect after POST


        ###############
        # GET
        ###############
        if request.method == 'GET':

            # edit mode
            if self.page_context['editmode']:
                # Create the form for either the new dummy record or an existing one; prefix allows multiple forms
                pageFormEdit = PageFormEdit (instance=current_object, prefix="mainpageform")
                self.page_context['mainpageform'] = pageFormEdit
            else:
                # display mode

                # get the map overlay GeoJSON from Geoserver
                GeoJsonStr = urllib2.urlopen(urlStr).read()

                # trap errors coming back from Geoserver and dont send them on to the webpage
                if 'ServiceExceptionReport' in GeoJsonStr:
                    GeoJsonStr = ''

                self.page_context['geojson'] = GeoJsonStr
                self.page_context['maptype'] = 'location'

                # filter bar form - the filter icons
                filterbarform = self.FilterBarForm

                filterbarform.base_fields['buildings'].initial = filter_buildings
                filterbarform.base_fields['casualty'].initial = filter_casualty
                filterbarform.base_fields['infrastructure'].initial = filter_infrastructure
                #filterbarform.base_fields['photos'].initial = filter_photos
                #filterbarform.base_fields['socioeconomic'].initial = filter_socioeconomic
                filterbarform.base_fields['all'].initial = filter_all

                self.page_context['filterbarform'] = filterbarform(prefix="filterbarform", label_suffix='')

                # events quick links dropdown form
                eventquicklinksform = self.EventQuickLinksForm

                # populate event dropdown
                eventlist = [('0','All ECD events')]
                events = EventsQuick.objects.all().order_by('-yearint')
                for event in events:
                    eventlist.append((unicode(event.id),unicode(event.yearint) + ' ' + event.eventname + ' ' + unicode(event.country) + ' (' + event.partner + ')' ))

                eventquicklinksform.base_fields['event'].choices = eventlist
                eventquicklinksform.base_fields['event'].initial = eventid

                # populate study dropdown

                studies = Study.objects.filter(parentid=eventid).order_by('name')
                if studytype is not '':
                    studies = studies.filter(studytypecode=studytype)

                if len(studies) > 0:
                    studylist = [('0','All studies')]
                    for study in studies:
                        studylist.append((unicode(study.id), study.name))
                else:
                    studylist = [('0','NO STUDIES')]

                eventquicklinksform.base_fields['study'].choices = studylist
                eventquicklinksform.base_fields['study'].initial = studyid

                # filter settings for the link on the dropdown
                self.page_context['filterstring'] = '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) + '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all)

                self.page_context['eventquicklinksform'] = eventquicklinksform(prefix="eventquicklinksform", label_suffix='')

            return render(request, template_name, self.page_context)