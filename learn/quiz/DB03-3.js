/* DB03-3 서브쿼리, 윈도 함수와 누적 합 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["DB03-3"] = [
  {
    "id": "q1",
    "type": "short",
    "q": "orders의 금액이 10, 15, 12, 15이고 WHERE total_won > (SELECT AVG(total_won) FROM orders)를 적용합니다. 평균과 남는 값을 구하세요.",
    "a": "평균은 (10+15+12+15)/4=13입니다. 15인 두 행이 남습니다."
  },
  {
    "id": "q2",
    "type": "short",
    "q": "주문 표가 비어 있을 때 SELECT AVG(total_won) FROM orders는 어떤 값을 반환하나요?",
    "a": "NULL을 담은 한 행이 반환됩니다. 이 값에 일반 비교를 적용해도 참이 되지 않습니다."
  },
  {
    "id": "q3",
    "type": "short",
    "q": "고객 표의 각 고객에게 결제 완료 주문이 하나라도 있는지 확인만 합니다. 일치 행을 전부 결합하는 대신 어떤 SQL 식을 쓸 수 있나요?",
    "a": "고객 키와 완료 상태를 조건으로 둔 EXISTS (SELECT 1 FROM orders ...)를 씁니다."
  },
  {
    "id": "q4",
    "type": "short",
    "q": "고객 7에 결제 완료 주문이 세 건이고 고객 표에는 고객 7이 한 행입니다. 고객을 읽으며 EXISTS로 결제 완료 주문 여부를 확인할 때 고객 7은 몇 행인가요?",
    "a": "한 행입니다. EXISTS는 짝의 개수를 결과 행으로 만들지 않습니다."
  },
  {
    "id": "q5",
    "type": "short",
    "q": "주문 네 건이 두 고객에 두 건씩 있습니다. GROUP BY customer_id로 고객별 SUM을 계산한 결과와 SUM을 고객별 윈도 함수로 붙인 결과가 각각 몇 행인가요?",
    "a": "그룹 집계는 두 행, 윈도 함수로 합을 붙인 결과는 주문 행을 보존해 네 행입니다."
  },
  {
    "id": "q6",
    "type": "short",
    "q": "같은 고객의 금액이 날짜순 10, 5, 7이고 각 행의 누적 합 프레임이 첫 행부터 현재 행까지입니다. 결과는?",
    "a": "10, 15, 22입니다. 각각 해당 행까지의 금액을 더합니다."
  },
  {
    "id": "q7",
    "type": "short",
    "q": "ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date)에서 한 고객에게 날짜가 같은 주문이 두 개입니다. 같은 날짜의 순서도 재현하려면?",
    "a": "윈도 안의 ORDER BY order_date, order_id처럼 유일한 주문 번호를 정렬 동점 기준으로 추가합니다. 결과 행 순서가 필요하면 바깥 ORDER BY도 명시합니다."
  },
  {
    "id": "q8",
    "type": "short",
    "q": "고객 1의 주문액은 날짜순 2, 5이고 고객 2의 주문액은 날짜순 7, 3입니다. PARTITION BY customer_id로 두 번째 주문까지 누적하면 각각 얼마인가요?",
    "a": "고객 1은 2+5=7, 고객 2는 7+3=10입니다. 다른 고객의 누적엔 이전 고객 금액이 들어가지 않습니다."
  },
  {
    "id": "q9",
    "type": "mc",
    "q": "고객 번호 1, 2, 3이 있고 서브쿼리 SELECT customer_id FROM orders가 1, 1, 2, NULL을 돌려줍니다. WHERE customer_id NOT IN (서브쿼리)의 결과는?",
    "options": [
      {
        "t": "오류가 난다",
        "why": "문법은 정상이고 오류 없이 0행을 돌려줍니다. 그래서 더 알아차리기 어렵습니다."
      },
      {
        "t": "결과 행이 없다",
        "why": "3 NOT IN (1, 2, NULL)은 3<>1 AND 3<>2 AND 3<>NULL이고 마지막이 UNKNOWN이라 전체가 TRUE가 되지 않습니다. 1과 2는 목록에 있어 FALSE입니다."
      },
      {
        "t": "고객 3",
        "why": "NULL이 없을 때의 결과입니다. 목록에 NULL이 섞이면 NOT IN은 TRUE를 낼 수 없습니다. NOT EXISTS를 쓰면 고객 3이 나옵니다."
      },
      {
        "t": "고객 1, 2, 3",
        "why": "1과 2는 목록에 있으므로 NOT IN이 FALSE입니다."
      }
    ],
    "answer": 1
  }
];
