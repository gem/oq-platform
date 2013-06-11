from django import forms
from django.utils.safestring import mark_safe

ADMIN_LEVEL_CHOICES = [['admin0', 'Level 0'], ['admin1', 'Level 1'],
                       ['admin2', 'Level 2'], ['admin3', 'Level 3']]
TOD = [['day', 'Day'], ['night', 'Night'], ['transit', 'Transit'],
       ['all', 'All'], ['off', 'Off']]
res = [['res', 'Residential'], ['non-res', 'Non-Residential'],
       ['both', 'Both']]
OUTPUT_TYPES = [('csv', 'CSV'), ('nrml', 'NRML')]

#: Default widget attrs for each widget rendered to HTML:
WIDGET_ATTRS = {'class': 'exposure_export_widget'}


class HorizontalRadioRenderer(forms.RadioSelect.renderer):

    def render(self):
        return mark_safe(u'\n'.join([u'%s\n' % w for w in self]))


class ExpRadioSelect(forms.RadioSelect):
    renderer = HorizontalRadioRenderer


class PopulationExposureForm(forms.Form):
    outputType = forms.ChoiceField(
        label='Output Type',
        widget=ExpRadioSelect(attrs=WIDGET_ATTRS),
        choices=OUTPUT_TYPES
    )


class BuildingExposureForm(forms.Form):

    adminLevel = forms.Field()
    timeOfDay = forms.ChoiceField(
        label='Time of Day',
        widget=ExpRadioSelect(attrs=WIDGET_ATTRS),
        choices=TOD
    )
    residential = forms.ChoiceField(
        label='Residential',
        widget=ExpRadioSelect(attrs=WIDGET_ATTRS),
        choices=res
    )
    outputType = forms.ChoiceField(
        label='Output Type',
        widget=ExpRadioSelect(attrs=WIDGET_ATTRS),
        choices=OUTPUT_TYPES
    )

    def __init__(self, *args, **kwargs):
        admin_levels = kwargs.pop('admin_levels')

        super(BuildingExposureForm, self).__init__(*args, **kwargs)

        self.fields['adminLevel'] = forms.ChoiceField(
            label='Admin Level',
            widget=ExpRadioSelect(attrs=WIDGET_ATTRS),
            choices=[ADMIN_LEVEL_CHOICES[i] for i in admin_levels],
        )
