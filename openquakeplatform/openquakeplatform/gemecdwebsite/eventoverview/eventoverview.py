__author__ = 'Simon Ruffle, CAR'

import platform
from openquakeplatform.weblib.baseclasses.pagebase import Pagebase
import urllib2
from django import forms
from django.forms.widgets import CheckboxSelectMultiple
from django.http import HttpResponseRedirect
from django.shortcuts import render
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from django.forms import ModelForm
from django.db.models import get_model
from openquakeplatform import settings
from openquakeplatform.econd.models import EventsQuick, LocationsForJSON, LocationsForJSONAggregated,Study
from openquakeplatform.econd.event_models import Event
from openquakeplatform.econd.sql_views import LocationsQuick
from openquakeplatform.weblib.utils import JSONResponse

import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)

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
    try:
        markerid = request.REQUEST['markerid']
        markerid = int(markerid)
    except (KeyError, ValueError):
        markerid = 0

    try:
        locationid = request.REQUEST['locationid']
        locationid = int(locationid)
    except (KeyError, ValueError):
        locationid = 0

    try:
        # TODO this string ought to be sanitised
        filterstring = request.REQUEST['filterstring']
    except (KeyError, ValueError):
        filterstring = 0

    try:
        isPolygon = (request.REQUEST['polygon'] == '1')
    except KeyError:
        isPolygon = False

    json = []

    # first try and find the location in the building-by-building non-aggregated view
    # this view will only find locations where isaggregated = 0
    location = LocationsForJSON.objects.filter(id=locationid)

    if ( len(location) ) > 0:
        # it is not aggregated
        locationrecord = location[0]; # in properly  aggregated studies there is only one record in the queryset; however if its actually aggregated and the isaggregated flag is set wrong, multiple records will be returned and we take the first

        if getattr(locationrecord,'samplephotoid') is not None:
            photourl = getattr(locationrecord,'samplephotoid').get_url('overview_grid')  # get url of cached photo thumbnail (this is the first photo with lowest id if there are multiple photos)

            # fudge to allow image to be got directly from geoarchive
            if platform.system() == 'Windows':
                pass
            else:
                pass # ecd-dev has the MEDIA_URL set to point to geoarchive
        else:
            photourl = ''

        locationname = getattr(locationrecord,'locationname')
        photocount = getattr(locationrecord,'photocount')
        eventtitle =  getattr(locationrecord,'event') + ' ' + getattr(locationrecord,'country') + ' ' + unicode(getattr(locationrecord,'yearint'))
        studyname = getattr(locationrecord,'study')

        # just in case we are looking at a mis labelled aggregate study
        if ( len(location) ) == 1: # it is definitely not aggregated
            inventoryclass = getattr(locationrecord,'inventoryclassname')
            inventorydescription = getattr(locationrecord,'description')
            damagelevel = getattr(locationrecord,'unifieddamagelevelname')
            assetclass = getattr(locationrecord,'assetclass')
            assettype = getattr(locationrecord,'assettype')
            assetsubtype = getattr(locationrecord,'assetsubtype')
            designcode = getattr(locationrecord,'designcode')
        else: # is actually aggregated
            inventoryclass = '[aggregated]'
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
            'filterstring' : filterstring,
        }
    else:
        # location probably is aggregated. This view returns one record for aggregated survey locations
        location = LocationsForJSONAggregated.objects.filter(id=locationid)

        if ( len(location) ) > 0:
            # it is aggregated
            locationrecord = location[0];

            if getattr(locationrecord,'samplephotoid') is not None:
                photourl = getattr(locationrecord,'samplephotoid').get_url('overview_grid')  # get url of cached photo thumbnail (this is the first photo with lowest id if there are multiple photos)

                # fudge to allow image to be got directly from geoarchive
                if platform.system() == 'Windows':
                    #photourl = 'http://geoarchive.net/photos/cache/' + photourl[18:]
                    pass # locally MEDIA_URL set to point to geoarchive
                else:
                    #photourl = 'http://geoarchive.net/photos/cache/' + photourl[16:]
                    pass # ecd-dev has the MEDIA_URL set to point to geoarchive
            else:
                photourl = ''

            locationname = getattr(locationrecord,'locationname')
            photocount = getattr(locationrecord,'photocount')
            eventtitle =  getattr(locationrecord,'event') + ' ' + getattr(locationrecord,'country') + ' ' + unicode(getattr(locationrecord,'yearint'))
            studyname = getattr(locationrecord,'study')

            json =\
            {
                'markerid': markerid,
                'locationid' : locationid,
                'photourl' : photourl,
                'locationname' : locationname,
                'photocount' : photocount,
                'eventtitle' : eventtitle,
                'study' : studyname,
                'inventoryclass' : '[aggregated]',
                'inventorydescription' : '',
                'damagelevel' : '',
                'assetclass' : '',
                'assettype' : '',
                'assetsubtype' : '',
                'designcode' : '',
                'filterstring' : filterstring,
            }

        else:
            json =\
            {
                'markerid': markerid,
                'locationid': locationid,
                'locationname': 'error in json request',
            }

    return JSONResponse(json)


class LocationsListForm (ModelForm):
    class Meta:
        model = LocationsQuick
        fields = ('locationname', )


class EventOverview (Pagebase):

    class FilterBarForm(forms.Form):
        all = forms.BooleanField(label='All', required=False)
        all.widget.attrs['title'] = "All"
        all.widget.attrs['class'] = 'iconbutton'

        buildings = forms.BooleanField(label='Buildings', required=False)
        buildings.widget.attrs['title'] = "Consequences to aggregated buildings"
        buildings.widget.attrs['class'] = 'iconbutton'

        casualty = forms.BooleanField(label='Casualty', required=False)
        casualty.widget.attrs['title'] = "Consequences to casualty"
        casualty.widget.attrs['class'] = 'iconbutton'

        infrastructure = forms.BooleanField(label='CBI', required=False)
        infrastructure.widget.attrs['title'] = "Consequences to infrastructure"
        infrastructure.widget.attrs['class'] = 'iconbutton'


    class PanelForm(forms.Form):
        study = forms.ChoiceField(label='Study', required=False) #required=False allows field to be disabled
        study.widget.attrs['title'] = "Filter by study"
        study.widget.attrs['onchange'] = 'submit()'  # this is how you add a change event to a form element - fires this javascript
        study.widget.attrs['class'] = 'studydropdown'

    class EventForm (ModelForm):
        class Meta:
            model = Event
            fields = ('usgsshakemapid', 'eventdate', 'eventtime', 'magnitude', 'depth', )

    def dispatch(self, request, *args, **kwargs):
        geoserver_url = settings.OGC_SERVER['default']['LOCATION']

        self.preProcessPage(request, **kwargs)

        # get checkbox defaults from the querystring
        checked = request.GET.get('all')
        if checked is None or checked == '' or checked == 'True':
            filter_all = True # defaults to true
        else:
            filter_all = False

        checked = request.GET.get('f_b')
        if checked is None or checked == '' or checked == 'False':
            filter_buildings = False # defaults to false
        else:
            filter_buildings = True

        checked = request.GET.get('f_c')
        if checked is None or checked == '' or checked == 'False':
            filter_casualty = False
        else:
            filter_casualty = True

        checked = request.GET.get('f_i')
        if checked is None or checked == '' or checked == 'False':
            filter_infrastructure = False
        else:
            filter_infrastructure = True

        checked = request.GET.get('f_p')
        if checked is None or checked == '' or checked == 'False':
            filter_photos = False
        else:
            filter_photos = True

        checked = request.GET.get('f_s')
        if checked is None or checked == '' or checked == 'False':
            filter_socioeconomic = False # defaults to false
        else:
            filter_socioeconomic = True

        # event id
        eventid = kwargs.get('ix')
        try:
            if eventid is None or eventid == '':
                eventid = 0
            eventid = int(eventid) # check its a number
        except ValueError:
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

        except ValueError:
            studyid = 0 # in case of input error

        # Prepare GeoServer request for point-based locations.
        urlStrPoints = geoserver_url + 'oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=oqplatform:gemecdlocations&maxFeatures=5000&outputFormat=json'
        urlStrPoints += '&viewparams=override_e:0;eventid:' + unicode(eventid) + ';'

        # study selection
        if studyid > 0:
            urlStrPoints += 'override_s:0;studyid:' + unicode(studyid) + ';'

        if not filter_all:
            urlStrPoints += 'override_c:0;studytypecode:' + studytype + ';'

        # polygon layers
        urlStrPolygonsList = []
        if studyid > 0:
            # just one study is selected
            studies = Study.objects.filter(pk=studyid)
        else:
            # multiple studies
            studies = Study.objects.filter(parentid=eventid)
            if not filter_all:
                studies = studies.filter(studytypecode=studytype)

        # iterate through studies
        for study in studies:
            try:
                geobase = study.geobaseid # will give an exception if this study does not have a geobese

                # we have a geobase, so
                # Prepare GeoServer request for polygon-based locations
                # to investigate reasons of: http://localhost:8080/geoserver/oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=oqplatform:gemecdlocationquerygeobase&maxFeatures=5000&outputFormat=json&viewparams=parenttype:study;parentid:4;jointable:None;joincolumn:None;boundarygeom:None;override:0;
                urlStrPolygons = geoserver_url + 'oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=oqplatform:gemecdlocationquerygeobase&maxFeatures=5000&outputFormat=json'
                urlStrPolygons += '&viewparams=parenttype:study;parentid:' + unicode(study.id) + ';jointable:' + geobase.tablename + ';joincolumn:' + geobase.idcolumnname + ';boundarygeom:' + geobase.geomcolumnname + ';override:0;'
                urlStrPolygonsList.append(urlStrPolygons)
            except Exception as exc:
                logger.error(exc, exc_info=True)

        self.page_context['geoserver_url'] = geoserver_url

        # fudge for dealing with different locations of the "src" static directory on the development system
        self.page_context['src_folder'] = '/oq-platform2/'
        if platform.system() == 'Windows':
            self.page_context['src_folder'] = '/static/'

        try:
            event = Event.objects.get(pk=eventid)
            self.page_context['paneltitle'] = unicode(event.yearint) + ' ' + event.name + ' ' + event.country
            self.page_context['page_title'] = self.page_context['paneltitle']
            self.page_context['page_backlink'] = '<a href="/ecd/eventsmap?&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) +'&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all) +'">&laquo; Back to world map</a>'
            epicentreWKT = event.location.split(' ')
            self.page_context['epicentre'] = {'lat': epicentreWKT[1][:-1], 'lon': epicentreWKT[0][6:]}
            self.page_context['shakemapid'] = str(event.usgsshakemapid)
            self.page_context['eventid'] = str(eventid)
        except Exception as exc:
            logger.error(exc, exc_info=True)
            return self.showErrorPage(request, 'Cannot find event with id ' + unicode(eventid), 'errorpage.html')

        # left hand panel event info form
        eventForm = self.EventForm(instance=event, prefix="eventform")
        eventfieldstructure = self.createFormFieldStructure( eventForm, event, {'foreignkeylinkprefix': '/ecd'} ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)
        self.page_context['eventfields'] = eventfieldstructure # for display
        self.page_context['eventform'] = eventForm # for editing

        # iconic image
        self.page_context['iconicimage'] = 'event' + str(eventid) + '.jpg'

        ###############
        # POST
        ###############
        if request.method == 'POST':

            # As this page can contain different forms depending on its mode
            # we must check to see which forms we are processing
            # by testing for a field in the content management form
            if 'mainpageform-name' in request.POST:
                # we are editing the content management form
                pass
            else:
                # the user has used a form on the page; which one?
                locationid = '0'
                if 'panelform-study' in request.POST:
                    # the study dropdown
                    panelform = self.PanelForm(request.POST, prefix='panelform')
                    valid_panelform = panelform.is_valid()

                    # This was failing on remote site [why?], so commented out - there cant be any validation errors
                    #if valid_panelform:
                    #    locationid = panelform.cleaned_data['location']
                    #    studyid = panelform.cleaned_data['study']

                    # get raw data
                    studyid = panelform.data['panelform-study']

                else:
                    # the filter bar was changed
                    filterbarform = self.FilterBarForm(request.POST, prefix='filterbarform')
                    valid_filterbarform = filterbarform.is_valid()

                    if valid_filterbarform : # All validation rules pass
                        filter_buildings = filterbarform.cleaned_data['buildings']
                        filter_casualty = filterbarform.cleaned_data['casualty']
                        filter_infrastructure = filterbarform.cleaned_data['infrastructure']
                        filter_all = filterbarform.cleaned_data['all']

                pagename = '/ecd/eventoverview/' + str(eventid)
                if locationid != '0':
                    pagename = '/ecd/location/' + str(locationid) # locations page
                return HttpResponseRedirect(pagename + '?&studyid=' + str(studyid) + '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) +
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

                    # watch out for error in GeoServer response, or for the layer to be empty - in which case dont create the layer because Leaflet cannot handle empty layers
                    if 'ServiceExceptionReport' in geoJsonStrPolygons or geoJsonStrPolygons == '{"type":"FeatureCollection","features":[]}':
                        geoJsonStrPolygons = ''
                    else:
                        geoJsonStrPolygonsList.append(geoJsonStrPolygons)


                self.page_context['geojsonpolygonslist'] = geoJsonStrPolygonsList
                self.page_context['maptype'] = 'location'

                # filter bar form - the filter icons
                filterbarform = self.FilterBarForm

                filterbarform.base_fields['buildings'].initial = filter_buildings
                filterbarform.base_fields['casualty'].initial = filter_casualty
                filterbarform.base_fields['infrastructure'].initial = filter_infrastructure
                filterbarform.base_fields['all'].initial = filter_all

                self.page_context['filterbarform'] = filterbarform(prefix="filterbarform", label_suffix='')

                # left hand panel dropdowns form
                panelform = self.PanelForm

                studies = Study.objects.filter(parentid=eventid).order_by('name')
                if studytype is not '':
                    studies = studies.filter(studytypecode=studytype)

                # populate study dropdown
                if len(studies) > 0:
                    studylist = [('0','All studies')]
                    for study in studies:
                        studylist.append((unicode(study.id), study.name))
                else:
                    studylist = [('0','NO STUDIES')]

                panelform.base_fields['study'].choices = studylist
                panelform.base_fields['study'].initial = studyid

                locations = LocationsQuick.objects.filter(eventid=eventid).order_by('locationname')
                if studyid > 0 :
                    locations = locations.filter(studyid=studyid)

                if studytype is not '':
                    locations = locations.filter(studytypecode=studytype)

                # populate location dropdown - commented out
                #if len(locations) > 0:
                #    locationlist = [('0','All locations')]
                #    for location in locations:
                #        locationlist.append((unicode(location.id), location.locationname))
                #else:
                #    locationlist = [('0','NO LOCATIONS')]
                #panelform.base_fields['location'].choices = locationlist

                self.page_context['panelform'] = panelform(prefix="panelform", label_suffix='')

                # end of panel and dropdowns

                # filter settings for the links
                self.page_context['filterstring'] = '?studyid=' + str(studyid) + '&f_b=' + str(filter_buildings) + '&f_c=' + str(filter_casualty) + '&f_i=' + str(filter_infrastructure) + '&f_p=' + str(filter_photos) + '&f_s=' + str(filter_socioeconomic) + '&all=' + str(filter_all)

                # left hand panel location list
                locationsListForm = LocationsListForm()
                locationslist = self.createListFieldStructure(locationsListForm, locations, '/ecd/location/', {'foreignkeylinkprefix':'ecd', 'tagclass': 'locationslist', 'linksuffix': self.page_context['filterstring']} )
                self.page_context['locationslist'] = locationslist
                if len(locations) > 0:
                    self.page_context['locationslabel'] = 'Locations in studies'
                else:
                    self.page_context['locationslabel'] = 'No locations in selected studies'

                self.page_context['pageclass'] = 'eventoverview'

            return render(request, template_name, self.page_context)
