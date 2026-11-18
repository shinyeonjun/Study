/* DB03-1 INNER JOIN, LEFT JOIN과 비어 있는 짝 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["DB03-1"] = [
  {
    "id": "q1",
    "type": "num",
    "q": "고객 1,2,3 중 고객 1에게 주문 2건, 고객 2에게 1건, 고객 3에게 0건이 있습니다. 고객과 주문을 고객 번호로 INNER JOIN하면 몇 행인가요?",
    "answer": 3,
    "a": "고객 1의 짝 2행 + 고객 2의 짝 1행 = 3행입니다. 주문이 없는 고객 3은 짝이 없어 INNER JOIN 결과에 나오지 않습니다."
  },
  {
    "id": "q2",
    "type": "mc",
    "q": "고객 1,2,3 중 고객 1에게 주문 2건, 고객 2에게 1건, 고객 3에게 0건이 있습니다. 고객을 왼쪽에 두고 LEFT JOIN하면 몇 행인가요?",
    "answer": 0,
    "options": [
      {
        "t": "4행",
        "why": "짝이 있는 3행에, 짝이 없는 고객 3이 오른쪽 열을 NULL로 채운 한 행으로 남아 2+1+1=4행입니다."
      },
      {
        "t": "3행",
        "why": "INNER JOIN의 행 수입니다. LEFT JOIN은 짝이 없는 왼쪽 고객도 한 줄 남깁니다."
      },
      {
        "t": "6행",
        "why": "고객 3명마다 두 줄씩이라고 본 계산입니다. 행 수는 고객별 짝의 수(없으면 1)를 더해 구합니다."
      },
      {
        "t": "9행",
        "why": "고객 3명 × 주문 3건의 모든 짝, 곧 CROSS JOIN의 행 수입니다. LEFT JOIN은 ON 조건으로 짝을 고릅니다."
      }
    ]
  },
  {
    "id": "q3",
    "type": "mc",
    "q": "LEFT JOIN 후 주문 번호가 NULL인 결과 행 하나만 가진 고객을 그룹화했습니다. COUNT(*) 및 COUNT(orders.order_id)는?",
    "answer": 2,
    "options": [
      {
        "t": "COUNT(*) 0, COUNT(o.order_id) 0",
        "why": "결합 결과에 그 고객의 행이 한 줄 있으므로 COUNT(*)는 0이 아닙니다."
      },
      {
        "t": "COUNT(*) 1, COUNT(o.order_id) 1",
        "why": "COUNT(열)은 NULL을 세지 않습니다. 주문 번호가 NULL이므로 0입니다."
      },
      {
        "t": "COUNT(*) 1, COUNT(o.order_id) 0",
        "why": "COUNT(*)는 NULL로 채워진 결과 행도 한 행으로 세고, COUNT(o.order_id)는 NULL인 주문 번호를 세지 않습니다."
      },
      {
        "t": "COUNT(*) 0, COUNT(o.order_id) 1",
        "why": "두 값을 거꾸로 적었습니다. 행은 있고 알려진 주문 번호는 없습니다."
      }
    ]
  },
  {
    "id": "q4",
    "type": "mc",
    "q": "orders.order_id는 필수 기본 키이고 쿠폰액은 NULL을 허용합니다. 고객을 기준으로 LEFT JOIN한 결과에서 짝이 아예 없음을 확인할 오른쪽 열은 무엇인가요?",
    "answer": 1,
    "options": [
      {
        "t": "o.coupon_won",
        "why": "쿠폰액은 짝이 있는 실제 주문에서도 NULL일 수 있어, NULL이라고 짝이 없다고 단정할 수 없습니다."
      },
      {
        "t": "o.order_id",
        "why": "필수 기본 키는 실제 주문 행에서 절대 NULL이 아니므로, 결과에서 NULL이면 짝이 없다는 뜻입니다."
      },
      {
        "t": "c.customer_id",
        "why": "왼쪽 고객 열은 LEFT JOIN에서 항상 값이 있습니다. 짝 여부를 알려 주지 않습니다."
      },
      {
        "t": "c.name",
        "why": "왼쪽 표의 열이라 짝이 없어도 값이 그대로 남습니다."
      }
    ]
  },
  {
    "id": "q5",
    "type": "mc",
    "q": "결제 완료 주문만 연결해 보면서 모든 고객을 남기려 합니다. 상태 조건은 LEFT JOIN의 ON과 최종 WHERE 중 어디에 쓰나요?",
    "answer": 3,
    "options": [
      {
        "t": "최종 WHERE에 쓴다",
        "why": "LEFT JOIN 뒤 WHERE o.status = 'paid'는 짝 없는 고객의 NULL 행에서 UNKNOWN이 되어 그 고객을 지웁니다."
      },
      {
        "t": "HAVING에 쓴다",
        "why": "HAVING은 그룹을 만든 뒤 집계 결과에 거는 조건입니다. 이 질의는 짝을 만드는 기준을 정하는 문제입니다."
      },
      {
        "t": "INNER JOIN으로 바꾸고 ON에 쓴다",
        "why": "INNER JOIN은 결제 완료 주문이 없는 고객을 결과에서 뺍니다. 모든 고객을 남기려는 목적과 맞지 않습니다."
      },
      {
        "t": "LEFT JOIN의 ON에 고객 키 조건과 함께 쓴다",
        "why": "ON의 조건은 짝 후보만 좁히고, 짝이 없는 고객은 LEFT JOIN 규칙대로 NULL 행으로 남습니다."
      }
    ]
  },
  {
    "id": "q6",
    "type": "mc",
    "q": "고객을 왼쪽에 두고 LEFT JOIN한 뒤 WHERE orders.status = 'paid'를 적용합니다. 주문이 없는 고객은 남나요?",
    "answer": 0,
    "options": [
      {
        "t": "남지 않는다. o.status가 NULL이라 비교가 참이 아니다",
        "why": "주문 없는 고객의 o.status는 NULL이고 NULL = 'paid'는 UNKNOWN입니다. WHERE는 TRUE인 행만 남깁니다."
      },
      {
        "t": "남는다. LEFT JOIN은 왼쪽 행을 항상 보존한다",
        "why": "LEFT JOIN이 보존한 행이라도 그 뒤 WHERE가 다시 거릅니다."
      },
      {
        "t": "남는다. NULL은 어떤 비교든 통과한다",
        "why": "반대입니다. NULL과의 비교는 UNKNOWN이고 WHERE를 통과하지 못합니다."
      },
      {
        "t": "오류가 난다. LEFT JOIN 뒤에는 WHERE를 쓸 수 없다",
        "why": "LEFT JOIN 뒤에도 WHERE를 쓸 수 있습니다. 다만 결과가 INNER JOIN처럼 바뀔 수 있습니다."
      }
    ]
  },
  {
    "id": "q7",
    "type": "mc",
    "q": "orders와 customers에 customer_id 열이 모두 있습니다. FROM customers AS c JOIN orders AS o 다음에 두 키만 비교하는 ON 절을 쓰세요.",
    "answer": 2,
    "options": [
      {
        "t": "ON customer_id = customer_id",
        "why": "두 표에 같은 이름의 열이 있어 어느 표의 열인지 모호합니다. 별칭으로 표를 밝혀야 합니다."
      },
      {
        "t": "ON c.customer_id = o.order_id",
        "why": "고객 번호와 주문 번호를 비교했습니다. 같은 뜻의 키끼리 비교해야 합니다."
      },
      {
        "t": "ON c.customer_id = o.customer_id",
        "why": "별칭 c와 o로 각 표의 고객 번호를 지정해, 번호가 같은 고객·주문의 짝을 만듭니다."
      },
      {
        "t": "ON c.customer_id = o.customer_id AND o.status = 'paid'",
        "why": "키 비교 말고 상태 조건까지 붙여 짝 후보를 결제 완료 주문으로 좁힙니다. 문제는 두 키만 비교하라고 했습니다."
      }
    ]
  },
  {
    "id": "q8",
    "type": "short",
    "q": "고객 8의 주문 12와 13을 결합하니 결과에서 고객 이름이 두 줄에 반복돼 보입니다. 줄이 둘인 이유는 무엇인가요?",
    "a": "고객 8과 주문 12의 짝, 고객 8과 주문 13의 짝이 각각 한 행입니다. 고객의 원본 행이 둘이라는 의미는 아닙니다."
  },
  {
    "id": "q9",
    "type": "mc",
    "q": "고객 3명과 주문 4건을 ON 조건 없이 CROSS JOIN하면 몇 행이고, 그중 c.customer_id = o.customer_id를 만족하는 행은 몇 개인가요? (주문은 모두 고객 1 또는 2의 것)",
    "options": [
      {
        "t": "7행, 그중 4행",
        "why": "3+4로 더한 값입니다. CROSS JOIN은 모든 짝이므로 곱합니다."
      },
      {
        "t": "12행, 그중 5행",
        "why": "5행은 고객 3을 NULL로 남기는 LEFT JOIN의 결과입니다. 고객 3과 짝이 맞는 주문은 없습니다."
      },
      {
        "t": "4행, 그중 4행",
        "why": "ON 조건이 없으면 일치 여부와 상관없이 모든 짝을 만듭니다."
      },
      {
        "t": "12행, 그중 4행",
        "why": "카티션 곱은 3×4=12행이고, 주문마다 고객 번호가 맞는 짝이 정확히 하나이므로 4행이 INNER JOIN 결과와 같습니다."
      }
    ],
    "answer": 3
  }
];
