from updatures.classes import backinheritance, model_refs, model_description, models_descr

# auth models
models_descr['security.objectrole'] = model_description(
    'security.objectrole',
    lambda i: [ i['fields']['codename'], i['fields']['content_type'][0], i['fields']['content_type'][1] ],
    {'permissions': model_refs('auth.permission', True),
     'content_type': model_refs('contenttypes.contenttype', False)}
    )


models_descr['security.userobjectrolemapping'] = model_description(
    'security.userobjectrolemapping',
    None,

    { 'user': model_refs('auth.user', False),
      'object_ct': model_refs('contenttypes.contenttype', False),
#      'object': model_refs(lambda i: "%s.%s" % (i['fields']['object_ct'], i['fields']['object_id']), False),
      'role': model_refs('security.objectrole', False) }
    )


models_descr['security.genericobjectrolemapping'] = model_description(
    'security.genericobjectrolemapping',
    None,
    { 'object_ct': model_refs('contenttypes.contenttype', False),
#      'object': model_refs(lambda i: "%s.%s" % (i['fields']['object_ct'], i['fields']['object_id']), False),
      'role': model_refs('security.objectrole', False) }
    )
