#/bin/env python


# import os
# from cStringIO import StringIO

# from django.core import management

# def create_fixture(app_name, filename):
#     buf = StringIO()
#     management.call_command('dumpdata', app_name, stdout=buf)
#     buf.seek(0)
#     with open(filename, 'w') as f:
#         f.write(buf.read())




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
        lambda i: [ i['fields']['name'] ],
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



def update_fk(updates_gr, model, item, new_pk):
    # update all references
    for mdref in models_descr:
        print "MDREF: %s" % mdref
        if model in models_descr[mdref].refs:
            fie = models_descr[mdref].refs[model]
            print "FIE: %s" % fie
            for itemod in updates_gr[mdref]:
                print "ITEMOD: %s" % itemod
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
                        print "itemod list of lists case not supported"
                        sys.exit(10)





def updatures(argv, output=None, fakeold=False):
    
    if output == None:
        output = sys.stdout

    updates = []
    oldates = []
    final_out = []

    for fname in argv:
        print "FNAME %s" % fname
        updates += json.load(file(fname, 'r'))

    print "MOP UPDATES: %s" % str(updates)

    updates_gr = group_objs(updates)

    print "MOP GROUPS: %s" % str(updates_gr)
    models = {}
    oldels = {}

    models = inspect(updates)

    if not fakeold:
        # load the associated data from db
        for k in models:
            print "KEY: %s" % k
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
            print "MODEL: %s" % model
        md = models_descr[model]
        
        # natural key ?
        if not md.natural:

            #
            #  found identical item with different pk
            for item in updates_gr[model]:
                print "ITEM: [%s]" % item
                skip_it = False
                # item already exists ?
                for otem in oldates_gr[model]:
                    if item == otem:
                        print "identical items, skip it"
                        # identical case: continue
                        skip_it = True
                        break

                    # no: pk key case
                    item_new = copy.deepcopy(item)
                    print "OTEM: %s" % otem
                    item_new['pk'] = otem['pk']
                    if item_new == otem:
                        # identical items except for pk, skip it and update all references
                        print "identical item except for pk, skip it and update all references"
                        skip_it = True
                        update_fk(updates_gr, model, item, otem['pk'])
                        break

                if skip_it:
                    print "SKIP IT"
                    continue

                # loop to identify a new entry with the same pk of old item
                for otem in oldates_gr[model]:
                    if item['pk'] == otem['pk']:
                        new_pk = oldels[model].newpk()
                        print "NEWPK: %d" % new_pk
                        update_fk(updates_gr, model, item, new_pk)
                        item['pk'] = new_pk
                        break

                print "ADD IT"

                final_out.append(item)




    # # morphing if required
    # for model in models_order:
    #     if not model in updates_gr:
    #         continue
    #     md = models_descr[model]
    #     updates_gr_orig = copy.deepcopy(updates_gr[model])
    #     for item in updates_gr_orig:
    #         # item already exists ?
    #         for otem in oldates_gr[model]:
    #             # natural key found
    #             if md.natural:
    #                 if md.natural(item) == md.natural(otem):                       
    #                     # identical record case, we can remove the item
    #                     if item == otem:
    #                         updates_gr[model].remove(item)
    #                     else:
    #                         # try to check if, except the pk, all fields are identical
    #                         old_item = copy.deepcopy(otem)
    #                         old_item['pk'] = item['pk']
    #                         if old_item == item:
    #                             print "Item [%s]\nidentical except pk, not managed yet, exit." % item
    #                             return 1
    #             else: # if md.natural
    #                 # in this case pk is the key used
    #                 new_item = copy.deepcopy(item)
    #                 new_item['pk'] = otem['pk']
    #                 if new_item == otem:
    #                     # this item already exists but with a different pk value:
    #                     # update related fixtures items and remove from the list
    #                     for foreign in 

    #                     else: # if new_item == otem:

    # for model in models_order:
    #     if not model in updates_gr:
    #         continue
    #     final_out += updates_gr[model]

    print "FINAL: "
    json.dump(final_out, output, indent=4)
    output.write("\n")
    


    # show_items_info(models)
    # show_items_info(oldels)

    
        

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "openquakeplatform.settings")
    sys.exit(updatures(sys.argv[1:]))
