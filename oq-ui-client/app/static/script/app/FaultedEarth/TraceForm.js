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

/*
 * @requires FaultedEarth.js
 */

FaultedEarth.TraceForm = Ext.extend(gxp.plugins.Tool, {
    
    ptype: "app_traceform",
    
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
    
    /** private: property[sessionTids]
     *  ``Array`` fids of features added/modified in this session
     */
    sessionTids: [],
    
    autoActivate: false,
    
    init: function(target) {
        FaultedEarth.TraceForm.superclass.init.apply(this, arguments);
        
        this.sessionTids = [];
        this.faultSection = {};
        var featureManager = target.tools[this.featureManager];
        featureManager.featureLayer.events.on({
            "featureselected": function(e) {
                if (!e.feature.fid) {
                    return;
                }
                if (featureManager.layerRecord.get("name") == "geonode:observations_trace") {
                    this.target.traceId = e.feature.fid;

                    this.current_trace_url = "/observations/traces/join";
                    this.sessionTids.push(this.target.traceId);

                } else if (this.target.traceId) {
                    this.output[0].ownerCt.enable();
                    this.current_trace_url = "/traces/new/trace_id/" + this.target.traceId.split(".").pop()
                }
            },
            "featureunselected": function(e) {
                if (this.active && featureManager.layerRecord.get("name") == "geonode:observations_trace") {
                    this.sessionTids = [];
                    this.target.traceId = null;
                }
            },
            scope: this
        });
    },
    
    addOutput: function(config) {
        return FaultedEarth.TraceForm.superclass.addOutput.call(this, {
            xtype: "form",
            labelWidth: 110,
            defaults: {
                anchor: "100%"
            },
            items: [{
                xtype: "textfield",
                ref: "nameContains",
                fieldLabel: "Search for key word in notes",
                validationDelay: 500,
                listeners: {
                    "valid": this.updateFilter,
                    scope: this
                }
              }, {
                xtype: "container",
                layout: "hbox",
                cls: "composite-wrap",
                fieldLabel: "Create or modify a trace",
                items: [{
                    id: this.id + "_tooltarget",
                    xtype: "container",
                    cls: "toolbar-spaced",
                    layout: "toolbar"
                }]
            }, {
                xtype: "container",
                layout: "hbox",
                cls: "composite-wrap",
                fieldLabel: "Upload a trace",
                items: [{
                    xtype: "button",
                    text: "Upload",
                    iconCls: "icon-import",
                    handler: function() {
                        var featureManager = this.target.tools[this.featureManager];
                        featureManager.loadFeatures()
                        this.showUploadWindow();
                    },
                    scope: this
                }]
            }, {
                xtype: "box",
                autoEl: {
                    tag: "p",
                    cls: "x-form-item"
                },
                html: "From the table below press either the Shift or ctl to select the Traces you would like to join into a Fault Section"
            }, {
                xtype: "textfield",
                ref: "faultSectionName",
                fieldLabel: "Neotectonic Section Name",
                //validationDelay: 500,
                listeners: {
                        "valid": this.updateFaultSectionName,
                        scope: this
                }
             }, {
                xtype: "container",
                layout: "hbox",
                fieldLabel: "Join traces",
                items: [{
                    xtype: "button",
                    text: "Join",
                    iconCls: "icon-layer-switcher",
                    handler: function() {
                        var featureManager = this.target.tools[this.featureManager];
                        this.sessionTids.push(this.faultSection);
                        Ext.Ajax.request({
                            method: "PUT",
                            url: this.target.localGeoNodeUrl + this.target.localHostname + this.current_trace_url,
                            params: Ext.encode(this.sessionTids),
                            success: function(response, opts) {
                                alert('Fault Section created');
                                this.sessionTids = [];
                            },
                            failure: function(response, opts){
                                alert('Failed to create the Fault Section');
                            },

                            scope: this
                        });

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

    updateFaultSectionName: function() {
        var form = this.output[0]
        if (form.faultSectionName.getValue()) {
                this.faultSection['name'] = form.faultSectionName.getValue()
        }
    },

    activate: function() {
        if (FaultedEarth.TraceForm.superclass.activate.apply(this, arguments)) {
            var featureManager = this.target.tools[this.featureManager];
            featureManager.setLayer();
            if (!this.layerRecord) {
                this.target.createLayerRecord({
                    name: "geonode:observations_trace",
                    source: "local"
                }, function(record) {
                    this.layerRecord = record;
                    featureManager.setLayer(record);
                }, this);
            } else {
                featureManager.setLayer(this.layerRecord);
            }
            this.output[0].nameContains.setValue("");
            featureManager.on("layerchange", function(mgr, layer, attr) {
                mgr.featureStore.on({
                    "save": function(store, batch, data) {
                        var fid;
                        for (var action in data) {
                            for (var i=data[action].length-1; i>=0; --i) {
                                fid = data[action][i].feature.fid;
                                this.sessionTids.remove(fid);  
                                if (action != "destroy") {
                                    this.sessionTids.push(fid);
                                }
                            }
                        }
                    },
                    "load": function() {
                        this.target.traceId && window.setTimeout((function() {
                            var feature = mgr.featureLayer.getFeatureByFid(this.target.traceId);
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
                property: "notes",
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
                                file.fileName + "/file.shp?update=overwrite",
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

Ext.preg(FaultedEarth.TraceForm.prototype.ptype, FaultedEarth.TraceForm);
