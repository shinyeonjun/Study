/* 장 페이지의 도해(SVG)를 검사한다. 브라우저 개발자 도구 콘솔이나 자동 검사에서 장 페이지를 연 채로 실행한다.
   - 글자끼리 겹침 (가로·세로 모두 3px 넘게 겹치면)
   - 글자가 그림 밖으로 나감
   결과: [{fig: 그림 번호, kind, a, b}] 배열. 비어 있으면 통과. */
(function () {
  var out = [];
  document.querySelectorAll("svg.fig-svg").forEach(function (svg, fi) {
    var vb = svg.viewBox.baseVal, texts = [].slice.call(svg.querySelectorAll("text"));
    var boxes = texts.map(function (t) {
      try { var b = t.getBBox(); return { t: t.textContent.trim(), x1: b.x, y1: b.y, x2: b.x + b.width, y2: b.y + b.height }; }
      catch (e) { return null; }
    }).filter(function (b) { return b && b.t; });
    boxes.forEach(function (b) {
      if (b.x1 < vb.x - 1 || b.y1 < vb.y - 1 || b.x2 > vb.x + vb.width + 1 || b.y2 > vb.y + vb.height + 1)
        out.push({ fig: fi + 1, kind: "밖으로 나감", a: b.t });
    });
    for (var i = 0; i < boxes.length; i++) for (var j = i + 1; j < boxes.length; j++) {
      var a = boxes[i], c = boxes[j];
      var ox = Math.min(a.x2, c.x2) - Math.max(a.x1, c.x1), oy = Math.min(a.y2, c.y2) - Math.max(a.y1, c.y1);
      if (ox > 3 && oy > 3) out.push({ fig: fi + 1, kind: "글자 겹침", a: a.t, b: c.t });
    }
  });
  return out;
})();
