/*
  Copyright (c) 2010-2012, GEM Foundation.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>. */


Ext.namespace('faulted_earth');


faulted_earth.Model = function(prefixId, title, properties, conf) {
    this.prefixId = prefixId;
    this.title = title;
    this.properties = properties

    this.hasForm = ! (this.properties == undefined || this.properties.length == 0);

    /* conf is an object. its keys are converted into keys of
     * `this` */
    Ext.apply(this, conf, {
	gridPtype: "gxp_featuregrid",
	editorPtype: "fe_featureeditor",
	formPtype: 'fe_' + this.prefixId + '_form',
	managerPtype: 'gxp_featuremanager'
    });

    this.sourceName = "geonode:observations_" + this.prefixId;
    this.gridId = this.prefixId + '_grid';
    this.formId = this.prefixId + '_form';
    this.snappingId = this.prefixId + '_snapping';
    this.formToolId = this.prefixId + '_form_tool';
    this.managerId = this.prefixId + '_manager';
    this.editorId = this.prefixId + '_editor';
    this.formTitle = this.title + " Form";
    this.formTarget = 'fe_' + this.prefixId + '_tooltarget';

    var propertyNames = {};

    /* add a visual clue for compulsory fields */
    Ext.each(this.properties, function (field) {
	propertyNames[field.id] = field.label;

        if (field.isCompulsory) {
            propertyNames[field.id] += " <small>(*)</small>";
        }
    });
    this.propertyNames = propertyNames;
}

faulted_earth.locatedObservationProperties = [
    { id: "scale", label: "Scale", isCompulsory: true },
    { id: "accuracy", label: "Accuracy", isCompulsory: true },
    { id: "notes", label: "Notes" }
];

faulted_earth.traceProperties = faulted_earth.locatedObservationProperties.concat([
    { id: "loc_meth", label: "Location Method" },
    { id: "geomorphic_expression", label: "Geomorphic Expression" }
]);

faulted_earth.siteProperties = faulted_earth.locatedObservationProperties.concat([
    { id: "fault_section_id", label: "Fault Section ID", isCompulsory: true },
    { id: "s_feature", label: "Site Feature", isCompulsory: true }]);

function withInterval(fields) {
    function withIntervalHelper(field) {
	return [
	    Ext.apply({}, { id: field.id + "_min", label: "Minimum " + field.label }, field),
	    Ext.apply({}, { id: field.id + "_pref", label: "Preferred " + field.label }, field),
	    Ext.apply({}, { id: field.id + "_max", label: "Maximum " + field.label }, field),
	];
    }
    if (!fields.length) {
	return withIntervalHelper(fields)
    } else {
	var ret = [];
	Ext.each(fields, function(field) {
	    ret.push(withIntervalHelper(field))
	});
	return ret;
    }
}


faulted_earth.slipRateProperties = withInterval([
    { id: "dip_slip_rate", label: "Slip rate (mm/yr)" },
    { id: "strike_slip_rate", label: "Strike slip rate (mm/yr)" },
    { id: "net_slip_rate", label: "Net slip rate (mm/yr)" },
    { id: "vertical_slip_rate", label: "Vertical slip rate (mm/yr)" },
    { id: "hv_ratio", label: "H:V Ratio"},
    { id: "rake", label: "Rake" }]).concat([
	{ id: "hv_ratio", label: "H:V Ratio"},
	{ id: "net_slip_rate_com", label: "Net slip rate completeness" },
	{ id: "slip_rate_category", label: "Slip rate category" },
	{ id: "slip_type", label: "Slip type" },
	{ id: "slip_type_com", label: "Slip type completeness" },
	{ id: "aseis_slip", label: "Aseismic-slip factor (0-1)" },
	{ id: "aseis_com", label: "Aseismic-slip completeness" }]);

faulted_earth.displacementProperties = [
    { id: "dis_total", label: "Total displacement (m)" },
    { id: "dis_category", label: "Displacement category" },
    { id: "horizontal_displacement", label: "Horizontal displacement" },
    { id: "vertical_displacement", label: "Vertical displacement" },
    { id: "net_displacement", label: "Net displacement" } ].concat(
	withInterval({ id: "dis", label: "Displacement (m)"}));


faulted_earth.recurrenceProperties = withInterval(
    [{ id: "re_int", label: "Recurrence Interval (yr)", isCompulsory: true },
     { id: "mov", label: "Age of last movement (yr BP)" } ]).concat(
	 [ { id: "historical_earthquake", label: "Historical Eartquake" },
	   { id: "pre_historical_earthquake", label: "Pre Historical Eartquake" },
	   { id: "marker_age", label: "Marker Age (yrs BP)" },
	   { id: "re_int_category", label: "Recurrence interval category" },
	   { id: "mov_category", label: "Age of last movement category" }]);

faulted_earth.eventProperties = faulted_earth.siteProperties.concat(faulted_earth.recurrenceProperties);
faulted_earth.siteDisplacementProperties = faulted_earth.siteProperties.concat(faulted_earth.displacementProperties);
faulted_earth.siteSlipRateProperties = faulted_earth.siteProperties.concat(faulted_earth.slipRateProperties);


faulted_earth.models = [
    new faulted_earth.Model("event", 'Observations: Events', faulted_earth.eventProperties, { formPtype: 'fe_site_form' }),
    new faulted_earth.Model("displacement", 'Observations: Displacement', faulted_earth.siteDisplacementProperties, { formPtype: 'fe_site_form' }),
    new faulted_earth.Model("sliprate", 'Observations: Slip Rates', faulted_earth.siteSlipRateProperties, { formPtype: 'fe_site_form' }),
    new faulted_earth.Model("faultgeometry", 'Observations: Fault Geometry'),
    new faulted_earth.Model("trace", 'Traces', faulted_earth.traceProperties),
    new faulted_earth.Model("faultsection", 'Fault Section Summary'),
    new faulted_earth.Model("fault", 'Faults'),
    new faulted_earth.Model("faultsource", 'Fault Sources')
];

faulted_earth.properties = faulted_earth.traceProperties;

/* an utility function to check if a field is compulsory */
faulted_earth.isCompulsory = function(fieldName) {
    compulsoryFields = [ 
	'fault_name', 'sec_name', 'compiled_by',
	'low_d_min', 'low_d_max', 'low_pref', 'low_d_com',
	'u_sm_d_min', 'u_sm_d_max', 'u_sm_d_pref', 'u_sm_d_com',
	'dip_min', 'dip_max', 'dip_pref', 'dip_com',
	'dip_dir', 'dip_dir_com',
	'slip_type', 'slip_type_com',
	'aseis_slip', 'aseis_com',
	'scale', 'accuracy', 's_feature'
    ];
    
    for (var i = 0; i < faulted_earth.properties.length; i++) {
	var field = faulted_earth.properties[i];
	if (field.id == fieldName && field.isCompulsory) {
	    return true
	}
    }
    return false
};

faulted_earth.isCalculated = function(fieldName) {
    autoComputedFields = [
	'width_min', 'width_max', 'width_pref',
	'area_min', 'area_max', 'area_pref',
	'net_slip_rate_min', 'net_slip_rate_max', 'net_slip_rate_pref',
	'mag_min', 'mag_max', 'mag_pref',
	'mom_min', 'mom_max', 'mom_pref',
	'all_com'
    ];
    for (var i = 0; i < faulted_earth.properties.length; i++) {
	var field = faulted_earth.properties[i];
	if (field.id == fieldName && field.isCalculated) {
	    return true
	}
    }
    return false
}
