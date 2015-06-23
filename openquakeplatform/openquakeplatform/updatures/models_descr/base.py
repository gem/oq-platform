from updatures.classes import BackInheritance, ModelRefs, ModelDescription, models_descr

# base models
models_descr['base.contactrole'] = ModelDescription(
    'base.contactrole',
    None,
    {'resource': ModelRefs('base.resourcebase', False),
     'contact':  ModelRefs('people.profile', False),
     'role': ModelRefs('people.role', False)}
    )

models_descr['base.link'] = ModelDescription(
    'base.link',
    None,
    {'resource': ModelRefs('base.resourcebase', False)}
    )

models_descr['base.region'] = ModelDescription(
    'base.region',
    None, {})

models_descr['base.restrictioncodetype'] = ModelDescription(
    'base.restrictioncodetype',
    None, {})
      
models_descr['base.spatialrepresentationtype'] = ModelDescription(
    'base.spatialrepresentationtype',
    None, {})

models_descr['base.thumbnail'] = ModelDescription(
    'base.thumbnail',
    None, {})

models_descr['base.topiccategory'] = ModelDescription(
    'base.topiccategory',
    None, {})

models_descr['base.license'] = ModelDescription(
    'base.license',
    None, {})

models_descr['base.resourcebase'] = ModelDescription(
    'base.resourcebase',
    None,
    {'owner': ModelRefs('auth.user', False),
#     'contacts': ModelRefs('base.contactrole', True),
     'regions': ModelRefs('base.region', True),
     'restriction_code_type': ModelRefs('base.restrictioncodetype', False),
     'license': ModelRefs('base.license', False),
     'category': ModelRefs('base.topiccategory', False),
     'thumbnail': ModelRefs('base.thumbnail', False)}
    )
