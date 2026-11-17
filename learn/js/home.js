/* 홈(목차): 왼쪽에 검색·경로·분야, 오른쪽에 오늘 상태 한 줄과 목차.
   보기는 주소의 # 로 정한다:  #all(전체 목차) · #path-ml(경로) · #area-AR(분야로 이동) */
(function () {
  var B = window.BDA, el = B.el, G, M = window.BDA_MAP, S;

  function link(cls, text, href) { var a = el("a", cls, text); a.href = href; return a; }

  // ---- 왼쪽: 검색, 경로, 분야, 공부한 날, 백업 ----
  function drawNav() {
    var paths = document.getElementById("nav-paths"), areas = document.getElementById("nav-areas");
    paths.textContent = "";
    var all = link("nv", "", "#all");
    all.setAttribute("data-view", "all");
    all.appendChild(el("span", "", "전체 목차"));
    all.appendChild(el("span", "cnt", M.units.length + ""));
    paths.appendChild(all);
    M.paths.forEach(function (p) {
      var ids = G.expand(p.targets), ready = ids.filter(function (id) { return G.chapters(id).length; }).length;
      var a = link("nv", "", "#path-" + p.id);
      a.setAttribute("data-view", "path-" + p.id);
      a.appendChild(el("span", "", p.name));
      a.appendChild(el("span", "cnt", ready + " / " + ids.length));
      a.title = "본문 있는 단원 / 앞내용까지 포함한 단원";
      paths.appendChild(a);
    });
    areas.textContent = "";
    M.groups.forEach(function (g) {
      areas.appendChild(el("p", "nv-group", g.name));
      g.areas.forEach(function (code) {
        var ar = G.area(code), a = link("nv", "", "#area-" + code);
        a.setAttribute("data-view", "area-" + code);
        var name = el("span");
        name.appendChild(el("b", "nv-code", code));
        name.appendChild(document.createTextNode(ar.name));
        a.appendChild(name);
        var n = M.units.filter(function (u) { return u.area === code; }), ready = n.filter(function (u) { return G.chapters(u.id).length; }).length;
        a.appendChild(el("span", "cnt", ready ? ready + " / " + n.length : n.length + ""));
        areas.appendChild(a);
      });
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
          if (!data || typeof data.q !== "object") throw 0;
          if (!confirm("이 기기의 기록을 파일 내용으로 바꿉니다. 계속할까요?")) return;
          B.save(data);
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
    h.appendChild(el("h2", "", title));
    if (meta) h.appendChild(el("span", "muted small", meta));
    return h;
  }

  function drawAll(view) {
    var ready = M.units.filter(function (u) { return G.chapters(u.id).length; }).length;
    view.appendChild(head("전체 목차", "분야 22 · 단원 " + M.units.length + " · 본문 있는 단원 " + ready));
    M.groups.forEach(function (g) {
      view.appendChild(el("p", "grp", g.name));
      g.areas.forEach(function (code) {
        var ar = G.area(code), blk = el("section", "area-block");
        blk.id = "area-" + code;
        var h = el("div", "area-head");
        h.appendChild(el("span", "acode", code));
        h.appendChild(el("h3", "", ar.name));
        h.appendChild(el("span", "adepth", ar.depth));
        blk.appendChild(h);
        M.units.forEach(function (u) { if (u.area === code) blk.appendChild(G.row(u.id, S)); });
        view.appendChild(blk);
      });
    });
  }

  function drawPath(view, pid) {
    var p = G.path(pid);
    if (!p) return drawAll(view);
    var ids = G.expand(p.targets), tset = {};
    p.targets.forEach(function (t) { tset[t] = true; });
    var ready = ids.filter(function (id) { return G.chapters(id).length; }).length;
    view.appendChild(head(p.name + " 경로", "목표 " + p.targets.length + " · 앞내용 포함 " + ids.length + " · 본문 있는 단원 " + ready));
    view.appendChild(el("p", "path-note muted small", "배울 순서대로 늘어놓았습니다. ‘앞내용’은 목표 단원을 이해하는 데 필요한 단원입니다. 순서는 추천일 뿐, 어느 단원이든 바로 열 수 있습니다."));
    var blk = el("section", "area-block");
    ids.forEach(function (id) { blk.appendChild(G.row(id, S, { tag: tset[id] ? "" : "앞내용" })); });
    view.appendChild(blk);
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
    view.textContent = "";
    if (q) drawSearch(view, q);
    else if (h.indexOf("path-") === 0) drawPath(view, h.slice(5));
    else drawAll(view);
    var key = q ? "" : (h.indexOf("area-") === 0 ? h : h || "all");
    document.querySelectorAll(".nv").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-view") === key); });
    if (!q && h.indexOf("area-") === 0) {
      var t = document.getElementById(h);
      if (t) t.scrollIntoView({ block: "start" });
    } else if (!q) window.scrollTo(0, 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("view")) return;
    G = B.G;
    var notes = B.allNotes();
    B.loadQuiz(notes.map(function (n) { return n.id; }), function () {
      S = B.load();
      drawNav();
      drawStatus();
      drawDays();
      drawBackup();
      render();
      var q = document.getElementById("q");
      q.addEventListener("input", render);
      q.addEventListener("keydown", function (e) { if (e.key === "Escape") { q.value = ""; render(); } });
      window.addEventListener("hashchange", function () { q.value = ""; render(); });
    });
  });
})();
