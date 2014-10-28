#!/usr/bin/env python

import json
import os
import sys
import copy
from django.core.management import call_command, execute_manager

class model_description(object):
    def __init__(self, name, natural, refs):
        self.name = name
        self.natural = natural
        self.refs = refs


models_descr = {  'auth.permission' : model_description(
        'auth.permission',
        lambda i: [ i['fields']['codename'], i['fields']['content_type'][0], i['fields']['content_type'][1] ],
        {}),

                  'auth.group': model_description(
        'auth.group',
        lambda i: [ i['fields']['name'] ],
        {'auth.permission': 'permissions'}),

                  'auth.user': model_description(
        'auth.user',
        lambda i: [ i['fields']['username'] ],
        {'auth.permission': 'user_permissions',
         'auth.group': 'groups'}),

                  'account.account': model_description(
        'account.account',
        lambda i: i['fields']['user'],
        {'auth.user': 'user'}),

                  'account.emailaddress': model_description(
        'account.emailaddress',
        lambda i: i['fields']['user'],
        {'auth.user': 'user'}),

                  'test.leaf': model_description(
        'test.leaf',
        None,
        {}),
                  'test.one2one': model_description(
        'test.one2one',
        None,
        {'test.leaf': 'leaf'}),
                  'test.one2many': model_description(
        'test.one2many',
        None,
        {'test.leaf': 'leafs'}),
                  }

# TODO: order could be extracted from the models_descr
models_order = [ 'auth.permission',
                 'auth.group',
                 'auth.user',
                 'account.account',
                 'account.emailaddress',
                 'test.leaf',
                 'test.one2one',
                 'test.one2many'
                 ]

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



def update_fk(updates_gr, model, item, new_pk, debug=False):
    # update all references
    for mdref in models_descr:
        pdebug(debug, "MDREF: %s" % mdref)
        if model in models_descr[mdref].refs:
            fie = models_descr[mdref].refs[model]
            pdebug(debug, "FIE: %s" % fie)
            for itemod in updates_gr[mdref]:
                pdebug(debug, "ITEMOD: %s" % itemod)
                ty = type(itemod['fields'][fie])
                if ty is int:
                    # simplest case, one to one, if the same value update with the new
                    if itemod['fields'][fie] == item['pk']:
                        itemod['fields'][fie] = new_pk
                elif ty is list:
                    ty2 = type(itemod['fields'][fie][0])
                    if ty2 is int:
                        # case list of pk, substitute just the right occurrency
                        if item['pk'] in itemod['fields'][fie]:
                            idx = itemod['fields'][fie].index(item['pk'])
                            itemod['fields'][fie][idx] = new_pk
                    else:
                        pdebug(debug, "itemod list of lists case not supported")
                        sys.exit(10)



def pdebug(debug, s):
    if not debug:
        return
    print s


def updatures(argv, output=None, fakeold=False, debug=False):

    if output == None:
        output = sys.stdout

    updates = []
    oldates = []
    final_out = []

    for fname in argv:
        pdebug(debug, "FNAME %s" % fname)
        updates += json.load(file(fname, 'r'))

    pdebug(debug, "MOP UPDATES: %s" % str(updates))

    updates_gr = group_objs(updates)

    pdebug(debug, "MOP GROUPS: %s" % str(updates_gr))
    models = {}
    oldels = {}

    models = inspect(updates)

    if not fakeold:
        # load the associated data from db
        for k in models:
            pdebug(debug, "KEY: %s" % k)
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
            pdebug(debug, "MODEL: %s" % model)
            pass
        md = models_descr[model]

        # natural key ?
        if not md.natural:

            #
            #  found identical item with different pk
            for item in updates_gr[model]:
                pdebug(debug, "ITEM: [%s]" % item)
                skip_it = False
                # item already exists ?
                for otem in oldates_gr[model]:
                    if item == otem:
                        pdebug(debug, "identical items, skip it")
                        # identical case: continue
                        skip_it = True
                        break

                    # no: pk key case
                    item_new = copy.deepcopy(item)
                    pdebug(debug, "OTEM: %s" % otem)
                    item_new['pk'] = otem['pk']
                    if item_new == otem:
                        # identical items except for pk, skip it and update all references
                        pdebug(debug, "identical item except for pk, skip it and update all references")
                        skip_it = True
                        update_fk(updates_gr, model, item, otem['pk'], debug=debug)
                        break

                if skip_it:
                    pdebug(debug, "SKIP IT")
                    continue

                # loop to identify if new item has the same pk of old item
                for otem in oldates_gr[model]:
                    if item['pk'] == otem['pk']:
                        new_pk = oldels[model].newpk()
                        pdebug(debug, "NEWPK: %d" % new_pk)
                        update_fk(updates_gr, model, item, new_pk, debug=debug)
                        item['pk'] = new_pk
                        break

                pdebug(debug, "ADD IT")

                final_out.append(item)

        else: # if not md.natural:
            for item in updates_gr[model]:
                pdebug(debug, "ITEM: [%s]" % item)
                skip_it = False
                found_it = False

                # item already exists ?
                for otem in oldates_gr[model]:
                    pdebug(debug, "OTEM: [%s]" % otem)
                    if item == otem:
                        pdebug(debug, "identical items, skip it")
                        # identical case: continue
                        found_it = True
                        skip_it = True
                        break

                    if md.natural(item) == md.natural(otem):
                        # same natural keys found, update new pk value to match old pk
                        item['pk'] = otem['pk']
                        found_it = True
                        break

                if skip_it:
                    pdebug(debug, "SKIP IT")
                    continue

                if not found_it:
                    # loop to identify if new item has the same pk of old item
                    for otem in oldates_gr[model]:
                        if item['pk'] == otem['pk']:
                            new_pk = oldels[model].newpk()
                            pdebug(debug, "NEWPK: %d" % new_pk)
                            update_fk(updates_gr, model, item, new_pk, debug=debug)
                            item['pk'] = new_pk
                            break

                pdebug(debug, "ADD IT")
                final_out.append(item)

    pdebug(debug, "FINAL: ")
    json.dump(final_out, output, indent=4)
    output.write("\n")


if __name__ == "__main__":
    argv = []
    debug = False
    for arg in sys.argv[1:]:
        if arg in [ '-v', '--verbose' ]:
            debug = True
        else:
            argv.append(arg)

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "openquakeplatform.settings")
    sys.exit(updatures(argv, debug=debug))
