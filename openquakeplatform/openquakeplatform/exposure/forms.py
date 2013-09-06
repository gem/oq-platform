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

    #: The `adminLevel` field is first stubbed out as a plain field.
    #: The content of this field will be dynamically determined in the
    #: constructor. See below.
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

        # The `adminLevel` choices are chosen here dynamically (rather than
        # being statically defined) because, for a given area, data for any
        # combination of admin levels can be found. For example, a region could
        # contain only admin 0 and 1 data, or admin 0, 1, and 3, or admin 0 and
        # 2, etc.
        # The form needs to be dynamic to support this.
        self.fields['adminLevel'] = forms.ChoiceField(
            label='Admin Level',
            widget=ExpRadioSelect(attrs=WIDGET_ATTRS),
            choices=[ADMIN_LEVEL_CHOICES[i] for i in admin_levels],
        )
