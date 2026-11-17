"""learn/notes/ 아래의 장 HTML을 모두 읽어 notes.js의 BDA_CHAPTERS를 다시 만들고, 장마다 검사한다.

쓰는 법:  python tools/register_chapters.py
- 장 파일 이름: notes/<분야 소문자>/<단원ID 소문자>-<n>.html,  <body data-note="<단원ID>-<n>">
- 장 제목은 <h1>에서, 순서는 단원 → 장 번호.
- 검사: data-note와 파일 이름 일치, 단원 ID가 지도에 있음, quiz/<장 id>.js 존재·키 일치,
  본문 .check의 data-q가 문제 파일에 있음, 객관식 정답 번호가 보기 안에 있고 모든 보기에 why,
  필요한 스크립트·자리(#quiz, #tools, .toc)가 있음, 문을 닫지 않은 HTML이 없음.
검사에 실패한 장은 등록하지 않고 이유를 출력한다.
- tools/reviewed.txt에 적힌(검토를 통과한) 장만 등록한다. 나머지는 "검토 대기"로 출력만 한다.
"""
import io, os, re, json, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
NOTES = os.path.join(ROOT, "notes.js")

src = io.open(NOTES, encoding="utf-8").read()
unit_ids = set(re.findall(r'\{"id": "([A-Z]{1,2}\d{2})", "area"', src))
order = re.findall(r'\{"id": "([A-Z]{1,2}\d{2})", "area"', src)

def quiz_info(qpath, cid):
    js = ("global.window={};require(%s);var a=(window.BDA_QUIZ||{})[%s];"
          "console.log(JSON.stringify(a?a.map(function(q){return {id:q.id,type:q.type,"
          "answer:q.answer,n:q.options?q.options.length:0,why:q.options?q.options.every(function(o){return !!o.why}):true}}):null))") % (json.dumps(qpath), json.dumps(cid))
    out = subprocess.run(["node", "-e", js], capture_output=True, text=True, encoding="utf-8")
    if out.returncode: return None, out.stderr.strip().splitlines()[-1] if out.stderr else "node error"
    return json.loads(out.stdout or "null"), None

REVIEWED = set(l.strip() for l in io.open(os.path.join(HERE, "reviewed.txt"), encoding="utf-8") if l.strip() and not l.startswith("#"))
found, problems, waiting = {}, [], []
for dirpath, _, files in os.walk(os.path.join(ROOT, "notes")):
    for f in sorted(files):
        if not f.endswith(".html"): continue
        path = os.path.join(dirpath, f)
        rel = os.path.relpath(path, ROOT).replace(os.sep, "/")
        html = io.open(path, encoding="utf-8").read()
        m = re.search(r'data-note="([^"]+)"', html)
        cid = m.group(1) if m else None
        errs = []
        fm = re.match(r"^([a-z]{1,2}\d{2})-(\d+)\.html$", f)
        if not fm: errs.append("파일 이름 형식")
        elif cid != fm.group(1).upper() + "-" + fm.group(2): errs.append("data-note(%s)와 파일 이름 불일치" % cid)
        uid = cid.rsplit("-", 1)[0] if cid else None
        if uid not in unit_ids: errs.append("지도에 없는 단원 %s" % uid)
        t = re.search(r"<h1>(.*?)</h1>", html, re.S)
        title = re.sub(r"<[^>]+>", "", t.group(1)).strip() if t else None
        if not title: errs.append("h1 없음")
        for need in ['id="quiz"', 'id="tools"', 'id="toc"', "../../notes.js", "../../js/core.js", "../../js/note.js", "</html>"]:
            if need not in html: errs.append("없음: " + need)
        if html.count("<svg") != html.count("</svg>"): errs.append("svg 열고 닫기 수 다름")
        if html.count("<figure") != html.count("</figure>"): errs.append("figure 열고 닫기 수 다름")
        qpath = os.path.join(ROOT, "quiz", "%s.js" % cid)
        if not os.path.exists(qpath): errs.append("문제 파일 없음")
        else:
            qs, err = quiz_info(qpath, cid)
            if err or qs is None: errs.append("문제 파일 읽기 실패: %s" % (err or "키 불일치"))
            else:
                ids = [q["id"] for q in qs]
                if len(ids) != len(set(ids)): errs.append("문제 id 중복")
                for q in qs:
                    if q["type"] == "mc" and (q["answer"] is None or q["answer"] >= q["n"] or not q["why"]):
                        errs.append("객관식 %s: 정답 번호 또는 why" % q["id"])
                for d in re.findall(r'class="check" data-q="([^"]+)"', html):
                    if d not in ids: errs.append("본문 check %s가 문제 파일에 없음" % d)
        if errs:
            problems.append((rel, errs)); continue
        if cid not in REVIEWED:
            waiting.append(cid); continue
        n = int(cid.rsplit("-", 1)[1])
        found.setdefault(uid, []).append((n, {"id": cid, "title": title, "href": rel}))

# 빈 번호(예: 1, 3만 있고 2가 없음) 경고
for uid, chs in found.items():
    nums = sorted(n for n, _ in chs)
    if nums != list(range(1, len(nums) + 1)): problems.append((uid, ["장 번호가 비어 있음: %s" % nums]))

lines = ["window.BDA_CHAPTERS = {"]
units = [u for u in order if u in found]
for i, uid in enumerate(units):
    chs = [c for _, c in sorted(found[uid], key=lambda x: x[0])]
    lines.append("  %s: [" % uid)
    lines.append(",\n".join("    " + json.dumps(c, ensure_ascii=False) for c in chs))
    lines.append("  ]" + ("," if i < len(units) - 1 else ""))
lines.append("};")
a = src.index("window.BDA_CHAPTERS = {")
b = src.index("};", a) + 2
src = src[:a] + "\n".join(lines) + src[b:]
io.open(NOTES, "w", encoding="utf-8", newline="\n").write(src)

total = sum(len(v) for v in found.values())
sys.stdout.reconfigure(encoding="utf-8")
print("등록: 단원 %d개, 장 %d개" % (len(units), total))
for uid in units: print("  %s: %s" % (uid, ", ".join(c["id"] for _, c in sorted(found[uid], key=lambda x: x[0]))))
if waiting: print("검토 대기(등록 안 함): %s" % ", ".join(sorted(waiting)))
if problems:
    print("문제 있음:")
    for rel, errs in problems: print("  %s: %s" % (rel, "; ".join(errs)))
