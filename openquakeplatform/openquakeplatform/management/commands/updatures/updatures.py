#!/usr/bin/env python

import json
import os
import sys
import copy
from pprint import pprint
from collections import OrderedDict
from django.core.management import call_command, execute_manager

import pdb

def pdebug(debug, level, s):
    if debug < level:
        return
    print s

class model_description(object):
    def __init__(self, name, natural, refs, group=None, pk_natural=False):
        self.name = name
        self.natural = natural
        # { field: (model, is_many), ... }
        self.refs = refs
        self.group = group
        self.pk_natural = pk_natural

models_descr = OrderedDict()
    # auth models
models_descr['auth.permission'] = model_description(
    'auth.permission',
    lambda i: [ i['fields']['codename'], i['fields']['content_type'][0], i['fields']['content_type'][1] ],
    {})

models_descr['auth.group'] = model_description(
    'auth.group',
    lambda i: [ i['fields']['name'] ],
    {'permissions': ('auth.permission', True)})

models_descr['auth.user'] = model_description(
    'auth.user',
    lambda i: [ i['fields']['username'] ],
    {'user_permissions': ('auth.permission', True),
     'groups':           ('auth.group', True)})

models_descr['account.account'] = model_description(
    'account.account',
    None,
    {'user': ('auth.user', False)})

models_descr['account.signupcode'] = model_description(
    'account.signupcode',
    None,
    {'inviter': ('auth.user', False)})

models_descr['account.signupcodeextended'] = model_description(
    'account.signupcodeextended',
    None,
    {'signupcode': ('account.signupcode', False)}) # signupcode is pk too, strange case

models_descr['account.signupcoderesult'] = model_description(
    'account.signupcoderesult',
    None,
    {'signup_code': ('account.signupcode', False),
     'user': ('auth.user', False)})

models_descr['account.emailaddress'] = model_description(
    'account.emailaddress',
    None,
    {'user': ('auth.user', False)})

models_descr['account.emailconfirmation'] = model_description(
    'account.emailconfirmation',
    None,
    {'email_address': ('account.emailaddress', False)})

models_descr['account.accountdeletion'] = model_description(
    'account.accountdeletion',
    None,
    {'user': ('auth.user', False)})

    # Vulnerability models
models_descr['vulnerability.qrsempirical'] = model_description(
    'vulnerability.qrsempirical',
    None,
    {'fragility_func':     ('vulnerability.fragilityfunc', False),
     'vulnerability_func': ('vulnerability.vulnerabilityfunc', False)})

models_descr['vulnerability.qrsanalytical'] = model_description(
    'vulnerability.qrsanalytical',
    None,
    {'fragility_func':     ('vulnerability.fragilityfunc', False),
     'vulnerability_func': ('vulnerability.vulnerabilityfunc', False)})

models_descr['vulnerability.statmodel'] = model_description(
    'vulnerability.statmodel',
    None,
    {})

models_descr['vulnerability.statmodelfittingmethod'] = model_description(
    'vulnerability.statmodelfittingmethod',
    None,
    {})

models_descr['vulnerability.modelfittingmethodassumption'] = model_description(
    'vulnerability.modelfittingmethodassumption',
    None,
    {})

models_descr['vulnerability.fitassessmentgoodness'] = model_description(
    'vulnerability.fitassessmentgoodness',
    None,
    {})

models_descr['vulnerability.procconstrint'] = model_description(
    'vulnerability.procconstrint',
    None,
    {})

models_descr['vulnerability.statisticalinformation'] = model_description(
    'vulnerability.statisticalinformation',
    None,
    {'fragility_func':              ('vulnerability.fragilityfunc', False),
     'vulnerability_func':          ('vulnerability.vulnerabilityfunc', False)})

models_descr['vulnerability.empiricalmodelinfo'] = model_description(
    'vulnerability.empiricalmodelinfo',
    None,
    {'fragility_func':     ('vulnerability.fragilityfunc', False),
     'vulnerability_func': ('vulnerability.vulnerabilityfunc', False)})

models_descr['vulnerability.analysistype'] = model_description(
    'vulnerability.analysistype',
    None,
    {})

models_descr['vulnerability.analyticalmodelinfo'] = model_description(
    'vulnerability.analyticalmodelinfo',
    None,
    {'fragility_func':     ('vulnerability.fragilityfunc', False),
     'vulnerability_func': ('vulnerability.vulnerabilityfunc', False)})

models_descr['vulnerability.cc_analysistype'] = model_description(
    'vulnerability.cc_analysistype',
    None,
    {})

models_descr['vulnerability.cc_analyticalmodelinfo'] = model_description(
    'vulnerability.cc_analyticalmodelinfo',
    None,
    {'capacity_curve_func': ('vulnerability.capacitycurvefunc', False)})

models_descr['vulnerability.country'] = model_description(
    'vulnerability.country',
    None,
    {}, pk_natural=True)

models_descr['vulnerability.geoapplicability'] = model_description(
    'vulnerability.geoapplicability',
    None,
    {'general_information': ('vulnerability.generalinformation', False),
     'countries':           ('vulnerability.country', True)})

models_descr['vulnerability.taxonomytype'] = model_description(
    'vulnerability.taxonomytype',
    None,
    {})

models_descr['vulnerability.cc_predictorvar'] = model_description(
    'vulnerability.cc_predictorvar',
    None,
    {'capacity_curve_func': ('vulnerability.capacitycurvefunc', False)})

models_descr['vulnerability.capacitycurvefunc'] = model_description(
    'vulnerability.capacitycurvefunc',
    None,
    {'general_information': ('vulnerability.generalinformation', False)})

models_descr['vulnerability.funcdistrdtldiscr'] = model_description(
    'vulnerability.funcdistrdtldiscr',
    None,
    {'damage_to_loss_func': ('vulnerability.damagetolossfunc', False)})

models_descr['vulnerability.damagetolossfunc'] = model_description(
    'vulnerability.damagetolossfunc',
    None,
    {'general_information': ('vulnerability.generalinformation', False)})

models_descr['vulnerability.funcdistrvulncont'] = model_description(
    'vulnerability.funcdistrvulncont',
    None,
    {'vulnerability_func': ('vulnerability.vulnerabilityfunc', False)})

models_descr['vulnerability.funcdistrvulndiscr'] = model_description(
    'vulnerability.funcdistrvulndiscr',
    None,
    {'vulnerability_func': ('vulnerability.vulnerabilityfunc', False)})

models_descr['vulnerability.evaluationofim'] = model_description(
    'vulnerability.evaluationofim',
    None,
    {})

models_descr['vulnerability.predictorvar'] = model_description(
    'vulnerability.predictorvar',
    None,
    {'vulnerability_func': ('vulnerability.vulnerabilityfunc', False),
     'fragility_func':     ('vulnerability.fragilityfunc', False)})

models_descr['vulnerability.vulnerabilityfunc'] = model_description(
    'vulnerability.vulnerabilityfunc',
    None,
    {'general_information': ('vulnerability.generalinformation', False)})

models_descr['vulnerability.funcdistrfragcont'] = model_description(
    'vulnerability.funcdistrfragcont',
    None,
    {'fragility_func':     ('vulnerability.fragilityfunc', False)})

models_descr['vulnerability.funcdistrfragdiscr'] = model_description(
    'vulnerability.funcdistrfragdiscr',
    None,
    {'fragility_func':     ('vulnerability.fragilityfunc', False)})

models_descr['vulnerability.engineeringdemandpar'] = model_description(
    'vulnerability.engineeringdemandpar',
    None,
    {})

models_descr['vulnerability.fragilityfunc'] = model_description(
    'vulnerability.fragilityfunc',
    None,
    {'general_information':    ('vulnerability.generalinformation', False)})

models_descr['vulnerability.generalinformation'] = model_description(
    'vulnerability.generalinformation',
    lambda i: [ i['fields']['name'] ],
    {})

    # test models
models_descr['test.one2one'] = model_description(
    'test.one2one',
    None,
    {'leaf': ('test.leaf', False)})

models_descr['test.one2many'] = model_description(
    'test.one2many',
    None,
    {'leafs': ('test.leaf', True)})

models_descr['test.leaf'] = model_description(
    'test.leaf',
    None,
    {})

# set owner as reference for all vulnerability models except country
for md_key in models_descr:
    if md_key.startswith("vulnerability.") and md_key != "vulnerability.country":
        models_descr[md_key].refs['owner'] = ('auth.user', False)

    if (md_key.startswith("vulnerability.")
        and md_key not in (
            "vulnerability.country",
            "vulnerability.statmodel",
            "vulnerability.statmodelfittingmethod",
            'vulnerability.modelfittingmethodassumption',
            'vulnerability.fitassessmentgoodness',
            'vulnerability.procconstrint',
            'vulnerability.evaluationofim',
            'vulnerability.analysistype',
            'vulnerability.cc_analysistype',
            'vulnerability.engineeringdemandpar',
            'vulnerability.taxonomytype',
            'vulnerability.generalinformation')):
        models_descr[md_key].group = "vulnerability.generalinformation"


def rebuild_order(debug):
    reloop = True
    first_loop = True
    models_descr_old = models_descr.copy()
    models_descr_rest = {}
    models_order = []
    while reloop:
        for model, descr in models_descr_old.iteritems():
            pdebug(debug, 1, "rebuild_order: model %s" % model)
            if first_loop:
                first_loop = False
                if descr.refs == {}:
                    models_order.append(model)
                else:
                    models_descr_rest[model] = descr
            else:
                for ref_field, (ref_model, ref_ismulti) in descr.refs.iteritems():
                    if not ref_model in models_order:
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


def show_items_info(iinfo):
    for k in iinfo:
        print "KEY: %s" % k
        print iinfo[k]

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


def update_fk(updates_gr, model, item, new_pk, debug=0):
    """
    updates_gr   grouped updates items
    model        item model
    item         item to be updated
    new_pk       new key
    debug        debug level
    """
    md = models_descr[model]
    # update all references
    for ref_model, ref_md in models_descr.iteritems():
        pdebug(debug, 3, "MDREF: %s" % ref_model)
        # found each model has a refs value associated with the current item model
        for ref_reffield, (ref_refmodel, ref_refmulti) in ref_md.refs.iteritems():
            if ref_refmodel != model:
                continue

            for itemod in updates_gr[ref_model]:
                # if field not set or empty list continue
                if not itemod['fields'][ref_reffield]:
                    continue
                pdebug(debug, 2, "ITEMOD: %s" % itemod)
                if md.natural:
                    if type(itemod['fields'][ref_reffield]) is not list:
                        pdebug(debug, 1, "update_fk: a natural key needs a list as field [%s] ref: [%s]" % (itemod['fields'][ref_reffield], ref_reffield))
                        sys.exit(10)
                    if ref_refmulti:
                        field_items = itemod['fields'][ref_reffield]
                        for i, fk in enumerate(field_items):
                            if fk == md.natural(item):
                                field_items[i] = new_pk
                                break
                    else:
                        if itemod['fields'][ref_reffield] == md.natural(item):
                            itemod['fields'][ref_reffield] = new_pk
                            break

                else:
                    if ref_refmulti:
                        if type(itemod['fields'][ref_reffield][0]) is list:
                            pdebug(debug, 0, "itemod list of lists case not managed")
                            sys.exit(10)
                        field_items = itemod['fields'][ref_reffield]
                        for i, fk in enumerate(field_items):
                            if fk == item['fk']:
                                field_items[i] = new_pk
                                break
                    else:
                        if itemod['fields'][ref_reffield] == item['pk']:
                            itemod['fields'][ref_reffield] = new_pk
                            break


def update_pk(updates_gr, updatesk_gr, model, item, maxpks, new_pk, debug=0):
    """
    updates_gr   grouped updates items
    updatesk_gr  grouped updates items (dict with keys)
    model        item model
    item         item to be updated
    maxpks       dict of maximum numeric pk reached
    new_pk       new key
    debug        debug level
    """
    md = models_descr[model]

    if md.pk_natural:
        return False

    if item['pk'] == new_pk:
        return True

    # search a previous defined item with the same pk
    for item_same_pk in updates_gr[model]:
        if item_same_pk['pk'] == new_pk:
            update_pk(updates_gr, updatesk_gr, model, item_same_pk, maxpks, maxpks[model]['maxpk'], debug=debug)
            old_pk = item['pk']
            break
    else:
        item_same_pk = None

    # update all references
    for ref_model, ref_md in models_descr.iteritems():
        pdebug(debug, 3, "MDREF: %s" % ref_model)
        # found each model has a refs value associated with the current item model
        for ref_reffield, (ref_refmodel, ref_refmulti) in ref_md.refs.iteritems():
            if ref_refmodel != model:
                continue

            for itemod in updates_gr[ref_model]:
                # if field not set or empty list continue
                if not itemod['fields'][ref_reffield]:
                    continue

                pdebug(debug, 2, "ITEMOD: %s" % itemod)
                if ref_refmulti:
                    if type(itemod['fields'][ref_reffield][0]) is list:
                        pdebug(debug, 0, "itemod list of lists case not managed")
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
        update_pk(updates_gr, updatesk_gr, model, item_same_pk, maxpks, old_pk, debug=debug)

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

        if a_key in md.refs and md.refs[a_key][1]:
            # foreign key casefk_compare
            if not fk_compare(a_fie[a_key], b_fie[a_key]):
                return False
        else:
            if a_fie[a_key] != b_fie[a_key]:
                return False
        b_keys.remove(a_key)

    return not b_keys


def consistencymeter(dates_gr, debug=0):
    """
    """
    cm_out_gr = OrderedDict()

    for model in models_order:
        pdebug(debug, 2, "CC: MODEL: %s" % model)
        cm_out_gr[model] = { 'fields_n': 0, 'incons': 0 }
        cm_out = cm_out_gr[model]
        md = models_descr[model]
        for item in dates_gr[model]:
            pdebug(debug, 2, "CC: ITEM: %s" % item)
            for ref_field, (ref_model, ref_ismulti) in md.refs.iteritems():
                ref_md = models_descr[ref_model]
                pdebug(debug, 2, "CC: REF_FIELD, REF_MODEL: %s, %s, %s" % (ref_field, ref_model, ref_md.natural))
                if not item['fields'][ref_field]:
                    continue
                cm_out['fields_n'] += 1
                ty = type(item['fields'][ref_field])

                if ref_md.natural and ref_ismulti:
                    if type(item['fields'][ref_field][0]) is not list:
                        pdebug(debug, 1, "consistencymeter:\n  model: %s\n"
                               + "natural key field: %s  ref_model: %s\n"
                               + "item: %s\nwrong field fk type\n" %
                               (model, ref_field, ref_model, str(item)))
                        return False
                elif ((ref_md.natural and not ref_ismulti) or
                      (not ref_md.natural and ref_ismulti)):
                    if type(item['fields'][ref_field]) is not list:
                        pdebug(debug, 1, "consistencymeter:\n  model: %s\n"
                               + "natural key field: %s  ref_model: %s\n"
                               + "item: %s\nwrong field fk type\n" %
                               (model, ref_field, ref_model, str(item)))
                        return False
                elif (not ref_md.natural and not ref_ismulti):
                    if type(item['fields'][ref_field]) is list:
                        pdebug(debug, 1, "consistencymeter:\n  model: %s\n"
                               + "natural key field: %s  ref_model: %s\n"
                               + "item: %s\nwrong field fk type\n" %
                               (model, ref_field, ref_model, str(item)))
                        return False

                if ref_md.natural is not None:
                    if ref_ismulti:
                        # one2many case
                        refs_fk = item['fields'][ref_field]
                    else: # if ref_ismulti:
                        # any2one case:
                        refs_fk = [ item['fields'][ref_field] ]

                    for fk in refs_fk:
                        for fktem in dates_gr[ref_model]:
                            if fk == ref_md.natural(fktem):
                                break
                        else:
                            pdebug(debug, 1, "CC: natural")
                            cm_out['incons'] += 1

                else: # if ref_md.natural
                    pdebug(debug, 2, "CC: NOT NATURAL")

                    # many2many case
                    if ref_ismulti:
                        refs_fk = item['fields'][ref_field]
                    else:
                        refs_fk = [ item['fields'][ref_field] ]


                    for fk in refs_fk:
                        for fktem in dates_gr[ref_model]:
                            if fk == fktem['pk']:
                                break
                        else:
                            pdebug(debug, 1, "CC: not natural model: %s %s" % (model, item))
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

def grouping_set(debug, dates_gr, datesk_gr):
    group_heads = []

    for model in models_order:
        md = models_descr[model]
        pdebug(debug, 2, "Mod: %s  Is grouped: %s" % (model, md.group))
        if md.group is None or not dates_gr[model]:
            pdebug(debug, 2, "No grouping or items for model %s" % model)
            continue

        if md.group not in group_heads:
            group_heads.append(md.group)
        dirref_groups = [(k,(v1,v2)) for k,(v1,v2) in md.refs.iteritems() if v1 == md.group]
        if dirref_groups:
            pdebug(debug, 2, "Direct group for model %s" % model)
            for item in dates_gr[model]:
                # grouped with a direct reference
                for ref_field, (ref_model, ref_ismulti) in dirref_groups:
                    if ref_ismulti:
                        continue
                    ref_md = models_descr[ref_model]

                    if item['fields'][ref_field]:
                        k = item['fields'][ref_field]
                        item['fields']['__group__'] = k
                        try:
                            kk = tuple(k)
                        except TypeError:
                            kk = tuple([k])

                        try:
                            datesk_gr[ref_model][kk]['__backrefs__'].append((model, item))
                        except KeyError:
                            datesk_gr[ref_model][kk]['__backrefs__'] = [(model, item)]
                        break
                else:
                    pdebug(debug, 0, "Direct reference not found")
                    return False
        else:
            pdebug(debug, 2, "No direct group for model %s" % model)
            for item in dates_gr[model]:
                for ref_field, (ref_model, ref_ismulti) in md.refs.iteritems():
                    if ref_ismulti or not item['fields'][ref_field]:
                        continue
                    ref_record = reference_get(dates_gr, ref_model, item['fields'][ref_field])
                    if ref_record == None:
                        pdebug(debug, 0, "No reference record found, abort")
                        sys.exit(20)

                    group_ref = ref_record['fields'].get('__group__', None)
                    if not group_ref:
                        continue

                    try:
                        kk = tuple(item['fields'][ref_field])
                    except TypeError:
                        kk = tuple([item['fields'][ref_field]])

                    try:
                        datesk_gr[ref_model][kk]['__backrefs__'].append((model, item))
                    except KeyError:
                        datesk_gr[ref_model][kk]['__backrefs__'] = [(model, item)]
                    item['fields']['__group__'] = group_ref
                    break
                else:
                    pdebug(debug, 0, "ITEM: %s" % item)
                    pdebug(debug, 0, "Not found any grouping reference, abort")
                    sys.exit(22)
    return group_heads


def print_refs(spc, item_in):
    if '__backrefs__' not in item_in:
        return

    for mod,item in item_in['__backrefs__']:
        print "%s%s (%s)" % (" "*spc, mod, item['pk'])
        print_refs(spc + 4, item)


def model_groups_get(debug):
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

def grouping_update(debug, updates_gheads, oldates_gr, oldatesk_gr, updates_gr, updatesk_gr):
    """
    Check if groups that already exists became inconsistent after update in the other case
    adjust pk indexes accordingly.
    """
    result = True
    for gmodel in updates_gheads:
        md = models_descr[gmodel]
        for item in updates_gr[gmodel]:
            key = key_get(md, item)
            pdebug(debug, 0, "KEY: %s[%s]" % (gmodel, key))
            print oldatesk_gr.keys()
            if key in oldatesk_gr[gmodel]:
                otem = copy.deepcopy(oldatesk_gr[gmodel][key])
                print "FOUND THE SAME CURVE"
                issubset = groupstruct_issubset(otem, item)
                if issubset:
                    print "TODO: update all keys of new items group with the olds"
                else:
                    print "WARNING: in model '%s' the istance '%s' isn't totally replaced by new version, remove it manually from the database and retry" % (gmodel, key)
                    result = False
    return result


def updatures(argv, output=None, fakeold=False, check_consistency=False, debug=0):
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

    global models_order

    models_order = rebuild_order(debug)
    model_groups = model_groups_get(debug)

    include_skipped = True if check_consistency else False

    if output == None:
        output = sys.stdout

    updates = []
    oldates = []
    finals = []

    pdebug(debug, 1, "DEBUG LEVEL: %d" % debug)

    for fname in argv:
        pdebug(debug, 1, "FNAME %s" % fname)
        updates += json.load(file(fname, 'r'))

    pdebug(debug, 3, "MOP UPDATES: %s" % str(updates))

    updates_gr, updatesk_gr = group_objs(updates)
    updates_gheads = grouping_set(debug, updates_gr, updatesk_gr)
    for ghead in updates_gheads:
        print "MODEL: %s" % ghead
        for i in updates_gr[ghead]:
            print "GENERAL INFO: %s (%s)" % (i['fields']['name'], i['pk'])
            print_refs(4, i)

    if check_consistency:
        cm_new = consistencymeter(updates_gr, debug=debug)

    finals_gr, finalsk_gr = group_objs([])

    pdebug(debug, 3, "MOP GROUPS: %s" % str(updates_gr))
    models = inspect(updates)

    if not fakeold:
        # load the associated data from db
        for k in models:
            pdebug(debug, 1, "KEY: %s" % k)
            fname = '/tmp/command_output_' + k + '.json'
            with open(fname, "w") as f:
                call_command('dumpdata', k, use_natural_keys=True,
                             indent=4, stdout=f)

            oldates += json.load(file(fname, 'r'))
    else:
        oldates = json.load(file(fakeold, 'r'))

    oldates_gr,oldatesk_gr = group_objs(oldates)
    oldates_gheads = grouping_set(debug, oldates_gr, oldatesk_gr)

    oldels = inspect(oldates)

    maxpks = maxpk_models(models, oldels)

    # grouping matching and comparison
    grouping_consistent = grouping_update(debug, updates_gheads, oldates_gr, oldatesk_gr, updates_gr, updatesk_gr)

    if not grouping_consistent:
        return 1

    # loops on models in a way that a foreign key appear before its related item
    for model in models_order:
        if updates_gr[model] == []:
            continue
        else:
            pdebug(debug, 1, "MODEL: %s" % model)

        md = models_descr[model]

        for item in updates_gr[model]:
            if item.get('__replace__', None):
                # this item replace an old item associated with it (by grouping only, currently)
                update_pk(updates_gr, updatesk_gr, model, item, maxpks, item['__replace__']['pk'], debug=debug)

                finals_gr[model].append(item)
                kappend(finalsk_gr, model, item)
                finals.append(item)
                continue

            # not natural key ?
            if not md.natural:
                #
                #  found identical item with different pk
                pdebug(debug, 3, "ITEM: [%s]" % item)
                skip_it = False


                # item already exists ?
                for otem in oldates_gr[model] + finals_gr[model]:
                    if item_compare(item, otem, pk_included=True):
                        pdebug(debug, 1, "identical items, skip it")
                        # identical case: continue
                        skip_it = True
                        break

                    # no: pk key case
                    item_new = copy.deepcopy(item)
                    pdebug(debug, 2, "OTEM: %s" % otem)
                    item_new['pk'] = otem['pk']
                    if item_compare(item_new, otem, pk_included=True):
                        # identical items except for pk, skip it and update all references
                        pdebug(debug, 1, "identical item except for pk, skip it and update all references")
                        skip_it = True
                        update_pk(updates_gr, updatesk_gr, model, item, maxpks, otem['pk'], debug=debug)
                        break

                if skip_it:
                    pdebug(debug, 1, "SKIP IT")
                    if not include_skipped:
                        continue
                else:
                    if not md.pk_natural:
                        # loop to identify if new item has the same pk of old item
                        for otem in oldates_gr[model] + finals_gr[model]:
                            if item['pk'] == otem['pk']:
                                new_pk = oldels[model].newpk()
                                pdebug(debug, 1, "NEWPK: %d" % new_pk)
                                update_pk(updates_gr, updatesk_gr, model, item, maxpks, new_pk, debug=debug)
                                item['pk'] = new_pk
                                break

                pdebug(debug, 1, "ADD IT")
                finals_gr[model].append(item)
                kappend(finalsk_gr, model, item)
                finals.append(item)

            else: # if not md.natural:
                pdebug(debug, 1, "ITEM: [%s]" % item)
                skip_it = False
                found_it = False

                # item already exists ?
                for otem in oldates_gr[model] + finals_gr[model]:
                    pdebug(debug, 2, "OTEM: [%s]" % otem)
                    if item_compare(item, otem, pk_included=True):
                        pdebug(debug, 1, "identical items, skip it")
                        # identical case: continue
                        found_it = True
                        skip_it = True
                        break

                    if md.natural(item) == md.natural(otem):
                        # same natural keys found, update new pk value to match old pk
                        item['pk'] = otem['pk']
                        found_it = True

                        # no: pk key case
                        pdebug(debug, 2, "OTEM: %s" % otem)
                        if item_compare(item, otem, pk_included=True):
                            # identical items except for pk, skip it and update all references
                            pdebug(debug, 1, "identical item except for pk, skip it and update all references")
                            skip_it = True

                        break

                if skip_it:
                    if not include_skipped:
                        pdebug(debug, 1, "SKIP IT")
                        continue
                else:
                    # loop to identify if new item has the same pk of old item
                    if not found_it and not md.pk_natural:
                        for otem in oldates_gr[model] + finals_gr[model]:
                            if item['pk'] == otem['pk']:
                                new_pk = oldels[model].newpk()
                                pdebug(debug, 1, "SAME PK, UPDATE IT [%d]" % new_pk)
                                pdebug(debug, 1, "NEWPK: %d" % new_pk)
                                update_pk(updates_gr, updatesk_gr, model, item, maxpks, new_pk, debug=debug)
                                item['pk'] = new_pk
                                break

                pdebug(debug, 1, "ADD IT")
                finals_gr[model].append(item)
                kappend(finalsk_gr, model, item)
                finals.append(item)

    if check_consistency:
        cm_fin = consistencymeter(finals_gr, debug=debug)
        print "Consistency Report"
        for k,v in cm_new.iteritems():
            if v['fields_n'] > 0:
                print v, k
            if cm_new[k] != cm_fin[k]:
                print "WARNING: k: %s new: %s fin: %s" % (
                    k, v, cm_fin[k])
                # sys.exit(2)

    model_groups = model_groups_get(debug)

    for final in finals:
        final.pop('__backrefs__', None)
        final.pop('__replace__', None)
        final['fields'].pop('__group__', None)


    fin_n = len(finals)
    for i in range(0, fin_n - 1):
        for e in range(i + 1, fin_n):
            if (finals[i]['model'] > finals[e]['model'] or
                (finals[i]['model'] == finals[e]['model'] and
                 finals[i]['pk'] > finals[e]['pk'])):
                tmp = finals[i]
                finals[i] = finals[e]
                finals[e] = tmp

    pdebug(debug, 1, "FINAL: ")
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
        elif arg in [ '-c', '--check_consistency' ]:
            check_consistency = True
        else:
            argv.append(arg)

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "openquakeplatform.settings")
    sys.exit(updatures(argv, check_consistency=check_consistency, debug=debug))
