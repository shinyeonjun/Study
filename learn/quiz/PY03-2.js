/* PY03-2 and·or·not으로 조건 묶기 · 확인 문제
   형식은 quiz/1-01.js 맨 위 설명과 같다. id는 한번 정하면 바꾸지 않는다.
   모든 코드의 결과는 Python 3.14로 실행해 확인했다. */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["PY03-2"] = [
  {
    id: "q1", type: "mc",
    q: "print(True and False)의 결과는?",
    options: [
      { t: "True", why: "and는 양쪽이 모두 참이어야 참입니다. 한쪽이 False입니다." },
      { t: "False", why: "정답. and 진리표에서 참은 (True, True) 한 칸뿐입니다." },
      { t: "TrueFalse", why: "and는 문자열 잇기가 아니라 논리 연산입니다. 결과는 참·거짓 값 하나입니다." },
      { t: "SyntaxError", why: "True와 False 사이에 and를 쓰는 것은 올바른 문법입니다." }
    ],
    answer: 1
  },
  {
    id: "q2", type: "mc",
    q: "print(False or True)의 결과는?",
    options: [
      { t: "True", why: "정답. or는 하나라도 참이면 참입니다. 거짓은 (False, False) 한 칸뿐입니다." },
      { t: "False", why: "왼쪽이 False라도 오른쪽이 True이면 or는 True입니다." },
      { t: "None", why: "or는 값을 돌려줍니다. 여기서는 오른쪽 True가 결과입니다." },
      { t: "둘 다 참이 아니라서 오류", why: "or는 둘 다 참일 필요가 없습니다. 오류도 나지 않습니다." }
    ],
    answer: 0
  },
  {
    id: "q3", type: "mc",
    q: "age = 25, has_ticket = True일 때 print(age >= 30 or has_ticket)의 결과는?",
    options: [
      { t: "True", why: "정답. age >= 30은 False지만 has_ticket이 True이므로 False or True → True입니다." },
      { t: "False", why: "and와 헷갈렸습니다. and였다면 False가 맞지만, or는 한쪽만 참이어도 됩니다." },
      { t: "25", why: "비교식 age >= 30의 결과는 25가 아니라 False입니다." },
      { t: "TypeError", why: "불 값끼리의 or는 오류가 나지 않습니다." }
    ],
    answer: 0
  },
  {
    id: "q4", type: "mc",
    q: "'65세 이상이거나 회원이면 할인' 프로그램(if age >= 65 or member:)에 나이 30, 회원 n을 넣으면?",
    options: [
      { t: "할인 적용", why: "30 >= 65는 False, member도 False입니다. or의 거짓 칸인 (False, False)입니다." },
      { t: "정상 요금", why: "정답. 두 조건 모두 거짓이라 or가 False, else 블록이 실행됩니다." },
      { t: "회원을 묻지 않고 바로 할인 적용", why: "단락 평가는 왼쪽이 True일 때 오른쪽을 건너뜁니다. 여기서는 왼쪽이 False입니다." },
      { t: "ValueError", why: "30은 정수 모양이고, 'n'은 int()로 바꾸지 않고 \"y\"와 비교만 하므로 오류가 없습니다." }
    ],
    answer: 1
  },
  {
    id: "q5", type: "mc",
    q: "print(True or False and False)의 결과는?",
    options: [
      { t: "True", why: "정답. and가 or보다 먼저입니다. False and False → False, 그다음 True or False → True." },
      { t: "False", why: "왼쪽부터 (True or False) and False로 계산하면 False가 나오지만, and가 먼저라는 계산 순서를 어긴 것입니다." },
      { t: "SyntaxError", why: "and와 or를 한 식에 섞어 써도 문법에 맞습니다." },
      { t: "None", why: "논리 연산의 결과는 None이 아닙니다." }
    ],
    answer: 0
  },
  {
    id: "q6", type: "mc",
    q: "x = 0일 때 print(x != 0 and 10 / x > 1)의 결과는?",
    options: [
      { t: "False", why: "정답. 왼쪽 x != 0이 False라 and의 결과가 이미 정해져서 오른쪽 10 / x는 계산하지 않습니다(단락 평가)." },
      { t: "ZeroDivisionError", why: "10 / x가 계산되면 오류가 나지만, and의 왼쪽이 False라 오른쪽까지 가지 않습니다." },
      { t: "True", why: "x != 0은 0 != 0이라 False입니다. and의 한쪽이 False면 결과도 False입니다." },
      { t: "0", why: "비교식 x != 0의 결과는 0이 아니라 False입니다." }
    ],
    answer: 0
  },
  {
    id: "q7", type: "mc",
    q: "x = 0일 때 print(10 / x > 1 and x != 0)을 실행하면?",
    options: [
      { t: "False", why: "조건은 같지만 순서가 바뀌었습니다. 왼쪽 10 / x부터 계산하다 멈춥니다." },
      { t: "ZeroDivisionError: division by zero", why: "정답. and는 왼쪽부터 계산합니다. 왼쪽에서 0으로 나누려다 오류가 납니다. 안전 검사를 왼쪽에 두어야 합니다." },
      { t: "True", why: "결과를 내기 전에 오류로 멈춥니다." },
      { t: "Python이 알아서 x != 0을 먼저 계산해 False", why: "Python은 순서를 바꿔 주지 않습니다. 쓴 순서대로 왼쪽부터 계산합니다." }
    ],
    answer: 1
  },
  {
    id: "q8", type: "mc",
    q: "x = 5일 때 if x == 1 or 2: 아래의 print는 실행될까요?",
    options: [
      { t: "실행되지 않는다. 5는 1도 2도 아니다", why: "사람의 뜻은 그렇지만, Python은 (x == 1) or 2로 읽습니다. False or 2 → 2이고, 2는 참으로 칩니다." },
      { t: "실행된다. or의 오른쪽 2는 0이 아니라서 언제나 참으로 친다", why: "정답. 그래서 x에 무엇을 넣어도 실행됩니다. x == 1 or x == 2로 고쳐야 합니다." },
      { t: "SyntaxError가 난다", why: "문법에는 맞아서 오류가 나지 않습니다. 그래서 더 위험한 실수입니다." },
      { t: "TypeError가 난다", why: "불 값과 정수를 or로 묶는 것은 허용됩니다." }
    ],
    answer: 1
  },
  {
    id: "q9", type: "mc",
    q: "'x가 1 또는 2이면'을 바르게 쓴 조건은?",
    options: [
      { t: "x == 1 or 2", why: "or의 오른쪽 2는 비교가 아니라 값이라서 언제나 참입니다." },
      { t: "x == 1 or x == 2", why: "정답. or의 양쪽이 각각 완전한 비교입니다." },
      { t: "x == 1 and x == 2", why: "x가 1이면서 동시에 2일 수는 없으므로 언제나 False입니다." },
      { t: "x == (1 or 2)", why: "1 or 2는 1을 돌려주므로 x == 1과 같아집니다. x가 2일 때 False가 나옵니다." }
    ],
    answer: 1
  },
  {
    id: "q10", type: "mc",
    q: "드모르간 법칙에 따라 not (a and b)와 언제나 같은 식은?",
    options: [
      { t: "(not a) and (not b)", why: "not을 안으로 넣을 때 and를 그대로 두면 안 됩니다. a=True, b=False이면 앞의 식은 True, 이 식은 False로 다릅니다." },
      { t: "(not a) or (not b)", why: "정답. not을 괄호 안으로 넣으면 and와 or가 서로 바뀝니다." },
      { t: "not a and b", why: "not이 a에만 붙고 and도 그대로입니다. 같지 않습니다." },
      { t: "a or b", why: "not이 사라졌습니다. a=True, b=True이면 앞의 식은 False, 이 식은 True입니다." }
    ],
    answer: 1
  },
  {
    id: "q11", type: "num",
    q: "a, b가 각각 True 또는 False인 네 가지 경우 가운데 a or b가 False인 경우는 몇 가지일까요?",
    answer: 1,
    a: "a와 b가 모두 False인 한 가지뿐입니다. or 진리표에서 거짓은 한 칸입니다."
  },
  {
    id: "q12", type: "short",
    q: "단락 평가가 무엇인지 설명하고, x가 0일 수 있을 때 x != 0 and 10 / x > 1처럼 x != 0을 왼쪽에 두는 까닭을 적어 보세요.",
    a: "and·or는 왼쪽부터 계산하다 결과가 정해지면 오른쪽을 계산하지 않습니다. x가 0이면 왼쪽 x != 0이 False라 결과가 False로 정해지므로, 오른쪽의 10 / x(0으로 나누기)가 실행되지 않아 오류를 피할 수 있습니다."
  },
  {
    id: "q13", type: "mc",
    q: "'점수가 0~100 범위 밖이면'을 바르게 쓴 조건은?",
    options: [
      { t: "score < 0 and score > 100", why: "0보다 작으면서 100보다 큰 수는 없으므로 언제나 False입니다. 범위 밖은 or입니다." },
      { t: "score < 0 or score > 100", why: "정답. 둘 중 하나만 맞아도 범위 밖입니다. 수직선에서 양쪽 끝 바깥 두 구간입니다." },
      { t: "0 <= score <= 100", why: "이것은 범위 안입니다. 정반대입니다." },
      { t: "score <= 0 or score >= 100", why: "0점과 100점은 올바른 점수인데 범위 밖으로 잘못 걸러집니다. 경계값을 포함하는지 확인해야 합니다." }
    ],
    answer: 1
  },
  {
    id: "q14", type: "mc",
    q: "print(0 or \"기본값\")의 결과는?",
    options: [
      { t: "True", why: "Python의 or는 True/False로 바꾸지 않고 결과를 정한 쪽의 값을 그대로 돌려줍니다." },
      { t: "0", why: "0은 거짓으로 치므로 or는 오른쪽으로 넘어갑니다." },
      { t: "기본값", why: "정답. 왼쪽 0이 거짓이라 오른쪽 값 \"기본값\"이 결과가 됩니다." },
      { t: "TypeError", why: "정수와 문자열을 or로 묶는 것은 허용됩니다. +와 다릅니다." }
    ],
    answer: 2
  }
];
