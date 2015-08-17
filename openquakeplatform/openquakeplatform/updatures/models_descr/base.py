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

# base models
MODELS_DESCR['base.contactrole'] = ModelDescription(
    'base.contactrole',
    None,
    {'resource': ModelRefs('base.resourcebase', False),
     'contact':  ModelRefs('people.profile', False),
     'role': ModelRefs('people.role', False)}
    )

MODELS_DESCR['base.link'] = ModelDescription(
    'base.link',
    None,
    {'resource': ModelRefs('base.resourcebase', False)}
    )

MODELS_DESCR['base.region'] = ModelDescription(
    'base.region',
    None, {})

MODELS_DESCR['base.restrictioncodetype'] = ModelDescription(
    'base.restrictioncodetype',
    None, {})
      
MODELS_DESCR['base.spatialrepresentationtype'] = ModelDescription(
    'base.spatialrepresentationtype',
    None, {})

MODELS_DESCR['base.thumbnail'] = ModelDescription(
    'base.thumbnail',
    None, {})

MODELS_DESCR['base.topiccategory'] = ModelDescription(
    'base.topiccategory',
    None, {})

MODELS_DESCR['base.license'] = ModelDescription(
    'base.license',
    None, {})

MODELS_DESCR['base.resourcebase'] = ModelDescription(
    'base.resourcebase',
    None,
    {'owner': ModelRefs('auth.user', False),
#     'contacts': ModelRefs('base.contactrole', True),
     'regions': ModelRefs('base.region', True),
     'restriction_code_type': ModelRefs('base.restrictioncodetype', False),
     'license': ModelRefs('base.license', False),
     'category': ModelRefs('base.topiccategory', False),
     'thumbnail': ModelRefs('base.thumbnail', False)}
    )
