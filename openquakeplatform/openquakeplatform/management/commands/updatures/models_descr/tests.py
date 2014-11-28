from updatures.classes import backinheritance, model_refs, model_description, models_descr
 
# test models
models_descr['test.one2one'] = model_description(
    'test.one2one',
    None,
    {'leaf': model_refs('test.leaf', False)})

models_descr['test.one2many'] = model_description(
    'test.one2many',
    None,
    {'leafs': model_refs('test.leaf', True)})

models_descr['test.leaf'] = model_description(
    'test.leaf',
    None,
    {})

# test2
models_descr['test2.generic'] = model_description(
    'test2.generic',
    None,
    {})

models_descr['test2.specific'] = model_description(
    'test2.specific',
    None,
    {'pk': model_refs('test2.generic', False)},
    inher='test2.generic')

