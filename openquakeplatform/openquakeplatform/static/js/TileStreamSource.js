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
var tilestreamPlugin = {

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
    title: "TileStream Layers",

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

        var layers = new Array();

        $.getJSON(TS_URL + '/api/v1/Tileset',
        function(json) {
            for (var i=0; i < json.length; i++) {
                // Get the tile name and zoom level from the tilestream API
                var tileStreamLayerName = json[i].id;
                var tileMaxZoom = json[i].maxzoom;

                // Build the list of layers
                var newLayer = new OpenLayers.Layer.XYZ(
                    tileStreamLayerName,
                    [TS_URL + "/v2/" + tileStreamLayerName + "/${z}/${x}/${y}.png"],
                    OpenLayers.Util.applyDefaults({
                        layername: tileStreamLayerName,
                        numZoomLevels: tileMaxZoom
                    }, options)
                );
                layers.push(newLayer);
            }
            newLayerStore(layers);
        });

        var plugin = this;

        var newLayerStore = function(layers) {
            plugin.store = new GeoExt.data.LayerStore({
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
            plugin.fireEvent("ready", this);
        };
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

};

gxp.plugins.TileStreamSource = Ext.extend(gxp.plugins.LayerSource, tilestreamPlugin);
Ext.preg(gxp.plugins.TileStreamSource.prototype.ptype, gxp.plugins.TileStreamSource);
