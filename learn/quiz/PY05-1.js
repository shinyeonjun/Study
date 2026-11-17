/* PY05-1 함수 만들기: 매개변수와 반환값 · 확인 문제
   형식은 quiz/1-01.js 맨 위 설명과 같다. id는 한번 정하면 바꾸지 않는다.
   문제 속 코드의 줄 바꿈은 " / "로, 들여쓰기는 "(들여쓰기)"로 적는다. */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["PY05-1"] = [
  {
    id: "q1", type: "mc",
    q: "파일 전체가 def hi(): / (들여쓰기) print(\"hi\")  두 줄뿐입니다. 실행하면?",
    options: [
      { t: "hi가 한 번 출력된다", why: "def는 함수를 정의(등록)만 합니다. 몸통은 hi()로 호출할 때 실행됩니다." },
      { t: "아무것도 출력되지 않는다", why: "정의만 있고 호출이 없으므로 몸통이 실행되지 않습니다." },
      { t: "NameError가 난다", why: "정의 자체는 올바른 문법이라 오류가 없습니다. NameError는 정의 전에 호출할 때 납니다." },
      { t: "None이 출력된다", why: "None은 반환값이 없을 때 돌아오는 값인데, 여기서는 호출조차 하지 않았고 출력하는 코드도 실행되지 않습니다." }
    ],
    answer: 1
  },
  {
    id: "q2", type: "mc",
    q: "def area(w, h): / (들여쓰기) return w * h / print(area(3, 4))  에서 3과 4를 부르는 이름은?",
    options: [
      { t: "매개변수", why: "매개변수는 정의 쪽 괄호 안의 이름 w, h입니다." },
      { t: "인자", why: "호출할 때 괄호 안에 넣는 실제 값이 인자입니다. 3은 w에, 4는 h에 들어갑니다." },
      { t: "반환값", why: "반환값은 return이 돌려주는 12입니다." },
      { t: "지역변수", why: "지역변수는 함수 안에서 만든 변수입니다(다음 장). 3, 4는 바깥에서 넣는 값입니다." }
    ],
    answer: 1
  },
  {
    id: "q3", type: "num",
    q: "def area(w, h): / (들여쓰기) return w * h / print(area(3, 4) + area(2, 5))  의 출력은?",
    answer: 22,
    a: "area(3, 4)는 3 × 4 = 12를, area(2, 5)는 2 × 5 = 10을 돌려줍니다. 호출식을 반환값으로 바꾸면 print(12 + 10) → 22."
  },
  {
    id: "q4", type: "mc",
    q: "def add_print(a, b): / (들여쓰기) print(a + b) / r = add_print(2, 3) / print(r)  의 출력 두 줄은?",
    options: [
      { t: "5 그리고 5", why: "화면에 5가 찍힌 것은 함수 안의 print 때문이지, 함수가 5를 돌려준 것이 아닙니다." },
      { t: "5 그리고 None", why: "첫 줄 5는 함수 안 print가 찍은 것, r에는 return이 없어서 None이 들어갑니다." },
      { t: "None 그리고 5", why: "순서를 보세요. 함수를 호출할 때 안의 print가 먼저 5를 찍고, 그다음 print(r)이 실행됩니다." },
      { t: "오류가 난다", why: "None을 출력하는 것은 오류가 아닙니다. 오류는 None으로 계산을 하려 할 때 납니다." }
    ],
    answer: 1
  },
  {
    id: "q5", type: "mc",
    q: "TypeError: unsupported operand type(s) for *: 'NoneType' and 'int' 가 났습니다. 가장 먼저 의심할 것은?",
    options: [
      { t: "숫자 대신 문자열을 넣었다", why: "문자열이면 메시지에 'str'이 나옵니다. 여기서는 NoneType, 곧 None이 계산에 들어갔습니다." },
      { t: "곱하기에 쓴 값을 만든 함수가 return 없이 print만 했다", why: "return이 없는 함수의 반환값은 None이고, None × 정수는 계산할 수 없습니다." },
      { t: "인자의 개수가 틀렸다", why: "인자 개수가 틀리면 'missing … argument'나 'takes … but … were given' 메시지가 납니다." },
      { t: "함수를 정의하기 전에 호출했다", why: "그 경우는 NameError: name … is not defined가 납니다." }
    ],
    answer: 1
  },
  {
    id: "q6", type: "mc",
    q: "def change(paid, cost): / (들여쓰기) return paid - cost / print(change(3000, 5000))  의 출력은?",
    options: [
      { t: "2000", why: "인자는 이름이 아니라 순서대로 들어갑니다. paid = 3000, cost = 5000이므로 3000 − 5000입니다." },
      { t: "-2000", why: "첫 인자 3000이 paid, 둘째 5000이 cost로 들어가 3000 − 5000 = −2000. 순서가 바뀌면 오류 없이 엉뚱한 답이 나옵니다." },
      { t: "8000", why: "함수 몸통은 빼기(paid - cost)입니다." },
      { t: "오류가 난다", why: "인자 개수(2)와 매개변수 개수(2)가 맞으므로 오류는 없습니다." }
    ],
    answer: 1
  },
  {
    id: "q7", type: "mc",
    q: "def check(n): / (들여쓰기) if n >= 0: / (들여쓰기 두 번) return \"OK\" / (들여쓰기) return \"음수\" / (들여쓰기) print(\"끝\")  에서 check(5)를 호출하면 일어나는 일은?",
    options: [
      { t: "\"OK\"를 돌려주고, 끝은 출력되지 않는다", why: "5 >= 0이 참이라 return \"OK\"에서 함수가 즉시 끝납니다. 그 아래 줄은 실행되지 않습니다." },
      { t: "\"OK\"를 돌려주고 끝을 출력한다", why: "return은 값을 돌려주면서 함수를 끝냅니다. 아래 print까지 가지 않습니다." },
      { t: "\"OK\"와 \"음수\"를 둘 다 돌려준다", why: "return은 한 번 실행되면 함수가 끝나므로 두 번째 return에 닿지 않습니다." },
      { t: "\"음수\"를 돌려준다", why: "5 >= 0이 참이라 첫 return에서 끝납니다. \"음수\"는 조건이 거짓일 때만 돌아옵니다." }
    ],
    answer: 0
  },
  {
    id: "q8", type: "mc",
    q: "TypeError: square() missing 1 required positional argument: 'x' 의 뜻은?",
    options: [
      { t: "square라는 함수가 없다", why: "함수가 없으면 NameError입니다. 이 메시지는 함수는 있는데 인자가 모자란다는 뜻입니다." },
      { t: "square를 호출할 때 매개변수 x에 넣을 인자를 주지 않았다", why: "'x에 들어갈 위치 인자 1개가 빠졌다'는 뜻입니다. square() 대신 square(4)처럼 불러야 합니다." },
      { t: "square 안에 return이 없다", why: "return이 없으면 오류 없이 None이 돌아옵니다." },
      { t: "x에 숫자가 아닌 값을 넣었다", why: "자료형 문제라면 다른 메시지가 납니다. 이 메시지는 개수 문제입니다." }
    ],
    answer: 1
  },
  {
    id: "q9", type: "mc",
    q: "def square(x): / (들여쓰기) x * x / print(square(4))  의 출력은?",
    options: [
      { t: "16", why: "x * x를 계산은 하지만 return이 없어서 그 값은 버려집니다." },
      { t: "None", why: "return이 없으니 함수는 None을 돌려주고, print가 그것을 찍습니다. 오류 없이 None이 나오면 return이 빠졌는지 보세요." },
      { t: "아무것도 출력되지 않는다", why: "바깥의 print(…)는 실행되므로 무언가는 출력됩니다. 출력되는 것은 반환값 None입니다." },
      { t: "오류가 난다", why: "값을 계산하고 버리는 것은 문법상 허용됩니다." }
    ],
    answer: 1
  },
  {
    id: "q10", type: "short",
    q: "return과 print의 차이를 '누구에게 값을 보내는가'로 설명해 보세요.",
    a: "print는 값을 화면에 찍어 사람에게 보여 줄 뿐이고, 함수의 반환값은 되지 않습니다(print만 하는 함수는 None을 돌려줍니다). return은 값을 함수를 호출한 코드의 자리로 돌려보내므로 변수에 담거나 다른 계산에 쓸 수 있고, 그 자리에서 함수를 끝냅니다."
  },
  {
    id: "q11", type: "num",
    q: "이어서 풀기: def total_price(unit, count, fee): / (들여쓰기) return unit * count + fee  에서 total_price(1200, 3, 500)의 반환값은?",
    steps: ["① 인자 대입: unit = 1200, count = 3, fee = 500", "② unit * count = 1200 × 3 = 3600", "③ 3600 + fee = 3600 + 500 = ?"],
    answer: 4100,
    a: "3600 + 500 = 4100. Python에서도 곱셈이 덧셈보다 먼저 계산됩니다."
  },
  {
    id: "q12", type: "mc",
    q: "1번 줄에 print(double(3)), 3~4번 줄에 def double(x): / (들여쓰기) return x * 2 가 있습니다. 실행하면?",
    options: [
      { t: "6이 출력된다", why: "Python은 위에서 아래로 실행하므로 1번 줄을 실행할 때 double은 아직 정의되지 않았습니다." },
      { t: "NameError: name 'double' is not defined", why: "호출하는 순간 그런 이름이 없습니다. 정의를 호출보다 위로 옮겨야 합니다." },
      { t: "None이 출력된다", why: "함수가 존재하지 않는 상태라 반환값을 받을 수도 없습니다." },
      { t: "TypeError", why: "TypeError는 자료형이나 인자 개수가 맞지 않을 때입니다. 여기서는 이름 자체가 없습니다." }
    ],
    answer: 1
  }
];
