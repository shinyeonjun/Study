/* 단원 안내(unit.html?u=AR04): 다루는 개념, 장 목록, 먼저 볼 단원, 이어지는 단원 */
(function () {
  var B = window.BDA, el = B.el;

  document.addEventListener("DOMContentLoaded", function () {
    var G = B.G, page = document.getElementById("unit");
    if (!page) return;
    var id = (location.search.match(/[?&]u=([A-Z]{1,2}\d{2})/) || [])[1], u = id && G.unit(id);
    if (!u) {
      page.appendChild(el("h1", "", "단원을 찾지 못했습니다"));
      var back = el("a", "", "← 목차로");
      back.href = "index.html";
      page.appendChild(back);
      return;
    }
    var ar = G.area(u.area);
    document.title = u.id + " " + u.title + " · 공부 교재";
    var crumb = document.querySelector(".crumb");
    if (crumb) crumb.textContent = ar.name;

    B.loadQuiz(G.chapters(id).map(function (c) { return c.id; }), function () {
      var s = B.load();
      var h = el("header", "chapter");
      h.appendChild(el("p", "chap-sub", u.area + " " + ar.name + " · " + ar.depth));
      h.appendChild(el("p", "chap-num", u.id));
      h.appendChild(el("h1", "", u.title));
      page.appendChild(h);

      page.appendChild(el("h2", "", "다루는 개념"));
      var ul = el("ul", "concepts");
      u.concepts.split(/[,;]\s*/).forEach(function (c) { if (c.trim()) ul.appendChild(el("li", "", c.trim())); });
      page.appendChild(ul);

      page.appendChild(el("h2", "", "장"));
      var chs = G.chapters(id);
      if (chs.length) {
        var ol = el("ol", "ch-list");
        chs.forEach(function (ch, i) {
          var x = B.noteStatus(ch.id, s), li = el("li"), a = el("a", "", ch.title);
          a.href = ch.href;
          li.appendChild(el("span", "no", (i + 1) + "장"));
          li.appendChild(a);
          li.appendChild(el("span", "st " + x.state, G.label(x.state)));
          ol.appendChild(li);
        });
        page.appendChild(ol);
      } else if (G.skipped(id)) {
        var sk = el("div", "box");
        sk.appendChild(el("p", "", "이미 아는 기초라서 이 교재에서는 건너뛰는 단원입니다. 본문은 쓰지 않습니다."));
        page.appendChild(sk);
      } else if (u.area === "BD") {
        var bd = el("div", "box");
        var bp = el("p", "", "빅분기 시험 내용은 따로 있는 책 ");
        var ba = el("a", "", "빅분기 노트");
        ba.href = "../bigdata/index.html";
        bp.appendChild(ba);
        bp.appendChild(document.createTextNode("에 씁니다. 이 단원 안내는 시험 내용과 연결되는 공통 기초(아래 ‘먼저 볼 단원’)를 찾는 데 씁니다."));
        bd.appendChild(bp);
        page.appendChild(bd);
      } else {
        var box = el("div", "box warn");
        box.appendChild(el("p", "", "본문 준비 전입니다. 이 단원의 장은 아직 쓰지 않았습니다. 위의 개념 목록과 아래 연결만 먼저 볼 수 있습니다."));
        page.appendChild(box);
      }

      function rows(title, ids, empty) {
        page.appendChild(el("h2", "", title));
        if (!ids.length) { page.appendChild(el("p", "muted", empty)); return; }
        var blk = el("div", "area-block");
        ids.forEach(function (x) { blk.appendChild(G.row(x, s, { tag: x.slice(0, 2) === u.area ? "" : G.area(G.unit(x).area).name })); });
        page.appendChild(blk);
      }
      rows("먼저 볼 단원", u.pre.filter(function (x) { return !G.skipped(x); }), "없음. 바로 시작할 수 있습니다.");
      rows("이어지는 단원", G.next(id), "이 단원을 직접 앞내용으로 쓰는 단원은 없습니다.");


      var nav = el("nav", "pager"), back = el("a", "", "← 목차");
      back.href = "index.html#area-" + u.area;
      nav.appendChild(back);
      page.appendChild(nav);
    });
  });
})();
