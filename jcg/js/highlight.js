/* 작은 코드 색칠기: C, Java, Python, SQL 키워드·문자열·숫자·주석을 구분한다.
   인터넷 없이도 동작하도록 외부 라이브러리를 쓰지 않는다. */
(function () {
  var KW = {
    c: "if else for while do switch case default break continue return goto sizeof typedef struct union enum static const extern void unsigned signed include define NULL",
    java: "if else for while do switch case default break continue return new class interface extends implements public private protected static final abstract this super try catch finally throw throws import package instanceof enum null true false default var",
    python: "if elif else for while break continue return def class import from as in not and or is None True False lambda global nonlocal pass try except finally raise with yield del print",
    sql: "SELECT FROM WHERE GROUP BY HAVING ORDER ASC DESC INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE VIEW INDEX DROP ALTER ADD MODIFY COLUMN PRIMARY FOREIGN KEY REFERENCES UNIQUE NOT NULL CHECK DEFAULT CONSTRAINT AND OR IN IS LIKE BETWEEN EXISTS ALL ANY SOME DISTINCT AS JOIN INNER LEFT RIGHT FULL OUTER CROSS ON UNION INTERSECT EXCEPT MINUS CASCADE RESTRICT GRANT REVOKE TO WITH OPTION COMMIT ROLLBACK SAVEPOINT TRUNCATE COUNT SUM AVG MAX MIN"
  };
  var TY = {
    c: "int char float double long short Node FILE",
    java: "int char float double long short boolean byte void String Integer Object System StringBuilder ArrayList HashMap HashSet List Map Set Arrays Math Thread Runnable Exception RuntimeException ArithmeticException NullPointerException ArrayIndexOutOfBoundsException ClassCastException Function",
    python: "int str float list dict set tuple len range type sorted map filter zip enumerate sum max min abs any all input self super",
    sql: "INT INTEGER VARCHAR CHAR DATE NUMBER"
  };
  function set(s, upper) {
    var o = {};
    s.split(" ").forEach(function (w) { o[upper ? w.toUpperCase() : w] = 1; });
    return o;
  }
  var K = {}, T = {};
  Object.keys(KW).forEach(function (l) { K[l] = set(KW[l], l === "sql"); T[l] = set(TY[l], l === "sql"); });

  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var RE = {
    c: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?\b)|(#\s*\w+)|([A-Za-z_]\w*)/g,
    java: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?[fFdDlL]?\b)|(@\w+)|([A-Za-z_]\w*)/g,
    python: /(#[^\n]*)|([fr]?"(?:\\.|[^"\\\n])*"|[fr]?'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?\b)|(@\w+)|([A-Za-z_]\w*)/g,
    sql: /(--[^\n]*)|('(?:''|[^'\n])*')|(\b\d+(?:\.\d+)?\b)|(\0)|([A-Za-z_가-힣]\w*)/g
  };

  function hl(src, lang) {
    lang = RE[lang] ? lang : "c";
    var re = new RegExp(RE[lang].source, "g"), out = "", last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      var t = m[0], cls = "";
      if (m[1]) cls = "tk-c";
      else if (m[2]) cls = "tk-s";
      else if (m[3]) cls = "tk-n";
      else if (m[4]) cls = "tk-p";
      else if (m[5]) {
        var key = lang === "sql" ? t.toUpperCase() : t;
        if (K[lang][key]) cls = "tk-k";
        else if (T[lang][key]) cls = "tk-t";
      }
      out += cls ? '<span class="' + cls + '">' + esc(t) + "</span>" : esc(t);
      last = m.index + t.length;
    }
    return out + esc(src.slice(last));
  }

  function run(root) {
    (root || document).querySelectorAll("pre.code code[data-lang]:not([data-done])").forEach(function (el) {
      el.innerHTML = hl(el.textContent, el.getAttribute("data-lang"));
      el.setAttribute("data-done", "1");
    });
  }

  window.JCG = window.JCG || {};
  window.JCG.highlight = hl;
  window.JCG.highlightAll = run;
  window.JCG.esc = esc;
})();
