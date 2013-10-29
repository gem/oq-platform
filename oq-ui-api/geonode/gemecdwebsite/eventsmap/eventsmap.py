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


class EventsListForm (ModelForm):
    class Meta:
        model = EventsQuick
        fields = ('yearint', 'eventname', 'country', 'partner' )


class EventsMap (Pagebase):

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



    class PanelForm(forms.Form):
        event = forms.ChoiceField(label='Event', required=False) #required=False allows field to be disabled
        event.widget.attrs['title'] = "Select event to see more details"
        event.widget.attrs['onchange'] = 'submit()'  # this is how you add a change event to a form element - fires this javascript
        event.widget.attrs['class'] = 'eventdropdown'


        #buttonArray = forms.MultipleChoiceField(label='', required=False, widget = CheckboxSelectMultiple())

    def dispatch(self, request, *args, **kwargs):

        self.preProcessPage(request, **kwargs)

        self.page_context['paneltitle'] = 'Consequences Database World Map'
        self.page_context['page_title'] = 'GEMECD: Consequences Database World Map'

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

        # gemecd.org
        # urlStr = 'http://gemecd.org:8080/geoserver/gemecd/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gemecd:geoarchiveevents&maxFeatures=5000&outputFormat=json'
        # ecd-dev.openquake.org
        #urlStr = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:geoarchiveevents&maxFeatures=5000&outputFormat=json'

        if filter_all:
            # show all events with no filtering applied so request all events layer from Geoserver
            urlStr = 'http://ecd-dev.openquake.org/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:gemecdallevents&maxFeatures=5000&outputFormat=json'

        else:
            # if socio economic filter is on, we restrict the query to events that have socioeconomic studies
            # (socioeconomic filter currently commented out)
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


        ###############
        # POST
        ###############
        if request.method == 'POST':

            # As this page can contain different forms depending on its mode
            # we must check to see which forms we are processing
            # by testing for a field in the content management form
            if 'mainpageform-name' in request.POST:
                # we are editing the content management form
                # this page does not have a content management form
                pass
            else:
                # the user has used a form on the page; which one?
                if 'panelform-event' in request.POST:
                    # the event quick link dropdown
                    panelform = self.PanelForm(request.POST, prefix='panelform')
                    valid_panelform = panelform.is_valid()

                    #if valid_panelform: # All validation rules pass
                    #    eventid = panelform.cleaned_data['event']

                    # get raw unvalidated data, because the validation was failing on remote site [why?]
                    eventid = panelform.data['panelform-event']

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
                if unicode(eventid) != '0':
                    pagename = '/ecd/eventoverview' # locations page
                return HttpResponseRedirect(pagename + '/' + str(eventid) + '?&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) +
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
                #filterbarform.base_fields['photos'].initial = filter_photos
                #filterbarform.base_fields['socioeconomic'].initial = filter_socioeconomic
                filterbarform.base_fields['all'].initial = filter_all

                self.page_context['filterbarform'] = filterbarform(prefix="filterbarform", label_suffix='')

                # filter settings for links
                self.page_context['filterstring'] = '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) + '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all)

                # populate event dropdown
                eventlist = [('0','All events')]
                events = EventsQuick.objects.all().order_by('-yearint')
                if filter_buildings:
                    events = events.filter(studytypecode='B')
                if filter_casualty:
                    events = events.filter(studytypecode='C')
                if filter_infrastructure:
                    events = events.filter(studytypecode='CRI')
                if filter_photos:
                    events = events.filter(studytypecode='PHOTO')

                events = events.distinct('id', 'yearint', 'eventname', 'country', 'partner' )

                # list in left hand column
                eventsListForm = EventsListForm()
                eventslist = self.createListFieldStructure(eventsListForm, events, '/ecd/eventoverview/', {'foreignkeylinkprefix':'ecd', 'tagclass': 'eventslist', 'linksuffix': '?' + self.page_context['filterstring']} )
                self.page_context['eventslist'] = eventslist
                self.page_context['pageclass'] = 'eventsmap'

                # alternative left hand drop down list, currently commented out
                #panelform = self.PanelForm
                #for event in events:
                #    eventlist.append((unicode(event.id),unicode(event.yearint) + ' ' + event.eventname + ' ' + unicode(event.country) + ' (' + event.partner + ')' ))
                #panelform.base_fields['event'].choices = eventlist
                #panelform.base_fields['event'].initial = eventid
                #self.page_context['panelform'] = panelform(prefix="panelform", label_suffix='')

            return render(request, template_name, self.page_context)