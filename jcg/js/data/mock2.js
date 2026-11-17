/* 2026년 3회 예상 모의고사 ② (gen/mock2.py에서 생성) */
window.MOCK = [
 {
  "n": 1,
  "area": "보안",
  "kind": "term",
  "text": "다음은 서비스 거부(DoS) 공격에 대한 설명이다. 각 설명에 해당하는 공격 기법을 〈보기〉에서 골라 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>TCP 3-way handshake 과정에서 SYN 패킷만 대량으로 보내고 마지막 ACK를 보내지 않아, 서버의 연결 대기 큐를 가득 채워 정상 연결을 받지 못하게 하는 공격</li><li>출발지 주소를 공격 대상의 IP로 위조한 ICMP Echo Request 패킷을 네트워크의 브로드캐스트 주소로 보내, 많은 호스트의 응답이 공격 대상에게 한꺼번에 몰리게 하는 공격</li><li>IP 패킷을 분할(fragmentation)할 때 각 조각의 오프셋 값을 서로 겹치거나 어긋나게 조작해, 수신 측이 재조합하는 과정에서 오류나 시스템 다운을 일으키는 공격</li></ol><div class=\"boki\"><span class=\"boki-h\">〈보기〉</span><span>Ping of Death</span><span>SYN Flooding</span><span>Smurf</span><span>Teardrop</span><span>Land Attack</span><span>HTTP GET Flooding</span><span>Slowloris</span><span>UDP Flooding</span></div>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "synflooding",
     "syn플러딩",
     "syn플루딩"
    ],
    "show": "SYN Flooding",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "smurf",
     "스머프",
     "스머핑",
     "smurfing",
     "스머프공격"
    ],
    "show": "Smurf(스머프)",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "teardrop",
     "티어드롭",
     "티어드랍"
    ],
    "show": "Teardrop(티어드롭)",
    "mode": "term"
   }
  ],
  "explain": "<p>① 3-way handshake의 SYN만 보내고 마지막 ACK를 안 보내서 서버의 '반쯤 열린 연결' 대기열을 채우는 것: <b>SYN Flooding</b>.</p><p>② ICMP Echo Request를 <b>브로드캐스트</b>로 보내 응답을 증폭시켜 대상에게 몰아주는 것: <b>Smurf</b>. Ping of Death는 브로드캐스트가 아니라 규정보다 <b>큰</b> ICMP 패킷 하나로 공격합니다.</p><p>③ 조각난 패킷의 오프셋(Fragment Offset)을 겹치게 조작해 재조합 오류를 내는 것: <b>Teardrop</b>. 출발지·목적지 IP를 같게 하는 Land와 구분하세요.</p>",
  "link": null,
  "why": "보안 공격은 매 회차 나옵니다. 2026년 1회에 워터링 홀, 2회에 해시가 나왔으니 3회에는 DoS 계열을 구분하는 문제가 나올 가능성이 높습니다."
 },
 {
  "n": 2,
  "area": "C",
  "kind": "out",
  "text": "다음 C 프로그램의 출력 결과를 쓰시오.",
  "code": "#include <stdio.h>\nint main(void) {\n    int a[3][4] = { {1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12} };\n    int *p[3] = { a[2], a[0], a[1] };\n    int (*q)[4] = a + 1;\n    int s = 0;\n    for (int i = 0; i < 3; i++) s += *(p[i] + i);\n    printf(\"%d %d %d\", s, *(*q + 2), **(q + 1) - *p[1]);\n    return 0;\n}",
  "lang": "c",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "18 7 8"
    ],
    "show": "18 7 8",
    "mode": "out"
   }
  ],
  "explain": "<p>p는 행의 순서를 섞어 둔 포인터 배열입니다: p[0] = a[2], p[1] = a[0], p[2] = a[1].</p><div class=\"tablewrap\"><table class=\"trace\"><thead><tr><th>i</th><th>p[i]</th><th>*(p[i] + i)</th></tr></thead><tbody><tr><td>0</td><td>a[2]</td><td>a[2][0] = 9</td></tr><tr><td>1</td><td>a[0]</td><td>a[0][1] = 2</td></tr><tr><td>2</td><td>a[1]</td><td>a[1][2] = 7</td></tr></tbody></table></div><p>s = 18. <code>int (*q)[4]</code>는 '<b>길이 4인 배열(한 행)을 가리키는 포인터</b>'라서 +1 하면 한 행씩 이동합니다. q = a + 1이므로 q는 1행.</p><p><code>*(*q + 2)</code> = a[1][2] = 7. <code>**(q + 1)</code> = a[2][0] = 9, <code>*p[1]</code> = a[0][0] = 1 → 8.</p>",
  "link": "c-struct.html#c-14",
  "why": "포인터 배열(2024-2), 이중 포인터(2024-3, 2025-2)에 '배열 포인터 int (*q)[4]'를 얹은 고난도 변형입니다."
 },
 {
  "n": 3,
  "area": "Java",
  "kind": "out",
  "text": "다음 Java 프로그램의 출력 결과를 쓰시오.",
  "code": "class A {\n    void f(int x)    { System.out.print(\"A\" + x); }\n    void f(double x) { System.out.print(\"Ad\" + x); }\n    void g()         { f(3); }\n}\nclass B extends A {\n    void f(int x)  { System.out.print(\"B\" + x); super.f(x + 1); }\n    void f(long x) { System.out.print(\"BL\" + x); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        A o = new B();\n        o.g();\n        System.out.print(\"/\");\n        o.f(2L);\n        System.out.print(\"/\");\n        ((B) o).f(2L);\n    }\n}",
  "lang": "java",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "B3A4/Ad2.0/BL2"
    ],
    "show": "B3A4/Ad2.0/BL2",
    "mode": "out"
   }
  ],
  "explain": "<p><b>o.g()</b>: g는 A에만 있음. 그 안의 <code>f(3)</code>은 컴파일 때 A의 목록에서 고르는데 3은 int라 <b>f(int)</b>로 결정. 실행 때 B가 f(int)를 재정의했으니 <b>B.f(int)</b> → \"B3\", 그리고 <code>super.f(4)</code> → A.f(int) → \"A4\".</p><p><b>o.f(2L)</b>: 선언 타입이 A라 A의 f(int), f(double)만 후보. long은 int로 줄어들 수 없고 double로는 넓혀질 수 있어서 <b>f(double)</b>. B가 f(double)을 재정의하지 않았으니 A 것 → \"Ad2.0\" (double이라 .0이 붙음).</p><p><b>((B) o).f(2L)</b>: 이제 B의 목록까지 보이니 정확히 맞는 <b>f(long)</b> → \"BL2\".</p>",
  "link": "java-oop.html#j-4",
  "why": "2026-1 7번이 '오버로딩은 선언 타입, 오버라이딩은 실제 객체'였습니다. 여기에 자동 형변환(long → double)과 super를 더했습니다."
 },
 {
  "n": 4,
  "area": "네트워크",
  "kind": "term",
  "text": "172.16.0.0/24 네트워크를 VLSM 방식으로 나누어 부서 A(호스트 100대), 부서 B(호스트 50대), 부서 C(호스트 20대)에 할당하려 한다. 필요한 호스트 수가 많은 부서부터 낮은 주소를 차례로 할당하고, 각 부서에는 조건을 만족하는 가장 작은 서브넷을 줄 때 다음을 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>부서 B 서브넷의 네트워크 주소를 CIDR 표기로 (예: 10.0.0.0/8)</li><li>부서 C 서브넷의 브로드캐스트 주소</li><li>부서 C 서브넷의 서브넷 마스크 (점으로 구분한 10진수)</li></ol>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "172.16.0.128/26"
    ],
    "show": "172.16.0.128/26",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "172.16.0.223"
    ],
    "show": "172.16.0.223",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "255.255.255.224"
    ],
    "show": "255.255.255.224",
    "mode": "term"
   }
  ],
  "explain": "<p>호스트 수 + 2(네트워크·브로드캐스트) 이상인 가장 작은 2의 거듭제곱이 블록 크기입니다.</p><div class=\"tablewrap\"><table class=\"trace\"><thead><tr><th>부서</th><th>필요</th><th>블록</th><th>프리픽스</th><th>범위</th></tr></thead><tbody><tr><td>A</td><td>100 + 2 = 102</td><td>128</td><td>/25</td><td>.0 ~ .127</td></tr><tr><td>B</td><td>50 + 2 = 52</td><td>64</td><td>/26</td><td><b>.128</b> ~ .191</td></tr><tr><td>C</td><td>20 + 2 = 22</td><td>32</td><td>/27</td><td>.192 ~ <b>.223</b></td></tr></tbody></table></div><p>C는 /27이므로 마스크 마지막 칸이 1110 0000 = 224.</p>",
  "link": null,
  "why": "2026년 1회(CIDR 네트워크 주소)와 2회(서브넷 분할, IP 빈칸)에 연속으로 나왔습니다. 3회에는 호스트 수 기준 VLSM이 유력합니다."
 },
 {
  "n": 5,
  "area": "SQL",
  "kind": "term",
  "text": "다음 [학생], [수강] 테이블에 대해 SQL문을 실행했을 때 물음에 답하시오.",
  "code": "SELECT s.학과, COUNT(*) AS c1, COUNT(c.점수) AS c2, AVG(c.점수) AS av\nFROM 학생 s LEFT JOIN 수강 c ON s.학번 = c.학번\nGROUP BY s.학과\nHAVING COUNT(c.과목) >= 2\nORDER BY av DESC;",
  "lang": "sql",
  "extra": "<div class=\"duo\"><div><p class=\"muted\">[학생]</p><div class=\"tablewrap\"><table class=\"data\"><thead><tr><th>학번</th><th>이름</th><th>학과</th></tr></thead><tbody><tr><td>1</td><td>김</td><td>컴</td></tr><tr><td>2</td><td>이</td><td>컴</td></tr><tr><td>3</td><td>박</td><td>전자</td></tr><tr><td>4</td><td>최</td><td>전자</td></tr><tr><td>5</td><td>정</td><td>기계</td></tr></tbody></table></div></div><div><p class=\"muted\">[수강]</p><div class=\"tablewrap\"><table class=\"data\"><thead><tr><th>학번</th><th>과목</th><th>점수</th></tr></thead><tbody><tr><td>1</td><td>DB</td><td>90</td></tr><tr><td>1</td><td>OS</td><td>70</td></tr><tr><td>2</td><td>DB</td><td><i>NULL</i></td></tr><tr><td>3</td><td>DB</td><td>80</td></tr><tr><td>3</td><td>OS</td><td>60</td></tr><tr><td>4</td><td>NW</td><td>95</td></tr><tr><td>9</td><td>DB</td><td>100</td></tr></tbody></table></div></div></div><ol class=\"qlist\"><li>결과 행의 수</li><li>첫 번째 행의 c1 값</li><li>첫 번째 행의 c2 값</li></ol>",
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
     "3"
    ],
    "show": "3",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "2"
    ],
    "show": "2",
    "mode": "term"
   }
  ],
  "explain": "<p>LEFT JOIN이라 학생 5명이 모두 남습니다. 컴: 김 2행 + 이 1행(점수 NULL) = 3행. 전자: 박 2행 + 최 1행 = 3행. 기계: 정은 수강이 없어 과목·점수가 NULL인 1행. 학번 9는 학생 표에 없어서 빠집니다.</p><p>HAVING <code>COUNT(c.과목) &gt;= 2</code>: 기계는 과목이 NULL이라 0 → 탈락. 남는 건 컴, 전자 <b>2행</b>.</p><p>평균: 컴 (90 + 70) / 2 = 80 (NULL 제외), 전자 (80 + 60 + 95) / 3 ≈ 78.3. 내림차순 첫 행은 컴. c1은 <code>COUNT(*)</code>라 NULL 행도 세서 <b>3</b>, c2는 <code>COUNT(c.점수)</code>라 NULL을 빼고 <b>2</b>.</p>",
  "link": "sql-query.html#s-3",
  "why": "2026년 SQL은 회당 3~4문항, 결과 계산형 중심입니다. LEFT JOIN + COUNT(*)와 COUNT(열)의 NULL 차이를 한 번에 봅니다."
 },
 {
  "n": 6,
  "area": "Python",
  "kind": "out",
  "text": "다음 Python 프로그램의 출력 결과를 쓰시오.",
  "code": "data = [\"kiwi\", \"apple\", \"fig\", \"banana\", \"cherry\"]\nr = sorted(data, key=lambda w: (len(w) % 3, w[::-1]))\nprint(r[:3], [w[1::2] for w in r if 'a' in w][-1])",
  "lang": "python",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "['banana', 'fig', 'cherry'] pl"
    ],
    "show": "['banana', 'fig', 'cherry'] pl",
    "mode": "out"
   }
  ],
  "explain": "<p>정렬 키는 튜플 (글자 수 % 3, 단어를 뒤집은 것). 튜플은 첫 값으로 먼저, 같으면 둘째 값으로 비교합니다.</p><div class=\"tablewrap\"><table class=\"trace\"><thead><tr><th>단어</th><th>len % 3</th><th>w[::-1]</th></tr></thead><tbody><tr><td>kiwi</td><td>1</td><td>iwik</td></tr><tr><td>apple</td><td>2</td><td>elppa</td></tr><tr><td>fig</td><td>0</td><td>gif</td></tr><tr><td>banana</td><td>0</td><td>ananab</td></tr><tr><td>cherry</td><td>0</td><td>yrrehc</td></tr></tbody></table></div><p>첫 값이 0인 셋을 뒤집은 글자로 비교하면 ananab &lt; gif &lt; yrrehc → banana, fig, cherry. 이어서 kiwi(1), apple(2). r[:3]은 앞의 셋.</p><p>'a'가 들어간 단어는 정렬 순서로 banana, apple → 마지막은 apple. <code>'apple'[1::2]</code>는 1, 3번 → p, l → \"pl\".</p>",
  "link": "python-func.html#p-13",
  "why": "Python은 슬라이싱·컴프리헨션을 한 줄에 겹치는 쪽으로 어려워지고 있습니다(2026-1 8번)."
 },
 {
  "n": 7,
  "area": "SW공학",
  "kind": "term",
  "text": "다음은 GoF 디자인 패턴에 대한 설명이다. ①~③에 해당하는 패턴을 〈보기〉에서 고르고, ④를 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<ol class=\"qlist\"><li>복잡한 객체를 생성하는 과정과 그 표현 방법을 분리하여, 같은 생성 절차로 서로 다른 표현의 객체를 만들 수 있게 하는 패턴</li><li>기존 객체를 감싸서 상속을 쓰지 않고도 실행 중에 객체에 새로운 기능(책임)을 동적으로 덧붙일 수 있게 하는 패턴</li><li>같은 목적의 여러 알고리즘을 각각 캡슐화해 두고, 실행 중에 필요한 알고리즘으로 교체해 사용할 수 있게 하는 패턴</li><li>③의 패턴이 속한 목적별 분류 (생성 / 구조 / 행위 중 하나)</li></ol><div class=\"boki\"><span class=\"boki-h\">〈보기〉</span><span>Abstract Factory</span><span>Builder</span><span>Factory Method</span><span>Prototype</span><span>Singleton</span><span>Adapter</span><span>Bridge</span><span>Composite</span><span>Decorator</span><span>Facade</span><span>Flyweight</span><span>Proxy</span><span>Chain of Responsibility</span><span>Command</span><span>Iterator</span><span>Mediator</span><span>Memento</span><span>Observer</span><span>State</span><span>Strategy</span><span>Template Method</span><span>Visitor</span></div>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "builder",
     "빌더"
    ],
    "show": "Builder",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "decorator",
     "데코레이터"
    ],
    "show": "Decorator",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "strategy",
     "스트래티지",
     "전략"
    ],
    "show": "Strategy",
    "mode": "term"
   },
   {
    "label": "④",
    "accept": [
     "행위",
     "행위패턴",
     "행위형",
     "behavioral"
    ],
    "show": "행위",
    "mode": "term"
   }
  ],
  "explain": "<p>① 생성 '과정'과 '표현'을 분리 → <b>Builder</b>. 관련 객체 '군(family)'을 만드는 Abstract Factory와 구분하세요.</p><p>② 상속 없이 감싸서 기능을 덧붙임 → <b>Decorator</b>. 감싸지만 접근을 통제하는 건 Proxy, 인터페이스를 바꿔 주는 건 Adapter.</p><p>③ 알고리즘을 갈아 끼움 → <b>Strategy</b>. 상태에 따라 행동이 바뀌는 State와 구분하세요.</p><p>④ Strategy는 객체 간 책임 분배·알고리즘을 다루는 <b>행위</b> 패턴입니다. (생성: Builder 등 5개 / 구조: Decorator 등 7개 / 행위: 11개)</p>",
  "link": null,
  "why": "디자인 패턴은 2026년 1회(Bridge, Observer), 2회(Abstract Factory) 연속 출제. 이름 고르기에 분류까지 묻는 형태로 어렵게 냈습니다."
 },
 {
  "n": 8,
  "area": "C",
  "kind": "out",
  "text": "다음 C 프로그램의 출력 결과를 쓰시오.",
  "code": "#include <stdio.h>\ntypedef struct Node { char c; struct Node *next; } Node;\nNode *rev(Node *h) {\n    Node *prev = NULL, *nx;\n    while (h != NULL) {\n        nx = h->next;\n        h->next = prev;\n        prev = h;\n        h = nx;\n    }\n    return prev;\n}\nint main(void) {\n    char *s = \"LOGIC\";\n    Node n[5];\n    for (int i = 0; i < 5; i++) {\n        n[i].c = s[i];\n        n[i].next = (i < 4) ? &n[i + 1] : NULL;\n    }\n    Node *h = rev(&n[0]);\n    h->next->next = h->next->next->next;\n    for (Node *c = h; c != NULL; c = c->next) printf(\"%c\", c->c);\n    printf(\" %c\", n[2].next ? n[2].next->c : '-');\n    return 0;\n}",
  "lang": "c",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "CIOL O"
    ],
    "show": "CIOL O",
    "mode": "out"
   }
  ],
  "explain": "<p>처음 리스트는 L → O → G → I → C. rev는 노드마다 next를 '앞 노드'로 돌려 놓는 리스트 뒤집기입니다.</p><div class=\"tablewrap\"><table class=\"trace\"><thead><tr><th>h</th><th>h->next = prev</th><th>그 후 prev</th></tr></thead><tbody><tr><td>L</td><td>L → NULL</td><td>L</td></tr><tr><td>O</td><td>O → L</td><td>O</td></tr><tr><td>G</td><td>G → O</td><td>G</td></tr><tr><td>I</td><td>I → G</td><td>I</td></tr><tr><td>C</td><td>C → I</td><td>C</td></tr></tbody></table></div><p>뒤집힌 리스트: C → I → G → O → L. <code>h->next->next = h->next->next->next</code>는 'I의 next를 G 다음(O)으로' → G를 건너뜀(삭제). 출력 CIOL.</p><p>함정: 리스트에서 빠졌어도 노드 G(n[2]) 자체의 next는 그대로 O를 가리킵니다 → \" O\".</p>",
  "link": "c-struct.html#c-11",
  "why": "연결리스트는 2025~2026년 매 회차 출제. 뒤집기 + 삭제 + '빠진 노드의 next'까지 묻는 고난도 변형입니다."
 },
 {
  "n": 9,
  "area": "Java",
  "kind": "out",
  "text": "다음 Java 프로그램의 출력 결과를 쓰시오. (두 줄)",
  "code": "public class Main {\n    static String f(String s, StringBuilder sb, Integer n) {\n        s += \"X\";\n        sb.append(\"Y\");\n        n += 1;\n        return s + sb + n;\n    }\n    public static void main(String[] args) {\n        String s = \"a\";\n        StringBuilder sb = new StringBuilder(\"b\");\n        Integer n = 127;\n        String r = f(s, sb, n);\n        Integer m = 127, k = n + 1, j = 128;\n        System.out.println(r + \" \" + s + sb + n);\n        System.out.println((m == n) + \" \" + (k == j) + \" \" + k.equals(j));\n    }\n}",
  "lang": "java",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "aXbY128 abY127\ntrue false true"
    ],
    "show": "aXbY128 abY127\ntrue false true",
    "mode": "out"
   }
  ],
  "explain": "<p>f 안에서 <code>s += \"X\"</code>와 <code>n += 1</code>은 <b>새 객체를 만들어 매개변수에 대입</b>하는 것이라 main의 s, n은 그대로입니다(String, Integer는 불변). 반면 <code>sb.append</code>는 같은 StringBuilder <b>안을 고쳐서</b> main의 sb도 \"bY\".</p><p>1줄: f의 반환 \"aX\" + \"bY\" + 128 → aXbY128, 그 뒤 main의 s(a), sb(bY), n(127) → abY127.</p><p>2줄: m과 n은 127이라 Integer 캐시(-128~127)의 같은 객체 → true. k = n + 1 = 128, j = 128은 캐시 밖이라 서로 다른 객체 → false. equals는 값 비교 → true.</p>",
  "link": "java-api.html#j-9",
  "why": "참조 전달(2025-2 5번)과 == 비교(2023-2, 2024-3)를 불변 객체·Integer 캐시까지 묶었습니다."
 },
 {
  "n": 10,
  "area": "운영체제",
  "kind": "term",
  "text": "다음 프로세스들을 비선점 HRN(Highest Response-ratio Next) 기법으로 스케줄링할 때 물음에 답하시오. 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간이며, 값이 클수록 먼저 실행한다.",
  "code": null,
  "lang": null,
  "extra": "<div class=\"tablewrap\"><table class=\"data\"><thead><tr><th>프로세스</th><th>도착 시간</th><th>서비스 시간</th></tr></thead><tbody><tr><td>A</td><td>0</td><td>6</td></tr><tr><td>B</td><td>1</td><td>3</td></tr><tr><td>C</td><td>2</td><td>8</td></tr><tr><td>D</td><td>3</td><td>2</td></tr></tbody></table></div><ol class=\"qlist\"><li>실행 순서 (예: A → B → C → D)</li><li>평균 대기 시간</li></ol>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "a,b,d,c",
     "abdc",
     "a→b→d→c",
     "a-b-d-c",
     "a>b>d>c"
    ],
    "show": "A → B → D → C",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "5",
     "5.0",
     "5ms",
     "5초"
    ],
    "show": "5",
    "mode": "term"
   }
  ],
  "explain": "<p>0초에는 A만 도착 → A 실행(0~6).</p><p>6초: B (5 + 3) / 3 ≈ 2.67, C (4 + 8) / 8 = 1.5, D (3 + 2) / 2 = 2.5 → <b>B</b> (6~9).</p><p>9초: C (7 + 8) / 8 ≈ 1.88, D (6 + 2) / 2 = 4 → <b>D</b> (9~11), 마지막 C (11~19).</p><p>대기 시간: A 0, B 6 − 1 = 5, D 9 − 3 = 6, C 11 − 2 = 9 → 합 20 / 4 = <b>5</b>.</p>",
  "link": null,
  "why": "2026년 2회에 SRT 평균 대기 시간이 나왔습니다. 스케줄링 계산은 기법을 바꿔 반복되는 편이라 HRN·RR이 다음 후보입니다."
 },
 {
  "n": 11,
  "area": "SQL",
  "kind": "term",
  "text": "5번 문제의 [학생], [수강] 테이블에 대해 다음 SQL문 (가)~(다)의 결과를 쓰시오. (가), (다)는 결과 값, (나)는 결과 행 수를 쓰시오.",
  "code": "-- (가)\nSELECT COUNT(*) FROM 수강\nWHERE 학번 NOT IN (SELECT 학번 FROM 학생 WHERE 학과 = '컴')\n  AND 점수 > (SELECT AVG(점수) FROM 수강);\n\n-- (나)\nSELECT 학번 FROM 수강 WHERE 과목 = 'DB'\nEXCEPT\nSELECT 학번 FROM 학생 WHERE 학과 = '전자';\n\n-- (다)\nSELECT COUNT(*) FROM 학생 s\nWHERE NOT EXISTS (SELECT * FROM 수강 c\n                  WHERE c.학번 = s.학번 AND c.점수 >= 80);",
  "lang": "sql",
  "extra": "",
  "blanks": [
   {
    "label": "(가)",
    "accept": [
     "2"
    ],
    "show": "2",
    "mode": "term"
   },
   {
    "label": "(나)",
    "accept": [
     "3",
     "3행",
     "3개"
    ],
    "show": "3",
    "mode": "term"
   },
   {
    "label": "(다)",
    "accept": [
     "2"
    ],
    "show": "2",
    "mode": "term"
   }
  ],
  "explain": "<p>(가) 안쪽 평균은 NULL을 뺀 90, 70, 80, 60, 95, 100의 평균 82.5. 컴(1, 2번)이 아닌 행은 3번 80, 60 / 4번 95 / 9번 100 → 82.5보다 큰 건 95, 100 → <b>2</b>. (9번처럼 학생 표에 없는 학번도 NOT IN 비교에서는 통과합니다.)</p><p>(나) DB 수강 학번 1, 2, 3, 9에서 전자(3, 4)를 빼면 1, 2, 9 → <b>3행</b>.</p><p>(다) '80점 이상 받은 수강 기록이 <b>없는</b> 학생'. 김 90, 박 80, 최 95는 있음. 이(점수 NULL)와 정(수강 없음)은 없음 → <b>2</b>.</p>",
  "link": "sql-query.html#s-5",
  "why": "서브쿼리(2024-3, 2026-1), 집합 연산(2023-3), 그리고 아직 안 나온 EXISTS를 묶었습니다."
 },
 {
  "n": 12,
  "area": "C",
  "kind": "out",
  "text": "다음 C 프로그램의 출력 결과를 쓰시오.",
  "code": "#include <stdio.h>\nint cnt = 0;\nvoid f(char *s) {\n    if (*s == '\\0') return;\n    f(s + 1);\n    if (*s >= 'a' && *s <= 'z') {\n        putchar(*s - 32);\n        cnt++;\n    } else {\n        putchar(*s);\n    }\n}\nint main(void) {\n    f(\"aB3cD\");\n    printf(\" %d\", cnt);\n    return 0;\n}",
  "lang": "c",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "DC3BA 2"
    ],
    "show": "DC3BA 2",
    "mode": "out"
   }
  ],
  "explain": "<p>f는 먼저 끝까지 재귀로 내려간 다음, <b>돌아오면서</b> 글자를 찍습니다(출력이 재귀 호출 뒤에 있음). 그래서 문자열이 거꾸로 나옵니다: D, c, 3, B, a.</p><p>소문자(c, a)는 32를 빼서 대문자로 찍고 cnt를 셉니다 → DC3BA, cnt = 2.</p>",
  "link": "c-memory.html#c-3",
  "why": "재귀(2026-2 18번) + 문자 아스키 연산(2024-1 19번). 출력 위치가 재귀 앞이냐 뒤냐가 핵심입니다."
 },
 {
  "n": 13,
  "area": "Python",
  "kind": "out",
  "text": "다음 Python 프로그램의 출력 결과를 쓰시오.",
  "code": "class Acc:\n    rate = 2\n    def __init__(self, b):\n        self.b = b\n    def grow(self):\n        self.b *= self.rate\n        return self\n    def __str__(self):\n        return f\"{type(self).__name__}:{self.b}\"\n\nclass Vip(Acc):\n    rate = 3\n    def grow(self):\n        super().grow()\n        self.b += 1\n        return self\n\na, v = Acc(1), Vip(1)\nAcc.rate = 5\nv.rate = 10\nprint(a.grow().grow(), v.grow(), Vip.rate)",
  "lang": "python",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "Acc:25 Vip:11 3"
    ],
    "show": "Acc:25 Vip:11 3",
    "mode": "out"
   }
  ],
  "explain": "<p><code>Acc.rate = 5</code>로 클래스 변수가 바뀝니다. a는 자기 rate가 없으니 Acc.rate(5)를 읽어 1 → 5 → 25.</p><p><code>v.rate = 10</code>은 v에만 인스턴스 변수를 새로 만듭니다. Vip.grow → super().grow()에서 <code>self.rate</code>는 v 자신의 10 → b = 10, 그다음 +1 → 11.</p><p>Vip.rate는 클래스 변수 그대로 3. __str__은 type(self).__name__이라 클래스 이름이 찍힙니다.</p>",
  "link": "python-func.html#p-14",
  "why": "Python 클래스(2025-1 17번)에 클래스 변수 vs 인스턴스 변수 함정과 super()를 더했습니다."
 },
 {
  "n": 14,
  "area": "보안",
  "kind": "term",
  "text": "다음은 IPSec에 대한 설명이다. 빈칸 ①~④에 알맞은 용어를 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<p class=\"refseq\" style=\"font-family:var(--f-body);font-size:15px;line-height:1.9\">IPSec은 OSI 7계층 중 ( ① ) 계층에서 동작하는 보안 프로토콜이다. ( ② )는 데이터 무결성과 송신자 인증을 제공하지만 암호화는 제공하지 않으며, ( ③ )는 암호화를 통해 기밀성까지 제공한다. 또한 원래의 IP 패킷 전체를 암호화하고 새로운 IP 헤더를 붙여 전송하는 방식을 ( ④ ) 모드라고 한다.</p>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "네트워크",
     "네트워크계층",
     "3계층",
     "network",
     "networklayer"
    ],
    "show": "네트워크 (3계층)",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "ah",
     "authenticationheader"
    ],
    "show": "AH",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "esp",
     "encapsulatingsecuritypayload"
    ],
    "show": "ESP",
    "mode": "term"
   },
   {
    "label": "④",
    "accept": [
     "터널",
     "터널모드",
     "tunnel",
     "tunnelmode"
    ],
    "show": "터널",
    "mode": "term"
   }
  ],
  "explain": "<p>IPSec은 IP 계층, 즉 OSI <b>3계층(네트워크)</b>에서 동작합니다. 웹의 SSL/TLS는 그보다 위(전송 계층과 응용 계층 사이)입니다.</p><p><b>AH</b>는 무결성·인증만, <b>ESP</b>는 여기에 암호화(기밀성)까지. 원래 IP 헤더는 두고 데이터만 보호하는 게 전송 모드, 패킷 전체를 감싸 새 IP 헤더를 붙이는 게 <b>터널</b> 모드(VPN에서 사용).</p>",
  "link": null,
  "why": "2025-3에 OTP·OAuth, 2026-1에 ISMS가 나오는 등 보안 프로토콜·인증 용어 출제가 늘고 있습니다."
 },
 {
  "n": 15,
  "area": "Java",
  "kind": "out",
  "text": "다음 Java 프로그램의 출력 결과를 쓰시오.",
  "code": "interface Shape {\n    int area();\n    default String tag() { return \"S\" + area(); }\n}\nabstract class Base implements Shape {\n    static int made = 0;\n    int id;\n    Base() { made++; id = made; }\n    public String tag() { return id + Shape.super.tag(); }\n}\nclass Rect extends Base {\n    int w, h;\n    Rect(int w, int h) { this.w = w; this.h = h; }\n    public int area() { return w * h; }\n}\nclass Sq extends Rect {\n    Sq(int s) { super(s, s); }\n    public String tag() { return \"Q\" + super.tag(); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Shape[] arr = { new Rect(2, 3), new Sq(3), new Rect(1, 1) };\n        String r = \"\";\n        for (Shape s : arr) r += s.tag() + \",\";\n        System.out.print(r + Base.made);\n    }\n}",
  "lang": "java",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "1S6,Q2S9,3S1,3"
    ],
    "show": "1S6,Q2S9,3S1,3",
    "mode": "out"
   }
  ],
  "explain": "<p>객체를 만들 때마다 Base 생성자가 먼저 돌아 made를 1씩 올리고 그 값을 id로 가집니다. Rect(2,3) → id 1, Sq(3) → id 2, Rect(1,1) → id 3. made는 static이라 모두 공유해서 최종 3.</p><p>Rect: Base.tag() → id + Shape.super.tag() → id + \"S\" + area(). area()는 실제 객체의 것 → \"1S6\", \"3S1\".</p><p>Sq: Sq가 tag를 재정의 → \"Q\" + super.tag() (= Base.tag) → \"Q\" + \"2S9\" → \"Q2S9\".</p><p><code>Shape.super.tag()</code>는 '인터페이스 Shape의 default 메서드를 직접 부르기'라는 문법입니다.</p>",
  "link": "java-oop.html#j-7",
  "why": "인터페이스(2024-2, 2025-3), 추상 클래스, static 공유, 생성자 체인을 한 문제에 넣었습니다."
 },
 {
  "n": 16,
  "area": "DB",
  "kind": "term",
  "text": "즉시 갱신 회복 기법과 검사점(Checkpoint)을 사용하는 DBMS에서 다음 로그가 기록된 상태로 시스템 장애가 발생했다. 회복 시 ① REDO 대상과 ② UNDO 대상 트랜잭션을 모두 쓰시오. (없으면 '없음')",
  "code": "<T1, start>\n<T1, A, 100, 150>\n<T1, commit>\n<checkpoint>\n<T2, start>\n<T2, B, 200, 250>\n<T3, start>\n<T3, C, 300, 350>\n<T2, commit>\n<T4, start>\n<T4, A, 150, 120>\n--------- 장애 발생 ---------",
  "lang": "c",
  "extra": "",
  "blanks": [
   {
    "label": "① REDO",
    "accept": [
     "t2"
    ],
    "show": "T2",
    "mode": "term"
   },
   {
    "label": "② UNDO",
    "accept": [
     "t3,t4",
     "t4,t3",
     "t3t4",
     "t3와t4",
     "t3,t4"
    ],
    "show": "T3, T4",
    "mode": "term"
   }
  ],
  "explain": "<p>검사점 <b>이전에 커밋</b>된 T1은 이미 디스크에 반영됐다고 보고 회복에서 제외합니다.</p><p>검사점 이후 <b>커밋까지 된</b> T2는 변경을 다시 적용 → <b>REDO</b>.</p><p>장애 시점까지 <b>커밋하지 못한</b> T3, T4는 즉시 갱신 기법이라 이미 DB에 반영됐을 수 있으니 되돌림 → <b>UNDO</b>. (지연 갱신이었다면 UNDO가 필요 없습니다.)</p>",
  "link": null,
  "why": "회복 기법은 2020-4에 한 번 나온 뒤 오래 안 나왔고, 2025-3·2026-1은 DB 개념(튜플·설계 절차)을 물었습니다. 이론 DB 문항이 계산·판단형으로 바뀌는 흐름입니다."
 },
 {
  "n": 17,
  "area": "C",
  "kind": "out",
  "text": "다음 C 프로그램의 출력 결과를 쓰시오.",
  "code": "#include <stdio.h>\ntypedef struct { int v; int (*op)(int, int); } Item;\nint add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\nint xr(int a, int b)  { return a ^ b; }\nint main(void) {\n    Item it[3] = { {3, add}, {4, mul}, {5, xr} };\n    int acc = 2;\n    for (int i = 0; i < 3; i++) acc = it[i].op(acc, it[i].v);\n    printf(\"%d %x\", acc, acc << 2);\n    return 0;\n}",
  "lang": "c",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "17 44"
    ],
    "show": "17 44",
    "mode": "out"
   }
  ],
  "explain": "<p>구조체마다 값과 함수 포인터가 들어 있고, acc에 차례로 적용합니다.</p><div class=\"tablewrap\"><table class=\"trace\"><thead><tr><th>i</th><th>함수</th><th>계산</th><th>acc</th></tr></thead><tbody><tr><td>0</td><td>add</td><td>2 + 3</td><td>5</td></tr><tr><td>1</td><td>mul</td><td>5 × 4</td><td>20</td></tr><tr><td>2</td><td>xr</td><td>10100 ^ 00101</td><td>10001 = 17</td></tr></tbody></table></div><p>17 &lt;&lt; 2 = 68. <code>%x</code>는 16진수라 68 = 4 × 16 + 4 → <b>44</b>.</p>",
  "link": "c-struct.html#c-18",
  "why": "2026-1 12번(구조체 안 함수 포인터, %x)의 직계 변형에 XOR·시프트를 더했습니다."
 },
 {
  "n": 18,
  "area": "SQL",
  "kind": "term",
  "text": "다음 조건을 만족하도록 SQL문의 빈칸 ①~⑤에 들어갈 키워드를 쓰시오.",
  "code": "ALTER TABLE 학생 ( ① ) 이메일 VARCHAR(50);\nCREATE ( ② ) INDEX IDX_EMAIL ON 학생(이메일);\nGRANT SELECT, UPDATE ON 학생 TO kim WITH ( ③ ) OPTION;\nREVOKE UPDATE ON 학생 ( ④ ) kim ( ⑤ );",
  "lang": "sql",
  "extra": "<ul class=\"qcond\"><li>[학생] 테이블에 이메일 열을 추가한다.</li><li>이메일에는 중복된 값이 들어갈 수 없도록 인덱스를 만든다.</li><li>kim에게 조회·수정 권한을 주되, kim이 그 권한을 다른 사용자에게 다시 줄 수 있게 한다.</li><li>kim의 수정 권한을 회수하면서, kim이 다른 사용자에게 준 수정 권한도 함께 회수한다.</li></ul>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "add"
    ],
    "show": "ADD",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "unique"
    ],
    "show": "UNIQUE",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "grant"
    ],
    "show": "GRANT",
    "mode": "term"
   },
   {
    "label": "④",
    "accept": [
     "from"
    ],
    "show": "FROM",
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
  "explain": "<p>열 추가는 ALTER TABLE ... <b>ADD</b>. 중복을 막는 인덱스는 CREATE <b>UNIQUE</b> INDEX. 받은 권한을 남에게도 줄 수 있게 하는 건 WITH <b>GRANT</b> OPTION.</p><p>회수는 REVOKE ... <b>FROM</b> (부여는 TO). 그 사람이 나눠 준 권한까지 연쇄로 회수하는 게 <b>CASCADE</b>.</p>",
  "link": "sql-ddl.html#s-12",
  "why": "DDL 빈칸(2026-1, 2026-2)이 연속 출제됐고, DCL(GRANT·REVOKE)은 아직 안 나와 다음 차례로 보입니다."
 },
 {
  "n": 19,
  "area": "Python",
  "kind": "out",
  "text": "다음 Python 프로그램의 출력 결과를 쓰시오.",
  "code": "def build(n, acc={}):\n    for i in range(n):\n        acc[i % 3] = acc.get(i % 3, 0) + i\n    return acc\n\nx = build(4)\ny = build(2)\nz = dict(y)\nz[0] = -1\nprint(x is y, sorted(x.items()), sum(z.values()), {k for k, v in y.items() if v % 2})",
  "lang": "python",
  "extra": "",
  "blanks": [
   {
    "label": "출력",
    "accept": [
     "True [(0, 3), (1, 2), (2, 2)] 3 {0}"
    ],
    "show": "True [(0, 3), (1, 2), (2, 2)] 3 {0}",
    "mode": "out"
   }
  ],
  "explain": "<p>기본값 <code>acc={}</code>는 def 때 한 번만 만들어져 두 호출이 같은 딕셔너리를 씁니다. 그래서 x is y는 <b>True</b>.</p><p>build(4): i = 0, 1, 2, 3 → {0: 0, 1: 1, 2: 2} 다음 i = 3이 키 0에 더해져 {0: 3, 1: 1, 2: 2}.</p><p>build(2): 같은 딕셔너리에 i = 0(키 0 + 0), i = 1(키 1 + 1) → {0: 3, 1: 2, 2: 2}. x도 같은 객체라 이 상태.</p><p>z는 복사본이라 z[0] = -1은 y에 영향 없음 → -1 + 2 + 2 = 3. 값이 홀수인 키는 0뿐 → {0} (셋).</p>",
  "link": "python-func.html#p-11",
  "why": "딕셔너리(2025-3, 2026-2) + 얕은 복사(2026-1)에 아직 안 나온 '가변 기본 인자'를 얹었습니다."
 },
 {
  "n": 20,
  "area": "SW공학",
  "kind": "term",
  "text": "다음은 V 모델에서 개발 단계와 그에 대응하는 테스트 단계를 나타낸 것이다. 빈칸에 알맞은 테스트를 〈보기〉에서 골라 쓰시오.",
  "code": null,
  "lang": null,
  "extra": "<div class=\"tablewrap\"><table class=\"data\"><thead><tr><th>개발 단계</th><th>테스트 단계</th></tr></thead><tbody><tr><td>요구사항 분석</td><td>( ① )</td></tr><tr><td>시스템 설계</td><td>( ② )</td></tr><tr><td>아키텍처(개략) 설계</td><td>( ③ )</td></tr><tr><td>상세 설계 · 구현</td><td>( ④ )</td></tr></tbody></table></div><div class=\"boki\"><span class=\"boki-h\">〈보기〉</span><span>단위 테스트</span><span>통합 테스트</span><span>시스템 테스트</span><span>인수 테스트</span><span>회귀 테스트</span><span>알파 테스트</span><span>베타 테스트</span><span>스모크 테스트</span></div>",
  "blanks": [
   {
    "label": "①",
    "accept": [
     "인수",
     "인수테스트",
     "acceptance",
     "acceptancetest"
    ],
    "show": "인수 테스트",
    "mode": "term"
   },
   {
    "label": "②",
    "accept": [
     "시스템",
     "시스템테스트",
     "system",
     "systemtest"
    ],
    "show": "시스템 테스트",
    "mode": "term"
   },
   {
    "label": "③",
    "accept": [
     "통합",
     "통합테스트",
     "integration",
     "integrationtest"
    ],
    "show": "통합 테스트",
    "mode": "term"
   },
   {
    "label": "④",
    "accept": [
     "단위",
     "단위테스트",
     "unit",
     "unittest"
    ],
    "show": "단위 테스트",
    "mode": "term"
   }
  ],
  "explain": "<p>V 모델은 왼쪽(개발)과 오른쪽(테스트)이 짝을 이룹니다. 위로 갈수록 범위가 넓어집니다.</p><p>요구사항 분석 ↔ <b>인수</b>(사용자가 요구대로인지 확인) / 시스템 설계 ↔ <b>시스템</b>(전체가 명세대로인지) / 아키텍처 설계 ↔ <b>통합</b>(모듈 사이 인터페이스) / 상세 설계·구현 ↔ <b>단위</b>(모듈 하나).</p><p>2026년 1회의 스텁·드라이버는 이 중 통합 테스트에서 쓰는 가짜 모듈입니다. 알파·베타는 인수 테스트의 종류, 회귀는 수정 후 다시 하는 테스트입니다.</p>",
  "link": null,
  "why": "테스트는 2025-3(조건 커버리지, 테스트 케이스), 2026-1(스텁·드라이버), 2026-2(동치 분할)로 매 회차 나왔습니다."
 }
];
