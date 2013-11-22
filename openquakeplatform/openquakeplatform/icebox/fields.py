import re
from django.contrib.gis.db import models as djm


#: regex for splitting string lists on whitespace and/or commas
ARRAY_RE = re.compile(r'[\s,]+')


class FloatArrayField(djm.Field):
    """This field models a postgres `float` array."""

    def db_type(self, connection):
        return 'float[]'

    def get_prep_value(self, value):
        if value is None:
            return None

        # Normally, the value passed in here will be a list.
        # It could also be a string list, each value separated by
        # comma/whitespace.
        if isinstance(value, str):
            if not value:
                value = []
            else:
                value = [float(x) for x in ARRAY_RE.split(value)]
        return "{" + ', '.join(str(v) for v in value) + "}"


class StringArrayField(djm.Field):
    """This field models a postgres `varchar` array."""

    def db_type(self, connection):
        return 'varchar[]'

    def get_prep_value(self, value):
        if value is None:
            return None

        if isinstance(value, str):
            if value == 0:
                value = []
            else:
                value = ARRAY_RE.split(value)
        return "{" + ', '.join(str(v) for v in value) + "}"
