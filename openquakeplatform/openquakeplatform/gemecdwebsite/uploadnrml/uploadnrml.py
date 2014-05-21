__author__ = 'Simon Ruffle, CAR'

from openquakeplatform.weblib.baseclasses.pagebase import Pagebase
from django import forms
from django.forms.widgets import CheckboxSelectMultiple
from django.http import HttpResponseRedirect
from django.shortcuts import render
from openquakeplatform.econd.nrmlimport import NRMLImporter

template_name = "uploadnrml/templates/uploadnrml.html"

class UploadNRML (Pagebase):

    class UploadForm(forms.Form):
        nrmlfile = forms.FileField(label='Upload XML file', required=True)

    def dispatch(self, request, *args, **kwargs):
        self.preProcessPage(request, **kwargs)
        self.page_context['page_title'] = 'Upload XML data file'

        ###############
        # GET
        ###############
        if request.method == 'GET':

            uploadform = self.UploadForm
            self.page_context['uploadform'] = uploadform(prefix="uploadform", label_suffix='')

            self.page_context['editmode'] = True
            self.page_context['status_message'] = ''

            return render(request, template_name, self.page_context)

        ###############
        # POST
        ###############

        if request.method == 'POST':

            self.page_context['status_message'] = 'Upload failed'
            self.page_context['editmode'] = False

            # note as we upload a file here, we need enctype="multipart/form-data" in the <form> tag and to add request.FILES, to the call below
            uploadform = self.UploadForm(request.POST, request.FILES, prefix="uploadform",)

            if uploadform.is_valid():
                the_file = request.FILES['uploadform-nrmlfile']
                importer = NRMLImporter()
                importer.savetodisc(the_file.read(), the_file.name)
                if importer.importfile(the_file.name):
                    self.page_context['status_message'] = 'Upload successful, ' + the_file.name + ' uploaded, ' + str(the_file.size) + ' bytes'
                else:
                    self.page_context['status_message'] = 'Upload failed: ' + importer.getabortmessage()
            else:
                self.page_context['editmode'] = True
                self.page_context['uploadform'] = uploadform
                self.page_context['status_message'] = unicode(uploadform.errors)

            return render(request, template_name, self.page_context)

