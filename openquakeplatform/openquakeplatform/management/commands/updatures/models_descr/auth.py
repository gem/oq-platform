from updatures.classes import BackInheritance, ModelRefs, ModelDescription, models_descr

# auth models
models_descr['auth.permission'] = ModelDescription(
    'auth.permission',
    lambda i: [ i['fields']['codename'], i['fields']['content_type'][0], i['fields']['content_type'][1] ],
    {})

models_descr['auth.group'] = ModelDescription(
    'auth.group',
    lambda i: [ i['fields']['name'] ],
    {'permissions': ModelRefs('auth.permission', True)},
    fie_type={'permissions': ModelDescription.FIE_TY_UNION})

models_descr['auth.user'] = ModelDescription(
    'auth.user',
    lambda i: [ i['fields']['username'] ],
    {'user_permissions': ModelRefs('auth.permission', True),
     'groups':           ModelRefs('auth.group', True)},
    fie_type={'user_permissions': ModelDescription.FIE_TY_UNION,
              'groups': ModelDescription.FIE_TY_UNION,
              "date_joined": ModelDescription.FIE_TY_OLD,
              "email": ModelDescription.FIE_TY_OLD,
              "first_name": ModelDescription.FIE_TY_OLD,
              "is_active": ModelDescription.FIE_TY_OLD,
              "is_staff": ModelDescription.FIE_TY_OR,
              "is_superuser": ModelDescription.FIE_TY_OR,
              "last_login": ModelDescription.FIE_TY_OLD,
              "last_name": ModelDescription.FIE_TY_OLD,
              "password": ModelDescription.FIE_TY_OLD,
              })

models_descr['account.account'] = ModelDescription(
    'account.account',
    None,
    {'user':             ModelRefs('auth.user', False)})

# account models
models_descr['account.signupcode'] = ModelDescription(
    'account.signupcode',
    None,
    {'inviter':          ModelRefs('auth.user', False)})

models_descr['account.signupcodeextended'] = ModelDescription(
    'account.signupcodeextended',
    None,
    {'signupcode':       ModelRefs('account.signupcode', False)}) # signupcode is pk too, strange case

models_descr['account.signupcoderesult'] = ModelDescription(
    'account.signupcoderesult',
    None,
    {'signup_code':      ModelRefs('account.signupcode', False),
     'user':             ModelRefs('auth.user', False)})

models_descr['account.emailaddress'] = ModelDescription(
    'account.emailaddress',
    None,
    {'user':             ModelRefs('auth.user', False)})

models_descr['account.emailconfirmation'] = ModelDescription(
    'account.emailconfirmation',
    None,
    {'email_address':    ModelRefs('account.emailaddress', False)})

models_descr['account.accountdeletion'] = ModelDescription(
    'account.accountdeletion',
    None,
    {'user':             ModelRefs('auth.user', False)})

    # maps models
models_descr['maps.map'] = ModelDescription(
    'maps.map',
    None,
    {})

models_descr['maps.maplayer'] = ModelDescription(
    'maps.maplayer',
    None,
    {'map':              ModelRefs('maps.map', False)})
