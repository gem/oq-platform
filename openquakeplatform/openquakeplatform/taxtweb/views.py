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

from django.conf import settings

import json
from scipy import stats
import numpy
from lxml import etree
from django.http import HttpResponse, HttpResponseNotFound, Http404
from django.shortcuts import render_to_response
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.template import RequestContext
from django.views.generic.detail import BaseDetailView
from django.utils.cache import add_never_cache_headers
from django.utils.text import slugify
from django.contrib.messages.api import get_messages

from openquakeplatform.vulnerability.models import TA, TYPES_OF_ASSESSMENT 

def index(request, **kwargs):
    
    try:
        type_of_assessment = int(request.GET.get("type_of_assessment",
                                                 TA.FRAGILITY))
        if type_of_assessment not in dict(TYPES_OF_ASSESSMENT):
            type_of_assessment = TA.FRAGILITY
    except ValueError as e:
        type_of_assessment = TA.FRAGILITY

    desc = [ 'Structural System', 'Building Information', 'Exterior Attributes', 'Roof/Floor/foundation' ]
    menu_content = ""
    for i in range(0, len(desc)):
        menu_content = (menu_content +
                        '<li id="menu_id-%d" class="vuln_menu%s%s" onclick="menu_set(this);"><span>%s</span></li>' %
                        (i+1, ("_selected" if i + 1 == type_of_assessment else ""), 
                        (" vuln_menu_first" if i == 0 else ""), desc[i]))



    sub1desc = ['Direction X', 'Direction Y']
    sub1menu_content = ""
    for i in range(0, len(sub1desc)):
        sub1menu_content = (sub1menu_content +
                            '<li id="sub1menu_id-%d" class="vuln_submenu%s%s" onclick="sub1menu_set(this);"><span>%s</span></li>' %
                            (i+1, ("_selected" if i + 1 == 1 else ""), 
                             (" vuln_submenu_first" if i == 0 else ""), sub1desc[i]))

    is_popup = (False if request.GET.get("is_popup", False) == False else True)

    return render_to_response("taxtweb/index.html",
                              dict(is_popup=is_popup,
                                   type_of_assessment=type_of_assessment,
                                   menu_content=menu_content,
                                   sub1menu_content=sub1menu_content,
                                   ),
                              context_instance=RequestContext(request))


# def list_entries(request, **kwargs):
#     """Main listing."""
#     geninfo = GeneralInformation.objects.all()
#     types_of_assessment = dict(
#         (key, value) for (key, value) in TYPES_OF_ASSESSMENT)
#     try:
#         type_of_assessment = int(request.GET.get("type_of_assessment",
#                                  TA.FRAGILITY))
#     except ValueError as e:
#         print 'Invalid type of assessment: %s' % e
#         type_of_assessment = TA.FRAGILITY
#     page_title = ("Vulnerability: list of %s functions" %
#                   types_of_assessment[type_of_assessment].lower())

#     try:
#         curve_id = int(request.GET.get("curve",
#                                  TA.FRAGILITY))
#     except ValueError as e:
#         print 'Invalid type of assessment: %s' % e
#         curve_id = ""

#     geninfo = geninfo.filter(type_of_assessment=type_of_assessment)
#     category = request.POST.get('category')
#     material = request.POST.get('material')
#     llrs = request.POST.get('llrs')
#     author = request.POST.get('author')
#     method_of_estimation = request.POST.get('method_of_estimation')
#     intensity_measure_type = request.POST.get('intensity_measure_type')
#     damage_scale = request.POST.get('damage_scale')
#     country = request.POST.get('country')
#     region = request.POST.get('region')
#     if category:
#         geninfo = geninfo.filter(category=category)
#     geninfo = geninfo.filter(type_of_assessment=type_of_assessment)
#     if type_of_assessment == TA.FRAGILITY:
#         if method_of_estimation:
#             geninfo = geninfo.filter(
#                 fragility_func__method_of_estimation=method_of_estimation)
#         if intensity_measure_type:
#             geninfo = geninfo.filter(
#                 fragility_func__predictor_var__intensity_measure_type=
#                 intensity_measure_type)
#         if damage_scale:
#             geninfo = geninfo.filter(
#                 fragility_func__damage_scale=damage_scale)
#     elif type_of_assessment == TA.VULNERABILITY:
#         if method_of_estimation:
#             geninfo = geninfo.filter(
#                 vulnerability_func__method_of_estimation=method_of_estimation)
#         if intensity_measure_type:
#             geninfo = geninfo.filter(
#                 vulnerability_func__predictor_var__intensity_measure_type=
#                 intensity_measure_type)
#     elif type_of_assessment == TA.DAMAGE_TO_LOSS:
#         if method_of_estimation:
#             geninfo = geninfo.filter(
#                 damage_to_loss_func__method_of_estimation=method_of_estimation)
#         if damage_scale:
#             geninfo = geninfo.filter(
#                 damage_to_loss_func__damage_scale=damage_scale)
#     elif type_of_assessment == TA.CAPACITY_CURVE:
#         if method_of_estimation:
#             geninfo = geninfo.filter(
#                 capacity_curve_func__method_of_estimation=
#                 method_of_estimation)
#     if material:
#         geninfo = geninfo.filter(material=material)
#     if llrs:
#         geninfo = geninfo.filter(llrs=llrs)
#     if author:
#         geninfo = geninfo.filter(authors__icontains=author)
#     if country:
#         geninfo = geninfo.filter(
#             geo_applicability__countries__name__icontains=country)
#     if region:
#         geninfo = geninfo.filter(
#             geo_applicability__countries__region=region).distinct()

#     # paginator = Paginator(geninfo, 2)

#     #try:
#     #    page = int(request.GET.get("page", '1'))
#     #except ValueError:
#     #    page = 1

#     #try:
#     #    geninfo = paginator.page(page)
#     #except (InvalidPage, EmptyPage):
#     #    geninfo = paginator.page(paginator.num_pages)
#     if request.method == 'POST':  # If the form has been submitted...
#         form = FiltersForm(request.POST)  # A form bound to the POST data
#     else:
#         form = FiltersForm()  # An unbound form
#     # form.fields['type_of_assessment'].widget = forms.HiddenInput()
#     if type_of_assessment not in [TA.FRAGILITY, TA.DAMAGE_TO_LOSS]:
#         form.fields.pop('damage_scale')
#     if type_of_assessment in [TA.DAMAGE_TO_LOSS, TA.CAPACITY_CURVE]:
#         form.fields.pop('intensity_measure_type')

#     form_all = [{'id': id, 'field': field} for id, field in enumerate(form)]

#     # we split the form in 2 rows, the first, fixed with 3 fields plus
#     # the submit button, the second contains all the remaining fields.
#     form1 = form_all[0:3]
#     form2 = form_all[3:]
#     return render_to_response("vulnerability/list.html",
#                               dict(page_title=page_title,
#                                    form1=form1,
#                                    form2=form2,
#                                    geninfo=geninfo,
#                                    types_of_assessment=types_of_assessment,
#                                    type_of_assessment=type_of_assessment,
#                                    curve_id=curve_id,
#                                    user=request.user,
#                                    body_class='bodyclass'),
#                               context_instance=RequestContext(request))


# class IntensityMeasureCSC(BaseDetailView):
#     """
#     View to handle the ajax request for the field options.
#     """

#     def get(self, request, *args, **kwargs):
#         parent_value = request.GET.get("parent_value")
#         if parent_value:
#             parent_value_int = int(parent_value)
#         #else:
#             #raise ValueError

#         if not parent_value:
#             choices = (('', '--------'), )
#         elif parent_value_int in (IMT.PGA, IMT.SAT):
#             choices = ((IMU.G, 'g'),
#                        (IMU.CM_S2, 'cm/s^2'),
#                        (IMU.M_S2, 'm/s^2'))
#         elif parent_value_int in (IMT.PGV, IMT.IA):
#             choices = ((IMU.CM_S, 'cm/s'),
#                        (IMU.M_S, 'm/s'))
#         elif parent_value_int in (IMT.PGD, IMT.SDT):
#             choices = ((IMU.CM, 'cm'),
#                        (IMU.M, 'm'))
#         elif parent_value_int == IMT.RSD:
#             choices = ((IMU.S, 's'), )
#         elif parent_value_int == IMT.CAV:
#             choices = ((IMU.GS, 'g-s'), )
#         elif parent_value_int == IMT.MMI:
#             choices = ((IMU.ROMAN, 'Roman numbers'), )
#         else:
#             raise ValueError

#         response = HttpResponse(
#             json.dumps(choices, cls=DjangoJSONEncoder),
#             mimetype='application/javascript'
#         )
#         add_never_cache_headers(response)
#         return response


# class EngineeringDemandCSC(BaseDetailView):
#     """
#     View to handle the ajax request for the field options.
#     """

#     def get(self, request, *args, **kwargs):
#         # field = request.GET.get("field")
#         parent_value = request.GET.get("parent_value")
#         if parent_value:
#             parent_value_int = int(parent_value)
#         #else:
#             #raise ValueError

#         if not parent_value:
#             choices = (('', '--------'), )
#         elif parent_value_int in (EDP.INTERSTOREY_DRIFT, EDP.GLOBAL_DRIFT):
#             choices = ((EDU.PURE, 'Dimensionless'), )
#         elif parent_value_int in (EDP.LATERAL_ROOF_DISPLACEMENT,
#                                   EDP.SPECTRAL_DISPLACEMENT):
#             choices = ((EDU.CM, 'cm'), (EDU.M, 'm'))
#         elif parent_value_int == EDP.CHORD_ROTATION:
#             choices = ((EDU.RAD, 'rad'), )
#         elif parent_value_int == EDP.CURVATURE:
#             choices = ((EDU.RAD_KM, 'rad/km'), (EDU.RAD_M, 'rad/m'))
#         else:
#             raise ValueError

#         response = HttpResponse(
#             json.dumps(choices, cls=DjangoJSONEncoder),
#             mimetype='application/javascript'
#         )
#         add_never_cache_headers(response)
#         return response


# class RespVarParCSC(BaseDetailView):
#     """
#     View to handle the ajax request for the field options.
#     """

#     def get(self, request, *args, **kwargs):
#         # field = request.GET.get("field")
#         parent_value = request.GET.get("parent_value")
#         if parent_value:
#             parent_value_int = int(parent_value)
#         #else:
#             #raise ValueError

#         if not parent_value:
#             choices = (('', '--------'), )
#         elif parent_value_int in (EDP.INTERSTOREY_DRIFT,
#                                   EDP.GLOBAL_DRIFT,
#                                   EDP.LATERAL_ROOF_DISPLACEMENT):
#             choices = ((RVP.BASE_SHEAR, 'Base shear'), )
#         elif parent_value_int in (EDP.CHORD_ROTATION,
#                                   EDP.CURVATURE):
#             choices = ((RVP.BASE_BENDING_MOMENT, 'Base bending moment'), )
#         elif parent_value_int == EDP.SPECTRAL_DISPLACEMENT:
#             choices = ((RVP.SPECTRAL_ACCELERATION, 'Spectral acceleration'), )
#         else:
#             raise ValueError

#         response = HttpResponse(
#             json.dumps(choices, cls=DjangoJSONEncoder),
#             mimetype='application/javascript'
#         )
#         add_never_cache_headers(response)
#         return response


# class RespVarUnitsCSC(BaseDetailView):
#     """
#     View to handle the ajax request for the field options.
#     """

#     def get(self, request, *args, **kwargs):
#         # field = request.GET.get("field")
#         parent_value = request.GET.get("parent_value")
#         if parent_value:
#             parent_value_int = int(parent_value)
#         #else:
#             #raise ValueError

#         if not parent_value:
#             choices = (('', '--------'), )
#         elif parent_value_int == RVP.BASE_SHEAR:
#             choices = ((RVU.KN, 'kN'), )
#         elif parent_value_int == RVP.BASE_BENDING_MOMENT:
#             choices = ((RVU.KNM, 'kN*m'), )
#         elif parent_value_int == RVP.SPECTRAL_ACCELERATION:
#             choices = ((RVU.G, 'g'), (RVU.CMS2, 'cm/s^2'), (RVU.MS2, 'm/s^2'))
#         else:
#             raise ValueError

#         response = HttpResponse(
#             json.dumps(choices, cls=DjangoJSONEncoder),
#             mimetype='application/javascript'
#         )
#         add_never_cache_headers(response)
#         return response


# def general_information_serialize(request, gen_info_id):
#     try:
#         #gi = GeneralInformation.objects.get(pk=gen_info_id)
#         gi = GeneralInformation.objects.select_related().get(pk=gen_info_id)
#         #gi = GeneralInformation.objects.filter(id=gen_info_id)
#     except GeneralInformation.DoesNotExist:
#         raise Http404
#     gi_json = serializers.serialize(
#         "json",
#         [gi],
#         #indent=4,
#         choices=True,
#         relations={
#             'fragility_func': {
#                 'choices': True,
#                 'relations': {
#                     'analytical_model_info': {
#                         'choices': True,
#                         'relations': ('analysis_type',
#                                       'evaluation_of_im', )
#                     },
#                     'empirical_model_info': {'choices': True},
#                     'stat_info': {
#                         'choices': True,
#                         'relations': ('stat_model',
#                                       'stat_model_fitting_method',
#                                       'model_fitting_method_assumptions',
#                                       'fit_assessment_goodness',
#                                       'proc_constr_conf_int',
#                                       'proc_constr_pred_int', )
#                     },
#                     'predictor_var': {'choices': True},
#                     'func_distr_frag_discr': {'choices': True},
#                     'func_distr_frag_cont': {
#                         'choices': True,
#                     },
#                     'engineering_demand_par': {'choices': True},
#                     'qrs_analytical': {'choices': True},
#                     'qrs_empirical': {'choices': True},
#                 },
#             },
#             'vulnerability_func': {
#                 'choices': True,
#                 'relations': {
#                     'analytical_model_info': {
#                         'choices': True,
#                         'relations': ('analysis_type',
#                                       'evaluation_of_im', )
#                     },
#                     'empirical_model_info': {'choices': True},
#                     'stat_info': {
#                         'choices': True,
#                         'relations': ('stat_model',
#                                       'stat_model_fitting_method',
#                                       'model_fitting_method_assumptions',
#                                       'fit_assessment_goodness',
#                                       'proc_constr_conf_int',
#                                       'proc_constr_pred_int', )
#                     },
#                     'predictor_var': {'choices': True},
#                     'func_distr_vuln_discr': {'choices': True},
#                     'func_distr_vuln_cont': {
#                         'choices': True,
#                     },
#                     'qrs_analytical': {'choices': True},
#                     'qrs_empirical': {'choices': True},
#                 }
#             },
#             'damage_to_loss_func': {
#                 'choices': True,
#                 'relations': {
#                     'analytical_model_info': {
#                         'choices': True,
#                         'relations': ('analysis_type',
#                                       'evaluation_of_im', )
#                     },
#                     'empirical_model_info': {'choices': True},
#                     'stat_info': {
#                         'choices': True,
#                         'relations': ('stat_model',
#                                       'stat_model_fitting_method',
#                                       'model_fitting_method_assumptions',
#                                       'fit_assessment_goodness',
#                                       'proc_constr_conf_int',
#                                       'proc_constr_pred_int', )
#                     },
#                     'func_distr_dtl_discr': {
#                         'choices': True,
#                     },
#                 }
#             },
#             'capacity_curve_func': {
#                 'choices': True,
#                 'relations': {
#                     'cc_analytical_model_info': {
#                         'choices': True,
#                         'relations': ('analysis_type', )
#                     },
#                     'empirical_model_info': {'choices': True},
#                     'stat_info': {
#                         'choices': True,
#                         'relations': ('stat_model',
#                                       'stat_model_fitting_method',
#                                       'model_fitting_method_assumptions',
#                                       'fit_assessment_goodness',
#                                       'proc_constr_conf_int',
#                                       'proc_constr_pred_int', )
#                     },
#                     'cc_predictor_var': {
#                         'choices': True,
#                         'relations': ('engineering_demand_param', )
#                     },
#                 }
#             },
#             'taxonomy_type': {'choices': True},
#             'geo_applicability': {
#                 'choices': True,
#                 'relations': {
#                     'countries': {
#                         'excludes': ('the_geom', ),
#                     }
#                 },
#             },
#         })

#     edit_enabled = (gi.is_owned_by(request.user)
#                 or request.user.is_superuser
#                 or request.user.groups.filter(name='vulnerability-admins').count())
#     return (gi.name, edit_enabled, gi.type_of_assessment, gi_json[1:-1])


# def show_general_information(request, gen_info_id):
#     page_title, edit_enabled, type_of_assessment, gi_json = (
#         general_information_serialize(request, gen_info_id))

#     return render_to_response(
#         'vulnerability/show_general_information.html',
#         dict(general_information=gi_json,
#              page_title=page_title,
#              type_of_assessment=type_of_assessment,
#              curve_id=gen_info_id,
#              edit_enabled=edit_enabled),
#         context_instance=RequestContext(request))


# def general_information_json_get(request, gen_info_id):
#     page_title, edit_enabled, type_of_assessment, gi_json = (
#         general_information_serialize(request, gen_info_id))

#     return HttpResponse(json.dumps(gi_json), content_type="application/json")


# class FuncDistrShapeException(Exception):
#     pass


# class IntensityMeasureTypeException(Exception):
#     pass


# def normalize_measurement(iml_orig_type, iml_orig_unit):
#     iml_k = 1.0
#     if iml_orig_type in (IMT.PGA, IMT.SAT):
#         if iml_orig_unit == IMU.CM_S2:
#             iml_k = (1.0 / 980.665)
#         elif iml_orig_unit == IMU.M_S2:
#             iml_k = (1.0 / 9.80665)
#         elif iml_orig_unit != IMU.G:
#             raise ValueError
#         imlUnit = "g"

#     elif iml_orig_type == IMT.PGV:
#         if iml_orig_unit == IMU.M_S:
#             iml_k = 100.0
#         elif iml_orig_unit != IMU.CM_S:
#             raise ValueError
#         imlUnit = "cm/s"

#     elif iml_orig_type == IMT.PGD:
#         if iml_orig_unit == IMU.M:
#             iml_k = 100.0
#         elif iml_orig_unit != IMU.CM:
#             raise ValueError
#         imlUnit = "cm"

#     elif iml_orig_type == IMT.IA:
#         if iml_orig_unit == IMU.CM_S:
#             iml_k = 0.01
#         elif iml_orig_unit != IMU.M_S:
#             raise ValueError
#         imlUnit = "m/s"

#     elif iml_orig_type == IMT.CAV:
#         if iml_orig_unit != IMU.GS:
#             raise ValueError
#         imlUnit = "g-s"

#     elif iml_orig_type == IMT.RSD:
#         if iml_orig_unit != IMU.S:
#             raise ValueError
#         imlUnit = "s"

#     elif iml_orig_type == IMT.MMI:
#         if iml_orig_unit != IMU.ROMAN:
#             raise ValueError
#         imlUnit = "Roman numbers"
#     else:
#         raise ValueError

#     return (iml_k, imlUnit)


# def msd2sigmu(mean, stddev):
#     """
#     from mean and stddev to sigma and mu
#     """
#     variance = stddev ** 2.0
#     meansqua = mean ** 2.0
#     sigma = numpy.sqrt(numpy.log((variance / meansqua) + 1.0))
#     mu    = meansqua / numpy.sqrt(variance + meansqua)
#     return (sigma, mu)


# def _stream_vuln_discr_data(func_obj):
#     root = etree.Element("nrml",
#                          nsmap=SERIALIZE_NS_MAP)
#     vumo = etree.SubElement(root, "vulnerabilityModel")

#     resp_var = func_obj.vulnerability_func.resp_var

#     if resp_var in (RV.DF, RV.DEF):
#         asset_category = 'buildings'
#         loss_category = 'economic_loss'
#     elif resp_var in (RV.FRPO, RV.NFIRPO, RV.FRPEP):
#         asset_category = 'occupants'
#         loss_category = 'fatalities'
#     else:
#         raise ValueError

#     # NOTE: we are using a fix general name to describe the group (just one currently) of curves
#     dvs = etree.SubElement(vumo,
#                            "discreteVulnerabilitySet",
#                            vulnerabilitySetID="Vulnerability from GVD: set of functions",
#                            assetCategory=asset_category,
#                            lossCategory=loss_category)

#     imt_idx = int(func_obj.vulnerability_func.predictor_var.intensity_measure_type)
#     imts = dict((k, v) for k, v in INTENSITY_MEASURE_TYPES)
#     imt = imts[str(imt_idx)]
#     if imt_idx == IMT.SDT:
#         raise IntensityMeasureTypeException(imt)
#     if imt_idx == IMT.PGA:
#         noDamageLimit = '0.05'
#     elif imt_idx == IMT.PGV:
#         noDamageLimit = '1'
#     elif imt_idx in (IMT.PGD, IMT.SAT, IMT.IA, IMT.CAV):
#         noDamageLimit = '0.01'
#         if imt_idx == IMT.SAT:
#             period = func_obj.vulnerability_func.predictor_var.period
#             imt = imt.replace('T', str(period))
#     elif imt_idx == IMT.RSD:
#         noDamageLimit = '3'
#     elif imt_idx == IMT.MMI:
#         noDamageLimit = '4'
#     else:
#         raise IntensityMeasureTypeException(imt)
#     iml_orig_type = int(func_obj.vulnerability_func.predictor_var.intensity_measure_type)
#     iml_orig_unit = int(func_obj.vulnerability_func.predictor_var.intensity_measure_unit)

#     if iml_orig_type == IMT.SDT:
#         raise ValueError

#     # NOTE: Those two fields are going to be set as mandatory
#     maxIML = func_obj.vulnerability_func.predictor_var.maximum_im
#     minIML = func_obj.vulnerability_func.predictor_var.minimum_im

#     (iml_k, imlUnit) = normalize_measurement(iml_orig_type, iml_orig_unit)

#     # discrete and continuous omogenisation
#     if func_obj.vulnerability_func.func_distr_type == FDT.CONTINUOUS:
#         if func_obj.vulnerability_func.func_distr_vuln_cont.discretization_data_pts_num:
#             discr_pts_n = func_obj.vulnerability_func.func_distr_vuln_cont.discretization_data_pts_num
#         else:
#             discr_pts_n = 50

#         func_distr_shape = func_obj.vulnerability_func.func_distr_vuln_cont.func_distr_shape

#         if func_distr_shape in [FDS.LOGNORMAL, FDS.BETA]:
#             x = numpy.linspace(minIML, maxIML, num=discr_pts_n) # values for x-axis

#             (lr_sigma, lr_mu) = msd2sigmu(
#                 func_obj.vulnerability_func.func_distr_vuln_cont.mean,
#                 func_obj.vulnerability_func.func_distr_vuln_cont.std_dev)

#             if (func_obj.vulnerability_func.func_distr_vuln_cont.mean_var_coef and
#                 func_obj.vulnerability_func.func_distr_vuln_cont.sd_var_coef):
#                 (cov_sigma, cov_mu) = msd2sigmu(
#                     func_obj.vulnerability_func.func_distr_vuln_cont.mean_var_coef,
#                     func_obj.vulnerability_func.func_distr_vuln_cont.sd_var_coef)
#             else:
#                 cov_mu = None
#                 cov_sigma = None

#             if func_distr_shape == FDS.LOGNORMAL:
#                 iml_vals =   ' '.join("%.3f" % (x_cur * iml_k) for x_cur in x)
#                 loss_ratio = ' '.join("%.3f" % y for y in stats.lognorm.cdf(x, lr_sigma, scale=lr_mu))
#                 if cov_sigma is not None:
#                     cov    = ' '.join("%.3f" % y for y in stats.lognorm.cdf(x, cov_sigma, scale=cov_mu))
#                 else:
#                     cov = None
#             elif func_distr_shape == FDS.BETA:
#                 raise ValueError('Beta distribution shape currently not supported.')
#         else:
#             raise ValueError('unknown distribution shape')
#     else: # if func_obj.vulnerability_func.func_distr_type == FDT.CONTINUOUS:
#         func_distr_shape = func_obj.vulnerability_func.func_distr_vuln_discr.func_distr_shape
#         iml_vals = func_obj.vulnerability_func.func_distr_vuln_discr.predictor_var_im_val.replace(';', ' ')
#         discr_pts_n = func_obj.vulnerability_func.func_distr_vuln_discr.data_pts_num

#         # NOTE:
#         #  currently we have 2 names described by the same definition:
#         #  'loss_ratio' and 'resp_var_mean_val' in the near future we
#         #  might sanitize this ambiguity.
#         #  The same for 'cov' (coefficients of variation) and
#         #  'resp_var_val_coeff'.
#         loss_ratio = func_obj.vulnerability_func.func_distr_vuln_discr.resp_var_mean_val.replace(';', ' ')

#         cov = None
#         if func_obj.vulnerability_func.func_distr_vuln_discr.resp_var_val_coeff:
#             cov = func_obj.vulnerability_func.func_distr_vuln_discr.resp_var_val_coeff.replace(';', ' ')

#     iml = etree.SubElement(
#         dvs, "IML",
#         IMT=imt,
#         imlUnit=imlUnit,
#         maxIML=str(maxIML * iml_k),
#         minIML=str(minIML * iml_k)
#         ).text = iml_vals


#     dv = etree.SubElement(vumo,
#                           "discreteVulnerability",
#                           vulnerabilityFunctionID=func_obj.name,
#                           probabilisticDistribution=(dict(FUNC_DISTR_SHAPES_ALL)[func_distr_shape]))
#     lr = etree.SubElement(dv, "lossRatio")
#     lr.text = loss_ratio
#     if cov:
#         cv = etree.SubElement(dv, "coefficientsVariation")
#         cv.text = cov

#     return etree.tostring(
#         root, pretty_print=True, xml_declaration=True, encoding="UTF-8")

# def _stream_frag_discr_data(func_obj):
#     root = etree.Element("nrml",
#                          nsmap=SERIALIZE_NS_MAP)
#     frmo = etree.SubElement(root, "fragilityModel", format="discrete")

#     desc = etree.SubElement(frmo, "description")
#     # NOTE: We are currently using a prefix plus the function name, but in the
#     # future we are going to have more than one function in the same NRML file
#     # and this tag will contain a general description of the set of curves
#     desc.text = 'Fragility from GVD: %s' % func_obj.name

#     lims = etree.SubElement(frmo, "limitStates")
#     lims.text = func_obj.fragility_func.limit_states_desc.replace(";", " ")

#     imt_idx = int(func_obj.fragility_func.predictor_var.intensity_measure_type)
#     imts = dict((k, v) for k, v in INTENSITY_MEASURE_TYPES)
#     imt = imts[str(imt_idx)]
#     if imt_idx == IMT.SDT:
#         raise IntensityMeasureTypeException(imt)
#     if imt_idx == IMT.PGA:
#         noDamageLimit = '0.05'
#     elif imt_idx == IMT.PGV:
#         noDamageLimit = '1'
#     elif imt_idx in (IMT.PGD, IMT.SAT, IMT.IA, IMT.CAV):
#         noDamageLimit = '0.01'
#         if imt_idx == IMT.SAT:
#             period = func_obj.fragility_func.predictor_var.period
#             imt = imt.replace('T', str(period))
#     elif imt_idx == IMT.RSD:
#         noDamageLimit = '3'
#     elif imt_idx == IMT.MMI:
#         noDamageLimit = '4'
#     else:
#         raise IntensityMeasureTypeException(imt)
#     ffs = etree.SubElement(
#         frmo, "ffs", noDamageLimit=noDamageLimit)

#     tax = etree.SubElement(ffs, "taxonomy")
#     # NOTE: The structure of the XML will be changed and the taxonomy tag will
#     # be replaced by the name. Currently, we are already using the taxonomy
#     # tag improperly, storing the name of the function inside it.
#     # tax.text = func_obj.taxonomy_text
#     tax.text = func_obj.name

#     iml_orig_type = int(func_obj.fragility_func.predictor_var.intensity_measure_type)
#     iml_orig_unit = int(func_obj.fragility_func.predictor_var.intensity_measure_unit)

#     if iml_orig_type == IMT.SDT:
#         raise ValueError

#     # NOTE: Those two fields are going to be set as mandatory
#     maxIML = func_obj.fragility_func.predictor_var.maximum_im
#     minIML = func_obj.fragility_func.predictor_var.minimum_im

#     (iml_k, imlUnit) = normalize_measurement(iml_orig_type, iml_orig_unit)

#     iml = etree.SubElement(
#         ffs, "IML",
#         IMT=imt,
#         imlUnit=imlUnit,
#         maxIML=str(maxIML * iml_k),
#         minIML=str(minIML * iml_k)
#         ).text = func_obj.fragility_func.func_distr_frag_discr.predictor_var_im_val.replace(';', ' ')

#     for i, ls in enumerate(
#             func_obj.fragility_func.limit_states_desc.split(';')):
#         ffd = etree.SubElement(ffs, "ffd", ls=ls)
#         poEs = etree.SubElement(ffd, "poEs")
#         lspe = func_obj.fragility_func.func_distr_frag_discr.limit_state_prob_exceed
#         lspe_i = lspe.split('\n')[i]
#         lspe_i_spaces = lspe_i.replace(';', ' ')
#         poEs.text = lspe_i_spaces

#     return etree.tostring(
#         root, pretty_print=True, xml_declaration=True, encoding="UTF-8")


# def _stream_frag_cont_data(func_obj):
#     root = etree.Element("nrml",
#                          nsmap=SERIALIZE_NS_MAP)
#     frmo = etree.SubElement(root, "fragilityModel", format="continuous")

#     desc = etree.SubElement(frmo, "description")
#     # NOTE: We are currently using a prefix plus the function name, but in the
#     # future we are going to have more than one function in the same NRML file
#     # and this tag will contain a general description of the set of curves
#     desc.text = 'Fragility from GVD: %s' % func_obj.name

#     lims = etree.SubElement(frmo, "limitStates")
#     lims.text = func_obj.fragility_func.limit_states_desc.replace(";", " ")

#     func_distr_shape_id = func_obj.fragility_func.func_distr_frag_cont.func_distr_shape
#     func_distr_shape = dict(FUNC_DISTR_SHAPES_ALL)[func_distr_shape_id].lower()
#     if func_distr_shape != "lognormal":
#         raise FuncDistrShapeException(func_distr_shape)

#     imt_idx = int(func_obj.fragility_func.predictor_var.intensity_measure_type)
#     imts = dict((k, v) for k, v in INTENSITY_MEASURE_TYPES)
#     imt = imts[str(imt_idx)]
#     if imt_idx == IMT.SDT:
#         raise IntensityMeasureTypeException(imt)
#     if imt_idx == IMT.PGA:
#         noDamageLimit = '0.05'
#     elif imt_idx == IMT.PGV:
#         noDamageLimit = '1'
#     elif imt_idx in (IMT.PGD, IMT.SAT, IMT.IA, IMT.CAV):
#         noDamageLimit = '0.01'
#         if imt_idx == IMT.SAT:
#             period = func_obj.fragility_func.predictor_var.period
#             imt = imt.replace('T', str(period))
#     elif imt_idx == IMT.RSD:
#         noDamageLimit = '3'
#     elif imt_idx == IMT.MMI:
#         noDamageLimit = '4'
#     else:
#         raise IntensityMeasureTypeException(imt)
#     ffs = etree.SubElement(
#         frmo, "ffs", noDamageLimit=noDamageLimit, type=func_distr_shape)

#     tax = etree.SubElement(ffs, "taxonomy")
#     # NOTE: The structure of the XML will be changed and the taxonomy tag will
#     # be replaced by the name. Currently, we are already using the taxonomy
#     # tag improperly, storing the name of the function inside it.
#     # tax.text = func_obj.taxonomy_text
#     tax.text = func_obj.name

#     iml_orig_type = int(func_obj.fragility_func.predictor_var.intensity_measure_type)
#     iml_orig_unit = int(func_obj.fragility_func.predictor_var.intensity_measure_unit)

#     if iml_orig_type == IMT.SDT:
#         raise ValueError

#     maxIML = func_obj.fragility_func.predictor_var.maximum_im
#     minIML = func_obj.fragility_func.predictor_var.minimum_im

#     (iml_k, imlUnit) = normalize_measurement(iml_orig_type, iml_orig_unit)

#     iml = etree.SubElement(
#         ffs, "IML",
#         IMT=imt,
#         imlUnit=imlUnit,
#         maxIML=str(maxIML * iml_k),
#         minIML=str(minIML * iml_k))
#     mean_arr = func_obj.fragility_func.func_distr_frag_cont.mean.split(';')
#     stddev_arr = func_obj.fragility_func.func_distr_frag_cont.std_dev.split(';')
#     for i, ls in enumerate(
#             func_obj.fragility_func.limit_states_desc.split(';')):
#         ffc = etree.SubElement(ffs, "ffc", ls=ls)
#         params = etree.SubElement(ffc, "params")
#         params.attrib['mean'] = mean_arr[i]
#         params.attrib['stddev'] = stddev_arr[i]



#     return etree.tostring(
#         root, pretty_print=True, xml_declaration=True, encoding="UTF-8")


# def func_export_as_nrml(request, gen_info_id):
#     try:
#         func_obj = GeneralInformation.objects.get(pk=gen_info_id)
#     except:
#         return HttpResponseNotFound(
#             '<h1>Item with id %d not found</h1>' % gen_info_id)

#     content_disp = 'attachment; filename="%s.xml"' % slugify(func_obj.name)
#     mimetype = 'text/plain'

#     toa_idx = func_obj.type_of_assessment
#     toas = dict((k, v) for k, v in TYPES_OF_ASSESSMENT)
#     toa = toas[toa_idx]
#     if toa_idx not in (TA.FRAGILITY, TA.VULNERABILITY):
#         return HttpResponseNotFound(
#             '<h1>Export unavailable for type of assessment "%s"</h1>' % toa)

#     fdts = dict((k, v) for k, v in FUNC_DISTR_TYPES)
#     if toa_idx == TA.FRAGILITY:
#         fdt_idx = func_obj.fragility_func.func_distr_type
#         fdt = fdts[fdt_idx]

#         try:
#             if fdt_idx == FDT.CONTINUOUS:
#                 response_data = _stream_frag_cont_data(func_obj)
#             else:
#                 response_data = _stream_frag_discr_data(func_obj)
#         except FuncDistrShapeException as e:
#             return HttpResponseNotFound(
#                 '<h1>Function distribution shape "%s" not supported.</h1>' % e)
#         except IntensityMeasureTypeException as e:
#             return HttpResponseNotFound(
#                 '<h1>Intensity measure type "%s" not supported.</h1>' % e)

#     else:  # VULNERABILITY
#         response_data = _stream_vuln_discr_data(func_obj)

#     response = HttpResponse(response_data, mimetype=mimetype)
#     response['Content-Disposition'] = content_disp
#     return response
