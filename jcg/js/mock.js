/* 모의고사: window.MOCK 문항을 그리고, 타이머·답안 저장·채점·해설·영역별 분석을 한다. */
(function () {
  var J = window.JCG || {};
  var KEY = "jcg-mock-2026-3";
  var LIMIT = 150 * 60;
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } }
  function save(st) { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function normTerm(s) { return String(s).toLowerCase().replace(/[\s()\[\]]/g, ""); }
  function normOut(s) {
    return String(s).replace(/\r/g, "").split("\n").map(function (l) { return l.replace(/\s+$/, ""); }).join("\n").replace(/^\n+|\n+$/g, "");
  }
  function fmt(sec) {
    sec = Math.max(0, sec | 0);
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var Q = window.MOCK || [], list = document.querySelector(".exam-list");
    if (!list) return;
    if (list.dataset.key) KEY = list.dataset.key;
    var st = load();
    st.ans = st.ans || {};

    list.innerHTML = Q.map(function (q) {
      var inputs = q.blanks.map(function (b, i) {
        var id = "a" + q.n + "_" + i, v = st.ans[id] || "";
        var field = q.kind === "out"
          ? '<textarea id="' + id + '" rows="2" spellcheck="false" placeholder="출력 결과 (줄이 여러 개면 줄바꿈)">' + esc(v) + "</textarea>"
          : '<input id="' + id + '" type="text" spellcheck="false" autocomplete="off" value="' + esc(v) + '">';
        return '<label class="ex-blank"><span class="ex-bl">' + esc(b.label) + "</span>" + field + '<span class="ex-mark"></span></label>';
      }).join("");
      return '<article class="ex-q" id="q' + q.n + '" data-area="' + esc(q.area) + '">' +
        '<div class="ex-head"><span class="ex-n">' + q.n + '</span><span class="ex-area">' + esc(q.area) + '</span><span class="ex-pt">5점</span></div>' +
        '<p class="ex-text">' + q.text + "</p>" + (q.extra || "") +
        (q.code ? '<div class="codewrap"><pre class="code"><code data-lang="' + q.lang + '">' + esc(q.code) + "</code></pre></div>" : "") +
        '<div class="ex-answers">' + inputs + "</div>" +
        '<div class="ex-sol" hidden><p class="ex-sol-a"><b>정답</b> ' + q.blanks.map(function (b) { return esc(b.label) + " " + esc(b.show); }).join(" &nbsp;/&nbsp; ") + "</p>" +
        q.explain + (q.why ? '<p class="ex-why"><b>출제 의도</b> ' + q.why + "</p>" : "") +
        (q.link ? '<p class="ex-link"><a href="' + q.link + '">관련 노트 보기 →</a></p>' : "") + "</div></article>";
    }).join("");
    if (J.highlightAll) J.highlightAll(list);

    var timerEl = document.querySelector(".timer"), btnStart = document.querySelector('[data-a="start"]'), btnPause = document.querySelector('[data-a="pause"]');
    var savedEl = document.querySelector(".saved"), resultEl = document.querySelector(".result");
    var tick = null;

    function remain() {
      if (!st.startedAt) return LIMIT;
      var used = (st.used || 0) + (st.running ? (Date.now() - st.startedAt) / 1000 : 0);
      return LIMIT - used;
    }
    function draw() {
      var r = remain();
      timerEl.textContent = fmt(r);
      timerEl.classList.toggle("low", r < 600);
      if (r <= 0 && !st.graded) grade();
    }
    function run() {
      if (tick) clearInterval(tick);
      tick = setInterval(draw, 1000);
      btnStart.hidden = true; btnPause.hidden = false; btnPause.textContent = "일시 정지";
    }
    btnStart.addEventListener("click", function () {
      st.startedAt = Date.now(); st.running = true; st.used = st.used || 0; save(st); run(); draw();
      document.getElementById("q1").scrollIntoView({ behavior: "smooth" });
    });
    btnPause.addEventListener("click", function () {
      if (st.running) {
        st.used = (st.used || 0) + (Date.now() - st.startedAt) / 1000; st.running = false;
        clearInterval(tick); btnPause.textContent = "이어서 풀기";
      } else {
        st.startedAt = Date.now(); st.running = true; run();
      }
      save(st); draw();
    });
    if (st.startedAt && !st.graded) {
      if (st.running) run(); else { btnStart.hidden = true; btnPause.hidden = false; btnPause.textContent = "이어서 풀기"; }
    }
    draw();

    list.addEventListener("input", function (e) {
      if (!e.target.id) return;
      st.ans[e.target.id] = e.target.value; save(st);
      savedEl.textContent = "답안 자동 저장됨";
    });

    function grade() {
      if (st.running) { st.used = (st.used || 0) + (Date.now() - st.startedAt) / 1000; st.running = false; }
      clearInterval(tick);
      st.graded = true; save(st);
      var total = 0, byArea = {}, rows = [];
      Q.forEach(function (q) {
        var ok = 0, art = document.getElementById("q" + q.n);
        q.blanks.forEach(function (b, i) {
          var el = document.getElementById("a" + q.n + "_" + i), v = el.value;
          var hit = b.mode === "out"
            ? b.accept.some(function (a) { return normOut(a) === normOut(v); })
            : b.accept.some(function (a) { return normTerm(a) === normTerm(v); });
          if (hit) ok++;
          var mark = el.parentNode.querySelector(".ex-mark");
          mark.textContent = hit ? "○" : "✕";
          mark.className = "ex-mark " + (hit ? "ok" : "no");
          el.readOnly = true;
        });
        var pt = Math.round(5 * ok / q.blanks.length * 10) / 10;
        total += pt;
        var a = byArea[q.area] = byArea[q.area] || { got: 0, max: 0 };
        a.got += pt; a.max += 5;
        art.classList.add(pt === 5 ? "right" : pt > 0 ? "part" : "wrong");
        art.querySelector(".ex-pt").textContent = pt + " / 5점";
        art.querySelector(".ex-sol").hidden = false;
        rows.push({ n: q.n, area: q.area, pt: pt });
      });
      total = Math.round(total * 10) / 10;
      var pass = total >= 60;
      var weak = Object.keys(byArea).map(function (k) { return { k: k, r: byArea[k].got / byArea[k].max, a: byArea[k] }; }).sort(function (x, y) { return x.r - y.r; });
      resultEl.hidden = false;
      resultEl.innerHTML =
        '<div class="res-top"><div><p class="eyebrow">채점 결과</p><p class="res-score ' + (pass ? "pass" : "fail") + '">' + total + '<small>/ 100</small></p>' +
        '<p class="res-verdict">' + (pass ? "합격선(60점)을 넘었습니다." : "합격선까지 " + Math.round((60 - total) * 10) / 10 + "점 남았습니다.") +
        ' 사용 시간 ' + fmt(st.used || 0) + "</p></div>" +
        '<div class="res-areas">' + weak.slice().sort(function (x, y) { return y.a.max - x.a.max; }).map(function (w) {
          return '<div class="bar-row"><span class="bar-l">' + esc(w.k) + '</span><span class="bar-t"><span class="bar-f" style="width:' + (w.r * 100).toFixed(0) + '%"></span></span><span class="bar-v">' + w.a.got + "/" + w.a.max + "</span></div>";
        }).join("") + "</div></div>" +
        '<div class="res-grid">' + rows.map(function (r) {
          return '<a href="#q' + r.n + '" class="res-cell ' + (r.pt === 5 ? "right" : r.pt > 0 ? "part" : "wrong") + '"><b>' + r.n + "</b><span>" + esc(r.area) + "</span><span>" + r.pt + "</span></a>";
        }).join("") + "</div>" +
        (weak[0] && weak[0].r < 1 ? '<p class="res-tip">가장 약한 영역은 <b>' + esc(weak[0].k) + "</b>입니다. 틀린 문항의 해설 아래 '관련 노트 보기'로 바로 이동할 수 있습니다.</p>" : "");
      document.querySelector('[data-a="submit"]').disabled = true;
      btnPause.hidden = true; btnStart.hidden = true;
      resultEl.scrollIntoView({ behavior: "smooth" });
    }

    document.querySelector('[data-a="submit"]').addEventListener("click", function () {
      var empty = Q.reduce(function (n, q) { return n + q.blanks.filter(function (b, i) { return !document.getElementById("a" + q.n + "_" + i).value.trim(); }).length; }, 0);
      var btn = this;
      if (empty && !btn.dataset.sure) {
        btn.dataset.sure = "1";
        btn.textContent = "빈칸 " + empty + "개가 남았습니다. 그래도 제출하려면 한 번 더 누르세요";
        return;
      }
      grade();
    });
    document.querySelector('[data-a="reset"]').addEventListener("click", function () {
      var btn = this;
      if (!btn.dataset.sure) { btn.dataset.sure = "1"; btn.textContent = "답안이 모두 지워집니다. 한 번 더 누르면 초기화"; return; }
      try { localStorage.removeItem(KEY); } catch (e) {}
      location.reload();
    });
    if (st.graded) grade();
  });
})();
