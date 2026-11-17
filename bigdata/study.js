/* 빅분기 노트 공통 기능. 외부 라이브러리 없이 동작하고, 기록은 이 브라우저에만 저장된다.
   - 밝게/어둡게 전환
   - 핵심어 가리기 (떠올려 보기)
   - 확인 문제 맞음/틀림 표시
   - 공부 끝 표시와 간격 복습 (끝낸 뒤 1, 3, 7, 14, 30일째에 다시 보기) */
(function () {
  var KEY = "bda-study-v1";
  var THEME = "bda-theme";
  var GAPS = [1, 3, 7, 14, 30];
  var root = document.documentElement;

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { s = {}; }
    s.notes = s.notes || {};
    s.quiz = s.quiz || {};
    return s;
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  // 날짜를 '며칠째'라는 숫자로 바꿔서 계산한다 (이 기기의 시간대 기준)
  function today() {
    var d = new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  }
  function dueDay(n) { return n.last + GAPS[Math.min(n.n, GAPS.length - 1)]; }
  function stateOf(n) { return !n ? "new" : (today() >= dueDay(n) ? "due" : "ok"); }
  function dayText(day) {
    var d = new Date(day * 86400000);
    return (d.getUTCMonth() + 1) + "월 " + d.getUTCDate() + "일";
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  // 테마
  function theme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function initTheme() {
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
  }

  // 핵심어 가리기
  function initHide() {
    var btn = document.querySelector(".hide-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var on = !document.body.classList.contains("hide-keys");
      document.body.classList.toggle("hide-keys", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.textContent = on ? "핵심어 보이기" : "핵심어 가리기";
      document.querySelectorAll(".key.shown").forEach(function (k) { k.classList.remove("shown"); });
    });
    document.addEventListener("click", function (ev) {
      var k = ev.target.closest && ev.target.closest(".key");
      if (k && document.body.classList.contains("hide-keys")) k.classList.toggle("shown");
    });
  }

  // 확인 문제
  function initQuiz(id) {
    document.querySelectorAll("details.q").forEach(function (q, i) {
      var qid = id + "#" + (i + 1);
      var rate = el("div", "q-rate");
      rate.appendChild(el("span", "", "떠올린 답이"));
      [["ok", "맞았다"], ["no", "틀렸다"]].forEach(function (p) {
        var b = el("button", "", p[1]);
        b.type = "button";
        b.setAttribute("data-v", p[0]);
        b.addEventListener("click", function () {
          var s = load();
          s.quiz[qid] = p[0];
          save(s);
          paint();
        });
        rate.appendChild(b);
      });
      q.appendChild(rate);
      function paint() {
        var v = load().quiz[qid];
        q.classList.toggle("q-ok", v === "ok");
        q.classList.toggle("q-no", v === "no");
      }
      paint();
    });
  }

  // 공부 끝 / 복습 완료
  function initDone(id) {
    var box = document.querySelector(".done-box");
    if (!box) return;
    // 누르는 순간의 최신 기록을 다시 읽어서 고친다 (문제 표시 기록을 덮어쓰지 않게)
    function edit(change) {
      var m = load();
      change(m);
      save(m);
      render();
    }
    function render() {
      var s = load(), n = s.notes[id], st = stateOf(n);
      box.textContent = "";
      var p = el("p");
      var b = el("button", "btn");
      b.type = "button";
      if (st === "new") {
        p.textContent = "끝까지 읽고 확인 문제까지 풀었다면 눌러 주세요. 복습할 날을 홈에서 알려 드립니다.";
        b.textContent = "공부 끝";
        b.onclick = function () { edit(function (m) { m.notes[id] = { first: today(), last: today(), n: 0 }; }); };
      } else if (st === "due") {
        p.textContent = "복습할 때입니다. 핵심어를 가리고 떠올려 본 뒤 눌러 주세요.";
        b.textContent = "복습 완료";
        b.onclick = function () { edit(function (m) { if (m.notes[id]) { m.notes[id].last = today(); m.notes[id].n += 1; } }); };
      } else {
        p.textContent = "공부 끝냄 · 복습 " + n.n + "번 · 다음 복습은 " + dayText(dueDay(n)) + "부터";
        b.className = "btn ghost";
        b.textContent = "기록 지우기";
        b.onclick = function () { edit(function (m) { delete m.notes[id]; }); };
      }
      box.appendChild(p);
      box.appendChild(b);
    }
    render();
  }

  // 홈: 노트별 상태, 과목별 진행, 오늘 복습할 것
  function initHome() {
    var links = document.querySelectorAll("a[data-note]");
    if (!links.length && !document.getElementById("review")) return;
    var s = load(), due = [], doneAll = 0;
    links.forEach(function (a) {
      var id = a.getAttribute("data-note"), n = s.notes[id], st = stateOf(n);
      var wrong = Object.keys(s.quiz).filter(function (k) { return k.indexOf(id + "#") === 0 && s.quiz[k] === "no"; }).length;
      var text = st === "new" ? "새 노트" : st === "due" ? "복습할 때" : "공부함";
      if (wrong) text += " · 틀린 문제 " + wrong;
      a.parentNode.appendChild(el("span", "st " + st, text));
      if (n) doneAll++;
      if (st === "due") due.push(a);
    });
    document.querySelectorAll(".subject").forEach(function (sec) {
      var all = sec.querySelectorAll("a[data-note]"), done = 0;
      all.forEach(function (a) { if (s.notes[a.getAttribute("data-note")]) done++; });
      var prog = sec.querySelector(".prog"), bar = sec.querySelector(".bar i");
      if (prog) prog.textContent = all.length ? done + " / " + all.length : "준비 중";
      if (bar) bar.style.width = all.length ? (done / all.length * 100) + "%" : "0";
    });
    var rv = document.getElementById("review");
    if (!rv) return;
    rv.textContent = "";
    if (due.length) {
      var ul = el("ul", "notes");
      due.forEach(function (a) {
        var li = el("li"), c = a.cloneNode(true);
        li.appendChild(c);
        li.appendChild(el("span", "st due", "복습할 때"));
        ul.appendChild(li);
      });
      rv.appendChild(ul);
    } else {
      rv.appendChild(el("p", "muted", doneAll
        ? "오늘 복습할 노트가 없습니다. 새 노트를 공부해도 좋습니다."
        : "노트를 읽고 '공부 끝'을 누르면, 복습할 날에 여기에 나타납니다."));
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    var id = document.body.getAttribute("data-note");
    if (id) { initHide(); initQuiz(id); initDone(id); }
    else initHome();
  });
})();
