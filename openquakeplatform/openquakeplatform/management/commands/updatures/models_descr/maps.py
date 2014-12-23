from updatures.classes import backinheritance, model_refs, model_description, models_descr

# auth models
models_descr['maps.map'] = model_description(
    'maps.map',
    None,
    {},
#    {'pk': model_refs('base.resourcebase', False)},
    inher='base.resourcebase'
    )


models_descr['maps.maplayer'] = model_description(
    'maps.maplayer',
    None,
    {'map': model_refs('maps.map', False)}
    )
