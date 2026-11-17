/* PY08-1 오류 읽기·재현·assert · 확인 문제
   type "mc"    객관식. options의 why에 그 보기가 왜 맞는지/틀린지 적는다. answer는 정답 보기의 순서(0부터).
   type "num"   숫자로 답하기. answer는 숫자, a는 풀이, steps는 미리 보여 줄 풀이 단계(이어서 풀기용).
   type "short" 내 말로 적기. a는 모범 답. 스스로 맞았는지 표시한다.
   id는 한번 정하면 바꾸지 않는다(복습 기록이 이 번호로 저장된다). */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["PY08-1"] = [
  {
    id: "q1", type: "mc",
    q: "긴 traceback을 받았을 때 가장 먼저 읽을 곳은?",
    options: [
      { t: "맨 위 Traceback (most recent call last): 바로 아래 줄", why: "맨 위 칸은 가장 바깥 호출이라 대개 원인과 멉니다." },
      { t: "맨 아래 줄 (오류 종류: 이유)", why: "정답. 무슨 오류인지를 먼저 알고, 그다음 위로 올라가며 어디서·왜 났는지 찾습니다." },
      { t: "가운데 Python 라이브러리(Lib\\...) 줄", why: "라이브러리 내부 줄은 보통 건너뜁니다. 내 파일의 줄을 찾는 것이 우선입니다." },
      { t: "아무 데나, 순서는 상관없다", why: "순서가 정해져 있습니다. 아래 → 위입니다." }
    ],
    answer: 1
  },
  {
    id: "q2", type: "mc",
    q: "01_report.py의 traceback에서 ZeroDivisionError가 실제로 일어난 줄은?",
    options: [
      { t: "9번 줄 report(\"하준\", [])", why: "9번 줄은 원인이 된 값(빈 리스트)을 넘긴 곳이지, 나눗셈이 일어난 곳은 아닙니다." },
      { t: "5번 줄 avg = average(scores)", why: "5번 줄은 average를 부른 곳입니다. 오류는 그 안쪽에서 났습니다." },
      { t: "2번 줄 return sum(scores) / len(scores)", why: "정답. 마지막 칸(가장 최근 호출)이 오류가 일어난 곳이고, ^가 / 를 가리킵니다." },
      { t: "8번 줄 report(\"민수\", [80, 90])", why: "민수는 정상적으로 85.0이 출력되었습니다. traceback에 8번 줄은 없습니다." }
    ],
    answer: 2
  },
  {
    id: "q3", type: "mc",
    q: "같은 traceback에서 오류의 '원인이 된 값'은 어디서 왔을까요?",
    options: [
      { t: "average 함수의 sum이 틀려서", why: "sum은 빈 리스트에서 0을 정상적으로 돌려줍니다. 문제는 나누는 수 len(scores)가 0인 것입니다." },
      { t: "9번 줄이 빈 리스트 []를 넘겨서", why: "정답. len([])이 0이라 0으로 나누게 되었습니다. 위 칸으로 거슬러 올라가 찾은 원인입니다." },
      { t: "print가 avg를 출력하지 못해서", why: "print까지 가지도 못했습니다. 5번 줄의 average 호출 안에서 멈췄습니다." },
      { t: "Python 버전이 낮아서", why: "0으로 나누기는 어느 버전에서나 오류입니다." }
    ],
    answer: 1
  },
  {
    id: "q4", type: "mc",
    q: "Traceback (most recent call last)의 뜻으로 옳은 것은?",
    options: [
      { t: "가장 최근 호출이 맨 위에 있다", why: "반대입니다. last는 '마지막에', 곧 맨 아래에 있다는 뜻입니다." },
      { t: "가장 최근 호출(오류가 난 가장 안쪽 함수)이 맨 아래에 있다", why: "정답. 위에서 아래로 갈수록 더 안쪽 호출이고, 맨 아래 칸에서 오류가 났습니다." },
      { t: "마지막으로 실행에 성공한 줄을 보여 준다", why: "성공한 줄이 아니라 오류 순간에 쌓여 있던 호출들을 보여 줍니다." },
      { t: "오류가 마지막 줄에서 났다", why: "파일의 마지막 줄이라는 뜻이 아닙니다. 호출 순서에서 '가장 최근'을 말합니다." }
    ],
    answer: 1
  },
  {
    id: "q5", type: "mc",
    q: "NameError: name 'totl' is not defined. Did you mean: 'total'? 의 가장 흔한 원인은?",
    options: [
      { t: "변수 이름 오타", why: "정답. total을 totl로 잘못 썼습니다. Python이 비슷한 이름을 제안해 줍니다." },
      { t: "문자열과 숫자를 더함", why: "그것은 TypeError입니다." },
      { t: "리스트 범위를 벗어남", why: "그것은 IndexError입니다." },
      { t: "파일이 없음", why: "그것은 FileNotFoundError입니다." }
    ],
    answer: 0
  },
  {
    id: "q6", type: "mc",
    q: "1번 줄이 print(\"시작\"), 2번 줄이 콜론 없는 if True 인 파일을 실행하면?",
    options: [
      { t: "\"시작\"이 찍힌 뒤 SyntaxError", why: "문법 오류는 실행 전 검사에서 걸리므로 1번 줄도 실행되지 않습니다." },
      { t: "\"시작\" 없이 SyntaxError: expected ':'", why: "정답. 파일 전체의 문법을 먼저 검사하고 통과해야 실행을 시작합니다. 그래서 Traceback 줄도 없습니다." },
      { t: "\"시작\"만 찍히고 정상 종료", why: "콜론 없는 if는 문법 오류라 그냥 넘어가지 않습니다." },
      { t: "NameError", why: "이름 문제가 아니라 문법 문제입니다." }
    ],
    answer: 1
  },
  {
    id: "q7", type: "mc",
    q: "x = [1, 2, 3] 다음 print(x[3])에서 나는 오류는?",
    options: [
      { t: "KeyError", why: "KeyError는 딕셔너리에서 없는 키를 찾을 때입니다." },
      { t: "IndexError", why: "정답. 길이 3인 리스트의 인덱스는 0~2라서 3은 범위 밖입니다(list index out of range)." },
      { t: "ValueError", why: "ValueError는 int(\"팔십\")처럼 형은 맞는데 값이 안 될 때입니다." },
      { t: "오류 없이 3이 나온다", why: "인덱스는 0부터라서 x[3]은 네 번째 칸인데, 그런 칸이 없습니다." }
    ],
    answer: 1
  },
  {
    id: "q8", type: "mc",
    q: "'최소 재현'을 만드는 목적으로 가장 알맞은 것은?",
    options: [
      { t: "오류 메시지를 없애기 위해", why: "최소 재현은 오류를 없애는 것이 아니라 오히려 가장 짧은 코드로 같은 오류를 일으키는 것입니다." },
      { t: "같은 오류를 가장 작은 코드·입력으로 일으켜 원인을 한 가지로 좁히기 위해", why: "정답. 4만 행짜리 처리 코드가 int(\"\") 한 줄로 줄면 원인이 분명해지고, 고친 뒤 확인도 쉽습니다." },
      { t: "프로그램을 더 빨리 돌리기 위해", why: "속도와 상관없습니다." },
      { t: "assert를 지우기 위해", why: "assert와는 관계가 없습니다." }
    ],
    answer: 1
  },
  {
    id: "q9", type: "num",
    q: "이어서 풀기: 본문의 잘못된 average(range(1, len(scores)) 사용)에 [10, 20, 30]을 넣었을 때 반복이 끝난 뒤 total은?",
    steps: ["① range(1, 3)이므로 i = 1, 2", "② i = 1: total = 0 + 20 = 20", "③ i = 2: total = 20 + 30 = ?"],
    answer: 50,
    a: "20 + 30 = 50. 첫 값 10을 빠뜨렸으므로 결과는 50 ÷ 3 = 16.666…(실제 실행 결과 16.666666666666668), 기대값 20과 다르다"
  },
  {
    id: "q10", type: "mc",
    q: "assert average([80, 90, 70]) == 80, \"평균 계산이 틀림\" 에서 average가 53.33을 돌려주면?",
    options: [
      { t: "아무 일도 없이 다음 줄로 간다", why: "조건이 거짓이면 그 자리에서 멈춥니다. 참일 때만 그냥 지나갑니다." },
      { t: "AssertionError: 평균 계산이 틀림 으로 멈춘다", why: "정답. 조건이 거짓이므로 쉼표 뒤의 메시지를 담은 AssertionError가 납니다." },
      { t: "\"평균 계산이 틀림\"을 출력하고 계속 실행한다", why: "assert는 print가 아닙니다. 메시지는 예외에 담겨 나오고 실행은 멈춥니다." },
      { t: "53.33을 80으로 고쳐 준다", why: "assert는 검사만 할 뿐 값을 고치지 않습니다." }
    ],
    answer: 1
  },
  {
    id: "q11", type: "mc",
    q: "python -O 파일.py 로 실행하면 assert는 어떻게 될까요?",
    options: [
      { t: "더 엄격하게 검사한다", why: "반대입니다. -O(최적화)는 assert 줄을 통째로 건너뜁니다." },
      { t: "모두 무시된다", why: "정답. 그래서 assert는 사용자 입력 검증처럼 반드시 실행되어야 하는 검사에 쓰면 안 됩니다." },
      { t: "메시지가 없는 assert만 무시된다", why: "메시지 유무와 상관없이 모든 assert가 무시됩니다." },
      { t: "SyntaxError가 난다", why: "-O는 정상적인 실행 옵션입니다." }
    ],
    answer: 1
  },
  {
    id: "q12", type: "mc",
    q: "결과가 실수인 함수를 검사하는 가장 알맞은 assert는?",
    options: [
      { t: "assert f() == 0.3", why: "0.1 + 0.2 == 0.3이 False인 것처럼 실수는 아주 작은 오차가 생겨 ==가 실패할 수 있습니다." },
      { t: "assert math.isclose(f(), 0.3)", why: "정답. '충분히 가까운가'로 검사합니다." },
      { t: "assert int(f()) == 0", why: "정수로 잘라 버리면 0.3과 0.9를 구분하지 못하는 의미 없는 검사가 됩니다." },
      { t: "assert f()", why: "0이 아닌 값이면 무조건 참이라 값이 맞는지 검사하지 못합니다." }
    ],
    answer: 1
  },
  {
    id: "q13", type: "short",
    q: "오류 메시지 없이 틀린 답이 나오는 논리 오류를 찾는 방법을 순서대로 적어 보세요.",
    a: "① 작은 입력에 대한 기대값을 손으로 먼저 계산한다. ② 실제 결과와 비교해 틀렸음을 확인한다(assert로 남겨 두면 매번 자동 확인). ③ 반복문 안의 중간 값을 print로 찍어 기대한 값과 처음 어긋나는 지점을 찾는다. ④ 고친 뒤 같은 입력으로 다시 확인한다."
  },
  {
    id: "q14", type: "mc",
    q: "엑셀이 만든 CSV를 encoding=\"utf-8\"로 DictReader로 읽고 row[\"이름\"]을 했더니 KeyError: '이름' 이 났습니다. 화면에 찍은 머리글은 분명 '이름'처럼 보입니다. 가장 의심할 원인은?",
    options: [
      { t: "열 이름 앞에 BOM(\\ufeff)이 붙어 있다", why: "정답. 눈에 안 보이는 \\ufeff 때문에 키가 '\\ufeff이름'이 됩니다. repr(header)로 확인하고 encoding=\"utf-8-sig\"로 읽습니다(PY07·1)." },
      { t: "csv 모듈이 한글 키를 지원하지 않는다", why: "본문에서 '이름' 키로 잘 읽었습니다." },
      { t: "newline=\"\"을 빠뜨렸다", why: "줄바꿈 설정은 열 이름의 글자와 상관없습니다." },
      { t: "파일이 CP949다", why: "CP949 파일을 utf-8로 읽으면 KeyError보다 먼저 UnicodeDecodeError가 납니다." }
    ],
    answer: 0
  }
];
