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

faulted_earth.FaultForm = Ext.extend(gxp.plugins.Tool, {

    ptype: "fe_fault_form",
    
    /** api: config[featureManager]
     *  ``String`` id of the FeatureManager to add uploaded features to
     */
    
    /** api: config[featureEditor]
     *  ``String`` id of the FeatureEditor to modify uploaded features
     */
    
    /** api: config[temporaryWorkspace]
     *  ``String`` temporary GeoServer workspace for shapefile uploads.
     *  Default is "temp".
     */
    temporaryWorkspace: "temp",

    /** api: config[temporaryWorkspaceNamespaceUri]
     *  ``String`` namespace uri of the temporary GeoServer workspace for
     *  shapefile uploads. Default is "http://geonode.org/temporary".
     */
    temporaryWorkspaceNamespaceUri: "http://geonode.org/temporary",
    
    /** private: property[sessionFids]
     *  ``Array`` fids of features added/modified in this session
     */
    sessionFids: null,
    
    autoActivate: false,
    
    registerEvents: function(target) {
        this.sessionFids = [];
        var featureManager = target.tools[this.featureManager];
        featureManager.featureLayer.events.on({
            "featureselected": function(e) {
                if (!e.feature.fid) {
                    return;
                }
		/* fixme: is this check really needed ? */
                if (featureManager.layerRecord.get("name") == "geonode:observations_fault") {
		    /* store the fault (for multiple purposes like use
		     * it for fault source creation) */
                    this.target.fault = e.feature;
                }
            },
            "featureunselected": function(e) {
		/* fixme: is this check really needed ? */
                if (this.active && featureManager.layerRecord.get("name") == "geonode:observations_fault") {
                    this.target.fault = null;
                }
            },
            scope: this
        });
    },
    
    addOutput: function(config) {
        return faulted_earth.FaultForm.superclass.addOutput.call(this, {
            xtype: "form",
            labelWidth: 110,
            defaults: {
                anchor: "100%"
            },
            items: [{
                xtype: "textfield",
                ref: "nameContains",
                fieldLabel: "Search",
                validationDelay: 500,
                listeners: {
                    "valid": this.updateFilter,
                    scope: this
                }
            }, {
                xtype: "box",
                autoEl: {
                    tag: "p",
                    cls: "x-form-item"
                },
                html: "Select a fault from the grid below, then use the modify button to create a simple geometry that will be used to create a fault source polygon" 
            }, {
                xtype: "container",
                layout: "hbox",
                cls: "composite-wrap",
                fieldLabel: "Edit a simplified fault geometry",
                items: [{
                    id: "fe_fault_tooltarget",
                    xtype: "container",
                    cls: "toolbar-spaced",
                    layout: "toolbar"
                }]
            }, {
                xtype: "box",
                autoEl: {
                    tag: "p",
                    cls: "x-form-item"
                },
                html: "Once a fault has the required attributes, and simplified geometry, select a fault from the grid and use the 'generate' button to calculate a fault source."
            }, {
                xtype: "container",
                layout: "hbox",
                fieldLabel: "Generate Fault Source",
                items: [{
                    xtype: "button",
                    text: "Generate",
                    iconCls: "icon-layer-switcher",
                    handler: function() {
                        var featureManager = this.target.tools[this.featureManager];
			if (!this.target.fault) {
			    alert("To create a fault source, you need to select a fault");
			    return;
			}

                        Ext.Ajax.request({
                            method: "POST",
                            url: faulted_earth.app_url + '/observations/faultsource/create',
                            params: Ext.encode({fault_id: this.target.fault.fid}),
                            success: function(response, opts) {
				app.tools.faultsource_manager.featureStore.reload();
                                alert('Fault source generated');
                            },
                            failure: function(response, opts){
                                alert('failed to generate fault source: missing field ' + faulted_earth.modelsHash.faultsource.propertyNames[response.responseText]);
                            },

                            scope: this
                        });

                    },
                    scope: this
                    }]
            }, {
                xtype: "box",
                autoEl: {
                    tag: "p",
                    cls: "x-form-item"
                },
                html: "Select a Fault form from the grid below then click 'Export' to download it."
            }, {
                xtype: "container",
                layout: "hbox",
                items: [{
                    xtype: "button",
                    text: "Export",
                    iconCls: "icon-layer-switcher",
                    handler: function() {
                        var featureManager = this.target.tools[this.featureManager];
			window.open(faulted_earth.app_url + "/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=observations_fault&featureID=" + this.target.fault.fid + "&outputFormat=shape-zip");
                    },
                    scope: this
                }]
             }],
            listeners: {
                "added": function(cmp, ct) {
                    ct.on({
                        "expand": function() { this.activate(); },
                        "collapse": function() { this.deactivate(); },
                        scope: this
                    });
                },
                scope: this
            }
        });
    },
    
    activate: function() {
        if (faulted_earth.FaultForm.superclass.activate.apply(this, arguments)) {
	    var featureManager = this.target.tools[this.featureManager];
            this.output[0].nameContains.setValue("");
            featureManager.on("layerchange", function(mgr, rec) {
                mgr.featureStore.on({
                    "save": function(store, batch, data) {
                        var fid;
                        for (var action in data) {
                            for (var i=data[action].length-1; i>=0; --i) {
                                fid = data[action][i].feature.fid;
                                this.sessionFids.remove(fid);  
                                if (action != "destroy") {
                                    this.sessionFids.push(fid);
                                }
                            }
                        }
                    },
                    "load": function() {
                        this.target.fault && window.setTimeout((function() {
                            var feature = mgr.featureLayer.getFeatureByFid(this.target.fault);
                            if (feature && feature.layer.selectedFeatures.indexOf(feature) == -1) {
                                feature.layer.selectedFeatures.push(feature);
                                feature.layer.events.triggerEvent("featureselected", {feature: feature});
                            }
                        }).createDelegate(this), 0);
                    },
                    scope: this
                });
            }, this, {single: true});
        }
    },
    
   
    updateFilter: function() {
        var form = this.output[0];
        var filters = [];
        form.nameContains.getValue() && filters.push(
            new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.LIKE,
                property: "name",
                value: "*" + form.nameContains.getValue() + "*",
                matchCase: false
            })
        );
        var filter;
        if (filters.length > 0) {
            filter = filters.length == 1 ? filters[0] :
                new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.AND,
                    filters: filters
                });
        }
        this.target.tools[this.featureManager].loadFeatures(filter);
    },

    showUploadWindow: function() {
        var uploadWindow = new Ext.Window({
            title: "Import Faults",
            width: 250,
            autoHeight: true,
            modal: true,
            items: [{
                xtype: "form",
                ref: "form",
                padding: 10,
                border: false,
                autoHeight: true,
                labelWidth: 40,
                defaults: {
                    anchor: "100%"
                },
                items: [{
                    xtype: "box",
                    autoEl: {
                        tag: "p",
                        cls: "x-form-item"
                    },
                    html: "<b>Select a zipped shapefile for uploading.</b> The shapefile needs to have a line geometry."
                }, {
                    xtype: "fileuploadfield",
                    ref: "fileField",
                    fieldLabel: "File",
                    allowBlank: false,
                    listeners: {
                        "fileselected": function(field, file) {
                            field.ownerCt.uploadButton.enable();
                        }
                    }
                }],
                buttonAlign: "center",
                buttons: [{
                    text: "Upload",
                    ref: "../uploadButton",
                    disabled: true,
                    handler: function() {
                        var file = uploadWindow.form.fileField.fileInput.dom.files[0];
                        Ext.Ajax.request({
                            method: "PUT",
                            url: this.target.localGeoServerUrl + "rest/workspaces/" +
                                this.temporaryWorkspace + "/datastores/" +
                                file.name + "/file.shp?update=overwrite",
                            xmlData: file,
                            headers: {
                                "Content-Type": file.name.split(".").pop().toLowerCase() == "zip" ?
                                    "application/zip" : file.type
                            },
                            success: this.handleUpload.createDelegate(this,
                                [file.name, uploadWindow], true),
                            scope: this
                        });
                    },
                    scope: this
                }]
            }]
        });
        uploadWindow.show();
    },

    handleUpload: function(response, options, fileName, uploadWindow) {
        uploadWindow.close();
        var fileParts = fileName.split(".");
        fileParts.pop();
        var layerName = fileParts.join("");
        new OpenLayers.Protocol.WFS({
            version: "1.1.0",
            srsName: this.target.mapPanel.map.getProjectionObject().getCode(),
            url: this.target.localGeoServerUrl + "wfs",
            featureType: layerName,
            featureNS: this.temporaryWorkspaceNamespaceUri,
            outputFormat: "GML2"
        }).read({
            callback: function(response) {
                var extent = new OpenLayers.Bounds();
                var features = response.features, feature, date;
                for (var i=features.length-1; i>=0; --i) {
                    feature = features[i];
                    extent.extend(feature.geometry.getBounds());
                    feature.fid = null;
                    feature.state = OpenLayers.State.INSERT;
                    // convert dates
                    for (var a in feature.attributes) {
                        date = Date.parseDate(feature.attributes[a], "Y/m/d");
                        if (date) {
                            feature.attributes[a] = date.format("c");
                        }
                    }
                }
                var featureManager = this.target.tools[this.featureManager];
                featureManager.featureLayer.addFeatures(features);
                featureManager.featureStore.save();
                
                var featureEditor = this.target.tools[this.featureEditor];
                featureEditor.actions[1].control.activate();
                this.target.mapPanel.map.zoomToExtent(extent);
            },
            scope: this
        });
        //TODO remove uploaded layer/store/style or call GeoNode updatelayers
    }
    
});

Ext.preg(faulted_earth.FaultForm.prototype.ptype, faulted_earth.FaultForm);
