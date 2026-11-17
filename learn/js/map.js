/* 지식 지도 도우미: 단원 찾기, 선수관계 펼치기, 경로 순서, 단원·장 상태. 홈과 단원 안내가 같이 쓴다. */
(function () {
  var B = window.BDA, M = window.BDA_MAP, C = window.BDA_CHAPTERS || {};
  var SKIP = {};
  (window.BDA_SKIP || []).forEach(function (id) { SKIP[id] = true; });
  var byId = {}, areaBy = {}, next = {};
  M.units.forEach(function (u, i) { u.order = i; byId[u.id] = u; next[u.id] = []; });
  M.areas.forEach(function (a) { areaBy[a.code] = a; });
  M.units.forEach(function (u) { u.pre.forEach(function (p) { next[p].push(u.id); }); });

  var G = (B.G = {});
  G.unit = function (id) { return byId[id] || null; };
  G.skipped = function (id) { return !!SKIP[id]; };
  G.area = function (code) { return areaBy[code] || null; };
  G.chapters = function (id) { return C[id] || []; };
  G.next = function (id) { return next[id] || []; };
  G.path = function (pid) { return M.paths.filter(function (p) { return p.id === pid; })[0] || null; };

  // 목표 단원들과, 그 앞내용(직접·간접 선수)을 함께 펼쳐서 배울 순서로 늘어놓는다
  G.expand = function (targets) {
    var seen = {}, out = [];
    function visit(id) {
      if (seen[id] || SKIP[id]) return;
      seen[id] = true;
      byId[id].pre.slice().sort(function (a, b) { return byId[a].order - byId[b].order; }).forEach(visit);
      out.push(id);
    }
    targets.forEach(visit);
    return out;
  };
  G.pathsOf = function (id) {
    return M.paths.filter(function (p) { return G.expand(p.targets).indexOf(id) >= 0; });
  };

  // 전체 읽기 순서: 공통 출발 경로를 먼저, 나머지는 지도 순서대로 선수관계를 지키며
  var order = G.expand(G.path("start").targets.concat(M.units.map(function (u) { return u.id; })));
  G.readingOrder = function () { return order; };

  // 단원 하나의 상태: 장이 없으면 none. 있으면 장들의 문제 기록을 모아 본다
  G.unitStatus = function (id, s) {
    var chs = G.chapters(id), r = { chapters: chs.length, total: 0, tried: 0, due: 0, open: 0, state: SKIP[id] ? "skip" : "none" };
    if (!chs.length) return r;
    var states = chs.map(function (ch) {
      var x = B.noteStatus(ch.id, s);
      r.total += x.total; r.tried += x.tried; r.due += x.due; r.open += x.open;
      return x.state;
    });
    r.state = states.every(function (x) { return x === "new"; }) ? "new"
      : states.some(function (x) { return x === "due"; }) ? "due"
      : states.every(function (x) { return x === "ok"; }) ? "ok" : "ing";
    return r;
  };

  // 검색: ID·제목·포함 개념·분야 이름에서 찾는다. 띄어쓰기는 무시한다
  G.search = function (q) {
    q = q.replace(/\s+/g, "").toLowerCase();
    if (!q) return [];
    return M.units.filter(function (u) {
      var a = areaBy[u.area];
      return (u.id + u.title + u.concepts + a.name).replace(/\s+/g, "").toLowerCase().indexOf(q) >= 0;
    }).map(function (u) { return u.id; });
  };

  var LABEL = { skip: "건너뜀", none: "준비 전", "new": "새 단원", ing: "읽는 중", due: "복습할 때", ok: "읽음" };
  G.label = function (st) { return LABEL[st]; };

  // 목차의 한 줄: 단원 ID · 제목(단원 안내로) · 장 번호 칸들 · 상태
  G.row = function (id, s, opt) {
    var el = B.el, u = byId[id], r = G.unitStatus(id, s), row = el("div", "urow " + (r.state === "none" || r.state === "skip" ? "off" : "on") + (r.state === "skip" ? " skip" : ""));
    opt = opt || {};
    row.appendChild(el("span", "uid", u.id));
    var t = el("a", "ut", u.title);
    t.href = B.BASE + "unit.html?u=" + u.id;
    row.appendChild(t);
    if (opt.tag) row.appendChild(el("span", "utag", opt.tag));
    var right = el("span", "uright");
    if (r.state === "none" || r.state === "skip") right.appendChild(el("span", "ust", LABEL[r.state]));
    else {
      var chips = el("span", "chs");
      G.chapters(id).forEach(function (ch, i) {
        var x = B.noteStatus(ch.id, s), a = el("a", "ch " + x.state, String(i + 1));
        a.href = B.BASE + ch.href;
        a.title = ch.title + " · " + LABEL[x.state];
        chips.appendChild(a);
      });
      right.appendChild(chips);
    }
    row.appendChild(right);
    return row;
  };
})();
