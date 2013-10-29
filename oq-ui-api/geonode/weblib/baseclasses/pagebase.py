__author__ = 'Simon Ruffle'

from django.views.generic import FormView
from django.http import HttpResponseRedirect
from django.shortcuts import render
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from django.forms import ModelForm
from django.db.models import get_model


class Pagebase(FormView):
    page_context = dict()

    def preProcessPage(self, request, **kwargs):
        # function that all pages must call
        self.page_context['newssearchterms'] = None
        self.page_context['editlink'] = ''
        self.page_context['viewlink'] = ''
        self.page_context['editmode'] = False
        self.page_context['addmode'] = False
        self.page_context['pageerrors'] = ''
        self.page_context['haspageerrors'] = False
        self.page_context['this_page'] = request.path
        self.page_context['form'] = None
        self.page_context['page_title'] = ''
        self.page_context['page_subtitle'] = ''
        self.page_context['righttext'] = ''
        self.page_context['containerclass'] = ''
        self.page_context['browser'] = ''

        #unpack parameters of the page
        self.page_context['ix'] = kwargs.get('ix')

        # edit and add mode - only available to authenticated staff & superusers
        if (request.user.is_staff or request.user.is_superuser) and request.user.is_active:
            #  note /edit/ must have trailing slash (dont know why)
            try:
                editmode = (kwargs.get('editmode') == 'edit')
            except:
                editmode = False;
            self.page_context['editmode'] = editmode

            try:
                addmode = (kwargs.get('ix') == 'add')
            except:
                addmode = False;
            self.page_context['addmode'] = addmode

        user_agent = request.META['HTTP_USER_AGENT']
        if "MSIE" in user_agent:
            self.page_context['browser'] = 'MSIE'

        return True # always returns true, and return result can be ignored. This is only here for legacy code that still expects a boolean.


    def showErrorPage(self, request, message, errorTemplate=''):
        # Create an error page, based on the base template
        # sample usage:
        # except ObjectDoesNotExist:
            # return self.showErrorPage(request, 'Error: Record ' + str(self.page_context['ix']) + ' does not exist')

        self.page_context['pageerrors'] = message
        self.page_context['haspageerrors'] = True

        if len(errorTemplate) == 0:
            errorTemplate = 'base.html'

        #return HttpResponse
        return render(request, errorTemplate, self.page_context)


    # return a structure for a single record that can be passed to generictablerenderer template tag
    def createFormFieldStructure (self, theModelForm, theRecord, params={}):
        #foreignkeylinkprefix = ''
        #if 'foreignkeylinkprefix' in params:
        #    foreignkeylinkprefix = params['foreignkeylinkprefix']
        queryset = []  # create the queryset to pass to generictablerenderer
        queryset.append(theRecord) # to make it iterable by generictablerenderer
        fieldlist = []  # create the fieldlist to pass to generictablerenderer
        for boundField in theModelForm.visible_fields():
            thetype = queryset[0]._meta.get_field(boundField.name).get_internal_type()
            fieldlist.append([{boundField.name:  { 'title': boundField.label, 'type': thetype, 'description': boundField.help_text }}])
        fieldstructure = {'entity': queryset, 'targeturl': '', 'fields': fieldlist, 'params': params}
        return fieldstructure


    # return a structure for a queryset that can be passed to generictablerenderer template tag
    def createListFieldStructure(self, theModelForm, theQuerySet, targeturl, params={}):
        #foreignkeylinkprefix = ''
        #if 'foreignkeylinkprefix' in params:
        #    foreignkeylinkprefix = params['foreignkeylinkprefix']
        #linksuffix = ''
        #if 'linksuffix' in params:
        #    linksuffix = params['linksuffix']
        fieldlist = []  # create the fieldlist to pass to generictablerenderer
        for boundField in theModelForm.visible_fields():
            thetype = theQuerySet.model._meta.get_field(boundField.name).get_internal_type()
            fieldlist.append([{boundField.name:  {'title': boundField.label, 'type': thetype, 'description': boundField.help_text}}])
        fieldstructure = {'entity': theQuerySet, 'targeturl': targeturl, 'fields': fieldlist, 'params': params}
        return fieldstructure

        # example of a manually created field list,
        #        fieldlist=\
        #            [
        #                [{'name' :  { 'title' : 'Location name', 'type' : 'text', }}],
        #                [{'address' :  { 'title' : 'Address or location', 'type' : 'text', }}],
        #                [{'boundaryid' :  { 'title' : 'User defined boundary or administrative area name', 'type' : 'number', }}],
        #                [{'location' :  { 'title' : 'Geometry (long/lat)', 'type' : 'text', 'description' : 'The location or boundary in WKT GIS format eg POINT (long lat).', }}],
        #                [{'boundary_c' :  { 'title' : 'Location precision notes', 'type' : 'text',  'description' : 'A comment on the precision of the location or boundary', }}],
        #                [{'originalsurveyreference' :  { 'title' : 'Original survey reference', 'type' : 'text', }}],
        #                [{'isaggregated' :  { 'title' : 'Is the data aggregated', 'type' : 'text', 'description' : 'This field determines if this location is an aggregation of assets (yes - default) or a single asset (no)', }}],
        #                [{'intensityzonecode' :  { 'title' : 'USGS Intensity zone', 'type' : 'text', 'description' : 'Optional. Only use this if the location is an intensity zone: The intensity zone on a standard scale.',}}],
        #                [{'soilclasscode' :  { 'title' : 'Soil class', 'type' : 'text', 'description' : 'Optional. NEHRP Soil Class.', }}],
        #                [{'generalsoilconditions_c' :  { 'title' : 'General soil conditions', 'type' : 'text', }}],
        #                [{'location_c' :  { 'title' : 'Location: comment', 'type' : 'text', 'description' : 'An optional comment on the location and loss at the location', }}],
        #            ]

    def processSimpleForm(self, request, appname, modelname, formphotosize, template_name, displayfields, editfields, params = {}):

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

        errortemplate = ''
        if 'errortemplate' in params:
            errortemplate = params['errortemplate']
        foreignkeylinkprefix = ''
        if 'foreignkeylinkprefix' in params:
            foreignkeylinkprefix = params['foreignkeylinkprefix']

        current_object = None

        if not self.page_context['addmode']:  # we are reading an existing record
            try:
                current_object = get_model(appname, modelname).objects.get(pk=self.page_context['ix'])
            except ObjectDoesNotExist:
                return self.showErrorPage(request, 'Error: ' + modelname + ' ' + str(self.page_context['ix']) + ' does not exist', errortemplate)
            except:
                return self.showErrorPage(request, 'Error: invalid parameter supplied', errortemplate)

            self.page_context['current_object'] = current_object
            if hasattr(current_object,'name'):
                self.page_context['page_title'] = current_object.name
            if hasattr(current_object,'subtitle'):
                self.page_context['page_subtitle'] = current_object.subtitle
            if hasattr(current_object,'righttext'):
                self.page_context['righttext'] = current_object.righttext

            # display
            pageFormDisplay = PageFormDisplay (instance=current_object)
            pagefields = self.createFormFieldStructure( pageFormDisplay, current_object, params)

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
        self.page_context['editlink'] = (foreignkeylinkprefix + '/' + modelname + '/' + str(self.page_context['ix'])).lower()


        ###############
        # POST
        ###############
        if request.method == 'POST':

            if self.page_context['addmode']:
                # new record, create at first with default values
                current_model = get_model(appname, modelname)
                current_object = current_model()
                current_object.name = 'untitled'
                current_object.lastupdate = datetime.now()
                current_object.lastupdatebyid = request.user.id
                current_object.ownerid = request.user.id
                self.page_context['editmode'] = True  # in case it turns out there is an error in input

            # Create a form bound to the POST data, prefix allows multiple forms
            pageFormEdit = PageFormEdit(request.POST, instance=current_object , prefix='mainpageform')
            if pageFormEdit.is_valid():
                # All validation rules pass
                self.page_context['editmode'] = False  # no errors

                if self.page_context['addmode']:
                    # if in add mode, now create the actual record in the database
                    current_object.save()

                    # now we know the new record's id
                    self.page_context['ix'] = current_object.id
                    self.page_context['current_object'] = current_object

                current_object.lastupdate = datetime.now()
                current_object.lastupdatebyid = request.user.id

                # save the user input from the form to the record
                pageFormEdit.save()

                # Redirect after successful POST to the display version of the page
                return HttpResponseRedirect((foreignkeylinkprefix + '/' + modelname + '/' + str(self.page_context['ix'])).lower())
            else:
                # Validation Error - return just the form when there is an error -
                # the template must not try and render anything outside the form
                # because the context data is not present
                self.page_context['form'] = pageFormEdit
                return render(request, template_name, self.page_context)


        ###############
        # GET
        ###############
        if request.method == 'GET':

            # edit mode
            if self.page_context['addmode']:
                # new record - initialise a dummy record (that we dont save into the database)
                # with the defaults to see on the new form
                current_model = get_model(appname, modelname)
                current_object = current_model()
                current_object.name = 'untitled'
                self.page_context['editmode'] = True

            if self.page_context['editmode']:  # edit or add mode
                # Create the form for either the new dummy record or an existing one; prefix allows multiple forms
                pageFormEdit = PageFormEdit (instance=current_object, prefix="mainpageform")
                self.page_context['form'] = pageFormEdit

            return render(request, template_name, self.page_context)