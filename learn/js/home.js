/* 홈 목차: #all → #group-math → #area-LA. 추천 경로는 #path-ml 같은 주소를 쓴다. */
(function () {
  var B = window.BDA, el = B.el, G, M = window.BDA_MAP, S;

  function link(cls, text, href) { var a = el("a", cls, text); a.href = href; return a; }

  // ---- 왼쪽: 검색, 경로, 분야, 공부한 날, 백업 ----
  function drawNav() {
    var paths = document.getElementById("nav-paths"), areas = document.getElementById("nav-areas");
    var all = link("nv", "분야별 목차", "#all");
    areas.appendChild(all);
    M.groups.forEach(function (group) {
      areas.appendChild(link("nv", group.name, "#group-" + group.id));
    });
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
    var t = B.today();

    // 이어서 읽기: 읽기 순서에서 아직 다 못 푼 첫 장
    var cell = el("div", "cell wide"), pick = null, unitOf = null;
    G.readingOrder().some(function (uid) {
      return G.chapters(uid).some(function (ch) {
        var st = B.noteStatus(ch.id, S).state;
        if (st === "new" || st === "ing") { pick = ch; unitOf = uid; return true; }
        return false;
      });
    });
    cell.appendChild(el("p", "label", "이어서 읽기"));
    if (pick) {
      var u = G.unit(unitOf), idx = G.chapters(unitOf).indexOf(pick) + 1;
      cell.appendChild(link("cell-main", pick.title, B.BASE + pick.href));
      cell.appendChild(el("p", "cell-sub", u.id + " " + u.title + " · " + idx + "장"));
    } else {
      cell.appendChild(el("p", "cell-main", "쓴 장을 모두 풀었습니다"));
    }
    box.appendChild(cell);

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

  // ---- 목차 ----
  function head(title, meta) {
    var h = el("div", "view-head");
    var titleNode = el("h1", "", title);
    titleNode.tabIndex = -1;
    h.appendChild(titleNode);
    if (meta) h.appendChild(el("span", "muted small", meta));
    return h;
  }

  function drawAll(view) {
    view.appendChild(head("분야별 목차"));
    var sections = el("div", "subject-index");
    M.groups.forEach(function (group) {
      var section = el("section", "subject-section"), title = el("h2");
      title.appendChild(link("", group.name, "#group-" + group.id));
      section.appendChild(title);
      section.appendChild(areaLinks(group.areas));
      sections.appendChild(section);
    });
    view.appendChild(sections);
  }

  function areaUnits(code) {
    return M.units.filter(function (u) { return u.area === code && !G.skipped(u.id); })
      .map(function (u) { return u.id; });
  }

  function unitCount(ids) {
    var ready = ids.filter(function (id) { return G.chapters(id).length; }).length;
    return ready === ids.length ? ready + "개 단원" : "본문 " + ready + " / " + ids.length + "개 단원";
  }

  function areaLinks(codes, showCounts) {
    var list = el("ul", showCounts ? "subject-links counted" : "subject-links");
    codes.forEach(function (code) {
      var item = el("li"), a = link("", G.area(code).name, "#area-" + code);
      item.appendChild(a);
      if (showCounts) item.appendChild(el("span", "muted small", unitCount(areaUnits(code))));
      list.appendChild(item);
    });
    return list;
  }

  function drawGroup(view, group) {
    if (group.areas.length === 1) return drawArea(view, group.areas[0], group);
    view.appendChild(link("view-back small", "분야별 목차", "#all"));
    view.appendChild(head(group.name));
    view.appendChild(areaLinks(group.areas, true));
  }

  function drawArea(view, code, group) {
    if (!group) return drawAll(view);
    var ids = areaUnits(code);
    view.appendChild(group.areas.length > 1
      ? link("view-back small", group.name, "#group-" + group.id)
      : link("view-back small", "분야별 목차", "#all"));
    view.appendChild(head(G.area(code).name, unitCount(ids)));
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
    view.appendChild(link("view-back small", "분야별 목차", "#all"));
    view.appendChild(head(p.name + " 경로", unitCount(ids)));
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
    else if (h.indexOf("path-") === 0) drawPath(view, h.slice(5));
    else if (h.indexOf("area-") === 0) {
      var code = h.slice(5), areaGroup = M.groups.find(function (g) { return g.areas.includes(code); });
      drawArea(view, code, areaGroup);
      key = areaGroup ? "group-" + areaGroup.id : "all";
    } else {
      var group = M.groups.find(function (g) { return "group-" + g.id === h; });
      if (group) drawGroup(view, group);
      else { drawAll(view); key = "all"; }
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
