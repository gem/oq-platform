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
from models import (AggregationMethod,
                    CountryIndicator,
                    CustomRegion,
                    Indicator,
                    InternalConsistencyMetric,
                    Keyword,
                    MeasurementType,
                    Source,
                    Subtheme,
                    Theme,
                    UpdatePeriodicity,)

admin.site.register(AggregationMethod)
admin.site.register(CountryIndicator)
admin.site.register(InternalConsistencyMetric)
admin.site.register(Keyword)
admin.site.register(MeasurementType)
admin.site.register(Source)
admin.site.register(Subtheme)
admin.site.register(Theme)
admin.site.register(UpdatePeriodicity)


class IndicatorAdmin(admin.ModelAdmin):
    filter_horizontal = ('keywords',)

admin.site.register(Indicator, IndicatorAdmin)


class CustomRegionAdmin(admin.ModelAdmin):
    filter_horizontal = ('countries',)

admin.site.register(CustomRegion, CustomRegionAdmin)
