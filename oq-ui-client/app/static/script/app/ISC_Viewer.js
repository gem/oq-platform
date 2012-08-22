ISC_Viewer = Ext.extend(gxp.Viewer, {
    
    legendTabTitle: "Legend",
    summaryId: null,
    
    constructor: function(config) {
        
        Ext.Window.prototype.shadow = false;
        
        // property names for FeatureEditor and FeatureGrid
        var propertyNames = {
            // custom fied names for the fault summary table
            "fault_name": "Fault Name"
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
                        id: "user",
                        title: "User Profile",
                        items:[user_profile],
                        padding: 10
                    }]
                },
                        "map", {
                            id: "featuregrid",
                            layout: "fit",
                            region: "south",
                            border: false,
                            height: 0,
                            split: true,
                            collapseMode: "mini",
                        }]
            }],
            
            tools: [{
                actionTarget: {target: "paneltbar", index: 0},
                outputAction: 0,
                outputConfig: {
                    title: "Login",
                    width: 900,
                    height: 500,
                    modal: true
                },
                actions: [{
                    text: "Login",
                }]
            },{
                ptype: "gxp_layertree",
                outputTarget: "tree",
            }, {
                ptype: "gxp_featuremanager",
                id: "featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 100
            }, {
                ptype: "gxp_featuregrid",
                alwaysDisplayOnMap: true,
                selectOnMap: true,
                displayMode: "selected",
                featureManager: "featuremanager",
                outputTarget: "featuregrid",
                outputConfig: {
                    id: "grid",
                    propertyNames: propertyNames
                },
                controlOptions: {
                    multiple: true,
                }
            }, {
                ptype: "gxp_googlegeocoder",
                outputTarget: "paneltbar",
                outputConfig: {
                    emptyText: "Search for a location ..."
                }
            }, {
                ptype: "gxp_wmsgetfeatureinfo",
                actionTarget: "paneltbar",
                outputConfig: {
                    width: 400
                }
            },{
                ptype: "gxp_legend",
                outputTarget: "west",
                outputConfig: {
                    title: this.legendTabTitle,
                    autoScroll: true
                }
            }, {
                ptype: "gxp_measure",
                actionTarget: {target: "paneltbar", index: 6},
                toggleGroup: "main"
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
                ptype: "gxp_selectedfeatureactions",
                featureManager: "featuremanager",
                actions: [{
                    menuText: "Feature context demo",
                    text: "Feature context demo",
                    urlTemplate: "/geoserver/wms/reflect?layers={layer}&width=377&height=328&format=application/openlayers&featureid={fid}"
                }],
                actionTarget: ["grid.contextMenu", "grid.bbar"],
                outputConfig: {
                    width: 410,
                    height: 410
                }
            }, {
                ptype: "gxp_snappingagent",
                id: "snapping-agent",
                targets: [{
                    source: "local",
                    name: "geonode:trace"
                }]
            }]
        });
        
        FaultedEarth.superclass.constructor.apply(this, arguments);
    }
    
});

var user_profile = new Ext.Panel ({
    labelWidth: 90,
    border:false,
    width: 400,
    hideBorders: true,
    autoScroll: 'true',
    items: [{
        html: '<img src="http://openquake.org/wp-content/uploads/2012/01/Screen-Shot-2012-01-13-at-2.41.04-PM.png">',
    }]
})
