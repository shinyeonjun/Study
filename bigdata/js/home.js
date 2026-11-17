/* 빅분기 홈: 이어서 읽기, 오늘 복습, 시험까지, 전체 지도, 오답 모음, 공부한 날, 기록 백업 */
(function () {
  var B = window.BDA, el = B.el;

  function link(cls, text, href) {
    var a = el("a", cls, text);
    a.href = href;
    return a;
  }
  function pad(i) { return (i < 9 ? "0" : "") + (i + 1); }
  function indexIn(sub, id) {
    for (var i = 0; i < sub.notes.length; i++) if (sub.notes[i].id === id) return i;
    return 0;
  }
  var STATE = { "new": "새 장", ing: "읽는 중", due: "복습할 때", ok: "읽음" };

  // 이어서 읽을 장: 아직 다 못 푼 장이 먼저, 없으면 마지막 장
  function pickNext(notes, s) {
    for (var i = 0; i < notes.length; i++) {
      var r = B.noteStatus(notes[i].id, s);
      if (r.state === "new" || r.state === "ing") return notes[i];
    }
    return notes[notes.length - 1] || null;
  }

  function drawContinue(notes, s) {
    var box = document.getElementById("continue");
    if (!box) return;
    box.textContent = "";
    var n = pickNext(notes, s);
    if (!n) { box.appendChild(el("p", "muted", "아직 쓴 장이 없습니다.")); return; }
    var r = B.noteStatus(n.id, s);
    box.appendChild(el("p", "label", r.state === "new" ? "다음에 읽을 장" : r.state === "ing" ? "읽던 장" : "마지막으로 읽은 장"));
    var row = el("div", "h-cont");
    row.appendChild(el("span", "h-cont-num", pad(indexIn(n.subject, n.id))));
    var body = el("div", "h-cont-body");
    body.appendChild(el("p", "h-cont-sub", n.subject.name));
    body.appendChild(el("h2", "h-cont-title", n.title));
    var bar = el("div", "bar"), fill = el("i");
    fill.style.width = (r.total ? r.tried / r.total * 100 : 0) + "%";
    bar.appendChild(fill);
    body.appendChild(bar);
    var info = r.total ? "확인 문제 " + r.total + "개 중 " + r.tried + "개 풂" + (r.open ? " · 다시 풀 문제 " + r.open + "개" : "") : "";
    body.appendChild(el("p", "muted small", info));
    body.appendChild(link("btn", r.state === "new" ? "읽기 시작" : r.state === "ing" ? "이어서 읽기" : "다시 보기", n.href));
    row.appendChild(body);
    box.appendChild(row);
  }

  function drawReview(notes, s) {
    var box = document.getElementById("reviewcard");
    if (!box) return;
    box.textContent = "";
    var due = 0, wrong = 0, next = null, t = B.today();
    notes.forEach(function (n) {
      due += B.noteStatus(n.id, s).due;
      (B.QUIZ[n.id] || []).forEach(function (q) {
        var st = s.q[n.id + "#" + q.id];
        if (!st || !st.last) return;
        if (st.wrong) wrong++;
        if (!st.open && st.due > t && (next === null || st.due < next)) next = st.due;
      });
    });
    box.appendChild(el("p", "label", "오늘 복습"));
    box.appendChild(el("p", "h-big" + (due ? "" : " none"), due ? due + "문제" : "없음"));
    box.appendChild(el("p", "muted small", due
      ? "책을 다시 읽지 말고 문제부터 풀어 보세요. 여러 장의 문제가 섞여 나옵니다."
      : next ? "다음 복습은 " + B.dayText(next) + "입니다."
      : "장을 읽고 확인 문제를 풀면 복습할 날이 잡힙니다."));
    var acts = el("div", "h-acts");
    if (due) acts.appendChild(link("btn", "복습 시작", "review.html"));
    if (wrong) acts.appendChild(link("btn ghost", "오답 다시 풀기 · " + wrong, "review.html?wrong=1"));
    if (acts.childNodes.length) box.appendChild(acts);
  }

  // 전체 지도: 과목마다 카드 하나. 출제 기준의 큰 항목 아래에 쓴 장이 놓인다.
  // 점 하나가 문제 하나이고, 색이 진할수록 오래 기억하고 있다는 뜻
  function drawMap(s) {
    var wrap = document.getElementById("map");
    if (!wrap) return;
    wrap.textContent = "";
    var no = 0;
    B.SUBJECTS.forEach(function (sub) {
      var card = el("section", "card subj" + (sub.math ? " math" : ""));
      var head = el("div", "subj-head");
      head.appendChild(el("span", "subj-num", sub.math ? "+" : String(++no)));
      var ht = el("div", "subj-title");
      ht.appendChild(el("h3", "", sub.title || sub.name));
      if (sub.desc) ht.appendChild(el("p", "muted small", sub.desc));
      head.appendChild(ht);
      var prog = el("span", "prog");
      head.appendChild(prog);
      card.appendChild(head);

      var all = 0, mastered = 0;
      var areas = sub.plan && sub.plan.length ? sub.plan : [null];
      areas.forEach(function (aname, ai) {
        var area = el("div", "area");
        if (aname) area.appendChild(el("p", "area-name", aname));
        var ul = el("ul", "chaps");
        sub.notes.forEach(function (n, idx) {
          if ((n.area || 0) !== ai) return;
          var r = B.noteStatus(n.id, s), li = el("li"), a = link("chap", "", n.href);
          a.appendChild(el("span", "no", pad(idx)));
          a.appendChild(el("span", "ti", n.title));
          a.appendChild(el("span", "st " + r.state, r.state === "due" ? "복습 " + r.due : STATE[r.state]));
          li.appendChild(a);
          var dots = el("span", "dots");
          dots.title = "점 하나가 문제 하나";
          r.dots.forEach(function (d) { dots.appendChild(el("i", d)); });
          li.appendChild(dots);
          ul.appendChild(li);
          all += r.total;
          mastered += r.mastered;
        });
        if (!ul.childNodes.length) ul.appendChild(el("li", "todo", "아직 안 쓴 장"));
        area.appendChild(ul);
        card.appendChild(area);
      });
      prog.textContent = sub.notes.length ? "익힌 문제 " + mastered + " / " + all : "준비 중";
      wrap.appendChild(card);
    });
  }

  // 오답 모음: 최근에 틀린 것이 맨 위
  function drawWrong(notes, s) {
    var box = document.getElementById("wrong");
    if (!box) return;
    box.textContent = "";
    var list = [];
    notes.forEach(function (n) {
      (B.QUIZ[n.id] || []).forEach(function (q) {
        var st = s.q[n.id + "#" + q.id];
        if (st && st.wrong) list.push({ n: n, q: q, w: st.wrong });
      });
    });
    if (!list.length) { box.appendChild(el("p", "muted small", "틀린 문제가 생기면 여기에 모입니다.")); return; }
    list.sort(function (a, b) { return b.w.day - a.w.day; });
    var ul = el("ul", "wrong-list");
    list.slice(0, 3).forEach(function (x) {
      var li = el("li");
      li.appendChild(el("p", "", x.q.q));
      if (x.w.c) li.appendChild(el("p", "muted small", "내가 고른 답: " + x.w.c));
      ul.appendChild(li);
    });
    box.appendChild(ul);
    if (list.length > 3) box.appendChild(el("p", "muted small", "외 " + (list.length - 3) + "문제"));
    box.appendChild(link("btn ghost", "오답 다시 풀기 · " + list.length + "문제", "review.html?wrong=1"));
  }

  // 시험까지 남은 날. 날짜는 내가 정하고 이 기기에만 저장된다
  function drawDday(s) {
    var box = document.getElementById("dday");
    if (!box) return;
    box.textContent = "";
    if (s.exam) {
      var p = s.exam.split("-"), day = Math.floor(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000), left = day - B.today();
      box.appendChild(el("p", "label", "시험까지"));
      box.appendChild(el("p", "h-dday-num", left > 0 ? "D-" + left : left === 0 ? "D-DAY" : "D+" + (-left)));
      box.appendChild(el("p", "muted small", "시험일 " + (+p[1]) + "월 " + (+p[2]) + "일"));
    }
    var d = el("details", "plain"), inp = el("input", "q-input");
    d.appendChild(el("summary", "", s.exam ? "날짜 바꾸기" : "시험 날짜 정하기"));
    inp.type = "date";
    inp.value = s.exam || "";
    inp.onchange = function () {
      var m = B.load();
      if (inp.value) m.exam = inp.value; else delete m.exam;
      B.save(m);
      drawDday(m);
    };
    d.appendChild(inp);
    d.appendChild(el("p", "muted small", "시험 일정은 공식 공지에서 확인해서 넣으세요."));
    box.appendChild(d);
  }

  // 최근 14일 가운데 공부한 날
  function drawDays(s) {
    var box = document.getElementById("days");
    if (!box) return;
    box.textContent = "";
    var t = B.today(), n = 0, strip = el("div", "strip");
    for (var d = t - 13; d <= t; d++) {
      var c = el("i", s.days[d] ? "on" : "");
      c.title = B.dayText(d);
      if (s.days[d]) n++;
      strip.appendChild(c);
    }
    box.appendChild(el("p", "h-mid", n + "일"));
    box.appendChild(strip);
    box.appendChild(el("p", "muted small", "최근 14일 가운데 공부한 날. 오른쪽 끝이 오늘입니다."));
  }

  // 기록 백업: 기록은 이 기기에만 있으므로, 파일로 내보내 두거나 다른 기기로 옮길 수 있게 한다
  function drawBackup() {
    var box = document.getElementById("backup");
    if (!box) return;
    box.textContent = "";
    var out = el("button", "btn ghost", "내보내기"), inp = el("input"), lab = el("label", "btn ghost", "가져오기"), msg = el("p", "muted small");
    out.type = "button";
    out.onclick = function () {
      var blob = new Blob([JSON.stringify(B.load())], { type: "application/json" });
      var a = el("a"), d = new Date();
      a.href = URL.createObjectURL(blob);
      a.download = "bigdata-study-" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".json";
      a.click();
      msg.textContent = "파일로 저장했습니다. 다른 기기에서는 '가져오기'로 이 파일을 고르면 됩니다.";
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
        } catch (e) { msg.textContent = "이 파일은 공부 기록 파일이 아닙니다."; }
      };
      rd.readAsText(f);
    };
    lab.appendChild(inp);
    var row = el("div", "h-acts");
    row.appendChild(out);
    row.appendChild(lab);
    box.appendChild(row);
    box.appendChild(msg);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("map")) return;
    drawBackup();
    var notes = B.allNotes();
    B.loadQuiz(notes.map(function (n) { return n.id; }), function () {
      var s = B.load();
      drawContinue(notes, s);
      drawReview(notes, s);
      drawDday(s);
      drawMap(s);
      drawWrong(notes, s);
      drawDays(s);
    });
  });
})();
