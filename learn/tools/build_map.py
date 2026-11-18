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
def track(*area_codes): return [u["id"] for u in units if u["area"] in area_codes]

PATHS = [
    {"id": "start", "name": "공통 출발", "targets": rng("U", 1, 5) + rng("AR", 1, 7) + ["AR10"] + rng("PY", 1, 8) + rng("AL", 1, 5) + rng("DA", 1, 4) + ["U06", "RS01"]},
    {"id": "analysis", "name": "데이터 분석 실습", "targets": rng("PY", 9, 11) + rng("PY", 13, 14) + rng("DA", 5, 10)},
    {"id": "bd", "name": "빅분기", "targets": rng("BD", 1, 5)},
    {"id": "data", "name": "데이터·통계", "targets": track("DA", "ST") + ["DB02", "ML02", "ML10", "ML11"] + rng("RS", 5, 9)},
    {"id": "ml", "name": "머신러닝", "targets": track("ML")},
    {"id": "dl", "name": "AI·딥러닝", "targets": track("AI", "DL") + ["SP01", "SP02", "SP09"]},
    {"id": "rl", "name": "강화학습", "targets": track("RL") + ["SP06"]},
    {"id": "nw", "name": "네트워크", "targets": track("NW") + ["DB08", "SP11"]},
    {"id": "math", "name": "수학 심화", "targets": track("AR", "AL", "DM", "LA", "CA", "RA", "PR", "OP") + ["SP10"]},
    {"id": "research", "name": "연구 과제", "targets": track("RS")},
]
# 홈 목차: 성격별 3축 9범주 (2026-11-19 사용자 결정). 범주는 과목(분야)이 아니라 단원 단위로 나눈다.
# 한 과목 안에 이론과 도구가 섞여 있으면 단원마다 맞는 범주로 보낸다. 건너뛰는 단원은 넣지 않는다.
CATS = [
    {"id": "math", "axis": "theory", "name": "수학",
     "units": rng("AL", 7, 9) + track("LA", "CA", "RA", "PR", "DM", "OP")},
    {"id": "stat", "axis": "theory", "name": "통계",
     "units": ["DA02", "DA03", "DA04", "DA05", "DA08"] + track("ST"), "labels": {"DA": "자료의 분포와 표본"}},
    {"id": "ai", "axis": "theory", "name": "AI·머신러닝 이론", "units": track("AI", "ML", "DL", "RL")},
    {"id": "cs", "axis": "theory", "name": "컴퓨터 과학 이론",
     "units": track("CS") + ["SY01", "SY02", "SY03", "SY04", "SY05", "SY08", "SY09", "SY10", "SY12", "SY13"]
              + track("NW") + ["DB01", "DB04", "DB05", "DB08", "DB09", "DB10", "DB11"],
     "labels": {"SY": "컴퓨터 구조·운영체제", "DB": "데이터베이스 원리와 내부"}},
    {"id": "tools", "axis": "method", "name": "프로그래밍 도구", "units": rng("PY", 6, 14) + ["SY06", "SY07", "SY11"],
     "labels": {"PY": "Python 실전·numpy·pandas", "SY": "터미널·Git·성능 측정"}},
    {"id": "practice", "axis": "method", "name": "데이터 분석 실무",
     "units": ["DA01", "DA06", "DA07", "DA09", "DA10", "DB02", "DB03", "DB06", "DB07"],
     "labels": {"DA": "분석 설계·품질·보고", "DB": "SQL과 데이터 파이프라인"}},
    {"id": "research", "axis": "method", "name": "연구 방법", "units": track("RS")},
    {"id": "exam", "axis": "purpose", "name": "빅분기 시험", "units": track("BD")},
    {"id": "topics", "axis": "purpose", "name": "연구 주제 확장", "units": track("SP")},
]
AXES = [{"id": "theory", "name": "이론·지식"}, {"id": "method", "name": "방법·도구"}, {"id": "purpose", "name": "목적·응용"}]
GROUPS = [dict(ax, cats=[{"id": c["id"], "name": c["name"], "units": c["units"], "labels": c.get("labels", {})} for c in CATS if c["axis"] == ax["id"]]) for ax in AXES]

# 공부 순서(홈 왼쪽 '지금 할 공부'와 #plan 화면). 사용자: 고교 수학을 아는 컴퓨터 계열 대학생,
# 빅분기 준비와 모델 내부 연구가 목표 (2026-11-19). 단계 안 순서는 화면에서 선수관계로 정하고,
# 다른 단계에 있는 선수 단원은 그 단계보다 먼저 '앞내용'으로 끌려 나온다. main=False 단계는 차례를 기다리지 않는다.
# 건너뛰는 단원은 notes.js의 window.BDA_SKIP 한 곳에서만 관리한다
SKIP = json.loads(re.search(r"window\.BDA_SKIP = (\[.*?\]);", io.open(NOTES, encoding="utf-8").read()).group(1))
# 2026-11-19 사용자 결정: 본 줄기는 이론·지식 단원만. 방법·도구 단원은 이론 단원의 선수일 때만
# 그 앞에 '앞내용'으로 끌려 나오고, 나머지는 '필요할 때'(시험 실기·연구 실험을 시작할 때) 묶음에 둔다.
PLAN = [
    {"id": "warm", "name": "수학 몸풀기", "main": True, "note": "", "units": rng("AL", 7, 9)},
    {"id": "data", "name": "자료와 확률 기초", "main": True, "note": "",
     "units": ["DA02", "DA03", "DA04", "DA05", "DA08"] + rng("DM", 1, 3) + rng("PR", 1, 5)},
    {"id": "base", "name": "선형대수·미적분 기초", "main": True, "note": "", "units": rng("LA", 1, 5) + rng("CA", 1, 5)},
    {"id": "stat", "name": "확률·통계", "main": True, "note": "", "units": rng("PR", 6, 10) + rng("ST", 1, 10)},
    {"id": "math", "name": "선형대수·미적분 마무리", "main": True, "note": "", "units": rng("LA", 6, 8) + rng("CA", 6, 8)},
    {"id": "ml", "name": "머신러닝", "main": True, "note": "", "units": rng("OP", 1, 4) + rng("ML", 1, 12)},
    {"id": "dl", "name": "딥러닝과 모델 내부", "main": True, "note": "", "units": rng("DL", 1, 10) + rng("OP", 5, 8) + ["SP09"]},
    {"id": "adv", "name": "대학 심화", "main": True, "note": "",
     "units": rng("LA", 9, 14) + rng("CA", 9, 12) + track("RA") + rng("DM", 4, 9) + rng("PR", 11, 14) + rng("ST", 11, 15)
              + rng("OP", 9, 11) + rng("ML", 13, 16) + rng("DL", 11, 14) + track("AI", "RL")},
]
_planned = set(i for p in PLAN for i in p["units"])
_theory = set(i for c in CATS if c["axis"] == "theory" for i in c["units"])
PLAN.append({"id": "side", "name": "컴퓨터 과학 이론", "main": False, "note": "",
             "units": [u["id"] for u in units if u["id"] in _theory and u["id"] not in _planned and u["id"] not in SKIP]})
PLAN.append({"id": "need", "name": "필요할 때", "main": False, "note": "",
             "units": [u["id"] for u in units if u["id"] not in _theory and u["id"] not in _planned and u["id"] not in SKIP]})

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
_cat = [i for c in CATS for i in c["units"]]
for i in _cat:
    if i not in byid: errors.append("범주의 %s가 없음" % i)
    if i in SKIP: errors.append("범주에 건너뛰는 단원 %s" % i)
_cd = sorted(set(i for i in _cat if _cat.count(i) > 1))
if _cd: errors.append("두 범주에 들어간 단원: %s" % _cd)
_cm = sorted(set(ids) - set(_cat) - set(SKIP))
if _cm: errors.append("범주에 빠진 단원: %s" % _cm)
for p in PATHS:
    for t in p["targets"]:
        if t not in byid: errors.append("경로 %s의 %s가 없음" % (p["id"], t))
_all_plan = [i for p in PLAN for i in p["units"]]
for i in _all_plan:
    if i not in byid: errors.append("공부 순서의 %s가 없음" % i)
    if i in SKIP: errors.append("공부 순서에 건너뛰는 단원 %s" % i)
_dup = sorted(set(i for i in _all_plan if _all_plan.count(i) > 1))
if _dup: errors.append("공부 순서에 두 번 나오는 단원: %s" % _dup)
_miss = sorted(set(ids) - set(_all_plan) - set(SKIP))
if _miss: errors.append("공부 순서에 빠진 단원: %s" % _miss)
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
block.append("  paths: [\n" + ",\n".join("    " + js(p) for p in PATHS) + "\n  ],")
block.append("  plan: [\n" + ",\n".join("    " + js(p) for p in PLAN) + "\n  ]")
block.append("};")
block.append("// ---- 지도 끝")
block = "\n".join(block)

s = s[:a] + block + s[b:]
io.open(NOTES, "w", encoding="utf-8", newline="\n").write(s)
print("통과: 분야 %d, 단원 %d, 경로 %d. notes.js 갱신" % (len(areas), len(units), len(PATHS)))
