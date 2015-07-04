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

import sys
import json
from openquakeplatform import updatures
from openquakeplatform.updatures.classes import (BackInheritance, ModelRefs,
                                                 ModelDescription, models_descr)
import openquakeplatform.updatures.models_descr.auth
import openquakeplatform.updatures.models_descr.base
import openquakeplatform.updatures.models_descr.contenttypes
import openquakeplatform.updatures.models_descr.maps
import openquakeplatform.updatures.models_descr.people
import openquakeplatform.updatures.models_descr.security
import openquakeplatform.updatures.models_descr.taggit
import openquakeplatform.updatures.models_descr.tests
import openquakeplatform.updatures.models_descr.vulnerability

if __name__ == '__main__':
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
