#!/usr/bin/env python
import sys
import json

finals = json.load(sys.stdin)

fin_n = len(finals)
for i in range(0, fin_n - 1):
    for e in range(i + 1, fin_n):
        if (finals[i]['model'] > finals[e]['model'] or
            (finals[i]['model'] == finals[e]['model'] and
             finals[i]['pk'] > finals[e]['pk'])):
            tmp = finals[i]
            finals[i] = finals[e]
            finals[e] = tmp

json.dump(finals, sys.stdout, indent=4, sort_keys=True)
