__author__ = 'Simon Ruffle, CAR'

from django.forms import ModelForm
from django.shortcuts import render
from openquakeplatform.weblib.baseclasses.pagebase import Pagebase
from openquakeplatform.weblib.models import WebLibPhoto
from openquakeplatform.econd.models import Location
from openquakeplatform.econd.models import Study, Event
from django.http import HttpResponseRedirect
from datetime import datetime

template_dir = 'photo/templates/'

appname = 'econd'
modelname = 'photo'

class LocationForm (ModelForm):
    class Meta:
        model = Location
        exclude = ('id', 'parentid','parenttype','guid', 'location_q', 'ownerid', 'lastupdatebyid', 'lastupdate', )


class PhotoForm (ModelForm):
    class Meta:
        model = WebLibPhoto
        fields = ('caption', 'daysafterevent', 'timeofdaystring', 'timeofdaycode', 'gpsdirection', 'orientationcode',  'photographername', 'photographerorganisation', 'photographerprofessioncode' , 'description_c', 'qualitycode', )


class PhotoPage (Pagebase):

    template_name = template_dir + "photopage.html"

    def dispatch (self, request, *args, **kwargs):

        if self.preProcessPage(request, **kwargs):

            ix = kwargs.get('ix')
            self.page_context['ix'] = ix

            # get photo record
            try:
                current_object = WebLibPhoto.objects.get(pk=ix)
            except:
                return self.showErrorPage(request, 'Error: photo with that id does not exist')

            cachedphotofilename = current_object._get_SIZE_url('photopage_large')

            photofilename = unicode(current_object.image_filename())
            page_title = current_object.caption

            locationid = current_object.parentid # get the location id
            location_record = Location.objects.get(pk=locationid) # get the location record
            locationForm = LocationForm(instance=location_record, prefix="locationform")  # create the ModelForm
            locationfieldstructure = self.createFormFieldStructure( locationForm, location_record ) # generate field structure to pass to generictablerenderer (createFormFieldStructure is in weblib baseclasses pagebase.py)

            page_subtitle = location_record.name
            studyid = location_record.parentid
            study_record = Study.objects.get(pk=studyid)

            copyrightmessage = ''
            if study_record.copyrightmessage is not None and study_record.copyrightmessage != '':
                copyrightmessage = study_record.copyrightmessage # use the study copyright mesage
            if current_object.copyright_c is not None and current_object.copyright_c != '':
                copyrightmessage = current_object.copyright_c # use the photo copyright mesage

            if page_title == '' or page_title is None:
                page_title = photofilename

            eventid = study_record.parentid_id
            event_record = Event.objects.get(pk=eventid)

            yearint = event_record.yearint
            if yearint < 1923:
                yearint += 100

            page_sub_subtitle = unicode(yearint) + ' ' + event_record.name + ' ' + event_record.country

            photoqueryset = []
            photoqueryset.append(current_object) # to make it iterable
            photoForm = PhotoForm (instance=current_object, prefix="photoform")
            photofields = self.createFormFieldStructure( photoForm, current_object )

            # using a class dictionary from Pagebase in weblib
            self.page_context['page_title'] = page_title
            self.page_context['page_subtitle'] = page_subtitle
            self.page_context['page_sub_subtitle'] = page_sub_subtitle
            self.page_context['pageclass'] = 'photopage'
            self.page_context['editlink'] = ('/' + modelname + '/' + str(ix)).lower()
            self.page_context['current_object'] = current_object
            self.page_context['this_page'] = request.path
            self.page_context['page_backlink'] = '<a href="/ecd/location/' + str(locationid) + '">&laquo; Back to location</a>'

            self.page_context['tablesetup1'] = photofields
            self.page_context['tablesetup3'] = locationfieldstructure

            self.page_context['photofilename'] = photofilename
            self.page_context['cachedphotofilename'] = cachedphotofilename
            self.page_context['copyrightmessage'] = copyrightmessage

            self.page_context['locationid'] = locationid
            self.page_context['photoid'] = current_object.id

            ###############
            # GET
            ###############

            if request.method == 'GET':
                self.page_context['locationform'] = locationForm
                self.page_context['photoform'] = photoForm
                return render(request, self.template_name, self.page_context)

            ###############
            # POST
            ###############

            if request.method == 'POST':
                #locationForm = LocationForm(request.POST, instance=location_record , prefix='locationform') # A form bound to the POST data, prefix allows multiple forms
                #surveyForm = SurveyForm ( request.POST, instance=survey_record , prefix='surveyform' )
                photoForm = PhotoForm ( request.POST, instance=current_object , prefix='photoform' )

                #locationFormvalid = locationForm.is_valid()
                #surveyFormValid = surveyForm.is_valid()
                photoFormValid = photoForm.is_valid()

                #if locationFormvalid and surveyFormValid : # All validation rules pass
                if photoFormValid:
                    #location_record.lastupdate = datetime.now()
                    #location_record.lastupdatebyid = request.user.id
                    #locationForm.save()

                    #survey_record.lastupdate = datetime.now()
                    #survey_record.lastupdatebyid = request.user.id
                    #surveyForm.save()

                    current_object.lastupdate = datetime.now()
                    current_object.lastupdatebyid = request.user.id
                    photoForm.save()

                    return HttpResponseRedirect('/ecd/photo/' + str(ix)) # Redirect after successful POST to the non editing version
                else:

                    self.page_context['locationform'] = locationForm
                    self.page_context['photoform'] = photoForm
                    return render(request, self.template_name, self.page_context)  # Error - return just the form when there is an error - the template must not try and render anything outside the form because the contact data is not present

