/* DB03-1 INNER JOIN, LEFT JOIN과 비어 있는 짝 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["DB03-1"] = [
  {
    "id": "q1",
    "type": "short",
    "q": "고객 1,2,3 중 고객 1에게 주문 2건, 고객 2에게 1건, 고객 3에게 0건이 있습니다. 고객과 주문을 고객 번호로 INNER JOIN하면 몇 행인가요?",
    "a": "2+1=3행입니다. 주문이 없는 고객의 행은 결합된 짝이 없습니다."
  },
  {
    "id": "q2",
    "type": "short",
    "q": "고객 1,2,3 중 고객 1에게 주문 2건, 고객 2에게 1건, 고객 3에게 0건이 있습니다. 고객을 왼쪽에 두고 LEFT JOIN하면 몇 행인가요?",
    "a": "2+1+1=4행입니다. 고객 3이 NULL로 채워진 주문 열과 함께 한 행 남습니다."
  },
  {
    "id": "q3",
    "type": "short",
    "q": "LEFT JOIN 후 주문 번호가 NULL인 결과 행 하나만 가진 고객을 그룹화했습니다. COUNT(*) 및 COUNT(orders.order_id)는?",
    "a": "각각 1과 0입니다. 결합 결과 행 하나는 있지만 알려진 주문 번호는 없습니다."
  },
  {
    "id": "q4",
    "type": "short",
    "q": "orders.order_id는 필수 기본 키이고 쿠폰액은 NULL을 허용합니다. 고객을 기준으로 LEFT JOIN한 결과에서 짝이 아예 없음을 확인할 오른쪽 열은 무엇인가요?",
    "a": "orders.order_id가 NULL이면 짝이 없음을 알 수 있습니다. 쿠폰액은 실제 주문 행에도 NULL일 수 있습니다."
  },
  {
    "id": "q5",
    "type": "short",
    "q": "결제 완료 주문만 연결해 보면서 모든 고객을 남기려 합니다. 상태 조건은 LEFT JOIN의 ON과 최종 WHERE 중 어디에 쓰나요?",
    "a": "LEFT JOIN의 ON에 고객 키 조건과 함께 씁니다. 이렇게 하면 맞는 주문이 없어도 고객은 남습니다."
  },
  {
    "id": "q6",
    "type": "short",
    "q": "고객을 왼쪽에 두고 LEFT JOIN한 뒤 WHERE orders.status = 'paid'를 적용합니다. 주문이 없는 고객은 남나요?",
    "a": "남지 않습니다. 오른쪽 status가 NULL이므로 비교 결과가 참이 아닙니다."
  },
  {
    "id": "q7",
    "type": "short",
    "q": "orders와 customers에 customer_id 열이 모두 있습니다. FROM customers AS c JOIN orders AS o 다음에 두 키만 비교하는 ON 절을 쓰세요.",
    "a": "ON c.customer_id = o.customer_id를 씁니다."
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
