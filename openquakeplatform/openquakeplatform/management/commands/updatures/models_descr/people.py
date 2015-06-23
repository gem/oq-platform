from updatures.classes import BackInheritance, ModelRefs, ModelDescription, models_descr

models_descr['people.role'] = ModelDescription(
    'people.role',
    None,
    {'permissions': ModelRefs('auth.permission', True)}
    )

models_descr['people.profile'] = ModelDescription(
    'people.profile',
    None,
    {'user': ModelRefs('auth.user', True)}
    )


