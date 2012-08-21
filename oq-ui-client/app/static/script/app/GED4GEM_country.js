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

GED_country = Ext.extend(gxp.Viewer, {

    legendTabTitle: "Legend",
	summaryId: null,

    constructor: function(config) {

        Ext.Window.prototype.shadow = false;

        // property names for FeatureEditor and FeatureGrid
        var propertyNames = {
            // custom fied names for the fault summary table
            "fault_name": "Fault Name",

        };

        Ext.applyIf(config, {
            proxy: "/proxy?url=",

            mapItems: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }, {
                xtype: "gxp_scaleoverlay"
            }],
            portalItems: [{
                region: "center",
                layout: "border",
                tbar: {
                    id: "paneltbar",
                    items: ["-"]
                },
                items: [{
                    id: "west",
                    region: "west",
                    layout: "accordion",
                    width: 280,
                    split: true,
                    collapsible: true,
                    collapseMode: "mini",
                    header: false,
                    border: false,
                    defaults: {
                       hideBorders: true,
                       autoScroll: true
                    },
                    items: [{
                        id: "tree",
                        title: "Layers"
                    }, {
                        id: 'trace',
                        title: "Search by Country Name",
                        padding: 10
                    }]
                },
		"map", {
                    id: "featuregrid",
                    layout: "fit",
                    region: "south",
                    border: false,
                    height: 200,
                    split: true,
                    collapsed: true,
                    collapseMode: "mini"
                }],
                bbar: {id: "mybbar"}
            }],

            tools: [{
                actionTarget: {target: "paneltbar", index: 0},
                outputAction: 0,
                outputConfig: {
                    title: "Help",
                    width: 900,
                    height: 500,
                    modal: true,
                    bodyCfg: {
                        tag: "iframe",
                        src: "GED4GEM_country_help.html",
                        style: {border: 0}
                    }
                },
                actions: [{
                    iconCls: "icon-geoexplorer",
                    text: "Help"
                }]
            }, {
                ptype: "gxp_layertree",
                outputTarget: "tree"
            }, {
                ptype: "gxp_featuremanager",
                id: "featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 25,
                layer: {
                    source: "local",
                    name: "ged:country_facts"
                }
            }, {
                ptype: "gxp_featuregrid",
                autoLoadFeatures: true,
                id: "grid",
                featureManager: "featuremanager",
                outputTarget: "featuregrid",
                outputConfig: {
                    id: "grid",
                    loadMask: true,
                    propertyNames: propertyNames
                },
                controlOptions: {
                    multiple: true,
                }
            }, {
                ptype: "app_countryinfo",
                id: "traceform",
                featureManager: "featuremanager",
                featureEditor: "featureeditor",
                outputTarget: "trace"
            }, {
                ptype: "gxp_featureeditor",
                id: "featureeditor",
                featureManager: "featuremanager",
                actionTarget: "traceform_tooltarget",
                autoLoadFeatures: true,
                readOnly: true,
                outputConfig: {
                    propertyNames: propertyNames
                }
            }, {
		        ptype: "gxp_wmsgetfeatureinfo",
		        actionTarget: "paneltbar",
		        format: "grid",
	            outputConfig: {
	                width: 500
	            }
	        }, {
	            ptype: "gxp_zoomtoextent",
	            actionTarget: "paneltbar"
            }, {
                ptype: "gxp_zoom",
                actionTarget: "paneltbar"
            }, {
                ptype: "gxp_navigationhistory",
                actionTarget: "paneltbar"
            }, {
                ptype: "gxp_zoomtoselectedfeatures",
                featureManager: "featuremanager",
                actionTarget: "paneltbar",
                tooltip: "Zoom to selected closure"
            }, {
                ptype: "gxp_googlegeocoder",
                outputTarget: "paneltbar",
                outputConfig: {
                    emptyText: "Search for a country ..."
                }
            }]
        });

        GED_country.superclass.constructor.apply(this, arguments);
    }

});

