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

models_descr['people.role'] = ModelDescription(
    'people.role',
    None,
    {'permissions': ModelRefs('auth.permission', True)}
    )

models_descr['people.profile'] = ModelDescription(
    'people.profile',
    None,
    {'user': ModelRefs('auth.user', True)}
    )


