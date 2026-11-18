/* 슬라이드 덱: <section class="slide">를 한 장씩 보여 준다.
   넘기기: → · Space · PageDown · 오른쪽 탭 / 되돌리기: ← · PageUp · 왼쪽 탭 / 손가락으로 밀기.
   .check[data-q]는 quiz/<덱 id>.js의 문제를 그 자리에 그린다(누르면 바로 채점, 기록은 core.js). */
(function () {
  var B = window.BDA, el = B.el;

  document.addEventListener("DOMContentLoaded", function () {
    var id = document.body.getAttribute("data-note");
    var slides = [].slice.call(document.querySelectorAll(".slide"));
    if (!slides.length) return;
    var i = Math.min(Math.max(parseInt(location.hash.slice(1), 10) - 1 || 0, 0), slides.length - 1);

    // 위아래 틀: 진도 막대, 장 번호, 이전·다음
    var bar = el("div", "deck-bar"), fill = el("i");
    bar.appendChild(fill);
    document.body.appendChild(bar);
    var nav = el("nav", "deck-nav");
    var prev = el("button", "dn-btn", "←"), count = el("span", "dn-count"), next = el("button", "dn-btn", "→");
    prev.type = next.type = "button";
    prev.setAttribute("aria-label", "이전 장");
    next.setAttribute("aria-label", "다음 장");
    nav.appendChild(prev); nav.appendChild(count); nav.appendChild(next);
    document.body.appendChild(nav);

    // 마지막 장 끝에 다음 덱으로
    var notes = B.allNotes(), k = notes.map(function (n) { return n.id; }).indexOf(id);
    var end = slides[slides.length - 1], links = el("p", "deck-end");
    var home = el("a", "", "목차"); home.href = B.BASE + "index.html"; links.appendChild(home);
    if (k >= 0 && notes[k + 1]) { var nx = el("a", "next", notes[k + 1].title + " →"); nx.href = B.BASE + notes[k + 1].href; links.appendChild(nx); }
    end.appendChild(links);

    function show(n) {
      i = Math.min(Math.max(n, 0), slides.length - 1);
      slides.forEach(function (s, j) { s.classList.toggle("on", j === i); });
      count.textContent = (i + 1) + " / " + slides.length;
      fill.style.width = ((i + 1) / slides.length * 100) + "%";
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
      try { history.replaceState(null, "", "#" + (i + 1)); } catch (e) {}
    }
    prev.onclick = function () { show(i - 1); };
    next.onclick = function () { show(i + 1); };

    function typing(t) { return t && /INPUT|TEXTAREA|SELECT/.test(t.tagName); }
    document.addEventListener("keydown", function (e) {
      if (typing(e.target) || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); show(i + 1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); show(i - 1); }
      else if (e.key === "Home") show(0);
      else if (e.key === "End") show(slides.length - 1);
    });

    // 빈 곳을 누르면 넘김(왼쪽 1/3은 되돌림). 문제·링크·버튼·글 선택은 건드리지 않는다
    document.querySelector(".deck").addEventListener("click", function (e) {
      if (e.target.closest("a, button, input, textarea, label, .check, pre, details")) return;
      if (String(window.getSelection && window.getSelection()).length) return;
      show(e.clientX < window.innerWidth / 3 ? i - 1 : i + 1);
    });

    var x0 = null, y0 = null;
    document.addEventListener("touchstart", function (e) {
      // 옆으로 밀어 보는 그림·코드·문제 위에서 시작한 밀기는 넘기기로 쓰지 않는다
      if (e.target.closest(".fig, pre, .check, .table-wrap")) { x0 = null; return; }
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(dx < 0 ? i + 1 : i - 1);
      x0 = null;
    }, { passive: true });

    // 문제 그리기
    var boxes = [].slice.call(document.querySelectorAll(".check[data-q]"));
    if (boxes.length) B.loadQuiz([id], function () {
      var qs = B.QUIZ[id] || [];
      boxes.forEach(function (box) {
        var q = qs.filter(function (x) { return x.id === box.getAttribute("data-q"); })[0];
        if (q) B.renderQ(box, id, q);
      });
    });

    show(i);
  });
})();
