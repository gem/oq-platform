from django import forms
from django.shortcuts import render_to_response
from exposure.libs import FormWizardSnip
from django.template import RequestContext

admin_level0 = [['admin0','Admin Level 0']]
admin_level1 = [['admin0','Admin Level 0'],['admin1','Admin Level 1']]
admin_level2 = [['admin0','Admin Level 0'],['admin1','Admin Level 1'],['admin2', 'Admin Level 2']]
admin_level3 = [['admin0','Admin Level 0'],['admin1','Admin Level 1'],['admin2', 'Admin Level 2'],['admin3', 'Admin Level 3']]
admin_level4 = [['admin0','Admin Level 0'],['admin1','Admin Level 1'],['admin2', 'Admin Level 2'],['admin3', 'Admin Level 3'],['admin4', 'Admin Level 4']]
admin_level5 = [['admin0','Admin Level 0'],['admin1','Admin Level 1'],['admin2', 'Admin Level 2'],['admin3', 'Admin Level 3'],['admin4', 'Admin Level 4'],['admin5', 'Admin Level 5']]

class ExposureAdmin0(forms.Form):
    adminLevel = forms.ChoiceField(widget=forms.RadioSelect(), choices=admin_level0)

class ExposureAdmin1(forms.Form):
    adminLevel = forms.ChoiceField(widget=forms.RadioSelect(), choices=admin_level1)

class ExposureAdmin2(forms.Form):
    adminLevel = forms.ChoiceField(widget=forms.RadioSelect(), choices=admin_level2)

class ExposureAdmin3(forms.Form):
    adminLevel = forms.ChoiceField(widget=forms.RadioSelect(), choices=admin_level3)

class ExposureAdmin4(forms.Form):
    adminLevel = forms.ChoiceField(widget=forms.RadioSelect(), choices=admin_level4)

class ExposureAdmin5(forms.Form):
    adminLevel = forms.ChoiceField(widget=forms.RadioSelect(), choices=admin_level5)

TOD = [['day','Day'],['night','Night'],['transit','Transit'],['all', 'All'],['off','Off']]
res = [['res', 'Residential'],['non-res','Non-Residential'],['both','Both']]

class ExposureTOD(forms.Form):
    timeOfDay = forms.ChoiceField(widget=forms.RadioSelect(), choices=TOD)
    residential = forms.ChoiceField(widget=forms.RadioSelect(), choices=res)
