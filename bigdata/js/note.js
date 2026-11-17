/* 노트 페이지: 과목 이름·이전 다음 링크, 핵심어 가리기, 읽기 전 문제, '왜 그럴까' 적기, 확인 문제 */
(function () {
  var B = window.BDA, el = B.el;

  function initNav(note) {
    var crumb = document.querySelector(".crumb");
    if (crumb) crumb.textContent = note.subject.short;
    var pager = document.querySelector(".pager");
    if (!pager) return;
    pager.textContent = "";
    function link(n, text) {
      var a = el("a", "", text);
      a.href = B.BASE + (n ? n.href : "index.html");
      return a;
    }
    pager.appendChild(note.prev ? link(note.prev, "← " + note.prev.title) : link(null, "← 빅분기 홈"));
    pager.appendChild(note.next ? link(note.next, note.next.title + " →") : link(null, "목록으로 →"));
  }

  // 핵심어 가리기: 켜면 빈칸이 되고, 머릿속으로 채운 뒤 누르면 하나씩 보인다
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

  // '왜 그럴까': 내 말로 먼저 적고(이 기기에 저장) 나서 모범 답을 연다
  function initWhy(id) {
    document.querySelectorAll(".why").forEach(function (box, i) {
      var key = id + "#why" + (i + 1), ta = el("textarea", "q-input");
      ta.rows = 3;
      ta.placeholder = "내 말로 한두 문장 적어 보기 (이 기기에 저장됩니다)";
      ta.value = B.load().why[key] || "";
      ta.onchange = function () {
        var s = B.load();
        if (ta.value.trim()) s.why[key] = ta.value; else delete s.why[key];
        B.save(s);
      };
      var d = box.querySelector("details");
      box.insertBefore(ta, d);
    });
  }

  // 읽기 전 문제: 틀려도 괜찮다. 고르기만 하고 답은 읽으면서 찾는다 (기록하지 않음)
  function initPre(id, qs) {
    var box = document.getElementById("prequiz");
    if (!box) return;
    var pre = qs.filter(function (q) { return q.pre && q.type === "mc"; });
    if (!pre.length) { box.remove(); return; }
    pre.forEach(function (q) {
      var card = el("div", "qcard");
      box.appendChild(card);
      B.renderQ(card.appendChild(el("div")), id, q, { dry: true });
    });
  }

  // 확인 문제: 모두 맞힐 때까지. 틀린 문제는 그 자리에서 다시 푼다
  function initQuiz(id, qs) {
    var box = document.getElementById("quiz");
    if (!box) return;
    if (!qs.length) { box.appendChild(el("p", "muted", "확인 문제를 불러오지 못했습니다.")); return; }
    var status = el("div", "quiz-status"), cards = {};
    function draw(q, n) {
      var card = cards[q.id] || (cards[q.id] = box.insertBefore(el("div", "qcard"), status));
      card.textContent = "";
      card.appendChild(el("span", "q-no", "문제 " + n));
      B.renderQ(card.appendChild(el("div")), id, q, { onDone: paint });
    }
    function paint() {
      var r = B.noteStatus(id);
      status.textContent = "";
      var p = el("p");
      if (!r.tried) p.textContent = "답을 고르거나 적은 다음, 얼마나 확실한지 누르면 정답과 해설이 나옵니다.";
      else if (r.tried < r.total) p.textContent = r.total + "문제 중 " + r.tried + "문제 풂" + (r.open ? " · 틀린 문제 " + r.open + "개" : "");
      else if (r.open) p.textContent = "틀린 문제가 " + r.open + "개 남았습니다. 다시 풀어서 모두 맞히면 이 노트 공부가 끝납니다.";
      else p.textContent = "확인 문제를 모두 맞혔습니다. 이 노트 공부 끝. 내일부터 복습 문제로 다시 나옵니다.";
      status.appendChild(p);
      if (r.open && r.tried === r.total) {
        var b = el("button", "btn", "틀린 문제 다시 풀기");
        b.type = "button";
        b.onclick = function () {
          var s = B.load(), first = null;
          qs.forEach(function (q, i) {
            var st = s.q[id + "#" + q.id];
            if (st && st.open) { draw(q, i + 1); first = first || cards[q.id]; }
          });
          paint();
          if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
        };
        status.appendChild(b);
      } else if (r.tried === r.total) {
        var a = el("a", "btn", "홈으로");
        a.href = B.BASE + "index.html";
        status.appendChild(a);
      }
    }
    box.appendChild(status);
    qs.forEach(function (q, i) { draw(q, i + 1); });
    paint();
  }

  // 내 메모: 공책 대신 쓰는 칸. 노트마다 따로, 이 기기에 저장된다
  function initMemo(id, host) {
    var box = el("section", "panel kit");
    box.appendChild(el("h2", "", "내 메모"));
    var ta = el("textarea", "q-input");
    ta.rows = 5;
    ta.placeholder = "헷갈린 점, 내 말로 다시 쓴 정리, 나중에 찾아볼 것";
    ta.value = (B.load().memo || {})[id] || "";
    var note = el("p", "muted small", "쓰는 대로 이 기기에 저장됩니다.");
    ta.oninput = function () {
      var s = B.load();
      s.memo = s.memo || {};
      if (ta.value.trim()) s.memo[id] = ta.value; else delete s.memo[id];
      B.save(s);
      note.textContent = "저장됨";
    };
    box.appendChild(ta);
    box.appendChild(note);
    host.appendChild(box);
  }

  // 연습장: 종이 대신 손가락이나 마우스로 그림·계산을 끄적이는 곳. 저장되지 않는다
  function initPad(host) {
    var d = el("details", "panel kit pad");
    d.appendChild(el("summary", "", "연습장 열기 (그림 따라 그리기 · 계산)"));
    var tools = el("div", "pad-tools"), cv = el("canvas"), ctx = null, erase = false, on = false;
    function setup() {
      if (ctx) return;
      var r = window.devicePixelRatio || 1;
      cv.width = cv.clientWidth * r;
      cv.height = cv.clientHeight * r;
      ctx = cv.getContext("2d");
      ctx.scale(r, r);
      ctx.lineCap = ctx.lineJoin = "round";
    }
    function pos(e) { var b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; }
    cv.addEventListener("pointerdown", function (e) {
      setup();
      on = true;
      cv.setPointerCapture(e.pointerId);
      var p = pos(e);
      ctx.globalCompositeOperation = erase ? "destination-out" : "source-over";
      ctx.strokeStyle = getComputedStyle(document.body).color;
      ctx.lineWidth = erase ? 24 : 2.5;
      ctx.beginPath();
      ctx.moveTo(p[0], p[1]);
      ctx.lineTo(p[0] + 0.1, p[1]);
      ctx.stroke();
    });
    cv.addEventListener("pointermove", function (e) {
      if (!on) return;
      var p = pos(e);
      ctx.lineTo(p[0], p[1]);
      ctx.stroke();
    });
    ["pointerup", "pointercancel"].forEach(function (n) { cv.addEventListener(n, function () { on = false; }); });
    var pen = el("button", "tool", "펜"), era = el("button", "tool", "지우개"), clr = el("button", "tool", "모두 지우기");
    function mode(e) {
      erase = e;
      pen.setAttribute("aria-pressed", e ? "false" : "true");
      era.setAttribute("aria-pressed", e ? "true" : "false");
    }
    pen.type = era.type = clr.type = "button";
    pen.onclick = function () { mode(false); };
    era.onclick = function () { mode(true); };
    clr.onclick = function () { if (ctx) ctx.clearRect(0, 0, cv.width, cv.height); };
    mode(false);
    tools.appendChild(pen); tools.appendChild(era); tools.appendChild(clr);
    d.appendChild(tools);
    d.appendChild(cv);
    d.appendChild(el("p", "muted small", "그림을 가리고 기억나는 대로 따라 그린 뒤 원래 그림과 비교해 보세요. 연습장은 저장되지 않습니다."));
    host.appendChild(d);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var id = document.body.getAttribute("data-note");
    if (!id) return;
    var note = B.findNote(id);
    if (note) initNav(note);
    initHide();
    initWhy(id);
    var tools = document.getElementById("tools");
    if (tools) { initPad(tools); initMemo(id, tools); }
    B.loadQuiz([id], function () {
      var qs = B.QUIZ[id] || [];
      initPre(id, qs);
      initQuiz(id, qs);
    });
  });
})();
