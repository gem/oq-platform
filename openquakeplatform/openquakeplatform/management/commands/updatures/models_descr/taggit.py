from updatures.classes import BackInheritance, ModelRefs, model_description, models_descr

models_descr['taggit.tag'] = model_description(
    'taggit.tag',
    None,
    {}
    )

models_descr['taggit.taggeditem'] = model_description(
    'taggit.taggeditem',
    None,
    {'tag': ModelRefs('taggit.tag', False),
     'object_id': ModelRefs(
            lambda i: "%s.%s" % (i['fields']['content_type'][0], i['fields']['content_type'][1]),
            False),
     }
    )

