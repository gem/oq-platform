__author__ = 'Simon Ruffle, CAR'

from openquakeplatform.weblib.baseclasses.pagebase import Pagebase

appname = 'econd'  # must have INSTALLED_APPS defined in settings.py for this to work
modelname = 'InventoryClass'
formphotosize = 'admin_thumbnail'

editfields = {'include': None, 'exclude': ['ownerid', 'lastupdatebyid', 'lastupdate', 'mat_type_t', 'mat_tech_t', 'mas_mort_t', 'mas_rein_t', 'steel_conn_t', 'llrs_duct_t', 'llrs_t', ]}
displayfields = {'include': None, 'exclude': ['mat_type_t', 'mat_tech_t', 'mas_mort_t', 'mas_rein_t', 'steel_conn_t', 'llrs_duct_t', 'llrs_t', ]}

template_name = "inventoryclass/templates/inventoryclass.html"

class BasicPage (Pagebase):

    def dispatch(self, request, *args, **kwargs):
        self.preProcessPage(request, **kwargs)
        self.page_context['page_title'] = 'Add new inventory class'
        return self.processSimpleForm(request, appname, modelname, formphotosize, template_name, displayfields, editfields, {'errortemplate': 'errorpage.html', 'foreignkeylinkprefix': '/ecd'})




