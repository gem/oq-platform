var app;

OpenLayers.Layer.Google.v3.animationEnabled = false;
OpenLayers.Layer.WMS.prototype.DEFAULT_PARAMS.transparent = true;

/* this configuration should go in a common.js file */
Ext.BLANK_IMAGE_URL = "/static/img/blank.gif";
OpenLayers.ImgPath = "externals/openlayers/img/";


Ext.namespace('faulted_earth');

/* expecting the app on port 80/443 if in debug mode, i.e. if a port
 * has been specified in the location */
faulted_earth.app_url = document.location.href;


Ext.onReady(function() {
// Add csrf token to every ajax request

Ext.Ajax.on('beforerequest', function (conn, options) {
   if (!(/^http:.*/.test(options.url) || /^https:.*/.test(options.url))) {
     if (typeof(options.headers) == "undefined") {
       options.headers = {'X-CSRFToken': Ext.util.Cookies.get('csrftoken')};
     } else {
       options.headers.extend({'X-CSRFToken': Ext.util.Cookies.get('csrftoken')});
     }
   }
}, this);

    app = new gxp.Viewer(
      {
        localGeoServerBaseUrl: "/geoserver/",
        authorizedRoles: "ROLE_ADMINISTRATOR",

    /* add a listener for computed fields */
    listeners: {
        featureedit: function(manager) {
        if (manager.featureLayer.selectedFeatures.length > 0) {
            var fid = manager.featureLayer.selectedFeatures[0].fid;
            if (fid) {
            Ext.Ajax.request({
                method: "POST",
                url: faulted_earth.app_url + 'updatecomputedfields',
                params: Ext.encode({ fid: fid }),
                success: function(response, opts) {
                /* reload the features to get the autocomputed fields */
                manager.featureStore.load();
                }
            });
            }
        }
        }
    },

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
            var formConfig = Ext.apply({}, {
                id: model.formId,
                title: model.formTitle
            }, defaultFormConfig);

            west_panel.add(formConfig);
            });
        }
        }, {
                id: "tabs",
                region: "south",
                border: false,
                split: true,
        autoHeight: true,
                collapseMode: "mini",
                items: [{
            xtype: "tabpanel",
            animCollapse: true,
                    height: 200,
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
                items: Ext.apply({}, { id: model.gridId }, defaultTabConfig)
                };
                tabContainer.add(tabConfig);
            });
            }
        }, {
            region: "south",
            height: 45,
            contentEl: 'footer'
        }]}],
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
            outputTarget: "map.tbar",
            outputConfig: {
                emptyText: "Search for a location ..."
            }
        }, {
            ptype: "gxp_layerproperties",
            actionTarget: {target: "tree.tbar"}
        }, {
            ptype: "gxp_legend",
            actionTarget: "tree.tbar",
        outputTarget: "west",
        outputConfig: {
        title: "Legend",
        autoScroll: true
        }
        }, {
            ptype: "gxp_wmsgetfeatureinfo",
            actionTarget: "map.tbar",
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
        }, {
            ptype: "gxp_measure",
            actionTarget: ["map.tbar"],
            toggleGroup: "main"
        }],

    initTools: function() {
        var viewer = this;

        var defaultManagerConfig = {
            autoLoadFeatures: true,
            autoSetLayer: false,
            paging: false,
            maxFeatures: 1000
        };

        var defaultGridConfig = {
            alwaysDisplayOnMap: true,
            selectOnMap: true,
            displayMode: "selected",
            controlOptions: {
              multiple: true
            }
        };

        var defaultEditorConfig = {
            autoLoadFeature: false,
            createFeatureActionText: "Draw",
            editFeatureActionText: "Modify"
        };

        var defaultFormConfig = {};

        Ext.each(faulted_earth.models, function(model) {
        var gridConfig = Ext.apply({}, {
            ptype: model.gridPtype,
            id: model.gridId,
            featureManager: model.managerId,
            outputTarget: model.gridId,
            outputConfig: {
            id: model.gridId,
            loadMask: true,
            propertyNames: model.propertyNames
            }
        }, defaultGridConfig);
        viewer.initialConfig.tools.push(gridConfig);

        if (model.hasForm) {
            var formConfig = Ext.apply({}, {
            ptype: model.formPtype,
            id: model.formId,
            layerRecordName: model.prefixId,
            featureManager: model.managerId,
            featureEditor: model.editorId,
            outputTarget: model.formId
            }, defaultFormConfig);
            viewer.initialConfig.tools.push(formConfig);

            var editorConfig = Ext.apply({},
            {
                ptype: model.editorPtype,
                id: model.editorId,
                readOnly: model.readOnly,
                modifyOnly: model.modifyOnly,
                featureManager: model.managerId,
                actionTarget: model.formTarget,
                outputConfig: {
                propertyNames: model.propertyNames
                }
            }, defaultEditorConfig);

            if (model.supportSnapping) {
            Ext.apply(editorConfig, { snappingAgent: model.snappingId });
            viewer.initialConfig.tools.push({
                ptype: "gxp_snappingagent",
                id: model.snappingId,
                targets: [{
                source: "local",
                name: model.sourceName
                }]
                                            });
            }
            viewer.initialConfig.tools.push(editorConfig);

            var zoomToFeatureConfig = Ext.apply({}, {
            ptype: "gxp_zoomtoselectedfeatures",
            featureManager: model.managerId,
            actionTarget: model.formTarget,
            tooltip: "Zoom to selected " + model.title
            });
            viewer.initialConfig.tools.push(zoomToFeatureConfig);

            var deleteSelectedFeatureConfig = Ext.apply({}, {
            ptype: "gxp_deleteselectedfeatures",
            actionTarget: model.formTarget,
            featureManager: model.managerId,
            tooltip: "Delete selected " + model.title
            });
            /*
               do we really want this feature?
               viewer.initialConfig.tools.push(deleteSelectedFeatureConfig);
            */

        }

        var managerConfig = Ext.apply({}, {
            id: model.managerId,
            layer: {
            source: "local",
            name: model.sourceName
            },
            layerRecordName: model.prefixId,
            ptype: model.managerPtype
        }, defaultManagerConfig);
        viewer.initialConfig.tools.push(managerConfig);
        });

        viewer.map = viewer.mapPanel.map;

    // loading indicator not present in geonode2
    //        viewer.initialConfig.tools.push({ ptype: "gxp_loadingindicator" });

        gxp.Viewer.prototype.initTools.call(this);

        /* call registerEvents for each tools for fine-grained
         * customization */
        Ext.iterate(viewer.tools, function(tool) {
        if (viewer.tools[tool].registerEvents)
            viewer.tools[tool].registerEvents(viewer);

        if (viewer.tools[tool].ptype.slice(-7) == 'manager') {
            viewer.tools[tool].addListener('exception', faulted_earth.on_exception);
        }
        });
    },

        // layer sources
        sources: {
            local: {
                ptype: "gxp_wmscsource",
                version: "1.1.1",
              url: "/geoserver/wms"
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
            },
            /* FIXME: the following sources should be got
         * from faulted_earth.models */
            {
                source: "local",
                name: "oqplatform:faulted_earth_faultsource",
                title: "Fault Source"
            },{
                source: "local",
                name: "oqplatform:faulted_earth_fault",
                title: "Neotectonic Fault"
            },{
                source: "local",
                name: "oqplatform:faulted_earth_faultsection",
                title : "Neotectonic Sections"
            },
                     {
                source: "local",
                name: "oqplatform:faulted_earth_trace",
                title: "Traces"
            }, {
                source: "local",
                name: "oqplatform:faulted_earth_event",
                title : "Site Observations - Events"
            } , {
                source: "local",
                name: "oqplatform:faulted_earth_displacement",
                title : "Site Observations - Displacement"
            }, {
                source: "local",
                name: "oqplatform:faulted_earth_sliprate",
                title : "Site Observations - Slip Rate"
            }, {
                source: "local",
                name: "oqplatform:faulted_earth_faultgeometry",
                title : "Site Observations - Fault Geometry"
            }
                    ],
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }, {
        xtype: "gxp_scaleoverlay"
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
