/* DB02-2 GROUP BY와 집계의 분모 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["DB02-2"] = [
  {
    "id": "q1",
    "type": "short",
    "q": "주문 표에 paid 3행, pending 2행이 있습니다. SELECT status, COUNT(*) FROM orders GROUP BY status의 결과 행은 몇 개이고 각 건수는 얼마인가요?",
    "a": "결과는 두 행입니다. paid는 3, pending은 2입니다."
  },
  {
    "id": "q2",
    "type": "short",
    "q": "GROUP BY customer_id에서 같은 고객의 주문 날짜가 여러 개이며 날짜는 고정 폭 YYYY-MM-DD 문자열입니다. 고객 한 행에 가장 이른 주문 날짜를 명시하려면 어떤 집계를 쓰나요?",
    "a": "ISO 날짜 문자열처럼 정렬과 시간순이 같은 값이라면 MIN(order_date)를 씁니다. 날짜값 열을 그대로 선택하면 어떤 날짜인지 기준이 없습니다."
  },
  {
    "id": "q3",
    "type": "short",
    "q": "한 그룹의 coupon_won이 NULL, 1000, 0입니다. COUNT(*)와 COUNT(coupon_won)은 각각 얼마인가요?",
    "a": "COUNT(*)는 3, COUNT(coupon_won)은 2입니다. 0은 알려진 값입니다."
  },
  {
    "id": "q4",
    "type": "short",
    "q": "쿠폰액 세 값이 [NULL, 1000, 0]입니다. AVG(coupon_won)은 얼마이며 분모는 무엇인가요?",
    "a": "500원입니다. NULL을 빼고 두 알려진 값의 합을 2로 나눕니다."
  },
  {
    "id": "q5",
    "type": "short",
    "q": "12,000원 이상인 주문만 골라 고객별 건수를 구합니다. 12,000원 조건은 WHERE와 HAVING 중 어디에 두나요?",
    "a": "개별 주문의 조건이므로 WHERE에 둡니다."
  },
  {
    "id": "q6",
    "type": "short",
    "q": "고객별 결제 완료 건수를 계산한 뒤 3건 이상인 고객을 남기는 절을 쓰세요. WHERE에서 결제 완료 행만 남겼고 GROUP BY customer_id도 적용했습니다.",
    "a": "HAVING COUNT(*) >= 3입니다. 결제 완료 행은 그룹을 만들기 전에 WHERE로 고른다고 전제합니다."
  },
  {
    "id": "q7",
    "type": "short",
    "q": "한 그룹의 coupon_won 두 값이 모두 NULL입니다. COUNT(coupon_won), SUM(coupon_won), AVG(coupon_won)은 각각 무엇인가요?",
    "a": "알려진 값의 수는 0이고 합과 평균은 각각 NULL입니다."
  },
  {
    "id": "q8",
    "type": "short",
    "q": "고객 4의 주문 금액은 9,000원, 12,000원이고 고객 7의 주문은 12,000원, 15,000원입니다. 12,000원 이상인 주문이 2건 이상인 고객과 그 주문금액 합을 구하세요.",
    "a": "고객 7만 남고 합은 27,000원입니다. 고객 4는 12,000원 주문 하나만 기준을 통과합니다."
  },
  {
    "id": "q9",
    "type": "mc",
    "q": "고객별 주문 수가 2건 이상인 고객을 찾으려고 SELECT customer_id FROM orders WHERE COUNT(*) >= 2 GROUP BY customer_id를 썼습니다. 결과는?",
    "options": [
      {
        "t": "주문이 2건 이상인 행만 남은 뒤 그룹이 만들어진다",
        "why": "행 하나에는 '주문 수'라는 값이 없습니다. 그룹 단위 조건은 HAVING COUNT(*) >= 2로 씁니다."
      },
      {
        "t": "오류가 난다. 집계 조건은 GROUP BY 뒤 HAVING에 써야 한다",
        "why": "WHERE는 그룹을 만들기 전에 개별 행을 거르는 단계라 집계를 쓸 수 없습니다. SQLite도 misuse of aggregate 오류를 냅니다."
      },
      {
        "t": "2건 이상인 고객이 정상적으로 나온다",
        "why": "논리적 처리 순서에서 WHERE는 GROUP BY보다 앞이므로 그 시점에 COUNT(*)를 계산할 그룹이 없습니다."
      },
      {
        "t": "모든 고객이 나온다",
        "why": "조건을 무시하고 실행되는 것이 아니라 문장 자체가 거부됩니다."
      }
    ],
    "answer": 1
  }
];
