/* DB04-1 저장할 값과 관계에 제약조건 두기 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["DB04-1"] = [
  {
    "id": "q1",
    "type": "short",
    "q": "주문 번호를 한 건에 하나만 두고 이 값으로 주문을 찾으려 합니다. 어떤 제약을 둡니까?",
    "a": "order_id를 PRIMARY KEY로 둡니다."
  },
  {
    "id": "q2",
    "type": "short",
    "q": "고객 번호는 기본 키이고, 외부 계정 코드는 반드시 있으며 값이 중복될 수 없습니다. 계정 코드에는 어떤 제약을 둡니까?",
    "a": "NOT NULL과 UNIQUE를 모두 둡니다."
  },
  {
    "id": "q3",
    "type": "short",
    "q": "주문에 등록된 고객이 반드시 있어야 합니다. customer_id에 어떤 두 조건이 필요합니까?",
    "a": "NOT NULL을 두고 FOREIGN KEY로 고객 표의 키를 참조합니다."
  },
  {
    "id": "q4",
    "type": "short",
    "q": "쿠폰액에 CHECK (coupon_won >= 0)만 있습니다. 값 −1과 NULL은 SQLite에서 각각 통과합니까?",
    "a": "−1은 조건이 거짓이라 거부되고, NULL은 조건이 미지라 이 CHECK를 통과합니다."
  },
  {
    "id": "q5",
    "type": "short",
    "q": "정상적으로 알려진 주문액은 0 이상이고 누락을 허용하지 않습니다. total_won에 어떤 두 제약을 둡니까?",
    "a": "NOT NULL과 CHECK (total_won >= 0)을 둡니다."
  },
  {
    "id": "q6",
    "type": "short",
    "q": "SQLite 연결을 새로 열었습니다. 참조 무결성을 검증하려고 첫 트랜잭션 전에 어떤 SQL을 실행합니까?",
    "a": "PRAGMA foreign_keys = ON을 실행합니다. 연결마다 설정합니다."
  },
  {
    "id": "q7",
    "type": "short",
    "q": "주문 원본이 4행입니다. 제약 위반 INSERT 한 문장이 SQLite 기본 동작에 의해 거부되고, 그 뒤 별도의 올바른 한 행을 저장했습니다. 결과 행 수는?",
    "a": "5행입니다. 거부된 문장은 행을 추가하지 못했습니다."
  },
  {
    "id": "q8",
    "type": "short",
    "q": "orders.total_won은 CHECK (total_won >= 0)입니다. total_won=2000원인데 실제 항목 합은 3000원이라면 이 제약 하나로 모순을 발견할 수 있나요?",
    "a": "발견하지 못합니다. 이 CHECK는 주문액이 음수가 아닌지만 검사합니다. 여러 행에 걸친 합 일치는 별도로 검증해야 합니다."
  }
];
