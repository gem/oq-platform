# Copyright (c) 2014, GEM Foundation.
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

from django.contrib import admin
from models import (Region, Country, Theme, Subtheme, MeasurementType,
                    StatisticalTag, Tag1, Tag2, Tag3, Tag4, Tag5, Tag6,
                    Source, Periodicity, AggregationMethod, Indicator)

admin.site.register(Region)
admin.site.register(Country)
admin.site.register(Theme)
admin.site.register(Subtheme)
admin.site.register(MeasurementType)
admin.site.register(StatisticalTag)
admin.site.register(Tag1)
admin.site.register(Tag2)
admin.site.register(Tag3)
admin.site.register(Tag4)
admin.site.register(Tag5)
admin.site.register(Tag6)
admin.site.register(Source)
admin.site.register(Periodicity)
admin.site.register(AggregationMethod)
admin.site.register(Indicator)
