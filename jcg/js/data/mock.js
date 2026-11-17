/* 2026년 3회 예상 모의고사 (gen/mock.py에서 생성) */
window.MOCK = [
 {
  "n": 1,
  "area": "보안",
  "kind": "term",
  "text": "다음은 공격 기법에 대한 설명이다. 각 설명에 해당하는 용어를 〈보기〉에서 골라 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>사용자가 정상적인 웹사이트 주소를 입력해도, DNS 정보나 hosts 파일을 변조해 공격자가 만든 가짜 사이트로 접속하게 만드는 공격</li><li>다른 곳에서 유출된 아이디와 비밀번호 목록을 여러 웹사이트에 자동으로 대입해 로그인을 시도하는 공격</li><li>출발지 IP 주소와 목적지 IP 주소를 공격 대상의 IP로 똑같이 위조한 패킷을 보내, 대상 시스템이 자기 자신에게 계속 응답하게 만드는 공격</li></ol><div class=\"boki\"><span class=\"boki-h\">〈보기〉</span><span>스미싱</span><span>파밍</span><span>피싱</span><span>크리덴셜 스터핑</span><span>랜드 어택</span><span>스머프</span><span>티어드롭</span><span>사회 공학</span><span>키로거</span><span>제로 데이</span></div>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "파밍",
     "pharming"
    ],
    "show": "파밍(Pharming)",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "크리덴셜스터핑",
     "credentialstuffing",
     "크리덴셜스터핑공격"
    ],
    "show": "크리덴셜 스터핑(Credential Stuffing)",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "랜드어택",
     "landattack",
     "랜드공격",
     "land"
    ],
    "show": "랜드 어택(Land Attack)",
    "mode": "term"
   }
  ],
  "explain": "<p>① 주소창에 정상 주소를 쳐도 DNS나 hosts 파일이 변조돼 가짜 사이트로 가는 것이 <b>파밍</b>입니다. 피싱은 가짜 링크나 메일로 유도하는 것이라 사용자가 '다른 주소'를 누르게 만든다는 점이 다릅니다.</p><p>② 이미 유출된 계정 목록을 다른 사이트에 대입하는 것은 <b>크리덴셜 스터핑</b>. 사람들이 같은 비밀번호를 여러 곳에 쓰는 점을 노립니다.</p><p>③ 출발지와 목적지 IP를 같게 위조하는 것은 <b>랜드 어택</b>. 스머프는 ICMP를 브로드캐스트로 증폭, 티어드롭은 조각난 패킷의 오프셋을 조작하는 공격입니다.</p>",
  "link": null,
  "why": "보안 공격 기법은 거의 매 회차 1~2문항. 최근에는 설명 여러 개를 보기에서 고르는 형식이 많습니다."
 },
 {
  "n": 2,
  "area": "C",
  "kind": "out",
  "text": "다음 C 프로그램의 출력 결과를 쓰시오.",
  "code": "#include <stdio.h>\nint main(void) {\n    int a[] = {3, 8, 1, 6, 4};\n    int *p = a, *q = a + 4;\n    int s = 0;\n    while (p < q) {\n        if (*p > *q) s += *p++;\n        else s -= *q--;\n    }\n    printf(\"%d %d\", s, *p);\n    return 0;\n}",
  "lang": "c",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "1 1"
    ],
    "show": "1 1",
    "mode": "out"
   }
  ],
  "explain": "<p>p는 앞에서, q는 뒤에서 출발해 가운데로 모입니다. 큰 쪽이 앞이면 p 값을 더하고 p를 옮기고, 아니면 q 값을 빼고 q를 옮깁니다.</p><div class=\"tablewrap\"><table class=\"trace\"><thead><tr><th>*p</th><th>*q</th><th>비교</th><th>s</th><th>이동</th></tr></thead><tbody><tr><td>3</td><td>4</td><td>3 > 4 거짓</td><td>-4</td><td>q → 6</td></tr><tr><td>3</td><td>6</td><td>거짓</td><td>-10</td><td>q → 1</td></tr><tr><td>3</td><td>1</td><td>참</td><td>-7</td><td>p → 8</td></tr><tr><td>8</td><td>1</td><td>참</td><td>1</td><td>p → 1 (a[2])</td></tr></tbody></table></div><p>이제 p와 q가 둘 다 a[2]를 가리켜 <code>p &lt; q</code>가 거짓이 되어 멈춥니다. *p는 1.</p>",
  "link": "c-memory.html#c-2",
  "why": "포인터 산술과 후위 증감(*p++, *q--)은 C 최다 출제 개념입니다."
 },
 {
  "n": 3,
  "area": "네트워크",
  "kind": "term",
  "text": "192.168.10.0/24 네트워크를 FLSM(고정 길이 서브넷 마스크) 방식으로 6개 이상의 서브넷으로 나누려 한다. 조건을 만족하는 범위에서 서브넷마다 호스트 수가 가장 많도록 나눌 때, 다음을 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>서브넷 마스크 (점으로 구분한 10진수)</li><li>세 번째 서브넷의 브로드캐스트 주소</li><li>서브넷 하나에서 호스트에 할당할 수 있는 IP 주소 개수</li></ol>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "255.255.255.224"
    ],
    "show": "255.255.255.224",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "192.168.10.95"
    ],
    "show": "192.168.10.95",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "30",
     "30개"
    ],
    "show": "30",
    "mode": "term"
   }
  ],
  "explain": "<p>6개 이상이 필요하니 서브넷 비트는 2³ = 8개가 되는 <b>3비트</b>. 프리픽스는 24 + 3 = /27, 마스크는 마지막 옥텟이 1110 0000 = <b>224</b>.</p><p>서브넷 하나의 크기는 2⁵ = 32. 첫 번째 0~31, 두 번째 32~63, 세 번째 <b>64~95</b>. 브로드캐스트는 마지막 주소 192.168.10.95.</p><p>호스트용은 32에서 네트워크 주소와 브로드캐스트 주소 2개를 빼서 <b>30</b>.</p>",
  "link": null,
  "why": "서브넷 계산은 몇 회차 걸러 반복되는 계산형입니다. 2비트·3비트 분할이 단골입니다."
 },
 {
  "n": 4,
  "area": "Java",
  "kind": "out",
  "text": "다음 Java 프로그램의 출력 결과를 쓰시오.",
  "code": "class A {\n    int x = 1;\n    static String id() { return \"A\"; }\n    int get() { return x; }\n    int calc() { return get() * 10 + x; }\n}\nclass B extends A {\n    int x = 5;\n    static String id() { return \"B\"; }\n    int get() { return x + 2; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        A o = new B();\n        System.out.print(o.calc() + o.x + o.id());\n    }\n}",
  "lang": "java",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "72A"
    ],
    "show": "72A",
    "mode": "out"
   }
  ],
  "explain": "<p><code>o.calc()</code>: calc는 B가 재정의하지 않았으니 A의 calc가 실행됩니다. 그 안의 <code>get()</code>은 B가 재정의했으니 <b>B.get()</b> = 5 + 2 = 7. 반면 calc 안의 <code>x</code>는 A 클래스 코드 안에 있으니 <b>A의 x = 1</b>. 7 × 10 + 1 = 71.</p><p><code>o.x</code>는 선언 타입 A의 필드 1. 71 + 1 = 72 (아직 숫자 덧셈).</p><p><code>o.id()</code>는 static이라 선언 타입 A의 것 → \"A\". 결과 \"72A\".</p>",
  "link": "java-oop.html#j-2",
  "why": "동적 바인딩 + 필드 숨김 + static을 한 문제에 섞는 것이 2024~2025년 Java의 전형입니다."
 },
 {
  "n": 5,
  "area": "SQL",
  "kind": "term",
  "text": "다음 [EMP], [DEPT] 테이블에 대해 SQL문 (가), (나)를 실행했을 때 물음에 답하시오.",
  "code": "-- (가)\nSELECT d.dname, COUNT(*) AS cnt, AVG(e.sal) AS av\nFROM EMP e JOIN DEPT d ON e.dno = d.dno\nGROUP BY d.dname\nHAVING AVG(e.sal) >= 300\nORDER BY av DESC;\n\n-- (나)\nSELECT COUNT(*)\nFROM EMP e LEFT JOIN DEPT d ON e.dno = d.dno\nWHERE d.dname IS NULL;",
  "lang": "sql",
  "extra": "<div class=\"duo\"><div><p class=\"muted\">[EMP]</p><div class=\"tablewrap\"><table class=\"data\"><thead><tr><th>eno</th><th>ename</th><th>dno</th><th>sal</th></tr></thead><tbody><tr><td>1</td><td>김</td><td>10</td><td>300</td></tr><tr><td>2</td><td>이</td><td>20</td><td>250</td></tr><tr><td>3</td><td>박</td><td>10</td><td>400</td></tr><tr><td>4</td><td>최</td><td>30</td><td>200</td></tr><tr><td>5</td><td>정</td><td>20</td><td>350</td></tr><tr><td>6</td><td>강</td><td><i>NULL</i></td><td>500</td></tr></tbody></table></div></div><div><p class=\"muted\">[DEPT]</p><div class=\"tablewrap\"><table class=\"data\"><thead><tr><th>dno</th><th>dname</th></tr></thead><tbody><tr><td>10</td><td>개발</td></tr><tr><td>20</td><td>영업</td></tr><tr><td>40</td><td>인사</td></tr></tbody></table></div></div></div><ol class=\"qlist\"><li>(가)의 결과 행 수</li><li>(가) 결과 첫 번째 행의 av 값</li><li>(나)의 결과 값</li></ol>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "2",
     "2행",
     "2개"
    ],
    "show": "2",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "350",
     "350.0"
    ],
    "show": "350",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "2",
     "2개"
    ],
    "show": "2",
    "mode": "term"
   }
  ],
  "explain": "<p>(가) 조인하면 dno가 10, 20인 4명만 남습니다(최는 30, 강은 NULL이라 짝 없음). 개발은 300, 400 → 평균 350, 영업은 250, 350 → 평균 300. 둘 다 300 이상이라 <b>2행</b>, 내림차순 첫 행은 <b>350</b>.</p><p>(나) LEFT JOIN은 EMP 6명이 모두 남고, 짝이 없는 최(30)와 강(NULL)은 dname이 NULL. <b>2</b>.</p>",
  "link": "sql-query.html#s-6",
  "why": "2026년부터 SQL이 회당 3~4문항으로 늘었고, 결과 계산형(JOIN + 집계)이 중심입니다."
 },
 {
  "n": 6,
  "area": "Python",
  "kind": "out",
  "text": "다음 Python 프로그램의 출력 결과를 쓰시오.",
  "code": "s = \"INFORMATION_PROCESSING\"\nt = s.split(\"_\")\nr = t[0][::3] + t[1][-3:].lower() + str(len(t[1][2:9:2]))\nprint(r)",
  "lang": "python",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "IOAOing4"
    ],
    "show": "IOAOing4",
    "mode": "out"
   }
  ],
  "explain": "<p>split으로 t = ['INFORMATION', 'PROCESSING'].</p><p><code>t[0][::3]</code>: 0, 3, 6, 9번 → I, O, A, O → \"IOAO\".</p><p><code>t[1][-3:]</code>: 뒤에서 세 글자 \"ING\" → lower() → \"ing\".</p><p><code>t[1][2:9:2]</code>: 2, 4, 6, 8번 → O, E, S, N → 길이 4 → \"4\".</p>",
  "link": "python-data.html#p-2",
  "why": "Python은 슬라이싱 + 문자열 메서드 조합이 가장 자주 나옵니다."
 },
 {
  "n": 7,
  "area": "SW공학",
  "kind": "term",
  "text": "다음은 GoF 디자인 패턴에 대한 설명이다. 각 설명에 해당하는 패턴을 〈보기〉에서 골라 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>클래스의 인스턴스를 오직 하나만 생성하도록 보장하고, 어디서든 그 인스턴스에 접근할 수 있게 하는 패턴</li><li>호환되지 않는 인터페이스를 가진 클래스를 함께 쓸 수 있도록, 한 클래스의 인터페이스를 클라이언트가 기대하는 인터페이스로 변환하는 패턴</li><li>한 객체의 상태가 변하면 그 객체에 의존하는 다른 객체들에게 자동으로 알리고 갱신되게 하는, 일대다 의존 관계를 정의하는 패턴</li></ol><div class=\"boki\"><span class=\"boki-h\">〈보기〉</span><span>Abstract Factory</span><span>Builder</span><span>Factory Method</span><span>Prototype</span><span>Singleton</span><span>Adapter</span><span>Bridge</span><span>Composite</span><span>Decorator</span><span>Facade</span><span>Proxy</span><span>Command</span><span>Iterator</span><span>Observer</span><span>State</span><span>Strategy</span><span>Visitor</span></div>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "singleton",
     "싱글톤",
     "싱글턴"
    ],
    "show": "Singleton(싱글톤)",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "adapter",
     "어댑터",
     "어답터"
    ],
    "show": "Adapter(어댑터)",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "observer",
     "옵저버",
     "옵서버"
    ],
    "show": "Observer(옵저버)",
    "mode": "term"
   }
  ],
  "explain": "<p>① 인스턴스를 하나만 만들고 어디서나 같은 객체를 쓰게 하는 생성 패턴: <b>Singleton</b>. Java 기출의 Connection.get()이 이 구조입니다.</p><p>② 서로 맞지 않는 인터페이스 사이에 끼워 변환하는 구조 패턴: <b>Adapter</b>. 기능을 덧붙이는 Decorator, 대리인 역할의 Proxy와 구분하세요.</p><p>③ 한 객체의 상태가 바뀌면 등록된 객체들에 자동으로 알리는 행위 패턴: <b>Observer</b>.</p>",
  "link": null,
  "why": "디자인 패턴은 분류(생성·구조·행위)나 이름 고르기로 꾸준히 나옵니다."
 },
 {
  "n": 8,
  "area": "C",
  "kind": "out",
  "text": "다음 C 프로그램의 출력 결과를 쓰시오.",
  "code": "#include <stdio.h>\ntypedef struct Node { int v; struct Node *next; } Node;\nvoid push(Node **h, Node *n) { n->next = *h; *h = n; }\nint main(void) {\n    Node n[5];\n    Node *head = NULL;\n    for (int i = 0; i < 5; i++) {\n        n[i].v = (i * 3) % 5;\n        push(&head, &n[i]);\n    }\n    Node *prev = NULL, *cur = head;\n    while (cur != NULL) {\n        if (cur->v % 2 == 0) {\n            if (prev == NULL) head = cur->next;\n            else prev->next = cur->next;\n        } else {\n            prev = cur;\n        }\n        cur = cur->next;\n    }\n    for (cur = head; cur != NULL; cur = cur->next) printf(\"%d\", cur->v);\n    return 0;\n}",
  "lang": "c",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "13"
    ],
    "show": "13",
    "mode": "out"
   }
  ],
  "explain": "<p>v 값은 i = 0~4일 때 (i × 3) % 5 = 0, 3, 1, 4, 2. push는 맨 앞 삽입이라 리스트는 <b>2 → 4 → 1 → 3 → 0</b>.</p><p>짝수 노드를 지웁니다. 2와 4는 맨 앞이라 prev가 NULL이고, head를 옮겨서 지웁니다. 1, 3은 남기고 prev를 옮기고, 0은 prev(3)의 next를 건너뛰게 해서 지웁니다. 남는 것은 1 → 3.</p><p>함정: <code>push(&amp;head, ...)</code>로 head의 <b>주소</b>를 넘기기 때문에 함수 안의 <code>*h = n</code>이 main의 head를 바꿉니다.</p>",
  "link": "c-struct.html#c-11",
  "why": "2025년부터 매 회차 연결리스트가 나왔고, 노드 삭제·이동과 이중 포인터로 난도가 오르는 중입니다."
 },
 {
  "n": 9,
  "area": "Java",
  "kind": "out",
  "text": "다음 Java 프로그램의 출력 결과를 쓰시오.",
  "code": "public class Main {\n    static int cnt = 0;\n    static int run(int[] a, int i) {\n        try {\n            cnt++;\n            return a[i] / (i - 1);\n        } catch (ArithmeticException e) {\n            return -1;\n        } catch (ArrayIndexOutOfBoundsException e) {\n            return -2;\n        } finally {\n            cnt += 10;\n        }\n    }\n    public static void main(String[] args) {\n        int[] a = {4, 6, 8};\n        int s = 0;\n        for (int i = 0; i < 4; i++) s += run(a, i);\n        System.out.print(s + \" \" + cnt);\n    }\n}",
  "lang": "java",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "1 44"
    ],
    "show": "1 44",
    "mode": "out"
   }
  ],
  "explain": "<div class=\"tablewrap\"><table class=\"trace\"><thead><tr><th>i</th><th>계산</th><th>반환</th><th>cnt</th></tr></thead><tbody><tr><td>0</td><td>4 / (0 - 1) = -4</td><td>-4</td><td>1 → 11</td></tr><tr><td>1</td><td>6 / 0 → ArithmeticException</td><td>-1</td><td>12 → 22</td></tr><tr><td>2</td><td>8 / 1 = 8</td><td>8</td><td>23 → 33</td></tr><tr><td>3</td><td>a[3] → 범위 초과</td><td>-2</td><td>34 → 44</td></tr></tbody></table></div><p>합은 -4 - 1 + 8 - 2 = <b>1</b>. return이 있어도 finally는 매번 실행되니 cnt는 호출마다 11씩 늘어 <b>44</b>.</p>",
  "link": "java-api.html#j-12",
  "why": "예외 처리는 2024-3, 2025-1, 2025-2에 연속 출제. finally와 return의 순서가 핵심입니다."
 },
 {
  "n": 10,
  "area": "SW공학",
  "kind": "term",
  "text": "다음은 블랙박스 테스트 기법에 대한 설명이다. 각 설명에 해당하는 기법을 〈보기〉에서 골라 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>입력 조건의 경계 근처에서 결함이 많이 발생한다는 점을 이용해, 경계값과 그 바로 안팎의 값을 테스트 데이터로 선정하는 기법</li><li>입력 조건의 조합과 각 조합에 따른 동작을 표로 정리하여 테스트 케이스를 도출하는 기법</li><li>입력 데이터의 영역을 유효한 값과 무효한 값의 그룹으로 나누고, 각 그룹의 대표값을 테스트 케이스로 선정하는 기법</li></ol><div class=\"boki\"><span class=\"boki-h\">〈보기〉</span><span>동등 분할</span><span>경계값 분석</span><span>원인-결과 그래프</span><span>결정 테이블</span><span>상태 전이</span><span>페어와이즈</span><span>오류 예측</span><span>비교 검사</span><span>기초 경로</span><span>조건 검사</span></div>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "경계값분석",
     "경계값분석테스트",
     "경계값",
     "boundaryvalueanalysis"
    ],
    "show": "경계값 분석",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "결정테이블",
     "결정테이블테스트",
     "decisiontable",
     "의사결정테이블"
    ],
    "show": "결정 테이블",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "동등분할",
     "동치분할",
     "동등분할테스트",
     "동치분할테스트",
     "equivalencepartitioning"
    ],
    "show": "동등 분할",
    "mode": "term"
   }
  ],
  "explain": "<p>① 오류는 범위의 가장자리에서 잘 나기 때문에 최솟값·최댓값과 그 바로 밖의 값을 고르는 것이 <b>경계값 분석</b>.</p><p>② 조건 조합과 그에 따른 동작을 표로 정리해 케이스를 뽑는 것이 <b>결정 테이블</b>. 그래프로 그리면 원인-결과 그래프입니다.</p><p>③ 입력을 유효·무효 그룹으로 나누고 그룹마다 대표값 하나로 테스트하는 것이 <b>동등 분할</b>(동치 분할). 2020-4 15번에 같은 개념이 나왔습니다.</p>",
  "link": null,
  "why": "테스트 기법(블랙박스·화이트박스, 커버리지, 오라클)은 SW공학에서 가장 자주 나오는 영역입니다."
 },
 {
  "n": 11,
  "area": "SQL",
  "kind": "term",
  "text": "다음은 [주문] 테이블을 생성하는 SQL문이다. 조건을 만족하도록 빈칸 ①~⑤에 들어갈 키워드를 쓰시오.",
  "code": "CREATE TABLE 주문 (\n    주문번호  INT ( ① ) KEY,\n    고객ID    VARCHAR(10) NOT NULL,\n    수량      INT ( ② ) (수량 > 0),\n    ( ③ ) KEY (고객ID) ( ④ ) 고객(고객ID)\n        ON DELETE ( ⑤ )\n);",
  "lang": "sql",
  "extra": "<ul class=\"qcond\"><li>주문번호는 기본키이다.</li><li>수량은 0보다 커야 한다.</li><li>고객ID는 [고객] 테이블의 고객ID를 참조한다.</li><li>참조하는 고객이 삭제되면 그 고객의 주문도 함께 삭제된다.</li></ul>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "primary"
    ],
    "show": "PRIMARY",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "check"
    ],
    "show": "CHECK",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "foreign"
    ],
    "show": "FOREIGN",
    "mode": "term"
   },
   {
    "label": "④",
    "accept": [
     "references"
    ],
    "show": "REFERENCES",
    "mode": "term"
   },
   {
    "label": "⑤",
    "accept": [
     "cascade"
    ],
    "show": "CASCADE",
    "mode": "term"
   }
  ],
  "explain": "<p>기본키 PRIMARY KEY, 값 조건 CHECK, 외래키 FOREIGN KEY ... REFERENCES 참조테이블(열). 참조되는 고객이 지워질 때 딸린 주문도 함께 지우는 동작이 ON DELETE <b>CASCADE</b>입니다. 지우지 못하게 막으려면 RESTRICT, 외래키를 NULL로 바꾸려면 SET NULL.</p>",
  "link": "sql-ddl.html#s-10",
  "why": "2026-1 10번(외래키 빈칸 5개), 2026-2 19번(CHECK)처럼 DDL 제약조건 빈칸이 연속으로 나왔습니다."
 },
 {
  "n": 12,
  "area": "C",
  "kind": "out",
  "text": "다음 C 프로그램의 출력 결과를 쓰시오.",
  "code": "#include <stdio.h>\nint f(int n) {\n    if (n <= 1) return n;\n    return f(n >> 1) + (n & 1);\n}\nint main(void) {\n    int x = 29;\n    printf(\"%d %d\", f(x), x ^ (x >> 2));\n    return 0;\n}",
  "lang": "c",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "4 26"
    ],
    "show": "4 26",
    "mode": "out"
   }
  ],
  "explain": "<p>f는 n을 오른쪽으로 한 칸씩 밀면서 맨 끝 비트(n &amp; 1)를 더합니다. 즉 <b>1인 비트의 개수</b>. 29 = 11101(2)라서 4.</p><p>29 &gt;&gt; 2 = 00111 = 7. 11101 ^ 00111 = 11010 = <b>26</b>.</p>",
  "link": "c-struct.html#c-17",
  "why": "비트 연산은 2025년에만 세 번 나왔습니다. 재귀와 섞으면 한 문제로 두 개념을 볼 수 있습니다."
 },
 {
  "n": 13,
  "area": "Python",
  "kind": "out",
  "text": "다음 Python 프로그램의 출력 결과를 쓰시오.",
  "code": "data = {'a': [1, 2], 'b': [3]}\ncp = dict(data)\ncp['a'].append(9)\ncp['b'] = [4, 5]\nres = [k * len(v) for k, v in data.items()]\nprint(res, sum(len(v) for v in cp.values()))",
  "lang": "python",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "['aaa', 'b'] 5"
    ],
    "show": "['aaa', 'b'] 5",
    "mode": "out"
   }
  ],
  "explain": "<p><code>dict(data)</code>는 얕은 복사라 값 리스트는 공유합니다. <code>cp['a'].append(9)</code>는 공유 중인 리스트 안을 고쳐서 data['a']도 [1, 2, 9]. <code>cp['b'] = [4, 5]</code>는 cp의 칸만 새 리스트로 바꿔서 data['b']는 [3] 그대로.</p><p>res는 키 문자열 × 길이: 'a' × 3 = 'aaa', 'b' × 1 = 'b'. cp의 길이 합은 3 + 2 = 5.</p>",
  "link": "python-data.html#p-1",
  "why": "2026-1 14번에 얕은 복사가 처음 나왔고, 2025년엔 딕셔너리·컴프리헨션이 연속 출제됐습니다."
 },
 {
  "n": 14,
  "area": "DB",
  "kind": "term",
  "text": "다음은 정규화 과정에 대한 설명이다. 빈칸에 들어갈 정규형을 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>1NF를 만족하고, 기본키의 일부에만 종속되는 <b>부분 함수 종속</b>을 제거한 정규형</li><li>( ① )를 만족하고, A → B, B → C 일 때 A → C가 되는 <b>이행적 함수 종속</b>을 제거한 정규형</li><li>( ② )를 만족하고, <b>결정자이면서 후보키가 아닌 것</b>을 제거해 모든 결정자가 후보키가 되도록 한 정규형</li></ol>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "2nf",
     "제2정규형",
     "2정규형"
    ],
    "show": "제2정규형(2NF)",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "3nf",
     "제3정규형",
     "3정규형"
    ],
    "show": "제3정규형(3NF)",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "bcnf",
     "보이스코드정규형"
    ],
    "show": "BCNF",
    "mode": "term"
   }
  ],
  "explain": "<p>1NF(원자값) → <b>2NF</b>(부분 함수 종속 제거) → <b>3NF</b>(이행 함수 종속 제거) → <b>BCNF</b>(결정자이면서 후보키가 아닌 것 제거) → 4NF(다치 종속) → 5NF(조인 종속).</p><p>외우는 법: <b>도부이결다조</b> (도메인 원자값, 부분, 이행, 결정자, 다치, 조인).</p>",
  "link": "sql-ddl.html#s-13",
  "why": "정규화·이상현상·함수 종속은 DB 이론의 단골입니다."
 },
 {
  "n": 15,
  "area": "Java",
  "kind": "out",
  "text": "다음 Java 프로그램의 출력 결과를 쓰시오.",
  "code": "class P {\n    P() { System.out.print(\"P\"); init(); }\n    void init() { System.out.print(\"1\"); }\n}\nclass C extends P {\n    int n = 3;\n    C() { this(7); System.out.print(\"C\"); }\n    C(int k) { System.out.print(k + n); }\n    void init() { System.out.print(n); }\n}\npublic class Main {\n    public static void main(String[] args) { new C(); }\n}",
  "lang": "java",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "P010C"
    ],
    "show": "P010C",
    "mode": "out"
   }
  ],
  "explain": "<ol class='steps'><li><code>new C()</code> → C() 의 첫 줄 <code>this(7)</code>로 C(int)로 이동</li><li>C(int)의 첫 줄에 숨은 <code>super()</code> → P() 실행: <b>P</b> 출력</li><li>P() 안의 init()은 실제 객체가 C라서 <b>C.init()</b>. 그런데 n은 아직 초기화 전이라 <b>0</b></li><li>부모 생성자가 끝나야 <code>n = 3</code> 초기화</li><li>C(int) 본문: k + n = 7 + 3 = <b>10</b></li><li>C() 본문 나머지: <b>C</b></li></ol>",
  "link": "java-oop.html#j-3",
  "why": "생성자 순서(this, super) + 부모 생성자 안의 재정의 메서드 호출은 2025-1 13번의 변형입니다."
 },
 {
  "n": 16,
  "area": "운영체제",
  "kind": "term",
  "text": "3개의 페이지 프레임을 가진 시스템에서 다음 순서로 페이지를 참조한다. 처음에 프레임은 모두 비어 있을 때, 각 기법의 페이지 부재(Page Fault) 횟수를 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<p class=\"refseq\">참조열: <b>1 2 3 4 1 2 5 1 2 3 4 5</b></p><ol class=\"qlist\"><li>LRU</li><li>FIFO</li></ol>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "10",
     "10회",
     "10번"
    ],
    "show": "10",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "9",
     "9회",
     "9번"
    ],
    "show": "9",
    "mode": "term"
   }
  ],
  "explain": "<p><b>LRU</b>(가장 오래 쓰지 않은 것을 교체): 1, 2, 3, 4, 1, 2, 5 까지 모두 부재(7회), 1, 2 적중, 3 부재(5 교체), 4 부재(1 교체), 5 부재(2 교체) → <b>10회</b>.</p><p><b>FIFO</b>(가장 먼저 들어온 것을 교체): 1, 2, 3, 4, 1, 2, 5 부재(7회), 1, 2 적중, 3 부재(1 교체), 4 부재(2 교체), 5 적중 → <b>9회</b>.</p><p>덤: 같은 참조열에서 FIFO에 프레임을 4개로 늘리면 오히려 10회가 됩니다. 이것이 <b>벨레이디의 모순</b>(Belady's Anomaly)입니다.</p>",
  "link": null,
  "why": "운영체제는 몇 회에 한 번이지만 나오면 계산형(페이지 교체, 스케줄링 평균 대기 시간)입니다."
 },
 {
  "n": 17,
  "area": "C",
  "kind": "out",
  "text": "다음 C 프로그램의 출력 결과를 쓰시오.",
  "code": "#include <stdio.h>\ntypedef struct { char name[8]; int score[3]; } S;\nint main(void) {\n    S s[2] = { {\"KIM\", {70, 85, 90}}, {\"LEE\", {95, 60, 80}} };\n    S *p = s + 1;\n    int *q = s[0].score;\n    printf(\"%c%d %d\", *(p->name + 1), *(q + 2) - p->score[1],\n           (*(p - 1)).score[0] + p[0].score[2]);\n    return 0;\n}",
  "lang": "c",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "E30 150"
    ],
    "show": "E30 150",
    "mode": "out"
   }
  ],
  "explain": "<p>p = s + 1이니 p는 s[1](LEE). <code>*(p->name + 1)</code>은 \"LEE\"의 두 번째 글자 <b>E</b>.</p><p>q는 s[0].score의 시작. <code>*(q + 2)</code> = 90, <code>p->score[1]</code> = 60 → <b>30</b>. %c와 %d 사이에 공백이 없어서 E30이 붙어 나옵니다.</p><p><code>(*(p - 1)).score[0]</code>은 s[0].score[0] = 70, <code>p[0].score[2]</code>는 s[1].score[2] = 80 → <b>150</b>.</p>",
  "link": "c-struct.html#c-9",
  "why": "구조체 배열 + 포인터 + ->, 그리고 서식 문자 사이 공백까지 보는 문제입니다."
 },
 {
  "n": 18,
  "area": "SQL",
  "kind": "term",
  "text": "5번 문제의 [EMP] 테이블에 대해 다음 SQL문의 결과 값을 각각 쓰시오.",
  "code": "-- ①\nSELECT COUNT(*) FROM EMP\nWHERE sal > ALL (SELECT sal FROM EMP WHERE dno = 20);\n\n-- ②\nSELECT COUNT(*) FROM EMP\nWHERE dno NOT IN (10, 20);",
  "lang": "sql",
  "extra": "",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "2"
    ],
    "show": "2",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "1"
    ],
    "show": "1",
    "mode": "term"
   }
  ],
  "explain": "<p>① 서브쿼리는 dno 20인 sal 250, 350. <b>&gt; ALL</b>은 전부보다 커야 하니 350보다 큰 박(400), 강(500) → <b>2</b>.</p><p>② 10, 20이 아닌 사람은 최(30)와 강(NULL)처럼 보이지만, NULL은 어떤 비교를 해도 참이 아니라서 <code>NOT IN</code>에서도 빠집니다 → <b>1</b>.</p>",
  "link": "sql-query.html#s-3",
  "why": "ALL·ANY(2022-2)와 NULL 함정을 결과 계산형으로 묶었습니다."
 },
 {
  "n": 19,
  "area": "SW공학",
  "kind": "term",
  "text": "다음은 모듈 간 결합도에 대한 설명이다. 각 설명에 해당하는 결합도를 〈보기〉에서 골라 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>모듈 간에 배열이나 구조체 같은 자료 구조를 인터페이스로 전달할 때의 결합도</li><li>한 모듈이 다른 모듈의 내부 기능이나 내부 자료를 직접 참조하거나 수정할 때의 결합도</li><li>한 모듈이 다른 모듈의 처리 흐름을 제어하기 위해 제어 신호(플래그 등)를 전달할 때의 결합도</li></ol><div class=\"boki\"><span class=\"boki-h\">〈보기〉</span><span>자료 결합도</span><span>스탬프 결합도</span><span>제어 결합도</span><span>외부 결합도</span><span>공통 결합도</span><span>내용 결합도</span><span>기능적 응집도</span><span>순차적 응집도</span><span>논리적 응집도</span><span>우연적 응집도</span></div>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "스탬프결합도",
     "스탬프",
     "stampcoupling",
     "stamp"
    ],
    "show": "스탬프 결합도",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "내용결합도",
     "내용",
     "contentcoupling",
     "content"
    ],
    "show": "내용 결합도",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "제어결합도",
     "제어",
     "controlcoupling",
     "control"
    ],
    "show": "제어 결합도",
    "mode": "term"
   }
  ],
  "explain": "<p>결합도 약한 순(좋은 순): <b>자료 &lt; 스탬프 &lt; 제어 &lt; 외부 &lt; 공통 &lt; 내용</b>. 외우는 법: 자스제외공내.</p><p>① 배열·구조체 같은 자료구조째 넘김 → <b>스탬프</b>. 값 몇 개만 넘기면 자료 결합도.</p><p>② 남의 내부를 직접 건드림 → <b>내용</b>(가장 나쁨).</p><p>③ 플래그 같은 제어 신호로 상대의 흐름을 바꿈 → <b>제어</b>.</p><p>응집도는 반대로 강할수록 좋음: 기능 &gt; 순차 &gt; 교환(통신) &gt; 절차 &gt; 시간 &gt; 논리 &gt; 우연.</p>",
  "link": null,
  "why": "결합도·응집도는 종류와 순서를 묻는 형태로 반복 출제됐습니다."
 },
 {
  "n": 20,
  "area": "보안",
  "kind": "term",
  "text": "다음은 암호 알고리즘에 대한 설명이다. 각 설명에 해당하는 알고리즘을 〈보기〉에서 골라 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>미국 NIST가 DES를 대체하기 위해 채택한 표준 대칭키 블록 암호로, 128비트 블록에 128·192·256비트 키를 사용한다.</li><li>큰 수를 소인수분해하기 어렵다는 점에 기반한 대표적인 공개키(비대칭키) 암호 알고리즘이다.</li><li>1999년 한국인터넷진흥원(KISA)이 개발한 128비트 블록 대칭키 암호 알고리즘이다.</li></ol><div class=\"boki\"><span class=\"boki-h\">〈보기〉</span><span>DES</span><span>AES</span><span>SEED</span><span>ARIA</span><span>IDEA</span><span>RSA</span><span>ECC</span><span>ElGamal</span><span>SHA-256</span><span>MD5</span></div>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "aes"
    ],
    "show": "AES",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "rsa"
    ],
    "show": "RSA",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "seed"
    ],
    "show": "SEED",
    "mode": "term"
   }
  ],
  "explain": "<p>① DES를 대체한 미국 표준 대칭키 블록 암호: <b>AES</b>.</p><p>② 소인수분해의 어려움을 이용한 공개키(비대칭) 암호: <b>RSA</b>. 이산대수 기반은 ElGamal, 타원곡선 기반은 ECC.</p><p>③ 1999년 KISA가 개발한 국산 128비트 블록 암호: <b>SEED</b>. ARIA도 국산 블록 암호지만 2004년 국가보안연구소 주도로 만들어졌습니다.</p><p>SHA-256, MD5는 암호화가 아니라 해시(되돌릴 수 없음)입니다.</p>",
  "link": null,
  "why": "암호 알고리즘(대칭·비대칭·해시 구분)은 보안 영역의 고정 출제 주제입니다."
 }
];
