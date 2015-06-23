#!/usr/bin/env python

import json
import os
import sys
import copy
from pprint import pprint
from collections import OrderedDict
from django.core.management import call_command, execute_manager

# from updatures import debug_level
import pdb

class BackInheritance(object):
    '''
        model_descr: model description instance of the specialized instance
        item:        item istance of the specialized instance
    '''
    def __init__(self, model_descr, item):
        self.model_descr = model_descr
        self.item = item


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
      fie_type - use this dict to describe field comparison and update behavior: 
                 IDENT: used in the comparison, default action
                 MERGE: the result is the union of old and new value,
                        not used in the comparison, the field must be a multi foreign-key
                 OLD: not used in the comparison, the old value override the new
                 NEW: not used in the comparison, the new value will override the old
                 IDENT: rise an error if the two field are different
                 OR: old val OR new val (must be both boolean)
                 AND: old val AND new val (must be both boolean)
      fie_tydf - default field comparison behavior for the model
    '''
    # normal field, used for comparison
    FIE_TY_NORM  = 1
    # produce the union of both fields (must be lists)
    FIE_TY_UNION = 2
    # use the old value
    FIE_TY_OLD   = 3
    # use the new value
    FIE_TY_NEW   = 4
    # rise an error if the two field are different
    FIE_TY_IDENT = 5
    # old val OR new val (must be both boolean)
    FIE_TY_OR    = 6
    # old val AND new val (must be both boolean)
    FIE_TY_AND   = 7

    def __init__(self, name, natural, refs, group=None, pk_natural=False,
                 inher=None, fie_type=None, fie_tydf=0):
        self.name = name
        self.natural = natural
        self.refs = refs
        self.group = group
        self.pk_natural = pk_natural
        self.inher = inher
        self.is_inherited = False # set by inheriting_set function
        self.fie_type = fie_type
        self.fie_tydf = fie_tydf

    def type_get(self, fie_name):
        '''
        return type of fie_name field or self.FIE_TY_IDENT in all other cases
        '''

        try:
            return self.fie_type[fie_name]
        except (TypeError, KeyError):
            if self.fie_tydf:
                return self.fie_tydf
            else:
                return self.FIE_TY_NORM
            
    def is_comparable(self, fie_name):
        if self.type_get(fie_name) == self.FIE_TY_NORM:
            return True
        return False

    def apply_strategy(self, item, otem):
        for field, value in (self.fie_type or {}).iteritems():
            if value == self.FIE_TY_NORM:
                continue
            if value == self.FIE_TY_UNION:
                if (not isinstance(item['fields'][field], list) or
                    not isinstance(otem['fields'][field], list)):
                    return False
                field_sum = item['fields'][field] + otem['fields'][field]
                if field_sum and type(field_sum[0]) is list:
                    hashable_new = map(tuple, item['fields'][field])
                    hashable_old = map(tuple, otem['fields'][field])
                else:
                    hashable_new = item['fields'][field]
                    hashable_old = otem['fields'][field]

                union = set(hashable_new) | set(hashable_old)

                if field_sum and type(field_sum[0]) is list:
                    item['fields'][field] = list(map(list, union))
                else:
                    item['fields'][field] = list(union)
            elif value == self.FIE_TY_OLD:
                item['fields'][field] = otem['fields'][field]
            # self.FIE_TY_NEW don't need more actions
            elif value == self.FIE_TY_IDENT:
                if item['fields'][field] != otem['fields'][field]:
                    raise ValueError
            elif value == self.FIE_TY_OR:
                if (type(item['fields'][field]) is not bool or
                    type(otem['fields'][field]) is not bool):
                    raise TypeError
                item['fields'][field] = (item['fields'][field] or
                                         otem['fields'][field])
            elif value == self.FIE_TY_AND:
                if (type(item['fields'][field]) is not bool or
                    type(otem['fields'][field]) is not bool):
                    raise TypeError
                item['fields'][field] = (item['fields'][field] and
                                         otem['fields'][field])



models_descr = OrderedDict()
