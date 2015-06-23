from updatures.classes import BackInheritance, model_refs, model_description, models_descr

# auth models
models_descr['auth.permission'] = model_description(
    'auth.permission',
    lambda i: [ i['fields']['codename'], i['fields']['content_type'][0], i['fields']['content_type'][1] ],
    {})

models_descr['auth.group'] = model_description(
    'auth.group',
    lambda i: [ i['fields']['name'] ],
    {'permissions': model_refs('auth.permission', True)},
    fie_type={'permissions': model_description.FIE_TY_UNION})

models_descr['auth.user'] = model_description(
    'auth.user',
    lambda i: [ i['fields']['username'] ],
    {'user_permissions': model_refs('auth.permission', True),
     'groups':           model_refs('auth.group', True)},
    fie_type={'user_permissions': model_description.FIE_TY_UNION,
              'groups': model_description.FIE_TY_UNION,
              "date_joined": model_description.FIE_TY_OLD,
              "email": model_description.FIE_TY_OLD,
              "first_name": model_description.FIE_TY_OLD,
              "is_active": model_description.FIE_TY_OLD,
              "is_staff": model_description.FIE_TY_OR,
              "is_superuser": model_description.FIE_TY_OR,
              "last_login": model_description.FIE_TY_OLD,
              "last_name": model_description.FIE_TY_OLD,
              "password": model_description.FIE_TY_OLD,
              })

models_descr['account.account'] = model_description(
    'account.account',
    None,
    {'user':             model_refs('auth.user', False)})

# account models
models_descr['account.signupcode'] = model_description(
    'account.signupcode',
    None,
    {'inviter':          model_refs('auth.user', False)})

models_descr['account.signupcodeextended'] = model_description(
    'account.signupcodeextended',
    None,
    {'signupcode':       model_refs('account.signupcode', False)}) # signupcode is pk too, strange case

models_descr['account.signupcoderesult'] = model_description(
    'account.signupcoderesult',
    None,
    {'signup_code':      model_refs('account.signupcode', False),
     'user':             model_refs('auth.user', False)})

models_descr['account.emailaddress'] = model_description(
    'account.emailaddress',
    None,
    {'user':             model_refs('auth.user', False)})

models_descr['account.emailconfirmation'] = model_description(
    'account.emailconfirmation',
    None,
    {'email_address':    model_refs('account.emailaddress', False)})

models_descr['account.accountdeletion'] = model_description(
    'account.accountdeletion',
    None,
    {'user':             model_refs('auth.user', False)})

    # maps models
models_descr['maps.map'] = model_description(
    'maps.map',
    None,
    {})

models_descr['maps.maplayer'] = model_description(
    'maps.maplayer',
    None,
    {'map':              model_refs('maps.map', False)})
