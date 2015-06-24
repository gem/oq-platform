# Copyright (c) 2015, GEM Foundation.
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

from django.contrib.gis.db import models
from django.db.models.sql.constants import QUERY_TERMS
from django.db.backends.postgresql_psycopg2.base import DatabaseWrapper
from django.db.backends.postgresql_psycopg2.operations import (
    DatabaseOperations)

QUERY_TERMS.add('unaccent')
DatabaseWrapper.operators['unaccent'] = '=~@ %s'


def my_lookup_cast(self, lookup_type):
    """
    Adding 'unaccent' to the standard lookup_cast
    """
    lookup = '%s'

    # Cast text lookups to text to allow things like filter(x__contains=4)
    if lookup_type in ('iexact', 'contains', 'icontains', 'unaccent',
                       'startswith', 'istartswith', 'endswith', 'iendswith'):
        lookup = "%s::text"

    # Use UPPER(x) for case-insensitive lookups; it's faster.
    if lookup_type in ('iexact', 'icontains', 'unaccent',
                       'istartswith', 'iendswith'):
        lookup = 'UPPER(%s)' % lookup

    return lookup

DatabaseOperations.lookup_cast = my_lookup_cast


class UnaccentCharField(models.CharField):
    """
    Custom CharField that can be filtered using the 'unaccent' custom
    lookup criterion. It leverages the custom '=~@' postgres operator,
    that uses as procedure the custom 'icompare_unaccent' function.
    This fieldtype can therefore be filtered both case insensitive
    and accent insensitive.
    """
    def get_db_prep_lookup(self, lookup_type, value,
                           connection, prepared=False):
        if lookup_type == 'unaccent':
            # EXAMPLE:
            # Filtering GeneralInformation by author,
            # filter(authors__unaccent=author), with author='test'
            # would produce a query like:
            # SELECT [...] WHERE
            # UPPER("vulnerability_generalinformation"."authors"::text) =~@ %test%
            return ["%%%s%%" % connection.ops.prep_for_like_query(value)]
        else:
            return super(UnaccentCharField, self).get_db_prep_lookup(
                lookup_type, value, connection, prepared)

    def get_prep_lookup(self, lookup_type, value):
        if lookup_type == 'unaccent':
            return value
        else:
            return super(UnaccentCharField, self).get_prep_lookup(lookup_type,
                                                                  value)
