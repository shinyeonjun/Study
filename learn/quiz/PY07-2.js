/* PY07-2 CSV와 JSON 주고받기 · 확인 문제
   type "mc"    객관식. options의 why에 그 보기가 왜 맞는지/틀린지 적는다. answer는 정답 보기의 순서(0부터).
   type "num"   숫자로 답하기. answer는 숫자, a는 풀이, steps는 미리 보여 줄 풀이 단계(이어서 풀기용).
   type "short" 내 말로 적기. a는 모범 답. 스스로 맞았는지 표시한다.
   id는 한번 정하면 바꾸지 않는다(복습 기록이 이 번호로 저장된다). */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["PY07-2"] = [
  {
    id: "q1", type: "mc",
    q: "본문의 scores.csv를 csv.DictReader로 읽었을 때 rows[0][\"국어\"]의 값과 형은?",
    options: [
      { t: "80, int", why: "CSV에는 '이 칸은 숫자'라는 정보가 없습니다. csv 모듈은 모든 칸을 문자열로 돌려줍니다." },
      { t: "'80', str", why: "정답. 읽은 값은 모두 문자열입니다. 계산하려면 int(row[\"국어\"])로 바꿔야 합니다." },
      { t: "80.0, float", why: "csv 모듈은 소수로도 바꾸지 않습니다. 형 변환은 읽는 사람이 직접 합니다." },
      { t: "KeyError가 난다", why: "DictReader는 머리글의 '국어'를 키로 쓰므로 그 키가 있습니다." }
    ],
    answer: 1
  },
  {
    id: "q2", type: "mc",
    q: "CSV를 읽어 int(row[\"수학\"])을 하다가 ValueError: invalid literal for int() with base 10: '' 가 났습니다. 원인은?",
    options: [
      { t: "파일 인코딩이 틀렸다", why: "인코딩이 틀리면 UnicodeDecodeError나 글자 깨짐이 납니다. '' 는 빈 문자열입니다." },
      { t: "어떤 행의 수학 칸이 비어 있다", why: "정답. 빈 칸은 빈 문자열 ''로 읽히고, int('')는 정수로 바꿀 수 없어 ValueError가 납니다." },
      { t: "'수학'이라는 열이 없다", why: "열이 없으면 row[\"수학\"]에서 KeyError가 납니다." },
      { t: "newline=\"\"을 빠뜨렸다", why: "읽을 때 newline을 빠뜨려도 이런 오류는 나지 않습니다. 오류 메시지 끝의 '' 가 단서입니다." }
    ],
    answer: 1
  },
  {
    id: "q3", type: "mc",
    q: "CSV 한 줄이 민수,\"서울, 중구\" 입니다. line.split(\",\")의 결과 리스트에는 칸이 몇 개일까요?",
    options: [
      { t: "2개", why: "csv.reader로 읽으면 2개입니다. split은 따옴표 규칙을 몰라서 따옴표 안의 쉼표에서도 자릅니다." },
      { t: "3개", why: "정답. ['민수', '\"서울', ' 중구\"']처럼 3개로 잘립니다. 그래서 CSV는 csv 모듈로 읽습니다." },
      { t: "1개", why: "쉼표가 두 개 있으므로 적어도 그 자리에서는 잘립니다." },
      { t: "오류가 난다", why: "split은 오류 없이 잘못된 결과를 냅니다. 그래서 더 위험합니다." }
    ],
    answer: 1
  },
  {
    id: "q4", type: "num",
    q: "06_shape.py에서 body는 머리글을 뺀 행들입니다. body[3]은 메모장에서 보는 몇 번째 줄일까요?",
    answer: 5,
    a: "body[0]이 파일의 2번째 줄(1번째 줄은 머리글)이므로 줄 번호 = i + 2 = 3 + 2 = 5. 서윤의 줄"
  },
  {
    id: "q5", type: "mc",
    q: "Windows에서 open(\"out.csv\", \"w\", encoding=\"utf-8\")로 열고 csv.writer로 썼더니, 엑셀에서 행 사이에 빈 줄이 보입니다. 고치는 법은?",
    options: [
      { t: "encoding을 cp949로 바꾼다", why: "인코딩은 글자 모양 문제입니다. 빈 줄은 줄바꿈 문제입니다." },
      { t: "open에 newline=\"\"을 붙인다", why: "정답. csv 모듈이 붙이는 \\r\\n을 텍스트 모드가 \\r\\r\\n으로 또 바꾸는 것을 막습니다." },
      { t: "\"w\" 대신 \"a\"로 연다", why: "모드는 덮어쓰기/이어쓰기의 차이일 뿐 줄바꿈과는 상관없습니다." },
      { t: "writerows 대신 split을 쓴다", why: "split은 자르는 도구입니다. 쓰기와 상관없습니다." }
    ],
    answer: 1
  },
  {
    id: "q6", type: "mc",
    q: "json.dumps({\"a\": None, \"b\": True})의 결과는?",
    options: [
      { t: "{'a': None, 'b': True}", why: "이것은 print로 본 Python 표기입니다. JSON은 큰따옴표와 null, true를 씁니다." },
      { t: "{\"a\": null, \"b\": true}", why: "정답. None은 null로, True는 true로 바뀌고 문자열은 큰따옴표로 감쌉니다." },
      { t: "{\"a\": \"None\", \"b\": \"True\"}", why: "형이 문자열로 바뀌지 않습니다. JSON에도 null과 true가 따로 있습니다." },
      { t: "TypeError가 난다", why: "None과 True는 JSON으로 바꿀 수 있는 값입니다." }
    ],
    answer: 1
  },
  {
    id: "q7", type: "mc",
    q: "{\"점\": (3, 5)}를 JSON 파일로 저장했다가 json.load로 다시 읽으면 \"점\"의 값은?",
    options: [
      { t: "(3, 5) 튜플", why: "JSON에는 튜플이 없어서 배열로 적힙니다. 배열은 다시 읽으면 리스트가 됩니다." },
      { t: "[3, 5] 리스트", why: "정답. 튜플은 JSON 배열이 되고, 배열은 리스트로 돌아옵니다. 그래서 저장 전과 == 비교하면 False가 나옵니다." },
      { t: "\"(3, 5)\" 문자열", why: "튜플이 글자째 저장되지는 않습니다. 배열 [3, 5]로 적힙니다." },
      { t: "저장할 때 오류가 난다", why: "json.dump는 튜플을 배열로 바꿔 저장합니다. 오류는 나지 않습니다." }
    ],
    answer: 1
  },
  {
    id: "q8", type: "mc",
    q: "json.loads(\"{'이름': '민수'}\")가 JSONDecodeError를 내는 이유는?",
    options: [
      { t: "한글이 들어 있어서", why: "JSON은 한글을 담을 수 있습니다. 문제는 따옴표 모양입니다." },
      { t: "JSON의 문자열과 이름은 큰따옴표로만 감싸야 해서", why: "정답. 오류 메시지도 'Expecting property name enclosed in double quotes'(큰따옴표로 감싼 이름을 기대함)입니다." },
      { t: "ensure_ascii=False를 안 줘서", why: "ensure_ascii는 dumps(쓰기)의 설정입니다. 읽기 오류와 상관없습니다." },
      { t: "loads 대신 load를 써야 해서", why: "loads는 문자열을 읽는 맞는 함수입니다. load는 파일 객체를 받습니다." }
    ],
    answer: 1
  },
  {
    id: "q9", type: "num",
    q: "이어서 풀기: scores.csv에서 수학 칸이 빈 하준을 빼고 나머지 학생의 수학 평균을 구하면?",
    steps: ["① 수학 점수가 있는 학생: 민수 90, 지아 85, 서윤 92", "② 합: 90 + 85 + 92 = 267", "③ 평균: 267 ÷ 3 = ?"],
    answer: 89,
    a: "267 ÷ 3 = 89. 빈 칸을 0점으로 쳐서 4로 나누면 66.75가 되어 뜻이 완전히 달라진다"
  },
  {
    id: "q10", type: "mc",
    q: "scores.csv(머리글 1줄 + 학생 4줄)를 list(csv.DictReader(f))로 읽으면 len(rows)는?",
    options: [
      { t: "5", why: "csv.reader로 읽으면 머리글까지 5행입니다. DictReader는 머리글을 키로 쓰고 행으로 세지 않습니다." },
      { t: "4", why: "정답. 학생 4명이 딕셔너리 4개가 됩니다." },
      { t: "16", why: "칸 수(4행 × 4열)가 아니라 행 수를 셉니다." },
      { t: "3", why: "빈 칸이 있는 하준의 행도 그대로 읽힙니다. 빈 칸은 ''로 들어갈 뿐입니다." }
    ],
    answer: 1
  },
  {
    id: "q11", type: "mc",
    q: "학생마다 동아리 수가 다르고(0개~5개), 과목별 점수도 함께 저장하려 합니다. 알맞은 형식은?",
    options: [
      { t: "CSV", why: "CSV는 모든 행의 칸 수가 같은 평평한 표에 맞습니다. 동아리처럼 개수가 들쭉날쭉한 목록은 담기 어렵습니다." },
      { t: "JSON", why: "정답. 학생 하나를 {\"점수\": {...}, \"동아리\": [...]}처럼 겹쳐 담을 수 있고, 리스트 길이가 달라도 됩니다." },
      { t: "둘 다 똑같이 편하다", why: "겹친 구조는 JSON이 자연스럽고, CSV로 하려면 표를 여러 장으로 나눠야 합니다." },
      { t: "텍스트 파일에 print 출력을 저장", why: "print 출력은 정해진 형식이 아니라 다시 읽기 어렵습니다. JSON도 아닙니다." }
    ],
    answer: 1
  },
  {
    id: "q12", type: "short",
    q: "남이 준 CSV 파일을 읽고 바로 평균을 계산하지 않고 먼저 '모양 확인'을 해야 하는 이유를 적어 보세요.",
    a: "CSV의 값은 모두 문자열이고 빈 칸, 칸 수가 다른 줄, 글자 깨짐, BOM이 붙은 열 이름 같은 문제가 섞여 있을 수 있습니다. 바로 계산하면 오류로 멈추거나, 더 나쁘게는 오류 없이 틀린 결과가 나옵니다. 앞 몇 줄, 행 수, 열 이름, 줄마다 칸 수, 빈 칸을 먼저 확인해야 무엇을 바꾸고 어떻게 처리할지 정할 수 있습니다."
  },
  {
    id: "q13", type: "mc",
    q: "json.dump(data, f, ensure_ascii=False)에서 ensure_ascii=False의 역할은?",
    options: [
      { t: "한글을 \\uc774 같은 번호 대신 글자 그대로 적게 한다", why: "정답. 빼면 한글이 \\uXXXX 꼴로 적혀 사람이 읽기 어렵습니다(읽어 들이면 같은 값이긴 합니다)." },
      { t: "파일을 UTF-8로 저장하게 한다", why: "파일 인코딩은 open의 encoding이 정합니다." },
      { t: "들여쓰기를 한다", why: "들여쓰기는 indent입니다." },
      { t: "잘못된 값이 있어도 오류를 내지 않게 한다", why: "오류를 숨기는 설정이 아닙니다." }
    ],
    answer: 0
  },
  {
    id: "q14", type: "mc",
    q: "json.load와 json.loads의 차이는?",
    options: [
      { t: "load는 파일 객체에서, loads는 문자열에서 읽는다", why: "정답. s는 string의 s입니다. 쓰기의 dump/dumps도 같은 짝입니다." },
      { t: "load는 작은 파일, loads는 큰 파일용이다", why: "크기와 상관없습니다. 무엇에서 읽느냐(파일/문자열)의 차이입니다." },
      { t: "loads는 여러 개를 한꺼번에 읽는다", why: "s는 복수형이 아니라 string의 s입니다." },
      { t: "차이가 없다", why: "받는 것이 다릅니다. load에 문자열을 주거나 loads에 파일을 주면 오류가 납니다." }
    ],
    answer: 0
  }
];
