__author__ = 'Simon Ruffle, CAR'

from openquakeplatform.weblib.baseclasses.pagebase import Pagebase
from openquakeplatform.econd.models import Inventoryclass

import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)

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

        # Create taxonomy string
        try:
            inventoryClass = Inventoryclass.objects.get(pk=self.page_context['ix'])
        except Exception as exc:
            logger.log(exc, exc_info=True)
            return self.showErrorPage(request, 'Cannot find inventory class' )
        
        # STRUCTURAL SYSTEM GROUP
        
        structsys = '' 
        
        if inventoryClass.mat_type_l_id != '0':
            structsys += inventoryClass.mat_type_l_id
        
        if inventoryClass.mas_rein_l_id != '0':
            structsys += '+' + inventoryClass.mas_rein_l_id

        if inventoryClass.mat_tech_l_id != '0':
            structsys += '+' + inventoryClass.mat_tech_l_id
 
        if inventoryClass.mas_mort_l_id != '0':
            structsys += '+' + inventoryClass.mas_mort_l_id
  			
        if inventoryClass.steel_conn_l_id != '0':
            structsys += '+' + inventoryClass.steel_conn_l_id
 			
        if inventoryClass.llrs_l_id != '0':
            structsys += '/' + inventoryClass.llrs_l_id

        if inventoryClass.llrs_duct_l_id != '0':
            structsys += '+' + inventoryClass.llrs_duct_l_id

                            
        structsys = 'DX/' + structsys + '/DY/' + structsys;
        
        # HEIGHT
        
        height = ''
        if inventoryClass.story_ag_q_id != '0':
            height += inventoryClass.story_ag_q_id + ':'
            
        if inventoryClass.story_ag_1 is not None:
            height += str(inventoryClass.story_ag_1)

        if inventoryClass.story_ag_2 is not None:
            height += ',' + str(inventoryClass.story_ag_2)

        
        # DATE
        
        date = '';
        if inventoryClass.yr_built_q_id != '0':
            date +=  inventoryClass.yr_built_q_id + ':'

        if inventoryClass.yr_built_1 is not None:
            date +=  str(inventoryClass.yr_built_1)

        if inventoryClass.yr_built_2 is not None:
            date +=  ',' + str(inventoryClass.yr_built_2)
        
        
        # OCCUPANCY
        occupancy='';
        if inventoryClass.occupcy_id != '0':
            occupancy +=  inventoryClass.occupcy_id

        if inventoryClass.occpcy_dt_id != '0':
            occupancy +=   '+' + inventoryClass.occpcy_dt_id

        
        # ROOF
        roof='';
        if inventoryClass.roofsysmat_id != '0':
            roof +=  inventoryClass.roofsysmat_id

        if inventoryClass.roofsystyp_id != '0':
            roof +=   '+' + inventoryClass.roofsystyp_id

        
        # FLOOR
        floor='';
        if inventoryClass.floor_mat_id != '0':
            floor += inventoryClass.floor_mat_id

        if inventoryClass.floor_type_id != '0':
            floor += '+' + inventoryClass.floor_type_id

        
        
        # IRREGULARITY
        irregularity = ''
        if inventoryClass.str_irreg_id != '0':
            irregularity += inventoryClass.str_irreg_id

        if inventoryClass.str_hzir_p_id != '0':
            irregularity += '+IRPP:' + inventoryClass.str_hzir_p_id

        if inventoryClass.str_veir_p_id != '0':
            irregularity += '+IRVP:' + inventoryClass.str_veir_p_id

        taxonomy_string = structsys + '/' + height + '/' + date + '/' + occupancy + '/' + roof + '/' + floor + '/' + irregularity

        self.page_context['page_subtitle'] = taxonomy_string
        return self.processSimpleForm(request, appname, modelname, formphotosize, template_name, displayfields, editfields, {'errortemplate': 'errorpage.html', 'foreignkeylinkprefix': '/ecd'})




