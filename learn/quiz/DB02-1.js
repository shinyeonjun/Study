/* DB02-1 행을 선택하고 조건값을 바인딩하기 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["DB02-1"] = [
  {
    "id": "q1",
    "type": "mc",
    "q": "orders에는 (101,paid,10000), (102,paid,15000), (103,pending,12000)이 있습니다. WHERE status = 'paid' AND total_won >= 12000에 남을 주문 번호는?",
    "answer": 1,
    "options": [
      {
        "t": "101, 102",
        "why": "101은 paid이지만 10000은 12000보다 작아 금액 조건에서 빠집니다."
      },
      {
        "t": "102",
        "why": "AND는 두 조건이 모두 참이어야 남깁니다. 두 조건을 모두 만족하는 것은 102뿐입니다."
      },
      {
        "t": "102, 103",
        "why": "103은 금액 12000이 조건을 만족하지만 상태가 pending이라 빠집니다."
      },
      {
        "t": "101, 102, 103",
        "why": "모든 행이 남는 것은 OR로 묶었을 때에 가깝습니다. AND는 두 조건을 모두 요구합니다."
      }
    ]
  },
  {
    "id": "q2",
    "type": "mc",
    "q": "(order_id, total_won)이 (4,10), (2,10), (9,30)입니다. ORDER BY total_won DESC, order_id ASC 결과의 주문 번호 순서는?",
    "answer": 3,
    "options": [
      {
        "t": "2, 4, 9",
        "why": "order_id 오름차순만 적용한 순서입니다. 첫 정렬 기준은 total_won 내림차순입니다."
      },
      {
        "t": "9, 4, 2",
        "why": "금액 30이 먼저인 것은 맞지만, 동점 10의 두 행은 order_id 오름차순이라 2가 4보다 먼저입니다."
      },
      {
        "t": "4, 2, 9",
        "why": "입력 순서를 그대로 둔 것입니다. 금액이 큰 9가 맨 앞이어야 합니다."
      },
      {
        "t": "9, 2, 4",
        "why": "금액 30인 9가 먼저이고, 금액 10의 동점은 두 번째 기준인 주문 번호 오름차순으로 2, 4가 됩니다."
      }
    ]
  },
  {
    "id": "q3",
    "type": "mc",
    "q": "쿠폰 열이 NULL, 0, 500인 세 행에 WHERE coupon_won = 0을 적용하면 어떤 값의 행이 남나요?",
    "answer": 0,
    "options": [
      {
        "t": "0인 행만",
        "why": "0 = 0만 TRUE입니다. NULL = 0은 UNKNOWN이고 WHERE는 TRUE인 행만 남깁니다."
      },
      {
        "t": "NULL과 0인 두 행",
        "why": "NULL을 '없음 = 0'으로 생각한 실수입니다. NULL은 모르는 값이라 = 0의 결과가 UNKNOWN입니다."
      },
      {
        "t": "남는 행이 없다",
        "why": "0인 행은 0 = 0이 참이므로 남습니다."
      },
      {
        "t": "500인 행만",
        "why": "500 = 0은 거짓입니다. <> 0 조건과 헷갈렸습니다."
      }
    ]
  },
  {
    "id": "q4",
    "type": "mc",
    "q": "coupon_won이 기록되지 않은(NULL인) 행만 보려면 어떤 WHERE 조건을 쓰나요?",
    "answer": 2,
    "options": [
      {
        "t": "WHERE coupon_won = NULL",
        "why": "NULL과의 = 비교는 항상 UNKNOWN이라 어떤 행도 남지 않습니다."
      },
      {
        "t": "WHERE coupon_won = 0",
        "why": "0은 할인액이 0으로 확인된 값입니다. NULL 행은 이 조건으로 찾을 수 없습니다."
      },
      {
        "t": "WHERE coupon_won IS NULL",
        "why": "NULL인지 여부는 IS NULL로 확인합니다. 이 조건은 NULL 행에서 TRUE가 됩니다."
      },
      {
        "t": "WHERE coupon_won IS NOT NULL",
        "why": "반대로 기록이 있는 행을 고릅니다."
      }
    ]
  },
  {
    "id": "q5",
    "type": "mc",
    "q": "SQLite에서 WHERE status = ? AND total_won >= ?에 paid와 15000을 이 순서로 바인딩하려면 어떻게 전달하나요?",
    "answer": 1,
    "options": [
      {
        "t": "db.execute(sql, (15000, 'paid'))",
        "why": "값은 ?의 순서대로 채워집니다. 순서가 바뀌어 status에 15000, total_won에 'paid'가 들어갑니다."
      },
      {
        "t": "db.execute(sql, ('paid', 15000))",
        "why": "튜플의 첫 값이 첫 ?, 두 번째 값이 두 번째 ?에 들어가므로 순서가 맞습니다."
      },
      {
        "t": "db.execute(sql.replace('?', 'paid'))",
        "why": "문자열을 직접 바꿔 넣는 것은 바인딩이 아니며, 두 자리에 모두 paid가 들어갑니다."
      },
      {
        "t": "db.execute(f\"... status = '{s}' AND total_won >= {n}\")",
        "why": "f-string으로 값을 끼워 넣으면 SQL 주입 위험이 생깁니다. 값은 자리표시자로 따로 전달합니다."
      }
    ]
  },
  {
    "id": "q6",
    "type": "mc",
    "q": "앱에서 정렬 열을 '주문 번호'와 '금액' 중 고르게 합니다. 어떻게 구현하는 것이 맞나요?",
    "answer": 3,
    "options": [
      {
        "t": "ORDER BY ?로 쓰고 열 이름을 값으로 바인딩한다",
        "why": "자리표시자에는 값이 들어갑니다. 열 이름을 바인딩하면 모든 행이 같은 문자열 값 하나로 정렬되어, 그 열의 순서가 되지 않습니다."
      },
      {
        "t": "사용자가 고른 글자를 f-string으로 ORDER BY 뒤에 붙인다",
        "why": "입력을 SQL 구문에 그대로 넣으면 질의 구조가 바뀔 수 있습니다(SQL 주입)."
      },
      {
        "t": "정렬은 SQL로 할 수 없으니 항상 Python에서 정렬한다",
        "why": "ORDER BY로 정렬할 수 있습니다. 문제는 열 이름을 어떻게 고르느냐입니다."
      },
      {
        "t": "선택지마다 ORDER BY 절을 미리 정한 질의를 두고 그중 하나를 고른다",
        "why": "열 이름과 정렬 방향은 질의 구조이므로 앱이 마련한 질의 중에서 고르고, 자리표시자는 값에만 씁니다."
      }
    ]
  },
  {
    "id": "q7",
    "type": "mc",
    "q": "sql에 ? 한 개가 있습니다. 정수 12 하나를 전달하는 올바른 호출은?",
    "answer": 0,
    "options": [
      {
        "t": "db.execute(sql, (12,))",
        "why": "원소 하나인 튜플은 끝에 쉼표를 붙여 만듭니다."
      },
      {
        "t": "db.execute(sql, (12))",
        "why": "(12)는 괄호로 감싼 정수 12일 뿐 튜플이 아닙니다. 값 묶음 자리에 정수를 넘기면 오류가 납니다."
      },
      {
        "t": "db.execute(sql, '12')",
        "why": "문자열 '12'는 글자 '1'과 '2' 두 값의 묶음으로 취급되어, 자리표시자 1개와 값 개수가 맞지 않는 오류가 납니다."
      },
      {
        "t": "db.execute(sql + ' 12')",
        "why": "SQL 문장 뒤에 글자를 이어 붙일 뿐 ? 자리에 값이 들어가지 않습니다."
      }
    ]
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
