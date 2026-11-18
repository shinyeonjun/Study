/* DB02-1 행을 선택하고 조건값을 바인딩하기 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["DB02-1"] = [
  {
    "id": "q1",
    "type": "short",
    "q": "orders에는 (101,paid,10000), (102,paid,15000), (103,pending,12000)이 있습니다. WHERE status = 'paid' AND total_won >= 12000에 남을 주문 번호는?",
    "a": "102입니다. 101은 금액 조건, 103은 상태 조건을 통과하지 못합니다."
  },
  {
    "id": "q2",
    "type": "short",
    "q": "(order_id,total_won)이 (4,10), (2,10), (9,30)입니다. ORDER BY total_won DESC, order_id ASC 결과의 주문 번호 순서는?",
    "a": "9, 2, 4입니다. 금액 30이 먼저이고 금액 10의 동점은 주문 번호 오름차순으로 풉니다."
  },
  {
    "id": "q3",
    "type": "short",
    "q": "쿠폰 열이 NULL, 0, 500인 세 행에서 WHERE coupon_won = 0에 남는 값은 무엇인가요?",
    "a": "0만 남습니다. NULL과 0의 일반 비교는 미지이므로 WHERE를 통과하지 않습니다."
  },
  {
    "id": "q4",
    "type": "short",
    "q": "coupon_won이 기록되지 않은 행만 보려면 어떤 WHERE 조건을 쓰나요?",
    "a": "WHERE coupon_won IS NULL을 씁니다."
  },
  {
    "id": "q5",
    "type": "short",
    "q": "SQLite에서 WHERE status = ? AND total_won >= ?에 paid와 15000을 이 순서로 바인딩하려면 값 인자를 어떻게 전달하나요?",
    "a": "db.execute(sql, ('paid', 15000))로 전달합니다. 각 ?에 튜플의 값을 순서대로 연결합니다."
  },
  {
    "id": "q6",
    "type": "short",
    "q": "정렬 열을 앱에서 주문번호 또는 금액 중 고르게 합니다. 열 이름을 값 자리표시자에 넣는 방법 대신 어떤 구현이 맞나요?",
    "a": "각 선택에서 미리 정한 ORDER BY 절을 가진 질의를 사용합니다. 자리표시자는 값에 사용합니다."
  },
  {
    "id": "q7",
    "type": "short",
    "q": "db.execute의 sql에 ? 한 개가 있습니다. 정수 12 하나를 튜플로 전달하세요.",
    "a": "db.execute(sql, (12,))입니다. 한 원소의 튜플에는 쉼표를 씁니다."
  },
  {
    "id": "q8",
    "type": "short",
    "q": "조회에 WHERE total_won >= ?를 쓰면서 Python에서 최소액이 0 이상인지 별도로 검사합니다. 두 역할을 설명하세요.",
    "a": "범위 검사는 업무에 맞는 입력인지 평가하고 값 바인딩은 해당 입력을 질의의 값 위치에 전달합니다."
  },
  {
    "id": "q9",
    "type": "mc",
    "q": "쿠폰액 coupon_won이 NULL, 0, 500인 세 행에 WHERE coupon_won <> 0을 적용합니다. 남는 행은?",
    "options": [
      {
        "t": "세 행 모두",
        "why": "0 <> 0은 FALSE이므로 0인 행은 확실히 빠집니다."
      },
      {
        "t": "남는 행이 없다",
        "why": "500 <> 0은 TRUE입니다. 전체가 UNKNOWN이 되는 것은 비교 값 자체가 NULL인 행뿐입니다."
      },
      {
        "t": "500인 행 하나",
        "why": "500 <> 0은 TRUE, 0 <> 0은 FALSE, NULL <> 0은 UNKNOWN입니다. WHERE는 TRUE인 행만 남기므로 500 한 행입니다."
      },
      {
        "t": "NULL과 500인 두 행",
        "why": "NULL은 0이 아니라고 생각하기 쉽지만 NULL과의 비교는 UNKNOWN이고 WHERE를 통과하지 못합니다. NULL까지 원하면 OR coupon_won IS NULL을 붙입니다."
      }
    ],
    "answer": 2
  }
];
