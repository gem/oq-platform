from updatures.classes import BackInheritance, ModelRefs, model_description, models_descr

# base models
models_descr['base.contactrole'] = model_description(
    'base.contactrole',
    None,
    {'resource': ModelRefs('base.resourcebase', False),
     'contact':  ModelRefs('people.profile', False),
     'role': ModelRefs('people.role', False)}
    )

models_descr['base.link'] = model_description(
    'base.link',
    None,
    {'resource': ModelRefs('base.resourcebase', False)}
    )

models_descr['base.region'] = model_description(
    'base.region',
    None, {})

models_descr['base.restrictioncodetype'] = model_description(
    'base.restrictioncodetype',
    None, {})
      
models_descr['base.spatialrepresentationtype'] = model_description(
    'base.spatialrepresentationtype',
    None, {})

models_descr['base.thumbnail'] = model_description(
    'base.thumbnail',
    None, {})

models_descr['base.topiccategory'] = model_description(
    'base.topiccategory',
    None, {})

models_descr['base.license'] = model_description(
    'base.license',
    None, {})

models_descr['base.resourcebase'] = model_description(
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
