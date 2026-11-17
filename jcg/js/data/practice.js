/* 연습 문제 데이터 (gen/practice.py에서 생성) */
window.PRACTICE = [
 {
  "id": "c-1",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "int a[] = {5, 3, 8, 1};\nint *p = a + 1;\nprintf(\"%d \", *p + *(p + 2));\np++;\nprintf(\"%d \", *p++ * 2);\nprintf(\"%d\", (int)(p - a));",
  "answer": "<code>4 16 3</code>",
  "accept": [
   "4 16 3"
  ],
  "explain": "<p>p는 a[1](3)에서 시작해서 <code>*p + *(p+2)</code> = 3 + 1 = 4. <code>p++</code>로 a[2]. <code>*p++ * 2</code>는 8을 쓰고 p가 a[3]으로 이동, 8 × 2 = 16. 포인터끼리 빼면 칸 수가 나와서 <code>p - a</code> = 3.</p>",
  "src": "포인터 산술"
 },
 {
  "id": "c-2",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "char s[] = \"EXAM\";\nchar *l = s, *r = s + 3;\nwhile (l < r) {\n    char t = *l; *l = *r; *r = t;\n    l++; r--;\n}\nprintf(\"%s %c\", s, *(s + 1) + 1);",
  "answer": "<code>MAXE B</code>",
  "accept": [
   "MAXE B"
  ],
  "explain": "<p>양 끝을 바꾸며 안쪽으로 들어오는 뒤집기입니다. E↔M, X↔A 두 번 바꾸고 l과 r이 엇갈려 끝나서 MAXE. <code>*(s+1)</code>은 A, 거기에 1을 더하면 B.</p>",
  "src": "문자열·포인터"
 },
 {
  "id": "c-3",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "typedef struct Node { int v; struct Node *next; } Node;\nNode n1 = {1, NULL}, n2 = {2, NULL}, n3 = {3, NULL};\nn1.next = &n2; n2.next = &n3;\nNode *head = &n1;\n\nNode *first = head;\nhead = head->next;\nfirst->next = NULL;\nn3.next = first;\nfor (Node *c = head; c != NULL; c = c->next) printf(\"%d\", c->v);",
  "answer": "<code>231</code>",
  "accept": [
   "231"
  ],
  "explain": "<p>처음은 1 → 2 → 3. 맨 앞 노드(1)를 떼어 내고 head를 2로 옮긴 뒤, 3 뒤에 1을 붙였습니다. 맨 앞을 맨 뒤로 보낸 것이라 2 → 3 → 1.</p>",
  "src": "연결리스트"
 },
 {
  "id": "c-4",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "typedef struct { int bal; } Acc;\nvoid dep(Acc *a, int m) { a->bal += m; }\nvoid wd(Acc a, int m) { a.bal -= m; }\n\nAcc x = {100};\ndep(&x, 50);\nwd(x, 30);\nprintf(\"%d\", x.bal);",
  "answer": "<code>150</code>",
  "accept": [
   "150"
  ],
  "explain": "<p>dep는 주소를 받아서 원본을 바꾸니 150. wd는 구조체를 통째로 복사해서 받기 때문에 복사본만 120이 되고 원본은 그대로입니다.</p>",
  "src": "값 전달·주소 전달"
 },
 {
  "id": "c-5",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "int g(int n) {\n    static int cnt = 0;\n    cnt++;\n    if (n <= 0) return cnt;\n    return g(n - 2);\n}\nint r1 = g(5);\nint r2 = g(1);\nprintf(\"%d %d\", r1, r2);",
  "answer": "<code>4 6</code>",
  "accept": [
   "4 6"
  ],
  "explain": "<p>g(5)는 5, 3, 1, -1 순으로 네 번 호출되어 cnt가 4일 때 반환. static이라 cnt는 4로 남아 있고, g(1)이 1, -1 두 번 더 호출되어 6.</p>",
  "src": "static·재귀"
 },
 {
  "id": "c-6",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "unsigned char v = 0xB6;\nprintf(\"%d\", (v & 0x0F) ^ (v >> 4));",
  "answer": "<code>13</code>",
  "accept": [
   "13"
  ],
  "explain": "<p>0xB6 = 1011 0110. <code>v &amp; 0x0F</code>는 아래 네 비트 0110 = 6. <code>v &gt;&gt; 4</code>는 위 네 비트 1011 = 11. 0110 ^ 1011 = 1101 = 13.</p>",
  "src": "비트 연산"
 },
 {
  "id": "c-7",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "#define MUL(a, b) a * b\nprintf(\"%d\", MUL(2 + 1, 3 + 1));",
  "answer": "<code>6</code>",
  "accept": [
   "6"
  ],
  "explain": "<p>매크로는 계산하지 않고 글자를 그대로 바꿔 끼웁니다. <code>2 + 1 * 3 + 1</code>이 되어 곱셈 먼저: 2 + 3 + 1 = 6. 12가 아닙니다.</p>",
  "src": "매크로 (필수 보강)"
 },
 {
  "id": "c-8",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "char s[10] = \"ABCDE\";\nstrcpy(s, \"XY\");\nprintf(\"%s %d %c\", s, (int)strlen(s), s[3]);",
  "answer": "<code>XY 2 D</code>",
  "accept": [
   "XY 2 D"
  ],
  "explain": "<p>strcpy는 \"XY\"와 끝 표시 <code>\\0</code>까지 세 칸만 덮어씁니다. 메모리는 X Y \\0 D E \\0. %s와 strlen은 \\0에서 멈추니 XY, 2. 그런데 s[3]에는 원래 있던 D가 그대로 남아 있습니다.</p>",
  "src": "문자열 함수 (필수 보강)"
 },
 {
  "id": "c-9",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "int a[3][3] = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };\nint *p = &a[0][0];\nprintf(\"%d %d\", *(p + 4), *(*(a + 2) + 1) + a[1][2]);",
  "answer": "<code>5 14</code>",
  "accept": [
   "5 14"
  ],
  "explain": "<p>2차원 배열은 메모리에 한 줄(1, 2, ... 9)로 놓이므로 <code>*(p + 4)</code>는 다섯 번째 값 5. <code>*(*(a + 2) + 1)</code>은 a[2][1] = 8, 여기에 a[1][2] = 6을 더해 14.</p>",
  "src": "2차원 배열"
 },
 {
  "id": "c-10",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "int n = 6, t = 0;\nwhile (n > 0) {\n    t = t * 2 + n % 2;\n    n /= 2;\n}\nprintf(\"%d\", t);",
  "answer": "<code>3</code>",
  "accept": [
   "3"
  ],
  "explain": "<p>6을 2로 나눈 나머지를 거꾸로 쌓아 2진수를 뒤집는 코드입니다. n=6: t=0, n=3 → n=3: t=1, n=1 → n=1: t=3, n=0. 6은 2진수 110, 뒤집으면 011 = 3.</p>",
  "src": "자릿수 분해"
 },
 {
  "id": "c-11",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "int s = 0;\nfor (int i = 0; i < 3; i++) {\n    switch (i) {\n        case 0: s += 1;\n        case 1: s += 10; break;\n        default: s += 100;\n    }\n}\nprintf(\"%d\", s);",
  "answer": "<code>121</code>",
  "accept": [
   "121"
  ],
  "explain": "<p>i=0: case 0에서 시작해 break 없이 case 1까지 → 11. i=1: case 1만 → 10. i=2: default → 100. 합 121.</p>",
  "src": "switch"
 },
 {
  "id": "c-12",
  "lang": "c",
  "prompt": "출력 결과를 쓰시오.",
  "code": "int add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\n\nint (*ops[2])(int, int) = { add, sub };\nint r = 0;\nfor (int i = 0; i < 2; i++) r += ops[i](9, 4);\nprintf(\"%d\", r);",
  "answer": "<code>18</code>",
  "accept": [
   "18"
  ],
  "explain": "<p>함수 포인터 배열입니다. ops[0]은 add라 13, ops[1]은 sub라 5. 합 18.</p>",
  "src": "함수 포인터 (필수 보강)"
 },
 {
  "id": "java-1",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "class P { int x = 1; int getX() { return x * 10; } }\nclass C extends P { int x = 2; int getX() { return x * 100; } }\n\nP p = new C(); C c = (C) p;\nSystem.out.print(p.x + p.getX() + c.x + c.getX());",
  "answer": "<code>403</code>",
  "accept": [
   "403"
  ],
  "explain": "<p><code>p.x</code>는 선언 타입 P의 필드 1. <code>p.getX()</code>는 실제 객체 C의 메서드라 C의 x(2) × 100 = 200. <code>c.x</code>는 2, <code>c.getX()</code>는 200. 전부 숫자라 1 + 200 + 2 + 200 = 403.</p>",
  "src": "필드 숨김·동적 바인딩"
 },
 {
  "id": "java-2",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "class P { P() { this(1); System.out.print(\"a\"); }\n          P(int n) { System.out.print(\"b\" + n); } }\nclass C extends P { C() { this(2); System.out.print(\"c\"); }\n                    C(int n) { System.out.print(\"d\" + n); } }\nnew C();",
  "answer": "<code>b1ad2c</code>",
  "accept": [
   "b1ad2c"
  ],
  "explain": "<p><code>C()</code> → <code>this(2)</code>로 C(int) → 그 첫 줄의 숨은 <code>super()</code>로 P() → <code>this(1)</code>로 P(int)가 b1 → P()로 돌아와 a → C(int) 본문 d2 → C() 본문 c.</p>",
  "src": "생성자 순서"
 },
 {
  "id": "java-3",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "static int f(int n) {\n    int r = 0;\n    try { r += 10; if (n == 0) throw new RuntimeException(); r += 20; }\n    catch (RuntimeException e) { r += 1; }\n    finally { r += 100; }\n    return r;\n}\nSystem.out.print(f(0) + \" \" + f(1));",
  "answer": "<code>111 130</code>",
  "accept": [
   "111 130"
  ],
  "explain": "<p>f(0): 10 더한 뒤 예외, <code>r += 20</code>은 건너뛰고 catch에서 1, finally에서 100 → 111. f(1): 예외 없이 10 + 20, finally 100 → 130.</p>",
  "src": "예외 처리"
 },
 {
  "id": "java-4",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "String s1 = \"ab\";\nString s2 = \"a\" + \"b\";\nString s3 = new String(\"ab\");\nSystem.out.print((s1 == s2) + \" \" + (s1 == s3) + \" \" + s1.equals(s3) + \" \" + (1 + 2 + \"ab\" + 1 + 2));",
  "answer": "<code>true false true 3ab12</code>",
  "accept": [
   "true false true 3ab12"
  ],
  "explain": "<p><code>&quot;a&quot; + &quot;b&quot;</code>처럼 상수끼리 더한 건 컴파일 때 <code>&quot;ab&quot;</code>로 합쳐져 상수 풀의 같은 객체가 됩니다. new는 새 객체. 마지막은 1 + 2 = 3, 그 뒤 문자열을 만나 \"3ab\", 이후 1과 2가 글자로 붙습니다.</p>",
  "src": "문자열 비교"
 },
 {
  "id": "java-5",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "class Cnt { static int total = 0; int mine = 0;\n            void hit() { total++; mine++; } }\n\nCnt a = new Cnt(), b = new Cnt();\na.hit(); a.hit(); b.hit();\nSystem.out.print(a.total + \"\" + a.mine + b.mine + Cnt.total);",
  "answer": "<code>3213</code>",
  "accept": [
   "3213"
  ],
  "explain": "<p>total은 모두가 공유해서 3, mine은 객체마다 따로라 a는 2, b는 1. <code>a.total + &quot;&quot;</code>에서 문자열이 되므로 뒤는 전부 이어 붙입니다.</p>",
  "src": "static"
 },
 {
  "id": "java-6",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "class A { void m(Object o) { System.out.print(\"1\"); } }\nclass B extends A { void m(Object o) { System.out.print(\"2\"); }\n                    void m(String s) { System.out.print(\"3\"); } }\n\nA x = new B(); B y = new B();\nx.m(\"s\"); y.m(\"s\"); x.m(1);",
  "answer": "<code>232</code>",
  "accept": [
   "232"
  ],
  "explain": "<p>x는 선언 타입 A라 m(Object)만 보이고, 실행은 B의 재정의 → 2. y는 선언 타입 B라 m(String)이 더 딱 맞음 → 3. x.m(1)도 m(Object) → 2.</p>",
  "src": "오버로딩 vs 오버라이딩"
 },
 {
  "id": "java-7",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "class P { static { System.out.print(\"S1 \"); }\n          { System.out.print(\"I1 \"); }\n          P() { System.out.print(\"P \"); } }\nclass C extends P { static { System.out.print(\"S2 \"); }\n                    { System.out.print(\"I2 \"); }\n                    C() { System.out.print(\"C \"); } }\nnew C(); new C();",
  "answer": "<code>S1 S2 I1 P I2 C I1 P I2 C</code>",
  "accept": [
   "S1 S2 I1 P I2 C I1 P I2 C"
  ],
  "explain": "<p>static 블록은 클래스가 처음 쓰일 때 부모부터 한 번만 실행됩니다(S1 S2). 객체를 만들 때마다 부모의 인스턴스 블록과 생성자(I1 P), 그다음 자식(I2 C) 순서. 두 번째 new에서는 static이 다시 실행되지 않습니다.</p>",
  "src": "초기화 블록 (필수 보강)"
 },
 {
  "id": "java-8",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "Integer a = 100, b = 100, c = 200, d = 200;\nSystem.out.print((a == b) + \" \" + (c == d) + \" \" + c.equals(d));",
  "answer": "<code>true false true</code>",
  "accept": [
   "true false true"
  ],
  "explain": "<p>Integer는 -128~127을 미리 만들어 두고 재사용합니다. 100은 같은 객체라 ==가 true, 200은 매번 새 객체라 false. 값 비교는 equals.</p>",
  "src": "오토박싱 (필수 보강)"
 },
 {
  "id": "java-9",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "ArrayList<Integer> list = new ArrayList<>();\nlist.add(5); list.add(7);\nlist.add(1, 3);\nlist.remove(0);\nlist.add(9);\nSystem.out.print(list + \" \" + list.get(1));",
  "answer": "<code>[3, 7, 9] 7</code>",
  "accept": [
   "[3, 7, 9] 7"
  ],
  "explain": "<p>[5, 7] → add(1, 3)은 1번 자리에 끼워서 [5, 3, 7] → remove(0)은 0번 <b>자리</b>를 지워 [3, 7] → [3, 7, 9]. 리스트를 문자열로 찍으면 쉼표 뒤 공백이 붙습니다.</p>",
  "src": "컬렉션 (필수 보강)"
 },
 {
  "id": "java-10",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "int x = 5;\nx += x++ + ++x;\nSystem.out.print(x);",
  "answer": "<code>17</code>",
  "accept": [
   "17"
  ],
  "explain": "<p>Java는 왼쪽부터 값을 확정합니다. <code>x += 식</code>은 <code>x = x + (식)</code>이고 맨 앞 x는 5로 먼저 정해집니다. x++는 5(그 뒤 x=6), ++x는 7. 5 + (5 + 7) = 17.</p>",
  "src": "증감 연산"
 },
 {
  "id": "java-11",
  "lang": "java",
  "prompt": "출력 결과를 쓰시오.",
  "code": "static int f() {\n    int r = 1;\n    try { return r; }\n    finally { r = 100; System.out.print(\"F\"); }\n}\nSystem.out.print(f());",
  "answer": "<code>F1</code>",
  "accept": [
   "F1"
  ],
  "explain": "<p>return r을 만나면 돌려줄 값 1이 먼저 정해지고, 나가기 직전에 finally가 실행되어 F를 찍습니다. finally에서 r을 바꿔도 이미 정해진 반환값은 1입니다.</p>",
  "src": "finally와 return"
 },
 {
  "id": "python-1",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "s = \"PYTHON3\"\nprint(s[::-2] + s[1:4][::-1])",
  "answer": "<code>3OTPHTY</code>",
  "accept": [
   "3OTPHTY"
  ],
  "explain": "<p><code>s[::-2]</code>는 끝(인덱스 6)부터 두 칸씩: 6, 4, 2, 0 → 3 O T P. <code>s[1:4]</code>는 YTH, 뒤집으면 HTY.</p>",
  "src": "슬라이싱"
 },
 {
  "id": "python-2",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "m = [[1], [2]]\nn = m[:]\nn[0].append(9)\nn[1] = [7]\nprint(m, n)",
  "answer": "<code>[[1, 9], [2]] [[1, 9], [7]]</code>",
  "accept": [
   "[[1, 9], [2]] [[1, 9], [7]]"
  ],
  "explain": "<p>얕은 복사라 n[0]과 m[0]은 같은 리스트이고, append는 둘 다에 보입니다. <code>n[1] = [7]</code>은 n의 칸에 새 리스트를 붙인 것이라 m은 그대로입니다.</p>",
  "src": "얕은 복사"
 },
 {
  "id": "python-3",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "d = {}\nfor w in \"banana\":\n    d[w] = d.get(w, 0) + 1\nprint(d, max(d, key=d.get))",
  "answer": "<code>{&#x27;b&#x27;: 1, &#x27;a&#x27;: 3, &#x27;n&#x27;: 2} a</code>",
  "accept": [
   "{'b': 1, 'a': 3, 'n': 2} a"
  ],
  "explain": "<p>처음 본 글자는 get이 0을 주니 1부터 셉니다. 키는 처음 들어온 순서(b, a, n)를 유지합니다. <code>max(d, key=d.get)</code>는 값이 가장 큰 키.</p>",
  "src": "딕셔너리"
 },
 {
  "id": "python-4",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "a = {1, 2, 3, 4}\nb = {3, 4, 5}\nprint(len(a | b), sorted(a - b), a ^ b == {1, 2, 5})",
  "answer": "<code>5 [1, 2] True</code>",
  "accept": [
   "5 [1, 2] True"
  ],
  "explain": "<p>합집합은 {1, 2, 3, 4, 5}로 5개. 차집합 {1, 2}를 sorted가 리스트로 돌려줍니다. 대칭차는 한쪽에만 있는 {1, 2, 5}.</p>",
  "src": "set"
 },
 {
  "id": "python-5",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "nums = [5, 2, 8, 1]\nnums.sort(reverse=True)\nr = sorted(nums)[1:3]\nprint(nums[-1], r, sum(nums[::2]))",
  "answer": "<code>1 [2, 5] 10</code>",
  "accept": [
   "1 [2, 5] 10"
  ],
  "explain": "<p>sort로 원본이 [8, 5, 2, 1]. 마지막은 1. sorted는 새 리스트 [1, 2, 5, 8]을 만들고 [1:3]은 [2, 5]. nums[::2]는 [8, 2], 합 10.</p>",
  "src": "정렬"
 },
 {
  "id": "python-6",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "print('-'.join(str(i * i) for i in range(4)), end='|')\nprint(7 // -2, 7 % -2)",
  "answer": "<code>0-1-4-9|-4 -1</code>",
  "accept": [
   "0-1-4-9|-4 -1"
  ],
  "explain": "<p>0, 1, 4, 9를 '-'로 잇고, end가 '|'라 줄바꿈 없이 이어서 찍힙니다. 7 / -2 = -3.5를 아래로 내리면 -4, 나머지는 7 - (-2 × -4) = -1.</p>",
  "src": "출력 형식·연산자"
 },
 {
  "id": "python-7",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "def f(x, a=[]):\n    a.append(x)\n    return len(a)\n\nprint(f(1), f(2), f(3, []))",
  "answer": "<code>1 2 1</code>",
  "accept": [
   "1 2 1"
  ],
  "explain": "<p>기본값 리스트는 def 할 때 한 번만 만들어집니다. f(1)과 f(2)는 같은 리스트를 써서 길이가 1, 2. f(3, [])는 새 리스트를 넘겼으니 1.</p>",
  "src": "가변 기본 인자 (필수 보강)"
 },
 {
  "id": "python-8",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "s = \"Hello World\"\nprint(s.lower().count(\"o\"), s.find(\"World\"), s.replace(\"o\", \"0\")[4:7])",
  "answer": "<code>2 6 0 W</code>",
  "accept": [
   "2 6 0 W"
  ],
  "explain": "<p>소문자로 바꾸면 o가 두 개. World는 6번 위치에서 시작. replace 결과 \"Hell0 W0rld\"의 4~6번은 '0', ' ', 'W'.</p>",
  "src": "문자열 메서드 (필수 보강)"
 },
 {
  "id": "python-9",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "class K:\n    cnt = 0\n\na = K(); b = K()\na.cnt = 5\nK.cnt += 1\nprint(a.cnt, b.cnt, K.cnt)",
  "answer": "<code>5 1 1</code>",
  "accept": [
   "5 1 1"
  ],
  "explain": "<p><code>a.cnt = 5</code>는 클래스 변수를 바꾸지 않고 a에만 인스턴스 변수 cnt를 새로 만듭니다. b는 자기 cnt가 없어서 클래스 변수 K.cnt(1)를 읽습니다.</p>",
  "src": "클래스 변수 (필수 보강)"
 },
 {
  "id": "python-10",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "print(0 or 3, 2 and 5, not [], [] or \"x\")",
  "answer": "<code>3 5 True x</code>",
  "accept": [
   "3 5 True x"
  ],
  "explain": "<p>or는 처음으로 참인 값을, and는 처음으로 거짓인 값(없으면 마지막 값)을 그대로 돌려줍니다. 0과 빈 리스트는 거짓. True/False가 아니라 값 자체가 나온다는 점이 함정입니다.</p>",
  "src": "and·or (필수 보강)"
 },
 {
  "id": "python-11",
  "lang": "python",
  "prompt": "출력 결과를 쓰시오.",
  "code": "w = [\"cc\", \"a\", \"bbb\", \"dd\"]\nprint(sorted(w, key=len)[-1], sorted(w, key=lambda s: (-len(s), s))[:2])",
  "answer": "<code>bbb [&#x27;bbb&#x27;, &#x27;cc&#x27;]</code>",
  "accept": [
   "bbb ['bbb', 'cc']"
  ],
  "explain": "<p>길이순 정렬의 마지막은 가장 긴 bbb. 두 번째는 길이 내림차순(-len), 길이가 같으면 글자순이라 bbb, cc, dd, a.</p>",
  "src": "sorted key"
 },
 {
  "id": "sql-1",
  "lang": "sql",
  "prompt": "두 쿼리의 결과 행 수와, 두 번째 쿼리의 결과 값을 쓰시오.",
  "code": "SELECT DISTINCT 학년 FROM 학생;\nSELECT COUNT(DISTINCT 학년) FROM 학생 WHERE 학과 = '컴퓨터';",
  "answer": "3행 / 1행, 값 <code>3</code>",
  "accept": null,
  "explain": "<p>학년은 3, 4, 2 세 종류라 3행. 두 번째는 GROUP BY 없는 집계라 1행이고, 컴퓨터과 학년이 3, 4, 2로 모두 달라 값은 3.</p>",
  "src": "DISTINCT·집계"
 },
 {
  "id": "sql-2",
  "lang": "sql",
  "prompt": "결과를 쓰시오.",
  "code": "SELECT 학과, MAX(점수)\nFROM 학생\nWHERE 학년 >= 3\nGROUP BY 학과\nHAVING MAX(점수) >= 70;",
  "answer": "컴퓨터 90 / 전자 75 (2행)",
  "accept": null,
  "explain": "<p>WHERE로 3·4학년만 남깁니다: 김철수 90, 이영희 NULL, 박민수 75, 최지훈 60. 학과별 최댓값은 컴퓨터 90(NULL 무시), 전자 75, 기계 60. HAVING에서 기계 탈락.</p>",
  "src": "GROUP BY·HAVING"
 },
 {
  "id": "sql-3",
  "lang": "sql",
  "prompt": "전자과 학생의 점수를 모두 5점 올리는 SQL문을 작성하시오.",
  "code": "",
  "answer": "<code>UPDATE 학생 SET 점수 = 점수 + 5 WHERE 학과 = &#x27;전자&#x27;;</code>",
  "accept": null,
  "explain": "<p>SET 뒤에 자기 자신을 참조하는 식을 쓸 수 있습니다. 실행하면 박민수 80, 이수진 93.</p>",
  "src": "DML 작성"
 },
 {
  "id": "sql-4",
  "lang": "sql",
  "prompt": "빈칸 ①~④에 들어갈 키워드를 쓰시오.",
  "code": "CREATE TABLE 수강 (\n    학번  INT,\n    과목  VARCHAR(20) ( ① ) '미정',\n    성적  CHAR(1) ( ② ) (성적 IN ('A', 'B', 'C')),\n    ( ③ ) KEY (학번, 과목),\n    FOREIGN KEY (학번) ( ④ ) 학생(학번)\n);",
  "answer": "① DEFAULT ② CHECK ③ PRIMARY ④ REFERENCES",
  "accept": null,
  "explain": "<p>값을 안 넣었을 때의 기본값은 DEFAULT, 허용 값 제한은 CHECK, 기본키는 PRIMARY KEY, 외래키는 FOREIGN KEY ... REFERENCES.</p>",
  "src": "DDL 제약조건"
 },
 {
  "id": "sql-5",
  "lang": "sql",
  "prompt": "결과 값을 쓰시오.",
  "code": "SELECT COUNT(*)\nFROM 학생\nWHERE 학과 IN (SELECT 학과 FROM 학생\n               GROUP BY 학과\n               HAVING AVG(점수) >= 80);",
  "answer": "<code>5</code>",
  "accept": [
   "5"
  ],
  "explain": "<p>안쪽부터: 학과별 평균은 컴퓨터 92.5, 전자 81.5, 기계 60이라 서브쿼리 결과는 (컴퓨터, 전자). 바깥은 이 두 학과 학생 수 3 + 2 = 5.</p>",
  "src": "서브쿼리"
 },
 {
  "id": "sql-6",
  "lang": "sql",
  "prompt": "결과 세 값을 순서대로 쓰시오.",
  "code": "SELECT COUNT(*), COUNT(점수), SUM(점수)\nFROM 학생\nWHERE 학과 = '컴퓨터';",
  "answer": "<code>3</code>, <code>2</code>, <code>185</code>",
  "accept": null,
  "explain": "<p>컴퓨터과는 3명. 이영희 점수가 NULL이라 COUNT(점수)는 2, SUM은 90 + 95 = 185.</p>",
  "src": "NULL과 집계 (필수 보강)"
 },
 {
  "id": "sql-7",
  "lang": "sql",
  "prompt": "T1(A) = 1, 2, 3, 3 / T2(A) = 3, 4 일 때 두 쿼리의 결과를 쓰시오.",
  "code": "SELECT A FROM T1 INTERSECT SELECT A FROM T2;\nSELECT A FROM T1 EXCEPT SELECT A FROM T2;",
  "answer": "① 3 &nbsp; ② 1, 2",
  "accept": null,
  "explain": "<p>INTERSECT는 양쪽에 다 있는 값(중복 제거)이라 3. EXCEPT(오라클은 MINUS)는 T1에만 있는 값이라 1, 2.</p>",
  "src": "집합 연산 (필수 보강)"
 },
 {
  "id": "sql-8",
  "lang": "sql",
  "prompt": "학과 표가 (컴퓨터, 공학관), (전자, IT관), (화학, 과학관) 세 행일 때, 두 쿼리의 결과 행 수를 쓰시오.",
  "code": "SELECT * FROM 학생 s INNER JOIN 학과 d ON s.학과 = d.학과명;\nSELECT * FROM 학생 s LEFT JOIN 학과 d ON s.학과 = d.학과명;",
  "answer": "5행 / 6행",
  "accept": null,
  "explain": "<p>INNER는 짝이 있는 5명만. LEFT는 학생 6명이 모두 남고, 기계과 최지훈은 학과 쪽이 NULL로 채워집니다. 화학과는 학생이 없어서 둘 다에 안 나옵니다.</p>",
  "src": "JOIN 종류"
 },
 {
  "id": "sql-9",
  "lang": "sql",
  "prompt": "수강(학생, 과목) ÷ 필수(과목) 의 결과를 쓰시오.",
  "code": "",
  "answer": "학생: 철수, 민수 <br><span class=\"muted\">수강: (철수, DB) (철수, OS) (영희, DB) (민수, DB) (민수, OS) (민수, NW) / 필수: DB, OS</span>",
  "accept": null,
  "explain": "<p>필수 과목 DB와 OS를 <b>모두</b> 들은 학생만 남깁니다. 철수(DB, OS), 민수(DB, OS, NW)는 해당, 영희(DB)는 OS가 없어 탈락. 결과에는 나누는 쪽 속성(과목)이 빠지고 학생만 남습니다.</p>",
  "src": "관계대수 디비전 (2025-3 기출 유형)"
 },
 {
  "id": "sql-10",
  "lang": "sql",
  "prompt": "학과별 학생 수를 구해 2명 이상인 학과만, 학생 수가 많은 순으로 출력하는 SQL문을 작성하시오. (학과, 인원 두 열, 인원은 별칭)",
  "code": "",
  "answer": "<code>SELECT 학과, COUNT(*) AS 인원 FROM 학생 GROUP BY 학과 HAVING COUNT(*) &gt;= 2 ORDER BY 인원 DESC;</code>",
  "accept": null,
  "explain": "<p>그룹 조건이라 HAVING, 정렬은 SELECT에서 만든 별칭으로 할 수 있습니다. 결과는 컴퓨터 3, 전자 2.</p>",
  "src": "작성형"
 },
 {
  "id": "sql-11",
  "lang": "sql",
  "prompt": "user1에게 학생 표 조회 권한을 주면서, user1이 다른 사용자에게도 이 권한을 줄 수 있게 하려 한다. 빈칸을 채우시오.",
  "code": "( ① ) SELECT ON 학생 TO user1 WITH ( ② ) OPTION;",
  "answer": "① GRANT ② GRANT",
  "accept": null,
  "explain": "<p>권한 부여는 GRANT, 받은 권한을 다시 나눠 줄 수 있게 하는 것은 WITH GRANT OPTION. 회수는 REVOKE ... FROM, 연쇄 회수는 CASCADE.</p>",
  "src": "DCL (필수 보강)"
 }
];
