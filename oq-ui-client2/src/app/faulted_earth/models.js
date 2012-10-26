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

/* catalog of properties. We will collect them, later */
faulted_earth.properties = [];

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

function registerProperties(props) {
    faulted_earth.properties = faulted_earth.properties.concat(props);
    return props;
}

faulted_earth.locatedObservationProperties = registerProperties([
    { id: "scale", label: "Scale", isCompulsory: true },
    { id: "accuracy", label: "Accuracy", isCompulsory: true },
    { id: "notes", label: "Notes" }
]);

faulted_earth.traceProperties = registerProperties(faulted_earth.locatedObservationProperties.concat([
    { id: "loc_meth", label: "Location Method" },
    { id: "geomorphic_expression", label: "Geomorphic Expression" }
]));

faulted_earth.siteProperties = registerProperties(faulted_earth.locatedObservationProperties.concat([
    { id: "fault_section_id", label: "Fault Section ID", isCompulsory: true },
    { id: "s_feature", label: "Site Feature", isCompulsory: true }]));


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
	    ret = ret.concat(withIntervalHelper(field))
	});
	return ret;
    }
}


faulted_earth.slipRateProperties = registerProperties(withInterval([
    { id: "dip_slip_rate", label: "Slip rate (mm/yr)" },
    { id: "strike_slip_rate", label: "Strike slip rate (mm/yr)" },
    { id: "net_slip_rate", label: "Net slip rate (mm/yr)", isCalculated: true },
    { id: "vertical_slip_rate", label: "Vertical slip rate (mm/yr)" },
    { id: "hv_ratio", label: "H:V Ratio"},
    { id: "rake", label: "Rake" }]).concat([
	{ id: "hv_ratio", label: "H:V Ratio"},
	{ id: "net_slip_rate_com", label: "Net slip rate completeness" },
	{ id: "slip_rate_category", label: "Slip rate category" },
	{ id: "slip_type", label: "Slip type", isCompulsory: true },
	{ id: "slip_type_com", label: "Slip type completeness", isCompulsory: true },
	{ id: "aseis_slip", label: "Aseismic-slip factor (0-1)", isCompulsory: true },
	{ id: "aseis_com", label: "Aseismic-slip completeness", isCompulsory: true }]));

faulted_earth.displacementProperties = registerProperties([
    { id: "dis_total", label: "Total displacement (m)" },
    { id: "dis_category", label: "Displacement category" },
    { id: "horizontal_displacement", label: "Horizontal displacement" },
    { id: "vertical_displacement", label: "Vertical displacement" },
    { id: "net_displacement", label: "Net displacement" } ].concat(
	withInterval({ id: "dis", label: "Displacement (m)"})));


faulted_earth.recurrenceProperties = registerProperties(withInterval(
    [{ id: "re_int", label: "Recurrence Interval (yr)", isCompulsory: true },
     { id: "mov", label: "Age of last movement (yr BP)" } ]).concat(
	 [ { id: "historical_earthquake", label: "Historical Eartquake" },
	   { id: "pre_historical_earthquake", label: "Pre Historical Eartquake" },
	   { id: "marker_age", label: "Marker Age (yrs BP)" },
	   { id: "re_int_category", label: "Recurrence interval category" },
	   { id: "mov_category", label: "Age of last movement category" }]));

faulted_earth.eventProperties = registerProperties(faulted_earth.siteProperties.concat(faulted_earth.recurrenceProperties));
faulted_earth.siteDisplacementProperties = registerProperties(faulted_earth.siteProperties.concat(faulted_earth.displacementProperties));
faulted_earth.siteSlipRateProperties = registerProperties(faulted_earth.siteProperties.concat(faulted_earth.slipRateProperties));

/* fixme: refactor this with fault section (also in the app) */
faulted_earth.faultgeometryProperties = registerProperties(faulted_earth.siteProperties.concat([
    { id: "dip_dir", label: "Dip direction", isCompulsory: true },
    { id: "down_thro", label: "Downthrown Side" },
    { id: "strike", label: "Strike" },
    { id: "surface_dip", label: "Surface Dip" } ]));

faulted_earth.observationProperties = registerProperties([
    { id: "compiler", label: "Compiled by (name)", isCompulsory: true },
    { id: "contrib", label: "Contributed by (name)" },
    { id: "created", label: "Created at (date)" },
    { id: "all_com", label: "Overall completeness", isCalculated: true }]);

faulted_earth.lengthProperties = registerProperties(withInterval([
    { id: "length", label: "Length" },
    { id: "u_sm_d", label: "Upper seismogenic depth", isCompulsory: true },
    { id: "low_d", label: "Lower seismogenic depth", isCompulsory: true }]).concat(
	[ { id: "u_sm_d_com", label: "Upper seismogenic depth completeness", isCompulsory: true },
	  { id: "low_d_com", label: "Lower seismogenic depth completeness", isCompulsory: true }]));

faulted_earth.areaProperties = registerProperties(withInterval([
    { id: "width", label: "Width", isCalculated: true },
    { id: "area", label: "Area", isCalculated: true }]));
    
faulted_earth.dipProperties = registerProperties(
    withInterval({ id: "dip", label: "Dip", isCompulsory: true }).concat([
	{ id: "dip_com", label: "Dip completeness", isCompulsory: true },
	{ id: "dip_dir", label: "Dip direction", isCompulsory: true },
	{ id: "dip_dir_com", label: "Dip direction completeness", isCompulsory: true }]));


faulted_earth.magnitudeProperties = registerProperties(withInterval([
    { id: "mag", label: "Magnitude", isCalculated: true },
    { id: "mom", label: "Seismic movement", isCalculated: true }]));

faulted_earth.faultsectionProperties = registerProperties(faulted_earth.observationProperties.concat(
    faulted_earth.lengthProperties).concat(
	faulted_earth.areaProperties).concat(
	    faulted_earth.slipRateProperties).concat(
		faulted_earth.dipProperties).concat(
		    faulted_earth.recurrenceProperties).concat([
			{ id: "sec_name", label: "Fault Section name", isCompulsory: true },
			{ id: "down_thro", label: "Downthrown Side" },
			{ id: "strike", label: "Strike" },
			{ id: "surface_dip", label: "Surface Dip" },
			{ id: "episodic_behaviour", label: "Episodic Behaviour" }]));

faulted_earth.faultProperties = registerProperties(
    faulted_earth.observationProperties.concat(
	faulted_earth.lengthProperties).concat(
	    faulted_earth.slipRateProperties).concat(
		faulted_earth.dipProperties).concat(
		    faulted_earth.displacementProperties).concat(
			faulted_earth.recurrenceProperties).concat([
			    { id: "fault_name", label: "Fault name", isCompulsory: true },
			    { id: "down_thro", label: "Downthrown Side" },
			    { id: "strike", label: "Strike" },
			    { id: "episodic_behaviour", label: "Episodic Behaviour" }]));

faulted_earth.faultSourceProperties = registerProperties(
    faulted_earth.observationProperties.concat(
	faulted_earth.lengthProperties).concat(
	    faulted_earth.areaProperties).concat(
		faulted_earth.slipRateProperties).concat(
		    faulted_earth.dipProperties).concat(
			faulted_earth.displacementProperties).concat(
			    faulted_earth.magnitudeProperties).concat(
				faulted_earth.recurrenceProperties).concat([
				    { id: "source_nm", label: "Fault Source name" },
				    { id: "fault_name", label: "Fault name", isCompulsory: true }]));


faulted_earth.models = [
    new faulted_earth.Model("event", 'Observations: Events', faulted_earth.eventProperties, { formPtype: 'fe_site_form' }),
    new faulted_earth.Model("displacement", 'Observations: Displacement', faulted_earth.siteDisplacementProperties, { formPtype: 'fe_site_form' }),
    new faulted_earth.Model("sliprate", 'Observations: Slip Rates', faulted_earth.siteSlipRateProperties, { formPtype: 'fe_site_form' }),
    new faulted_earth.Model("faultgeometry", 'Observations: Fault Geometry', faulted_earth.faultgeometryProperties, { formPtype: 'fe_site_form' }),
    new faulted_earth.Model("trace", 'Traces', faulted_earth.traceProperties),
    new faulted_earth.Model("faultsection", 'Fault Section Summary', faulted_earth.faultsectionProperties),
    new faulted_earth.Model("fault", 'Faults', faulted_earth.faultProperties),
    new faulted_earth.Model("faultsource", 'Fault Sources', faulted_earth.faultSourceProperties)
];

/* an utility function to check if a field is compulsory */
faulted_earth.isCompulsory = function(fieldName) {
    for (var i = 0; i < faulted_earth.properties.length; i++) {
	var field = faulted_earth.properties[i];
	if (field.id == fieldName && field.isCompulsory) {
	    return true
	}
    }
    return false
};

faulted_earth.isCalculated = function(fieldName) {
    for (var i = 0; i < faulted_earth.properties.length; i++) {
	var field = faulted_earth.properties[i];
	if (field.id == fieldName && field.isCalculated) {
	    return true
	}
    }
    return false
}
