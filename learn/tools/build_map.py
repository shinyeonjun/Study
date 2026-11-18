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
GROUPS = [
    # 홈 목차의 묶음. 과목 하나뿐인 묶음은 만들지 않는다. 묶음 안 순서 = 대체로 공부하는 순서
    {"id": "math", "name": "수학", "areas": ["AR", "AL", "LA", "CA", "PR", "DM", "OP", "RA"]},
    {"id": "data", "name": "데이터와 통계", "areas": ["DA", "ST", "BD"]},
    {"id": "ai", "name": "AI와 학습", "areas": ["AI", "ML", "DL", "RL"]},
    {"id": "computing", "name": "컴퓨터와 프로그래밍", "areas": ["PY", "CS", "SY", "NW", "DB"]},
    {"id": "research", "name": "공부와 연구", "areas": ["U", "RS", "SP"]},
]

# 공부 순서(홈 왼쪽 '지금 할 공부'와 #plan 화면). 사용자: 고교 수학을 아는 컴퓨터 계열 대학생,
# 빅분기 준비와 모델 내부 연구가 목표 (2026-11-19). 단계 안 순서는 화면에서 선수관계로 정하고,
# 다른 단계에 있는 선수 단원은 그 단계보다 먼저 '앞내용'으로 끌려 나온다. main=False 단계는 차례를 기다리지 않는다.
SKIP = ["AR01", "AR02", "AR03", "AR04", "AR05", "AR08", "AR09", "AL01", "AL02", "AL03"]
PLAN = [
    {"id": "warm", "name": "몸풀기", "main": True, "note": "아는 장은 확인 문제만 풀고 넘어가도 됩니다.",
     "units": rng("U", 1, 6) + ["RS01"] + rng("PY", 1, 8) + ["AR06", "AR07", "AR10"] + rng("AL", 4, 9)},
    {"id": "data", "name": "데이터와 확률 기초", "main": True, "note": "numpy·pandas로 자료를 직접 만지며 이산 확률까지 갑니다.",
     "units": rng("DA", 1, 8) + rng("PY", 9, 11) + rng("PR", 1, 5)},
    {"id": "base", "name": "선형대수·미적분 기초", "main": True, "note": "연속 확률과 회귀에 필요한 만큼만 먼저 합니다.",
     "units": rng("LA", 1, 5) + rng("CA", 1, 5)},
    {"id": "stat", "name": "확률·통계", "main": True, "note": "통계 단원을 하나 끝낼 때마다 빅분기 노트 2과목의 같은 내용을 읽습니다.",
     "units": rng("PR", 6, 10) + rng("ST", 1, 10) + ["BD01", "BD02"]},
    {"id": "math", "name": "선형대수·미적분 마무리", "main": True, "note": "고유값과 SVD는 모델 내부를 볼 때 그대로 쓰입니다.",
     "units": rng("LA", 6, 8) + rng("CA", 6, 8)},
    {"id": "ml", "name": "머신러닝", "main": True, "note": "빅분기 노트 3·4과목과 실기를 나란히 읽습니다.",
     "units": rng("OP", 1, 4) + rng("ML", 1, 12) + rng("BD", 3, 5)},
    {"id": "dl", "name": "딥러닝과 연구", "main": True, "note": "마지막의 모델 내부·해석 가능성(SP09)이 연구로 이어집니다.",
     "units": rng("DL", 1, 10) + rng("OP", 5, 8) + rng("RS", 2, 10) + ["SP09"]},
    {"id": "adv", "name": "대학 심화", "main": True, "note": "필요한 과목부터 골라 읽어도 됩니다.",
     "units": rng("LA", 9, 14) + rng("CA", 9, 12) + track("RA") + rng("PR", 11, 14) + rng("ST", 11, 15)
              + rng("OP", 9, 11) + rng("ML", 13, 16) + rng("DL", 11, 14) + track("AI", "RL")},
]
_planned = [i for p in PLAN for i in p["units"]]
PLAN.append({"id": "side", "name": "곁가지", "main": False, "note": "머리를 덜 쓰고 싶은 날 한 장씩 읽습니다.",
             "units": [u["id"] for u in units if u["id"] not in _planned and u["id"] not in SKIP]})

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
