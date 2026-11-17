/* 빅분기 홈(목차): 오늘 상태 한 줄, 과목 → 출제 기준 항목 → 장. 설명 문단 없이 목록만 */
(function () {
  var B = window.BDA, el = B.el, S;
  var LABEL = { "new": "새 장", ing: "읽는 중", due: "복습할 때", ok: "읽음" };

  function link(cls, text, href) { var a = el("a", cls, text); a.href = href; return a; }

  function drawStatus(notes) {
    var box = document.getElementById("status");
    box.textContent = "";
    var t = B.today(), pick = null;
    notes.some(function (n) {
      var st = B.noteStatus(n.id, S).state;
      if (st === "new" || st === "ing") { pick = n; return true; }
      return false;
    });
    var cell = el("div", "cell wide");
    cell.appendChild(el("p", "label", "이어서 읽기"));
    if (pick) {
      cell.appendChild(link("cell-main", pick.title, pick.href));
      cell.appendChild(el("p", "cell-sub", pick.subject.name));
    } else cell.appendChild(el("p", "cell-main dim", "쓴 장을 모두 풀었습니다"));
    box.appendChild(cell);

    var due = 0, wrong = 0, nextDay = null;
    notes.forEach(function (n) {
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
      drawStatus(notes);
    };
    d.appendChild(inp);
    cell.appendChild(d);
    box.appendChild(cell);
  }

  // 과목 → 출제 기준 항목 → 장. 쓴 장은 번호·제목·상태, 아직 없는 항목은 '준비 전'
  function drawSubjects() {
    var wrap = document.getElementById("subjects");
    wrap.textContent = "";
    B.SUBJECTS.forEach(function (sub, si) {
      var blk = el("section", "area-block"), head = el("div", "area-head");
      head.appendChild(el("span", "acode", sub.code || String(si + 1)));
      head.appendChild(el("h3", "", sub.title || sub.name));
      var prog = el("span", "adepth");
      head.appendChild(prog);
      blk.appendChild(head);
      var all = 0, mastered = 0;
      (sub.plan || []).forEach(function (aname, ai) {
        blk.appendChild(el("p", "sub-h", aname));
        var any = false;
        sub.notes.forEach(function (n, idx) {
          if ((n.area || 0) !== ai) return;
          any = true;
          var r = B.noteStatus(n.id, S), row = el("div", "urow on");
          row.appendChild(el("span", "uid", (idx < 9 ? "0" : "") + (idx + 1)));
          row.appendChild(link("ut", n.title, n.href));
          row.appendChild(el("span", "utag", r.total ? r.tried + " / " + r.total + "문제" : ""));
          var right = el("span", "uright");
          right.appendChild(el("span", "ch " + r.state, LABEL[r.state]));
          row.appendChild(right);
          blk.appendChild(row);
          all += r.total;
          mastered += r.mastered;
        });
        if (!any) {
          var row = el("div", "urow off");
          row.appendChild(el("span", "uid", ""));
          row.appendChild(el("span", "ut", "아직 쓴 장 없음"));
          row.appendChild(el("span", "utag", ""));
          var right = el("span", "uright");
          right.appendChild(el("span", "ust", "준비 전"));
          row.appendChild(right);
          blk.appendChild(row);
        }
      });
      prog.textContent = sub.notes.length ? "익힌 문제 " + mastered + " / " + all : "준비 중";
      wrap.appendChild(blk);
    });
  }

  function drawDays() {
    var box = document.getElementById("days");
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

  function drawBackup() {
    var box = document.getElementById("backup");
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

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("subjects")) return;
    var notes = B.allNotes();
    B.loadQuiz(notes.map(function (n) { return n.id; }), function () {
      S = B.load();
      drawStatus(notes);
      drawSubjects();
      drawDays();
      drawBackup();
    });
  });
})();
