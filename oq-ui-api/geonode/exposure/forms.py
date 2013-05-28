from django import forms

admin_level0 = [['admin0', 'Admin Level 0']]
admin_level1 = [['admin0', 'Admin Level 0'], ['admin1', 'Admin Level 1']]
admin_level2 = [['admin0', 'Admin Level 0'], ['admin1', 'Admin Level 1'],
                ['admin2', 'Admin Level 2']]
admin_level3 = [['admin0', 'Admin Level 0'], ['admin1', 'Admin Level 1'],
                ['admin2', 'Admin Level 2'], ['admin3', 'Admin Level 3']]

ADMIN_LEVELS = [admin_level0, admin_level1, admin_level2,
                admin_level3]

TOD = [['day', 'Day'], ['night', 'Night'], ['transit', 'Transit'], ['all', 'All'], ['off', 'Off']]
res = [['res', 'Residential'], ['non-res', 'Non-Residential'], ['both', 'Both']]
OUTPUT_TYPES = [('csv', 'CSV'), ('nrml', 'NRML')]


class ExposureExportForm(forms.Form):
    adminLevel = forms.Field()
    timeOfDay = forms.ChoiceField(widget=forms.RadioSelect(), choices=TOD)
    residential = forms.ChoiceField(widget=forms.RadioSelect(), choices=res)
    outputType = forms.ChoiceField(widget=forms.RadioSelect(),
                                   choices=OUTPUT_TYPES)

    def __init__(self, *args, **kwargs):
        highest_admin_level = kwargs.pop('highest_admin_level')

        super(ExposureExportForm, self).__init__(*args, **kwargs)

        self.fields['adminLevel'] = forms.ChoiceField(
            widget=forms.RadioSelect(),
            choices=ADMIN_LEVELS[highest_admin_level],
        )


class ExposureTOD(forms.Form):
    timeOfDay = forms.ChoiceField(widget=forms.RadioSelect(), choices=TOD)
    residential = forms.ChoiceField(widget=forms.RadioSelect(), choices=res)
