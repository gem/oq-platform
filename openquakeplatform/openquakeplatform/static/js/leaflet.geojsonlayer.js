// add tiled vector feature support
L.Path.include({
    _initPath: L.Path.SVG ? function() {

        // tiled vector feature support
        if(this._tilePoint) {
            var map = this._map,
                tilePoint = this._tilePoint,
                tileId = map._zoom+'/'+tilePoint.x+'/'+tilePoint.y,
                cpId = 'cp-'+map._zoom+'-'+tilePoint.x+'-'+tilePoint.y,
                tileContainer = this._tileContainers[tileId];

            if(!tileContainer) {
                tileContainer = this._createElement('g');
                this._tileContainers[tileId] = tileContainer;

                tileContainer.setAttribute('clip-path', 'url(#'+cpId+')');
            }

            this._container = tileContainer;
        }
        else {
            this._container = this._createElement('g');
        }

        this._path = this._createElement('path');
        this._container.appendChild(this._path);
        this._map._pathRoot.appendChild(this._container);

    } : function() {
        var container = this._container = this._createElement('shape');
        L.DomUtil.addClass(container, 'leaflet-vml-shape');
        if (this.options.clickable) {
            L.DomUtil.addClass(container, 'leaflet-clickable');
        }
        container.coordsize = '1 1';

        this._path = this._createElement('path');
        container.appendChild(this._path);

        if(this._tilePoint) {
            var map = this._map,
                tilePoint = this._tilePoint,
                tileId = map._zoom+'/'+tilePoint.x+'/'+tilePoint.y,
                tileContainer = this._tileContainers[tileId];

            if(!tileContainer) {
                tileContainer = document.createElement('div');
                tileContainer.style.position = 'absolute';
                this._tileContainers[tileId] = tileContainer;

                this._map._pathRoot.appendChild(tileContainer);
            }

            if(this._clipRects[tileId]) {
                console.log('using preset cliprect');
                tileContainer.style.clip = this._clipRects[tileId];
                delete this._clipRects[tileId];
            }
            tileContainer.appendChild(container);
        }
        else {
            this._map._pathRoot.appendChild(container);
        }
    },




    onAdd: function (map) {
        this._map = map;

        if (!this._container) {
            this._initElements();
            this._initEvents();
        }

        this.projectLatlngs();
        this._updatePath();

/*
        if (this._container) {
            this._map._pathRoot.appendChild(this._container);
        }
*/

        map.on({
            'viewreset': this.projectLatlngs,
            'moveend': this._updatePath
        }, this);
    },
});

L.GeoJsonTileLayer = L.TileLayer.extend({
    includes: {
        _tileContainers: {},
        _clipRects: {}
    },

    options: {
        unloadInvisibleTiles: true,
        smoothFactor: 0.0,
        noClip: true,

        cache: true,
        dataType: 'json'
    },

    statics: {
        _createSvgElement: function (name) {
            return document.createElementNS(L.Path.SVG_NS, name);
        }
    },

    initialize: function (url, options) {
        L.TileLayer.prototype.initialize.call(this, url, options);

        this.on('tileunload', function(info) {
            var
                tileId = info.tile._tileId,
                tileContainer = this._tileContainers[tileId];

            // TODO: fade out
            try {
                if(tileContainer && tileContainer.parentNode && tileContainer.parentNode.removeChild)
                    tileContainer.parentNode.removeChild(tileContainer);
            }
            catch(e) {
                // nop
            }

            // TODO: fade out
            try {
                delete this._tileContainers[tileId];
            }
            catch(e) {
                // nop
            }
        });
    },

    onAdd: function(map) {
        map._initPathRoot();
        L.TileLayer.prototype.onAdd.call(this, map);
    },

    _createTileProto: function () {
        var el = this._tileEl = L.DomUtil.create('div', 'leaflet-tile');

        var tileSize = this.options.tileSize;
        el.style.width = tileSize + 'px';
        el.style.height = tileSize + 'px';
        //el.style.backgroundColor = 'green';
        //el.style.border = '1px solid red';
    },

    _createTile: function () {
        var tile = this._tileEl.cloneNode(false);
        tile.onselectstart = tile.onmousemove = L.Util.falseFn;
        return tile;
    },

    _loadTile: function (tile, tilePoint) {
        tile._layer = this;
        tile._tileId = this._map._zoom+'/'+tilePoint.x+'/'+tilePoint.y,

        $.ajax({
            url: this.getTileUrl(tilePoint),
            dataType: this.options.dataType,
            cache: this.options.cache,

            success: function(data) {
                var
                    layer = tile._layer,
                    map = layer._map,
                    vectorLayer = L.geoJson(data, {
                        style: layer.options.style
                    });

                layer._propagateTileInfo(vectorLayer, tilePoint);

                // TODO: fade in
                vectorLayer.addTo(map);
                layer._tileOnLoad.call(tile);
            },
            error: function() {
                tile._layer._tileOnError.call(tile);
            }
        });
    },

    _addTile: function (tilePoint, container) {
        L.TileLayer.prototype._addTile.call(this, tilePoint, container);
        this._updateClipPath(tilePoint);
    },

    _updateClipPath: L.Path.SVG ? function(tilePoint) {
        var map = this._map,
            tileSize = this.options.tileSize,
            cpId = 'cp-'+map._zoom+'-'+tilePoint.x+'-'+tilePoint.y,
            pathRoot = map._pathRoot,
            clipRect = this._clipRects[cpId];

        if(!clipRect) {
            var defs = this._svgDefsSection;

            // find/create defs section
            if(!defs) {
                defs = pathRoot.getElementsByTagName('defs');
                if(defs.length > 0) {
                    defs = defs[0];
                }
                else {
                    defs = L.GeoJsonTileLayer._createSvgElement('defs');
                    pathRoot.appendChild(defs);
                }
            }

            clipPath = L.GeoJsonTileLayer._createSvgElement('clipPath');
            clipPath.setAttribute('id', cpId);
            defs.appendChild(clipPath);
            
            clipRect = L.GeoJsonTileLayer._createSvgElement('rect');
            clipPath.appendChild(clipRect);
            this._clipRects[cpId] = clipRect;
        }

        // get clip-px for tile point
        var crs = map.options.crs,
            nwPoint = tilePoint.multiplyBy(tileSize),
            sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),

            nw = map.unproject(nwPoint),
            se = map.unproject(sePoint),
            tl = map.latLngToLayerPoint(nw),
            br = map.latLngToLayerPoint(se);

        var overlap = 0.5;
        clipRect.setAttribute('x', tl.x - overlap);
        clipRect.setAttribute('y', tl.y - overlap);
        clipRect.setAttribute('width', br.x - tl.x + overlap+overlap);
        clipRect.setAttribute('height', br.y - tl.y + overlap+overlap);
    } : function(tilePoint) {
        var map = this._map,
            tileSize = this.options.tileSize,
            tileId = map._zoom+'/'+tilePoint.x+'/'+tilePoint.y,
            tileContainer = this._tileContainers[tileId],
            crs = map.options.crs,
            nwPoint = tilePoint.multiplyBy(tileSize),
            sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),

            nw = map.unproject(nwPoint),
            se = map.unproject(sePoint),
            tl = map.latLngToLayerPoint(nw),
            br = map.latLngToLayerPoint(se);

        var
            overlap = 0,
            clipRect = 'rect('+(tl.y-overlap)+'px '+(br.x+overlap)+'px '+(br.y+overlap+overlap)+'px '+(tl.x-overlap)+'px)';

        if(tileContainer) {
            console.log('updating cliprect');
            tileContainer.style.clip = clipRect;
        } else {
            console.log('presetting cliprect');
            this._clipRects[tileId] = clipRect;
        }
    },

    _propagateTileInfo: function (vectorLayer, tilePoint) {
        if(!vectorLayer._layers) {
            vectorLayer._tilePoint = tilePoint;
            vectorLayer._tileContainers = this._tileContainers;
            vectorLayer._clipRects = this._clipRects;
            return;
        };

        for(name in vectorLayer._layers) {
            if(!vectorLayer._layers.hasOwnProperty(name)) return;
            this._propagateTileInfo(vectorLayer._layers[name], tilePoint);
        }
    }
});

L.geoJsonTileLayer = function (url, options) {
    return new L.GeoJsonTileLayer(url, options);
};