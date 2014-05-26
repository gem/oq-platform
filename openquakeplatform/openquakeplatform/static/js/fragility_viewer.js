/*
   Copyright (c) 2014, GEM Foundation.

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU Affero General Public License as
      published by the Free Software Foundation, either version 3 of the
      License, or (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Affero General Public License for more details.

      You should have received a copy of the GNU Affero General Public License
      along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.
*/

/////////////////////////////////
//////// Jquery Stuff ///////////
/////////////////////////////////

// Remove GeoNode artifact
$(".span12").remove();

$(function() {
    $("#fraAccordion").accordion({
        collapsible: true
    });
});

/////////////////////////////////
////// Fragility Information ////
/////////////////////////////////
// the json to be expected from the other app

// old file
//Continuous
//var jsonObj = {"pk": 1, "model": "vulnerability.generalinformation", "fields": {"category": "Structure class", "article_title": "Reinforced concrete buildings", "name": "RC_LR_High_code", "publication_conference_name": "RISK-UE", "fragility_func": {"pk": 1, "model": "vulnerability.fragilityfunc", "fields": {"analytical_model_info": {"pk": 1, "model": "vulnerability.analyticalmodelinfo", "fields": {"damage_to_loss_func": null, "capacity_curve_func": null, "fragility_func": 1, "model_type": "2D element-by-element", "vulnerability_func": null, "analysis_type": {"pk": 1, "model": "vulnerability.analysistype", "fields": {"name": "Nonlinear dynamic analysis (NLD)"}}, "method_uncert_propag": "Random Monte-Carlo or Latin Hypercube sampling", "models_num": null}}, "func_distr_frag_cont": {"pk": 1, "model": "vulnerability.funcdistrfragcont", "fields": {"coeff_variation_std_dev": "", "predictor_var_corr_matrix": "", "fragility_func": 1, "coeff_variation_mean": "", "std_dev": "0.006; 0.064; 0.140; 0.215; 0.277", "func_distr_shape": {"pk": 1, "model": "vulnerability.funcdistrshape", "fields": {"name": "Lognormal"}}, "mean": "0.008; 0.076; 0.166; 0.255; 0.328"}}, "general_information": 1, "qrs_analytical": {"pk": 1, "model": "vulnerability.qrsanalytical", "fields": {"structural_details": "Average", "documentation_quality": "Superior", "hazard_model": "Average", "model_completeness": "Superior", "documentation_type": "Superior", "fragility_func": 1, "site_specific": "Average", "vulnerability_func": null, "seismic_demand": "Average", "typology_repr": "Superior", "overall_rating": null}}, "predictor_var": {"pk": 1, "model": "vulnerability.predictorvar", "fields": {"minimum_im": 0.0, "intensity_measure_type": "PGA", "fragility_func": 1, "vulnerability_func": null, "maximum_im": null, "intensity_measure_unit": "Acceleration (g)", "evaluation_of_im": "Natural Accelerograms"}}, "limit_states_desc": "DS1; DS2; DS3; DS4; DS5", "damage_scale": "EMS98", "engineering_demand_par": {"pk": 1, "model": "vulnerability.engineeringdemandpar", "fields": {"name": "Interstory drift"}}, "method_of_estimation": "Analytical", "func_distr_type": "Continuous", "limit_states_num": 5}}, "type_of_assessment": "Fragility", "year": 2003, "web_link": "", "general_comments": "Sample Data: earthquake damaged greek buildings + a large number of building types are modeled and analysed. Seismic Hazard: real earthquakes (1978 Thessaloniki earthquake) and 16 accelerograms.", "use_case_information": "", "authors": "Kappos et al.", "taxonomy_type": {"pk": 1, "model": "vulnerability.taxonomytype", "fields": {"name": "PAGER"}}, "taxonomy_text": "C1L"}};

// deiscrete
//old
//var jsonObj = {"pk": 1, "model": "vulnerability.generalinformation", "fields": {"category": "Structure class", "article_title": "Fragility functions for low rise ordinary buildings in GEM", "fragility_func": {"pk": 1, "model": "vulnerability.fragilityfunc", "fields": {"analytical_model_info": {"pk": 1, "model": "vulnerability.analyticalmodelinfo", "fields": {"damage_to_loss_func": null, "capacity_curve_func": null, "evaluation_of_im": null, "fragility_func": 1, "model_type": null, "vulnerability_func": null, "analysis_type": {"pk": 3, "model": "vulnerability.analysistype", "fields": {"user_def": false, "name": "NLS without dispersion"}}, "method_uncert_propag": null, "models_num": null}}, "func_distr_frag_discr": {"pk": 1, "model": "vulnerability.funcdistrfragdiscr", "fields": {"limit_state_prob_exceed": "0.000;0.013;0.130;0.314;0.489;0.628;0.731;0.806;0.859;0.896;0.923;0.943;0.957;0.967;0.975;0.981;0.985;0.988;0.991;0.993;0.994\n0.000;0.000;0.014;0.061;0.138;0.231;0.328;0.420;0.504;0.579;0.643;0.698;0.744;0.783;0.816;0.844;0.867;0.887;0.903;0.917;0.929\n0.000;0.000;0.000;0.003;0.011;0.026;0.048;0.078;0.114;0.154;0.198;0.242;0.288;0.332;0.376;0.418;0.459;0.497;0.533;0.567;0.599\n0.000;0.000;0.000;0.000;0.000;0.001;0.003;0.006;0.011;0.018;0.026;0.037;0.050;0.064;0.080;0.098;0.117;0.137;0.157;0.179;0.201", "limit_state_prob_exceed_95": "", "fragility_func": 1, "predictor_var_im_val": "0.010;0.050;0.100;0.150;0.200;0.250;0.300;0.350;0.400;0.450;0.500;0.550;0.600;0.650;0.700;0.750;0.800;0.850;0.900;0.950;1.000", "limit_state_prob_exceed_05": "", "data_pts_num": 21}}, "general_information": 1, "predictor_var": {"pk": 1, "model": "vulnerability.predictorvar", "fields": {"type_of_period": null, "intensity_measure_type": "1", "minimum_im": null, "fragility_func": 1, "period": null, "vulnerability_func": null, "maximum_im": 1.2, "intensity_measure_unit": "1"}}, "limit_states_desc": "Slight;Moderate;Extensive;Collapse", "damage_scale": "HAZUS", "engineering_demand_par": null, "method_of_estimation": "Analytical", "func_distr_type": "Discrete"}}, "name": "Example_Discrete_FF", "publication_conference_name": "GEM newsletter", "llrs": null, "material": null, "year": 20111, "web_link": "", "general_comments": "Description of case studies. This is an example about GEM global vulnerability database", "geo_applicability": {"pk": 1, "model": "vulnerability.geoapplicability", "fields": {"general_information": 1, "countries": [{"pk": 340, "model": "vulnerability.country", "fields": {"is_visible": false, "region": 1, "the_geom": null, "name": "Worldwide", "iso3": ""}}], "area": "", "lon": null, "address": "", "lat": null}}, "authors": "T., Lee and Y., Zang", "use_case_information": "The idea is to test the graphical interface for a Discrete Fragility Function", "structure_type": "Building", "taxonomy_gem": "", "type_of_assessment": "Fragility", "taxonomy_type": {"pk": 2, "model": "vulnerability.taxonomytype", "fields": {"user_def": false, "name": "PAGER"}}, "taxonomy_text": "C1L"}};
//new
//Test01_FF_Analytical_Discrete_Simplest LGTM
//var jsonObj = {"pk": 2, "model": "vulnerability.generalinformation", "fields": {"category": "Structure specific", "article_title": "Fragility functions for low rise ordinary buildings in the Mediterranian", "fragility_func": {"pk": 2, "model": "vulnerability.fragilityfunc", "fields": {"func_distr_frag_discr": {"pk": 4, "model": "vulnerability.funcdistrfragdiscr", "fields": {"limit_state_prob_exceed": "0.000;0.013;0.130;0.314;0.489;0.628;0.731;0.806;0.859;0.896;0.923;0.943;0.957;0.967;0.975;0.981;0.985;0.988;0.991;0.993;0.994\n0.000;0.000;0.014;0.061;0.138;0.231;0.328;0.420;0.504;0.579;0.643;0.698;0.744;0.783;0.816;0.844;0.867;0.887;0.903;0.917;0.929\n0.000;0.000;0.000;0.003;0.011;0.026;0.048;0.078;0.114;0.154;0.198;0.242;0.288;0.332;0.376;0.418;0.459;0.497;0.533;0.567;0.599\n0.000;0.000;0.000;0.000;0.000;0.001;0.003;0.006;0.011;0.018;0.026;0.037;0.050;0.064;0.080;0.098;0.117;0.137;0.157;0.179;0.201", "limit_state_prob_exceed_95": "", "fragility_func": 2, "predictor_var_im_val": "0.010;0.050;0.100;0.150;0.200;0.250;0.300;0.350;0.400;0.450;0.500;0.550;0.600;0.650;0.700;0.750;0.800;0.850;0.900;0.950;1.000", "limit_state_prob_exceed_05": "", "data_pts_num": 21}}, "general_information": 2, "predictor_var": {"pk": 2, "model": "vulnerability.predictorvar", "fields": {"type_of_period": null, "intensity_measure_type": "1", "minimum_im": null, "fragility_func": 2, "period": null, "vulnerability_func": null, "maximum_im": null, "intensity_measure_unit": "1"}}, "limit_states_desc": "Slight;Moderate;Extensive;Collapse", "damage_scale": null, "engineering_demand_par": null, "method_of_estimation": "Analytical", "func_distr_type": "Discrete"}}, "name": "Test01_FF_Analytical_Discrete_Simplest", "publication_conference_name": "GEM newsletter", "llrs": null, "material": null, "year": 2007, "web_link": "", "general_comments": "This is an example about GEM global vulnerability database.\r\nThe idea is to test the graphical user interface for a Discrete Fragility Function using the minimum information required in the platform", "geo_applicability": {"pk": 2, "model": "vulnerability.geoapplicability", "fields": {"general_information": 2, "countries": [{"pk": 66, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 7, "name": "Greece", "iso3": "GRC"}}, {"pk": 86, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 7, "name": "Italy", "iso3": "ITA"}}], "area": "", "lon": null, "address": "", "lat": null}}, "authors": "A. J. Kappos, C.Panagiotopoulos, G. Panagopoulos, El. Papadopoulos.", "use_case_information": "", "structure_type": "Building", "taxonomy_gem": "C1L", "type_of_assessment": "Fragility", "taxonomy_type": {"pk": 2, "model": "vulnerability.taxonomytype", "fields": {"user_def": false, "name": "PAGER"}}, "taxonomy_text": "C1L"}};

//Test02_FF_Analytical_Discrete_Complete LGTM
//var jsonObj = {"pk": 3, "model": "vulnerability.generalinformation", "fields": {"category": "Structure specific", "article_title": "Fragility functions for low rise ordinary buildings in Greece", "fragility_func": {"pk": 3, "model": "vulnerability.fragilityfunc", "fields": {"analytical_model_info": {"pk": 2, "model": "vulnerability.analyticalmodelinfo", "fields": {"evaluation_of_im": 3, "capacity_curve_func": null, "fragility_func": 3, "model_type": "2D element-by-element", "vulnerability_func": null, "analysis_type": {"pk": 2, "model": "vulnerability.analysistype", "fields": {"user_def": false, "name": "Nonlinear static analysis (NLS) with dispersion"}}, "method_uncert_propag": "Random Monte-Carlo or Latin Hypercube sampling", "models_num": null}}, "func_distr_frag_discr": {"pk": 3, "model": "vulnerability.funcdistrfragdiscr", "fields": {"limit_state_prob_exceed": "0.000;0.013;0.130;0.314;0.489;0.628;0.731;0.806;0.859;0.896;0.923;0.943;0.957;0.967;0.975;0.981;0.985;0.988;0.991;0.993;0.994\n0.000;0.000;0.014;0.061;0.138;0.231;0.328;0.420;0.504;0.579;0.643;0.698;0.744;0.783;0.816;0.844;0.867;0.887;0.903;0.917;0.929\n0.000;0.000;0.000;0.003;0.011;0.026;0.048;0.078;0.114;0.154;0.198;0.242;0.288;0.332;0.376;0.418;0.459;0.497;0.533;0.567;0.599\n0.000;0.000;0.000;0.000;0.000;0.001;0.003;0.006;0.011;0.018;0.026;0.037;0.050;0.064;0.080;0.098;0.117;0.137;0.157;0.179;0.201", "limit_state_prob_exceed_95": "0.000;0.014;0.143;0.346;0.538;0.691;0.805;0.886;0.944;0.986;1.016;1.037;1.053;1.064;1.073;1.079;1.084;1.087;1.090;1.092;1.094\n0.000;0.001;0.016;0.067;0.151;0.254;0.360;0.462;0.555;0.637;0.707;0.767;0.819;0.862;0.898;0.928;0.954;0.976;0.994;1.009;1.022\n0.000;0.000;0.000;0.003;0.012;0.028;0.053;0.086;0.126;0.170;0.217;0.267;0.316;0.366;0.414;0.460;0.505;0.547;0.587;0.624;0.659\n0.000;0.000;0.000;0.000;0.000;0.001;0.003;0.007;0.012;0.019;0.029;0.041;0.055;0.070;0.088;0.108;0.128;0.150;0.173;0.197;0.221", "fragility_func": 3, "predictor_var_im_val": "0.010;0.050;0.100;0.150;0.200;0.250;0.300;0.350;0.400;0.450;0.500;0.550;0.600;0.650;0.700;0.750;0.800;0.850;0.900;0.950;1.000", "limit_state_prob_exceed_05": "0.000;0.010;0.104;0.251;0.391;0.503;0.585;0.645;0.687;0.717;0.739;0.754;0.766;0.774;0.780;0.785;0.788;0.791;0.793;0.794;0.795\n0.000;0.000;0.011;0.049;0.110;0.185;0.262;0.336;0.404;0.463;0.514;0.558;0.595;0.627;0.653;0.675;0.694;0.709;0.723;0.734;0.743\n0.000;0.000;0.000;0.002;0.008;0.020;0.039;0.063;0.091;0.124;0.158;0.194;0.230;0.266;0.301;0.335;0.367;0.398;0.427;0.454;0.479\n0.000;0.000;0.000;0.000;0.000;0.001;0.002;0.005;0.009;0.014;0.021;0.030;0.040;0.051;0.064;0.078;0.093;0.109;0.126;0.143;0.161", "data_pts_num": 21}}, "general_information": 3, "predictor_var": {"pk": 3, "model": "vulnerability.predictorvar", "fields": {"type_of_period": null, "intensity_measure_type": "1", "minimum_im": null, "fragility_func": 3, "period": null, "vulnerability_func": null, "maximum_im": null, "intensity_measure_unit": "1"}}, "limit_states_desc": "Slight;Moderate;Extensive;Collapse", "damage_scale": null, "engineering_demand_par": null, "method_of_estimation": "Analytical", "func_distr_type": "Discrete", "stat_info": {"pk": 1, "model": "vulnerability.statisticalinformation", "fields": {"stat_model": {"pk": 2, "model": "vulnerability.statmodel", "fields": {"user_def": false, "name": "Generalised Additive Models"}}, "fit_assessment_goodness": {"pk": 1, "model": "vulnerability.fitassessmentgoodness", "fields": {"user_def": false, "name": "Acceptable mean function"}}, "fragility_func": 3, "stat_model_fitting_method": {"pk": 2, "model": "vulnerability.statmodelfittingmethod", "fields": {"user_def": false, "name": "Maximum likelyhood"}}, "vulnerability_func": null, "proc_constr_pred_int": {"pk": 3, "model": "vulnerability.procconstrint", "fields": {"user_def": false, "name": "Bayesian"}}, "model_fitting_method_assumptions": 1, "proc_constr_conf_int": {"pk": 2, "model": "vulnerability.procconstrint", "fields": {"user_def": false, "name": "Bootstrap"}}}}, "qrs_analytical": {"pk": 1, "model": "vulnerability.qrsanalytical", "fields": {"structural_details": "Superior", "documentation_quality": "Average", "hazard_model": null, "model_completeness": "Marginal", "documentation_type": "Average", "fragility_func": 3, "sampling_method": "Marginal", "site_specific": null, "vulnerability_func": null, "limit_states_def": "Average", "seismic_demand": "Superior", "analysis_type": "Average", "typology_repr": null, "uncertainties_treatment": "Superior", "cross_validation": "NA"}}}}, "name": "Test02_FF_Analytical_Discrete_Complete", "publication_conference_name": "GEM newsletter", "llrs": null, "material": null, "year": 2011, "web_link": "", "general_comments": "This is an example about GEM global vulnerability database.\r\n", "geo_applicability": {"pk": 3, "model": "vulnerability.geoapplicability", "fields": {"general_information": 3, "countries": [{"pk": 66, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 7, "name": "Greece", "iso3": "GRC"}}, {"pk": 86, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 7, "name": "Italy", "iso3": "ITA"}}], "area": "", "lon": null, "address": "", "lat": null}}, "authors": "A. J. Kappos, C.Panagiotopoulos, G. Panagopoulos, El. Papadopoulos.", "use_case_information": "The idea is to test the graphical user interface for a Discrete Fragility Function using all the information available in the platform.\r\n", "structure_type": "Building", "taxonomy_gem": "C1L", "type_of_assessment": "Fragility", "taxonomy_type": {"pk": 2, "model": "vulnerability.taxonomytype", "fields": {"user_def": false, "name": "PAGER"}}, "taxonomy_text": "C1L"}};

//Test03_FF_Analytical_Continuous_Simplest LGTM
//var jsonObj = {"pk": 4, "model": "vulnerability.generalinformation", "fields": {"category": "Structure specific", "article_title": "Fragility functions for low rise ordinary buildings in the world", "fragility_func": {"pk": 4, "model": "vulnerability.fragilityfunc", "fields": {"func_distr_frag_cont": {"pk": 2, "model": "vulnerability.funcdistrfragcont", "fields": {"coeff_variation_std_dev": "", "predictor_var_corr_matrix": "", "fragility_func": 4, "coeff_variation_mean": "", "std_dev": "0.173;0.337;0.726;1.441", "func_distr_shape": {"pk": 1, "model": "vulnerability.funcdistrshape", "fields": {"user_def": false, "name": "Lognormal"}}, "mean": "0.248;0.484;1.041;2.066"}}, "general_information": 4, "predictor_var": {"pk": 4, "model": "vulnerability.predictorvar", "fields": {"type_of_period": null, "intensity_measure_type": "1", "minimum_im": null, "fragility_func": 4, "period": null, "vulnerability_func": null, "maximum_im": null, "intensity_measure_unit": "1"}}, "limit_states_desc": "Slight;Moderate;Extensive;Collapse", "damage_scale": "HAZUS", "engineering_demand_par": null, "method_of_estimation": "Analytical", "func_distr_type": "Continuous"}}, "name": "Test03_FF_Analytical_Continuous_Simplest", "publication_conference_name": "GEM newsletter", "llrs": null, "material": null, "year": 2007, "web_link": "", "general_comments": "This is an example about GEM global vulnerability database.\r\nThe idea is to test the graphical user interface for a Discrete Fragility Function using the minimum information required in the platform", "geo_applicability": {"pk": 4, "model": "vulnerability.geoapplicability", "fields": {"general_information": 4, "countries": [{"pk": 22, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 5, "name": "Bolivia", "iso3": "BOL"}}, {"pk": 32, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 3, "name": "Canada", "iso3": "CAN"}}, {"pk": 36, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 5, "name": "Chile", "iso3": "CHL"}}, {"pk": 51, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 5, "name": "Ecuador", "iso3": "ECU"}}, {"pk": 88, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 6, "name": "Japan", "iso3": "JPN"}}, {"pk": 117, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 6, "name": "Mongolia", "iso3": "MNG"}}, {"pk": 205, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 8, "name": "New Zealand", "iso3": "NZL"}}, {"pk": 166, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 5, "name": "Suriname", "iso3": "SUR"}}, {"pk": 200, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 6, "name": "China", "iso3": "CHN"}}, {"pk": 201, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 8, "name": "Australia", "iso3": "AUS"}}, {"pk": 202, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 3, "name": "United States", "iso3": "USA"}}], "area": "", "lon": null, "address": "", "lat": null}}, "authors": "A. J. Kappos, C.Panagiotopoulos, G. Panagopoulos, El. Papadopoulos.", "use_case_information": "", "structure_type": "Building", "taxonomy_gem": "C1L", "type_of_assessment": "Fragility", "taxonomy_type": {"pk": 2, "model": "vulnerability.taxonomytype", "fields": {"user_def": false, "name": "PAGER"}}, "taxonomy_text": "C1L"}};

//Test04_FF_Analytical_Continuous_Complete LGTM
//var jsonObj = {"pk": 5, "model": "vulnerability.generalinformation", "fields": {"category": "Structure specific", "article_title": "Fragility functions for low rise ordinary buildings in the world", "fragility_func": {"pk": 5, "model": "vulnerability.fragilityfunc", "fields": {"analytical_model_info": {"pk": 3, "model": "vulnerability.analyticalmodelinfo", "fields": {"evaluation_of_im": 6, "capacity_curve_func": null, "fragility_func": 5, "model_type": "1D", "vulnerability_func": null, "analysis_type": {"pk": 7, "model": "vulnerability.analysistype", "fields": {"user_def": true, "name": "Another method not defined in the literature"}}, "method_uncert_propag": "Single index building", "models_num": 109}}, "func_distr_frag_cont": {"pk": 3, "model": "vulnerability.funcdistrfragcont", "fields": {"coeff_variation_std_dev": "0.540;0.590;0.640;0.690", "predictor_var_corr_matrix": "", "fragility_func": 5, "coeff_variation_mean": "0.201;0.207;0.213;0.219", "std_dev": "0.173;0.337;0.726;1.441", "func_distr_shape": {"pk": 1, "model": "vulnerability.funcdistrshape", "fields": {"user_def": false, "name": "Lognormal"}}, "mean": "0.248;0.484;1.041;2.066"}}, "general_information": 5, "predictor_var": {"pk": 5, "model": "vulnerability.predictorvar", "fields": {"type_of_period": null, "intensity_measure_type": "1", "minimum_im": null, "fragility_func": 5, "period": null, "vulnerability_func": null, "maximum_im": null, "intensity_measure_unit": "1"}}, "limit_states_desc": "Slight;Moderate;Extensive;Collapse", "damage_scale": "HAZUS", "engineering_demand_par": {"pk": 1, "model": "vulnerability.engineeringdemandpar", "fields": {"user_def": false, "name": "Interstorey drift"}}, "method_of_estimation": "Analytical", "func_distr_type": "Continuous", "stat_info": {"pk": 2, "model": "vulnerability.statisticalinformation", "fields": {"stat_model": {"pk": 1, "model": "vulnerability.statmodel", "fields": {"user_def": false, "name": "Generalised Linear Models"}}, "fit_assessment_goodness": {"pk": 1, "model": "vulnerability.fitassessmentgoodness", "fields": {"user_def": false, "name": "Acceptable mean function"}}, "fragility_func": 5, "stat_model_fitting_method": {"pk": 3, "model": "vulnerability.statmodelfittingmethod", "fields": {"user_def": false, "name": "Robust maximum likelyhood"}}, "vulnerability_func": null, "proc_constr_pred_int": {"pk": 1, "model": "vulnerability.procconstrint", "fields": {"user_def": false, "name": "Asymptotic"}}, "model_fitting_method_assumptions": 3, "proc_constr_conf_int": {"pk": 2, "model": "vulnerability.procconstrint", "fields": {"user_def": false, "name": "Bootstrap"}}}}, "qrs_analytical": {"pk": 2, "model": "vulnerability.qrsanalytical", "fields": {"structural_details": "NA", "documentation_quality": "Marginal", "hazard_model": "Marginal", "model_completeness": "Average", "documentation_type": "Marginal", "fragility_func": 5, "sampling_method": "NA", "site_specific": "Marginal", "vulnerability_func": null, "limit_states_def": "Marginal", "seismic_demand": "Average", "analysis_type": "Average", "typology_repr": "Average", "uncertainties_treatment": "NA", "cross_validation": "NA"}}}}, "name": "Test04_FF_Analytical_Continuous_Complete", "publication_conference_name": "GEM newsletter", "llrs": null, "material": null, "year": 2007, "web_link": "", "general_comments": "This is an example about GEM global vulnerability database.\r\n", "geo_applicability": {"pk": 5, "model": "vulnerability.geoapplicability", "fields": {"general_information": 5, "countries": [{"pk": 7, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Antigua and Barbuda", "iso3": "ATG"}}, {"pk": 12, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Bahamas", "iso3": "BHS"}}, {"pk": 19, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Belize", "iso3": "BLZ"}}, {"pk": 16, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Barbados", "iso3": "BRB"}}, {"pk": 37, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Clipperton Island", "iso3": "C--"}}, {"pk": 42, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Costa Rica", "iso3": "CRI"}}, {"pk": 44, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Cuba", "iso3": "CUB"}}, {"pk": 49, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Dominica", "iso3": "DMA"}}, {"pk": 50, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Dominican Republic", "iso3": "DOM"}}, {"pk": 53, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "El Salvador", "iso3": "SLV"}}, {"pk": 68, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Grenada", "iso3": "GRD"}}, {"pk": 70, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Guatemala", "iso3": "GTM"}}, {"pk": 75, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Haiti", "iso3": "HTI"}}, {"pk": 76, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Honduras", "iso3": "HND"}}, {"pk": 87, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Jamaica", "iso3": "JAM"}}, {"pk": 144, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Saint Kitts and Nevis", "iso3": "KNA"}}, {"pk": 145, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Saint Lucia", "iso3": "LCA"}}, {"pk": 139, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Puerto Rico", "iso3": "PRI"}}, {"pk": 114, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Mexico", "iso3": "MEX"}}, {"pk": 124, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Nicaragua", "iso3": "NIC"}}, {"pk": 132, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Panama", "iso3": "PAN"}}, {"pk": 146, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Saint Vincent and the Grenadines", "iso3": "VCT"}}, {"pk": 179, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 4, "name": "Trinidad and Tobago", "iso3": "TTO"}}], "area": "", "lon": null, "address": "", "lat": null}}, "authors": "A. J. Kappos, C.Panagiotopoulos, G. Panagopoulos, El. Papadopoulos.", "use_case_information": "The idea is to test the graphical user interface for a Discrete Fragility Function using the maximum information available in the platform", "structure_type": "Building", "taxonomy_gem": "C1L", "type_of_assessment": "Fragility", "taxonomy_type": {"pk": 2, "model": "vulnerability.taxonomytype", "fields": {"user_def": false, "name": "PAGER"}}, "taxonomy_text": "C1L"}};

//Test05_FF_Empirical_Discrete_Simplest LGTM
//var jsonObj = {"pk": 6, "model": "vulnerability.generalinformation", "fields": {"category": "Structure specific", "article_title": "Fragility functions for low rise ordinary buildings in the Mediterranian", "fragility_func": {"pk": 6, "model": "vulnerability.fragilityfunc", "fields": {"func_distr_frag_discr": {"pk": 5, "model": "vulnerability.funcdistrfragdiscr", "fields": {"limit_state_prob_exceed": "0.000;0.013;0.130;0.314;0.489;0.628;0.731;0.806;0.859;0.896;0.923;0.943;0.957;0.967;0.975;0.981;0.985;0.988;0.991;0.993;0.994\n0.000;0.000;0.014;0.061;0.138;0.231;0.328;0.420;0.504;0.579;0.643;0.698;0.744;0.783;0.816;0.844;0.867;0.887;0.903;0.917;0.929\n0.000;0.000;0.000;0.003;0.011;0.026;0.048;0.078;0.114;0.154;0.198;0.242;0.288;0.332;0.376;0.418;0.459;0.497;0.533;0.567;0.599\n0.000;0.000;0.000;0.000;0.000;0.001;0.003;0.006;0.011;0.018;0.026;0.037;0.050;0.064;0.080;0.098;0.117;0.137;0.157;0.179;0.201", "limit_state_prob_exceed_95": "", "fragility_func": 6, "predictor_var_im_val": "0.010;0.050;0.100;0.150;0.200;0.250;0.300;0.350;0.400;0.450;0.500;0.550;0.600;0.650;0.700;0.750;0.800;0.850;0.900;0.950;1.000", "limit_state_prob_exceed_05": "", "data_pts_num": 21}}, "general_information": 6, "predictor_var": {"pk": 6, "model": "vulnerability.predictorvar", "fields": {"type_of_period": null, "intensity_measure_type": "1", "minimum_im": null, "fragility_func": 6, "period": null, "vulnerability_func": null, "maximum_im": null, "intensity_measure_unit": "1"}}, "limit_states_desc": "Slight;Moderate;Extensive;Collapse", "damage_scale": null, "engineering_demand_par": null, "method_of_estimation": "Empirical", "func_distr_type": "Discrete"}}, "name": "Test05_FF_Empirical_Discrete_Simplest", "publication_conference_name": "GEM newsletter", "llrs": null, "material": null, "year": 2007, "web_link": "", "general_comments": "This is an example about GEM global vulnerability database.\r\nThe idea is to test the graphical user interface for a Discrete Fragility Function using the minimum information required in the platform", "geo_applicability": {"pk": 6, "model": "vulnerability.geoapplicability", "fields": {"general_information": 6, "countries": [{"pk": 66, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 7, "name": "Greece", "iso3": "GRC"}}, {"pk": 86, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 7, "name": "Italy", "iso3": "ITA"}}], "area": "", "lon": null, "address": "", "lat": null}}, "authors": "A. J. Kappos, C.Panagiotopoulos, G. Panagopoulos, El. Papadopoulos.", "use_case_information": "", "structure_type": "Building", "taxonomy_gem": "C1L", "type_of_assessment": "Fragility", "taxonomy_type": {"pk": 2, "model": "vulnerability.taxonomytype", "fields": {"user_def": false, "name": "PAGER"}}, "taxonomy_text": "C1L"}};

//Test06_FF_Empirical_Discrete_Complete LGTM
var jsonObj = {"pk": 7, "model": "vulnerability.generalinformation", "fields": {"category": "Structure specific", "article_title": "Fragility functions for low rise ordinary buildings in Greece", "fragility_func": {"pk": 7, "model": "vulnerability.fragilityfunc", "fields": {"func_distr_frag_discr": {"pk": 6, "model": "vulnerability.funcdistrfragdiscr", "fields": {"limit_state_prob_exceed": "0.000;0.013;0.130;0.314;0.489;0.628;0.731;0.806;0.859;0.896;0.923;0.943;0.957;0.967;0.975;0.981;0.985;0.988;0.991;0.993;0.994\n0.000;0.000;0.014;0.061;0.138;0.231;0.328;0.420;0.504;0.579;0.643;0.698;0.744;0.783;0.816;0.844;0.867;0.887;0.903;0.917;0.929\n0.000;0.000;0.000;0.003;0.011;0.026;0.048;0.078;0.114;0.154;0.198;0.242;0.288;0.332;0.376;0.418;0.459;0.497;0.533;0.567;0.599\n0.000;0.000;0.000;0.000;0.000;0.001;0.003;0.006;0.011;0.018;0.026;0.037;0.050;0.064;0.080;0.098;0.117;0.137;0.157;0.179;0.201", "limit_state_prob_exceed_95": "0.000;0.014;0.143;0.346;0.538;0.691;0.805;0.886;0.944;0.986;1.016;1.037;1.053;1.064;1.073;1.079;1.084;1.087;1.090;1.092;1.094\n0.000;0.001;0.016;0.067;0.151;0.254;0.360;0.462;0.555;0.637;0.707;0.767;0.819;0.862;0.898;0.928;0.954;0.976;0.994;1.009;1.022\n0.000;0.000;0.000;0.003;0.012;0.028;0.053;0.086;0.126;0.170;0.217;0.267;0.316;0.366;0.414;0.460;0.505;0.547;0.587;0.624;0.659\n0.000;0.000;0.000;0.000;0.000;0.001;0.003;0.007;0.012;0.019;0.029;0.041;0.055;0.070;0.088;0.108;0.128;0.150;0.173;0.197;0.221", "fragility_func": 7, "predictor_var_im_val": "0.010;0.050;0.100;0.150;0.200;0.250;0.300;0.350;0.400;0.450;0.500;0.550;0.600;0.650;0.700;0.750;0.800;0.850;0.900;0.950;1.000", "limit_state_prob_exceed_05": "0.000;0.010;0.104;0.251;0.391;0.503;0.585;0.645;0.687;0.717;0.739;0.754;0.766;0.774;0.780;0.785;0.788;0.791;0.793;0.794;0.795\n0.000;0.000;0.011;0.049;0.110;0.185;0.262;0.336;0.404;0.463;0.514;0.558;0.595;0.627;0.653;0.675;0.694;0.709;0.723;0.734;0.743\n0.000;0.000;0.000;0.002;0.008;0.020;0.039;0.063;0.091;0.124;0.158;0.194;0.230;0.266;0.301;0.335;0.367;0.398;0.427;0.454;0.479\n0.000;0.000;0.000;0.000;0.000;0.001;0.002;0.005;0.009;0.014;0.021;0.030;0.040;0.051;0.064;0.078;0.093;0.109;0.126;0.143;0.161", "data_pts_num": 21}}, "general_information": 7, "predictor_var": {"pk": 7, "model": "vulnerability.predictorvar", "fields": {"type_of_period": null, "intensity_measure_type": "1", "minimum_im": 0.4, "fragility_func": 7, "period": null, "vulnerability_func": null, "maximum_im": 0.8, "intensity_measure_unit": "1"}}, "empirical_model_info": {"pk": 1, "model": "vulnerability.empiricalmodelinfo", "fields": {"building_aggr_min_num": 10, "fragility_func": 7, "building_x_class_num": 20, "empirical_data_src": "GEM Consequence database", "vulnerability_func": null, "aggr_unit_def": "Bins of IM", "building_aggr": "Grouped", "structural_unit": "Building"}}, "limit_states_desc": "Slight;Moderate;Extensive;Collapse", "damage_scale": "HAZUS", "engineering_demand_par": {"pk": 2, "model": "vulnerability.engineeringdemandpar", "fields": {"user_def": false, "name": "Global drift"}}, "method_of_estimation": "Empirical", "func_distr_type": "Discrete", "stat_info": {"pk": 3, "model": "vulnerability.statisticalinformation", "fields": {"stat_model": {"pk": 2, "model": "vulnerability.statmodel", "fields": {"user_def": false, "name": "Generalised Additive Models"}}, "fit_assessment_goodness": {"pk": 1, "model": "vulnerability.fitassessmentgoodness", "fields": {"user_def": false, "name": "Acceptable mean function"}}, "fragility_func": 7, "stat_model_fitting_method": {"pk": 2, "model": "vulnerability.statmodelfittingmethod", "fields": {"user_def": false, "name": "Maximum likelyhood"}}, "vulnerability_func": null, "proc_constr_pred_int": {"pk": 3, "model": "vulnerability.procconstrint", "fields": {"user_def": false, "name": "Bayesian"}}, "model_fitting_method_assumptions": 1, "proc_constr_conf_int": {"pk": 2, "model": "vulnerability.procconstrint", "fields": {"user_def": false, "name": "Bootstrap"}}}}}}, "name": "Test06_FF_Empirical_Discrete_Complete", "publication_conference_name": "GEM newsletter", "llrs": null, "material": null, "year": 2011, "web_link": "http://mceer.buffalo.edu/publications/resaccom/99-sp01/ch10mand.pdf", "general_comments": "This is an example about GEM global vulnerability database.\r\n", "geo_applicability": {"pk": 7, "model": "vulnerability.geoapplicability", "fields": {"general_information": 7, "countries": [{"pk": 66, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 7, "name": "Greece", "iso3": "GRC"}}, {"pk": 86, "model": "vulnerability.country", "fields": {"is_visible": true, "region": 7, "name": "Italy", "iso3": "ITA"}}], "area": "", "lon": null, "address": "", "lat": null}}, "authors": "A. J. Kappos, C.Panagiotopoulos, G. Panagopoulos, El. Papadopoulos.", "use_case_information": "The idea is to test the graphical user interface for a Discrete Fragility Function using all the information available in the platform.\r\n", "structure_type": "Building", "taxonomy_gem": "C1L", "type_of_assessment": "Fragility", "taxonomy_type": {"pk": 2, "model": "vulnerability.taxonomytype", "fields": {"user_def": false, "name": "PAGER"}}, "taxonomy_text": "C1L"}};

/////////////////////////////////
/// Create Fragility Metadata ///
/////////////////////////////////

var assessmentType = jsonObj.fields.type_of_assessment;
var id = jsonObj.fields.fragility_func.fields.general_information;
var name = jsonObj.fields.name;
var year = jsonObj.fields.year;
var webLink = jsonObj.fields.web_link;
var genComments = jsonObj.fields.general_comments;
var useCase = jsonObj.fields.use_case_information;
var authors = jsonObj.fields.authors;
var taxType = jsonObj.fields.taxonomy_type.fields.name;
var taxText = jsonObj.fields.taxonomy_text;
var category = jsonObj.fields.category;
var publication = jsonObj.fields.publication_conference_name;
var method = jsonObj.fields.fragility_func.fields.method_of_estimation;
var articleTitle = jsonObj.fields.article_title;
var funcDistrType = jsonObj.fields.fragility_func.fields.func_distr_type;
var imtTitle = jsonObj.fields.fragility_func.fields.predictor_var.fields.intensity_measure_type;
var countriesArray = [];
var geoApp = jsonObj.fields.geo_applicability.fields.countries;

for (var i = geoApp.length - 1; i >= 0; i--) {
    var tmp = " "+geoApp[i].fields.name;
    countriesArray.push(tmp);
};

// Generral information
if (assessmentType != undefined && assessmentType != "") {
    $("#genInfo").append('<p><b>Assessment Type: </b>'+assessmentType+'</p>');
};

if (name != undefined && name != "") {
    $("#genInfo").append('<p><b>Name: </b>'+name+' ('+id+')</p>');
};

if (category != undefined && category != "") {
    $("#genInfo").append('<p><b>Category: </b>'+category+'</p>');
};

if (taxText != undefined && taxText != "") {
    $("#genInfo").append('<p><b>Taxonomy: </b>'+taxText+' ('+taxType+')</p>');
};

if (articleTitle != undefined && articleTitle != "") {
    $("#genInfo").append('<p><b>Reference: </b>'+articleTitle+' ('+authors+', '+year+') - '+publication+'</p>');
};

if (countriesArray.length > 0) {
    $("#genInfo").append('<p><b>Geographical Applicability: </b>'+countriesArray+'</p>');   
};

if (method != undefined && method != "") {
    $("#genInfo").append('<p><b>Methodology: </b>'+method+'</p>');
};

if (genComments != undefined && genComments != "") {
    $("#genInfo").append('<p><b>General Comments: </b>'+genComments+'</p>');
};

if (useCase != undefined && useCase != "") {
    $("#genInfo").append('<p><b>Use Case Information: </b>'+useCase+'</p>');
};


// Modelling information
if (jsonObj.fields.fragility_func.fields.analytical_model_info != undefined) {
    var analysisType = jsonObj.fields.fragility_func.fields.analytical_model_info.fields.analysis_type.fields.name;
    if (analysisType != undefined && analysisType != "") {
        $("#modellingInfo").append('<p><b>Analysis Type: </b>'+analysisType+'</p>');
    };
    
    var modelType = jsonObj.fields.fragility_func.fields.analytical_model_info.fields.model_type;
    if (modelType != undefined && modelType != "") {
        $("#modellingInfo").append('<p><b>Model Type: </b>'+modelType+'</p>');
    };
    
    var methodUncertPropag = jsonObj.fields.fragility_func.fields.analytical_model_info.fields.method_uncert_propag;
    if (methodUncertPropag != undefined && methodUncertPropag != "") {
        $("#modellingInfo").append('<p><b>Method of Uncertainty Propagation: </b>'+methodUncertPropag+'</p>');
    };
    
    var modelsNum = jsonObj.fields.fragility_func.fields.analytical_model_info.fields.models_num;
    if (modelsNum != undefined && modelsNum != "") {
        $("#modellingInfo").append('<p><b>Number of Distinct Structural Models Analysed: </b>'+modelsNum+'</p>');
    };
};

if (jsonObj.fields.fragility_func.fields.empirical_model_info != undefined) {
    var empiricalDataSrc = jsonObj.fields.fragility_func.fields.empirical_model_info.fields.empirical_data_src;
    if (empiricalDataSrc != undefined && empiricalDataSrc != "") {
        $("#modellingInfo").append('<p><b>Source of Empirical Data: </b>'+empiricalDataSrc+'</p>');
    };

    var buildingAggr = jsonObj.fields.fragility_func.fields.empirical_model_info.fields.building_aggr;
    if (buildingAggr != undefined && buildingAggr != "") {
        $("#modellingInfo").append('<p><b>Building Aggregation: </b>'+buildingAggr+'</p>');
    };

    var aggrUnitDef = jsonObj.fields.fragility_func.fields.empirical_model_info.fields.aggr_unit_def;
    if (aggrUnitDef != undefined && aggrUnitDef != "") {
        $("#modellingInfo").append('<p><b>Definitions of Aggregated Units: </b>'+aggrUnitDef+'</p>');
    };
};

// Statistical Information
if (jsonObj.fields.fragility_func.fields.stat_info != undefined) {
    var statModel = jsonObj.fields.fragility_func.fields.stat_info.fields.stat_model.fields.name;
    if (statModel != undefined && statModel != "") {
        $("#statInfo").append('<p><b>Statistical Model: </b>'+statModel+'</p>');
    };
    
    var statModelFittingMethod = jsonObj.fields.fragility_func.fields.stat_info.fields.stat_model_fitting_method.fields.name;
    if (statModelFittingMethod != undefined && statModelFittingMethod != "") {
        $("#statInfo").append('<p><b>Statistical model fitting method: </b>'+statModelFittingMethod+'</p>');
    };
    
    var modelFittingMethodAssumptions = jsonObj.fields.fragility_func.fields.stat_info.fields.model_fitting_method_assumptions;
    if (modelFittingMethodAssumptions != undefined && modelFittingMethodAssumptions != "") {
        $("#statInfo").append('<p><b>Model Fitting Method Assumption: </b>'+modelFittingMethodAssumptions+'</p>');
    };
    
    var fitAssessmentGoodness = jsonObj.fields.fragility_func.fields.stat_info.fields.fit_assessment_goodness.fields.name;
    if (fitAssessmentGoodness != undefined && fitAssessmentGoodness != "") {
        $("#statInfo").append('<p><b>Goodness of fit assessment (GLM/GAM): </b>'+fitAssessmentGoodness+'</p>');
    };
    
    var procConstrPredInt = jsonObj.fields.fragility_func.fields.stat_info.fields.proc_constr_pred_int.fields.name;
    if (procConstrPredInt != undefined && procConstrPredInt != "") {
        $("#statInfo").append('<p><b>Procedure for the Construction of Prediction Intervals: </b>'+procConstrPredInt+'</p>');
    };
};

//////////////////////////////////////////////
/// Create Fragility Curves - Continuous /////
//////////////////////////////////////////////

if(funcDistrType == "Continuous") {
    // Get values out of JSON
    var dataObj = {};
    var chartData = [];
    var iml = [];
    var stddevArray = jsonObj.fields.fragility_func.fields.func_distr_frag_cont.fields.std_dev;
    stddevArray = stddevArray.split(";");
    var meanArray = jsonObj.fields.fragility_func.fields.func_distr_frag_cont.fields.mean;
    meanArray = meanArray.split(";");

    var lastMean = meanArray.length-1;
    var min = jsonObj.fields.fragility_func.fields.predictor_var.fields.minimum_im;
    if (jsonObj.fields.fragility_func.fields.predictor_var.fields.maximum_im == undefined) {
        var max = (2 * meanArray[lastMean]);
    } else {
        var max = jsonObj.fields.fragility_func.fields.predictor_var.fields.maximum_im;
    }
    
    var inc = ((max - min) / 100);
    var limitStatesArray =  jsonObj.fields.fragility_func.fields.limit_states_desc;
    limitStatesArray = limitStatesArray.split(";");
    
    for (var i = 0; i < limitStatesArray.length; i++)
        limitStatesArray[i] = limitStatesArray[i].trim();
    
    for (var i = 0; i < limitStatesArray.length; i++) {
        dataObj[limitStatesArray[i]] = [];
    };
    
    for (var i = 0; i < limitStatesArray.length; i++) {
        dataObj[limitStatesArray[i]] = [parseFloat(meanArray[i]), parseFloat(stddevArray[i])];
    };
    
    // create the x axis values
    for(var i=min; i<max;i=i+inc) {
        iml.push(Math.round(i*1000) / 1000);
    }
    iml.push(max);
    
    for (var k in dataObj) {
        var tmp = makeFragilityFunctionContinuous(dataObj[k][0], dataObj[k][1]);
        chartData[k] = [];
        for (var i = 0; i < iml.length; i++) {
            var val = tmp(iml[i]);
            chartData[k].push([iml[i], val]);
        };
    }
    
    // create the x axis values
    for(var i=min; i<max;i=i+inc) {
        iml.push(Math.round(i*1000) / 1000);
    }
    iml.push(max);
    
    function normalCumulativeProbability(z) {
        var b1 = 0.31938153;
        var b2 = -0.356563782;
        var b3 = 1.781477937;
        var b4 = -1.821255978;
        var b5 = 1.330274429;
        var p = 0.2316419;
        var c2 = 0.3989423;
        if (z > 6.0){
            return 1.0};  // this guards against overflow
        if (z < -6.0){
            return 0.0};
        var a = Math.abs(z);
        var t = 1.0 / (1.0 + a * p);
        var b = c2 * Math.exp((-z)*(z / 2.0));
        var n = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
        var n = 1.0 - b * n;
        if (z < 0.0){
            n = 1.0 - n};
        return n;
    };
    
    function makeFragilityFunctionContinuous(mean, stddev) {
        var variance = stddev * stddev;
        var sigma = Math.sqrt(Math.log((variance / (mean * mean)) + 1.0));
    
        mu = (mean * mean) / Math.sqrt(variance + mean * mean);
    
        return function(iml) {
           return normalCumulativeProbability((Math.log(iml / mu)) / sigma);
        };
    };
    
    function capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    function fragilityData() {
        $("#fragilityDataDialog").append("<b>Limit States, Mean, Stddev: </b></br>");
        for (var i = 0; i < limitStatesArray.length; i++) {
            var ls = capitalize(limitStatesArray[i]);
            $("#fragilityDataDialog").append(ls +", "+ meanArray[i] +", "+ stddevArray[i] +"</br>");
        };   
    }
    continuousTable();
    buildContinuousChart(chartData);

    ////////////////////////////////////////////
    /// Create Fragility Curves - Discrete /////
    ////////////////////////////////////////////

} else if (funcDistrType == "Discrete") {
    var chartData = [];

    var limitStatesArray =  jsonObj.fields.fragility_func.fields.limit_states_desc;
    var limitStatesArray = limitStatesArray.split(";");
    var limitStateVal = jsonObj.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed;
    limitStateVal = limitStateVal.split('\n');

    var bar = jsonObj.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed;
    bar = bar.split(";");
    // iml is used to get the max value for the chart
    iml = [];
    for (var i = 0; i < bar.length; i++) {
        iml.push(parseFloat(bar[i]));
    };

    for (var i = 0; i < limitStateVal.length; i++) {
        limitStateVal[limitStatesArray[i]] = limitStateVal[i].split(";");
    };
    limitStateVal.shift();
    limitStateVal.shift();
    limitStateVal.shift();
    limitStateVal.shift();

    var predVarVal = jsonObj.fields.fragility_func.fields.func_distr_frag_discr.fields.predictor_var_im_val;
    predVarVal = predVarVal.split(";");

    for (var i = 0; i < limitStatesArray.length; i++) {
        chartData[limitStatesArray[i]] = [];
    };

    for(var k in chartData) {
        var bar = [];
        for (var i = 0; i < predVarVal.length; i++) {
            var foo = [parseFloat(predVarVal[i]), parseFloat(limitStateVal[k][i])];
            bar.push(foo);  
        };
        chartData[k] = bar;
    };

    discreteTable();
    buildContinuousChart(chartData);
}

/////////////////////////////////
///// Continuous Data Table /////
/////////////////////////////////

function continuousTable() {

    var aaData = [];
        
    for (var i = 0; i < limitStatesArray.length; i++) {
        var tmp = [];
        tmp.push(limitStatesArray[i]);
        tmp.push(meanArray[i]);
        tmp.push(stddevArray[i]);
        aaData.push(tmp);
    };

    $('#fragility-table').dataTable({
        "aaData": aaData,
        // TODO make thias dynamic
        "aoColumns": [
            {"sTitle": "Limit State"},
            {"sTitle": "Mean"},
            {"sTitle": "Standard Deviation"}
        ],
        "bLengthChange": false,
        "bFilter": false
    });
};

////////////////////////////////
///// Discrete Data Table //////
////////////////////////////////

function discreteTable() {
    var aaData = [];
    var limitState = jsonObj.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed;
    limitState = limitState.split('\n');

    for (var i = limitState.length - 1; i >= 0; i--) {
        limitState[i] = limitState[i].split(";");
    };

    for (var i = limitStatesArray.length - 1; i >= 0; i--) {
        var tmp = [limitStatesArray[i]];
        tmp.push(limitState[i]);
        aaData.push(tmp);
    };

    $('#fragility-table').dataTable({
        "aaData": aaData,
        "aoColumns": [
            {"sTitle": "Lateral Roof Displacement ( m)"},
            {"sTitle": "Base Shear (kN)"}
            
        ],
        "bLengthChange": false,
        "bFilter": false
    });
};


/////////////////////////////////////
///// Fragility Chart Continuous ////
/////////////////////////////////////

function buildContinuousChart(chartData) {

    // grid line functions
    function make_x_axis() {        
        return d3.svg.axis()
            .scale(x_scale)
            .orient("bottom")
            .ticks(5)
    }
    function make_y_axis() {        
        return d3.svg.axis()
            .scale(y_scale)
            .orient("left")
            .ticks(5)
    }
    function capitalise(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    function makeCircles(chartData, color) {
        // Points along the line

        svg.selectAll("circle.line") 
            .data(chartData) 
            .enter().append("circle") 
            .attr("class", "line"+k) 
            .attr("cx", function(d) { return x_scale(d[0]); }) 
            .attr("cy", function(d) { return y_scale(d[1]); }) 
            .attr("r", 2.5)
            .style("fill", color)
            .style("opacity", 1)
            .on("mouseover", function() {
                d3.select(this)
                    .attr('r', 6)
                    .text(circleX + ", " + circleY)
                    .style("fill", color)
                    .style("opacity", 1)
                var circleX = d3.select(this.__data__[0]);
                circleX = circleX.toString();
                circleX = circleX.split(","[0]);

                var circleY = d3.select(this.__data__[1]);
                circleY = circleY.toString();
                circleY = circleY.split(","[0]);

                textTop.text("Point value (x/y): " + Math.round(circleX * 1000) / 1000 + ", " + Math.round(circleY * 1000) / 1000);

            }).on("mouseout", function() {
                d3.select(this)
                    .attr('r', 2.5)
                    .style("opacity", 1)
                    .style("fill", color);
            });
    }
   
    var margin = {top: 55, right: 100, bottom: 80, left: 60},
    width = 480 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom;
    var x_scale = d3.scale.linear().range([0, width]).domain([d3.min(iml), d3.max(iml)]);
    var y_scale = d3.scale.linear().range([0, height]).domain([1, 0]);
    var xAxis = d3.svg.axis()
        .scale(x_scale)
        .tickFormat(function (d) { return d; })
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y_scale)
        .orient("left");
    var line = d3.svg.line()
        .x(function(d) {
            return x_scale(d[0]);
        })
        .y(function(d) {
            return y_scale(d[1]);
        });
    var svg = d3.select("#fragilityChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // grid lines
    svg.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        );

    svg.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        );
    var legend = d3.select("#chartDialog").append("svg")
        .attr("height", 25);
    var count = 0;

    for (var k in chartData) {

        svg.append("path")
            .data([chartData[k]])
            .attr("class", "line"+k)
            .attr("d", line);

        // Update the css for each line
        if (chartData.hasOwnProperty(k)) {
            ++count;
        }
        colors = [
            "darkred",
            "blue",
            "green",
            "orange",
            "darksalmon",
            "red",
            "lightseagreen",
            "skyblue",
            "sandybrown",
            "yellowgreen"
        ];
        
        var color = colors[count % colors.length];
        $(".line"+k).css({'fill': "none",'opacity':'0.6', 'stroke-width': '2', 'stroke':color});
        var data = chartData[k];
        var curveTitle = k;

        if (funcDistrType == "Discrete") {
            makeCircles(chartData[k], color)
        };
        curveTitle = capitalise(curveTitle);
        
        // Curve lables
        svg.append("text")
            .attr("x", 340)
            .attr("y", 20*(count))
            .attr("dy", ".35em")
            .text(curveTitle);
            
        svg.append("svg:circle")
            .attr("cy", 20*(count))
            .attr("cx", 330)
            .attr("r", 3)
            .attr("opacity", 0.6)
            .style("fill", color)
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", 160)
            .attr("y", 30)
            .attr("dy", ".71em")
            .attr("text-anchor", "middle")
            .style("font-size","14px")
            .style("font-weight", "bold")
            .text(imtTitle);
            
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -60)
            .attr("x", -60)
            .attr("dy", ".71em")
            .style("font-size","14px")
            .style("font-weight", "bold")
            .style("text-anchor", "end")
            .text("Probabability of exceedance");

        textTopLable = svg.append("text")
            .attr("x", 0)
            .attr("y", -35)
            .attr("dy", ".35em")
            //.style("font-weight", "bold")
            .attr("font-size"," 14px")
            .text(assessmentType+ ' ' +name);
            
        textTop = svg.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dy", ".35em")
            .text("");
    }
} // End Chart

