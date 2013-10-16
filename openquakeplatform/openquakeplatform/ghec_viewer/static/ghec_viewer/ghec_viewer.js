
var app;
Ext.onReady(function() {
        var header = new Ext.Panel({
            region: "north",
            autoHeight: true,
            contentEl: 'header-wrapper',
            id: 'header-ext'
        });

        var footer = new Ext.Panel({
            region: "south",
            height: 45,
            contentEl: 'footer'
        });


    app = new gxp.Viewer({
        localGeoServerBaseUrl: "/geoserver/",
        authorizedRoles: "ROLE_ANONYMOUS",

        portalConfig: {
            layout: "border",
            region: "center",

            // by configuring items here, we don't need to configure portalItems
            // and save a wrapping container
            items: [header, {
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
                width: 200
            }, footer],
            bbar: {id: "mybbar"}
        },

        // configuration of all tool plugins for this application
        tools: [{
            ptype: "gxp_layertree",
            outputConfig: {
                id: "tree",
                border: true,
                // we will add buttons to "tree.bbar" later
                tbar: [],
                autoScroll: true,
            },
            outputTarget: "westpanel"
        }, {
            ptype: "gxp_googlegeocoder",
            sensor: "true",
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
                url: "/geoserver/wms",
                version: "1.1.1"
            },
            mapbox: {
                ptype: "gxp_tilestreamsource"
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
                name: "oqplatform:ghec_viewer_measure",
                title : "Global Historical Earthquake Catalogue"
            }],
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }]
        }

    });
});
