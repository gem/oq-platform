/**

This plugin is based on the MapBoxSource plugin. It was created in order to
render tiles served from a TileStream server. The key difference to note is
that this plugin uses OpenLayers.Layer.XYZ while the MapBox plugin uses TMS.
We are using OpenLayers.Layer.XYZ because TileStream serves its tiles in 
version 2 which is not compatible with TMS.

copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires plugins/LayerSource.js
 * @requires OpenLayers/Layer/TMS.js
 */

/** api: (define)
 *  module = gxp.plugins
 *  class = MapBoxSource
 */

/** api: (extends)
 *  plugins/LayerSource.js
 */
Ext.ns("gxp.plugins");

/** api: constructor
 *  .. class:: MapBoxSource(config)
 *
 *    Plugin for using MapBox layers with :class:`gxp.Viewer` instances.
 *    Freely available for commercial and non-commercial use according to the
 *    MapBox terms of service: http://mapbox.com/tos
 *
 *    Available layer names:
 *     * blue-marble-topo-bathy-jan
 *     * blue-marble-topo-bathy-jul
 *     * blue-marble-topo-jan
 *     * blue-marble-topo-jul
 *     * control-room
 *     * geography-class
 *     * natural-earth-hypso
 *     * natural-earth-hypso-bathy
 *     * natural-earth-1
 *     * natural-earth-2
 *     * world-dark
 *     * world-light
 *     * world-print
 *
 */
/** api: example
 *  The configuration in the ``sources`` property of the :class:`gxp.Viewer` is
 *  straightforward:
 *
 *  .. code-block:: javascript
 *
 *    mapbox: {
 *        ptype: "gxp_mapboxsource"
 *    }
 *
 *  A typical configuration for a layer from this source (in the ``layers``
 *  array of the viewer's ``map`` config option would look like this:
 *
 *  .. code-block:: javascript
 *
 *    {
 *        source: "mapbox",
 *        name: "blue-marble-topo-bathy-jan"
 *    }
 *
 */
gxp.plugins.TileStreamSource = Ext.extend(gxp.plugins.LayerSource, {
    
    /** api: ptype = gxp_mapboxsource */
    ptype: "gxp_tilestreamsource",

    /** api: property[store]
     *  ``GeoExt.data.LayerStore``. Will contain records with name field values
     *  matching MapBox layer names.
     */
    
    /** api: config[title]
     *  ``String``
     *  A descriptive title for this layer source (i18n).
     */
    title: "GEM Tile Layers",
    
    /** i18n **/
    hazardMapPointsWorldTitle: "Hazard Map PGA_0.1",
    whiteBaseTitle: "GEM Base Map",
    gdalCustomUrbanTitle: "GDAL Urban Population",
    gdalCustomRuralTitle: "GDAL Rural Population",
    
    /** api: method[createStore]
     *
     *  Creates a store of layer records.  Fires "ready" when store is loaded.
     */
    createStore: function() {
        
        var options = {
            sphericalMercator: true,
            wrapDateLine: true,
            numZoomLevels: 7
        };
        
        var configs = [
            {name: "hazard-map-points-world", numZoomLevels: 7},
            {name: "white-base", numZoomLevels: 7},
            {name: "gdal-custom-urban", numZoomLevels: 7},
            {name: "gdal-custom-rural", numZoomLevels: 7}
        ];
        
        var len = configs.length;
        var layers = new Array(len);
        var config;
        for (var i=0; i<len; ++i) {
            config = configs[i];
            layers[i] = new OpenLayers.Layer.XYZ(
                this[OpenLayers.String.camelize(config.name) + "Title"],
                [
                    "http://193.206.66.82:8000/v2/" + config.name + "/${z}/${x}/${y}.png"
                ],
                OpenLayers.Util.applyDefaults({
                    layername: config.name,
                    //"abstract": '<div class="thumb-mapbox thumb-mapbox-'+config.name+'"></div>',
                    numZoomLevels: config.numZoomLevels
                }, options)
            );
        }
        
        this.store = new GeoExt.data.LayerStore({
            layers: layers,
            fields: [
                {name: "source", type: "string"},
                {name: "name", type: "string", mapping: "layername"},
                //{name: "abstract", type: "string"},
                {name: "group", type: "string"},
                {name: "fixed", type: "boolean"},
                {name: "selected", type: "boolean"}
            ]
        });
        this.fireEvent("ready", this);

    },
    
    /** api: method[createLayerRecord]
     *  :arg config:  ``Object``  The application config for this layer.
     *  :returns: ``GeoExt.data.LayerRecord``
     *
     *  Create a layer record given the config.
     */
    createLayerRecord: function(config) {
        var record;
        var index = this.store.findExact("name", config.name);
        if (index > -1) {

            record = this.store.getAt(index).copy(Ext.data.Record.id({}));
            var layer = record.getLayer().clone();
 
            // set layer title from config
            if (config.title) {
                /**
                 * Because the layer title data is duplicated, we have
                 * to set it in both places.  After records have been
                 * added to the store, the store handles this
                 * synchronization.
                 */
                layer.setName(config.title);
                record.set("title", config.title);
            }

            // set visibility from config
            if ("visibility" in config) {
                layer.visibility = config.visibility;
            }
            
            record.set("selected", config.selected || false);
            record.set("source", config.source);
            record.set("name", config.name);
            if ("group" in config) {
                record.set("group", config.group);
            }

            record.data.layer = layer;
            record.commit();
        }
        return record;
    }

});

Ext.preg(gxp.plugins.TileStreamSource.prototype.ptype, gxp.plugins.TileStreamSource);

