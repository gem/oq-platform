from updatures.classes import backinheritance, model_refs, model_description, models_descr

models_descr['taggit.tag'] = model_description(
    'taggit.tag',
    None,
    {}
    )

models_descr['taggit.taggeditem'] = model_description(
    'taggit.taggeditem',
    None,
    {'tag': model_refs('taggit.tag', False),
     'object_id': model_refs(
            lambda i: "%s.%s" % (i['fields']['content_type'][0], i['fields']['content_type'][1]),
            False),
     }
    )

