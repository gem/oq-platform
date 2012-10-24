/**
 *
 * @require widgets/Viewer.js
 * @require plugins/LayerTree.js
 * @require plugins/OLSource.js
 * @require plugins/OSMSource.js
 * @require plugins/WMSCSource.js
 * @require plugins/ZoomToExtent.js
 * @require plugins/NavigationHistory.js
 * @require plugins/Zoom.js
 * @require plugins/AddLayers.js
 * @require plugins/RemoveLayer.js
 * @require RowExpander.js
 * @require plugins/LayerProperties.js
 * @require widgets/WMSLayerPanel.js
 * @require plugins/WMSGetFeatureInfo.js
 * @require plugins/GoogleSource.js
 * @require plugins/GoogleGeocoder.js
 * @require plugins/Legend.js
 *
 * @require faulted_earth/models.js
 */

var app;

OpenLayers.Layer.Google.v3.animationEnabled = false;
OpenLayers.Layer.WMS.prototype.DEFAULT_PARAMS.transparent = true;
Ext.BLANK_IMAGE_URL = "theme/app/img/blank.gif";
OpenLayers.ImgPath = "externals/openlayers/img/";


Ext.namespace('faulted_earth');


Ext.onReady(function() {
    app = new gxp.Viewer({

	/* TODO: are the following two properties still used/useful ? */
	legendTabTitle: "Legend",
        proxy: "/proxy?url=",

        portalConfig: {
            layout: "border",
            region: "center",
            
            // by configuring items here, we don't need to configure portalItems
            // and save a wrapping container
            items: [{
		region: "north",
		autoHeight: true,
		contentEl: 'header-wrapper',
		id: 'header-ext'
	    }, {
                id: "centerpanel",
                xtype: "panel",
                layout: "fit",
                region: "center",
                border: false,
                items: ["mymap"]
            },{
		xtype: 'panel',
		region: "south",
		autoHeight: true,
		contentEl: 'footer'
            }, {
                id: "tabs",
                autoHeight: true,
                region: "south",
                border: false,
                height: 200,
                split: true,
                collapseMode: "mini",
                items: {
		    xtype: "tabpanel",
		    animCollapse: true,
                    activeTab : 0,
                    border: true,
		    initComponent: function() {
			Ext.TabPanel.prototype.initComponent.call(this);
			var tabContainer = this;

			var defaultTabConfig = {
                            layout: "fit",
                            height: 180,
                            autoScroll: true
			};
			
			Ext.each(faulted_earth.models, function(model) {
			    var tabConfig = {
				title: model.title,
				items: Ext.apply(defaultTabConfig, { id: model.grid_id() })
			    };
			    tabContainer.add(tabConfig);
			});
                    }
		}
            }, {
                id: "west",
                region: "west",
                layout: "accordion",
                width: 295,
                split: true,
                collapsible: true,
                collapseMode: "mini",
                header: false,
                border: false,
                defaults: {
                    hideBorders: true,
                    autoScroll: true
                },
                items: {
                    title: "Layers",
		    id: "westpanel"
                },
		initComponent: function() {
		    Ext.Panel.prototype.initComponent.call(this);
		    var west_panel = this;

		    var defaultFormConfig = { padding: 10 };
		    Ext.each(faulted_earth.models, function(model) {
			var formConfig = Ext.apply(defaultFormConfig, {
			    id: model.form_id(),
			    title: model.form_title()
			});
			west_panel.add(formConfig);
		    });
		},
		initTools: function() {
		    var defaultManagerConfig = {
			ptype: "gxp_featuremanager",
			autoLoadFeatures: true,
			autoSetLayer: false,
			paging: false,
			maxFeatures: 1000
		    };

		    var defaultGridConfig = {
			ptype: "gxp_featuregrid",
			alwaysDisplayOnMap: true,
			selectOnMap: true,
			displayMode: "selected",
			controlOptions: {
			    multiple: true
			}
		    };
		    Ext.each(faulted_earth.models, function(model) {
			var managerConfig = Ext.apply(defaultManagerConfig, {
			    id: model.manager_id()
			});
			this.initialConfig.tools.push(managerConfig);

			var gridConfig = Ext.apply(defaultGridConfig, {
			    id: model.grid_id(),
			    featureManager: model.manager_id(),

			    /* it should be the same of the id. it has
			     * to match the grid panel defined
			     * above */
			    outputTarget: model.grid_id(),
			    outputConfig: {
				id: model.grid_id(),
				loadMask: true,
				propertyNames: model.properties
			    }
			});
			this.initialConfig.tools.push(gridConfig);
		    });
		    gxp.Viewer.prototype.initTools.call(this);
		}
	    }],
            bbar: {id: "mybbar"}
        },
        
        // configuration of all tool plugins for this application
        tools: [{
            ptype: "gxp_layertree",
            outputConfig: {
                id: "tree",
                border: true,
                tbar: [] // we will add buttons to "tree.bbar" later
            },
            outputTarget: "westpanel"
        }, {
            ptype: "gxp_googlegeocoder",
            outputTarget: "map.tbar",
            outputConfig: {
                emptyText: "Search for a location ..."
            }
        }, {
            ptype: "gxp_layerproperties",
            actionTarget: {target: "tree.tbar"}
        }, {
            ptype: "gxp_legend",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_wmsgetfeatureinfo",
            actionTarget: "tree.tbar",
            format: "grid", 
            outputConfig: {
                width: 400
            }
        }, {
            ptype: "gxp_addlayers",
            actionTarget: "tree.tbar"
        }, {
            ptype: "gxp_removelayer",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        }, {
            ptype: "gxp_zoomtoextent",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_zoom",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_navigationhistory",
            actionTarget: "map.tbar"
        }],
        
        // layer sources
        sources: {
            local: {
                ptype: "gxp_wmscsource",
                version: "1.1.1",
		url:  '/geoserver/wms'
            },
            osm: {
                ptype: "gxp_osmsource"
            },
            google: {
                ptype: "gxp_googlesource"
            }
        },
        
        // map and layers
        map: {
            id: "mymap", // id needed to reference map in portalConfig above
            //title: "Map",
            projection: "EPSG:900913",
            center: [-10764594.758211, 4523072.3184791],
            zoom: 0,
            layers: [{
                source: "google",
                title: "Google Terrain",
                name: "TERRAIN",
                group: "background"
            }, {
                source: "google",
                title: "Google Hybrid",
                name: "HYBRID",
                group: "background"
            }, {
                source: "osm",
                name: "mapnik",
                group: "background"
            }, {
                source: "local",
                name: "geonode:observations_faultsource",
                title: "Fault Source"
            },{
                source: "local",
                name: "geonode:observations_fault",
                title: "Neotectonic Fault"
            },{
                source: "local",
                name: "geonode:observations_faultsection",
                title : "Neotectonic Sections"
            }, {
                source: "local",
                name: "geonode:observations_trace",
                title: "Traces",
            }, {
                source: "local",
                name: "geonode:observations_event",
                title : "Site Observations - Events"
            } , {
                source: "local",
                name: "geonode:observations_displacement",
                title : "Site Observations - Displacement"
            }, {
                source: "local",
                name: "geonode:observations_sliprate",
                title : "Site Observations - Slip Rate"
            }, {
                source: "local",
                name: "geonode:observations_faultgeometry",
                title : "Site Observations - Fault Geometry"
            }],
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }]
        }

    });
});

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
