
Ext.namespace("gxp");
gxp.util = {
    _uniqueNames: {},
    getOGCExceptionText: function (e) {
        var t;
        e && e.exceptions ? (t = [], Ext.each(e.exceptions, function (e) {
            Ext.each(e.texts, function (e) {
                t.push(e)
            })
        }), t = t.join("\n")) : t = "Unknown error (no exception report).";
        return t
    },
    dispatch: function (e, t, n) {
        function r() {
            ++o;
            o === s && t.call(n, u)
        }

        function i(t) {
            window.setTimeout(function () {
                e[t].apply(n, [r, u])
            })
        }
        for (var t = t || Ext.emptyFn, n = n || this, s = e.length, o = 0, u = {}, a = 0; a < s; ++a) i(a)
    },
    uniqueName: function (e, t) {
        var t = t || " ",
            n = RegExp(t + "[0-9]*$"),
            r = e.replace(n, ""),
            n = n.exec(e),
            n = void 0 !== this._uniqueNames[r] ? this._uniqueNames[r] : n instanceof Array ? Number(n[0]) : void 0,
            i = r;
        void 0 !== n && (n++, i += t + n);
        this._uniqueNames[r] = n || 0;
        return i
    },
    getAbsoluteUrl: function (e) {
        var t;
        Ext.isIE6 || Ext.isIE7 || Ext.isIE8 ? (t = document.createElement("<a href='" + e + "'/>"), t.style.display = "none", document.body.appendChild(t), t.href = t.href, document.body.removeChild(t)) : (t = document.createElement("a"), t.href = e);
        return t.href
    },
    throttle: function () {
        var e = function (e, t, n) {
            var r, i, s, o, u = function () {
                    e.apply(n || this, s);
                    r = (new Date).getTime()
                };
            return function () {
                i = (new Date).getTime() - r;
                s = arguments;
                clearTimeout(o);
                !r || i >= t ? u() : o = setTimeout(u, t - i)
            }
        };
        return function (t, n, r) {
            return e(t, n, r)
        }
    }(),
    md5: function () {
        function e(e) {
            return String.fromCharCode(e & 255) + String.fromCharCode(e >>> 8 & 255) + String.fromCharCode(e >>> 16 & 255) + String.fromCharCode(e >>> 24 & 255)
        }

        function t(e) {
            for (; 0 > e;) e += 4294967296;
            for (; 4294967295 < e;) e -= 4294967296;
            return e
        }
        var n = [0, 3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426, 2821735955, 4249261313, 1770035416, 2336552879, 4294925233, 2304563134, 1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664, 643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448, 568446438, 3275163606, 4107603335, 1163531501, 2850285829, 4243563512, 1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740, 2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074, 3572445317, 76029189, 3654602809, 3873151461, 530742520, 3299628645, 4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690, 4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649, 4149444226, 3174756917, 718787259, 3951481745],
            r = [
                [
                    function (e, t, n) {
                        return e & t | ~e & n
                    },
                    [
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
                [
                    function (e, t, n) {
                        return e & n | t & ~n
                    },
                    [
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
                [
                    function (e, t, n) {
                        return e ^ t ^ n
                    },
                    [
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
                [
                    function (e, t, n) {
                        return t ^ (e | ~n)
                    },
                    [
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
        return function (i) {
            var s, o, u, a, f, l, c, h, p, d, v;
            s = [1732584193, 4023233417, 2562383102, 271733878];
            o = i.length;
            u = o & 63;
            a = 56 > u ? 56 - u : 120 - u;
            if (0 < a) {
                i += "";
                for (u = 0; u < a - 1; u++) i += "\0"
            }
            i += e(8 * o);
            i += e(0);
            o += a + 8;
            a = [0, 1, 2, 3];
            f = [16];
            l = [4];
            for (d = 0; d < o; d += 64) {
                for (u = 0, p = d; 16 > u; u++, p += 4) f[u] = i.charCodeAt(p) | i.charCodeAt(p + 1) << 8 | i.charCodeAt(p + 2) << 16 | i.charCodeAt(p + 3) << 24;
                for (u = 0; 4 > u; u++) l[u] = s[u];
                for (u = 0; 4 > u; u++) {
                    c = r[u][0];
                    h = r[u][1];
                    for (p = 0; 16 > p; p++) {
                        v = f;
                        var m = l,
                            g = h[p],
                            y = void 0,
                            b = void 0,
                            w = void 0,
                            E = void 0,
                            S = void 0,
                            x = void 0,
                            T = void 0,
                            w = S = void 0,
                            y = a[0],
                            b = a[1],
                            w = a[2],
                            E = a[3],
                            S = g[0],
                            x = g[1],
                            T = g[2],
                            w = c(m[b], m[w], m[E]),
                            S = m[y] + w + v[S] + n[T],
                            S = t(S),
                            S = S << x | S >>> 32 - x,
                            S = S + m[b];
                        m[y] = t(S);
                        v = a[0];
                        a[0] = a[3];
                        a[3] = a[2];
                        a[2] = a[1];
                        a[1] = v
                    }
                }
                for (u = 0; 4 > u; u++) s[u] += l[u], s[u] = t(s[u])
            }
            u = e(s[0]) + e(s[1]) + e(s[2]) + e(s[3]);
            s = "";
            for (i = 0; 16 > i; i++) o = u.charCodeAt(i), s += "0123456789abcdef".charAt(o >> 4 & 15), s += "0123456789abcdef".charAt(o & 15);
            return s
        }
    }()
};
Ext.namespace("gxp.plugins");
gxp.plugins.LayerSource = Ext.extend(Ext.util.Observable, {
    store: null,
    lazy: !1,
    hidden: !1,
    title: "",
    constructor: function (e) {
        this.initialConfig = e;
        Ext.apply(this, e);
        this.addEvents("ready", "failure");
        gxp.plugins.LayerSource.superclass.constructor.apply(this, arguments)
    },
    init: function (e) {
        this.target = e;
        this.createStore()
    },
    getMapProjection: function () {
        var e = this.target.mapPanel.map.projection;
        return this.target.mapPanel.map.getProjectionObject() || e && new OpenLayers.Projection(e) || new OpenLayers.Projection("EPSG:4326")
    },
    getProjection: function (e) {
        var e = e.getLayer(),
            t = this.getMapProjection();
        return (e.projection ? e.projection instanceof OpenLayers.Projection ? e.projection : new OpenLayers.Projection(e.projection) : t).equals(t) ? t : null
    },
    createStore: function () {
        this.fireEvent("ready", this)
    },
    createLayerRecord: function () {},
    getConfigForRecord: function (e) {
        var t = e.getLayer();
        return {
            source: e.get("source"),
            name: e.get("name"),
            title: e.get("title"),
            visibility: t.getVisibility(),
            opacity: t.opacity || void 0,
            group: e.get("group"),
            fixed: e.get("fixed"),
            selected: e.get("selected")
        }
    },
    getState: function () {
        return Ext.apply({}, this.initialConfig)
    }
});
(function () {
    function e(e) {
        var t = this.meta.format;
        if ("string" === typeof e || e.nodeType) {
            var e = t.read(e),
                n = t.read;
            t.read = function () {
                t.read = n;
                return e
            }
        }
        this.raw = e
    }
    Ext.intercept(GeoExt.data.WMSCapabilitiesReader.prototype, "readRecords", e);
    GeoExt.data.AttributeReader && Ext.intercept(GeoExt.data.AttributeReader.prototype, "readRecords", e)
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
    constructor: function (e) {
        if (e && !0 === e.forceLazy) e.requiredProperties = [], delete e.forceLazy, window.console && console.warn("Deprecated config option 'forceLazy: true' for layer source '" + e.id + "'. Use 'requiredProperties: []' instead.");
        gxp.plugins.WMSSource.superclass.constructor.apply(this, arguments);
        if (!this.format) this.format = new OpenLayers.Format.WMSCapabilities({
            keepData: !0
        })
    },
    init: function (e) {
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
        var e = !0,
            t = this.target.initialConfig.map;
        if (t && t.layers)
            for (var n, r = 0, i = t.layers.length; r < i && !(n = t.layers[r], n.source === this.id && (e = this.layerConfigComplete(n), !1 === e)); ++r);
        return e
    },
    layerConfigComplete: function (e) {
        var t = !0;
        if (!Ext.isObject(e.capability))
            for (var n = this.requiredProperties, r = n.length - 1; 0 <= r && !(t = !! e[n[r]], !1 === t); --r);
        return t
    },
    createStore: function () {
        var e = this.baseParams || {
            SERVICE: "WMS",
            REQUEST: "GetCapabilities"
        };
        if (this.version) e.VERSION = this.version;
        var t = this.isLazy();
        this.store = new GeoExt.data.WMSCapabilitiesStore({
            url: this.trimUrl(this.url, e),
            baseParams: e,
            format: this.format,
            autoLoad: !t,
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
                exception: function (e, t, n, r, i, s) {
                    delete this.store;
                    e = "";
                    "response" === t ? "string" == typeof s ? t = s : (t = "Invalid response from server.", (e = this.format && this.format.data) && e.parseError && (t += "  " + e.parseError.reason + " - line: " + e.parseError.line), i = i.status, e = 200 <= i && 300 > i ? gxp.util.getOGCExceptionText(s && s.arg && s.arg.exceptionReport) : "Status: " + i) : (t = "Trouble creating layer store from response.", e = "Unable to handle response.");
                    this.fireEvent("failure", this, t, e);
                    delete this.format.data
                },
                scope: this
            }
        });
        if (t) this.lazy = !0, Ext.Ajax.request({
            method: "GET",
            url: this.url,
            params: {
                SERVICE: "WMS"
            },
            callback: function (e, t, n) {
                e = n.status;
                200 <= e && 403 > e && n.responseText ? (this.ready = !0, this.fireEvent("ready", this)) : this.fireEvent("failure", this, "Layer source not available.", "Unable to contact WMS service.")
            },
            scope: this
        })
    },
    trimUrl: function (e, t) {
        var n = OpenLayers.Util.getParameters(e),
            t = OpenLayers.Util.upperCaseObject(t),
            r = 0,
            i;
        for (i in n)++r, i.toUpperCase() in t && (--r, delete n[i]);
        return e.split("?").shift() + (r ? "?" + OpenLayers.Util.getParameterString(n) : "")
    },
    createLazyLayerRecord: function (e) {
        var e = Ext.apply({}, e),
            t = e.srs || this.target.map.projection;
        e.srs = {};
        e.srs[t] = !0;
        var n = e.bbox || this.target.map.maxExtent || OpenLayers.Projection.defaults[t].maxExtent;
        e.bbox = {};
        e.bbox[t] = {
            bbox: n
        };
        n = this.store && this.store instanceof GeoExt.data.WMSCapabilitiesStore ? new this.store.recordType(e) : new GeoExt.data.LayerRecord(e);
        n.setLayer(new OpenLayers.Layer.WMS(e.title || e.name, e.url || this.url, {
            layers: e.name,
            transparent: "transparent" in e ? e.transparent : !0,
            cql_filter: e.cql_filter,
            format: e.format
        }, {
            projection: t
        }));
        n.json = e;
        return n
    },
    createLayerRecord: function (e) {
        var t, n, r = this.store.findExact("name", e.name); - 1 < r ? n = this.store.getAt(r) : Ext.isObject(e.capability) ? n = this.store.reader.readRecords({
            capability: {
                request: {
                    getmap: {
                        href: this.trimUrl(this.url, this.baseParams)
                    }
                },
                layers: [e.capability]
            }
        }).records[0] : this.layerConfigComplete(e) && (n = this.createLazyLayerRecord(e));
        if (n) {
            t = n.getLayer().clone();
            var r = this.getMapProjection(),
                i = this.getProjection(n),
                s = (i || r).getCode(),
                o = n.get("bbox"),
                u;
            if (o && o[s]) t.addOptions({
                projection: i
            }), u = OpenLayers.Bounds.fromArray(o[s].bbox, t.reverseAxisOrder());
            else if (i = n.get("llbbox")) r = OpenLayers.Bounds.fromArray(i).transform("EPSG:4326", r), 0 < 1 / r.getHeight() && 0 < 1 / r.getWidth() && (u = r);
            t.mergeNewParams({
                STYLES: e.styles,
                FORMAT: e.format,
                TRANSPARENT: e.transparent,
                CQL_FILTER: e.cql_filter
            });
            r = !1;
            "tiled" in e ? r = !e.tiled : n.data.dimensions && n.data.dimensions.time && (r = !0);
            t.setName(e.title || t.name);
            t.addOptions({
                attribution: t.attribution,
                maxExtent: u,
                restrictedExtent: u,
                singleTile: r,
                ratio: e.ratio || 1,
                visibility: "visibility" in e ? e.visibility : !0,
                opacity: "opacity" in e ? e.opacity : 1,
                buffer: "buffer" in e ? e.buffer : 1,
                dimensions: n.data.dimensions,
                transitionEffect: r ? "resize" : null,
                minScale: e.minscale,
                maxScale: e.maxscale
            });
            u = Ext.applyIf({
                title: t.name,
                group: e.group,
                infoFormat: e.infoFormat,
                source: e.source,
                properties: "gxp_wmslayerpanel",
                fixed: e.fixed,
                selected: "selected" in e ? e.selected : !1,
                restUrl: this.restUrl,
                layer: t
            }, n.data);
            var a = [{
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
            }];
            n.fields.each(function (e) {
                a.push(e)
            });
            t = new(GeoExt.data.LayerRecord.create(a))(u, t.id);
            t.json = e
        } else window.console && 0 < this.store.getCount() && void 0 !== e.name && console.warn("Could not create layer record for layer '" + e.name + "'. Check if the layer is found in the WMS GetCapabilities response.");
        return t
    },
    getProjection: function (e) {
        var t = this.getMapProjection(),
            n = t,
            e = e.get("srs");
        if (!e[t.getCode()]) {
            var n = null,
                r, i;
            for (i in e)
                if ((r = new OpenLayers.Projection(i)).equals(t)) {
                    n = r;
                    break
                }
        }
        return n
    },
    initDescribeLayerStore: function () {
        var e = this.store.reader.raw;
        this.lazy && (e = {
            capability: {
                request: {
                    describelayer: {
                        href: this.url
                    }
                }
            },
            version: this.version || "1.1.1"
        });
        var t = e.capability.request.describelayer;
        if (t) e = e.version, 1.1 < parseFloat(e) && (e = "1.1.1"), e = {
            SERVICE: "WMS",
            VERSION: e,
            REQUEST: "DescribeLayer"
        }, this.describeLayerStore = new GeoExt.data.WMSDescribeLayerStore({
            url: this.trimUrl(t.href, e),
            baseParams: e
        })
    },
    describeLayer: function (e, t, n) {
        function r(e) {
            window.setTimeout(function () {
                t.call(n, e)
            }, 0)
        }
        this.describeLayerStore || this.initDescribeLayerStore();
        if (this.describeLayerStore) {
            if (!this.describedLayers) this.describedLayers = {};
            var i = e.getLayer().params.LAYERS,
                e = function () {
                    for (var e = Ext.isArray(arguments[1]) ? arguments[1] : arguments[0], r, o, u = e.length - 1; 0 <= u; u--) {
                        r = e[u];
                        o = r.get("layerName");
                        if (o == i) {
                            this.describeLayerStore.un("load", arguments.callee, this);
                            this.describedLayers[o] = !0;
                            t.call(n, r);
                            return
                        }
                        "function" == typeof this.describedLayers[o] && (r = this.describedLayers[o], this.describeLayerStore.un("load", r, this), r.apply(this, arguments))
                    }
                    delete s[i];
                    t.call(n, !1)
                }, s = this.describedLayers,
                o;
            if (s[i])
                if (-1 == (o = this.describeLayerStore.findExact("layerName", i))) this.describeLayerStore.on("load", e, this);
                else r(this.describeLayerStore.getAt(o));
                else s[i] = e, this.describeLayerStore.load({
                    params: {
                        LAYERS: i
                    },
                    add: !0,
                    callback: e,
                    scope: this
                })
        } else r(!1)
    },
    fetchSchema: function (e, t, n, r) {
        var i = this.schemaCache[t];
        if (i)
            if (0 == i.getCount()) i.on("load", function () {
                n.call(r, i)
            }, this, {
                single: !0
            });
            else n.call(r, i);
            else i = new GeoExt.data.AttributeStore({
                url: e,
                baseParams: {
                    SERVICE: "WFS",
                    VERSION: "1.1.0",
                    REQUEST: "DescribeFeatureType",
                    TYPENAME: t
                },
                autoLoad: !0,
                listeners: {
                    load: function () {
                        n.call(r, i)
                    },
                    scope: this
                }
            }), this.schemaCache[t] = i
    },
    getSchema: function (e, t, n) {
        if (!this.schemaCache) this.schemaCache = {};
        this.describeLayer(e, function (r) {
            if (r && "WFS" == r.get("owsType")) {
                var i = r.get("typeName");
                this.fetchSchema(r.get("owsURL"), i, t, n)
            } else r ? t.call(n, !1) : this.fetchSchema(this.url, e.get("name"), t, n)
        }, this)
    },
    getWFSProtocol: function (e, t, n) {
        this.getSchema(e, function (r) {
            var i = !1;
            if (r) {
                var s, o = /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/;
                r.each(function (e) {
                    o.exec(e.get("type")) && (s = e.get("name"))
                }, this);
                i = new OpenLayers.Protocol.WFS({
                    version: "1.1.0",
                    srsName: e.getLayer().projection.getCode(),
                    url: r.url,
                    featureType: r.reader.raw.featureTypes[0].typeName,
                    featureNS: r.reader.raw.targetNamespace,
                    geometryName: s
                })
            }
            t.call(n, i, r, e)
        }, this)
    },
    getConfigForRecord: function (e) {
        var t = Ext.applyIf(gxp.plugins.WMSSource.superclass.getConfigForRecord.apply(this, arguments), e.json),
            n = e.getLayer(),
            r = n.params,
            i = n.options,
            s = t.name,
            o = this.store.reader.raw;
        if (o)
            for (var o = o.capability.layers, u = o.length - 1; 0 <= u; --u)
                if (o[u].name === s) {
                    t.capability = Ext.apply({}, o[u]);
                    s = {};
                    s[n.projection.getCode()] = !0;
                    t.capability.srs = s;
                    break
                }
        if (!t.capability) {
            if (n.maxExtent) t.bbox = n.maxExtent.toArray();
            t.srs = n.projection.getCode()
        }
        return Ext.apply(t, {
            format: r.FORMAT,
            styles: r.STYLES,
            transparent: r.TRANSPARENT,
            cql_filter: r.CQL_FILTER,
            minscale: i.minScale,
            maxscale: i.maxScale,
            infoFormat: e.get("infoFormat")
        })
    },
    getState: function () {
        var e = gxp.plugins.WMSSource.superclass.getState.apply(this, arguments);
        return Ext.applyIf(e, {
            title: this.title
        })
    }
});
Ext.preg(gxp.plugins.WMSSource.prototype.ptype, gxp.plugins.WMSSource);
Ext.namespace("gxp.plugins");
gxp.plugins.WMSCSource = Ext.extend(gxp.plugins.WMSSource, {
    ptype: "gxp_wmscsource",
    version: "1.1.1",
    constructor: function (e) {
        e.baseParams = {
            SERVICE: "WMS",
            REQUEST: "GetCapabilities",
            TILED: !0
        };
        if (!e.format) this.format = new OpenLayers.Format.WMSCapabilities({
            keepData: !0,
            profile: "WMSC"
        });
        gxp.plugins.WMSCSource.superclass.constructor.apply(this, arguments)
    },
    createLayerRecord: function (e) {
        var t = gxp.plugins.WMSCSource.superclass.createLayerRecord.apply(this, arguments);
        if (t) {
            var n, r;
            if (this.store.reader.raw) n = this.store.reader.raw.capability;
            var i = n && n.vendorSpecific ? n.vendorSpecific.tileSets : e.capability && e.capability.tileSets;
            n = t.get("layer");
            if (i)
                for (var s = this.getProjection(t) || this.getMapProjection(), o = 0, u = i.length; o < u; o++) {
                    var a = i[o];
                    if (a.layers === n.params.LAYERS) {
                        var f;
                        for (r in a.srs) {
                            f = new OpenLayers.Projection(r);
                            break
                        }
                        if (s.equals(f)) {
                            r = a.bbox[r].bbox;
                            n.projection = f;
                            n.addOptions({
                                resolutions: a.resolutions,
                                tileSize: new OpenLayers.Size(a.width, a.height),
                                tileOrigin: new OpenLayers.LonLat(r[0], r[1])
                            });
                            break
                        }
                    }
                } else if (this.lazy && (f = e.tileSize, r = e.tileOrigin, n.addOptions({
                    resolutions: e.resolutions,
                    tileSize: f ? new OpenLayers.Size(f[0], f[1]) : void 0,
                    tileOrigin: r ? OpenLayers.LonLat.fromArray(r) : void 0
                }), !r && (this.target.map.maxExtent ? f = this.target.map.maxExtent : (r = e.srs || this.target.map.projection, f = OpenLayers.Projection.defaults[r].maxExtent), f))) n.tileOrigin = OpenLayers.LonLat.fromArray(f);
            n.params.TILED = !1 !== e.cached && !0;
            return t
        }
    },
    getConfigForRecord: function (e) {
        var t = gxp.plugins.WMSCSource.superclass.getConfigForRecord.apply(this, arguments),
            n = t.name,
            r, i = e.getLayer();
        if (t.capability && this.store.reader.raw) {
            r = this.store.reader.raw.capability;
            var s = r.vendorSpecific && r.vendorSpecific.tileSets;
            if (s)
                for (var o = s.length - 1; 0 <= o; --o)
                    if (r = s[o], r.layers === n && r.srs[i.projection]) {
                        t.capability.tileSets = [r];
                        break
                    }
        }
        if (!t.capability || !t.capability.tileSets) {
            if (n = i.options.tileSize) t.tileSize = [n.w, n.h];
            t.tileOrigin = i.options.tileOrigin;
            t.resolutions = i.options.resolutions
        }
        return Ext.applyIf(t, {
            cached: !! i.params.TILED
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
        var e = [new OpenLayers.Layer.Bing({
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
        }), new OpenLayers.Layer.Bing({
            key: this.apiKey,
            name: this.labeledAerialTitle,
            type: "AerialWithLabels",
            buffer: 1,
            transitionEffect: "resize"
        })];
        this.store = new GeoExt.data.LayerStore({
            layers: e,
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
            }]
        });
        this.store.each(function (e) {
            e.set("group", "background")
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function (e) {
        var t, n = this.store.findExact("name", e.name);
        if (-1 < n) {
            t = this.store.getAt(n).copy(Ext.data.Record.id({}));
            n = t.getLayer().clone();
            e.title && (n.setName(e.title), t.set("title", e.title));
            if ("visibility" in e) n.visibility = e.visibility;
            t.set("selected", e.selected || !1);
            t.set("source", e.source);
            t.set("name", e.name);
            "group" in e && t.set("group", e.group);
            t.data.layer = n;
            t.commit()
        }
        return t
    }
});
Ext.preg(gxp.plugins.BingSource.prototype.ptype, gxp.plugins.BingSource);
Ext.namespace("gxp.plugins");
gxp.plugins.GoogleSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_googlesource",
    timeout: 7e3,
    title: "Google Layers",
    roadmapAbstract: "Show street map",
    satelliteAbstract: "Show satellite imagery",
    hybridAbstract: "Show imagery with street names",
    terrainAbstract: "Show street map with terrain",
    otherParams: "sensor=false",
    constructor: function (e) {
        this.config = e;
        gxp.plugins.GoogleSource.superclass.constructor.apply(this, arguments)
    },
    createStore: function () {
        gxp.plugins.GoogleSource.loader.onLoad({
            otherParams: this.otherParams,
            timeout: this.timeout,
            callback: this.syncCreateStore,
            errback: function () {
                delete this.store;
                this.fireEvent("failure", this, "The Google Maps script failed to load within the provided timeout (" + this.timeout / 1e3 + " s).")
            },
            scope: this
        })
    },
    syncCreateStore: function () {
        var e = {
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
        }, t = [],
            n, r;
        for (n in e) r = google.maps.MapTypeId[n], t.push(new OpenLayers.Layer.Google("Google " + r.replace(/\w/, function (e) {
            return e.toUpperCase()
        }), {
            type: r,
            typeName: n,
            MAX_ZOOM_LEVEL: e[n].MAX_ZOOM_LEVEL,
            maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
            restrictedExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
            projection: this.projection
        }));
        this.store = new GeoExt.data.LayerStore({
            layers: t,
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
            }]
        });
        this.store.each(function (t) {
            t.set("abstract", e[t.get("name")]["abstract"])
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function (e) {
        var t, n = function (t) {
                return t.get("name") === e.name
            };
        if (-1 == this.target.mapPanel.layers.findBy(n)) {
            t = this.store.getAt(this.store.findBy(n)).clone();
            n = t.getLayer();
            e.title && (n.setName(e.title), t.set("title", e.title));
            if ("visibility" in e) n.visibility = e.visibility;
            t.set("selected", e.selected || !1);
            t.set("source", e.source);
            t.set("name", e.name);
            "group" in e && t.set("group", e.group);
            t.commit()
        }
        return t
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
        var e = gxp.plugins.GoogleSource.loader;
        if (!e.ready) e.ready = !0, e.loading = !1, e.fireEvent("ready")
    },
    onLoad: function (e) {
        if (this.ready) window.setTimeout(function () {
            e.callback.call(e.scope)
        }, 0);
        else if (this.loading) this.on({
            ready: e.callback,
            failure: e.errback || Ext.emptyFn,
            scope: e.scope
        });
        else this.loadScript(e)
    },
    loadScript: function (e) {
        function t() {
            document.getElementsByTagName("head")[0].appendChild(r)
        }
        var n = {
            autoload: Ext.encode({
                modules: [{
                    name: "maps",
                    version: 3.3,
                    nocss: "true",
                    callback: "gxp.plugins.GoogleSource.loader.onScriptLoad",
                    other_params: e.otherParams
                }]
            })
        }, r = document.createElement("script");
        r.src = "http://www.google.com/jsapi?" + Ext.urlEncode(n);
        var i = e.errback || Ext.emptyFn,
            n = e.timeout || gxp.plugins.GoogleSource.prototype.timeout;
        window.setTimeout(function () {
            if (!gxp.plugins.GoogleSource.loader.ready) this.ready = this.loading = !1, document.getElementsByTagName("head")[0].removeChild(r), i.call(e.scope), this.fireEvent("failure"), this.purgeListeners()
        }.createDelegate(this), n);
        this.on({
            ready: e.callback,
            scope: e.scope
        });
        this.loading = !0;
        if (document.body) t();
        else Ext.onReady(t)
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
        for (var e = {
            projection: "EPSG:900913",
            numZoomLevels: 19,
            serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, .5971642833948135],
            buffer: 1
        }, t = [{
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
            }], n = t.length, r = Array(n), i, s = 0; s < n; ++s) i = t[s], r[s] = new OpenLayers.Layer.TMS(this[OpenLayers.String.camelize(i.name) + "Title"], ["http://a.tiles.mapbox.com/mapbox/", "http://b.tiles.mapbox.com/mapbox/", "http://c.tiles.mapbox.com/mapbox/", "http://d.tiles.mapbox.com/mapbox/"], OpenLayers.Util.applyDefaults({
            attribution: /^world/.test(name) ? "<a href='http://mapbox.com'>MapBox</a> | Some Data © OSM CC-BY-SA | <a href='http://mapbox.com/tos'>Terms of Service</a>" : "<a href='http://mapbox.com'>MapBox</a> | <a href='http://mapbox.com/tos'>Terms of Service</a>",
            type: "png",
            tileOrigin: new OpenLayers.LonLat(-20037508.34, -20037508.34),
            layername: i.name,
            "abstract": '<div class="thumb-mapbox thumb-mapbox-' + i.name + '"></div>',
            numZoomLevels: i.numZoomLevels
        }, e));
        this.store = new GeoExt.data.LayerStore({
            layers: r,
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
            }]
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function (e) {
        var t, n = this.store.findExact("name", e.name);
        if (-1 < n) {
            t = this.store.getAt(n).copy(Ext.data.Record.id({}));
            n = t.getLayer().clone();
            e.title && (n.setName(e.title), t.set("title", e.title));
            if ("visibility" in e) n.visibility = e.visibility;
            t.set("selected", e.selected || !1);
            t.set("source", e.source);
            t.set("name", e.name);
            "group" in e && t.set("group", e.group);
            t.data.layer = n;
            t.commit()
        }
        return t
    }
});
Ext.preg(gxp.plugins.MapBoxSource.prototype.ptype, gxp.plugins.MapBoxSource);
Ext.namespace("gxp.plugins");
gxp.plugins.TileStreamSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_tilestreamsource",
    title: "GEM Tile Stream Layers",
    hazardMapPointsWorldTitle: "World Hazard Map PGA_0.1",
    hazardMapJapan21Title: "Japan Hazard Map - 10% in 50 years",
    hazardMapJapan21LandTitle: "Japan Hazard Map - 10% in 50 years - Land",
    hazardMapJapan21ContourLandTitle: "Japan Hazard Map - 10% in 50 years - Contour",
    hazardMapJapan22Title: "Japan Hazard Map - 2% in 50 years",
    hazardMapJapan22LandTitle: "Japan Hazard Map - 2% in 50 years - Land",
    hazardMapJapan22ContourLandTitle: "Japan Hazard Map - 2% in 50 years - Contour",
    gdalCustomUrbanTitle: "GDAL Urban Population",
    gdalCustomRuralTitle: "GDAL Rural Population",
    strainTitle: "Geodetic Strain",
    createStore: function () {
        var e = {
            sphericalMercator: true,
            wrapDateLine: true,
            numZoomLevels: 7
        };
        var t = [{
            name: "hazard-map-points-world",
            numZoomLevels: 7
        }, {
            name: "hazard-map-japan-21",
            numZoomLevels: 8
        }, {
            name: "hazard-map-japan-21-land",
            numZoomLevels: 8
        }, {
            name: "hazard-map-japan-21-contour-land",
            numZoomLevels: 8
        }, {
            name: "hazard-map-japan-22",
            numZoomLevels: 8
        }, {
            name: "hazard-map-japan-22-land",
            numZoomLevels: 8
        }, {
            name: "hazard-map-japan-22-contour-land",
            numZoomLevels: 8
        }, {
            name: "gdal-custom-urban",
            numZoomLevels: 7
        }, {
            name: "gdal-custom-rural",
            numZoomLevels: 7
        }, {
            name: "strain",
            numZoomLevels: 9
        }];
        var n = t.length;
        var r = new Array(n);
        var i;
        for (var s = 0; s < n; ++s) {
            i = t[s];
            r[s] = new OpenLayers.Layer.XYZ(this[OpenLayers.String.camelize(i.name) + "Title"], ["http://tilestream.openquake.org:8000/v2/" + i.name + "/${z}/${x}/${y}.png"], OpenLayers.Util.applyDefaults({
                layername: i.name,
                numZoomLevels: i.numZoomLevels
            }, e))
        }
        this.store = new GeoExt.data.LayerStore({
            layers: r,
            fields: [{
                name: "source",
                type: "string"
            }, {
                name: "name",
                type: "string",
                mapping: "layername"
            }, {
                name: "group",
                type: "string"
            }, {
                name: "fixed",
                type: "boolean"
            }, {
                name: "selected",
                type: "boolean"
            }]
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function (e) {
        var t;
        var n = this.store.findExact("name", e.name);
        if (n > -1) {
            t = this.store.getAt(n).copy(Ext.data.Record.id({}));
            var r = t.getLayer().clone();
            if (e.title) {
                r.setName(e.title);
                t.set("title", e.title)
            }
            if ("visibility" in e) {
                r.visibility = e.visibility
            }
            t.set("selected", e.selected || false);
            t.set("source", e.source);
            t.set("name", e.name);
            if ("group" in e) {
                t.set("group", e.group)
            }
            t.data.layer = r;
            t.commit()
        }
        return t
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
        var e = {
            projection: "EPSG:900913",
            maxExtent: new OpenLayers.Bounds(-20037508.3392, -20037508.3392, 20037508.3392, 20037508.3392),
            maxResolution: 156543.03390625,
            numZoomLevels: 19,
            units: "m",
            buffer: 1,
            transitionEffect: "resize",
            tileOptions: {
                crossOriginKeyword: null
            }
        }, e = [new OpenLayers.Layer.OSM(this.osmTitle, ["http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"], OpenLayers.Util.applyDefaults({
                attribution: this.osmAttribution,
                type: "osm"
            }, e)), new OpenLayers.Layer.OSM(this.naipTitle, ["http://oatile1.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile2.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile3.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile4.mqcdn.com/naip/${z}/${x}/${y}.png"], OpenLayers.Util.applyDefaults({
                attribution: this.naipAttribution,
                type: "naip"
            }, e))];
        this.store = new GeoExt.data.LayerStore({
            layers: e,
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
            }]
        });
        this.store.each(function (e) {
            e.set("group", "background")
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function (e) {
        var t, n = this.store.findExact("name", e.name);
        if (-1 < n) {
            t = this.store.getAt(n).copy(Ext.data.Record.id({}));
            n = t.getLayer().clone();
            e.title && (n.setName(e.title), t.set("title", e.title));
            if ("visibility" in e) n.visibility = e.visibility;
            t.set("selected", e.selected || !1);
            t.set("source", e.source);
            t.set("name", e.name);
            "group" in e && t.set("group", e.group);
            t.data.layer = n;
            t.commit()
        }
        return t
    }
});
Ext.preg(gxp.plugins.MapQuestSource.prototype.ptype, gxp.plugins.MapQuestSource);
Ext.namespace("gxp.plugins");
gxp.plugins.OLSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_olsource",
    createLayerRecord: function (e) {
        var t, n = window;
        t = e.type.split(".");
        for (var r = 0, i = t.length; r < i && !(n = n[t[r]], !n); ++r);
        if (n && n.prototype && n.prototype.initialize) {
            t = function () {
                n.prototype.initialize.apply(this, e.args)
            };
            t.prototype = n.prototype;
            t = new t;
            if ("visibility" in e) t.visibility = e.visibility;
            t = new(GeoExt.data.LayerRecord.create([{
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
            }]))({
                layer: t,
                title: t.name,
                name: e.name || t.name,
                source: e.source,
                group: e.group,
                fixed: "fixed" in e ? e.fixed : !1,
                selected: "selected" in e ? e.selected : !1,
                type: e.type,
                args: e.args,
                properties: "properties" in e ? e.properties : void 0
            }, t.id)
        } else throw Error("Cannot construct OpenLayers layer from given type: " + e.type);
        return t
    },
    getConfigForRecord: function (e) {
        var t = gxp.plugins.OLSource.superclass.getConfigForRecord.apply(this, arguments);
        e.getLayer();
        return Ext.apply(t, {
            type: e.get("type"),
            args: e.get("args")
        })
    }
});
Ext.preg(gxp.plugins.OLSource.prototype.ptype, gxp.plugins.OLSource);
Ext.namespace("gxp.plugins");
gxp.plugins.StyleWriter = Ext.extend(Ext.util.Observable, {
    deletedStyles: null,
    constructor: function (e) {
        this.initialConfig = e;
        Ext.apply(this, e);
        this.deletedStyles = [];
        gxp.plugins.StyleWriter.superclass.constructor.apply(this, arguments)
    },
    init: function (e) {
        this.target = e;
        e.stylesStore.on({
            remove: function (e, t) {
                var n = t.get("name");
                t.get("name") === n && this.deletedStyles.push(n)
            },
            scope: this
        });
        e.on({
            beforesaved: this.write,
            scope: this
        })
    },
    write: function (e) {
        e.stylesStore.commitChanges();
        e.fireEvent("saved", e, e.selectedStyle.get("name"))
    }
});
Ext.namespace("gxp.plugins");
gxp.plugins.GeoServerStyleWriter = Ext.extend(gxp.plugins.StyleWriter, {
    baseUrl: "/geoserver/rest",
    constructor: function (e) {
        this.initialConfig = e;
        Ext.apply(this, e);
        gxp.plugins.GeoServerStyleWriter.superclass.constructor.apply(this, arguments)
    },
    write: function (e) {
        delete this._failed;
        var e = e || {}, t = [],
            n = this.target.stylesStore;
        n.each(function (e) {
            (e.phantom || -1 !== n.modified.indexOf(e)) && this.writeStyle(e, t)
        }, this);
        var r = function () {
            var t = this.target;
            if (!0 !== this._failed) {
                this.deleteStyles();
                for (var n = this.target.stylesStore.getModifiedRecords(), r = n.length - 1; 0 <= r; --r) n[r].phantom = !1;
                t.stylesStore.commitChanges();
                e.success && e.success.call(e.scope);
                t.fireEvent("saved", t, t.selectedStyle.get("name"))
            } else t.fireEvent("savefailed", t, t.selectedStyle.get("name"))
        };
        0 < t.length ? gxp.util.dispatch(t, function () {
            this.assignStyles(e.defaultStyle, r)
        }, this) : this.assignStyles(e.defaultStyle, r)
    },
    writeStyle: function (e, t) {
        var n = e.get("userStyle").name;
        t.push(function (t) {
            Ext.Ajax.request({
                method: !0 === e.phantom ? "POST" : "PUT",
                url: this.baseUrl + "/styles" + (!0 === e.phantom ? "" : "/" + n + ".xml"),
                headers: {
                    "Content-Type": "application/vnd.ogc.sld+xml; charset=UTF-8"
                },
                xmlData: this.target.createSLD({
                    userStyles: [n]
                }),
                failure: function () {
                    this._failed = !0;
                    t.call(this)
                },
                success: !0 === e.phantom ? function () {
                    Ext.Ajax.request({
                        method: "POST",
                        url: this.baseUrl + "/layers/" + this.target.layerRecord.get("name") + "/styles.json",
                        jsonData: {
                            style: {
                                name: n
                            }
                        },
                        failure: function () {
                            this._failed = !0;
                            t.call(this)
                        },
                        success: t,
                        scope: this
                    })
                } : t,
                scope: this
            })
        })
    },
    assignStyles: function (e, t) {
        var n = [];
        this.target.stylesStore.each(function (t) {
            !e && !0 === t.get("userStyle").isDefault && (e = t.get("name"));
            t.get("name") !== e && -1 === this.deletedStyles.indexOf(t.id) && n.push({
                name: t.get("name")
            })
        }, this);
        Ext.Ajax.request({
            method: "PUT",
            url: this.baseUrl + "/layers/" + this.target.layerRecord.get("name") + ".json",
            jsonData: {
                layer: {
                    defaultStyle: {
                        name: e
                    },
                    styles: 0 < n.length ? {
                        style: n
                    } : {},
                    enabled: !0
                }
            },
            success: t,
            failure: function () {
                this._failed = !0;
                t.call(this)
            },
            scope: this
        })
    },
    deleteStyles: function () {
        for (var e = 0, t = this.deletedStyles.length; e < t; ++e) Ext.Ajax.request({
            method: "DELETE",
            url: this.baseUrl + "/styles/" + this.deletedStyles[e] + "?purge=true"
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
    constructor: function (e) {
        this.initialConfig = e || {};
        this.active = !1;
        Ext.apply(this, e);
        if (!this.id) this.id = Ext.id();
        this.output = [];
        this.addEvents("activate", "deactivate");
        gxp.plugins.Tool.superclass.constructor.apply(this, arguments)
    },
    init: function (e) {
        e.tools[this.id] = this;
        this.target = e;
        this.autoActivate && this.activate();
        this.target.on("portalready", this.addActions, this)
    },
    activate: function () {
        if (!1 === this.active) return this.active = !0, this.fireEvent("activate", this), !0
    },
    deactivate: function () {
        if (!0 === this.active) return this.active = !1, this.fireEvent("deactivate", this), !0
    },
    getContainer: function (e) {
        var t, n;
        t = e.split(".");
        if (n = t[0])
            if ("map" == n) e = this.target.mapPanel;
            else {
                if (e = Ext.getCmp(n) || this.target.portal[n], !e) throw Error("Can't find component with id: " + n)
            } else e = this.target.portal;
        if (t = 1 < t.length && t[1]) e = (n = {
            tbar: "getTopToolbar",
            bbar: "getBottomToolbar",
            fbar: "getFooterToolbar"
        }[t]) ? e[n]() : e[t];
        return e
    },
    addActions: function (e) {
        e = e || this.actions;
        if (!e || null === this.actionTarget) this.addOutput();
        else {
            var t = this.actionTarget instanceof Array ? this.actionTarget : [this.actionTarget],
                e = e instanceof Array ? e : [e],
                n, r, i, s, o, u, a = null;
            for (i = t.length - 1; 0 <= i; --i) {
                if (n = t[i]) {
                    if (n instanceof Object) a = n.index, n = n.target;
                    u = this.getContainer(n)
                }
                for (s = 0, o = e.length; s < o; ++s) {
                    if (!(e[s] instanceof Ext.Action || e[s] instanceof Ext.Component))
                        if ((r = Ext.getCmp(e[s])) && (e[s] = r), "string" != typeof e[s]) {
                            if (s == this.defaultAction) e[s].pressed = !0;
                            e[s] = new Ext.Action(e[s])
                        }
                    n = e[s];
                    if (s == this.defaultAction && n instanceof GeoExt.Action) n.isDisabled() ? n.activateOnEnable = !0 : n.control.activate();
                    if (u) {
                        this.showButtonText && n.setText(n.initialConfig.buttonText);
                        u instanceof Ext.menu.Menu ? n = Ext.apply(new Ext.menu.CheckItem(n), {
                            text: n.initialConfig.menuText,
                            group: n.initialConfig.toggleGroup,
                            groupClass: null
                        }) : u instanceof Ext.Toolbar || (n = new Ext.Button(n));
                        var f = null === a ? u.add(n) : u.insert(a, n);
                        n = n instanceof Ext.Button ? n : f;
                        null !== a && (a += 1);
                        if (null != this.outputAction && s == this.outputAction) n.on("click", function () {
                            r ? this.outputTarget ? r.show() : r.ownerCt.ownerCt.show() : r = this.addOutput()
                        }, this)
                    }
                }
                u && (u.isVisible() ? u.doLayout() : u instanceof Ext.menu.Menu || u.show())
            }
            return this.actions = e
        }
    },
    addOutput: function (e) {
        if (e || this.outputConfig) {
            var e = e || {}, t = this.outputTarget;
            t ? (t = this.getContainer(t), e instanceof Ext.Component || Ext.apply(e, this.outputConfig)) : (t = this.outputConfig || {}, t = (new Ext.Window(Ext.apply({
                hideBorders: !0,
                shadow: !1,
                closeAction: "hide",
                autoHeight: !t.height,
                layout: t.height ? "fit" : void 0,
                items: [{
                    defaults: Ext.applyIf({
                        autoHeight: !t.height && !(t.defaults && t.defaults.height)
                    }, t.defaults)
                }]
            }, t))).show().items.get(0));
            if (t) return e = t.add(e), e.on("removed", function (e) {
                this.output.remove(e)
            }, this, {
                single: !0
            }), e instanceof Ext.Window ? e.show() : t.doLayout(), this.output.push(e), e;
            e = this.ptype;
            window.console && console.error("Failed to create output for plugin with ptype: " + e)
        }
    },
    removeOutput: function () {
        for (var e, t = this.output.length - 1; 0 <= t; --t)
            if (e = this.output[t], this.outputTarget)
                if (e.ownerCt) {
                    if (e.ownerCt.remove(e), e.ownerCt instanceof Ext.Window) e.ownerCt[e.ownerCt.closeAction]()
                } else e.remove();
                else e.findParentBy(function (e) {
                    return e instanceof Ext.Window
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
        var e;
        this.popupCache = {};
        var t = gxp.plugins.WMSGetFeatureInfo.superclass.addActions.call(this, [{
            tooltip: this.infoActionTip,
            iconCls: "gxp-icon-getfeatureinfo",
            buttonText: this.buttonText,
            toggleGroup: this.toggleGroup,
            enableToggle: !0,
            allowDepress: !0,
            toggleHandler: function (t, n) {
                for (var r = 0, i = e.length; r < i; r++) n ? e[r].activate() : e[r].deactivate()
            }
        }]),
            n = this.actions[0].items[0];
        e = [];
        var r = function () {
            for (var t = this.target.mapPanel.layers.queryBy(function (e) {
                return e.get("queryable")
            }), r = this.target.mapPanel.map, i, s = 0, o = e.length; s < o; s++) i = e[s], i.deactivate(), i.destroy();
            e = [];
            t.each(function (t) {
                var i = t.getLayer(),
                    s = Ext.apply({}, this.vendorParams),
                    o;
                if (this.layerParams)
                    for (var u = this.layerParams.length - 1; 0 <= u; --u) o = this.layerParams[u].toUpperCase(), s[o] = i.params[o];
                var a = t.get("infoFormat");
                void 0 === a && (a = "html" == this.format ? "text/html" : "application/vnd.ogc.gml");
                i = new OpenLayers.Control.WMSGetFeatureInfo(Ext.applyIf({
                    url: i.url,
                    queryVisible: !0,
                    layers: [i],
                    infoFormat: a,
                    vendorParams: s,
                    eventListeners: {
                        getfeatureinfo: function (e) {
                            var n = t.get("title") || t.get("name");
                            if ("text/html" == a) {
                                var r = e.text.match(/<body[^>]*>([\s\S]*)<\/body>/);
                                r && !r[1].match(/^\s*$/) && this.displayPopup(e, n, r[1])
                            } else "text/plain" == a ? this.displayPopup(e, n, "<pre>" + e.text + "</pre>") : e.features && 0 < e.features.length && this.displayPopup(e, n)
                        },
                        scope: this
                    }
                }, this.controlOptions));
                r.addControl(i);
                e.push(i);
                n.pressed && i.activate()
            }, this)
        };
        this.target.mapPanel.layers.on("update", r, this);
        this.target.mapPanel.layers.on("add", r, this);
        this.target.mapPanel.layers.on("remove", r, this);
        return t
    },
    displayPopup: function (e, t, n) {
        var r, i = e.xy.x + "." + e.xy.y;
        i in this.popupCache ? r = this.popupCache[i] : (r = this.addOutput({
            xtype: "gx_popup",
            title: this.popupTitle,
            layout: "accordion",
            fill: !1,
            autoScroll: !0,
            location: e.xy,
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
                close: function (e) {
                    return function () {
                        delete this.popupCache[e]
                    }
                }(i),
                scope: this
            }
        }), this.popupCache[i] = r);
        e = e.features;
        i = [];
        if (!n && e)
            for (var s = 0, o = e.length; s < o; ++s) n = e[s], i.push(Ext.apply({
                xtype: "propertygrid",
                listeners: {
                    beforeedit: function () {
                        return !1
                    }
                },
                title: n.fid ? n.fid : t,
                source: n.attributes
            }, this.itemConfig));
        else n && i.push(Ext.apply({
            title: t,
            html: n
        }, this.itemConfig));
        r.add(i);
        r.doLayout()
    }
});
Ext.preg(gxp.plugins.WMSGetFeatureInfo.prototype.ptype, gxp.plugins.WMSGetFeatureInfo);
Ext.namespace("gxp.plugins");
gxp.plugins.WMSRasterStylesDialog = {
    isRaster: null,
    init: function (e) {
        Ext.apply(e, gxp.plugins.WMSRasterStylesDialog)
    },
    createRule: function () {
        var e = [new OpenLayers.Symbolizer[this.isRaster ? "Raster" : this.symbolType]];
        return new OpenLayers.Rule({
            symbolizers: e
        })
    },
    addRule: function () {
        var e = this.items.get(2).items.get(0);
        this.isRaster ? (e.rules.push(this.createPseudoRule()), 1 == e.rules.length && e.rules.push(this.createPseudoRule()), this.savePseudoRules()) : (this.selectedStyle.get("userStyle").rules.push(this.createRule()), e.update(), this.selectedStyle.store.afterEdit(this.selectedStyle));
        this.updateRuleRemoveButton()
    },
    removeRule: function () {
        if (this.isRaster) {
            var e = this.items.get(2).items.get(0),
                t = this.selectedRule;
            e.unselect();
            e.rules.remove(t);
            1 == e.rules.length && e.rules.remove(e.rules[0]);
            this.savePseudoRules()
        } else gxp.WMSStylesDialog.prototype.removeRule.apply(this, arguments)
    },
    duplicateRule: function () {
        var e = this.items.get(2).items.get(0);
        if (this.isRaster) e.rules.push(this.createPseudoRule({
            quantity: this.selectedRule.name,
            label: this.selectedRule.title,
            color: this.selectedRule.symbolizers[0].fillColor,
            opacity: this.selectedRule.symbolizers[0].fillOpacity
        })), this.savePseudoRules();
        else {
            var t = this.selectedRule.clone();
            t.name = gxp.util.uniqueName((t.title || t.name) + " (copy)");
            delete t.title;
            this.selectedStyle.get("userStyle").rules.push(t);
            e.update()
        }
        this.updateRuleRemoveButton()
    },
    editRule: function () {
        this.isRaster ? this.editPseudoRule() : gxp.WMSStylesDialog.prototype.editRule.apply(this, arguments)
    },
    editPseudoRule: function () {
        var e = this,
            t = this.selectedRule,
            n = new Ext.Window({
                title: "Color Map Entry: " + t.name,
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
                                    value: t.name,
                                    allowBlank: !1,
                                    fieldLabel: "Quantity",
                                    validator: function (n) {
                                        for (var r = e.items.get(2).items.get(0).rules, i = r.length - 1; 0 <= i; i--)
                                            if (t !== r[i] && r[i].name == n) return "Quantity " + n + " is already defined";
                                        return !0
                                    },
                                    listeners: {
                                        valid: function (e) {
                                            this.selectedRule.name = "" + e.getValue();
                                            this.savePseudoRules()
                                        },
                                        scope: this
                                    }
                                }]
                            }, {
                                layout: "form",
                                width: 130,
                                items: [{
                                    xtype: "textfield",
                                    fieldLabel: "Label",
                                    anchor: "95%",
                                    value: t.title,
                                    listeners: {
                                        valid: function (e) {
                                            this.selectedRule.title = e.getValue();
                                            this.savePseudoRules()
                                        },
                                        scope: this
                                    }
                                }]
                            }, {
                                layout: "form",
                                width: 70,
                                items: [new GeoExt.FeatureRenderer({
                                    symbolType: this.symbolType,
                                    symbolizers: [t.symbolizers[0]],
                                    isFormField: !0,
                                    fieldLabel: "Appearance"
                                })]
                            }]
                        }]
                    }, {
                        xtype: "gxp_polygonsymbolizer",
                        symbolizer: t.symbolizers[0],
                        bodyStyle: {
                            padding: "10px"
                        },
                        border: !1,
                        labelWidth: 70,
                        defaults: {
                            labelWidth: 70
                        },
                        listeners: {
                            change: function (e) {
                                var t = n.findByType(GeoExt.FeatureRenderer)[0];
                                t.setSymbolizers([e], {
                                    draw: t.rendered
                                });
                                this.selectedRule.symbolizers[0] = e;
                                this.savePseudoRules()
                            },
                            scope: this
                        }
                    }]
                }]
            }),
            r = n.findByType("gxp_strokesymbolizer")[0];
        r.ownerCt.remove(r);
        n.show()
    },
    savePseudoRules: function () {
        var e = this.selectedStyle,
            t = this.items.get(2).items.get(0),
            e = e.get("userStyle"),
            t = t.rules;
        t.sort(function (e, t) {
            var n = parseFloat(e.name),
                r = parseFloat(t.name);
            return n === r ? 0 : n < r ? -1 : 1
        });
        e = e.rules[0].symbolizers[0];
        e.colorMap = 0 < t.length ? Array(t.length) : void 0;
        for (var n, r = 0, i = t.length; r < i; ++r) n = t[r], e.colorMap[r] = {
            quantity: parseFloat(n.name),
            label: n.title || void 0,
            color: n.symbolizers[0].fillColor || void 0,
            opacity: !1 == n.symbolizers[0].fill ? 0 : n.symbolizers[0].fillOpacity
        };
        this.afterRuleChange(this.selectedRule)
    },
    createLegend: function (e, t) {
        var n = OpenLayers.Symbolizer.Raster;
        n && e[0] && e[0].symbolizers[0] instanceof n ? (this.getComponent("rulesfieldset").setTitle("Color Map Entries"), this.isRaster = !0, this.addRasterLegend(e, t)) : (this.isRaster = !1, this.addVectorLegend(e))
    },
    addRasterLegend: function (e, t) {
        for (var t = t || {}, n = e[0].symbolizers[0].colorMap || [], r = [], i = 0, s = n.length; i < s; i++) r.push(this.createPseudoRule(n[i]));
        this.selectedRule = null != t.selectedRuleIndex ? r[t.selectedRuleIndex] : null;
        return this.addVectorLegend(r, {
            symbolType: "Polygon",
            enableDD: !1
        })
    },
    createPseudoRule: function (e) {
        var t = -1;
        if (!e) {
            var n = this.items.get(2);
            if (n.items) {
                rules = n.items.get(0).rules;
                for (n = rules.length - 1; 0 <= n; n--) t = Math.max(t, parseFloat(rules[n].name))
            }
        }
        e = Ext.applyIf(e || {}, {
            quantity: ++t,
            color: "#000000",
            opacity: 1
        });
        return new OpenLayers.Rule({
            title: e.label,
            name: "" + e.quantity,
            symbolizers: [new OpenLayers.Symbolizer.Polygon({
                fillColor: e.color,
                fillOpacity: e.opacity,
                stroke: !1,
                fill: 0 !== e.opacity
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
    constructor: function (e) {
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
                var e = this.target.mapPanel.map,
                    t = "function" == typeof this.extent ? this.extent() : this.extent;
                if (!t)
                    for (var n, r = 0, i = e.layers.length; r < i; ++r) n = e.layers[r], n.getVisibility() && (n = n.restrictedExtent || n.maxExtent, t ? t.extend(n) : n && (t = n.clone()));
                t && ((r = e.restrictedExtent || e.maxExtent) && (t = new OpenLayers.Bounds(Math.max(t.left, r.left), Math.max(t.bottom, r.bottom), Math.min(t.right, r.right), Math.min(t.top, r.top))), e.zoomToExtent(t, this.closest))
            },
            scope: this
        }])
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
    constructor: function (e) {
        gxp.plugins.NavigationHistory.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        var e = new OpenLayers.Control.NavigationHistory;
        this.target.mapPanel.map.addControl(e);
        e = [new GeoExt.Action({
            menuText: this.previousMenuText,
            iconCls: "gxp-icon-zoom-previous",
            tooltip: this.previousTooltip,
            disabled: !0,
            control: e.previous
        }), new GeoExt.Action({
            menuText: this.nextMenuText,
            iconCls: "gxp-icon-zoom-next",
            tooltip: this.nextTooltip,
            disabled: !0,
            control: e.next
        })];
        return gxp.plugins.NavigationHistory.superclass.addActions.apply(this, [e])
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
    constructor: function (e) {
        gxp.plugins.Zoom.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        var e = [{
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
        }];
        this.showZoomBoxAction && e.unshift(new GeoExt.Action({
            menuText: this.zoomText,
            iconCls: "gxp-icon-zoom",
            tooltip: this.zoomTooltip,
            control: new OpenLayers.Control.ZoomBox(this.controlOptions),
            map: this.target.mapPanel.map,
            enableToggle: !0,
            allowDepress: !1,
            toggleGroup: this.toggleGroup
        }));
        return gxp.plugins.Zoom.superclass.addActions.apply(this, [e])
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
                specialkey: function (e, t) {
                    t.getKey() === t.ENTER && this.addServer()
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
        this.on("urlselected", function (e, t) {
            this.setLoading();
            this.addSource(t, this.hide, function () {
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
    urlValidator: function (e) {
        e = this.urlRegExp.test(e) ? !this.error || this.error : this.invalidURLText;
        this.error = null;
        return e
    },
    setLoading: function () {
        this.loadMask.show()
    },
    setError: function (e) {
        this.loadMask.hide();
        this.error = e;
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
    constructor: function (e) {
        this.addEvents("sourceselected");
        gxp.plugins.AddLayers.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        var e = {
            tooltip: this.addActionTip,
            text: this.addActionText,
            menuText: this.addActionMenuText,
            disabled: !0,
            iconCls: "gxp-icon-addlayers"
        }, t;
        if (this.initialConfig.search || this.uploadSource) {
            var n = [new Ext.menu.Item({
                iconCls: "gxp-icon-addlayers",
                text: this.addActionMenuText,
                handler: this.showCapabilitiesGrid,
                scope: this
            })];
            this.initialConfig.search && n.push(new Ext.menu.Item({
                iconCls: "gxp-icon-addlayers",
                text: this.findActionMenuText,
                handler: this.showCatalogueSearch,
                scope: this
            }));
            this.uploadSource && (t = this.createUploadButton(Ext.menu.Item)) && n.push(t);
            e = Ext.apply(e, {
                menu: new Ext.menu.Menu({
                    items: n
                })
            })
        } else e = Ext.apply(e, {
            handler: this.showCapabilitiesGrid,
            scope: this
        });
        var r = gxp.plugins.AddLayers.superclass.addActions.apply(this, [e]);
        this.target.on("ready", function () {
            if (this.uploadSource) {
                var e = this.target.layerSources[this.uploadSource];
                e ? this.setSelectedSource(e) : (delete this.uploadSource, t && t.hide())
            }
            r[0].enable()
        }, this);
        return r
    },
    showCatalogueSearch: function () {
        var e = this.initialConfig.search.selectedSource,
            t = {}, n;
        for (n in this.target.layerSources) {
            var r = this.target.layerSources[n];
            if (r instanceof gxp.plugins.CatalogueSource) {
                var i = {};
                i[n] = r;
                Ext.apply(t, i)
            }
        }
        e = gxp.plugins.AddLayers.superclass.addOutput.apply(this, [{
            sources: t,
            selectedSource: e,
            xtype: "gxp_cataloguesearchpanel",
            map: this.target.mapPanel.map,
            listeners: {
                addlayer: function (e, t, n) {
                    var e = this.target.layerSources[t],
                        r = OpenLayers.Bounds.fromArray(n.bbox),
                        i = this.target.mapPanel.map.getProjection(),
                        r = r.transform(n.srs, i);
                    n.srs = i;
                    n.bbox = r.toArray();
                    n.source = this.catalogSourceKey || t;
                    this.target.mapPanel.layers.add(e.createLayerRecord(n))
                },
                scope: this
            }
        }]);
        (t = e.findParentByType("window")) && t.center();
        return e
    },
    showCapabilitiesGrid: function () {
        this.capGrid ? this.capGrid instanceof Ext.Window || this.addOutput(this.capGrid) : this.initCapGrid();
        this.capGrid.show()
    },
    initCapGrid: function () {
        function e() {
            function e(e) {
                r && r.push(e);
                i--;
                0 === i && this.addLayers(r)
            }
            for (var t = this.selectedSource, n = u.getSelectionModel().getSelections(), r = [], i = n.length, s = 0, o = n.length; s < o; ++s) {
                var a = t.createLayerRecord({
                    name: n[s].get("name"),
                    source: t.id
                }, e, this);
                a && e.call(this, a)
            }
        }
        var t, n = [],
            r = this.target,
            i;
        for (i in r.layerSources) t = r.layerSources[i], t.store && !t.hidden && n.push([i, t.title || i, t.url]);
        var s = new Ext.data.ArrayStore({
            fields: ["id", "title", "url"],
            data: n
        });
        i = this.createExpander();
        var o = 0;
        null !== this.startSourceId && s.each(function (e) {
            e.get("id") === this.startSourceId && (o = s.indexOf(e))
        }, this);
        t = this.target.layerSources[n[o][0]];
        var u = new Ext.grid.GridPanel({
            store: t.store,
            autoScroll: !0,
            autoExpandColumn: "title",
            plugins: [i],
            loadMask: !0,
            colModel: new Ext.grid.ColumnModel([i, {
                id: "title",
                header: this.panelTitleText,
                dataIndex: "title",
                sortable: !0
            }, {
                header: "Id",
                dataIndex: "name",
                width: 120,
                sortable: !0
            }]),
            listeners: {
                rowdblclick: e,
                scope: this
            }
        }),
            a = new Ext.form.ComboBox({
                ref: "../sourceComboBox",
                width: 165,
                store: s,
                valueField: "id",
                displayField: "title",
                tpl: '<tpl for="."><div ext:qtip="{url}" class="x-combo-list-item">{title}</div></tpl>',
                triggerAction: "all",
                editable: !1,
                allowBlank: !1,
                forceSelection: !0,
                mode: "local",
                value: n[o][0],
                listeners: {
                    select: function (e, t) {
                        var n = t.get("id");
                        n === this.addServerId ? (l.outputTarget ? l.addOutput(f) : (new Ext.Window({
                            title: gxp.NewSourceDialog.prototype.title,
                            modal: !0,
                            hideBorders: !0,
                            width: 300,
                            items: f
                        })).show(), a.reset()) : (n = this.target.layerSources[n], u.reconfigure(n.store, u.getColumnModel()), u.getView().focusRow(0), this.setSelectedSource(n), function () {
                            e.triggerBlur();
                            e.el.blur()
                        }.defer(100))
                    },
                    focus: function (e) {
                        r.proxy && e.reset()
                    },
                    scope: this
                }
            });
        t = null;
        if (this.target.proxy || 1 < n.length) t = [new Ext.Toolbar.TextItem({
            text: this.layerSelectionText
        }), a];
        if (this.target.proxy) this.addServerId = Ext.id(), s.loadData([
            [this.addServerId, this.addServerText + "..."]
        ], !0);
        var f = {
            xtype: "gxp_newsourcedialog",
            header: !1,
            listeners: {
                hide: function (e) {
                    this.outputTarget || e.ownerCt.hide()
                },
                urlselected: function (e, t) {
                    e.setLoading();
                    this.target.addLayerSource({
                        config: {
                            url: t
                        },
                        callback: function (t) {
                            t = new s.recordType({
                                id: t,
                                title: this.target.layerSources[t].title || this.untitledText
                            });
                            s.insert(0, [t]);
                            a.onSelect(t, 0);
                            e.hide()
                        },
                        fallback: function (e, t) {
                            this.setError((new Ext.Template(this.addLayerSourceErrorText)).apply({
                                msg: t
                            }))
                        },
                        scope: this
                    })
                },
                scope: this
            }
        }, l = this;
        i = {
            xtype: "container",
            region: "center",
            layout: "fit",
            hideBorders: !0,
            items: [u]
        };
        this.instructionsText && i.items.push({
            xtype: "box",
            autoHeight: !0,
            autoEl: {
                tag: "p",
                cls: "x-form-item",
                style: "padding-left: 5px; padding-right: 5px"
            },
            html: this.instructionsText
        });
        var c = ["->", new Ext.Button({
            text: this.addButtonText,
            iconCls: "gxp-icon-addlayers",
            handler: e,
            scope: this
        }), new Ext.Button({
            text: this.doneText,
            handler: function () {
                this.capGrid.hide()
            },
            scope: this
        })],
            h;
        this.uploadSource || (h = this.createUploadButton()) && c.unshift(h);
        h = this.outputTarget ? Ext.Panel : Ext.Window;
        this.capGrid = new h(Ext.apply({
            title: this.availableLayersText,
            closeAction: "hide",
            layout: "border",
            height: 300,
            width: 315,
            modal: !0,
            items: i,
            tbar: t,
            bbar: c,
            listeners: {
                hide: function () {
                    u.getSelectionModel().clearSelections()
                },
                show: function () {
                    null === this.selectedSource ? this.setSelectedSource(this.target.layerSources[n[o][0]]) : this.setSelectedSource(this.selectedSource)
                },
                scope: this
            }
        }, this.initialConfig.outputConfig));
        h === Ext.Panel && this.addOutput(this.capGrid)
    },
    addLayers: function (e, t) {
        for (var n = this.selectedSource, r = this.target.mapPanel.layers, i, s, o, u = 0, a = e.length; u < a; ++u)
            if (s = n.createLayerRecord({
                name: e[u].get("name"),
                source: n.id
            }) || e[u]) o = s.getLayer(), o.maxExtent && (i ? i.extend(s.getLayer().maxExtent) : i = s.getLayer().maxExtent.clone()), "background" === s.get("group") ? r.insert(1, [s]) : r.add([s]);
        i && this.target.mapPanel.map.zoomToExtent(i);
        if (1 === e.length && s && (this.target.selectLayer(s), t && this.postUploadAction)) {
            var f, n = this.postUploadAction;
            if (!Ext.isString(n)) f = n.outputConfig, n = n.plugin;
            this.target.tools[n].addOutput(f)
        }
    },
    setSelectedSource: function (e) {
        this.selectedSource = e;
        this.fireEvent("sourceselected", this, e);
        this.capGrid && e.lazy && e.store.load({
            callback: function () {
                var e = this.capGrid.sourceComboBox,
                    t = e.store,
                    n = e.valueField,
                    r = t.findExact(n, e.getValue()),
                    r = t.getAt(r),
                    i = this.target.layerSources[r.get("id")];
                i ? i.title !== r.get("title") && !Ext.isEmpty(i.title) && (r.set("title", i.title), e.setValue(r.get(n))) : t.remove(r)
            }.createDelegate(this)
        })
    },
    createUploadButton: function (e) {
        var e = e || Ext.Button,
            t, n = this.initialConfig.upload || !! this.initialConfig.uploadSource,
            r;
        if (n) {
            "boolean" === typeof n && (n = {});
            t = new e({
                text: this.uploadText,
                iconCls: "gxp-icon-filebrowse",
                hidden: !this.uploadSource,
                handler: function () {
                    this.target.doAuthorized(this.uploadRoles, function () {
                        var e = new gxp.LayerUploadPanel(Ext.apply({
                            title: this.outputTarget ? this.uploadText : void 0,
                            url: r,
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
                                uploadcomplete: function (e, n) {
                                    for (var r = n["import"].tasks[0].items, i, s = {}, o = 0, u = r.length; o < u; ++o) {
                                        i = r[o];
                                        if ("ERROR" === i.state) {
                                            Ext.Msg.alert(i.originalName, i.errorMessage);
                                            return
                                        }
                                        i = i.resource;
                                        i = i.featureType || i.coverage;
                                        s[i.namespace.name + ":" + i.name] = !0
                                    }
                                    this.selectedSource.store.load({
                                        callback: function () {
                                            var e, t;
                                            this.capGrid && this.capGrid.isVisible() && (e = this.capGrid.get(0).get(0), t = e.getSelectionModel(), t.clearSelections());
                                            var n = [],
                                                r = 0;
                                            this.selectedSource.store.each(function (e, t) {
                                                e.get("name") in s && (r = t, n.push(e))
                                            });
                                            e ? window.setTimeout(function () {
                                                t.selectRecords(n);
                                                e.getView().focusRow(r)
                                            }, 100) : this.addLayers(n, !0)
                                        },
                                        scope: this
                                    });
                                    this.outputTarget ? e.hide() : t.close()
                                },
                                scope: this
                            }
                        }, n)),
                            t;
                        this.outputTarget ? this.addOutput(e) : (t = new Ext.Window({
                            title: this.uploadText,
                            modal: !0,
                            resizable: !1,
                            items: [e]
                        }), t.show())
                    }, this)
                },
                scope: this
            });
            var i = {}, s = function (e, t, n) {
                    e in i ? window.setTimeout(function () {
                        t.call(n, i[e])
                    }, 0) : Ext.Ajax.request({
                        url: e,
                        disableCaching: !1,
                        callback: function (r, s, o) {
                            r = o.status;
                            i[e] = r;
                            t.call(n, r)
                        }
                    })
                };
            this.on({
                sourceselected: function (e, n) {
                    t[this.uploadSource ? "show" : "hide"]();
                    this.isEligibleForUpload(n) && (r = this.getGeoServerRestUrl(n.url), this.target.isAuthorized() && s(r + "/imports", function (e) {
                        t.setVisible(200 === e)
                    }, this))
                },
                scope: this
            })
        }
        return t
    },
    getGeoServerRestUrl: function (e) {
        e = e.split("/");
        e.pop();
        e.push("rest");
        return e.join("/")
    },
    isEligibleForUpload: function (e) {
        return e.url && (this.relativeUploadOnly ? "/" === e.url.charAt(0) : !0) && -1 === (this.nonUploadSources || []).indexOf(e.id)
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
        var e, t = gxp.plugins.RemoveLayer.superclass.addActions.apply(this, [{
                menuText: this.removeMenuText,
                iconCls: "gxp-icon-removelayers",
                disabled: !0,
                tooltip: this.removeActionTip,
                handler: function () {
                    var t = e;
                    t && this.target.mapPanel.layers.remove(t)
                },
                scope: this
            }]),
            n = t[0];
        this.target.on("layerselectionchange", function (t) {
            e = t;
            n.setDisabled(1 >= this.target.mapPanel.layers.getCount() || !t)
        }, this);
        var r = function (t) {
            n.setDisabled(!e || 1 >= t.getCount())
        };
        this.target.mapPanel.layers.on({
            add: r,
            remove: r
        });
        return t
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
    constructor: function (e) {
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
    addOutput: function (e) {
        e = Ext.apply(this.createOutputConfig(), e || {});
        return gxp.plugins.LayerTree.superclass.addOutput.call(this, e)
    },
    createOutputConfig: function () {
        var e = new Ext.tree.TreeNode({
            text: this.rootNodeText,
            expanded: !0,
            isTarget: !1,
            allowDrop: !1
        }),
            t = this.defaultGroup,
            n = this,
            r, i, s;
        for (s in this.groups) r = "string" == typeof this.groups[s] ? {
            title: this.groups[s]
        } : this.groups[s], i = r.exclusive, e.appendChild(new GeoExt.tree.LayerContainer(Ext.apply({
            text: r.title,
            iconCls: "gxp-folder",
            expanded: !0,
            group: s == this.defaultGroup ? void 0 : s,
            loader: new GeoExt.tree.LayerLoader({
                baseAttrs: i ? {
                    checkedGroup: Ext.isString(i) ? i : s
                } : void 0,
                store: this.target.mapPanel.layers,
                filter: function (e) {
                    return function (n) {
                        return (n.get("group") || t) == e && !0 == n.getLayer().displayInLayerSwitcher
                    }
                }(s),
                createNode: function (e) {
                    n.configureLayerNode(this, e);
                    return GeoExt.tree.LayerLoader.prototype.createNode.apply(this, arguments)
                }
            }),
            singleClickExpand: !0,
            allowDrag: !1,
            listeners: {
                append: function (e, t) {
                    t.expand()
                }
            }
        }, r)));
        return {
            xtype: "treepanel",
            root: e,
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
    configureLayerNode: function (e, t) {
        t.uiProvider = this.treeNodeUI;
        var n = t.layer,
            r = t.layerStore;
        if (n && r) {
            var i = r.getAt(r.findBy(function (e) {
                return e.getLayer() === n
            }));
            if (i) {
                t.qtip = i.get("abstract");
                if (!i.get("queryable")) t.iconCls = "gxp-tree-rasterlayer-icon";
                if (i.get("fixed")) t.allowDrag = !1;
                t.listeners = {
                    rendernode: function (e) {
                        i === this.target.selectedLayer && e.select();
                        this.target.on("layerselectionchange", function (t) {
                            !this.selectionChanging && t === i && e.select()
                        }, this)
                    },
                    scope: this
                }
            }
        }
    },
    handleBeforeSelect: function (e, t) {
        var n = !0,
            r = t && t.layer,
            i;
        if (r) n = t.layerStore, i = n.getAt(n.findBy(function (e) {
            return e.getLayer() === r
        }));
        this.selectionChanging = !0;
        n = this.target.selectLayer(i);
        this.selectionChanging = !1;
        return n
    },
    handleTreeContextMenu: function (e, t) {
        if (e && e.layer) {
            e.select();
            var n = e.getOwnerTree();
            if (n.getSelectionModel().getSelectedNode() === e) n = n.contextMenu, n.contextNode = e, 0 < n.items.getCount() && n.showAt(t.getXY())
        }
    },
    handleBeforeMoveNode: function (e, t, n, r) {
        if (n !== r) e = r.loader.store, n = e.findBy(function (e) {
            return e.getLayer() === t.layer
        }), e.getAt(n).set("group", r.attributes.group)
    }
});
Ext.preg(gxp.plugins.LayerTree.prototype.ptype, gxp.plugins.LayerTree);
Ext.namespace("gxp.plugins");
gxp.plugins.LayerManager = Ext.extend(gxp.plugins.LayerTree, {
    ptype: "gxp_layermanager",
    baseNodeText: "Base Maps",
    createOutputConfig: function () {
        var e = gxp.plugins.LayerManager.superclass.createOutputConfig.apply(this, arguments);
        Ext.applyIf(e, Ext.apply({
            cls: "gxp-layermanager-tree",
            lines: !1,
            useArrows: !0,
            plugins: [{
                ptype: "gx_treenodecomponent"
            }]
        }, this.treeConfig));
        return e
    },
    configureLayerNode: function (e, t) {
        gxp.plugins.LayerManager.superclass.configureLayerNode.apply(this, arguments);
        var n;
        OpenLayers.Layer.WMS && t.layer instanceof OpenLayers.Layer.WMS ? n = "gx_wmslegend" : OpenLayers.Layer.Vector && t.layer instanceof OpenLayers.Layer.Vector && (n = "gx_vectorlegend");
        n && Ext.apply(t, {
            component: {
                xtype: n,
                baseParams: {
                    transparent: !0,
                    format: "image/png",
                    legend_options: "fontAntiAliasing:true;fontSize:11;fontName:Arial"
                },
                layerRecord: this.target.mapPanel.layers.getByLayer(t.layer),
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
        var e = this.selectedRecord.getLayer(),
            t;
        OpenLayers.Layer.Vector && (t = e instanceof OpenLayers.Layer.Vector && e.getDataExtent());
        return e.restrictedExtent || t || e.maxExtent || map.maxExtent
    },
    addActions: function () {
        var e = gxp.plugins.ZoomToLayerExtent.superclass.addActions.apply(this, arguments);
        e[0].disable();
        this.target.on("layerselectionchange", function (t) {
            this.selectedRecord = t;
            e[0].setDisabled(!t || !t.get("layer"))
        }, this);
        return e
    }
});
Ext.preg(gxp.plugins.ZoomToLayerExtent.prototype.ptype, gxp.plugins.ZoomToLayerExtent);
Ext.namespace("gxp.plugins");
gxp.plugins.LayerProperties = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_layerproperties",
    menuText: "Layer Properties",
    toolTip: "Layer Properties",
    constructor: function (e) {
        gxp.plugins.LayerProperties.superclass.constructor.apply(this, arguments);
        if (!this.outputConfig) this.outputConfig = {
            width: 325,
            autoHeight: !0
        }
    },
    addActions: function () {
        var e = gxp.plugins.LayerProperties.superclass.addActions.apply(this, [{
            menuText: this.menuText,
            iconCls: "gxp-icon-layerproperties",
            disabled: !0,
            tooltip: this.toolTip,
            handler: function () {
                this.removeOutput();
                this.addOutput()
            },
            scope: this
        }]),
            t = e[0];
        this.target.on("layerselectionchange", function (e) {
            t.setDisabled(!e || !e.get("properties"))
        }, this);
        return e
    },
    addOutput: function (e) {
        var e = e || {}, t = this.target.selectedLayer;
        this.outputConfig.title = (this.initialConfig.outputConfig || {}).title || this.menuText + ": " + t.get("title");
        this.outputConfig.shortTitle = t.get("title");
        var n = t.get("properties") || "gxp_layerpanel",
            r = this.layerPanelConfig;
        r && r[n] && Ext.apply(e, r[n]);
        return gxp.plugins.LayerProperties.superclass.addOutput.call(this, Ext.apply({
            xtype: n,
            authorized: this.target.isAuthorized(),
            layerRecord: t,
            source: this.target.getSource(t),
            defaults: {
                style: "padding: 10px",
                autoHeight: this.outputConfig.autoHeight
            },
            listeners: {
                added: function (e) {
                    if (!this.outputTarget) e.on("afterrender", function () {
                        e.ownerCt.ownerCt.center()
                    }, this, {
                        single: !0
                    })
                },
                scope: this
            }
        }, e))
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
    minScaleDenominatorLimit: 1577757414.193268 * Math.pow(.5, 19) * OpenLayers.DOTS_PER_INCH / 256,
    maxScaleDenominatorLimit: 1577757414.193268 * OpenLayers.DOTS_PER_INCH / 256,
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
                    this.fireEvent("change", this, this.rule)
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
                change: function (e, t, n) {
                    this.rule.minScaleDenominator = t;
                    this.rule.maxScaleDenominator = n;
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
                change: function (e) {
                    this.rule.filter = e.getFilter();
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
            }]
        }];
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
                            var e = this.getActiveTab();
                            this.activeTab = null;
                            this.setActiveTab(e);
                            e = !1;
                            if (this.scaleLimitPanel.limitMinScaleDenominator) this.rule.minScaleDenominator = this.scaleLimitPanel.minScaleDenominator, e = !0;
                            if (this.scaleLimitPanel.limitMaxScaleDenominator) this.rule.maxScaleDenominator = this.scaleLimitPanel.maxScaleDenominator, e = !0;
                            e && this.fireEvent("change", this, this.rule)
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
                }]
            }
        ];
        this.items[0].autoHeight = !0;
        this.addEvents("change");
        this.on({
            tabchange: function (e, t) {
                t.doLayout()
            },
            scope: this
        });
        gxp.RulePanel.superclass.initComponent.call(this)
    },
    hasTextSymbolizer: function () {
        for (var e, t, n = 0, r = this.rule.symbolizers.length; n < r; ++n)
            if (e = this.rule.symbolizers[n], e instanceof OpenLayers.Symbolizer.Text) {
                t = e;
                break
            }
        return t
    },
    getTextSymbolizer: function () {
        var e = this.hasTextSymbolizer();
        e || (e = new OpenLayers.Symbolizer.Text({
            graphic: !1
        }));
        return e
    },
    setTextSymbolizer: function (e) {
        for (var t, n = 0, r = this.rule.symbolizers.length; n < r; ++n)
            if (candidate = this.rule.symbolizers[n], this.rule.symbolizers[n] instanceof OpenLayers.Symbolizer.Text) {
                this.rule.symbolizers[n] = e;
                t = !0;
                break
            }
        t || this.rule.symbolizers.push(e)
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
                            change: function (e, t) {
                                this.rule.title = t;
                                this.fireEvent("change", this, this.rule)
                            },
                            scope: this
                        }
                    }]
                }, {
                    layout: "form",
                    width: 70,
                    items: [this.symbolizerSwatch]
                }]
            }]
        }
    },
    createSymbolizerPanel: function () {
        var e, t, n = OpenLayers.Symbolizer[this.symbolType],
            r = !1;
        if (n) {
            for (var i = 0, s = this.rule.symbolizers.length; i < s; ++i)
                if (e = this.rule.symbolizers[i], e instanceof n) {
                    r = !0;
                    t = e;
                    break
                }
            t || (t = new n({
                fill: !1,
                stroke: !1
            }))
        } else throw Error("Appropriate symbolizer type not included in build: " + this.symbolType);
        this.symbolizerSwatch.setSymbolizers([t], {
            draw: this.symbolizerSwatch.rendered
        });
        e = {
            xtype: "gxp_" + this.symbolType.toLowerCase() + "symbolizer",
            symbolizer: t,
            bodyStyle: {
                padding: "10px"
            },
            border: !1,
            labelWidth: 70,
            defaults: {
                labelWidth: 70
            },
            listeners: {
                change: function (e) {
                    this.symbolizerSwatch.setSymbolizers([e], {
                        draw: this.symbolizerSwatch.rendered
                    });
                    r || (this.rule.symbolizers.push(e), r = !0);
                    this.fireEvent("change", this, this.rule)
                },
                scope: this
            }
        };
        if ("Point" === this.symbolType && this.pointGraphics) e.pointGraphics = this.pointGraphics;
        return e
    },
    getSymbolTypeFromRule: function (e) {
        for (var t, n, r = 0, i = e.symbolizers.length; r < i; ++r)
            if (t = e.symbolizers[r], !(t instanceof OpenLayers.Symbolizer.Text)) {
                n = t.CLASS_NAME.split(".").pop();
                break
            }
        return n
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
                        change: function (e, t) {
                            this.userStyle[e.name] = t;
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
                }]
            }]
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
        this.addEvents("ready", "modified", "styleselected", "beforesaved", "saved");
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
                        var e = this.selectedStyle,
                            t = e.get("userStyle").clone();
                        t.isDefault = !1;
                        t.name = this.newStyleName();
                        var n = this.stylesStore;
                        n.add(new n.recordType({
                            name: t.name,
                            title: t.title,
                            "abstract": t.description,
                            userStyle: t
                        }));
                        this.editStyle(e)
                    },
                    scope: this
                }]
            }]
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
            var e = this.selectedStyle,
                t = this.stylesStore,
                n = new OpenLayers.Style(null, {
                    name: this.newStyleName(),
                    rules: [this.createRule()]
                });
            t.add(new t.recordType({
                name: n.name,
                userStyle: n
            }));
            this.editStyle(e)
        } else this.on("ready", this.addStyle, this)
    },
    editStyle: function (e) {
        var t = this.selectedStyle.get("userStyle"),
            n = new this.dialogCls(Ext.apply({
                bbar: ["->", {
                    text: this.cancelText,
                    iconCls: "cancel",
                    handler: function () {
                        n.propertiesDialog.userStyle = t;
                        n.destroy();
                        if (e) this._cancelling = !0, this.stylesStore.remove(this.selectedStyle), this.changeStyle(e, {
                            updateCombo: !0,
                            markModified: !0
                        }), delete this._cancelling
                    },
                    scope: this
                }, {
                    text: this.saveText,
                    iconCls: "save",
                    handler: function () {
                        n.destroy()
                    }
                }]
            }, {
                title: String.format(this.styleWindowTitle, t.title || t.name),
                shortTitle: t.title || t.name,
                bodyBorder: !1,
                autoHeight: !0,
                width: 300,
                modal: !0,
                items: {
                    border: !1,
                    items: {
                        xtype: "gxp_stylepropertiesdialog",
                        ref: "../propertiesDialog",
                        userStyle: t.clone(),
                        nameEditable: !1,
                        style: "padding: 10px;"
                    }
                },
                listeners: {
                    beforedestroy: function () {
                        this.selectedStyle.set("userStyle", n.propertiesDialog.userStyle)
                    },
                    scope: this
                }
            }));
        this.showDlg(n)
    },
    createSLD: function (e) {
        var e = e || {}, t = {
                version: "1.0.0",
                namedLayers: {}
            }, n = this.layerRecord.get("name");
        t.namedLayers[n] = {
            name: n,
            userStyles: []
        };
        this.stylesStore.each(function (r) {
            (!e.userStyles || -1 !== e.userStyles.indexOf(r.get("name"))) && t.namedLayers[n].userStyles.push(r.get("userStyle"))
        });
        return (new OpenLayers.Format.SLD({
            multipleSymbolizers: !0,
            profile: "GeoServer"
        })).write(t)
    },
    saveStyles: function (e) {
        !0 === this.modified && this.fireEvent("beforesaved", this, e)
    },
    updateStyleRemoveButton: function () {
        var e = this.selectedStyle && this.selectedStyle.get("userStyle");
        this.items.get(1).items.get(1).setDisabled(!e || 1 >= this.stylesStore.getCount() || !0 === e.isDefault)
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
        var e = new Ext.form.FieldSet({
            itemId: "rulesfieldset",
            title: this.rulesFieldsetTitle,
            autoScroll: !0,
            style: "margin-bottom: 0;",
            hideMode: "offsets",
            hidden: !0
        }),
            t = new Ext.Toolbar({
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
                        this.layerDescription ? this.editRule() : this.describeLayer(this.editRule)
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
                }]
            });
        this.add(e, t);
        this.doLayout();
        return e
    },
    addRule: function () {
        var e = this.items.get(2).items.get(0);
        this.selectedStyle.get("userStyle").rules.push(this.createRule());
        e.update();
        this.selectedStyle.store.afterEdit(this.selectedStyle);
        this.updateRuleRemoveButton()
    },
    removeRule: function () {
        var e = this.selectedRule;
        this.items.get(2).items.get(0).unselect();
        this.selectedStyle.get("userStyle").rules.remove(e);
        this.afterRuleChange()
    },
    duplicateRule: function () {
        var e = this.items.get(2).items.get(0),
            t = this.selectedRule.clone();
        this.selectedStyle.get("userStyle").rules.push(t);
        e.update();
        this.selectedStyle.store.afterEdit(this.selectedStyle);
        this.updateRuleRemoveButton()
    },
    editRule: function () {
        var e = this.selectedRule,
            t = e.clone(),
            n = new this.dialogCls({
                title: String.format(this.ruleWindowTitle, e.title || e.name || this.newRuleText),
                shortTitle: e.title || e.name || this.newRuleText,
                layout: "fit",
                width: 320,
                height: 450,
                modal: !0,
                items: [{
                    xtype: "gxp_rulepanel",
                    ref: "rulePanel",
                    symbolType: this.symbolType,
                    rule: e,
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
                            n instanceof Ext.Window && n.syncShadow()
                        },
                        scope: this
                    }
                }],
                bbar: ["->", {
                    text: this.cancelText,
                    iconCls: "cancel",
                    handler: function () {
                        this.saveRule(n.rulePanel, t);
                        n.destroy()
                    },
                    scope: this
                }, {
                    text: this.saveText,
                    iconCls: "save",
                    handler: function () {
                        n.destroy()
                    }
                }]
            });
        this.showDlg(n)
    },
    saveRule: function (e, t) {
        var n = this.selectedStyle;
        this.items.get(2).items.get(0);
        var n = n.get("userStyle"),
            r = n.rules.indexOf(this.selectedRule);
        n.rules[r] = t;
        this.afterRuleChange(t)
    },
    afterRuleChange: function (e) {
        this.items.get(2).items.get(0);
        this.selectedRule = e;
        this.selectedStyle.store.afterEdit(this.selectedStyle)
    },
    setRulesFieldSetVisible: function (e) {
        this.items.get(3).setVisible(e && this.editable);
        this.items.get(2).setVisible(e);
        this.doLayout()
    },
    parseSLD: function (e) {
        var t = e.responseXML;
        if (!t || !t.documentElement) t = (new OpenLayers.Format.XML).read(e.responseText);
        var e = this.layerRecord.getLayer().params,
            n = this.initialConfig.styleName || e.STYLES;
        if (n) this.selectedStyle = this.stylesStore.getAt(this.stylesStore.findExact("name", n));
        var r = new OpenLayers.Format.SLD({
            profile: "GeoServer",
            multipleSymbolizers: !0
        });
        try {
            var i = r.read(t).namedLayers[e.LAYERS].userStyles,
                s;
            if (e.SLD_BODY) s = r.read(e.SLD_BODY).namedLayers[e.LAYERS].userStyles, Array.prototype.push.apply(i, s);
            this.stylesStore.removeAll();
            this.selectedStyle = null;
            for (var o, u, a, t = 0, f = i.length; t < f; ++t)
                if (o = i[t], a = this.stylesStore.findExact("name", o.name), -1 !== a && this.stylesStore.removeAt(a), u = new this.stylesStore.recordType({
                    name: o.name,
                    title: o.title,
                    "abstract": o.description,
                    userStyle: o
                }), u.phantom = !1, this.stylesStore.add(u), !this.selectedStyle && (n === o.name || !n && !0 === o.isDefault)) this.selectedStyle = u;
            this.addRulesFieldSet();
            this.createLegend(this.selectedStyle.get("userStyle").rules);
            this.stylesStoreReady();
            e.SLD_BODY && this.markModified()
        } catch (l) {
            this.setupNonEditable()
        }
    },
    createLegend: function (e) {
        var t = OpenLayers.Symbolizer.Raster;
        if (t && e[0] && e[0].symbolizers[0] instanceof t) throw Error("Raster symbolizers are not supported.");
        this.addVectorLegend(e)
    },
    setupNonEditable: function () {
        this.editable = !1;
        this.items.get(1).hide();
        (this.getComponent("rulesfieldset") || this.addRulesFieldSet()).add(this.createLegendImage());
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
            add: function (e, t, n) {
                this.updateStyleRemoveButton();
                t = this.items.get(0).items.get(0);
                this.markModified();
                t.fireEvent("select", t, e.getAt(n), n);
                t.setValue(this.selectedStyle.get("name"))
            },
            remove: function (e, t, n) {
                if (!this._cancelling) this._removing = !0, t = Math.min(n, e.getCount() - 1), this.updateStyleRemoveButton(), n = this.items.get(0).items.get(0), this.markModified(), n.fireEvent("select", n, e.getAt(t), t), n.setValue(this.selectedStyle.get("name")), delete this._removing
            },
            update: function (e, t) {
                var n = t.get("userStyle");
                Ext.apply(t.data, {
                    name: n.name,
                    title: n.title || n.name,
                    "abstract": n.description
                });
                this.changeStyle(t, {
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
        var e = this.layerRecord.get("styles") || [];
        this.stylesStore = new Ext.data.JsonStore({
            data: {
                styles: e
            },
            idProperty: "name",
            root: "styles",
            fields: ["name", "title", "abstract", "legend", "userStyle"],
            listeners: {
                add: function (e, t) {
                    for (var n, r = t.length - 1; 0 <= r; --r) n = t[r], e.suspendEvents(), n.get("title") || n.set("title", n.get("name")), e.resumeEvents()
                }
            }
        })
    },
    getStyles: function (e) {
        var t = this.layerRecord.getLayer();
        if (!0 === this.editable) {
            var n = t.params.VERSION;
            1.1 < parseFloat(n) && (n = "1.1.1");
            Ext.Ajax.request({
                url: t.url,
                params: {
                    SERVICE: "WMS",
                    VERSION: n,
                    REQUEST: "GetStyles",
                    LAYERS: "" + t.params.LAYERS
                },
                method: "GET",
                disableCaching: !1,
                success: this.parseSLD,
                failure: this.setupNonEditable,
                callback: e,
                scope: this
            })
        } else this.setupNonEditable()
    },
    describeLayer: function (e) {
        if (this.layerDescription) window.setTimeout(function () {
            e.call(this)
        }, 0);
        else {
            var t = this.layerRecord.getLayer(),
                n = t.params.VERSION;
            1.1 < parseFloat(n) && (n = "1.1.1");
            Ext.Ajax.request({
                url: t.url,
                params: {
                    SERVICE: "WMS",
                    VERSION: n,
                    REQUEST: "DescribeLayer",
                    LAYERS: "" + t.params.LAYERS
                },
                method: "GET",
                disableCaching: !1,
                success: function (e) {
                    this.layerDescription = (new OpenLayers.Format.WMSDescribeLayer).read(e.responseXML && e.responseXML.documentElement ? e.responseXML : e.responseText)[0]
                },
                callback: e,
                scope: this
            })
        }
    },
    addStylesCombo: function () {
        var e = this.stylesStore,
            e = new Ext.form.ComboBox(Ext.apply({
                fieldLabel: this.chooseStyleText,
                store: e,
                editable: !1,
                displayField: "title",
                valueField: "name",
                value: this.selectedStyle ? this.selectedStyle.get("title") : this.layerRecord.getLayer().params.STYLES || "default",
                disabled: !e.getCount(),
                mode: "local",
                typeAhead: !0,
                triggerAction: "all",
                forceSelection: !0,
                anchor: "100%",
                listeners: {
                    select: function (e, t) {
                        this.changeStyle(t);
                        !t.phantom && !this._removing && this.fireEvent("styleselected", this, t.get("name"))
                    },
                    scope: this
                }
            }, this.initialConfig.stylesComboOptions));
        this.items.get(0).add(e);
        this.doLayout()
    },
    createLegendImage: function () {
        var e = new GeoExt.WMSLegend({
            showTitle: !1,
            layerRecord: this.layerRecord,
            autoScroll: !0,
            defaults: {
                listeners: {
                    render: function (t) {
                        t.getEl().on({
                            load: function (n, r) {
                                r.getAttribute("src") != t.defaultImgSrc && (this.setRulesFieldSetVisible(!0), 250 < t.getEl().getHeight() && e.setHeight(250))
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
        return e
    },
    changeStyle: function (e, t) {
        var t = t || {}, n = this.items.get(2).items.get(0);
        this.selectedStyle = e;
        this.updateStyleRemoveButton();
        e.get("name");
        if (!0 === this.editable) {
            var r = e.get("userStyle"),
                i = n.rules.indexOf(this.selectedRule);
            n.ownerCt.remove(n);
            this.createLegend(r.rules, {
                selectedRuleIndex: i
            })
        }!0 === t.updateCombo && (this.items.get(0).items.get(0).setValue(r.name), !0 === t.markModified && this.markModified())
    },
    addVectorLegend: function (e, t) {
        t = Ext.applyIf(t || {}, {
            enableDD: !0
        });
        this.symbolType = t.symbolType;
        if (!this.symbolType) {
            var n = ["Point", "Line", "Polygon"];
            highest = 0;
            for (var r = e[0].symbolizers, i, s = r.length - 1; 0 <= s; s--) i = r[s].CLASS_NAME.split(".").pop(), highest = Math.max(highest, n.indexOf(i));
            this.symbolType = n[highest]
        }
        var o = this.items.get(2).add({
            xtype: "gx_vectorlegend",
            showTitle: !1,
            height: 10 < e.length ? 250 : void 0,
            autoScroll: 10 < e.length,
            rules: e,
            symbolType: this.symbolType,
            selectOnClick: !0,
            enableDD: t.enableDD,
            listeners: {
                ruleselected: function (e, t) {
                    this.selectedRule = t;
                    var n = this.items.get(3).items;
                    this.updateRuleRemoveButton();
                    n.get(2).enable();
                    n.get(3).enable()
                },
                ruleunselected: function () {
                    this.selectedRule = null;
                    var e = this.items.get(3).items;
                    e.get(1).disable();
                    e.get(2).disable();
                    e.get(3).disable()
                },
                rulemoved: function () {
                    this.markModified()
                },
                afterlayout: function () {
                    null !== this.selectedRule && null === o.selectedRule && -1 !== o.rules.indexOf(this.selectedRule) && o.selectRuleEntry(this.selectedRule)
                },
                scope: this
            }
        });
        this.setRulesFieldSetVisible(!0);
        return o
    },
    newStyleName: function () {
        var e = this.layerRecord.get("name");
        return e.split(":").pop() + "_" + gxp.util.md5(e + new Date + Math.random()).substr(0, 8)
    },
    showDlg: function (e) {
        e.show()
    }
});
gxp.WMSStylesDialog.createGeoServerStylerConfig = function (e, t) {
    var n = e.getLayer();
    t || (t = e.get("restUrl"));
    t || (t = n.url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest"));
    return {
        xtype: "gxp_wmsstylesdialog",
        layerRecord: e,
        plugins: [{
            ptype: "gxp_geoserverstylewriter",
            baseUrl: t
        }],
        listeners: {
            styleselected: function (e, t) {
                n.mergeNewParams({
                    styles: t
                })
            },
            modified: function (e) {
                e.saveStyles()
            },
            saved: function (e, t) {
                n.mergeNewParams({
                    _olSalt: Math.random(),
                    styles: t
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
    constructor: function (e) {
        gxp.plugins.Styler.superclass.constructor.apply(this, arguments);
        if (!this.outputConfig) this.outputConfig = {
            autoHeight: !0,
            width: 265
        };
        Ext.applyIf(this.outputConfig, {
            closeAction: "close"
        })
    },
    init: function (e) {
        gxp.plugins.Styler.superclass.init.apply(this, arguments);
        this.target.on("authorizationchange", this.enableOrDisable, this)
    },
    destroy: function () {
        this.target.un("authorizationchange", this.enableOrDisable, this);
        gxp.plugins.Styler.superclass.destroy.apply(this, arguments)
    },
    enableOrDisable: function () {
        this.target && null !== this.target.selectedLayer && this.handleLayerChange(this.target.selectedLayer)
    },
    addActions: function () {
        var e = gxp.plugins.Styler.superclass.addActions.apply(this, [{
            menuText: this.menuText,
            iconCls: "gxp-icon-palette",
            disabled: !0,
            tooltip: this.tooltip,
            handler: function () {
                this.target.doAuthorized(this.roles, this.addOutput, this)
            },
            scope: this
        }]);
        this.launchAction = e[0];
        this.target.on({
            layerselectionchange: this.handleLayerChange,
            scope: this
        });
        return e
    },
    handleLayerChange: function (e) {
        this.launchAction.disable();
        if (e) {
            var t = this.target.getSource(e);
            t instanceof gxp.plugins.WMSSource && t.describeLayer(e, function (t) {
                this.checkIfStyleable(e, t)
            }, this)
        }
    },
    checkIfStyleable: function (e, t) {
        if (t) {
            var n = ["WFS"];
            !0 === this.rasterStyling && n.push("WCS")
        }
        if (t ? -1 !== n.indexOf(t.get("owsType")) : !this.requireDescribeLayer) {
            var n = !1,
                n = this.target.layerSources[e.get("source")],
                r;
            r = (r = e.get("restUrl")) ? r + "/styles" : n.url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest/styles");
            if (this.sameOriginStyling) {
                if (n = "/" === r.charAt(0), this.target.authenticate && n) {
                    this.launchAction.enable();
                    return
                }
            } else n = !0;
            n && this.target.isAuthorized() && this.enableActionIfAvailable(r)
        }
    },
    enableActionIfAvailable: function (e) {
        Ext.Ajax.request({
            method: "PUT",
            url: e,
            callback: function (e, t, n) {
                this.launchAction.setDisabled(405 !== n.status)
            },
            scope: this
        })
    },
    addOutput: function (e) {
        var e = e || {}, t = this.target.selectedLayer;
        this.outputConfig.title = (this.initialConfig.outputConfig || {}).title || this.menuText + ": " + t.get("title");
        this.outputConfig.shortTitle = t.get("title");
        Ext.apply(e, gxp.WMSStylesDialog.createGeoServerStylerConfig(t));
        !0 === this.rasterStyling && e.plugins.push({
            ptype: "gxp_wmsrasterstylesdialog"
        });
        Ext.applyIf(e, {
            style: "padding: 10px"
        });
        var n = gxp.plugins.Styler.superclass.addOutput.call(this, e);
        if (!(n.ownerCt.ownerCt instanceof Ext.Window)) n.dialogCls = Ext.Panel, n.showDlg = function (e) {
            e.layout = "fit";
            e.autoHeight = !1;
            n.ownerCt.add(e)
        };
        n.stylesStore.on("load", function () {
            !this.outputTarget && n.ownerCt.ownerCt instanceof Ext.Window && n.ownerCt.ownerCt.center()
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
    describeLayer: function (e, t, n) {
        e = new(Ext.data.Record.create([{
            name: "owsType",
            type: "string"
        }, {
            name: "owsURL",
            type: "string"
        }, {
            name: "typeName",
            type: "string"
        }]))({
            owsType: "WFS",
            owsURL: e.get("url"),
            typeName: e.get("name")
        });
        t.call(n, e)
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
    getFullFilter: function (e, t) {
        var n = [];
        void 0 !== e && n.push(e);
        n = n.concat(t);
        return 1 >= n.length ? n[0] : new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: n
        })
    },
    filter: function (e) {
        var t = void 0;
        "" !== e.queryString && (t = new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.LIKE,
            matchCase: !1,
            property: "csw:AnyText",
            value: "*" + e.queryString + "*"
        }));
        var n = {
            resultType: "results",
            maxRecords: e.limit,
            Query: {
                typeNames: "gmd:MD_Metadata",
                ElementSetName: {
                    value: "full"
                }
            }
        }, e = this.getFullFilter(t, e.filters);
        void 0 !== e && Ext.apply(n.Query, {
            Constraint: {
                version: "1.1.0",
                Filter: e
            }
        });
        Ext.apply(this.store.baseParams, n);
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
    init: function (e) {
        e.map.events.register("preaddlayer", this, function (t) {
            var n = t.layer;
            if (n instanceof OpenLayers.Layer.WMS) n.events.on({
                loadstart: function () {
                    this.layerCount++;
                    if (!this.busyMask) this.busyMask = new Ext.LoadMask(e.map.div, {
                        msg: this.loadingMapMessage
                    });
                    this.busyMask.show();
                    !0 === this.onlyShowOnFirstLoad && n.events.unregister("loadstart", this, arguments.callee)
                },
                loadend: function () {
                    this.layerCount--;
                    0 === this.layerCount && this.busyMask.hide();
                    !0 === this.onlyShowOnFirstLoad && n.events.unregister("loadend", this, arguments.callee)
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
    constructor: function (e) {
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
            }]
        ])
    },
    getLegendPanel: function () {
        return this.output[0]
    },
    addOutput: function (e) {
        return gxp.plugins.Legend.superclass.addOutput.call(this, Ext.apply({
            xtype: "gx_legendpanel",
            ascending: !1,
            border: !1,
            hideMode: "offsets",
            layerStore: this.target.mapPanel.layers,
            defaults: {
                cls: "gxp-legend-item"
            }
        }, e))
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
    constructor: function (e) {
        gxp.plugins.Print.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        if (null !== this.printService || null != this.printCapabilities) {
            var e = new GeoExt.data.PrintProvider({
                capabilities: this.printCapabilities,
                url: this.printService,
                customParams: this.customParams,
                autoLoad: !1,
                listeners: {
                    beforedownload: function (e, t) {
                        if (!0 === this.openInNewWindow) return window.open(t), !1
                    },
                    beforeencodelegend: function (e, t, n) {
                        if (n && "gxp_layermanager" === n.ptype) {
                            var r = [];
                            (n = n.output) && n[0] && n[0].getRootNode().cascade(function (e) {
                                if (e.component && !e.component.hidden) {
                                    var e = e.component,
                                        n = this.encoders.legends[e.getXType()];
                                    r = r.concat(n.call(this, e, t.pages[0].scale))
                                }
                            }, e);
                            t.legends = r;
                            return !1
                        }
                    },
                    beforeprint: function () {
                        r.items.get(0).printMapPanel.layers.each(function (e) {
                            var e = e.get("layer").params,
                                t;
                            for (t in e) e[t] instanceof Array && (e[t] = e[t].join(","))
                        })
                    },
                    loadcapabilities: function () {
                        if (n) n.initialConfig.disabled = !1, n.enable()
                    },
                    print: function () {
                        try {
                            r.close()
                        } catch (e) {}
                    },
                    printException: function (e, t) {
                        this.target.displayXHRTrouble && this.target.displayXHRTrouble(t)
                    },
                    scope: this
                }
            }),
                t = gxp.plugins.Print.superclass.addActions.call(this, [{
                    menuText: this.menuText,
                    buttonText: this.buttonText,
                    tooltip: this.tooltip,
                    iconCls: "gxp-icon-print",
                    disabled: null !== this.printCapabilities ? !1 : !0,
                    handler: function () {
                        if (0 < o().length) {
                            var e = a.call(this);
                            f.call(this);
                            return e
                        }
                        Ext.Msg.alert(this.notAllNotPrintableText, this.nonePrintableText)
                    },
                    scope: this,
                    listeners: {
                        render: function () {
                            e.loadCapabilities()
                        }
                    }
                }]),
                n = t[0].items[0],
                r, i = function () {
                    if (r) {
                        try {
                            r.items.first().printMapPanel.printPage.destroy()
                        } catch (e) {}
                        r = null
                    }
                }, s = this.target.mapPanel,
                o = function () {
                    var e = [];
                    s.layers.each(function (t) {
                        t = t.getLayer();
                        u(t) && e.push(t)
                    });
                    return e
                }, u = function (e) {
                    return !0 === e.getVisibility() && (e instanceof OpenLayers.Layer.WMS || e instanceof OpenLayers.Layer.OSM)
                }, a = function () {
                    var t = null;
                    if (!0 === this.includeLegend) {
                        var n, o;
                        for (n in this.target.tools)
                            if (o = this.target.tools[n], "gxp_legend" === o.ptype) {
                                t = o.getLegendPanel();
                                break
                            }
                        if (null === t)
                            for (n in this.target.tools)
                                if (o = this.target.tools[n], "gxp_layermanager" === o.ptype) {
                                    t = o;
                                    break
                                }
                    }
                    return r = new Ext.Window({
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
                                        preaddlayer: function (e) {
                                            return u(e.layer)
                                        }
                                    }
                                }, s.initialConfig.map),
                                items: [{
                                    xtype: "gx_zoomslider",
                                    vertical: !0,
                                    height: 100,
                                    aggressive: !0
                                }],
                                listeners: {
                                    afterlayout: function () {
                                        r.setWidth(Math.max(360, this.getWidth() + 24));
                                        r.center()
                                    }
                                }
                            },
                            printProvider: e,
                            includeLegend: this.includeLegend,
                            legend: t,
                            sourceMap: s
                        })],
                        listeners: {
                            beforedestroy: i
                        }
                    })
                }, f = function () {
                    r.show();
                    r.setWidth(0);
                    var e = 0;
                    r.items.get(0).items.get(0).items.each(function (t) {
                        t.getEl() && (e += t.getWidth())
                    });
                    r.setWidth(Math.max(r.items.get(0).printMapPanel.getWidth(), e + 20));
                    r.center()
                };
            return t
        }
    }
});
Ext.preg(gxp.plugins.Print.prototype.ptype, gxp.plugins.Print);
Ext.namespace("gxp.plugins");
gxp.plugins.GoogleEarth = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_googleearth",
    timeout: 7e3,
    menuText: "3D Viewer",
    tooltip: "Switch to 3D Viewer",
    tooltipMap: "Switch back to normal map view",
    constructor: function (e) {
        gxp.plugins.GoogleEarth.superclass.constructor.apply(this, arguments)
    },
    addActions: function () {
        return gxp.plugins.GoogleEarth.superclass.addActions.apply(this, [
            [{
                menuText: this.menuText,
                enableToggle: !0,
                iconCls: "gxp-icon-googleearth",
                tooltip: this.tooltip,
                toggleHandler: function (e, t) {
                    this.actions[0].each(function (e) {
                        e.toggle && e.toggle(!1, !0)
                    });
                    this.togglePanelDisplay(t)
                },
                scope: this
            }]
        ])
    },
    togglePanelDisplay: function (e) {
        var t = this.target.mapPanel.ownerCt,
            n = t && t.getLayout();
        if (n && n instanceof Ext.layout.CardLayout)
            if (!0 === e) gxp.plugins.GoogleEarth.loader.onLoad({
                callback: function () {
                    n.setActiveItem(1);
                    this.actions[0].enable();
                    this.actions[0].items[0].setTooltip(this.tooltipMap);
                    this.actions[0].each(function (e) {
                        e.toggle && e.toggle(!0, !0)
                    })
                },
                scope: this
            });
            else n.setActiveItem(0), this.actions[0].items[0].setTooltip(this.tooltip)
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
        var e = gxp.plugins.GoogleEarth.loader;
        if (!e.ready) e.ready = !0, e.loading = !1, e.fireEvent("ready")
    },
    onLoad: function (e) {
        if (this.ready) window.setTimeout(function () {
            e.callback.call(e.scope)
        }, 0);
        else if (this.loading) this.on({
            ready: e.callback,
            failure: e.errback || Ext.emptyFn,
            scope: e.scope
        });
        else this.loadScript(e)
    },
    loadScript: function (e) {
        function t() {
            document.getElementsByTagName("head")[0].appendChild(r)
        }
        window.google && delete google.loader;
        var n = {
            autoload: Ext.encode({
                modules: [{
                    name: "earth",
                    version: "1",
                    callback: "gxp.plugins.GoogleEarth.loader.onScriptLoad"
                }]
            })
        }, r = document.createElement("script");
        r.src = "http://www.google.com/jsapi?" + Ext.urlEncode(n);
        n = e.timeout || gxp.plugins.GoogleSource.prototype.timeout;
        window.setTimeout(function () {
            gxp.plugins.GoogleEarth.loader.ready || (this.fireEvent("failure"), this.unload())
        }.createDelegate(this), n);
        this.on({
            ready: e.callback,
            failure: e.errback || Ext.emptyFn,
            scope: e.scope
        });
        this.loading = !0;
        if (document.body) t();
        else Ext.onReady(t);
        this.script = r
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
        if (this.customizeFilterOnInit) this.filter = this.customizeFilter(this.filter);
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
        }];
        this.addEvents("change");
        gxp.FilterBuilder.superclass.initComponent.call(this)
    },
    createToolBar: function () {
        var e = [{
            text: this.addConditionText,
            iconCls: "add",
            handler: function () {
                this.addCondition()
            },
            scope: this
        }];
        this.allowGroups && e.push({
            text: this.addGroupText,
            iconCls: "add",
            handler: function () {
                this.addCondition(!0)
            },
            scope: this
        });
        return e
    },
    getFilter: function () {
        var e;
        this.filter && (e = this.filter.clone(), e instanceof OpenLayers.Filter.Logical && (e = this.cleanFilter(e)));
        return e
    },
    cleanFilter: function (e) {
        if (e instanceof OpenLayers.Filter.Logical)
            if (e.type !== OpenLayers.Filter.Logical.NOT && 1 === e.filters.length) e = this.cleanFilter(e.filters[0]);
            else
                for (var t, n = 0, r = e.filters.length; n < r; ++n)
                    if (t = e.filters[n], t instanceof OpenLayers.Filter.Logical)
                        if (t = this.cleanFilter(t)) e.filters[n] = t;
                        else {
                            e = t;
                            break
                        } else {
                            if (!t || null === t.type || null === t.property || null === t[e.type === OpenLayers.Filter.Comparison.BETWEEN ? "lowerBoundary" : "value"]) {
                                e = !1;
                                break
                            }
                        } else if (!e || null === e.type || null === e.property || null === e[e.type === OpenLayers.Filter.Comparison.BETWEEN ? "lowerBoundary" : "value"]) e = !1;
        return e
    },
    customizeFilter: function (e) {
        if (e) {
            var e = this.cleanFilter(e),
                t, n, r;
            switch (e.type) {
            case OpenLayers.Filter.Logical.AND:
            case OpenLayers.Filter.Logical.OR:
                if (!e.filters || 0 === e.filters.length) e.filters = [this.createDefaultFilter()];
                else
                    for (n = 0, r = e.filters.length; n < r; ++n) t = e.filters[n], t instanceof OpenLayers.Filter.Logical && (e.filters[n] = this.customizeFilter(t));
                e = new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.OR,
                    filters: [e]
                });
                break;
            case OpenLayers.Filter.Logical.NOT:
                if (!e.filters || 0 === e.filters.length) e.filters = [new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.OR,
                    filters: [this.createDefaultFilter()]
                })];
                else if (t = e.filters[0], t instanceof OpenLayers.Filter.Logical)
                    if (t.type !== OpenLayers.Filter.Logical.NOT) {
                        var i;
                        for (n = 0, r = t.filters.length; n < r; ++n) i = t.filters[n], i instanceof OpenLayers.Filter.Logical && (t.filters[n] = this.customizeFilter(i))
                    } else e = t.filters && 0 < t.filters.length ? this.customizeFilter(t.filters[0]) : this.wrapFilter(this.createDefaultFilter());
                    else e.filters = [new OpenLayers.Filter.Logical({
                        type: this.defaultBuilderType === gxp.FilterBuilder.NOT_ALL_OF ? OpenLayers.Filter.Logical.AND : OpenLayers.Filter.Logical.OR,
                        filters: [t]
                    })];
                break;
            default:
                e = this.wrapFilter(e)
            }
        } else e = this.wrapFilter(this.createDefaultFilter());
        return e
    },
    createDefaultFilter: function () {
        return new OpenLayers.Filter.Comparison
    },
    wrapFilter: function (e) {
        return new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.OR,
            filters: [new OpenLayers.Filter.Logical({
                type: this.defaultBuilderType === gxp.FilterBuilder.ALL_OF ? OpenLayers.Filter.Logical.AND : OpenLayers.Filter.Logical.OR,
                filters: [e]
            })]
        })
    },
    addCondition: function (e) {
        var t, n;
        e ? (n = "gxp_filterbuilder", t = this.wrapFilter(this.createDefaultFilter())) : (n = "gxp_filterfield", t = this.createDefaultFilter());
        this.childFilterContainer.add(this.newRow({
            xtype: n,
            filter: t,
            columnWidth: 1,
            attributes: this.attributes,
            allowBlank: e ? void 0 : this.allowBlank,
            customizeFilterOnInit: e && !1,
            listeners: {
                change: function () {
                    this.fireEvent("change", this)
                },
                scope: this
            }
        }));
        this.filter.filters[0].filters.push(t);
        this.childFilterContainer.doLayout()
    },
    removeCondition: function (e, t) {
        var n = this.filter.filters[0].filters;
        0 < n.length && (n.remove(t), this.childFilterContainer.remove(e, !0));
        0 === n.length && this.addCondition();
        this.fireEvent("change", this)
    },
    createBuilderTypeCombo: function () {
        for (var e = this.allowedBuilderTypes || [gxp.FilterBuilder.ANY_OF, gxp.FilterBuilder.ALL_OF, gxp.FilterBuilder.NONE_OF], t = e.length, n = Array(t), r, i = 0; i < t; ++i) r = e[i], n[i] = [r, this.builderTypeNames[r]];
        return {
            xtype: "combo",
            store: new Ext.data.SimpleStore({
                data: n,
                fields: ["value", "name"]
            }),
            value: this.builderType,
            ref: "../../builderTypeCombo",
            displayField: "name",
            valueField: "value",
            triggerAction: "all",
            mode: "local",
            listeners: {
                select: function (e, t) {
                    this.changeBuilderType(t.get("value"));
                    this.fireEvent("change", this)
                },
                scope: this
            },
            width: 60
        }
    },
    changeBuilderType: function (e) {
        if (e !== this.builderType) {
            this.builderType = e;
            var t = this.filter.filters[0];
            switch (e) {
            case gxp.FilterBuilder.ANY_OF:
                this.filter.type = OpenLayers.Filter.Logical.OR;
                t.type = OpenLayers.Filter.Logical.OR;
                break;
            case gxp.FilterBuilder.ALL_OF:
                this.filter.type = OpenLayers.Filter.Logical.OR;
                t.type = OpenLayers.Filter.Logical.AND;
                break;
            case gxp.FilterBuilder.NONE_OF:
                this.filter.type = OpenLayers.Filter.Logical.NOT;
                t.type = OpenLayers.Filter.Logical.OR;
                break;
            case gxp.FilterBuilder.NOT_ALL_OF:
                this.filter.type = OpenLayers.Filter.Logical.NOT, t.type = OpenLayers.Filter.Logical.AND
            }
        }
    },
    createChildFiltersPanel: function () {
        this.childFilterContainer = new Ext.Container;
        for (var e = this.filter.filters[0].filters, t, n = 0, r = e.length; n < r; ++n) {
            t = e[n];
            var i = {
                xtype: "gxp_filterfield",
                allowBlank: this.allowBlank,
                columnWidth: 1,
                filter: t,
                attributes: this.attributes,
                listeners: {
                    change: function () {
                        this.fireEvent("change", this)
                    },
                    scope: this
                }
            };
            this.childFilterContainer.add(this.newRow(Ext.applyIf(t instanceof OpenLayers.Filter.Logical ? {
                xtype: "gxp_filterbuilder"
            } : {
                xtype: "container",
                layout: "form",
                hideLabels: !0,
                items: i
            }, i)))
        }
        return this.childFilterContainer
    },
    newRow: function (e) {
        var t = new Ext.Container({
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
                            this.removeCondition(t, e.filter)
                        },
                        scope: this
                    }
                },
                e
            ]
        });
        return t
    },
    getBuilderType: function () {
        var e = this.defaultBuilderType;
        if (this.filter) {
            var t = this.filter.filters[0];
            if (this.filter.type === OpenLayers.Filter.Logical.NOT) switch (t.type) {
            case OpenLayers.Filter.Logical.OR:
                e = gxp.FilterBuilder.NONE_OF;
                break;
            case OpenLayers.Filter.Logical.AND:
                e = gxp.FilterBuilder.NOT_ALL_OF
            } else switch (t.type) {
            case OpenLayers.Filter.Logical.OR:
                e = gxp.FilterBuilder.ANY_OF;
                break;
            case OpenLayers.Filter.Logical.AND:
                e = gxp.FilterBuilder.ALL_OF
            }
        }
        return e
    },
    setFilter: function (e) {
        this.filter = this.customizeFilter(e);
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
        this.source && this.source.getSchema(this.layerRecord, function (e) {
            if (!1 !== e) {
                var t = this.layerRecord.getLayer().params.CQL_FILTER;
                this.filterBuilder = new gxp.FilterBuilder({
                    filter: t && this.cqlFormat.read(t),
                    allowGroups: !1,
                    listeners: {
                        afterrender: function () {
                            this.filterBuilder.cascade(function (e) {
                                "toolbar" === e.getXType() && (e.addText(this.cqlPrefixText), e.addButton({
                                    text: this.cqlText,
                                    handler: this.switchToCQL,
                                    scope: this
                                }))
                            }, this)
                        },
                        change: function (e) {
                            var e = e.getFilter(),
                                t = null;
                            !1 !== e && (t = this.cqlFormat.write(e));
                            this.layerRecord.getLayer().mergeNewParams({
                                CQL_FILTER: t
                            })
                        },
                        scope: this
                    },
                    attributes: e
                });
                this.filterFieldset.add(this.filterBuilder);
                this.filterFieldset.doLayout()
            }
        }, this);
        this.addEvents("change");
        this.items = [this.createAboutPanel(), this.createDisplayPanel()];
        if (this.styling && gxp.WMSStylesDialog && this.layerRecord.get("styles")) {
            var e = this.layerRecord.get("restUrl");
            e || (e = (this.source || this.layerRecord.get("layer")).url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest"));
            this.editableStyles = this.sameOriginStyling ? "/" === e.charAt(0) : !0;
            this.items.push(this.createStylesPanel(e))
        }
        gxp.WMSLayerPanel.superclass.initComponent.call(this)
    },
    switchToCQL: function () {
        var e = this.filterBuilder.getFilter(),
            t = "";
        !1 !== e && (t = this.cqlFormat.write(e));
        this.filterBuilder.hide();
        this.cqlField.setValue(t);
        this.cqlField.show();
        this.cqlToolbar.show()
    },
    switchToFilterBuilder: function () {
        var e = null;
        try {
            e = this.cqlFormat.read(this.cqlField.getValue())
        } catch (t) {}
        this.cqlField.hide();
        this.cqlToolbar.hide();
        this.filterBuilder.show();
        null !== e && this.filterBuilder.setFilter(e)
    },
    createStylesPanel: function (e) {
        var t = gxp.WMSStylesDialog.createGeoServerStylerConfig(this.layerRecord, e);
        !0 === this.rasterStyling && t.plugins.push({
            ptype: "gxp_wmsrasterstylesdialog"
        });
        var n = this.ownerCt;
        if (!(n.ownerCt instanceof Ext.Window)) t.dialogCls = Ext.Panel, t.showDlg = function (e) {
            e.layout = "fit";
            e.autoHeight = !1;
            n.add(e)
        };
        return Ext.apply(t, {
            title: this.stylesText,
            style: "padding: 10px",
            editable: !1,
            listeners: Ext.apply(t.listeners, {
                beforerender: {
                    fn: function (t) {
                        var n = !this.editableStyles;
                        if (!n) "boolean" == typeof this.authorized ? (t.editable = this.authorized, t.ownerCt.doLayout()) : Ext.Ajax.request({
                            method: "PUT",
                            url: e + "/styles",
                            callback: function (e, n, r) {
                                t.editable = 405 == r.status;
                                t.ownerCt.doLayout()
                            }
                        });
                        return n
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
                        change: function (e) {
                            this.layerRecord.set("title", e.getValue());
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
                }]
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
                }]
            }]
        }
    },
    onFormatChange: function (e) {
        var t = this.layerRecord.getLayer(),
            e = e.getValue();
        t.mergeNewParams({
            format: e
        });
        t = this.transparentCb;
        if ("image/jpeg" == e) this.transparent = t.getValue(), t.setValue(!1);
        else if (null !== this.transparent) t.setValue(this.transparent), this.transparent = null;
        t.setDisabled("image/jpeg" == e);
        this.fireEvent("change")
    },
    addScaleOptions: function (e, t) {
        e.alwaysInRange = null;
        e.addOptions(t);
        e.display();
        e.redraw()
    },
    createDisplayPanel: function () {
        var e = this.layerRecord,
            t = e.getLayer(),
            n = t.opacity;
        null == n && (n = 1);
        var r = [],
            n = t.params.FORMAT.toLowerCase();
        Ext.each(e.get("formats"), function (e) {
            this.imageFormats.test(e) && r.push(e.toLowerCase())
        }, this); - 1 === r.indexOf(n) && r.push(n);
        var i = t.params.TRANSPARENT;
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
                        store: r,
                        value: n,
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
                        checked: "true" === i || !0 === i,
                        listeners: {
                            check: function (e, n) {
                                t.mergeNewParams({
                                    transparent: n ? "true" : "false"
                                });
                                this.fireEvent("change")
                            },
                            scope: this
                        }
                    }, {
                        xtype: "label",
                        cls: "gxp-layerproperties-label",
                        text: this.transparentText
                    }]
                }, {
                    xtype: "compositefield",
                    anchor: "99%",
                    hidden: null == this.layerRecord.get("layer").params.TILED,
                    fieldLabel: this.cacheText,
                    items: [{
                        xtype: "checkbox",
                        checked: !0 === this.layerRecord.get("layer").params.TILED,
                        listeners: {
                            check: function (e, t) {
                                this.layerRecord.get("layer").mergeNewParams({
                                    TILED: t
                                });
                                this.fireEvent("change")
                            },
                            scope: this
                        }
                    }, {
                        xtype: "label",
                        cls: "gxp-layerproperties-label",
                        text: this.cacheFieldText
                    }]
                }, {
                    xtype: "combo",
                    fieldLabel: this.infoFormatText,
                    emptyText: this.infoFormatEmptyText,
                    store: e.get("infoFormats"),
                    value: e.get("infoFormat"),
                    hidden: void 0 === e.get("infoFormats"),
                    mode: "local",
                    listWidth: 150,
                    triggerAction: "all",
                    editable: !1,
                    anchor: "99%",
                    listeners: {
                        select: function (t) {
                            t = t.getValue();
                            e.set("infoFormat", t);
                            this.fireEvent("change")
                        }
                    },
                    scope: this
                }]
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
                }],
                buttons: [{
                    ref: "../../../cqlToolbar",
                    hidden: !0,
                    text: this.switchToFilterBuilderText,
                    handler: this.switchToFilterBuilder,
                    scope: this
                }]
            }, {
                xtype: "fieldset",
                title: this.scaleText,
                listeners: {
                    expand: function () {
                        var e = this.layerRecord.getLayer();
                        (void 0 !== this.minScale || void 0 !== this.maxScale) && this.addScaleOptions(e, {
                            minScale: this.maxScale,
                            maxScale: this.minScale
                        })
                    },
                    collapse: function () {
                        var e = this.layerRecord.getLayer();
                        this.minScale = e.options.maxScale;
                        this.maxScale = e.options.minScale;
                        this.addScaleOptions(e, {
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
                            change: function (e) {
                                e = {
                                    maxScale: parseInt(e.getValue())
                                };
                                this.addScaleOptions(this.layerRecord.getLayer(), e)
                            },
                            scope: this
                        },
                        value: this.layerRecord.getLayer().options.maxScale
                    }]
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
                            change: function (e) {
                                e = {
                                    minScale: parseInt(e.getValue())
                                };
                                this.addScaleOptions(this.layerRecord.getLayer(), e)
                            },
                            scope: this
                        },
                        value: this.layerRecord.getLayer().options.minScale
                    }]
                }]
            }]
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
        var e = "remote",
            t = new GeoExt.data.AttributeStore;
        if (this.attributes) 0 != this.attributes.getCount() ? (e = "local", this.attributes.each(function (e) {
            /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/.exec(e.get("type")) || t.add([e])
        })) : t = this.attributes;
        e = {
            xtype: "combo",
            store: t,
            editable: "local" == e,
            typeAhead: !0,
            forceSelection: !0,
            mode: e,
            triggerAction: "all",
            ref: "property",
            allowBlank: this.allowBlank,
            displayField: "name",
            valueField: "name",
            value: this.filter.property,
            listeners: {
                select: function (e, t) {
                    this.items.get(1).enable();
                    this.filter.property = t.get("name");
                    this.fireEvent("change", this.filter, this)
                },
                blur: function (e) {
                    var t = e.store.findExact("name", e.getValue()); - 1 != t ? e.fireEvent("select", e, e.store.getAt(t)) : null != e.startValue && e.setValue(e.startValue)
                },
                scope: this
            },
            width: 120
        };
        this.attributesComboConfig = this.attributesComboConfig || {};
        Ext.applyIf(this.attributesComboConfig, e);
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
        var e = this.filter.type === OpenLayers.Filter.Comparison.BETWEEN;
        return [this.attributesComboConfig, Ext.applyIf({
            xtype: "gxp_comparisoncombo",
            ref: "type",
            disabled: null == this.filter.property,
            allowBlank: this.allowBlank,
            value: this.filter.type,
            listeners: {
                select: function (e, t) {
                    this.items.get(2).enable();
                    this.items.get(3).enable();
                    this.items.get(4).enable();
                    this.setFilterType(t.get("value"));
                    this.fireEvent("change", this.filter, this)
                },
                scope: this
            }
        }, this.comparisonComboConfig), {
            xtype: "textfield",
            disabled: null == this.filter.type,
            hidden: e,
            ref: "value",
            value: this.filter.value,
            width: 50,
            grow: !0,
            growMin: 50,
            anchor: "100%",
            allowBlank: this.allowBlank,
            listeners: {
                change: function (e, t) {
                    this.filter.value = t;
                    this.fireEvent("change", this.filter, this)
                },
                scope: this
            }
        }, {
            xtype: "textfield",
            disabled: null == this.filter.type,
            hidden: !e,
            value: this.filter.lowerBoundary,
            tooltip: this.lowerBoundaryTip,
            grow: !0,
            growMin: 30,
            ref: "lowerBoundary",
            anchor: "100%",
            allowBlank: this.allowBlank,
            listeners: {
                change: function (e, t) {
                    this.filter.lowerBoundary = t;
                    this.fireEvent("change", this.filter, this)
                },
                render: function (e) {
                    Ext.QuickTips.register({
                        target: e.getEl(),
                        text: this.lowerBoundaryTip
                    })
                },
                autosize: function (e, t) {
                    e.setWidth(t);
                    e.ownerCt.doLayout()
                },
                scope: this
            }
        }, {
            xtype: "textfield",
            disabled: null == this.filter.type,
            hidden: !e,
            grow: !0,
            growMin: 30,
            ref: "upperBoundary",
            value: this.filter.upperBoundary,
            allowBlank: this.allowBlank,
            listeners: {
                change: function (e, t) {
                    this.filter.upperBoundary = t;
                    this.fireEvent("change", this.filter, this)
                },
                render: function (e) {
                    Ext.QuickTips.register({
                        target: e.getEl(),
                        text: this.upperBoundaryTip
                    })
                },
                scope: this
            }
        }]
    },
    setFilterType: function (e) {
        this.filter.type = e;
        e === OpenLayers.Filter.Comparison.BETWEEN ? (this.items.get(2).hide(), this.items.get(3).show(), this.items.get(4).show()) : (this.items.get(2).show(), this.items.get(3).hide(), this.items.get(4).hide());
        this.doLayout()
    },
    setFilter: function (e) {
        var t = this.filter.type;
        this.filter = e;
        t !== e.type && this.setFilterType(e.type);
        this.property.setValue(e.property);
        this.type.setValue(e.type);
        e.type === OpenLayers.Filter.Comparison.BETWEEN ? (this.lowerBoundary.setValue(e.lowerBoundary), this.upperBoundary.setValue(e.upperBoundary)) : this.value.setValue(e.value);
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
        var e = {
            displayField: "name",
            valueField: "value",
            store: new Ext.data.SimpleStore({
                data: this.allowedTypes,
                fields: ["value", "name"]
            }),
            value: void 0 === this.value ? this.allowedTypes[0][0] : this.value,
            listeners: {
                blur: function () {
                    var e = this.store.findExact("value", this.getValue()); - 1 != e ? this.fireEvent("select", this, this.store.getAt(e)) : null != this.startValue && this.setValue(this.startValue)
                }
            }
        };
        Ext.applyIf(this, e);
        gxp.form.ComparisonComboBox.superclass.initComponent.call(this)
    }
});
Ext.reg("gxp_comparisoncombo", gxp.form.ComparisonComboBox);
Ext.namespace("gxp");
gxp.ScaleLimitPanel = Ext.extend(Ext.Panel, {
    maxScaleDenominatorLimit: 1577757414.193268 * OpenLayers.DOTS_PER_INCH / 256,
    limitMaxScaleDenominator: !0,
    maxScaleDenominator: void 0,
    minScaleDenominatorLimit: 1577757414.193268 * Math.pow(.5, 19) * OpenLayers.DOTS_PER_INCH / 256,
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
                changecomplete: function (e) {
                    this.updateScaleValues(e)
                },
                render: function (e) {
                    e.thumbs[0].el.setVisible(this.limitMaxScaleDenominator);
                    e.thumbs[1].el.setVisible(this.limitMinScaleDenominator);
                    e.setDisabled(!this.limitMinScaleDenominator && !this.limitMaxScaleDenominator)
                },
                scope: this
            },
            plugins: [new gxp.slider.Tip({
                getText: function (e) {
                    var t = e.slider.thumbs.indexOf(e),
                        e = {
                            scale: "" + this.sliderValuesToScale([e.value])[0],
                            zoom: (e.value * (this.scaleLevels / 100)).toFixed(1),
                            type: 0 === t ? "Max" : "Min",
                            scaleType: 0 === t ? "Min" : "Max"
                        };
                    this.modifyScaleTipContext(this, e);
                    return this.scaleSliderTemplate.apply(e)
                }.createDelegate(this)
            })]
        });
        this.maxScaleDenominatorInput = new Ext.form.NumberField({
            allowNegative: !1,
            width: 100,
            fieldLabel: "1",
            value: Math.round(this.maxScaleDenominator),
            disabled: !this.limitMaxScaleDenominator,
            validator: function (e) {
                return !this.limitMinScaleDenominator || e > this.minScaleDenominator
            }.createDelegate(this),
            listeners: {
                valid: function (e) {
                    var e = Number(e.getValue()),
                        t = Math.round(this.maxScaleDenominatorLimit);
                    if (e < t && e > this.minScaleDenominator) this.maxScaleDenominator = e, this.updateSliderValues()
                },
                change: function (e) {
                    var t = Number(e.getValue()),
                        n = Math.round(this.maxScaleDenominatorLimit);
                    t > n ? e.setValue(n) : t < this.minScaleDenominator ? e.setValue(this.minScaleDenominator) : (this.maxScaleDenominator = t, this.updateSliderValues())
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
            validator: function (e) {
                return !this.limitMaxScaleDenominator || e < this.maxScaleDenominator
            }.createDelegate(this),
            listeners: {
                valid: function (e) {
                    var e = Number(e.getValue()),
                        t = Math.round(this.minScaleDenominatorLimit);
                    if (e > t && e < this.maxScaleDenominator) this.minScaleDenominator = e, this.updateSliderValues()
                },
                change: function (e) {
                    var t = Number(e.getValue()),
                        n = Math.round(this.minScaleDenominatorLimit);
                    t < n ? e.setValue(n) : t > this.maxScaleDenominator ? e.setValue(this.maxScaleDenominator) : (this.minScaleDenominator = t, this.updateSliderValues())
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
                        check: function (e, t) {
                            this.limitMinScaleDenominator = t;
                            var n = this.scaleSlider;
                            n.setValue(1, 100);
                            n.thumbs[1].el.setVisible(t);
                            this.minScaleDenominatorInput.setDisabled(!t);
                            this.updateScaleValues(n);
                            n.setDisabled(!this.limitMinScaleDenominator && !this.limitMaxScaleDenominator)
                        },
                        scope: this
                    }
                }]
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
                        check: function (e, t) {
                            this.limitMaxScaleDenominator = t;
                            var n = this.scaleSlider;
                            n.setValue(0, 0);
                            n.thumbs[0].el.setVisible(t);
                            this.maxScaleDenominatorInput.setDisabled(!t);
                            this.updateScaleValues(n);
                            n.setDisabled(!this.limitMinScaleDenominator && !this.limitMaxScaleDenominator)
                        },
                        scope: this
                    }
                }]
            }, {
                labelWidth: 10,
                layout: "form",
                items: [this.maxScaleDenominatorInput]
            }]
        }];
        this.addEvents("change");
        gxp.ScaleLimitPanel.superclass.initComponent.call(this)
    },
    updateScaleValues: function (e) {
        if (!this.changing) {
            var t = e.getValues(),
                n = !1;
            !this.limitMaxScaleDenominator && 0 < t[0] && (t[0] = 0, n = !0);
            !this.limitMinScaleDenominator && 100 > t[1] && (t[1] = 100, n = !0);
            n ? (e.setValue(0, t[0]), e.setValue(1, t[1])) : (t = this.sliderValuesToScale(t), e = t[0], t = t[1], this.changing = !0, this.minScaleDenominatorInput.setValue(t), this.maxScaleDenominatorInput.setValue(e), this.changing = !1, this.fireEvent("change", this, this.limitMinScaleDenominator ? t : void 0, this.limitMaxScaleDenominator ? e : void 0))
        }
    },
    updateSliderValues: function () {
        if (!this.changing) {
            var e = this.minScaleDenominator,
                t = this.maxScaleDenominator,
                n = this.scaleToSliderValues([t, e]);
            this.changing = !0;
            this.scaleSlider.setValue(0, n[0]);
            this.scaleSlider.setValue(1, n[1]);
            this.changing = !1;
            this.fireEvent("change", this, this.limitMinScaleDenominator ? e : void 0, this.limitMaxScaleDenominator ? t : void 0)
        }
    },
    sliderValuesToScale: function (e) {
        var t = 100 / (this.scaleLevels - 1);
        return [Math.round(Math.pow(this.scaleFactor, (100 - e[0]) / t) * this.minScaleDenominatorLimit), Math.round(Math.pow(this.scaleFactor, (100 - e[1]) / t) * this.minScaleDenominatorLimit)]
    },
    scaleToSliderValues: function (e) {
        var t = 100 / (this.scaleLevels - 1);
        return [100 - t * Math.log(e[0] / this.minScaleDenominatorLimit) / Math.log(this.scaleFactor), 100 - t * Math.log(e[1] / this.minScaleDenominatorLimit) / Math.log(this.scaleFactor)]
    }
});
Ext.reg("gxp_scalelimitpanel", gxp.ScaleLimitPanel);
Ext.namespace("gxp.slider");
gxp.slider.Tip = Ext.extend(Ext.slider.Tip, {
    hover: !0,
    dragging: !1,
    init: function (e) {
        if (this.hover) e.on("render", this.registerThumbListeners, this);
        this.slider = e;
        gxp.slider.Tip.superclass.init.apply(this, arguments)
    },
    registerThumbListeners: function () {
        for (var e = 0, t = this.slider.thumbs.length; e < t; ++e) this.slider.thumbs[e].el.on({
            mouseover: this.createHoverListener(e),
            mouseout: function () {
                this.dragging || this.hide.apply(this, arguments)
            },
            scope: this
        })
    },
    createHoverListener: function (e) {
        return function () {
            this.onSlide(this.slider, {}, this.slider.thumbs[e]);
            this.dragging = !1
        }.createDelegate(this)
    },
    onSlide: function (e, t, n) {
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
    graphic_resizeHelp: "Specifies a mode for resizing label graphics (such as highway shields) to fit the text of the label. The default mode, ‘none’, never modifies the label graphic. In stretch mode, GeoServer will resize the graphic to exactly surround the label text, possibly modifying the image’s aspect ratio. In proportional mode, GeoServer will expand the image to be large enough to surround the text while preserving its original aspect ratio.",
    graphic_marginHelp: "Similar to the margin shorthand property in CSS for HTML, its interpretation varies depending on how many margin values are provided: 1 = use that margin length on all sides of the label 2 = use the first for top & bottom margins and the second for left & right margins. 3 = use the first for the top margin, second for left & right margins, third for the bottom margin. 4 = use the first for the top margin, second for the right margin, third for the bottom margin, and fourth for the left margin.",
    initComponent: function () {
        if (!this.symbolizer) this.symbolizer = {};
        Ext.applyIf(this.symbolizer, this.defaultSymbolizer);
        if (!this.symbolizer.vendorOptions) this.symbolizer.vendorOptions = {};
        this.haloCache = {};
        this.attributes.load();
        var e = {
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
                select: function (e, t) {
                    this.symbolizer.label = "${" + t.get("name") + "}";
                    this.fireEvent("change", this.symbolizer)
                },
                scope: this
            },
            width: 120
        };
        this.attributesComboConfig = this.attributesComboConfig || {};
        Ext.applyIf(this.attributesComboConfig, e);
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
                    select: function (e, t) {
                        this.symbolizer.fontFamily = t.get("field1");
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
                    change: function (e, t) {
                        t = parseFloat(t);
                        isNaN(t) ? delete this.symbolizer.fontSize : this.symbolizer.fontSize = t;
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
                    toggle: function (e, t) {
                        this.symbolizer.fontWeight = t ? "bold" : "normal";
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
                    toggle: function (e, t) {
                        this.symbolizer.fontStyle = t ? "italic" : "normal";
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }]
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
                    this.fireEvent("change", this.symbolizer)
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
                    change: function (e, t) {
                        t = parseFloat(t);
                        isNaN(t) ? delete this.symbolizer.haloRadius : this.symbolizer.haloRadius = t;
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
                    change: function (e) {
                        this.symbolizer.haloColor = e.fillColor;
                        this.symbolizer.haloOpacity = e.fillOpacity;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }],
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
                    select: function (e) {
                        this.symbolizer.labelAlign = e.getValue();
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
                    change: function (e, t) {
                        this.symbolizer.labelXOffset = t;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }, {
                xtype: "numberfield",
                fieldLabel: this.displacementYText,
                value: this.symbolizer.labelYOffset,
                listeners: {
                    change: function (e, t) {
                        this.symbolizer.labelYOffset = t;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }, {
                xtype: "numberfield",
                fieldLabel: this.perpendicularOffsetText,
                value: this.symbolizer.labelPerpendicularOffset,
                listeners: {
                    change: function (e, t) {
                        Ext.isEmpty(t) ? delete this.symbolizer.labelPerpendicularOffset : this.symbolizer.labelPerpendicularOffset = t;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }]
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
                    select: function (e, t) {
                        this.symbolizer[e.name] = "${" + t.get("name") + "}";
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
        }];
        this.addEvents("change");
        gxp.TextSymbolizer.superclass.initComponent.call(this)
    },
    createVendorSpecificField: function (e) {
        var t = function (t, n) {
            Ext.isEmpty(n) ? delete this.symbolizer.vendorOptions[e.name] : this.symbolizer.vendorOptions[e.name] = n;
            this.fireEvent("change", this.symbolizer)
        };
        return Ext.applyIf(e, {
            xtype: "numberfield",
            allowNegative: !1,
            value: this.symbolizer.vendorOptions[e.name],
            listeners: {
                render: this.attachHelpToField,
                change: t,
                check: t,
                scope: this
            }
        })
    },
    attachHelpToField: function (e) {
        var t = e.name.replace(/-/g, "_") + "Help";
        Ext.QuickTips.register({
            target: e.getEl(),
            dismissDelay: 2e4,
            text: this[t]
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
        var e;
        this.colorManager && (e = [new this.colorManager]);
        var t = 100;
        this.opacityProperty in this.symbolizer ? t = this.symbolizer[this.opacityProperty] : OpenLayers.Renderer.defaultSymbolizer[this.opacityProperty] && (t = 100 * OpenLayers.Renderer.defaultSymbolizer[this.opacityProperty]);
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
                plugins: e,
                listeners: {
                    valid: function (e) {
                        var e = e.getValue(),
                            t = this.symbolizer[this.colorProperty] != e;
                        this.symbolizer[this.colorProperty] = e;
                        t && this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }, {
                xtype: "slider",
                fieldLabel: this.opacityText,
                name: "opacity",
                values: [t],
                isFormField: !0,
                listeners: {
                    changecomplete: function (e, t) {
                        this.symbolizer[this.opacityProperty] = t / 100;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                },
                plugins: [new GeoExt.SliderTip({
                    getText: function (e) {
                        return e.value + "%"
                    }
                })]
            }],
            listeners: {
                collapse: function () {
                    if (!1 !== this.symbolizer.fill) this.symbolizer.fill = !1, this.fireEvent("change", this.symbolizer)
                },
                expand: function () {
                    this.symbolizer.fill = !0;
                    this.fireEvent("change", this.symbolizer)
                },
                scope: this
            }
        }];
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
    isDark: function (e) {
        var t = !1;
        if (e) var t = parseInt(e.substring(1, 3), 16) / 255,
        n = parseInt(e.substring(3, 5), 16) / 255, e = parseInt(e.substring(5, 7), 16) / 255, t = .5 > .299 * t + .587 * n + .144 * e;
        return t
    },
    colorField: function () {
        var e = this.colorToHex(this.getValue()) || this.defaultBackground;
        this.getEl().setStyle({
            background: e,
            color: this.isDark(e) ? "#ffffff" : "#000000"
        })
    },
    getHexValue: function () {
        return this.colorToHex(gxp.form.ColorField.superclass.getValue.apply(this, arguments))
    },
    getValue: function () {
        var e = this.getHexValue(),
            t = this.initialConfig.value;
        e === this.hexToColor(t) && (e = t);
        return e
    },
    setValue: function (e) {
        gxp.form.ColorField.superclass.setValue.apply(this, [this.hexToColor(e)])
    },
    colorToHex: function (e) {
        return !e ? e : e.match(/^#[0-9a-f]{6}$/i) ? e : this.cssColors[e.toLowerCase()] || null
    },
    hexToColor: function (e) {
        if (!e) return e;
        for (var t in this.cssColors)
            if (this.cssColors[t] == e.toUpperCase()) {
                e = t;
                break
            }
        return e
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
        var e = this.fonts || gxp.form.FontComboBox.prototype.fonts,
            t = this.defaultFont; - 1 === e.indexOf(this.defaultFont) && (t = e[0]);
        e = {
            displayField: "field1",
            valueField: "field1",
            store: e,
            value: t,
            tpl: new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item"><span style="font-family: {field1};">{field1}</span></div></tpl>')
        };
        Ext.applyIf(this, e);
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
        }];
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
        var e;
        this.colorManager && (e = [new this.colorManager]);
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
                    select: function (e, t) {
                        this.symbolizer.strokeDashstyle = t.get("value");
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
                plugins: e,
                listeners: {
                    valid: function (e) {
                        var e = e.getValue(),
                            t = this.symbolizer.strokeColor != e;
                        this.symbolizer.strokeColor = e;
                        t && this.fireEvent("change", this.symbolizer)
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
                    change: function (e, t) {
                        t = parseFloat(t);
                        isNaN(t) ? delete this.symbolizer.strokeWidth : this.symbolizer.strokeWidth = t;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                }
            }, {
                xtype: "slider",
                name: "opacity",
                fieldLabel: this.opacityText,
                values: [100 * ("strokeOpacity" in this.symbolizer ? this.symbolizer.strokeOpacity : OpenLayers.Renderer.defaultSymbolizer.strokeOpacity)],
                isFormField: !0,
                listeners: {
                    changecomplete: function (e, t) {
                        this.symbolizer.strokeOpacity = t / 100;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                },
                plugins: [new GeoExt.SliderTip({
                    getText: function (e) {
                        return e.value + "%"
                    }
                })]
            }],
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
        }];
        this.addEvents("change");
        gxp.StrokeSymbolizer.superclass.initComponent.call(this)
    },
    getDashArray: function (e) {
        var t;
        e && (e = e.split(/\s+/), e = e[0] / e[1], isNaN(e) || (t = 1 <= e ? "4 4" : "2 4"));
        return t
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
        }];
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
        }];
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
            }]
        });
        this.urlField = new Ext.form.TextField({
            name: "url",
            fieldLabel: this.urlText,
            value: this.symbolizer.externalGraphic,
            hidden: !0,
            listeners: {
                change: function (e, t) {
                    this.symbolizer.externalGraphic = t;
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
                    changecomplete: function (e, t) {
                        this.symbolizer.graphicOpacity = t / 100;
                        this.fireEvent("change", this.symbolizer)
                    },
                    scope: this
                },
                plugins: [new GeoExt.SliderTip({
                    getText: function (e) {
                        return e.value + "%"
                    }
                })],
                width: 100
            }]
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
                    }]
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
                    select: function (e, t) {
                        var n = t.get("mark"),
                            r = t.get("value");
                        if (n) {
                            if (this.external) this.external = !1, delete this.symbolizer.externalGraphic, this.updateGraphicDisplay();
                            this.symbolizer.graphicName = r
                        } else if (r ? (this.urlField.hide(), this.urlField.getEl().up(".x-form-item").setDisplayed(!1), this.symbolizer.externalGraphic = r) : (this.urlField.show(), this.urlField.getEl().up(".x-form-item").setDisplayed(!0)), !this.external) this.external = !0, this.updateGraphicDisplay();
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
                    change: function (e, t) {
                        this.symbolizer.pointRadius = t / 2;
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
                    change: function (e, t) {
                        this.symbolizer.rotation = t;
                        this.fireEvent("change", this.symbolizer)
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
        var e = this.mapPanel;
        e && !(e instanceof GeoExt.MapPanel) && (e = Ext.getCmp(e));
        if (!e) throw Error("Could not get map panel from config: " + this.mapPanel);
        this.map = e.map;
        this.layers = e.layers;
        this.projection = new OpenLayers.Projection("EPSG:4326");
        this.on("render", this.onRenderEvent, this);
        this.on("show", this.onShowEvent, this);
        this.on("hide", function () {
            null != this.earth && this.updateMap();
            this.body.dom.innerHTML = "";
            this.earth = null
        }, this)
    },
    onEarthReady: function (e) {
        this.earth = e;
        void 0 === this.flyToSpeed ? this.earth.getOptions().setFlyToSpeed(this.earth.SPEED_TELEPORT) : null !== this.flyToSpeed && this.earth.getOptions().setFlyToSpeed(this.flyToSpeed);
        this.resetCamera();
        this.setExtent(this.map.getExtent());
        this.earth.getNavigationControl().setVisibility(this.earth.VISIBILITY_SHOW);
        e = this.earth.getNavigationControl().getScreenXY();
        e.setXUnits(this.earth.UNITS_PIXELS);
        e.setYUnits(this.earth.UNITS_INSET_PIXELS);
        this.earth.getWindow().setVisibility(!0);
        this.layers.each(function (e) {
            this.addLayer(e)
        }, this);
        this.layers.on("remove", this.updateLayers, this);
        this.layers.on("update", this.updateLayers, this);
        this.layers.on("add", this.updateLayers, this);
        this.fireEvent("pluginready", this.earth)
    },
    onRenderEvent: function () {
        var e = this.ownerCt && this.ownerCt.layout instanceof Ext.layout.CardLayout;
        if (!this.hidden && !e) this.onShowEvent()
    },
    onShowEvent: function () {
        if (this.rendered) this.layerCache = {}, google.earth.createInstance(this.body.dom, this.onEarthReady.createDelegate(this), function (e) {
            this.fireEvent("pluginfailure", this, e)
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
            for (var e = this.earth.getFeatures(), t = e.getFirstChild(); null != t;) e.removeChild(t), t = e.getFirstChild();
            this.layers.each(function (e) {
                this.addLayer(e)
            }, this)
        }
    },
    addLayer: function (e, t) {
        var n = e.getLayer(),
            r = n && n.url;
        if (this.earth && n instanceof OpenLayers.Layer.WMS && "string" == typeof r && !1 !== this.fireEvent("beforeadd", e)) {
            var i = n.id;
            if (this.layerCache[i]) r = this.layerCache[i];
            else {
                var s = this.earth.createLink("kl_" + i),
                    r = r.replace(/\?.*/, ""),
                    o = n.params;
                s.setHref(r + ("/kml?mode=refresh&layers=" + o.LAYERS + "&styles=" + o.STYLES));
                r = this.earth.createNetworkLink("nl_" + i);
                r.setName(i);
                r.set(s, !1, !1);
                this.layerCache[i] = r
            }
            r.setVisibility(n.getVisibility());
            void 0 !== t && t < this.earth.getFeatures().getChildNodes().getLength() ? this.earth.getFeatures().insertBefore(this.earth.getFeatures().getChildNodes().item(t)) : this.earth.getFeatures().appendChild(r)
        }
    },
    setExtent: function (e) {
        var e = e.transform(this.map.getProjectionObject(), this.projection),
            t = e.getCenterLonLat(),
            e = this.getExtentWidth(e) / (2 * Math.tan(this.HORIZONTAL_FIELD_OF_VIEW)),
            n = this.earth.getView().copyAsLookAt(this.earth.ALTITUDE_RELATIVE_TO_GROUND);
        n.setLatitude(t.lat);
        n.setLongitude(t.lon);
        n.setRange(e);
        this.earth.getView().setAbstractView(n)
    },
    resetCamera: function () {
        var e = this.earth.getView().copyAsCamera(this.earth.ALTITUDE_RELATIVE_TO_GROUND);
        e.setRoll(0);
        e.setHeading(0);
        e.setTilt(0);
        this.earth.getView().setAbstractView(e)
    },
    getExtent: function () {
        var e = this.earth.getView().getViewportGlobeBounds();
        return new OpenLayers.Bounds(e.getWest(), e.getSouth(), e.getEast(), e.getNorth())
    },
    updateMap: function () {
        var e = this.earth.getView().copyAsLookAt(this.earth.ALTITUDE_RELATIVE_TO_GROUND),
            t = this.reprojectToMap(new OpenLayers.LonLat(e.getLongitude(), e.getLatitude()));
        this.map.zoomToExtent(this.reprojectToMap(this.getExtent()), !0);
        this.map.setCenter(t);
        var e = 2 * e.getRange() * Math.tan(this.HORIZONTAL_FIELD_OF_VIEW),
            n = this.map.getResolutionForZoom(this.map.getZoom() + 1),
            r = this.map.getExtent(),
            t = new OpenLayers.Bounds(t.lon - this.map.getSize().w / 2 * n, t.lat + this.map.getSize().h / 2 * n, t.lon + this.map.getSize().w / 2 * n, t.lat - this.map.getSize().h / 2 * n),
            r = Math.abs(this.getExtentWidth(r) - e);
        Math.abs(this.getExtentWidth(t) - e) < r && this.map.zoomTo(this.map.getZoom() + 1)
    },
    getExtentWidth: function (e) {
        var t = e.getCenterLonLat(),
            n = new OpenLayers.LonLat(e.left, t.lat),
            e = new OpenLayers.LonLat(e.right, t.lat);
        return 1e3 * OpenLayers.Util.distVincenty(n, e)
    },
    reprojectToGE: function (e) {
        return e.clone().transform(this.map.getProjectionObject(), this.projection)
    },
    reprojectToMap: function (e) {
        return e.clone().transform(this.projection, this.map.getProjectionObject())
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
            throw "gxp.NewSourceWindow is deprecated. Use gxp.NewSourceDialog instead."
        }, 0);
        this.addEvents("server-added");
        gxp.NewSourceWindow.superclass.initComponent.apply(this, arguments);
        this.addEvents("server-added");
        var e = this.add(new gxp.NewSourceDialog(Ext.applyIf({
            addSource: this.addSource,
            header: !1,
            listeners: {
                urlselected: function (e, t) {
                    this.fireEvent("server-added", t)
                }
            }
        }, this.initialConfig)));
        this.setTitle(e.title);
        this.setLoading = e.setLoading.createDelegate(e);
        this.setError = e.setError.createDelegate(e);
        this.on("hide", e.onHide, e)
    },
    addSource: function () {}
});
Ext.namespace("gxp");
gxp.Viewer = Ext.extend(Ext.util.Observable, {
    defaultToolType: "gxp_tool",
    tools: null,
    selectedLayer: null,
    authenticate: null,
    constructor: function (e) {
        this.addEvents("ready", "portalready", "beforelayerselectionchange", "layerselectionchange", "featureedit", "authorizationchange");
        Ext.apply(this, {
            layerSources: {},
            portalItems: []
        });
        this.createLayerRecordQueue = [];
        (e.loadConfig || this.loadConfig).call(this, e, this.applyConfig);
        gxp.Viewer.superclass.constructor.apply(this, arguments)
    },
    selectLayer: function (e) {
        var e = e || null,
            t = !1;
        if (!1 !== this.fireEvent("beforelayerselectionchange", e)) t = !0, this.selectedLayer && this.selectedLayer.set("selected", !1), (this.selectedLayer = e) && this.selectedLayer.set("selected", !0), this.fireEvent("layerselectionchange", e);
        return t
    },
    loadConfig: function (e) {
        this.applyConfig(e)
    },
    applyConfig: function (e) {
        this.initialConfig = Ext.apply({}, e);
        Ext.apply(this, this.initialConfig);
        this.load()
    },
    load: function () {
        if (this.proxy) OpenLayers.ProxyHost = this.proxy;
        this.initMapPanel();
        this.initTools();
        var e = [],
            t;
        for (t in this.sources) e.push(this.createSourceLoader(t));
        e.push(function (e) {
            Ext.onReady(function () {
                this.initPortal();
                e()
            }, this)
        });
        gxp.util.dispatch(e, this.activate, this)
    },
    createSourceLoader: function (e) {
        return function (t) {
            var n = this.sources[e];
            n.projection = this.initialConfig.map.projection;
            this.addLayerSource({
                id: e,
                config: n,
                callback: t,
                fallback: function () {
                    t()
                },
                scope: this
            })
        }
    },
    addLayerSource: function (e) {
        var t = e.id || Ext.id(null, "gxp-source-"),
            n, r = e.config;
        r.id = t;
        try {
            n = Ext.ComponentMgr.createPlugin(r, this.defaultSourceType)
        } catch (i) {
            throw Error("Could not create new source plugin with ptype: " + e.config.ptype)
        }
        n.on({
            ready: {
                fn: function () {
                    (e.callback || Ext.emptyFn).call(e.scope || this, t)
                },
                scope: this,
                single: !0
            },
            failure: {
                fn: function () {
                    var n = e.fallback || Ext.emptyFn;
                    delete this.layerSources[t];
                    n.apply(e.scope || this, arguments)
                },
                scope: this,
                single: !0
            }
        });
        this.layerSources[t] = n;
        n.init(this);
        return n
    },
    initMapPanel: function () {
        var e = Ext.apply({}, this.initialConfig.map),
            t = {}, n = {
                wrapDateLine: void 0 !== e.wrapDateLine ? e.wrapDateLine : !0,
                maxResolution: e.maxResolution,
                numZoomLevels: e.numZoomLevels,
                displayInLayerSwitcher: !1
            };
        if (this.initialConfig.map)
            for (var r = "theme,controls,resolutions,projection,units,maxExtent,restrictedExtent,maxResolution,numZoomLevels,panMethod".split(","), i, s = r.length - 1; 0 <= s; --s) i = r[s], i in e && (t[i] = e[i], delete e[i]);
        this.mapPanel = Ext.ComponentMgr.create(Ext.applyIf({
            xtype: e.xtype || "gx_mappanel",
            map: Ext.applyIf({
                theme: t.theme || null,
                controls: t.controls || [new OpenLayers.Control.Navigation({
                    zoomWheelOptions: {
                        interval: 250
                    },
                    dragPanOptions: {
                        enableKinetic: !0
                    }
                }), new OpenLayers.Control.PanPanel, new OpenLayers.Control.ZoomPanel, new OpenLayers.Control.Attribution],
                maxExtent: t.maxExtent && OpenLayers.Bounds.fromArray(t.maxExtent),
                restrictedExtent: t.restrictedExtent && OpenLayers.Bounds.fromArray(t.restrictedExtent),
                numZoomLevels: t.numZoomLevels || 20
            }, t),
            center: e.center && new OpenLayers.LonLat(e.center[0], e.center[1]),
            resolutions: e.resolutions,
            forceInitialExtent: !0,
            layers: [new OpenLayers.Layer(null, n)],
            items: this.mapItems,
            plugins: this.mapPlugins,
            tbar: e.tbar || new Ext.Toolbar({
                hidden: !0
            })
        }, e));
        this.mapPanel.getTopToolbar().on({
            afterlayout: this.mapPanel.map.updateSize,
            show: this.mapPanel.map.updateSize,
            hide: this.mapPanel.map.updateSize,
            scope: this.mapPanel.map
        });
        this.mapPanel.layers.on({
            add: function (e, t) {
                for (var n, r = t.length - 1; 0 <= r; r--) n = t[r], !0 === n.get("selected") && this.selectLayer(n)
            },
            remove: function (e, t) {
                !0 === t.get("selected") && this.selectLayer()
            },
            scope: this
        })
    },
    initTools: function () {
        this.tools = {};
        if (this.initialConfig.tools && 0 < this.initialConfig.tools.length)
            for (var e, t = 0, n = this.initialConfig.tools.length; t < n; t++) {
                try {
                    e = Ext.ComponentMgr.createPlugin(this.initialConfig.tools[t], this.defaultToolType)
                } catch (r) {
                    throw Error("Could not create tool plugin with ptype: " + this.initialConfig.tools[t].ptype)
                }
                e.init(this)
            }
    },
    initPortal: function () {
        var e = this.portalConfig || {};
        if (0 === this.portalItems.length) this.mapPanel.region = "center", this.portalItems.push(this.mapPanel);
        this.portal = Ext.ComponentMgr.create(Ext.applyIf(e, {
            layout: "fit",
            hideBorders: !0,
            items: {
                layout: "border",
                deferredRender: !1,
                items: this.portalItems
            }
        }), e.renderTo ? "panel" : "viewport");
        this.fireEvent("portalready")
    },
    activate: function () {
        Ext.QuickTips.init();
        this.addLayers();
        this.checkLayerRecordQueue();
        this.fireEvent("ready")
    },
    addLayers: function () {
        var e = this.initialConfig.map;
        if (e && e.layers) {
            for (var t, n, r = [], i = [], s = 0; s < e.layers.length; ++s)
                if (t = e.layers[s], n = this.layerSources[t.source])(t = n.createLayerRecord(t)) && ("background" === t.get("group") ? r.push(t) : i.push(t));
            e = this.mapPanel;
            r = r.concat(i);
            r.length && e.layers.add(r)
        }
    },
    getLayerRecordFromMap: function (e) {
        var t = null;
        this.mapPanel && this.mapPanel.layers.each(function (n) {
            if (n.get("source") == e.source && n.get("name") == e.name) return t = n, !1
        });
        return t
    },
    createLayerRecord: function (e, t, n) {
        this.createLayerRecordQueue.push({
            config: e,
            callback: t,
            scope: n
        });
        this.checkLayerRecordQueue()
    },
    checkLayerRecordQueue: function () {
        for (var e, t, n, r, i = [], s = 0, o = this.createLayerRecordQueue.length; s < o; ++s) r = !1, e = this.createLayerRecordQueue[s], t = e.config.source, t in this.layerSources && (t = this.layerSources[t], (n = t.createLayerRecord(e.config)) ? (function (e, t) {
            window.setTimeout(function () {
                e.callback.call(e.scope, t)
            }, 0)
        }(e, n), r = !0) : t.lazy && t.store.load({
            callback: this.checkLayerRecordQueue,
            scope: this
        })), r || i.push(e);
        this.createLayerRecordQueue = i
    },
    getSource: function (e) {
        return e && this.layerSources[e.get("source")]
    },
    getState: function () {
        var e = Ext.apply({}, this.initialConfig),
            t = this.mapPanel.map.getCenter();
        Ext.apply(e.map, {
            center: [t.lon, t.lat],
            zoom: this.mapPanel.map.zoom,
            layers: []
        });
        var n = {};
        this.mapPanel.layers.each(function (t) {
            if (t.getLayer().displayInLayerSwitcher) {
                var r = t.get("source"),
                    i = this.layerSources[r];
                if (!i) throw Error("Could not find source for layer '" + t.get("name") + "'");
                e.map.layers.push(i.getConfigForRecord(t));
                n[r] || (n[r] = i.getState())
            }
        }, this);
        Ext.apply(this.sources, n);
        e.tools = [];
        Ext.iterate(this.tools, function (t, n) {
            n.getState != gxp.plugins.Tool.prototype.getState && e.tools.push(n.getState())
        });
        return e
    },
    isAuthorized: function (e) {
        var t = !0;
        if (this.authorizedRoles) {
            t = !1;
            e || (e = "ROLE_ADMINISTRATOR");
            Ext.isArray(e) || (e = [e]);
            for (var n = e.length - 1; 0 <= n; --n)
                if (~this.authorizedRoles.indexOf(e[n])) {
                    t = !0;
                    break
                }
        }
        return t
    },
    setAuthorizedRoles: function (e) {
        this.authorizedRoles = e;
        this.fireEvent("authorizationchange")
    },
    cancelAuthentication: function () {
        this._authFn && this.un("authorizationchange", this._authFn, this);
        this.fireEvent("authorizationchange")
    },
    isAuthenticated: function () {
        return !this.authorizedRoles || 0 < this.authorizedRoles.length
    },
    doAuthorized: function (e, t, n) {
        this.isAuthorized(e) || !this.authenticate ? window.setTimeout(function () {
            t.call(n)
        }, 0) : (this.authenticate(), this._authFn = function () {
            delete this._authFn;
            this.doAuthorized(e, t, n, !0)
        }, this.on("authorizationchange", this._authFn, this, {
            single: !0
        }))
    },
    destroy: function () {
        this.mapPanel.destroy();
        this.portal && this.portal.destroy()
    }
});
(function () {
    OpenLayers.DOTS_PER_INCH = 25.4 / .28
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
            value: this.map.getExtent().transform(this.map.getProjectionObject(), new OpenLayers.Projection("EPSG:4326"))
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
        }];
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
        var e = [],
            t;
        for (t in this.sources) e.push([t, this.sources[t].title]);
        if (1 <= e.length) this.selectedSource = e[0][0];
        t = [
            ["datatype", "data type"],
            ["extent", "spatial extent"],
            ["category", "category"]
        ];
        1 < e.length && t.push(["csw", "data source"]);
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
                        specialkey: function (e, t) {
                            t.getKey() == t.ENTER && this.performQuery()
                        },
                        scope: this
                    },
                    width: 300
                }, {
                    xtype: "button",
                    text: this.searchButtonText,
                    handler: this.performQuery,
                    scope: this
                }]
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
                            data: e
                        }),
                        displayField: "value",
                        valueField: "id",
                        mode: "local",
                        listeners: {
                            select: function (e) {
                                this.setSource(e.getValue())
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
                    }]
                }, {
                    xtype: "compositefield",
                    items: [{
                        xtype: "combo",
                        fieldLabel: this.filterLabel,
                        store: new Ext.data.ArrayStore({
                            fields: ["id", "value"],
                            data: t
                        }),
                        displayField: "value",
                        valueField: "id",
                        mode: "local",
                        triggerAction: "all"
                    }, {
                        xtype: "button",
                        iconCls: "gxp-icon-addlayers",
                        tooltip: this.addTooltip,
                        handler: function (e) {
                            e.ownerCt.items.each(function (e) {
                                if ("combo" === e.getXType()) {
                                    var t = e.getValue();
                                    e.clearValue();
                                    (e = this.form.getForm().findField(t)) && e.show()
                                }
                            }, this)
                        },
                        scope: this
                    }]
                }]
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
                        handler: function (e, t) {
                            this.addLayer(this.grid.store.getAt(t))
                        },
                        scope: this
                    }]
                }],
                autoExpandColumn: "title",
                autoHeight: !0
            }]
        }];
        gxp.CatalogueSearchPanel.superclass.initComponent.apply(this, arguments)
    },
    destroy: function () {
        this.map = this.sources = null;
        gxp.CatalogueSearchPanel.superclass.destroy.call(this)
    },
    setSource: function (e) {
        this.selectedSource = e;
        e = this.sources[e].store;
        this.grid.reconfigure(e, this.grid.getColumnModel());
        this.grid.getBottomToolbar().bindStore(e)
    },
    performQuery: function () {
        this.sources[this.selectedSource].filter({
            queryString: this.search.getValue(),
            limit: this.maxRecords,
            filters: this.filters
        })
    },
    addFilter: function (e) {
        this.filters.push(e)
    },
    removeFilter: function (e) {
        this.filters.remove(e)
    },
    findWMS: function (e) {
        for (var t = null, n = null, r = 0, i = e.length; r < i; ++r) {
            var s = e[r];
            if (s && 0 < s.toLowerCase().indexOf("service=wms")) {
                e = OpenLayers.Util.createUrlObject(s);
                t = e.protocol + "//" + e.host + ":" + e.port + e.pathname;
                n = e.args.layers;
                break
            }
        }
        return null !== t && null !== n ? {
            url: t,
            name: n
        } : !1
    },
    addLayer: function (e) {
        var t = e.get("URI"),
            n = e.get("bounds"),
            r = n.left,
            i = n.right,
            s = n.bottom,
            o = n.top,
            n = Math.min(r, i),
            r = Math.max(r, i),
            i = Math.min(s, o),
            s = Math.max(s, o),
            t = this.findWMS(t);
        !1 === t && (t = this.findWMS(e.get("references")));
        !1 !== t && this.fireEvent("addlayer", this, this.selectedSource, Ext.apply({
            title: e.get("title")[0],
            bbox: [n, i, r, s],
            srs: "EPSG:4326"
        }, t))
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
        var e = {
            change: this.updateSnippet,
            specialkey: function (e, t) {
                t.getKey() == t.ENTER && this.updateSnippet()
            },
            scope: this
        };
        this.heightField = new Ext.form.NumberField({
            width: 50,
            value: 400,
            listeners: e
        });
        this.widthField = new Ext.form.NumberField({
            width: 50,
            value: 600,
            listeners: e
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
                                fields: ["name", "height", "width"],
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
                                select: function (e, t) {
                                    this.widthField.setValue(t.get("width"));
                                    this.heightField.setValue(t.get("height"));
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
            }],
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
    addToMapPanel: function (e) {
        this.on({
            afterrender: function () {
                this.bind(e.map)
            },
            scope: this
        })
    },
    stopMouseEvents: function (e) {
        e.stopEvent()
    },
    removeFromMapPanel: function () {
        var e = this.getEl();
        e.un("mousedown", this.stopMouseEvents, this);
        e.un("click", this.stopMouseEvents, this);
        this.unbind()
    },
    addScaleLine: function () {
        var e = new Ext.BoxComponent({
            autoEl: {
                tag: "div",
                cls: "olControlScaleLine overlay-element overlay-scaleline"
            }
        });
        this.on("afterlayout", function () {
            e.getEl().dom.style.position = "relative";
            e.getEl().dom.style.display = "inline";
            this.getEl().on("click", this.stopMouseEvents, this);
            this.getEl().on("mousedown", this.stopMouseEvents, this)
        }, this);
        e.on("render", function () {
            var t = new OpenLayers.Control.ScaleLine({
                geodesic: !0,
                div: e.getEl().dom
            });
            this.map.addControl(t);
            t.activate()
        }, this);
        this.add(e)
    },
    handleZoomEnd: function () {
        var e = this.zoomStore.queryBy(function (e) {
            return this.map.getZoom() == e.data.level
        }, this);
        0 < e.length ? (e = e.items[0], this.zoomSelector.setValue("1 : " + parseInt(e.data.scale, 10))) : this.zoomSelector.rendered && this.zoomSelector.clearValue()
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
            select: function (e, t) {
                this.map.zoomTo(t.data.level)
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
    bind: function (e) {
        this.map = e;
        this.addScaleLine();
        this.addScaleCombo();
        this.doLayout()
    },
    unbind: function () {
        this.map && this.map.events && this.map.events.unregister("zoomend", this, this.handleZoomEnd);
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
    onRender: function (e, t) {
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
        this.layers.each(function (e) {
            if (e.getLayer().displayInLayerSwitcher) {
                var t = new Ext.menu.CheckItem({
                    text: e.get("title"),
                    checked: e.getLayer().getVisibility(),
                    group: e.get("group"),
                    listeners: {
                        checkchange: function (t, n) {
                            e.getLayer().setVisibility(n)
                        }
                    }
                });
                2 < this.items.getCount() ? this.insert(2, t) : this.add(t)
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
        addActionMenuText: "Añadir Capas",
        addActionTip: "Añadir Capas",
        addServerText: "Añadir servidor",
        addButtonText: "Añadir Capas",
        untitledText: "Sin Título",
        addLayerSourceErrorText: "Error obteniendo capabilities de WMS ({msg}).\nPor favor, compruebe la URL y vuelva a intentarlo.",
        availableLayersText: "Capas disponibles",
        expanderTemplateText: "<p><b>Resumen:</b> {abstract}</p>",
        panelTitleText: "Título",
        layerSelectionText: "Ver datos disponibles de:",
        doneText: "Hecho",
        uploadText: "Subir Datos"
    },
    "gxp.plugins.BingSource.prototype": {
        title: "Capas Bing",
        roadTitle: "Bing Carreteras",
        aerialTitle: "Bing Foto Aérea",
        labeledAerialTitle: "Bing Híbrido"
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
        firstPageTip: "Primera página",
        previousPageTip: "Página anterior",
        zoomPageExtentTip: "Zoom a la extensión de la página",
        nextPageTip: "Página siguiente",
        lastPageTip: "Última página",
        totalMsg: "Features {1} to {2} of {0}"
    },
    "gxp.plugins.GoogleEarth.prototype": {
        menuText: "Vista 3D",
        tooltip: "Vista 3D"
    },
    "gxp.plugins.GoogleSource.prototype": {
        title: "Capas Google",
        roadmapAbstract: "Mostrar Callejero",
        satelliteAbstract: "Mostrar imágenes aéreas",
        hybridAbstract: "Mostrar imágenes con nombres de calle",
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
        title: "GEM Tiles Stream Layers",
        hazardMapPointsWorldTitle: "World Hazard Map PGA_0.1",
        hazardMapJapan21Title: "Japan Hazard Map - 10% in 50 years",
        hazardMapJapan21LandTitle: "Japan Hazard Map - 10% in 50 years - Land",
        hazardMapJapan21ContourLandTitle: "Japan Hazard Map - 10% in 50 years - Contour",
        hazardMapJapan22Title: "Japan Hazard Map - 2% in 50 years",
        hazardMapJapan22LandTitle: "Japan Hazard Map - 2% in 50 years - Land",
        hazardMapJapan22ContourLandTitle: "Japan Hazard Map - 2% in 50 years - Contour",
        gdalCustomUrbanTitle: "GDAL Urban Population",
        gdalCustomRuralTitle: "GDAL Rural Population",
        strainTitle: "Geodetic Strain"
    },
    "gxp.plugins.Measure.prototype": {
        buttonText: "Medir",
        lengthMenuText: "Longitud",
        areaMenuText: "Área",
        lengthTooltip: "Medir Longitud",
        areaTooltip: "Medir Área",
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
        mapnikAttribution: "© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
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
        osmAttribution: "Teselas cortesía de <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
        osmTitle: "MapQuest OpenStreetMap",
        naipAttribution: "Teselas cortesía de <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
        naipTitle: "MapQuest Imágenes"
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
        popupTitle: "Información de elementos"
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
        menuText: "Ver extensión total",
        tooltip: "Ver extensión total"
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
        closeMsgTitle: "¿Desea guardar los cambios?",
        closeMsg: "Los cambios en este elemento no se han guardado. ¿Desea guardar los cambios?",
        deleteMsgTitle: "¿Desea borrar el elemento?",
        deleteMsg: "¿Está seguro de querer borrar este elemento?",
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
        builderTypeNames: ["cualquiera de", "todas", "ninguna de", "no todas"],
        preComboText: "Cumplir",
        postComboText: "las condiciones siguientes:",
        addConditionText: "añadir condición",
        addGroupText: "añadir grupo",
        removeConditionText: "eliminar condición"
    },
    "gxp.grid.CapabilitiesGrid.prototype": {
        nameHeaderText: "Nombre",
        titleHeaderText: "Título",
        queryableHeaderText: "Consultable",
        layerSelectionLabel: "Ver datos disponibles de:",
        layerAdditionLabel: "o añadir otro servidor.",
        expanderTemplateText: "<p><b>Resumen:</b> {abstract}</p>"
    },
    "gxp.PointSymbolizer.prototype": {
        graphicCircleText: "círculo",
        graphicSquareText: "cuadrado",
        graphicTriangleText: "triángulo",
        graphicStarText: "estrella",
        graphicCrossText: "cruz",
        graphicXText: "x",
        graphicExternalText: "externo",
        urlText: "URL",
        opacityText: "opacidad",
        symbolText: "Símbolo",
        sizeText: "Tamaño",
        rotationText: "Giro"
    },
    "gxp.QueryPanel.prototype": {
        queryByLocationText: "Consultar por localización",
        currentTextText: "Extensión actual",
        queryByAttributesText: "Consultar por atributo",
        layerText: "Capa"
    },
    "gxp.RulePanel.prototype": {
        scaleSliderTemplate: "{scaleType} Escala 1:{scale}",
        labelFeaturesText: "Etiquetado de elementos",
        labelsText: "Etiquetas",
        basicText: "Básico",
        advancedText: "Advanzado",
        limitByScaleText: "Limitar por escala",
        limitByConditionText: "Limitar por condición",
        symbolText: "Símbolo",
        nameText: "Nombre"
    },
    "gxp.ScaleLimitPanel.prototype": {
        scaleSliderTemplate: "{scaleType} Escala 1:{scale}",
        minScaleLimitText: "Escala mínima",
        maxScaleLimitText: "Escala máxima"
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
        titleFieldText: "Título",
        abstractFieldText: "Resumen"
    },
    "gxp.TextSymbolizer.prototype": {
        labelValuesText: "Etiquetado",
        haloText: "Halo",
        sizeText: "Tamaño"
    },
    "gxp.WMSLayerPanel.prototype": {
        aboutText: "Acerca de",
        titleText: "Título",
        nameText: "Nombre",
        descriptionText: "Descripción",
        displayText: "Mostrar",
        opacityText: "Opacidad",
        formatText: "Formato",
        transparentText: "Transparente",
        cacheText: "Caché",
        cacheFieldText: "Usar la versión en caché",
        stylesText: "Estilos",
        infoFormatText: "Info format",
        infoFormatEmptyText: "Select a format"
    },
    "gxp.EmbedMapDialog.prototype": {
        publishMessage: "¡Ya puede publicar su mapa en otras webs! Simplemente copie el siguiente código HTML en el lugar donde desee incrustarlo:",
        heightLabel: "Alto",
        widthLabel: "Ancho",
        mapSizeLabel: "Tamaño",
        miniSizeLabel: "Mínimo",
        smallSizeLabel: "Pequeño",
        premiumSizeLabel: "Premium",
        largeSizeLabel: "Grande"
    },
    "gxp.WMSStylesDialog.prototype": {
        addStyleText: "Añadir",
        addStyleTip: "Añadir un estilo",
        chooseStyleText: "Escoger estilo",
        deleteStyleText: "Quitar",
        deleteStyleTip: "Borrar el estilo seleccionado",
        editStyleText: "Cambiar",
        editStyleTip: "Editar el estilo seleccionado",
        duplicateStyleText: "Clonar",
        duplicateStyleTip: "Duplicar el estilo seleccionado",
        addRuleText: "Añadir",
        addRuleTip: "Añadir una regla",
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
        titleLabel: "Título",
        titleEmptyText: "Título de la capa",
        abstractLabel: "Descripción",
        abstractEmptyText: "Descripción de la capa",
        fileLabel: "Datos",
        fieldEmptyText: "Navegue por los datos...",
        uploadText: "Subir",
        waitMsgText: "Suba sus datos data...",
        invalidFileExtensionText: "El fichero debe tener alguna de estas extensiones: ",
        optionsText: "Opciones",
        workspaceLabel: "Espacio de trabajo",
        workspaceEmptyText: "Espacio de trabajo por defecto",
        dataStoreLabel: "Almacén de datos",
        dataStoreEmptyText: "Create new store",
        defaultDataStoreEmptyText: "Almacén de datos por defecto"
    },
    "gxp.NewSourceDialog.prototype": {
        title: "Añadir Servidor...",
        cancelText: "Cancelar",
        addServerText: "Añadir Servidor",
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
        addLayerSourceErrorText: "Impossible d'obtenir les capacités WMS ({msg}).\nVeuillez vérifier l'URL et essayez à nouveau.",
        availableLayersText: "Couches disponibles",
        doneText: "Terminé",
        uploadText: "Télécharger des données"
    },
    "gxp.plugins.BingSource.prototype": {
        title: "Calques Bing",
        roadTitle: "Bing routes",
        aerialTitle: "Bing images aériennes",
        labeledAerialTitle: "Bing images aériennes avec étiquettes"
    },
    "gxp.plugins.FeatureEditor.prototype": {
        splitButtonText: "Edit",
        createFeatureActionText: "Create",
        editFeatureActionText: "Modify",
        createFeatureActionTip: "Créer un nouvel objet",
        editFeatureActionTip: "Modifier un objet existant"
    },
    "gxp.plugins.FeatureGrid.prototype": {
        displayFeatureText: "Afficher sur la carte",
        firstPageTip: "Première page",
        previousPageTip: "Page précédente",
        zoomPageExtentTip: "Zoom sur la page",
        nextPageTip: "Page suivante",
        lastPageTip: "Dernière page",
        totalMsg: "Features {1} to {2} of {0}"
    },
    "gxp.plugins.GoogleEarth.prototype": {
        menuText: "Passer à la visionneuse 3D",
        tooltip: "Passer à la visionneuse 3D"
    },
    "gxp.plugins.GoogleSource.prototype": {
        title: "Calques Google",
        roadmapAbstract: "Carte routière",
        satelliteAbstract: "Images satellite",
        hybridAbstract: "Images avec routes",
        terrainAbstract: "Carte routière avec le terrain"
    },
    "gxp.plugins.LayerProperties.prototype": {
        menuText: "Propriétés de la couche",
        toolTip: "Propriétés de la couche"
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
        menuText: "Légende",
        tooltip: "Légende"
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
        previousMenuText: "Position précédente",
        nextMenuText: "Position suivante",
        previousTooltip: "Position précédente",
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
        title: "GEM Tiles Stream Layers",
        hazardMapPointsWorldTitle: "World Hazard Map PGA_0.1",
        hazardMapJapan21Title: "Japan Hazard Map - 10% in 50 years",
        hazardMapJapan21LandTitle: "Japan Hazard Map - 10% in 50 years - Land",
        hazardMapJapan21ContourLandTitle: "Japan Hazard Map - 10% in 50 years - Contour",
        hazardMapJapan22Title: "Japan Hazard Map - 2% in 50 years",
        hazardMapJapan22LandTitle: "Japan Hazard Map - 2% in 50 years - Land",
        hazardMapJapan22ContourLandTitle: "Japan Hazard Map - 2% in 50 years - Contour",
        gdalCustomUrbanTitle: "GDAL Urban Population",
        gdalCustomRuralTitle: "GDAL Rural Population",
        strainTitle: "Geodetic Strain"
    },
    "gxp.plugins.OSMSource.prototype": {
        title: "Calques OpenStreetMap",
        mapnikAttribution: "© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
        osmarenderAttribution: "Données CC-By-SA par <a href='http://openstreetmap.org/'>OpenStreetMap</a>"
    },
    "gxp.plugins.Print.prototype": {
        buttonText: "Imprimer",
        menuText: "Imprimer la carte",
        tooltip: "Imprimer la carte",
        previewText: "Aperçu avant impression",
        notAllNotPrintableText: "Non, toutes les couches peuvent être imprimées",
        nonePrintableText: "Aucune de vos couches ne peut être imprimée"
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
        queryMenuText: "Couche de requêtes",
        queryActionTip: "Interroger la couche sélectionnée",
        queryByLocationText: "Query by current map extent",
        queryByAttributesText: "Requête par attributs"
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
        zoomOutMenuText: "Zoom arrière",
        zoomTooltip: "Zoom by dragging a box",
        zoomInTooltip: "Zoom avant",
        zoomOutTooltip: "Zoom arrière"
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
        menuText: "Zoomer sur les objets sélectionnés",
        tooltip: "Zoomer sur les objets sélectionnés"
    },
    "gxp.FeatureEditPopup.prototype": {
        closeMsgTitle: "Enregistrer les modifications ?",
        closeMsg: "Cet objet a des modifications non enregistrées. Voulez-vous enregistrer vos modifications ?",
        deleteMsgTitle: "Supprimer l'objet ?",
        deleteMsg: "Etes-vous sûr de vouloir supprimer cet objet ?",
        editButtonText: "Modifier",
        editButtonTooltip: "Modifier cet objet",
        deleteButtonText: "Supprimer",
        deleteButtonTooltip: "Supprimer cet objet",
        cancelButtonText: "Annuler",
        cancelButtonTooltip: "Arrêter de modifier, annuler les modifications",
        saveButtonText: "Enregistrer",
        saveButtonTooltip: "Enregistrer les modifications"
    },
    "gxp.FillSymbolizer.prototype": {
        fillText: "Remplir",
        colorText: "Couleur",
        opacityText: "Opacité"
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
        layerSelectionLabel: "Voir les données disponibles à partir de :",
        layerAdditionLabel: "ou ajouter un nouveau serveur.",
        expanderTemplateText: "<p><b>Résumé:</b> {abstract}</p>"
    },
    "gxp.PointSymbolizer.prototype": {
        graphicCircleText: "Cercle",
        graphicSquareText: "Carré",
        graphicTriangleText: "Triangle",
        graphicStarText: "Étoile",
        graphicCrossText: "Croix",
        graphicXText: "x",
        graphicExternalText: "Externe",
        urlText: "URL",
        opacityText: "Opacité",
        symbolText: "Symbole",
        sizeText: "Taille",
        rotationText: "Rotation"
    },
    "gxp.QueryPanel.prototype": {
        queryByLocationText: "Interrogation selon le lieu",
        currentTextText: "Mesure actuelle",
        queryByAttributesText: "Requête par attributs",
        layerText: "Calque"
    },
    "gxp.RulePanel.prototype": {
        scaleSliderTemplate: "{scaleType} échelle 1:{scale}",
        labelFeaturesText: "Label Caractéristiques",
        advancedText: "Avancé",
        limitByScaleText: "Limiter par l'échelle",
        limitByConditionText: "Limiter par condition",
        symbolText: "Symbole",
        nameText: "Nom"
    },
    "gxp.ScaleLimitPanel.prototype": {
        scaleSliderTemplate: "{scaleType} échelle 1:{scale}",
        maxScaleLimitText: "Échelle maximale"
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
        opacityText: "Opacité",
        formatText: "Format",
        transparentText: "Transparent",
        cacheText: "Cache",
        cacheFieldText: "Utiliser la version mise en cache",
        infoFormatText: "Info format",
        infoFormatEmptyText: "Choisissez un format"
    },
    "gxp.EmbedMapDialog.prototype": {
        publishMessage: "Votre carte est prête à être publiée sur le web. Il suffit de copier le code HTML suivant pour intégrer la carte dans votre site Web :",
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
        fileLabel: "Données",
        fieldEmptyText: "Parcourir pour ...",
        uploadText: "Upload",
        waitMsgText: "Transfert de vos données ...",
        invalidFileExtensionText: "L'extension du fichier doit être : ",
        optionsText: "Options",
        workspaceLabel: "Espace de travail",
        workspaceEmptyText: "Espace de travail par défaut",
        dataStoreLabel: "Magasin de données",
        dataStoreEmptyText: "Create new store",
        defaultDataStoreEmptyText: "Magasin de données par défaut"
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
})
