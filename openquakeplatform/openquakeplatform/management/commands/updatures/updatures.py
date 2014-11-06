#!/usr/bin/env python

import json
import os
import sys
import copy
from pprint import pprint
from collections import OrderedDict
from django.core.management import call_command, execute_manager

class model_description(object):
    def __init__(self, name, natural, refs, pk_natural = False):
        self.name = name
        self.natural = natural
        # { field: model, ... }
        self.refs = refs
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
    {'permissions': 'auth.permission'})

models_descr['auth.user'] = model_description(
    'auth.user',
    lambda i: [ i['fields']['username'] ],
    {'user_permissions': 'auth.permission',
     'groups': 'auth.group'})

models_descr['account.account'] = model_description(
    'account.account',
    lambda i: i['fields']['user'],
    {'user': 'auth.user'})

models_descr['account.emailaddress'] = model_description(
    'account.emailaddress',
    lambda i: i['fields']['user'],
    {'user': 'auth.user'})

    # Vulnerability models
models_descr['vulnerability.qrsempirical'] = model_description(
    'vulnerability.qrsempirical',
    None,
    {'fragility_func':     'vulnerability.fragilityfunc',
     'vulnerability_func': 'vulnerability.vulnerabilityfunc'})

models_descr['vulnerability.qrsanalytical'] = model_description(
    'vulnerability.qrsanalytical',
    None,
    {'fragility_func':     'vulnerability.fragilityfunc',
     'vulnerability_func': 'vulnerability.vulnerabilityfunc'})

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
    {'fragility_func':              'vulnerability.fragilityfunc',
     'vulnerability_func':          'vulnerability.vulnerabilityfunc',
     'stat_model':                  'vulnerability.statmodel',
     'stat_model_fitting_method':   'vulnerability.statmodelfittingmethod',
     'model_fitting_method_assumptions': 'vulnerability.modelfittingmethodassumption',
     'fit_assessment_goodness':     'vulnerability.fitassessmentgoodness',
     'proc_constr_conf_int':        'vulnerability.procconstrint',
     'proc_constr_pred_int':        'vulnerability.procconstrint'})

models_descr['vulnerability.empiricalmodelinfo'] = model_description(
    'vulnerability.empiricalmodelinfo',
    None,
    {'fragility_func':     'vulnerability.fragilityfunc',
     'vulnerability_func': 'vulnerability.vulnerabilityfunc',
     'evaluation_of_im':   'vulnerability.evaluationofim'})

models_descr['vulnerability.analysistype'] = model_description(
    'vulnerability.analysistype',
    None,
    {})

models_descr['vulnerability.analyticalmodelinfo'] = model_description(
    'vulnerability.analyticalmodelinfo',
    None,
    {'fragility_func':     'vulnerability.fragilityfunc',
     'vulnerability_func': 'vulnerability.vulnerabilityfunc',
     'analysis_type':      'vulnerability.analysistype',
     'evaluation_of_im':   'vulnerability.evaluationofim'})

models_descr['vulnerability.cc_analysistype'] = model_description(
    'vulnerability.cc_analysistype',
    None,
    {})

models_descr['vulnerability.cc_analyticalmodelinfo'] = model_description(
    'vulnerability.cc_analyticalmodelinfo',
    None,
    {'capacity_curve_func': 'vulnerability.capacitycurvefunc',
     'analysis_type':       'vulnerability.cc_analysistype'})

models_descr['vulnerability.country'] = model_description(
    'vulnerability.country',
    None,
    {}, pk_natural=True)

models_descr['vulnerability.geoapplicability'] = model_description(
    'vulnerability.geoapplicability',
    None,
    {'general_information': 'vulnerability.generalinformation',
     'countries':           'vulnerability.country'})

models_descr['vulnerability.taxonomytype'] = model_description(
    'vulnerability.taxonomytype',
    None,
    {})

models_descr['vulnerability.cc_predictorvar'] = model_description(
    'vulnerability.cc_predictorvar',
    None,
    {'capacity_curve_func': 'vulnerability.capacitycurvefunc'})

models_descr['vulnerability.capacitycurvefunc'] = model_description(
    'vulnerability.capacitycurvefunc',
    None,
    {'general_information': 'vulnerability.generalinformation'})

models_descr['vulnerability.funcdistrdtldiscr'] = model_description(
    'vulnerability.funcdistrdtldiscr',
    None,
    {'damage_to_loss_func': 'vulnerability.damagetolossfunc'})

models_descr['vulnerability.damagetolossfunc'] = model_description(
    'vulnerability.damagetolossfunc',
    None,
    {'general_information': 'vulnerability.generalinformation'})

models_descr['vulnerability.funcdistrvulncont'] = model_description(
    'vulnerability.funcdistrvulncont',
    None,
    {'vulnerability_func': 'vulnerability.vulnerabilityfunc'})

models_descr['vulnerability.funcdistrvulndiscr'] = model_description(
    'vulnerability.funcdistrvulndiscr',
    None,
    {'vulnerability_func': 'vulnerability.vulnerabilityfunc'})

models_descr['vulnerability.evaluationofim'] = model_description(
    'vulnerability.evaluationofim',
    None,
    {})

models_descr['vulnerability.predictorvar'] = model_description(
    'vulnerability.predictorvar',
    None,
    {'vulnerability_func': 'vulnerability.vulnerabilityfunc',
     'fragility_func':     'vulnerability.fragilityfunc'})

models_descr['vulnerability.vulnerabilityfunc'] = model_description(
    'vulnerability.vulnerabilityfunc',
    None,
    {'general_information': 'vulnerability.generalinformation'})

models_descr['vulnerability.funcdistrfragcont'] = model_description(
    'vulnerability.funcdistrfragcont',
    None,
    {'fragility_func':     'vulnerability.fragilityfunc'})

models_descr['vulnerability.funcdistrfragdiscr'] = model_description(
    'vulnerability.funcdistrfragdiscr',
    None,
    {'fragility_func':     'vulnerability.fragilityfunc'})

models_descr['vulnerability.engineeringdemandpar'] = model_description(
    'vulnerability.engineeringdemandpar',
    None,
    {})

models_descr['vulnerability.fragilityfunc'] = model_description(
    'vulnerability.fragilityfunc',
    None,
    {'general_information': 'vulnerability.generalinformation',
     'engineering_demand_par': 'vulnerability.engineeringdemandpar'})

models_descr['vulnerability.generalinformation'] = model_description(
    'vulnerability.generalinformation',
    None,
    {'taxonomy_type': 'vulnerability.taxonomytype'})

    # test models
models_descr['test.one2one'] = model_description(
    'test.one2one',
    None,
    {'leaf': 'test.leaf'})

models_descr['test.one2many'] = model_description(
    'test.one2many',
    None,
    {'leafs': 'test.leaf'})

models_descr['test.leaf'] = model_description(
    'test.leaf',
    None,
    {})

def rebuild_order():
    reloop = True
    first_loop = True
    models_descr_old = models_descr.copy()
    models_descr_rest = {}
    models_order = []
    while reloop:
        for model, descr in models_descr_old.iteritems():
            if first_loop:
                first_loop = False
                if descr.refs == {}:
                    models_order.append(model)
                else:
                    models_descr_rest[model] = descr
            else:
                for field, dep in descr.refs.iteritems():
                    if not dep in models_order:
                        models_descr_rest[model] = descr
                        break
                else:
                    models_order.append(model)
        models_descr_old = models_descr_rest.copy()
        models_descr_rest = {}
        if models_descr_old == {}:
            reloop = False

    return models_order

models_order = rebuild_order()

class items_info(object):

    def __init__(self, item):
        self.occur = 1
        self.maxpk = item['pk']

    def update(self, item):
        self.occur += 1
        self.maxpk = item['pk'] if item['pk'] > self.maxpk else self.maxpk

    def newpk(self):
        self.maxpk = self.maxpk + 1
        return self.maxpk

    def __str__(self):
        return u"occur: %d\nmaxpk: %d\n" % (self.occur, self.maxpk)


def inspect(base):
    models = {}

    for item in base:
        if not 'model' in item:
            sys.stderr.write("malformed item, 'model' key doesn't exists: %s" % str(item))
            return 1
        if not 'pk' in item:
            sys.stderr.write("malformed item, 'pl' key doesn't exists" % str(item))
            return 1
        model = item['model']

        if not model in models:
            models[model] = items_info(item)
        else:
            models[model].update(item)

    return models

def show_items_info(iinfo):
    for k in iinfo:
        print "KEY: %s" % k
        print iinfo[k]

def group_objs(base):
    group = {}
    for model in models_order:
        group[model] = []

    for item in base:
        model = item['model']
        if model in group:
            group[model].append(item)
        else:
            group[model] = [ item ]

    return group


def pdebug(debug, level, s):
    if debug < level:
        return
    print s


def update_fk(updates_gr, model, item, new_pk, debug=False):
    # update all references
    for mdref in models_descr:
        pdebug(debug, 3, "MDREF: %s" % mdref)
        if model in models_descr[mdref].refs.values():
            for ref_field, ref_model in models_descr[mdref].refs.iteritems():
                if ref_model != model:
                    continue
                pdebug(debug, 2,"REF_FIELD: %s" % ref_field)
                for itemod in updates_gr[mdref]:
                    pdebug(debug, 2, "ITEMOD: %s" % itemod)
                    ty = type(itemod['fields'][ref_field])
                    if ty is int:
                        # simplest case, one to one, if the same value update with the new
                        if itemod['fields'][ref_field] == item['pk']:
                            itemod['fields'][ref_field] = new_pk
                    elif ty is list:
                        ty2 = type(itemod['fields'][ref_field][0])
                        if ty2 is int:
                            # case list of pk, substitute just the right occurrency
                            if item['pk'] in itemod['fields'][ref_field]:
                                idx = itemod['fields'][ref_field].index(item['pk'])
                                itemod['fields'][ref_field][idx] = new_pk
                        else:
                            pdebug(debug, 1, "itemod list of lists case not supported")
                            sys.exit(10)



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

    mdesc = models_descr[a['model']]

    b_keys = b['fields'].keys()

    a_fie = a['fields']
    b_fie = b['fields']

    for a_key in a_fie:
        if not a_key in b_fie:
            return False

        if a_key in mdesc.refs:
            # foreign key case
            if not fk_compare(a_fie, b_fie):
                return False
        else:
            if a_fie[a_key] != b_fie[a_key]:
                return False
        b_keys.remove(a_key)

    return not b_keys


def updatures(argv, output=None, fakeold=False, debug=0):

    include_skipped = True

    if output == None:
        output = sys.stdout

    updates = []
    oldates = []
    final_out = []

    pdebug(debug, 1, "DEBUG LEVEL: %d" % debug)

    for fname in argv:
        pdebug(debug, 1, "FNAME %s" % fname)
        updates += json.load(file(fname, 'r'))

    pdebug(debug, 3, "MOP UPDATES: %s" % str(updates))

    updates_gr = group_objs(updates)
    final_out_gr = group_objs([])

    pdebug(debug, 3, "MOP GROUPS: %s" % str(updates_gr))
    models = {}
    oldels = {}

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

    oldates_gr = group_objs(oldates)

    oldels = inspect(oldates)

    for model in models_order:
        if updates_gr[model] == []:
            continue
        else:
            pdebug(debug, 1, "MODEL: %s" % model)
            pass
        md = models_descr[model]

        # natural key ?
        if not md.natural:

            #
            #  found identical item with different pk
            for item in updates_gr[model]:
                pdebug(debug, 1, "ITEM: [%s]" % item)
                skip_it = False
                # item already exists ?
                for otem in oldates_gr[model] + final_out_gr[model]:
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
                        update_fk(updates_gr, model, item, otem['pk'], debug=debug)
                        break

                if skip_it:
                    pdebug(debug, 1, "SKIP IT")
                    if not include_skipped:
                        continue
                else:
                    if not md.pk_natural:
                        # loop to identify if new item has the same pk of old item
                        for otem in oldates_gr[model] + final_out_gr[model]:
                            if item['pk'] == otem['pk']:
                                new_pk = oldels[model].newpk()
                                pdebug(debug, 1, "NEWPK: %d" % new_pk)
                                update_fk(updates_gr, model, item, new_pk, debug=debug)
                                item['pk'] = new_pk
                                break

                pdebug(debug, 1, "ADD IT")

                final_out_gr[model].append(item)
                final_out.append(item)

        else: # if not md.natural:
            for item in updates_gr[model]:
                pdebug(debug, 1, "ITEM: [%s]" % item)
                skip_it = False
                found_it = False

                # item already exists ?
                for otem in oldates_gr[model] + final_out_gr[model]:
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
                        item_new = copy.deepcopy(item)
                        pdebug(debug, 2, "OTEM: %s" % otem)
                        item_new['pk'] = otem['pk']
                        if item_compare(item_new, otem, pk_included=True):
                            # identical items except for pk, skip it and update all references
                            pdebug(debug, 1, "identical item except for pk, skip it and update all references")
                            skip_it = True

                        break

                if skip_it:
                    if not include_skipped:
                        pdebug(debug, 1, "SKIP IT")
                        continue
                else:
                    if not found_it and not md.pk_natural:
                        # loop to identify if new item has the same pk of old item
                        for otem in oldates_gr[model] + final_out_gr[model]:
                            if item['pk'] == otem['pk']:
                                new_pk = oldels[model].newpk()
                                pdebug(debug, 2, "SAME PK, UPDATE IT [%d]" % new_pk)
                                pdebug(debug, 1, "NEWPK: %d" % new_pk)
                                update_fk(updates_gr, model, item, new_pk, debug=debug)
                                item['pk'] = new_pk
                                break

                pdebug(debug, 1, "ADD IT")
                final_out_gr[model].append(item)
                final_out.append(item)

    pdebug(debug, 1, "FINAL: ")
    json.dump(final_out, output, indent=4)
    output.write("\n")


if __name__ == "__main__":
    argv = []
    debug = 0
    for arg in sys.argv[1:]:
        if arg in [ '-v', '--verbose' ]:
            debug += 1
        else:
            argv.append(arg)

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "openquakeplatform.settings")
    sys.exit(updatures(argv, debug=debug))
