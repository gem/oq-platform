# Copyright (c) 2010-2014, GEM Foundation.
#
# OpenQuake is free software: you can redistribute it and/or modify it
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# OpenQuake is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with OpenQuake.  If not, see <http://www.gnu.org/licenses/>.

"""Custom Django field and formfield types (for models and forms)"""

import json
import cPickle as pickle

from django.contrib.gis import forms
from django.contrib.gis.db import models as djm


class PickleFormField(forms.Field):
    """Form field for Python objects which are pickle and saved to the
    database."""

    def clean(self, value):
        """We assume that the Python value specified for this field is exactly
        what we want to pickle and save to the database.

        The value will not modified.
        """
        return value


class PickleField(djm.Field):
    """Field for transparent pickling and unpickling of python objects."""

    __metaclass__ = djm.SubfieldBase

    SUPPORTED_BACKENDS = set((
        'django.contrib.gis.db.backends.postgis',
        'django.db.backends.postgresql_psycopg2'
    ))

    def db_type(self, connection):
        """Return "bytea" as postgres' column type."""
        assert connection.settings_dict['ENGINE'] in self.SUPPORTED_BACKENDS
        return 'bytea'

    def to_python(self, value):
        """Unpickle the value."""
        if isinstance(value, (buffer, str, bytearray)) and value:
            return pickle.loads(str(value))
        else:
            return value

    def get_prep_value(self, value):
        """Pickle the value."""
        return bytearray(pickle.dumps(value, pickle.HIGHEST_PROTOCOL))

    def formfield(self, **kwargs):
        """Specify a custom form field type so forms don't treat this as a
        default type (such as a string). Any Python object is valid for this
        field type.
        """
        defaults = {'form_class': PickleFormField}
        defaults.update(kwargs)
        return super(PickleField, self).formfield(**defaults)


class DictField(PickleField):
    """Field for storing Python `dict` objects (or a JSON text representation.
    """

    def to_python(self, value):
        """The value of a DictField can obviously be a `dict`. The value can
        also be specified as a JSON string. If it is, convert it to a `dict`.
        """
        if isinstance(value, str):
            try:
                value = json.loads(value)
            except ValueError:
                # This string is not JSON.
                value = super(DictField, self).to_python(value)
        else:
            value = super(DictField, self).to_python(value)

        return value
