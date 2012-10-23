/**
 * Add all your dependencies here.
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
 */

var app;

OpenLayers.Layer.Google.v3.animationEnabled = false;
OpenLayers.Layer.WMS.prototype.DEFAULT_PARAMS.transparent = true;
Ext.BLANK_IMAGE_URL = "theme/app/img/blank.gif";
OpenLayers.ImgPath = "externals/openlayers/img/";


Ext.onReady(function() {
    app = new gxp.Viewer({

	/* TODO: is this used ? */
	legendTabTitle: "Legend",

        portalConfig: {
            layout: "border",
            region: "center",
            
            // by configuring items here, we don't need to configure portalItems
            // and save a wrapping container
            items: [
	    {
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
            }, {
                id: "westpanel",
                xtype: "container",
                layout: "fit",
                region: "west",
                width: 350
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
                    items: [ {
			title: 'Observations: Events',
			items: [{
                            id: "site_events_featuregrid",
                            layout: "fit",
                            height: 180,
                            autoScroll: true
			}]
                    }]
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
