"""두 책(learn, bigdata) 전체를 한 번에 점검한다. 아무것도 고치지 않고 보고만 한다.

쓰는 법:  python learn/tools/audit.py        (D:/Study에서)
- 장 파일마다: 문제 파일, 본문 check id, 객관식 정답·해설, 태그 짝, 필수 자리
- 깨진 내부 링크(같은 저장소 안의 .html·.js·.css)
- 건너뛰는 단원(BDA_SKIP)을 가리키는 문장
- 분량이 유난히 적은 장(본문 글자 수 기준)과 그림·문제가 적은 장
- 등록되지 않은 장 파일, 등록됐는데 파일이 없는 장
"""
import io, os, re, json, subprocess, sys
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.stdout.reconfigure(encoding="utf-8")

def node_json(js):
    out = subprocess.run(["node", "-e", js], capture_output=True, text=True, encoding="utf-8")
    if out.returncode: raise SystemExit(out.stderr)
    return json.loads(out.stdout)

def load_book(book):
    js = ("global.window={};require(%s);var C=window.BDA_CHAPTERS,S=window.BDA_SUBJECTS,out=[];"
          "if(C){Object.keys(C).forEach(function(u){C[u].forEach(function(c){out.push({id:c.id,href:c.href,unit:u})})})}"
          "else{S.forEach(function(s){s.notes.forEach(function(n){out.push({id:n.id,href:n.href,unit:s.name})})})}"
          "console.log(JSON.stringify({ch:out,skip:window.BDA_SKIP||[]}))") % json.dumps(os.path.join(ROOT, book, "notes.js"))
    return node_json(js)

def quiz(book, cid):
    p = os.path.join(ROOT, book, "quiz", cid + ".js")
    if not os.path.exists(p): return None
    js = ("global.window={};require(%s);var a=(window.BDA_QUIZ||{})[%s]||null;"
          "console.log(JSON.stringify(a&&a.map(function(q){return {id:q.id,type:q.type,answer:q.answer,"
          "n:q.options?q.options.length:0,why:q.options?q.options.every(function(o){return !!o.why}):true}})))") % (json.dumps(p), json.dumps(cid))
    return node_json(js)

class Text(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip = 0; self.n = 0; self.stack = []; self.bad = 0
        self.links = []
    VOID = {"meta", "link", "br", "img", "input", "hr", "source", "path", "line", "rect", "circle", "polygon", "polyline", "ellipse", "use", "stop", "tspan_"}
    def handle_starttag(self, t, a):
        if t in ("script", "style", "svg"): self.skip += 1
        if t not in self.VOID: self.stack.append(t)
        self.handle_startendtag(t, a)
    def handle_startendtag(self, t, a):
        self.links.extend(value for name, value in a if name in ("href", "src") and value)
    def handle_endtag(self, t):
        if t in ("script", "style", "svg"): self.skip -= 1
        if t in self.VOID: return
        if self.stack and self.stack[-1] == t: self.stack.pop()
        elif t in self.stack:
            while self.stack and self.stack[-1] != t: self.stack.pop(); self.bad += 1
            self.stack.pop()
        else: self.bad += 1
    def handle_data(self, d):
        if not self.skip: self.n += len(d.strip())

report = {}
def add(kind, msg): report.setdefault(kind, []).append(msg)

sizes = []
for book in ("learn", "bigdata"):
    data = load_book(book)
    skip = set(data["skip"])
    registered = set()
    for c in data["ch"]:
        path = os.path.join(ROOT, book, c["href"])
        registered.add(os.path.normpath(path))
        tag = "%s/%s" % (book, c["id"])
        if not os.path.exists(path): add("등록됐는데 파일 없음", tag); continue
        html = io.open(path, encoding="utf-8").read()
        m = re.search(r'data-note="([^"]+)"', html)
        if not m or m.group(1) != c["id"]: add("data-note 불일치", "%s (%s)" % (tag, m and m.group(1)))
        for need in ['id="quiz"', 'id="tools"', "js/core.js", "js/note.js", "</html>"]:
            if need not in html: add("필수 자리 없음", "%s: %s" % (tag, need))
        if html.count("<svg") != html.count("</svg>"): add("svg 짝", tag)
        t = Text(); t.feed(html)
        if t.bad > 2: add("태그 짝 의심", "%s (%d)" % (tag, t.bad))
        q = quiz(book, c["id"])
        nfig = html.count('class="fig-svg"') + html.count("<img")
        if q is None: add("문제 파일 없음", tag); nq = 0
        else:
            nq = len(q); ids = [x["id"] for x in q]
            for x in q:
                if x["type"] == "mc" and (x["answer"] is None or x["answer"] >= x["n"] or not x["why"]): add("객관식 정답·해설", "%s %s" % (tag, x["id"]))
            for d in re.findall(r'class="check" data-q="([^"]+)"', html):
                if d not in ids: add("본문 check가 문제에 없음", "%s %s" % (tag, d))
        sizes.append((t.n, nfig, nq, tag))
        # 건너뛰는 단원 언급
        for s in skip:
            if re.search(r"(?<![A-Z0-9])%s(?![0-9])" % s, re.sub(r"<script.*?</script>", "", html, flags=re.S)):
                add("건너뛴 단원 언급", "%s → %s" % (tag, s))
        # 내부 링크
        for h in t.links:
            url = urlsplit(h)
            href = unquote(url.path)
            if url.scheme or url.netloc or not href.endswith((".html", ".js", ".css")): continue
            target = os.path.normpath(os.path.join(os.path.dirname(path), href))
            if not os.path.exists(target): add("깨진 링크", "%s → %s" % (tag, h))
    # 등록 안 된 장 파일
    for d, _, fs in os.walk(os.path.join(ROOT, book, "notes")):
        for f in fs:
            if f.endswith(".html") and os.path.normpath(os.path.join(d, f)) not in registered:
                add("등록 안 된 파일", os.path.relpath(os.path.join(d, f), ROOT))
        if not fs and not _: add("빈 폴더", os.path.relpath(d, ROOT))

sizes.sort()
print("장 수:", len(sizes))
med = sizes[len(sizes) // 2][0]
print("본문 글자 수 중앙값:", med, "/ 최소 10개:")
for n, f, q, tag in sizes[:10]: print("   %6d자  그림 %d  문제 %d  %s" % (n, f, q, tag))
thin = [s for s in sizes if s[0] < med * 0.45 or s[1] == 0 or s[2] < 6]
print("얇은 장(중앙값의 45% 미만, 그림 0개, 문제 6개 미만):", len(thin))
for n, f, q, tag in thin[:40]: print("   %6d자  그림 %d  문제 %d  %s" % (n, f, q, tag))
for k, v in report.items():
    print("\n[%s] %d건" % (k, len(v)))
    for x in v[:25]: print("  ", x)
    if len(v) > 25: print("   … 외 %d건" % (len(v) - 25))
