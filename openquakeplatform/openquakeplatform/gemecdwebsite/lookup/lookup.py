__author__ = 'Matteo Nastasi, GEM'

from openquakeplatform.weblib.baseclasses.pagebase import Pagebase
import openquakeplatform.econd.models
import openquakeplatform.econd.static_lookup_models
import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)

appname = 'econd'  # must have INSTALLED_APPS defined in settings.py for this to work
formphotosize = 'admin_thumbnail'

editfields = {'include': None, 'exclude': None }
displayfields = {'include': None, 'exclude': None}

template_name = "lookup/templates/lookup.html"


class BasicPage (Pagebase):

    def dispatch(self, request, *args, **kwargs):
        self.preProcessPage(request, **kwargs)
        name_capit = kwargs['name'].capitalize()
        self.page_context['page_title'] = name_capit + ' class item description'

        # modelname = 'InventoryClass'
        modelname = str(name_capit)
        self.preProcessPage(request, **kwargs)
        self.page_context['page_title'] = name_capit + ' class item description'

        currClassModel = getattr(openquakeplatform.econd.static_lookup_models, name_capit, None)
        if currClassModel == None:
            currClassModel = getattr(openquakeplatform.econd.models, name_capit, None)
	
        try:
            currClass = currClassModel.objects.get(pk=kwargs['ix'])
        except Exception as exc:
            return self.showErrorPage(request, ('Cannot find Lookup%s class' %  name_capit)  )
        
        return self.processSimpleForm(request, appname, modelname, formphotosize, template_name, displayfields, editfields, {'errortemplate': 'errorpage.html', 'foreignkeylinkprefix': '/ecd'})

