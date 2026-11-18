/* 홈 목차: #all → #group-math → #area-LA. 추천 경로는 #path-ml 같은 주소를 쓴다. */
(function () {
  var B = window.BDA, el = B.el, G, M = window.BDA_MAP, S;

  function link(cls, text, href) { var a = el("a", cls, text); a.href = href; return a; }

  // ---- 왼쪽: 검색, 경로, 분야, 공부한 날, 백업 ----
  function drawNav() {
    var paths = document.getElementById("nav-paths"), areas = document.getElementById("nav-areas");
    // 분야 목록은 오른쪽 목차에 이미 있으므로 왼쪽에는 목차로 가는 링크 하나만 둔다
    areas.appendChild(link("nv", "공부 순서", "#plan"));
    areas.appendChild(link("nv", "전체 목차", "#all"));
    M.paths.forEach(function (p) {
      var ids = G.expand(p.targets), ready = ids.filter(function (id) { return G.chapters(id).length; }).length;
      var a = link("nv", "", "#path-" + p.id);
      a.appendChild(el("span", "", p.name));
      a.appendChild(el("span", "cnt", ready + " / " + ids.length));
      a.title = "본문 있는 단원 / 앞내용까지 포함한 단원";
      paths.appendChild(a);
    });
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

  // ---- 오른쪽 위: 오늘 상태 한 줄 (이어서 읽기 · 복습 · 오답 · 시험) ----
  function drawStatus() {
    var box = document.getElementById("status");
    box.textContent = "";
    var t = B.today(), cell;
    // 다음에 읽을 장은 왼쪽 '지금 할 공부'에 있다. 여기는 오늘 복습·오답·시험만

    // 오늘 복습과 오답
    var due = 0, wrong = 0, nextDay = null;
    B.allNotes().forEach(function (n) {
      due += B.noteStatus(n.id, S).due;
      (B.QUIZ[n.id] || []).forEach(function (q) {
        var st = S.q[n.id + "#" + q.id];
        if (!st || !st.last) return;
        if (st.wrong) wrong++;
        if (!st.open && st.due > t && (nextDay === null || st.due < nextDay)) nextDay = st.due;
      });
    });
    cell = el("div", "cell");
    cell.appendChild(el("p", "label", "오늘 복습"));
    if (due) cell.appendChild(link("cell-main", due + "문제 풀기", "review.html"));
    else cell.appendChild(el("p", "cell-main dim", "없음"));
    cell.appendChild(el("p", "cell-sub", due ? "책 말고 문제부터" : nextDay ? "다음 " + B.dayText(nextDay) : "푼 문제가 생기면 잡힘"));
    box.appendChild(cell);

    cell = el("div", "cell");
    cell.appendChild(el("p", "label", "오답"));
    if (wrong) cell.appendChild(link("cell-main", wrong + "문제 다시", "review.html?wrong=1"));
    else cell.appendChild(el("p", "cell-main dim", "없음"));
    cell.appendChild(el("p", "cell-sub", wrong ? "틀린 문제만 섞어서" : "틀리면 여기에 모임"));
    box.appendChild(cell);

    cell = el("div", "cell");
    cell.appendChild(el("p", "label", "시험"));
    if (S.exam) {
      var p = S.exam.split("-"), day = Math.floor(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000), left = day - t;
      cell.appendChild(el("p", "cell-main", left > 0 ? "D-" + left : left === 0 ? "D-DAY" : "D+" + (-left)));
    } else cell.appendChild(el("p", "cell-main dim", "날짜 없음"));
    var d = el("details", "plain"), inp = el("input", "q-input");
    d.appendChild(el("summary", "", S.exam ? (+S.exam.split("-")[1]) + "월 " + (+S.exam.split("-")[2]) + "일 · 바꾸기" : "날짜 정하기"));
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
    cell.appendChild(d);
    box.appendChild(cell);
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
    cur.pr.todo.slice(0, 3).forEach(function (item, i) {
      var a = chapterLink(item);
      if (i === 0) a.classList.add("first");
      box.appendChild(a);
    });
    var side = G.plan().filter(function (p) { return !p.main; })[0];
    if (side) {
      var sp = G.phaseProgress(side, S);
      if (sp.todo.length) {
        box.appendChild(el("p", "now-side-h", "가벼운 날"));
        box.appendChild(chapterLink(sp.todo[0]));
      }
    }
  }

  // #plan: 공부 순서 전체. 단계마다 진도, 한 줄 안내, 단원 줄(앞 단계에서 끌려온 선수는 '앞내용')
  function drawPlan(view) {
    var cur = currentPhase();
    view.appendChild(head("공부 순서", "단계 " + G.plan().length + "개"));
    G.plan().forEach(function (p) {
      var pr = G.phaseProgress(p, S), sec = el("section", "plan-phase" + (cur && cur.phase.id === p.id ? " now-on" : ""));
      sec.id = "plan-" + p.id;
      var h = el("h2", "", p.no + "단계 · " + p.name);
      if (cur && cur.phase.id === p.id) h.appendChild(el("span", "now-tag", "지금"));
      h.appendChild(el("span", "sec-meta", pr.done + " / " + pr.total + "장"));
      sec.appendChild(h);
      if (p.note) sec.appendChild(el("p", "plan-note small muted", p.note));
      var blk = el("div", "area-block");
      p.items.forEach(function (it) { blk.appendChild(G.row(it.id, S, { tag: it.pulled ? "앞내용" : "" })); });
      sec.appendChild(blk);
      view.appendChild(sec);
    });
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

  // 전체 목차: 묶음마다 과목을 종이책 차례처럼 한 줄씩. 과목 이름 …… 수준 · 단원 · 장 · 푼 장
  function drawAll(view) {
    var total = 0;
    M.groups.forEach(function (g) { g.areas.forEach(function (c) { total += areaChapters(c).length; }); });
    view.appendChild(head("전체 목차", M.areas.length + "과목 · " + total + "장"));
    var sections = el("div", "subject-index");
    M.groups.forEach(function (group) {
      var section = el("section", "subject-section"), units = 0;
      section.id = "group-" + group.id;
      group.areas.forEach(function (c) { units += areaUnits(c).length; });
      var title = el("h2", "", group.name);
      title.appendChild(el("span", "sec-meta", group.areas.length + "과목 · " + units + "단원"));
      section.appendChild(title);
      var list = el("ol", "toc-rows");
      group.areas.forEach(function (code) { list.appendChild(areaRow(code)); });
      section.appendChild(list);
      sections.appendChild(section);
    });
    view.appendChild(sections);
  }

  function areaUnits(code) {
    return M.units.filter(function (u) { return u.area === code && !G.skipped(u.id); })
      .map(function (u) { return u.id; });
  }

  function areaChapters(code) {
    var out = [];
    areaUnits(code).forEach(function (id) { out = out.concat(G.chapters(id)); });
    return out;
  }

  function unitCount(ids) {
    var ready = ids.filter(function (id) { return G.chapters(id).length; }).length;
    return ready === ids.length ? ready + "개 단원" : "본문 " + ready + " / " + ids.length + "개 단원";
  }

  // "입문에서 핵심" → "입문–핵심"
  function depthText(code) { return (G.area(code).depth || "").replace(/에서\s*/, "–"); }

  function areaRow(code) {
    var chs = areaChapters(code), done = 0;
    chs.forEach(function (ch) { if (B.noteStatus(ch.id, S).state !== "new") done++; });
    var li = el("li"), a = link("toc-row", "", "#area-" + code);
    a.appendChild(el("span", "tr-name", G.area(code).name));
    a.appendChild(el("span", "tr-lead"));
    var meta = el("span", "tr-meta");
    meta.appendChild(el("span", "tr-depth", depthText(code)));
    meta.appendChild(el("span", "tr-num", areaUnits(code).length + "단원 · " + chs.length + "장"));
    if (done) meta.appendChild(el("span", "tr-done", done + "장 풂"));
    a.appendChild(meta);
    li.appendChild(a);
    return li;
  }

  // 예전 주소(#group-math)는 전체 목차의 그 묶음으로 내려 준다
  function drawGroup(view, group) {
    drawAll(view);
    var sec = document.getElementById("group-" + group.id);
    if (sec) setTimeout(function () { sec.scrollIntoView({ block: "start" }); }, 0); // 주소가 바뀔 때 맨 위로 올리는 처리 뒤에 실행
  }

  function drawArea(view, code, group) {
    if (!group) return drawAll(view);
    var ids = areaUnits(code);
    view.appendChild(link("view-back small", "← 전체 목차 · " + group.name, "#group-" + group.id));
    view.appendChild(head(G.area(code).name, depthText(code) + " · " + unitCount(ids) + " · " + areaChapters(code).length + "장"));
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
    else if (h === "plan" || h.indexOf("plan-") === 0) {
      drawPlan(view);
      key = "plan";
      var sec = h !== "plan" && document.getElementById(h);
      if (sec) setTimeout(function () { sec.scrollIntoView({ block: "start" }); }, 0);
    }
    else if (h.indexOf("path-") === 0) drawPath(view, h.slice(5));
    else if (h.indexOf("area-") === 0) {
      var code = h.slice(5), areaGroup = M.groups.find(function (g) { return g.areas.includes(code); });
      drawArea(view, code, areaGroup);
      key = "all";
    } else {
      var group = M.groups.find(function (g) { return "group-" + g.id === h; });
      if (group) drawGroup(view, group);
      else drawAll(view);
      key = "all";
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
