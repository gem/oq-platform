__author__ = 'Simon Ruffle, CAR'

from weblib.baseclasses.pagebase import Pagebase

appname = 'econd'  # must have INSTALLED_APPS defined in settings.py for this to work
modelname = 'InventoryClass'
formphotosize = 'admin_thumbnail'

editfields = {'include': None, 'exclude': ['ownerid', 'lastupdatebyid', 'lastupdate', ]}
displayfields = {'include': None, 'exclude': None}

template_name = "inventoryclass/templates/inventoryclass.html"

class BasicPage (Pagebase):

    def dispatch(self, request, *args, **kwargs):
        self.preProcessPage(request, **kwargs)
        self.page_context['page_title'] = 'Add new inventory class'
        return self.processSimpleForm(request, appname, modelname, formphotosize, template_name, displayfields, editfields, {'errortemplate': 'errorpage.html', 'foreignkeylinkprefix': '/ecd'})




