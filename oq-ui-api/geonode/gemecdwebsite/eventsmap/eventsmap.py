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
from econd.models import EventsQuick, GeoArchiveMasterOverview, GeoArchiveLocations, GeoArchiveEvents, GeoArchiveDamageLevels, GeoArchiveInventoryClasses, GeoArchiveLocationsForJSON, GeoArchiveAssetClasses, GeoArchiveEventsQuick, GeoArchiveDamageLevelsQuick,GeoArchiveAssetClassesQuick


template_name = 'eventsmap/templates/eventsmap.html'
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


class EventsMap (Pagebase):

    class FilterBarForm(forms.Form):
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

        photos = forms.BooleanField(label='Photos', required=False)
        photos.widget.attrs['title'] = "Photos"
        #photos.widget.attrs['onchange'] = 'submit()'
        photos.widget.attrs['class'] = 'iconbutton'

        socioeconomic = forms.BooleanField(label='Socioeconomic', required=False)
        socioeconomic.widget.attrs['title'] = "Socioeconomic"
        #socioeconomic.widget.attrs['onchange'] = 'submit()'
        socioeconomic.widget.attrs['class'] = 'iconbutton'

        all = forms.BooleanField(label='All', required=False)
        all.widget.attrs['title'] = "All"
        #all.widget.attrs['onchange'] = 'submit()'
        all.widget.attrs['class'] = 'iconbutton'

    class EventQuickLinksForm(forms.Form):
        event = forms.ChoiceField(label='Quick link to event', required=False) #required=False allows field to be disabled
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
            if checked is None or checked == '' or checked == 'False':
                filter_all = False # defaults to false
            else:
                filter_all = True
        except:
            filter_all = False # defaults to false

        checked = request.GET.get('f_b')
        filter_buildings = False
        try:
            if checked is None or checked == '' or checked == 'True':
                filter_buildings = True # defaults to true
        except:
            filter_buildings = True # defaults to true

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

        # gemecd.org
        # urlStr = 'http://gemecd.org:8080/geoserver/gemecd/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gemecd:geoarchiveevents&maxFeatures=5000&outputFormat=json'
        # ecd-dev.openquake.org
        #urlStr = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:geoarchiveevents&maxFeatures=5000&outputFormat=json'

        if filter_all:
            # show all events with no filtering applied so request allevents layer from Geoserver
            urlStr = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:gemecdallevents&maxFeatures=5000&outputFormat=json'

        else:
            # if socio economic filter is on, we restrict the query to events that have socioeconomic studies
            if filter_socioeconomic:
                urlStr = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:gemecdfilterwithsocioeconomic&maxFeatures=5000&outputFormat=json'

            else:
                # filters are active so request filter layer from Geoserver
                urlStr = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:gemecdfilter&maxFeatures=5000&outputFormat=json'

                # if socio economic filter is on, we restrict the query to events that have socioeconomic studies (but this query is combined with the other filters)
                if filter_socioeconomic:
                    urlStr = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:gemecdfilterwithsocioeconomic&maxFeatures=5000&outputFormat=json'

                # compose filter string suitable for the request to Geoserver
                # NOTE 1: in viewparams can't use the SQL IN () notation because commas not allowed; and must escape spaces as %20
                # NOTE 2: POSSIBLE SECURITY ISSUE: this string is passed in free text to Geoserver and could be used in an sql injection
                filterStr = ''
                if filter_buildings:
                    filterStr += "studytypecode='B'%20OR%20"
                if filter_casualty:
                    filterStr += "studytypecode='C'%20OR%20"
                if filter_infrastructure:
                    filterStr += "studytypecode='CRI'%20OR%20"
                if filter_photos:
                    filterStr += "studytypecode='PHOTO'%20OR%20"
                if filterStr == '':
                    filterStr = "studytypecode='X'%20OR%20"
                filterStr = filterStr[:-8] # chop off final %20OR%20
                urlStr += "&viewparams=studytypecodes:" + filterStr


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

                else:
                    # the filter bar was changed
                    filterbarform = self.FilterBarForm(request.POST, prefix='filterbarform')
                    valid_filterbarform = filterbarform.is_valid()

                    if valid_filterbarform : # All validation rules pass
                        filter_buildings = filterbarform.cleaned_data['buildings']
                        filter_casualty = filterbarform.cleaned_data['casualty']
                        filter_infrastructure = filterbarform.cleaned_data['infrastructure']
                        filter_photos = filterbarform.cleaned_data['photos']
                        filter_socioeconomic = filterbarform.cleaned_data['socioeconomic']
                        filter_all = filterbarform.cleaned_data['all']

                pagename = '/ecd/eventsmap'
                if eventid != '0':
                    pagename = '/ecd/eventsmap' # locations page
                return HttpResponseRedirect(pagename + '?eventid=' + str(eventid) + '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) +
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
                self.page_context['maptype'] = 'event'

                # filter bar form - the filter icons
                filterbarform = self.FilterBarForm

                filterbarform.base_fields['buildings'].initial = filter_buildings
                filterbarform.base_fields['casualty'].initial = filter_casualty
                filterbarform.base_fields['infrastructure'].initial = filter_infrastructure
                filterbarform.base_fields['photos'].initial = filter_photos
                filterbarform.base_fields['socioeconomic'].initial = filter_socioeconomic
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

                self.page_context['eventquicklinksform'] = eventquicklinksform(prefix="eventquicklinksform", label_suffix='')

            return render(request, template_name, self.page_context)