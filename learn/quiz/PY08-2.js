/* PY08-2 예외 처리와 입력 검증 · 확인 문제
   type "mc"    객관식. options의 why에 그 보기가 왜 맞는지/틀린지 적는다. answer는 정답 보기의 순서(0부터).
   type "num"   숫자로 답하기. answer는 숫자, a는 풀이, steps는 미리 보여 줄 풀이 단계(이어서 풀기용).
   type "short" 내 말로 적기. a는 모범 답. 스스로 맞았는지 표시한다.
   id는 한번 정하면 바꾸지 않는다(복습 기록이 이 번호로 저장된다). */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["PY08-2"] = [
  {
    id: "q1", type: "mc",
    q: "01_try.py에서 text가 \"팔십\"일 때 일어나는 일은?",
    options: [
      { t: "ValueError로 프로그램 전체가 멈춘다", why: "int(text)가 try 안에 있고 except ValueError가 있으므로 잡힙니다." },
      { t: "\"숫자가 아님: 팔십\"을 찍고 다음 값 \"90\"으로 넘어간다", why: "정답. try의 나머지(받은 점수 출력)는 건너뛰고 except 블록을 실행한 뒤 반복이 계속됩니다." },
      { t: "\"받은 점수: 팔십\"을 찍는다", why: "int(\"팔십\")에서 예외가 났으므로 그 다음 줄의 print는 실행되지 않습니다." },
      { t: "score가 0이 되고 계속된다", why: "except 블록은 score에 아무 값도 넣지 않습니다. 0으로 바꾸는 코드는 없습니다." }
    ],
    answer: 1
  },
  {
    id: "q2", type: "mc",
    q: "finally 블록이 실행되는 때는?",
    options: [
      { t: "예외가 났을 때만", why: "그것은 except 블록입니다." },
      { t: "예외가 안 났을 때만", why: "그것은 else 블록입니다." },
      { t: "언제나 (return이 있어도, 예외가 위로 전달되어도)", why: "정답. try 문을 떠날 때 반드시 실행됩니다. 파일 닫기 같은 정리 작업을 둡니다." },
      { t: "except가 없을 때만", why: "except 유무와 상관없이 실행됩니다." }
    ],
    answer: 2
  },
  {
    id: "q3", type: "mc",
    q: "02_try_full.py에서 print(to_score(\"85\"))의 출력 순서는?",
    options: [
      { t: "85 → 변환 성공 → to_score 끝: '85'", why: "85는 함수가 끝난 뒤 바깥 print가 찍으므로 맨 마지막입니다." },
      { t: "변환 성공 → to_score 끝: '85' → 85", why: "정답. else에서 return 85를 예약하고, 함수를 떠나기 직전에 finally가 실행된 뒤 85가 반환되어 출력됩니다." },
      { t: "변환 성공 → 85 → to_score 끝: '85'", why: "return이 있어도 finally가 함수를 떠나기 전에 먼저 실행됩니다." },
      { t: "변환 성공 → 85", why: "finally는 언제나 실행되므로 'to_score 끝'도 찍힙니다." }
    ],
    answer: 1
  },
  {
    id: "q4", type: "mc",
    q: "03_bare_except.py가 [80, 90]에 대해 85가 아니라 0을 출력한 이유는?",
    options: [
      { t: "sum이 0을 돌려줘서", why: "sum([80, 90])은 170입니다." },
      { t: "오타 scorse로 난 NameError를 except:가 잡아 0을 돌려줘서", why: "정답. 종류를 적지 않은 except는 모든 예외를 잡아 버그를 숨깁니다. except ZeroDivisionError로 좁히면 NameError가 드러납니다." },
      { t: "리스트가 비어 있어서", why: "[80, 90]은 비어 있지 않습니다." },
      { t: "정수 나눗셈이라서", why: "/는 실수 나눗셈이라 85.0이 나와야 합니다." }
    ],
    answer: 1
  },
  {
    id: "q5", type: "mc",
    q: "06_propagate.py의 실행 결과에 대한 설명으로 옳은 것은?",
    options: [
      { t: "점수: [80, 90]이 출력된다", why: "105에서 예외가 나 read_scores가 즉시 끝나므로 90은 처리되지 않고 print(\"점수:\")도 실행되지 않습니다." },
      { t: "read_scores에 except가 없으므로 프로그램이 traceback을 내고 멈춘다", why: "read_scores는 그냥 통과시킬 뿐, main의 except ValueError가 잡습니다." },
      { t: "\"입력 오류: 점수는 0~100이어야 합니다: 105\"만 출력된다", why: "정답. parse_score의 raise가 read_scores를 지나 main의 except까지 전달되었습니다." },
      { t: "105를 건너뛰고 점수: [80, 90]을 출력한다", why: "예외는 건너뛰기가 아닙니다. 잡힌 곳(main) 바깥의 반복은 이미 끝났습니다." }
    ],
    answer: 2
  },
  {
    id: "q6", type: "mc",
    q: "except 블록 안에서 아무것도 붙이지 않은 raise 한 줄의 뜻은?",
    options: [
      { t: "예외를 없던 일로 한다", why: "그것은 except 블록이 raise 없이 끝날 때입니다." },
      { t: "지금 잡은 예외를 그대로 다시 일으켜 위로 보낸다", why: "정답. 기록만 남기고 처리는 호출한 쪽에 맡길 때 씁니다. 원래 traceback도 유지됩니다." },
      { t: "새 RuntimeError를 일으킨다", why: "새 예외가 아니라 지금 처리 중인 예외를 다시 올립니다." },
      { t: "SyntaxError다", why: "except 안에서 raise 단독은 올바른 문법입니다." }
    ],
    answer: 1
  },
  {
    id: "q7", type: "mc",
    q: "사용자가 입력한 나이가 0 이상인지 확인하는 코드로 가장 알맞은 것은?",
    options: [
      { t: "assert age >= 0", why: "assert는 python -O로 꺼질 수 있어 바깥 입력 검증에 쓰면 안 됩니다." },
      { t: "if age < 0: raise ValueError(\"나이는 0 이상이어야 합니다\")", why: "정답. 꺼지지 않고, 뜻에 맞는 예외 종류와 이유를 담습니다." },
      { t: "if age < 0: age = 0", why: "잘못된 값을 조용히 고쳐 받아들이면 원인이 숨습니다. 거부하고 이유를 알려야 합니다." },
      { t: "try: age >= 0 except: pass", why: "비교식은 예외를 내지 않으므로 아무것도 검사하지 않습니다." }
    ],
    answer: 1
  },
  {
    id: "q8", type: "mc",
    q: "본문의 parse_score(\"85.5\")는 어떻게 될까요?",
    options: [
      { t: "85를 돌려준다", why: "int(\"85.5\")는 소수점 있는 글자를 정수로 바꾸지 못해 ValueError가 납니다. 잘라 주지 않습니다." },
      { t: "85.5를 돌려준다", why: "int로 바꾸므로 실수는 나오지 않습니다." },
      { t: "ValueError: 정수가 아닙니다: '85.5'", why: "정답. 형 검사 단계에서 거부됩니다(09_validate.py의 실제 출력)." },
      { t: "ValueError: 0~100 밖입니다", why: "범위 검사는 정수로 바꾼 다음 단계라 거기까지 가지 않습니다." }
    ],
    answer: 2
  },
  {
    id: "q9", type: "num",
    q: "is_pass(score)가 return score > 60 일 때, [59, 60, 61] 가운데 True가 나오는 값은 몇 개일까요?",
    answer: 1,
    a: "59 > 60 거짓, 60 > 60 거짓, 61 > 60 참 → 1개. '60점 이상 합격'이라면 60도 참이어야 하므로 경계값 60에서 버그가 드러난다"
  },
  {
    id: "q10", type: "mc",
    q: "허용 범위가 1 이상 10 이하인 정수 입력을 경계값 분석으로 시험할 때 가장 알맞은 입력 묶음은?",
    options: [
      { t: "3, 5, 7", why: "모두 범위 한가운데라 < 와 <= 실수를 잡지 못합니다." },
      { t: "0, 1, 2, 9, 10, 11", why: "정답. 양 끝 경계(1, 10), 바로 안쪽(2, 9), 바로 바깥(0, 11)입니다." },
      { t: "1, 10", why: "경계만으로는 '바깥을 거부하는지'를 확인하지 못합니다." },
      { t: "-100, 100", why: "경계에서 멀리 떨어진 값이라 경계 비교의 실수를 잡지 못합니다." }
    ],
    answer: 1
  },
  {
    id: "q11", type: "mc",
    q: "parse_score(\"  85 \")의 결과는?",
    options: [
      { t: "ValueError: 정수가 아닙니다", why: "맨 처음 strip()으로 앞뒤 공백을 떼므로 \"85\"가 됩니다." },
      { t: "ValueError: 점수가 비어 있습니다", why: "공백을 뗀 뒤에도 \"85\"가 남으므로 비어 있지 않습니다." },
      { t: "85", why: "정답. strip → 비어 있지 않음 → int(\"85\") → 범위 안 → 85(실제 출력 '  85 ' -> 85)." },
      { t: "\"85\" (문자열)", why: "int로 바꿔 돌려주므로 정수 85입니다." }
    ],
    answer: 2
  },
  {
    id: "q12", type: "short",
    q: "예외를 '어디서' 잡아야 하는지 원칙을, 06_propagate.py의 세 함수를 예로 들어 설명해 보세요.",
    a: "예외는 그것을 받았을 때 무엇을 할지 아는 곳에서 잡습니다. parse_score는 무엇이 잘못됐는지는 알지만 사용자에게 어떻게 알릴지는 모르므로 raise만 합니다. read_scores는 처리할 방법이 없으므로 잡지 않고 통과시킵니다. main은 사용자에게 '입력 오류'를 보여 주는 방법을 알므로 거기서 except로 잡습니다."
  },
  {
    id: "q13", type: "mc",
    q: "int(\"abc\")에서 나는 예외를 잡는 except로 알맞은 것은?",
    options: [
      { t: "except TypeError:", why: "int에 문자열을 주는 것 자체는 형이 맞습니다. 값이 숫자 모양이 아니라서 ValueError입니다." },
      { t: "except ValueError:", why: "정답. invalid literal for int()는 ValueError입니다." },
      { t: "except KeyError:", why: "KeyError는 딕셔너리에서 없는 키를 찾을 때입니다." },
      { t: "except ZeroDivisionError:", why: "나눗셈과 관계없습니다." }
    ],
    answer: 1
  },
  {
    id: "q14", type: "mc",
    q: "traceback 중간에 During handling of the above exception, another exception occurred: 가 보입니다. 뜻은?",
    options: [
      { t: "같은 오류가 두 번 났다", why: "두 예외는 서로 다를 수 있습니다. except 블록 안에서 새 예외가 일어났다는 뜻입니다." },
      { t: "위 예외를 처리(except)하는 도중 아래의 다른 예외가 일어났다. 아래가 최종 예외, 위가 그 원인이다", why: "정답. except 안에서 다른 예외를 raise하면 이렇게 두 traceback이 이어져 나옵니다. from None을 쓰면 위쪽이 숨겨집니다." },
      { t: "finally에서 오류가 났다", why: "finally와 상관없이, 예외 처리 도중 새 예외가 났을 때의 표시입니다." },
      { t: "Python 내부 버그다", why: "08_chain.py처럼 우리 코드가 일부러 만든 정상적인 상황입니다." }
    ],
    answer: 1
  }
];
