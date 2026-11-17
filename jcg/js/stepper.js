/* 코드 한 줄씩 따라가기.
   <div class="widget stepper" data-steps="아이디"></div> 자리에 window.STEPS[아이디]를 그린다.
   한 단계(step)에 들어갈 수 있는 것:
     line    현재 줄 번호(1부터)
     note    설명(HTML)
     vars    {이름: 값}                     → 변수 칸
     cells   [{name, val, addr, to, hl}]    → 주소가 붙은 메모리 칸 (to가 있으면 포인터)
     arrays  [{name, vals, ptrs:{p:i}, hl:[i], cmp:[i], dim:[i]}]
     list    {nodes:{id:값}, next:{id:id}, ptrs:{head:id}, hl:[id]}
     frames  [{name, vars:{}}]   (마지막이 현재 실행 중)
     heap    [{id, label, val, hl, gone}]
     out     지금까지 출력된 전체 문자열 */
(function () {
  var J = window.JCG || {};
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function fmtVal(v) {
    v = String(v);
    if (v.charAt(0) === "→") return '<span class="ref">' + esc(v) + "</span>";
    return esc(v);
  }

  function renderVars(vars) {
    return '<div class="vars">' + Object.keys(vars).map(function (k) {
      return '<div class="var"><span class="vn">' + esc(k) + '</span><span class="vv">' + fmtVal(vars[k]) + "</span></div>";
    }).join("") + "</div>";
  }

  function renderCells(cells) {
    var targets = {};
    cells.forEach(function (c) { if (c.to) targets[c.to] = 1; });
    return '<div class="vars">' + cells.map(function (c) {
      var cls = "var" + (c.hl ? " hl" : "") + (c.to ? " ptr" : "") + (targets[c.name] ? " target" : "");
      return '<div class="' + cls + '"><span class="vn">' + esc(c.name) + '</span><span class="vv">' + esc(c.val) +
        (c.to ? ' <small>→ ' + esc(c.to) + "</small>" : "") + "</span>" +
        (c.addr != null ? '<span class="va">' + esc(c.addr) + "번지</span>" : "") + "</div>";
    }).join("") + "</div>";
  }

  function renderArrays(arrs) {
    return arrs.map(function (a) {
      var ptrAt = {};
      Object.keys(a.ptrs || {}).forEach(function (p) {
        var i = a.ptrs[p];
        if (i == null) return;
        (ptrAt[i] = ptrAt[i] || []).push(p);
      });
      var cells = a.vals.map(function (v, i) {
        var cls = "cell" + ((a.hl || []).indexOf(i) >= 0 ? " hl" : "") + ((a.cmp || []).indexOf(i) >= 0 ? " cmp" : "") + ((a.dim || []).indexOf(i) >= 0 ? " dim" : "");
        return '<div class="' + cls + '"><span class="ci">' + (a.idx ? esc(a.idx[i]) : "[" + i + "]") + '</span><span class="cv">' + esc(v) +
          '</span><span class="cp">' + (ptrAt[i] ? "▲ " + ptrAt[i].map(esc).join(", ") : "") + "</span></div>";
      }).join("");
      return '<div class="arr"><span class="arr-name">' + esc(a.name) + '</span><div class="arr-cells">' + cells + "</div></div>";
    }).join("");
  }

  function renderList(L) {
    var seen = {}, rows = [], hl = L.hl || [];
    function node(id) {
      return '<span class="node' + (hl.indexOf(id) >= 0 ? " hl" : "") + '"><span class="nv">' + esc(L.nodes[id]) + '</span><span class="nn">next</span></span>';
    }
    Object.keys(L.ptrs || {}).forEach(function (p) {
      var id = L.ptrs[p], html = '<span class="lst-ptr">' + esc(p) + " →</span>";
      if (id == null) { rows.push('<div class="lst-row">' + html + '<span class="lst-null">NULL</span></div>'); return; }
      if (seen[id]) { rows.push('<div class="lst-row">' + html + '<span class="lst-ref">' + esc(L.nodes[id]) + " 노드 (위와 같음)</span></div>"); return; }
      var guard = 0;
      while (id != null && !seen[id] && guard++ < 50) {
        seen[id] = 1;
        html += node(id);
        var nx = L.next[id];
        html += '<span class="lst-arrow">→</span>';
        if (nx != null && seen[nx]) { html += '<span class="lst-ref">' + esc(L.nodes[nx]) + " 노드로</span>"; id = null; break; }
        id = nx;
        if (id == null) html += '<span class="lst-null">NULL</span>';
      }
      rows.push('<div class="lst-row">' + html + "</div>");
    });
    return '<div class="lst">' + rows.join("") + "</div>";
  }

  function renderFrames(fr) {
    return '<div class="frames">' + fr.slice().reverse().map(function (f, i) {
      var vs = Object.keys(f.vars || {}).map(function (k) { return k + "=<b>" + fmtVal(f.vars[k]) + "</b>"; }).join("  ");
      return '<div class="frame' + (i === 0 ? " top" : "") + '"><span class="frame-n">' + esc(f.name) + '</span><span class="frame-v">' + vs + "</span></div>";
    }).join("") + "</div>";
  }

  function renderHeap(h) {
    return '<div class="heap">' + h.map(function (o) {
      return '<div class="obj' + (o.hl ? " hl" : "") + (o.gone ? " gone" : "") + '"><div class="obj-h">' + esc(o.id) + " " + esc(o.label || "") +
        '</div><div class="obj-v">' + fmtVal(o.val) + "</div></div>";
    }).join("") + "</div>";
  }

  function sec(title, html) { return '<div><p class="stp-sec-h">' + title + "</p>" + html + "</div>"; }

  function build(el) {
    var data = (window.STEPS || {})[el.getAttribute("data-steps")];
    if (!data) return;
    var lines = data.code.replace(/\n$/, "").split("\n");
    var hl = J.highlight || function (s) { return esc(s); };
    el.innerHTML =
      '<div class="w-head"><span class="w-tag">한 줄씩</span><span class="w-title">' + esc(data.title || "코드 따라가기") + "</span></div>" +
      '<div class="stp-bar"><span></span></div>' +
      '<div class="stp-grid"><div class="stp-code">' +
      lines.map(function (ln, i) {
        return '<div class="stp-line" data-ln="' + (i + 1) + '"><span class="stp-ln">' + (i + 1) + "</span><span>" + (hl(ln, data.lang) || " ") + "</span></div>";
      }).join("") +
      '</div><div class="stp-side" aria-live="polite"></div></div>' +
      '<div class="stp-ctrl"><button class="btn" data-a="first">처음</button><button class="btn" data-a="prev">◀ 이전</button>' +
      '<button class="btn primary" data-a="next">다음 ▶</button><button class="btn" data-a="play">자동 재생</button><span class="stp-count"></span></div>';

    var side = el.querySelector(".stp-side"), count = el.querySelector(".stp-count"), bar = el.querySelector(".stp-bar span");
    var btnPrev = el.querySelector('[data-a="prev"]'), btnNext = el.querySelector('[data-a="next"]'), btnPlay = el.querySelector('[data-a="play"]');
    var codeBox = el.querySelector(".stp-code");
    var i = 0, timer = null, n = data.steps.length;

    function show() {
      var s = data.steps[i], prev = i > 0 ? data.steps[i - 1].line : null;
      el.querySelectorAll(".stp-line").forEach(function (ln) {
        var k = +ln.getAttribute("data-ln");
        ln.classList.toggle("cur", k === s.line);
        ln.classList.toggle("prev", k === prev && k !== s.line);
      });
      var cur = el.querySelector(".stp-line.cur");
      if (cur) {
        var top = cur.offsetTop - codeBox.offsetTop;
        if (top < codeBox.scrollTop || top > codeBox.scrollTop + codeBox.clientHeight - 30) codeBox.scrollTop = top - 40;
      }
      var html = '<div class="stp-note">' + (s.note || "") + "</div>";
      if (s.frames) html += sec("호출 스택 (위가 지금 실행 중)", renderFrames(s.frames));
      if (s.cells) html += sec("메모리", renderCells(s.cells));
      if (s.vars) html += sec("변수", renderVars(s.vars));
      if (s.arrays) html += sec("배열", renderArrays(s.arrays));
      if (s.list) html += sec("연결 상태", renderList(s.list));
      if (s.heap) html += sec(data.heapTitle || "객체", renderHeap(s.heap));
      html += sec("출력", '<div class="console">' + esc(s.out || "") + "</div>");
      side.innerHTML = html;
      count.textContent = (i + 1) + " / " + n;
      bar.style.width = ((i + 1) / n * 100) + "%";
      btnPrev.disabled = i === 0;
      btnNext.disabled = i === n - 1;
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; btnPlay.textContent = "자동 재생"; } }
    el.querySelector(".stp-ctrl").addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-a");
      if (!a) return;
      if (a === "first") { stop(); i = 0; }
      if (a === "prev" && i > 0) { stop(); i--; }
      if (a === "next" && i < n - 1) { stop(); i++; }
      if (a === "play") {
        if (timer) { stop(); return; }
        if (i === n - 1) i = 0;
        btnPlay.textContent = "멈춤";
        timer = setInterval(function () { if (i < n - 1) { i++; show(); } else stop(); }, 1100);
      }
      show();
    });
    el.tabIndex = 0;
    el.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" && i < n - 1) { stop(); i++; show(); e.preventDefault(); }
      if (e.key === "ArrowLeft" && i > 0) { stop(); i--; show(); e.preventDefault(); }
    });
    show();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".stepper[data-steps]").forEach(build);
  });
})();
