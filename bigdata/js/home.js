/* 빅분기 홈: 오늘 할 일, 시험까지 남은 날, 과목별 노트와 문제별 익힘 정도, 오답 모음, 최근 공부한 날 */
(function () {
  var B = window.BDA, el = B.el;

  function link(cls, text, href) {
    var a = el("a", cls, text);
    a.href = href;
    return a;
  }

  // 오늘 할 일: 복습이 먼저, 그다음 이어서 공부할 노트
  function drawToday(notes, s) {
    var box = document.getElementById("today");
    if (!box) return;
    box.textContent = "";
    var due = 0, nextNote = null;
    notes.forEach(function (n) {
      var r = B.noteStatus(n.id, s);
      due += r.due;
      if (!nextNote && r.total && (r.state === "new" || r.state === "ing")) nextNote = n;
    });
    if (due) {
      box.appendChild(el("p", "big-num", due + "문제"));
      box.appendChild(el("p", "muted", "오늘 복습할 문제입니다. 노트를 다시 읽지 말고 문제부터 풀어 보세요."));
      box.appendChild(link("btn", "복습 시작", "review.html"));
    } else {
      box.appendChild(el("p", "muted", "오늘 복습할 문제가 없습니다."));
    }
    if (nextNote) {
      var p = el("p", "next-note");
      p.appendChild(document.createTextNode(due ? "복습을 마치면 이어서: " : "이어서 공부할 노트: "));
      p.appendChild(link("", nextNote.title, nextNote.href));
      box.appendChild(p);
    }
  }

  // 과목별 노트 목록. 점 하나가 문제 하나이고, 색이 진할수록 오래 기억하고 있다는 뜻
  function drawSubjects(s) {
    var wrap = document.getElementById("subjects");
    if (!wrap) return;
    wrap.textContent = "";
    B.SUBJECTS.forEach(function (sub) {
      var sec = el("section", "panel subject"), head = el("div", "subject-head");
      head.appendChild(el("h3", "", sub.name));
      var prog = head.appendChild(el("span", "prog"));
      sec.appendChild(head);
      var bar = sec.appendChild(el("div", "bar")).appendChild(el("i"));
      var ul = sec.appendChild(el("ul", "notes")), all = 0, mastered = 0;
      sub.notes.forEach(function (n, i) {
        var r = B.noteStatus(n.id, s), li = el("li"), left = el("div", "note-main");
        left.appendChild(link("", (i < 9 ? "0" : "") + (i + 1) + " " + n.title, n.href));
        var dots = el("span", "dots");
        dots.title = "점 하나가 문제 하나";
        r.dots.forEach(function (d) { dots.appendChild(el("i", d)); });
        left.appendChild(dots);
        li.appendChild(left);
        var text = { "new": "새 노트", ing: "공부 중", due: "복습 " + r.due + "문제", ok: "공부함" }[r.state];
        li.appendChild(el("span", "st " + r.state, text));
        ul.appendChild(li);
        all += r.total;
        mastered += r.mastered;
      });
      prog.textContent = sub.notes.length ? "익힌 문제 " + mastered + " / " + all : "준비 중";
      bar.style.width = all ? (mastered / all * 100) + "%" : "0";
      wrap.appendChild(sec);
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
    if (!list.length) { box.appendChild(el("p", "muted", "틀린 문제가 생기면 여기에 모입니다.")); return; }
    list.sort(function (a, b) { return b.w.day - a.w.day; });
    var ul = el("ul", "wrong-list");
    list.slice(0, 8).forEach(function (x) {
      var li = el("li");
      li.appendChild(el("p", "", x.q.q));
      if (x.w.c) li.appendChild(el("p", "muted small", "내가 고른 답: " + x.w.c));
      ul.appendChild(li);
    });
    box.appendChild(ul);
    if (list.length > 8) box.appendChild(el("p", "muted small", "외 " + (list.length - 8) + "문제"));
    box.appendChild(link("btn", "오답 다시 풀기 · " + list.length + "문제", "review.html?wrong=1"));
  }

  // 시험까지 남은 날. 날짜는 내가 정하고 이 기기에만 저장된다
  function drawDday(s) {
    var box = document.getElementById("dday");
    if (!box) return;
    box.textContent = "";
    var out = el("p", "big-num");
    if (s.exam) {
      var p = s.exam.split("-"), day = Math.floor(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000), left = day - B.today();
      out.textContent = left > 0 ? "D-" + left : left === 0 ? "D-DAY" : "D+" + (-left);
      box.appendChild(out);
      box.appendChild(el("p", "muted", "시험일 " + (+p[1]) + "월 " + (+p[2]) + "일"));
    } else {
      box.appendChild(el("p", "muted", "시험 날짜를 정하면 남은 날을 보여 줍니다."));
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
    box.appendChild(strip);
    box.appendChild(el("p", "muted small", "최근 14일 중 " + n + "일 공부함. 오른쪽 끝이 오늘입니다."));
  }

  // 기록 백업: 기록은 이 기기에만 있으므로, 파일로 내보내 두거나 다른 기기로 옮길 수 있게 한다
  function drawBackup() {
    var box = document.getElementById("backup");
    if (!box) return;
    box.textContent = "";
    var out = el("button", "btn ghost", "기록 내보내기"), inp = el("input"), lab = el("label", "btn ghost", "기록 가져오기"), msg = el("p", "muted small");
    out.type = "button";
    out.onclick = function () {
      var blob = new Blob([JSON.stringify(B.load())], { type: "application/json" });
      var a = el("a"), d = new Date();
      a.href = URL.createObjectURL(blob);
      a.download = "bigdata-study-" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".json";
      a.click();
      msg.textContent = "파일로 저장했습니다. 다른 기기에서는 '기록 가져오기'로 이 파일을 고르면 됩니다.";
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
    box.appendChild(out);
    box.appendChild(lab);
    box.appendChild(msg);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("subjects")) return;
    drawBackup();
    var notes = B.allNotes();
    B.loadQuiz(notes.map(function (n) { return n.id; }), function () {
      var s = B.load();
      drawToday(notes, s);
      drawDday(s);
      drawSubjects(s);
      drawWrong(notes, s);
      drawDays(s);
    });
  });
})();
