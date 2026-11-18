/* 홈 목차: #all → #group-math → #area-LA. 추천 경로는 #path-ml 같은 주소를 쓴다. */
(function () {
  var B = window.BDA, el = B.el, G, M = window.BDA_MAP, S;

  function link(cls, text, href) { var a = el("a", cls, text); a.href = href; return a; }

  // ---- 왼쪽: 검색, 지금 할 공부, 공부 순서·전체 목차, (맨 아래) 공부한 날·기록 백업. 단순하게 둔다 ----
  function drawNav() {
    var areas = document.getElementById("nav-areas");
    areas.appendChild(link("nv", "공부 순서", "#plan"));
    areas.appendChild(link("nv", "전체 목차", "#all"));
  }

  function drawDays() { document.querySelectorAll(".days").forEach(drawDaysIn); }
  function drawDaysIn(box) {
    box.textContent = "";
    var t = B.today(), n = 0, strip = el("div", "strip");
    for (var d = t - 13; d <= t; d++) {
      var c = el("i", S.days[d] ? "on" : "");
      c.title = B.dayText(d);
      if (S.days[d]) n++;
      strip.appendChild(c);
    }
    box.appendChild(strip);
    box.appendChild(el("p", "muted small", "최근 14일 중 " + n + "일 공부"));
  }

  function drawBackup() { document.querySelectorAll(".backup").forEach(drawBackupIn); }
  function drawBackupIn(box) {
    box.textContent = "";
    var out = el("button", "lnk", "기록 내보내기"), inp = el("input"), lab = el("label", "lnk", "가져오기"), msg = el("p", "muted small");
    out.type = "button";
    out.onclick = function () {
      var blob = new Blob([JSON.stringify(B.load())], { type: "application/json" });
      var a = el("a"), d = new Date();
      a.href = URL.createObjectURL(blob);
      a.download = "study-" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".json";
      a.click();
      msg.textContent = "파일로 저장했습니다.";
    };
    inp.type = "file";
    inp.accept = "application/json,.json";
    inp.hidden = true;
    inp.onchange = function () {
      var f = inp.files[0];
      if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        try {
          var data = JSON.parse(rd.result);
          if (!B.validBackup(data)) throw 0;
          if (!confirm("이 기기의 기록을 파일 내용으로 바꿉니다. 계속할까요?")) return;
          if (!B.save(data)) {
            msg.textContent = "기록을 저장하지 못했습니다. 이 기기의 기존 기록은 보존됩니다.";
            return;
          }
          location.reload();
        } catch (e) { msg.textContent = "공부 기록 파일이 아닙니다."; }
      };
      rd.readAsText(f);
    };
    lab.appendChild(inp);
    box.appendChild(out);
    box.appendChild(document.createTextNode(" · "));
    box.appendChild(lab);
    box.appendChild(msg);
  }

  // ---- 오른쪽 위: 오늘 상태 한 줄 (복습 · 오답 · 시험) ----
  function drawStatus() {
    var box = document.getElementById("status");
    box.textContent = "";
    var t = B.today(), due = 0, wrong = 0;
    B.allNotes().forEach(function (n) {
      due += B.noteStatus(n.id, S).due;
      (B.QUIZ[n.id] || []).forEach(function (q) {
        var st = S.q[n.id + "#" + q.id];
        if (st && st.last && st.wrong) wrong++;
      });
    });
    box.appendChild(el("span", "st-k", "오늘 복습"));
    box.appendChild(due ? link("st-v", due + "문제", "review.html") : el("span", "st-v dim", "없음"));
    box.appendChild(el("span", "st-k", "오답"));
    box.appendChild(wrong ? link("st-v", wrong + "문제", "review.html?wrong=1") : el("span", "st-v dim", "없음"));
    box.appendChild(el("span", "st-k", "시험"));
    var d = el("details", "plain st-exam"), inp = el("input", "q-input"), sum;
    if (S.exam) {
      var p = S.exam.split("-"), day = Math.floor(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000), left = day - t;
      sum = (left > 0 ? "D-" + left : left === 0 ? "D-DAY" : "D+" + (-left)) + " (" + (+p[1]) + "/" + (+p[2]) + ")";
    } else sum = "날짜 정하기";
    d.appendChild(el("summary", "", sum));
    inp.type = "date";
    inp.value = S.exam || "";
    inp.onchange = function () {
      var m = B.load();
      if (inp.value) m.exam = inp.value; else delete m.exam;
      B.save(m);
      S = m;
      drawStatus();
    };
    d.appendChild(inp);
    box.appendChild(d);
  }

  // ---- 왼쪽 위: 지금 할 공부 (공부 순서에서 아직 안 마친 장) ----
  function chapterLink(item) {
    var u = G.unit(item.unit), a = link("now-ch", "", B.BASE + item.ch.href);
    a.appendChild(el("span", "now-t", item.ch.title));
    a.appendChild(el("span", "now-u", u.id + " " + u.title + " · " + (G.chapters(item.unit).indexOf(item.ch) + 1) + "장"));
    return a;
  }

  function currentPhase() {
    if (!G.plan) return null; // 예전 map.js가 캐시에 남아 있으면 이 칸만 비운다
    var phases = G.plan(), cur = null;
    phases.some(function (p) {
      if (!p.main) return false;
      var pr = G.phaseProgress(p, S);
      if (pr.todo.length) { cur = { phase: p, pr: pr }; return true; }
      return false;
    });
    return cur;
  }

  function drawNow() {
    var box = document.getElementById("now");
    if (!box) return;
    box.textContent = "";
    box.appendChild(el("p", "nv-h", "지금 할 공부"));
    if (!G.plan) return;
    var cur = currentPhase();
    if (!cur) { box.appendChild(el("p", "small muted", "공부 순서의 장을 모두 마쳤습니다.")); return; }
    var head = link("now-phase", "", "#plan-" + cur.phase.id);
    head.appendChild(el("span", "", cur.phase.no + "단계 · " + cur.phase.name));
    head.appendChild(el("span", "cnt", cur.pr.done + " / " + cur.pr.total + "장"));
    box.appendChild(head);
    var bar = el("div", "now-bar"), fill = el("i");
    fill.style.width = (cur.pr.total ? Math.round(cur.pr.done / cur.pr.total * 100) : 0) + "%";
    bar.appendChild(fill);
    box.appendChild(bar);
    if (cur.pr.todo[0]) {
      var a = chapterLink(cur.pr.todo[0]);
      a.classList.add("first");
      box.appendChild(a);
    }
  }

  // #plan: 공부 순서 전체. 맨 위에 단계 한눈에(기간 포함)와 공부하는 법, 그 아래 단계마다 이유와 단원 줄
  function weeks(n) { return Math.max(1, Math.ceil(n / 5)); } // 하루 1장, 주 5일

  function drawPlan(view) {
    var cur = currentPhase(), phases = G.plan(), mainTotal = 0;
    var prs = phases.map(function (p) { var pr = G.phaseProgress(p, S); if (p.main && p.id !== "adv") mainTotal += pr.total; return pr; });
    view.appendChild(head("공부 순서", "1~7단계 " + mainTotal + "장 · 약 " + weeks(mainTotal) + "주"));

    // 한눈에: 단계 · 기간 · 진도
    var over = el("ol", "plan-over");
    phases.forEach(function (p, i) {
      var li = el("li", cur && cur.phase.id === p.id ? "on" : ""), a = link("", "", "#plan-" + p.id);
      a.appendChild(el("span", "po-n", p.no + "단계"));
      a.appendChild(el("span", "po-t", p.name));
      a.appendChild(el("span", "po-m", prs[i].done + " / " + prs[i].total + "장 · 약 " + weeks(prs[i].total) + "주"));
      li.appendChild(a);
      over.appendChild(li);
    });
    view.appendChild(over);


  }

  // #plan-x: 단계 하나만. 이유 한 줄과 단원 줄
  function drawPhase(view, pid) {
    var phases = G.plan(), i = phases.map(function (p) { return p.id; }).indexOf(pid);
    if (i < 0) return drawPlan(view);
    var p = phases[i], pr = G.phaseProgress(p, S), cur = currentPhase();
    view.appendChild(link("view-back small", "← 공부 순서", "#plan"));
    var h = head(p.no + "단계 · " + p.name, pr.done + " / " + pr.total + "장 · 약 " + weeks(pr.total) + "주");
    if (cur && cur.phase.id === p.id) h.querySelector("h1").appendChild(el("span", "now-tag", "지금"));
    view.appendChild(h);
    var blk = el("div", "area-block");
    p.items.forEach(function (it) { blk.appendChild(G.row(it.id, S, { tag: it.pulled ? "앞내용" : "" })); });
    view.appendChild(blk);
    var nav = el("p", "phase-pager small");
    if (i > 0) nav.appendChild(link("", "← " + phases[i - 1].no + "단계 " + phases[i - 1].name, "#plan-" + phases[i - 1].id));
    if (i < phases.length - 1) nav.appendChild(link("", phases[i + 1].no + "단계 " + phases[i + 1].name + " →", "#plan-" + phases[i + 1].id));
    view.appendChild(nav);
  }

  // ---- 목차 ----
  function head(title, meta) {
    var h = el("div", "view-head");
    var titleNode = el("h1", "", title);
    titleNode.tabIndex = -1;
    h.appendChild(titleNode);
    if (meta) h.appendChild(el("span", "muted small", meta));
    return h;
  }

  // 전체 목차: 성격별 3축(이론·지식 / 방법·도구 / 목적·응용) → 범주 한 줄씩. 범주 …… 단원 · 장 · 푼 장
  function drawAll(view) {
    var total = 0;
    allCats().forEach(function (c) { total += catChapters(c).length; });
    view.appendChild(head("전체 목차", allCats().length + "범주 · " + total + "장"));
    var sections = el("div", "subject-index");
    M.groups.forEach(function (axis) {
      var section = el("section", "subject-section"), units = 0;
      section.id = "group-" + axis.id;
      axis.cats.forEach(function (c) { units += c.units.length; });
      var title = el("h2", "", axis.name);
      title.appendChild(el("span", "sec-meta", axis.cats.length + "범주 · " + units + "단원"));
      section.appendChild(title);
      var list = el("ol", "toc-rows");
      axis.cats.forEach(function (c) { list.appendChild(catRow(c)); });
      section.appendChild(list);
      sections.appendChild(section);
    });
    view.appendChild(sections);
  }

  function allCats() {
    var out = [];
    M.groups.forEach(function (g) { out = out.concat(g.cats); });
    return out;
  }
  function findCat(id) { return allCats().filter(function (c) { return c.id === id; })[0] || null; }

  function chaptersOf(ids) {
    var out = [];
    ids.forEach(function (id) { out = out.concat(G.chapters(id)); });
    return out;
  }
  function catChapters(c) { return chaptersOf(c.units); }

  // 범주 안의 단원을 과목(분야)별 조각으로: 처음 나온 순서대로
  function catParts(c) {
    var parts = [], by = {};
    c.units.forEach(function (id) {
      var code = G.unit(id).area;
      if (!by[code]) { by[code] = { code: code, ids: [] }; parts.push(by[code]); }
      by[code].ids.push(id);
    });
    return parts;
  }

  function partName(c, code) { return (c.labels && c.labels[code]) || G.area(code).name; }

  function areaUnits(code) {
    return M.units.filter(function (u) { return u.area === code && !G.skipped(u.id); })
      .map(function (u) { return u.id; });
  }

  function unitCount(ids) {
    var ready = ids.filter(function (id) { return G.chapters(id).length; }).length;
    return ready === ids.length ? ready + "개 단원" : "본문 " + ready + " / " + ids.length + "개 단원";
  }

  function catRow(c) {
    var chs = catChapters(c), done = 0;
    chs.forEach(function (ch) { if (B.noteStatus(ch.id, S).state !== "new") done++; });
    var li = el("li"), a = link("toc-row", "", "#cat-" + c.id);
    a.appendChild(el("span", "tr-name", c.name));
    a.appendChild(el("span", "tr-lead"));
    var meta = el("span", "tr-meta");
    meta.appendChild(el("span", "tr-num", c.units.length + "단원 · " + chs.length + "장"));
    if (done) meta.appendChild(el("span", "tr-done", done + "장 풂"));
    a.appendChild(meta);
    li.appendChild(a);
    return li;
  }

  // 범주 화면: 과목 조각마다 단원을 선수관계 순서로
  function drawCat(view, c) {
    var order = G.readingOrder();
    view.appendChild(link("view-back small", "← 전체 목차", "#all"));
    view.appendChild(head(c.name, unitCount(c.units) + " · " + catChapters(c).length + "장"));
    catParts(c).forEach(function (p) {
      var sec = el("section", "cat-part");
      var h = el("h2", "", partName(c, p.code));
      h.appendChild(el("span", "sec-meta", p.ids.length + "단원 · " + chaptersOf(p.ids).length + "장"));
      sec.appendChild(h);
      var blk = el("div", "area-block");
      p.ids.slice().sort(function (x, y) { return order.indexOf(x) - order.indexOf(y); })
        .forEach(function (id) { blk.appendChild(G.row(id, S)); });
      sec.appendChild(blk);
      view.appendChild(sec);
    });
  }

  // 과목(분야) 화면: 단원 안내의 '목차로' 링크가 쓴다. 건너뛰는 단원은 빼고 학습 층으로
  function drawArea(view, code) {
    if (!G.area(code)) return drawAll(view);
    var ids = areaUnits(code);
    view.appendChild(link("view-back small", "← 전체 목차", "#all"));
    view.appendChild(head(G.area(code).name, unitCount(ids) + " · " + chaptersOf(ids).length + "장"));
    drawLayers(view, ids);
  }

  function drawLayers(view, ids, goals) {
    var layers = G.layers(ids);
    var legend = el("div", "study-legend");
    legend.appendChild(el("p", "small muted", "맨 아래 층부터 위로 읽으세요. 다른 과목의 선수 단원은 각 단원 안내에서 확인할 수 있습니다."));
    var jump = el("button", "tool", "기초 층 보기");
    jump.type = "button";
    legend.appendChild(jump);
    view.appendChild(legend);
    var stack = el("ol", "study-stack");
    stack.reversed = true;
    var floor = null;
    for (var i = layers.length - 1; i >= 0; i--) {
      var section = el("li", "study-floor");
      floor = el("h2", "", i === 0 ? "1층 · 이 과목의 출발" : (i + 1) + "층");
      floor.tabIndex = -1;
      section.appendChild(floor);
      layers[i].forEach(function (id) {
        section.appendChild(G.row(id, S, { tag: goals && !goals.has(id) ? "앞내용" : "" }));
      });
      stack.appendChild(section);
    }
    if (floor) {
      jump.onclick = function () {
        floor.scrollIntoView({ block: "start" });
        floor.focus({ preventScroll: true });
      };
      view.appendChild(stack);
    }
  }

  function drawPath(view, pid) {
    var p = G.path(pid);
    if (!p) return drawAll(view);
    var ids = G.expand(p.targets);
    view.appendChild(link("view-back small", "← 전체 목차", "#all"));
    view.appendChild(head(p.name + " 경로", unitCount(ids)));
    if (pid === "analysis") {
      var route = el("p", "small");
      [["PY10", "NumPy 입문"], ["PY11", "pandas 입문"], ["PY13", "수치 검산"], ["PY14", "표 검산"],
        ["DA07", "기술 분석"], ["DA09", "데이터 품질"], ["DA10", "공개 데이터 프로젝트"]].forEach(function (step, i) {
        if (i) route.append(" → ");
        route.appendChild(link("", step[1], "unit.html?u=" + step[0]));
      });
      view.appendChild(route);
    }
    drawLayers(view, ids, new Set(p.targets));
  }

  function drawSearch(view, q) {
    var ids = G.search(q);
    view.appendChild(head("‘" + q + "’ 찾기", ids.length + "개 단원"));
    if (!ids.length) { view.appendChild(el("p", "muted", "맞는 단원이 없습니다. 다른 낱말로 찾아 보세요.")); return; }
    var blk = el("section", "area-block");
    ids.forEach(function (id) { blk.appendChild(G.row(id, S, { tag: G.area(G.unit(id).area).name })); });
    view.appendChild(blk);
  }

  function render() {
    var view = document.getElementById("view"), h = location.hash.slice(1) || "all", q = document.getElementById("q").value.trim();
    var key = h;
    view.textContent = "";
    if (q) drawSearch(view, q);
    else if (h === "plan") { drawPlan(view); key = "plan"; }
    else if (h.indexOf("plan-") === 0) { drawPhase(view, h.slice(5)); key = "plan"; }
    else if (h.indexOf("path-") === 0) drawPath(view, h.slice(5));
    else if (h.indexOf("area-") === 0) { drawArea(view, h.slice(5)); key = "all"; }
    else if (h.indexOf("cat-") === 0 && findCat(h.slice(4))) { drawCat(view, findCat(h.slice(4))); key = "all"; }
    else {
      drawAll(view);
      key = "all";
      var sec2 = h.indexOf("group-") === 0 && document.getElementById(h);
      if (sec2) setTimeout(function () { sec2.scrollIntoView({ block: "start" }); }, 0);
    }
    document.querySelectorAll(".nv").forEach(function (a) {
      var active = !q && a.hash === "#" + key;
      a.classList.toggle("on", active);
      if (active) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("view")) return;
    G = B.G;
    S = B.load();
    drawNav();
    var recorded = new Set(Object.keys(S.q).map(function (key) { return key.split("#", 1)[0]; }));
    var ids = B.allNotes().map(function (n) { return n.id; }).filter(function (id) { return recorded.has(id); });
    B.loadQuiz(ids, function () {
      drawStatus();
      drawNow();
      drawDays();
      drawBackup();
      render();
      var q = document.getElementById("q");
      q.addEventListener("input", render);
      q.addEventListener("keydown", function (e) { if (e.key === "Escape") { q.value = ""; render(); } });
      window.addEventListener("hashchange", function () {
        q.value = "";
        render();
        window.scrollTo(0, 0);
        document.querySelector("#view h1").focus({ preventScroll: true });
      });
    });
  });
})();
