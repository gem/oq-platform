__author__ = 'Simon Ruffle, CAR'

from openquakeplatform.weblib.baseclasses.pagebase import Pagebase

template_name = 'home/templates/home.html'
appname = 'weblib'
modelname = 'Page'
formphotosize = 'admin_thumbnail'

# usage examples
#editfields = {'include': ('name', 'guid', 'activity', 'organisation', 'place', 'country',  ), 'exclude': None}
#displayfields = {'include': ('name', 'guid', 'activity', 'organisation', 'place', 'country',  ), 'exclude': None}
#
#editfields = {'include': None, 'exclude': None}
#displayfields = {'include': None, 'exclude': None}

editfields = {'include': ('name', 'subtitle', 'introtext', 'image1', 'maintext', ), 'exclude': None}
displayfields = {'include': ( 'introtext', 'image1', 'maintext', ), 'exclude': None}

class HomePage (Pagebase):

    def dispatch(self, request, *args, **kwargs):

        self.preProcessPage(request, **kwargs)
        self.page_context['ix'] = '5' # pass in the ix parameter which is 5 for the home page
        return self.processSimpleForm(request, appname, modelname, formphotosize, template_name, displayfields, editfields)
