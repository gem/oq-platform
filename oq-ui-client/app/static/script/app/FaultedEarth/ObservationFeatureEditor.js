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

Ext.namespace("faultedearth");

/* an utility function to check if a field is compulsory */
faultedearth.isCompulsory = function(fieldName) {
    compulsoryFields = [ 
	'fault_name', 'section_name',
	'sec_name', 'compiled_by',
	'low_d_min', 'low_d_max', 'low_pref', 'low_d_com',
	'u_sm_d_min', 'u_sm_d_max', 'u_sm_d_pre', 'u_sm_d_com',
	'dip_min', 'dip_max', 'dip_pref', 'dip_com',
	'dip_dir', 'slip_typ', 
	'vertical_slip_rate_min', 'vertical_slip_rate_max', 
	'vertical_slip_rate_pref', 'vertical_slip_rate_com',
	'dip_slip_rate_min', 'dip_slip_rate_max', 'dip_slip_rate_pref',
	'aseis_slip', 'aseis_com',
	'scale', 'accuracy', 's_feature'
    ];
    return compulsoryFields.indexOf(fieldName) != -1;
};


/**
 * @class ObservationFeatureEditor
 * @extends gxp.plugins.FeatureEditor
 * Extends the standard FeatureEditor to aid client-side
 * validation for the common fields of Fault Sections / Fault / Fault
 * Source
 */
faultedearth.ObservationFeatureEditor = Ext.extend(gxp.plugins.FeatureEditor,
  {
      ptype: "gem_observation_featureeditor",
      editFeatureActionText: "Modify",
      autoLoadFeatures: true,
      snappingAgent: "snapping-agent",
      createFeatureActionText: "Draw",

      /*
	popup that shows an help to fill in data
      */
      helpPopup: null,

      /* 
	 We extend addOutput for two reasons:

	 1) to increase the default width.  Thus, the fields are
	 clearly visible and also the visual clue of the compulsory
	 fields can appended to the end of the field name

	 2) to bind a context sensitive help (a popup with a
	 description of the selected field)
       */
      addOutput: function(config) {
	  var editor = this;
	  config.width = 400;
	  var output = faultedearth.ObservationFeatureEditor.superclass.addOutput.apply(this, arguments);
	  
	  // super.addOutput could return a component that it is not a
	  // popup with an editor.

	  if (!output.grid) {
	      return output;
	  }

	  // we are adding a popup with an editor, so let's bind the
	  // rowclick event to show our context sensitive help
	  var popup = output;

	  popup.grid.addListener('rowclick',
				 function(grid, rowIndex, event) {
				     faultedearth.on_row_click(editor, popup, rowIndex);
				 });

	  return popup;
      }
  });

Ext.preg(faultedearth.ObservationFeatureEditor.prototype.ptype, faultedearth.ObservationFeatureEditor); 

faultedearth.on_row_click = function(editor, popup, rowIndex) {
    var grid = popup.grid;
    var store = grid.propStore.store;
    var fieldName = store.getAt(rowIndex).id;
    
    if (editor.helpPopup) {
	editor.helpPopup.body.dom.innerHTML=gem.utils.description(fieldName);
	editor.helpPopup.enable();
    } else {
	editor.helpPopup = editor.addOutput({
	    xtype: "gx_popup",
	    title: "Help",
	    bodyCls: 'help',
	    padding: 10,
	    location: popup.feature,
	    anchored: false,
	    map: popup.map,
	    draggable: true,
	    width: 200,
	    html: gem.utils.description(fieldName),
	    collapsible: true
	});
    }
}
					   