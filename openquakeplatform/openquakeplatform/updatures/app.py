#!/usr/bin/env python
# Copyright (c) 2014-2015, GEM Foundation.
#
# This program is free software: you can redistribute it and/or modify
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


import json
import os
import sys
import copy
import types
from collections import OrderedDict
from django.core.management import call_command
from openquakeplatform import updatures
from openquakeplatform.updatures.classes import (BackInheritance, ModelRefs)
from openquakeplatform.updatures.models_descr import models_descr

MODELS_ORDER = []

def pdebug(level, s):
    if updatures.DEBUG_LEVEL < level:
        return
    print >> sys.stderr, s


def rebuild_order():
    reloop = True
    first_loop = True
    models_descr_old = models_descr.copy()
    models_descr_rest = {}
    models_order = []
    while reloop:
        for model, descr in models_descr_old.iteritems():
            pdebug(2, "rebuild_order: model %s" % model)
            if first_loop:
                if descr.refs == {} and not descr.inher:
                    models_order.append(model)
                else:
                    models_descr_rest[model] = descr
            else:
                for _, ref in descr.refs.iteritems():
                    if isinstance(ref.model, types.FunctionType):
                        continue
                    if ref.model not in models_order:
                        models_descr_rest[model] = descr
                        break
                else:
                    if (not descr.inher) or (descr.inher in models_order):
                        models_order.append(model)
                    else:
                        models_descr_rest[model] = descr

        models_descr_old = models_descr_rest.copy()
        models_descr_rest = {}
        if models_descr_old == {}:
            reloop = False
        first_loop = False

    return models_order

class ItemsInfo(object):

    def __init__(self, item, pk_natural=False):
        self.occur = 1
        if pk_natural:
            self.maxpk = 'pk_is_natural'
        else:
            self.maxpk = item['pk']

    def update(self, item):
        self.occur += 1
        if str(self.maxpk) != 'pk_is_natural':
            self.maxpk = max(item['pk'], self.maxpk)

    def newpk(self):
        if str(self.maxpk) != 'pk_is_natural':
            self.maxpk += 1
            return self.maxpk
        else:
            raise TypeError

    def __str__(self):
        return u"occur: %d\nmaxpk: %d\n" % (self.occur, self.maxpk)


def inspect(base):
    models = {}

    for item in base:
        if not 'model' in item:
            sys.stderr.write("malformed item, 'model' key doesn't exists: %s"
                             % str(item))
            return 1
        if not 'pk' in item:
            sys.stderr.write("malformed item, 'pk' key doesn't exists: %s"
                             % str(item))
            return 1
        model = item['model']

        md = models_descr[model]

        if not model in models:
            models[model] = ItemsInfo(item, pk_natural=md.pk_natural)
        else:
            models[model].update(item)

    return models

def maxpk_models(models, oldels):
    maxpks = {}

    for model in MODELS_ORDER:
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
    dyn_refs = {}
    groupk = {}

    for model in MODELS_ORDER:
        group[model] = []
        dyn_refs[model] = {}
        groupk[model] = {}

    for item in base:
        model = item['model']
        md = models_descr[model]

        # if dynamic references populate the ModelDescription with more
        # virtual references
        for ref_field, ref in md.refs.iteritems():
            if isinstance(ref.model, types.FunctionType):
                dyn_key = "__dynamic__.%s.fk" % ref.model(item)
                if not dyn_refs[model].get(dyn_key, None):
                    dyn_refs[model][dyn_key] = ModelRefs(ref.model(item), False)
                item['fields'][dyn_key] = get_value(item, ref_field)

        group[model].append(item)
        k = key_get(md, item)
        groupk[model][k] = item

    for model in MODELS_ORDER:
        models_descr[model].refs = dict(models_descr[model].refs.items()
                                        + dyn_refs[model].items())

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
            old_pk = item['pk']
            item['pk'] = maxpks[model]['maxpk'] + 1
            update_pk(updates_gr, updatesk_gr, model, item_same_pk, maxpks,
                      maxpks[model]['maxpk'])
            item['pk'] = old_pk
            break
    else:
        item_same_pk = None

    # update all references
    if md.natural is None:
        for ref_model, ref_md in models_descr.iteritems():
            # found each model has a refs value associated with
            # the current item model
            for ref_reffield, ref in ref_md.refs.iteritems():
                if isinstance(ref.model, types.FunctionType):
                    continue

                if ref.model != model:
                    continue

                pdebug(3, "MDREF: %s" % ref_model)

                for itemod in updates_gr[ref_model]:
                    # if field not set or empty list continue
                    ref_value = get_value(itemod, ref_reffield)
                    if not ref_value:
                        continue

                    pdebug(3, "ITEMOD: %s" % itemod)
                    if ref.is_many:
                        if type(ref_value[0]) is list:
                            pdebug(3, "itemod list of lists case not managed")
                            sys.exit(10)
                        for i, pk in enumerate(ref_value):
                            if pk == item['pk']:
                                ref_value[i] = new_pk
                                break
                    else:
                        if ref_value == item['pk']:
                            pdebug(3, "UPDATE KEY: %s" % itemod)
                            set_value(itemod, ref_reffield, new_pk)

    # remove the item from the key based list of items
    updatesk_gr[model].pop(key_get(md, item))

    # update the pk with the new value
    item['pk'] = new_pk

    # add the item again to the key based list of items
    updatesk_gr[model][key_get(md, item)] = item

    ret = True
    for backinhe in item.get('__backinhe__', []):
        if ret:
            update_pk(updates_gr, updatesk_gr, backinhe.model_descr.name,
                      backinhe.item, maxpks, new_pk)

    # if another item had the same pk value of new_pk before swap it
    # with the old pk value of the updated item
    if item_same_pk is not None:
        if ret:
            ret = update_pk(updates_gr, updatesk_gr, model, item_same_pk,
                            maxpks, old_pk)

    return ret

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
        if not md.is_comparable(a_key):
            b_keys.remove(a_key)
            continue

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
        pdebug(1, "differences between fields list, return False")
        return False

    for idx, backinhe_a in enumerate(a.get('__backinhe__', [])):
        try:
            backinhe_b = b['__backinhe__'][idx]
        except (KeyError, IndexError):
            pdebug(2, "differences between backinherited fields A: %s   B %s,"
                   " return False", (a, b))
            return False

        if backinhe_a.model_descr.name != backinhe_b.model_descr.name:
            return False
        ret = item_compare(backinhe_a.item, backinhe_b.item,
                           pk_included=pk_included)
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
    Inspect references to identify what are outside json file records.
    """
    cm_out_gr = OrderedDict()

    for model in MODELS_ORDER:
        pdebug(2, "CC: MODEL: %s" % model)
        cm_out_gr[model] = { 'fields_n': 0, 'incons': 0, 'incons_is_many': 0 }
        cm_out = cm_out_gr[model]
        md = models_descr[model]
        for item in dates_gr[model]:
            pdebug(2, "CC: ITEM: %s" % item)
            for ref_field, ref in md.refs.iteritems():
                if isinstance(ref.model, types.FunctionType):
                    continue
                ref_md = models_descr[ref.model]
                pdebug(2, "CC: REF_FIELD, REF.MODEL: %s, %s, %s"
                       % (ref_field, ref.model, ref_md.natural))
                ref_value = get_value(item, ref_field)
                if not ref_value:
                    continue

                cm_out['fields_n'] += 1

                if ref_md.natural is not None:
                    if ref.is_many:
                        # one2many case
                        refs_fk = ref_value
                    else: # if ref.is_many:
                        # any2one case:
                        refs_fk = [ref_value]

                    for fk in refs_fk:
                        for fktem in dates_gr[ref.model]:
                            if fk == ref_md.natural(fktem):
                                break
                        else:
                            pdebug(1, "CC: natural")
                            cm_out['incons' +
                                   ('_is_many' if ref.is_many else '')] += 1

                else: # if ref_md.natural
                    pdebug(2, "CC: NOT NATURAL")

                    # many2many case
                    if ref.is_many:
                        refs_fk = ref_value
                    else:
                        refs_fk = [ref_value]


                    for fk in refs_fk:
                        for fktem in dates_gr[ref.model]:
                            if fk == fktem['pk']:
                                break
                        else:
                            pdebug(1, "CC: not natural model: %s %s" %
                                   (model, item))
                            cm_out['incons' + ('_is_many' if ref.is_many
                                             else '')] += 1

    return cm_out_gr


def reference_get(dates_gr, model, pk):
    md = models_descr[model]
    for item in dates_gr[model]:
        if md.natural:
            if md.natural(item) == pk:
                return item
        elif item['pk'] == pk:
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

    for model in MODELS_ORDER:
        md = models_descr[model]
        pdebug(2, "Mod: %s  Is grouped: %s" % (model, md.group))
        if md.group is None or not dates_gr[model]:
            pdebug(2, "No grouping or items for model %s" % model)
            continue

        if md.group not in group_heads:
            group_heads.append(md.group)
        dirref_groups = [(k, v) for k, v in md.refs.iteritems()
                         if not isinstance(v.model, types.FunctionType)
                         and v.model == md.group]
        if dirref_groups:
            pdebug(2, "Direct group for model %s" % model)
            for item in dates_gr[model]:
                # grouped with a direct reference
                for ref_field, ref in dirref_groups:
                    if ref.is_many:
                        continue

                    if item['fields'][ref_field]:
                        k = item['fields'][ref_field]
                        item['fields']['__group__'] = k
                        try:
                            kk = tuple(k)
                        except TypeError:
                            kk = tuple([k])

                        try:
                            datesk_gr[ref.model][kk]['__backrefs__'].append(
                                (model, item))
                        except KeyError:
                            datesk_gr[ref.model][kk]['__backrefs__'] = \
                                [(model, item)]
                        break
                else:
                    pdebug(0, "Direct reference not found")
                    return False
        else:
            pdebug(2, "No direct group for model %s" % model)
            for item in dates_gr[model]:
                for ref_field, ref in md.refs.iteritems():
                    if isinstance(ref.model, types.FunctionType):
                        continue

                    if ref.is_many or not item['fields'][ref_field]:
                        continue
                    ref_record = reference_get(dates_gr, ref.model,
                                               item['fields'][ref_field])
                    if ref_record is None:
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
                        datesk_gr[ref.model][kk]['__backrefs__'].append(
                            (model, item))
                    except KeyError:
                        datesk_gr[ref.model][kk]['__backrefs__'] = \
                            [(model, item)]
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
    for model in MODELS_ORDER:
        md = models_descr[model]
        if md.inher is None:
            continue
        for item in dates_gr[model]:
            key = key_get(md, item)
            genitem = datesk_gr[md.inher][key]

            try:
                genitem['__backinhe__'].append(BackInheritance(md, item))
            except KeyError:
                genitem['__backinhe__'] = [BackInheritance(md, item)]
            models_descr[md.inher].is_inherited = True


    # remove generic inheritable items that havn't a specialized counterpart
    for model in MODELS_ORDER:
        md = models_descr[model]
        if not md.is_inherited:
            continue

        for item in list(dates_gr[model]):
            if item.get('__backinhe__', None) is None:
                pdebug(1, "WARNING: generic instance of %s with pk [%s] not"
                       " inherited, remove it" % (model, key_get(md, item)))
                del(datesk_gr[model][key_get(md, item)])
                dates_gr[model].remove(item)


def print_refs(spc, item_in):
    if '__backrefs__' not in item_in:
        return

    for mod, item in item_in['__backrefs__']:
        print >> sys.stderr, "%s%s (%s)" % (" "*spc, mod, item['pk'])
        print_refs(spc + 4, item)


def model_groups_get():
    model_groups = []

    for model in MODELS_ORDER:
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
        #    a second loop is needed to manage cases where 2 references
        #    to the same model have different sub-branch structures like:
        #                 A
        #               /   \
        #             B       B
        #           /      /     \
        #         C      D         E
        #
        for _, br_item in ((mod, itm) for mod, itm in
                            item['__backrefs__'] if mod == sub_model):
            if groupstruct_issubset(sub_item, br_item):
                backrefs_out.remove((sub_model, sub_item))
                break
        else: # for
            return False

    if not backrefs_out:
        return True
    else:
        return False

def grouping_update(updates_gheads, oldatesk_gr, updates_gr):
    """
    Check if groups that already exists became inconsistent after update
    in the other case adjust pk indexes accordingly.
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
                    print >> sys.stderr, ("WARNING: in model '%s' the istance"
                                         "'%s' isn't totally replaced by new"
                                         " version, remove it manually from"
                                         " the database and retry"
                                         % (gmodel, key))
                    result = False
    return result

def updatures_app(argv, output=sys.stdout, fakeold=False, check_consistency=True,
                  sort_output=False, debug=None):
    """
 - load from fixture in updates list
 - group by model in 'updates_gr' dict of lists and 'updatesk_gr' dict of dicts
 - set grouping accordingly with 'models_descr' option
   (item['fields']['__group__'])
 - for each model in updates load corresponding old data from db or from fake
   fixtures files
 - group old data by model in 'oldates_gr' dict of lists and 'oldatesk_gr'
   dict of dicts
 - grouping matching and comparison
   if new header group match an old header group:
      - check consistency of the DB after update and stop update if check fails
      - update all group pk to overwrite old pk in db
    """

    global MODELS_ORDER

    if debug is not None:
        updatures.DEBUG_LEVEL = debug

    updates = []
    oldates = []
    finals = []

    pdebug(1, "DEBUG LEVEL: %d" % updatures.DEBUG_LEVEL)

    pdebug(1, "loading updates")
    for fname in argv:
        pdebug(1, "FNAME %s" % fname)
        updates += json.load(file(fname, 'r'))
    pdebug(1, "retrieving current data")
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

    # MODELS_ORDER is currently not ordered by reference dependencies
    for model in models_descr:
        MODELS_ORDER.append(model)

    pdebug(1, "grouping data")
    updates_gr, updatesk_gr = group_objs(updates)
    oldates_gr, oldatesk_gr = group_objs(oldates)

    pdebug(1, "ordering models")
    MODELS_ORDER = rebuild_order()

    pdebug(1, "grouping models")
    model_groups = model_groups_get()

    pdebug(3, "MOP UPDATES: %s" % str(updates))

    pdebug(1, "grouping set")
    updates_gheads = grouping_set(updates_gr, updatesk_gr)

    pdebug(1, "inheriting set")
    inheriting_set(updates_gr, updatesk_gr)
    inheriting_set(oldates_gr, oldatesk_gr)

    if updatures.DEBUG_LEVEL > 0:
        for ghead in updates_gheads:
            print >> sys.stderr, "MODEL: %s" % ghead
            for i in updates_gr[ghead]:
                print >> sys.stderr, "GENERAL INFO: %s (%s)" % \
                    (i['fields']['name'], i['pk'])
                print_refs(4, i)

    if check_consistency:
        cm_new = consistencymeter(updates_gr)

    finals_gr, finalsk_gr = group_objs([])

    pdebug(3, "MOP GROUPS: %s" % str(updates_gr))

    oldates_gheads = grouping_set(oldates_gr, oldatesk_gr)

    oldels = inspect(oldates)

    maxpks = maxpk_models(models, oldels)

    # grouping matching and comparison
    grouping_consistent = grouping_update(updates_gheads, oldatesk_gr,
                                          updates_gr)

    if not grouping_consistent:
        return 1

    # loops on models in a way that a foreign key appear before its related item
    for model in MODELS_ORDER:
        if updates_gr[model] == []:
            continue
        else:
            pdebug(1, "MODEL: %s" % model)

        md = models_descr[model]

        # if inheriting from another model skip this verification
        # (will be performed on the inherited model instance)
        if md.inher:
            pdebug(2, "Model: %s inher, skip it" % md.name )
            continue


        for item in updates_gr[model]:
            if item.get('__replace__', None):
                # this item replace an old item associated with it
                # (by grouping only, currently)
                update_pk(updates_gr, updatesk_gr, model, item, maxpks,
                          item['__replace__']['pk'])

                finals_gr[model].append(item)
                kappend(finalsk_gr, model, item)
                finals.append(item)
                continue

            # not natural key ?
            if not md.natural:
                #
                #  found identical item with different pk
                pdebug(3, "ITEM: [%s]" % item)
                substitute_it = False


                # item already exists ?
                for otem in oldates_gr[model] + finals_gr[model]:
                    if item_compare(item, otem, pk_included=True):
                        pdebug(2, "identical items, skip it")
                        # identical case: continue
                        substitute_it = True
                        break

                    # no: pk key case
                    if item_compare(item, otem, pk_included=False):
                        # identical items except for pk, skip it and update
                        #  all references
                        pdebug(1, "identical item except for pk, skip it and"
                               " update all references")
                        substitute_it = True
                        update_pk(updates_gr, updatesk_gr, model, item, maxpks,
                                  otem['pk'])
                        break

                if substitute_it:
                    md.apply_strategy(item, otem)
                    pdebug(2, "SKIP IT")
                else:
                    if not md.pk_natural:
                        # loop to identify if new item has the same pk of
                        # old item
                        for otem in oldates_gr[model] + finals_gr[model]:
                            if item['pk'] == otem['pk']:
                                new_pk = oldels[model].newpk()
                                pdebug(3, "NEWPK: %d" % new_pk)
                                update_pk(updates_gr, updatesk_gr, model, item,
                                          maxpks, new_pk)
                                break

                pdebug(2, "ADD IT")
                finals_gr[model].append(item)
                kappend(finalsk_gr, model, item)
                finals.append(item)

                for backinhe in item.get('__backinhe__', []):
                    finals_gr[backinhe.model_descr.name].append(backinhe.item)
                    kappend(finalsk_gr, backinhe.model_descr.name,
                            backinhe.item)
                    finals.append(backinhe.item)

            else: # if not md.natural:
                pdebug(3, "ITEM: [%s]" % item)
                substitute_it = False
                found_it = False

                # item already exists ?
                for otem in oldates_gr[model] + finals_gr[model]:
                    pdebug(3, "OTEM: [%s]" % otem)
                    if item_compare(item, otem, pk_included=True):
                        pdebug(2, "identical items, skip it")
                        # identical case: continue
                        found_it = True
                        substitute_it = True
                        break

                    if md.natural(item) == md.natural(otem):
                        # same natural keys found, update new pk value to match
                        # old pk
                        item['pk'] = otem['pk']
                        found_it = True

                        # no: pk key case
                        pdebug(3, "OTEM: %s" % otem)
                        if item_compare(item, otem, pk_included=True):
                            # identical items except for pk, skip it and
                            # update all references
                            pdebug(1, "identical item except for pk, skip"
                                   " it and update all references")
                            substitute_it = True

                        break

                if substitute_it:
                    md.apply_strategy(item, otem)
                    pdebug(2, "SKIP IT")
                else:
                    # loop to identify if new item has the same pk of old item
                    if not found_it and not md.pk_natural:
                        for otem in oldates_gr[model] + finals_gr[model]:
                            if item['pk'] == otem['pk']:
                                new_pk = oldels[model].newpk()
                                pdebug(1, "SAME PK, UPDATE IT [%d]" % new_pk)
                                pdebug(1, "NEWPK: %d" % new_pk)
                                update_pk(updates_gr, updatesk_gr, model, item,
                                          maxpks, new_pk)
                                item['pk'] = new_pk
                                break
                            
                for backinhe in item.get('__backinhe__', []):
                    finals_gr[backinhe.model_descr.name].append(backinhe.item)
                    kappend(finalsk_gr, backinhe.model_descr.name,
                            backinhe.item)
                    finals.append(backinhe.item)

                pdebug(1, "ADD IT")
                finals_gr[model].append(item)
                kappend(finalsk_gr, model, item)
                finals.append(item)

    if check_consistency:
        cm_fin = consistencymeter(finals_gr)
        # print "Consistency Report"
        for k, v in cm_new.iteritems():
            if v['fields_n'] > 0:
                pdebug(1, "k: %s v: %s" % (v, k))
            if cm_new[k] != cm_fin[k]:
                print >> sys.stderr, "WARNING: consistency Report: "
                "k: %s new: %s fin: [%s]" % (k, v, cm_fin[k])
                # sys.exit(2)

    model_groups = model_groups_get()

    for model in MODELS_ORDER:
        md = models_descr[model]

        for final in finals_gr[model]:
            final.pop('__backrefs__', None)
            final.pop('__replace__', None)
            final.pop('__backinhe__', None)
            final_fields = final['fields']
            final_fields.pop('__group__', None)

            for ref_field, ref in md.refs.iteritems():
                if ref.is_many:
                    final_fields[ref_field].sort()

                if isinstance(ref.model, types.FunctionType):
                    dyn_key = "__dynamic__.%s.fk" % ref.model(final)
                    try:
                        if final_fields[dyn_key]:
                            final_fields[ref_field] = \
                                final_fields[dyn_key]
                        final_fields.pop(dyn_key, None)
                    except KeyError:
                        pass

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
    for k, v in models_descr.iteritems():
        if not v.refs:
            continue
        for kr, r in v.refs.iteritems():
            if r.is_many:
                pdebug(2, "model: %s, field %s is_many" % (k, kr) )
    argv = []
    debug = 0
    check_consistency = False
    kwarg = {}
    skipnext = False
    for idx in range(1, len(sys.argv)):
        arg = sys.argv[idx]
        if skipnext:
            skipnext = False
            continue

        if arg in [ '-v', '--verbose' ]:
            debug += 1
        elif arg in [ '-s', '--sort' ]:
            kwarg['sort_output'] = True
        elif arg in [ '-f', '--fakeold' ]:
            kwarg['fakeold'] = sys.argv[idx + 1]
            skipnext = True
        else:
            argv.append(arg)

    kwarg['debug'] = debug

    os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                          "openquakeplatform.settings")
    sys.exit(updatures_app(argv, **kwarg))
