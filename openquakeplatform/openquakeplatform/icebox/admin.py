from django.contrib import admin
from openquakeplatform.icebox import models as icebox


class CalculationAdmin(admin.ModelAdmin):
    list_filter = ('user', 'calculation_type')


admin.site.register(icebox.Calculation, CalculationAdmin)


class OutputLayerAdmin(admin.ModelAdmin):
    pass


admin.site.register(icebox.OutputLayer, OutputLayerAdmin)
