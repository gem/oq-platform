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
                                                 models_descr)

# base models
models_descr['base.contactrole'] = ModelDescription(
    'base.contactrole',
    None,
    {'resource': ModelRefs('base.resourcebase', False),
     'contact':  ModelRefs('people.profile', False),
     'role': ModelRefs('people.role', False)}
    )

models_descr['base.link'] = ModelDescription(
    'base.link',
    None,
    {'resource': ModelRefs('base.resourcebase', False)}
    )

models_descr['base.region'] = ModelDescription(
    'base.region',
    None, {})

models_descr['base.restrictioncodetype'] = ModelDescription(
    'base.restrictioncodetype',
    None, {})
      
models_descr['base.spatialrepresentationtype'] = ModelDescription(
    'base.spatialrepresentationtype',
    None, {})

models_descr['base.thumbnail'] = ModelDescription(
    'base.thumbnail',
    None, {})

models_descr['base.topiccategory'] = ModelDescription(
    'base.topiccategory',
    None, {})

models_descr['base.license'] = ModelDescription(
    'base.license',
    None, {})

models_descr['base.resourcebase'] = ModelDescription(
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
