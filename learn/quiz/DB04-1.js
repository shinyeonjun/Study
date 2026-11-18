/* DB04-1 저장할 값과 관계에 제약조건 두기 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["DB04-1"] = [
  {
    "id": "q1",
    "type": "mc",
    "q": "주문 번호를 한 건에 하나만 두고 이 값으로 주문을 찾으려 합니다. 어떤 제약을 둡니까?",
    "answer": 0,
    "options": [
      {
        "t": "order_id를 PRIMARY KEY로 둔다",
        "why": "기본 키는 값이 겹치지 않고 비어 있지 않음을 보장해, 주문 번호 하나로 주문 한 행을 찾게 합니다."
      },
      {
        "t": "order_id에 CHECK (order_id >= 0)을 둔다",
        "why": "CHECK는 값의 범위만 봅니다. 같은 번호가 두 번 들어오는 것을 막지 못합니다."
      },
      {
        "t": "order_id를 FOREIGN KEY로 둔다",
        "why": "외래 키는 다른 표에 있는 행을 가리키는 규칙입니다. 자기 표에서 유일성을 보장하지 않습니다."
      },
      {
        "t": "order_id에 NOT NULL만 둔다",
        "why": "비어 있지 않게 할 뿐 중복은 허용합니다."
      }
    ]
  },
  {
    "id": "q2",
    "type": "mc",
    "q": "고객 번호는 기본 키이고, 외부 계정 코드는 반드시 있으며 값이 중복될 수 없습니다. 계정 코드에는 어떤 제약을 둡니까?",
    "answer": 2,
    "options": [
      {
        "t": "UNIQUE만 둔다",
        "why": "UNIQUE는 NULL을 여러 개 허용하므로 코드가 없는 고객이 생길 수 있습니다. '반드시 있음'은 따로 적어야 합니다."
      },
      {
        "t": "NOT NULL만 둔다",
        "why": "누락은 막지만 두 고객이 같은 코드를 갖는 것은 막지 못합니다."
      },
      {
        "t": "NOT NULL과 UNIQUE를 모두 둔다",
        "why": "NOT NULL이 누락을, UNIQUE가 중복을 막아 두 규칙을 모두 반영합니다. 기본 키는 customer_id에 그대로 둡니다."
      },
      {
        "t": "계정 코드를 기본 키로 바꾼다",
        "why": "이미 customer_id가 기본 키입니다. 업무 코드의 유일성은 기본 키를 바꾸지 않고 UNIQUE로 따로 명시합니다."
      }
    ]
  },
  {
    "id": "q3",
    "type": "mc",
    "q": "주문에 등록된 고객이 반드시 있어야 합니다. customer_id에 어떤 두 조건이 필요합니까?",
    "answer": 1,
    "options": [
      {
        "t": "UNIQUE와 FOREIGN KEY",
        "why": "주문 표의 customer_id는 한 고객의 여러 주문에서 반복되어야 하므로 UNIQUE를 두면 안 됩니다."
      },
      {
        "t": "NOT NULL과 FOREIGN KEY",
        "why": "외래 키가 실제 고객인지 확인하고, NOT NULL이 고객이 빠진 주문을 막습니다. 외래 키만으로는 NULL이 허용됩니다."
      },
      {
        "t": "FOREIGN KEY만",
        "why": "외래 키는 NULL을 허용하므로 고객 없는 주문을 막지 못합니다."
      },
      {
        "t": "NOT NULL과 CHECK (customer_id > 0)",
        "why": "양수인지는 보지만 그 번호의 고객이 실제로 등록되어 있는지는 확인하지 못합니다."
      }
    ]
  },
  {
    "id": "q4",
    "type": "mc",
    "q": "쿠폰액에 CHECK (coupon_won >= 0)만 있습니다. 값 −1과 NULL은 SQLite에서 각각 통과합니까?",
    "answer": 3,
    "options": [
      {
        "t": "둘 다 거부된다",
        "why": "NULL >= 0은 거짓이 아니라 UNKNOWN이고, CHECK는 거짓일 때만 거부합니다."
      },
      {
        "t": "둘 다 통과한다",
        "why": "−1 >= 0은 거짓이므로 거부됩니다."
      },
      {
        "t": "−1은 통과하고 NULL은 거부된다",
        "why": "거꾸로입니다. 음수는 조건이 거짓이라 거부되고 NULL은 통과합니다."
      },
      {
        "t": "−1은 거부되고 NULL은 통과한다",
        "why": "−1은 조건이 거짓이라 거부되고, NULL은 조건이 UNKNOWN이라 CHECK를 통과합니다. NULL을 막으려면 NOT NULL을 따로 둡니다."
      }
    ]
  },
  {
    "id": "q5",
    "type": "mc",
    "q": "정상적으로 알려진 주문액은 0 이상이고 누락을 허용하지 않습니다. total_won에 어떤 두 제약을 둡니까?",
    "answer": 0,
    "options": [
      {
        "t": "NOT NULL과 CHECK (total_won >= 0)",
        "why": "CHECK가 음수를 막고, CHECK가 통과시키는 NULL은 NOT NULL이 막습니다."
      },
      {
        "t": "CHECK (total_won >= 0)만",
        "why": "NULL은 이 CHECK를 통과하므로 누락을 막지 못합니다."
      },
      {
        "t": "UNIQUE와 CHECK (total_won >= 0)",
        "why": "여러 주문의 금액이 같을 수 있으므로 UNIQUE는 맞지 않고, 누락도 막지 못합니다."
      },
      {
        "t": "NOT NULL과 DEFAULT 0",
        "why": "기본값 0은 누락을 0원으로 바꿔 넣을 뿐 음수를 막지 못합니다."
      }
    ]
  },
  {
    "id": "q6",
    "type": "mc",
    "q": "SQLite 연결을 새로 열었습니다. 참조 무결성을 검증하려고 첫 트랜잭션 전에 어떤 SQL을 실행합니까?",
    "answer": 1,
    "options": [
      {
        "t": "PRAGMA foreign_keys = OFF",
        "why": "OFF는 검사를 끕니다."
      },
      {
        "t": "PRAGMA foreign_keys = ON",
        "why": "SQLite는 하위 호환 때문에 외래 키 검사가 기본으로 꺼져 있고, 이 설정은 연결마다 켜야 합니다."
      },
      {
        "t": "CREATE TABLE에 REFERENCES만 적으면 된다",
        "why": "REFERENCES로 규칙을 적어도 SQLite에서는 PRAGMA를 켜지 않으면 검사하지 않습니다."
      },
      {
        "t": "한 번 켜면 파일에 저장되어 다음 연결에도 적용된다",
        "why": "이 PRAGMA는 연결마다 적용됩니다. 새 연결에서는 다시 켜야 합니다."
      }
    ]
  },
  {
    "id": "q7",
    "type": "num",
    "q": "주문 원본이 4행입니다. 제약 위반 INSERT 한 문장이 SQLite 기본 동작에 의해 거부되고, 그 뒤 별도의 올바른 한 행을 저장했습니다. 결과 행 수는?",
    "answer": 5,
    "a": "거부된 문장은 행을 추가하지 못하므로 4+0+1=5행입니다."
  },
  {
    "id": "q8",
    "type": "short",
    "q": "orders.total_won은 CHECK (total_won >= 0)입니다. total_won=2000원인데 실제 항목 합은 3000원이라면 이 제약 하나로 모순을 발견할 수 있나요?",
    "a": "발견하지 못합니다. 이 CHECK는 주문액이 음수가 아닌지만 검사합니다. 여러 행에 걸친 합 일치는 별도로 검증해야 합니다."
  }
];
