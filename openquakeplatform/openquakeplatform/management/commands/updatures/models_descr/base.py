from updatures.classes import BackInheritance, model_refs, model_description, models_descr

# base models
models_descr['base.contactrole'] = model_description(
    'base.contactrole',
    None,
    {'resource': model_refs('base.resourcebase', False),
     'contact':  model_refs('people.profile', False),
     'role': model_refs('people.role', False)}
    )

models_descr['base.link'] = model_description(
    'base.link',
    None,
    {'resource': model_refs('base.resourcebase', False)}
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
    {'owner': model_refs('auth.user', False),
#     'contacts': model_refs('base.contactrole', True),
     'regions': model_refs('base.region', True),
     'restriction_code_type': model_refs('base.restrictioncodetype', False),
     'license': model_refs('base.license', False),
     'category': model_refs('base.topiccategory', False),
     'thumbnail': model_refs('base.thumbnail', False)}
    )
