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

# auth models
MODELS_DESCR['security.objectrole'] = ModelDescription(
    'security.objectrole',
    lambda i: [i['fields']['codename'], i['fields']['content_type'][0],
               i['fields']['content_type'][1]],
    {'permissions': ModelRefs('auth.permission', True),
     'content_type': ModelRefs('contenttypes.contenttype', False)}
    )


MODELS_DESCR['security.userobjectrolemapping'] = ModelDescription(
    'security.userobjectrolemapping',
    None,

    { 'user': ModelRefs('auth.user', False),
      'object_ct': ModelRefs('contenttypes.contenttype', False),
      'role': ModelRefs('security.objectrole', False) }
    )


MODELS_DESCR['security.genericobjectrolemapping'] = ModelDescription(
    'security.genericobjectrolemapping',
    None,
    { 'object_ct': ModelRefs('contenttypes.contenttype', False),
      'role': ModelRefs('security.objectrole', False) }
    )
