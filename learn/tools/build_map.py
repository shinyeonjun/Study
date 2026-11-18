"""지식 지도(LEARNING_MAP.md)를 읽어 notes.js의 지도 부분을 다시 만든다.

쓰는 법:  python learn/tools/build_map.py [LEARNING_MAP.md 경로]
- notes.js 안의 "// ---- 지도 시작" 과 "// ---- 지도 끝" 사이만 바꾼다. 장 목록(CHAPTERS)은 손대지 않는다.
- 만든 뒤 기존 단원 ID 보존, ID 중복, 없는 선수, 선수관계 순환을 검사한다.
  표 기반 강화학습(RL01~RL08)의 앞내용에 미적분(CA)·딥러닝(DL)이 끼지 않음.
"""
import io, json, re, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))
NOTES = os.path.join(HERE, "..", "notes.js")
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "LEARNING_MAP.md")

text = io.open(SRC, encoding="utf-8").read()
part = text[text.index("## 4. 분야별 개념 목록"):text.index("## 5. 관심에 따라")]

DEPTH = {"BD": "시험", "SP": "선택", "RS": "반복"}
areas, units = [], []
cur = None
for line in part.splitlines():
    m = re.match(r"^### ([A-Z]{1,2})\. (.+?)(?: — (.+))?$", line.strip())
    if m:
        code, name, depth = m.group(1), m.group(2).strip(), (m.group(3) or "").strip()
        cur = {"code": code, "name": name, "depth": DEPTH.get(code, depth)}
        areas.append(cur)
        continue
    m = re.match(r"^\| ([A-Z]{1,2}\d{2}) \| (.+?) \| (.+?) \| (.+?) \|$", line.strip())
    if m and cur:
        uid, title, concepts, pre = m.groups()
        assert uid[:-2] == cur["code"], (uid, cur["code"])
        pre = [] if pre.strip() == "없음" else [p.strip() for p in pre.split(",")]
        units.append({"id": uid, "area": cur["code"], "title": title.strip(), "concepts": concepts.strip(), "pre": pre})

# 관심별 경로: 5절 표의 목표 지점. 앞내용은 화면에서 선수관계를 따라 펼친다.
def rng(prefix, a, b): return ["%s%02d" % (prefix, i) for i in range(a, b + 1)]
PATHS = [
    {"id": "start", "name": "공통 출발", "targets": rng("U", 1, 5) + rng("AR", 1, 7) + ["AR10"] + rng("PY", 1, 8) + rng("AL", 1, 5) + rng("DA", 1, 4) + ["U06", "RS01"]},
    {"id": "analysis", "name": "데이터 분석 실습", "targets": rng("PY", 9, 11) + rng("DA", 5, 8)},
    {"id": "bd", "name": "빅분기", "targets": rng("BD", 1, 5)},
    {"id": "data", "name": "데이터·통계", "targets": ["DA07", "DB02", "DA08"] + rng("ST", 1, 9) + ["ML02", "ML10", "ML11"] + rng("RS", 5, 9)},
    {"id": "ml", "name": "머신러닝", "targets": rng("ML", 1, 12)},
    {"id": "dl", "name": "AI·딥러닝", "targets": ["AI01"] + rng("DL", 1, 10) + ["SP01", "SP02", "SP09"]},
    {"id": "rl", "name": "강화학습", "targets": rng("RL", 1, 12) + ["SP06"]},
    {"id": "nw", "name": "네트워크", "targets": [u["id"] for u in units if u["area"] == "NW"] + ["DB08", "SP11"]},
    {"id": "math", "name": "수학 심화", "targets": [u["id"] for u in units if u["area"] in {"AR", "AL", "DM", "LA", "CA", "PR", "OP"}] + ["SP10"]},
]
GROUPS = [
    {"id": "math", "name": "수학", "areas": ["LA", "CA", "PR", "DM", "OP", "AL", "AR"]},
    {"id": "data", "name": "데이터와 통계", "areas": ["DA", "ST", "DB"]},
    {"id": "ai", "name": "AI와 학습", "areas": ["AI", "ML", "DL", "RL"]},
    {"id": "computing", "name": "프로그래밍과 컴퓨터", "areas": ["PY", "CS", "SY"]},
    {"id": "network", "name": "네트워크", "areas": ["NW"]},
    {"id": "research", "name": "연구 방법", "areas": ["RS", "U"]},
    {"id": "applications", "name": "응용과 심화", "areas": ["SP"]},
    {"id": "exam", "name": "빅데이터분석기사", "areas": ["BD"]},
]

# ---- 검사 ----
ids = [u["id"] for u in units]
byid = {u["id"]: u for u in units}
s = io.open(NOTES, encoding="utf-8").read()
a, b = s.index("// ---- 지도 시작"), s.index("// ---- 지도 끝") + len("// ---- 지도 끝")
previous_ids = set(re.findall(r'\{"id": "([A-Z]{1,2}\d{2})", "area":', s[a:b]))
errors = []
if previous_ids - byid.keys(): errors.append("사라진 단원 ID: %s" % sorted(previous_ids - byid.keys()))
dup = sorted(set(i for i in ids if ids.count(i) > 1))
if dup: errors.append("중복 ID: %s" % dup)
for u in units:
    for p in u["pre"]:
        if p not in byid: errors.append("%s의 선수 %s가 없음" % (u["id"], p))
state = {}
def visit(i, stack):
    if i not in byid: return
    if state.get(i) == 2: return
    if state.get(i) == 1: errors.append("순환: %s" % " → ".join(stack + [i])); return
    state[i] = 1
    for p in byid[i]["pre"]: visit(p, stack + [i])
    state[i] = 2
for i in ids: visit(i, [])
def closure(i, seen=None):
    seen = set() if seen is None else seen
    if i not in byid: return seen
    for p in byid[i]["pre"]:
        if p not in seen:
            seen.add(p); closure(p, seen)
    return seen
for i in rng("RL", 1, 8):
    bad = sorted(x for x in closure(i) if x.startswith("CA") or x.startswith("DL"))
    if bad: errors.append("%s 앞내용에 %s" % (i, bad))
gset = sum((g["areas"] for g in GROUPS), [])
if sorted(gset) != sorted(a["code"] for a in areas): errors.append("묶음(GROUPS)에 빠지거나 남는 분야")
for p in PATHS:
    for t in p["targets"]:
        if t not in byid: errors.append("경로 %s의 %s가 없음" % (p["id"], t))
if errors:
    print("검사 실패"); [print(" -", e) for e in errors]; sys.exit(1)

# ---- notes.js에 쓰기 ----
def js(v): return json.dumps(v, ensure_ascii=False)
block = ["// ---- 지도 시작 (tools/build_map.py가 만든다. 직접 고치지 않는다)"]
block.append("window.BDA_MAP = {")
block.append('  source: "LEARNING_MAP.md",')
block.append("  groups: " + js(GROUPS) + ",")
block.append("  areas: [\n" + ",\n".join("    " + js(a) for a in areas) + "\n  ],")
block.append("  units: [\n" + ",\n".join("    " + js(u) for u in units) + "\n  ],")
block.append("  paths: [\n" + ",\n".join("    " + js(p) for p in PATHS) + "\n  ]")
block.append("};")
block.append("// ---- 지도 끝")
block = "\n".join(block)

s = s[:a] + block + s[b:]
io.open(NOTES, "w", encoding="utf-8", newline="\n").write(s)
print("통과: 분야 %d, 단원 %d, 경로 %d. notes.js 갱신" % (len(areas), len(units), len(PATHS)))
