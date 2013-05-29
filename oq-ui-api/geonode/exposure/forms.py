from django import forms
from django.utils.safestring import mark_safe

admin_level0 = [['admin0', 'Level 0']]
admin_level1 = [['admin0', 'Level 0'], ['admin1', 'Level 1']]
admin_level2 = [['admin0', 'Level 0'], ['admin1', 'Level 1'],
                ['admin2', 'Level 2']]
admin_level3 = [['admin0', 'Level 0'], ['admin1', 'Level 1'],
                ['admin2', 'Level 2'], ['admin3', 'Level 3']]

ADMIN_LEVELS = [admin_level0, admin_level1, admin_level2,
                admin_level3]

TOD = [['day', 'Day'], ['night', 'Night'], ['transit', 'Transit'],
       ['all', 'All'], ['off', 'Off']]
res = [['res', 'Residential'], ['non-res', 'Non-Residential'],
       ['both', 'Both']]
OUTPUT_TYPES = [('csv', 'CSV'), ('nrml', 'NRML')]


class HorizontalRadioRenderer(forms.RadioSelect.renderer):

    def render(self):
        return mark_safe(u'\n'.join([u'%s\n' % w for w in self]))


class ExposureExportForm(forms.Form):
    adminLevel = forms.Field()
    timeOfDay = forms.ChoiceField(
        label='Time of Day',
        widget=forms.RadioSelect(renderer=HorizontalRadioRenderer),
        choices=TOD
    )
    residential = forms.ChoiceField(
        label='Residential',
        widget=forms.RadioSelect(renderer=HorizontalRadioRenderer),
        choices=res
    )
    outputType = forms.ChoiceField(
        label='Output Type',
        widget=forms.RadioSelect(renderer=HorizontalRadioRenderer),
        choices=OUTPUT_TYPES
    )

    def __init__(self, *args, **kwargs):
        highest_admin_level = kwargs.pop('highest_admin_level')

        super(ExposureExportForm, self).__init__(*args, **kwargs)

        self.fields['adminLevel'] = forms.ChoiceField(
            label='Admin Level',
            widget=forms.RadioSelect(renderer=HorizontalRadioRenderer),
            choices=ADMIN_LEVELS[highest_admin_level],
        )
