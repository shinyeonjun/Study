/* 복습 페이지: 여러 노트의 문제를 섞어서 한 문제씩 푼다.
   review.html          오늘 복습할 문제
   review.html?wrong=1  오답 모음 다시 풀기
   어느 노트 문제인지는 풀고 난 뒤에 보여 준다(무슨 개념인지 스스로 알아채는 것도 연습이다). */
(function () {
  var B = window.BDA, el = B.el;
  var LIMIT = 20; // 하루에 한 번에 푸는 양. 밀렸으면 오래된 것부터

  document.addEventListener("DOMContentLoaded", function () {
    var box = document.getElementById("review");
    if (!box) return;
    var wrongMode = /[?&]wrong=1/.test(location.search);
    var title = document.getElementById("review-title");
    if (title && wrongMode) title.textContent = "오답 다시 풀기";
    var notes = B.allNotes();

    B.loadQuiz(notes.map(function (n) { return n.id; }), function () {
      var s = B.load(), items = [];
      notes.forEach(function (n) {
        (B.QUIZ[n.id] || []).forEach(function (q) {
          var st = s.q[n.id + "#" + q.id];
          if (wrongMode ? (st && st.wrong) : B.isDue(st)) items.push({ note: n, q: q, due: st.due || 0 });
        });
      });
      items.sort(function (a, b) { return a.due - b.due; });
      var total = items.length;
      var queue = B.shuffle(items.slice(0, LIMIT));
      var done = 0, missed = 0, size = queue.length;

      function finish() {
        box.textContent = "";
        var p = el("div", "panel");
        if (!size) {
          p.appendChild(el("h2", "", wrongMode ? "오답 모음이 비어 있습니다" : "오늘 복습할 문제가 없습니다"));
          p.appendChild(el("p", "muted", wrongMode ? "틀린 문제가 생기면 여기에서 다시 풀 수 있습니다." : "새 노트를 공부하거나, 내일 다시 오면 됩니다."));
        } else {
          p.appendChild(el("h2", "", "끝났습니다"));
          p.appendChild(el("p", "", size + "문제를 모두 맞힐 때까지 풀었습니다." + (missed ? " 처음에 틀린 " + missed + "문제는 내일 다시 나옵니다." : "")));
          if (total > size) p.appendChild(el("p", "muted", "아직 " + (total - size) + "문제가 더 남아 있습니다. 한 번에 " + LIMIT + "문제씩만 냅니다."));
        }
        var a = el("a", "btn", "홈으로");
        a.href = "index.html";
        p.appendChild(a);
        box.appendChild(p);
      }

      function next() {
        if (!queue.length) return finish();
        var it = queue.shift();
        box.textContent = "";
        box.appendChild(el("p", "prog", "남은 문제 " + (queue.length + 1) + " · 맞힌 문제 " + done + " / " + size));
        var card = el("div", "qcard");
        box.appendChild(card);
        B.renderQ(card.appendChild(el("div")), it.note.id, it.q, {
          onDone: function (correct) {
            if (!correct) { if (!it.missed) { it.missed = true; missed++; } return; }
            done++;
            var src = el("p", "q-src");
            src.appendChild(document.createTextNode("이 문제의 노트: "));
            var a = el("a", "", it.note.subject.short + " · " + it.note.title);
            a.href = it.note.href;
            src.appendChild(a);
            card.appendChild(src);
            var b = el("button", "btn", queue.length ? "다음 문제" : "마치기");
            b.type = "button";
            b.onclick = next;
            box.appendChild(b);
            b.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        });
      }
      next();
    });
  });
})();
