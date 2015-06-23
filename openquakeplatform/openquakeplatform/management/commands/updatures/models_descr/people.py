from updatures.classes import BackInheritance, ModelRefs, model_description, models_descr

models_descr['people.role'] = model_description(
    'people.role',
    None,
    {'permissions': ModelRefs('auth.permission', True)}
    )

models_descr['people.profile'] = model_description(
    'people.profile',
    None,
    {'user': ModelRefs('auth.user', True)}
    )


