/* DB02-2 GROUP BY와 집계의 분모 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["DB02-2"] = [
  {
    "id": "q1",
    "type": "mc",
    "q": "주문 표에 paid 3행, pending 2행이 있습니다. SELECT status, COUNT(*) FROM orders GROUP BY status의 결과 행은 몇 개이고 각 건수는 얼마인가요?",
    "answer": 2,
    "options": [
      {
        "t": "결과 5행, 모든 행의 건수가 1",
        "why": "GROUP BY는 같은 상태의 행을 한 그룹으로 묶습니다. 입력 행마다 한 줄이 나오는 것이 아닙니다."
      },
      {
        "t": "결과 1행, 건수 5",
        "why": "그룹 없이 COUNT(*)만 쓴 결과입니다. GROUP BY status는 상태마다 한 줄을 만듭니다."
      },
      {
        "t": "결과 2행, paid 3과 pending 2",
        "why": "상태 값이 두 종류이므로 그룹이 두 개이고, 그룹마다 행 수를 셉니다."
      },
      {
        "t": "결과 2행, paid 1과 pending 1",
        "why": "COUNT(*)는 그룹 안의 행 수를 셉니다. 그룹마다 1이 되는 것은 서로 다른 상태 값의 개수를 센 착각입니다."
      }
    ]
  },
  {
    "id": "q2",
    "type": "short",
    "q": "GROUP BY customer_id에서 같은 고객의 주문 날짜가 여러 개이며 날짜는 고정 폭 YYYY-MM-DD 문자열입니다. 고객 한 행에 가장 이른 주문 날짜를 명시하려면 어떤 집계를 쓰나요?",
    "a": "ISO 날짜 문자열처럼 정렬과 시간순이 같은 값이라면 MIN(order_date)를 씁니다. 날짜값 열을 그대로 선택하면 어떤 날짜인지 기준이 없습니다."
  },
  {
    "id": "q3",
    "type": "mc",
    "q": "한 그룹의 coupon_won이 NULL, 1000, 0입니다. COUNT(*)와 COUNT(coupon_won)은 각각 얼마인가요?",
    "answer": 0,
    "options": [
      {
        "t": "COUNT(*)는 3, COUNT(coupon_won)은 2",
        "why": "COUNT(*)는 모든 행을, COUNT(열)은 NULL이 아닌 값을 셉니다. 0은 알려진 값이라 셉니다."
      },
      {
        "t": "COUNT(*)는 3, COUNT(coupon_won)은 1",
        "why": "0을 '쿠폰 없음'으로 보아 뺐습니다. 0은 NULL이 아니므로 COUNT(coupon_won)에 들어갑니다."
      },
      {
        "t": "COUNT(*)는 2, COUNT(coupon_won)은 2",
        "why": "COUNT(*)는 열 값과 상관없이 행 자체를 셉니다. NULL이 있는 행도 한 행입니다."
      },
      {
        "t": "COUNT(*)는 3, COUNT(coupon_won)은 3",
        "why": "COUNT(열)은 NULL을 건너뜁니다."
      }
    ]
  },
  {
    "id": "q4",
    "type": "num",
    "q": "쿠폰액 세 값이 [NULL, 1000, 0]입니다. AVG(coupon_won)은 몇 원인가요?",
    "answer": 500,
    "a": "NULL을 빼고 알려진 두 값의 합 1000을 2로 나눕니다. NULL을 0으로 보고 3으로 나누면 333.3…이 되어 의미가 달라집니다."
  },
  {
    "id": "q5",
    "type": "mc",
    "q": "12,000원 이상인 주문만 골라 고객별 건수를 구합니다. 12,000원 조건은 WHERE와 HAVING 중 어디에 두나요?",
    "answer": 3,
    "options": [
      {
        "t": "HAVING에 둔다. 조건이 있는 건 모두 HAVING에 쓴다",
        "why": "HAVING은 그룹에서 계산한 값에 거는 조건입니다. 금액은 주문 한 건의 값입니다."
      },
      {
        "t": "WHERE와 HAVING 어디에 두어도 결과가 같다",
        "why": "WHERE는 그룹 전에 행을, HAVING은 그룹 뒤에 그룹을 거릅니다. 표준 SQL에서는 HAVING에 그룹 열도 집계도 아닌 total_won을 쓸 수 없습니다."
      },
      {
        "t": "GROUP BY total_won으로 처리한다",
        "why": "금액별로 그룹을 만들면 결과 단위가 고객이 아니라 금액이 됩니다."
      },
      {
        "t": "WHERE에 둔다. 개별 주문의 조건이기 때문이다",
        "why": "주문 한 건마다 판단할 수 있는 조건이므로 그룹을 만들기 전에 WHERE로 거릅니다."
      }
    ]
  },
  {
    "id": "q6",
    "type": "mc",
    "q": "고객별 결제 완료 건수를 계산한 뒤 3건 이상인 고객을 남기는 절을 쓰세요. WHERE에서 결제 완료 행만 남겼고 GROUP BY customer_id도 적용했습니다.",
    "answer": 2,
    "options": [
      {
        "t": "WHERE COUNT(*) >= 3",
        "why": "WHERE 단계에는 아직 그룹이 없어 집계를 쓸 수 없습니다. 오류가 납니다."
      },
      {
        "t": "HAVING SUM(total_won) >= 3",
        "why": "SUM(total_won)은 금액의 합입니다. 건수는 COUNT(*)로 셉니다."
      },
      {
        "t": "HAVING COUNT(*) >= 3",
        "why": "그룹마다 센 건수에 조건을 거는 것이므로 GROUP BY 뒤 HAVING에 씁니다."
      },
      {
        "t": "ORDER BY COUNT(*) >= 3",
        "why": "ORDER BY는 순서만 정하고 행을 거르지 않습니다."
      }
    ]
  },
  {
    "id": "q7",
    "type": "mc",
    "q": "한 그룹의 coupon_won 두 값이 모두 NULL입니다. COUNT(coupon_won), SUM(coupon_won), AVG(coupon_won)은 각각 무엇인가요?",
    "answer": 1,
    "options": [
      {
        "t": "0, 0, 0",
        "why": "SUM과 AVG는 알려진 값이 하나도 없으면 0이 아니라 NULL을 돌려줍니다."
      },
      {
        "t": "0, NULL, NULL",
        "why": "COUNT(열)은 NULL이 아닌 값이 없으니 0이고, 합하거나 평균 낼 값이 없어 SUM과 AVG는 NULL입니다."
      },
      {
        "t": "2, NULL, NULL",
        "why": "COUNT(coupon_won)은 NULL을 세지 않습니다. 2는 COUNT(*)의 값입니다."
      },
      {
        "t": "NULL, NULL, NULL",
        "why": "COUNT는 NULL을 돌려주지 않고 개수 0을 돌려줍니다."
      }
    ]
  },
  {
    "id": "q8",
    "type": "mc",
    "q": "고객 4의 주문 금액은 9,000원, 12,000원이고 고객 7의 주문은 12,000원, 15,000원입니다. 12,000원 이상인 주문이 2건 이상인 고객과 그 주문금액 합을 구하세요.",
    "answer": 3,
    "options": [
      {
        "t": "고객 4와 7, 합 39,000원",
        "why": "고객 4는 12,000원 이상인 주문이 하나뿐이라 HAVING 조건(2건 이상)을 통과하지 못합니다."
      },
      {
        "t": "고객 7, 합 15,000원",
        "why": "12,000원도 '이상'에 들어갑니다. 12,000원 주문을 빠뜨렸습니다."
      },
      {
        "t": "고객 4와 7, 합 48,000원",
        "why": "WHERE를 적용하지 않고 네 주문을 모두 더했습니다. 9,000원 주문은 먼저 걸러집니다."
      },
      {
        "t": "고객 7, 합 27,000원",
        "why": "WHERE로 9,000원 주문을 빼면 고객 4는 1건, 고객 7은 2건이 남습니다. 고객 7의 합은 12,000+15,000=27,000원입니다."
      }
    ]
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
