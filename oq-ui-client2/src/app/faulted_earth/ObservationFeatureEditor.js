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

/**
 *
 * @require plugins/FeatureEditor.js
 */

Ext.namespace("faulted_earth");


/**
 * @class ObservationFeatureEditor
 * @extends gxp.plugins.FeatureEditor
 * Extends the standard FeatureEditor to aid client-side
 * validation for the common fields of Fault Sections / Fault / Fault
 * Source
 */
faulted_earth.ObservationFeatureEditor = Ext.extend(gxp.plugins.FeatureEditor,
  {
      ptype: "fe_featureeditor",

      autoLoadFeatures: true,

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

	  var output = faulted_earth.ObservationFeatureEditor.superclass.addOutput.apply(this, arguments);
	  
	  // super.addOutput could return a component that it is not a
	  // popup with an editor.

	  if (output.items.getCount() == 0) {
	      return output;
	  }

	  // we are adding a popup with an editor, so let's bind the
	  // rowclick event to show our context sensitive help
	  var popup = output;
	  var grid = popup.items.first();

	  grid.addListener('rowclick',
			   function(container, rowIndex, event) {
			       faulted_earth.on_row_click(editor, popup, grid, rowIndex);
			   });
	  popup.addListener('featuremodified',
			    function() {
				Ext.Ajax.request({
				    method: "POST",
				    url: faulted_earth.app_url + '/observations/updatecomputedfields'
				});
			    });

	  return popup;
      }
  });

Ext.preg(faulted_earth.ObservationFeatureEditor.prototype.ptype, faulted_earth.ObservationFeatureEditor); 


faulted_earth.on_row_click = function(editor, popup, grid, rowIndex) {
    var store = grid.propStore.store;
    var fieldName = store.getAt(rowIndex).id;
    
    if (editor.helpPopup && editor.helpPopup.isVisible()) {
	editor.helpPopup.body.dom.innerHTML = faulted_earth.utils.description(fieldName);
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
	    html: faulted_earth.utils.description(fieldName),
	    collapsible: true
	});
    }
    editor.helpPopup.toBack();
    popup.toFront();
}
					   