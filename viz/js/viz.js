/* 움직이는 AI · 공통 도구 (window.V)
   - 그리기: V.s(태그, 속성, 부모) = SVG 요소, V.h(태그, 클래스, 글, 부모) = HTML 요소
   - 색: V.ramp(t) 0~1 → 연보라~진보라, V.signed(v, m) 음수 주황 · 양수 보라, V.cssv("--k")
   - 손잡이: V.slider, V.seg, V.button (모두 .ctrl 안에)
   - 움직임: V.loop(fn(dt, t)) → 멈춤 함수, V.tween(ms, fn(e)) → Promise, V.sleep(ms)
   - 계산: V.rng(seed), V.randn(r), V.dot, V.matmul, V.T, V.softmax, V.fmt
   - 쪽: 머리띠·이전/다음은 pages.js의 VIZ_PAGES로 자동. <body data-page="act">
   화면의 숫자는 모두 실제 계산값이어야 한다(꾸민 숫자 금지). */
(function () {
  var V = window.V = {};
  var NS = "http://www.w3.org/2000/svg";
  var THEME = "bda-theme";

  V.s = function (tag, at, parent) {
    var e = document.createElementNS(NS, tag);
    if (at) for (var k in at) { if (k === "text") e.textContent = at[k]; else if (at[k] != null) e.setAttribute(k, at[k]); }
    if (parent) parent.appendChild(e);
    return e;
  };
  V.h = function (tag, cls, text, parent) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  };
  V.svg = function (parent, w, h, label) {
    return V.s("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": label || "" }, parent);
  };
  V.clear = function (e) { while (e.firstChild) e.removeChild(e.firstChild); return e; };
  V.arrowDef = function (svg, id, color) {
    var d = V.s("defs", null, svg);
    var m = V.s("marker", { id: id, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, d);
    V.s("path", { d: "M0 0L10 5L0 10z", fill: color || "currentColor" }, m);
    return "url(#" + id + ")";
  };

  /* ---- 색 ---- */
  V.isDark = function () {
    var a = document.documentElement.getAttribute("data-theme");
    if (a) return a === "dark";
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  };
  V.cssv = function (name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); };
  function mix(a, b, t) { return a.map(function (x, i) { return Math.round(x + (b[i] - x) * t); }); }
  function rgb(c) { return "rgb(" + c.join(",") + ")"; }
  V.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  // 0 → 아주 연한 보라, 1 → 진한 보라 (화면 밝기에 맞춤)
  V.ramp = function (t) {
    t = V.clamp(t, 0, 1);
    return V.isDark() ? rgb(mix([40, 36, 54], [182, 150, 255], t)) : rgb(mix([241, 236, 251], [91, 33, 201], t));
  };
  // 부호 있는 값: 음수 주황, 0 바탕, 양수 보라. m = 색이 꽉 차는 크기
  V.signed = function (v, m) {
    var t = V.clamp(Math.abs(v) / (m || 1), 0, 1);
    var base = V.isDark() ? [40, 38, 48] : [246, 245, 250];
    var pos = V.isDark() ? [182, 150, 255] : [91, 33, 201];
    var neg = V.isDark() ? [235, 150, 90] : [214, 110, 40];
    return rgb(mix(base, v >= 0 ? pos : neg, t));
  };
  V.legend = function (parent, lo, hi, signed) {
    var w = V.h("span", "legend mono", null, parent);
    V.h("span", "", V.fmt(lo, 1), w);
    var bar = V.h("i", "", null, w);
    bar.style.background = signed
      ? "linear-gradient(90deg," + V.signed(-1, 1) + "," + V.signed(0, 1) + "," + V.signed(1, 1) + ")"
      : "linear-gradient(90deg," + V.ramp(0) + "," + V.ramp(1) + ")";
    V.h("span", "", V.fmt(hi, 1), w);
    return w;
  };

  /* ---- 손잡이 ---- */
  V.ctrl = function (parent) { return V.h("div", "ctrl", null, parent); };
  V.slider = function (parent, o) {
    var lab = V.h("label", "sl", null, parent);
    V.h("span", "", o.label, lab);
    var inp = V.h("input", "", null, lab);
    inp.type = "range"; inp.min = o.min; inp.max = o.max; inp.step = o.step || 0.01; inp.value = o.value;
    var out = V.h("b", "mono", null, lab);
    var fmt = o.fmt || function (x) { return V.fmt(x, 2); };
    function upd(fire) { out.textContent = fmt(+inp.value); if (fire && o.onInput) o.onInput(+inp.value); }
    inp.addEventListener("input", function () { upd(true); });
    upd(false);
    return { el: inp, get: function () { return +inp.value; }, set: function (x, fire) { inp.value = x; upd(fire); } };
  };
  V.seg = function (parent, items, value, onChange) {
    var box = V.h("div", "seg", null, parent), btns = {};
    items.forEach(function (it) {
      var id = typeof it === "string" ? it : it.id, lab = typeof it === "string" ? it : it.label;
      var b = V.h("button", id === value ? "on" : "", lab, box);
      b.type = "button";
      b.onclick = function () { set(id, true); };
      btns[id] = b;
    });
    function set(id, fire) {
      value = id;
      for (var k in btns) btns[k].classList.toggle("on", k === id);
      if (fire && onChange) onChange(id);
    }
    return { get: function () { return value; }, set: set };
  };
  V.button = function (parent, label, onClick, cls) {
    var b = V.h("button", "btn" + (cls ? " " + cls : ""), label, parent);
    b.type = "button"; b.onclick = onClick;
    return b;
  };

  /* ---- 움직임 ---- */
  // 숨은 창에서 requestAnimationFrame이 멈추는 경우가 있어 setTimeout으로 받쳐 둔다
  var raf = function (f) {
    var done = false, id1 = requestAnimationFrame(function (t) { if (!done) { done = true; clearTimeout(id2); f(t); } });
    var id2 = setTimeout(function () { if (!done) { done = true; cancelAnimationFrame(id1); f(performance.now()); } }, 40);
  };
  V.loop = function (fn) {
    var run = true, last = performance.now();
    function step(t) {
      if (!run) return;
      var dt = Math.min(0.05, (t - last) / 1000); last = t;
      if (fn(dt, t / 1000) === false) { run = false; return; }
      raf(step);
    }
    raf(step);
    return function () { run = false; };
  };
  V.ease = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  V.tween = function (ms, fn) {
    return new Promise(function (res) {
      var t0 = performance.now();
      V.loop(function () {
        var p = V.clamp((performance.now() - t0) / ms, 0, 1);
        fn(V.ease(p), p);
        if (p >= 1) { res(); return false; }
      });
    });
  };
  V.sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  V.lerp = function (a, b, t) { return a + (b - a) * t; };

  /* ---- 계산 ---- */
  V.rng = function (seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  };
  V.randn = function (r) {
    var u = 1 - r(), v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  V.dot = function (a, b) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };
  V.T = function (A) { return A[0].map(function (_, j) { return A.map(function (r) { return r[j]; }); }); };
  V.matmul = function (A, B) {
    var BT = V.T(B);
    return A.map(function (r) { return BT.map(function (c) { return V.dot(r, c); }); });
  };
  V.softmax = function (z, temp) {
    temp = temp || 1;
    var m = Math.max.apply(null, z.filter(function (x) { return x > -Infinity; }));
    var e = z.map(function (x) { return x === -Infinity ? 0 : Math.exp((x - m) / temp); });
    var s = e.reduce(function (a, b) { return a + b; }, 0);
    return e.map(function (x) { return x / s; });
  };
  V.fmt = function (x, d) {
    if (x === -Infinity) return "−∞";
    if (x === Infinity) return "∞";
    var s = (+x).toFixed(d == null ? 2 : d);
    if (/^-0(\.0+)?$/.test(s)) s = s.slice(1);
    return s.replace("-", "−");
  };

  /* ---- 쪽 틀 ---- */
  function applyTheme(btn) {
    var dark = V.isDark();
    if (btn) btn.textContent = dark ? "밝게" : "어둡게";
  }
  V.onTheme = [];
  function header() {
    var id = document.body.getAttribute("data-page");
    var pages = (window.VIZ_PAGES || []).filter(function (p) { return p.ready || p.id === id; });
    var k = pages.map(function (p) { return p.id; }).indexOf(id);
    var root = document.body.getAttribute("data-root") || "../";
    var top = document.createElement("header"); top.className = "top";
    var tin = V.h("div", "top-in", null, top);
    var a = V.h("a", "brand", "움직이는 AI", tin); a.href = root + "index.html";
    V.h("span", "crumb", k >= 0 ? (k + 1) + " · " + pages[k].title : "", tin);
    var tb = V.h("button", "tool", "", tin); tb.type = "button";
    tb.onclick = function () {
      var next = V.isDark() ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME, next); } catch (e) {}
      applyTheme(tb);
      V.onTheme.forEach(function (f) { f(); });
    };
    applyTheme(tb);
    document.body.insertBefore(top, document.body.firstChild);
    if (k >= 0) {
      var nav = V.h("nav", "pager", null, document.body);
      var p = V.h("span", "", null, nav), n = V.h("span", "", null, nav);
      if (pages[k - 1]) { var pa = V.h("a", "", "← " + pages[k - 1].title, p); pa.href = root + pages[k - 1].href; }
      if (pages[k + 1]) { var na = V.h("a", "", pages[k + 1].title + " →", n); na.href = root + pages[k + 1].href; }
    }
  }
  try { var t = localStorage.getItem(THEME); if (t) document.documentElement.setAttribute("data-theme", t); } catch (e) {}
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", header); else header();
})();
