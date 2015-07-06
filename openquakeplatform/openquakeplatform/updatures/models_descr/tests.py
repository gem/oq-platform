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
 
# test models
models_descr['test.one2one'] = ModelDescription(
    'test.one2one',
    None,
    {'leaf': ModelRefs('test.leaf', False)})

models_descr['test.one2many'] = ModelDescription(
    'test.one2many',
    None,
    {'leafs': ModelRefs('test.leaf', True)})

models_descr['test.leaf'] = ModelDescription(
    'test.leaf',
    None,
    {})

# test2
models_descr['test2.specific'] = ModelDescription(
    'test2.specific',
    None,
    {'pk': ModelRefs('test2.generic', False)},
    inher='test2.generic')

models_descr['test2.generic'] = ModelDescription(
    'test2.generic',
    None,
    {})

models_descr['test3.strategies'] = ModelDescription(
    'test3.strategies',
    None,
    {},
    fie_type={'fie_old': ModelDescription.FIE_TY_OLD,
              'fie_new': ModelDescription.FIE_TY_NEW,
              'fie_union': ModelDescription.FIE_TY_UNION,
              'fie_ident': ModelDescription.FIE_TY_IDENT,
              'fie_or': ModelDescription.FIE_TY_OR,
              'fie_and': ModelDescription.FIE_TY_AND}
    )
