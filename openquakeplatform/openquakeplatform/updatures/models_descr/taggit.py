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

from openquakeplatform.updatures.classes import (ModelRefs, ModelDescription,
                                                 MODELS_DESCR)

MODELS_DESCR['taggit.tag'] = ModelDescription(
    'taggit.tag',
    None,
    {}
    )

MODELS_DESCR['taggit.taggeditem'] = ModelDescription(
    'taggit.taggeditem',
    None,
    {'tag': ModelRefs('taggit.tag', False),
     'object_id': ModelRefs(
            lambda i: "%s.%s" % (i['fields']['content_type'][0],
                                 i['fields']['content_type'][1]),
            False),
     }
    )

