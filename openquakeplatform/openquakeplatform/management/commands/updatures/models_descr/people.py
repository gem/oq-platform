from updatures.classes import BackInheritance, model_refs, model_description, models_descr

models_descr['people.role'] = model_description(
    'people.role',
    None,
    {'permissions': model_refs('auth.permission', True)}
    )

models_descr['people.profile'] = model_description(
    'people.profile',
    None,
    {'user': model_refs('auth.user', True)}
    )


