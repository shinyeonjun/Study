/* 직접 눌러 보는 시각 자료. <div class="widget" data-widget="이름"></div> 자리에 그린다. */
(function () {
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function head(tag, title) { return '<div class="w-head"><span class="w-tag">' + tag + '</span><span class="w-title">' + title + "</span></div>"; }
  var W = {};

  /* ── 트리 순회 ─────────────────────────── */
  W.tree = function (el) {
    var N = {
      A: [210, 36, "B", "C"], B: [110, 116, "D", "E"], C: [310, 116, "F", "G"],
      D: [60, 196, null, null], E: [160, 196, null, null], F: [260, 196, null, null], G: [360, 196, null, null]
    };
    var orders = {
      pre: { name: "전위", rule: "나 → 왼쪽 → 오른쪽. 처리 코드가 재귀 호출보다 <b>앞</b>에 있을 때.", seq: [] },
      in: { name: "중위", rule: "왼쪽 → 나 → 오른쪽. 처리 코드가 두 재귀 호출 <b>사이</b>에 있을 때.", seq: [] },
      post: { name: "후위", rule: "왼쪽 → 오른쪽 → 나. 처리 코드가 재귀 호출보다 <b>뒤</b>에 있을 때.", seq: [] },
      level: { name: "레벨", rule: "위층부터 왼쪽에서 오른쪽으로. 큐(BFS)로 구현합니다.", seq: ["A", "B", "C", "D", "E", "F", "G"] }
    };
    (function walk(k) {
      if (!k) return;
      orders.pre.seq.push(k); walk(N[k][2]); orders.in.seq.push(k); walk(N[k][3]); orders.post.seq.push(k);
    })("A");

    var svg = '<svg class="tree-svg" viewBox="0 0 420 236" role="img" aria-label="A를 루트로 하는 노드 7개 이진 트리">';
    Object.keys(N).forEach(function (k) {
      [N[k][2], N[k][3]].forEach(function (c) { if (c) svg += '<line x1="' + N[k][0] + '" y1="' + N[k][1] + '" x2="' + N[c][0] + '" y2="' + N[c][1] + '"/>'; });
    });
    Object.keys(N).forEach(function (k) {
      svg += '<g data-n="' + k + '"><circle cx="' + N[k][0] + '" cy="' + N[k][1] + '" r="19"/><text class="tv" x="' + N[k][0] + '" y="' + N[k][1] + '">' + k +
        '</text><text class="to" x="' + (N[k][0] + 25) + '" y="' + (N[k][1] - 14) + '"></text></g>';
    });
    svg += "</svg>";

    el.innerHTML = head("눌러 보기", "트리 순회 네 가지") + '<div class="w-body">' +
      '<div class="btnrow" role="group" aria-label="순회 방식">' +
      Object.keys(orders).map(function (k, i) { return '<button class="btn" data-m="' + k + '" aria-pressed="' + (i === 2) + '">' + orders[k].name + "</button>"; }).join("") +
      '<span style="flex:1"></span><button class="btn" data-a="step">한 칸씩</button><button class="btn primary" data-a="play">재생</button><button class="btn" data-a="reset">처음</button></div>' +
      svg + '<p class="tree-rule"></p><div class="seq" aria-live="polite"></div>' +
      '<p class="w-hint" style="margin-top:8px">빨간 칸이 세 번째로 방문한 노드입니다. "세 번째 노드의 값" 같은 기출을 이 그림으로 확인해 보세요.</p></div>';

    var mode = "post", k = 0, timer = null;
    var rule = el.querySelector(".tree-rule"), seqEl = el.querySelector(".seq");
    function draw() {
      var seq = orders[mode].seq;
      rule.innerHTML = "<b>" + orders[mode].name + " 순회</b>: " + orders[mode].rule;
      el.querySelectorAll("g[data-n]").forEach(function (g) {
        var n = g.getAttribute("data-n"), pos = seq.indexOf(n);
        var visited = pos >= 0 && pos < k;
        g.classList.toggle("on", visited);
        g.classList.toggle("now", visited && pos === k - 1);
        g.querySelector(".to").textContent = visited ? pos + 1 : "";
      });
      seqEl.innerHTML = seq.slice(0, k).map(function (n, i) { return "<span" + (i === 2 ? ' class="third"' : "") + ">" + n + "</span>"; }).join("");
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; el.querySelector('[data-a="play"]').textContent = "재생"; } }
    el.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.m) {
        stop(); mode = b.dataset.m; k = 7;
        el.querySelectorAll("[data-m]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      }
      if (b.dataset.a === "step") { stop(); k = k >= 7 ? 1 : k + 1; }
      if (b.dataset.a === "reset") { stop(); k = 0; }
      if (b.dataset.a === "play") {
        if (timer) { stop(); return; }
        k = 0; b.textContent = "멈춤";
        timer = setInterval(function () { k++; draw(); if (k >= 7) stop(); }, 650);
      }
      draw();
    });
    k = 7; draw();
  };

  /* ── 비트 연산 ─────────────────────────── */
  W.bits = function (el) {
    el.innerHTML = head("직접 입력", "비트 연산 계산기") + '<div class="w-body">' +
      '<div class="btnrow" style="margin-bottom:12px">' +
      '<label class="field">a <input type="number" id="bits-a" min="0" max="255" value="13"></label>' +
      '<label class="field">b <input type="number" id="bits-b" min="0" max="255" value="6"></label>' +
      '<label class="field">시프트 <input type="number" id="bits-s" min="0" max="4" value="2"></label></div>' +
      '<div class="bits" aria-live="polite"></div>' +
      '<p class="w-hint" style="margin-top:10px">0~255 사이 값을 넣어 보세요. 16진수 한 자리는 비트 네 개라서 가운데에 틈을 두었습니다. ~a는 int 기준으로 -a-1입니다.</p></div>';
    var out = el.querySelector(".bits");
    function cells(v, w) {
      var s = "", lead = true;
      for (var i = w - 1; i >= 0; i--) {
        var bit = (v >> i) & 1;
        if (bit) lead = false;
        s += '<span class="' + (bit ? "one" : lead && i > 0 ? "lead" : "") + (i % 4 === 3 && i !== w - 1 ? " gap" : "") + '">' + bit + "</span>";
      }
      return '<span class="bit-cells">' + s + "</span>";
    }
    function row(op, v, w, extra, res) {
      return '<div class="bit-row' + (res ? " res" : "") + '"><span class="bit-op">' + op + "</span>" + cells(v, w) +
        '<span class="bit-dec">' + v + " <small>0x" + v.toString(16).toUpperCase() + (extra || "") + "</small></span></div>";
    }
    function draw() {
      var a = Math.max(0, Math.min(255, parseInt(el.querySelector("#bits-a").value, 10) || 0));
      var b = Math.max(0, Math.min(255, parseInt(el.querySelector("#bits-b").value, 10) || 0));
      var s = Math.max(0, Math.min(4, parseInt(el.querySelector("#bits-s").value, 10) || 0));
      var w = 12;
      out.innerHTML = row("a", a, w) + row("b", b, w) +
        row("a &amp; b", a & b, w, " · 둘 다 1", true) + row("a | b", a | b, w, " · 하나라도 1") + row("a ^ b", a ^ b, w, " · 서로 다르면 1") +
        row("a &lt;&lt; " + s, a << s, w, " · ×" + Math.pow(2, s), true) + row("a &gt;&gt; " + s, a >> s, w, " · ÷" + Math.pow(2, s) + " 버림") +
        row("~a (8비트)", (~a) & 255, w, " · int로는 " + (~a), true);
    }
    el.addEventListener("input", draw);
    draw();
  };

  /* ── 파이썬 슬라이싱 ─────────────────────── */
  W.slice = function (el) {
    el.innerHTML = head("직접 입력", "슬라이싱 시뮬레이터") + '<div class="w-body">' +
      '<div class="btnrow" style="margin-bottom:10px">' +
      '<label class="field">s = <input class="wide" id="sl-s" value="INFORMATION"></label>' +
      '<label class="field">시작 <input id="sl-a" placeholder="생략"></label>' +
      '<label class="field">끝 <input id="sl-b" value="1" placeholder="생략"></label>' +
      '<label class="field">간격 <input id="sl-c" value="-2" placeholder="생략"></label></div>' +
      '<div class="btnrow" style="margin-bottom:8px">' +
      ["2:5", ":3", "-3:", "::2", "::-1", "5:1:-1", "1:5:-1", "-2::-3"].map(function (x) { return '<button class="btn" data-ex="' + x + '">[' + x + "]</button>"; }).join("") +
      '</div><div class="sl-cells"></div><div class="sl-res" aria-live="polite"></div><p class="sl-why"></p></div>';
    function num(id) { var v = el.querySelector(id).value.trim(); if (v === "") return null; var n = parseInt(v, 10); return isNaN(n) ? null : n; }
    function draw() {
      var s = el.querySelector("#sl-s").value, n = s.length;
      var a = num("#sl-a"), b = num("#sl-b"), c = num("#sl-c");
      var step = c == null ? 1 : c, res = el.querySelector(".sl-res"), why = el.querySelector(".sl-why");
      var picks = [];
      if (step === 0) { res.innerHTML = "<span>간격 0은 ValueError</span>"; }
      else {
        var lo = step > 0 ? 0 : -1, hi = step > 0 ? n : n - 1;
        var adj = function (v, d) { if (v == null) return d; if (v < 0) { v += n; if (v < lo) v = lo; } else if (v > hi) v = hi; return v; };
        var st = adj(a, step > 0 ? lo : hi), en = adj(b, step > 0 ? hi : lo);
        if (step > 0) for (var i = st; i < en; i += step) picks.push(i); else for (var j = st; j > en; j += step) picks.push(j);
        var txt = "s[" + (a == null ? "" : a) + ":" + (b == null ? "" : b) + (c == null ? "" : ":" + c) + "]";
        res.innerHTML = "<span>" + esc(txt) + "</span> → <b>'" + esc(picks.map(function (k) { return s[k]; }).join("")) + "'</b>";
        why.innerHTML = "실제 시작 위치 " + (st === -1 ? "없음" : st) + ", 멈추는 위치 " + en + " (이 칸은 <b>포함 안 함</b>), " +
          (step > 0 ? "오른쪽" : "왼쪽") + "으로 " + Math.abs(step) + "칸씩." + (picks.length === 0 ? " 시작에서 끝 방향과 간격 방향이 반대라 빈 결과입니다." : "");
      }
      el.querySelector(".sl-cells").innerHTML = s.split("").map(function (ch, i) {
        var o = picks.indexOf(i);
        return '<div class="sl-cell' + (o >= 0 ? " pick" : "") + '"><span class="sp">' + i + '</span><span class="sc">' + esc(ch) + '</span><span class="sn">' + (i - n) +
          '</span><span class="so">' + (o >= 0 ? o + 1 : "") + "</span></div>";
      }).join("");
    }
    el.addEventListener("input", draw);
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-ex]");
      if (!b) return;
      var p = b.dataset.ex.split(":");
      el.querySelector("#sl-a").value = p[0] || ""; el.querySelector("#sl-b").value = p[1] || ""; el.querySelector("#sl-c").value = p[2] || "";
      draw();
    });
    draw();
  };

  /* ── Java: 누구의 것이 불리나 ──────────────── */
  W.binding = function (el) {
    var cases = [
      { e: "obj.show()", on: "B.show", off: "A.show", r: "B", why: "오버라이딩한 인스턴스 메서드는 실행할 때 <b>실제 객체(B)</b>를 보고 고릅니다." },
      { e: "obj.x", on: "A.x", off: "B.x", r: "10", why: "필드는 재정의되지 않습니다. 변수의 <b>선언 타입(A)</b> 쪽 칸을 읽습니다." },
      { e: "obj.st()", on: "A.st", off: "B.st", r: "sA", why: "static 메서드는 객체가 아니라 클래스에 붙어 있어서 <b>선언 타입(A)</b>을 따릅니다." },
      { e: "((B) obj).x", on: "B.x", off: "A.x", r: "20", why: "형변환하면 선언 타입이 B가 되니 B의 필드를 읽습니다." },
      { e: 'obj.f("hi")', on: "B.fO", off: "B.fS", r: "B-Object", why: "컴파일러는 A에 있는 f(Object)만 보고 그것으로 정합니다(오버로딩). 실행할 때는 그걸 재정의한 B의 f(Object)가 불립니다. B의 f(String)은 후보에도 안 들어갑니다." },
      { e: "obj.hello()", on: "A.hello", off: "", r: "A-hello", why: "B가 재정의하지 않은 메서드는 물려받은 A의 것이 그대로 실행됩니다. 그 안에서 show()를 부르면 다시 B.show()가 불립니다." }
    ];
    var mem = function (id, t) { return '<span class="mem" data-id="' + id + '">' + t + "</span>"; };
    el.innerHTML = head("눌러 보기", "A obj = new B(); 에서 누구의 것이 불리나") + '<div class="w-body">' +
      '<div class="btnrow" style="margin-bottom:12px">' + cases.map(function (c, i) { return '<button class="btn" data-i="' + i + '"><code>' + esc(c.e) + "</code></button>"; }).join("") + "</div>" +
      '<div class="bind"><div class="bind-var">obj<small>선언 타입 A</small></div><div class="bind-arrow">→</div>' +
      '<div class="bind-obj"><span class="bind-obj-h">new B() 로 만든 실제 객체</span>' +
      '<div class="bind-part"><span class="bind-part-n">A 부분</span>' + mem("A.x", "x = 10") + mem("A.show", "show()") + mem("A.st", "static st()") + mem("A.fO", "f(Object)") + mem("A.hello", "hello()") + "</div>" +
      '<div class="bind-part"><span class="bind-part-n">B 부분</span>' + mem("B.x", "x = 20") + mem("B.show", "show() 재정의") + mem("B.st", "static st()") + mem("B.fO", "f(Object) 재정의") + mem("B.fS", "f(String)") + "</div>" +
      "</div></div><div class=\"bind-res\" aria-live=\"polite\">위 버튼을 눌러 보세요.</div></div>";
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-i]");
      if (!b) return;
      var c = cases[+b.dataset.i];
      el.querySelectorAll("[data-i]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      el.querySelectorAll(".mem").forEach(function (m) {
        m.classList.toggle("on", m.dataset.id === c.on);
        m.classList.toggle("off", m.dataset.id === c.off);
      });
      el.querySelector(".bind-res").innerHTML = "<code>" + esc(c.e) + '</code> → <b class="r">' + esc(c.r) + "</b><br>" + c.why;
    });
  };

  /* ── SQL 실행 순서 ─────────────────────── */
  W.pipeline = function (el) {
    var rows = [["김", "DB", 95], ["김", "OS", 70], ["이", "DB", 88], ["이", "OS", 92], ["박", "DB", 60], ["박", "OS", 84], ["최", "DB", 90], ["최", "NW", 75]];
    var sql = ["SELECT 과목, COUNT(*) AS 인원, AVG(점수) AS 평균", "FROM 성적", "WHERE 점수 >= 70", "GROUP BY 과목", "HAVING COUNT(*) >= 2", "ORDER BY 평균 DESC;"];
    var stages = [
      { k: "FROM", line: 1, note: "성적 표 전체 8행을 가져옵니다. JOIN이 있으면 이 단계에서 표를 붙입니다." },
      { k: "WHERE", line: 2, note: "행 하나씩 조건을 검사합니다. 박의 DB 60점이 빠져 7행이 남습니다. 아직 묶기 전이라 여기서는 COUNT, AVG 같은 집계 함수를 쓸 수 없습니다." },
      { k: "GROUP BY", line: 3, note: "과목 값이 같은 행끼리 묶습니다. 왼쪽 색 띠가 같은 행이 한 그룹입니다. 이제부터는 행이 아니라 그룹 단위입니다." },
      { k: "HAVING", line: 4, note: "그룹마다 조건을 검사합니다. 1명뿐인 NW 그룹이 빠집니다. 그룹 조건이라 집계 함수를 씁니다." },
      { k: "SELECT", line: 0, note: "그룹마다 한 행씩 계산합니다. 여기서 별칭(인원, 평균)이 처음 생깁니다." },
      { k: "ORDER BY", line: 5, note: "SELECT 다음에 실행되므로 별칭 '평균'으로 정렬할 수 있습니다. DESC는 큰 값부터." }
    ];
    el.innerHTML = head("단계별", "SQL은 FROM부터 실행된다") + '<div class="w-body"><div class="pipe-stages">' +
      stages.map(function (s, i) { return (i ? '<span class="arrow">→</span>' : "") + '<button class="btn" data-s="' + i + '">' + (i + 1) + ". " + s.k + "</button>"; }).join("") +
      '</div><div class="pipe-sql"></div><div class="tablewrap pipe-tbl"></div><p class="pipe-note" aria-live="polite"></p></div>';
    var gIdx = { DB: 0, OS: 1, NW: 2 };
    function table(head, body) {
      return '<table class="data"><thead><tr>' + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr></thead><tbody>" + body + "</tbody></table>";
    }
    function draw(si) {
      el.querySelectorAll("[data-s]").forEach(function (b) { b.setAttribute("aria-pressed", +b.dataset.s === si); });
      el.querySelector(".pipe-sql").innerHTML = sql.map(function (l, i) { return i === stages[si].line ? "<mark>" + esc(l) + "</mark>" : esc(l); }).join("\n");
      var html;
      if (si <= 1) {
        html = table(["이름", "과목", "점수"], rows.map(function (r) {
          var cut = si === 1 && r[2] < 70;
          return '<tr class="' + (cut ? "cut" : "") + '"><td>' + r[0] + "</td><td>" + r[1] + "</td><td>" + r[2] + "</td></tr>";
        }).join(""));
      } else if (si <= 3) {
        var kept = rows.filter(function (r) { return r[2] >= 70; }).sort(function (a, b) { return gIdx[a[1]] - gIdx[b[1]]; });
        html = table(["이름", "과목", "점수", "그룹 크기"], kept.map(function (r) {
          var size = kept.filter(function (x) { return x[1] === r[1]; }).length;
          var cut = si === 3 && size < 2;
          return '<tr class="g' + gIdx[r[1]] + (cut ? " cut" : "") + '"><td>' + r[0] + "</td><td>" + r[1] + "</td><td>" + r[2] + "</td><td>" + size + "</td></tr>";
        }).join(""));
      } else {
        var res = [["DB", 3, "91.0"], ["OS", 3, "82.0"]];
        html = table(["과목", "인원", "평균"], res.map(function (r) { return '<tr class="g' + gIdx[r[0]] + '"><td>' + r.join("</td><td>") + "</td></tr>"; }).join(""));
        if (si === 4) html += '<p class="muted" style="margin:6px 0 0">DB는 95, 88, 90 → 평균 91 / OS는 70, 92, 84 → 평균 82</p>';
      }
      el.querySelector(".pipe-tbl").innerHTML = html;
      el.querySelector(".pipe-note").innerHTML = "<b>" + (si + 1) + ". " + stages[si].k + "</b> · " + stages[si].note;
    }
    el.addEventListener("click", function (e) { var b = e.target.closest("[data-s]"); if (b) draw(+b.dataset.s); });
    draw(0);
  };

  /* ── JOIN 종류 ─────────────────────────── */
  W.join = function (el) {
    var S = [["김철수", "컴퓨터"], ["이영희", "컴퓨터"], ["박민수", "전자"], ["이수진", "전자"], ["최지훈", "기계"], ["이도윤", "컴퓨터"]];
    var D = [["컴퓨터", "공학관"], ["전자", "IT관"], ["화학", "과학관"]];
    var venn = {
      inner: '<path class="fill" d="M60 13.6 A30 30 0 0 1 60 64.4 A30 30 0 0 1 60 13.6Z"/>',
      left: '<circle class="fill" cx="44" cy="39" r="30" style="stroke:none;fill:var(--accent);opacity:.35"/>',
      right: '<circle class="fill" cx="76" cy="39" r="30" style="stroke:none;fill:var(--accent);opacity:.35"/>',
      full: '<circle cx="44" cy="39" r="30" style="stroke:none;fill:var(--accent);opacity:.35"/><circle cx="76" cy="39" r="30" style="stroke:none;fill:var(--accent);opacity:.35"/>',
      cross: '<rect class="fill" x="6" y="4" width="108" height="70" rx="6"/>'
    };
    var info = {
      inner: "양쪽에 짝이 있는 행만. 기계과(학과 표에 없음)와 화학과(학생 없음)는 빠집니다. 5행.",
      left: "왼쪽(학생) 행은 전부 남고, 짝이 없으면 오른쪽 칸이 NULL. 최지훈이 NULL로 남습니다. 6행.",
      right: "오른쪽(학과) 행은 전부 남습니다. 학생이 없는 화학과가 NULL과 함께 나옵니다. 6행.",
      full: "양쪽 모두 남깁니다. 최지훈과 화학과가 둘 다 나옵니다. 7행.",
      cross: "조건 없이 모든 조합. 학생 6행 × 학과 3행 = 18행. FROM 학생, 학과 처럼 조건을 빼먹어도 이렇게 됩니다."
    };
    function rowsFor(t) {
      var r = [];
      if (t === "cross") return null;
      S.forEach(function (s) {
        var m = D.filter(function (d) { return d[0] === s[1]; });
        if (m.length) m.forEach(function (d) { r.push([s[0], s[1], d[0], d[1]]); });
        else if (t === "left" || t === "full") r.push([s[0], s[1], null, null]);
      });
      if (t === "right" || t === "full") D.forEach(function (d) { if (!S.some(function (s) { return s[1] === d[0]; })) r.push([null, null, d[0], d[1]]); });
      return r;
    }
    var names = { inner: "INNER JOIN", left: "LEFT JOIN", right: "RIGHT JOIN", full: "FULL OUTER JOIN", cross: "CROSS JOIN" };
    el.innerHTML = head("눌러 보기", "JOIN 종류별 결과 (학생 ⋈ 학과)") + '<div class="w-body"><div class="btnrow" style="margin-bottom:12px">' +
      Object.keys(names).map(function (k) { return '<button class="btn" data-j="' + k + '">' + names[k] + "</button>"; }).join("") +
      '</div><div class="join-wrap"><svg class="venn" viewBox="0 0 120 78" aria-hidden="true"><g class="vf"></g><circle cx="44" cy="39" r="30"/><circle cx="76" cy="39" r="30"/>' +
      '<text x="20" y="76" font-size="10" fill="currentColor">학생</text><text x="84" y="76" font-size="10" fill="currentColor">학과</text></svg>' +
      '<div class="muted jsql" style="font-family:var(--f-mono);font-size:12.5px;white-space:pre"></div><div></div></div>' +
      '<p class="pipe-note jinfo" aria-live="polite"></p><div class="tablewrap jtbl"></div></div>';
    function draw(t) {
      el.querySelectorAll("[data-j]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.j === t); });
      el.querySelector(".vf").innerHTML = venn[t];
      el.querySelector(".jsql").textContent = "SELECT *\nFROM 학생 s " + names[t] + " 학과 d" + (t === "cross" ? "" : "\n  ON s.학과 = d.학과명");
      el.querySelector(".jinfo").innerHTML = "<b>" + names[t] + "</b> · " + info[t];
      var r = rowsFor(t), html;
      if (!r) {
        html = '<table class="data"><thead><tr><th>이름</th><th>s.학과</th><th>d.학과명</th><th>건물</th></tr></thead><tbody>';
        S.slice(0, 2).forEach(function (s) { D.forEach(function (d) { html += "<tr><td>" + s[0] + "</td><td>" + s[1] + "</td><td>" + d[0] + "</td><td>" + d[1] + "</td></tr>"; }); });
        html += '<tr><td colspan="4" class="null">… 나머지 학생 4명도 각각 3행씩, 모두 18행</td></tr></tbody></table>';
      } else {
        html = '<table class="data"><thead><tr><th>이름</th><th>s.학과</th><th>d.학과명</th><th>건물</th></tr></thead><tbody>' + r.map(function (x) {
          return "<tr>" + x.map(function (v) { return v == null ? '<td class="null">NULL</td>' : "<td>" + v + "</td>"; }).join("") + "</tr>";
        }).join("") + "</tbody></table>";
      }
      el.querySelector(".jtbl").innerHTML = html;
    }
    el.addEventListener("click", function (e) { var b = e.target.closest("[data-j]"); if (b) draw(b.dataset.j); });
    draw("inner");
  };

  /* ── 2차원 배열과 메모리 ─────────────────── */
  W.grid2d = function (el) {
    var R = 3, C = 4;
    var g = '<div class="g2-grid"><span></span>';
    for (var j = 0; j < C; j++) g += '<span class="ch">[' + j + "]</span>";
    for (var i = 0; i < R; i++) {
      g += '<span class="rh">a[' + i + "]</span>";
      for (j = 0; j < C; j++) g += '<button class="g2-c" data-i="' + i + '" data-j="' + j + '">' + (i * C + j + 1) + "</button>";
    }
    g += "</div>";
    var line = '<div class="g2-line">';
    for (var k = 0; k < R * C; k++) line += '<div class="cell" data-k="' + k + '"><span class="ci">' + (100 + k * 4) + '</span><span class="cv">' + (k + 1) + '</span><span class="cp"></span></div>';
    line += "</div>";
    el.innerHTML = head("눌러 보기", "int a[3][4] 는 메모리에 한 줄로 놓인다") + '<div class="w-body"><p class="w-hint">칸을 눌러 보세요. 같은 칸을 가리키는 여러 표현이 나옵니다.</p>' +
      '<div class="g2-wrap"><div>' + g + '</div><div><div class="g2-expr" aria-live="polite"></div></div></div>' +
      '<p class="stp-sec-h" style="margin-top:14px">실제 메모리 (주소는 int 4바이트 기준 예시)</p>' + line + "</div>";
    function pick(i, j) {
      var k = i * C + j, v = k + 1;
      el.querySelectorAll(".g2-c").forEach(function (b) {
        b.classList.toggle("on", +b.dataset.i === i && +b.dataset.j === j);
        b.classList.toggle("row", +b.dataset.i === i);
      });
      el.querySelectorAll(".g2-line .cell").forEach(function (c) {
        var kk = +c.dataset.k;
        c.classList.toggle("hl", kk === k);
        c.querySelector(".cp").textContent = kk === i * C ? "▲ a[" + i + "]" : "";
      });
      el.querySelector(".g2-expr").innerHTML =
        "<span><b>a[" + i + "][" + j + "]</b> = " + v + "</span>" +
        "<span>= <b>*(a[" + i + "] + " + j + ")</b></span>" +
        "<span>= <b>*(*(a + " + i + ") + " + j + ")</b></span>" +
        "<span>= <b>*(&amp;a[0][0] + " + i + "*" + C + " + " + j + ")</b> → 앞에서 " + k + "칸째</span>" +
        '<span class="muted">a[' + i + "]는 " + i + "행의 시작 주소 " + (100 + i * C * 4) + "번지. **a 는 a[0][0], *a[" + i + "] 는 a[" + i + "][0]</span>";
    }
    el.addEventListener("click", function (e) { var b = e.target.closest(".g2-c"); if (b) pick(+b.dataset.i, +b.dataset.j); });
    pick(1, 2);
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".widget[data-widget]").forEach(function (el) {
      var f = W[el.getAttribute("data-widget")];
      if (f) f(el);
    });
  });
})();
