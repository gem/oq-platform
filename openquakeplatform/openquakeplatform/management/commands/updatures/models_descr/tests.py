from updatures.classes import BackInheritance, ModelRefs, ModelDescription, models_descr
 
# test models
models_descr['test.one2one'] = ModelDescription(
    'test.one2one',
    None,
    {'leaf': ModelRefs('test.leaf', False)})

models_descr['test.one2many'] = ModelDescription(
    'test.one2many',
    None,
    {'leafs': ModelRefs('test.leaf', True)})

models_descr['test.leaf'] = ModelDescription(
    'test.leaf',
    None,
    {})

# test2
models_descr['test2.specific'] = ModelDescription(
    'test2.specific',
    None,
    {'pk': ModelRefs('test2.generic', False)},
    inher='test2.generic')

models_descr['test2.generic'] = ModelDescription(
    'test2.generic',
    None,
    {})

models_descr['test3.strategies'] = ModelDescription(
    'test3.strategies',
    None,
    {},
    fie_type={'fie_old': ModelDescription.FIE_TY_OLD,
              'fie_new': ModelDescription.FIE_TY_NEW,
              'fie_union': ModelDescription.FIE_TY_UNION,
              'fie_ident': ModelDescription.FIE_TY_IDENT,
              'fie_or': ModelDescription.FIE_TY_OR,
              'fie_and': ModelDescription.FIE_TY_AND}
    )
