
Ext.namespace("gxp");
gxp.util = {
    _uniqueNames: {},
    getOGCExceptionText: function (a) {
        var b;
        a && a.exceptions ? (b = [], Ext.each(a.exceptions, function (a) {
            Ext.each(a.texts, function (a) {
                b.push(a)
            })
        }), b = b.join("\n")) : b = "Unknown error (no exception report).";
        return b
    },
    dispatch: function (a, b, c) {
        function d() {
            ++g;
            g === f && b.call(c, h)
        }
        function e(b) {
            window.setTimeout(function () {
                a[b].apply(c, [d, h])
            })
        }
        for (var b = b || Ext.emptyFn, c = c || this, f = a.length, g = 0, h = {}, i = 0; i < f; ++i) e(i)
    },
    uniqueName: function (a, b) {
        var b = b || " ",
            c = RegExp(b + "[0-9]*$"),
            d = a.replace(c,
                ""),
            c = c.exec(a),
            c = void 0 !== this._uniqueNames[d] ? this._uniqueNames[d] : c instanceof Array ? Number(c[0]) : void 0,
            e = d;
        void 0 !== c && (c++, e += b + c);
        this._uniqueNames[d] = c || 0;
        return e
    },
    getAbsoluteUrl: function (a) {
        var b;
        Ext.isIE6 || Ext.isIE7 || Ext.isIE8 ? (b = document.createElement("<a href='" + a + "'/>"), b.style.display = "none", document.body.appendChild(b), b.href = b.href, document.body.removeChild(b)) : (b = document.createElement("a"), b.href = a);
        return b.href
    },
    throttle: function () {
        var a = function (a, c, d) {
            var e, f, g, h, i = function () {
                    a.apply(d ||
                        this, g);
                    e = (new Date).getTime()
                };
            return function () {
                f = (new Date).getTime() - e;
                g = arguments;
                clearTimeout(h);
                !e || f >= c ? i() : h = setTimeout(i, c - f)
            }
        };
        return function (b, c, d) {
            return a(b, c, d)
        }
    }(),
    md5: function () {
        function a(a) {
            return String.fromCharCode(a & 255) + String.fromCharCode(a >>> 8 & 255) + String.fromCharCode(a >>> 16 & 255) + String.fromCharCode(a >>> 24 & 255)
        }
        function b(a) {
            for (; 0 > a;) a += 4294967296;
            for (; 4294967295 < a;) a -= 4294967296;
            return a
        }
        var c = [0, 3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426, 2821735955,
                4249261313, 1770035416, 2336552879, 4294925233, 2304563134, 1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664, 643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448, 568446438, 3275163606, 4107603335, 1163531501, 2850285829, 4243563512, 1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740, 2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074, 3572445317, 76029189, 3654602809, 3873151461, 530742520, 3299628645, 4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690,
                4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649, 4149444226, 3174756917, 718787259, 3951481745
        ],
            d = [
                [function (a, b, c) {
                        return a & b | ~a & c
                    }, [
                        [0, 7, 1],
                        [1, 12, 2],
                        [2, 17, 3],
                        [3, 22, 4],
                        [4, 7, 5],
                        [5, 12, 6],
                        [6, 17, 7],
                        [7, 22, 8],
                        [8, 7, 9],
                        [9, 12, 10],
                        [10, 17, 11],
                        [11, 22, 12],
                        [12, 7, 13],
                        [13, 12, 14],
                        [14, 17, 15],
                        [15, 22, 16]
                    ]
                ],
                [function (a, b, c) {
                        return a & c | b & ~c
                    }, [
                        [1, 5, 17],
                        [6, 9, 18],
                        [11, 14, 19],
                        [0, 20, 20],
                        [5, 5, 21],
                        [10, 9, 22],
                        [15, 14, 23],
                        [4, 20, 24],
                        [9, 5, 25],
                        [14, 9, 26],
                        [3, 14, 27],
                        [8, 20, 28],
                        [13, 5, 29],
                        [2, 9, 30],
                        [7, 14, 31],
                        [12, 20, 32]
                    ]
                ],
                [function (a,
                        b, c) {
                        return a ^ b ^ c
                    }, [
                        [5, 4, 33],
                        [8, 11, 34],
                        [11, 16, 35],
                        [14, 23, 36],
                        [1, 4, 37],
                        [4, 11, 38],
                        [7, 16, 39],
                        [10, 23, 40],
                        [13, 4, 41],
                        [0, 11, 42],
                        [3, 16, 43],
                        [6, 23, 44],
                        [9, 4, 45],
                        [12, 11, 46],
                        [15, 16, 47],
                        [2, 23, 48]
                    ]
                ],
                [function (a, b, c) {
                        return b ^ (a | ~c)
                    }, [
                        [0, 6, 49],
                        [7, 10, 50],
                        [14, 15, 51],
                        [5, 21, 52],
                        [12, 6, 53],
                        [3, 10, 54],
                        [10, 15, 55],
                        [1, 21, 56],
                        [8, 6, 57],
                        [15, 10, 58],
                        [6, 15, 59],
                        [13, 21, 60],
                        [4, 6, 61],
                        [11, 10, 62],
                        [2, 15, 63],
                        [9, 21, 64]
                    ]
                ]
            ];
        return function (e) {
            var f, g, h, i, j, l, p, o, n, k, s;
            f = [1732584193, 4023233417, 2562383102, 271733878];
            g = e.length;
            h = g & 63;
            i = 56 > h ?
                56 - h : 120 - h;
            if (0 < i) {
                e += "\u0080";
                for (h = 0; h < i - 1; h++) e += "\x00"
            }
            e += a(8 * g);
            e += a(0);
            g += i + 8;
            i = [0, 1, 2, 3];
            j = [16];
            l = [4];
            for (k = 0; k < g; k += 64) {
                for (h = 0, n = k; 16 > h; h++, n += 4) j[h] = e.charCodeAt(n) | e.charCodeAt(n + 1) << 8 | e.charCodeAt(n + 2) << 16 | e.charCodeAt(n + 3) << 24;
                for (h = 0; 4 > h; h++) l[h] = f[h];
                for (h = 0; 4 > h; h++) {
                    p = d[h][0];
                    o = d[h][1];
                    for (n = 0; 16 > n; n++) {
                        s = j;
                        var q = l,
                            t = o[n],
                            u = void 0,
                            v = void 0,
                            r = void 0,
                            x = void 0,
                            m = void 0,
                            w = void 0,
                            y = void 0,
                            r = m = void 0,
                            u = i[0],
                            v = i[1],
                            r = i[2],
                            x = i[3],
                            m = t[0],
                            w = t[1],
                            y = t[2],
                            r = p(q[v], q[r], q[x]),
                            m = q[u] + r + s[m] + c[y],
                            m = b(m),
                            m = m << w | m >>> 32 - w,
                            m = m + q[v];
                        q[u] = b(m);
                        s = i[0];
                        i[0] = i[3];
                        i[3] = i[2];
                        i[2] = i[1];
                        i[1] = s
                    }
                }
                for (h = 0; 4 > h; h++) f[h] += l[h], f[h] = b(f[h])
            }
            h = a(f[0]) + a(f[1]) + a(f[2]) + a(f[3]);
            f = "";
            for (e = 0; 16 > e; e++) g = h.charCodeAt(e), f += "0123456789abcdef".charAt(g >> 4 & 15), f += "0123456789abcdef".charAt(g & 15);
            return f
        }
    }()
};
Ext.namespace("gxp.plugins");
gxp.plugins.LayerSource = Ext.extend(Ext.util.Observable, {
    store: null,
    lazy: !1,
    hidden: !1,
    title: "",
    constructor: function (a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        this.addEvents("ready", "failure");
        gxp.plugins.LayerSource.superclass.constructor.apply(this, arguments)
    },
    init: function (a) {
        this.target = a;
        this.createStore()
    },
    getMapProjection: function () {
        var a = this.target.mapPanel.map.projection;
        return this.target.mapPanel.map.getProjectionObject() || a && new OpenLayers.Projection(a) || new OpenLayers.Projection("EPSG:4326")
    },
    getProjection: function (a) {
        var a = a.getLayer(),
            b = this.getMapProjection();
        return (a.projection ? a.projection instanceof OpenLayers.Projection ? a.projection : new OpenLayers.Projection(a.projection) : b).equals(b) ? b : null
    },
    createStore: function () {
        this.fireEvent("ready", this)
    },
    createLayerRecord: function () {},
    getConfigForRecord: function (a) {
        var b = a.getLayer();
        return {
            source: a.get("source"),
            name: a.get("name"),
            title: a.get("title"),
            visibility: b.getVisibility(),
            opacity: b.opacity || void 0,
            group: a.get("group"),
            fixed: a.get("fixed"),
            selected: a.get("selected")
        }
    },
    getState: function () {
        return Ext.apply({}, this.initialConfig)
    }
});
(function () {
    function a(a) {
        var c = this.meta.format;
        if ("string" === typeof a || a.nodeType) {
            var a = c.read(a),
                d = c.read;
            c.read = function () {
                c.read = d;
                return a
            }
        }
        this.raw = a
    }
    Ext.intercept(GeoExt.data.WMSCapabilitiesReader.prototype, "readRecords", a);
    GeoExt.data.AttributeReader && Ext.intercept(GeoExt.data.AttributeReader.prototype, "readRecords", a)
})();
Ext.namespace("gxp.plugins");
gxp.plugins.WMSSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_wmssource",
    baseParams: null,
    format: null,
    describeLayerStore: null,
    describedLayers: null,
    schemaCache: null,
    ready: !1,
    requiredProperties: ["title", "bbox"],
    constructor: function (a) {
        if (a && !0 === a.forceLazy) a.requiredProperties = [], delete a.forceLazy, window.console && console.warn("Deprecated config option 'forceLazy: true' for layer source '" + a.id + "'. Use 'requiredProperties: []' instead.");
        gxp.plugins.WMSSource.superclass.constructor.apply(this,
            arguments);
        if (!this.format) this.format = new OpenLayers.Format.WMSCapabilities({
                keepData: !0
            })
    },
    init: function (a) {
        gxp.plugins.WMSSource.superclass.init.apply(this, arguments);
        this.target.on("authorizationchange", this.onAuthorizationChange, this)
    },
    onAuthorizationChange: function () {
        this.store && "/" === this.url.charAt(0) && this.store.reload()
    },
    destroy: function () {
        this.target.un("authorizationchange", this.onAuthorizationChange, this);
        gxp.plugins.WMSSource.superclass.destroy.apply(this, arguments)
    },
    isLazy: function () {
        var a = !0,
            b = this.target.initialConfig.map;
        if (b && b.layers) for (var c, d = 0, e = b.layers.length; d < e && !(c = b.layers[d], c.source === this.id && (a = this.layerConfigComplete(c), !1 === a)); ++d);
        return a
    },
    layerConfigComplete: function (a) {
        var b = !0;
        if (!Ext.isObject(a.capability)) for (var c = this.requiredProperties, d = c.length - 1; 0 <= d && !(b = !! a[c[d]], !1 === b); --d);
        return b
    },
    createStore: function () {
        var a = this.baseParams || {
            SERVICE: "WMS",
            REQUEST: "GetCapabilities"
        };
        if (this.version) a.VERSION = this.version;
        var b = this.isLazy();
        this.store = new GeoExt.data.WMSCapabilitiesStore({
            url: this.trimUrl(this.url,
                a),
            baseParams: a,
            format: this.format,
            autoLoad: !b,
            layerParams: {
                exceptions: null
            },
            listeners: {
                load: function () {
                    if (!this.store.reader.raw || !this.store.reader.raw.service) this.fireEvent("failure", this, "Invalid capabilities document.");
                    else {
                        if (!this.title) this.title = this.store.reader.raw.service.title;
                        this.ready ? this.lazy = !1 : (this.ready = !0, this.fireEvent("ready", this))
                    }
                    delete this.format.data
                },
                exception: function (a, b, e, f, g, h) {
                    delete this.store;
                    a = "";
                    "response" === b ? "string" == typeof h ? b = h : (b = "Invalid response from server.", (a = this.format && this.format.data) && a.parseError && (b += "  " + a.parseError.reason + " - line: " + a.parseError.line), g = g.status, a = 200 <= g && 300 > g ? gxp.util.getOGCExceptionText(h && h.arg && h.arg.exceptionReport) : "Status: " + g) : (b = "Trouble creating layer store from response.", a = "Unable to handle response.");
                    this.fireEvent("failure", this, b, a);
                    delete this.format.data
                },
                scope: this
            }
        });
        if (b) this.lazy = !0, Ext.Ajax.request({
                method: "GET",
                url: this.url,
                params: {
                    SERVICE: "WMS"
                },
                callback: function (a, b, e) {
                    a = e.status;
                    200 <= a && 403 > a &&
                        e.responseText ? (this.ready = !0, this.fireEvent("ready", this)) : this.fireEvent("failure", this, "Layer source not available.", "Unable to contact WMS service.")
                },
                scope: this
            })
    },
    trimUrl: function (a, b) {
        var c = OpenLayers.Util.getParameters(a),
            b = OpenLayers.Util.upperCaseObject(b),
            d = 0,
            e;
        for (e in c)++d, e.toUpperCase() in b && (--d, delete c[e]);
        return a.split("?").shift() + (d ? "?" + OpenLayers.Util.getParameterString(c) : "")
    },
    createLazyLayerRecord: function (a) {
        var a = Ext.apply({}, a),
            b = a.srs || this.target.map.projection;
        a.srs = {};
        a.srs[b] = !0;
        var c = a.bbox || this.target.map.maxExtent || OpenLayers.Projection.defaults[b].maxExtent;
        a.bbox = {};
        a.bbox[b] = {
            bbox: c
        };
        c = this.store && this.store instanceof GeoExt.data.WMSCapabilitiesStore ? new this.store.recordType(a) : new GeoExt.data.LayerRecord(a);
        c.setLayer(new OpenLayers.Layer.WMS(a.title || a.name, a.url || this.url, {
            layers: a.name,
            transparent: "transparent" in a ? a.transparent : !0,
            cql_filter: a.cql_filter,
            format: a.format
        }, {
            projection: b
        }));
        c.json = a;
        return c
    },
    createLayerRecord: function (a) {
        var b,
            c, d = this.store.findExact("name", a.name); - 1 < d ? c = this.store.getAt(d) : Ext.isObject(a.capability) ? c = this.store.reader.readRecords({
            capability: {
                request: {
                    getmap: {
                        href: this.trimUrl(this.url, this.baseParams)
                    }
                },
                layers: [a.capability]
            }
        }).records[0] : this.layerConfigComplete(a) && (c = this.createLazyLayerRecord(a));
        if (c) {
            b = c.getLayer().clone();
            var d = this.getMapProjection(),
                e = this.getProjection(c),
                f = (e || d).getCode(),
                g = c.get("bbox"),
                h;
            if (g && g[f]) b.addOptions({
                    projection: e
                }), h = OpenLayers.Bounds.fromArray(g[f].bbox,
                    b.reverseAxisOrder());
            else if (e = c.get("llbbox")) d = OpenLayers.Bounds.fromArray(e).transform("EPSG:4326", d), 0 < 1 / d.getHeight() && 0 < 1 / d.getWidth() && (h = d);
            b.mergeNewParams({
                STYLES: a.styles,
                FORMAT: a.format,
                TRANSPARENT: a.transparent,
                CQL_FILTER: a.cql_filter
            });
            d = !1;
            "tiled" in a ? d = !a.tiled : c.data.dimensions && c.data.dimensions.time && (d = !0);
            b.setName(a.title || b.name);
            b.addOptions({
                attribution: b.attribution,
                maxExtent: h,
                restrictedExtent: h,
                singleTile: d,
                ratio: a.ratio || 1,
                visibility: "visibility" in a ? a.visibility : !0,
                opacity: "opacity" in a ? a.opacity : 1,
                buffer: "buffer" in a ? a.buffer : 1,
                dimensions: c.data.dimensions,
                transitionEffect: d ? "resize" : null,
                minScale: a.minscale,
                maxScale: a.maxscale
            });
            h = Ext.applyIf({
                title: b.name,
                group: a.group,
                infoFormat: a.infoFormat,
                source: a.source,
                properties: "gxp_wmslayerpanel",
                fixed: a.fixed,
                selected: "selected" in a ? a.selected : !1,
                restUrl: this.restUrl,
                layer: b
            }, c.data);
            var i = [{
                    name: "source",
                    type: "string"
                }, {
                    name: "group",
                    type: "string"
                }, {
                    name: "properties",
                    type: "string"
                }, {
                    name: "fixed",
                    type: "boolean"
                }, {
                    name: "selected",
                    type: "boolean"
                }, {
                    name: "restUrl",
                    type: "string"
                }, {
                    name: "infoFormat",
                    type: "string"
                }
            ];
            c.fields.each(function (a) {
                i.push(a)
            });
            b = new(GeoExt.data.LayerRecord.create(i))(h, b.id);
            b.json = a
        } else window.console && 0 < this.store.getCount() && void 0 !== a.name && console.warn("Could not create layer record for layer '" + a.name + "'. Check if the layer is found in the WMS GetCapabilities response.");
        return b
    },
    getProjection: function (a) {
        var b = this.getMapProjection(),
            c = b,
            a = a.get("srs");
        if (!a[b.getCode()]) {
            var c =
                null,
                d, e;
            for (e in a) if ((d = new OpenLayers.Projection(e)).equals(b)) {
                    c = d;
                    break
                }
        }
        return c
    },
    initDescribeLayerStore: function () {
        var a = this.store.reader.raw;
        this.lazy && (a = {
            capability: {
                request: {
                    describelayer: {
                        href: this.url
                    }
                }
            },
            version: this.version || "1.1.1"
        });
        var b = a.capability.request.describelayer;
        if (b) a = a.version, 1.1 < parseFloat(a) && (a = "1.1.1"), a = {
                SERVICE: "WMS",
                VERSION: a,
                REQUEST: "DescribeLayer"
        }, this.describeLayerStore = new GeoExt.data.WMSDescribeLayerStore({
            url: this.trimUrl(b.href, a),
            baseParams: a
        })
    },
    describeLayer: function (a,
        b, c) {
        function d(a) {
            window.setTimeout(function () {
                b.call(c, a)
            }, 0)
        }
        this.describeLayerStore || this.initDescribeLayerStore();
        if (this.describeLayerStore) {
            if (!this.describedLayers) this.describedLayers = {};
            var e = a.getLayer().params.LAYERS,
                a = function () {
                    for (var a = Ext.isArray(arguments[1]) ? arguments[1] : arguments[0], d, g, l = a.length - 1; 0 <= l; l--) {
                        d = a[l];
                        g = d.get("layerName");
                        if (g == e) {
                            this.describeLayerStore.un("load", arguments.callee, this);
                            this.describedLayers[g] = !0;
                            b.call(c, d);
                            return
                        }
                        "function" == typeof this.describedLayers[g] &&
                            (d = this.describedLayers[g], this.describeLayerStore.un("load", d, this), d.apply(this, arguments))
                    }
                    delete f[e];
                    b.call(c, !1)
                }, f = this.describedLayers,
                g;
            if (f[e]) if (-1 == (g = this.describeLayerStore.findExact("layerName", e))) this.describeLayerStore.on("load", a, this);
                else d(this.describeLayerStore.getAt(g));
                else f[e] = a, this.describeLayerStore.load({
                        params: {
                            LAYERS: e
                        },
                        add: !0,
                        callback: a,
                        scope: this
                    })
        } else d(!1)
    },
    fetchSchema: function (a, b, c, d) {
        var e = this.schemaCache[b];
        if (e) if (0 == e.getCount()) e.on("load", function () {
                    c.call(d,
                        e)
                }, this, {
                    single: !0
                });
            else c.call(d, e);
            else e = new GeoExt.data.AttributeStore({
                    url: a,
                    baseParams: {
                        SERVICE: "WFS",
                        VERSION: "1.1.0",
                        REQUEST: "DescribeFeatureType",
                        TYPENAME: b
                    },
                    autoLoad: !0,
                    listeners: {
                        load: function () {
                            c.call(d, e)
                        },
                        scope: this
                    }
                }), this.schemaCache[b] = e
    },
    getSchema: function (a, b, c) {
        if (!this.schemaCache) this.schemaCache = {};
        this.describeLayer(a, function (d) {
            if (d && "WFS" == d.get("owsType")) {
                var e = d.get("typeName");
                this.fetchSchema(d.get("owsURL"), e, b, c)
            } else d ? b.call(c, !1) : this.fetchSchema(this.url, a.get("name"),
                    b, c)
        }, this)
    },
    getWFSProtocol: function (a, b, c) {
        this.getSchema(a, function (d) {
            var e = !1;
            if (d) {
                var f, g = /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/;
                d.each(function (a) {
                    g.exec(a.get("type")) && (f = a.get("name"))
                }, this);
                e = new OpenLayers.Protocol.WFS({
                    version: "1.1.0",
                    srsName: a.getLayer().projection.getCode(),
                    url: d.url,
                    featureType: d.reader.raw.featureTypes[0].typeName,
                    featureNS: d.reader.raw.targetNamespace,
                    geometryName: f
                })
            }
            b.call(c, e, d, a)
        }, this)
    },
    getConfigForRecord: function (a) {
        var b = Ext.applyIf(gxp.plugins.WMSSource.superclass.getConfigForRecord.apply(this,
            arguments), a.json),
            c = a.getLayer(),
            d = c.params,
            e = c.options,
            f = b.name,
            g = this.store.reader.raw;
        if (g) for (var g = g.capability.layers, h = g.length - 1; 0 <= h; --h) if (g[h].name === f) {
                    b.capability = Ext.apply({}, g[h]);
                    f = {};
                    f[c.projection.getCode()] = !0;
                    b.capability.srs = f;
                    break
                }
        if (!b.capability) {
            if (c.maxExtent) b.bbox = c.maxExtent.toArray();
            b.srs = c.projection.getCode()
        }
        return Ext.apply(b, {
            format: d.FORMAT,
            styles: d.STYLES,
            transparent: d.TRANSPARENT,
            cql_filter: d.CQL_FILTER,
            minscale: e.minScale,
            maxscale: e.maxScale,
            infoFormat: a.get("infoFormat")
        })
    },
    getState: function () {
        var a = gxp.plugins.WMSSource.superclass.getState.apply(this, arguments);
        return Ext.applyIf(a, {
            title: this.title
        })
    }
});
Ext.preg(gxp.plugins.WMSSource.prototype.ptype, gxp.plugins.WMSSource);
Ext.namespace("gxp.plugins");
gxp.plugins.WMSCSource = Ext.extend(gxp.plugins.WMSSource, {
    ptype: "gxp_wmscsource",
    version: "1.1.1",
    constructor: function (a) {
        a.baseParams = {
            SERVICE: "WMS",
            REQUEST: "GetCapabilities",
            TILED: !0
        };
        if (!a.format) this.format = new OpenLayers.Format.WMSCapabilities({
                keepData: !0,
                profile: "WMSC"
            });
        gxp.plugins.WMSCSource.superclass.constructor.apply(this, arguments)
    },
    createLayerRecord: function (a) {
        var b = gxp.plugins.WMSCSource.superclass.createLayerRecord.apply(this, arguments);
        if (b) {
            var c, d;
            if (this.store.reader.raw) c = this.store.reader.raw.capability;
            var e = c && c.vendorSpecific ? c.vendorSpecific.tileSets : a.capability && a.capability.tileSets;
            c = b.get("layer");
            if (e) for (var f = this.getProjection(b) || this.getMapProjection(), g = 0, h = e.length; g < h; g++) {
                    var i = e[g];
                    if (i.layers === c.params.LAYERS) {
                        var j;
                        for (d in i.srs) {
                            j = new OpenLayers.Projection(d);
                            break
                        }
                        if (f.equals(j)) {
                            d = i.bbox[d].bbox;
                            c.projection = j;
                            c.addOptions({
                                resolutions: i.resolutions,
                                tileSize: new OpenLayers.Size(i.width, i.height),
                                tileOrigin: new OpenLayers.LonLat(d[0], d[1])
                            });
                            break
                        }
                    }
            } else if (this.lazy && (j =
                a.tileSize, d = a.tileOrigin, c.addOptions({
                resolutions: a.resolutions,
                tileSize: j ? new OpenLayers.Size(j[0], j[1]) : void 0,
                tileOrigin: d ? OpenLayers.LonLat.fromArray(d) : void 0
            }), !d && (this.target.map.maxExtent ? j = this.target.map.maxExtent : (d = a.srs || this.target.map.projection, j = OpenLayers.Projection.defaults[d].maxExtent), j))) c.tileOrigin = OpenLayers.LonLat.fromArray(j);
            c.params.TILED = !1 !== a.cached && !0;
            return b
        }
    },
    getConfigForRecord: function (a) {
        var b = gxp.plugins.WMSCSource.superclass.getConfigForRecord.apply(this,
            arguments),
            c = b.name,
            d, e = a.getLayer();
        if (b.capability && this.store.reader.raw) {
            d = this.store.reader.raw.capability;
            var f = d.vendorSpecific && d.vendorSpecific.tileSets;
            if (f) for (var g = f.length - 1; 0 <= g; --g) if (d = f[g], d.layers === c && d.srs[e.projection]) {
                        b.capability.tileSets = [d];
                        break
                    }
        }
        if (!b.capability || !b.capability.tileSets) {
            if (c = e.options.tileSize) b.tileSize = [c.w, c.h];
            b.tileOrigin = e.options.tileOrigin;
            b.resolutions = e.options.resolutions
        }
        return Ext.applyIf(b, {
            cached: !! e.params.TILED
        })
    }
});
Ext.preg(gxp.plugins.WMSCSource.prototype.ptype, gxp.plugins.WMSCSource);
Ext.namespace("gxp.plugins");
gxp.plugins.BingSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_bingsource",
    title: "Bing Layers",
    roadTitle: "Bing Roads",
    aerialTitle: "Bing Aerial",
    labeledAerialTitle: "Bing Aerial With Labels",
    apiKey: "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf",
    createStore: function () {
        var a = [new OpenLayers.Layer.Bing({
                key: this.apiKey,
                name: this.roadTitle,
                type: "Road",
                buffer: 1,
                transitionEffect: "resize"
            }), new OpenLayers.Layer.Bing({
                key: this.apiKey,
                name: this.aerialTitle,
                type: "Aerial",
                buffer: 1,
                transitionEffect: "resize"
            }),
                new OpenLayers.Layer.Bing({
                key: this.apiKey,
                name: this.labeledAerialTitle,
                type: "AerialWithLabels",
                buffer: 1,
                transitionEffect: "resize"
            })
        ];
        this.store = new GeoExt.data.LayerStore({
            layers: a,
            fields: [{
                    name: "source",
                    type: "string"
                }, {
                    name: "name",
                    type: "string",
                    mapping: "type"
                }, {
                    name: "abstract",
                    type: "string",
                    mapping: "attribution"
                }, {
                    name: "group",
                    type: "string",
                    defaultValue: "background"
                }, {
                    name: "fixed",
                    type: "boolean",
                    defaultValue: !0
                }, {
                    name: "selected",
                    type: "boolean"
                }
            ]
        });
        this.store.each(function (a) {
            a.set("group", "background")
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function (a) {
        var b, c = this.store.findExact("name", a.name);
        if (-1 < c) {
            b = this.store.getAt(c).copy(Ext.data.Record.id({}));
            c = b.getLayer().clone();
            a.title && (c.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) c.visibility = a.visibility;
            b.set("selected", a.selected || !1);
            b.set("source", a.source);
            b.set("name", a.name);
            "group" in a && b.set("group", a.group);
            b.data.layer = c;
            b.commit()
        }
        return b
    }
});
Ext.preg(gxp.plugins.BingSource.prototype.ptype, gxp.plugins.BingSource);
Ext.namespace("gxp.plugins");
gxp.plugins.GoogleSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_googlesource",
    timeout: 7E3,
    title: "Google Layers",
    roadmapAbstract: "Show street map",
    satelliteAbstract: "Show satellite imagery",
    hybridAbstract: "Show imagery with street names",
    terrainAbstract: "Show street map with terrain",
    otherParams: "sensor=false",
    constructor: function (a) {
        this.config = a;
        gxp.plugins.GoogleSource.superclass.constructor.apply(this, arguments)
    },
    createStore: function () {
        gxp.plugins.GoogleSource.loader.onLoad({
            otherParams: this.otherParams,
            timeout: this.timeout,
            callback: this.syncCreateStore,
            errback: function () {
                delete this.store;
                this.fireEvent("failure", this, "The Google Maps script failed to load within the provided timeout (" + this.timeout / 1E3 + " s).")
            },
            scope: this
        })
    },
    syncCreateStore: function () {
        var a = {
            ROADMAP: {
                "abstract": this.roadmapAbstract,
                MAX_ZOOM_LEVEL: 20
            },
            SATELLITE: {
                "abstract": this.satelliteAbstract
            },
            HYBRID: {
                "abstract": this.hybridAbstract
            },
            TERRAIN: {
                "abstract": this.terrainAbstract,
                MAX_ZOOM_LEVEL: 15
            }
        }, b = [],
            c, d;
        for (c in a) d = google.maps.MapTypeId[c], b.push(new OpenLayers.Layer.Google("Google " +
                d.replace(/\w/, function (a) {
                return a.toUpperCase()
            }), {
                type: d,
                typeName: c,
                MAX_ZOOM_LEVEL: a[c].MAX_ZOOM_LEVEL,
                maxExtent: new OpenLayers.Bounds(-2.003750834E7, -2.003750834E7, 2.003750834E7, 2.003750834E7),
                restrictedExtent: new OpenLayers.Bounds(-2.003750834E7, -2.003750834E7, 2.003750834E7, 2.003750834E7),
                projection: this.projection
            }));
        this.store = new GeoExt.data.LayerStore({
            layers: b,
            fields: [{
                    name: "source",
                    type: "string"
                }, {
                    name: "name",
                    type: "string",
                    mapping: "typeName"
                }, {
                    name: "abstract",
                    type: "string"
                }, {
                    name: "group",
                    type: "string",
                    defaultValue: "background"
                }, {
                    name: "fixed",
                    type: "boolean",
                    defaultValue: !0
                }, {
                    name: "selected",
                    type: "boolean"
                }
            ]
        });
        this.store.each(function (b) {
            b.set("abstract", a[b.get("name")]["abstract"])
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function (a) {
        var b, c = function (b) {
                return b.get("name") === a.name
            };
        if (-1 == this.target.mapPanel.layers.findBy(c)) {
            b = this.store.getAt(this.store.findBy(c)).clone();
            c = b.getLayer();
            a.title && (c.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) c.visibility =
                    a.visibility;
            b.set("selected", a.selected || !1);
            b.set("source", a.source);
            b.set("name", a.name);
            "group" in a && b.set("group", a.group);
            b.commit()
        }
        return b
    }
});
gxp.plugins.GoogleSource.loader = new(Ext.extend(Ext.util.Observable, {
    ready: !(!window.google || !google.maps),
    loading: !1,
    constructor: function () {
        this.addEvents("ready", "failure");
        return Ext.util.Observable.prototype.constructor.apply(this, arguments)
    },
    onScriptLoad: function () {
        var a = gxp.plugins.GoogleSource.loader;
        if (!a.ready) a.ready = !0, a.loading = !1, a.fireEvent("ready")
    },
    onLoad: function (a) {
        if (this.ready) window.setTimeout(function () {
                a.callback.call(a.scope)
            }, 0);
        else if (this.loading) this.on({
                ready: a.callback,
                failure: a.errback || Ext.emptyFn,
                scope: a.scope
            });
        else this.loadScript(a)
    },
    loadScript: function (a) {
        function b() {
            document.getElementsByTagName("head")[0].appendChild(d)
        }
        var c = {
            autoload: Ext.encode({
                modules: [{
                        name: "maps",
                        version: 3.3,
                        nocss: "true",
                        callback: "gxp.plugins.GoogleSource.loader.onScriptLoad",
                        other_params: a.otherParams
                    }
                ]
            })
        }, d = document.createElement("script");
        d.src = "http://www.google.com/jsapi?" + Ext.urlEncode(c);
        var e = a.errback || Ext.emptyFn,
            c = a.timeout || gxp.plugins.GoogleSource.prototype.timeout;
        window.setTimeout(function () {
            if (!gxp.plugins.GoogleSource.loader.ready) this.ready = this.loading = !1, document.getElementsByTagName("head")[0].removeChild(d), e.call(a.scope), this.fireEvent("failure"), this.purgeListeners()
        }.createDelegate(this), c);
        this.on({
            ready: a.callback,
            scope: a.scope
        });
        this.loading = !0;
        if (document.body) b();
        else Ext.onReady(b)
    }
}));
Ext.preg(gxp.plugins.GoogleSource.prototype.ptype, gxp.plugins.GoogleSource);
Ext.namespace("gxp.plugins");
gxp.plugins.MapBoxSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_mapboxsource",
    title: "MapBox Layers",
    blueMarbleTopoBathyJanTitle: "Blue Marble Topography & Bathymetry (January)",
    blueMarbleTopoBathyJulTitle: "Blue Marble Topography & Bathymetry (July)",
    blueMarbleTopoJanTitle: "Blue Marble Topography (January)",
    blueMarbleTopoJulTitle: "Blue Marble Topography (July)",
    controlRoomTitle: "Control Room",
    geographyClassTitle: "Geography Class",
    naturalEarthHypsoTitle: "Natural Earth Hypsometric",
    naturalEarthHypsoBathyTitle: "Natural Earth Hypsometric & Bathymetry",
    naturalEarth1Title: "Natural Earth I",
    naturalEarth2Title: "Natural Earth II",
    worldDarkTitle: "World Dark",
    worldLightTitle: "World Light",
    worldGlassTitle: "World Glass",
    worldPrintTitle: "World Print",
    createStore: function () {
        for (var a = {
            projection: "EPSG:900913",
            numZoomLevels: 19,
            serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613,
                    38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135
            ],
            buffer: 1
        }, b = [{
                    name: "blue-marble-topo-bathy-jan",
                    numZoomLevels: 9
                }, {
                    name: "blue-marble-topo-bathy-jul",
                    numZoomLevels: 9
                }, {
                    name: "blue-marble-topo-jan",
                    numZoomLevels: 9
                }, {
                    name: "blue-marble-topo-jul",
                    numZoomLevels: 9
                }, {
                    name: "control-room",
                    numZoomLevels: 9
                }, {
                    name: "geography-class",
                    numZoomLevels: 9
                }, {
                    name: "natural-earth-hypso",
                    numZoomLevels: 7
                }, {
                    name: "natural-earth-hypso-bathy",
                    numZoomLevels: 7
                }, {
                    name: "natural-earth-1",
                    numZoomLevels: 7
                }, {
                    name: "natural-earth-2",
                    numZoomLevels: 7
                }, {
                    name: "world-dark",
                    numZoomLevels: 12
                }, {
                    name: "world-light",
                    numZoomLevels: 12
                }, {
                    name: "world-glass",
                    numZoomLevels: 11
                }, {
                    name: "world-print",
                    numZoomLevels: 10
                }
            ], c = b.length, d = Array(c), e, f = 0; f < c; ++f) e = b[f], d[f] = new OpenLayers.Layer.TMS(this[OpenLayers.String.camelize(e.name) + "Title"], ["http://a.tiles.mapbox.com/mapbox/", "http://b.tiles.mapbox.com/mapbox/", "http://c.tiles.mapbox.com/mapbox/", "http://d.tiles.mapbox.com/mapbox/"],
                OpenLayers.Util.applyDefaults({
                attribution: /^world/.test(name) ? "<a href='http://mapbox.com'>MapBox</a> | Some Data &copy; OSM CC-BY-SA | <a href='http://mapbox.com/tos'>Terms of Service</a>" : "<a href='http://mapbox.com'>MapBox</a> | <a href='http://mapbox.com/tos'>Terms of Service</a>",
                type: "png",
                tileOrigin: new OpenLayers.LonLat(-2.003750834E7, -2.003750834E7),
                layername: e.name,
                "abstract": '<div class="thumb-mapbox thumb-mapbox-' + e.name + '"></div>',
                numZoomLevels: e.numZoomLevels
            }, a));
        this.store = new GeoExt.data.LayerStore({
            layers: d,
            fields: [{
                    name: "source",
                    type: "string"
                }, {
                    name: "name",
                    type: "string",
                    mapping: "layername"
                }, {
                    name: "abstract",
                    type: "string"
                }, {
                    name: "group",
                    type: "string"
                }, {
                    name: "fixed",
                    type: "boolean"
                }, {
                    name: "selected",
                    type: "boolean"
                }
            ]
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function (a) {
        var b, c = this.store.findExact("name", a.name);
        if (-1 < c) {
            b = this.store.getAt(c).copy(Ext.data.Record.id({}));
            c = b.getLayer().clone();
            a.title && (c.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) c.visibility = a.visibility;
            b.set("selected",
                a.selected || !1);
            b.set("source", a.source);
            b.set("name", a.name);
            "group" in a && b.set("group", a.group);
            b.data.layer = c;
            b.commit()
        }
        return b
    }
});
Ext.preg(gxp.plugins.MapBoxSource.prototype.ptype, gxp.plugins.MapBoxSource);


Ext.namespace("gxp.plugins");
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
    title: "Tile Stream Layers",
    
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
            numZoomLevels: 7,
        };
        
        var configs = [
            {name: "hazard-map-points-world", numZoomLevels: 7},
            {name: "white-base", numZoomLevels: 7},
            {name: "gdal-custom-urban", numZoomLevels: 7},
            {name: "gdal-custom-rural", numZoomLevels: 7},
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

Ext.namespace("gxp.plugins");
gxp.plugins.MapQuestSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_mapquestsource",
    title: "MapQuest Layers",
    osmAttribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
    osmTitle: "MapQuest OpenStreetMap",
    naipAttribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
    naipTitle: "MapQuest Imagery",
    createStore: function () {
        var a = {
            projection: "EPSG:900913",
            maxExtent: new OpenLayers.Bounds(-2.00375083392E7, -2.00375083392E7, 2.00375083392E7, 2.00375083392E7),
            maxResolution: 156543.03390625,
            numZoomLevels: 19,
            units: "m",
            buffer: 1,
            transitionEffect: "resize",
            tileOptions: {
                crossOriginKeyword: null
            }
        }, a = [new OpenLayers.Layer.OSM(this.osmTitle, ["http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
                        "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"
                ], OpenLayers.Util.applyDefaults({
                    attribution: this.osmAttribution,
                    type: "osm"
                }, a)), new OpenLayers.Layer.OSM(this.naipTitle, ["http://oatile1.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile2.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile3.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile4.mqcdn.com/naip/${z}/${x}/${y}.png"], OpenLayers.Util.applyDefaults({
                    attribution: this.naipAttribution,
                    type: "naip"
                }, a))];
        this.store = new GeoExt.data.LayerStore({
            layers: a,
            fields: [{
                    name: "source",
                    type: "string"
                }, {
                    name: "name",
                    type: "string",
                    mapping: "type"
                }, {
                    name: "abstract",
                    type: "string",
                    mapping: "attribution"
                }, {
                    name: "group",
                    type: "string",
                    defaultValue: "background"
                }, {
                    name: "fixed",
                    type: "boolean",
                    defaultValue: !0
                }, {
                    name: "selected",
                    type: "boolean"
                }
            ]
        });
        this.store.each(function (a) {
            a.set("group", "background")
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function (a) {
        var b, c = this.store.findExact("name", a.name);
        if (-1 < c) {
            b = this.store.getAt(c).copy(Ext.data.Record.id({}));
            c = b.getLayer().clone();
            a.title && (c.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) c.visibility = a.visibility;
            b.set("selected", a.selected || !1);
            b.set("source", a.source);
            b.set("name", a.name);
            "group" in a && b.set("group", a.group);
            b.data.layer = c;
            b.commit()
        }
        return b
    }
});
Ext.preg(gxp.plugins.MapQuestSource.prototype.ptype, gxp.plugins.MapQuestSource);
Ext.namespace("gxp.plugins");
gxp.plugins.OLSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_olsource",
    createLayerRecord: function (a) {
        var b, c = window;
        b = a.type.split(".");
        for (var d = 0, e = b.length; d < e && !(c = c[b[d]], !c); ++d);
        if (c && c.prototype && c.prototype.initialize) {
            b = function () {
                c.prototype.initialize.apply(this, a.args)
            };
            b.prototype = c.prototype;
            b = new b;
            if ("visibility" in a) b.visibility = a.visibility;
            b = new(GeoExt.data.LayerRecord.create([{
                    name: "name",
                    type: "string"
                }, {
                    name: "source",
                    type: "string"
                }, {
                    name: "group",
                    type: "string"
                }, {
                    name: "fixed",
                    type: "boolean"
                }, {
                    name: "selected",
                    type: "boolean"
                }, {
                    name: "type",
                    type: "string"
                }, {
                    name: "args"
                }
            ]))({
                layer: b,
                title: b.name,
                name: a.name || b.name,
                source: a.source,
                group: a.group,
                fixed: "fixed" in a ? a.fixed : !1,
                selected: "selected" in a ? a.selected : !1,
                type: a.type,
                args: a.args,
                properties: "properties" in a ? a.properties : void 0
            }, b.id)
        } else throw Error("Cannot construct OpenLayers layer from given type: " + a.type);
        return b
    },
    getConfigForRecord: function (a) {
        var b = gxp.plugins.OLSource.superclass.getConfigForRecord.apply(this, arguments);
        a.getLayer();
        return Ext.apply(b, {
            type: a.get("type"),
            args: a.get("args")
        })
    }
});
Ext.preg(gxp.plugins.OLSource.prototype.ptype, gxp.plugins.OLSource);
Ext.namespace("gxp.plugins");
gxp.plugins.StyleWriter = Ext.extend(Ext.util.Observable, {
    deletedStyles: null,
    constructor: function (a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        this.deletedStyles = [];
        gxp.plugins.StyleWriter.superclass.constructor.apply(this, arguments)
    },
    init: function (a) {
        this.target = a;
        a.stylesStore.on({
            remove: function (a, c) {
                var d = c.get("name");
                c.get("name") === d && this.deletedStyles.push(d)
            },
            scope: this
        });
        a.on({
            beforesaved: this.write,
            scope: this
        })
    },
    write: function (a) {
        a.stylesStore.commitChanges();
        a.fireEvent("saved", a, a.selectedStyle.get("name"))
    }
});
Ext.namespace("gxp.plugins");
gxp.plugins.GeoServerStyleWriter = Ext.extend(gxp.plugins.StyleWriter, {
    baseUrl: "/geoserver/rest",
    constructor: function (a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        gxp.plugins.GeoServerStyleWriter.superclass.constructor.apply(this, arguments)
    },
    write: function (a) {
        delete this._failed;
        var a = a || {}, b = [],
            c = this.target.stylesStore;
        c.each(function (a) {
            (a.phantom || -1 !== c.modified.indexOf(a)) && this.writeStyle(a, b)
        }, this);
        var d = function () {
            var b = this.target;
            if (!0 !== this._failed) {
                this.deleteStyles();
                for (var c = this.target.stylesStore.getModifiedRecords(),
                        d = c.length - 1; 0 <= d; --d) c[d].phantom = !1;
                b.stylesStore.commitChanges();
                a.success && a.success.call(a.scope);
                b.fireEvent("saved", b, b.selectedStyle.get("name"))
            } else b.fireEvent("savefailed", b, b.selectedStyle.get("name"))
        };
        0 < b.length ? gxp.util.dispatch(b, function () {
            this.assignStyles(a.defaultStyle, d)
        }, this) : this.assignStyles(a.defaultStyle, d)
    },
    writeStyle: function (a, b) {
        var c = a.get("userStyle").name;
        b.push(function (b) {
            Ext.Ajax.request({
                method: !0 === a.phantom ? "POST" : "PUT",
                url: this.baseUrl + "/styles" + (!0 === a.phantom ?
                    "" : "/" + c + ".xml"),
                headers: {
                    "Content-Type": "application/vnd.ogc.sld+xml; charset=UTF-8"
                },
                xmlData: this.target.createSLD({
                    userStyles: [c]
                }),
                failure: function () {
                    this._failed = !0;
                    b.call(this)
                },
                success: !0 === a.phantom ? function () {
                    Ext.Ajax.request({
                        method: "POST",
                        url: this.baseUrl + "/layers/" + this.target.layerRecord.get("name") + "/styles.json",
                        jsonData: {
                            style: {
                                name: c
                            }
                        },
                        failure: function () {
                            this._failed = !0;
                            b.call(this)
                        },
                        success: b,
                        scope: this
                    })
                } : b,
                scope: this
            })
        })
    },
    assignStyles: function (a, b) {
        var c = [];
        this.target.stylesStore.each(function (b) {
            !a && !0 === b.get("userStyle").isDefault && (a = b.get("name"));
            b.get("name") !== a && -1 === this.deletedStyles.indexOf(b.id) && c.push({
                name: b.get("name")
            })
        }, this);
        Ext.Ajax.request({
            method: "PUT",
            url: this.baseUrl + "/layers/" + this.target.layerRecord.get("name") + ".json",
            jsonData: {
                layer: {
                    defaultStyle: {
                        name: a
                    },
                    styles: 0 < c.length ? {
                        style: c
                    } : {},
                    enabled: !0
                }
            },
            success: b,
            failure: function () {
                this._failed = !0;
                b.call(this)
            },
            scope: this
        })
    },
    deleteStyles: function () {
        for (var a = 0, b = this.deletedStyles.length; a < b; ++a) Ext.Ajax.request({
                method: "DELETE",
                url: this.baseUrl + "/styles/" + this.deletedStyles[a] + "?purge=true"
            });
        this.deletedStyles = []
    }
});
Ext.preg("gxp_geoserverstylewriter", gxp.plugins.GeoServerStyleWriter);
Ext.namespace("gxp.plugins");
gxp.plugins.Tool = Ext.extend(Ext.util.Observable, {
    ptype: "gxp_tool",
    autoActivate: !0,
    actionTarget: "map.tbar",
    showButtonText: !1,
    output: null,
    constructor: function (a) {
        this.initialConfig = a || {};
        this.active = !1;
        Ext.apply(this, a);
        if (!this.id) this.id = Ext.id();
        this.output = [];
        this.addEvents("activate", "deactivate");
        gxp.plugins.Tool.superclass.constructor.apply(this, arguments)
    },
    init: function (a) {
        a.tools[this.id] = this;
        this.target = a;
        this.autoActivate && this.activate();
        this.target.on("portalready", this.addActions, this)
    },
    activate: function () {
        if (!1 === this.active) return this.active = !0, this.fireEvent("activate", this), !0
    },
    deactivate: function () {
        if (!0 === this.active) return this.active = !1, this.fireEvent("deactivate", this), !0
    },
    getContainer: function (a) {
        var b, c;
        b = a.split(".");
        if (c = b[0]) if ("map" == c) a = this.target.mapPanel;
            else {
                if (a = Ext.getCmp(c) || this.target.portal[c], !a) throw Error("Can't find component with id: " + c);
            } else a = this.target.portal;
        if (b = 1 < b.length && b[1]) a = (c = {
                tbar: "getTopToolbar",
                bbar: "getBottomToolbar",
                fbar: "getFooterToolbar"
            }[b]) ?
                a[c]() : a[b];
        return a
    },
    addActions: function (a) {
        a = a || this.actions;
        if (!a || null === this.actionTarget) this.addOutput();
        else {
            var b = this.actionTarget instanceof Array ? this.actionTarget : [this.actionTarget],
                a = a instanceof Array ? a : [a],
                c, d, e, f, g, h, i = null;
            for (e = b.length - 1; 0 <= e; --e) {
                if (c = b[e]) {
                    if (c instanceof Object) i = c.index, c = c.target;
                    h = this.getContainer(c)
                }
                for (f = 0, g = a.length; f < g; ++f) {
                    if (!(a[f] instanceof Ext.Action || a[f] instanceof Ext.Component)) if ((d = Ext.getCmp(a[f])) && (a[f] = d), "string" != typeof a[f]) {
                            if (f == this.defaultAction) a[f].pressed = !0;
                            a[f] = new Ext.Action(a[f])
                        }
                    c = a[f];
                    if (f == this.defaultAction && c instanceof GeoExt.Action) c.isDisabled() ? c.activateOnEnable = !0 : c.control.activate();
                    if (h) {
                        this.showButtonText && c.setText(c.initialConfig.buttonText);
                        h instanceof Ext.menu.Menu ? c = Ext.apply(new Ext.menu.CheckItem(c), {
                            text: c.initialConfig.menuText,
                            group: c.initialConfig.toggleGroup,
                            groupClass: null
                        }) : h instanceof Ext.Toolbar || (c = new Ext.Button(c));
                        var j = null === i ? h.add(c) : h.insert(i, c);
                        c = c instanceof Ext.Button ? c : j;
                        null !== i && (i += 1);
                        if (null !=
                            this.outputAction && f == this.outputAction) c.on("click", function () {
                                d ? this.outputTarget ? d.show() : d.ownerCt.ownerCt.show() : d = this.addOutput()
                            }, this)
                    }
                }
                h && (h.isVisible() ? h.doLayout() : h instanceof Ext.menu.Menu || h.show())
            }
            return this.actions = a
        }
    },
    addOutput: function (a) {
        if (a || this.outputConfig) {
            var a = a || {}, b = this.outputTarget;
            b ? (b = this.getContainer(b), a instanceof Ext.Component || Ext.apply(a, this.outputConfig)) : (b = this.outputConfig || {}, b = (new Ext.Window(Ext.apply({
                hideBorders: !0,
                shadow: !1,
                closeAction: "hide",
                autoHeight: !b.height,
                layout: b.height ? "fit" : void 0,
                items: [{
                        defaults: Ext.applyIf({
                            autoHeight: !b.height && !(b.defaults && b.defaults.height)
                        }, b.defaults)
                    }
                ]
            }, b))).show().items.get(0));
            if (b) return a = b.add(a), a.on("removed", function (a) {
                    this.output.remove(a)
                }, this, {
                    single: !0
                }), a instanceof Ext.Window ? a.show() : b.doLayout(), this.output.push(a), a;
            a = this.ptype;
            window.console && console.error("Failed to create output for plugin with ptype: " + a)
        }
    },
    removeOutput: function () {
        for (var a, b = this.output.length - 1; 0 <= b; --b) if (a =
                this.output[b], this.outputTarget) if (a.ownerCt) {
                    if (a.ownerCt.remove(a), a.ownerCt instanceof Ext.Window) a.ownerCt[a.ownerCt.closeAction]()
                } else a.remove();
                else a.findParentBy(function (a) {
                        return a instanceof Ext.Window
                    }).close();
        this.output = []
    },
    getState: function () {
        return Ext.apply({}, this.initialConfig)
    }
});
Ext.preg(gxp.plugins.Tool.prototype.ptype, gxp.plugins.Tool);
Ext.namespace("gxp.plugins");
gxp.plugins.WMSGetFeatureInfo = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_wmsgetfeatureinfo",
    outputTarget: "map",
    popupCache: null,
    infoActionTip: "Get Feature Info",
    popupTitle: "Feature Info",
    buttonText: "Identify",
    format: "html",
    addActions: function () {
        var a;
        this.popupCache = {};
        var b = gxp.plugins.WMSGetFeatureInfo.superclass.addActions.call(this, [{
                tooltip: this.infoActionTip,
                iconCls: "gxp-icon-getfeatureinfo",
                buttonText: this.buttonText,
                toggleGroup: this.toggleGroup,
                enableToggle: !0,
                allowDepress: !0,
                toggleHandler: function (b,
                    c) {
                    for (var d = 0, h = a.length; d < h; d++) c ? a[d].activate() : a[d].deactivate()
                }
            }
        ]),
            c = this.actions[0].items[0];
        a = [];
        var d = function () {
            for (var b = this.target.mapPanel.layers.queryBy(function (a) {
                return a.get("queryable")
            }), d = this.target.mapPanel.map, g, h = 0, i = a.length; h < i; h++) g = a[h], g.deactivate(), g.destroy();
            a = [];
            b.each(function (b) {
                var e = b.getLayer(),
                    h = Ext.apply({}, this.vendorParams),
                    g;
                if (this.layerParams) for (var i = this.layerParams.length - 1; 0 <= i; --i) g = this.layerParams[i].toUpperCase(), h[g] = e.params[g];
                var k = b.get("infoFormat");
                void 0 === k && (k = "html" == this.format ? "text/html" : "application/vnd.ogc.gml");
                e = new OpenLayers.Control.WMSGetFeatureInfo(Ext.applyIf({
                    url: e.url,
                    queryVisible: !0,
                    layers: [e],
                    infoFormat: k,
                    vendorParams: h,
                    eventListeners: {
                        getfeatureinfo: function (a) {
                            var c = b.get("title") || b.get("name");
                            if ("text/html" == k) {
                                var d = a.text.match(/<body[^>]*>([\s\S]*)<\/body>/);
                                d && !d[1].match(/^\s*$/) && this.displayPopup(a, c, d[1])
                            } else "text/plain" == k ? this.displayPopup(a, c, "<pre>" + a.text + "</pre>") : a.features && 0 < a.features.length && this.displayPopup(a,
                                    c)
                        },
                        scope: this
                    }
                }, this.controlOptions));
                d.addControl(e);
                a.push(e);
                c.pressed && e.activate()
            }, this)
        };
        this.target.mapPanel.layers.on("update", d, this);
        this.target.mapPanel.layers.on("add", d, this);
        this.target.mapPanel.layers.on("remove", d, this);
        return b
    },
    displayPopup: function (a, b, c) {
        var d, e = a.xy.x + "." + a.xy.y;
        e in this.popupCache ? d = this.popupCache[e] : (d = this.addOutput({
            xtype: "gx_popup",
            title: this.popupTitle,
            layout: "accordion",
            fill: !1,
            autoScroll: !0,
            location: a.xy,
            map: this.target.mapPanel,
            width: 250,
            height: 300,
            defaults: {
                layout: "fit",
                autoScroll: !0,
                autoHeight: !0,
                autoWidth: !0,
                collapsible: !0
            },
            listeners: {
                close: function (a) {
                    return function () {
                        delete this.popupCache[a]
                    }
                }(e),
                scope: this
            }
        }), this.popupCache[e] = d);
        a = a.features;
        e = [];
        if (!c && a) for (var f = 0, g = a.length; f < g; ++f) c = a[f], e.push(Ext.apply({
                    xtype: "propertygrid",
                    listeners: {
                        beforeedit: function () {
                            return !1
                        }
                    },
                    title: c.fid ? c.fid : b,
                    source: c.attributes
                }, this.itemConfig));
        else c && e.push(Ext.apply({
                title: b,
                html: c
            }, this.itemConfig));
        d.add(e);
        d.doLayout()
    }
});
Ext.preg(gxp.plugins.WMSGetFeatureInfo.prototype.ptype, gxp.plugins.WMSGetFeatureInfo);
Ext.namespace("gxp.plugins");
gxp.plugins.WMSRasterStylesDialog = {
    isRaster: null,
    init: function (a) {
        Ext.apply(a, gxp.plugins.WMSRasterStylesDialog)
    },
    createRule: function () {
        var a = [new OpenLayers.Symbolizer[this.isRaster ? "Raster" : this.symbolType]];
        return new OpenLayers.Rule({
            symbolizers: a
        })
    },
    addRule: function () {
        var a = this.items.get(2).items.get(0);
        this.isRaster ? (a.rules.push(this.createPseudoRule()), 1 == a.rules.length && a.rules.push(this.createPseudoRule()), this.savePseudoRules()) : (this.selectedStyle.get("userStyle").rules.push(this.createRule()),
            a.update(), this.selectedStyle.store.afterEdit(this.selectedStyle));
        this.updateRuleRemoveButton()
    },
    removeRule: function () {
        if (this.isRaster) {
            var a = this.items.get(2).items.get(0),
                b = this.selectedRule;
            a.unselect();
            a.rules.remove(b);
            1 == a.rules.length && a.rules.remove(a.rules[0]);
            this.savePseudoRules()
        } else gxp.WMSStylesDialog.prototype.removeRule.apply(this, arguments)
    },
    duplicateRule: function () {
        var a = this.items.get(2).items.get(0);
        if (this.isRaster) a.rules.push(this.createPseudoRule({
                quantity: this.selectedRule.name,
                label: this.selectedRule.title,
                color: this.selectedRule.symbolizers[0].fillColor,
                opacity: this.selectedRule.symbolizers[0].fillOpacity
            })), this.savePseudoRules();
        else {
            var b = this.selectedRule.clone();
            b.name = gxp.util.uniqueName((b.title || b.name) + " (copy)");
            delete b.title;
            this.selectedStyle.get("userStyle").rules.push(b);
            a.update()
        }
        this.updateRuleRemoveButton()
    },
    editRule: function () {
        this.isRaster ? this.editPseudoRule() : gxp.WMSStylesDialog.prototype.editRule.apply(this, arguments)
    },
    editPseudoRule: function () {
        var a =
            this,
            b = this.selectedRule,
            c = new Ext.Window({
                title: "Color Map Entry: " + b.name,
                width: 340,
                autoHeight: !0,
                modal: !0,
                items: [{
                        bodyStyle: "padding-top: 5px",
                        border: !1,
                        defaults: {
                            autoHeight: !0,
                            hideMode: "offsets"
                        },
                        items: [{
                                xtype: "form",
                                border: !1,
                                labelAlign: "top",
                                defaults: {
                                    border: !1
                                },
                                style: {
                                    padding: "0.3em 0 0 1em"
                                },
                                items: [{
                                        layout: "column",
                                        defaults: {
                                            border: !1,
                                            style: {
                                                "padding-right": "1em"
                                            }
                                        },
                                        items: [{
                                                layout: "form",
                                                width: 70,
                                                items: [{
                                                        xtype: "numberfield",
                                                        anchor: "95%",
                                                        value: b.name,
                                                        allowBlank: !1,
                                                        fieldLabel: "Quantity",
                                                        validator: function (c) {
                                                            for (var d =
                                                                a.items.get(2).items.get(0).rules, g = d.length - 1; 0 <= g; g--) if (b !== d[g] && d[g].name == c) return "Quantity " + c + " is already defined";
                                                            return !0
                                                        },
                                                        listeners: {
                                                            valid: function (a) {
                                                                this.selectedRule.name = "" + a.getValue();
                                                                this.savePseudoRules()
                                                            },
                                                            scope: this
                                                        }
                                                    }
                                                ]
                                            }, {
                                                layout: "form",
                                                width: 130,
                                                items: [{
                                                        xtype: "textfield",
                                                        fieldLabel: "Label",
                                                        anchor: "95%",
                                                        value: b.title,
                                                        listeners: {
                                                            valid: function (a) {
                                                                this.selectedRule.title = a.getValue();
                                                                this.savePseudoRules()
                                                            },
                                                            scope: this
                                                        }
                                                    }
                                                ]
                                            }, {
                                                layout: "form",
                                                width: 70,
                                                items: [new GeoExt.FeatureRenderer({
                                                        symbolType: this.symbolType,
                                                        symbolizers: [b.symbolizers[0]],
                                                        isFormField: !0,
                                                        fieldLabel: "Appearance"
                                                    })]
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                xtype: "gxp_polygonsymbolizer",
                                symbolizer: b.symbolizers[0],
                                bodyStyle: {
                                    padding: "10px"
                                },
                                border: !1,
                                labelWidth: 70,
                                defaults: {
                                    labelWidth: 70
                                },
                                listeners: {
                                    change: function (a) {
                                        var b = c.findByType(GeoExt.FeatureRenderer)[0];
                                        b.setSymbolizers([a], {
                                            draw: b.rendered
                                        });
                                        this.selectedRule.symbolizers[0] = a;
                                        this.savePseudoRules()
                                    },
                                    scope: this
                                }
                            }
                        ]
                    }
                ]
            }),
            d = c.findByType("gxp_strokesymbolizer")[0];
        d.ownerCt.remove(d);
        c.show()
    },
    savePseudoRules: function () {
        var a =
            this.selectedStyle,
            b = this.items.get(2).items.get(0),
            a = a.get("userStyle"),
            b = b.rules;
        b.sort(function (a, b) {
            var c = parseFloat(a.name),
                d = parseFloat(b.name);
            return c === d ? 0 : c < d ? -1 : 1
        });
        a = a.rules[0].symbolizers[0];
        a.colorMap = 0 < b.length ? Array(b.length) : void 0;
        for (var c, d = 0, e = b.length; d < e; ++d) c = b[d], a.colorMap[d] = {
                quantity: parseFloat(c.name),
                label: c.title || void 0,
                color: c.symbolizers[0].fillColor || void 0,
                opacity: !1 == c.symbolizers[0].fill ? 0 : c.symbolizers[0].fillOpacity
        };
        this.afterRuleChange(this.selectedRule)
    },
    createLegend: function (a, b) {
        var c = OpenLayers.Symbolizer.Raster;
        c && a[0] && a[0].symbolizers[0] instanceof c ? (this.getComponent("rulesfieldset").setTitle("Color Map Entries"), this.isRaster = !0, this.addRasterLegend(a, b)) : (this.isRaster = !1, this.addVectorLegend(a))
    },
    addRasterLegend: function (a, b) {
        for (var b = b || {}, c = a[0].symbolizers[0].colorMap || [], d = [], e = 0, f = c.length; e < f; e++) d.push(this.createPseudoRule(c[e]));
        this.selectedRule = null != b.selectedRuleIndex ? d[b.selectedRuleIndex] : null;
        return this.addVectorLegend(d, {
            symbolType: "Polygon",
            enableDD: !1
        })
    },
    createPseudoRule: function (a) {
        var b = -1;
        if (!a) {
            var c = this.items.get(2);
            if (c.items) {
                rules = c.items.get(0).rules;
                for (c = rules.length - 1; 0 <= c; c--) b = Math.max(b, parseFloat(rules[c].name))
            }
        }
        a = Ext.applyIf(a || {}, {
            quantity: ++b,
            color: "#000000",
            opacity: 1
        });
        return new OpenLayers.Rule({
            title: a.label,
            name: "" + a.quantity,
            symbolizers: [new OpenLayers.Symbolizer.Polygon({
                    fillColor: a.color,
                    fillOpacity: a.opacity,
                    stroke: !1,
                    fill: 0 !== a.opacity
                })]
        })
    },
    updateRuleRemoveButton: function () {
        this.items.get(3).items.get(1).setDisabled(!this.selectedRule || !1 === this.isRaster && 1 >= this.items.get(2).items.get(0).rules.length)
    }
};
Ext.preg("gxp_wmsrasterstylesdialog", gxp.plugins.WMSRasterStylesDialog);
Ext.namespace("gxp.plugins");
gxp.plugins.ZoomToExtent = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_zoomtoextent",
    menuText: "Zoom To Max Extent",
    tooltip: "Zoom To Max Extent",
    extent: null,
    closest: !0,
    iconCls: "gxp-icon-zoomtoextent",
    closest: !0,
    constructor: function (a) {
        gxp.plugins.ZoomToExtent.superclass.constructor.apply(this, arguments);
        if (this.extent instanceof Array) this.extent = OpenLayers.Bounds.fromArray(this.extent)
    },
    addActions: function () {
        return gxp.plugins.ZoomToExtent.superclass.addActions.apply(this, [{
                text: this.buttonText,
                menuText: this.menuText,
                iconCls: this.iconCls,
                tooltip: this.tooltip,
                handler: function () {
                    var a = this.target.mapPanel.map,
                        b = "function" == typeof this.extent ? this.extent() : this.extent;
                    if (!b) for (var c, d = 0, e = a.layers.length; d < e; ++d) c = a.layers[d], c.getVisibility() && (c = c.restrictedExtent || c.maxExtent, b ? b.extend(c) : c && (b = c.clone()));
                    b && ((d = a.restrictedExtent || a.maxExtent) && (b = new OpenLayers.Bounds(Math.max(b.left, d.left), Math.max(b.bottom, d.bottom), Math.min(b.right, d.right), Math.min(b.top, d.top))), a.zoomToExtent(b, this.closest))
                },
                scope: this
            }
        ])
    }
});
Ext.preg(gxp.plugins.ZoomToExtent.prototype.ptype, gxp.plugins.ZoomToExtent);
Ext.namespace("gxp.plugins");
gxp.plugins.NavigationHistory = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_navigationhistory",
    previousMenuText: "Zoom To Previous Extent",
    nextMenuText: "Zoom To Next Extent",
    previousTooltip: "Zoom To Previous Extent",
    nextTooltip: "Zoom To Next Extent",
    constructor: function (a) {
        gxp.plugins.NavigationHistory.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        var a = new OpenLayers.Control.NavigationHistory;
        this.target.mapPanel.map.addControl(a);
        a = [new GeoExt.Action({
                menuText: this.previousMenuText,
                iconCls: "gxp-icon-zoom-previous",
                tooltip: this.previousTooltip,
                disabled: !0,
                control: a.previous
            }), new GeoExt.Action({
                menuText: this.nextMenuText,
                iconCls: "gxp-icon-zoom-next",
                tooltip: this.nextTooltip,
                disabled: !0,
                control: a.next
            })];
        return gxp.plugins.NavigationHistory.superclass.addActions.apply(this, [a])
    }
});
Ext.preg(gxp.plugins.NavigationHistory.prototype.ptype, gxp.plugins.NavigationHistory);
Ext.namespace("gxp.plugins");
gxp.plugins.Zoom = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_zoom",
    zoomMenuText: "Zoom Box",
    zoomInMenuText: "Zoom In",
    zoomOutMenuText: "Zoom Out",
    zoomTooltip: "Zoom by dragging a box",
    zoomInTooltip: "Zoom in",
    zoomOutTooltip: "Zoom out",
    constructor: function (a) {
        gxp.plugins.Zoom.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        var a = [{
                menuText: this.zoomInMenuText,
                iconCls: "gxp-icon-zoom-in",
                tooltip: this.zoomInTooltip,
                handler: function () {
                    this.target.mapPanel.map.zoomIn()
                },
                scope: this
            }, {
                menuText: this.zoomOutMenuText,
                iconCls: "gxp-icon-zoom-out",
                tooltip: this.zoomOutTooltip,
                handler: function () {
                    this.target.mapPanel.map.zoomOut()
                },
                scope: this
            }
        ];
        this.showZoomBoxAction && a.unshift(new GeoExt.Action({
            menuText: this.zoomText,
            iconCls: "gxp-icon-zoom",
            tooltip: this.zoomTooltip,
            control: new OpenLayers.Control.ZoomBox(this.controlOptions),
            map: this.target.mapPanel.map,
            enableToggle: !0,
            allowDepress: !1,
            toggleGroup: this.toggleGroup
        }));
        return gxp.plugins.Zoom.superclass.addActions.apply(this, [a])
    }
});
Ext.preg(gxp.plugins.Zoom.prototype.ptype, gxp.plugins.Zoom);
Ext.namespace("gxp");
gxp.NewSourceDialog = Ext.extend(Ext.Panel, {
    title: "Add New Server...",
    cancelText: "Cancel",
    addServerText: "Add Server",
    invalidURLText: "Enter a valid URL to a WMS endpoint (e.g. http://example.com/geoserver/wms)",
    contactingServerText: "Contacting Server...",
    bodyStyle: "padding: 0px",
    error: null,
    initComponent: function () {
        this.addEvents("urlselected");
        this.urlTextField = new Ext.form.TextField({
            fieldLabel: "URL",
            allowBlank: !1,
            width: 240,
            msgTarget: "under",
            validator: this.urlValidator.createDelegate(this),
            listeners: {
                specialkey: function (a,
                    b) {
                    b.getKey() === b.ENTER && this.addServer()
                },
                scope: this
            }
        });
        this.form = new Ext.form.FormPanel({
            items: [this.urlTextField],
            border: !1,
            labelWidth: 30,
            bodyStyle: "padding: 5px",
            autoWidth: !0,
            autoHeight: !0,
            listeners: {
                afterrender: function () {
                    this.urlTextField.focus(!1, !0)
                },
                scope: this
            }
        });
        this.bbar = [new Ext.Button({
                text: this.cancelText,
                handler: this.hide,
                scope: this
            }), new Ext.Toolbar.Fill, new Ext.Button({
                text: this.addServerText,
                iconCls: "add",
                handler: this.addServer,
                scope: this
            })];
        this.items = this.form;
        gxp.NewSourceDialog.superclass.initComponent.call(this);
        this.form.on("render", function () {
            this.loadMask = new Ext.LoadMask(this.form.getEl(), {
                msg: this.contactingServerText
            })
        }, this);
        this.on({
            hide: this.reset,
            removed: this.reset,
            scope: this
        });
        this.on("urlselected", function (a, b) {
            this.setLoading();
            this.addSource(b, this.hide, function () {
                this.setError(this.sourceLoadFailureMessage)
            }, this)
        }, this)
    },
    addServer: function () {
        this.error = null;
        this.urlTextField.validate() && this.fireEvent("urlselected", this, this.urlTextField.getValue())
    },
    reset: function () {
        this.error = null;
        this.urlTextField.reset();
        this.loadMask.hide()
    },
    urlRegExp: /^(http(s)?:)?\/\/([\w%]+:[\w%]+@)?([^@\/:]+)(:\d+)?\//i,
    urlValidator: function (a) {
        a = this.urlRegExp.test(a) ? !this.error || this.error : this.invalidURLText;
        this.error = null;
        return a
    },
    setLoading: function () {
        this.loadMask.show()
    },
    setError: function (a) {
        this.loadMask.hide();
        this.error = a;
        this.urlTextField.validate()
    },
    addSource: function () {}
});
Ext.reg("gxp_newsourcedialog", gxp.NewSourceDialog);
Ext.namespace("gxp.plugins");
gxp.plugins.AddLayers = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_addlayers",
    addActionMenuText: "Add layers",
    findActionMenuText: "Find layers",
    addActionTip: "Add layers",
    addServerText: "Add a New Server",
    addButtonText: "Add layers",
    untitledText: "Untitled",
    addLayerSourceErrorText: "Error getting WMS capabilities ({msg}).\nPlease check the url and try again.",
    availableLayersText: "Available Layers",
    expanderTemplateText: "<p><b>Abstract:</b> {abstract}</p>",
    panelTitleText: "Title",
    layerSelectionText: "View available data from:",
    doneText: "Done",
    uploadRoles: ["ROLE_ADMINISTRATOR"],
    uploadText: "Upload layers",
    relativeUploadOnly: !0,
    startSourceId: null,
    catalogSourceKey: null,
    selectedSource: null,
    addServerId: null,
    constructor: function (a) {
        this.addEvents("sourceselected");
        gxp.plugins.AddLayers.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        var a = {
            tooltip: this.addActionTip,
            text: this.addActionText,
            menuText: this.addActionMenuText,
            disabled: !0,
            iconCls: "gxp-icon-addlayers"
        }, b;
        if (this.initialConfig.search || this.uploadSource) {
            var c = [new Ext.menu.Item({
                    iconCls: "gxp-icon-addlayers",
                    text: this.addActionMenuText,
                    handler: this.showCapabilitiesGrid,
                    scope: this
                })];
            this.initialConfig.search && c.push(new Ext.menu.Item({
                iconCls: "gxp-icon-addlayers",
                text: this.findActionMenuText,
                handler: this.showCatalogueSearch,
                scope: this
            }));
            this.uploadSource && (b = this.createUploadButton(Ext.menu.Item)) && c.push(b);
            a = Ext.apply(a, {
                menu: new Ext.menu.Menu({
                    items: c
                })
            })
        } else a = Ext.apply(a, {
                handler: this.showCapabilitiesGrid,
                scope: this
            });
        var d = gxp.plugins.AddLayers.superclass.addActions.apply(this, [a]);
        this.target.on("ready", function () {
            if (this.uploadSource) {
                var a = this.target.layerSources[this.uploadSource];
                a ? this.setSelectedSource(a) : (delete this.uploadSource, b && b.hide())
            }
            d[0].enable()
        }, this);
        return d
    },
    showCatalogueSearch: function () {
        var a = this.initialConfig.search.selectedSource,
            b = {}, c;
        for (c in this.target.layerSources) {
            var d = this.target.layerSources[c];
            if (d instanceof gxp.plugins.CatalogueSource) {
                var e = {};
                e[c] = d;
                Ext.apply(b, e)
            }
        }
        a = gxp.plugins.AddLayers.superclass.addOutput.apply(this, [{
                sources: b,
                selectedSource: a,
                xtype: "gxp_cataloguesearchpanel",
                map: this.target.mapPanel.map,
                listeners: {
                    addlayer: function (a, b, c) {
                        var a = this.target.layerSources[b],
                            d = OpenLayers.Bounds.fromArray(c.bbox),
                            e = this.target.mapPanel.map.getProjection(),
                            d = d.transform(c.srs, e);
                        c.srs = e;
                        c.bbox = d.toArray();
                        c.source = this.catalogSourceKey || b;
                        this.target.mapPanel.layers.add(a.createLayerRecord(c))
                    },
                    scope: this
                }
            }
        ]);
        (b = a.findParentByType("window")) && b.center();
        return a
    },
    showCapabilitiesGrid: function () {
        this.capGrid ? this.capGrid instanceof
        Ext.Window || this.addOutput(this.capGrid) : this.initCapGrid();
        this.capGrid.show()
    },
    initCapGrid: function () {
        function a() {
            function a(b) {
                d && d.push(b);
                e--;
                0 === e && this.addLayers(d)
            }
            for (var b = this.selectedSource, c = h.getSelectionModel().getSelections(), d = [], e = c.length, f = 0, g = c.length; f < g; ++f) {
                var i = b.createLayerRecord({
                    name: c[f].get("name"),
                    source: b.id
                }, a, this);
                i && a.call(this, i)
            }
        }
        var b, c = [],
            d = this.target,
            e;
        for (e in d.layerSources) b = d.layerSources[e], b.store && !b.hidden && c.push([e, b.title || e, b.url]);
        var f = new Ext.data.ArrayStore({
            fields: ["id",
                    "title", "url"
            ],
            data: c
        });
        e = this.createExpander();
        var g = 0;
        null !== this.startSourceId && f.each(function (a) {
            a.get("id") === this.startSourceId && (g = f.indexOf(a))
        }, this);
        b = this.target.layerSources[c[g][0]];
        var h = new Ext.grid.GridPanel({
            store: b.store,
            autoScroll: !0,
            autoExpandColumn: "title",
            plugins: [e],
            loadMask: !0,
            colModel: new Ext.grid.ColumnModel([e, {
                    id: "title",
                    header: this.panelTitleText,
                    dataIndex: "title",
                    sortable: !0
                }, {
                    header: "Id",
                    dataIndex: "name",
                    width: 120,
                    sortable: !0
                }
            ]),
            listeners: {
                rowdblclick: a,
                scope: this
            }
        }),
            i = new Ext.form.ComboBox({
                ref: "../sourceComboBox",
                width: 165,
                store: f,
                valueField: "id",
                displayField: "title",
                tpl: '<tpl for="."><div ext:qtip="{url}" class="x-combo-list-item">{title}</div></tpl>',
                triggerAction: "all",
                editable: !1,
                allowBlank: !1,
                forceSelection: !0,
                mode: "local",
                value: c[g][0],
                listeners: {
                    select: function (a, b) {
                        var c = b.get("id");
                        c === this.addServerId ? (l.outputTarget ? l.addOutput(j) : (new Ext.Window({
                            title: gxp.NewSourceDialog.prototype.title,
                            modal: !0,
                            hideBorders: !0,
                            width: 300,
                            items: j
                        })).show(), i.reset()) :
                            (c = this.target.layerSources[c], h.reconfigure(c.store, h.getColumnModel()), h.getView().focusRow(0), this.setSelectedSource(c), function () {
                            a.triggerBlur();
                            a.el.blur()
                        }.defer(100))
                    },
                    focus: function (a) {
                        d.proxy && a.reset()
                    },
                    scope: this
                }
            });
        b = null;
        if (this.target.proxy || 1 < c.length) b = [new Ext.Toolbar.TextItem({
                    text: this.layerSelectionText
                }), i];
        if (this.target.proxy) this.addServerId = Ext.id(), f.loadData([
                [this.addServerId, this.addServerText + "..."]
            ], !0);
        var j = {
            xtype: "gxp_newsourcedialog",
            header: !1,
            listeners: {
                hide: function (a) {
                    this.outputTarget ||
                        a.ownerCt.hide()
                },
                urlselected: function (a, b) {
                    a.setLoading();
                    this.target.addLayerSource({
                        config: {
                            url: b
                        },
                        callback: function (b) {
                            b = new f.recordType({
                                id: b,
                                title: this.target.layerSources[b].title || this.untitledText
                            });
                            f.insert(0, [b]);
                            i.onSelect(b, 0);
                            a.hide()
                        },
                        fallback: function (a, b) {
                            this.setError((new Ext.Template(this.addLayerSourceErrorText)).apply({
                                msg: b
                            }))
                        },
                        scope: this
                    })
                },
                scope: this
            }
        }, l = this;
        e = {
            xtype: "container",
            region: "center",
            layout: "fit",
            hideBorders: !0,
            items: [h]
        };
        this.instructionsText && e.items.push({
            xtype: "box",
            autoHeight: !0,
            autoEl: {
                tag: "p",
                cls: "x-form-item",
                style: "padding-left: 5px; padding-right: 5px"
            },
            html: this.instructionsText
        });
        var p = ["->", new Ext.Button({
                text: this.addButtonText,
                iconCls: "gxp-icon-addlayers",
                handler: a,
                scope: this
            }), new Ext.Button({
                text: this.doneText,
                handler: function () {
                    this.capGrid.hide()
                },
                scope: this
            })],
            o;
        this.uploadSource || (o = this.createUploadButton()) && p.unshift(o);
        o = this.outputTarget ? Ext.Panel : Ext.Window;
        this.capGrid = new o(Ext.apply({
            title: this.availableLayersText,
            closeAction: "hide",
            layout: "border",
            height: 300,
            width: 315,
            modal: !0,
            items: e,
            tbar: b,
            bbar: p,
            listeners: {
                hide: function () {
                    h.getSelectionModel().clearSelections()
                },
                show: function () {
                    null === this.selectedSource ? this.setSelectedSource(this.target.layerSources[c[g][0]]) : this.setSelectedSource(this.selectedSource)
                },
                scope: this
            }
        }, this.initialConfig.outputConfig));
        o === Ext.Panel && this.addOutput(this.capGrid)
    },
    addLayers: function (a, b) {
        for (var c = this.selectedSource, d = this.target.mapPanel.layers, e, f, g, h = 0, i = a.length; h < i; ++h) if (f = c.createLayerRecord({
                name: a[h].get("name"),
                source: c.id
            }) || a[h]) g = f.getLayer(), g.maxExtent && (e ? e.extend(f.getLayer().maxExtent) : e = f.getLayer().maxExtent.clone()), "background" === f.get("group") ? d.insert(1, [f]) : d.add([f]);
        e && this.target.mapPanel.map.zoomToExtent(e);
        if (1 === a.length && f && (this.target.selectLayer(f), b && this.postUploadAction)) {
            var j, c = this.postUploadAction;
            if (!Ext.isString(c)) j = c.outputConfig, c = c.plugin;
            this.target.tools[c].addOutput(j)
        }
    },
    setSelectedSource: function (a) {
        this.selectedSource = a;
        this.fireEvent("sourceselected", this, a);
        this.capGrid &&
            a.lazy && a.store.load({
            callback: function () {
                var a = this.capGrid.sourceComboBox,
                    c = a.store,
                    d = a.valueField,
                    e = c.findExact(d, a.getValue()),
                    e = c.getAt(e),
                    f = this.target.layerSources[e.get("id")];
                f ? f.title !== e.get("title") && !Ext.isEmpty(f.title) && (e.set("title", f.title), a.setValue(e.get(d))) : c.remove(e)
            }.createDelegate(this)
        })
    },
    createUploadButton: function (a) {
        var a = a || Ext.Button,
            b, c = this.initialConfig.upload || !! this.initialConfig.uploadSource,
            d;
        if (c) {
            "boolean" === typeof c && (c = {});
            b = new a({
                text: this.uploadText,
                iconCls: "gxp-icon-filebrowse",
                hidden: !this.uploadSource,
                handler: function () {
                    this.target.doAuthorized(this.uploadRoles, function () {
                        var a = new gxp.LayerUploadPanel(Ext.apply({
                            title: this.outputTarget ? this.uploadText : void 0,
                            url: d,
                            width: 300,
                            border: !1,
                            bodyStyle: "padding: 10px 10px 0 10px;",
                            labelWidth: 65,
                            autoScroll: !0,
                            defaults: {
                                anchor: "99%",
                                allowBlank: !1,
                                msgTarget: "side"
                            },
                            listeners: {
                                uploadcomplete: function (a, c) {
                                    for (var d = c["import"].tasks[0].items, e, f = {}, g = 0, k = d.length; g < k; ++g) {
                                        e = d[g];
                                        if ("ERROR" === e.state) {
                                            Ext.Msg.alert(e.originalName,
                                                e.errorMessage);
                                            return
                                        }
                                        e = e.resource;
                                        e = e.featureType || e.coverage;
                                        f[e.namespace.name + ":" + e.name] = !0
                                    }
                                    this.selectedSource.store.load({
                                        callback: function () {
                                            var a, b;
                                            this.capGrid && this.capGrid.isVisible() && (a = this.capGrid.get(0).get(0), b = a.getSelectionModel(), b.clearSelections());
                                            var c = [],
                                                d = 0;
                                            this.selectedSource.store.each(function (a, b) {
                                                a.get("name") in f && (d = b, c.push(a))
                                            });
                                            a ? window.setTimeout(function () {
                                                b.selectRecords(c);
                                                a.getView().focusRow(d)
                                            }, 100) : this.addLayers(c, !0)
                                        },
                                        scope: this
                                    });
                                    this.outputTarget ?
                                        a.hide() : b.close()
                                },
                                scope: this
                            }
                        }, c)),
                            b;
                        this.outputTarget ? this.addOutput(a) : (b = new Ext.Window({
                            title: this.uploadText,
                            modal: !0,
                            resizable: !1,
                            items: [a]
                        }), b.show())
                    }, this)
                },
                scope: this
            });
            var e = {}, f = function (a, b, c) {
                    a in e ? window.setTimeout(function () {
                        b.call(c, e[a])
                    }, 0) : Ext.Ajax.request({
                        url: a,
                        disableCaching: !1,
                        callback: function (d, f, p) {
                            d = p.status;
                            e[a] = d;
                            b.call(c, d)
                        }
                    })
                };
            this.on({
                sourceselected: function (a, c) {
                    b[this.uploadSource ? "show" : "hide"]();
                    this.isEligibleForUpload(c) && (d = this.getGeoServerRestUrl(c.url),
                        this.target.isAuthorized() && f(d + "/imports", function (a) {
                        b.setVisible(200 === a)
                    }, this))
                },
                scope: this
            })
        }
        return b
    },
    getGeoServerRestUrl: function (a) {
        a = a.split("/");
        a.pop();
        a.push("rest");
        return a.join("/")
    },
    isEligibleForUpload: function (a) {
        return a.url && (this.relativeUploadOnly ? "/" === a.url.charAt(0) : !0) && -1 === (this.nonUploadSources || []).indexOf(a.id)
    },
    createExpander: function () {
        return new Ext.grid.RowExpander({
            tpl: new Ext.Template(this.expanderTemplateText)
        })
    }
});
Ext.preg(gxp.plugins.AddLayers.prototype.ptype, gxp.plugins.AddLayers);
Ext.namespace("gxp.plugins");
gxp.plugins.RemoveLayer = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_removelayer",
    removeMenuText: "Remove layer",
    removeActionTip: "Remove layer",
    addActions: function () {
        var a, b = gxp.plugins.RemoveLayer.superclass.addActions.apply(this, [{
                    menuText: this.removeMenuText,
                    iconCls: "gxp-icon-removelayers",
                    disabled: !0,
                    tooltip: this.removeActionTip,
                    handler: function () {
                        var b = a;
                        b && this.target.mapPanel.layers.remove(b)
                    },
                    scope: this
                }
            ]),
            c = b[0];
        this.target.on("layerselectionchange", function (b) {
            a = b;
            c.setDisabled(1 >= this.target.mapPanel.layers.getCount() || !b)
        }, this);
        var d = function (b) {
            c.setDisabled(!a || 1 >= b.getCount())
        };
        this.target.mapPanel.layers.on({
            add: d,
            remove: d
        });
        return b
    }
});
Ext.preg(gxp.plugins.RemoveLayer.prototype.ptype, gxp.plugins.RemoveLayer);
Ext.namespace("gxp.plugins");
gxp.plugins.LayerTree = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_layertree",
    shortTitle: "Layers",
    rootNodeText: "Layers",
    overlayNodeText: "Overlays",
    baseNodeText: "Base Layers",
    groups: null,
    defaultGroup: "default",
    treeNodeUI: null,
    constructor: function (a) {
        gxp.plugins.LayerTree.superclass.constructor.apply(this, arguments);
        if (!this.groups) this.groups = {
                "default": this.overlayNodeText,
                background: {
                    title: this.baseNodeText,
                    exclusive: !0
                }
        };
        if (!this.treeNodeUI) this.treeNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin)
    },
    addOutput: function (a) {
        a = Ext.apply(this.createOutputConfig(), a || {});
        return gxp.plugins.LayerTree.superclass.addOutput.call(this, a)
    },
    createOutputConfig: function () {
        var a = new Ext.tree.TreeNode({
            text: this.rootNodeText,
            expanded: !0,
            isTarget: !1,
            allowDrop: !1
        }),
            b = this.defaultGroup,
            c = this,
            d, e, f;
        for (f in this.groups) d = "string" == typeof this.groups[f] ? {
                title: this.groups[f]
        }: this.groups[f],
        e = d.exclusive,
        a.appendChild(new GeoExt.tree.LayerContainer(Ext.apply({
            text: d.title,
            iconCls: "gxp-folder",
            expanded: !0,
            group: f == this.defaultGroup ? void 0 : f,
            loader: new GeoExt.tree.LayerLoader({
                baseAttrs: e ? {
                    checkedGroup: Ext.isString(e) ? e : f
                } : void 0,
                store: this.target.mapPanel.layers,
                filter: function (a) {
                    return function (c) {
                        return (c.get("group") || b) == a && !0 == c.getLayer().displayInLayerSwitcher
                    }
                }(f),
                createNode: function (a) {
                    c.configureLayerNode(this, a);
                    return GeoExt.tree.LayerLoader.prototype.createNode.apply(this, arguments)
                }
            }),
            singleClickExpand: !0,
            allowDrag: !1,
            listeners: {
                append: function (a, b) {
                    b.expand()
                }
            }
        }, d)));
        return {
            xtype: "treepanel",
            root: a,
            rootVisible: !1,
            shortTitle: this.shortTitle,
            border: !1,
            enableDD: !0,
            selModel: new Ext.tree.DefaultSelectionModel({
                listeners: {
                    beforeselect: this.handleBeforeSelect,
                    scope: this
                }
            }),
            listeners: {
                contextmenu: this.handleTreeContextMenu,
                beforemovenode: this.handleBeforeMoveNode,
                scope: this
            },
            contextMenu: new Ext.menu.Menu({
                items: []
            })
        }
    },
    configureLayerNode: function (a, b) {
        b.uiProvider = this.treeNodeUI;
        var c = b.layer,
            d = b.layerStore;
        if (c && d) {
            var e = d.getAt(d.findBy(function (a) {
                return a.getLayer() === c
            }));
            if (e) {
                b.qtip = e.get("abstract");
                if (!e.get("queryable")) b.iconCls = "gxp-tree-rasterlayer-icon";
                if (e.get("fixed")) b.allowDrag = !1;
                b.listeners = {
                    rendernode: function (a) {
                        e === this.target.selectedLayer && a.select();
                        this.target.on("layerselectionchange", function (b) {
                            !this.selectionChanging && b === e && a.select()
                        }, this)
                    },
                    scope: this
                }
            }
        }
    },
    handleBeforeSelect: function (a, b) {
        var c = !0,
            d = b && b.layer,
            e;
        if (d) c = b.layerStore, e = c.getAt(c.findBy(function (a) {
                return a.getLayer() === d
            }));
        this.selectionChanging = !0;
        c = this.target.selectLayer(e);
        this.selectionChanging = !1;
        return c
    },
    handleTreeContextMenu: function (a, b) {
        if (a && a.layer) {
            a.select();
            var c = a.getOwnerTree();
            if (c.getSelectionModel().getSelectedNode() === a) c = c.contextMenu, c.contextNode = a, 0 < c.items.getCount() && c.showAt(b.getXY())
        }
    },
    handleBeforeMoveNode: function (a, b, c, d) {
        if (c !== d) a = d.loader.store, c = a.findBy(function (a) {
                return a.getLayer() === b.layer
            }), a.getAt(c).set("group", d.attributes.group)
    }
});
Ext.preg(gxp.plugins.LayerTree.prototype.ptype, gxp.plugins.LayerTree);
Ext.namespace("gxp.plugins");
gxp.plugins.LayerManager = Ext.extend(gxp.plugins.LayerTree, {
    ptype: "gxp_layermanager",
    baseNodeText: "Base Maps",
    createOutputConfig: function () {
        var a = gxp.plugins.LayerManager.superclass.createOutputConfig.apply(this, arguments);
        Ext.applyIf(a, Ext.apply({
            cls: "gxp-layermanager-tree",
            lines: !1,
            useArrows: !0,
            plugins: [{
                    ptype: "gx_treenodecomponent"
                }
            ]
        }, this.treeConfig));
        return a
    },
    configureLayerNode: function (a, b) {
        gxp.plugins.LayerManager.superclass.configureLayerNode.apply(this, arguments);
        var c;
        OpenLayers.Layer.WMS &&
            b.layer instanceof OpenLayers.Layer.WMS ? c = "gx_wmslegend" : OpenLayers.Layer.Vector && b.layer instanceof OpenLayers.Layer.Vector && (c = "gx_vectorlegend");
        c && Ext.apply(b, {
            component: {
                xtype: c,
                baseParams: {
                    transparent: !0,
                    format: "image/png",
                    legend_options: "fontAntiAliasing:true;fontSize:11;fontName:Arial"
                },
                layerRecord: this.target.mapPanel.layers.getByLayer(b.layer),
                showTitle: !1,
                cls: "legend"
            }
        })
    }
});
Ext.preg(gxp.plugins.LayerManager.prototype.ptype, gxp.plugins.LayerManager);
Ext.namespace("gxp.plugins");
gxp.plugins.ZoomToLayerExtent = Ext.extend(gxp.plugins.ZoomToExtent, {
    ptype: "gxp_zoomtolayerextent",
    menuText: "Zoom to layer extent",
    tooltip: "Zoom to layer extent",
    iconCls: "gxp-icon-zoom-to",
    destroy: function () {
        this.selectedRecord = null;
        gxp.plugins.ZoomToLayerExtent.superclass.destroy.apply(this, arguments)
    },
    extent: function () {
        var a = this.selectedRecord.getLayer(),
            b;
        OpenLayers.Layer.Vector && (b = a instanceof OpenLayers.Layer.Vector && a.getDataExtent());
        return a.restrictedExtent || b || a.maxExtent || map.maxExtent
    },
    addActions: function () {
        var a = gxp.plugins.ZoomToLayerExtent.superclass.addActions.apply(this, arguments);
        a[0].disable();
        this.target.on("layerselectionchange", function (b) {
            this.selectedRecord = b;
            a[0].setDisabled(!b || !b.get("layer"))
        }, this);
        return a
    }
});
Ext.preg(gxp.plugins.ZoomToLayerExtent.prototype.ptype, gxp.plugins.ZoomToLayerExtent);
Ext.namespace("gxp.plugins");
gxp.plugins.LayerProperties = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_layerproperties",
    menuText: "Layer Properties",
    toolTip: "Layer Properties",
    constructor: function (a) {
        gxp.plugins.LayerProperties.superclass.constructor.apply(this, arguments);
        if (!this.outputConfig) this.outputConfig = {
                width: 325,
                autoHeight: !0
        }
    },
    addActions: function () {
        var a = gxp.plugins.LayerProperties.superclass.addActions.apply(this, [{
                menuText: this.menuText,
                iconCls: "gxp-icon-layerproperties",
                disabled: !0,
                tooltip: this.toolTip,
                handler: function () {
                    this.removeOutput();
                    this.addOutput()
                },
                scope: this
            }
        ]),
            b = a[0];
        this.target.on("layerselectionchange", function (a) {
            b.setDisabled(!a || !a.get("properties"))
        }, this);
        return a
    },
    addOutput: function (a) {
        var a = a || {}, b = this.target.selectedLayer;
        this.outputConfig.title = (this.initialConfig.outputConfig || {}).title || this.menuText + ": " + b.get("title");
        this.outputConfig.shortTitle = b.get("title");
        var c = b.get("properties") || "gxp_layerpanel",
            d = this.layerPanelConfig;
        d && d[c] && Ext.apply(a, d[c]);
        return gxp.plugins.LayerProperties.superclass.addOutput.call(this,
            Ext.apply({
            xtype: c,
            authorized: this.target.isAuthorized(),
            layerRecord: b,
            source: this.target.getSource(b),
            defaults: {
                style: "padding: 10px",
                autoHeight: this.outputConfig.autoHeight
            },
            listeners: {
                added: function (a) {
                    if (!this.outputTarget) a.on("afterrender", function () {
                            a.ownerCt.ownerCt.center()
                        }, this, {
                            single: !0
                        })
                },
                scope: this
            }
        }, a))
    }
});
Ext.preg(gxp.plugins.LayerProperties.prototype.ptype, gxp.plugins.LayerProperties);
Ext.namespace("gxp");
gxp.RulePanel = Ext.extend(Ext.TabPanel, {
    fonts: void 0,
    symbolType: "Point",
    rule: null,
    attributes: null,
    nestedFilters: !0,
    minScaleDenominatorLimit: 1.577757414193268E9 * Math.pow(0.5, 19) * OpenLayers.DOTS_PER_INCH / 256,
    maxScaleDenominatorLimit: 1.577757414193268E9 * OpenLayers.DOTS_PER_INCH / 256,
    scaleLevels: 20,
    scaleSliderTemplate: "{scaleType} Scale 1:{scale}",
    modifyScaleTipContext: Ext.emptyFn,
    labelFeaturesText: "Label Features",
    labelsText: "Labels",
    basicText: "Basic",
    advancedText: "Advanced",
    limitByScaleText: "Limit by scale",
    limitByConditionText: "Limit by condition",
    symbolText: "Symbol",
    nameText: "Name",
    initComponent: function () {
        Ext.applyIf(this, {
            plain: !0,
            border: !1
        });
        if (this.rule) {
            if (!this.initialConfig.symbolType) this.symbolType = this.getSymbolTypeFromRule(this.rule) || this.symbolType
        } else this.rule = new OpenLayers.Rule({
                name: this.uniqueRuleName()
            });
        this.activeTab = 0;
        this.textSymbolizer = new gxp.TextSymbolizer({
            symbolizer: this.getTextSymbolizer(),
            attributes: this.attributes,
            fonts: this.fonts,
            listeners: {
                change: function () {
                    this.fireEvent("change",
                        this, this.rule)
                },
                scope: this
            }
        });
        this.scaleLimitPanel = new gxp.ScaleLimitPanel({
            maxScaleDenominator: this.rule.maxScaleDenominator || void 0,
            limitMaxScaleDenominator: !! this.rule.maxScaleDenominator,
            maxScaleDenominatorLimit: this.maxScaleDenominatorLimit,
            minScaleDenominator: this.rule.minScaleDenominator || void 0,
            limitMinScaleDenominator: !! this.rule.minScaleDenominator,
            minScaleDenominatorLimit: this.minScaleDenominatorLimit,
            scaleLevels: this.scaleLevels,
            scaleSliderTemplate: this.scaleSliderTemplate,
            modifyScaleTipContext: this.modifyScaleTipContext,
            listeners: {
                change: function (a, b, c) {
                    this.rule.minScaleDenominator = b;
                    this.rule.maxScaleDenominator = c;
                    this.fireEvent("change", this, this.rule)
                },
                scope: this
            }
        });
        this.filterBuilder = new gxp.FilterBuilder({
            allowGroups: this.nestedFilters,
            filter: this.rule && this.rule.filter && this.rule.filter.clone(),
            attributes: this.attributes,
            listeners: {
                change: function (a) {
                    this.rule.filter = a.getFilter();
                    this.fireEvent("change", this, this.rule)
                },
                scope: this
            }
        });
        this.items = [{
                title: this.labelsText,
                autoScroll: !0,
                bodyStyle: {
                    padding: "10px"
                },
                items: [{
                        xtype: "fieldset",
                        title: this.labelFeaturesText,
                        autoHeight: !0,
                        checkboxToggle: !0,
                        collapsed: !this.hasTextSymbolizer(),
                        items: [this.textSymbolizer],
                        listeners: {
                            collapse: function () {
                                OpenLayers.Util.removeItem(this.rule.symbolizers, this.getTextSymbolizer());
                                this.fireEvent("change", this, this.rule)
                            },
                            expand: function () {
                                this.setTextSymbolizer(this.textSymbolizer.symbolizer);
                                this.fireEvent("change", this, this.rule)
                            },
                            scope: this
                        }
                    }
                ]
            }
        ];
        if (this.getSymbolTypeFromRule(this.rule) || this.symbolType) this.items = [{
                    title: this.basicText,
                    autoScroll: !0,
                    items: [this.createHeaderPanel(), this.createSymbolizerPanel()]
                },
                this.items[0], {
                    title: this.advancedText,
                    defaults: {
                        style: {
                            margin: "7px"
                        }
                    },
                    autoScroll: !0,
                    items: [{
                            xtype: "fieldset",
                            title: this.limitByScaleText,
                            checkboxToggle: !0,
                            collapsed: !(this.rule && (this.rule.minScaleDenominator || this.rule.maxScaleDenominator)),
                            autoHeight: !0,
                            items: [this.scaleLimitPanel],
                            listeners: {
                                collapse: function () {
                                    delete this.rule.minScaleDenominator;
                                    delete this.rule.maxScaleDenominator;
                                    this.fireEvent("change", this, this.rule)
                                },
                                expand: function () {
                                    var a = this.getActiveTab();
                                    this.activeTab = null;
                                    this.setActiveTab(a);
                                    a = !1;
                                    if (this.scaleLimitPanel.limitMinScaleDenominator) this.rule.minScaleDenominator = this.scaleLimitPanel.minScaleDenominator, a = !0;
                                    if (this.scaleLimitPanel.limitMaxScaleDenominator) this.rule.maxScaleDenominator = this.scaleLimitPanel.maxScaleDenominator, a = !0;
                                    a && this.fireEvent("change", this, this.rule)
                                },
                                scope: this
                            }
                        }, {
                            xtype: "fieldset",
                            title: this.limitByConditionText,
                            checkboxToggle: !0,
                            collapsed: !(this.rule && this.rule.filter),
                            autoHeight: !0,
                            items: [this.filterBuilder],
                            listeners: {
                                collapse: function () {
                                    delete this.rule.filter;
                                    this.fireEvent("change", this, this.rule)
                                },
                                expand: function () {
                                    this.rule.filter = this.filterBuilder.getFilter();
                                    this.fireEvent("change", this, this.rule)
                                },
                                scope: this
                            }
                        }
                    ]
                }
            ];
        this.items[0].autoHeight = !0;
        this.addEvents("change");
        this.on({
            tabchange: function (a, b) {
                b.doLayout()
            },
            scope: this
        });
        gxp.RulePanel.superclass.initComponent.call(this)
    },
    hasTextSymbolizer: function () {
        for (var a, b, c = 0, d = this.rule.symbolizers.length; c <
            d; ++c) if (a = this.rule.symbolizers[c], a instanceof OpenLayers.Symbolizer.Text) {
                b = a;
                break
            }
        return b
    },
    getTextSymbolizer: function () {
        var a = this.hasTextSymbolizer();
        a || (a = new OpenLayers.Symbolizer.Text({
            graphic: !1
        }));
        return a
    },
    setTextSymbolizer: function (a) {
        for (var b, c = 0, d = this.rule.symbolizers.length; c < d; ++c) if (candidate = this.rule.symbolizers[c], this.rule.symbolizers[c] instanceof OpenLayers.Symbolizer.Text) {
                this.rule.symbolizers[c] = a;
                b = !0;
                break
            }
        b || this.rule.symbolizers.push(a)
    },
    uniqueRuleName: function () {
        return OpenLayers.Util.createUniqueID("rule_")
    },
    createHeaderPanel: function () {
        this.symbolizerSwatch = new GeoExt.FeatureRenderer({
            symbolType: this.symbolType,
            isFormField: !0,
            fieldLabel: this.symbolText
        });
        return {
            xtype: "form",
            border: !1,
            labelAlign: "top",
            defaults: {
                border: !1
            },
            style: {
                padding: "0.3em 0 0 1em"
            },
            items: [{
                    layout: "column",
                    defaults: {
                        border: !1,
                        style: {
                            "padding-right": "1em"
                        }
                    },
                    items: [{
                            layout: "form",
                            width: 150,
                            items: [{
                                    xtype: "textfield",
                                    fieldLabel: this.nameText,
                                    anchor: "95%",
                                    value: this.rule && (this.rule.title || this.rule.name || ""),
                                    listeners: {
                                        change: function (a,
                                            b) {
                                            this.rule.title = b;
                                            this.fireEvent("change", this, this.rule)
                                        },
                                        scope: this
                                    }
                                }
                            ]
                        }, {
                            layout: "form",
                            width: 70,
                            items: [this.symbolizerSwatch]
                        }
                    ]
                }
            ]
        }
    },
    createSymbolizerPanel: function () {
        var a, b, c = OpenLayers.Symbolizer[this.symbolType],
            d = !1;
        if (c) {
            for (var e = 0, f = this.rule.symbolizers.length; e < f; ++e) if (a = this.rule.symbolizers[e], a instanceof c) {
                    d = !0;
                    b = a;
                    break
                }
            b || (b = new c({
                fill: !1,
                stroke: !1
            }))
        } else throw Error("Appropriate symbolizer type not included in build: " + this.symbolType);
        this.symbolizerSwatch.setSymbolizers([b], {
            draw: this.symbolizerSwatch.rendered
        });
        a = {
            xtype: "gxp_" + this.symbolType.toLowerCase() + "symbolizer",
            symbolizer: b,
            bodyStyle: {
                padding: "10px"
            },
            border: !1,
            labelWidth: 70,
            defaults: {
                labelWidth: 70
            },
            listeners: {
                change: function (a) {
                    this.symbolizerSwatch.setSymbolizers([a], {
                        draw: this.symbolizerSwatch.rendered
                    });
                    d || (this.rule.symbolizers.push(a), d = !0);
                    this.fireEvent("change", this, this.rule)
                },
                scope: this
            }
        };
        if ("Point" === this.symbolType && this.pointGraphics) a.pointGraphics = this.pointGraphics;
        return a
    },
    getSymbolTypeFromRule: function (a) {
        for (var b,
                c, d = 0, e = a.symbolizers.length; d < e; ++d) if (b = a.symbolizers[d], !(b instanceof OpenLayers.Symbolizer.Text)) {
                c = b.CLASS_NAME.split(".").pop();
                break
            }
        return c
    }
});
Ext.reg("gxp_rulepanel", gxp.RulePanel);
Ext.namespace("gxp");
gxp.StylePropertiesDialog = Ext.extend(Ext.Container, {
    titleText: "General",
    nameFieldText: "Name",
    titleFieldText: "Title",
    abstractFieldText: "Abstract",
    userStyle: null,
    initComponent: function () {
        Ext.applyIf(this, {
            layout: "form",
            items: [{
                    xtype: "fieldset",
                    title: this.titleText,
                    labelWidth: 75,
                    defaults: {
                        xtype: "textfield",
                        anchor: "100%",
                        listeners: {
                            change: function (a, b) {
                                this.userStyle[a.name] = b;
                                this.fireEvent("change", this, this.userStyle)
                            },
                            scope: this
                        }
                    },
                    items: [{
                            xtype: this.initialConfig.nameEditable ? "textfield" : "displayfield",
                            fieldLabel: this.nameFieldText,
                            name: "name",
                            value: this.userStyle.name,
                            maskRe: /[A-Za-z0-9_]/
                        }, {
                            fieldLabel: this.titleFieldText,
                            name: "title",
                            value: this.userStyle.title
                        }, {
                            xtype: "textarea",
                            fieldLabel: this.abstractFieldText,
                            name: "description",
                            value: this.userStyle.description
                        }
                    ]
                }
            ]
        });
        this.addEvents("change");
        gxp.StylePropertiesDialog.superclass.initComponent.apply(this, arguments)
    }
});
Ext.reg("gxp_stylepropertiesdialog", gxp.StylePropertiesDialog);
Ext.namespace("gxp");
gxp.WMSStylesDialog = Ext.extend(Ext.Container, {
    addStyleText: "Add",
    addStyleTip: "Add a new style",
    chooseStyleText: "Choose style",
    deleteStyleText: "Remove",
    deleteStyleTip: "Delete the selected style",
    editStyleText: "Edit",
    editStyleTip: "Edit the selected style",
    duplicateStyleText: "Duplicate",
    duplicateStyleTip: "Duplicate the selected style",
    addRuleText: "Add",
    addRuleTip: "Add a new rule",
    newRuleText: "New Rule",
    deleteRuleText: "Remove",
    deleteRuleTip: "Delete the selected rule",
    editRuleText: "Edit",
    editRuleTip: "Edit the selected rule",
    duplicateRuleText: "Duplicate",
    duplicateRuleTip: "Duplicate the selected rule",
    cancelText: "Cancel",
    saveText: "Save",
    styleWindowTitle: "User Style: {0}",
    ruleWindowTitle: "Style Rule: {0}",
    stylesFieldsetTitle: "Styles",
    rulesFieldsetTitle: "Rules",
    errorTitle: "Error saving style",
    errorMsg: "There was an error saving the style back to the server.",
    layerRecord: null,
    layerDescription: null,
    symbolType: null,
    stylesStore: null,
    selectedStyle: null,
    selectedRule: null,
    editable: !0,
    modified: !1,
    dialogCls: Ext.Window,
    initComponent: function () {
        this.addEvents("ready",
            "modified", "styleselected", "beforesaved", "saved");
        Ext.applyIf(this, {
            layout: "form",
            disabled: !0,
            items: [{
                    xtype: "fieldset",
                    title: this.stylesFieldsetTitle,
                    labelWidth: 85,
                    style: "margin-bottom: 0;"
                }, {
                    xtype: "toolbar",
                    style: "border-width: 0 1px 1px 1px; margin-bottom: 10px;",
                    items: [{
                            xtype: "button",
                            iconCls: "add",
                            text: this.addStyleText,
                            tooltip: this.addStyleTip,
                            handler: this.addStyle,
                            scope: this
                        }, {
                            xtype: "button",
                            iconCls: "delete",
                            text: this.deleteStyleText,
                            tooltip: this.deleteStyleTip,
                            handler: function () {
                                this.stylesStore.remove(this.selectedStyle)
                            },
                            scope: this
                        }, {
                            xtype: "button",
                            iconCls: "edit",
                            text: this.editStyleText,
                            tooltip: this.editStyleTip,
                            handler: function () {
                                this.editStyle()
                            },
                            scope: this
                        }, {
                            xtype: "button",
                            iconCls: "duplicate",
                            text: this.duplicateStyleText,
                            tooltip: this.duplicateStyleTip,
                            handler: function () {
                                var a = this.selectedStyle,
                                    b = a.get("userStyle").clone();
                                b.isDefault = !1;
                                b.name = this.newStyleName();
                                var c = this.stylesStore;
                                c.add(new c.recordType({
                                    name: b.name,
                                    title: b.title,
                                    "abstract": b.description,
                                    userStyle: b
                                }));
                                this.editStyle(a)
                            },
                            scope: this
                        }
                    ]
                }
            ]
        });
        this.createStylesStore();
        this.on({
            beforesaved: function () {
                this._saving = !0
            },
            saved: function () {
                delete this._saving
            },
            savefailed: function () {
                Ext.Msg.show({
                    title: this.errorTitle,
                    msg: this.errorMsg,
                    icon: Ext.MessageBox.ERROR,
                    buttons: {
                        ok: !0
                    }
                });
                delete this._saving
            },
            render: function () {
                gxp.util.dispatch([this.getStyles], function () {
                    this.enable()
                }, this)
            },
            scope: this
        });
        gxp.WMSStylesDialog.superclass.initComponent.apply(this, arguments)
    },
    addStyle: function () {
        if (this._ready) {
            var a = this.selectedStyle,
                b = this.stylesStore,
                c =
                    new OpenLayers.Style(null, {
                    name: this.newStyleName(),
                    rules: [this.createRule()]
                });
            b.add(new b.recordType({
                name: c.name,
                userStyle: c
            }));
            this.editStyle(a)
        } else this.on("ready", this.addStyle, this)
    },
    editStyle: function (a) {
        var b = this.selectedStyle.get("userStyle"),
            c = new this.dialogCls(Ext.apply({
                bbar: ["->", {
                        text: this.cancelText,
                        iconCls: "cancel",
                        handler: function () {
                            c.propertiesDialog.userStyle = b;
                            c.destroy();
                            if (a) this._cancelling = !0, this.stylesStore.remove(this.selectedStyle), this.changeStyle(a, {
                                    updateCombo: !0,
                                    markModified: !0
                                }), delete this._cancelling
                        },
                        scope: this
                    }, {
                        text: this.saveText,
                        iconCls: "save",
                        handler: function () {
                            c.destroy()
                        }
                    }
                ]
            }, {
                title: String.format(this.styleWindowTitle, b.title || b.name),
                shortTitle: b.title || b.name,
                bodyBorder: !1,
                autoHeight: !0,
                width: 300,
                modal: !0,
                items: {
                    border: !1,
                    items: {
                        xtype: "gxp_stylepropertiesdialog",
                        ref: "../propertiesDialog",
                        userStyle: b.clone(),
                        nameEditable: !1,
                        style: "padding: 10px;"
                    }
                },
                listeners: {
                    beforedestroy: function () {
                        this.selectedStyle.set("userStyle", c.propertiesDialog.userStyle)
                    },
                    scope: this
                }
            }));
        this.showDlg(c)
    },
    createSLD: function (a) {
        var a = a || {}, b = {
                version: "1.0.0",
                namedLayers: {}
            }, c = this.layerRecord.get("name");
        b.namedLayers[c] = {
            name: c,
            userStyles: []
        };
        this.stylesStore.each(function (d) {
            (!a.userStyles || -1 !== a.userStyles.indexOf(d.get("name"))) && b.namedLayers[c].userStyles.push(d.get("userStyle"))
        });
        return (new OpenLayers.Format.SLD({
            multipleSymbolizers: !0,
            profile: "GeoServer"
        })).write(b)
    },
    saveStyles: function (a) {
        !0 === this.modified && this.fireEvent("beforesaved", this, a)
    },
    updateStyleRemoveButton: function () {
        var a =
            this.selectedStyle && this.selectedStyle.get("userStyle");
        this.items.get(1).items.get(1).setDisabled(!a || 1 >= this.stylesStore.getCount() || !0 === a.isDefault)
    },
    updateRuleRemoveButton: function () {
        this.items.get(3).items.get(1).setDisabled(!this.selectedRule || 2 > this.items.get(2).items.get(0).rules.length)
    },
    createRule: function () {
        return new OpenLayers.Rule({
            symbolizers: [new OpenLayers.Symbolizer[this.symbolType]]
        })
    },
    addRulesFieldSet: function () {
        var a = new Ext.form.FieldSet({
            itemId: "rulesfieldset",
            title: this.rulesFieldsetTitle,
            autoScroll: !0,
            style: "margin-bottom: 0;",
            hideMode: "offsets",
            hidden: !0
        }),
            b = new Ext.Toolbar({
                style: "border-width: 0 1px 1px 1px;",
                hidden: !0,
                items: [{
                        xtype: "button",
                        iconCls: "add",
                        text: this.addRuleText,
                        tooltip: this.addRuleTip,
                        handler: this.addRule,
                        scope: this
                    }, {
                        xtype: "button",
                        iconCls: "delete",
                        text: this.deleteRuleText,
                        tooltip: this.deleteRuleTip,
                        handler: this.removeRule,
                        scope: this,
                        disabled: !0
                    }, {
                        xtype: "button",
                        iconCls: "edit",
                        text: this.editRuleText,
                        toolitp: this.editRuleTip,
                        handler: function () {
                            this.layerDescription ?
                                this.editRule() : this.describeLayer(this.editRule)
                        },
                        scope: this,
                        disabled: !0
                    }, {
                        xtype: "button",
                        iconCls: "duplicate",
                        text: this.duplicateRuleText,
                        tip: this.duplicateRuleTip,
                        handler: this.duplicateRule,
                        scope: this,
                        disabled: !0
                    }
                ]
            });
        this.add(a, b);
        this.doLayout();
        return a
    },
    addRule: function () {
        var a = this.items.get(2).items.get(0);
        this.selectedStyle.get("userStyle").rules.push(this.createRule());
        a.update();
        this.selectedStyle.store.afterEdit(this.selectedStyle);
        this.updateRuleRemoveButton()
    },
    removeRule: function () {
        var a =
            this.selectedRule;
        this.items.get(2).items.get(0).unselect();
        this.selectedStyle.get("userStyle").rules.remove(a);
        this.afterRuleChange()
    },
    duplicateRule: function () {
        var a = this.items.get(2).items.get(0),
            b = this.selectedRule.clone();
        this.selectedStyle.get("userStyle").rules.push(b);
        a.update();
        this.selectedStyle.store.afterEdit(this.selectedStyle);
        this.updateRuleRemoveButton()
    },
    editRule: function () {
        var a = this.selectedRule,
            b = a.clone(),
            c = new this.dialogCls({
                title: String.format(this.ruleWindowTitle, a.title ||
                    a.name || this.newRuleText),
                shortTitle: a.title || a.name || this.newRuleText,
                layout: "fit",
                width: 320,
                height: 450,
                modal: !0,
                items: [{
                        xtype: "gxp_rulepanel",
                        ref: "rulePanel",
                        symbolType: this.symbolType,
                        rule: a,
                        attributes: new GeoExt.data.AttributeStore({
                            url: this.layerDescription.owsURL,
                            baseParams: {
                                SERVICE: this.layerDescription.owsType,
                                REQUEST: "DescribeFeatureType",
                                TYPENAME: this.layerDescription.typeName
                            },
                            method: "GET",
                            disableCaching: !1
                        }),
                        autoScroll: !0,
                        border: !1,
                        defaults: {
                            autoHeight: !0,
                            hideMode: "offsets"
                        },
                        listeners: {
                            change: this.saveRule,
                            tabchange: function () {
                                c instanceof Ext.Window && c.syncShadow()
                            },
                            scope: this
                        }
                    }
                ],
                bbar: ["->", {
                        text: this.cancelText,
                        iconCls: "cancel",
                        handler: function () {
                            this.saveRule(c.rulePanel, b);
                            c.destroy()
                        },
                        scope: this
                    }, {
                        text: this.saveText,
                        iconCls: "save",
                        handler: function () {
                            c.destroy()
                        }
                    }
                ]
            });
        this.showDlg(c)
    },
    saveRule: function (a, b) {
        var c = this.selectedStyle;
        this.items.get(2).items.get(0);
        var c = c.get("userStyle"),
            d = c.rules.indexOf(this.selectedRule);
        c.rules[d] = b;
        this.afterRuleChange(b)
    },
    afterRuleChange: function (a) {
        this.items.get(2).items.get(0);
        this.selectedRule = a;
        this.selectedStyle.store.afterEdit(this.selectedStyle)
    },
    setRulesFieldSetVisible: function (a) {
        this.items.get(3).setVisible(a && this.editable);
        this.items.get(2).setVisible(a);
        this.doLayout()
    },
    parseSLD: function (a) {
        var b = a.responseXML;
        if (!b || !b.documentElement) b = (new OpenLayers.Format.XML).read(a.responseText);
        var a = this.layerRecord.getLayer().params,
            c = this.initialConfig.styleName || a.STYLES;
        if (c) this.selectedStyle = this.stylesStore.getAt(this.stylesStore.findExact("name", c));
        var d = new OpenLayers.Format.SLD({
            profile: "GeoServer",
            multipleSymbolizers: !0
        });
        try {
            var e = d.read(b).namedLayers[a.LAYERS].userStyles,
                f;
            if (a.SLD_BODY) f = d.read(a.SLD_BODY).namedLayers[a.LAYERS].userStyles, Array.prototype.push.apply(e, f);
            this.stylesStore.removeAll();
            this.selectedStyle = null;
            for (var g, h, i, b = 0, j = e.length; b < j; ++b) if (g = e[b], i = this.stylesStore.findExact("name", g.name), -1 !== i && this.stylesStore.removeAt(i), h = new this.stylesStore.recordType({
                    name: g.name,
                    title: g.title,
                    "abstract": g.description,
                    userStyle: g
                }), h.phantom = !1, this.stylesStore.add(h), !this.selectedStyle &&
                    (c === g.name || !c && !0 === g.isDefault)) this.selectedStyle = h;
            this.addRulesFieldSet();
            this.createLegend(this.selectedStyle.get("userStyle").rules);
            this.stylesStoreReady();
            a.SLD_BODY && this.markModified()
        } catch (l) {
            this.setupNonEditable()
        }
    },
    createLegend: function (a) {
        var b = OpenLayers.Symbolizer.Raster;
        if (b && a[0] && a[0].symbolizers[0] instanceof b) throw Error("Raster symbolizers are not supported.");
        this.addVectorLegend(a)
    },
    setupNonEditable: function () {
        this.editable = !1;
        this.items.get(1).hide();
        (this.getComponent("rulesfieldset") ||
            this.addRulesFieldSet()).add(this.createLegendImage());
        this.doLayout();
        this.items.get(3).hide();
        this.stylesStoreReady()
    },
    stylesStoreReady: function () {
        this.stylesStore.commitChanges();
        this.stylesStore.on({
            load: function () {
                this.addStylesCombo();
                this.updateStyleRemoveButton()
            },
            add: function (a, b, c) {
                this.updateStyleRemoveButton();
                b = this.items.get(0).items.get(0);
                this.markModified();
                b.fireEvent("select", b, a.getAt(c), c);
                b.setValue(this.selectedStyle.get("name"))
            },
            remove: function (a, b, c) {
                if (!this._cancelling) this._removing = !0, b = Math.min(c, a.getCount() - 1), this.updateStyleRemoveButton(), c = this.items.get(0).items.get(0), this.markModified(), c.fireEvent("select", c, a.getAt(b), b), c.setValue(this.selectedStyle.get("name")), delete this._removing
            },
            update: function (a, b) {
                var c = b.get("userStyle");
                Ext.apply(b.data, {
                    name: c.name,
                    title: c.title || c.name,
                    "abstract": c.description
                });
                this.changeStyle(b, {
                    updateCombo: !0,
                    markModified: !0
                })
            },
            scope: this
        });
        this.stylesStore.fireEvent("load", this.stylesStore, this.stylesStore.getRange());
        this._ready = !0;
        this.fireEvent("ready")
    },
    markModified: function () {
        if (!1 === this.modified) this.modified = !0;
        this._saving || this.fireEvent("modified", this, this.selectedStyle.get("name"))
    },
    createStylesStore: function () {
        var a = this.layerRecord.get("styles") || [];
        this.stylesStore = new Ext.data.JsonStore({
            data: {
                styles: a
            },
            idProperty: "name",
            root: "styles",
            fields: ["name", "title", "abstract", "legend", "userStyle"],
            listeners: {
                add: function (a, c) {
                    for (var d, e = c.length - 1; 0 <= e; --e) d = c[e], a.suspendEvents(), d.get("title") || d.set("title", d.get("name")),
                    a.resumeEvents()
                }
            }
        })
    },
    getStyles: function (a) {
        var b = this.layerRecord.getLayer();
        if (!0 === this.editable) {
            var c = b.params.VERSION;
            1.1 < parseFloat(c) && (c = "1.1.1");
            Ext.Ajax.request({
                url: b.url,
                params: {
                    SERVICE: "WMS",
                    VERSION: c,
                    REQUEST: "GetStyles",
                    LAYERS: "" + b.params.LAYERS
                },
                method: "GET",
                disableCaching: !1,
                success: this.parseSLD,
                failure: this.setupNonEditable,
                callback: a,
                scope: this
            })
        } else this.setupNonEditable()
    },
    describeLayer: function (a) {
        if (this.layerDescription) window.setTimeout(function () {
                a.call(this)
            }, 0);
        else {
            var b =
                this.layerRecord.getLayer(),
                c = b.params.VERSION;
            1.1 < parseFloat(c) && (c = "1.1.1");
            Ext.Ajax.request({
                url: b.url,
                params: {
                    SERVICE: "WMS",
                    VERSION: c,
                    REQUEST: "DescribeLayer",
                    LAYERS: "" + b.params.LAYERS
                },
                method: "GET",
                disableCaching: !1,
                success: function (a) {
                    this.layerDescription = (new OpenLayers.Format.WMSDescribeLayer).read(a.responseXML && a.responseXML.documentElement ? a.responseXML : a.responseText)[0]
                },
                callback: a,
                scope: this
            })
        }
    },
    addStylesCombo: function () {
        var a = this.stylesStore,
            a = new Ext.form.ComboBox(Ext.apply({
                fieldLabel: this.chooseStyleText,
                store: a,
                editable: !1,
                displayField: "title",
                valueField: "name",
                value: this.selectedStyle ? this.selectedStyle.get("title") : this.layerRecord.getLayer().params.STYLES || "default",
                disabled: !a.getCount(),
                mode: "local",
                typeAhead: !0,
                triggerAction: "all",
                forceSelection: !0,
                anchor: "100%",
                listeners: {
                    select: function (a, c) {
                        this.changeStyle(c);
                        !c.phantom && !this._removing && this.fireEvent("styleselected", this, c.get("name"))
                    },
                    scope: this
                }
            }, this.initialConfig.stylesComboOptions));
        this.items.get(0).add(a);
        this.doLayout()
    },
    createLegendImage: function () {
        var a =
            new GeoExt.WMSLegend({
            showTitle: !1,
            layerRecord: this.layerRecord,
            autoScroll: !0,
            defaults: {
                listeners: {
                    render: function (b) {
                        b.getEl().on({
                            load: function (c, d) {
                                d.getAttribute("src") != b.defaultImgSrc && (this.setRulesFieldSetVisible(!0), 250 < b.getEl().getHeight() && a.setHeight(250))
                            },
                            error: function () {
                                this.setRulesFieldSetVisible(!1)
                            },
                            scope: this
                        })
                    },
                    scope: this
                }
            }
        });
        return a
    },
    changeStyle: function (a, b) {
        var b = b || {}, c = this.items.get(2).items.get(0);
        this.selectedStyle = a;
        this.updateStyleRemoveButton();
        a.get("name");
        if (!0 ===
            this.editable) {
            var d = a.get("userStyle"),
                e = c.rules.indexOf(this.selectedRule);
            c.ownerCt.remove(c);
            this.createLegend(d.rules, {
                selectedRuleIndex: e
            })
        }!0 === b.updateCombo && (this.items.get(0).items.get(0).setValue(d.name), !0 === b.markModified && this.markModified())
    },
    addVectorLegend: function (a, b) {
        b = Ext.applyIf(b || {}, {
            enableDD: !0
        });
        this.symbolType = b.symbolType;
        if (!this.symbolType) {
            var c = ["Point", "Line", "Polygon"];
            highest = 0;
            for (var d = a[0].symbolizers, e, f = d.length - 1; 0 <= f; f--) e = d[f].CLASS_NAME.split(".").pop(),
            highest = Math.max(highest, c.indexOf(e));
            this.symbolType = c[highest]
        }
        var g = this.items.get(2).add({
            xtype: "gx_vectorlegend",
            showTitle: !1,
            height: 10 < a.length ? 250 : void 0,
            autoScroll: 10 < a.length,
            rules: a,
            symbolType: this.symbolType,
            selectOnClick: !0,
            enableDD: b.enableDD,
            listeners: {
                ruleselected: function (a, b) {
                    this.selectedRule = b;
                    var c = this.items.get(3).items;
                    this.updateRuleRemoveButton();
                    c.get(2).enable();
                    c.get(3).enable()
                },
                ruleunselected: function () {
                    this.selectedRule = null;
                    var a = this.items.get(3).items;
                    a.get(1).disable();
                    a.get(2).disable();
                    a.get(3).disable()
                },
                rulemoved: function () {
                    this.markModified()
                },
                afterlayout: function () {
                    null !== this.selectedRule && null === g.selectedRule && -1 !== g.rules.indexOf(this.selectedRule) && g.selectRuleEntry(this.selectedRule)
                },
                scope: this
            }
        });
        this.setRulesFieldSetVisible(!0);
        return g
    },
    newStyleName: function () {
        var a = this.layerRecord.get("name");
        return a.split(":").pop() + "_" + gxp.util.md5(a + new Date + Math.random()).substr(0, 8)
    },
    showDlg: function (a) {
        a.show()
    }
});
gxp.WMSStylesDialog.createGeoServerStylerConfig = function (a, b) {
    var c = a.getLayer();
    b || (b = a.get("restUrl"));
    b || (b = c.url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest"));
    return {
        xtype: "gxp_wmsstylesdialog",
        layerRecord: a,
        plugins: [{
                ptype: "gxp_geoserverstylewriter",
                baseUrl: b
            }
        ],
        listeners: {
            styleselected: function (a, b) {
                c.mergeNewParams({
                    styles: b
                })
            },
            modified: function (a) {
                a.saveStyles()
            },
            saved: function (a, b) {
                c.mergeNewParams({
                    _olSalt: Math.random(),
                    styles: b
                })
            },
            scope: this
        }
    }
};
OpenLayers.Renderer.defaultSymbolizer = {
    fillColor: "#808080",
    fillOpacity: 1,
    strokeColor: "#000000",
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeDashstyle: "solid",
    pointRadius: 3,
    graphicName: "square",
    fontColor: "#000000",
    fontSize: 10,
    haloColor: "#FFFFFF",
    haloOpacity: 1,
    haloRadius: 1,
    labelAlign: "cm"
};
Ext.reg("gxp_wmsstylesdialog", gxp.WMSStylesDialog);
Ext.namespace("gxp.plugins");
gxp.plugins.Styler = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_styler",
    menuText: "Edit Styles",
    tooltip: "Manage layer styles",
    roles: ["ROLE_ADMINISTRATOR"],
    sameOriginStyling: !0,
    rasterStyling: !1,
    requireDescribeLayer: !0,
    constructor: function (a) {
        gxp.plugins.Styler.superclass.constructor.apply(this, arguments);
        if (!this.outputConfig) this.outputConfig = {
                autoHeight: !0,
                width: 265
        };
        Ext.applyIf(this.outputConfig, {
            closeAction: "close"
        })
    },
    init: function (a) {
        gxp.plugins.Styler.superclass.init.apply(this, arguments);
        this.target.on("authorizationchange",
            this.enableOrDisable, this)
    },
    destroy: function () {
        this.target.un("authorizationchange", this.enableOrDisable, this);
        gxp.plugins.Styler.superclass.destroy.apply(this, arguments)
    },
    enableOrDisable: function () {
        this.target && null !== this.target.selectedLayer && this.handleLayerChange(this.target.selectedLayer)
    },
    addActions: function () {
        var a = gxp.plugins.Styler.superclass.addActions.apply(this, [{
                menuText: this.menuText,
                iconCls: "gxp-icon-palette",
                disabled: !0,
                tooltip: this.tooltip,
                handler: function () {
                    this.target.doAuthorized(this.roles,
                        this.addOutput, this)
                },
                scope: this
            }
        ]);
        this.launchAction = a[0];
        this.target.on({
            layerselectionchange: this.handleLayerChange,
            scope: this
        });
        return a
    },
    handleLayerChange: function (a) {
        this.launchAction.disable();
        if (a) {
            var b = this.target.getSource(a);
            b instanceof gxp.plugins.WMSSource && b.describeLayer(a, function (b) {
                this.checkIfStyleable(a, b)
            }, this)
        }
    },
    checkIfStyleable: function (a, b) {
        if (b) {
            var c = ["WFS"];
            !0 === this.rasterStyling && c.push("WCS")
        }
        if (b ? -1 !== c.indexOf(b.get("owsType")) : !this.requireDescribeLayer) {
            var c = !1,
                c = this.target.layerSources[a.get("source")],
                d;
            d = (d = a.get("restUrl")) ? d + "/styles" : c.url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest/styles");
            if (this.sameOriginStyling) {
                if (c = "/" === d.charAt(0), this.target.authenticate && c) {
                    this.launchAction.enable();
                    return
                }
            } else c = !0;
            c && this.target.isAuthorized() && this.enableActionIfAvailable(d)
        }
    },
    enableActionIfAvailable: function (a) {
        Ext.Ajax.request({
            method: "PUT",
            url: a,
            callback: function (a, c, d) {
                this.launchAction.setDisabled(405 !== d.status)
            },
            scope: this
        })
    },
    addOutput: function (a) {
        var a =
            a || {}, b = this.target.selectedLayer;
        this.outputConfig.title = (this.initialConfig.outputConfig || {}).title || this.menuText + ": " + b.get("title");
        this.outputConfig.shortTitle = b.get("title");
        Ext.apply(a, gxp.WMSStylesDialog.createGeoServerStylerConfig(b));
        !0 === this.rasterStyling && a.plugins.push({
            ptype: "gxp_wmsrasterstylesdialog"
        });
        Ext.applyIf(a, {
            style: "padding: 10px"
        });
        var c = gxp.plugins.Styler.superclass.addOutput.call(this, a);
        if (!(c.ownerCt.ownerCt instanceof Ext.Window)) c.dialogCls = Ext.Panel, c.showDlg = function (a) {
                a.layout =
                    "fit";
                a.autoHeight = !1;
                c.ownerCt.add(a)
        };
        c.stylesStore.on("load", function () {
            !this.outputTarget && c.ownerCt.ownerCt instanceof Ext.Window && c.ownerCt.ownerCt.center()
        })
    }
});
Ext.preg(gxp.plugins.Styler.prototype.ptype, gxp.plugins.Styler);
Ext.namespace("gxp.plugins");
gxp.plugins.CatalogueSource = Ext.extend(gxp.plugins.WMSSource, {
    url: null,
    title: null,
    lazy: !0,
    hidden: !0,
    proxyOptions: null,
    describeLayer: function (a, b, c) {
        a = new(Ext.data.Record.create([{
                name: "owsType",
                type: "string"
            }, {
                name: "owsURL",
                type: "string"
            }, {
                name: "typeName",
                type: "string"
            }
        ]))({
            owsType: "WFS",
            owsURL: a.get("url"),
            typeName: a.get("name")
        });
        b.call(c, a)
    },
    destroy: function () {
        this.store && this.store.destroy();
        this.store = null;
        gxp.plugins.CatalogueSource.superclass.destroy.apply(this, arguments)
    }
});
Ext.namespace("gxp.plugins");
gxp.plugins.CSWCatalogueSource = Ext.extend(gxp.plugins.CatalogueSource, {
    ptype: "gxp_cataloguesource",
    createStore: function () {
        this.store = new Ext.data.Store({
            proxy: new GeoExt.data.ProtocolProxy(Ext.apply({
                setParamsAsOptions: !0,
                protocol: new OpenLayers.Protocol.CSW({
                    url: this.url
                })
            }, this.proxyOptions || {})),
            reader: new GeoExt.data.CSWRecordsReader({
                fields: "title,abstract,URI,bounds,projection,references".split(",")
            })
        });
        gxp.plugins.LayerSource.prototype.createStore.apply(this, arguments)
    },
    getPagingParamNames: function () {
        return {
            start: "startPosition",
            limit: "maxRecords"
        }
    },
    getFullFilter: function (a, b) {
        var c = [];
        void 0 !== a && c.push(a);
        c = c.concat(b);
        return 1 >= c.length ? c[0] : new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: c
        })
    },
    filter: function (a) {
        var b = void 0;
        "" !== a.queryString && (b = new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.LIKE,
            matchCase: !1,
            property: "csw:AnyText",
            value: "*" + a.queryString + "*"
        }));
        var c = {
            resultType: "results",
            maxRecords: a.limit,
            Query: {
                typeNames: "gmd:MD_Metadata",
                ElementSetName: {
                    value: "full"
                }
            }
        },
            a = this.getFullFilter(b, a.filters);
        void 0 !== a && Ext.apply(c.Query, {
            Constraint: {
                version: "1.1.0",
                Filter: a
            }
        });
        Ext.apply(this.store.baseParams, c);
        this.store.load()
    }
});
Ext.preg(gxp.plugins.CSWCatalogueSource.prototype.ptype, gxp.plugins.CSWCatalogueSource);
Ext.namespace("gxp.plugins");
gxp.plugins.LoadingIndicator = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_loadingindicator",
    onlyShowOnFirstLoad: !1,
    loadingMapMessage: "Loading Map...",
    layerCount: 0,
    busyMask: null,
    init: function (a) {
        a.map.events.register("preaddlayer", this, function (b) {
            var c = b.layer;
            if (c instanceof OpenLayers.Layer.WMS) c.events.on({
                    loadstart: function () {
                        this.layerCount++;
                        if (!this.busyMask) this.busyMask = new Ext.LoadMask(a.map.div, {
                                msg: this.loadingMapMessage
                            });
                        this.busyMask.show();
                        !0 === this.onlyShowOnFirstLoad && c.events.unregister("loadstart",
                            this, arguments.callee)
                    },
                    loadend: function () {
                        this.layerCount--;
                        0 === this.layerCount && this.busyMask.hide();
                        !0 === this.onlyShowOnFirstLoad && c.events.unregister("loadend", this, arguments.callee)
                    },
                    scope: this
                })
        })
    },
    destroy: function () {
        Ext.destroy(this.busyMask);
        this.busyMask = null;
        gxp.plugins.LoadingIndicator.superclass.destroy.apply(this, arguments)
    }
});
Ext.preg(gxp.plugins.LoadingIndicator.prototype.ptype, gxp.plugins.LoadingIndicator);
Ext.namespace("gxp.plugins");
gxp.plugins.Legend = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_legend",
    menuText: "Legend",
    tooltip: "Show Legend",
    actionTarget: null,
    constructor: function (a) {
        gxp.plugins.Legend.superclass.constructor.apply(this, arguments);
        if (!this.outputConfig) this.outputConfig = {
                width: 300,
                height: 400
        };
        Ext.applyIf(this.outputConfig, {
            title: this.menuText
        })
    },
    addActions: function () {
        return gxp.plugins.Legend.superclass.addActions.apply(this, [
            [{
                    menuText: this.menuText,
                    iconCls: "gxp-icon-legend",
                    tooltip: this.tooltip,
                    handler: function () {
                        this.removeOutput();
                        this.addOutput()
                    },
                    scope: this
                }
            ]
        ])
    },
    getLegendPanel: function () {
        return this.output[0]
    },
    addOutput: function (a) {
        return gxp.plugins.Legend.superclass.addOutput.call(this, Ext.apply({
            xtype: "gx_legendpanel",
            ascending: !1,
            border: !1,
            hideMode: "offsets",
            layerStore: this.target.mapPanel.layers,
            defaults: {
                cls: "gxp-legend-item"
            }
        }, a))
    }
});
Ext.preg(gxp.plugins.Legend.prototype.ptype, gxp.plugins.Legend);
Ext.namespace("gxp.plugins");
gxp.plugins.Print = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_print",
    printService: null,
    printCapabilities: null,
    customParams: null,
    includeLegend: !1,
    menuText: "Print Map",
    tooltip: "Print Map",
    buttonText: "Print",
    notAllNotPrintableText: "Not All Layers Can Be Printed",
    nonePrintableText: "None of your current map layers can be printed",
    previewText: "Print Preview",
    openInNewWindow: !1,
    constructor: function (a) {
        gxp.plugins.Print.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        if (null !== this.printService ||
            null != this.printCapabilities) {
            var a = new GeoExt.data.PrintProvider({
                capabilities: this.printCapabilities,
                url: this.printService,
                customParams: this.customParams,
                autoLoad: !1,
                listeners: {
                    beforedownload: function (a, b) {
                        if (!0 === this.openInNewWindow) return window.open(b), !1
                    },
                    beforeencodelegend: function (a, b, c) {
                        if (c && "gxp_layermanager" === c.ptype) {
                            var d = [];
                            (c = c.output) && c[0] && c[0].getRootNode().cascade(function (a) {
                                if (a.component && !a.component.hidden) {
                                    var a = a.component,
                                        c = this.encoders.legends[a.getXType()];
                                    d = d.concat(c.call(this,
                                        a, b.pages[0].scale))
                                }
                            }, a);
                            b.legends = d;
                            return !1
                        }
                    },
                    beforeprint: function () {
                        d.items.get(0).printMapPanel.layers.each(function (a) {
                            var a = a.get("layer").params,
                                b;
                            for (b in a) a[b] instanceof Array && (a[b] = a[b].join(","))
                        })
                    },
                    loadcapabilities: function () {
                        if (c) c.initialConfig.disabled = !1, c.enable()
                    },
                    print: function () {
                        try {
                            d.close()
                        } catch (a) {}
                    },
                    printException: function (a, b) {
                        this.target.displayXHRTrouble && this.target.displayXHRTrouble(b)
                    },
                    scope: this
                }
            }),
                b = gxp.plugins.Print.superclass.addActions.call(this, [{
                        menuText: this.menuText,
                        buttonText: this.buttonText,
                        tooltip: this.tooltip,
                        iconCls: "gxp-icon-print",
                        disabled: null !== this.printCapabilities ? !1 : !0,
                        handler: function () {
                            if (0 < g().length) {
                                var a = i.call(this);
                                j.call(this);
                                return a
                            }
                            Ext.Msg.alert(this.notAllNotPrintableText, this.nonePrintableText)
                        },
                        scope: this,
                        listeners: {
                            render: function () {
                                a.loadCapabilities()
                            }
                        }
                    }
                ]),
                c = b[0].items[0],
                d, e = function () {
                    if (d) {
                        try {
                            d.items.first().printMapPanel.printPage.destroy()
                        } catch (a) {}
                        d = null
                    }
                }, f = this.target.mapPanel,
                g = function () {
                    var a = [];
                    f.layers.each(function (b) {
                        b =
                            b.getLayer();
                        h(b) && a.push(b)
                    });
                    return a
                }, h = function (a) {
                    return !0 === a.getVisibility() && (a instanceof OpenLayers.Layer.WMS || a instanceof OpenLayers.Layer.OSM)
                }, i = function () {
                    var b = null;
                    if (!0 === this.includeLegend) {
                        var c, g;
                        for (c in this.target.tools) if (g = this.target.tools[c], "gxp_legend" === g.ptype) {
                                b = g.getLegendPanel();
                                break
                            }
                        if (null === b) for (c in this.target.tools) if (g = this.target.tools[c], "gxp_layermanager" === g.ptype) {
                                    b = g;
                                    break
                                }
                    }
                    return d = new Ext.Window({
                        title: this.previewText,
                        modal: !0,
                        border: !1,
                        autoHeight: !0,
                        resizable: !1,
                        width: 360,
                        items: [new GeoExt.ux.PrintPreview({
                                minWidth: 336,
                                mapTitle: this.target.about && this.target.about.title,
                                comment: this.target.about && this.target.about["abstract"],
                                printMapPanel: {
                                    autoWidth: !0,
                                    height: Math.min(420, Ext.get(document.body).getHeight() - 150),
                                    limitScales: !0,
                                    map: Ext.applyIf({
                                        controls: [new OpenLayers.Control.Navigation({
                                                zoomWheelEnabled: !1,
                                                zoomBoxEnabled: !1
                                            }), new OpenLayers.Control.PanPanel, new OpenLayers.Control.ZoomPanel, new OpenLayers.Control.Attribution],
                                        eventListeners: {
                                            preaddlayer: function (a) {
                                                return h(a.layer)
                                            }
                                        }
                                    },
                                        f.initialConfig.map),
                                    items: [{
                                            xtype: "gx_zoomslider",
                                            vertical: !0,
                                            height: 100,
                                            aggressive: !0
                                        }
                                    ],
                                    listeners: {
                                        afterlayout: function () {
                                            d.setWidth(Math.max(360, this.getWidth() + 24));
                                            d.center()
                                        }
                                    }
                                },
                                printProvider: a,
                                includeLegend: this.includeLegend,
                                legend: b,
                                sourceMap: f
                            })],
                        listeners: {
                            beforedestroy: e
                        }
                    })
                }, j = function () {
                    d.show();
                    d.setWidth(0);
                    var a = 0;
                    d.items.get(0).items.get(0).items.each(function (b) {
                        b.getEl() && (a += b.getWidth())
                    });
                    d.setWidth(Math.max(d.items.get(0).printMapPanel.getWidth(), a + 20));
                    d.center()
                };
            return b
        }
    }
});
Ext.preg(gxp.plugins.Print.prototype.ptype, gxp.plugins.Print);
Ext.namespace("gxp.plugins");
gxp.plugins.GoogleEarth = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_googleearth",
    timeout: 7E3,
    menuText: "3D Viewer",
    tooltip: "Switch to 3D Viewer",
    tooltipMap: "Switch back to normal map view",
    constructor: function (a) {
        gxp.plugins.GoogleEarth.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        return gxp.plugins.GoogleEarth.superclass.addActions.apply(this, [
            [{
                    menuText: this.menuText,
                    enableToggle: !0,
                    iconCls: "gxp-icon-googleearth",
                    tooltip: this.tooltip,
                    toggleHandler: function (a, b) {
                        this.actions[0].each(function (a) {
                            a.toggle &&
                                a.toggle(!1, !0)
                        });
                        this.togglePanelDisplay(b)
                    },
                    scope: this
                }
            ]
        ])
    },
    togglePanelDisplay: function (a) {
        var b = this.target.mapPanel.ownerCt,
            c = b && b.getLayout();
        if (c && c instanceof Ext.layout.CardLayout) if (!0 === a) gxp.plugins.GoogleEarth.loader.onLoad({
                    callback: function () {
                        c.setActiveItem(1);
                        this.actions[0].enable();
                        this.actions[0].items[0].setTooltip(this.tooltipMap);
                        this.actions[0].each(function (a) {
                            a.toggle && a.toggle(!0, !0)
                        })
                    },
                    scope: this
                });
            else c.setActiveItem(0), this.actions[0].items[0].setTooltip(this.tooltip)
    },
    getHost: function () {
        return window.location.host.split(":").shift() + ":" + (window.location.port || "80")
    }
});
gxp.plugins.GoogleEarth.loader = new(Ext.extend(Ext.util.Observable, {
    ready: !(!window.google || !window.google.earth),
    loading: !1,
    constructor: function () {
        this.addEvents("ready", "failure");
        return Ext.util.Observable.prototype.constructor.apply(this, arguments)
    },
    onScriptLoad: function () {
        var a = gxp.plugins.GoogleEarth.loader;
        if (!a.ready) a.ready = !0, a.loading = !1, a.fireEvent("ready")
    },
    onLoad: function (a) {
        if (this.ready) window.setTimeout(function () {
                a.callback.call(a.scope)
            }, 0);
        else if (this.loading) this.on({
                ready: a.callback,
                failure: a.errback || Ext.emptyFn,
                scope: a.scope
            });
        else this.loadScript(a)
    },
    loadScript: function (a) {
        function b() {
            document.getElementsByTagName("head")[0].appendChild(d)
        }
        window.google && delete google.loader;
        var c = {
            autoload: Ext.encode({
                modules: [{
                        name: "earth",
                        version: "1",
                        callback: "gxp.plugins.GoogleEarth.loader.onScriptLoad"
                    }
                ]
            })
        }, d = document.createElement("script");
        d.src = "http://www.google.com/jsapi?" + Ext.urlEncode(c);
        c = a.timeout || gxp.plugins.GoogleSource.prototype.timeout;
        window.setTimeout(function () {
            gxp.plugins.GoogleEarth.loader.ready ||
                (this.fireEvent("failure"), this.unload())
        }.createDelegate(this), c);
        this.on({
            ready: a.callback,
            failure: a.errback || Ext.emptyFn,
            scope: a.scope
        });
        this.loading = !0;
        if (document.body) b();
        else Ext.onReady(b);
        this.script = d
    },
    unload: function () {
        this.purgeListeners();
        this.script && (document.getElementsByTagName("head")[0].removeChild(this.script), delete this.script);
        this.ready = this.loading = !1;
        delete google.loader;
        delete google.earth
    }
}));
Ext.preg(gxp.plugins.GoogleEarth.prototype.ptype, gxp.plugins.GoogleEarth);
Ext.namespace("gxp");
gxp.FilterBuilder = Ext.extend(Ext.Container, {
    builderTypeNames: ["any", "all", "none", "not all"],
    allowedBuilderTypes: null,
    allowBlank: !1,
    preComboText: "Match",
    postComboText: "of the following:",
    cls: "gxp-filterbuilder",
    builderType: null,
    childFilterContainer: null,
    customizeFilterOnInit: !0,
    addConditionText: "add condition",
    addGroupText: "add group",
    removeConditionText: "remove condition",
    allowGroups: !0,
    initComponent: function () {
        Ext.applyIf(this, {
            defaultBuilderType: gxp.FilterBuilder.ANY_OF
        });
        if (this.customizeFilterOnInit) this.filter =
                this.customizeFilter(this.filter);
        this.builderType = this.getBuilderType();
        this.items = [{
                xtype: "container",
                layout: "form",
                ref: "form",
                defaults: {
                    anchor: "100%"
                },
                hideLabels: !0,
                items: [{
                        xtype: "compositefield",
                        style: "padding-left: 2px",
                        items: [{
                                xtype: "label",
                                style: "padding-top: 0.3em",
                                text: this.preComboText
                            },
                            this.createBuilderTypeCombo(), {
                                xtype: "label",
                                style: "padding-top: 0.3em",
                                text: this.postComboText
                            }
                        ]
                    },
                    this.createChildFiltersPanel(), {
                        xtype: "toolbar",
                        items: this.createToolBar()
                    }
                ]
            }
        ];
        this.addEvents("change");
        gxp.FilterBuilder.superclass.initComponent.call(this)
    },
    createToolBar: function () {
        var a = [{
                text: this.addConditionText,
                iconCls: "add",
                handler: function () {
                    this.addCondition()
                },
                scope: this
            }
        ];
        this.allowGroups && a.push({
            text: this.addGroupText,
            iconCls: "add",
            handler: function () {
                this.addCondition(!0)
            },
            scope: this
        });
        return a
    },
    getFilter: function () {
        var a;
        this.filter && (a = this.filter.clone(), a instanceof OpenLayers.Filter.Logical && (a = this.cleanFilter(a)));
        return a
    },
    cleanFilter: function (a) {
        if (a instanceof OpenLayers.Filter.Logical) if (a.type !==
                OpenLayers.Filter.Logical.NOT && 1 === a.filters.length) a = this.cleanFilter(a.filters[0]);
            else for (var b, c = 0, d = a.filters.length; c < d; ++c) if (b = a.filters[c], b instanceof OpenLayers.Filter.Logical) if (b = this.cleanFilter(b)) a.filters[c] = b;
                        else {
                            a = b;
                            break
                        } else {
                            if (!b || null === b.type || null === b.property || null === b[a.type === OpenLayers.Filter.Comparison.BETWEEN ? "lowerBoundary" : "value"]) {
                                a = !1;
                                break
                            }
                        } else if (!a || null === a.type || null === a.property || null === a[a.type === OpenLayers.Filter.Comparison.BETWEEN ? "lowerBoundary" : "value"]) a = !1;
        return a
    },
    customizeFilter: function (a) {
        if (a) {
            var a = this.cleanFilter(a),
                b, c, d;
            switch (a.type) {
                case OpenLayers.Filter.Logical.AND:
                case OpenLayers.Filter.Logical.OR:
                    if (!a.filters || 0 === a.filters.length) a.filters = [this.createDefaultFilter()];
                    else for (c = 0, d = a.filters.length; c < d; ++c) b = a.filters[c], b instanceof OpenLayers.Filter.Logical && (a.filters[c] = this.customizeFilter(b));
                    a = new OpenLayers.Filter.Logical({
                        type: OpenLayers.Filter.Logical.OR,
                        filters: [a]
                    });
                    break;
                case OpenLayers.Filter.Logical.NOT:
                    if (!a.filters ||
                        0 === a.filters.length) a.filters = [new OpenLayers.Filter.Logical({
                                type: OpenLayers.Filter.Logical.OR,
                                filters: [this.createDefaultFilter()]
                            })];
                    else if (b = a.filters[0], b instanceof OpenLayers.Filter.Logical) if (b.type !== OpenLayers.Filter.Logical.NOT) {
                            var e;
                            for (c = 0, d = b.filters.length; c < d; ++c) e = b.filters[c], e instanceof OpenLayers.Filter.Logical && (b.filters[c] = this.customizeFilter(e))
                        } else a = b.filters && 0 < b.filters.length ? this.customizeFilter(b.filters[0]) : this.wrapFilter(this.createDefaultFilter());
                        else a.filters = [new OpenLayers.Filter.Logical({
                                    type: this.defaultBuilderType === gxp.FilterBuilder.NOT_ALL_OF ? OpenLayers.Filter.Logical.AND : OpenLayers.Filter.Logical.OR,
                                    filters: [b]
                                })];
                    break;
                default:
                    a = this.wrapFilter(a)
            }
        } else a = this.wrapFilter(this.createDefaultFilter());
        return a
    },
    createDefaultFilter: function () {
        return new OpenLayers.Filter.Comparison
    },
    wrapFilter: function (a) {
        return new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.OR,
            filters: [new OpenLayers.Filter.Logical({
                    type: this.defaultBuilderType === gxp.FilterBuilder.ALL_OF ? OpenLayers.Filter.Logical.AND : OpenLayers.Filter.Logical.OR,
                    filters: [a]
                })]
        })
    },
    addCondition: function (a) {
        var b, c;
        a ? (c = "gxp_filterbuilder", b = this.wrapFilter(this.createDefaultFilter())) : (c = "gxp_filterfield", b = this.createDefaultFilter());
        this.childFilterContainer.add(this.newRow({
            xtype: c,
            filter: b,
            columnWidth: 1,
            attributes: this.attributes,
            allowBlank: a ? void 0 : this.allowBlank,
            customizeFilterOnInit: a && !1,
            listeners: {
                change: function () {
                    this.fireEvent("change", this)
                },
                scope: this
            }
        }));
        this.filter.filters[0].filters.push(b);
        this.childFilterContainer.doLayout()
    },
    removeCondition: function (a, b) {
        var c = this.filter.filters[0].filters;
        0 < c.length && (c.remove(b), this.childFilterContainer.remove(a, !0));
        0 === c.length && this.addCondition();
        this.fireEvent("change", this)
    },
    createBuilderTypeCombo: function () {
        for (var a = this.allowedBuilderTypes || [gxp.FilterBuilder.ANY_OF, gxp.FilterBuilder.ALL_OF, gxp.FilterBuilder.NONE_OF], b = a.length, c = Array(b), d, e = 0; e < b; ++e) d = a[e], c[e] = [d, this.builderTypeNames[d]];
        return {
            xtype: "combo",
            store: new Ext.data.SimpleStore({
                data: c,
                fields: ["value", "name"]
            }),
            value: this.builderType,
            ref: "../../builderTypeCombo",
            displayField: "name",
            valueField: "value",
            triggerAction: "all",
            mode: "local",
            listeners: {
                select: function (a, b) {
                    this.changeBuilderType(b.get("value"));
                    this.fireEvent("change", this)
                },
                scope: this
            },
            width: 60
        }
    },
    changeBuilderType: function (a) {
        if (a !== this.builderType) {
            this.builderType = a;
            var b = this.filter.filters[0];
            switch (a) {
                case gxp.FilterBuilder.ANY_OF:
                    this.filter.type = OpenLayers.Filter.Logical.OR;
                    b.type = OpenLayers.Filter.Logical.OR;
                    break;
                case gxp.FilterBuilder.ALL_OF:
                    this.filter.type = OpenLayers.Filter.Logical.OR;
                    b.type = OpenLayers.Filter.Logical.AND;
                    break;
                case gxp.FilterBuilder.NONE_OF:
                    this.filter.type = OpenLayers.Filter.Logical.NOT;
                    b.type = OpenLayers.Filter.Logical.OR;
                    break;
                case gxp.FilterBuilder.NOT_ALL_OF:
                    this.filter.type = OpenLayers.Filter.Logical.NOT, b.type = OpenLayers.Filter.Logical.AND
            }
        }
    },
    createChildFiltersPanel: function () {
        this.childFilterContainer = new Ext.Container;
        for (var a = this.filter.filters[0].filters, b, c = 0, d = a.length; c < d; ++c) {
            b =
                a[c];
            var e = {
                xtype: "gxp_filterfield",
                allowBlank: this.allowBlank,
                columnWidth: 1,
                filter: b,
                attributes: this.attributes,
                listeners: {
                    change: function () {
                        this.fireEvent("change", this)
                    },
                    scope: this
                }
            };
            this.childFilterContainer.add(this.newRow(Ext.applyIf(b instanceof OpenLayers.Filter.Logical ? {
                xtype: "gxp_filterbuilder"
            } : {
                xtype: "container",
                layout: "form",
                hideLabels: !0,
                items: e
            }, e)))
        }
        return this.childFilterContainer
    },
    newRow: function (a) {
        var b = new Ext.Container({
            layout: "column",
            items: [{
                    xtype: "container",
                    width: 28,
                    height: 26,
                    style: "padding-left: 2px",
                    items: {
                        xtype: "button",
                        tooltip: this.removeConditionText,
                        iconCls: "delete",
                        handler: function () {
                            this.removeCondition(b, a.filter)
                        },
                        scope: this
                    }
                },
                a
            ]
        });
        return b
    },
    getBuilderType: function () {
        var a = this.defaultBuilderType;
        if (this.filter) {
            var b = this.filter.filters[0];
            if (this.filter.type === OpenLayers.Filter.Logical.NOT) switch (b.type) {
                    case OpenLayers.Filter.Logical.OR:
                        a = gxp.FilterBuilder.NONE_OF;
                        break;
                    case OpenLayers.Filter.Logical.AND:
                        a = gxp.FilterBuilder.NOT_ALL_OF
            } else switch (b.type) {
                    case OpenLayers.Filter.Logical.OR:
                        a =
                            gxp.FilterBuilder.ANY_OF;
                        break;
                    case OpenLayers.Filter.Logical.AND:
                        a = gxp.FilterBuilder.ALL_OF
            }
        }
        return a
    },
    setFilter: function (a) {
        this.filter = this.customizeFilter(a);
        this.changeBuilderType(this.getBuilderType());
        this.builderTypeCombo.setValue(this.builderType);
        this.form.remove(this.childFilterContainer);
        this.form.insert(1, this.createChildFiltersPanel());
        this.form.doLayout();
        this.fireEvent("change", this)
    }
});
gxp.FilterBuilder.ANY_OF = 0;
gxp.FilterBuilder.ALL_OF = 1;
gxp.FilterBuilder.NONE_OF = 2;
gxp.FilterBuilder.NOT_ALL_OF = 3;
Ext.reg("gxp_filterbuilder", gxp.FilterBuilder);
Ext.namespace("gxp");
gxp.WMSLayerPanel = Ext.extend(Ext.TabPanel, {
    layerRecord: null,
    source: null,
    styling: !0,
    sameOriginStyling: !0,
    rasterStyling: !1,
    transparent: null,
    editableStyles: !1,
    activeTab: 0,
    border: !1,
    imageFormats: /png|gif|jpe?g/i,
    aboutText: "About",
    titleText: "Title",
    nameText: "Name",
    descriptionText: "Description",
    displayText: "Display",
    opacityText: "Opacity",
    formatText: "Tile format",
    infoFormatText: "Info format",
    infoFormatEmptyText: "Select a format",
    transparentText: "Transparent",
    cacheText: "Caching",
    cacheFieldText: "Use cached tiles",
    stylesText: "Styles",
    displayOptionsText: "Display options",
    queryText: "Limit with filters",
    scaleText: "Limit by scale",
    minScaleText: "Min scale",
    maxScaleText: "Max scale",
    switchToFilterBuilderText: "Switch back to filter builder",
    cqlPrefixText: "or ",
    cqlText: "use CQL filter instead",
    initComponent: function () {
        this.cqlFormat = new OpenLayers.Format.CQL;
        this.source && this.source.getSchema(this.layerRecord, function (a) {
            if (!1 !== a) {
                var c = this.layerRecord.getLayer().params.CQL_FILTER;
                this.filterBuilder = new gxp.FilterBuilder({
                    filter: c && this.cqlFormat.read(c),
                    allowGroups: !1,
                    listeners: {
                        afterrender: function () {
                            this.filterBuilder.cascade(function (a) {
                                "toolbar" === a.getXType() && (a.addText(this.cqlPrefixText), a.addButton({
                                    text: this.cqlText,
                                    handler: this.switchToCQL,
                                    scope: this
                                }))
                            }, this)
                        },
                        change: function (a) {
                            var a = a.getFilter(),
                                b = null;
                            !1 !== a && (b = this.cqlFormat.write(a));
                            this.layerRecord.getLayer().mergeNewParams({
                                CQL_FILTER: b
                            })
                        },
                        scope: this
                    },
                    attributes: a
                });
                this.filterFieldset.add(this.filterBuilder);
                this.filterFieldset.doLayout()
            }
        }, this);
        this.addEvents("change");
        this.items = [this.createAboutPanel(), this.createDisplayPanel()];
        if (this.styling && gxp.WMSStylesDialog && this.layerRecord.get("styles")) {
            var a = this.layerRecord.get("restUrl");
            a || (a = (this.source || this.layerRecord.get("layer")).url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest"));
            this.editableStyles = this.sameOriginStyling ? "/" === a.charAt(0) : !0;
            this.items.push(this.createStylesPanel(a))
        }
        gxp.WMSLayerPanel.superclass.initComponent.call(this)
    },
    switchToCQL: function () {
        var a = this.filterBuilder.getFilter(),
            b = "";
        !1 !== a && (b = this.cqlFormat.write(a));
        this.filterBuilder.hide();
        this.cqlField.setValue(b);
        this.cqlField.show();
        this.cqlToolbar.show()
    },
    switchToFilterBuilder: function () {
        var a = null;
        try {
            a = this.cqlFormat.read(this.cqlField.getValue())
        } catch (b) {}
        this.cqlField.hide();
        this.cqlToolbar.hide();
        this.filterBuilder.show();
        null !== a && this.filterBuilder.setFilter(a)
    },
    createStylesPanel: function (a) {
        var b = gxp.WMSStylesDialog.createGeoServerStylerConfig(this.layerRecord, a);
        !0 === this.rasterStyling && b.plugins.push({
            ptype: "gxp_wmsrasterstylesdialog"
        });
        var c = this.ownerCt;
        if (!(c.ownerCt instanceof Ext.Window)) b.dialogCls = Ext.Panel, b.showDlg = function (a) {
                a.layout = "fit";
                a.autoHeight = !1;
                c.add(a)
        };
        return Ext.apply(b, {
            title: this.stylesText,
            style: "padding: 10px",
            editable: !1,
            listeners: Ext.apply(b.listeners, {
                beforerender: {
                    fn: function (b) {
                        var c = !this.editableStyles;
                        if (!c) "boolean" == typeof this.authorized ? (b.editable = this.authorized, b.ownerCt.doLayout()) : Ext.Ajax.request({
                                method: "PUT",
                                url: a + "/styles",
                                callback: function (a, c, e) {
                                    b.editable = 405 == e.status;
                                    b.ownerCt.doLayout()
                                }
                            });
                        return c
                    },
                    scope: this,
                    single: !0
                }
            })
        })
    },
    createAboutPanel: function () {
        return {
            title: this.aboutText,
            bodyStyle: {
                padding: "10px"
            },
            defaults: {
                border: !1
            },
            items: [{
                    layout: "form",
                    labelWidth: 70,
                    items: [{
                            xtype: "textfield",
                            fieldLabel: this.titleText,
                            anchor: "99%",
                            value: this.layerRecord.get("title"),
                            listeners: {
                                change: function (a) {
                                    this.layerRecord.set("title", a.getValue());
                                    this.layerRecord.commit();
                                    this.fireEvent("change")
                                },
                                scope: this
                            }
                        }, {
                            xtype: "textfield",
                            fieldLabel: this.nameText,
                            anchor: "99%",
                            value: this.layerRecord.get("name"),
                            readOnly: !0
                        }
                    ]
                }, {
                    layout: "form",
                    labelAlign: "top",
                    items: [{
                            xtype: "textarea",
                            fieldLabel: this.descriptionText,
                            grow: !0,
                            growMax: 150,
                            anchor: "99%",
                            value: this.layerRecord.get("abstract"),
                            readOnly: !0
                        }
                    ]
                }
            ]
        }
    },
    onFormatChange: function (a) {
        var b = this.layerRecord.getLayer(),
            a = a.getValue();
        b.mergeNewParams({
            format: a
        });
        b = this.transparentCb;
        if ("image/jpeg" == a) this.transparent = b.getValue(), b.setValue(!1);
        else if (null !== this.transparent) b.setValue(this.transparent), this.transparent = null;
        b.setDisabled("image/jpeg" == a);
        this.fireEvent("change")
    },
    addScaleOptions: function (a, b) {
        a.alwaysInRange = null;
        a.addOptions(b);
        a.display();
        a.redraw()
    },
    createDisplayPanel: function () {
        var a = this.layerRecord,
            b = a.getLayer(),
            c = b.opacity;
        null == c && (c = 1);
        var d = [],
            c = b.params.FORMAT.toLowerCase();
        Ext.each(a.get("formats"), function (a) {
            this.imageFormats.test(a) && d.push(a.toLowerCase())
        }, this); - 1 === d.indexOf(c) && d.push(c);
        var e = b.params.TRANSPARENT;
        return {
            title: this.displayText,
            layout: "form",
            bodyStyle: {
                padding: "10px"
            },
            defaults: {
                labelWidth: 70
            },
            items: [{
                    xtype: "fieldset",
                    title: this.displayOptionsText,
                    items: [{
                            xtype: "gx_opacityslider",
                            name: "opacity",
                            anchor: "99%",
                            isFormField: !0,
                            fieldLabel: this.opacityText,
                            listeners: {
                                change: function () {
                                    this.fireEvent("change")
                                },
                                scope: this
                            },
                            layer: this.layerRecord
                        }, {
                            xtype: "compositefield",
                            fieldLabel: this.formatText,
                            anchor: "99%",
                            items: [{
                                    xtype: "combo",
                                    width: 90,
                                    listWidth: 150,
                                    store: d,
                                    value: c,
                                    mode: "local",
                                    triggerAction: "all",
                                    editable: !1,
                                    listeners: {
                                        select: this.onFormatChange,
                                        scope: this
                                    }
                                }, {
                                    xtype: "checkbox",
                                    ref: "../../../transparentCb",
                                    checked: "true" === e || !0 === e,
                                    listeners: {
                                        check: function (a,
                                            c) {
                                            b.mergeNewParams({
                                                transparent: c ? "true" : "false"
                                            });
                                            this.fireEvent("change")
                                        },
                                        scope: this
                                    }
                                }, {
                                    xtype: "label",
                                    cls: "gxp-layerproperties-label",
                                    text: this.transparentText
                                }
                            ]
                        }, {
                            xtype: "compositefield",
                            anchor: "99%",
                            hidden: null == this.layerRecord.get("layer").params.TILED,
                            fieldLabel: this.cacheText,
                            items: [{
                                    xtype: "checkbox",
                                    checked: !0 === this.layerRecord.get("layer").params.TILED,
                                    listeners: {
                                        check: function (a, b) {
                                            this.layerRecord.get("layer").mergeNewParams({
                                                TILED: b
                                            });
                                            this.fireEvent("change")
                                        },
                                        scope: this
                                    }
                                }, {
                                    xtype: "label",
                                    cls: "gxp-layerproperties-label",
                                    text: this.cacheFieldText
                                }
                            ]
                        }, {
                            xtype: "combo",
                            fieldLabel: this.infoFormatText,
                            emptyText: this.infoFormatEmptyText,
                            store: a.get("infoFormats"),
                            value: a.get("infoFormat"),
                            hidden: void 0 === a.get("infoFormats"),
                            mode: "local",
                            listWidth: 150,
                            triggerAction: "all",
                            editable: !1,
                            anchor: "99%",
                            listeners: {
                                select: function (b) {
                                    b = b.getValue();
                                    a.set("infoFormat", b);
                                    this.fireEvent("change")
                                }
                            },
                            scope: this
                        }
                    ]
                }, {
                    xtype: "fieldset",
                    title: this.queryText,
                    hideLabels: !0,
                    ref: "../filterFieldset",
                    listeners: {
                        expand: function () {
                            this.layerRecord.getLayer().mergeNewParams({
                                CQL_FILTER: this.cqlFilter
                            })
                        },
                        collapse: function () {
                            this.cqlFilter = this.layerRecord.getLayer().params.CQL_FILTER;
                            this.layerRecord.getLayer().mergeNewParams({
                                CQL_FILTER: null
                            })
                        },
                        scope: this
                    },
                    hidden: null === this.source,
                    checkboxToggle: !0,
                    collapsed: !this.layerRecord.getLayer().params.CQL_FILTER,
                    items: [{
                            xtype: "textarea",
                            value: this.layerRecord.getLayer().params.CQL_FILTER,
                            grow: !0,
                            anchor: "99%",
                            width: "100%",
                            growMax: 100,
                            ref: "../../cqlField",
                            hidden: !0
                        }
                    ],
                    buttons: [{
                            ref: "../../../cqlToolbar",
                            hidden: !0,
                            text: this.switchToFilterBuilderText,
                            handler: this.switchToFilterBuilder,
                            scope: this
                        }
                    ]
                }, {
                    xtype: "fieldset",
                    title: this.scaleText,
                    listeners: {
                        expand: function () {
                            var a = this.layerRecord.getLayer();
                            (void 0 !== this.minScale || void 0 !== this.maxScale) && this.addScaleOptions(a, {
                                minScale: this.maxScale,
                                maxScale: this.minScale
                            })
                        },
                        collapse: function () {
                            var a = this.layerRecord.getLayer();
                            this.minScale = a.options.maxScale;
                            this.maxScale = a.options.minScale;
                            this.addScaleOptions(a, {
                                minScale: null,
                                maxScale: null
                            })
                        },
                        scope: this
                    },
                    checkboxToggle: !0,
                    collapsed: null == this.layerRecord.getLayer().options.maxScale && null == this.layerRecord.getLayer().options.minScale,
                    items: [{
                            xtype: "compositefield",
                            fieldLabel: this.minScaleText,
                            items: [{
                                    xtype: "label",
                                    text: "1:",
                                    cls: "gxp-layerproperties-label"
                                }, {
                                    xtype: "numberfield",
                                    anchor: "99%",
                                    width: "85%",
                                    listeners: {
                                        change: function (a) {
                                            a = {
                                                maxScale: parseInt(a.getValue())
                                            };
                                            this.addScaleOptions(this.layerRecord.getLayer(), a)
                                        },
                                        scope: this
                                    },
                                    value: this.layerRecord.getLayer().options.maxScale
                                }
                            ]
                        }, {
                            xtype: "compositefield",
                            fieldLabel: this.maxScaleText,
                            items: [{
                                    xtype: "label",
                                    text: "1:",
                                    cls: "gxp-layerproperties-label"
                                }, {
                                    xtype: "numberfield",
                                    anchor: "99%",
                                    width: "85%",
                                    listeners: {
                                        change: function (a) {
                                            a = {
                                                minScale: parseInt(a.getValue())
                                            };
                                            this.addScaleOptions(this.layerRecord.getLayer(), a)
                                        },
                                        scope: this
                                    },
                                    value: this.layerRecord.getLayer().options.minScale
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
});
Ext.reg("gxp_wmslayerpanel", gxp.WMSLayerPanel);
Ext.namespace("gxp.form");
gxp.form.FilterField = Ext.extend(Ext.form.CompositeField, {
    lowerBoundaryTip: "lower boundary",
    upperBoundaryTip: "upper boundary",
    filter: null,
    attributes: null,
    attributesComboConfig: null,
    initComponent: function () {
        if (!this.filter) this.filter = this.createDefaultFilter();
        var a = "remote",
            b = new GeoExt.data.AttributeStore;
        if (this.attributes) 0 != this.attributes.getCount() ? (a = "local", this.attributes.each(function (a) {
                /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/.exec(a.get("type")) || b.add([a])
            })) : b = this.attributes;
        a = {
            xtype: "combo",
            store: b,
            editable: "local" == a,
            typeAhead: !0,
            forceSelection: !0,
            mode: a,
            triggerAction: "all",
            ref: "property",
            allowBlank: this.allowBlank,
            displayField: "name",
            valueField: "name",
            value: this.filter.property,
            listeners: {
                select: function (a, b) {
                    this.items.get(1).enable();
                    this.filter.property = b.get("name");
                    this.fireEvent("change", this.filter, this)
                },
                blur: function (a) {
                    var b = a.store.findExact("name", a.getValue()); - 1 != b ? a.fireEvent("select", a, a.store.getAt(b)) : null != a.startValue && a.setValue(a.startValue)
                },
                scope: this
            },
            width: 120
        };
        this.attributesComboConfig = this.attributesComboConfig || {};
        Ext.applyIf(this.attributesComboConfig, a);
        this.items = this.createFilterItems();
        this.addEvents("change");
        gxp.form.FilterField.superclass.initComponent.call(this)
    },
    validateValue: function () {
        return this.filter.type === OpenLayers.Filter.Comparison.BETWEEN ? null !== this.filter.property && null !== this.filter.upperBoundary && null !== this.filter.lowerBoundary : null !== this.filter.property && null !== this.filter.value && null !== this.filter.type
    },
    createDefaultFilter: function () {
        return new OpenLayers.Filter.Comparison
    },
    createFilterItems: function () {
        var a = this.filter.type === OpenLayers.Filter.Comparison.BETWEEN;
        return [this.attributesComboConfig, Ext.applyIf({
            xtype: "gxp_comparisoncombo",
            ref: "type",
            disabled: null == this.filter.property,
            allowBlank: this.allowBlank,
            value: this.filter.type,
            listeners: {
                select: function (a, c) {
                    this.items.get(2).enable();
                    this.items.get(3).enable();
                    this.items.get(4).enable();
                    this.setFilterType(c.get("value"));
                    this.fireEvent("change",
                        this.filter, this)
                },
                scope: this
            }
        }, this.comparisonComboConfig), {
            xtype: "textfield",
            disabled: null == this.filter.type,
            hidden: a,
            ref: "value",
            value: this.filter.value,
            width: 50,
            grow: !0,
            growMin: 50,
            anchor: "100%",
            allowBlank: this.allowBlank,
            listeners: {
                change: function (a, c) {
                    this.filter.value = c;
                    this.fireEvent("change", this.filter, this)
                },
                scope: this
            }
        }, {
            xtype: "textfield",
            disabled: null == this.filter.type,
            hidden: !a,
            value: this.filter.lowerBoundary,
            tooltip: this.lowerBoundaryTip,
            grow: !0,
            growMin: 30,
            ref: "lowerBoundary",
            anchor: "100%",
            allowBlank: this.allowBlank,
            listeners: {
                change: function (a, c) {
                    this.filter.lowerBoundary = c;
                    this.fireEvent("change", this.filter, this)
                },
                render: function (a) {
                    Ext.QuickTips.register({
                        target: a.getEl(),
                        text: this.lowerBoundaryTip
                    })
                },
                autosize: function (a, c) {
                    a.setWidth(c);
                    a.ownerCt.doLayout()
                },
                scope: this
            }
        }, {
            xtype: "textfield",
            disabled: null == this.filter.type,
            hidden: !a,
            grow: !0,
            growMin: 30,
            ref: "upperBoundary",
            value: this.filter.upperBoundary,
            allowBlank: this.allowBlank,
            listeners: {
                change: function (a, c) {
                    this.filter.upperBoundary =
                        c;
                    this.fireEvent("change", this.filter, this)
                },
                render: function (a) {
                    Ext.QuickTips.register({
                        target: a.getEl(),
                        text: this.upperBoundaryTip
                    })
                },
                scope: this
            }
        }]
    },
    setFilterType: function (a) {
        this.filter.type = a;
        a === OpenLayers.Filter.Comparison.BETWEEN ? (this.items.get(2).hide(), this.items.get(3).show(), this.items.get(4).show()) : (this.items.get(2).show(), this.items.get(3).hide(), this.items.get(4).hide());
        this.doLayout()
    },
    setFilter: function (a) {
        var b = this.filter.type;
        this.filter = a;
        b !== a.type && this.setFilterType(a.type);
        this.property.setValue(a.property);
        this.type.setValue(a.type);
        a.type === OpenLayers.Filter.Comparison.BETWEEN ? (this.lowerBoundary.setValue(a.lowerBoundary), this.upperBoundary.setValue(a.upperBoundary)) : this.value.setValue(a.value);
        this.fireEvent("change", this.filter, this)
    }
});
Ext.reg("gxp_filterfield", gxp.form.FilterField);
Ext.namespace("gxp.form");
gxp.form.ComparisonComboBox = Ext.extend(Ext.form.ComboBox, {
    allowedTypes: [
        [OpenLayers.Filter.Comparison.EQUAL_TO, "="],
        [OpenLayers.Filter.Comparison.NOT_EQUAL_TO, "<>"],
        [OpenLayers.Filter.Comparison.LESS_THAN, "<"],
        [OpenLayers.Filter.Comparison.GREATER_THAN, ">"],
        [OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO, "<="],
        [OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO, ">="],
        [OpenLayers.Filter.Comparison.LIKE, "like"],
        [OpenLayers.Filter.Comparison.BETWEEN, "between"]
    ],
    allowBlank: !1,
    mode: "local",
    typeAhead: !0,
    forceSelection: !0,
    triggerAction: "all",
    width: 50,
    editable: !0,
    initComponent: function () {
        var a = {
            displayField: "name",
            valueField: "value",
            store: new Ext.data.SimpleStore({
                data: this.allowedTypes,
                fields: ["value", "name"]
            }),
            value: void 0 === this.value ? this.allowedTypes[0][0] : this.value,
            listeners: {
                blur: function () {
                    var a = this.store.findExact("value", this.getValue()); - 1 != a ? this.fireEvent("select", this, this.store.getAt(a)) : null != this.startValue && this.setValue(this.startValue)
                }
            }
        };
        Ext.applyIf(this, a);
        gxp.form.ComparisonComboBox.superclass.initComponent.call(this)
    }
});
Ext.reg("gxp_comparisoncombo", gxp.form.ComparisonComboBox);
Ext.namespace("gxp");
gxp.ScaleLimitPanel = Ext.extend(Ext.Panel, {
    maxScaleDenominatorLimit: 1.577757414193268E9 * OpenLayers.DOTS_PER_INCH / 256,
    limitMaxScaleDenominator: !0,
    maxScaleDenominator: void 0,
    minScaleDenominatorLimit: 1.577757414193268E9 * Math.pow(0.5, 19) * OpenLayers.DOTS_PER_INCH / 256,
    limitMinScaleDenominator: !0,
    minScaleDenominator: void 0,
    scaleLevels: 20,
    scaleSliderTemplate: "{scaleType} Scale 1:{scale}",
    modifyScaleTipContext: Ext.emptyFn,
    scaleFactor: null,
    changing: !1,
    border: !1,
    maxScaleLimitText: "Max scale limit",
    minScaleLimitText: "Min scale limit",
    initComponent: function () {
        this.layout = "column";
        this.defaults = {
            border: !1,
            bodyStyle: "margin: 0 5px;"
        };
        this.bodyStyle = {
            padding: "5px"
        };
        this.scaleSliderTemplate = new Ext.Template(this.scaleSliderTemplate);
        Ext.applyIf(this, {
            minScaleDenominator: this.minScaleDenominatorLimit,
            maxScaleDenominator: this.maxScaleDenominatorLimit
        });
        this.scaleFactor = Math.pow(this.maxScaleDenominatorLimit / this.minScaleDenominatorLimit, 1 / (this.scaleLevels - 1));
        this.scaleSlider = new Ext.Slider({
            vertical: !0,
            height: 100,
            values: [0, 100],
            listeners: {
                changecomplete: function (a) {
                    this.updateScaleValues(a)
                },
                render: function (a) {
                    a.thumbs[0].el.setVisible(this.limitMaxScaleDenominator);
                    a.thumbs[1].el.setVisible(this.limitMinScaleDenominator);
                    a.setDisabled(!this.limitMinScaleDenominator && !this.limitMaxScaleDenominator)
                },
                scope: this
            },
            plugins: [new gxp.slider.Tip({
                    getText: function (a) {
                        var b = a.slider.thumbs.indexOf(a),
                            a = {
                                scale: "" + this.sliderValuesToScale([a.value])[0],
                                zoom: (a.value * (this.scaleLevels / 100)).toFixed(1),
                                type: 0 === b ? "Max" : "Min",
                                scaleType: 0 === b ? "Min" : "Max"
                            };
                        this.modifyScaleTipContext(this, a);
                        return this.scaleSliderTemplate.apply(a)
                    }.createDelegate(this)
                })]
        });
        this.maxScaleDenominatorInput = new Ext.form.NumberField({
            allowNegative: !1,
            width: 100,
            fieldLabel: "1",
            value: Math.round(this.maxScaleDenominator),
            disabled: !this.limitMaxScaleDenominator,
            validator: function (a) {
                return !this.limitMinScaleDenominator || a > this.minScaleDenominator
            }.createDelegate(this),
            listeners: {
                valid: function (a) {
                    var a = Number(a.getValue()),
                        b = Math.round(this.maxScaleDenominatorLimit);
                    if (a < b && a > this.minScaleDenominator) this.maxScaleDenominator = a, this.updateSliderValues()
                },
                change: function (a) {
                    var b =
                        Number(a.getValue()),
                        c = Math.round(this.maxScaleDenominatorLimit);
                    b > c ? a.setValue(c) : b < this.minScaleDenominator ? a.setValue(this.minScaleDenominator) : (this.maxScaleDenominator = b, this.updateSliderValues())
                },
                scope: this
            }
        });
        this.minScaleDenominatorInput = new Ext.form.NumberField({
            allowNegative: !1,
            width: 100,
            fieldLabel: "1",
            value: Math.round(this.minScaleDenominator),
            disabled: !this.limitMinScaleDenominator,
            validator: function (a) {
                return !this.limitMaxScaleDenominator || a < this.maxScaleDenominator
            }.createDelegate(this),
            listeners: {
                valid: function (a) {
                    var a = Number(a.getValue()),
                        b = Math.round(this.minScaleDenominatorLimit);
                    if (a > b && a < this.maxScaleDenominator) this.minScaleDenominator = a, this.updateSliderValues()
                },
                change: function (a) {
                    var b = Number(a.getValue()),
                        c = Math.round(this.minScaleDenominatorLimit);
                    b < c ? a.setValue(c) : b > this.maxScaleDenominator ? a.setValue(this.maxScaleDenominator) : (this.minScaleDenominator = b, this.updateSliderValues())
                },
                scope: this
            }
        });
        this.items = [this.scaleSlider, {
                xtype: "panel",
                layout: "form",
                defaults: {
                    border: !1
                },
                items: [{
                        labelWidth: 90,
                        layout: "form",
                        width: 150,
                        items: [{
                                xtype: "checkbox",
                                checked: !! this.limitMinScaleDenominator,
                                fieldLabel: this.maxScaleLimitText,
                                listeners: {
                                    check: function (a, b) {
                                        this.limitMinScaleDenominator = b;
                                        var c = this.scaleSlider;
                                        c.setValue(1, 100);
                                        c.thumbs[1].el.setVisible(b);
                                        this.minScaleDenominatorInput.setDisabled(!b);
                                        this.updateScaleValues(c);
                                        c.setDisabled(!this.limitMinScaleDenominator && !this.limitMaxScaleDenominator)
                                    },
                                    scope: this
                                }
                            }
                        ]
                    }, {
                        labelWidth: 10,
                        layout: "form",
                        items: [this.minScaleDenominatorInput]
                    }, {
                        labelWidth: 90,
                        layout: "form",
                        items: [{
                                xtype: "checkbox",
                                checked: !! this.limitMaxScaleDenominator,
                                fieldLabel: this.minScaleLimitText,
                                listeners: {
                                    check: function (a, b) {
                                        this.limitMaxScaleDenominator = b;
                                        var c = this.scaleSlider;
                                        c.setValue(0, 0);
                                        c.thumbs[0].el.setVisible(b);
                                        this.maxScaleDenominatorInput.setDisabled(!b);
                                        this.updateScaleValues(c);
                                        c.setDisabled(!this.limitMinScaleDenominator && !this.limitMaxScaleDenominator)
                                    },
                                    scope: this
                                }
                            }
                        ]
                    }, {
                        labelWidth: 10,
                        layout: "form",
                        items: [this.maxScaleDenominatorInput]
                    }
                ]
            }
        ];
        this.addEvents("change");
        gxp.ScaleLimitPanel.superclass.initComponent.call(this)
    },
    updateScaleValues: function (a) {
        if (!this.changing) {
            var b = a.getValues(),
                c = !1;
            !this.limitMaxScaleDenominator && 0 < b[0] && (b[0] = 0, c = !0);
            !this.limitMinScaleDenominator && 100 > b[1] && (b[1] = 100, c = !0);
            c ? (a.setValue(0, b[0]), a.setValue(1, b[1])) : (b = this.sliderValuesToScale(b), a = b[0], b = b[1], this.changing = !0, this.minScaleDenominatorInput.setValue(b), this.maxScaleDenominatorInput.setValue(a), this.changing = !1, this.fireEvent("change", this, this.limitMinScaleDenominator ?
                b : void 0, this.limitMaxScaleDenominator ? a : void 0))
        }
    },
    updateSliderValues: function () {
        if (!this.changing) {
            var a = this.minScaleDenominator,
                b = this.maxScaleDenominator,
                c = this.scaleToSliderValues([b, a]);
            this.changing = !0;
            this.scaleSlider.setValue(0, c[0]);
            this.scaleSlider.setValue(1, c[1]);
            this.changing = !1;
            this.fireEvent("change", this, this.limitMinScaleDenominator ? a : void 0, this.limitMaxScaleDenominator ? b : void 0)
        }
    },
    sliderValuesToScale: function (a) {
        var b = 100 / (this.scaleLevels - 1);
        return [Math.round(Math.pow(this.scaleFactor, (100 - a[0]) / b) * this.minScaleDenominatorLimit), Math.round(Math.pow(this.scaleFactor, (100 - a[1]) / b) * this.minScaleDenominatorLimit)]
    },
    scaleToSliderValues: function (a) {
        var b = 100 / (this.scaleLevels - 1);
        return [100 - b * Math.log(a[0] / this.minScaleDenominatorLimit) / Math.log(this.scaleFactor), 100 - b * Math.log(a[1] / this.minScaleDenominatorLimit) / Math.log(this.scaleFactor)]
    }
});
Ext.reg("gxp_scalelimitpanel", gxp.ScaleLimitPanel);
Ext.namespace("gxp.slider");
gxp.slider.Tip = Ext.extend(Ext.slider.Tip, {
    hover: !0,
    dragging: !1,
    init: function (a) {
        if (this.hover) a.on("render", this.registerThumbListeners, this);
        this.slider = a;
        gxp.slider.Tip.superclass.init.apply(this, arguments)
    },
    registerThumbListeners: function () {
        for (var a = 0, b = this.slider.thumbs.length; a < b; ++a) this.slider.thumbs[a].el.on({
                mouseover: this.createHoverListener(a),
                mouseout: function () {
                    this.dragging || this.hide.apply(this, arguments)
                },
                scope: this
            })
    },
    createHoverListener: function (a) {
        return function () {
            this.onSlide(this.slider, {}, this.slider.thumbs[a]);
            this.dragging = !1
        }.createDelegate(this)
    },
    onSlide: function (a, b, c) {
        this.dragging = !0;
        gxp.slider.Tip.superclass.onSlide.apply(this, arguments)
    }
});
Ext.namespace("gxp");
gxp.TextSymbolizer = Ext.extend(Ext.Panel, {
    fonts: void 0,
    symbolizer: null,
    defaultSymbolizer: null,
    attributes: null,
    colorManager: null,
    haloCache: null,
    border: !1,
    layout: "form",
    labelValuesText: "Label values",
    haloText: "Halo",
    sizeText: "Size",
    priorityText: "Priority",
    labelOptionsText: "Label options",
    autoWrapText: "Auto wrap",
    followLineText: "Follow line",
    maxDisplacementText: "Maximum displacement",
    repeatText: "Repeat",
    forceLeftToRightText: "Force left to right",
    graphicResizeText: "Graphic resize",
    graphicMarginText: "Graphic margin",
    graphicTitle: "Graphic",
    fontColorTitle: "Font color and opacity",
    positioningText: "Label positioning",
    anchorPointText: "Anchor point",
    displacementXText: "Displacement (X-direction)",
    displacementYText: "Displacement (Y-direction)",
    perpendicularOffsetText: "Perpendicular offset",
    priorityHelp: "The higher the value of the specified field, the sooner the label will be drawn (which makes it win in the conflict resolution game)",
    autoWrapHelp: "Wrap labels that exceed a certain length in pixels",
    followLineHelp: "Should the label follow the geometry of the line?",
    maxDisplacementHelp: "Maximum displacement in pixels if label position is busy",
    repeatHelp: "Repeat labels after a certain number of pixels",
    forceLeftToRightHelp: "Labels are usually flipped to make them readable. If the character happens to be a directional arrow then this is not desirable",
    graphic_resizeHelp: "Specifies a mode for resizing label graphics (such as highway shields) to fit the text of the label. The default mode, \u2018none\u2019, never modifies the label graphic. In stretch mode, GeoServer will resize the graphic to exactly surround the label text, possibly modifying the image\u2019s aspect ratio. In proportional mode, GeoServer will expand the image to be large enough to surround the text while preserving its original aspect ratio.",
    graphic_marginHelp: "Similar to the margin shorthand property in CSS for HTML, its interpretation varies depending on how many margin values are provided: 1 = use that margin length on all sides of the label 2 = use the first for top & bottom margins and the second for left & right margins. 3 = use the first for the top margin, second for left & right margins, third for the bottom margin. 4 = use the first for the top margin, second for the right margin, third for the bottom margin, and fourth for the left margin.",
    initComponent: function () {
        if (!this.symbolizer) this.symbolizer = {};
        Ext.applyIf(this.symbolizer, this.defaultSymbolizer);
        if (!this.symbolizer.vendorOptions) this.symbolizer.vendorOptions = {};
        this.haloCache = {};
        this.attributes.load();
        var a = {
            xtype: "combo",
            fieldLabel: this.labelValuesText,
            store: this.attributes,
            mode: "local",
            lastQuery: "",
            editable: !1,
            triggerAction: "all",
            allowBlank: !1,
            displayField: "name",
            valueField: "name",
            value: this.symbolizer.label && this.symbolizer.label.replace(/^\${(.*)}$/, "$1"),
            listeners: {
                select: function (a,
                    c) {
                    this.symbolizer.label = "${" + c.get("name") + "}";
                    this.fireEvent("change", this.symbolizer)
                },
                scope: this
            },
            width: 120
        };
        this.attributesComboConfig = this.attributesComboConfig || {};
        Ext.applyIf(this.attributesComboConfig, a);
        this.labelWidth = 80;
        this.items = [this.attributesComboConfig, {
                cls: "x-html-editor-tb",
                style: "background: transparent; border: none; padding: 0 0em 0.5em;",
                xtype: "toolbar",
                items: [{
                        xtype: "gxp_fontcombo",
                        fonts: this.fonts || void 0,
                        width: 110,
                        value: this.symbolizer.fontFamily,
                        listeners: {
                            select: function (a,
                                c) {
                                this.symbolizer.fontFamily = c.get("field1");
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        xtype: "tbtext",
                        text: this.sizeText + ": "
                    }, {
                        xtype: "numberfield",
                        allowNegative: !1,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.fontSize,
                        value: this.symbolizer.fontSize,
                        width: 30,
                        listeners: {
                            change: function (a, c) {
                                c = parseFloat(c);
                                isNaN(c) ? delete this.symbolizer.fontSize : this.symbolizer.fontSize = c;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        enableToggle: !0,
                        cls: "x-btn-icon",
                        iconCls: "x-edit-bold",
                        pressed: "bold" === this.symbolizer.fontWeight,
                        listeners: {
                            toggle: function (a, c) {
                                this.symbolizer.fontWeight = c ? "bold" : "normal";
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        enableToggle: !0,
                        cls: "x-btn-icon",
                        iconCls: "x-edit-italic",
                        pressed: "italic" === this.symbolizer.fontStyle,
                        listeners: {
                            toggle: function (a, c) {
                                this.symbolizer.fontStyle = c ? "italic" : "normal";
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }
                ]
            }, {
                xtype: "gxp_fillsymbolizer",
                fillText: this.fontColorTitle,
                symbolizer: this.symbolizer,
                colorProperty: "fontColor",
                opacityProperty: "fontOpacity",
                checkboxToggle: !1,
                autoHeight: !0,
                width: 213,
                labelWidth: 70,
                plugins: this.colorManager && [new this.colorManager],
                listeners: {
                    change: function () {
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }, {
                xtype: "fieldset",
                title: this.graphicTitle,
                checkboxToggle: !0,
                hideMode: "offsets",
                collapsed: !(this.symbolizer.fillColor || this.symbolizer.fillOpacity),
                labelWidth: 70,
                items: [{
                        xtype: "gxp_pointsymbolizer",
                        symbolizer: this.symbolizer,
                        border: !1,
                        labelWidth: 70
                    },
                    this.createVendorSpecificField({
                        name: "graphic-resize",
                        xtype: "combo",
                        store: ["none", "stretch", "proportional"],
                        mode: "local",
                        width: 100,
                        triggerAction: "all",
                        fieldLabel: this.graphicResizeText
                    }), this.createVendorSpecificField({
                        name: "graphic-margin",
                        width: 100,
                        fieldLabel: this.graphicMarginText,
                        xtype: "textfield"
                    })
                ],
                listeners: {
                    collapse: function () {
                        this.graphicCache = {
                            externalGraphic: this.symbolizer.externalGraphic,
                            fillColor: this.symbolizer.fillColor,
                            fillOpacity: this.symbolizer.fillOpacity,
                            graphicName: this.symbolizer.graphicName,
                            pointRadius: this.symbolizer.pointRadius,
                            rotation: this.symbolizer.rotation,
                            strokeColor: this.symbolizer.strokeColor,
                            strokeWidth: this.symbolizer.strokeWidth,
                            strokeDashStyle: this.symbolizer.strokeDashStyle
                        };
                        delete this.symbolizer.externalGraphic;
                        delete this.symbolizer.fillColor;
                        delete this.symbolizer.fillOpacity;
                        delete this.symbolizer.graphicName;
                        delete this.symbolizer.pointRadius;
                        delete this.symbolizer.rotation;
                        delete this.symbolizer.strokeColor;
                        delete this.symbolizer.strokeWidth;
                        delete this.symbolizer.strokeDashStyle;
                        this.fireEvent("change",
                            this.symbolizer)
                    },
                    expand: function () {
                        Ext.apply(this.symbolizer, this.graphicCache);
                        this.doLayout();
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }, {
                xtype: "fieldset",
                title: this.haloText,
                checkboxToggle: !0,
                collapsed: !(this.symbolizer.haloRadius || this.symbolizer.haloColor || this.symbolizer.haloOpacity),
                autoHeight: !0,
                labelWidth: 50,
                items: [{
                        xtype: "numberfield",
                        fieldLabel: this.sizeText,
                        anchor: "89%",
                        allowNegative: !1,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.haloRadius,
                        value: this.symbolizer.haloRadius,
                        listeners: {
                            change: function (a, c) {
                                c = parseFloat(c);
                                isNaN(c) ? delete this.symbolizer.haloRadius : this.symbolizer.haloRadius = c;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        xtype: "gxp_fillsymbolizer",
                        symbolizer: {
                            fillColor: "haloColor" in this.symbolizer ? this.symbolizer.haloColor : OpenLayers.Renderer.defaultSymbolizer.haloColor,
                            fillOpacity: "haloOpacity" in this.symbolizer ? this.symbolizer.haloOpacity : 100 * OpenLayers.Renderer.defaultSymbolizer.haloOpacity
                        },
                        defaultColor: OpenLayers.Renderer.defaultSymbolizer.haloColor,
                        checkboxToggle: !1,
                        width: 190,
                        labelWidth: 60,
                        plugins: this.colorManager && [new this.colorManager],
                        listeners: {
                            change: function (a) {
                                this.symbolizer.haloColor = a.fillColor;
                                this.symbolizer.haloOpacity = a.fillOpacity;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }
                ],
                listeners: {
                    collapse: function () {
                        this.haloCache = {
                            haloRadius: this.symbolizer.haloRadius,
                            haloColor: this.symbolizer.haloColor,
                            haloOpacity: this.symbolizer.haloOpacity
                        };
                        delete this.symbolizer.haloRadius;
                        delete this.symbolizer.haloColor;
                        delete this.symbolizer.haloOpacity;
                        this.fireEvent("change", this.symbolizer)
                    },
                    expand: function () {
                        Ext.apply(this.symbolizer, this.haloCache);
                        this.doLayout();
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }, {
                xtype: "fieldset",
                title: this.positioningText,
                checkboxToggle: !0,
                collapsed: !0,
                autoHeight: !0,
                labelWidth: 75,
                defaults: {
                    width: 100
                },
                items: [Ext.applyIf({
                        fieldLabel: this.anchorPointText,
                        value: this.symbolizer.labelAlign || "lb",
                        store: [
                            ["lt", "Left-top"],
                            ["ct", "Center-top"],
                            ["rt", "Right-top"],
                            ["lm", "Left-center"],
                            ["cm", "Center"],
                            ["rm", "Right-center"],
                            ["lb", "Left-bottom"],
                            ["cb", "Center-bottom"],
                            ["rb", "Right-bottom"]
                        ],
                        listeners: {
                            select: function (a) {
                                this.symbolizer.labelAlign = a.getValue();
                                delete this.symbolizer.labelAnchorPointX;
                                delete this.symbolizer.labelAnchorPointY;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, this.attributesComboConfig), {
                        xtype: "numberfield",
                        fieldLabel: this.displacementXText,
                        value: this.symbolizer.labelXOffset,
                        listeners: {
                            change: function (a, c) {
                                this.symbolizer.labelXOffset = c;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        xtype: "numberfield",
                        fieldLabel: this.displacementYText,
                        value: this.symbolizer.labelYOffset,
                        listeners: {
                            change: function (a, c) {
                                this.symbolizer.labelYOffset = c;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        xtype: "numberfield",
                        fieldLabel: this.perpendicularOffsetText,
                        value: this.symbolizer.labelPerpendicularOffset,
                        listeners: {
                            change: function (a, c) {
                                Ext.isEmpty(c) ? delete this.symbolizer.labelPerpendicularOffset : this.symbolizer.labelPerpendicularOffset = c;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }
                ]
            }, {
                xtype: "fieldset",
                title: this.priorityText,
                checkboxToggle: !0,
                collapsed: !0,
                autoHeight: !0,
                labelWidth: 50,
                items: [Ext.applyIf({
                        fieldLabel: this.priorityText,
                        value: this.symbolizer.priority && this.symbolizer.priority.replace(/^\${(.*)}$/, "$1"),
                        allowBlank: !0,
                        name: "priority",
                        listeners: {
                            select: function (a, c) {
                                this.symbolizer[a.name] = "${" + c.get("name") + "}";
                                this.fireEvent("change", this.symbolizer)
                            },
                            render: this.attachHelpToField,
                            scope: this
                        }
                    }, this.attributesComboConfig)]
            }, {
                xtype: "fieldset",
                title: this.labelOptionsText,
                checkboxToggle: !0,
                collapsed: !0,
                autoHeight: !0,
                labelWidth: 80,
                defaults: {
                    width: 100
                },
                items: [this.createVendorSpecificField({
                        name: "autoWrap",
                        allowBlank: !1,
                        fieldLabel: this.autoWrapText
                    }), this.createVendorSpecificField({
                        name: "followLine",
                        xtype: "checkbox",
                        fieldLabel: this.followLineText
                    }), this.createVendorSpecificField({
                        name: "maxDisplacement",
                        fieldLabel: this.maxDisplacementText
                    }), this.createVendorSpecificField({
                        name: "repeat",
                        fieldLabel: this.repeatText
                    }), this.createVendorSpecificField({
                        name: "forceLeftToRight",
                        xtype: "checkbox",
                        fieldLabel: this.forceLeftToRightText
                    })]
            }
        ];
        this.addEvents("change");
        gxp.TextSymbolizer.superclass.initComponent.call(this)
    },
    createVendorSpecificField: function (a) {
        var b = function (b, d) {
            Ext.isEmpty(d) ? delete this.symbolizer.vendorOptions[a.name] : this.symbolizer.vendorOptions[a.name] = d;
            this.fireEvent("change", this.symbolizer)
        };
        return Ext.applyIf(a, {
            xtype: "numberfield",
            allowNegative: !1,
            value: this.symbolizer.vendorOptions[a.name],
            listeners: {
                render: this.attachHelpToField,
                change: b,
                check: b,
                scope: this
            }
        })
    },
    attachHelpToField: function (a) {
        var b = a.name.replace(/-/g, "_") + "Help";
        Ext.QuickTips.register({
            target: a.getEl(),
            dismissDelay: 2E4,
            text: this[b]
        })
    }
});
Ext.reg("gxp_textsymbolizer", gxp.TextSymbolizer);
Ext.namespace("gxp");
gxp.FillSymbolizer = Ext.extend(Ext.FormPanel, {
    symbolizer: null,
    colorProperty: "fillColor",
    opacityProperty: "fillOpacity",
    colorManager: null,
    checkboxToggle: !0,
    defaultColor: null,
    border: !1,
    fillText: "Fill",
    colorText: "Color",
    opacityText: "Opacity",
    initComponent: function () {
        if (!this.symbolizer) this.symbolizer = {};
        var a;
        this.colorManager && (a = [new this.colorManager]);
        var b = 100;
        this.opacityProperty in this.symbolizer ? b = this.symbolizer[this.opacityProperty] : OpenLayers.Renderer.defaultSymbolizer[this.opacityProperty] &&
            (b = 100 * OpenLayers.Renderer.defaultSymbolizer[this.opacityProperty]);
        this.items = [{
                xtype: "fieldset",
                title: this.fillText,
                autoHeight: !0,
                checkboxToggle: this.checkboxToggle,
                collapsed: !0 === this.checkboxToggle && !1 === this.symbolizer.fill,
                hideMode: "offsets",
                defaults: {
                    width: 100
                },
                items: [{
                        xtype: "gxp_colorfield",
                        fieldLabel: this.colorText,
                        name: "color",
                        emptyText: OpenLayers.Renderer.defaultSymbolizer[this.colorProperty],
                        value: this.symbolizer[this.colorProperty],
                        defaultBackground: this.defaultColor || OpenLayers.Renderer.defaultSymbolizer[this.colorProperty],
                        plugins: a,
                        listeners: {
                            valid: function (a) {
                                var a = a.getValue(),
                                    b = this.symbolizer[this.colorProperty] != a;
                                this.symbolizer[this.colorProperty] = a;
                                b && this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        xtype: "slider",
                        fieldLabel: this.opacityText,
                        name: "opacity",
                        values: [b],
                        isFormField: !0,
                        listeners: {
                            changecomplete: function (a, b) {
                                this.symbolizer[this.opacityProperty] = b / 100;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        },
                        plugins: [new GeoExt.SliderTip({
                                getText: function (a) {
                                    return a.value + "%"
                                }
                            })]
                    }
                ],
                listeners: {
                    collapse: function () {
                        if (!1 !==
                            this.symbolizer.fill) this.symbolizer.fill = !1, this.fireEvent("change", this.symbolizer)
                    },
                    expand: function () {
                        this.symbolizer.fill = !0;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }
        ];
        this.addEvents("change");
        gxp.FillSymbolizer.superclass.initComponent.call(this)
    }
});
Ext.reg("gxp_fillsymbolizer", gxp.FillSymbolizer);
Ext.namespace("gxp.form");
gxp.form.ColorField = Ext.extend(Ext.form.TextField, {
    cssColors: {
        aqua: "#00FFFF",
        black: "#000000",
        blue: "#0000FF",
        fuchsia: "#FF00FF",
        gray: "#808080",
        green: "#008000",
        lime: "#00FF00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#FF0000",
        silver: "#C0C0C0",
        teal: "#008080",
        white: "#FFFFFF",
        yellow: "#FFFF00"
    },
    defaultBackground: "#ffffff",
    initComponent: function () {
        if (this.value) this.value = this.hexToColor(this.value);
        gxp.form.ColorField.superclass.initComponent.call(this);
        this.on({
            render: this.colorField,
            valid: this.colorField,
            scope: this
        })
    },
    isDark: function (a) {
        var b = !1;
        if (a) var b = parseInt(a.substring(1, 3), 16) / 255,
        c = parseInt(a.substring(3, 5), 16) / 255, a = parseInt(a.substring(5, 7), 16) / 255, b = 0.5 > 0.299 * b + 0.587 * c + 0.144 * a;
        return b
    },
    colorField: function () {
        var a = this.colorToHex(this.getValue()) || this.defaultBackground;
        this.getEl().setStyle({
            background: a,
            color: this.isDark(a) ? "#ffffff" : "#000000"
        })
    },
    getHexValue: function () {
        return this.colorToHex(gxp.form.ColorField.superclass.getValue.apply(this, arguments))
    },
    getValue: function () {
        var a =
            this.getHexValue(),
            b = this.initialConfig.value;
        a === this.hexToColor(b) && (a = b);
        return a
    },
    setValue: function (a) {
        gxp.form.ColorField.superclass.setValue.apply(this, [this.hexToColor(a)])
    },
    colorToHex: function (a) {
        return !a ? a : a.match(/^#[0-9a-f]{6}$/i) ? a : this.cssColors[a.toLowerCase()] || null
    },
    hexToColor: function (a) {
        if (!a) return a;
        for (var b in this.cssColors) if (this.cssColors[b] == a.toUpperCase()) {
                a = b;
                break
            }
        return a
    }
});
Ext.reg("gxp_colorfield", gxp.form.ColorField);
Ext.namespace("gxp.form");
gxp.form.FontComboBox = Ext.extend(Ext.form.ComboBox, {
    fonts: "Serif,SansSerif,Arial,Courier New,Tahoma,Times New Roman,Verdana".split(","),
    defaultFont: "Serif",
    allowBlank: !1,
    mode: "local",
    triggerAction: "all",
    editable: !1,
    initComponent: function () {
        var a = this.fonts || gxp.form.FontComboBox.prototype.fonts,
            b = this.defaultFont; - 1 === a.indexOf(this.defaultFont) && (b = a[0]);
        a = {
            displayField: "field1",
            valueField: "field1",
            store: a,
            value: b,
            tpl: new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item"><span style="font-family: {field1};">{field1}</span></div></tpl>')
        };
        Ext.applyIf(this, a);
        gxp.form.FontComboBox.superclass.initComponent.call(this)
    }
});
Ext.reg("gxp_fontcombo", gxp.form.FontComboBox);
Ext.namespace("gxp");
gxp.PolygonSymbolizer = Ext.extend(Ext.Panel, {
    symbolizer: null,
    initComponent: function () {
        this.items = [{
                xtype: "gxp_fillsymbolizer",
                symbolizer: this.symbolizer,
                listeners: {
                    change: function () {
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }, {
                xtype: "gxp_strokesymbolizer",
                symbolizer: this.symbolizer,
                listeners: {
                    change: function () {
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }
        ];
        this.addEvents("change");
        gxp.PolygonSymbolizer.superclass.initComponent.call(this)
    }
});
Ext.reg("gxp_polygonsymbolizer", gxp.PolygonSymbolizer);
Ext.namespace("gxp");
gxp.StrokeSymbolizer = Ext.extend(Ext.FormPanel, {
    solidStrokeName: "solid",
    dashStrokeName: "dash",
    dotStrokeName: "dot",
    titleText: "Stroke",
    styleText: "Style",
    colorText: "Color",
    widthText: "Width",
    opacityText: "Opacity",
    symbolizer: null,
    colorManager: null,
    checkboxToggle: !0,
    defaultColor: null,
    dashStyles: null,
    border: !1,
    initComponent: function () {
        this.dashStyles = this.dashStyles || [
            ["solid", this.solidStrokeName],
            ["4 4", this.dashStrokeName],
            ["2 4", this.dotStrokeName]
        ];
        if (!this.symbolizer) this.symbolizer = {};
        var a;
        this.colorManager &&
            (a = [new this.colorManager]);
        this.items = [{
                xtype: "fieldset",
                title: this.titleText,
                autoHeight: !0,
                checkboxToggle: this.checkboxToggle,
                collapsed: !0 === this.checkboxToggle && !1 === this.symbolizer.stroke,
                hideMode: "offsets",
                defaults: {
                    width: 100
                },
                items: [{
                        xtype: "combo",
                        name: "style",
                        fieldLabel: this.styleText,
                        store: new Ext.data.SimpleStore({
                            data: this.dashStyles,
                            fields: ["value", "display"]
                        }),
                        displayField: "display",
                        valueField: "value",
                        value: this.getDashArray(this.symbolizer.strokeDashstyle) || OpenLayers.Renderer.defaultSymbolizer.strokeDashstyle,
                        mode: "local",
                        allowBlank: !0,
                        triggerAction: "all",
                        editable: !1,
                        listeners: {
                            select: function (a, c) {
                                this.symbolizer.strokeDashstyle = c.get("value");
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        xtype: "gxp_colorfield",
                        name: "color",
                        fieldLabel: this.colorText,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.strokeColor,
                        value: this.symbolizer.strokeColor,
                        defaultBackground: this.defaultColor || OpenLayers.Renderer.defaultSymbolizer.strokeColor,
                        plugins: a,
                        listeners: {
                            valid: function (a) {
                                var a = a.getValue(),
                                    c = this.symbolizer.strokeColor !=
                                        a;
                                this.symbolizer.strokeColor = a;
                                c && this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        xtype: "numberfield",
                        name: "width",
                        fieldLabel: this.widthText,
                        allowNegative: !1,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.strokeWidth,
                        value: this.symbolizer.strokeWidth,
                        listeners: {
                            change: function (a, c) {
                                c = parseFloat(c);
                                isNaN(c) ? delete this.symbolizer.strokeWidth : this.symbolizer.strokeWidth = c;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }, {
                        xtype: "slider",
                        name: "opacity",
                        fieldLabel: this.opacityText,
                        values: [100 *
                                ("strokeOpacity" in this.symbolizer ? this.symbolizer.strokeOpacity : OpenLayers.Renderer.defaultSymbolizer.strokeOpacity)],
                        isFormField: !0,
                        listeners: {
                            changecomplete: function (a, c) {
                                this.symbolizer.strokeOpacity = c / 100;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        },
                        plugins: [new GeoExt.SliderTip({
                                getText: function (a) {
                                    return a.value + "%"
                                }
                            })]
                    }
                ],
                listeners: {
                    collapse: function () {
                        if (!1 !== this.symbolizer.stroke) this.symbolizer.stroke = !1, this.fireEvent("change", this.symbolizer)
                    },
                    expand: function () {
                        this.symbolizer.stroke = !0;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }
        ];
        this.addEvents("change");
        gxp.StrokeSymbolizer.superclass.initComponent.call(this)
    },
    getDashArray: function (a) {
        var b;
        a && (a = a.split(/\s+/), a = a[0] / a[1], isNaN(a) || (b = 1 <= a ? "4 4" : "2 4"));
        return b
    }
});
Ext.reg("gxp_strokesymbolizer", gxp.StrokeSymbolizer);
Ext.namespace("gxp");
gxp.LineSymbolizer = Ext.extend(Ext.Panel, {
    symbolizer: null,
    initComponent: function () {
        this.items = [{
                xtype: "gxp_strokesymbolizer",
                symbolizer: this.symbolizer,
                listeners: {
                    change: function () {
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }
        ];
        this.addEvents("change");
        gxp.LineSymbolizer.superclass.initComponent.call(this)
    }
});
Ext.reg("gxp_linesymbolizer", gxp.LineSymbolizer);
Ext.namespace("gxp");
gxp.PointSymbolizer = Ext.extend(Ext.Panel, {
    symbolizer: null,
    graphicCircleText: "circle",
    graphicSquareText: "square",
    graphicTriangleText: "triangle",
    graphicStarText: "star",
    graphicCrossText: "cross",
    graphicXText: "x",
    graphicExternalText: "external",
    urlText: "URL",
    opacityText: "opacity",
    symbolText: "Symbol",
    sizeText: "Size",
    rotationText: "Rotation",
    pointGraphics: null,
    colorManager: null,
    external: null,
    layout: "form",
    initComponent: function () {
        if (!this.symbolizer) this.symbolizer = {};
        if (!this.pointGraphics) this.pointGraphics = [{
                    display: this.graphicCircleText,
                    value: "circle",
                    mark: !0
                }, {
                    display: this.graphicSquareText,
                    value: "square",
                    mark: !0
                }, {
                    display: this.graphicTriangleText,
                    value: "triangle",
                    mark: !0
                }, {
                    display: this.graphicStarText,
                    value: "star",
                    mark: !0
                }, {
                    display: this.graphicCrossText,
                    value: "cross",
                    mark: !0
                }, {
                    display: this.graphicXText,
                    value: "x",
                    mark: !0
                }, {
                    display: this.graphicExternalText
                }
            ];
        this.external = !! this.symbolizer.externalGraphic;
        this.markPanel = new Ext.Panel({
            border: !1,
            collapsed: this.external,
            layout: "form",
            items: [{
                    xtype: "gxp_fillsymbolizer",
                    symbolizer: this.symbolizer,
                    labelWidth: this.labelWidth,
                    labelAlign: this.labelAlign,
                    colorManager: this.colorManager,
                    listeners: {
                        change: function () {
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                }, {
                    xtype: "gxp_strokesymbolizer",
                    symbolizer: this.symbolizer,
                    labelWidth: this.labelWidth,
                    labelAlign: this.labelAlign,
                    colorManager: this.colorManager,
                    listeners: {
                        change: function () {
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                }
            ]
        });
        this.urlField = new Ext.form.TextField({
            name: "url",
            fieldLabel: this.urlText,
            value: this.symbolizer.externalGraphic,
            hidden: !0,
            listeners: {
                change: function (a, b) {
                    this.symbolizer.externalGraphic = b;
                    this.fireEvent("change", this.symbolizer)
                },
                scope: this
            },
            width: 100
        });
        this.graphicPanel = new Ext.Panel({
            border: !1,
            collapsed: !this.external,
            layout: "form",
            items: [this.urlField, {
                    xtype: "slider",
                    name: "opacity",
                    fieldLabel: this.opacityText,
                    value: [null == this.symbolizer.graphicOpacity ? 100 : 100 * this.symbolizer.graphicOpacity],
                    isFormField: !0,
                    listeners: {
                        changecomplete: function (a, b) {
                            this.symbolizer.graphicOpacity = b / 100;
                            this.fireEvent("change",
                                this.symbolizer)
                        },
                        scope: this
                    },
                    plugins: [new GeoExt.SliderTip({
                            getText: function (a) {
                                return a.value + "%"
                            }
                        })],
                    width: 100
                }
            ]
        });
        this.items = [{
                xtype: "combo",
                name: "mark",
                fieldLabel: this.symbolText,
                store: new Ext.data.JsonStore({
                    data: {
                        root: this.pointGraphics
                    },
                    root: "root",
                    fields: ["value", "display", "preview", {
                            name: "mark",
                            type: "boolean"
                        }
                    ]
                }),
                value: this.external ? 0 : this.symbolizer.graphicName,
                displayField: "display",
                valueField: "value",
                tpl: new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item gx-pointsymbolizer-mark-item"><tpl if="preview"><img src="{preview}" alt="{display}"/></tpl><span>{display}</span></div></tpl>'),
                mode: "local",
                allowBlank: !1,
                triggerAction: "all",
                editable: !1,
                listeners: {
                    select: function (a, b) {
                        var c = b.get("mark"),
                            d = b.get("value");
                        if (c) {
                            if (this.external) this.external = !1, delete this.symbolizer.externalGraphic, this.updateGraphicDisplay();
                            this.symbolizer.graphicName = d
                        } else if (d ? (this.urlField.hide(), this.urlField.getEl().up(".x-form-item").setDisplayed(!1), this.symbolizer.externalGraphic = d) : (this.urlField.show(), this.urlField.getEl().up(".x-form-item").setDisplayed(!0)), !this.external) this.external = !0,
                        this.updateGraphicDisplay();
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                },
                width: 100
            }, {
                xtype: "textfield",
                name: "size",
                fieldLabel: this.sizeText,
                value: this.symbolizer.pointRadius && 2 * this.symbolizer.pointRadius,
                listeners: {
                    change: function (a, b) {
                        this.symbolizer.pointRadius = b / 2;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                },
                width: 100
            }, {
                xtype: "textfield",
                name: "rotation",
                fieldLabel: this.rotationText,
                value: this.symbolizer.rotation,
                listeners: {
                    change: function (a, b) {
                        this.symbolizer.rotation = b;
                        this.fireEvent("change",
                            this.symbolizer)
                    },
                    scope: this
                },
                width: 100
            },
            this.markPanel, this.graphicPanel
        ];
        this.addEvents("change");
        gxp.PointSymbolizer.superclass.initComponent.call(this)
    },
    updateGraphicDisplay: function () {
        this.external ? (this.markPanel.collapse(), this.graphicPanel.expand()) : (this.graphicPanel.collapse(), this.markPanel.expand())
    }
});
Ext.reg("gxp_pointsymbolizer", gxp.PointSymbolizer);
Ext.namespace("gxp");
gxp.GoogleEarthPanel = Ext.extend(Ext.Panel, {
    HORIZONTAL_FIELD_OF_VIEW: 30 * Math.PI / 180,
    map: null,
    mapPanel: null,
    layers: null,
    earth: null,
    projection: null,
    layerCache: null,
    initComponent: function () {
        this.addEvents("beforeadd", "pluginfailure", "pluginready");
        gxp.GoogleEarthPanel.superclass.initComponent.call(this);
        var a = this.mapPanel;
        a && !(a instanceof GeoExt.MapPanel) && (a = Ext.getCmp(a));
        if (!a) throw Error("Could not get map panel from config: " + this.mapPanel);
        this.map = a.map;
        this.layers = a.layers;
        this.projection = new OpenLayers.Projection("EPSG:4326");
        this.on("render", this.onRenderEvent, this);
        this.on("show", this.onShowEvent, this);
        this.on("hide", function () {
            null != this.earth && this.updateMap();
            this.body.dom.innerHTML = "";
            this.earth = null
        }, this)
    },
    onEarthReady: function (a) {
        this.earth = a;
        void 0 === this.flyToSpeed ? this.earth.getOptions().setFlyToSpeed(this.earth.SPEED_TELEPORT) : null !== this.flyToSpeed && this.earth.getOptions().setFlyToSpeed(this.flyToSpeed);
        this.resetCamera();
        this.setExtent(this.map.getExtent());
        this.earth.getNavigationControl().setVisibility(this.earth.VISIBILITY_SHOW);
        a = this.earth.getNavigationControl().getScreenXY();
        a.setXUnits(this.earth.UNITS_PIXELS);
        a.setYUnits(this.earth.UNITS_INSET_PIXELS);
        this.earth.getWindow().setVisibility(!0);
        this.layers.each(function (a) {
            this.addLayer(a)
        }, this);
        this.layers.on("remove", this.updateLayers, this);
        this.layers.on("update", this.updateLayers, this);
        this.layers.on("add", this.updateLayers, this);
        this.fireEvent("pluginready", this.earth)
    },
    onRenderEvent: function () {
        var a = this.ownerCt && this.ownerCt.layout instanceof Ext.layout.CardLayout;
        if (!this.hidden && !a) this.onShowEvent()
    },
    onShowEvent: function () {
        if (this.rendered) this.layerCache = {}, google.earth.createInstance(this.body.dom, this.onEarthReady.createDelegate(this), function (a) {
                this.fireEvent("pluginfailure", this, a)
            }.createDelegate(this))
    },
    beforeDestroy: function () {
        this.layers.un("remove", this.updateLayers, this);
        this.layers.un("update", this.updateLayers, this);
        this.layers.un("add", this.updateLayers, this);
        gxp.GoogleEarthPanel.superclass.beforeDestroy.call(this)
    },
    updateLayers: function () {
        if (this.earth) {
            for (var a =
                this.earth.getFeatures(), b = a.getFirstChild(); null != b;) a.removeChild(b), b = a.getFirstChild();
            this.layers.each(function (a) {
                this.addLayer(a)
            }, this)
        }
    },
    addLayer: function (a, b) {
        var c = a.getLayer(),
            d = c && c.url;
        if (this.earth && c instanceof OpenLayers.Layer.WMS && "string" == typeof d && !1 !== this.fireEvent("beforeadd", a)) {
            var e = c.id;
            if (this.layerCache[e]) d = this.layerCache[e];
            else {
                var f = this.earth.createLink("kl_" + e),
                    d = d.replace(/\?.*/, ""),
                    g = c.params;
                f.setHref(d + ("/kml?mode=refresh&layers=" + g.LAYERS + "&styles=" + g.STYLES));
                d = this.earth.createNetworkLink("nl_" + e);
                d.setName(e);
                d.set(f, !1, !1);
                this.layerCache[e] = d
            }
            d.setVisibility(c.getVisibility());
            void 0 !== b && b < this.earth.getFeatures().getChildNodes().getLength() ? this.earth.getFeatures().insertBefore(this.earth.getFeatures().getChildNodes().item(b)) : this.earth.getFeatures().appendChild(d)
        }
    },
    setExtent: function (a) {
        var a = a.transform(this.map.getProjectionObject(), this.projection),
            b = a.getCenterLonLat(),
            a = this.getExtentWidth(a) / (2 * Math.tan(this.HORIZONTAL_FIELD_OF_VIEW)),
            c =
                this.earth.getView().copyAsLookAt(this.earth.ALTITUDE_RELATIVE_TO_GROUND);
        c.setLatitude(b.lat);
        c.setLongitude(b.lon);
        c.setRange(a);
        this.earth.getView().setAbstractView(c)
    },
    resetCamera: function () {
        var a = this.earth.getView().copyAsCamera(this.earth.ALTITUDE_RELATIVE_TO_GROUND);
        a.setRoll(0);
        a.setHeading(0);
        a.setTilt(0);
        this.earth.getView().setAbstractView(a)
    },
    getExtent: function () {
        var a = this.earth.getView().getViewportGlobeBounds();
        return new OpenLayers.Bounds(a.getWest(), a.getSouth(), a.getEast(), a.getNorth())
    },
    updateMap: function () {
        var a = this.earth.getView().copyAsLookAt(this.earth.ALTITUDE_RELATIVE_TO_GROUND),
            b = this.reprojectToMap(new OpenLayers.LonLat(a.getLongitude(), a.getLatitude()));
        this.map.zoomToExtent(this.reprojectToMap(this.getExtent()), !0);
        this.map.setCenter(b);
        var a = 2 * a.getRange() * Math.tan(this.HORIZONTAL_FIELD_OF_VIEW),
            c = this.map.getResolutionForZoom(this.map.getZoom() + 1),
            d = this.map.getExtent(),
            b = new OpenLayers.Bounds(b.lon - this.map.getSize().w / 2 * c, b.lat + this.map.getSize().h / 2 * c, b.lon + this.map.getSize().w /
                2 * c, b.lat - this.map.getSize().h / 2 * c),
            d = Math.abs(this.getExtentWidth(d) - a);
        Math.abs(this.getExtentWidth(b) - a) < d && this.map.zoomTo(this.map.getZoom() + 1)
    },
    getExtentWidth: function (a) {
        var b = a.getCenterLonLat(),
            c = new OpenLayers.LonLat(a.left, b.lat),
            a = new OpenLayers.LonLat(a.right, b.lat);
        return 1E3 * OpenLayers.Util.distVincenty(c, a)
    },
    reprojectToGE: function (a) {
        return a.clone().transform(this.map.getProjectionObject(), this.projection)
    },
    reprojectToMap: function (a) {
        return a.clone().transform(this.projection, this.map.getProjectionObject())
    }
});
Ext.reg("gxp_googleearthpanel", gxp.GoogleEarthPanel);
Ext.namespace("gxp");
gxp.NewSourceWindow = Ext.extend(Ext.Window, {
    bodyStyle: "padding: 0px",
    hideBorders: !0,
    width: 300,
    closeAction: "hide",
    error: null,
    initComponent: function () {
        window.setTimeout(function () {
            throw "gxp.NewSourceWindow is deprecated. Use gxp.NewSourceDialog instead.";
        }, 0);
        this.addEvents("server-added");
        gxp.NewSourceWindow.superclass.initComponent.apply(this, arguments);
        this.addEvents("server-added");
        var a = this.add(new gxp.NewSourceDialog(Ext.applyIf({
            addSource: this.addSource,
            header: !1,
            listeners: {
                urlselected: function (a,
                    c) {
                    this.fireEvent("server-added", c)
                }
            }
        }, this.initialConfig)));
        this.setTitle(a.title);
        this.setLoading = a.setLoading.createDelegate(a);
        this.setError = a.setError.createDelegate(a);
        this.on("hide", a.onHide, a)
    },
    addSource: function () {}
});
Ext.namespace("gxp");
gxp.Viewer = Ext.extend(Ext.util.Observable, {
    defaultToolType: "gxp_tool",
    tools: null,
    selectedLayer: null,
    authenticate: null,
    constructor: function (a) {
        this.addEvents("ready", "portalready", "beforelayerselectionchange", "layerselectionchange", "featureedit", "authorizationchange");
        Ext.apply(this, {
            layerSources: {},
            portalItems: []
        });
        this.createLayerRecordQueue = [];
        (a.loadConfig || this.loadConfig).call(this, a, this.applyConfig);
        gxp.Viewer.superclass.constructor.apply(this, arguments)
    },
    selectLayer: function (a) {
        var a = a || null,
            b = !1;
        if (!1 !== this.fireEvent("beforelayerselectionchange", a)) b = !0, this.selectedLayer && this.selectedLayer.set("selected", !1), (this.selectedLayer = a) && this.selectedLayer.set("selected", !0), this.fireEvent("layerselectionchange", a);
        return b
    },
    loadConfig: function (a) {
        this.applyConfig(a)
    },
    applyConfig: function (a) {
        this.initialConfig = Ext.apply({}, a);
        Ext.apply(this, this.initialConfig);
        this.load()
    },
    load: function () {
        if (this.proxy) OpenLayers.ProxyHost = this.proxy;
        this.initMapPanel();
        this.initTools();
        var a = [],
            b;
        for (b in this.sources) a.push(this.createSourceLoader(b));
        a.push(function (a) {
            Ext.onReady(function () {
                this.initPortal();
                a()
            }, this)
        });
        gxp.util.dispatch(a, this.activate, this)
    },
    createSourceLoader: function (a) {
        return function (b) {
            var c = this.sources[a];
            c.projection = this.initialConfig.map.projection;
            this.addLayerSource({
                id: a,
                config: c,
                callback: b,
                fallback: function () {
                    b()
                },
                scope: this
            })
        }
    },
    addLayerSource: function (a) {
        var b = a.id || Ext.id(null, "gxp-source-"),
            c, d = a.config;
        d.id = b;
        try {
            c = Ext.ComponentMgr.createPlugin(d, this.defaultSourceType)
        } catch (e) {
            throw Error("Could not create new source plugin with ptype: " +
                a.config.ptype);
        }
        c.on({
            ready: {
                fn: function () {
                    (a.callback || Ext.emptyFn).call(a.scope || this, b)
                },
                scope: this,
                single: !0
            },
            failure: {
                fn: function () {
                    var c = a.fallback || Ext.emptyFn;
                    delete this.layerSources[b];
                    c.apply(a.scope || this, arguments)
                },
                scope: this,
                single: !0
            }
        });
        this.layerSources[b] = c;
        c.init(this);
        return c
    },
    initMapPanel: function () {
        var a = Ext.apply({}, this.initialConfig.map),
            b = {}, c = {
                wrapDateLine: void 0 !== a.wrapDateLine ? a.wrapDateLine : !0,
                maxResolution: a.maxResolution,
                numZoomLevels: a.numZoomLevels,
                displayInLayerSwitcher: !1
            };
        if (this.initialConfig.map) for (var d = "theme,controls,resolutions,projection,units,maxExtent,restrictedExtent,maxResolution,numZoomLevels,panMethod".split(","), e, f = d.length - 1; 0 <= f; --f) e = d[f], e in a && (b[e] = a[e], delete a[e]);
        this.mapPanel = Ext.ComponentMgr.create(Ext.applyIf({
            xtype: a.xtype || "gx_mappanel",
            map: Ext.applyIf({
                theme: b.theme || null,
                controls: b.controls || [new OpenLayers.Control.Navigation({
                        zoomWheelOptions: {
                            interval: 250
                        },
                        dragPanOptions: {
                            enableKinetic: !0
                        }
                    }), new OpenLayers.Control.PanPanel, new OpenLayers.Control.ZoomPanel,
                        new OpenLayers.Control.Attribution
                ],
                maxExtent: b.maxExtent && OpenLayers.Bounds.fromArray(b.maxExtent),
                restrictedExtent: b.restrictedExtent && OpenLayers.Bounds.fromArray(b.restrictedExtent),
                numZoomLevels: b.numZoomLevels || 20
            }, b),
            center: a.center && new OpenLayers.LonLat(a.center[0], a.center[1]),
            resolutions: a.resolutions,
            forceInitialExtent: !0,
            layers: [new OpenLayers.Layer(null, c)],
            items: this.mapItems,
            plugins: this.mapPlugins,
            tbar: a.tbar || new Ext.Toolbar({
                hidden: !0
            })
        }, a));
        this.mapPanel.getTopToolbar().on({
            afterlayout: this.mapPanel.map.updateSize,
            show: this.mapPanel.map.updateSize,
            hide: this.mapPanel.map.updateSize,
            scope: this.mapPanel.map
        });
        this.mapPanel.layers.on({
            add: function (a, b) {
                for (var c, d = b.length - 1; 0 <= d; d--) c = b[d], !0 === c.get("selected") && this.selectLayer(c)
            },
            remove: function (a, b) {
                !0 === b.get("selected") && this.selectLayer()
            },
            scope: this
        })
    },
    initTools: function () {
        this.tools = {};
        if (this.initialConfig.tools && 0 < this.initialConfig.tools.length) for (var a, b = 0, c = this.initialConfig.tools.length; b < c; b++) {
                try {
                    a = Ext.ComponentMgr.createPlugin(this.initialConfig.tools[b],
                        this.defaultToolType)
                } catch (d) {
                    throw Error("Could not create tool plugin with ptype: " + this.initialConfig.tools[b].ptype);
                }
                a.init(this)
        }
    },
    initPortal: function () {
        var a = this.portalConfig || {};
        if (0 === this.portalItems.length) this.mapPanel.region = "center", this.portalItems.push(this.mapPanel);
        this.portal = Ext.ComponentMgr.create(Ext.applyIf(a, {
            layout: "fit",
            hideBorders: !0,
            items: {
                layout: "border",
                deferredRender: !1,
                items: this.portalItems
            }
        }), a.renderTo ? "panel" : "viewport");
        this.fireEvent("portalready")
    },
    activate: function () {
        Ext.QuickTips.init();
        this.addLayers();
        this.checkLayerRecordQueue();
        this.fireEvent("ready")
    },
    addLayers: function () {
        var a = this.initialConfig.map;
        if (a && a.layers) {
            for (var b, c, d = [], e = [], f = 0; f < a.layers.length; ++f) if (b = a.layers[f], c = this.layerSources[b.source])(b = c.createLayerRecord(b)) && ("background" === b.get("group") ? d.push(b) : e.push(b));
            a = this.mapPanel;
            d = d.concat(e);
            d.length && a.layers.add(d)
        }
    },
    getLayerRecordFromMap: function (a) {
        var b = null;
        this.mapPanel && this.mapPanel.layers.each(function (c) {
            if (c.get("source") == a.source && c.get("name") ==
                a.name) return b = c, !1
        });
        return b
    },
    createLayerRecord: function (a, b, c) {
        this.createLayerRecordQueue.push({
            config: a,
            callback: b,
            scope: c
        });
        this.checkLayerRecordQueue()
    },
    checkLayerRecordQueue: function () {
        for (var a, b, c, d, e = [], f = 0, g = this.createLayerRecordQueue.length; f < g; ++f) d = !1, a = this.createLayerRecordQueue[f], b = a.config.source, b in this.layerSources && (b = this.layerSources[b], (c = b.createLayerRecord(a.config)) ? (function (a, b) {
                window.setTimeout(function () {
                    a.callback.call(a.scope, b)
                }, 0)
            }(a, c), d = !0) : b.lazy && b.store.load({
                callback: this.checkLayerRecordQueue,
                scope: this
            })), d || e.push(a);
        this.createLayerRecordQueue = e
    },
    getSource: function (a) {
        return a && this.layerSources[a.get("source")]
    },
    getState: function () {
        var a = Ext.apply({}, this.initialConfig),
            b = this.mapPanel.map.getCenter();
        Ext.apply(a.map, {
            center: [b.lon, b.lat],
            zoom: this.mapPanel.map.zoom,
            layers: []
        });
        var c = {};
        this.mapPanel.layers.each(function (b) {
            if (b.getLayer().displayInLayerSwitcher) {
                var e = b.get("source"),
                    f = this.layerSources[e];
                if (!f) throw Error("Could not find source for layer '" + b.get("name") + "'");
                a.map.layers.push(f.getConfigForRecord(b));
                c[e] || (c[e] = f.getState())
            }
        }, this);
        Ext.apply(this.sources, c);
        a.tools = [];
        Ext.iterate(this.tools, function (b, c) {
            c.getState != gxp.plugins.Tool.prototype.getState && a.tools.push(c.getState())
        });
        return a
    },
    isAuthorized: function (a) {
        var b = !0;
        if (this.authorizedRoles) {
            b = !1;
            a || (a = "ROLE_ADMINISTRATOR");
            Ext.isArray(a) || (a = [a]);
            for (var c = a.length - 1; 0 <= c; --c) if (~this.authorizedRoles.indexOf(a[c])) {
                    b = !0;
                    break
                }
        }
        return b
    },
    setAuthorizedRoles: function (a) {
        this.authorizedRoles = a;
        this.fireEvent("authorizationchange")
    },
    cancelAuthentication: function () {
        this._authFn &&
            this.un("authorizationchange", this._authFn, this);
        this.fireEvent("authorizationchange")
    },
    isAuthenticated: function () {
        return !this.authorizedRoles || 0 < this.authorizedRoles.length
    },
    doAuthorized: function (a, b, c) {
        this.isAuthorized(a) || !this.authenticate ? window.setTimeout(function () {
            b.call(c)
        }, 0) : (this.authenticate(), this._authFn = function () {
            delete this._authFn;
            this.doAuthorized(a, b, c, !0)
        }, this.on("authorizationchange", this._authFn, this, {
            single: !0
        }))
    },
    destroy: function () {
        this.mapPanel.destroy();
        this.portal &&
            this.portal.destroy()
    }
});
(function () {
    OpenLayers.DOTS_PER_INCH = 25.4 / 0.28
})();
Ext.namespace("gxp.form");
gxp.form.CSWFilterField = Ext.extend(Ext.form.CompositeField, {
    clearTooltip: "Clear the filter for this category",
    emptyText: "Select filter",
    property: null,
    map: null,
    type: OpenLayers.Filter.Comparison.EQUAL_TO,
    name: null,
    comboFieldLabel: null,
    comboStoreData: null,
    target: null,
    getFilter: function () {
        return "BoundingBox" === this.property ? new OpenLayers.Filter.Spatial({
            type: OpenLayers.Filter.Spatial.BBOX,
            property: this.property,
            projection: "EPSG:4326",
            value: this.map.getExtent().transform(this.map.getProjectionObject(),
                new OpenLayers.Projection("EPSG:4326"))
        }) : new OpenLayers.Filter.Comparison({
            type: this.type,
            property: this.property,
            value: this.combo.getValue()
        })
    },
    initComponent: function () {
        this.items = [{
                ref: "combo",
                xtype: "combo",
                fieldLabel: this.comboFieldLabel,
                store: new Ext.data.ArrayStore({
                    fields: ["id", "value"],
                    data: this.comboStoreData
                }),
                displayField: "value",
                valueField: "id",
                mode: "local",
                listeners: {
                    select: function () {
                        this.filter && this.target.removeFilter(this.filter);
                        this.filter = this.getFilter();
                        this.target.addFilter(this.filter);
                        return !1
                    },
                    scope: this
                },
                emptyText: this.emptyText,
                triggerAction: "all"
            }, {
                xtype: "button",
                iconCls: "gxp-icon-removelayers",
                tooltip: this.clearTooltip,
                handler: function () {
                    this.target.removeFilter(this.filter);
                    this.hide()
                },
                scope: this
            }
        ];
        this.hidden = !0;
        gxp.form.CSWFilterField.superclass.initComponent.apply(this, arguments)
    },
    destroy: function () {
        this.map = this.target = this.filter = null;
        gxp.form.CSWFilterField.superclass.destroy.call(this)
    }
});
Ext.reg("gxp_cswfilterfield", gxp.form.CSWFilterField);
Ext.namespace("gxp");
gxp.CatalogueSearchPanel = Ext.extend(Ext.Panel, {
    width: 400,
    border: !1,
    maxRecords: 10,
    map: null,
    selectedSource: null,
    sources: null,
    searchFieldEmptyText: "Search",
    searchButtonText: "Search",
    addTooltip: "Create filter",
    addMapTooltip: "Add to map",
    advancedTitle: "Advanced",
    datatypeLabel: "Data type",
    extentLabel: "Spatial extent",
    categoryLabel: "Category",
    datasourceLabel: "Data source",
    filterLabel: "Filter search by",
    removeSourceTooltip: "Switch back to original source",
    initComponent: function () {
        this.addEvents("addlayer");
        this.filters = [];
        var a = [],
            b;
        for (b in this.sources) a.push([b, this.sources[b].title]);
        if (1 <= a.length) this.selectedSource = a[0][0];
        b = [
            ["datatype", "data type"],
            ["extent", "spatial extent"],
            ["category", "category"]
        ];
        1 < a.length && b.push(["csw", "data source"]);
        this.items = [{
                xtype: "form",
                border: !1,
                ref: "form",
                hideLabels: !0,
                autoHeight: !0,
                style: "margin-left: 5px; margin-right: 5px; margin-bottom: 5px; margin-top: 5px",
                items: [{
                        xtype: "compositefield",
                        items: [{
                                xtype: "textfield",
                                emptyText: this.searchFieldEmptyText,
                                ref: "../../search",
                                name: "search",
                                listeners: {
                                    specialkey: function (a, b) {
                                        b.getKey() == b.ENTER && this.performQuery()
                                    },
                                    scope: this
                                },
                                width: 300
                            }, {
                                xtype: "button",
                                text: this.searchButtonText,
                                handler: this.performQuery,
                                scope: this
                            }
                        ]
                    }, {
                        xtype: "fieldset",
                        collapsible: !0,
                        collapsed: !0,
                        hideLabels: !1,
                        title: this.advancedTitle,
                        items: [{
                                xtype: "gxp_cswfilterfield",
                                name: "datatype",
                                property: "apiso:Type",
                                comboFieldLabel: this.datatypeLabel,
                                comboStoreData: [
                                    ["dataset", "Dataset"],
                                    ["datasetcollection", "Dataset collection"],
                                    ["application", "Application"],
                                    ["service", "Service"]
                                ],
                                target: this
                            }, {
                                xtype: "gxp_cswfilterfield",
                                name: "extent",
                                property: "BoundingBox",
                                map: this.map,
                                comboFieldLabel: this.extentLabel,
                                comboStoreData: [
                                    ["map", "spatial extent of the map"]
                                ],
                                target: this
                            }, {
                                xtype: "gxp_cswfilterfield",
                                name: "category",
                                property: "apiso:TopicCategory",
                                comboFieldLabel: this.categoryLabel,
                                comboStoreData: [
                                    ["farming", "Farming"],
                                    ["biota", "Biota"],
                                    ["boundaries", "Boundaries"],
                                    ["climatologyMeteorologyAtmosphere", "Climatology/Meteorology/Atmosphere"],
                                    ["economy", "Economy"],
                                    ["elevation", "Elevation"],
                                    ["environment", "Environment"],
                                    ["geoscientificinformation", "Geoscientific Information"],
                                    ["health", "Health"],
                                    ["imageryBaseMapsEarthCover", "Imagery/Base Maps/Earth Cover"],
                                    ["intelligenceMilitary", "Intelligence/Military"],
                                    ["inlandWaters", "Inland Waters"],
                                    ["location", "Location"],
                                    ["oceans", "Oceans"],
                                    ["planningCadastre", "Planning Cadastre"],
                                    ["society", "Society"],
                                    ["structure", "Structure"],
                                    ["transportation", "Transportation"],
                                    ["utilitiesCommunications", "Utilities/Communications"]
                                ],
                                target: this
                            }, {
                                xtype: "compositefield",
                                id: "csw",
                                ref: "../../cswCompositeField",
                                hidden: !0,
                                items: [{
                                        xtype: "combo",
                                        ref: "../../../sourceCombo",
                                        fieldLabel: this.datasourceLabel,
                                        store: new Ext.data.ArrayStore({
                                            fields: ["id", "value"],
                                            data: a
                                        }),
                                        displayField: "value",
                                        valueField: "id",
                                        mode: "local",
                                        listeners: {
                                            select: function (a) {
                                                this.setSource(a.getValue())
                                            },
                                            render: function () {
                                                this.sourceCombo.setValue(this.selectedSource)
                                            },
                                            scope: this
                                        },
                                        triggerAction: "all"
                                    }, {
                                        xtype: "button",
                                        iconCls: "gxp-icon-removelayers",
                                        tooltip: this.removeSourceTooltip,
                                        handler: function () {
                                            this.setSource(this.initialConfig.selectedSource);
                                            this.sourceCombo.setValue(this.initialConfig.selectedSource);
                                            this.cswCompositeField.hide()
                                        },
                                        scope: this
                                    }
                                ]
                            }, {
                                xtype: "compositefield",
                                items: [{
                                        xtype: "combo",
                                        fieldLabel: this.filterLabel,
                                        store: new Ext.data.ArrayStore({
                                            fields: ["id", "value"],
                                            data: b
                                        }),
                                        displayField: "value",
                                        valueField: "id",
                                        mode: "local",
                                        triggerAction: "all"
                                    }, {
                                        xtype: "button",
                                        iconCls: "gxp-icon-addlayers",
                                        tooltip: this.addTooltip,
                                        handler: function (a) {
                                            a.ownerCt.items.each(function (a) {
                                                if ("combo" ===
                                                    a.getXType()) {
                                                    var b = a.getValue();
                                                    a.clearValue();
                                                    (a = this.form.getForm().findField(b)) && a.show()
                                                }
                                            }, this)
                                        },
                                        scope: this
                                    }
                                ]
                            }
                        ]
                    }, {
                        xtype: "grid",
                        width: "100%",
                        anchor: "99%",
                        viewConfig: {
                            scrollOffset: 0,
                            forceFit: !0
                        },
                        border: !1,
                        ref: "../grid",
                        bbar: new Ext.PagingToolbar({
                            paramNames: this.sources[this.selectedSource].getPagingParamNames(),
                            store: this.sources[this.selectedSource].store,
                            pageSize: this.maxRecords
                        }),
                        loadMask: !0,
                        hideHeaders: !0,
                        store: this.sources[this.selectedSource].store,
                        columns: [{
                                id: "title",
                                xtype: "templatecolumn",
                                tpl: new Ext.XTemplate("<b>{title}</b><br/>{abstract}"),
                                sortable: !0
                            }, {
                                xtype: "actioncolumn",
                                width: 30,
                                items: [{
                                        iconCls: "gxp-icon-addlayers",
                                        tooltip: this.addMapTooltip,
                                        handler: function (a, b) {
                                            this.addLayer(this.grid.store.getAt(b))
                                        },
                                        scope: this
                                    }
                                ]
                            }
                        ],
                        autoExpandColumn: "title",
                        autoHeight: !0
                    }
                ]
            }
        ];
        gxp.CatalogueSearchPanel.superclass.initComponent.apply(this, arguments)
    },
    destroy: function () {
        this.map = this.sources = null;
        gxp.CatalogueSearchPanel.superclass.destroy.call(this)
    },
    setSource: function (a) {
        this.selectedSource =
            a;
        a = this.sources[a].store;
        this.grid.reconfigure(a, this.grid.getColumnModel());
        this.grid.getBottomToolbar().bindStore(a)
    },
    performQuery: function () {
        this.sources[this.selectedSource].filter({
            queryString: this.search.getValue(),
            limit: this.maxRecords,
            filters: this.filters
        })
    },
    addFilter: function (a) {
        this.filters.push(a)
    },
    removeFilter: function (a) {
        this.filters.remove(a)
    },
    findWMS: function (a) {
        for (var b = null, c = null, d = 0, e = a.length; d < e; ++d) {
            var f = a[d];
            if (f && 0 < f.toLowerCase().indexOf("service=wms")) {
                a = OpenLayers.Util.createUrlObject(f);
                b = a.protocol + "//" + a.host + ":" + a.port + a.pathname;
                c = a.args.layers;
                break
            }
        }
        return null !== b && null !== c ? {
            url: b,
            name: c
        } : !1
    },
    addLayer: function (a) {
        var b = a.get("URI"),
            c = a.get("bounds"),
            d = c.left,
            e = c.right,
            f = c.bottom,
            g = c.top,
            c = Math.min(d, e),
            d = Math.max(d, e),
            e = Math.min(f, g),
            f = Math.max(f, g),
            b = this.findWMS(b);
        !1 === b && (b = this.findWMS(a.get("references")));
        !1 !== b && this.fireEvent("addlayer", this, this.selectedSource, Ext.apply({
            title: a.get("title")[0],
            bbox: [c, e, d, f],
            srs: "EPSG:4326"
        }, b))
    }
});
Ext.reg("gxp_cataloguesearchpanel", gxp.CatalogueSearchPanel);
Ext.namespace("gxp");
gxp.EmbedMapDialog = Ext.extend(Ext.Container, {
    url: null,
    url: null,
    publishMessage: "Your map is ready to be published to the web! Simply copy the following HTML to embed the map in your website:",
    heightLabel: "Height",
    widthLabel: "Width",
    mapSizeLabel: "Map Size",
    miniSizeLabel: "Mini",
    smallSizeLabel: "Small",
    premiumSizeLabel: "Premium",
    largeSizeLabel: "Large",
    snippetArea: null,
    heightField: null,
    widthField: null,
    initComponent: function () {
        Ext.apply(this, this.getConfig());
        gxp.EmbedMapDialog.superclass.initComponent.call(this)
    },
    getIframeHTML: function () {
        return this.snippetArea.getValue()
    },
    updateSnippet: function () {
        this.snippetArea.setValue('<iframe style="border: none;" height="' + this.heightField.getValue() + '" width="' + this.widthField.getValue() + '" src="' + gxp.util.getAbsoluteUrl(this.url) + '"></iframe>');
        !0 === this.snippetArea.isVisible() && this.snippetArea.focus(!0, 100)
    },
    getConfig: function () {
        this.snippetArea = new Ext.form.TextArea({
            height: 70,
            selectOnFocus: !0,
            readOnly: !0
        });
        var a = {
            change: this.updateSnippet,
            specialkey: function (a,
                c) {
                c.getKey() == c.ENTER && this.updateSnippet()
            },
            scope: this
        };
        this.heightField = new Ext.form.NumberField({
            width: 50,
            value: 400,
            listeners: a
        });
        this.widthField = new Ext.form.NumberField({
            width: 50,
            value: 600,
            listeners: a
        });
        return {
            border: !1,
            defaults: {
                border: !1,
                cls: "gxp-export-section",
                xtype: "container",
                layout: "fit"
            },
            items: [{
                    items: [new Ext.Container({
                            layout: "column",
                            defaults: {
                                border: !1,
                                xtype: "box"
                            },
                            items: [{
                                    autoEl: {
                                        cls: "gxp-field-label",
                                        html: this.mapSizeLabel
                                    }
                                },
                                new Ext.form.ComboBox({
                                    editable: !1,
                                    width: 75,
                                    store: new Ext.data.SimpleStore({
                                        fields: ["name",
                                                "height", "width"
                                        ],
                                        data: [
                                            [this.miniSizeLabel, 100, 100],
                                            [this.smallSizeLabel, 200, 300],
                                            [this.largeSizeLabel, 400, 600],
                                            [this.premiumSizeLabel, 600, 800]
                                        ]
                                    }),
                                    triggerAction: "all",
                                    displayField: "name",
                                    value: this.largeSizeLabel,
                                    mode: "local",
                                    listeners: {
                                        select: function (a, c) {
                                            this.widthField.setValue(c.get("width"));
                                            this.heightField.setValue(c.get("height"));
                                            this.updateSnippet()
                                        },
                                        scope: this
                                    }
                                }), {
                                    autoEl: {
                                        cls: "gxp-field-label",
                                        html: this.heightLabel
                                    }
                                },
                                this.heightField, {
                                    autoEl: {
                                        cls: "gxp-field-label",
                                        html: this.widthLabel
                                    }
                                },
                                this.widthField
                            ]
                        })]
                }, {
                    xtype: "box",
                    autoEl: {
                        tag: "p",
                        html: this.publishMessage
                    }
                }, {
                    items: [this.snippetArea]
                }
            ],
            listeners: {
                afterrender: this.updateSnippet,
                scope: this
            }
        }
    }
});
Ext.reg("gxp_embedmapdialog", gxp.EmbedMapDialog);
Ext.namespace("gxp");
gxp.ScaleOverlay = Ext.extend(Ext.Panel, {
    map: null,
    zoomLevelText: "Zoom level",
    initComponent: function () {
        gxp.ScaleOverlay.superclass.initComponent.call(this);
        this.cls = "map-overlay";
        if (this.map) {
            if (this.map instanceof GeoExt.MapPanel) this.map = this.map.map;
            this.bind(this.map)
        }
        this.on("beforedestroy", this.unbind, this)
    },
    addToMapPanel: function (a) {
        this.on({
            afterrender: function () {
                this.bind(a.map)
            },
            scope: this
        })
    },
    stopMouseEvents: function (a) {
        a.stopEvent()
    },
    removeFromMapPanel: function () {
        var a = this.getEl();
        a.un("mousedown",
            this.stopMouseEvents, this);
        a.un("click", this.stopMouseEvents, this);
        this.unbind()
    },
    addScaleLine: function () {
        var a = new Ext.BoxComponent({
            autoEl: {
                tag: "div",
                cls: "olControlScaleLine overlay-element overlay-scaleline"
            }
        });
        this.on("afterlayout", function () {
            a.getEl().dom.style.position = "relative";
            a.getEl().dom.style.display = "inline";
            this.getEl().on("click", this.stopMouseEvents, this);
            this.getEl().on("mousedown", this.stopMouseEvents, this)
        }, this);
        a.on("render", function () {
            var b = new OpenLayers.Control.ScaleLine({
                geodesic: !0,
                div: a.getEl().dom
            });
            this.map.addControl(b);
            b.activate()
        }, this);
        this.add(a)
    },
    handleZoomEnd: function () {
        var a = this.zoomStore.queryBy(function (a) {
            return this.map.getZoom() == a.data.level
        }, this);
        0 < a.length ? (a = a.items[0], this.zoomSelector.setValue("1 : " + parseInt(a.data.scale, 10))) : this.zoomSelector.rendered && this.zoomSelector.clearValue()
    },
    addScaleCombo: function () {
        this.zoomStore = new GeoExt.data.ScaleStore({
            map: this.map
        });
        this.zoomSelector = new Ext.form.ComboBox({
            emptyText: this.zoomLevelText,
            tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
            editable: !1,
            triggerAction: "all",
            mode: "local",
            store: this.zoomStore,
            width: 110
        });
        this.zoomSelector.on({
            click: this.stopMouseEvents,
            mousedown: this.stopMouseEvents,
            select: function (a, b) {
                this.map.zoomTo(b.data.level)
            },
            scope: this
        });
        this.map.events.register("zoomend", this, this.handleZoomEnd);
        this.add(new Ext.Panel({
            items: [this.zoomSelector],
            cls: "overlay-element overlay-scalechooser",
            border: !1
        }))
    },
    bind: function (a) {
        this.map = a;
        this.addScaleLine();
        this.addScaleCombo();
        this.doLayout()
    },
    unbind: function () {
        this.map &&
            this.map.events && this.map.events.unregister("zoomend", this, this.handleZoomEnd);
        this.zoomSelector = this.zoomStore = null
    }
});
Ext.reg("gxp_scaleoverlay", gxp.ScaleOverlay);
Ext.namespace("gxp.menu");
gxp.menu.LayerMenu = Ext.extend(Ext.menu.Menu, {
    layerText: "Layer",
    layers: null,
    initComponent: function () {
        gxp.menu.LayerMenu.superclass.initComponent.apply(this, arguments);
        this.layers.on("add", this.onLayerAdd, this);
        this.onLayerAdd()
    },
    onRender: function (a, b) {
        gxp.menu.LayerMenu.superclass.onRender.apply(this, arguments)
    },
    beforeDestroy: function () {
        this.layers && this.layers.on && this.layers.un("add", this.onLayerAdd, this);
        delete this.layers;
        gxp.menu.LayerMenu.superclass.beforeDestroy.apply(this, arguments)
    },
    onLayerAdd: function () {
        this.removeAll();
        this.add({
            iconCls: "gxp-layer-visibility",
            text: this.layerText,
            canActivate: !1
        }, "-");
        this.layers.each(function (a) {
            if (a.getLayer().displayInLayerSwitcher) {
                var b = new Ext.menu.CheckItem({
                    text: a.get("title"),
                    checked: a.getLayer().getVisibility(),
                    group: a.get("group"),
                    listeners: {
                        checkchange: function (b, d) {
                            a.getLayer().setVisibility(d)
                        }
                    }
                });
                2 < this.items.getCount() ? this.insert(2, b) : this.add(b)
            }
        }, this)
    }
});
Ext.reg("gxp_layermenu", gxp.menu.LayerMenu);
GeoExt.Lang.add("es", {
    "gxp.menu.LayerMenu.prototype": {
        layerText: "Capa"
    },
    "gxp.plugins.AddLayers.prototype": {
        addActionMenuText: "A\u00f1adir Capas",
        addActionTip: "A\u00f1adir Capas",
        addServerText: "A\u00f1adir servidor",
        addButtonText: "A\u00f1adir Capas",
        untitledText: "Sin T\u00edtulo",
        addLayerSourceErrorText: "Error obteniendo capabilities de WMS ({msg}).\nPor favor, compruebe la URL y vuelva a intentarlo.",
        availableLayersText: "Capas disponibles",
        expanderTemplateText: "<p><b>Resumen:</b> {abstract}</p>",
        panelTitleText: "T\u00edtulo",
        layerSelectionText: "Ver datos disponibles de:",
        doneText: "Hecho",
        uploadText: "Subir Datos"
    },
    "gxp.plugins.BingSource.prototype": {
        title: "Capas Bing",
        roadTitle: "Bing Carreteras",
        aerialTitle: "Bing Foto A\u00e9rea",
        labeledAerialTitle: "Bing H\u00edbrido"
    },
    "gxp.plugins.FeatureEditor.prototype": {
        splitButtonText: "Edit",
        createFeatureActionText: "Create",
        editFeatureActionText: "Modify",
        createFeatureActionTip: "Crear nuevo elemento",
        editFeatureActionTip: "Editar elemento existente"
    },
    "gxp.plugins.FeatureGrid.prototype": {
        displayFeatureText: "Mostrar en el mapa",
        firstPageTip: "Primera p\u00e1gina",
        previousPageTip: "P\u00e1gina anterior",
        zoomPageExtentTip: "Zoom a la extensi\u00f3n de la p\u00e1gina",
        nextPageTip: "P\u00e1gina siguiente",
        lastPageTip: "\u00daltima p\u00e1gina",
        totalMsg: "Features {1} to {2} of {0}"
    },
    "gxp.plugins.GoogleEarth.prototype": {
        menuText: "Vista 3D",
        tooltip: "Vista 3D"
    },
    "gxp.plugins.GoogleSource.prototype": {
        title: "Capas Google",
        roadmapAbstract: "Mostrar Callejero",
        satelliteAbstract: "Mostrar im\u00e1genes a\u00e9reas",
        hybridAbstract: "Mostrar im\u00e1genes con nombres de calle",
        terrainAbstract: "Mostrar callejero con terreno"
    },
    "gxp.plugins.LayerProperties.prototype": {
        menuText: "Propiedades de la capa",
        toolTip: "Propiedades de la capa"
    },
    "gxp.plugins.LayerTree.prototype": {
        shortTitle: "Capas",
        rootNodeText: "Capas",
        overlayNodeText: "Capas superpuestas",
        baseNodeText: "Capa base"
    },
    "gxp.plugins.LayerManager.prototype": {
        baseNodeText: "Capa base"
    },
    "gxp.plugins.Legend.prototype": {
        menuText: "Leyenda",
        tooltip: "Leyenda"
    },
    "gxp.plugins.LoadingIndicator.prototype": {
        loadingMapMessage: "Loading Map..."
    },
    "gxp.plugins.MapBoxSource.prototype": {
        title: "MapBox Layers",
        blueMarbleTopoBathyJanTitle: "Blue Marble Topography & Bathymetry (January)",
        blueMarbleTopoBathyJulTitle: "Blue Marble Topography & Bathymetry (July)",
        blueMarbleTopoJanTitle: "Blue Marble Topography (January)",
        blueMarbleTopoJulTitle: "Blue Marble Topography (July)",
        controlRoomTitle: "Control Room",
        geographyClassTitle: "Geography Class",
        naturalEarthHypsoTitle: "Natural Earth Hypsometric",
        naturalEarthHypsoBathyTitle: "Natural Earth Hypsometric & Bathymetry",
        naturalEarth1Title: "Natural Earth I",
        naturalEarth2Title: "Natural Earth II",
        worldDarkTitle: "World Dark",
        worldLightTitle: "World Light",
        worldPrintTitle: "World Print"
    },
    "gxp.plugins.TileStreamSource.prototype": {
        title: "GEM Tiles Layers",
        hazardMapPointsWorldTitle: "Hazard Map PGA_0.1",
        whiteBaseTitle: "GEM Base Map",
        gdalCustomUrbanTitle: "GDAL Urban Population",
        gdalCustomRuralTitle: "GDAL Rural Population",
    },
    "gxp.plugins.Measure.prototype": {
        buttonText: "Medir",
        lengthMenuText: "Longitud",
        areaMenuText: "\u00c1rea",
        lengthTooltip: "Medir Longitud",
        areaTooltip: "Medir \u00c1rea",
        measureTooltip: "Medir"
    },
    "gxp.plugins.Navigation.prototype": {
        menuText: "Desplazar mapa",
        tooltip: "Desplazar mapa"
    },
    "gxp.plugins.NavigationHistory.prototype": {
        previousMenuText: "Vista anterior",
        nextMenuText: "Vista siguiente",
        previousTooltip: "Vista anterior",
        nextTooltip: "Vista siguiente"
    },
    "gxp.plugins.OSMSource.prototype": {
        title: "Capas OpenStreetMap",
        mapnikAttribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
        osmarenderAttribution: "Datos CC-By-SA de <a href='http://openstreetmap.org/'>OpenStreetMap</a>"
    },
    "gxp.plugins.Print.prototype": {
        buttonText: "Imprimir",
        menuText: "Imprimir mapa",
        tooltip: "Imprimir mapa",
        previewText: "Vista previa",
        notAllNotPrintableText: "No se pueden imprimir todas las capas",
        nonePrintableText: "No se puede imprimir ninguna de las capas del mapa"
    },
    "gxp.plugins.MapQuestSource.prototype": {
        title: "Capas MapQuest",
        osmAttribution: "Teselas cortes\u00eda de <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
        osmTitle: "MapQuest OpenStreetMap",
        naipAttribution: "Teselas cortes\u00eda de <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
        naipTitle: "MapQuest Im\u00e1genes"
    },
    "gxp.plugins.QueryForm.prototype": {
        queryActionText: "Consultar",
        queryMenuText: "Consultar capa",
        queryActionTip: "Consultar la capa seleccionada",
        queryByLocationText: "Query by current map extent",
        queryByAttributesText: "Consultar por atributos",
        queryMsg: "Consultando...",
        cancelButtonText: "Cancelar",
        noFeaturesTitle: "Sin coincidencias",
        noFeaturesMessage: "Su consulta no produjo resultados."
    },
    "gxp.plugins.RemoveLayer.prototype": {
        removeMenuText: "Eliminar Capa",
        removeActionTip: "Eliminar Capa"
    },
    "gxp.plugins.Styler.prototype": {
        menuText: "Editar estilos",
        tooltip: "Gestionar estilos de capa"
    },
    "gxp.plugins.WMSGetFeatureInfo.prototype": {
        buttonText: "Identify",
        infoActionTip: "Consultar elementos",
        popupTitle: "Informaci\u00f3n de elementos"
    },
    "gxp.plugins.Zoom.prototype": {
        zoomMenuText: "Zoom Box",
        zoomInMenuText: "Acercar",
        zoomOutMenuText: "Alejar",
        zoomTooltip: "Zoom by dragging a box",
        zoomInTooltip: "Acercar",
        zoomOutTooltip: "Alejar"
    },
    "gxp.plugins.ZoomToExtent.prototype": {
        menuText: "Ver extensi\u00f3n total",
        tooltip: "Ver extensi\u00f3n total"
    },
    "gxp.plugins.ZoomToDataExtent.prototype": {
        menuText: "Ver toda la capa",
        tooltip: "Ver toda la capa"
    },
    "gxp.plugins.ZoomToLayerExtent.prototype": {
        menuText: "Ver toda la la capa",
        tooltip: "Ver toda la capa"
    },
    "gxp.plugins.ZoomToSelectedFeatures.prototype": {
        menuText: "Ver los elementos seleccionados",
        tooltip: "Ver los elementos seleccionados"
    },
    "gxp.FeatureEditPopup.prototype": {
        closeMsgTitle: "\u00bfDesea guardar los cambios?",
        closeMsg: "Los cambios en este elemento no se han guardado. \u00bfDesea guardar los cambios?",
        deleteMsgTitle: "\u00bfDesea borrar el elemento?",
        deleteMsg: "\u00bfEst\u00e1 seguro de querer borrar este elemento?",
        editButtonText: "Editar",
        editButtonTooltip: "Hacer editable este elemento",
        deleteButtonText: "Borrar",
        deleteButtonTooltip: "Borrar este elemento",
        cancelButtonText: "Cancelar",
        cancelButtonTooltip: "Dejar de editar, descartar cambios",
        saveButtonText: "Guardar",
        saveButtonTooltip: "Guardar cambios"
    },
    "gxp.FillSymbolizer.prototype": {
        fillText: "Relleno",
        colorText: "Color",
        opacityText: "Opacidad"
    },
    "gxp.FilterBuilder.prototype": {
        builderTypeNames: ["cualquiera de",
                "todas", "ninguna de", "no todas"
        ],
        preComboText: "Cumplir",
        postComboText: "las condiciones siguientes:",
        addConditionText: "a\u00f1adir condici\u00f3n",
        addGroupText: "a\u00f1adir grupo",
        removeConditionText: "eliminar condici\u00f3n"
    },
    "gxp.grid.CapabilitiesGrid.prototype": {
        nameHeaderText: "Nombre",
        titleHeaderText: "T\u00edtulo",
        queryableHeaderText: "Consultable",
        layerSelectionLabel: "Ver datos disponibles de:",
        layerAdditionLabel: "o a\u00f1adir otro servidor.",
        expanderTemplateText: "<p><b>Resumen:</b> {abstract}</p>"
    },
    "gxp.PointSymbolizer.prototype": {
        graphicCircleText: "c\u00edrculo",
        graphicSquareText: "cuadrado",
        graphicTriangleText: "tri\u00e1ngulo",
        graphicStarText: "estrella",
        graphicCrossText: "cruz",
        graphicXText: "x",
        graphicExternalText: "externo",
        urlText: "URL",
        opacityText: "opacidad",
        symbolText: "S\u00edmbolo",
        sizeText: "Tama\u00f1o",
        rotationText: "Giro"
    },
    "gxp.QueryPanel.prototype": {
        queryByLocationText: "Consultar por localizaci\u00f3n",
        currentTextText: "Extensi\u00f3n actual",
        queryByAttributesText: "Consultar por atributo",
        layerText: "Capa"
    },
    "gxp.RulePanel.prototype": {
        scaleSliderTemplate: "{scaleType} Escala 1:{scale}",
        labelFeaturesText: "Etiquetado de elementos",
        labelsText: "Etiquetas",
        basicText: "B\u00e1sico",
        advancedText: "Advanzado",
        limitByScaleText: "Limitar por escala",
        limitByConditionText: "Limitar por condici\u00f3n",
        symbolText: "S\u00edmbolo",
        nameText: "Nombre"
    },
    "gxp.ScaleLimitPanel.prototype": {
        scaleSliderTemplate: "{scaleType} Escala 1:{scale}",
        minScaleLimitText: "Escala m\u00ednima",
        maxScaleLimitText: "Escala m\u00e1xima"
    },
    "gxp.StrokeSymbolizer.prototype": {
        solidStrokeName: "continuo",
        dashStrokeName: "guiones",
        dotStrokeName: "puntos",
        titleText: "Trazo",
        styleText: "Estilo",
        colorText: "Color",
        widthText: "Ancho",
        opacityText: "Opacidad"
    },
    "gxp.StylePropertiesDialog.prototype": {
        titleText: "General",
        nameFieldText: "Nombre",
        titleFieldText: "T\u00edtulo",
        abstractFieldText: "Resumen"
    },
    "gxp.TextSymbolizer.prototype": {
        labelValuesText: "Etiquetado",
        haloText: "Halo",
        sizeText: "Tama\u00f1o"
    },
    "gxp.WMSLayerPanel.prototype": {
        aboutText: "Acerca de",
        titleText: "T\u00edtulo",
        nameText: "Nombre",
        descriptionText: "Descripci\u00f3n",
        displayText: "Mostrar",
        opacityText: "Opacidad",
        formatText: "Formato",
        transparentText: "Transparente",
        cacheText: "Cach\u00e9",
        cacheFieldText: "Usar la versi\u00f3n en cach\u00e9",
        stylesText: "Estilos",
        infoFormatText: "Info format",
        infoFormatEmptyText: "Select a format"
    },
    "gxp.EmbedMapDialog.prototype": {
        publishMessage: "\u00a1Ya puede publicar su mapa en otras webs! Simplemente copie el siguiente c\u00f3digo HTML en el lugar donde desee incrustarlo:",
        heightLabel: "Alto",
        widthLabel: "Ancho",
        mapSizeLabel: "Tama\u00f1o",
        miniSizeLabel: "M\u00ednimo",
        smallSizeLabel: "Peque\u00f1o",
        premiumSizeLabel: "Premium",
        largeSizeLabel: "Grande"
    },
    "gxp.WMSStylesDialog.prototype": {
        addStyleText: "A\u00f1adir",
        addStyleTip: "A\u00f1adir un estilo",
        chooseStyleText: "Escoger estilo",
        deleteStyleText: "Quitar",
        deleteStyleTip: "Borrar el estilo seleccionado",
        editStyleText: "Cambiar",
        editStyleTip: "Editar el estilo seleccionado",
        duplicateStyleText: "Clonar",
        duplicateStyleTip: "Duplicar el estilo seleccionado",
        addRuleText: "A\u00f1adir",
        addRuleTip: "A\u00f1adir una regla",
        newRuleText: "Nueva regla",
        deleteRuleText: "Quitar",
        deleteRuleTip: "Borrar la regla seleccionada",
        editRuleText: "Cambiar",
        editRuleTip: "Editar la regla seleccionada",
        duplicateRuleText: "Duplicar",
        duplicateRuleTip: "Duplicar la regla seleccionada",
        cancelText: "Cancelar",
        saveText: "Guardar",
        styleWindowTitle: "Estilo: {0}",
        ruleWindowTitle: "Regla: {0}",
        stylesFieldsetTitle: "Estilos",
        rulesFieldsetTitle: "Reglas"
    },
    "gxp.LayerUploadPanel.prototype": {
        titleLabel: "T\u00edtulo",
        titleEmptyText: "T\u00edtulo de la capa",
        abstractLabel: "Descripci\u00f3n",
        abstractEmptyText: "Descripci\u00f3n de la capa",
        fileLabel: "Datos",
        fieldEmptyText: "Navegue por los datos...",
        uploadText: "Subir",
        waitMsgText: "Suba sus datos data...",
        invalidFileExtensionText: "El fichero debe tener alguna de estas extensiones: ",
        optionsText: "Opciones",
        workspaceLabel: "Espacio de trabajo",
        workspaceEmptyText: "Espacio de trabajo por defecto",
        dataStoreLabel: "Almac\u00e9n de datos",
        dataStoreEmptyText: "Create new store",
        defaultDataStoreEmptyText: "Almac\u00e9n de datos por defecto"
    },
    "gxp.NewSourceDialog.prototype": {
        title: "A\u00f1adir Servidor...",
        cancelText: "Cancelar",
        addServerText: "A\u00f1adir Servidor",
        invalidURLText: "Enter a valid URL to a WMS endpoint (e.g. http://example.com/geoserver/wms)",
        contactingServerText: "Conectando con el Servidor..."
    },
    "gxp.ScaleOverlay.prototype": {
        zoomLevelText: "Escala"
    }
});
GeoExt.Lang.add("fr", {
    "gxp.plugins.AddLayers.prototype": {
        addActionMenuText: "Ajouter des calques",
        addActionTip: "Ajouter des calques",
        addServerText: "Ajouter un nouveau serveur",
        untitledText: "Sans titre",
        addLayerSourceErrorText: "Impossible d'obtenir les capacit\u00e9s WMS ({msg}).\nVeuillez v\u00e9rifier l'URL et essayez \u00e0 nouveau.",
        availableLayersText: "Couches disponibles",
        doneText: "Termin\u00e9",
        uploadText: "T\u00e9l\u00e9charger des donn\u00e9es"
    },
    "gxp.plugins.BingSource.prototype": {
        title: "Calques Bing",
        roadTitle: "Bing routes",
        aerialTitle: "Bing images a\u00e9riennes",
        labeledAerialTitle: "Bing images a\u00e9riennes avec \u00e9tiquettes"
    },
    "gxp.plugins.FeatureEditor.prototype": {
        splitButtonText: "Edit",
        createFeatureActionText: "Create",
        editFeatureActionText: "Modify",
        createFeatureActionTip: "Cr\u00e9er un nouvel objet",
        editFeatureActionTip: "Modifier un objet existant"
    },
    "gxp.plugins.FeatureGrid.prototype": {
        displayFeatureText: "Afficher sur la carte",
        firstPageTip: "Premi\u00e8re page",
        previousPageTip: "Page pr\u00e9c\u00e9dente",
        zoomPageExtentTip: "Zoom sur la page",
        nextPageTip: "Page suivante",
        lastPageTip: "Derni\u00e8re page",
        totalMsg: "Features {1} to {2} of {0}"
    },
    "gxp.plugins.GoogleEarth.prototype": {
        menuText: "Passer \u00e0 la visionneuse 3D",
        tooltip: "Passer \u00e0 la visionneuse 3D"
    },
    "gxp.plugins.GoogleSource.prototype": {
        title: "Calques Google",
        roadmapAbstract: "Carte routi\u00e8re",
        satelliteAbstract: "Images satellite",
        hybridAbstract: "Images avec routes",
        terrainAbstract: "Carte routi\u00e8re avec le terrain"
    },
    "gxp.plugins.LayerProperties.prototype": {
        menuText: "Propri\u00e9t\u00e9s de la couche",
        toolTip: "Propri\u00e9t\u00e9s de la couche"
    },
    "gxp.plugins.LayerTree.prototype": {
        shortTitle: "Layers",
        rootNodeText: "Layers",
        overlayNodeText: "Surimpressions",
        baseNodeText: "Couches"
    },
    "gxp.plugins.LayerManager.prototype": {
        baseNodeText: "Couche"
    },
    "gxp.plugins.Legend.prototype": {
        menuText: "L\u00e9gende",
        tooltip: "L\u00e9gende"
    },
    "gxp.plugins.Measure.prototype": {
        buttonText: "Mesure",
        lengthMenuText: "Longueur",
        areaMenuText: "Surface",
        lengthTooltip: "Mesure de longueur",
        areaTooltip: "Mesure de surface",
        measureTooltip: "Mesure"
    },
    "gxp.plugins.Navigation.prototype": {
        menuText: "Panner la carte",
        tooltip: "Panner la carte"
    },
    "gxp.plugins.NavigationHistory.prototype": {
        previousMenuText: "Position pr\u00e9c\u00e9dente",
        nextMenuText: "Position suivante",
        previousTooltip: "Position pr\u00e9c\u00e9dente",
        nextTooltip: "Position suivante"
    },
    "gxp.plugins.LoadingIndicator.prototype": {
        loadingMapMessage: "Chargement de la carte..."
    },
    "gxp.plugins.MapBoxSource.prototype": {
        title: "MapBox Layers",
        blueMarbleTopoBathyJanTitle: "Blue Marble Topography & Bathymetry (January)",
        blueMarbleTopoBathyJulTitle: "Blue Marble Topography & Bathymetry (July)",
        blueMarbleTopoJanTitle: "Blue Marble Topography (January)",
        blueMarbleTopoJulTitle: "Blue Marble Topography (July)",
        controlRoomTitle: "Control Room",
        geographyClassTitle: "Geography Class",
        naturalEarthHypsoTitle: "Natural Earth Hypsometric",
        naturalEarthHypsoBathyTitle: "Natural Earth Hypsometric & Bathymetry",
        naturalEarth1Title: "Natural Earth I",
        naturalEarth2Title: "Natural Earth II",
        worldDarkTitle: "World Dark",
        worldLightTitle: "World Light",
        worldPrintTitle: "World Print"
    },
    "gxp.plugins.TileStreamSource.prototype": {
        title: "GEM Tiles Layers",
        hazardMapPointsWorldTitle: "Hazard Map PGA_0.1",
        whiteBaseTitle: "GEM Base Map",
        gdalCustomUrbanTitle: "GDAL Urban Population",
        gdalCustomRuralTitle: "GDAL Rural Population",
    },
    "gxp.plugins.OSMSource.prototype": {
        title: "Calques OpenStreetMap",
        mapnikAttribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
        osmarenderAttribution: "Donn\u00e9es CC-By-SA par <a href='http://openstreetmap.org/'>OpenStreetMap</a>"
    },
    "gxp.plugins.Print.prototype": {
        buttonText: "Imprimer",
        menuText: "Imprimer la carte",
        tooltip: "Imprimer la carte",
        previewText: "Aper\u00e7u avant impression",
        notAllNotPrintableText: "Non, toutes les couches peuvent \u00eatre imprim\u00e9es",
        nonePrintableText: "Aucune de vos couches ne peut \u00eatre imprim\u00e9e"
    },
    "gxp.plugins.MapQuestSource.prototype": {
        title: "MapQuest Layers",
        osmAttribution: "Avec la permission de tuiles <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
        osmTitle: "MapQuest OpenStreetMap",
        naipAttribution: "Avec la permission de tuiles <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
        naipTitle: "MapQuest Imagery"
    },
    "gxp.plugins.QueryForm.prototype": {
        queryActionText: "Interrogation",
        queryMenuText: "Couche de requ\u00eates",
        queryActionTip: "Interroger la couche s\u00e9lectionn\u00e9e",
        queryByLocationText: "Query by current map extent",
        queryByAttributesText: "Requ\u00eate par attributs"
    },
    "gxp.plugins.RemoveLayer.prototype": {
        removeMenuText: "Enlever la couche",
        removeActionTip: "Enlever la couche"
    },
    "gxp.plugins.WMSGetFeatureInfo.prototype": {
        buttonText: "Identify",
        infoActionTip: "Get Feature Info",
        popupTitle: "Info sur l'objet"
    },
    "gxp.plugins.Zoom.prototype": {
        zoomMenuText: "Zoom Box",
        zoomInMenuText: "Zoom avant",
        zoomOutMenuText: "Zoom arri\u00e8re",
        zoomTooltip: "Zoom by dragging a box",
        zoomInTooltip: "Zoom avant",
        zoomOutTooltip: "Zoom arri\u00e8re"
    },
    "gxp.plugins.ZoomToExtent.prototype": {
        menuText: "Zoomer sur la carte max",
        tooltip: "Zoomer sur la carte max"
    },
    "gxp.plugins.ZoomToDataExtent.prototype": {
        menuText: "Zoomer sur la couche",
        tooltip: "Zoomer sur la couche"
    },
    "gxp.plugins.ZoomToLayerExtent.prototype": {
        menuText: "Zoomer sur la couche",
        tooltip: "Zoomer sur la couche"
    },
    "gxp.plugins.ZoomToSelectedFeatures.prototype": {
        menuText: "Zoomer sur les objets s\u00e9lectionn\u00e9s",
        tooltip: "Zoomer sur les objets s\u00e9lectionn\u00e9s"
    },
    "gxp.FeatureEditPopup.prototype": {
        closeMsgTitle: "Enregistrer les modifications ?",
        closeMsg: "Cet objet a des modifications non enregistr\u00e9es. Voulez-vous enregistrer vos modifications ?",
        deleteMsgTitle: "Supprimer l'objet ?",
        deleteMsg: "Etes-vous s\u00fbr de vouloir supprimer cet objet ?",
        editButtonText: "Modifier",
        editButtonTooltip: "Modifier cet objet",
        deleteButtonText: "Supprimer",
        deleteButtonTooltip: "Supprimer cet objet",
        cancelButtonText: "Annuler",
        cancelButtonTooltip: "Arr\u00eater de modifier, annuler les modifications",
        saveButtonText: "Enregistrer",
        saveButtonTooltip: "Enregistrer les modifications"
    },
    "gxp.FillSymbolizer.prototype": {
        fillText: "Remplir",
        colorText: "Couleur",
        opacityText: "Opacit\u00e9"
    },
    "gxp.FilterBuilder.prototype": {
        builderTypeNames: ["Tout", "tous", "aucun", "pas tout"],
        preComboText: "Match",
        postComboText: "de ce qui suit:",
        addConditionText: "Ajouter la condition",
        addGroupText: "Ajouter un groupe",
        removeConditionText: "Supprimer la condition"
    },
    "gxp.grid.CapabilitiesGrid.prototype": {
        nameHeaderText: "Nom",
        titleHeaderText: "Titre",
        queryableHeaderText: "Interrogeable",
        layerSelectionLabel: "Voir les donn\u00e9es disponibles \u00e0 partir de :",
        layerAdditionLabel: "ou ajouter un nouveau serveur.",
        expanderTemplateText: "<p><b>R\u00e9sum\u00e9:</b> {abstract}</p>"
    },
    "gxp.PointSymbolizer.prototype": {
        graphicCircleText: "Cercle",
        graphicSquareText: "Carr\u00e9",
        graphicTriangleText: "Triangle",
        graphicStarText: "\u00c9toile",
        graphicCrossText: "Croix",
        graphicXText: "x",
        graphicExternalText: "Externe",
        urlText: "URL",
        opacityText: "Opacit\u00e9",
        symbolText: "Symbole",
        sizeText: "Taille",
        rotationText: "Rotation"
    },
    "gxp.QueryPanel.prototype": {
        queryByLocationText: "Interrogation selon le lieu",
        currentTextText: "Mesure actuelle",
        queryByAttributesText: "Requ\u00eate par attributs",
        layerText: "Calque"
    },
    "gxp.RulePanel.prototype": {
        scaleSliderTemplate: "{scaleType} \u00e9chelle 1:{scale}",
        labelFeaturesText: "Label Caract\u00e9ristiques",
        advancedText: "Avanc\u00e9",
        limitByScaleText: "Limiter par l'\u00e9chelle",
        limitByConditionText: "Limiter par condition",
        symbolText: "Symbole",
        nameText: "Nom"
    },
    "gxp.ScaleLimitPanel.prototype": {
        scaleSliderTemplate: "{scaleType} \u00e9chelle 1:{scale}",
        maxScaleLimitText: "\u00c9chelle maximale"
    },
    "gxp.TextSymbolizer.prototype": {
        labelValuesText: "Label valeurs",
        haloText: "Halo",
        sizeText: "Taille"
    },
    "gxp.WMSLayerPanel.prototype": {
        aboutText: "A propos",
        titleText: "Titre",
        nameText: "Nom",
        descriptionText: "Description",
        displayText: "Affichage",
        opacityText: "Opacit\u00e9",
        formatText: "Format",
        transparentText: "Transparent",
        cacheText: "Cache",
        cacheFieldText: "Utiliser la version mise en cache",
        infoFormatText: "Info format",
        infoFormatEmptyText: "Choisissez un format"
    },
    "gxp.EmbedMapDialog.prototype": {
        publishMessage: "Votre carte est pr\u00eate \u00e0 \u00eatre publi\u00e9e sur le web. Il suffit de copier le code HTML suivant pour int\u00e9grer la carte dans votre site Web :",
        heightLabel: "Hauteur",
        widthLabel: "Largeur",
        mapSizeLabel: "Taille de la carte",
        miniSizeLabel: "Mini",
        smallSizeLabel: "Petit",
        premiumSizeLabel: "Premium",
        largeSizeLabel: "Large"
    },
    "gxp.LayerUploadPanel.prototype": {
        titleLabel: "Titre",
        titleEmptyText: "Titre de la couche",
        abstractLabel: "Description",
        abstractEmptyText: "Description couche",
        fileLabel: "Donn\u00e9es",
        fieldEmptyText: "Parcourir pour ...",
        uploadText: "Upload",
        waitMsgText: "Transfert de vos donn\u00e9es ...",
        invalidFileExtensionText: "L'extension du fichier doit \u00eatre : ",
        optionsText: "Options",
        workspaceLabel: "Espace de travail",
        workspaceEmptyText: "Espace de travail par d\u00e9faut",
        dataStoreLabel: "Magasin de donn\u00e9es",
        dataStoreEmptyText: "Create new store",
        defaultDataStoreEmptyText: "Magasin de donn\u00e9es par d\u00e9faut"
    },
    "gxp.NewSourceDialog.prototype": {
        title: "Ajouter un nouveau serveur...",
        cancelText: "Annuler",
        addServerText: "Ajouter un serveur",
        invalidURLText: "Indiquez l'URL valide d'un serveur WMS (e.g. http://example.com/geoserver/wms)",
        contactingServerText: "Interrogation du serveur..."
    },
    "gxp.ScaleOverlay.prototype": {
        zoomLevelText: "Niveau de zoom"
    }
});