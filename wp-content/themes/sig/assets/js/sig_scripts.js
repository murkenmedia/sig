/*
 Copyright (C) Federico Zivolo 2020
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t();
})(this, function () {
  'use strict';

  function e(e) {
    return e && '[object Function]' === {}.toString.call(e);
  }
  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = e.ownerDocument.defaultView,
      n = o.getComputedStyle(e, null);
    return t ? n[t] : n;
  }
  function o(e) {
    return 'HTML' === e.nodeName ? e : e.parentNode || e.host;
  }
  function n(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case 'HTML':
      case 'BODY':
        return e.ownerDocument.body;
      case '#document':
        return e.body;
    }
    var i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e));
  }
  function i(e) {
    return e && e.referenceNode ? e.referenceNode : e;
  }
  function r(e) {
    return 11 === e ? re : 10 === e ? pe : re || pe;
  }
  function p(e) {
    if (!e) return document.documentElement;
    for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement;
  }
  function s(e) {
    var t = e.nodeName;
    return 'BODY' !== t && ('HTML' === t || p(e.firstElementChild) === e);
  }
  function d(e) {
    return null === e.parentNode ? e : d(e.parentNode);
  }
  function a(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      n = o ? e : t,
      i = o ? t : e,
      r = document.createRange();
    r.setStart(n, 0), r.setEnd(i, 0);
    var l = r.commonAncestorContainer;
    if (e !== l && t !== l || n.contains(i)) return s(l) ? l : p(l);
    var f = d(e);
    return f.host ? a(f.host, t) : a(e, d(t).host);
  }
  function l(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
      o = 'top' === t ? 'scrollTop' : 'scrollLeft',
      n = e.nodeName;
    if ('BODY' === n || 'HTML' === n) {
      var i = e.ownerDocument.documentElement,
        r = e.ownerDocument.scrollingElement || i;
      return r[o];
    }
    return e[o];
  }
  function f(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      n = l(t, 'top'),
      i = l(t, 'left'),
      r = o ? -1 : 1;
    return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e;
  }
  function m(e, t) {
    var o = 'x' === t ? 'Left' : 'Top',
      n = 'Left' == o ? 'Right' : 'Bottom';
    return parseFloat(e['border' + o + 'Width']) + parseFloat(e['border' + n + 'Width']);
  }
  function h(e, t, o, n) {
    return ee(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], r(10) ? parseInt(o['offset' + e]) + parseInt(n['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0);
  }
  function c(e) {
    var t = e.body,
      o = e.documentElement,
      n = r(10) && getComputedStyle(o);
    return {
      height: h('Height', t, o, n),
      width: h('Width', t, o, n)
    };
  }
  function g(e) {
    return le({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    });
  }
  function u(e) {
    var o = {};
    try {
      if (r(10)) {
        o = e.getBoundingClientRect();
        var n = l(e, 'top'),
          i = l(e, 'left');
        o.top += n, o.left += i, o.bottom += n, o.right += i;
      } else o = e.getBoundingClientRect();
    } catch (t) {}
    var p = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top
      },
      s = 'HTML' === e.nodeName ? c(e.ownerDocument) : {},
      d = s.width || e.clientWidth || p.width,
      a = s.height || e.clientHeight || p.height,
      f = e.offsetWidth - d,
      h = e.offsetHeight - a;
    if (f || h) {
      var u = t(e);
      f -= m(u, 'x'), h -= m(u, 'y'), p.width -= f, p.height -= h;
    }
    return g(p);
  }
  function b(e, o) {
    var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      p = r(10),
      s = 'HTML' === o.nodeName,
      d = u(e),
      a = u(o),
      l = n(e),
      m = t(o),
      h = parseFloat(m.borderTopWidth),
      c = parseFloat(m.borderLeftWidth);
    i && s && (a.top = ee(a.top, 0), a.left = ee(a.left, 0));
    var b = g({
      top: d.top - a.top - h,
      left: d.left - a.left - c,
      width: d.width,
      height: d.height
    });
    if (b.marginTop = 0, b.marginLeft = 0, !p && s) {
      var w = parseFloat(m.marginTop),
        y = parseFloat(m.marginLeft);
      b.top -= h - w, b.bottom -= h - w, b.left -= c - y, b.right -= c - y, b.marginTop = w, b.marginLeft = y;
    }
    return (p && !i ? o.contains(l) : o === l && 'BODY' !== l.nodeName) && (b = f(b, o)), b;
  }
  function w(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = e.ownerDocument.documentElement,
      n = b(e, o),
      i = ee(o.clientWidth, window.innerWidth || 0),
      r = ee(o.clientHeight, window.innerHeight || 0),
      p = t ? 0 : l(o),
      s = t ? 0 : l(o, 'left'),
      d = {
        top: p - n.top + n.marginTop,
        left: s - n.left + n.marginLeft,
        width: i,
        height: r
      };
    return g(d);
  }
  function y(e) {
    var n = e.nodeName;
    if ('BODY' === n || 'HTML' === n) return !1;
    if ('fixed' === t(e, 'position')) return !0;
    var i = o(e);
    return !!i && y(i);
  }
  function E(e) {
    if (!e || !e.parentElement || r()) return document.documentElement;
    for (var o = e.parentElement; o && 'none' === t(o, 'transform');) o = o.parentElement;
    return o || document.documentElement;
  }
  function v(e, t, r, p) {
    var s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
      d = {
        top: 0,
        left: 0
      },
      l = s ? E(e) : a(e, i(t));
    if ('viewport' === p) d = w(l, s);else {
      var f;
      'scrollParent' === p ? (f = n(o(t)), 'BODY' === f.nodeName && (f = e.ownerDocument.documentElement)) : 'window' === p ? f = e.ownerDocument.documentElement : f = p;
      var m = b(f, l, s);
      if ('HTML' === f.nodeName && !y(l)) {
        var h = c(e.ownerDocument),
          g = h.height,
          u = h.width;
        d.top += m.top - m.marginTop, d.bottom = g + m.top, d.left += m.left - m.marginLeft, d.right = u + m.left;
      } else d = m;
    }
    r = r || 0;
    var v = 'number' == typeof r;
    return d.left += v ? r : r.left || 0, d.top += v ? r : r.top || 0, d.right -= v ? r : r.right || 0, d.bottom -= v ? r : r.bottom || 0, d;
  }
  function x(e) {
    var t = e.width,
      o = e.height;
    return t * o;
  }
  function O(e, t, o, n, i) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf('auto')) return e;
    var p = v(o, n, r, i),
      s = {
        top: {
          width: p.width,
          height: t.top - p.top
        },
        right: {
          width: p.right - t.right,
          height: p.height
        },
        bottom: {
          width: p.width,
          height: p.bottom - t.bottom
        },
        left: {
          width: t.left - p.left,
          height: p.height
        }
      },
      d = Object.keys(s).map(function (e) {
        return le({
          key: e
        }, s[e], {
          area: x(s[e])
        });
      }).sort(function (e, t) {
        return t.area - e.area;
      }),
      a = d.filter(function (e) {
        var t = e.width,
          n = e.height;
        return t >= o.clientWidth && n >= o.clientHeight;
      }),
      l = 0 < a.length ? a[0].key : d[0].key,
      f = e.split('-')[1];
    return l + (f ? '-' + f : '');
  }
  function L(e, t, o) {
    var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
      r = n ? E(t) : a(t, i(o));
    return b(o, r, n);
  }
  function S(e) {
    var t = e.ownerDocument.defaultView,
      o = t.getComputedStyle(e),
      n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
      i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
      r = {
        width: e.offsetWidth + i,
        height: e.offsetHeight + n
      };
    return r;
  }
  function T(e) {
    var t = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }
  function C(e, t, o) {
    o = o.split('-')[0];
    var n = S(e),
      i = {
        width: n.width,
        height: n.height
      },
      r = -1 !== ['right', 'left'].indexOf(o),
      p = r ? 'top' : 'left',
      s = r ? 'left' : 'top',
      d = r ? 'height' : 'width',
      a = r ? 'width' : 'height';
    return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[T(s)], i;
  }
  function D(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function N(e, t, o) {
    if (Array.prototype.findIndex) return e.findIndex(function (e) {
      return e[t] === o;
    });
    var n = D(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(n);
  }
  function P(t, o, n) {
    var i = void 0 === n ? t : t.slice(0, N(t, 'name', n));
    return i.forEach(function (t) {
      t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      var n = t['function'] || t.fn;
      t.enabled && e(n) && (o.offsets.popper = g(o.offsets.popper), o.offsets.reference = g(o.offsets.reference), o = n(o, t));
    }), o;
  }
  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = C(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }
  function W(e, t) {
    return e.some(function (e) {
      var o = e.name,
        n = e.enabled;
      return n && o === t;
    });
  }
  function B(e) {
    for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
      var i = t[n],
        r = i ? '' + i + o : e;
      if ('undefined' != typeof document.body.style[r]) return r;
    }
    return null;
  }
  function H() {
    return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }
  function A(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }
  function M(e, t, o, i) {
    var r = 'BODY' === e.nodeName,
      p = r ? e.ownerDocument.defaultView : e;
    p.addEventListener(t, o, {
      passive: !0
    }), r || M(n(p.parentNode), t, o, i), i.push(p);
  }
  function F(e, t, o, i) {
    o.updateBound = i, A(e).addEventListener('resize', o.updateBound, {
      passive: !0
    });
    var r = n(e);
    return M(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o;
  }
  function I() {
    this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate));
  }
  function R(e, t) {
    return A(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
      e.removeEventListener('scroll', t.updateBound);
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
  }
  function U() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = R(this.reference, this.state));
  }
  function Y(e) {
    return '' !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function V(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = '';
      -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Y(t[o]) && (n = 'px'), e.style[o] = t[o] + n;
    });
  }
  function j(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = t[o];
      !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }
  function q(e, t) {
    var o = e.offsets,
      n = o.popper,
      i = o.reference,
      r = $,
      p = function p(e) {
        return e;
      },
      s = r(i.width),
      d = r(n.width),
      a = -1 !== ['left', 'right'].indexOf(e.placement),
      l = -1 !== e.placement.indexOf('-'),
      f = t ? a || l || s % 2 == d % 2 ? r : Z : p,
      m = t ? r : p;
    return {
      left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
      top: m(n.top),
      bottom: m(n.bottom),
      right: f(n.right)
    };
  }
  function K(e, t, o) {
    var n = D(e, function (e) {
        var o = e.name;
        return o === t;
      }),
      i = !!n && e.some(function (e) {
        return e.name === o && e.enabled && e.order < n.order;
      });
    if (!i) {
      var r = '`' + t + '`';
      console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!');
    }
    return i;
  }
  function z(e) {
    return 'end' === e ? 'start' : 'start' === e ? 'end' : e;
  }
  function G(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = he.indexOf(e),
      n = he.slice(o + 1).concat(he.slice(0, o));
    return t ? n.reverse() : n;
  }
  function _(e, t, o, n) {
    var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +i[1],
      p = i[2];
    if (!r) return e;
    if (0 === p.indexOf('%')) {
      var s;
      switch (p) {
        case '%p':
          s = o;
          break;
        case '%':
        case '%r':
        default:
          s = n;
      }
      var d = g(s);
      return d[t] / 100 * r;
    }
    if ('vh' === p || 'vw' === p) {
      var a;
      return a = 'vh' === p ? ee(document.documentElement.clientHeight, window.innerHeight || 0) : ee(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r;
    }
    return r;
  }
  function X(e, t, o, n) {
    var i = [0, 0],
      r = -1 !== ['right', 'left'].indexOf(n),
      p = e.split(/(\+|\-)/).map(function (e) {
        return e.trim();
      }),
      s = p.indexOf(D(p, function (e) {
        return -1 !== e.search(/,|\s/);
      }));
    p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    var d = /\s*,\s*|\s+/,
      a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
    return a = a.map(function (e, n) {
      var i = (1 === n ? !r : r) ? 'height' : 'width',
        p = !1;
      return e.reduce(function (e, t) {
        return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t);
      }, []).map(function (e) {
        return _(e, i, t, o);
      });
    }), a.forEach(function (e, t) {
      e.forEach(function (o, n) {
        Y(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1));
      });
    }), i;
  }
  function J(e, t) {
    var o,
      n = t.offset,
      i = e.placement,
      r = e.offsets,
      p = r.popper,
      s = r.reference,
      d = i.split('-')[0];
    return o = Y(+n) ? [+n, 0] : X(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e;
  }
  var Q = Math.min,
    Z = Math.floor,
    $ = Math.round,
    ee = Math.max,
    te = 'undefined' != typeof window && 'undefined' != typeof document && 'undefined' != typeof navigator,
    oe = function () {
      for (var e = ['Edge', 'Trident', 'Firefox'], t = 0; t < e.length; t += 1) if (te && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
      return 0;
    }(),
    ne = te && window.Promise,
    ie = ne ? function (e) {
      var t = !1;
      return function () {
        t || (t = !0, window.Promise.resolve().then(function () {
          t = !1, e();
        }));
      };
    } : function (e) {
      var t = !1;
      return function () {
        t || (t = !0, setTimeout(function () {
          t = !1, e();
        }, oe));
      };
    },
    re = te && !!(window.MSInputMethodContext && document.documentMode),
    pe = te && /MSIE 10/.test(navigator.userAgent),
    se = function se(e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
    },
    de = function () {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
      return function (t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
      };
    }(),
    ae = function ae(e, t, o) {
      return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = o, e;
    },
    le = Object.assign || function (e) {
      for (var t, o = 1; o < arguments.length; o++) for (var n in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e;
    },
    fe = te && /Firefox/i.test(navigator.userAgent),
    me = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
    he = me.slice(3),
    ce = {
      FLIP: 'flip',
      CLOCKWISE: 'clockwise',
      COUNTERCLOCKWISE: 'counterclockwise'
    },
    ge = function () {
      function t(o, n) {
        var i = this,
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        se(this, t), this.scheduleUpdate = function () {
          return requestAnimationFrame(i.update);
        }, this.update = ie(this.update.bind(this)), this.options = le({}, t.Defaults, r), this.state = {
          isDestroyed: !1,
          isCreated: !1,
          scrollParents: []
        }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(le({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
          i.options.modifiers[e] = le({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
        }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
          return le({
            name: e
          }, i.options.modifiers[e]);
        }).sort(function (e, t) {
          return e.order - t.order;
        }), this.modifiers.forEach(function (t) {
          t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
        }), this.update();
        var p = this.options.eventsEnabled;
        p && this.enableEventListeners(), this.state.eventsEnabled = p;
      }
      return de(t, [{
        key: 'update',
        value: function value() {
          return k.call(this);
        }
      }, {
        key: 'destroy',
        value: function value() {
          return H.call(this);
        }
      }, {
        key: 'enableEventListeners',
        value: function value() {
          return I.call(this);
        }
      }, {
        key: 'disableEventListeners',
        value: function value() {
          return U.call(this);
        }
      }]), t;
    }();
  return ge.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ge.placements = me, ge.Defaults = {
    placement: 'bottom',
    positionFixed: !1,
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function fn(e) {
          var t = e.placement,
            o = t.split('-')[0],
            n = t.split('-')[1];
          if (n) {
            var i = e.offsets,
              r = i.reference,
              p = i.popper,
              s = -1 !== ['bottom', 'top'].indexOf(o),
              d = s ? 'left' : 'top',
              a = s ? 'width' : 'height',
              l = {
                start: ae({}, d, r[d]),
                end: ae({}, d, r[d] + r[a] - p[a])
              };
            e.offsets.popper = le({}, p, l[n]);
          }
          return e;
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: J,
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.boundariesElement || p(e.instance.popper);
          e.instance.reference === o && (o = p(o));
          var n = B('transform'),
            i = e.instance.popper.style,
            r = i.top,
            s = i.left,
            d = i[n];
          i.top = '', i.left = '', i[n] = '';
          var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
          i.top = r, i.left = s, i[n] = d, t.boundaries = a;
          var l = t.priority,
            f = e.offsets.popper,
            m = {
              primary: function primary(e) {
                var o = f[e];
                return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), ae({}, e, o);
              },
              secondary: function secondary(e) {
                var o = 'right' === e ? 'left' : 'top',
                  n = f[o];
                return f[e] > a[e] && !t.escapeWithReference && (n = Q(f[o], a[e] - ('right' === e ? f.width : f.height))), ae({}, o, n);
              }
            };
          return l.forEach(function (e) {
            var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
            f = le({}, f, m[t](e));
          }), e.offsets.popper = f, e;
        },
        priority: ['left', 'right', 'top', 'bottom'],
        padding: 5,
        boundariesElement: 'scrollParent'
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function fn(e) {
          var t = e.offsets,
            o = t.popper,
            n = t.reference,
            i = e.placement.split('-')[0],
            r = Z,
            p = -1 !== ['top', 'bottom'].indexOf(i),
            s = p ? 'right' : 'bottom',
            d = p ? 'left' : 'top',
            a = p ? 'width' : 'height';
          return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e;
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function fn(e, o) {
          var n;
          if (!K(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
          var i = o.element;
          if ('string' == typeof i) {
            if (i = e.instance.popper.querySelector(i), !i) return e;
          } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
          var r = e.placement.split('-')[0],
            p = e.offsets,
            s = p.popper,
            d = p.reference,
            a = -1 !== ['left', 'right'].indexOf(r),
            l = a ? 'height' : 'width',
            f = a ? 'Top' : 'Left',
            m = f.toLowerCase(),
            h = a ? 'left' : 'top',
            c = a ? 'bottom' : 'right',
            u = S(i)[l];
          d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)), d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]), e.offsets.popper = g(e.offsets.popper);
          var b = d[m] + d[l] / 2 - u / 2,
            w = t(e.instance.popper),
            y = parseFloat(w['margin' + f]),
            E = parseFloat(w['border' + f + 'Width']),
            v = b - e.offsets.popper[m] - y - E;
          return v = ee(Q(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, ae(n, m, $(v)), ae(n, h, ''), n), e;
        },
        element: '[x-arrow]'
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function fn(e, t) {
          if (W(e.instance.modifiers, 'inner')) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var o = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
            n = e.placement.split('-')[0],
            i = T(n),
            r = e.placement.split('-')[1] || '',
            p = [];
          switch (t.behavior) {
            case ce.FLIP:
              p = [n, i];
              break;
            case ce.CLOCKWISE:
              p = G(n);
              break;
            case ce.COUNTERCLOCKWISE:
              p = G(n, !0);
              break;
            default:
              p = t.behavior;
          }
          return p.forEach(function (s, d) {
            if (n !== s || p.length === d + 1) return e;
            n = e.placement.split('-')[0], i = T(n);
            var a = e.offsets.popper,
              l = e.offsets.reference,
              f = Z,
              m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom),
              h = f(a.left) < f(o.left),
              c = f(a.right) > f(o.right),
              g = f(a.top) < f(o.top),
              u = f(a.bottom) > f(o.bottom),
              b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u,
              w = -1 !== ['top', 'bottom'].indexOf(n),
              y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u),
              E = !!t.flipVariationsByContent && (w && 'start' === r && c || w && 'end' === r && h || !w && 'start' === r && u || !w && 'end' === r && g),
              v = y || E;
            (m || b || v) && (e.flipped = !0, (m || b) && (n = p[d + 1]), v && (r = z(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = le({}, e.offsets.popper, C(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, 'flip'));
          }), e;
        },
        behavior: 'flip',
        padding: 5,
        boundariesElement: 'viewport',
        flipVariations: !1,
        flipVariationsByContent: !1
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function fn(e) {
          var t = e.placement,
            o = t.split('-')[0],
            n = e.offsets,
            i = n.popper,
            r = n.reference,
            p = -1 !== ['left', 'right'].indexOf(o),
            s = -1 === ['top', 'left'].indexOf(o);
          return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = T(t), e.offsets.popper = g(i), e;
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function fn(e) {
          if (!K(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
          var t = e.offsets.reference,
            o = D(e.instance.modifiers, function (e) {
              return 'preventOverflow' === e.name;
            }).boundaries;
          if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes['x-out-of-boundaries'] = '';
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes['x-out-of-boundaries'] = !1;
          }
          return e;
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.x,
            n = t.y,
            i = e.offsets.popper,
            r = D(e.instance.modifiers, function (e) {
              return 'applyStyle' === e.name;
            }).gpuAcceleration;
          void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
          var s,
            d,
            a = void 0 === r ? t.gpuAcceleration : r,
            l = p(e.instance.popper),
            f = u(l),
            m = {
              position: i.position
            },
            h = q(e, 2 > window.devicePixelRatio || !fe),
            c = 'bottom' === o ? 'top' : 'bottom',
            g = 'right' === n ? 'left' : 'right',
            b = B('transform');
          if (d = 'bottom' == c ? 'HTML' === l.nodeName ? -l.clientHeight + h.bottom : -f.height + h.bottom : h.top, s = 'right' == g ? 'HTML' === l.nodeName ? -l.clientWidth + h.right : -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[g] = 0, m.willChange = 'transform';else {
            var w = 'bottom' == c ? -1 : 1,
              y = 'right' == g ? -1 : 1;
            m[c] = d * w, m[g] = s * y, m.willChange = c + ', ' + g;
          }
          var E = {
            "x-placement": e.placement
          };
          return e.attributes = le({}, E, e.attributes), e.styles = le({}, m, e.styles), e.arrowStyles = le({}, e.offsets.arrow, e.arrowStyles), e;
        },
        gpuAcceleration: !0,
        x: 'bottom',
        y: 'right'
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function fn(e) {
          return V(e.instance.popper, e.styles), j(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && V(e.arrowElement, e.arrowStyles), e;
        },
        onLoad: function onLoad(e, t, o, n, i) {
          var r = L(i, t, e, o.positionFixed),
            p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
          return t.setAttribute('x-placement', p), V(t, {
            position: o.positionFixed ? 'fixed' : 'absolute'
          }), o;
        },
        gpuAcceleration: void 0
      }
    }
  }, ge;
});
/*!
  * Bootstrap util.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Util = factory(global.jQuery));
})(this, function ($) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  var $__default = /*#__PURE__*/_interopDefaultLegacy($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.2): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Private TransitionEnd Helpers
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return "" + obj;
    }
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }
  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($__default["default"](event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined;
      }
    };
  }
  function transitionEndEmulator(duration) {
    var _this = this;
    var called = false;
    $__default["default"](this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }
  function setTransitionEndSupport() {
    $__default["default"].fn.emulateTransitionEnd = transitionEndEmulator;
    $__default["default"].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * Public Util API
   */

  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');
      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }
      try {
        return document.querySelector(selector) ? selector : null;
      } catch (_) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element

      var transitionDuration = $__default["default"](element).css('transition-duration');
      var transitionDelay = $__default["default"](element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first

      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $__default["default"](element).trigger(TRANSITION_END);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document

      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }
      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root

      if (!element.parentNode) {
        return null;
      }
      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $__default["default"] === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }
      var version = $__default["default"].fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;
      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();
  return Util;
});
/*!
  * Bootstrap button.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Button = factory(global.jQuery));
})(this, function ($) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  /**
   * Constants
   */

  var NAME = 'button';
  var VERSION = '4.6.2';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_BUTTON = 'btn';
  var CLASS_NAME_FOCUS = 'focus';
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY);
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY + DATA_API_KEY;
  var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  var SELECTOR_INPUT = 'input:not([type="hidden"])';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_BUTTON = '.btn';
  /**
   * Class definition
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
      this.shouldAvoidTriggerChange = false;
    } // Getters

    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $__default["default"](this._element).closest(SELECTOR_DATA_TOGGLES)[0];
      if (rootElement) {
        var input = this._element.querySelector(SELECTOR_INPUT);
        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);
              if (activeElement) {
                $__default["default"](activeElement).removeClass(CLASS_NAME_ACTIVE);
              }
            }
          }
          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
            }
            if (!this.shouldAvoidTriggerChange) {
              $__default["default"](input).trigger('change');
            }
          }
          input.focus();
          addAriaPressed = false;
        }
      }
      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
        }
        if (triggerChangeEvent) {
          $__default["default"](this._element).toggleClass(CLASS_NAME_ACTIVE);
        }
      }
    };
    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config, avoidTriggerChange) {
      return this.each(function () {
        var $element = $__default["default"](this);
        var data = $element.data(DATA_KEY);
        if (!data) {
          data = new Button(this);
          $element.data(DATA_KEY, data);
        }
        data.shouldAvoidTriggerChange = avoidTriggerChange;
        if (config === 'toggle') {
          data[config]();
        }
      });
    };
    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Button;
  }();
  /**
   * Data API implementation
   */

  $__default["default"](document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;
    var initialButton = button;
    if (!$__default["default"](button).hasClass(CLASS_NAME_BUTTON)) {
      button = $__default["default"](button).closest(SELECTOR_BUTTON)[0];
    }
    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(SELECTOR_INPUT);
      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }
      if (initialButton.tagName === 'INPUT' || button.tagName !== 'LABEL') {
        Button._jQueryInterface.call($__default["default"](button), 'toggle', initialButton.tagName === 'INPUT');
      }
    }
  }).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = $__default["default"](event.target).closest(SELECTOR_BUTTON)[0];
    $__default["default"](button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
  });
  $__default["default"](window).on(EVENT_LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));
    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(SELECTOR_INPUT);
      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE);
      }
    } // find all button toggles

    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));
    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];
      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        _button.classList.remove(CLASS_NAME_ACTIVE);
      }
    }
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = Button._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Button;
  $__default["default"].fn[NAME].noConflict = function () {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };
  return Button;
});
/*!
  * Bootstrap collapse.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) : typeof define === 'function' && define.amd ? define(['jquery', './util'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Collapse = factory(global.jQuery, global.Util));
})(this, function ($, Util) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Util__default = /*#__PURE__*/_interopDefaultLegacy(Util);
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  /**
   * Constants
   */

  var NAME = 'collapse';
  var VERSION = '4.6.2';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var DIMENSION_WIDTH = 'width';
  var DIMENSION_HEIGHT = 'height';
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="collapse"]';
  var Default = {
    toggle: true,
    parent: ''
  };
  var DefaultType = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  /**
   * Class definition
   */

  var Collapse = /*#__PURE__*/function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));
      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util__default["default"].getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });
        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;
          this._triggerArray.push(elem);
        }
      }
      this._parent = this._config.parent ? this._getParent() : null;
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }
      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters

    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($__default["default"](this._element).hasClass(CLASS_NAME_SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };
    _proto.show = function show() {
      var _this = this;
      if (this._isTransitioning || $__default["default"](this._element).hasClass(CLASS_NAME_SHOW)) {
        return;
      }
      var actives;
      var activesData;
      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }
          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });
        if (actives.length === 0) {
          actives = null;
        }
      }
      if (actives) {
        activesData = $__default["default"](actives).not(this._selector).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }
      var startEvent = $__default["default"].Event(EVENT_SHOW);
      $__default["default"](this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }
      if (actives) {
        Collapse._jQueryInterface.call($__default["default"](actives).not(this._selector), 'hide');
        if (!activesData) {
          $__default["default"](actives).data(DATA_KEY, null);
        }
      }
      var dimension = this._getDimension();
      $__default["default"](this._element).removeClass(CLASS_NAME_COLLAPSE).addClass(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      if (this._triggerArray.length) {
        $__default["default"](this._triggerArray).removeClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', true);
      }
      this.setTransitioning(true);
      var complete = function complete() {
        $__default["default"](_this._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW);
        _this._element.style[dimension] = '';
        _this.setTransitioning(false);
        $__default["default"](_this._element).trigger(EVENT_SHOWN);
      };
      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util__default["default"].getTransitionDurationFromElement(this._element);
      $__default["default"](this._element).one(Util__default["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };
    _proto.hide = function hide() {
      var _this2 = this;
      if (this._isTransitioning || !$__default["default"](this._element).hasClass(CLASS_NAME_SHOW)) {
        return;
      }
      var startEvent = $__default["default"].Event(EVENT_HIDE);
      $__default["default"](this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }
      var dimension = this._getDimension();
      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util__default["default"].reflow(this._element);
      $__default["default"](this._element).addClass(CLASS_NAME_COLLAPSING).removeClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW);
      var triggerArrayLength = this._triggerArray.length;
      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util__default["default"].getSelectorFromElement(trigger);
          if (selector !== null) {
            var $elem = $__default["default"]([].slice.call(document.querySelectorAll(selector)));
            if (!$elem.hasClass(CLASS_NAME_SHOW)) {
              $__default["default"](trigger).addClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }
      this.setTransitioning(true);
      var complete = function complete() {
        _this2.setTransitioning(false);
        $__default["default"](_this2._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE).trigger(EVENT_HIDDEN);
      };
      this._element.style[dimension] = '';
      var transitionDuration = Util__default["default"].getTransitionDurationFromElement(this._element);
      $__default["default"](this._element).one(Util__default["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };
    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };
    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util__default["default"].typeCheckConfig(NAME, config, DefaultType);
      return config;
    };
    _proto._getDimension = function _getDimension() {
      var hasWidth = $__default["default"](this._element).hasClass(DIMENSION_WIDTH);
      return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT;
    };
    _proto._getParent = function _getParent() {
      var _this3 = this;
      var parent;
      if (Util__default["default"].isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }
      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $__default["default"](children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };
    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $__default["default"](element).hasClass(CLASS_NAME_SHOW);
      if (triggerArray.length) {
        $__default["default"](triggerArray).toggleClass(CLASS_NAME_COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util__default["default"].getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };
    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default["default"](this);
        var data = $element.data(DATA_KEY);
        var _config = _extends({}, Default, $element.data(), typeof config === 'object' && config ? config : {});
        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }
        if (!data) {
          data = new Collapse(this, _config);
          $element.data(DATA_KEY, data);
        }
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return Collapse;
  }();
  /**
   * Data API implementation
   */

  $__default["default"](document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }
    var $trigger = $__default["default"](this);
    var selector = Util__default["default"].getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $__default["default"](selectors).each(function () {
      var $target = $__default["default"](this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = Collapse._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Collapse;
  $__default["default"].fn[NAME].noConflict = function () {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };
  return Collapse;
});
/*!
  * Bootstrap tab.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) : typeof define === 'function' && define.amd ? define(['jquery', './util'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tab = factory(global.jQuery, global.Util));
})(this, function ($, Util) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Util__default = /*#__PURE__*/_interopDefaultLegacy(Util);
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  /**
   * Constants
   */

  var NAME = 'tab';
  var VERSION = '4.6.2';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_UL = '> li > .active';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
  /**
   * Class definition
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
    } // Getters

    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;
      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $__default["default"](this._element).hasClass(CLASS_NAME_ACTIVE) || $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED) || this._element.hasAttribute('disabled')) {
        return;
      }
      var target;
      var previous;
      var listElement = $__default["default"](this._element).closest(SELECTOR_NAV_LIST_GROUP)[0];
      var selector = Util__default["default"].getSelectorFromElement(this._element);
      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = $__default["default"].makeArray($__default["default"](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }
      var hideEvent = $__default["default"].Event(EVENT_HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $__default["default"].Event(EVENT_SHOW, {
        relatedTarget: previous
      });
      if (previous) {
        $__default["default"](previous).trigger(hideEvent);
      }
      $__default["default"](this._element).trigger(showEvent);
      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }
      if (selector) {
        target = document.querySelector(selector);
      }
      this._activate(this._element, listElement);
      var complete = function complete() {
        var hiddenEvent = $__default["default"].Event(EVENT_HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $__default["default"].Event(EVENT_SHOWN, {
          relatedTarget: previous
        });
        $__default["default"](previous).trigger(hiddenEvent);
        $__default["default"](_this._element).trigger(shownEvent);
      };
      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };
    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;
      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $__default["default"](container).find(SELECTOR_ACTIVE_UL) : $__default["default"](container).children(SELECTOR_ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $__default["default"](active).hasClass(CLASS_NAME_FADE);
      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };
      if (active && isTransitioning) {
        var transitionDuration = Util__default["default"].getTransitionDurationFromElement(active);
        $__default["default"](active).removeClass(CLASS_NAME_SHOW).one(Util__default["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };
    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $__default["default"](active).removeClass(CLASS_NAME_ACTIVE);
        var dropdownChild = $__default["default"](active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];
        if (dropdownChild) {
          $__default["default"](dropdownChild).removeClass(CLASS_NAME_ACTIVE);
        }
        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }
      $__default["default"](element).addClass(CLASS_NAME_ACTIVE);
      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }
      Util__default["default"].reflow(element);
      if (element.classList.contains(CLASS_NAME_FADE)) {
        element.classList.add(CLASS_NAME_SHOW);
      }
      var parent = element.parentNode;
      if (parent && parent.nodeName === 'LI') {
        parent = parent.parentNode;
      }
      if (parent && $__default["default"](parent).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = $__default["default"](element).closest(SELECTOR_DROPDOWN)[0];
        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE));
          $__default["default"](dropdownToggleList).addClass(CLASS_NAME_ACTIVE);
        }
        element.setAttribute('aria-expanded', true);
      }
      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $__default["default"](this);
        var data = $this.data(DATA_KEY);
        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Tab;
  }();
  /**
   * Data API implementation
   */

  $__default["default"](document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($__default["default"](this), 'show');
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = Tab._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Tab;
  $__default["default"].fn[NAME].noConflict = function () {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };
  return Tab;
});
/*!
  * Bootstrap tooltip.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('popper.js'), require('./util.js')) : typeof define === 'function' && define.amd ? define(['jquery', 'popper.js', './util'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tooltip = factory(global.jQuery, global.Popper, global.Util));
})(this, function ($, Popper, Util) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Popper__default = /*#__PURE__*/_interopDefaultLegacy(Popper);
  var Util__default = /*#__PURE__*/_interopDefaultLegacy(Util);
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.2): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();
    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
      }
      return true;
    }
    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (regExp[i].test(attrName)) {
        return true;
      }
    }
    return false;
  }
  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }
    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }
    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));
    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();
      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }
      var attributeList = [].slice.call(el.attributes); // eslint-disable-next-line unicorn/prefer-spread

      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };
    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);
      if (_ret === "continue") continue;
    }
    return createdDocument.body.innerHTML;
  }

  /**
   * Constants
   */

  var NAME = 'tooltip';
  var VERSION = '4.6.2';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var SELECTOR_ARROW = '.arrow';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    INSERTED: "inserted" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    FOCUSOUT: "focusout" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY
  };
  /**
   * Class definition
   */

  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(element, config) {
      if (typeof Popper__default["default"] === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      } // Private

      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;
      this._setListeners();
    } // Getters

    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };
    _proto.disable = function disable() {
      this._isEnabled = false;
    };
    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };
    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $__default["default"](event.currentTarget).data(dataKey);
        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $__default["default"](event.currentTarget).data(dataKey, context);
        }
        context._activeTrigger.click = !context._activeTrigger.click;
        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($__default["default"](this.getTipElement()).hasClass(CLASS_NAME_SHOW)) {
          this._leave(null, this);
          return;
        }
        this._enter(null, this);
      }
    };
    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $__default["default"].removeData(this.element, this.constructor.DATA_KEY);
      $__default["default"](this.element).off(this.constructor.EVENT_KEY);
      $__default["default"](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);
      if (this.tip) {
        $__default["default"](this.tip).remove();
      }
      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      if (this._popper) {
        this._popper.destroy();
      }
      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };
    _proto.show = function show() {
      var _this = this;
      if ($__default["default"](this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }
      var showEvent = $__default["default"].Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        $__default["default"](this.element).trigger(showEvent);
        var shadowRoot = Util__default["default"].findShadowRoot(this.element);
        var isInTheDom = $__default["default"].contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);
        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }
        var tip = this.getTipElement();
        var tipId = Util__default["default"].getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();
        if (this.config.animation) {
          $__default["default"](tip).addClass(CLASS_NAME_FADE);
        }
        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;
        var attachment = this._getAttachment(placement);
        this.addAttachmentClass(attachment);
        var container = this._getContainer();
        $__default["default"](tip).data(this.constructor.DATA_KEY, this);
        if (!$__default["default"].contains(this.element.ownerDocument.documentElement, this.tip)) {
          $__default["default"](tip).appendTo(container);
        }
        $__default["default"](this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper__default["default"](this.element, tip, this._getPopperConfig(attachment));
        $__default["default"](tip).addClass(CLASS_NAME_SHOW);
        $__default["default"](tip).addClass(this.config.customClass); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $__default["default"](document.body).children().on('mouseover', null, $__default["default"].noop);
        }
        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }
          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $__default["default"](_this.element).trigger(_this.constructor.Event.SHOWN);
          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };
        if ($__default["default"](this.tip).hasClass(CLASS_NAME_FADE)) {
          var transitionDuration = Util__default["default"].getTransitionDurationFromElement(this.tip);
          $__default["default"](this.tip).one(Util__default["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };
    _proto.hide = function hide(callback) {
      var _this2 = this;
      var tip = this.getTipElement();
      var hideEvent = $__default["default"].Event(this.constructor.Event.HIDE);
      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }
        _this2._cleanTipClass();
        _this2.element.removeAttribute('aria-describedby');
        $__default["default"](_this2.element).trigger(_this2.constructor.Event.HIDDEN);
        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }
        if (callback) {
          callback();
        }
      };
      $__default["default"](this.element).trigger(hideEvent);
      if (hideEvent.isDefaultPrevented()) {
        return;
      }
      $__default["default"](tip).removeClass(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $__default["default"](document.body).children().off('mouseover', null, $__default["default"].noop);
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      if ($__default["default"](this.tip).hasClass(CLASS_NAME_FADE)) {
        var transitionDuration = Util__default["default"].getTransitionDurationFromElement(tip);
        $__default["default"](tip).one(Util__default["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
      this._hoverState = '';
    };
    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };
    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default["default"](this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };
    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default["default"](this.config.template)[0];
      return this.tip;
    };
    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($__default["default"](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $__default["default"](tip).removeClass(CLASS_NAME_FADE + " " + CLASS_NAME_SHOW);
    };
    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$__default["default"](content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($__default["default"](content).text());
        }
        return;
      }
      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }
        $element.html(content);
      } else {
        $element.text(content);
      }
    };
    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');
      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }
      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;
      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: SELECTOR_ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };
    _proto._getOffset = function _getOffset() {
      var _this4 = this;
      var offset = {};
      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element));
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }
      return offset;
    };
    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }
      if (Util__default["default"].isElement(this.config.container)) {
        return $__default["default"](this.config.container);
      }
      return $__default["default"](document).find(this.config.container);
    };
    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };
    _proto._setListeners = function _setListeners() {
      var _this5 = this;
      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $__default["default"](_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $__default["default"](_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });
      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };
      $__default["default"](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);
      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };
    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };
    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default["default"](event.currentTarget).data(dataKey);
      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default["default"](event.currentTarget).data(dataKey, context);
      }
      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }
      if ($__default["default"](context.getTipElement()).hasClass(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }
      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;
      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }
      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };
    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default["default"](event.currentTarget).data(dataKey);
      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default["default"](event.currentTarget).data(dataKey, context);
      }
      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }
      if (context._isWithActiveTrigger()) {
        return;
      }
      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;
      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }
      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };
    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }
      return false;
    };
    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $__default["default"](this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});
      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }
      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }
      Util__default["default"].typeCheckConfig(NAME, config, this.constructor.DefaultType);
      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }
      return config;
    };
    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};
      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }
      return config;
    };
    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default["default"](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };
    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;
      this._cleanTipClass();
      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };
    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;
      if (tip.getAttribute('x-placement') !== null) {
        return;
      }
      $__default["default"](tip).removeClass(CLASS_NAME_FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default["default"](this);
        var data = $element.data(DATA_KEY);
        var _config = typeof config === 'object' && config;
        if (!data && /dispose|hide/.test(config)) {
          return;
        }
        if (!data) {
          data = new Tooltip(this, _config);
          $element.data(DATA_KEY, data);
        }
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);
    return Tooltip;
  }();
  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = Tooltip._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Tooltip;
  $__default["default"].fn[NAME].noConflict = function () {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };
  return Tooltip;
});
/*
 * jQuery Easing v1.4.1 - http://gsgd.co.uk/sandbox/jquery/easing/ 
*/
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], function ($) {
      return factory($);
    });
  } else if (typeof module === "object" && typeof module.exports === "object") {
    exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  $.easing.jswing = $.easing.swing;
  var pow = Math.pow,
    sqrt = Math.sqrt,
    sin = Math.sin,
    cos = Math.cos,
    PI = Math.PI,
    c1 = 1.70158,
    c2 = c1 * 1.525,
    c3 = c1 + 1,
    c4 = 2 * PI / 3,
    c5 = 2 * PI / 4.5;
  function bounceOut(x) {
    var n1 = 7.5625,
      d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + .75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + .9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + .984375;
    }
  }
  $.extend($.easing, {
    def: "easeOutQuad",
    swing: function swing(x) {
      return $.easing[$.easing.def](x);
    },
    easeInQuad: function easeInQuad(x) {
      return x * x;
    },
    easeOutQuad: function easeOutQuad(x) {
      return 1 - (1 - x) * (1 - x);
    },
    easeInOutQuad: function easeInOutQuad(x) {
      return x < .5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
    },
    easeInCubic: function easeInCubic(x) {
      return x * x * x;
    },
    easeOutCubic: function easeOutCubic(x) {
      return 1 - pow(1 - x, 3);
    },
    easeInOutCubic: function easeInOutCubic(x) {
      return x < .5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
    },
    easeInQuart: function easeInQuart(x) {
      return x * x * x * x;
    },
    easeOutQuart: function easeOutQuart(x) {
      return 1 - pow(1 - x, 4);
    },
    easeInOutQuart: function easeInOutQuart(x) {
      return x < .5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
    },
    easeInQuint: function easeInQuint(x) {
      return x * x * x * x * x;
    },
    easeOutQuint: function easeOutQuint(x) {
      return 1 - pow(1 - x, 5);
    },
    easeInOutQuint: function easeInOutQuint(x) {
      return x < .5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
    },
    easeInSine: function easeInSine(x) {
      return 1 - cos(x * PI / 2);
    },
    easeOutSine: function easeOutSine(x) {
      return sin(x * PI / 2);
    },
    easeInOutSine: function easeInOutSine(x) {
      return -(cos(PI * x) - 1) / 2;
    },
    easeInExpo: function easeInExpo(x) {
      return x === 0 ? 0 : pow(2, 10 * x - 10);
    },
    easeOutExpo: function easeOutExpo(x) {
      return x === 1 ? 1 : 1 - pow(2, -10 * x);
    },
    easeInOutExpo: function easeInOutExpo(x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
    },
    easeInCirc: function easeInCirc(x) {
      return 1 - sqrt(1 - pow(x, 2));
    },
    easeOutCirc: function easeOutCirc(x) {
      return sqrt(1 - pow(x - 1, 2));
    },
    easeInOutCirc: function easeInOutCirc(x) {
      return x < .5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    },
    easeInElastic: function easeInElastic(x) {
      return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
    },
    easeOutElastic: function easeOutElastic(x) {
      return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - .75) * c4) + 1;
    },
    easeInOutElastic: function easeInOutElastic(x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
    },
    easeInBack: function easeInBack(x) {
      return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: function easeOutBack(x) {
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
    },
    easeInOutBack: function easeInOutBack(x) {
      return x < .5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    },
    easeInBounce: function easeInBounce(x) {
      return 1 - bounceOut(1 - x);
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function easeInOutBounce(x) {
      return x < .5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;
    }
  });
});
/*
 Plugin: jQuery Parallax
 Version 1.1.3
 Author: Ian Lunn
 Twitter: @IanLunn
 Author URL: http://www.ianlunn.co.uk/
 Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

 Dual licensed under the MIT and GPL licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 */
!function (n) {
  var t = n(window),
    o = t.height();
  t.resize(function () {
    o = t.height();
  }), n.fn.parallax = function (i, e, r) {
    var u,
      h,
      l = n(this);
    function c() {
      var r = t.scrollTop();
      l.each(function () {
        var t = n(this),
          c = t.offset().top;
        c + u(t) < r || c > r + o || l.css("backgroundPosition", i + " " + Math.round((h - r) * e) + "px");
      });
    }
    l.each(function () {
      h = l.offset().top;
    }), u = r ? function (n) {
      return n.outerHeight(!0);
    } : function (n) {
      return n.height();
    }, (arguments.length < 1 || null === i) && (i = "50%"), (arguments.length < 2 || null === e) && (e = .1), (arguments.length < 3 || null === r) && (r = !0), t.bind("scroll", c).resize(c), c();
  };
}(jQuery);
/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
(function () {
  var tablist = document.querySelectorAll('[role="tablist"]')[0];
  var tabs;
  var panels;
  generateArrays();
  function generateArrays() {
    tabs = document.querySelectorAll('[role="tab"]');
    panels = document.querySelectorAll('[role="tabpanel"]');
  }
  ;

  // For easy reference
  var keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46,
    enter: 13,
    space: 32
  };

  // Add or subtract depending on key pressed
  var direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };

  // Bind listeners
  for (i = 0; i < tabs.length; ++i) {
    addListeners(i);
  }
  ;
  function addListeners(index) {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener);
    tabs[index].addEventListener('keyup', keyupEventListener);

    // Build an array with all tabs (<button>s) in it
    tabs[index].index = index;
  }
  ;

  // When a tab is clicked, activateTab is fired to activate it
  function clickEventListener(event) {
    var tab = event.target;
    activateTab(tab, false);
  }
  ;

  // Handle keydown on tabs
  function keydownEventListener(event) {
    var key = event.keyCode;
    switch (key) {
      case keys.end:
        event.preventDefault();
        // Activate last tab
        focusLastTab();
        break;
      case keys.home:
        event.preventDefault();
        // Activate first tab
        focusFirstTab();
        break;

      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case keys.up:
      case keys.down:
        determineOrientation(event);
        break;
    }
    ;
  }
  ;

  // Handle keyup on tabs
  function keyupEventListener(event) {
    var key = event.keyCode;
    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
      case keys.delete:
        determineDeletable(event);
        break;
      case keys.enter:
      case keys.space:
        activateTab(event.target);
        break;
    }
    ;
  }
  ;

  // When a tablistâ€™s aria-orientation is set to vertical,
  // only up and down arrow should function.
  // In all other cases only left and right arrow function.
  function determineOrientation(event) {
    var key = event.keyCode;
    var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
    var proceed = false;
    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      }
      ;
    } else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      }
      ;
    }
    ;
    if (proceed) {
      switchTabOnArrowPress(event);
    }
    ;
  }
  ;

  // Either focus the next, previous, first, or last tab
  // depending on key pressed
  function switchTabOnArrowPress(event) {
    var pressed = event.keyCode;
    if (direction[pressed]) {
      var target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        } else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab();
        } else if (pressed === keys.right || pressed == keys.down) {
          focusFirstTab();
        }
        ;
      }
      ;
    }
    ;
  }
  ;

  // Activates any given tab panel
  function activateTab(tab, setFocus) {
    setFocus = setFocus || true;
    // Deactivate all other tabs
    deactivateTabs();

    // Remove tabindex attribute
    tab.removeAttribute('tabindex');

    // Set the tab as selected
    tab.setAttribute('aria-selected', 'true');

    // Get the value of aria-controls (which is an ID)
    var controls = tab.getAttribute('aria-controls');

    // Remove hidden attribute from tab panel to make it visible
    //document.getElementById(controls).removeAttribute('hidden');

    // Set focus when required
    if (setFocus) {
      tab.focus();
    }
    ;
  }
  ;

  // Deactivate all tabs and tab panels
  function deactivateTabs() {
    for (t = 0; t < tabs.length; t++) {
      tabs[t].setAttribute('tabindex', '-1');
      tabs[t].setAttribute('aria-selected', 'false');
    }
    ;

    /*for (p = 0; p < panels.length; p++) {
      panels[p].setAttribute('hidden', 'hidden');
    };*/
  }
  ;

  // Make a guess
  function focusFirstTab() {
    tabs[0].focus();
  }
  ;

  // Make a guess
  function focusLastTab() {
    tabs[tabs.length - 1].focus();
  }
  ;
})();
/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v5.2.10
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
!function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("whatInput", [], t) : "object" == typeof exports ? exports.whatInput = t() : e.whatInput = t();
}(this, function () {
  return i = {}, n.m = o = [function (e, t) {
    "use strict";

    e.exports = function () {
      if ("undefined" == typeof document || "undefined" == typeof window) return {
        ask: function ask() {
          return "initial";
        },
        element: function element() {
          return null;
        },
        ignoreKeys: function ignoreKeys() {},
        specificKeys: function specificKeys() {},
        registerOnChange: function registerOnChange() {},
        unRegisterOnChange: function unRegisterOnChange() {}
      };
      var t = document.documentElement,
        n = null,
        s = "initial",
        u = s,
        o = Date.now(),
        i = "false",
        d = ["button", "input", "select", "textarea"],
        r = [],
        c = [16, 17, 18, 91, 93],
        w = [],
        p = {
          keydown: "keyboard",
          keyup: "keyboard",
          mousedown: "mouse",
          mousemove: "mouse",
          MSPointerDown: "pointer",
          MSPointerMove: "pointer",
          pointerdown: "pointer",
          pointermove: "pointer",
          touchstart: "touch",
          touchend: "touch"
        },
        a = !1,
        f = {
          x: null,
          y: null
        },
        l = {
          2: "touch",
          3: "touch",
          4: "mouse"
        },
        m = !1;
      try {
        var e = Object.defineProperty({}, "passive", {
          get: function get() {
            m = !0;
          }
        });
        window.addEventListener("test", null, e);
      } catch (e) {}
      var h = function h() {
          var e = !!m && {
            passive: !0
          };
          document.addEventListener("DOMContentLoaded", v), window.PointerEvent ? (window.addEventListener("pointerdown", y), window.addEventListener("pointermove", E)) : window.MSPointerEvent ? (window.addEventListener("MSPointerDown", y), window.addEventListener("MSPointerMove", E)) : (window.addEventListener("mousedown", y), window.addEventListener("mousemove", E), "ontouchstart" in window && (window.addEventListener("touchstart", y, e), window.addEventListener("touchend", y))), window.addEventListener(O(), E, e), window.addEventListener("keydown", y), window.addEventListener("keyup", y), window.addEventListener("focusin", L), window.addEventListener("focusout", b);
        },
        v = function v() {
          if (i = !(t.getAttribute("data-whatpersist") || "false" === document.body.getAttribute("data-whatpersist"))) try {
            window.sessionStorage.getItem("what-input") && (s = window.sessionStorage.getItem("what-input")), window.sessionStorage.getItem("what-intent") && (u = window.sessionStorage.getItem("what-intent"));
          } catch (e) {}
          g("input"), g("intent");
        },
        y = function y(e) {
          var t = e.which,
            n = p[e.type];
          "pointer" === n && (n = S(e));
          var o = !w.length && -1 === c.indexOf(t),
            i = w.length && -1 !== w.indexOf(t),
            r = "keyboard" === n && t && (o || i) || "mouse" === n || "touch" === n;
          if (M(n) && (r = !1), r && s !== n && (x("input", s = n), g("input")), r && u !== n) {
            var a = document.activeElement;
            a && a.nodeName && (-1 === d.indexOf(a.nodeName.toLowerCase()) || "button" === a.nodeName.toLowerCase() && !C(a, "form")) && (x("intent", u = n), g("intent"));
          }
        },
        g = function g(e) {
          t.setAttribute("data-what" + e, "input" === e ? s : u), k(e);
        },
        E = function E(e) {
          var t = p[e.type];
          "pointer" === t && (t = S(e)), A(e), (!a && !M(t) || a && "wheel" === e.type || "mousewheel" === e.type || "DOMMouseScroll" === e.type) && u !== t && (x("intent", u = t), g("intent"));
        },
        L = function L(e) {
          e.target.nodeName ? (n = e.target.nodeName.toLowerCase(), t.setAttribute("data-whatelement", n), e.target.classList && e.target.classList.length && t.setAttribute("data-whatclasses", e.target.classList.toString().replace(" ", ","))) : b();
        },
        b = function b() {
          n = null, t.removeAttribute("data-whatelement"), t.removeAttribute("data-whatclasses");
        },
        x = function x(e, t) {
          if (i) try {
            window.sessionStorage.setItem("what-" + e, t);
          } catch (e) {}
        },
        S = function S(e) {
          return "number" == typeof e.pointerType ? l[e.pointerType] : "pen" === e.pointerType ? "touch" : e.pointerType;
        },
        M = function M(e) {
          var t = Date.now(),
            n = "mouse" === e && "touch" === s && t - o < 200;
          return o = t, n;
        },
        O = function O() {
          return "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
        },
        k = function k(e) {
          for (var t = 0, n = r.length; t < n; t++) r[t].type === e && r[t].fn.call(void 0, "input" === e ? s : u);
        },
        A = function A(e) {
          f.x !== e.screenX || f.y !== e.screenY ? (a = !1, f.x = e.screenX, f.y = e.screenY) : a = !0;
        },
        C = function C(e, t) {
          var n = window.Element.prototype;
          if (n.matches || (n.matches = n.msMatchesSelector || n.webkitMatchesSelector), n.closest) return e.closest(t);
          do {
            if (e.matches(t)) return e;
            e = e.parentElement || e.parentNode;
          } while (null !== e && 1 === e.nodeType);
          return null;
        };
      return "addEventListener" in window && Array.prototype.indexOf && (p[O()] = "mouse", h()), {
        ask: function ask(e) {
          return "intent" === e ? u : s;
        },
        element: function element() {
          return n;
        },
        ignoreKeys: function ignoreKeys(e) {
          c = e;
        },
        specificKeys: function specificKeys(e) {
          w = e;
        },
        registerOnChange: function registerOnChange(e, t) {
          r.push({
            fn: e,
            type: t || "input"
          });
        },
        unRegisterOnChange: function unRegisterOnChange(e) {
          var t = function (e) {
            for (var t = 0, n = r.length; t < n; t++) if (r[t].fn === e) return t;
          }(e);
          !t && 0 !== t || r.splice(t, 1);
        },
        clearStorage: function clearStorage() {
          window.sessionStorage.clear();
        }
      };
    }();
  }], n.c = i, n.p = "", n(0);
  function n(e) {
    if (i[e]) return i[e].exports;
    var t = i[e] = {
      exports: {},
      id: e,
      loaded: !1
    };
    return o[e].call(t.exports, t, t.exports, n), t.loaded = !0, t.exports;
  }
  var o, i;
});
/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

!function (t, e) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
}(window, function (t, e) {
  "use strict";

  function i(i, s, a) {
    function u(t, e, o) {
      var n,
        s = "$()." + i + '("' + e + '")';
      return t.each(function (t, u) {
        var h = a.data(u, i);
        if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
        var d = h[e];
        if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
        var l = d.apply(h, o);
        n = void 0 === n ? l : n;
      }), void 0 !== n ? n : t;
    }
    function h(t, e) {
      t.each(function (t, o) {
        var n = a.data(o, i);
        n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n));
      });
    }
    a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function (t) {
      a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
    }), a.fn[i] = function (t) {
      if ("string" == typeof t) {
        var e = n.call(arguments, 1);
        return u(this, t, e);
      }
      return h(this, t), this;
    }, o(a));
  }
  function o(t) {
    !t || t && t.bridget || (t.bridget = i);
  }
  var n = Array.prototype.slice,
    s = t.console,
    r = "undefined" == typeof s ? function () {} : function (t) {
      s.error(t);
    };
  return o(e || t.jQuery), i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function () {
  function t() {}
  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
        o = i[t] = i[t] || [];
      return o.indexOf(e) == -1 && o.push(e), this;
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {},
        o = i[t] = i[t] || {};
      return o[e] = !0, this;
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      var o = i.indexOf(e);
      return o != -1 && i.splice(o, 1), this;
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      i = i.slice(0), e = e || [];
      for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
        var s = i[n],
          r = o && o[s];
        r && (this.off(t, s), delete o[s]), s.apply(this, e);
      }
      return this;
    }
  }, e.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e();
}(window, function () {
  "use strict";

  function t(t) {
    var e = parseFloat(t),
      i = t.indexOf("%") == -1 && !isNaN(e);
    return i && e;
  }
  function e() {}
  function i() {
    for (var t = {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
      }, e = 0; e < h; e++) {
      var i = u[e];
      t[i] = 0;
    }
    return t;
  }
  function o(t) {
    var e = getComputedStyle(t);
    return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e;
  }
  function n() {
    if (!d) {
      d = !0;
      var e = document.createElement("div");
      e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
      var i = document.body || document.documentElement;
      i.appendChild(e);
      var n = o(e);
      r = 200 == Math.round(t(n.width)), s.isBoxSizeOuter = r, i.removeChild(e);
    }
  }
  function s(e) {
    if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
      var s = o(e);
      if ("none" == s.display) return i();
      var a = {};
      a.width = e.offsetWidth, a.height = e.offsetHeight;
      for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
        var f = u[l],
          c = s[f],
          m = parseFloat(c);
        a[f] = isNaN(m) ? 0 : m;
      }
      var p = a.paddingLeft + a.paddingRight,
        y = a.paddingTop + a.paddingBottom,
        g = a.marginLeft + a.marginRight,
        v = a.marginTop + a.marginBottom,
        _ = a.borderLeftWidth + a.borderRightWidth,
        z = a.borderTopWidth + a.borderBottomWidth,
        I = d && r,
        x = t(s.width);
      x !== !1 && (a.width = x + (I ? 0 : p + _));
      var S = t(s.height);
      return S !== !1 && (a.height = S + (I ? 0 : y + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + z), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a;
    }
  }
  var r,
    a = "undefined" == typeof console ? e : function (t) {
      console.error(t);
    },
    u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
    h = u.length,
    d = !1;
  return s;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {
  "use strict";

  var t = function () {
    var t = window.Element.prototype;
    if (t.matches) return "matches";
    if (t.matchesSelector) return "matchesSelector";
    for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var o = e[i],
        n = o + "MatchesSelector";
      if (t[n]) return n;
    }
  }();
  return function (e, i) {
    return e[t](i);
  };
}), function (t, e) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
}(window, function (t, e) {
  var i = {};
  i.extend = function (t, e) {
    for (var i in e) t[i] = e[i];
    return t;
  }, i.modulo = function (t, e) {
    return (t % e + e) % e;
  };
  var o = Array.prototype.slice;
  i.makeArray = function (t) {
    if (Array.isArray(t)) return t;
    if (null === t || void 0 === t) return [];
    var e = "object" == typeof t && "number" == typeof t.length;
    return e ? o.call(t) : [t];
  }, i.removeFrom = function (t, e) {
    var i = t.indexOf(e);
    i != -1 && t.splice(i, 1);
  }, i.getParent = function (t, i) {
    for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t;
  }, i.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, i.filterFindElements = function (t, o) {
    t = i.makeArray(t);
    var n = [];
    return t.forEach(function (t) {
      if (t instanceof HTMLElement) {
        if (!o) return void n.push(t);
        e(t, o) && n.push(t);
        for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s]);
      }
    }), n;
  }, i.debounceMethod = function (t, e, i) {
    i = i || 100;
    var o = t.prototype[e],
      n = e + "Timeout";
    t.prototype[e] = function () {
      var t = this[n];
      clearTimeout(t);
      var e = arguments,
        s = this;
      this[n] = setTimeout(function () {
        o.apply(s, e), delete s[n];
      }, i);
    };
  }, i.docReady = function (t) {
    var e = document.readyState;
    "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
  }, i.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i;
    }).toLowerCase();
  };
  var n = t.console;
  return i.htmlInit = function (e, o) {
    i.docReady(function () {
      var s = i.toDashed(o),
        r = "data-" + s,
        a = document.querySelectorAll("[" + r + "]"),
        u = document.querySelectorAll(".js-" + s),
        h = i.makeArray(a).concat(i.makeArray(u)),
        d = r + "-options",
        l = t.jQuery;
      h.forEach(function (t) {
        var i,
          s = t.getAttribute(r) || t.getAttribute(d);
        try {
          i = s && JSON.parse(s);
        } catch (a) {
          return void (n && n.error("Error parsing " + r + " on " + t.className + ": " + a));
        }
        var u = new e(t, i);
        l && l.data(t, o, u);
      });
    });
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize));
}(window, function (t, e) {
  "use strict";

  function i(t) {
    for (var e in t) return !1;
    return e = null, !0;
  }
  function o(t, e) {
    t && (this.element = t, this.layout = e, this.position = {
      x: 0,
      y: 0
    }, this._create());
  }
  function n(t) {
    return t.replace(/([A-Z])/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }
  var s = document.documentElement.style,
    r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
    a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
    u = {
      WebkitTransition: "webkitTransitionEnd",
      transition: "transitionend"
    }[r],
    h = {
      transform: a,
      transition: r,
      transitionDuration: r + "Duration",
      transitionProperty: r + "Property",
      transitionDelay: r + "Delay"
    },
    d = o.prototype = Object.create(t.prototype);
  d.constructor = o, d._create = function () {
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    }, this.css({
      position: "absolute"
    });
  }, d.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, d.getSize = function () {
    this.size = e(this.element);
  }, d.css = function (t) {
    var e = this.element.style;
    for (var i in t) {
      var o = h[i] || i;
      e[o] = t[i];
    }
  }, d.getPosition = function () {
    var t = getComputedStyle(this.element),
      e = this.layout._getOption("originLeft"),
      i = this.layout._getOption("originTop"),
      o = t[e ? "left" : "right"],
      n = t[i ? "top" : "bottom"],
      s = parseFloat(o),
      r = parseFloat(n),
      a = this.layout.size;
    o.indexOf("%") != -1 && (s = s / 100 * a.width), n.indexOf("%") != -1 && (r = r / 100 * a.height), s = isNaN(s) ? 0 : s, r = isNaN(r) ? 0 : r, s -= e ? a.paddingLeft : a.paddingRight, r -= i ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = r;
  }, d.layoutPosition = function () {
    var t = this.layout.size,
      e = {},
      i = this.layout._getOption("originLeft"),
      o = this.layout._getOption("originTop"),
      n = i ? "paddingLeft" : "paddingRight",
      s = i ? "left" : "right",
      r = i ? "right" : "left",
      a = this.position.x + t[n];
    e[s] = this.getXValue(a), e[r] = "";
    var u = o ? "paddingTop" : "paddingBottom",
      h = o ? "top" : "bottom",
      d = o ? "bottom" : "top",
      l = this.position.y + t[u];
    e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this]);
  }, d.getXValue = function (t) {
    var e = this.layout._getOption("horizontal");
    return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px";
  }, d.getYValue = function (t) {
    var e = this.layout._getOption("horizontal");
    return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px";
  }, d._transitionTo = function (t, e) {
    this.getPosition();
    var i = this.position.x,
      o = this.position.y,
      n = t == this.position.x && e == this.position.y;
    if (this.setPosition(t, e), n && !this.isTransitioning) return void this.layoutPosition();
    var s = t - i,
      r = e - o,
      a = {};
    a.transform = this.getTranslate(s, r), this.transition({
      to: a,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: !0
    });
  }, d.getTranslate = function (t, e) {
    var i = this.layout._getOption("originLeft"),
      o = this.layout._getOption("originTop");
    return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)";
  }, d.goTo = function (t, e) {
    this.setPosition(t, e), this.layoutPosition();
  }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
    this.position.x = parseFloat(t), this.position.y = parseFloat(e);
  }, d._nonTransition = function (t) {
    this.css(t.to), t.isCleaning && this._removeStyles(t.to);
    for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
  }, d.transition = function (t) {
    if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
    var e = this._transn;
    for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
    for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
    if (t.from) {
      this.css(t.from);
      var o = this.element.offsetHeight;
      o = null;
    }
    this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0;
  };
  var l = "opacity," + n(a);
  d.enableTransition = function () {
    if (!this.isTransitioning) {
      var t = this.layout.options.transitionDuration;
      t = "number" == typeof t ? t + "ms" : t, this.css({
        transitionProperty: l,
        transitionDuration: t,
        transitionDelay: this.staggerDelay || 0
      }), this.element.addEventListener(u, this, !1);
    }
  }, d.onwebkitTransitionEnd = function (t) {
    this.ontransitionend(t);
  }, d.onotransitionend = function (t) {
    this.ontransitionend(t);
  };
  var f = {
    "-webkit-transform": "transform"
  };
  d.ontransitionend = function (t) {
    if (t.target === this.element) {
      var e = this._transn,
        o = f[t.propertyName] || t.propertyName;
      if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
        var n = e.onEnd[o];
        n.call(this), delete e.onEnd[o];
      }
      this.emitEvent("transitionEnd", [this]);
    }
  }, d.disableTransition = function () {
    this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1;
  }, d._removeStyles = function (t) {
    var e = {};
    for (var i in t) e[i] = "";
    this.css(e);
  };
  var c = {
    transitionProperty: "",
    transitionDuration: "",
    transitionDelay: ""
  };
  return d.removeTransitionStyles = function () {
    this.css(c);
  }, d.stagger = function (t) {
    t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms";
  }, d.removeElem = function () {
    this.element.parentNode.removeChild(this.element), this.css({
      display: ""
    }), this.emitEvent("remove", [this]);
  }, d.remove = function () {
    return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
      this.removeElem();
    }), void this.hide()) : void this.removeElem();
  }, d.reveal = function () {
    delete this.isHidden, this.css({
      display: ""
    });
    var t = this.layout.options,
      e = {},
      i = this.getHideRevealTransitionEndProperty("visibleStyle");
    e[i] = this.onRevealTransitionEnd, this.transition({
      from: t.hiddenStyle,
      to: t.visibleStyle,
      isCleaning: !0,
      onTransitionEnd: e
    });
  }, d.onRevealTransitionEnd = function () {
    this.isHidden || this.emitEvent("reveal");
  }, d.getHideRevealTransitionEndProperty = function (t) {
    var e = this.layout.options[t];
    if (e.opacity) return "opacity";
    for (var i in e) return i;
  }, d.hide = function () {
    this.isHidden = !0, this.css({
      display: ""
    });
    var t = this.layout.options,
      e = {},
      i = this.getHideRevealTransitionEndProperty("hiddenStyle");
    e[i] = this.onHideTransitionEnd, this.transition({
      from: t.visibleStyle,
      to: t.hiddenStyle,
      isCleaning: !0,
      onTransitionEnd: e
    });
  }, d.onHideTransitionEnd = function () {
    this.isHidden && (this.css({
      display: "none"
    }), this.emitEvent("hide"));
  }, d.destroy = function () {
    this.css({
      position: "",
      left: "",
      right: "",
      top: "",
      bottom: "",
      transition: "",
      transform: ""
    });
  }, o;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, o, n, s) {
    return e(t, i, o, n, s);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item);
}(window, function (t, e, i, o, n) {
  "use strict";

  function s(t, e) {
    var i = o.getQueryElement(t);
    if (!i) return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
    this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
    var n = ++l;
    this.element.outlayerGUID = n, f[n] = this, this._create();
    var s = this._getOption("initLayout");
    s && this.layout();
  }
  function r(t) {
    function e() {
      t.apply(this, arguments);
    }
    return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
  }
  function a(t) {
    if ("number" == typeof t) return t;
    var e = t.match(/(^\d*\.?\d*)(\w*)/),
      i = e && e[1],
      o = e && e[2];
    if (!i.length) return 0;
    i = parseFloat(i);
    var n = m[o] || 1;
    return i * n;
  }
  var u = t.console,
    h = t.jQuery,
    d = function d() {},
    l = 0,
    f = {};
  s.namespace = "outlayer", s.Item = n, s.defaults = {
    containerStyle: {
      position: "relative"
    },
    initLayout: !0,
    originLeft: !0,
    originTop: !0,
    resize: !0,
    resizeContainer: !0,
    transitionDuration: "0.4s",
    hiddenStyle: {
      opacity: 0,
      transform: "scale(0.001)"
    },
    visibleStyle: {
      opacity: 1,
      transform: "scale(1)"
    }
  };
  var c = s.prototype;
  o.extend(c, e.prototype), c.option = function (t) {
    o.extend(this.options, t);
  }, c._getOption = function (t) {
    var e = this.constructor.compatOptions[t];
    return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
  }, s.compatOptions = {
    initLayout: "isInitLayout",
    horizontal: "isHorizontal",
    layoutInstant: "isLayoutInstant",
    originLeft: "isOriginLeft",
    originTop: "isOriginTop",
    resize: "isResizeBound",
    resizeContainer: "isResizingContainer"
  }, c._create = function () {
    this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
    var t = this._getOption("resize");
    t && this.bindResize();
  }, c.reloadItems = function () {
    this.items = this._itemize(this.element.children);
  }, c._itemize = function (t) {
    for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
      var s = e[n],
        r = new i(s, this);
      o.push(r);
    }
    return o;
  }, c._filterFindItemElements = function (t) {
    return o.filterFindElements(t, this.options.itemSelector);
  }, c.getItemElements = function () {
    return this.items.map(function (t) {
      return t.element;
    });
  }, c.layout = function () {
    this._resetLayout(), this._manageStamps();
    var t = this._getOption("layoutInstant"),
      e = void 0 !== t ? t : !this._isLayoutInited;
    this.layoutItems(this.items, e), this._isLayoutInited = !0;
  }, c._init = c.layout, c._resetLayout = function () {
    this.getSize();
  }, c.getSize = function () {
    this.size = i(this.element);
  }, c._getMeasurement = function (t, e) {
    var o,
      n = this.options[t];
    n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0;
  }, c.layoutItems = function (t, e) {
    t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout();
  }, c._getItemsForLayout = function (t) {
    return t.filter(function (t) {
      return !t.isIgnored;
    });
  }, c._layoutItems = function (t, e) {
    if (this._emitCompleteOnItems("layout", t), t && t.length) {
      var i = [];
      t.forEach(function (t) {
        var o = this._getItemLayoutPosition(t);
        o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o);
      }, this), this._processLayoutQueue(i);
    }
  }, c._getItemLayoutPosition = function () {
    return {
      x: 0,
      y: 0
    };
  }, c._processLayoutQueue = function (t) {
    this.updateStagger(), t.forEach(function (t, e) {
      this._positionItem(t.item, t.x, t.y, t.isInstant, e);
    }, this);
  }, c.updateStagger = function () {
    var t = this.options.stagger;
    return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger);
  }, c._positionItem = function (t, e, i, o, n) {
    o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
  }, c._postLayout = function () {
    this.resizeContainer();
  }, c.resizeContainer = function () {
    var t = this._getOption("resizeContainer");
    if (t) {
      var e = this._getContainerSize();
      e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
    }
  }, c._getContainerSize = d, c._setContainerMeasure = function (t, e) {
    if (void 0 !== t) {
      var i = this.size;
      i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px";
    }
  }, c._emitCompleteOnItems = function (t, e) {
    function i() {
      n.dispatchEvent(t + "Complete", null, [e]);
    }
    function o() {
      r++, r == s && i();
    }
    var n = this,
      s = e.length;
    if (!e || !s) return void i();
    var r = 0;
    e.forEach(function (e) {
      e.once(t, o);
    });
  }, c.dispatchEvent = function (t, e, i) {
    var o = e ? [e].concat(i) : i;
    if (this.emitEvent(t, o), h) if (this.$element = this.$element || h(this.element), e) {
      var n = h.Event(e);
      n.type = t, this.$element.trigger(n, i);
    } else this.$element.trigger(t, i);
  }, c.ignore = function (t) {
    var e = this.getItem(t);
    e && (e.isIgnored = !0);
  }, c.unignore = function (t) {
    var e = this.getItem(t);
    e && delete e.isIgnored;
  }, c.stamp = function (t) {
    t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this));
  }, c.unstamp = function (t) {
    t = this._find(t), t && t.forEach(function (t) {
      o.removeFrom(this.stamps, t), this.unignore(t);
    }, this);
  }, c._find = function (t) {
    if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t);
  }, c._manageStamps = function () {
    this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
  }, c._getBoundingRect = function () {
    var t = this.element.getBoundingClientRect(),
      e = this.size;
    this._boundingRect = {
      left: t.left + e.paddingLeft + e.borderLeftWidth,
      top: t.top + e.paddingTop + e.borderTopWidth,
      right: t.right - (e.paddingRight + e.borderRightWidth),
      bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
    };
  }, c._manageStamp = d, c._getElementOffset = function (t) {
    var e = t.getBoundingClientRect(),
      o = this._boundingRect,
      n = i(t),
      s = {
        left: e.left - o.left - n.marginLeft,
        top: e.top - o.top - n.marginTop,
        right: o.right - e.right - n.marginRight,
        bottom: o.bottom - e.bottom - n.marginBottom
      };
    return s;
  }, c.handleEvent = o.handleEvent, c.bindResize = function () {
    t.addEventListener("resize", this), this.isResizeBound = !0;
  }, c.unbindResize = function () {
    t.removeEventListener("resize", this), this.isResizeBound = !1;
  }, c.onresize = function () {
    this.resize();
  }, o.debounceMethod(s, "onresize", 100), c.resize = function () {
    this.isResizeBound && this.needsResizeLayout() && this.layout();
  }, c.needsResizeLayout = function () {
    var t = i(this.element),
      e = this.size && t;
    return e && t.innerWidth !== this.size.innerWidth;
  }, c.addItems = function (t) {
    var e = this._itemize(t);
    return e.length && (this.items = this.items.concat(e)), e;
  }, c.appended = function (t) {
    var e = this.addItems(t);
    e.length && (this.layoutItems(e, !0), this.reveal(e));
  }, c.prepended = function (t) {
    var e = this._itemize(t);
    if (e.length) {
      var i = this.items.slice(0);
      this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i);
    }
  }, c.reveal = function (t) {
    if (this._emitCompleteOnItems("reveal", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.reveal();
      });
    }
  }, c.hide = function (t) {
    if (this._emitCompleteOnItems("hide", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.hide();
      });
    }
  }, c.revealItemElements = function (t) {
    var e = this.getItems(t);
    this.reveal(e);
  }, c.hideItemElements = function (t) {
    var e = this.getItems(t);
    this.hide(e);
  }, c.getItem = function (t) {
    for (var e = 0; e < this.items.length; e++) {
      var i = this.items[e];
      if (i.element == t) return i;
    }
  }, c.getItems = function (t) {
    t = o.makeArray(t);
    var e = [];
    return t.forEach(function (t) {
      var i = this.getItem(t);
      i && e.push(i);
    }, this), e;
  }, c.remove = function (t) {
    var e = this.getItems(t);
    this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
      t.remove(), o.removeFrom(this.items, t);
    }, this);
  }, c.destroy = function () {
    var t = this.element.style;
    t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
      t.destroy();
    }), this.unbindResize();
    var e = this.element.outlayerGUID;
    delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace);
  }, s.data = function (t) {
    t = o.getQueryElement(t);
    var e = t && t.outlayerGUID;
    return e && f[e];
  }, s.create = function (t, e) {
    var i = r(s);
    return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i;
  };
  var m = {
    ms: 1,
    s: 1e3
  };
  return s.Item = n, s;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer));
}(window, function (t) {
  "use strict";

  function e() {
    t.Item.apply(this, arguments);
  }
  var i = e.prototype = Object.create(t.Item.prototype),
    o = i._create;
  i._create = function () {
    this.id = this.layout.itemGUID++, o.call(this), this.sortData = {};
  }, i.updateSortData = function () {
    if (!this.isIgnored) {
      this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
      var t = this.layout.options.getSortData,
        e = this.layout._sorters;
      for (var i in t) {
        var o = e[i];
        this.sortData[i] = o(this.element, this);
      }
    }
  };
  var n = i.destroy;
  return i.destroy = function () {
    n.apply(this, arguments), this.css({
      display: ""
    });
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer));
}(window, function (t, e) {
  "use strict";

  function i(t) {
    this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size);
  }
  var o = i.prototype,
    n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
  return n.forEach(function (t) {
    o[t] = function () {
      return e.prototype[t].apply(this.isotope, arguments);
    };
  }), o.needsVerticalResizeLayout = function () {
    var e = t(this.isotope.element),
      i = this.isotope.size && e;
    return i && e.innerHeight != this.isotope.size.innerHeight;
  }, o._getMeasurement = function () {
    this.isotope._getMeasurement.apply(this, arguments);
  }, o.getColumnWidth = function () {
    this.getSegmentSize("column", "Width");
  }, o.getRowHeight = function () {
    this.getSegmentSize("row", "Height");
  }, o.getSegmentSize = function (t, e) {
    var i = t + e,
      o = "outer" + e;
    if (this._getMeasurement(i, o), !this[i]) {
      var n = this.getFirstItemSize();
      this[i] = n && n[o] || this.isotope.size["inner" + e];
    }
  }, o.getFirstItemSize = function () {
    var e = this.isotope.filteredItems[0];
    return e && e.element && t(e.element);
  }, o.layout = function () {
    this.isotope.layout.apply(this.isotope, arguments);
  }, o.getSize = function () {
    this.isotope.getSize(), this.size = this.isotope.size;
  }, i.modes = {}, i.create = function (t, e) {
    function n() {
      i.apply(this, arguments);
    }
    return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n;
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize);
}(window, function (t, e) {
  var i = t.create("masonry");
  i.compatOptions.fitWidth = "isFitWidth";
  var o = i.prototype;
  return o._resetLayout = function () {
    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
    for (var t = 0; t < this.cols; t++) this.colYs.push(0);
    this.maxY = 0, this.horizontalColIndex = 0;
  }, o.measureColumns = function () {
    if (this.getContainerWidth(), !this.columnWidth) {
      var t = this.items[0],
        i = t && t.element;
      this.columnWidth = i && e(i).outerWidth || this.containerWidth;
    }
    var o = this.columnWidth += this.gutter,
      n = this.containerWidth + this.gutter,
      s = n / o,
      r = o - n % o,
      a = r && r < 1 ? "round" : "floor";
    s = Math[a](s), this.cols = Math.max(s, 1);
  }, o.getContainerWidth = function () {
    var t = this._getOption("fitWidth"),
      i = t ? this.element.parentNode : this.element,
      o = e(i);
    this.containerWidth = o && o.innerWidth;
  }, o._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth % this.columnWidth,
      i = e && e < 1 ? "round" : "ceil",
      o = Math[i](t.size.outerWidth / this.columnWidth);
    o = Math.min(o, this.cols);
    for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
        x: this.columnWidth * s.col,
        y: s.y
      }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
    return r;
  }, o._getTopColPosition = function (t) {
    var e = this._getTopColGroup(t),
      i = Math.min.apply(Math, e);
    return {
      col: e.indexOf(i),
      y: i
    };
  }, o._getTopColGroup = function (t) {
    if (t < 2) return this.colYs;
    for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
    return e;
  }, o._getColGroupY = function (t, e) {
    if (e < 2) return this.colYs[t];
    var i = this.colYs.slice(t, t + e);
    return Math.max.apply(Math, i);
  }, o._getHorizontalColPosition = function (t, e) {
    var i = this.horizontalColIndex % this.cols,
      o = t > 1 && i + t > this.cols;
    i = o ? 0 : i;
    var n = e.size.outerWidth && e.size.outerHeight;
    return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
      col: i,
      y: this._getColGroupY(i, t)
    };
  }, o._manageStamp = function (t) {
    var i = e(t),
      o = this._getElementOffset(t),
      n = this._getOption("originLeft"),
      s = n ? o.left : o.right,
      r = s + i.outerWidth,
      a = Math.floor(s / this.columnWidth);
    a = Math.max(0, a);
    var u = Math.floor(r / this.columnWidth);
    u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
    for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l]);
  }, o._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var t = {
      height: this.maxY
    };
    return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t;
  }, o._getContainerFitWidth = function () {
    for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
    return (this.cols - t) * this.columnWidth - this.gutter;
  }, o.needsResizeLayout = function () {
    var t = this.containerWidth;
    return this.getContainerWidth(), t != this.containerWidth;
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry);
}(window, function (t, e) {
  "use strict";

  var i = t.create("masonry"),
    o = i.prototype,
    n = {
      _getElementOffset: !0,
      layout: !0,
      _getMeasurement: !0
    };
  for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
  var r = o.measureColumns;
  o.measureColumns = function () {
    this.items = this.isotope.filteredItems, r.call(this);
  };
  var a = o._getOption;
  return o._getOption = function (t) {
    return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments);
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode);
}(window, function (t) {
  "use strict";

  var e = t.create("fitRows"),
    i = e.prototype;
  return i._resetLayout = function () {
    this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth");
  }, i._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth + this.gutter,
      i = this.isotope.size.innerWidth + this.gutter;
    0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
    var o = {
      x: this.x,
      y: this.y
    };
    return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o;
  }, i._getContainerSize = function () {
    return {
      height: this.maxY
    };
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode);
}(window, function (t) {
  "use strict";

  var e = t.create("vertical", {
      horizontalAlignment: 0
    }),
    i = e.prototype;
  return i._resetLayout = function () {
    this.y = 0;
  }, i._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
      i = this.y;
    return this.y += t.size.outerHeight, {
      x: e,
      y: i
    };
  }, i._getContainerSize = function () {
    return {
      height: this.y
    };
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function (i, o, n, s, r, a) {
    return e(t, i, o, n, s, r, a);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode);
}(window, function (t, e, i, o, n, s, r) {
  function a(t, e) {
    return function (i, o) {
      for (var n = 0; n < t.length; n++) {
        var s = t[n],
          r = i.sortData[s],
          a = o.sortData[s];
        if (r > a || r < a) {
          var u = void 0 !== e[s] ? e[s] : e,
            h = u ? 1 : -1;
          return (r > a ? 1 : -1) * h;
        }
      }
      return 0;
    };
  }
  var u = t.jQuery,
    h = String.prototype.trim ? function (t) {
      return t.trim();
    } : function (t) {
      return t.replace(/^\s+|\s+$/g, "");
    },
    d = e.create("isotope", {
      layoutMode: "masonry",
      isJQueryFiltering: !0,
      sortAscending: !0
    });
  d.Item = s, d.LayoutMode = r;
  var l = d.prototype;
  l._create = function () {
    this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
    for (var t in r.modes) this._initLayoutMode(t);
  }, l.reloadItems = function () {
    this.itemGUID = 0, e.prototype.reloadItems.call(this);
  }, l._itemize = function () {
    for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
      var o = t[i];
      o.id = this.itemGUID++;
    }
    return this._updateItemsSortData(t), t;
  }, l._initLayoutMode = function (t) {
    var e = r.modes[t],
      i = this.options[t] || {};
    this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this);
  }, l.layout = function () {
    return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout();
  }, l._layout = function () {
    var t = this._getIsInstant();
    this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0;
  }, l.arrange = function (t) {
    this.option(t), this._getIsInstant();
    var e = this._filter(this.items);
    this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout();
  }, l._init = l.arrange, l._hideReveal = function (t) {
    this.reveal(t.needReveal), this.hide(t.needHide);
  }, l._getIsInstant = function () {
    var t = this._getOption("layoutInstant"),
      e = void 0 !== t ? t : !this._isLayoutInited;
    return this._isInstant = e, e;
  }, l._bindArrangeComplete = function () {
    function t() {
      e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
    }
    var e,
      i,
      o,
      n = this;
    this.once("layoutComplete", function () {
      e = !0, t();
    }), this.once("hideComplete", function () {
      i = !0, t();
    }), this.once("revealComplete", function () {
      o = !0, t();
    });
  }, l._filter = function (t) {
    var e = this.options.filter;
    e = e || "*";
    for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
      var a = t[r];
      if (!a.isIgnored) {
        var u = s(a);
        u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a);
      }
    }
    return {
      matches: i,
      needReveal: o,
      needHide: n
    };
  }, l._getFilterTest = function (t) {
    return u && this.options.isJQueryFiltering ? function (e) {
      return u(e.element).is(t);
    } : "function" == typeof t ? function (e) {
      return t(e.element);
    } : function (e) {
      return o(e.element, t);
    };
  }, l.updateSortData = function (t) {
    var e;
    t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e);
  }, l._getSorters = function () {
    var t = this.options.getSortData;
    for (var e in t) {
      var i = t[e];
      this._sorters[e] = f(i);
    }
  }, l._updateItemsSortData = function (t) {
    for (var e = t && t.length, i = 0; e && i < e; i++) {
      var o = t[i];
      o.updateSortData();
    }
  };
  var f = function () {
    function t(t) {
      if ("string" != typeof t) return t;
      var i = h(t).split(" "),
        o = i[0],
        n = o.match(/^\[(.+)\]$/),
        s = n && n[1],
        r = e(s, o),
        a = d.sortDataParsers[i[1]];
      return t = a ? function (t) {
        return t && a(r(t));
      } : function (t) {
        return t && r(t);
      };
    }
    function e(t, e) {
      return t ? function (e) {
        return e.getAttribute(t);
      } : function (t) {
        var i = t.querySelector(e);
        return i && i.textContent;
      };
    }
    return t;
  }();
  d.sortDataParsers = {
    parseInt: function (_parseInt) {
      function parseInt(_x) {
        return _parseInt.apply(this, arguments);
      }
      parseInt.toString = function () {
        return _parseInt.toString();
      };
      return parseInt;
    }(function (t) {
      return parseInt(t, 10);
    }),
    parseFloat: function (_parseFloat) {
      function parseFloat(_x2) {
        return _parseFloat.apply(this, arguments);
      }
      parseFloat.toString = function () {
        return _parseFloat.toString();
      };
      return parseFloat;
    }(function (t) {
      return parseFloat(t);
    })
  }, l._sort = function () {
    if (this.options.sortBy) {
      var t = n.makeArray(this.options.sortBy);
      this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
      var e = a(this.sortHistory, this.options.sortAscending);
      this.filteredItems.sort(e);
    }
  }, l._getIsSameSortBy = function (t) {
    for (var e = 0; e < t.length; e++) if (t[e] != this.sortHistory[e]) return !1;
    return !0;
  }, l._mode = function () {
    var t = this.options.layoutMode,
      e = this.modes[t];
    if (!e) throw new Error("No layout mode: " + t);
    return e.options = this.options[t], e;
  }, l._resetLayout = function () {
    e.prototype._resetLayout.call(this), this._mode()._resetLayout();
  }, l._getItemLayoutPosition = function (t) {
    return this._mode()._getItemLayoutPosition(t);
  }, l._manageStamp = function (t) {
    this._mode()._manageStamp(t);
  }, l._getContainerSize = function () {
    return this._mode()._getContainerSize();
  }, l.needsResizeLayout = function () {
    return this._mode().needsResizeLayout();
  }, l.appended = function (t) {
    var e = this.addItems(t);
    if (e.length) {
      var i = this._filterRevealAdded(e);
      this.filteredItems = this.filteredItems.concat(i);
    }
  }, l.prepended = function (t) {
    var e = this._itemize(t);
    if (e.length) {
      this._resetLayout(), this._manageStamps();
      var i = this._filterRevealAdded(e);
      this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items);
    }
  }, l._filterRevealAdded = function (t) {
    var e = this._filter(t);
    return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches;
  }, l.insert = function (t) {
    var e = this.addItems(t);
    if (e.length) {
      var i,
        o,
        n = e.length;
      for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
      var s = this._filter(e).matches;
      for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
      for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
      this.reveal(s);
    }
  };
  var c = l.remove;
  return l.remove = function (t) {
    t = n.makeArray(t);
    var e = this.getItems(t);
    c.call(this, t);
    for (var i = e && e.length, o = 0; i && o < i; o++) {
      var s = e[o];
      n.removeFrom(this.filteredItems, s);
    }
  }, l.shuffle = function () {
    for (var t = 0; t < this.items.length; t++) {
      var e = this.items[t];
      e.sortData.random = Math.random();
    }
    this.options.sortBy = "random", this._sort(), this._layout();
  }, l._noTransition = function (t, e) {
    var i = this.options.transitionDuration;
    this.options.transitionDuration = 0;
    var o = t.apply(this, e);
    return this.options.transitionDuration = i, o;
  }, l.getFilteredItemElements = function () {
    return this.filteredItems.map(function (t) {
      return t.element;
    });
  }, d;
});
(function (window) {
  'use strict';

  function fitRowsDefinition(LayoutMode) {
    var FitRows = LayoutMode.create('fitRows');
    FitRows.prototype._resetLayout = function () {
      this.x = 0;
      this.y = 0;
      this.maxY = 0;
      this.row = 0;
      this.rows = [];
      this._getMeasurement('gutter', 'outerWidth');
      if (this.options.equalheight) {
        for (var i = 0; i < this.isotope.items.length; i++) {
          this.isotope.items[i].css({
            height: 'auto'
          });
        }
      }
    };

    /**
     * Working but glicthy with newly appended element via ajax
     * must reinvoke isotope('layout') to properly realign the horizontal position
     * after isotope('appended), not sure why?
     */
    FitRows.prototype._getItemLayoutPosition = function (item) {
      item.getSize();
      var itemWidth = item.size.outerWidth;

      // if this element cannot fit in the current row
      // need to add extra pixel to avoid layout dropping in some edge
      // bootstrap grid in firefox
      var containerWidth = Math.ceil(this.isotope.size.innerWidth + 1);
      if (this.x !== 0 && itemWidth + this.x > containerWidth) {
        this.x = 0;
        this.y = this.maxY;
      }

      // New row?
      if (this.x == 0 && this.y != 0) {
        this.row++;
      }
      var position = {
        x: this.x,
        y: this.y
      };
      this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight);
      this.x += itemWidth;

      // Compare Y from this row and previous row
      if (typeof this.rows[this.row] == 'undefined') {
        this.rows[this.row] = [];
        this.rows[this.row].start = this.y;
        this.rows[this.row].end = this.maxY;
      } else {
        this.rows[this.row].end = Math.max(this.rows[this.row].end, this.maxY);
      }

      // Record row number to item
      item.row = this.row;
      return position;
    };
    FitRows.prototype._equalHeight = function () {
      // Should we use this.isotope.filteredItems or this.isotope.items?

      for (var i = 0; i < this.isotope.items.length; i++) {
        var row = this.isotope.items[i].row,
          data = this.rows[row];
        if (data) {
          var height = data.end - data.start;
          height -= this.isotope.items[i].size.borderTopWidth + this.isotope.items[i].size.borderBottomWidth;
          height -= this.isotope.items[i].size.marginTop + this.isotope.items[i].size.marginBottom;
          height -= this.gutter.height || 0;
          if (this.isotope.items[i].size.isBorderBox == false) {
            height -= this.isotope.items[i].size.paddingTop + this.isotope.items[i].size.paddingBottom;
          }
          this.isotope.items[i].size.height = height;
          this.isotope.items[i].css({
            height: height.toString() + 'px'
          });
        }
      }
    };
    FitRows.prototype._getContainerSize = function () {
      if (this.options.equalheight) {
        this._equalHeight();
      }
      return {
        height: this.maxY
      };
    };
    return FitRows;
  }
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['../layout-mode'], fitRowsDefinition);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = fitRowsDefinition(require('../layout-mode'));
  } else {
    // browser global
    fitRowsDefinition(window.Isotope.LayoutMode);
  }
})(window);
/*
 Plugin: countUp.js
 https://github.com/inorganik/CountUp.js
 v 1.9.3  
 */

jQuery.noConflict();
var CountUp = function CountUp(target, startVal, endVal, decimals, duration, options) {
  var self = this;
  self.version = function () {
    return '1.9.3';
  };

  // default options
  self.options = {
    useEasing: true,
    // toggle easing
    useGrouping: true,
    // 1,000,000 vs 1000000
    separator: ',',
    // character to use as a separator
    decimal: '.',
    // character to use as a decimal
    easingFn: easeOutExpo,
    // optional custom easing function, default is Robert Penner's easeOutExpo
    formattingFn: formatNumber,
    // optional custom formatting function, default is formatNumber above
    prefix: '',
    // optional text before the result
    suffix: '',
    // optional text after the result
    numerals: [] // optionally pass an array of custom numerals for 0-9
  };

  // extend default options with passed options object
  if (options && typeof options === 'object') {
    for (var key in self.options) {
      if (options.hasOwnProperty(key) && options[key] !== null) {
        self.options[key] = options[key];
      }
    }
  }
  if (self.options.separator === '') {
    self.options.useGrouping = false;
  } else {
    // ensure the separator is a string (formatNumber assumes this)
    self.options.separator = '' + self.options.separator;
  }

  // make sure requestAnimationFrame and cancelAnimationFrame are defined
  // polyfill for browsers without native support
  // by Opera engineer Erik Möller
  var lastTime = 0;
  var vendors = ['webkit', 'moz', 'ms', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
  function formatNumber(num) {
    var neg = num < 0,
      x,
      x1,
      x2,
      x3,
      i,
      len;
    num = Math.abs(num).toFixed(self.decimals);
    num += '';
    x = num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? self.options.decimal + x[1] : '';
    if (self.options.useGrouping) {
      x3 = '';
      for (i = 0, len = x1.length; i < len; ++i) {
        if (i !== 0 && i % 3 === 0) {
          x3 = self.options.separator + x3;
        }
        x3 = x1[len - i - 1] + x3;
      }
      x1 = x3;
    }
    // optional numeral substitution
    if (self.options.numerals.length) {
      x1 = x1.replace(/[0-9]/g, function (w) {
        return self.options.numerals[+w];
      });
      x2 = x2.replace(/[0-9]/g, function (w) {
        return self.options.numerals[+w];
      });
    }
    return (neg ? '-' : '') + self.options.prefix + x1 + x2 + self.options.suffix;
  }
  // Robert Penner's easeOutExpo
  function easeOutExpo(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
  }
  function ensureNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }
  self.initialize = function () {
    if (self.initialized) return true;
    self.error = '';
    self.d = typeof target === 'string' ? document.getElementById(target) : target;
    if (!self.d) {
      self.error = '[CountUp] target is null or undefined';
      return false;
    }
    self.startVal = Number(startVal);
    self.endVal = Number(endVal);
    // error checks
    if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
      self.decimals = Math.max(0, decimals || 0);
      self.dec = Math.pow(10, self.decimals);
      self.duration = Number(duration) * 1000 || 2000;
      self.countDown = self.startVal > self.endVal;
      self.frameVal = self.startVal;
      self.initialized = true;
      return true;
    } else {
      self.error = '[CountUp] startVal (' + startVal + ') or endVal (' + endVal + ') is not a number';
      return false;
    }
  };

  // Print value to target
  self.printValue = function (value) {
    var result = self.options.formattingFn(value);
    if (self.d.tagName === 'INPUT') {
      this.d.value = result;
    } else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
      this.d.textContent = result;
    } else {
      this.d.innerHTML = result;
    }
  };
  self.count = function (timestamp) {
    if (!self.startTime) {
      self.startTime = timestamp;
    }
    self.timestamp = timestamp;
    var progress = timestamp - self.startTime;
    self.remaining = self.duration - progress;

    // to ease or not to ease
    if (self.options.useEasing) {
      if (self.countDown) {
        self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
      } else {
        self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
      }
    } else {
      if (self.countDown) {
        self.frameVal = self.startVal - (self.startVal - self.endVal) * (progress / self.duration);
      } else {
        self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
      }
    }

    // don't go past endVal since progress can exceed duration in the last frame
    if (self.countDown) {
      self.frameVal = self.frameVal < self.endVal ? self.endVal : self.frameVal;
    } else {
      self.frameVal = self.frameVal > self.endVal ? self.endVal : self.frameVal;
    }

    // decimal
    self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;

    // format and print value
    self.printValue(self.frameVal);

    // whether to continue
    if (progress < self.duration) {
      self.rAF = requestAnimationFrame(self.count);
    } else {
      if (self.callback) self.callback();
    }
  };
  // start your animation
  self.start = function (callback) {
    if (!self.initialize()) return;
    self.callback = callback;
    self.rAF = requestAnimationFrame(self.count);
  };
  // toggles pause/resume animation
  self.pauseResume = function () {
    if (!self.paused) {
      self.paused = true;
      cancelAnimationFrame(self.rAF);
    } else {
      self.paused = false;
      delete self.startTime;
      self.duration = self.remaining;
      self.startVal = self.frameVal;
      requestAnimationFrame(self.count);
    }
  };
  // reset to startVal so animation can be run again
  self.reset = function () {
    self.paused = false;
    delete self.startTime;
    self.initialized = false;
    if (self.initialize()) {
      cancelAnimationFrame(self.rAF);
      self.printValue(self.startVal);
    }
  };
  // pass a new endVal and start animation
  self.update = function (newEndVal) {
    if (!self.initialize()) return;
    newEndVal = Number(newEndVal);
    if (!ensureNumber(newEndVal)) {
      self.error = '[CountUp] update() - new endVal is not a number: ' + newEndVal;
      return;
    }
    self.error = '';
    if (newEndVal === self.frameVal) return;
    cancelAnimationFrame(self.rAF);
    self.paused = false;
    delete self.startTime;
    self.startVal = self.frameVal;
    self.endVal = newEndVal;
    self.countDown = self.startVal > self.endVal;
    self.rAF = requestAnimationFrame(self.count);
  };

  // format startVal on initialization
  if (self.initialize()) self.printValue(self.startVal);
};
/*! js-cookie v2.2.1 | MIT */

!function (a) {
  var b;
  if ("function" == typeof define && define.amd && (define(a), b = !0), "object" == typeof exports && (module.exports = a(), b = !0), !b) {
    var c = window.Cookies,
      d = window.Cookies = a();
    d.noConflict = function () {
      return window.Cookies = c, d;
    };
  }
}(function () {
  function a() {
    for (var a = 0, b = {}; a < arguments.length; a++) {
      var c = arguments[a];
      for (var d in c) b[d] = c[d];
    }
    return b;
  }
  function b(a) {
    return a.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }
  function c(d) {
    function e() {}
    function f(b, c, f) {
      if ("undefined" != typeof document) {
        f = a({
          path: "/"
        }, e.defaults, f), "number" == typeof f.expires && (f.expires = new Date(1 * new Date() + 864e5 * f.expires)), f.expires = f.expires ? f.expires.toUTCString() : "";
        try {
          var g = JSON.stringify(c);
          /^[\{\[]/.test(g) && (c = g);
        } catch (j) {}
        c = d.write ? d.write(c, b) : encodeURIComponent(c + "").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), b = encodeURIComponent(b + "").replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
        var h = "";
        for (var i in f) f[i] && (h += "; " + i, !0 !== f[i] && (h += "=" + f[i].split(";")[0]));
        return document.cookie = b + "=" + c + h;
      }
    }
    function g(a, c) {
      if ("undefined" != typeof document) {
        for (var e = {}, f = document.cookie ? document.cookie.split("; ") : [], g = 0; g < f.length; g++) {
          var h = f[g].split("="),
            i = h.slice(1).join("=");
          c || '"' !== i.charAt(0) || (i = i.slice(1, -1));
          try {
            var j = b(h[0]);
            if (i = (d.read || d)(i, j) || b(i), c) try {
              i = JSON.parse(i);
            } catch (k) {}
            if (e[j] = i, a === j) break;
          } catch (k) {}
        }
        return a ? e[a] : e;
      }
    }
    return e.set = f, e.get = function (a) {
      return g(a, !1);
    }, e.getJSON = function (a) {
      return g(a, !0);
    }, e.remove = function (b, c) {
      f(b, "", a(c, {
        expires: -1
      }));
    }, e.defaults = {}, e.withConverter = c, e;
  }
  return c(function () {});
});
/**
 * @license
 * lodash 3.8.0 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE 
 * Build: `lodash compat include="throttle" --production -o lodash.compat.js`
 */
;
(function () {
  function t() {}
  function e(t, e, o) {
    function i() {
      var n = e - (v() - s);
      0 >= n || n > e ? (f && clearTimeout(f), n = d, f = y = d = r, n && (m = v(), p = t.apply(g, a), y || f || (a = g = null))) : y = setTimeout(i, n);
    }
    function c() {
      y && clearTimeout(y), f = y = d = r, (w || b !== e) && (m = v(), p = t.apply(g, a), y || f || (a = g = null));
    }
    function l() {
      if (a = arguments, s = v(), g = this, d = w && (y || !x), false === b) var n = x && !y;else {
        f || x || (m = s);
        var o = b - (s - m),
          r = 0 >= o || o > b;
        r ? (f && (f = clearTimeout(f)), m = s, p = t.apply(g, a)) : f || (f = setTimeout(c, o));
      }
      return r && y ? y = clearTimeout(y) : y || e === b || (y = setTimeout(i, e)), n && (r = true, p = t.apply(g, a)), !r || y || f || (a = g = null), p;
    }
    var a,
      f,
      p,
      s,
      g,
      y,
      d,
      m = 0,
      b = false,
      w = true;
    if (typeof t != "function") throw new TypeError(u);
    if (e = 0 > e ? 0 : +e || 0, true === o) var x = true,
      w = false;else n(o) && (x = o.leading, b = "maxWait" in o && j(+o.maxWait || 0, e), w = "trailing" in o ? o.trailing : w);
    return l.cancel = function () {
      y && clearTimeout(y), f && clearTimeout(f), f = y = d = r;
    }, l;
  }
  function n(t) {
    var e = typeof t;
    return "function" == e || !!t && "object" == e;
  }
  function o(t) {
    return null == t ? false : x.call(t) == c ? T.test(w.call(t)) : !!t && typeof t == "object" && (b(t) ? T : f).test(t);
  }
  function i(t) {
    return typeof t != "string" && (t = null == t ? "" : t + ""), t && a.test(t) ? t.replace(l, "\\$&") : t;
  }
  var r,
    u = "Expected a function",
    c = "[object Function]",
    l = /[.*+?^${}()|[\]\/\\]/g,
    a = RegExp(l.source),
    f = /^\[object .+?Constructor\]$/,
    p = {
      leading: false,
      maxWait: 0,
      trailing: false
    },
    s = {
      "function": true,
      object: true
    },
    g = s[typeof exports] && exports && !exports.nodeType && exports,
    y = s[typeof module] && module && !module.nodeType && module,
    d = s[typeof self] && self && self.Object && self,
    m = s[typeof window] && window && window.Object && window,
    s = y && y.exports === g && g,
    d = g && y && typeof global == "object" && global && global.Object && global || m !== (this && this.window) && m || d || this,
    b = function () {
      try {
        Object({
          toString: 0
        } + "");
      } catch (t) {
        return function () {
          return false;
        };
      }
      return function (t) {
        return typeof t.toString != "function" && typeof (t + "") == "string";
      };
    }(),
    w = Function.prototype.toString,
    x = Object.prototype.toString,
    T = RegExp("^" + i(x).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
    j = Math.max,
    h = o(h = Date.now) && h,
    v = h || function () {
      return new Date().getTime();
    };
  t.debounce = e, t.throttle = function (t, o, i) {
    var r = true,
      c = true;
    if (typeof t != "function") throw new TypeError(u);
    return false === i ? r = false : n(i) && (r = "leading" in i ? !!i.leading : r, c = "trailing" in i ? !!i.trailing : c), p.leading = r, p.maxWait = +o, p.trailing = c, e(t, o, p);
  }, t.escapeRegExp = i, t.isNative = o, t.isObject = n, t.now = v, t.VERSION = "3.8.0", typeof define == "function" && typeof define.amd == "object" && define.amd ? (d._ = t, define(function () {
    return t;
  })) : g && y ? s ? (y.exports = t)._ = t : g._ = t : d._ = t;
}).call(this);
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
/**
 * Owl carousel
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;
(function ($, window, document, undefined) {
  /**
   * Creates a carousel.
   * @class The Owl Carousel.
   * @public
   * @param {HTMLElement|jQuery} element - The element to create the carousel for.
   * @param {Object} [options] - The options
   */
  function Owl(element, options) {
    /**
     * Current settings for the carousel.
     * @public
     */
    this.settings = null;

    /**
     * Current options set by the caller including defaults.
     * @public
     */
    this.options = $.extend({}, Owl.Defaults, options);

    /**
     * Plugin element.
     * @public
     */
    this.$element = $(element);

    /**
     * Proxied event handlers.
     * @protected
     */
    this._handlers = {};

    /**
     * References to the running plugins of this carousel.
     * @protected
     */
    this._plugins = {};

    /**
     * Currently suppressed events to prevent them from being retriggered.
     * @protected
     */
    this._supress = {};

    /**
     * Absolute current position.
     * @protected
     */
    this._current = null;

    /**
     * Animation speed in milliseconds.
     * @protected
     */
    this._speed = null;

    /**
     * Coordinates of all items in pixel.
     * @todo The name of this member is missleading.
     * @protected
     */
    this._coordinates = [];

    /**
     * Current breakpoint.
     * @todo Real media queries would be nice.
     * @protected
     */
    this._breakpoint = null;

    /**
     * Current width of the plugin element.
     */
    this._width = null;

    /**
     * All real items.
     * @protected
     */
    this._items = [];

    /**
     * All cloned items.
     * @protected
     */
    this._clones = [];

    /**
     * Merge values of all items.
     * @todo Maybe this could be part of a plugin.
     * @protected
     */
    this._mergers = [];

    /**
     * Widths of all items.
     */
    this._widths = [];

    /**
     * Invalidated parts within the update process.
     * @protected
     */
    this._invalidated = {};

    /**
     * Ordered list of workers for the update process.
     * @protected
     */
    this._pipe = [];

    /**
     * Current state information for the drag operation.
     * @todo #261
     * @protected
     */
    this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    };

    /**
     * Current state information and their tags.
     * @type {Object}
     * @protected
     */
    this._states = {
      current: {},
      tags: {
        'initializing': ['busy'],
        'animating': ['busy'],
        'dragging': ['interacting']
      }
    };
    $.each(['onResize', 'onThrottledResize'], $.proxy(function (i, handler) {
      this._handlers[handler] = $.proxy(this[handler], this);
    }, this));
    $.each(Owl.Plugins, $.proxy(function (key, plugin) {
      this._plugins[key.charAt(0).toLowerCase() + key.slice(1)] = new plugin(this);
    }, this));
    $.each(Owl.Workers, $.proxy(function (priority, worker) {
      this._pipe.push({
        'filter': worker.filter,
        'run': $.proxy(worker.run, this)
      });
    }, this));
    this.setup();
    this.initialize();
  }

  /**
   * Default options for the carousel.
   * @public
   */
  Owl.Defaults = {
    items: 3,
    loop: false,
    center: false,
    rewind: false,
    checkVisibility: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    freeDrag: false,
    margin: 0,
    stagePadding: 0,
    merge: false,
    mergeFit: true,
    autoWidth: false,
    startPosition: 0,
    rtl: false,
    smartSpeed: 250,
    fluidSpeed: false,
    dragEndSpeed: false,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,
    fallbackEasing: 'swing',
    slideTransition: '',
    info: false,
    nestedItemSelector: false,
    itemElement: 'div',
    stageElement: 'div',
    refreshClass: 'owl-refresh',
    loadedClass: 'owl-loaded',
    loadingClass: 'owl-loading',
    rtlClass: 'owl-rtl',
    responsiveClass: 'owl-responsive',
    dragClass: 'owl-drag',
    itemClass: 'owl-item',
    stageClass: 'owl-stage',
    stageOuterClass: 'owl-stage-outer',
    grabClass: 'owl-grab'
  };

  /**
   * Enumeration for width.
   * @public
   * @readonly
   * @enum {String}
   */
  Owl.Width = {
    Default: 'default',
    Inner: 'inner',
    Outer: 'outer'
  };

  /**
   * Enumeration for types.
   * @public
   * @readonly
   * @enum {String}
   */
  Owl.Type = {
    Event: 'event',
    State: 'state'
  };

  /**
   * Contains all registered plugins.
   * @public
   */
  Owl.Plugins = {};

  /**
   * List of workers involved in the update process.
   */
  Owl.Workers = [{
    filter: ['width', 'settings'],
    run: function run() {
      this._width = this.$element.width();
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function run(cache) {
      cache.current = this._items && this._items[this.relative(this._current)];
    }
  }, {
    filter: ['items', 'settings'],
    run: function run() {
      this.$stage.children('.cloned').remove();
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function run(cache) {
      var margin = this.settings.margin || '',
        grid = !this.settings.autoWidth,
        rtl = this.settings.rtl,
        css = {
          'width': 'auto',
          'margin-left': rtl ? margin : '',
          'margin-right': rtl ? '' : margin
        };
      !grid && this.$stage.children().css(css);
      cache.css = css;
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function run(cache) {
      var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
        merge = null,
        iterator = this._items.length,
        grid = !this.settings.autoWidth,
        widths = [];
      cache.items = {
        merge: false,
        width: width
      };
      while (iterator--) {
        merge = this._mergers[iterator];
        merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;
        cache.items.merge = merge > 1 || cache.items.merge;
        widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
      }
      this._widths = widths;
    }
  }, {
    filter: ['items', 'settings'],
    run: function run() {
      var clones = [],
        items = this._items,
        settings = this.settings,
        // TODO: Should be computed from number of min width items in stage
        view = Math.max(settings.items * 2, 4),
        size = Math.ceil(items.length / 2) * 2,
        repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
        append = '',
        prepend = '';
      repeat /= 2;
      while (repeat > 0) {
        // Switch to only using appended clones
        clones.push(this.normalize(clones.length / 2, true));
        append = append + items[clones[clones.length - 1]][0].outerHTML;
        clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
        prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
        repeat -= 1;
      }
      this._clones = clones;
      $(append).addClass('cloned').appendTo(this.$stage);
      $(prepend).addClass('cloned').prependTo(this.$stage);
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function run() {
      var rtl = this.settings.rtl ? 1 : -1,
        size = this._clones.length + this._items.length,
        iterator = -1,
        previous = 0,
        current = 0,
        coordinates = [];
      while (++iterator < size) {
        previous = coordinates[iterator - 1] || 0;
        current = this._widths[this.relative(iterator)] + this.settings.margin;
        coordinates.push(previous + current * rtl);
      }
      this._coordinates = coordinates;
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function run() {
      var padding = this.settings.stagePadding,
        coordinates = this._coordinates,
        css = {
          'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
          'padding-left': padding || '',
          'padding-right': padding || ''
        };
      this.$stage.css(css);
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function run(cache) {
      var iterator = this._coordinates.length,
        grid = !this.settings.autoWidth,
        items = this.$stage.children();
      if (grid && cache.items.merge) {
        while (iterator--) {
          cache.css.width = this._widths[this.relative(iterator)];
          items.eq(iterator).css(cache.css);
        }
      } else if (grid) {
        cache.css.width = cache.items.width;
        items.css(cache.css);
      }
    }
  }, {
    filter: ['items'],
    run: function run() {
      this._coordinates.length < 1 && this.$stage.removeAttr('style');
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function run(cache) {
      cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
      cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
      this.reset(cache.current);
    }
  }, {
    filter: ['position'],
    run: function run() {
      this.animate(this.coordinates(this._current));
    }
  }, {
    filter: ['width', 'position', 'items', 'settings'],
    run: function run() {
      var rtl = this.settings.rtl ? 1 : -1,
        padding = this.settings.stagePadding * 2,
        begin = this.coordinates(this.current()) + padding,
        end = begin + this.width() * rtl,
        inner,
        outer,
        matches = [],
        i,
        n;
      for (i = 0, n = this._coordinates.length; i < n; i++) {
        inner = this._coordinates[i - 1] || 0;
        outer = Math.abs(this._coordinates[i]) + padding * rtl;
        if (this.op(inner, '<=', begin) && this.op(inner, '>', end) || this.op(outer, '<', begin) && this.op(outer, '>', end)) {
          matches.push(i);
        }
      }
      this.$stage.children('.active').removeClass('active');
      this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');
      this.$stage.children('.center').removeClass('center');
      if (this.settings.center) {
        this.$stage.children().eq(this.current()).addClass('center');
      }
    }
  }];

  /**
   * Create the stage DOM element
   */
  Owl.prototype.initializeStage = function () {
    this.$stage = this.$element.find('.' + this.settings.stageClass);

    // if the stage is already in the DOM, grab it and skip stage initialization
    if (this.$stage.length) {
      return;
    }
    this.$element.addClass(this.options.loadingClass);

    // create stage
    this.$stage = $('<' + this.settings.stageElement + '>', {
      "class": this.settings.stageClass
    }).wrap($('<div/>', {
      "class": this.settings.stageOuterClass
    }));

    // append stage
    this.$element.append(this.$stage.parent());
  };

  /**
   * Create item DOM elements
   */
  Owl.prototype.initializeItems = function () {
    var $items = this.$element.find('.owl-item');

    // if the items are already in the DOM, grab them and skip item initialization
    if ($items.length) {
      this._items = $items.get().map(function (item) {
        return $(item);
      });
      this._mergers = this._items.map(function () {
        return 1;
      });
      this.refresh();
      return;
    }

    // append content
    this.replace(this.$element.children().not(this.$stage.parent()));

    // check visibility
    if (this.isVisible()) {
      // update view
      this.refresh();
    } else {
      // invalidate width
      this.invalidate('width');
    }
    this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
  };

  /**
   * Initializes the carousel.
   * @protected
   */
  Owl.prototype.initialize = function () {
    this.enter('initializing');
    this.trigger('initialize');
    this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);
    if (this.settings.autoWidth && !this.is('pre-loading')) {
      var imgs, nestedSelector, width;
      imgs = this.$element.find('img');
      nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
      width = this.$element.children(nestedSelector).width();
      if (imgs.length && width <= 0) {
        this.preloadAutoWidthImages(imgs);
      }
    }
    this.initializeStage();
    this.initializeItems();

    // register event handlers
    this.registerEventHandlers();
    this.leave('initializing');
    this.trigger('initialized');
  };

  /**
   * @returns {Boolean} visibility of $element
   *                    if you know the carousel will always be visible you can set `checkVisibility` to `false` to
   *                    prevent the expensive browser layout forced reflow the $element.is(':visible') does
   */
  Owl.prototype.isVisible = function () {
    return this.settings.checkVisibility ? this.$element.is(':visible') : true;
  };

  /**
   * Setups the current settings.
   * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
   * @todo Support for media queries by using `matchMedia` would be nice.
   * @public
   */
  Owl.prototype.setup = function () {
    var viewport = this.viewport(),
      overwrites = this.options.responsive,
      match = -1,
      settings = null;
    if (!overwrites) {
      settings = $.extend({}, this.options);
    } else {
      $.each(overwrites, function (breakpoint) {
        if (breakpoint <= viewport && breakpoint > match) {
          match = Number(breakpoint);
        }
      });
      settings = $.extend({}, this.options, overwrites[match]);
      if (typeof settings.stagePadding === 'function') {
        settings.stagePadding = settings.stagePadding();
      }
      delete settings.responsive;

      // responsive class
      if (settings.responsiveClass) {
        this.$element.attr('class', this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match));
      }
    }
    this.trigger('change', {
      property: {
        name: 'settings',
        value: settings
      }
    });
    this._breakpoint = match;
    this.settings = settings;
    this.invalidate('settings');
    this.trigger('changed', {
      property: {
        name: 'settings',
        value: this.settings
      }
    });
  };

  /**
   * Updates option logic if necessery.
   * @protected
   */
  Owl.prototype.optionsLogic = function () {
    if (this.settings.autoWidth) {
      this.settings.stagePadding = false;
      this.settings.merge = false;
    }
  };

  /**
   * Prepares an item before add.
   * @todo Rename event parameter `content` to `item`.
   * @protected
   * @returns {jQuery|HTMLElement} - The item container.
   */
  Owl.prototype.prepare = function (item) {
    var event = this.trigger('prepare', {
      content: item
    });
    if (!event.data) {
      event.data = $('<' + this.settings.itemElement + '/>').addClass(this.options.itemClass).append(item);
    }
    this.trigger('prepared', {
      content: event.data
    });
    return event.data;
  };

  /**
   * Updates the view.
   * @public
   */
  Owl.prototype.update = function () {
    var i = 0,
      n = this._pipe.length,
      filter = $.proxy(function (p) {
        return this[p];
      }, this._invalidated),
      cache = {};
    while (i < n) {
      if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
        this._pipe[i].run(cache);
      }
      i++;
    }
    this._invalidated = {};
    !this.is('valid') && this.enter('valid');
  };

  /**
   * Gets the width of the view.
   * @public
   * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
   * @returns {Number} - The width of the view in pixel.
   */
  Owl.prototype.width = function (dimension) {
    dimension = dimension || Owl.Width.Default;
    switch (dimension) {
      case Owl.Width.Inner:
      case Owl.Width.Outer:
        return this._width;
      default:
        return this._width - this.settings.stagePadding * 2 + this.settings.margin;
    }
  };

  /**
   * Refreshes the carousel primarily for adaptive purposes.
   * @public
   */
  Owl.prototype.refresh = function () {
    this.enter('refreshing');
    this.trigger('refresh');
    this.setup();
    this.optionsLogic();
    this.$element.addClass(this.options.refreshClass);
    this.update();
    this.$element.removeClass(this.options.refreshClass);
    this.leave('refreshing');
    this.trigger('refreshed');
  };

  /**
   * Checks window `resize` event.
   * @protected
   */
  Owl.prototype.onThrottledResize = function () {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
  };

  /**
   * Checks window `resize` event.
   * @protected
   */
  Owl.prototype.onResize = function () {
    if (!this._items.length) {
      return false;
    }
    if (this._width === this.$element.width()) {
      return false;
    }
    if (!this.isVisible()) {
      return false;
    }
    this.enter('resizing');
    if (this.trigger('resize').isDefaultPrevented()) {
      this.leave('resizing');
      return false;
    }
    this.invalidate('width');
    this.refresh();
    this.leave('resizing');
    this.trigger('resized');
  };

  /**
   * Registers event handlers.
   * @todo Check `msPointerEnabled`
   * @todo #261
   * @protected
   */
  Owl.prototype.registerEventHandlers = function () {
    if ($.support.transition) {
      this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
    }
    if (this.settings.responsive !== false) {
      this.on(window, 'resize', this._handlers.onThrottledResize);
    }
    if (this.settings.mouseDrag) {
      this.$element.addClass(this.options.dragClass);
      this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
      this.$stage.on('dragstart.owl.core selectstart.owl.core', function () {
        return false;
      });
    }
    if (this.settings.touchDrag) {
      this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
      this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
    }
  };

  /**
   * Handles `touchstart` and `mousedown` events.
   * @todo Horizontal swipe threshold as option
   * @todo #261
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragStart = function (event) {
    var stage = null;
    if (event.which === 3) {
      return;
    }
    if ($.support.transform) {
      stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
      stage = {
        x: stage[stage.length === 16 ? 12 : 4],
        y: stage[stage.length === 16 ? 13 : 5]
      };
    } else {
      stage = this.$stage.position();
      stage = {
        x: this.settings.rtl ? stage.left + this.$stage.width() - this.width() + this.settings.margin : stage.left,
        y: stage.top
      };
    }
    if (this.is('animating')) {
      $.support.transform ? this.animate(stage.x) : this.$stage.stop();
      this.invalidate('position');
    }
    this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');
    this.speed(0);
    this._drag.time = new Date().getTime();
    this._drag.target = $(event.target);
    this._drag.stage.start = stage;
    this._drag.stage.current = stage;
    this._drag.pointer = this.pointer(event);
    $(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));
    $(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function (event) {
      var delta = this.difference(this._drag.pointer, this.pointer(event));
      $(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));
      if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
        return;
      }
      event.preventDefault();
      this.enter('dragging');
      this.trigger('drag');
    }, this));
  };

  /**
   * Handles the `touchmove` and `mousemove` events.
   * @todo #261
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragMove = function (event) {
    var minimum = null,
      maximum = null,
      pull = null,
      delta = this.difference(this._drag.pointer, this.pointer(event)),
      stage = this.difference(this._drag.stage.start, delta);
    if (!this.is('dragging')) {
      return;
    }

    //event.preventDefault();

    if (this.settings.loop) {
      minimum = this.coordinates(this.minimum());
      maximum = this.coordinates(this.maximum() + 1) - minimum;
      stage.x = ((stage.x - minimum) % maximum + maximum) % maximum + minimum;
    } else {
      minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
      maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
      pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
      stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
    }
    this._drag.stage.current = stage;
    this.animate(stage.x);
  };

  /**
   * Handles the `touchend` and `mouseup` events.
   * @todo #261
   * @todo Threshold for click event
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragEnd = function (event) {
    var delta = this.difference(this._drag.pointer, this.pointer(event)),
      stage = this._drag.stage.current,
      direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';
    $(document).off('.owl.core');
    this.$element.removeClass(this.options.grabClass);
    if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
      this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
      this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
      this.invalidate('position');
      this.update();
      this._drag.direction = direction;
      if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
        this._drag.target.one('click.owl.core', function () {
          return false;
        });
      }
    }
    if (!this.is('dragging')) {
      return;
    }
    this.leave('dragging');
    this.trigger('dragged');
  };

  /**
   * Gets absolute position of the closest item for a coordinate.
   * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
   * @protected
   * @param {Number} coordinate - The coordinate in pixel.
   * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
   * @return {Number} - The absolute position of the closest item.
   */
  Owl.prototype.closest = function (coordinate, direction) {
    var position = -1,
      pull = 30,
      width = this.width(),
      coordinates = this.coordinates();
    if (!this.settings.freeDrag) {
      // check closest item
      $.each(coordinates, $.proxy(function (index, value) {
        // on a left pull, check on current index
        if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
          position = index;
          // on a right pull, check on previous index
          // to do so, subtract width from value and set position = index + 1
        } else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
          position = index + 1;
        } else if (this.op(coordinate, '<', value) && this.op(coordinate, '>', coordinates[index + 1] !== undefined ? coordinates[index + 1] : value - width)) {
          position = direction === 'left' ? index + 1 : index;
        }
        return position === -1;
      }, this));
    }
    if (!this.settings.loop) {
      // non loop boundries
      if (this.op(coordinate, '>', coordinates[this.minimum()])) {
        position = coordinate = this.minimum();
      } else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
        position = coordinate = this.maximum();
      }
    }
    return position;
  };

  /**
   * Animates the stage.
   * @todo #270
   * @public
   * @param {Number} coordinate - The coordinate in pixels.
   */
  Owl.prototype.animate = function (coordinate) {
    var animate = this.speed() > 0;
    this.is('animating') && this.onTransitionEnd();
    if (animate) {
      this.enter('animating');
      this.trigger('translate');
    }
    if ($.support.transform3d && $.support.transition) {
      this.$stage.css({
        transform: 'translate3d(' + coordinate + 'px,0px,0px)',
        transition: this.speed() / 1000 + 's' + (this.settings.slideTransition ? ' ' + this.settings.slideTransition : '')
      });
    } else if (animate) {
      this.$stage.animate({
        left: coordinate + 'px'
      }, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
    } else {
      this.$stage.css({
        left: coordinate + 'px'
      });
    }
  };

  /**
   * Checks whether the carousel is in a specific state or not.
   * @param {String} state - The state to check.
   * @returns {Boolean} - The flag which indicates if the carousel is busy.
   */
  Owl.prototype.is = function (state) {
    return this._states.current[state] && this._states.current[state] > 0;
  };

  /**
   * Sets the absolute position of the current item.
   * @public
   * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
   * @returns {Number} - The absolute position of the current item.
   */
  Owl.prototype.current = function (position) {
    if (position === undefined) {
      return this._current;
    }
    if (this._items.length === 0) {
      return undefined;
    }
    position = this.normalize(position);
    if (this._current !== position) {
      var event = this.trigger('change', {
        property: {
          name: 'position',
          value: position
        }
      });
      if (event.data !== undefined) {
        position = this.normalize(event.data);
      }
      this._current = position;
      this.invalidate('position');
      this.trigger('changed', {
        property: {
          name: 'position',
          value: this._current
        }
      });
    }
    return this._current;
  };

  /**
   * Invalidates the given part of the update routine.
   * @param {String} [part] - The part to invalidate.
   * @returns {Array.<String>} - The invalidated parts.
   */
  Owl.prototype.invalidate = function (part) {
    if ($.type(part) === 'string') {
      this._invalidated[part] = true;
      this.is('valid') && this.leave('valid');
    }
    return $.map(this._invalidated, function (v, i) {
      return i;
    });
  };

  /**
   * Resets the absolute position of the current item.
   * @public
   * @param {Number} position - The absolute position of the new item.
   */
  Owl.prototype.reset = function (position) {
    position = this.normalize(position);
    if (position === undefined) {
      return;
    }
    this._speed = 0;
    this._current = position;
    this.suppress(['translate', 'translated']);
    this.animate(this.coordinates(position));
    this.release(['translate', 'translated']);
  };

  /**
   * Normalizes an absolute or a relative position of an item.
   * @public
   * @param {Number} position - The absolute or relative position to normalize.
   * @param {Boolean} [relative=false] - Whether the given position is relative or not.
   * @returns {Number} - The normalized position.
   */
  Owl.prototype.normalize = function (position, relative) {
    var n = this._items.length,
      m = relative ? 0 : this._clones.length;
    if (!this.isNumeric(position) || n < 1) {
      position = undefined;
    } else if (position < 0 || position >= n + m) {
      position = ((position - m / 2) % n + n) % n + m / 2;
    }
    return position;
  };

  /**
   * Converts an absolute position of an item into a relative one.
   * @public
   * @param {Number} position - The absolute position to convert.
   * @returns {Number} - The converted position.
   */
  Owl.prototype.relative = function (position) {
    position -= this._clones.length / 2;
    return this.normalize(position, true);
  };

  /**
   * Gets the maximum position for the current item.
   * @public
   * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
   * @returns {Number}
   */
  Owl.prototype.maximum = function (relative) {
    var settings = this.settings,
      maximum = this._coordinates.length,
      iterator,
      reciprocalItemsWidth,
      elementWidth;
    if (settings.loop) {
      maximum = this._clones.length / 2 + this._items.length - 1;
    } else if (settings.autoWidth || settings.merge) {
      iterator = this._items.length;
      if (iterator) {
        reciprocalItemsWidth = this._items[--iterator].width();
        elementWidth = this.$element.width();
        while (iterator--) {
          reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
          if (reciprocalItemsWidth > elementWidth) {
            break;
          }
        }
      }
      maximum = iterator + 1;
    } else if (settings.center) {
      maximum = this._items.length - 1;
    } else {
      maximum = this._items.length - settings.items;
    }
    if (relative) {
      maximum -= this._clones.length / 2;
    }
    return Math.max(maximum, 0);
  };

  /**
   * Gets the minimum position for the current item.
   * @public
   * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
   * @returns {Number}
   */
  Owl.prototype.minimum = function (relative) {
    return relative ? 0 : this._clones.length / 2;
  };

  /**
   * Gets an item at the specified relative position.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
   */
  Owl.prototype.items = function (position) {
    if (position === undefined) {
      return this._items.slice();
    }
    position = this.normalize(position, true);
    return this._items[position];
  };

  /**
   * Gets an item at the specified relative position.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
   */
  Owl.prototype.mergers = function (position) {
    if (position === undefined) {
      return this._mergers.slice();
    }
    position = this.normalize(position, true);
    return this._mergers[position];
  };

  /**
   * Gets the absolute positions of clones for an item.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
   */
  Owl.prototype.clones = function (position) {
    var odd = this._clones.length / 2,
      even = odd + this._items.length,
      map = function map(index) {
        return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;
      };
    if (position === undefined) {
      return $.map(this._clones, function (v, i) {
        return map(i);
      });
    }
    return $.map(this._clones, function (v, i) {
      return v === position ? map(i) : null;
    });
  };

  /**
   * Sets the current animation speed.
   * @public
   * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
   * @returns {Number} - The current animation speed in milliseconds.
   */
  Owl.prototype.speed = function (speed) {
    if (speed !== undefined) {
      this._speed = speed;
    }
    return this._speed;
  };

  /**
   * Gets the coordinate of an item.
   * @todo The name of this method is missleanding.
   * @public
   * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
   * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
   */
  Owl.prototype.coordinates = function (position) {
    var multiplier = 1,
      newPosition = position - 1,
      coordinate;
    if (position === undefined) {
      return $.map(this._coordinates, $.proxy(function (coordinate, index) {
        return this.coordinates(index);
      }, this));
    }
    if (this.settings.center) {
      if (this.settings.rtl) {
        multiplier = -1;
        newPosition = position + 1;
      }
      coordinate = this._coordinates[position];
      coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
    } else {
      coordinate = this._coordinates[newPosition] || 0;
    }
    coordinate = Math.ceil(coordinate);
    return coordinate;
  };

  /**
   * Calculates the speed for a translation.
   * @protected
   * @param {Number} from - The absolute position of the start item.
   * @param {Number} to - The absolute position of the target item.
   * @param {Number} [factor=undefined] - The time factor in milliseconds.
   * @returns {Number} - The time in milliseconds for the translation.
   */
  Owl.prototype.duration = function (from, to, factor) {
    if (factor === 0) {
      return 0;
    }
    return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs(factor || this.settings.smartSpeed);
  };

  /**
   * Slides to the specified item.
   * @public
   * @param {Number} position - The position of the item.
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.to = function (position, speed) {
    var current = this.current(),
      revert = null,
      distance = position - this.relative(current),
      direction = (distance > 0) - (distance < 0),
      items = this._items.length,
      minimum = this.minimum(),
      maximum = this.maximum();
    if (this.settings.loop) {
      if (!this.settings.rewind && Math.abs(distance) > items / 2) {
        distance += direction * -1 * items;
      }
      position = current + distance;
      revert = ((position - minimum) % items + items) % items + minimum;
      if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
        current = revert - distance;
        position = revert;
        this.reset(current);
      }
    } else if (this.settings.rewind) {
      maximum += 1;
      position = (position % maximum + maximum) % maximum;
    } else {
      position = Math.max(minimum, Math.min(maximum, position));
    }
    this.speed(this.duration(current, position, speed));
    this.current(position);
    if (this.isVisible()) {
      this.update();
    }
  };

  /**
   * Slides to the next item.
   * @public
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.next = function (speed) {
    speed = speed || false;
    this.to(this.relative(this.current()) + 1, speed);
  };

  /**
   * Slides to the previous item.
   * @public
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.prev = function (speed) {
    speed = speed || false;
    this.to(this.relative(this.current()) - 1, speed);
  };

  /**
   * Handles the end of an animation.
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onTransitionEnd = function (event) {
    // if css2 animation then event object is undefined
    if (event !== undefined) {
      event.stopPropagation();

      // Catch only owl-stage transitionEnd event
      if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
        return false;
      }
    }
    this.leave('animating');
    this.trigger('translated');
  };

  /**
   * Gets viewport width.
   * @protected
   * @return {Number} - The width in pixel.
   */
  Owl.prototype.viewport = function () {
    var width;
    if (this.options.responsiveBaseElement !== window) {
      width = $(this.options.responsiveBaseElement).width();
    } else if (window.innerWidth) {
      width = window.innerWidth;
    } else if (document.documentElement && document.documentElement.clientWidth) {
      width = document.documentElement.clientWidth;
    } else {
      console.warn('Can not detect viewport width.');
    }
    return width;
  };

  /**
   * Replaces the current content.
   * @public
   * @param {HTMLElement|jQuery|String} content - The new content.
   */
  Owl.prototype.replace = function (content) {
    this.$stage.empty();
    this._items = [];
    if (content) {
      content = content instanceof jQuery ? content : $(content);
    }
    if (this.settings.nestedItemSelector) {
      content = content.find('.' + this.settings.nestedItemSelector);
    }
    content.filter(function () {
      return this.nodeType === 1;
    }).each($.proxy(function (index, item) {
      item = this.prepare(item);
      this.$stage.append(item);
      this._items.push(item);
      this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    }, this));
    this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
    this.invalidate('items');
  };

  /**
   * Adds an item.
   * @todo Use `item` instead of `content` for the event arguments.
   * @public
   * @param {HTMLElement|jQuery|String} content - The item content to add.
   * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
   */
  Owl.prototype.add = function (content, position) {
    var current = this.relative(this._current);
    position = position === undefined ? this._items.length : this.normalize(position, true);
    content = content instanceof jQuery ? content : $(content);
    this.trigger('add', {
      content: content,
      position: position
    });
    content = this.prepare(content);
    if (this._items.length === 0 || position === this._items.length) {
      this._items.length === 0 && this.$stage.append(content);
      this._items.length !== 0 && this._items[position - 1].after(content);
      this._items.push(content);
      this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    } else {
      this._items[position].before(content);
      this._items.splice(position, 0, content);
      this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    }
    this._items[current] && this.reset(this._items[current].index());
    this.invalidate('items');
    this.trigger('added', {
      content: content,
      position: position
    });
  };

  /**
   * Removes an item by its position.
   * @todo Use `item` instead of `content` for the event arguments.
   * @public
   * @param {Number} position - The relative position of the item to remove.
   */
  Owl.prototype.remove = function (position) {
    position = this.normalize(position, true);
    if (position === undefined) {
      return;
    }
    this.trigger('remove', {
      content: this._items[position],
      position: position
    });
    this._items[position].remove();
    this._items.splice(position, 1);
    this._mergers.splice(position, 1);
    this.invalidate('items');
    this.trigger('removed', {
      content: null,
      position: position
    });
  };

  /**
   * Preloads images with auto width.
   * @todo Replace by a more generic approach
   * @protected
   */
  Owl.prototype.preloadAutoWidthImages = function (images) {
    images.each($.proxy(function (i, element) {
      this.enter('pre-loading');
      element = $(element);
      $(new Image()).one('load', $.proxy(function (e) {
        element.attr('src', e.target.src);
        element.css('opacity', 1);
        this.leave('pre-loading');
        !this.is('pre-loading') && !this.is('initializing') && this.refresh();
      }, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
    }, this));
  };

  /**
   * Destroys the carousel.
   * @public
   */
  Owl.prototype.destroy = function () {
    this.$element.off('.owl.core');
    this.$stage.off('.owl.core');
    $(document).off('.owl.core');
    if (this.settings.responsive !== false) {
      window.clearTimeout(this.resizeTimer);
      this.off(window, 'resize', this._handlers.onThrottledResize);
    }
    for (var i in this._plugins) {
      this._plugins[i].destroy();
    }
    this.$stage.children('.cloned').remove();
    this.$stage.unwrap();
    this.$stage.children().contents().unwrap();
    this.$stage.children().unwrap();
    this.$stage.remove();
    this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), '')).removeData('owl.carousel');
  };

  /**
   * Operators to calculate right-to-left and left-to-right.
   * @protected
   * @param {Number} [a] - The left side operand.
   * @param {String} [o] - The operator.
   * @param {Number} [b] - The right side operand.
   */
  Owl.prototype.op = function (a, o, b) {
    var rtl = this.settings.rtl;
    switch (o) {
      case '<':
        return rtl ? a > b : a < b;
      case '>':
        return rtl ? a < b : a > b;
      case '>=':
        return rtl ? a <= b : a >= b;
      case '<=':
        return rtl ? a >= b : a <= b;
      default:
        break;
    }
  };

  /**
   * Attaches to an internal event.
   * @protected
   * @param {HTMLElement} element - The event source.
   * @param {String} event - The event name.
   * @param {Function} listener - The event handler to attach.
   * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
   */
  Owl.prototype.on = function (element, event, listener, capture) {
    if (element.addEventListener) {
      element.addEventListener(event, listener, capture);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, listener);
    }
  };

  /**
   * Detaches from an internal event.
   * @protected
   * @param {HTMLElement} element - The event source.
   * @param {String} event - The event name.
   * @param {Function} listener - The attached event handler to detach.
   * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
   */
  Owl.prototype.off = function (element, event, listener, capture) {
    if (element.removeEventListener) {
      element.removeEventListener(event, listener, capture);
    } else if (element.detachEvent) {
      element.detachEvent('on' + event, listener);
    }
  };

  /**
   * Triggers a public event.
   * @todo Remove `status`, `relatedTarget` should be used instead.
   * @protected
   * @param {String} name - The event name.
   * @param {*} [data=null] - The event data.
   * @param {String} [namespace=carousel] - The event namespace.
   * @param {String} [state] - The state which is associated with the event.
   * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
   * @returns {Event} - The event arguments.
   */
  Owl.prototype.trigger = function (name, data, namespace, state, enter) {
    var status = {
        item: {
          count: this._items.length,
          index: this.current()
        }
      },
      handler = $.camelCase($.grep(['on', name, namespace], function (v) {
        return v;
      }).join('-').toLowerCase()),
      event = $.Event([name, 'owl', namespace || 'carousel'].join('.').toLowerCase(), $.extend({
        relatedTarget: this
      }, status, data));
    if (!this._supress[name]) {
      $.each(this._plugins, function (name, plugin) {
        if (plugin.onTrigger) {
          plugin.onTrigger(event);
        }
      });
      this.register({
        type: Owl.Type.Event,
        name: name
      });
      this.$element.trigger(event);
      if (this.settings && typeof this.settings[handler] === 'function') {
        this.settings[handler].call(this, event);
      }
    }
    return event;
  };

  /**
   * Enters a state.
   * @param name - The state name.
   */
  Owl.prototype.enter = function (name) {
    $.each([name].concat(this._states.tags[name] || []), $.proxy(function (i, name) {
      if (this._states.current[name] === undefined) {
        this._states.current[name] = 0;
      }
      this._states.current[name]++;
    }, this));
  };

  /**
   * Leaves a state.
   * @param name - The state name.
   */
  Owl.prototype.leave = function (name) {
    $.each([name].concat(this._states.tags[name] || []), $.proxy(function (i, name) {
      this._states.current[name]--;
    }, this));
  };

  /**
   * Registers an event or state.
   * @public
   * @param {Object} object - The event or state to register.
   */
  Owl.prototype.register = function (object) {
    if (object.type === Owl.Type.Event) {
      if (!$.event.special[object.name]) {
        $.event.special[object.name] = {};
      }
      if (!$.event.special[object.name].owl) {
        var _default = $.event.special[object.name]._default;
        $.event.special[object.name]._default = function (e) {
          if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
            return _default.apply(this, arguments);
          }
          return e.namespace && e.namespace.indexOf('owl') > -1;
        };
        $.event.special[object.name].owl = true;
      }
    } else if (object.type === Owl.Type.State) {
      if (!this._states.tags[object.name]) {
        this._states.tags[object.name] = object.tags;
      } else {
        this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
      }
      this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function (tag, i) {
        return $.inArray(tag, this._states.tags[object.name]) === i;
      }, this));
    }
  };

  /**
   * Suppresses events.
   * @protected
   * @param {Array.<String>} events - The events to suppress.
   */
  Owl.prototype.suppress = function (events) {
    $.each(events, $.proxy(function (index, event) {
      this._supress[event] = true;
    }, this));
  };

  /**
   * Releases suppressed events.
   * @protected
   * @param {Array.<String>} events - The events to release.
   */
  Owl.prototype.release = function (events) {
    $.each(events, $.proxy(function (index, event) {
      delete this._supress[event];
    }, this));
  };

  /**
   * Gets unified pointer coordinates from event.
   * @todo #261
   * @protected
   * @param {Event} - The `mousedown` or `touchstart` event.
   * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
   */
  Owl.prototype.pointer = function (event) {
    var result = {
      x: null,
      y: null
    };
    event = event.originalEvent || event || window.event;
    event = event.touches && event.touches.length ? event.touches[0] : event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : event;
    if (event.pageX) {
      result.x = event.pageX;
      result.y = event.pageY;
    } else {
      result.x = event.clientX;
      result.y = event.clientY;
    }
    return result;
  };

  /**
   * Determines if the input is a Number or something that can be coerced to a Number
   * @protected
   * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
   * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
   */
  Owl.prototype.isNumeric = function (number) {
    return !isNaN(parseFloat(number));
  };

  /**
   * Gets the difference of two vectors.
   * @todo #261
   * @protected
   * @param {Object} - The first vector.
   * @param {Object} - The second vector.
   * @returns {Object} - The difference.
   */
  Owl.prototype.difference = function (first, second) {
    return {
      x: first.x - second.x,
      y: first.y - second.y
    };
  };

  /**
   * The jQuery Plugin for the Owl Carousel
   * @todo Navigation plugin `next` and `prev`
   * @public
   */
  $.fn.owlCarousel = function (option) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var $this = $(this),
        data = $this.data('owl.carousel');
      if (!data) {
        data = new Owl(this, typeof option == 'object' && option);
        $this.data('owl.carousel', data);
        $.each(['next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'], function (i, event) {
          data.register({
            type: Owl.Type.Event,
            name: event
          });
          data.$element.on(event + '.owl.carousel.core', $.proxy(function (e) {
            if (e.namespace && e.relatedTarget !== this) {
              this.suppress([event]);
              data[event].apply(this, [].slice.call(arguments, 1));
              this.release([event]);
            }
          }, data));
        });
      }
      if (typeof option == 'string' && option.charAt(0) !== '_') {
        data[option].apply(data, args);
      }
    });
  };

  /**
   * The constructor for the jQuery Plugin
   * @public
   */
  $.fn.owlCarousel.Constructor = Owl;
})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
  /**
   * Creates the auto refresh plugin.
   * @class The Auto Refresh Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var AutoRefresh = function AutoRefresh(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Refresh interval.
     * @protected
     * @type {number}
     */
    this._interval = null;

    /**
     * Whether the element is currently visible or not.
     * @protected
     * @type {Boolean}
     */
    this._visible = null;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.autoRefresh) {
          this.watch();
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  AutoRefresh.Defaults = {
    autoRefresh: true,
    autoRefreshInterval: 500
  };

  /**
   * Watches the element.
   */
  AutoRefresh.prototype.watch = function () {
    if (this._interval) {
      return;
    }
    this._visible = this._core.isVisible();
    this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
  };

  /**
   * Refreshes the element.
   */
  AutoRefresh.prototype.refresh = function () {
    if (this._core.isVisible() === this._visible) {
      return;
    }
    this._visible = !this._visible;
    this._core.$element.toggleClass('owl-hidden', !this._visible);
    this._visible && this._core.invalidate('width') && this._core.refresh();
  };

  /**
   * Destroys the plugin.
   */
  AutoRefresh.prototype.destroy = function () {
    var handler, property;
    window.clearInterval(this._interval);
    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;
})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
  /**
   * Creates the lazy plugin.
   * @class The Lazy Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Lazy = function Lazy(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Already loaded items.
     * @protected
     * @type {Array.<jQuery>}
     */
    this._loaded = [];

    /**
     * Event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function (e) {
        if (!e.namespace) {
          return;
        }
        if (!this._core.settings || !this._core.settings.lazyLoad) {
          return;
        }
        if (e.property && e.property.name == 'position' || e.type == 'initialized') {
          var settings = this._core.settings,
            n = settings.center && Math.ceil(settings.items / 2) || settings.items,
            i = settings.center && n * -1 || 0,
            position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
            clones = this._core.clones().length,
            load = $.proxy(function (i, v) {
              this.load(v);
            }, this);
          //TODO: Need documentation for this new option
          if (settings.lazyLoadEager > 0) {
            n += settings.lazyLoadEager;
            // If the carousel is looping also preload images that are to the "left"
            if (settings.loop) {
              position -= settings.lazyLoadEager;
              n++;
            }
          }
          while (i++ < n) {
            this.load(clones / 2 + this._core.relative(position));
            clones && $.each(this._core.clones(this._core.relative(position)), load);
            position++;
          }
        }
      }, this)
    };

    // set the default options
    this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

    // register event handler
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  Lazy.Defaults = {
    lazyLoad: false,
    lazyLoadEager: 0
  };

  /**
   * Loads all resources of an item at the specified position.
   * @param {Number} position - The absolute position of the item.
   * @protected
   */
  Lazy.prototype.load = function (position) {
    var $item = this._core.$stage.children().eq(position),
      $elements = $item && $item.find('.owl-lazy');
    if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
      return;
    }
    $elements.each($.proxy(function (index, element) {
      var $element = $(element),
        image,
        url = window.devicePixelRatio > 1 && $element.attr('data-src-retina') || $element.attr('data-src') || $element.attr('data-srcset');
      this._core.trigger('load', {
        element: $element,
        url: url
      }, 'lazy');
      if ($element.is('img')) {
        $element.one('load.owl.lazy', $.proxy(function () {
          $element.css('opacity', 1);
          this._core.trigger('loaded', {
            element: $element,
            url: url
          }, 'lazy');
        }, this)).attr('src', url);
      } else if ($element.is('source')) {
        $element.one('load.owl.lazy', $.proxy(function () {
          this._core.trigger('loaded', {
            element: $element,
            url: url
          }, 'lazy');
        }, this)).attr('srcset', url);
      } else {
        image = new Image();
        image.onload = $.proxy(function () {
          $element.css({
            'background-image': 'url("' + url + '")',
            'opacity': '1'
          });
          this._core.trigger('loaded', {
            element: $element,
            url: url
          }, 'lazy');
        }, this);
        image.src = url;
      }
    }, this));
    this._loaded.push($item.get(0));
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Lazy.prototype.destroy = function () {
    var handler, property;
    for (handler in this.handlers) {
      this._core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;
})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
  /**
   * Creates the auto height plugin.
   * @class The Auto Height Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var AutoHeight = function AutoHeight(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;
    this._previousHeight = null;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.autoHeight) {
          this.update();
        }
      }, this),
      'changed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.autoHeight && e.property.name === 'position') {
          this.update();
        }
      }, this),
      'loaded.owl.lazy': $.proxy(function (e) {
        if (e.namespace && this._core.settings.autoHeight && e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
          this.update();
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);
    this._intervalId = null;
    var refThis = this;

    // These changes have been taken from a PR by gavrochelegnou proposed in #1575
    // and have been made compatible with the latest jQuery version
    $(window).on('load', function () {
      if (refThis._core.settings.autoHeight) {
        refThis.update();
      }
    });

    // Autoresize the height of the carousel when window is resized
    // When carousel has images, the height is dependent on the width
    // and should also change on resize
    $(window).resize(function () {
      if (refThis._core.settings.autoHeight) {
        if (refThis._intervalId != null) {
          clearTimeout(refThis._intervalId);
        }
        refThis._intervalId = setTimeout(function () {
          refThis.update();
        }, 250);
      }
    });
  };

  /**
   * Default options.
   * @public
   */
  AutoHeight.Defaults = {
    autoHeight: false,
    autoHeightClass: 'owl-height'
  };

  /**
   * Updates the view.
   */
  AutoHeight.prototype.update = function () {
    var start = this._core._current,
      end = start + this._core.settings.items,
      lazyLoadEnabled = this._core.settings.lazyLoad,
      visible = this._core.$stage.children().toArray().slice(start, end),
      heights = [],
      maxheight = 0;
    $.each(visible, function (index, item) {
      heights.push($(item).height());
    });
    maxheight = Math.max.apply(null, heights);
    if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) {
      maxheight = this._previousHeight;
    }
    this._previousHeight = maxheight;
    this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass);
  };
  AutoHeight.prototype.destroy = function () {
    var handler, property;
    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] !== 'function' && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;
})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
  /**
   * Creates the video plugin.
   * @class The Video Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Video = function Video(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Cache all video URLs.
     * @protected
     * @type {Object}
     */
    this._videos = {};

    /**
     * Current playing item.
     * @protected
     * @type {jQuery}
     */
    this._playing = null;

    /**
     * All event handlers.
     * @todo The cloned content removale is too late
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel': $.proxy(function (e) {
        if (e.namespace) {
          this._core.register({
            type: 'state',
            name: 'playing',
            tags: ['interacting']
          });
        }
      }, this),
      'resize.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
          e.preventDefault();
        }
      }, this),
      'refreshed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.is('resizing')) {
          this._core.$stage.find('.cloned .owl-video-frame').remove();
        }
      }, this),
      'changed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && e.property.name === 'position' && this._playing) {
          this.stop();
        }
      }, this),
      'prepared.owl.carousel': $.proxy(function (e) {
        if (!e.namespace) {
          return;
        }
        var $element = $(e.content).find('.owl-video');
        if ($element.length) {
          $element.css('display', 'none');
          this.fetch($element, $(e.content));
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, Video.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);
    this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function (e) {
      this.play(e);
    }, this));
  };

  /**
   * Default options.
   * @public
   */
  Video.Defaults = {
    video: false,
    videoHeight: false,
    videoWidth: false
  };

  /**
   * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
   * @protected
   * @param {jQuery} target - The target containing the video data.
   * @param {jQuery} item - The item containing the video.
   */
  Video.prototype.fetch = function (target, item) {
    var type = function () {
        if (target.attr('data-vimeo-id')) {
          return 'vimeo';
        } else if (target.attr('data-vzaar-id')) {
          return 'vzaar';
        } else {
          return 'youtube';
        }
      }(),
      id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
      width = target.attr('data-width') || this._core.settings.videoWidth,
      height = target.attr('data-height') || this._core.settings.videoHeight,
      url = target.attr('href');
    if (url) {
      /*
      		Parses the id's out of the following urls (and probably more):
      		https://www.youtube.com/watch?v=:id
      		https://youtu.be/:id
      		https://vimeo.com/:id
      		https://vimeo.com/channels/:channel/:id
      		https://vimeo.com/groups/:group/videos/:id
      		https://app.vzaar.com/videos/:id
      			Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
      */

      id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
      if (id[3].indexOf('youtu') > -1) {
        type = 'youtube';
      } else if (id[3].indexOf('vimeo') > -1) {
        type = 'vimeo';
      } else if (id[3].indexOf('vzaar') > -1) {
        type = 'vzaar';
      } else {
        throw new Error('Video URL not supported.');
      }
      id = id[6];
    } else {
      throw new Error('Missing video URL.');
    }
    this._videos[url] = {
      type: type,
      id: id,
      width: width,
      height: height
    };
    item.attr('data-video', url);
    this.thumbnail(target, this._videos[url]);
  };

  /**
   * Creates video thumbnail.
   * @protected
   * @param {jQuery} target - The target containing the video data.
   * @param {Object} info - The video info object.
   * @see `fetch`
   */
  Video.prototype.thumbnail = function (target, video) {
    var tnLink,
      icon,
      path,
      dimensions = video.width && video.height ? 'width:' + video.width + 'px;height:' + video.height + 'px;' : '',
      customTn = target.find('img'),
      srcType = 'src',
      lazyClass = '',
      settings = this._core.settings,
      create = function create(path) {
        icon = '<div class="owl-video-play-icon"></div>';
        if (settings.lazyLoad) {
          tnLink = $('<div/>', {
            "class": 'owl-video-tn ' + lazyClass,
            "srcType": path
          });
        } else {
          tnLink = $('<div/>', {
            "class": "owl-video-tn",
            "style": 'opacity:1;background-image:url(' + path + ')'
          });
        }
        target.after(tnLink);
        target.after(icon);
      };

    // wrap video content into owl-video-wrapper div
    target.wrap($('<div/>', {
      "class": "owl-video-wrapper",
      "style": dimensions
    }));
    if (this._core.settings.lazyLoad) {
      srcType = 'data-src';
      lazyClass = 'owl-lazy';
    }

    // custom thumbnail
    if (customTn.length) {
      create(customTn.attr(srcType));
      customTn.remove();
      return false;
    }
    if (video.type === 'youtube') {
      path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
      create(path);
    } else if (video.type === 'vimeo') {
      $.ajax({
        type: 'GET',
        url: '//vimeo.com/api/v2/video/' + video.id + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function success(data) {
          path = data[0].thumbnail_large;
          create(path);
        }
      });
    } else if (video.type === 'vzaar') {
      $.ajax({
        type: 'GET',
        url: '//vzaar.com/api/videos/' + video.id + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function success(data) {
          path = data.framegrab_url;
          create(path);
        }
      });
    }
  };

  /**
   * Stops the current video.
   * @public
   */
  Video.prototype.stop = function () {
    this._core.trigger('stop', null, 'video');
    this._playing.find('.owl-video-frame').remove();
    this._playing.removeClass('owl-video-playing');
    this._playing = null;
    this._core.leave('playing');
    this._core.trigger('stopped', null, 'video');
  };

  /**
   * Starts the current video.
   * @public
   * @param {Event} event - The event arguments.
   */
  Video.prototype.play = function (event) {
    var target = $(event.target),
      item = target.closest('.' + this._core.settings.itemClass),
      video = this._videos[item.attr('data-video')],
      width = video.width || '100%',
      height = video.height || this._core.$stage.height(),
      html,
      iframe;
    if (this._playing) {
      return;
    }
    this._core.enter('playing');
    this._core.trigger('play', null, 'video');
    item = this._core.items(this._core.relative(item.index()));
    this._core.reset(item.index());
    html = $('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>');
    html.attr('height', height);
    html.attr('width', width);
    if (video.type === 'youtube') {
      html.attr('src', '//www.youtube.com/embed/' + video.id + '?autoplay=1&rel=0&v=' + video.id);
    } else if (video.type === 'vimeo') {
      html.attr('src', '//player.vimeo.com/video/' + video.id + '?autoplay=1');
    } else if (video.type === 'vzaar') {
      html.attr('src', '//view.vzaar.com/' + video.id + '/player?autoplay=true');
    }
    iframe = $(html).wrap('<div class="owl-video-frame" />').insertAfter(item.find('.owl-video'));
    this._playing = item.addClass('owl-video-playing');
  };

  /**
   * Checks whether an video is currently in full screen mode or not.
   * @todo Bad style because looks like a readonly method but changes members.
   * @protected
   * @returns {Boolean}
   */
  Video.prototype.isInFullScreen = function () {
    var element = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    return element && $(element).parent().hasClass('owl-video-frame');
  };

  /**
   * Destroys the plugin.
   */
  Video.prototype.destroy = function () {
    var handler, property;
    this._core.$element.off('click.owl.video');
    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.Video = Video;
})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
  /**
   * Creates the animate plugin.
   * @class The Navigation Plugin
   * @param {Owl} scope - The Owl Carousel
   */
  var Animate = function Animate(scope) {
    this.core = scope;
    this.core.options = $.extend({}, Animate.Defaults, this.core.options);
    this.swapping = true;
    this.previous = undefined;
    this.next = undefined;
    this.handlers = {
      'change.owl.carousel': $.proxy(function (e) {
        if (e.namespace && e.property.name == 'position') {
          this.previous = this.core.current();
          this.next = e.property.value;
        }
      }, this),
      'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function (e) {
        if (e.namespace) {
          this.swapping = e.type == 'translated';
        }
      }, this),
      'translate.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
          this.swap();
        }
      }, this)
    };
    this.core.$element.on(this.handlers);
  };

  /**
   * Default options.
   * @public
   */
  Animate.Defaults = {
    animateOut: false,
    animateIn: false
  };

  /**
   * Toggles the animation classes whenever an translations starts.
   * @protected
   * @returns {Boolean|undefined}
   */
  Animate.prototype.swap = function () {
    if (this.core.settings.items !== 1) {
      return;
    }
    if (!$.support.animation || !$.support.transition) {
      return;
    }
    this.core.speed(0);
    var left,
      clear = $.proxy(this.clear, this),
      previous = this.core.$stage.children().eq(this.previous),
      next = this.core.$stage.children().eq(this.next),
      incoming = this.core.settings.animateIn,
      outgoing = this.core.settings.animateOut;
    if (this.core.current() === this.previous) {
      return;
    }
    if (outgoing) {
      left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
      previous.one($.support.animation.end, clear).css({
        'left': left + 'px'
      }).addClass('animated owl-animated-out').addClass(outgoing);
    }
    if (incoming) {
      next.one($.support.animation.end, clear).addClass('animated owl-animated-in').addClass(incoming);
    }
  };
  Animate.prototype.clear = function (e) {
    $(e.target).css({
      'left': ''
    }).removeClass('animated owl-animated-out owl-animated-in').removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
    this.core.onTransitionEnd();
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Animate.prototype.destroy = function () {
    var handler, property;
    for (handler in this.handlers) {
      this.core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.Animate = Animate;
})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @author Tom De Caluwé
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
  /**
   * Creates the autoplay plugin.
   * @class The Autoplay Plugin
   * @param {Owl} scope - The Owl Carousel
   */
  var Autoplay = function Autoplay(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * The autoplay timeout id.
     * @type {Number}
     */
    this._call = null;

    /**
     * Depending on the state of the plugin, this variable contains either
     * the start time of the timer or the current timer value if it's
     * paused. Since we start in a paused state we initialize the timer
     * value.
     * @type {Number}
     */
    this._time = 0;

    /**
     * Stores the timeout currently used.
     * @type {Number}
     */
    this._timeout = 0;

    /**
     * Indicates whenever the autoplay is paused.
     * @type {Boolean}
     */
    this._paused = true;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'changed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && e.property.name === 'settings') {
          if (this._core.settings.autoplay) {
            this.play();
          } else {
            this.stop();
          }
        } else if (e.namespace && e.property.name === 'position' && this._paused) {
          // Reset the timer. This code is triggered when the position
          // of the carousel was changed through user interaction.
          this._time = 0;
        }
      }, this),
      'initialized.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.autoplay) {
          this.play();
        }
      }, this),
      'play.owl.autoplay': $.proxy(function (e, t, s) {
        if (e.namespace) {
          this.play(t, s);
        }
      }, this),
      'stop.owl.autoplay': $.proxy(function (e) {
        if (e.namespace) {
          this.stop();
        }
      }, this),
      'mouseover.owl.autoplay': $.proxy(function () {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.pause();
        }
      }, this),
      'mouseleave.owl.autoplay': $.proxy(function () {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.play();
        }
      }, this),
      'touchstart.owl.core': $.proxy(function () {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.pause();
        }
      }, this),
      'touchend.owl.core': $.proxy(function () {
        if (this._core.settings.autoplayHoverPause) {
          this.play();
        }
      }, this)
    };

    // register event handlers
    this._core.$element.on(this._handlers);

    // set default options
    this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
  };

  /**
   * Default options.
   * @public
   */
  Autoplay.Defaults = {
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    autoplaySpeed: false
  };

  /**
   * Transition to the next slide and set a timeout for the next transition.
   * @private
   * @param {Number} [speed] - The animation speed for the animations.
   */
  Autoplay.prototype._next = function (speed) {
    this._call = window.setTimeout($.proxy(this._next, this, speed), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read());
    if (this._core.is('interacting') || document.hidden) {
      return;
    }
    this._core.next(speed || this._core.settings.autoplaySpeed);
  };

  /**
   * Reads the current timer value when the timer is playing.
   * @public
   */
  Autoplay.prototype.read = function () {
    return new Date().getTime() - this._time;
  };

  /**
   * Starts the autoplay.
   * @public
   * @param {Number} [timeout] - The interval before the next animation starts.
   * @param {Number} [speed] - The animation speed for the animations.
   */
  Autoplay.prototype.play = function (timeout, speed) {
    var elapsed;
    if (!this._core.is('rotating')) {
      this._core.enter('rotating');
    }
    timeout = timeout || this._core.settings.autoplayTimeout;

    // Calculate the elapsed time since the last transition. If the carousel
    // wasn't playing this calculation will yield zero.
    elapsed = Math.min(this._time % (this._timeout || timeout), timeout);
    if (this._paused) {
      // Start the clock.
      this._time = this.read();
      this._paused = false;
    } else {
      // Clear the active timeout to allow replacement.
      window.clearTimeout(this._call);
    }

    // Adjust the origin of the timer to match the new timeout value.
    this._time += this.read() % timeout - elapsed;
    this._timeout = timeout;
    this._call = window.setTimeout($.proxy(this._next, this, speed), timeout - elapsed);
  };

  /**
   * Stops the autoplay.
   * @public
   */
  Autoplay.prototype.stop = function () {
    if (this._core.is('rotating')) {
      // Reset the clock.
      this._time = 0;
      this._paused = true;
      window.clearTimeout(this._call);
      this._core.leave('rotating');
    }
  };

  /**
   * Pauses the autoplay.
   * @public
   */
  Autoplay.prototype.pause = function () {
    if (this._core.is('rotating') && !this._paused) {
      // Pause the clock.
      this._time = this.read();
      this._paused = true;
      window.clearTimeout(this._call);
    }
  };

  /**
   * Destroys the plugin.
   */
  Autoplay.prototype.destroy = function () {
    var handler, property;
    this.stop();
    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;
})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
  'use strict';

  /**
   * Creates the navigation plugin.
   * @class The Navigation Plugin
   * @param {Owl} carousel - The Owl Carousel.
   */
  var Navigation = function Navigation(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Indicates whether the plugin is initialized or not.
     * @protected
     * @type {Boolean}
     */
    this._initialized = false;

    /**
     * The current paging indexes.
     * @protected
     * @type {Array}
     */
    this._pages = [];

    /**
     * All DOM elements of the user interface.
     * @protected
     * @type {Object}
     */
    this._controls = {};

    /**
     * Markup for an indicator.
     * @protected
     * @type {Array.<String>}
     */
    this._templates = [];

    /**
     * The carousel element.
     * @type {jQuery}
     */
    this.$element = this._core.$element;

    /**
     * Overridden methods of the carousel.
     * @protected
     * @type {Object}
     */
    this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    };

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'prepared.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.dotsData) {
          this._templates.push('<div class="' + this._core.settings.dotClass + '">' + $(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
        }
      }, this),
      'added.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.dotsData) {
          this._templates.splice(e.position, 0, this._templates.pop());
        }
      }, this),
      'remove.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.dotsData) {
          this._templates.splice(e.position, 1);
        }
      }, this),
      'changed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && e.property.name == 'position') {
          this.draw();
        }
      }, this),
      'initialized.owl.carousel': $.proxy(function (e) {
        if (e.namespace && !this._initialized) {
          this._core.trigger('initialize', null, 'navigation');
          this.initialize();
          this.update();
          this.draw();
          this._initialized = true;
          this._core.trigger('initialized', null, 'navigation');
        }
      }, this),
      'refreshed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._initialized) {
          this._core.trigger('refresh', null, 'navigation');
          this.update();
          this.draw();
          this._core.trigger('refreshed', null, 'navigation');
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

    // register event handlers
    this.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   * @todo Rename `slideBy` to `navBy`
   */
  Navigation.Defaults = {
    nav: false,
    navText: ['<span aria-label="' + 'Previous' + '">&#x2039;</span>', '<span aria-label="' + 'Next' + '">&#x203a;</span>'],
    navSpeed: false,
    navElement: 'button type="button" role="presentation"',
    navContainer: false,
    navContainerClass: 'owl-nav',
    navClass: ['owl-prev', 'owl-next'],
    slideBy: 1,
    dotClass: 'owl-dot',
    dotsClass: 'owl-dots',
    dots: true,
    dotsEach: false,
    dotsData: false,
    dotsSpeed: false,
    dotsContainer: false
  };

  /**
   * Initializes the layout of the plugin and extends the carousel.
   * @protected
   */
  Navigation.prototype.initialize = function () {
    var override,
      settings = this._core.settings;

    // create DOM structure for relative navigation
    this._controls.$relative = (settings.navContainer ? $(settings.navContainer) : $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');
    this._controls.$previous = $('<' + settings.navElement + '>').addClass(settings.navClass[0]).html(settings.navText[0]).prependTo(this._controls.$relative).on('click', $.proxy(function (e) {
      this.prev(settings.navSpeed);
    }, this));
    this._controls.$next = $('<' + settings.navElement + '>').addClass(settings.navClass[1]).html(settings.navText[1]).appendTo(this._controls.$relative).on('click', $.proxy(function (e) {
      this.next(settings.navSpeed);
    }, this));

    // create DOM structure for absolute navigation
    if (!settings.dotsData) {
      this._templates = [$('<button role="button">').addClass(settings.dotClass).append($('<span>')).prop('outerHTML')];
    }
    this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer) : $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');
    this._controls.$absolute.on('click', 'button', $.proxy(function (e) {
      var index = $(e.target).parent().is(this._controls.$absolute) ? $(e.target).index() : $(e.target).parent().index();
      e.preventDefault();
      this.to(index, settings.dotsSpeed);
    }, this));

    /*$el.on('focusin', function() {
    	$(document).off(".carousel");
    		$(document).on('keydown.carousel', function(e) {
    		if(e.keyCode == 37) {
    			$el.trigger('prev.owl')
    		}
    		if(e.keyCode == 39) {
    			$el.trigger('next.owl')
    		}
    	});
    });*/

    // override public methods of the carousel
    for (override in this._overrides) {
      this._core[override] = $.proxy(this[override], this);
    }
  };

  /**
   * Destroys the plugin.
   * @protected
   */
  Navigation.prototype.destroy = function () {
    var handler, control, property, override, settings;
    settings = this._core.settings;
    for (handler in this._handlers) {
      this.$element.off(handler, this._handlers[handler]);
    }
    for (control in this._controls) {
      if (control === '$relative' && settings.navContainer) {
        this._controls[control].html('');
      } else {
        this._controls[control].remove();
      }
    }
    for (override in this.overides) {
      this._core[override] = this._overrides[override];
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  /**
   * Updates the internal state.
   * @protected
   */
  Navigation.prototype.update = function () {
    var i,
      j,
      k,
      lower = this._core.clones().length / 2,
      upper = lower + this._core.items().length,
      maximum = this._core.maximum(true),
      settings = this._core.settings,
      size = settings.center || settings.autoWidth || settings.dotsData ? 1 : settings.dotsEach || settings.items;
    if (settings.slideBy !== 'page') {
      settings.slideBy = Math.min(settings.slideBy, settings.items);
    }
    if (settings.dots || settings.slideBy == 'page') {
      this._pages = [];
      for (i = lower, j = 0, k = 0; i < upper; i++) {
        if (j >= size || j === 0) {
          this._pages.push({
            start: Math.min(maximum, i - lower),
            end: i - lower + size - 1
          });
          if (Math.min(maximum, i - lower) === maximum) {
            break;
          }
          j = 0, ++k;
        }
        j += this._core.mergers(this._core.relative(i));
      }
    }
  };

  /**
   * Draws the user interface.
   * @todo The option `dotsData` wont work.
   * @protected
   */
  Navigation.prototype.draw = function () {
    var difference,
      settings = this._core.settings,
      disabled = this._core.items().length <= settings.items,
      index = this._core.relative(this._core.current()),
      loop = settings.loop || settings.rewind;
    this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);
    if (settings.nav) {
      this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
      this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
    }
    this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);
    if (settings.dots) {
      difference = this._pages.length - this._controls.$absolute.children().length;
      if (settings.dotsData && difference !== 0) {
        this._controls.$absolute.html(this._templates.join(''));
      } else if (difference > 0) {
        this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
      } else if (difference < 0) {
        this._controls.$absolute.children().slice(difference).remove();
      }
      this._controls.$absolute.find('.active').removeClass('active');
      this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
    }
  };

  /**
   * Extends event data.
   * @protected
   * @param {Event} event - The event object which gets thrown.
   */
  Navigation.prototype.onTrigger = function (event) {
    var settings = this._core.settings;
    event.page = {
      index: $.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: settings && (settings.center || settings.autoWidth || settings.dotsData ? 1 : settings.dotsEach || settings.items)
    };
  };

  /**
   * Gets the current page position of the carousel.
   * @protected
   * @returns {Number}
   */
  Navigation.prototype.current = function () {
    var current = this._core.relative(this._core.current());
    return $.grep(this._pages, $.proxy(function (page, index) {
      return page.start <= current && page.end >= current;
    }, this)).pop();
  };

  /**
   * Gets the current succesor/predecessor position.
   * @protected
   * @returns {Number}
   */
  Navigation.prototype.getPosition = function (successor) {
    var position,
      length,
      settings = this._core.settings;
    if (settings.slideBy == 'page') {
      position = $.inArray(this.current(), this._pages);
      length = this._pages.length;
      successor ? ++position : --position;
      position = this._pages[(position % length + length) % length].start;
    } else {
      position = this._core.relative(this._core.current());
      length = this._core.items().length;
      successor ? position += settings.slideBy : position -= settings.slideBy;
    }
    return position;
  };

  /**
   * Slides to the next item or page.
   * @public
   * @param {Number} [speed=false] - The time in milliseconds for the transition.
   */
  Navigation.prototype.next = function (speed) {
    $.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
  };

  /**
   * Slides to the previous item or page.
   * @public
   * @param {Number} [speed=false] - The time in milliseconds for the transition.
   */
  Navigation.prototype.prev = function (speed) {
    $.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
  };

  /**
   * Slides to the specified item or page.
   * @public
   * @param {Number} position - The position of the item or page.
   * @param {Number} [speed] - The time in milliseconds for the transition.
   * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
   */
  Navigation.prototype.to = function (position, speed, standard) {
    var length;
    if (!standard && this._pages.length) {
      length = this._pages.length;
      $.proxy(this._overrides.to, this._core)(this._pages[(position % length + length) % length].start, speed);
    } else {
      $.proxy(this._overrides.to, this._core)(position, speed);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;
})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
  'use strict';

  /**
   * Creates the hash plugin.
   * @class The Hash Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Hash = function Hash(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Hash index for the items.
     * @protected
     * @type {Object}
     */
    this._hashes = {};

    /**
     * The carousel element.
     * @type {jQuery}
     */
    this.$element = this._core.$element;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel': $.proxy(function (e) {
        if (e.namespace && this._core.settings.startPosition === 'URLHash') {
          $(window).trigger('hashchange.owl.navigation');
        }
      }, this),
      'prepared.owl.carousel': $.proxy(function (e) {
        if (e.namespace) {
          var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');
          if (!hash) {
            return;
          }
          this._hashes[hash] = e.content;
        }
      }, this),
      'changed.owl.carousel': $.proxy(function (e) {
        if (e.namespace && e.property.name === 'position') {
          var current = this._core.items(this._core.relative(this._core.current())),
            hash = $.map(this._hashes, function (item, hash) {
              return item === current ? hash : null;
            }).join();
          if (!hash || window.location.hash.slice(1) === hash) {
            return;
          }
          window.location.hash = hash;
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, Hash.Defaults, this._core.options);

    // register the event handlers
    this.$element.on(this._handlers);

    // register event listener for hash navigation
    $(window).on('hashchange.owl.navigation', $.proxy(function (e) {
      var hash = window.location.hash.substring(1),
        items = this._core.$stage.children(),
        position = this._hashes[hash] && items.index(this._hashes[hash]);
      if (position === undefined || position === this._core.current()) {
        return;
      }
      this._core.to(this._core.relative(position), false, true);
    }, this));
  };

  /**
   * Default options.
   * @public
   */
  Hash.Defaults = {
    URLhashListener: false
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Hash.prototype.destroy = function () {
    var handler, property;
    $(window).off('hashchange.owl.navigation');
    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.Hash = Hash;
})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.3.4
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
  var style = $('<support>').get(0).style,
    prefixes = 'Webkit Moz O ms'.split(' '),
    events = {
      transition: {
        end: {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd',
          transition: 'transitionend'
        }
      },
      animation: {
        end: {
          WebkitAnimation: 'webkitAnimationEnd',
          MozAnimation: 'animationend',
          OAnimation: 'oAnimationEnd',
          animation: 'animationend'
        }
      }
    },
    tests = {
      csstransforms: function csstransforms() {
        return !!test('transform');
      },
      csstransforms3d: function csstransforms3d() {
        return !!test('perspective');
      },
      csstransitions: function csstransitions() {
        return !!test('transition');
      },
      cssanimations: function cssanimations() {
        return !!test('animation');
      }
    };
  function test(property, prefixed) {
    var result = false,
      upper = property.charAt(0).toUpperCase() + property.slice(1);
    $.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function (i, property) {
      if (style[property] !== undefined) {
        result = prefixed ? property : true;
        return false;
      }
    });
    return result;
  }
  function prefixed(property) {
    return test(property, true);
  }
  if (tests.csstransitions()) {
    /* jshint -W053 */
    $.support.transition = new String(prefixed('transition'));
    $.support.transition.end = events.transition.end[$.support.transition];
  }
  if (tests.cssanimations()) {
    /* jshint -W053 */
    $.support.animation = new String(prefixed('animation'));
    $.support.animation.end = events.animation.end[$.support.animation];
  }
  if (tests.csstransforms()) {
    /* jshint -W053 */
    $.support.transform = new String(prefixed('transform'));
    $.support.transform3d = tests.csstransforms3d();
  }
})(window.Zepto || window.jQuery, window, document);
/* Lazy Video v1.4 */
(function () {
  /////////////////////////YOUTUBE
  var youtube = document.querySelectorAll(".lazy-youtube");
  if (youtube.length > 0) {
    var createYoutube = function createYoutube($youtubeid) {
      var wrapper = document.getElementById('video-' + $youtubeid),
        dynamicvideo = 'videowrap-' + $youtubeid;
      wrapper.innerHTML = "";
      var dynamicdiv = document.createElement("div");
      dynamicdiv.setAttribute("id", dynamicvideo);
      wrapper.appendChild(dynamicdiv);
      youtubevideos[ytcount] = new YT.Player(dynamicvideo, {
        videoId: $youtubeid,
        playerVars: {
          'playsinline': 0,
          'showinfo=0': 0
        },
        events: {
          'onReady': function onReady(e) {
            return e.target.playVideo();
          }
        }
      });
      ytcount++;
    };
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var youtubevideos = [];
    var ytcount = 0;
    for (var i = 0; i < youtube.length; i++) {
      youtube[i].addEventListener("click", function () {
        //STOP ALL VIDEOS ON PAGE
        if (youtubevideos.length > 0) {
          for (var i = 0; i < youtubevideos.length; i++) {
            youtubevideos[i].stopVideo();
          }
        }
        createYoutube(this.dataset.embed);
      });
    }
    ;
  }

  /////////////////////////VIMEO
  ///ALREADY WILL STOP MULTIPLE VIDEOS FROM PLAYING AT ONCE

  var vimeo = document.querySelectorAll(".lazy-vimeo");
  if (vimeo.length > 0) {
    var vimeoapi = document.createElement('script');
    vimeoapi.setAttribute('src', 'https://player.vimeo.com/api/player.js');
    document.head.appendChild(vimeoapi);
    for (var i = 0; i < vimeo.length; i++) {
      vimeo[i].addEventListener("click", function () {
        this.innerHTML = "";
        var wrapper = this.id,
          vimeoid = this.dataset.embed,
          options = {
            id: vimeoid
          },
          videoPlayer = new Vimeo.Player(wrapper, options);
        videoPlayer.setVolume(1);
        videoPlayer.play();
        videoPlayer.on('loaded', function () {
          var vimeovideo = document.getElementById(wrapper);
          var vimeoiframe = vimeovideo.getElementsByTagName("iframe")[0];
          vimeoiframe.setAttribute("data-video", "vimeo");
        });
      });
    }
    ;
  }
})();
/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
  var isIe = /(trident|msie)/i.test(navigator.userAgent);
  if (isIe && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      var id = location.hash.substring(1),
        element;
      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }
      element = document.getElementById(id);
      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }
        element.focus();
      }
    }, false);
  }
})();
// Magnific Popup v1.1.0 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+iframe+gallery
(function (a) {
  typeof define == "function" && define.amd ? define(["jquery"], a) : typeof exports == "object" ? a(require("jquery")) : a(window.jQuery || window.Zepto);
})(function (a) {
  var b = "Close",
    c = "BeforeClose",
    d = "AfterClose",
    e = "BeforeAppend",
    f = "MarkupParse",
    g = "Open",
    h = "Change",
    i = "mfp",
    j = "." + i,
    k = "mfp-ready",
    l = "mfp-removing",
    m = "mfp-prevent-close",
    n,
    o = function o() {},
    p = !!window.jQuery,
    q,
    r = a(window),
    s,
    t,
    u,
    v,
    w = function w(a, b) {
      n.ev.on(i + a + j, b);
    },
    x = function x(b, c, d, e) {
      var f = document.createElement("div");
      return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f;
    },
    y = function y(b, c) {
      n.ev.triggerHandler(i + b, c), n.st.callbacks && (b = b.charAt(0).toLowerCase() + b.slice(1), n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]));
    },
    z = function z(b) {
      if (b !== v || !n.currTemplate.closeBtn) n.currTemplate.closeBtn = a(n.st.closeMarkup.replace("%title%", n.st.tClose)), v = b;
      return n.currTemplate.closeBtn;
    },
    A = function A() {
      a.magnificPopup.instance || (n = new o(), n.init(), a.magnificPopup.instance = n);
    },
    B = function B() {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (a.transition !== undefined) return !0;
      while (b.length) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  o.prototype = {
    constructor: o,
    init: function init() {
      var b = navigator.appVersion;
      n.isLowIE = n.isIE8 = document.all && !document.addEventListener, n.isAndroid = /android/gi.test(b), n.isIOS = /iphone|ipad|ipod/gi.test(b), n.supportsTransition = B(), n.probablyMobile = n.isAndroid || n.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = a(document), n.popupsCache = {};
    },
    open: function open(b) {
      var c;
      if (b.isObj === !1) {
        n.items = b.items.toArray(), n.index = 0;
        var d = b.items,
          e;
        for (c = 0; c < d.length; c++) {
          e = d[c], e.parsed && (e = e.el[0]);
          if (e === b.el[0]) {
            n.index = c;
            break;
          }
        }
      } else n.items = a.isArray(b.items) ? b.items : [b.items], n.index = b.index || 0;
      if (n.isOpen) {
        n.updateItemHTML();
        return;
      }
      n.types = [], u = "", b.mainEl && b.mainEl.length ? n.ev = b.mainEl.eq(0) : n.ev = s, b.key ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}), n.currTemplate = n.popupsCache[b.key]) : n.currTemplate = {}, n.st = a.extend(!0, {}, a.magnificPopup.defaults, b), n.fixedContentPos = n.st.fixedContentPos === "auto" ? !n.probablyMobile : n.st.fixedContentPos, n.st.modal && (n.st.closeOnContentClick = !1, n.st.closeOnBgClick = !1, n.st.showCloseBtn = !1, n.st.enableEscapeKey = !1), n.bgOverlay || (n.bgOverlay = x("bg").on("click" + j, function () {
        n.close();
      }), n.wrap = x("wrap").attr("tabindex", -1).on("click" + j, function (a) {
        n._checkIfClose(a.target) && n.close();
      }), n.container = x("container", n.wrap)), n.contentContainer = x("content"), n.st.preloader && (n.preloader = x("preloader", n.container, n.st.tLoading));
      var h = a.magnificPopup.modules;
      for (c = 0; c < h.length; c++) {
        var i = h[c];
        i = i.charAt(0).toUpperCase() + i.slice(1), n["init" + i].call(n);
      }
      y("BeforeOpen"), n.st.showCloseBtn && (n.st.closeBtnInside ? (w(f, function (a, b, c, d) {
        c.close_replaceWith = z(d.type);
      }), u += " mfp-close-btn-in") : n.wrap.append(z())), n.st.alignTop && (u += " mfp-align-top"), n.fixedContentPos ? n.wrap.css({
        overflow: n.st.overflowY,
        overflowX: "hidden",
        overflowY: n.st.overflowY
      }) : n.wrap.css({
        top: r.scrollTop(),
        position: "absolute"
      }), (n.st.fixedBgPos === !1 || n.st.fixedBgPos === "auto" && !n.fixedContentPos) && n.bgOverlay.css({
        height: s.height(),
        position: "absolute"
      }), n.st.enableEscapeKey && s.on("keyup" + j, function (a) {
        a.keyCode === 27 && n.close();
      }), r.on("resize" + j, function () {
        n.updateSize();
      }), n.st.closeOnContentClick || (u += " mfp-auto-cursor"), u && n.wrap.addClass(u);
      var l = n.wH = r.height(),
        m = {};
      if (n.fixedContentPos && n._hasScrollBar(l)) {
        var o = n._getScrollbarSize();
        o && (m.marginRight = o);
      }
      n.fixedContentPos && (n.isIE7 ? a("body, html").css("overflow", "hidden") : m.overflow = "hidden");
      var p = n.st.mainClass;
      return n.isIE7 && (p += " mfp-ie7"), p && n._addClassToMFP(p), n.updateItemHTML(), y("BuildControls"), a("html").css(m), n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || a(document.body)), n._lastFocusedEl = document.activeElement, setTimeout(function () {
        n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k), s.on("focusin" + j, n._onFocusIn);
      }, 16), n.isOpen = !0, n.updateSize(l), y(g), b;
    },
    close: function close() {
      if (!n.isOpen) return;
      y(c), n.isOpen = !1, n.st.removalDelay && !n.isLowIE && n.supportsTransition ? (n._addClassToMFP(l), setTimeout(function () {
        n._close();
      }, n.st.removalDelay)) : n._close();
    },
    _close: function _close() {
      y(b);
      var c = l + " " + k + " ";
      n.bgOverlay.detach(), n.wrap.detach(), n.container.empty(), n.st.mainClass && (c += n.st.mainClass + " "), n._removeClassFromMFP(c);
      if (n.fixedContentPos) {
        var e = {
          marginRight: ""
        };
        n.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e);
      }
      s.off("keyup" + j + " focusin" + j), n.ev.off(j), n.wrap.attr("class", "mfp-wrap").removeAttr("style"), n.bgOverlay.attr("class", "mfp-bg"), n.container.attr("class", "mfp-container"), n.st.showCloseBtn && (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) && n.currTemplate.closeBtn && n.currTemplate.closeBtn.detach(), n.st.autoFocusLast && n._lastFocusedEl && a(n._lastFocusedEl).focus(), n.currItem = null, n.content = null, n.currTemplate = null, n.prevHeight = 0, y(d);
    },
    updateSize: function updateSize(a) {
      if (n.isIOS) {
        var b = document.documentElement.clientWidth / window.innerWidth,
          c = window.innerHeight * b;
        n.wrap.css("height", c), n.wH = c;
      } else n.wH = a || r.height();
      n.fixedContentPos || n.wrap.css("height", n.wH), y("Resize");
    },
    updateItemHTML: function updateItemHTML() {
      var b = n.items[n.index];
      n.contentContainer.detach(), n.content && n.content.detach(), b.parsed || (b = n.parseEl(n.index));
      var c = b.type;
      y("BeforeChange", [n.currItem ? n.currItem.type : "", c]), n.currItem = b;
      if (!n.currTemplate[c]) {
        var d = n.st[c] ? n.st[c].markup : !1;
        y("FirstMarkupParse", d), d ? n.currTemplate[c] = a(d) : n.currTemplate[c] = !0;
      }
      t && t !== b.type && n.container.removeClass("mfp-" + t + "-holder");
      var e = n["get" + c.charAt(0).toUpperCase() + c.slice(1)](b, n.currTemplate[c]);
      n.appendContent(e, c), b.preloaded = !0, y(h, b), t = b.type, n.container.prepend(n.contentContainer), y("AfterChange");
    },
    appendContent: function appendContent(a, b) {
      n.content = a, a ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0 ? n.content.find(".mfp-close").length || n.content.append(z()) : n.content = a : n.content = "", y(e), n.container.addClass("mfp-" + b + "-holder"), n.contentContainer.append(n.content);
    },
    parseEl: function parseEl(b) {
      var c = n.items[b],
        d;
      c.tagName ? c = {
        el: a(c)
      } : (d = c.type, c = {
        data: c,
        src: c.src
      });
      if (c.el) {
        var e = n.types;
        for (var f = 0; f < e.length; f++) if (c.el.hasClass("mfp-" + e[f])) {
          d = e[f];
          break;
        }
        c.src = c.el.attr("data-mfp-src"), c.src || (c.src = c.el.attr("href"));
      }
      return c.type = d || n.st.type || "inline", c.index = b, c.parsed = !0, n.items[b] = c, y("ElementParse", c), n.items[b];
    },
    addGroup: function addGroup(a, b) {
      var c = function c(_c) {
        _c.mfpEl = this, n._openClick(_c, a, b);
      };
      b || (b = {});
      var d = "click.magnificPopup";
      b.mainEl = a, b.items ? (b.isObj = !0, a.off(d).on(d, c)) : (b.isObj = !1, b.delegate ? a.off(d).on(d, b.delegate, c) : (b.items = a, a.off(d).on(d, c)));
    },
    _openClick: function _openClick(b, c, d) {
      var e = d.midClick !== undefined ? d.midClick : a.magnificPopup.defaults.midClick;
      if (!e && (b.which === 2 || b.ctrlKey || b.metaKey || b.altKey || b.shiftKey)) return;
      var f = d.disableOn !== undefined ? d.disableOn : a.magnificPopup.defaults.disableOn;
      if (f) if (a.isFunction(f)) {
        if (!f.call(n)) return !0;
      } else if (r.width() < f) return !0;
      b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()), d.el = a(b.mfpEl), d.delegate && (d.items = c.find(d.delegate)), n.open(d);
    },
    updateStatus: function updateStatus(a, b) {
      if (n.preloader) {
        q !== a && n.container.removeClass("mfp-s-" + q), !b && a === "loading" && (b = n.st.tLoading);
        var c = {
          status: a,
          text: b
        };
        y("UpdateStatus", c), a = c.status, b = c.text, n.preloader.html(b), n.preloader.find("a").on("click", function (a) {
          a.stopImmediatePropagation();
        }), n.container.addClass("mfp-s-" + a), q = a;
      }
    },
    _checkIfClose: function _checkIfClose(b) {
      if (a(b).hasClass(m)) return;
      var c = n.st.closeOnContentClick,
        d = n.st.closeOnBgClick;
      if (c && d) return !0;
      if (!n.content || a(b).hasClass("mfp-close") || n.preloader && b === n.preloader[0]) return !0;
      if (b !== n.content[0] && !a.contains(n.content[0], b)) {
        if (d && a.contains(document, b)) return !0;
      } else if (c) return !0;
      return !1;
    },
    _addClassToMFP: function _addClassToMFP(a) {
      n.bgOverlay.addClass(a), n.wrap.addClass(a);
    },
    _removeClassFromMFP: function _removeClassFromMFP(a) {
      this.bgOverlay.removeClass(a), n.wrap.removeClass(a);
    },
    _hasScrollBar: function _hasScrollBar(a) {
      return (n.isIE7 ? s.height() : document.body.scrollHeight) > (a || r.height());
    },
    _setFocus: function _setFocus() {
      (n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus();
    },
    _onFocusIn: function _onFocusIn(b) {
      if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target)) return n._setFocus(), !1;
    },
    _parseMarkup: function _parseMarkup(b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)), y(f, [b, c, d]), a.each(c, function (c, d) {
        if (d === undefined || d === !1) return !0;
        e = c.split("_");
        if (e.length > 1) {
          var f = b.find(j + "-" + e[0]);
          if (f.length > 0) {
            var g = e[1];
            g === "replaceWith" ? f[0] !== d[0] && f.replaceWith(d) : g === "img" ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d);
          }
        } else b.find(j + "-" + c).html(d);
      });
    },
    _getScrollbarSize: function _getScrollbarSize() {
      if (n.scrollbarSize === undefined) {
        var a = document.createElement("div");
        a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), n.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a);
      }
      return n.scrollbarSize;
    }
  }, a.magnificPopup = {
    instance: null,
    proto: o.prototype,
    modules: [],
    open: function open(b, c) {
      return A(), b ? b = a.extend(!0, {}, b) : b = {}, b.isObj = !0, b.index = c || 0, this.instance.open(b);
    },
    close: function close() {
      return a.magnificPopup.instance && a.magnificPopup.instance.close();
    },
    registerModule: function registerModule(b, c) {
      c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b);
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, a.fn.magnificPopup = function (b) {
    A();
    var c = a(this);
    if (typeof b == "string") {
      if (b === "open") {
        var d,
          e = p ? c.data("magnificPopup") : c[0].magnificPopup,
          f = parseInt(arguments[1], 10) || 0;
        e.items ? d = e.items[f] : (d = c, e.delegate && (d = d.find(e.delegate)), d = d.eq(f)), n._openClick({
          mfpEl: d
        }, c, e);
      } else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
    } else b = a.extend(!0, {}, b), p ? c.data("magnificPopup", b) : c[0].magnificPopup = b, n.addGroup(c, b);
    return c;
  };
  var C = "inline",
    D,
    E,
    F,
    G = function G() {
      F && (E.after(F.addClass(D)).detach(), F = null);
    };
  a.magnificPopup.registerModule(C, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function initInline() {
        n.types.push(C), w(b + "." + C, function () {
          G();
        });
      },
      getInline: function getInline(b, c) {
        G();
        if (b.src) {
          var d = n.st.inline,
            e = a(b.src);
          if (e.length) {
            var f = e[0].parentNode;
            f && f.tagName && (E || (D = d.hiddenClass, E = x(D), D = "mfp-" + D), F = e.after(E).detach().removeClass(D)), n.updateStatus("ready");
          } else n.updateStatus("error", d.tNotFound), e = a("<div>");
          return b.inlineElement = e, e;
        }
        return n.updateStatus("ready"), n._parseMarkup(c, {}, b), c;
      }
    }
  });
  var H,
    I = function I(b) {
      if (b.data && b.data.title !== undefined) return b.data.title;
      var c = n.st.image.titleSrc;
      if (c) {
        if (a.isFunction(c)) return c.call(n, b);
        if (b.el) return b.el.attr(c) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function initImage() {
        var c = n.st.image,
          d = ".image";
        n.types.push("image"), w(g + d, function () {
          n.currItem.type === "image" && c.cursor && a(document.body).addClass(c.cursor);
        }), w(b + d, function () {
          c.cursor && a(document.body).removeClass(c.cursor), r.off("resize" + j);
        }), w("Resize" + d, n.resizeImage), n.isLowIE && w("AfterChange", n.resizeImage);
      },
      resizeImage: function resizeImage() {
        var a = n.currItem;
        if (!a || !a.img) return;
        if (n.st.image.verticalFit) {
          var b = 0;
          n.isLowIE && (b = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", n.wH - b);
        }
      },
      _onImageHasSize: function _onImageHasSize(a) {
        a.img && (a.hasSize = !0, H && clearInterval(H), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (n.content && n.content.removeClass("mfp-loading"), a.imgHidden = !1));
      },
      findImageSize: function findImageSize(a) {
        var b = 0,
          c = a.img[0],
          d = function d(e) {
            H && clearInterval(H), H = setInterval(function () {
              if (c.naturalWidth > 0) {
                n._onImageHasSize(a);
                return;
              }
              b > 200 && clearInterval(H), b++, b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500);
            }, e);
          };
        d(1);
      },
      getImage: function getImage(b, c) {
        var d = 0,
          e = function e() {
            b && (b.img[0].complete ? (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("ready")), b.hasSize = !0, b.loaded = !0, y("ImageLoadComplete")) : (d++, d < 200 ? setTimeout(e, 100) : f()));
          },
          f = function f() {
            b && (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("error", g.tError.replace("%url%", b.src))), b.hasSize = !0, b.loaded = !0, b.loadError = !0);
          },
          g = n.st.image,
          h = c.find(".mfp-img");
        if (h.length) {
          var i = document.createElement("img");
          i.className = "mfp-img", b.el && b.el.find("img").length && (i.alt = b.el.find("img").attr("alt")), b.img = a(i).on("load.mfploader", e).on("error.mfploader", f), i.src = b.src, h.is("img") && (b.img = b.img.clone()), i = b.img[0], i.naturalWidth > 0 ? b.hasSize = !0 : i.width || (b.hasSize = !1);
        }
        return n._parseMarkup(c, {
          title: I(b),
          img_replaceWith: b.img
        }, b), n.resizeImage(), b.hasSize ? (H && clearInterval(H), b.loadError ? (c.addClass("mfp-loading"), n.updateStatus("error", g.tError.replace("%url%", b.src))) : (c.removeClass("mfp-loading"), n.updateStatus("ready")), c) : (n.updateStatus("loading"), b.loading = !0, b.hasSize || (b.imgHidden = !0, c.addClass("mfp-loading"), n.findImageSize(b)), c);
      }
    }
  });
  var J,
    K = function K() {
      return J === undefined && (J = document.createElement("p").style.MozTransform !== undefined), J;
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function opener(a) {
        return a.is("img") ? a : a.find("img");
      }
    },
    proto: {
      initZoom: function initZoom() {
        var a = n.st.zoom,
          d = ".zoom",
          e;
        if (!a.enabled || !n.supportsTransition) return;
        var f = a.duration,
          g = function g(b) {
            var c = b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
              d = "all " + a.duration / 1e3 + "s " + a.easing,
              e = {
                position: "fixed",
                zIndex: 9999,
                left: 0,
                top: 0,
                "-webkit-backface-visibility": "hidden"
              },
              f = "transition";
            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, c.css(e), c;
          },
          h = function h() {
            n.content.css("visibility", "visible");
          },
          i,
          j;
        w("BuildControls" + d, function () {
          if (n._allowZoom()) {
            clearTimeout(i), n.content.css("visibility", "hidden"), e = n._getItemToZoom();
            if (!e) {
              h();
              return;
            }
            j = g(e), j.css(n._getOffset()), n.wrap.append(j), i = setTimeout(function () {
              j.css(n._getOffset(!0)), i = setTimeout(function () {
                h(), setTimeout(function () {
                  j.remove(), e = j = null, y("ZoomAnimationEnded");
                }, 16);
              }, f);
            }, 16);
          }
        }), w(c + d, function () {
          if (n._allowZoom()) {
            clearTimeout(i), n.st.removalDelay = f;
            if (!e) {
              e = n._getItemToZoom();
              if (!e) return;
              j = g(e);
            }
            j.css(n._getOffset(!0)), n.wrap.append(j), n.content.css("visibility", "hidden"), setTimeout(function () {
              j.css(n._getOffset());
            }, 16);
          }
        }), w(b + d, function () {
          n._allowZoom() && (h(), j && j.remove(), e = null);
        });
      },
      _allowZoom: function _allowZoom() {
        return n.currItem.type === "image";
      },
      _getItemToZoom: function _getItemToZoom() {
        return n.currItem.hasSize ? n.currItem.img : !1;
      },
      _getOffset: function _getOffset(b) {
        var c;
        b ? c = n.currItem.img : c = n.st.zoom.opener(n.currItem.el || n.currItem);
        var d = c.offset(),
          e = parseInt(c.css("padding-top"), 10),
          f = parseInt(c.css("padding-bottom"), 10);
        d.top -= a(window).scrollTop() - e;
        var g = {
          width: c.width(),
          height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e
        };
        return K() ? g["-moz-transform"] = g.transform = "translate(" + d.left + "px," + d.top + "px)" : (g.left = d.left, g.top = d.top), g;
      }
    }
  });
  var L = "iframe",
    M = "//about:blank",
    N = function N(a) {
      if (n.currTemplate[L]) {
        var b = n.currTemplate[L].find("iframe");
        b.length && (a || (b[0].src = M), n.isIE8 && b.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(L, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function initIframe() {
        n.types.push(L), w("BeforeChange", function (a, b, c) {
          b !== c && (b === L ? N() : c === L && N(!0));
        }), w(b + "." + L, function () {
          N();
        });
      },
      getIframe: function getIframe(b, c) {
        var d = b.src,
          e = n.st.iframe;
        a.each(e.patterns, function () {
          if (d.indexOf(this.index) > -1) return this.id && (typeof this.id == "string" ? d = d.substr(d.lastIndexOf(this.id) + this.id.length, d.length) : d = this.id.call(this, d)), d = this.src.replace("%id%", d), !1;
        });
        var f = {};
        return e.srcAction && (f[e.srcAction] = d), n._parseMarkup(c, f, b), n.updateStatus("ready"), c;
      }
    }
  });
  var O = function O(a) {
      var b = n.items.length;
      return a > b - 1 ? a - b : a < 0 ? b + a : a;
    },
    P = function P(a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function initGallery() {
        var c = n.st.gallery,
          d = ".mfp-gallery";
        n.direction = !0;
        if (!c || !c.enabled) return !1;
        u += " mfp-gallery", w(g + d, function () {
          c.navigateByImgClick && n.wrap.on("click" + d, ".mfp-img", function () {
            if (n.items.length > 1) return n.next(), !1;
          }), s.on("keydown" + d, function (a) {
            a.keyCode === 37 ? n.prev() : a.keyCode === 39 && n.next();
          });
        }), w("UpdateStatus" + d, function (a, b) {
          b.text && (b.text = P(b.text, n.currItem.index, n.items.length));
        }), w(f + d, function (a, b, d, e) {
          var f = n.items.length;
          d.counter = f > 1 ? P(c.tCounter, e.index, f) : "";
        }), w("BuildControls" + d, function () {
          if (n.items.length > 1 && c.arrows && !n.arrowLeft) {
            var b = c.arrowMarkup,
              d = n.arrowLeft = a(b.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(m),
              e = n.arrowRight = a(b.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(m);
            d.click(function () {
              n.prev();
            }), e.click(function () {
              n.next();
            }), n.container.append(d.add(e));
          }
        }), w(h + d, function () {
          n._preloadTimeout && clearTimeout(n._preloadTimeout), n._preloadTimeout = setTimeout(function () {
            n.preloadNearbyImages(), n._preloadTimeout = null;
          }, 16);
        }), w(b + d, function () {
          s.off(d), n.wrap.off("click" + d), n.arrowRight = n.arrowLeft = null;
        });
      },
      next: function next() {
        n.direction = !0, n.index = O(n.index + 1), n.updateItemHTML();
      },
      prev: function prev() {
        n.direction = !1, n.index = O(n.index - 1), n.updateItemHTML();
      },
      goTo: function goTo(a) {
        n.direction = a >= n.index, n.index = a, n.updateItemHTML();
      },
      preloadNearbyImages: function preloadNearbyImages() {
        var a = n.st.gallery.preload,
          b = Math.min(a[0], n.items.length),
          c = Math.min(a[1], n.items.length),
          d;
        for (d = 1; d <= (n.direction ? c : b); d++) n._preloadItem(n.index + d);
        for (d = 1; d <= (n.direction ? b : c); d++) n._preloadItem(n.index - d);
      },
      _preloadItem: function _preloadItem(b) {
        b = O(b);
        if (n.items[b].preloaded) return;
        var c = n.items[b];
        c.parsed || (c = n.parseEl(b)), y("LazyLoad", c), c.type === "image" && (c.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
          c.hasSize = !0;
        }).on("error.mfploader", function () {
          c.hasSize = !0, c.loadError = !0, y("LazyLoadError", c);
        }).attr("src", c.src)), c.preloaded = !0;
      }
    }
  }), A();
});
/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function () {
  function aa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ba(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function p(a, b, c) {
    p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
    return p.apply(null, arguments);
  }
  var q = Date.now || function () {
    return +new Date();
  };
  function ca(a, b) {
    this.a = a;
    this.o = b || a;
    this.c = this.o.document;
  }
  var da = !!window.FontFace;
  function t(a, b, c, d) {
    b = a.c.createElement(b);
    if (c) for (var e in c) c.hasOwnProperty(e) && ("style" == e ? b.style.cssText = c[e] : b.setAttribute(e, c[e]));
    d && b.appendChild(a.c.createTextNode(d));
    return b;
  }
  function u(a, b, c) {
    a = a.c.getElementsByTagName(b)[0];
    a || (a = document.documentElement);
    a.insertBefore(c, a.lastChild);
  }
  function v(a) {
    a.parentNode && a.parentNode.removeChild(a);
  }
  function w(a, b, c) {
    b = b || [];
    c = c || [];
    for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
      for (var f = !1, g = 0; g < d.length; g += 1) if (b[e] === d[g]) {
        f = !0;
        break;
      }
      f || d.push(b[e]);
    }
    b = [];
    for (e = 0; e < d.length; e += 1) {
      f = !1;
      for (g = 0; g < c.length; g += 1) if (d[e] === c[g]) {
        f = !0;
        break;
      }
      f || b.push(d[e]);
    }
    a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
  }
  function y(a, b) {
    for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++) if (c[d] == b) return !0;
    return !1;
  }
  function ea(a) {
    return a.o.location.hostname || a.a.location.hostname;
  }
  function z(a, b, c) {
    function d() {
      m && e && f && (m(g), m = null);
    }
    b = t(a, "link", {
      rel: "stylesheet",
      href: b,
      media: "all"
    });
    var e = !1,
      f = !0,
      g = null,
      m = c || null;
    da ? (b.onload = function () {
      e = !0;
      d();
    }, b.onerror = function () {
      e = !0;
      g = Error("Stylesheet failed to load");
      d();
    }) : setTimeout(function () {
      e = !0;
      d();
    }, 0);
    u(a, "head", b);
  }
  function A(a, b, c, d) {
    var e = a.c.getElementsByTagName("head")[0];
    if (e) {
      var f = t(a, "script", {
          src: b
        }),
        g = !1;
      f.onload = f.onreadystatechange = function () {
        g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, "HEAD" == f.parentNode.tagName && e.removeChild(f));
      };
      e.appendChild(f);
      setTimeout(function () {
        g || (g = !0, c && c(Error("Script load timeout")));
      }, d || 5E3);
      return f;
    }
    return null;
  }
  ;
  function B() {
    this.a = 0;
    this.c = null;
  }
  function C(a) {
    a.a++;
    return function () {
      a.a--;
      D(a);
    };
  }
  function E(a, b) {
    a.c = b;
    D(a);
  }
  function D(a) {
    0 == a.a && a.c && (a.c(), a.c = null);
  }
  ;
  function F(a) {
    this.a = a || "-";
  }
  F.prototype.c = function (a) {
    for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
    return b.join(this.a);
  };
  function G(a, b) {
    this.c = a;
    this.f = 4;
    this.a = "n";
    var c = (b || "n4").match(/^([nio])([1-9])$/i);
    c && (this.a = c[1], this.f = parseInt(c[2], 10));
  }
  function fa(a) {
    return H(a) + " " + (a.f + "00") + " 300px " + I(a.c);
  }
  function I(a) {
    var b = [];
    a = a.split(/,\s*/);
    for (var c = 0; c < a.length; c++) {
      var d = a[c].replace(/['"]/g, "");
      -1 != d.indexOf(" ") || /^\d/.test(d) ? b.push("'" + d + "'") : b.push(d);
    }
    return b.join(",");
  }
  function J(a) {
    return a.a + a.f;
  }
  function H(a) {
    var b = "normal";
    "o" === a.a ? b = "oblique" : "i" === a.a && (b = "italic");
    return b;
  }
  function ga(a) {
    var b = 4,
      c = "n",
      d = null;
    a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
    return c + b;
  }
  ;
  function ha(a, b) {
    this.c = a;
    this.f = a.o.document.documentElement;
    this.h = b;
    this.a = new F("-");
    this.j = !1 !== b.events;
    this.g = !1 !== b.classes;
  }
  function ia(a) {
    a.g && w(a.f, [a.a.c("wf", "loading")]);
    K(a, "loading");
  }
  function L(a) {
    if (a.g) {
      var b = y(a.f, a.a.c("wf", "active")),
        c = [],
        d = [a.a.c("wf", "loading")];
      b || c.push(a.a.c("wf", "inactive"));
      w(a.f, c, d);
    }
    K(a, "inactive");
  }
  function K(a, b, c) {
    if (a.j && a.h[b]) if (c) a.h[b](c.c, J(c));else a.h[b]();
  }
  ;
  function ja() {
    this.c = {};
  }
  function ka(a, b, c) {
    var d = [],
      e;
    for (e in b) if (b.hasOwnProperty(e)) {
      var f = a.c[e];
      f && d.push(f(b[e], c));
    }
    return d;
  }
  ;
  function M(a, b) {
    this.c = a;
    this.f = b;
    this.a = t(this.c, "span", {
      "aria-hidden": "true"
    }, this.f);
  }
  function N(a) {
    u(a.c, "body", a.a);
  }
  function O(a) {
    return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + I(a.c) + ";" + ("font-style:" + H(a) + ";font-weight:" + (a.f + "00") + ";");
  }
  ;
  function P(a, b, c, d, e, f) {
    this.g = a;
    this.j = b;
    this.a = d;
    this.c = c;
    this.f = e || 3E3;
    this.h = f || void 0;
  }
  P.prototype.start = function () {
    var a = this.c.o.document,
      b = this,
      c = q(),
      d = new Promise(function (d, e) {
        function f() {
          q() - c >= b.f ? e() : a.fonts.load(fa(b.a), b.h).then(function (a) {
            1 <= a.length ? d() : setTimeout(f, 25);
          }, function () {
            e();
          });
        }
        f();
      }),
      e = null,
      f = new Promise(function (a, d) {
        e = setTimeout(d, b.f);
      });
    Promise.race([f, d]).then(function () {
      e && (clearTimeout(e), e = null);
      b.g(b.a);
    }, function () {
      b.j(b.a);
    });
  };
  function Q(a, b, c, d, e, f, g) {
    this.v = a;
    this.B = b;
    this.c = c;
    this.a = d;
    this.s = g || "BESbswy";
    this.f = {};
    this.w = e || 3E3;
    this.u = f || null;
    this.m = this.j = this.h = this.g = null;
    this.g = new M(this.c, this.s);
    this.h = new M(this.c, this.s);
    this.j = new M(this.c, this.s);
    this.m = new M(this.c, this.s);
    a = new G(this.a.c + ",serif", J(this.a));
    a = O(a);
    this.g.a.style.cssText = a;
    a = new G(this.a.c + ",sans-serif", J(this.a));
    a = O(a);
    this.h.a.style.cssText = a;
    a = new G("serif", J(this.a));
    a = O(a);
    this.j.a.style.cssText = a;
    a = new G("sans-serif", J(this.a));
    a = O(a);
    this.m.a.style.cssText = a;
    N(this.g);
    N(this.h);
    N(this.j);
    N(this.m);
  }
  var R = {
      D: "serif",
      C: "sans-serif"
    },
    S = null;
  function T() {
    if (null === S) {
      var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
      S = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10));
    }
    return S;
  }
  Q.prototype.start = function () {
    this.f.serif = this.j.a.offsetWidth;
    this.f["sans-serif"] = this.m.a.offsetWidth;
    this.A = q();
    U(this);
  };
  function la(a, b, c) {
    for (var d in R) if (R.hasOwnProperty(d) && b === a.f[R[d]] && c === a.f[R[d]]) return !0;
    return !1;
  }
  function U(a) {
    var b = a.g.a.offsetWidth,
      c = a.h.a.offsetWidth,
      d;
    (d = b === a.f.serif && c === a.f["sans-serif"]) || (d = T() && la(a, b, c));
    d ? q() - a.A >= a.w ? T() && la(a, b, c) && (null === a.u || a.u.hasOwnProperty(a.a.c)) ? V(a, a.v) : V(a, a.B) : ma(a) : V(a, a.v);
  }
  function ma(a) {
    setTimeout(p(function () {
      U(this);
    }, a), 50);
  }
  function V(a, b) {
    setTimeout(p(function () {
      v(this.g.a);
      v(this.h.a);
      v(this.j.a);
      v(this.m.a);
      b(this.a);
    }, a), 0);
  }
  ;
  function W(a, b, c) {
    this.c = a;
    this.a = b;
    this.f = 0;
    this.m = this.j = !1;
    this.s = c;
  }
  var X = null;
  W.prototype.g = function (a) {
    var b = this.a;
    b.g && w(b.f, [b.a.c("wf", a.c, J(a).toString(), "active")], [b.a.c("wf", a.c, J(a).toString(), "loading"), b.a.c("wf", a.c, J(a).toString(), "inactive")]);
    K(b, "fontactive", a);
    this.m = !0;
    na(this);
  };
  W.prototype.h = function (a) {
    var b = this.a;
    if (b.g) {
      var c = y(b.f, b.a.c("wf", a.c, J(a).toString(), "active")),
        d = [],
        e = [b.a.c("wf", a.c, J(a).toString(), "loading")];
      c || d.push(b.a.c("wf", a.c, J(a).toString(), "inactive"));
      w(b.f, d, e);
    }
    K(b, "fontinactive", a);
    na(this);
  };
  function na(a) {
    0 == --a.f && a.j && (a.m ? (a = a.a, a.g && w(a.f, [a.a.c("wf", "active")], [a.a.c("wf", "loading"), a.a.c("wf", "inactive")]), K(a, "active")) : L(a.a));
  }
  ;
  function oa(a) {
    this.j = a;
    this.a = new ja();
    this.h = 0;
    this.f = this.g = !0;
  }
  oa.prototype.load = function (a) {
    this.c = new ca(this.j, a.context || this.j);
    this.g = !1 !== a.events;
    this.f = !1 !== a.classes;
    pa(this, new ha(this.c, a), a);
  };
  function qa(a, b, c, d, e) {
    var f = 0 == --a.h;
    (a.f || a.g) && setTimeout(function () {
      var a = e || null,
        m = d || null || {};
      if (0 === c.length && f) L(b.a);else {
        b.f += c.length;
        f && (b.j = f);
        var h,
          l = [];
        for (h = 0; h < c.length; h++) {
          var k = c[h],
            n = m[k.c],
            r = b.a,
            x = k;
          r.g && w(r.f, [r.a.c("wf", x.c, J(x).toString(), "loading")]);
          K(r, "fontloading", x);
          r = null;
          if (null === X) if (window.FontFace) {
            var x = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),
              xa = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
            X = x ? 42 < parseInt(x[1], 10) : xa ? !1 : !0;
          } else X = !1;
          X ? r = new P(p(b.g, b), p(b.h, b), b.c, k, b.s, n) : r = new Q(p(b.g, b), p(b.h, b), b.c, k, b.s, a, n);
          l.push(r);
        }
        for (h = 0; h < l.length; h++) l[h].start();
      }
    }, 0);
  }
  function pa(a, b, c) {
    var d = [],
      e = c.timeout;
    ia(b);
    var d = ka(a.a, c, a.c),
      f = new W(a.c, b, e);
    a.h = d.length;
    b = 0;
    for (c = d.length; b < c; b++) d[b].load(function (b, d, c) {
      qa(a, f, b, d, c);
    });
  }
  ;
  function ra(a, b) {
    this.c = a;
    this.a = b;
  }
  ra.prototype.load = function (a) {
    function b() {
      if (f["__mti_fntLst" + d]) {
        var c = f["__mti_fntLst" + d](),
          e = [],
          h;
        if (c) for (var l = 0; l < c.length; l++) {
          var k = c[l].fontfamily;
          void 0 != c[l].fontStyle && void 0 != c[l].fontWeight ? (h = c[l].fontStyle + c[l].fontWeight, e.push(new G(k, h))) : e.push(new G(k));
        }
        a(e);
      } else setTimeout(function () {
        b();
      }, 50);
    }
    var c = this,
      d = c.a.projectId,
      e = c.a.version;
    if (d) {
      var f = c.c.o;
      A(this.c, (c.a.api || "https://fast.fonts.net/jsapi") + "/" + d + ".js" + (e ? "?v=" + e : ""), function (e) {
        e ? a([]) : (f["__MonotypeConfiguration__" + d] = function () {
          return c.a;
        }, b());
      }).id = "__MonotypeAPIScript__" + d;
    } else a([]);
  };
  function sa(a, b) {
    this.c = a;
    this.a = b;
  }
  sa.prototype.load = function (a) {
    var b,
      c,
      d = this.a.urls || [],
      e = this.a.families || [],
      f = this.a.testStrings || {},
      g = new B();
    b = 0;
    for (c = d.length; b < c; b++) z(this.c, d[b], C(g));
    var m = [];
    b = 0;
    for (c = e.length; b < c; b++) if (d = e[b].split(":"), d[1]) for (var h = d[1].split(","), l = 0; l < h.length; l += 1) m.push(new G(d[0], h[l]));else m.push(new G(d[0]));
    E(g, function () {
      a(m, f);
    });
  };
  function ta(a, b) {
    a ? this.c = a : this.c = ua;
    this.a = [];
    this.f = [];
    this.g = b || "";
  }
  var ua = "https://fonts.googleapis.com/css";
  function va(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
      var e = b[d].split(":");
      3 == e.length && a.f.push(e.pop());
      var f = "";
      2 == e.length && "" != e[1] && (f = ":");
      a.a.push(e.join(f));
    }
  }
  function wa(a) {
    if (0 == a.a.length) throw Error("No fonts to load!");
    if (-1 != a.c.indexOf("kit=")) return a.c;
    for (var b = a.a.length, c = [], d = 0; d < b; d++) c.push(a.a[d].replace(/ /g, "+"));
    b = a.c + "?family=" + c.join("%7C");
    0 < a.f.length && (b += "&subset=" + a.f.join(","));
    0 < a.g.length && (b += "&text=" + encodeURIComponent(a.g));
    return b;
  }
  ;
  function ya(a) {
    this.f = a;
    this.a = [];
    this.c = {};
  }
  var za = {
      latin: "BESbswy",
      "latin-ext": "\xE7\xF6\xFC\u011F\u015F",
      cyrillic: "\u0439\u044F\u0416",
      greek: "\u03B1\u03B2\u03A3",
      khmer: "\u1780\u1781\u1782",
      Hanuman: "\u1780\u1781\u1782"
    },
    Aa = {
      thin: "1",
      extralight: "2",
      "extra-light": "2",
      ultralight: "2",
      "ultra-light": "2",
      light: "3",
      regular: "4",
      book: "4",
      medium: "5",
      "semi-bold": "6",
      semibold: "6",
      "demi-bold": "6",
      demibold: "6",
      bold: "7",
      "extra-bold": "8",
      extrabold: "8",
      "ultra-bold": "8",
      ultrabold: "8",
      black: "9",
      heavy: "9",
      l: "3",
      r: "4",
      b: "7"
    },
    Ba = {
      i: "i",
      italic: "i",
      n: "n",
      normal: "n"
    },
    Ca = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
  function Da(a) {
    for (var b = a.f.length, c = 0; c < b; c++) {
      var d = a.f[c].split(":"),
        e = d[0].replace(/\+/g, " "),
        f = ["n4"];
      if (2 <= d.length) {
        var g;
        var m = d[1];
        g = [];
        if (m) for (var m = m.split(","), h = m.length, l = 0; l < h; l++) {
          var k;
          k = m[l];
          if (k.match(/^[\w-]+$/)) {
            var n = Ca.exec(k.toLowerCase());
            if (null == n) k = "";else {
              k = n[2];
              k = null == k || "" == k ? "n" : Ba[k];
              n = n[1];
              if (null == n || "" == n) n = "4";else var r = Aa[n],
                n = r ? r : isNaN(n) ? "4" : n.substr(0, 1);
              k = [k, n].join("");
            }
          } else k = "";
          k && g.push(k);
        }
        0 < g.length && (f = g);
        3 == d.length && (d = d[2], g = [], d = d ? d.split(",") : g, 0 < d.length && (d = za[d[0]]) && (a.c[e] = d));
      }
      a.c[e] || (d = za[e]) && (a.c[e] = d);
      for (d = 0; d < f.length; d += 1) a.a.push(new G(e, f[d]));
    }
  }
  ;
  function Ea(a, b) {
    this.c = a;
    this.a = b;
  }
  var Fa = {
    Arimo: !0,
    Cousine: !0,
    Tinos: !0
  };
  Ea.prototype.load = function (a) {
    var b = new B(),
      c = this.c,
      d = new ta(this.a.api, this.a.text),
      e = this.a.families;
    va(d, e);
    var f = new ya(e);
    Da(f);
    z(c, wa(d), C(b));
    E(b, function () {
      a(f.a, f.c, Fa);
    });
  };
  function Ga(a, b) {
    this.c = a;
    this.a = b;
  }
  Ga.prototype.load = function (a) {
    var b = this.a.id,
      c = this.c.o;
    b ? A(this.c, (this.a.api || "https://use.typekit.net") + "/" + b + ".js", function (b) {
      if (b) a([]);else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {
        b = c.Typekit.config.fn;
        for (var e = [], f = 0; f < b.length; f += 2) for (var g = b[f], m = b[f + 1], h = 0; h < m.length; h++) e.push(new G(g, m[h]));
        try {
          c.Typekit.load({
            events: !1,
            classes: !1,
            async: !0
          });
        } catch (l) {}
        a(e);
      }
    }, 2E3) : a([]);
  };
  function Ha(a, b) {
    this.c = a;
    this.f = b;
    this.a = [];
  }
  Ha.prototype.load = function (a) {
    var b = this.f.id,
      c = this.c.o,
      d = this;
    b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function (b, c) {
      for (var g = 0, m = c.fonts.length; g < m; ++g) {
        var h = c.fonts[g];
        d.a.push(new G(h.name, ga("font-weight:" + h.weight + ";font-style:" + h.style)));
      }
      a(d.a);
    }, A(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + ea(this.c) + "/" + b + ".js", function (b) {
      b && a([]);
    })) : a([]);
  };
  var Y = new oa(window);
  Y.a.c.custom = function (a, b) {
    return new sa(b, a);
  };
  Y.a.c.fontdeck = function (a, b) {
    return new Ha(b, a);
  };
  Y.a.c.monotype = function (a, b) {
    return new ra(b, a);
  };
  Y.a.c.typekit = function (a, b) {
    return new Ga(b, a);
  };
  Y.a.c.google = function (a, b) {
    return new Ea(b, a);
  };
  var Z = {
    load: p(Y.load, Y)
  };
  "function" === typeof define && define.amd ? define(function () {
    return Z;
  }) : "undefined" !== typeof module && module.exports ? module.exports = Z : (window.WebFont = Z, window.WebFontConfig && Y.load(window.WebFontConfig));
})();