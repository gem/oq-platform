from updatures.classes import BackInheritance, ModelRefs, ModelDescription, models_descr

# auth models
models_descr['security.objectrole'] = ModelDescription(
    'security.objectrole',
    lambda i: [ i['fields']['codename'], i['fields']['content_type'][0], i['fields']['content_type'][1] ],
    {'permissions': ModelRefs('auth.permission', True),
     'content_type': ModelRefs('contenttypes.contenttype', False)}
    )


models_descr['security.userobjectrolemapping'] = ModelDescription(
    'security.userobjectrolemapping',
    None,

    { 'user': ModelRefs('auth.user', False),
      'object_ct': ModelRefs('contenttypes.contenttype', False),
#      'object': ModelRefs(lambda i: "%s.%s" % (i['fields']['object_ct'], i['fields']['object_id']), False),
      'role': ModelRefs('security.objectrole', False) }
    )


models_descr['security.genericobjectrolemapping'] = ModelDescription(
    'security.genericobjectrolemapping',
    None,
    { 'object_ct': ModelRefs('contenttypes.contenttype', False),
#      'object': ModelRefs(lambda i: "%s.%s" % (i['fields']['object_ct'], i['fields']['object_id']), False),
      'role': ModelRefs('security.objectrole', False) }
    )
