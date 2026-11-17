/* 연습 문제: window.PRACTICE 배열을 언어별 탭으로 보여 주고, 답을 넣으면 채점한다.
   문제 하나: {id, lang, prompt, code, answer(HTML), accept:[정답 문자열...] 또는 없음, explain(HTML), src} */
(function () {
  var J = window.JCG || {};
  var LANGS = { all: "전체", c: "C", java: "Java", python: "Python", sql: "SQL" };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function norm(s) {
    return String(s).replace(/\r/g, "").split("\n").map(function (l) { return l.replace(/\s+$/, ""); }).join("\n").replace(/^\n+|\n+$/g, "");
  }

  function card(q, num) {
    var hasCheck = q.accept && q.accept.length;
    return '<article class="q' + (J.store.get(q.id) ? " solved" : "") + '" id="' + q.id + '" data-lang="' + q.lang + '">' +
      '<div class="q-head"><span class="q-n">' + LANGS[q.lang] + " " + num + '</span><span class="q-p">' + q.prompt + "</span>" +
      (q.src ? '<span class="q-src">' + esc(q.src) + "</span>" : "") + "</div>" +
      (q.code ? '<div class="codewrap"><pre class="code"><code data-lang="' + q.lang + '">' + esc(q.code) + "</code></pre></div>" : "") +
      '<div class="q-ans">' +
      (hasCheck ? '<textarea rows="1" aria-label="내 답" placeholder="출력 결과를 그대로 입력 (줄이 여러 개면 줄바꿈)"></textarea><button class="btn primary" data-a="check">채점</button>' : "") +
      '<button class="btn" data-a="show">정답과 풀이</button>' +
      (hasCheck ? "" : '<button class="btn" data-a="mark">맞혔어요</button>') +
      '</div><p class="q-msg" aria-live="polite"></p>' +
      '<div class="q-reveal" hidden><p class="ans-v">' + q.answer + "</p>" + (q.explain || "") + "</div></article>";
  }

  function count(lang) {
    var list = window.PRACTICE || [], s = J.store.all();
    var tot = list.filter(function (q) { return lang === "all" || q.lang === lang; });
    return { done: tot.filter(function (q) { return s[q.id]; }).length, total: tot.length };
  }
  J.practiceCount = count;

  function init(box) {
    var list = window.PRACTICE || [];
    var tabs = document.querySelector(".ptabs");
    var nums = {};
    box.innerHTML = list.map(function (q) { nums[q.lang] = (nums[q.lang] || 0) + 1; return card(q, nums[q.lang]); }).join("");
    if (J.highlightAll) J.highlightAll(box);

    function refreshTabs(active) {
      tabs.innerHTML = Object.keys(LANGS).map(function (k) {
        var c = count(k);
        return '<button class="btn" data-t="' + k + '" aria-pressed="' + (k === active) + '">' + LANGS[k] + "<small>" + c.done + "/" + c.total + "</small></button>";
      }).join("");
    }
    function filter(lang) {
      if (!LANGS[lang]) lang = "all";
      box.querySelectorAll(".q").forEach(function (q) { q.hidden = lang !== "all" && q.dataset.lang !== lang; });
      refreshTabs(lang);
      box.dataset.active = lang;
    }
    tabs.addEventListener("click", function (e) {
      var b = e.target.closest("[data-t]");
      if (!b) return;
      filter(b.dataset.t);
      try { history.replaceState(null, "", "#" + b.dataset.t); } catch (err) {}
    });
    function solve(art, ok) {
      J.store.set(art.id, ok);
      art.classList.toggle("solved", ok);
      refreshTabs(box.dataset.active || "all");
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (!b) return;
      var art = b.closest(".q"), q = list.filter(function (x) { return x.id === art.id; })[0];
      var msg = art.querySelector(".q-msg"), rev = art.querySelector(".q-reveal");
      if (b.dataset.a === "show") { rev.hidden = !rev.hidden; b.textContent = rev.hidden ? "정답과 풀이" : "풀이 닫기"; }
      if (b.dataset.a === "mark") { var on = !J.store.get(art.id); solve(art, on); b.textContent = on ? "맞힘 표시 취소" : "맞혔어요"; }
      if (b.dataset.a === "check") {
        var v = norm(art.querySelector("textarea").value);
        if (!v) { msg.className = "q-msg no"; msg.textContent = "답을 먼저 입력해 주세요."; return; }
        var ok = q.accept.some(function (a) { return norm(a) === v; });
        msg.className = "q-msg " + (ok ? "ok" : "no");
        msg.textContent = ok ? "정답입니다." : "다릅니다. 공백, 줄바꿈, 대소문자까지 다시 확인해 보세요.";
        if (ok) solve(art, true);
      }
    });
    box.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && e.target.tagName === "TEXTAREA") {
        e.preventDefault();
        e.target.closest(".q").querySelector('[data-a="check"]').click();
      }
    });
    filter((location.hash || "#all").slice(1));
  }

  document.addEventListener("DOMContentLoaded", function () {
    var box = document.querySelector(".practice-list");
    if (box) init(box);
    // 홈 화면의 진행률 표시
    document.querySelectorAll("[data-progress]").forEach(function (el) {
      var c = count(el.getAttribute("data-progress"));
      el.innerHTML = "연습 문제 <b>" + c.done + "</b> / " + c.total;
    });
  });
})();
