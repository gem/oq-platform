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
MODELS_DESCR['auth.permission'] = ModelDescription(
    'auth.permission',
    lambda i: [i['fields']['codename'], i['fields']['content_type'][0],
               i['fields']['content_type'][1]],
    {})

MODELS_DESCR['auth.group'] = ModelDescription(
    'auth.group',
    lambda i: [i['fields']['name']],
    {'permissions': ModelRefs('auth.permission', True)},
    fie_type={'permissions': ModelDescription.FIE_TY_UNION})

MODELS_DESCR['auth.user'] = ModelDescription(
    'auth.user',
    lambda i: [i['fields']['username']],
    {'user_permissions': ModelRefs('auth.permission', True),
     'groups':           ModelRefs('auth.group', True)},
    fie_type={'user_permissions': ModelDescription.FIE_TY_UNION,
              'groups': ModelDescription.FIE_TY_UNION,
              "date_joined": ModelDescription.FIE_TY_OLD,
              "email": ModelDescription.FIE_TY_OLD,
              "first_name": ModelDescription.FIE_TY_OLD,
              "is_active": ModelDescription.FIE_TY_OLD,
              "is_staff": ModelDescription.FIE_TY_OR,
              "is_superuser": ModelDescription.FIE_TY_OR,
              "last_login": ModelDescription.FIE_TY_OLD,
              "last_name": ModelDescription.FIE_TY_OLD,
              "password": ModelDescription.FIE_TY_OLD,
              })

MODELS_DESCR['account.account'] = ModelDescription(
    'account.account',
    None,
    {'user':             ModelRefs('auth.user', False)})

# account models
MODELS_DESCR['account.signupcode'] = ModelDescription(
    'account.signupcode',
    None,
    {'inviter':          ModelRefs('auth.user', False)})

MODELS_DESCR['account.signupcodeextended'] = ModelDescription(
    'account.signupcodeextended',
    None,
    # signupcode is pk too, strange case
    {'signupcode':       ModelRefs('account.signupcode', False)})

MODELS_DESCR['account.signupcoderesult'] = ModelDescription(
    'account.signupcoderesult',
    None,
    {'signup_code':      ModelRefs('account.signupcode', False),
     'user':             ModelRefs('auth.user', False)})

MODELS_DESCR['account.emailaddress'] = ModelDescription(
    'account.emailaddress',
    None,
    {'user':             ModelRefs('auth.user', False)})

MODELS_DESCR['account.emailconfirmation'] = ModelDescription(
    'account.emailconfirmation',
    None,
    {'email_address':    ModelRefs('account.emailaddress', False)})

MODELS_DESCR['account.accountdeletion'] = ModelDescription(
    'account.accountdeletion',
    None,
    {'user':             ModelRefs('auth.user', False)})

    # maps models
MODELS_DESCR['maps.map'] = ModelDescription(
    'maps.map',
    None,
    {})

MODELS_DESCR['maps.maplayer'] = ModelDescription(
    'maps.maplayer',
    None,
    {'map':              ModelRefs('maps.map', False)})
