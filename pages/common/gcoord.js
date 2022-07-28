/* @preserve
 * gcoord 0.2.2, geographic coordinate library
 * Copyright (c) 2019 Jiulong Hu <me@hujiulong.com>
 */
!function (e, t)
{
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], 
    t) : t(e.gcoord = {})
}
(this, function (e)
{
    "use strict";
    var t = "WGS84", r = t, n = t, o = "GCJ02", a = o, i = "BD09", u = i, f = i, c = i, s = "BD09MC", 
    l = s, M = "EPSG3857", g = M, h = M, v = M, d = M;
    function m(e)
    {
        throw new Error(e)
    }
    function G(e)
    {
        return!isNaN(e) && null !== e && !S(e)
    }
    function S(e)
    {
        return!!e && "[object Array]" === Object.prototype.toString.call(e)
    }
    function P()
    {
        for (var o = [], e = 0; e < arguments.length; e++) {
            o[e] = arguments[e];
        }
        var a = o.length - 1;
        return function ()
        {
            for (var e = [], t = 0; t < arguments.length; t++) {
                e[t] = arguments[t];
            }
            for (var r = a, n = o[a].apply(null, e); r--; ) {
                n = o[r].call(null, n);
            }
            return n;
        }
    }
    var b = Math.sin, y = Math.cos, p = Math.sqrt, B = Math.abs, D = Math.PI, C = 6378245, E = .006693421622965823;
    function W(e)
    {
        var t = e[0], r = e[1];
        if (!J(t, r)) {
            return [t, r];
        }
        for (var n = [t, r], o = n[0], a = n[1], i = x([o, a]), u = i[0] - t, f = i[1] - r; 1e - 6 < B(u) || 1e - 6 < B(f); ) {
            u = (i = x([o -= u, a -= f]))[0] - t, f = i[1] - r;
        }
        return [o, a]
    }
    function x(e)
    {
        var t = e[0], r = e[1];
        if (!J(t, r)) {
            return [t, r];
        }
        var n = function (e, t)
        {
            var r = function (e, t)
            {
                var r = 300 + e + 2 * t + .1 * e * e + .1 * e * t + .1 * p(B(e));
                return r += 2 * (20 * b(6 * e * D) + 20 * b(2 * e * D)) / 3, r += 2 * (20 * b(e * D) + 40 * b(e / 3 * D)) / 3, 
                r += 2 * (150 * b(e / 12 * D) + 300 * b(e / 30 * D)) / 3
            }
            (e - 105, t - 35), n = function (e, t)
            {
                var r = 2 * e - 100 + 3 * t + .2 * t * t + .1 * e * t + .2 * p(B(e));
                return r += 2 * (20 * b(6 * e * D) + 20 * b(2 * e * D)) / 3, r += 2 * (20 * b(t * D) + 40 * b(t / 3 * D)) / 3, 
                r += 2 * (160 * b(t / 12 * D) + 320 * b(t * D / 30)) / 3
            }
            (e - 105, t - 35), o = t / 180 * D, a = b(o), i = p(a = 1 - E * a * a);
            return [r = 180 * r / (C / i * y(o) * D), n = 180 * n / (C * (1 - E) / (a * i) * D)]
        }
        (t, r);
        return [t + n[0], r + n[1]]
    }
    function J(e, t)
    {
        return 72.004 <= e && e <= 137.8347 && .8293 <= t && t <= 55.8271
    }
    var k = Math.sin, L = Math.cos, j = Math.atan2, I = Math.sqrt, q = 3e3 * Math.PI / 180;
    function w(e)
    {
        var t = e[0] - .0065, r = e[1] - .006, n = I(t * t + r * r) - 2e - 5 * k(r * q), o = j(r, t) - 3e - 6 * L(t * q);
        return [n * L(o), n * k(o)]
    }
    function N(e)
    {
        var t = e[0], r = e[1], n = I(t * t + r * r) + 2e - 5 * k(r * q), o = j(r, t) + 3e - 6 * L(t * q);
        return [n * L(o) + .0065, n * k(o) + .006]
    }
    var O = 180 / Math.PI, A = Math.PI / 180, F = 6378137, _ = 20037508.342789244;
    function z(e)
    {
        return [e[0] * O / F, (.5 * Math.PI - 2 * Math.atan(Math.exp(-e[1] / F))) * O]
    }
    function T(e)
    {
        var t = Math.abs(e[0]) <= 180 ? e[0] : e[0] - 360 * (e[0] < 0 ?- 1 : 1), r = [F * t * A, F * Math.log(Math.tan(.25 * Math.PI + .5 * e[1] * A))];
        return r[0] > _ && (r[0] = _), r[0] <- _ && (r[0] =- _), r[1] > _ && (r[1] = _), r[1] <- _ && (r[1] =- _), 
        r
    }
    var U = Math.abs, H = Math.pow, K = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0], 
    Q = [75, 60, 45, 30, 15, 0], R = [[1.410526172116255e - 8, 898305509648872e - 20, - 1.9939833816331, 
    200.9824383106796, - 187.2403703815547, 91.6087516669843, - 23.38765649603339, 2.57121317296198, - .03801003308653, 
    17337981.2], [ - 7.435856389565537e - 9, 8983055097726239e - 21, - .78625201886289, 96.32687599759846, 
     - 1.85204757529826, - 59.36935905485877, 47.40033549296737, - 16.50741931063887, 2.28786674699375, 
    10260144.86], [ - 3.030883460898826e - 8, 898305509983578e - 20, .30071316287616, 59.74293618442277, 
    7.357984074871, - 25.38371002664745, 13.45380521110908, - 3.29883767235584, .32710905363475, 6856817.37], 
    [ - 1.981981304930552e - 8, 8983055099779535e - 21, .03278182852591, 40.31678527705744, .65659298677277, 
     - 4.44255534477492, .85341911805263, .12923347998204, - .04625736007561, 4482777.06], [3.09191371068437e - 9, 
    8983055096812155e - 21, 6995724062e - 14, 23.10934304144901, - .00023663490511, - .6321817810242, 
     - .00663494467273, .03430082397953, - .00466043876332, 2555164.4], [2.890871144776878e - 9, 8983055095805407e - 21, 
     - 3.068298e - 8, 7.47137025468032, - 353937994e - 14, - .02145144861037, - 1234426596e - 14, .00010322952773, 
     - 323890364e - 14, 826088.5]], V = [[ - .0015702102444, 111320.7020616939, 0x60e374c3105a3, - 0x24bb4115e2e164, 
    0x5cc55543bb0ae8, - 0x7ce070193f3784, 0x5e7ca61ddf8150, - 0x261a578d8b24d0, 0x665d60f3742ca, 82.5], 
    [.0008277824516172526, 111320.7020463578, 647795574.6671607, - 4082003173.641316, 10774905663.51142, 
     - 15171875531.51559, 12053065338.62167, - 5124939663.577472, 913311935.9512032, 67.5], [.00337398766765, 
    111320.7020202162, 4481351.045890365, - 23393751.19931662, 79682215.47186455, - 115964993.2797253, 
    97236711.15602145, - 43661946.33752821, 8477230.501135234, 52.5], [.00220636496208, 111320.7020209128, 
    51751.86112841131, 3796837.749470245, 992013.7397791013, - 1221952.21711287, 1340652.697009075, - 620943.6990984312, 
    144416.9293806241, 37.5], [ - .0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 
    6070.750963243378, 54821.18345352118, 9540.606633304236, - 2710.55326746645, 1405.483844121726, 22.5], 
    [ - .0003218135878613132, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 
    2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]];
    function X(e, t, r)
    {
        var n = U(t) / r[9], o = r[0] + r[1] * U(e), a = r[2] + r[3] * n + r[4] * H(n, 2) + r[5] * H(n, 
        3) + r[6] * H(n, 4) + r[7] * H(n, 5) + r[8] * H(n, 6);
        return [o *= e < 0 ?- 1 : 1, a *= t < 0 ?- 1 : 1]
    }
    function Y(e)
    {
        for (var t = e[0], r = e[1], n = [], o = 0; o < Q.length; o++) {
            if (U(r) > Q[o]) {
                n = V[o];
                break 
            }
            return X(t, r, n);
        }
    }
    function Z(e)
    {
        for (var t = e[0], r = e[1], n = [], o = 0; o < K.length; o++) {
            if (K[o] <= r) {
                n = R[o];
                break 
            }
            return X(t, r, n);
        }
    }
    var $ = {
        to : {
            GCJ02 : x, BD09 : P(N, x), BD09MC : P(Y, N, x), EPSG3857 : T
        }
    },
    ee = {
        to : {
            WGS84 : W, BD09 : N, BD09MC : P(Y, N), EPSG3857 : P(T, W)
        }
    },
    te = {
        to : {
            WGS84 : P(W, w), GCJ02 : w, EPSG3857 : P(T, W, w), BD09MC : Y
        }
    },
    re = {
        to : {
            WGS84 : z, GCJ02 : P(x, z), BD09 : P(N, x, z), BD09MC : P(Y, N, x, z)
        }
    },
    ne = {
        to : {
            WGS84 : P(W, w, Z), GCJ02 : P(w, Z), EPSG3857 : P(T, W, w, Z), BD09 : Z
        }
    },
    oe = Object.freeze({
        WGS84 : $, GCJ02 : ee, BD09 : te, EPSG3857 : re, BD09MC : ne
    });
    function ae(e, t, r)
    {
        e || m("coordinate is required"), t || m("original coordinate system is required"), r || m("target coordinate system is required");
        var n = oe[t];
        if (n || m("original coordinate system is invalid"), t === r) {
            return e;
        }
        var o = n.to[r];
        o || m("target coordinate system is invalid");
        var a = typeof e;
        if ("string" != a && "object" != a && m("coordinate must be an geojson or an array of position"), 
        "string" == a) try {
            e = JSON.parse(e)
        }
        catch (e) {
            m("input is not a legal JSON string")
        }
        var i = !1;
        S(e) && (e.length < 2 && m("position must be at 2 numbers long"), G(e[0]) && G(e[1]) || m("position must contain numbers"), 
        e = e.map(Number), i = !0);
        var u = o;
        return i ? u(e) : (function e(t, r, n)
        {
            if (void 0 === n && (n = !1), null !== t) for (var o, a, i, u, f, c, s, l, M = 0, g = 0, h = t.type, 
            v = "FeatureCollection" === h, d = "Feature" === h, G = v ? t.features.length : 1, S = 0;
            S < G;
            S++)
            {
                f = (l = !!(s = v ? t.features[S].geometry : d ? t.geometry : t) && "GeometryCollection" === s.type) ? s.geometries.length : 1;
                for (var P = 0; P < f; P++)
                {
                    var b = 0, y = 0;
                    if (null !== (u = l ? s.geometries[P] : s))
                    {
                        var p = u.type;
                        switch (M = !n || "Polygon" !== p && "MultiPolygon" !== p ? 0 : 1, p)
                        {
                            case null:
                                break;
                            case "Point":
                                if (!1 === r(c = u.coordinates, g, S, b, y)) {
                                    return!1;
                                }
                                g++, b++;
                                break;
                            case "LineString":
                            case "MultiPoint":
                                for (c = u.coordinates, o = 0; o < c.length; o++) {
                                    if (!1 === r(c[o], g, S, b, y)) {
                                        return!1;
                                    }
                                    g++, "MultiPoint" === p && b++
                                }
                                "LineString" === p && b++;
                                break;
                            case "Polygon":
                            case "MultiLineString":
                                for (c = u.coordinates, o = 0; o < c.length; o++)
                                {
                                    for (a = 0; a < c[o].length - M; a++) {
                                        if (!1 === r(c[o][a], g, S, b, y)) {
                                            return!1;
                                        }
                                        g++
                                    }
                                    "MultiLineString" === p && b++, "Polygon" === p && y++
                                }
                                "Polygon" === p && b++;
                                break;
                            case "MultiPolygon":
                                for (c = u.coordinates, o = 0; o < c.length; o++)
                                {
                                    for (a = y = 0; a < c[o].length; a++) {
                                        for (i = 0; i < c[o][a].length - M; i++) {
                                            if (!1 === r(c[o][a][i], g, S, b, y)) {
                                                return!1;
                                            }
                                            g++
                                        }
                                        y++
                                    }
                                    b++
                                }
                                break;
                            case "GeometryCollection":
                                for (o = 0; o < u.geometries.length; o++) {
                                    if (!1 === e(u.geometries[o], r, n)) {
                                        return!1;
                                    }
                                    break;
                                    default:
                                    m("Unknown Geometry Type");
                                }
                        }
                    }
                }
            }
        }
        (e, function (e)
        {
            var t;
            t = u(e), e[0] = t[0], e[1] = t[1];
        }), e)
    }
    var ie = 
    {
        WGS84 : t, WGS1984 : r, EPSG4326 : n, GCJ02 : o, AMap : a, BD09 : i, BD09LL : u, Baidu : f, BMap : c, 
        BD09MC : s, BD09Meter : l, EPSG3857 : M, EPSG900913 : g, EPSG102100 : h, WebMercator : v, WM : d, 
        transform : ae
    };
    e.WGS84 = t, e.WGS1984 = r, e.EPSG4326 = n, e.GCJ02 = o, e.AMap = a, e.BD09 = i, e.BD09LL = u, e.Baidu = f, 
    e.BMap = c, e.BD09MC = s, e.BD09Meter = l, e.EPSG3857 = M, e.EPSG900913 = g, e.EPSG102100 = h, e.WebMercator = v, 
    e.WM = d, e.transform = ae, e.default = ie, Object.defineProperty(e, "__esModule", {
        value :!0
    })
});
