#!/usr/bin/env python
import sys
import json
import updatures
from updatures.classes import BackInheritance, ModelRefs, ModelDescription, models_descr
import updatures.models_descr.auth
import updatures.models_descr.base
import updatures.models_descr.contenttypes
import updatures.models_descr.maps
import updatures.models_descr.people
import updatures.models_descr.security
import updatures.models_descr.taggit
import updatures.models_descr.tests
import updatures.models_descr.vulnerability

finals = json.load(sys.stdin)

fin_n = len(finals)

# sort all fields list considered always unordered
for final in finals:
    model = final['model']
    md = models_descr[model]

    for ref_field, ref in md.refs.iteritems():
        if ref.is_many:
            final['fields'][ref_field].sort()

for i in range(0, fin_n - 1):
    for e in range(i + 1, fin_n):
        if (finals[i]['model'] > finals[e]['model'] or
            (finals[i]['model'] == finals[e]['model'] and
             finals[i]['pk'] > finals[e]['pk'])):
            tmp = finals[i]
            finals[i] = finals[e]
            finals[e] = tmp

json.dump(finals, sys.stdout, indent=4, sort_keys=True)
print
