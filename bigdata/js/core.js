/* 빅분기 노트 공통 부분: 기록 저장, 복습 일정, 문제 풀이 화면, 밝게/어둡게.
   외부 라이브러리 없이 동작하고, 기록은 이 브라우저에만 저장된다.

   복습 규칙 (학습 연구 근거: 떠올리기 연습 + 간격 복습 + 틀린 것은 그날 다시)
   - 맞히면 다음 단계로: 1 → 3 → 7 → 14 → 30 → 60 → 120일 뒤에 다시 나온다.
   - 틀리면 그 자리에서 다시 풀어 맞히고, 단계는 처음으로 돌아가 내일 다시 나온다.
   - 복습 날이 되기 전에 미리 푼 것은 연습으로만 치고 일정을 바꾸지 않는다. */
(function () {
  var B = (window.BDA = window.BDA || {});
  var KEY = "bda-study-v2", THEME = "bda-theme";
  var GAPS = [1, 3, 7, 14, 30, 60, 120];
  var root = document.documentElement;

  B.BASE = document.currentScript ? new URL("..", document.currentScript.src).href : "";
  B.SUBJECTS = window.BDA_SUBJECTS || [];
  B.QUIZ = window.BDA_QUIZ = window.BDA_QUIZ || {};
  B.MASTER = 3; // 이 단계 이상이면 '익힘'으로 본다

  // ---- 작은 도구 ----
  B.el = function (tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  B.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i];
      a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  // 날짜를 '며칠째'라는 숫자로 바꿔 계산한다 (이 기기의 시간대 기준)
  B.today = function () {
    var d = new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  };
  B.dayText = function (day) {
    var d = new Date(day * 86400000);
    return (d.getUTCMonth() + 1) + "월 " + d.getUTCDate() + "일";
  };

  // ---- 기록 ----
  B.load = function () {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { s = {}; }
    s.q = s.q || {};       // 문제별 기록
    s.why = s.why || {};   // '왜 그럴까' 내가 쓴 답
    s.days = s.days || {}; // 공부한 날
    return s;
  };
  B.save = function (s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };

  // ---- 노트·문제 찾기 ----
  B.allNotes = function () {
    var out = [];
    B.SUBJECTS.forEach(function (sub) {
      sub.notes.forEach(function (n, i) {
        out.push({ id: n.id, title: n.title, href: n.href, unit: n.unit, subject: sub, prev: sub.notes[i - 1], next: sub.notes[i + 1] });
      });
    });
    return out;
  };
  B.findNote = function (id) {
    return B.allNotes().filter(function (n) { return n.id === id; })[0] || null;
  };
  // 문제 파일(quiz/노트번호.js)을 필요한 만큼 불러온 뒤 cb를 부른다
  B.loadQuiz = function (ids, cb) {
    var need = ids.filter(function (id) { return !B.QUIZ[id]; }), left = need.length;
    if (!left) return cb();
    need.forEach(function (id) {
      var sc = document.createElement("script");
      sc.src = B.BASE + "quiz/" + id + ".js";
      sc.onload = sc.onerror = function () { if (--left === 0) cb(); };
      document.head.appendChild(sc);
    });
  };

  // ---- 복습 일정 ----
  B.isDue = function (st) { return !!st && !!st.last && (!!st.open || B.today() >= st.due); };
  B.record = function (key, correct, conf, choice) {
    var s = B.load(), st = s.q[key] || { stage: 0 }, t = B.today();
    var dueNow = !st.last || st.open || t >= st.due;
    if (correct) {
      if (st.open) {
        st.open = false; // 오늘 틀린 것을 다시 맞힘. 단계는 그대로 두고 내일 다시 나온다
      } else if (dueNow) {
        st.stage = Math.min(st.stage + 1, GAPS.length);
        st.due = t + GAPS[st.stage - 1];
        delete st.wrong;
      } else if (st.wrong && t > st.wrong.day) {
        delete st.wrong;
      }
    } else {
      st.stage = 0;
      st.due = t + 1;
      st.open = true;
      st.wrong = { c: choice || "", conf: conf || "", day: t };
    }
    st.last = t;
    s.q[key] = st;
    s.days[t] = 1;
    B.save(s);
    return st;
  };
  // 노트 하나의 상태를 문제 기록에서 계산한다
  B.noteStatus = function (id, s) {
    s = s || B.load();
    var qs = B.QUIZ[id] || [], r = { total: qs.length, tried: 0, open: 0, due: 0, mastered: 0, dots: [] };
    qs.forEach(function (q) {
      var st = s.q[id + "#" + q.id];
      if (!st || !st.last) { r.dots.push("new"); return; }
      r.tried++;
      if (st.open) { r.open++; r.due++; r.dots.push("no"); return; }
      if (B.isDue(st)) { r.due++; r.dots.push("due"); return; }
      if (st.stage >= B.MASTER) r.mastered++;
      r.dots.push("s" + Math.min(st.stage, 4));
    });
    r.state = !r.tried ? "new" : (r.tried < r.total || r.open) ? "ing" : r.due ? "due" : "ok";
    return r;
  };

  // ---- 문제 한 개를 그린다 ----
  // 누르는 횟수를 줄인다: 객관식은 보기를 누르면 바로 정답과 보기별 해설이 나온다.
  // 숫자·서술 문제는 적고 나서 '답 확인'을 누른다. 서술 문제만 스스로 맞음/틀림을 고른다.
  // opt.onDone(correct): 채점이 끝났을 때
  B.renderQ = function (box, noteId, q, opt) {
    opt = opt || {};
    var el = B.el, key = noteId + "#" + q.id, locked = false;
    box.textContent = "";
    box.className = "qa";
    box.appendChild(el("p", "q-text", q.q));
    if (q.steps) {
      var st = el("p", "q-steps calc");
      q.steps.forEach(function (line, i) { if (i) st.appendChild(el("br")); st.appendChild(document.createTextNode(line)); });
      box.appendChild(st);
    }

    function finish(correct, choice) {
      var r = B.record(key, correct, "", choice);
      box.classList.add(correct ? "is-ok" : "is-no");
      var msg = correct
        ? (r.stage > 1 ? "맞았습니다. 다음 복습은 " + B.dayText(r.due) + "." : "맞았습니다. 내일 복습 문제로 다시 나옵니다.")
        : "틀렸습니다. 해설을 읽고 다시 풀어 보세요. 내일 복습에도 나옵니다.";
      box.appendChild(el("p", "q-result", msg));
      if (!correct) {
        var again = el("button", "btn ghost", "다시 풀기");
        again.type = "button";
        again.onclick = function () { B.renderQ(box, noteId, q, opt); };
        box.appendChild(again);
      }
      if (opt.onDone) opt.onDone(correct);
    }

    if (q.type === "mc") {
      var list = el("div", "opts"), opts = [];
      B.shuffle(q.options.map(function (o, i) { return { o: o, i: i }; })).forEach(function (x) {
        var b = el("button", "opt", x.o.t);
        b.type = "button";
        b.onclick = function () {
          if (locked) return;
          locked = true;
          opts.forEach(function (y) {
            y.b.disabled = true;
            var right = y.i === q.answer;
            y.b.classList.add(right ? "right" : (y === x ? "wrong" : "dim"));
            if (y.o.why) y.b.appendChild(el("span", "why-line", (right ? (/^정답/.test(y.o.why) ? "" : "정답. ") : (y === x ? "내가 고른 답. " : "")) + y.o.why)); // 해설이 이미 "정답"으로 시작하면 두 번 붙이지 않는다
          });
          finish(x.i === q.answer, x.o.t);
        };
        x.b = b;
        opts.push(x);
        list.appendChild(b);
      });
      box.appendChild(list);
      return;
    }

    var input = q.type === "num" ? el("input", "q-input") : el("textarea", "q-input");
    if (q.type === "num") { input.type = "text"; input.inputMode = "numeric"; input.placeholder = "숫자로 답하기"; }
    else { input.rows = 3; input.placeholder = "먼저 내 말로 적어 보기"; }
    var go = el("button", "btn", "답 확인");
    go.type = "button";
    go.disabled = true;
    input.oninput = function () { go.disabled = input.value.trim() === ""; };
    if (q.type === "num") input.onkeydown = function (e) { if (e.key === "Enter" && !go.disabled) go.onclick(); };
    go.onclick = function () {
      if (locked) return;
      locked = true;
      input.readOnly = true;
      go.remove();
      if (q.type === "num") {
        var mine = input.value.replace(/[−–]/g, "-").replace(/[^0-9.\-]/g, ""); // 유니코드 빼기 기호(−)도 음수로 받는다
        box.appendChild(el("p", "q-model", "정답: " + Number(q.answer).toLocaleString("ko-KR") + (q.a ? " · " + q.a : "")));
        finish(mine !== "" && Number(mine) === Number(q.answer), input.value.trim());
      } else {
        box.appendChild(el("p", "q-model", "모범 답: " + q.a));
        var self = el("div", "conf");
        self.appendChild(el("span", "", "내 답과 비교하면"));
        [[true, "맞았다"], [false, "틀렸다"]].forEach(function (p) {
          var b = el("button", "", p[1]);
          b.type = "button";
          b.onclick = function () { self.remove(); finish(p[0], input.value.trim()); };
          self.appendChild(b);
        });
        box.appendChild(self);
      }
    };
    box.appendChild(input);
    box.appendChild(go);
  };

  // ---- 밝게 / 어둡게 ----
  function theme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-btn");
    if (!btn) return;
    function label() { btn.textContent = theme() === "dark" ? "밝게" : "어둡게"; }
    label();
    btn.addEventListener("click", function () {
      var next = theme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME, next); } catch (e) {}
      label();
    });
  });
})();
