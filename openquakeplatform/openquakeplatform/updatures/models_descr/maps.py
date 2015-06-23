from updatures.classes import BackInheritance, ModelRefs, ModelDescription, models_descr

# auth models
models_descr['maps.map'] = ModelDescription(
    'maps.map',
    None,
    {},
#    {'pk': ModelRefs('base.resourcebase', False)},
    inher='base.resourcebase'
    )


models_descr['maps.maplayer'] = ModelDescription(
    'maps.maplayer',
    None,
    {'map': ModelRefs('maps.map', False)}
    )
