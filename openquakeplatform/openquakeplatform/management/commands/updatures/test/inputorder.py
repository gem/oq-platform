#!/usr/bin/env python
import sys
import json

jon = json.load(sys.stdin)
json.dump(jon, sys.stdout, indent=4, sort_keys=True)
