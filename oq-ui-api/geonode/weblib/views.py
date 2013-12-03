__author__ = 'Simon Ruffle'

import os
from django.shortcuts import render
from django.db.models import get_model
from weblib.baseclasses.pagebase import Pagebase
from django.forms import ModelForm
from weblib.models import Document, DownloadLog
from django.http import HttpResponse
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from django.core.servers.basehttp import FileWrapper
import mimetypes
import urllib

class GetDocument (Pagebase):

    def logdownload (self, the_request, filesize, documentid, statusmessage):
        #log the download
        log_record = DownloadLog()
        log_record.entity = 'document'
        log_record.entityid = documentid

        if the_request.user.id is None: # not logged in
            userid = -1
        else:
            userid = the_request.user.id

        log_record.userid = userid
        log_record.timestamp = datetime.now()
        log_record.lastupdate = datetime.now()
        log_record.lastupdatebyid = userid
        log_record.ownerid = userid
        log_record.size = filesize
        log_record.statusmessage = statusmessage
        try:
            log_record.clientipv4 = str(the_request.META['REMOTE_ADDR'])
        except:
            pass
        log_record.save()

        return None

    def dispatch(self, request, *args, **kwargs):

        if self.preProcessPage(request, **kwargs):

            document = None

            try:
                document = Document.objects.get(pk=self.page_context['ix'])
                # document exists
            except ObjectDoesNotExist:
                # document does not exist
                if request.user.id is None:
                    # user is not logged in
                    return self.showErrorPage(request, 'You need to log in to see this document.')
                else:
                    # user is logged in - give them the honest answer
                    return self.showErrorPage(request, 'Error: document id ' + self.page_context['ix'] + ' does not exist')
            except:
                return self.showErrorPage(request, 'Error: invalid parameter supplied')

            authmessage = 'Public download'

            # security check
            if document.grouplist is not None:
                if len(document.grouplist) > 0:
                    if request.user.id is not None:
                        authorised=False
                        groupListArr = document.grouplist.split(',')
                        for group in groupListArr:
                            for usergroup in request.user.groups.all():
                                if group == unicode(usergroup):
                                    authorised = True
                                    authmessage = 'User authorised by membership of group ' + group

                        if not authorised:
                            self.logdownload(request, 0, document.id, 'Denied access, insufficient access rights')
                            return self.showErrorPage(request, 'You do not have sufficient access rights to see this document.')

                    else:
                        self.logdownload(request, 0, document.id, 'Denied access, not logged in')
                        return self.showErrorPage(request, 'You need to log in to see this document.')

            from django.conf import settings
            the_media_root = settings.MEDIA_ROOT
            try:
                the_media_root = settings.SECURE_MEDIA_ROOT # see if the secure media root is set, if so use it
            except:
                pass

            filename = the_media_root + '/' + str(document.url)
            try:
                # try to open the file from the url given in the documents table
                wrapper = FileWrapper(open(filename,"rb"))
            except:
                self.logdownload(request, 0, document.id, 'Failed: source file cannot be found on host filesystem')
                return self.showErrorPage(request, 'Error: source file cannot be found on host filesystem: ' + filename)

            response = HttpResponse(wrapper)

            response['Content-Length'] = os.path.getsize(filename)

            type, encoding = mimetypes.guess_type(filename)
            if type is None:
                type = 'application/octet-stream'
            response['Content-Type'] = type
            if encoding is not None:
                response['Content-Encoding'] = encoding

            response['Content-Disposition'] = 'attachment; filename="' + os.path.basename(filename) + '"'

            self.logdownload(request, os.path.getsize(filename), document.id, 'Successful download (' + authmessage + ')')

            return response