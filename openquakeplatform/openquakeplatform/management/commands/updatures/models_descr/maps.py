from updatures.classes import BackInheritance, ModelRefs, model_description, models_descr

# auth models
models_descr['maps.map'] = model_description(
    'maps.map',
    None,
    {},
#    {'pk': ModelRefs('base.resourcebase', False)},
    inher='base.resourcebase'
    )


models_descr['maps.maplayer'] = model_description(
    'maps.maplayer',
    None,
    {'map': ModelRefs('maps.map', False)}
    )
