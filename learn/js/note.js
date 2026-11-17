/* 노트 페이지: 목차와 읽기 진행, 과목 이름·이전 다음 링크, 핵심어 가리기, '왜 그럴까' 적기, 확인 문제, 연습장, 내 메모 */
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
    pager.appendChild(note.prev ? link(note.prev, "← " + note.prev.title) : link(null, "← 목차"));
    pager.appendChild(note.next ? link(note.next, note.next.title + " →") : link(null, "목차 →"));
  }

  // 장 머리 아래 한 줄: 어느 단원의 몇 번째 장인지, 먼저 볼 단원, 단원 안내 링크
  function initUnitBar(note) {
    var M = window.BDA_MAP, head = document.querySelector("header.chapter");
    if (!M || !head || !note.unit) return;
    var u = M.units.filter(function (x) { return x.id === note.unit; })[0];
    if (!u) return;
    var chs = (window.BDA_CHAPTERS || {})[u.id] || [], idx = 0;
    chs.forEach(function (c, i) { if (c.id === note.id) idx = i; });
    var bar = el("p", "unit-bar"), a = el("a", "", u.id + " " + u.title);
    a.href = B.BASE + "unit.html?u=" + u.id;
    bar.appendChild(a);
    bar.appendChild(document.createTextNode(" · " + chs.length + "장 중 " + (idx + 1) + "장"));
    var skip = window.BDA_SKIP || [], pre = u.pre.filter(function (x) { return skip.indexOf(x) < 0; });
    if (pre.length) {
      bar.appendChild(document.createTextNode(" · 먼저: "));
      pre.forEach(function (pid, i) {
        var p = M.units.filter(function (x) { return x.id === pid; })[0], pa = el("a", "", pid + " " + p.title);
        pa.href = B.BASE + "unit.html?u=" + pid;
        if (i) bar.appendChild(document.createTextNode(", "));
        bar.appendChild(pa);
      });
    }
    head.parentNode.insertBefore(bar, head.nextSibling);
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

  // 왼쪽 목차: 본문의 큰 제목(h2)과 작은 제목(h3)에서 자동으로 만든다. 지금 읽는 곳을 표시한다
  function initToc() {
    var toc = document.getElementById("toc"), main = document.querySelector("main");
    if (!toc || !main) return;
    var heads = [].slice.call(main.querySelectorAll("h2, h3")).filter(function (h) { return h.parentNode === main; });
    var box = el("details", "toc-box"), list = el("ol"), links = [];
    box.open = window.matchMedia("(min-width: 1100px)").matches;
    box.appendChild(el("summary", "", "차례"));
    heads.forEach(function (h, i) {
      if (!h.id) h.id = "s" + (i + 1);
      var text = "";
      h.childNodes.forEach(function (n) {
        if (n.nodeType === 3) text += n.textContent;
        else if (!n.classList || !(n.classList.contains("step-k") || n.classList.contains("tag"))) text += n.textContent;
      });
      var li = el("li", h.tagName === "H3" ? "sub" : ""), a = el("a", "", text.trim());
      a.href = "#" + h.id;
      li.appendChild(a);
      list.appendChild(li);
      links.push(a);
    });
    box.appendChild(list);
    toc.appendChild(box);
    var bar = document.querySelector(".read-bar i");
    function onScroll() {
      var y = window.scrollY + 90, cur = 0;
      heads.forEach(function (h, i) { if (h.getBoundingClientRect().top + window.scrollY <= y) cur = i; });
      links.forEach(function (a, i) { a.classList.toggle("on", i === cur); });
      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + "%";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // 확인 문제. 본문 중간의 <div class="check" data-q="q3">에는 그 문제가 그 자리에 나오고,
  // 맨 끝 <div id="quiz">에는 본문에 놓이지 않은 나머지 문제가 나온다. 쭉 읽으면서 그 자리에서 푼다.
  function initQuiz(id, qs) {
    var end = document.getElementById("quiz"), placed = {}, status = null;
    function paint() {
      if (!status) return;
      var r = B.noteStatus(id), text;
      if (!r.tried) text = "보기를 누르면 바로 정답과 해설이 나옵니다.";
      else if (r.tried < r.total) text = r.total + "문제 중 " + r.tried + "문제 풂" + (r.open ? " · 다시 풀 문제 " + r.open + "개" : "");
      else if (r.open) text = "다시 풀 문제가 " + r.open + "개 남았습니다. 틀린 문제의 '다시 풀기'로 모두 맞히면 이 노트 공부가 끝납니다.";
      else text = "확인 문제를 모두 맞혔습니다. 이 노트 공부 끝. 내일부터 복습 문제로 다시 나옵니다.";
      status.firstChild.textContent = text;
    }
    function draw(host, q, label) {
      var card = host.appendChild(el("div", "qcard"));
      card.appendChild(el("span", "q-no", label));
      B.renderQ(card.appendChild(el("div")), id, q, { onDone: paint });
    }
    document.querySelectorAll(".check[data-q]").forEach(function (host) {
      var q = qs.filter(function (x) { return x.id === host.getAttribute("data-q"); })[0];
      if (!q) return;
      placed[q.id] = true;
      draw(host, q, "여기서 확인");
    });
    if (!end) return;
    if (!qs.length) { end.appendChild(el("p", "muted", "확인 문제를 불러오지 못했습니다.")); return; }
    qs.filter(function (q) { return !placed[q.id]; }).forEach(function (q, i) { draw(end, q, "문제 " + (i + 1)); });
    status = el("div", "quiz-status");
    status.appendChild(el("p"));
    var home = el("a", "btn ghost", "홈으로");
    home.href = B.BASE + "index.html";
    status.appendChild(home);
    end.appendChild(status);
    paint();
  }

  // 내 메모: 공책 대신 쓰는 칸. 노트마다 따로, 이 기기에 저장된다
  function initMemo(id, host) {
    var box = el("section", "panel kit");
    box.appendChild(el("h2", "", "내 메모"));
    var ta = el("textarea", "q-input");
    ta.rows = 8;
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
    d.appendChild(el("summary", "", "연습장 (그림 따라 그리기 · 계산)"));
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
    if (note) { initNav(note); initUnitBar(note); }
    initHide();
    initWhy(id);
    var tools = document.getElementById("tools");
    if (tools) {
      tools.appendChild(el("p", "work-title", "내 공책"));
      tools.appendChild(el("p", "muted small", "책 여백에 적듯이, 이 장을 읽고 떠오른 것을 적고 끄적이는 곳"));
      initMemo(id, tools);
      initPad(tools);
    }
    B.loadQuiz([id], function () {
      initQuiz(id, B.QUIZ[id] || []);
      initToc();
    });
  });
})();
