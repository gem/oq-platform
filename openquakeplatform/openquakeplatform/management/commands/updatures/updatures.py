#!/usr/bin/env python

import json
import os
import sys
import copy
from pprint import pprint
from collections import OrderedDict
from django.core.management import call_command, execute_manager

import pdb

updatures_debug_level = 0

def pdebug(level, s):
    if updatures_debug_level < level:
        return
    print s

class backinheritance(object):
    '''
        model_descr: model description instance of the specialized instance
        item:        item istance of the specialized instance
    '''
    def __init__(self, model_descr, field):
        self.model_descr = model_descr
        self.field = field


class model_refs(object):
    '''
        model:   model name of referenced item (string)
        is_many: if single or multiple fk (bool)
    '''
    def __init__(self, model, is_many):
        self.model =   model
        self.is_many = is_many


class model_description(object):
    '''
    inheritance management:

      - first step during the loading phase:
          . for each inheriting model record must exists the inherited record
          . assigning a '__backinhe__' field that link { 'model', 'item' }
          . set the model_description as 'is_inherited'

      - second step: filtering not inherited instances
          . if an inherited model instance havn't '__backinhe__' field: remove it


      - third step in check integrity key phase:
          . for each inherited model, extend the comparison and the pk substitution
            and skip models inheriting another

      name - name of the class
      natural - function to extract natural key used
      refs  - dict of fk to other models (model_refs class as values)
      group - reference to another model that is "header" of multiple objects group
      pk_natural - True if pk is not a self-assigned incremental integer
      inher - None or the inherited model

    '''
    def __init__(self, name, natural, refs, group=None, pk_natural=False, inher=None):
        self.name = name
        self.natural = natural
        self.refs = refs
        self.group = group
        self.pk_natural = pk_natural
        self.inher = inher
        self.is_inherited = False # set by inheriting_set function

models_descr = OrderedDict()

# auth models
models_descr['auth.permission'] = model_description(
    'auth.permission',
    lambda i: [ i['fields']['codename'], i['fields']['content_type'][0], i['fields']['content_type'][1] ],
    {})

models_descr['auth.group'] = model_description(
    'auth.group',
    lambda i: [ i['fields']['name'] ],
    {'permissions': model_refs('auth.permission', True)})

models_descr['auth.user'] = model_description(
    'auth.user',
    lambda i: [ i['fields']['username'] ],
    {'user_permissions': model_refs('auth.permission', True),
     'groups':           model_refs('auth.group', True)})

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

# maps models
models_descr['maps.map'] = model_description(
    'maps.map',
    None,
    {})

models_descr['maps.maplayer'] = model_description(
    'maps.maplayer',
    None,
    {'map':              model_refs('maps.map', False)})

# vulnerability models
models_descr['vulnerability.qrsempirical'] = model_description(
    'vulnerability.qrsempirical',
    None,
    {'owner': model_refs('auth.user', False),
     'fragility_func': model_refs('vulnerability.fragilityfunc', False),
     'vulnerability_func': model_refs('vulnerability.vulnerabilityfunc', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.qrsanalytical'] = model_description(
    'vulnerability.qrsanalytical',
    None,
    {'owner': model_refs('auth.user', False),
     'fragility_func':     model_refs('vulnerability.fragilityfunc', False),
     'vulnerability_func': model_refs('vulnerability.vulnerabilityfunc', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.statmodel'] = model_description(
    'vulnerability.statmodel',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.statmodelfittingmethod'] = model_description(
    'vulnerability.statmodelfittingmethod',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.modelfittingmethodassumption'] = model_description(
    'vulnerability.modelfittingmethodassumption',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.fitassessmentgoodness'] = model_description(
    'vulnerability.fitassessmentgoodness',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.procconstrint'] = model_description(
    'vulnerability.procconstrint',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.statisticalinformation'] = model_description(
    'vulnerability.statisticalinformation',
    None,
    {'owner': model_refs('auth.user', False),
     'fragility_func':              model_refs('vulnerability.fragilityfunc', False),
     'vulnerability_func':          model_refs('vulnerability.vulnerabilityfunc', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.empiricalmodelinfo'] = model_description(
    'vulnerability.empiricalmodelinfo',
    None,
    {'owner': model_refs('auth.user', False),
     'fragility_func':     model_refs('vulnerability.fragilityfunc', False),
     'vulnerability_func': model_refs('vulnerability.vulnerabilityfunc', False),},
    group="vulnerability.generalinformation")

models_descr['vulnerability.analysistype'] = model_description(
    'vulnerability.analysistype',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.analyticalmodelinfo'] = model_description(
    'vulnerability.analyticalmodelinfo',
    None,
    {'owner': model_refs('auth.user', False),
     'fragility_func':     model_refs('vulnerability.fragilityfunc', False),
     'vulnerability_func': model_refs('vulnerability.vulnerabilityfunc', False)},
    group="vulnerability.generalinformation")

models_descr['vulnerability.cc_analysistype'] = model_description(
    'vulnerability.cc_analysistype',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.cc_analyticalmodelinfo'] = model_description(
    'vulnerability.cc_analyticalmodelinfo',
    None,
    {'owner': model_refs('auth.user', False),
     'capacity_curve_func': model_refs('vulnerability.capacitycurvefunc', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.country'] = model_description(
    'vulnerability.country',
    None,
    {}, pk_natural=True)

models_descr['vulnerability.geoapplicability'] = model_description(
    'vulnerability.geoapplicability',
    None,
    {'owner': model_refs('auth.user', False),
     'general_information': model_refs('vulnerability.generalinformation', False),
     'countries':           model_refs('vulnerability.country', True)},
    group="vulnerability.generalinformation")

models_descr['vulnerability.taxonomytype'] = model_description(
    'vulnerability.taxonomytype',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.cc_predictorvar'] = model_description(
    'vulnerability.cc_predictorvar',
    None,
    {'owner': model_refs('auth.user', False),
     'capacity_curve_func': model_refs('vulnerability.capacitycurvefunc', False)},
    group="vulnerability.generalinformation")

models_descr['vulnerability.capacitycurvefunc'] = model_description(
    'vulnerability.capacitycurvefunc',
    None,
    {'owner': model_refs('auth.user', False),
     'general_information': model_refs('vulnerability.generalinformation', False)},
    group="vulnerability.generalinformation")

models_descr['vulnerability.funcdistrdtldiscr'] = model_description(
    'vulnerability.funcdistrdtldiscr',
    None,
    {'owner': model_refs('auth.user', False),
     'damage_to_loss_func': model_refs('vulnerability.damagetolossfunc', False)},
    group="vulnerability.generalinformation")

models_descr['vulnerability.damagetolossfunc'] = model_description(
    'vulnerability.damagetolossfunc',
    None,
    {'owner': model_refs('auth.user', False),
     'general_information': model_refs('vulnerability.generalinformation', False)},
    group="vulnerability.generalinformation")

models_descr['vulnerability.funcdistrvulncont'] = model_description(
    'vulnerability.funcdistrvulncont',
    None,
    {'owner': model_refs('auth.user', False),
     'vulnerability_func': model_refs('vulnerability.vulnerabilityfunc', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.funcdistrvulndiscr'] = model_description(
    'vulnerability.funcdistrvulndiscr',
    None,
    {'owner': model_refs('auth.user', False),
     'vulnerability_func': model_refs('vulnerability.vulnerabilityfunc', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.evaluationofim'] = model_description(
    'vulnerability.evaluationofim',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.predictorvar'] = model_description(
    'vulnerability.predictorvar',
    None,
    {'owner': model_refs('auth.user', False),
     'vulnerability_func': model_refs('vulnerability.vulnerabilityfunc', False),
     'fragility_func':     model_refs('vulnerability.fragilityfunc', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.vulnerabilityfunc'] = model_description(
    'vulnerability.vulnerabilityfunc',
    None,
    {'owner': model_refs('auth.user', False),
     'general_information': model_refs('vulnerability.generalinformation', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.funcdistrfragcont'] = model_description(
    'vulnerability.funcdistrfragcont',
    None,
    {'owner': model_refs('auth.user', False),
     'fragility_func':     model_refs('vulnerability.fragilityfunc', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.funcdistrfragdiscr'] = model_description(
    'vulnerability.funcdistrfragdiscr',
    None,
    {'owner': model_refs('auth.user', False),
     'fragility_func':     model_refs('vulnerability.fragilityfunc', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.engineeringdemandpar'] = model_description(
    'vulnerability.engineeringdemandpar',
    None,
    {'owner': model_refs('auth.user', False),})

models_descr['vulnerability.fragilityfunc'] = model_description(
    'vulnerability.fragilityfunc',
    None,
    {'owner': model_refs('auth.user', False),
     'general_information':    model_refs('vulnerability.generalinformation', False),
     },
    group="vulnerability.generalinformation")

models_descr['vulnerability.generalinformation'] = model_description(
    'vulnerability.generalinformation',
    lambda i: [ i['fields']['name'] ],
    {'owner': model_refs('auth.user', False),},
    group="vulnerability.generalinformation")

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



def rebuild_order():
    reloop = True
    first_loop = True
    models_descr_old = models_descr.copy()
    models_descr_rest = {}
    models_order = []
    while reloop:
        for model, descr in models_descr_old.iteritems():
            pdebug(1, "rebuild_order: model %s" % model)
            if first_loop:
                first_loop = False
                if descr.refs == {}:
                    models_order.append(model)
                else:
                    models_descr_rest[model] = descr
            else:
                for ref_field, ref in descr.refs.iteritems():
                    if not ref.model in models_order:
                        models_descr_rest[model] = descr
                        break
                else:
                    models_order.append(model)
        models_descr_old = models_descr_rest.copy()
        models_descr_rest = {}
        if models_descr_old == {}:
            reloop = False

    return models_order

class items_info(object):

    def __init__(self, item, pk_natural=False):
        self.occur = 1
        if pk_natural:
            self.maxpk = 'pk_is_natural'
        else:
            self.maxpk = item['pk']

    def update(self, item):
        self.occur += 1
        if str(self.maxpk) != 'pk_is_natural':
            self.maxpk = item['pk'] if item['pk'] > self.maxpk else self.maxpk

    def newpk(self):
        if str(self.maxpk) != 'pk_is_natural':
            self.maxpk = self.maxpk + 1
            return self.maxpk
        else:
            raise TypeError

    def __str__(self):
        return u"occur: %d\nmaxpk: %d\n" % (self.occur, self.maxpk)


def inspect(base):
    models = {}

    for item in base:
        if not 'model' in item:
            sys.stderr.write("malformed item, 'model' key doesn't exists: %s" % str(item))
            return 1
        if not 'pk' in item:
            sys.stderr.write("malformed item, 'pk' key doesn't exists" % str(item))
            return 1
        model = item['model']

        md = models_descr[model]

        if not model in models:
            models[model] = items_info(item, pk_natural = md.pk_natural)
        else:
            models[model].update(item)

    return models

def maxpk_models(models, oldels):
    maxpks = {}

    for model in models_order:
        md = models_descr[model]
        if md.pk_natural:
            maxpks[model] = { 'maxpk': '_gem_unreachable_key_'}
            continue
        else:
            maxpks[model] = { 'maxpk': 0 }

        if model in models:
            if maxpks[model]['maxpk'] < models[model].maxpk + 1:
                maxpks[model]['maxpk'] = models[model].maxpk + 1

        if model in oldels:
            if maxpks[model]['maxpk'] < oldels[model].maxpk + 1:
                maxpks[model]['maxpk'] = oldels[model].maxpk + 1

    return maxpks


def key_get(md, item):
    if md.natural:
        k = md.natural(item)
    else:
        k = [item['pk']]
    return tuple(k)



def group_objs(base):
    group = {}
    groupk = {}

    for model in models_order:
        group[model] = []
        groupk[model] = {}

    for item in base:
        model = item['model']
        md = models_descr[model]

        group[model].append(item)
        k = key_get(md, item)
        groupk[model][k] = item

    return (group, groupk)

def kappend(groupk, model, item):
    model = item['model']
    md = models_descr[model]

    if md.natural:
        k = tuple(md.natural(item))
    else:
        k = item['pk']
    groupk[model][k] = item


def update_pk(updates_gr, updatesk_gr, model, item, maxpks, new_pk):
    """
    updates_gr   grouped updates items
    updatesk_gr  grouped updates items (dict with keys)
    model        item model
    item         item to be updated
    maxpks       dict of maximum numeric pk reached
    new_pk       new key
    """
    md = models_descr[model]

    if md.pk_natural:
        return False

    if item['pk'] == new_pk:
        return True

    # search a previous defined item with the same pk
    for item_same_pk in updates_gr[model]:
        if item_same_pk['pk'] == new_pk:
            update_pk(updates_gr, updatesk_gr, model, item_same_pk, maxpks, maxpks[model]['maxpk'])
            old_pk = item['pk']
            break
    else:
        item_same_pk = None

    # update all references
    for ref_model, ref_md in models_descr.iteritems():
        pdebug(3, "MDREF: %s" % ref_model)
        # found each model has a refs value associated with the current item model
        for ref_reffield, ref in ref_md.refs.iteritems():
            if ref.model != model:
                continue

            for itemod in updates_gr[ref_model]:
                # if field not set or empty list continue
                if not itemod['fields'][ref_reffield]:
                    continue

                pdebug(2, "ITEMOD: %s" % itemod)
                if ref.is_many:
                    if type(itemod['fields'][ref_reffield][0]) is list:
                        pdebug(0, "itemod list of lists case not managed")
                        sys.exit(10)
                    field_items = itemod['fields'][ref_reffield]
                    for i, pk in enumerate(field_items):
                        if pk == item['pk']:
                            field_items[i] = new_pk
                            break
                else:
                    if itemod['fields'][ref_reffield] == item['pk']:
                        itemod['fields'][ref_reffield] = new_pk
                        break

    # remove the item from the key based list of items
    updatesk_gr[model].pop(key_get(md, item))

    # update the pk with the new value
    item['pk'] = new_pk

    # add the item again to the key based list of items
    updatesk_gr[model][key_get(md, item)] = item

    # if another item had the same pk value of new_pk before swap it
    # with the old pk value of the updated item
    if item_same_pk is not None:
        update_pk(updates_gr, updatesk_gr, model, item_same_pk, maxpks, old_pk)

def fk_compare(a, b):
    b = list(b)
    try:
        for elem in a:
            b.remove(elem)
    except ValueError:
        return False
    return not b

def item_compare(a, b, pk_included=True):
    if pk_included:
        if a['pk'] != b['pk']:
            return False

    if a['model'] != b['model']:
        return False

    md = models_descr[a['model']]

    b_keys = b['fields'].keys()

    a_fie = a['fields']
    b_fie = b['fields']

    for a_key in a_fie:
        if not a_key in b_fie:
            return False

        if a_key in md.refs and md.refs[a_key].is_many:
            # foreign key case fk_compare
            if not fk_compare(a_fie[a_key], b_fie[a_key]):
                return False
        else:
            if a_fie[a_key] != b_fie[a_key]:
                return False
        b_keys.remove(a_key)

    # not all b keys are processed => the 2 items are different
    if b_keys:
        return False

    for idx, backinhe_a in enumerate(a.get('__bachinhe__', [])):
        try:
            backinhe_b = b['__backinhe__'][idx]
        except (KeyError, IndexError):
            pdebug(2, "differences between backinherited fields A: %s   B %s, return False",
                   (a, b))
            return False

        if backinhe_a.model_descr.model.name != backinhe_b.model_descr.model.name:
            return False
        ret = item_compare(backinhe_a, backinhe_b, pk_included=pk_included)
        if not ret:
            return False

    return True

def get_value(item, field):
    if field == 'pk':
        return item[field]
    else:
        return item['fields'][field]

def set_value(item, field, value):
    if field == 'pk':
        item[field] = value
    else:
        item['fields'][field] = value

def consistencymeter(dates_gr):
    """
    """
    cm_out_gr = OrderedDict()

    for model in models_order:
        pdebug(2, "CC: MODEL: %s" % model)
        cm_out_gr[model] = { 'fields_n': 0, 'incons': 0 }
        cm_out = cm_out_gr[model]
        md = models_descr[model]
        for item in dates_gr[model]:
            pdebug(2, "CC: ITEM: %s" % item)
            for ref_field, ref in md.refs.iteritems():
                ref_md = models_descr[ref.model]
                pdebug(2, "CC: REF_FIELD, REF.MODEL: %s, %s, %s" % (ref_field, ref.model, ref_md.natural))
                if not item['fields'][ref_field]:
                    continue
                cm_out['fields_n'] += 1
                ty = type(item['fields'][ref_field])

                if ref_md.natural and ref.is_many:
                    if type(item['fields'][ref_field][0]) is not list:
                        pdebug(1, "consistencymeter:\n  model: %s\n"
                               + "natural key field: %s  ref.model: %s\n"
                               + "item: %s\nwrong field fk type\n" %
                               (model, ref_field, ref.model, str(item)))
                        return False
                elif ((ref_md.natural and not ref.is_many) or
                      (not ref_md.natural and ref.is_many)):
                    if type(item['fields'][ref_field]) is not list:
                        pdebug(1, "consistencymeter:\n  model: %s\n"
                               + "natural key field: %s  ref.model: %s\n"
                               + "item: %s\nwrong field fk type\n" %
                               (model, ref_field, ref.model, str(item)))
                        return False
                elif (not ref_md.natural and not ref.is_many):
                    if type(item['fields'][ref_field]) is list:
                        pdebug(1, "consistencymeter:\n  model: %s\n"
                               + "natural key field: %s  ref.model: %s\n"
                               + "item: %s\nwrong field fk type\n" %
                               (model, ref_field, ref.model, str(item)))
                        return False

                if ref_md.natural is not None:
                    if ref.is_many:
                        # one2many case
                        refs_fk = item['fields'][ref_field]
                    else: # if ref.is_many:
                        # any2one case:
                        refs_fk = [ item['fields'][ref_field] ]

                    for fk in refs_fk:
                        for fktem in dates_gr[ref.model]:
                            if fk == ref_md.natural(fktem):
                                break
                        else:
                            pdebug(1, "CC: natural")
                            cm_out['incons'] += 1

                else: # if ref_md.natural
                    pdebug(2, "CC: NOT NATURAL")

                    # many2many case
                    if ref.is_many:
                        refs_fk = item['fields'][ref_field]
                    else:
                        refs_fk = [ item['fields'][ref_field] ]


                    for fk in refs_fk:
                        for fktem in dates_gr[ref.model]:
                            if fk == fktem['pk']:
                                break
                        else:
                            pdebug(1, "CC: not natural model: %s %s" % (model, item))
                            cm_out['incons'] += 1

    return cm_out_gr


def reference_get(dates_gr, model, pk):
    md = models_descr[model]
    for item in dates_gr[model]:
        if md.natural:
            if md.natural(item) == pk:
                return item
        else:
            if item['pk'] == pk:
                return item
    else:
        return None

def item_key(model, item):
    md = models_descr[model]
    if md.natural:
        return md.natural(item)
    else:
        return item['pk']


def grouping_set(dates_gr, datesk_gr):
    """
    for composite data structure like vulnerability group records of different model
    to the same object
    """
    group_heads = []

    for model in models_order:
        md = models_descr[model]
        pdebug(2, "Mod: %s  Is grouped: %s" % (model, md.group))
        if md.group is None or not dates_gr[model]:
            pdebug(2, "No grouping or items for model %s" % model)
            continue

        if md.group not in group_heads:
            group_heads.append(md.group)
        dirref_groups = [(k,v) for k,v in md.refs.iteritems() if v.model == md.group]
        if dirref_groups:
            pdebug(2, "Direct group for model %s" % model)
            for item in dates_gr[model]:
                # grouped with a direct reference
                for ref_field, ref in dirref_groups:
                    if ref.is_many:
                        continue
                    ref_md = models_descr[ref.model]

                    if item['fields'][ref_field]:
                        k = item['fields'][ref_field]
                        item['fields']['__group__'] = k
                        try:
                            kk = tuple(k)
                        except TypeError:
                            kk = tuple([k])

                        try:
                            datesk_gr[ref.model][kk]['__backrefs__'].append((model, item))
                        except KeyError:
                            datesk_gr[ref.model][kk]['__backrefs__'] = [(model, item)]
                        break
                else:
                    pdebug(0, "Direct reference not found")
                    return False
        else:
            pdebug(2, "No direct group for model %s" % model)
            for item in dates_gr[model]:
                for ref_field, ref in md.refs.iteritems():
                    if ref.is_many or not item['fields'][ref_field]:
                        continue
                    ref_record = reference_get(dates_gr, ref.model, item['fields'][ref_field])
                    if ref_record == None:
                        pdebug(0, "No reference record found, abort")
                        sys.exit(20)

                    group_ref = ref_record['fields'].get('__group__', None)
                    if not group_ref:
                        continue

                    try:
                        kk = tuple(item['fields'][ref_field])
                    except TypeError:
                        kk = tuple([item['fields'][ref_field]])

                    try:
                        datesk_gr[ref.model][kk]['__backrefs__'].append((model, item))
                    except KeyError:
                        datesk_gr[ref.model][kk]['__backrefs__'] = [(model, item)]
                    item['fields']['__group__'] = group_ref
                    break
                else:
                    pdebug(0, "ITEM: %s" % item)
                    pdebug(0, "Not found any grouping reference, abort")
                    sys.exit(22)
    return group_heads


def inheriting_set(dates_gr, datesk_gr):
    """
    set back inheritance between generic and specialized models
    """
    for model in models_order:
        md = models_descr[model]
        if md.inher is None:
            continue
        for item in dates_gr[model]:
            key = key_get(md, item)
            genitem = datesk_gr[md.inher][key]

            try:
                genitem['__backinhe__'].append(backinheritance(md, item))
            except KeyError:
                genitem['__backinhe__'] = [backinheritance(md, item)]
            models_descr[md.inher].is_inherited = True


    # remove generic inheritable items that havn't a specialized counterpart
    for model in models_order:
        md = models_descr[model]
        if not md.is_inherited:
            continue

        for item in dates_gr[model]:
            if item.get('__backinhe__', None) is None:
                pk = item['pk']
                pdebug(1, "WARNING: generic instance of %s with pk [%s] not inherited, remove it" %
                       (model, key_get(md, item)))
                del(datesk_gr[model][key_get(md, item)])
                dates_gr[model].remove(item)


def print_refs(spc, item_in):
    if '__backrefs__' not in item_in:
        return

    for mod,item in item_in['__backrefs__']:
        print "%s%s (%s)" % (" "*spc, mod, item['pk'])
        print_refs(spc + 4, item)


def model_groups_get():
    model_groups = []

    for model in models_order:
        if models_descr[model].group:
            if models_descr[model].group not in model_groups:
                model_groups.append(models_descr[model].group)

    return model_groups

def groupstruct_issubset(subset, item):
    """
    is 'subset' structure tree totally included in the 'item' structure tree ?
    """
    if '__backrefs__' not in subset:
        item['__replace__'] = subset
        return True

    if ('__backrefs__' in subset
        and '__backrefs__' not in item):
        return False

    backrefs_out = copy.deepcopy(subset['__backrefs__'])

    for sub_model, sub_item in subset['__backrefs__']:
        # Note:
        #    a second loop is needed to manage cases where 2 references to the same model
        #    have different sub-branch structures like:
        #                 A
        #               /   \
        #             B       B
        #           /      /     \
        #         C      D         E
        #
        for br_model, br_item in [ (mod, itm) for mod, itm in item['__backrefs__'] if mod == sub_model ]:
            if groupstruct_issubset(sub_item, br_item):
                backrefs_out.remove((sub_model, sub_item))
                break
        else: # for
            return False

    if not backrefs_out:
        return True
    else:
        return False

def grouping_update(updates_gheads, oldates_gr, oldatesk_gr, updates_gr, updatesk_gr):
    """
    Check if groups that already exists became inconsistent after update in the other case
    adjust pk indexes accordingly.
    """
    result = True
    for gmodel in updates_gheads:
        md = models_descr[gmodel]
        for item in updates_gr[gmodel]:
            key = key_get(md, item)
            pdebug(2, "KEY: %s[%s]" % (gmodel, key))
            # print oldatesk_gr.keys()
            if key in oldatesk_gr[gmodel]:
                otem = copy.deepcopy(oldatesk_gr[gmodel][key])
                # print "FOUND THE SAME CURVE [%s]" % key
                issubset = groupstruct_issubset(otem, item)
                if not issubset:
                    print "WARNING: in model '%s' the istance '%s' isn't totally replaced by new version, remove it manually from the database and retry" % (gmodel, key)
                    result = False
    return result


def updatures(argv, output=None, fakeold=False, check_consistency=True, sort_output=False, debug=None):
    """

    - load from fixture in updates list
    - group by model in 'updates_gr' dict of lists and 'updatesk_gr' dict of dicts
    - set grouping accordingly with 'models_descr'iption (item['fields']['__group__'])
    - for each model in updates load corresponding old data from db or from fake fixtures files
    - group old data by model in 'oldates_gr' dict of lists and 'oldatesk_gr' dict of dicts
    - grouping matching and comparison
      if new header group match an old header group:
         - check consistency of the DB after update and stop update if check fails
         - update all group pk to overwrite old pk in db


    """

    global models_order, updatures_debug_level

    if debug is not None:
        updatures_debug_level = debug

    models_order = rebuild_order()
    model_groups = model_groups_get()

    include_skipped = True if check_consistency else False

    if output == None:
        output = sys.stdout

    updates = []
    oldates = []
    finals = []

    pdebug(1, "DEBUG LEVEL: %d" % updatures_debug_level)

    for fname in argv:
        pdebug(1, "FNAME %s" % fname)
        updates += json.load(file(fname, 'r'))

    pdebug(3, "MOP UPDATES: %s" % str(updates))

    updates_gr, updatesk_gr = group_objs(updates)
    updates_gheads = grouping_set(updates_gr, updatesk_gr)
    inheriting_set(updates_gr, updatesk_gr)

    if updatures_debug_level > 0:
        for ghead in updates_gheads:
            print "MODEL: %s" % ghead
            for i in updates_gr[ghead]:
                print "GENERAL INFO: %s (%s)" % (i['fields']['name'], i['pk'])
                print_refs(4, i)

    if check_consistency:
        cm_new = consistencymeter(updates_gr)

    finals_gr, finalsk_gr = group_objs([])

    pdebug(3, "MOP GROUPS: %s" % str(updates_gr))
    models = inspect(updates)

    if not fakeold:
        # load the associated data from db
        for k in models:
            pdebug(1, "KEY: %s" % k)
            fname = '/tmp/command_output_' + k + '.json'
            with open(fname, "w") as f:
                call_command('dumpdata', k, use_natural_keys=True,
                             indent=4, stdout=f)

            oldates += json.load(file(fname, 'r'))
    else:
        oldates = json.load(file(fakeold, 'r'))

    oldates_gr,oldatesk_gr = group_objs(oldates)
    oldates_gheads = grouping_set(oldates_gr, oldatesk_gr)

    oldels = inspect(oldates)

    maxpks = maxpk_models(models, oldels)

    # grouping matching and comparison
    grouping_consistent = grouping_update(updates_gheads, oldates_gr, oldatesk_gr, updates_gr, updatesk_gr)

    if not grouping_consistent:
        return 1

    # loops on models in a way that a foreign key appear before its related item
    for model in models_order:
        if updates_gr[model] == []:
            continue
        else:
            pdebug(1, "MODEL: %s" % model)

        md = models_descr[model]

        for item in updates_gr[model]:
            if item.get('__replace__', None):
                # this item replace an old item associated with it (by grouping only, currently)
                update_pk(updates_gr, updatesk_gr, model, item, maxpks, item['__replace__']['pk'])

                finals_gr[model].append(item)
                kappend(finalsk_gr, model, item)
                finals.append(item)
                continue

            # not natural key ?
            if not md.natural:
                #
                #  found identical item with different pk
                pdebug(3, "ITEM: [%s]" % item)
                skip_it = False


                # item already exists ?
                for otem in oldates_gr[model] + finals_gr[model]:
                    if item_compare(item, otem, pk_included=True):
                        pdebug(1, "identical items, skip it")
                        # identical case: continue
                        skip_it = True
                        break

                    # no: pk key case
                    item_new = copy.deepcopy(item)
                    pdebug(2, "OTEM: %s" % otem)
                    item_new['pk'] = otem['pk']
                    if item_compare(item_new, otem, pk_included=True):
                        # identical items except for pk, skip it and update all references
                        pdebug(1, "identical item except for pk, skip it and update all references")
                        skip_it = True
                        update_pk(updates_gr, updatesk_gr, model, item, maxpks, otem['pk'])
                        break

                if skip_it:
                    pdebug(1, "SKIP IT")
                    if not include_skipped:
                        continue
                else:
                    if not md.pk_natural:
                        # loop to identify if new item has the same pk of old item
                        for otem in oldates_gr[model] + finals_gr[model]:
                            if item['pk'] == otem['pk']:
                                new_pk = oldels[model].newpk()
                                pdebug(1, "NEWPK: %d" % new_pk)
                                update_pk(updates_gr, updatesk_gr, model, item, maxpks, new_pk)
                                item['pk'] = new_pk
                                break

                pdebug(1, "ADD IT")
                finals_gr[model].append(item)
                kappend(finalsk_gr, model, item)
                finals.append(item)

            else: # if not md.natural:
                pdebug(1, "ITEM: [%s]" % item)
                skip_it = False
                found_it = False

                # item already exists ?
                for otem in oldates_gr[model] + finals_gr[model]:
                    pdebug(2, "OTEM: [%s]" % otem)
                    if item_compare(item, otem, pk_included=True):
                        pdebug(1, "identical items, skip it")
                        # identical case: continue
                        found_it = True
                        skip_it = True
                        break

                    if md.natural(item) == md.natural(otem):
                        # same natural keys found, update new pk value to match old pk
                        item['pk'] = otem['pk']
                        found_it = True

                        # no: pk key case
                        pdebug(2, "OTEM: %s" % otem)
                        if item_compare(item, otem, pk_included=True):
                            # identical items except for pk, skip it and update all references
                            pdebug(1, "identical item except for pk, skip it and update all references")
                            skip_it = True

                        break

                if skip_it:
                    if not include_skipped:
                        pdebug(1, "SKIP IT")
                        continue
                else:
                    # loop to identify if new item has the same pk of old item
                    if not found_it and not md.pk_natural:
                        for otem in oldates_gr[model] + finals_gr[model]:
                            if item['pk'] == otem['pk']:
                                new_pk = oldels[model].newpk()
                                pdebug(1, "SAME PK, UPDATE IT [%d]" % new_pk)
                                pdebug(1, "NEWPK: %d" % new_pk)
                                update_pk(updates_gr, updatesk_gr, model, item, maxpks, new_pk)
                                item['pk'] = new_pk
                                break

                pdebug(1, "ADD IT")
                finals_gr[model].append(item)
                kappend(finalsk_gr, model, item)
                finals.append(item)

    if check_consistency:
        cm_fin = consistencymeter(finals_gr)
        # print "Consistency Report"
        for k,v in cm_new.iteritems():
            if v['fields_n'] > 0:
                pdebug(1, "k: %s v: %s" % (v, k))
            if cm_new[k] != cm_fin[k]:
                print "Consistency Report: WARNING: k: %s new: %s fin: %s" % (
                    k, v, cm_fin[k])
                # sys.exit(2)

    model_groups = model_groups_get()

    for final in finals:
        final.pop('__backrefs__', None)
        final.pop('__replace__', None)
        final.pop('__backinhe__', None)
        final['fields'].pop('__group__', None)


    fin_n = len(finals)
    if sort_output:
        for i in range(0, fin_n - 1):
            for e in range(i + 1, fin_n):
                if (finals[i]['model'] > finals[e]['model'] or
                    (finals[i]['model'] == finals[e]['model'] and
                     finals[i]['pk'] > finals[e]['pk'])):
                    tmp = finals[i]
                    finals[i] = finals[e]
                    finals[e] = tmp

    pdebug(1, "FINAL: ")
    json.dump(finals, output, indent=4, sort_keys=True)
    output.write("\n")

    return 0

if __name__ == "__main__":
    argv = []
    debug = 0
    check_consistency = False
    for arg in sys.argv[1:]:
        if arg in [ '-v', '--verbose' ]:
            debug += 1
        elif arg in [ '-s', '--sort' ]:
            sort_output = True
        else:
            argv.append(arg)

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "openquakeplatform.settings")
    sys.exit(updatures(argv, debug=debug, sort_output=sort_output))
