/* 한 줄씩 따라가기 데이터 (gen/steps.py에서 생성) */
window.STEPS = {
 "loop-continue": {
  "lang": "c",
  "title": "while과 continue",
  "code": "int i = 0, sum = 0;\nwhile (i < 7) {\n    i++;\n    if (i % 3 == 0) continue;\n    sum += i;\n}\nprintf(\"%d\", sum);",
  "steps": [
   {
    "line": 1,
    "vars": {
     "i": 0,
     "sum": 0
    },
    "note": "변수 두 개를 0으로 시작합니다. 변수표의 첫 행입니다."
   },
   {
    "line": 2,
    "vars": {
     "i": 0,
     "sum": 0
    },
    "note": "조건 검사: i &lt; 7 → 0 &lt; 7 → <b>참</b>"
   },
   {
    "line": 3,
    "vars": {
     "i": 1,
     "sum": 0
    },
    "note": "i가 1로 늘어납니다. <b>검사보다 먼저</b> 증가한다는 점이 중요합니다."
   },
   {
    "line": 5,
    "vars": {
     "i": 1,
     "sum": 1
    },
    "note": "1 % 3 != 0 이므로 sum에 더합니다: sum = 1"
   },
   {
    "line": 2,
    "vars": {
     "i": 1,
     "sum": 1
    },
    "note": "조건 검사: i &lt; 7 → 1 &lt; 7 → <b>참</b>"
   },
   {
    "line": 3,
    "vars": {
     "i": 2,
     "sum": 1
    },
    "note": "i가 2로 늘어납니다. <b>검사보다 먼저</b> 증가한다는 점이 중요합니다."
   },
   {
    "line": 5,
    "vars": {
     "i": 2,
     "sum": 3
    },
    "note": "2 % 3 != 0 이므로 sum에 더합니다: sum = 3"
   },
   {
    "line": 2,
    "vars": {
     "i": 2,
     "sum": 3
    },
    "note": "조건 검사: i &lt; 7 → 2 &lt; 7 → <b>참</b>"
   },
   {
    "line": 3,
    "vars": {
     "i": 3,
     "sum": 3
    },
    "note": "i가 3로 늘어납니다. <b>검사보다 먼저</b> 증가한다는 점이 중요합니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 3,
     "sum": 3
    },
    "note": "3 % 3 == 0 → 참. continue로 아래 줄을 건너뛰고 조건 검사로 돌아갑니다."
   },
   {
    "line": 2,
    "vars": {
     "i": 3,
     "sum": 3
    },
    "note": "조건 검사: i &lt; 7 → 3 &lt; 7 → <b>참</b>"
   },
   {
    "line": 3,
    "vars": {
     "i": 4,
     "sum": 3
    },
    "note": "i가 4로 늘어납니다. <b>검사보다 먼저</b> 증가한다는 점이 중요합니다."
   },
   {
    "line": 5,
    "vars": {
     "i": 4,
     "sum": 7
    },
    "note": "4 % 3 != 0 이므로 sum에 더합니다: sum = 7"
   },
   {
    "line": 2,
    "vars": {
     "i": 4,
     "sum": 7
    },
    "note": "조건 검사: i &lt; 7 → 4 &lt; 7 → <b>참</b>"
   },
   {
    "line": 3,
    "vars": {
     "i": 5,
     "sum": 7
    },
    "note": "i가 5로 늘어납니다. <b>검사보다 먼저</b> 증가한다는 점이 중요합니다."
   },
   {
    "line": 5,
    "vars": {
     "i": 5,
     "sum": 12
    },
    "note": "5 % 3 != 0 이므로 sum에 더합니다: sum = 12"
   },
   {
    "line": 2,
    "vars": {
     "i": 5,
     "sum": 12
    },
    "note": "조건 검사: i &lt; 7 → 5 &lt; 7 → <b>참</b>"
   },
   {
    "line": 3,
    "vars": {
     "i": 6,
     "sum": 12
    },
    "note": "i가 6로 늘어납니다. <b>검사보다 먼저</b> 증가한다는 점이 중요합니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 6,
     "sum": 12
    },
    "note": "6 % 3 == 0 → 참. continue로 아래 줄을 건너뛰고 조건 검사로 돌아갑니다."
   },
   {
    "line": 2,
    "vars": {
     "i": 6,
     "sum": 12
    },
    "note": "조건 검사: i &lt; 7 → 6 &lt; 7 → <b>참</b>"
   },
   {
    "line": 3,
    "vars": {
     "i": 7,
     "sum": 12
    },
    "note": "i가 7로 늘어납니다. <b>검사보다 먼저</b> 증가한다는 점이 중요합니다."
   },
   {
    "line": 5,
    "vars": {
     "i": 7,
     "sum": 19
    },
    "note": "7 % 3 != 0 이므로 sum에 더합니다: sum = 19"
   },
   {
    "line": 2,
    "vars": {
     "i": 7,
     "sum": 19
    },
    "note": "조건 검사: i &lt; 7 → 7 &lt; 7 → <b>거짓</b>. 반복을 빠져나갑니다."
   },
   {
    "line": 7,
    "vars": {
     "i": 7,
     "sum": 19
    },
    "out": "19",
    "note": "i가 7일 때도 한 번 더 더해져서 결과는 19입니다."
   }
  ]
 },
 "c-pointer": {
  "lang": "c",
  "title": "포인터는 주소를 담는 변수",
  "code": "int x = 5;\nint *p = &x;\n*p = 10;\nint y = *p + 1;\np = &y;\nprintf(\"%d %d %d\", x, y, *p);",
  "steps": [
   {
    "line": 1,
    "cells": [
     {
      "name": "x",
      "val": 5,
      "addr": 100,
      "hl": true
     }
    ],
    "note": "x라는 상자가 100번지에 생기고 5가 들어갑니다."
   },
   {
    "line": 2,
    "cells": [
     {
      "name": "x",
      "val": 5,
      "addr": 100
     },
     {
      "name": "p",
      "val": 100,
      "addr": 200,
      "to": "x",
      "hl": true
     }
    ],
    "note": "<code>&amp;x</code>는 x의 주소 100입니다. p에는 값 5가 아니라 <b>주소 100</b>이 들어갑니다."
   },
   {
    "line": 3,
    "cells": [
     {
      "name": "x",
      "val": 10,
      "addr": 100,
      "hl": true
     },
     {
      "name": "p",
      "val": 100,
      "addr": 200,
      "to": "x"
     }
    ],
    "note": "<code>*p</code>는 'p에 적힌 주소로 가서 그 상자'입니다. 즉 x를 10으로 바꿉니다. x라는 이름을 안 썼는데도 x가 바뀌었습니다."
   },
   {
    "line": 4,
    "cells": [
     {
      "name": "x",
      "val": 10,
      "addr": 100
     },
     {
      "name": "p",
      "val": 100,
      "addr": 200,
      "to": "x"
     },
     {
      "name": "y",
      "val": 11,
      "addr": 104,
      "hl": true
     }
    ],
    "note": "<code>*p + 1</code>은 x의 값 10에 1을 더한 11입니다."
   },
   {
    "line": 5,
    "cells": [
     {
      "name": "x",
      "val": 10,
      "addr": 100
     },
     {
      "name": "p",
      "val": 104,
      "addr": 200,
      "to": "y",
      "hl": true
     },
     {
      "name": "y",
      "val": 11,
      "addr": 104
     }
    ],
    "note": "p가 이제 y를 가리킵니다. 포인터는 가리키는 대상을 바꿀 수 있습니다."
   },
   {
    "line": 6,
    "cells": [
     {
      "name": "x",
      "val": 10,
      "addr": 100
     },
     {
      "name": "p",
      "val": 104,
      "addr": 200,
      "to": "y"
     },
     {
      "name": "y",
      "val": 11,
      "addr": 104
     }
    ],
    "out": "10 11 11",
    "note": "*p는 지금 y의 값 11입니다."
   }
  ]
 },
 "c-arr-ptr": {
  "lang": "c",
  "title": "*p++, (*p)++, *++p 구분하기",
  "code": "int a[] = {10, 20, 30, 40};\nint *p = a;\nint x = *p++;\nint y = (*p)++;\nint z = *++p;\nprintf(\"%d %d %d\\n\", x, y, z);\nprintf(\"%d %d %d %d\\n\", a[0], a[1], a[2], a[3]);\nprintf(\"%d\\n\", *p + 2);\nprintf(\"%d\\n\", *(p + 1));",
  "steps": [
   {
    "line": 1,
    "arrays": [
     {
      "name": "int a[4]",
      "vals": [
       10,
       20,
       30,
       40
      ],
      "ptrs": {},
      "hl": []
     }
    ],
    "note": "배열 네 칸이 메모리에 붙어서 생깁니다."
   },
   {
    "line": 2,
    "arrays": [
     {
      "name": "int a[4]",
      "vals": [
       10,
       20,
       30,
       40
      ],
      "ptrs": {
       "p": 0
      },
      "hl": [
       0
      ]
     }
    ],
    "vars": {},
    "note": "배열 이름 a는 첫 칸의 주소입니다. p는 a[0]을 가리킵니다."
   },
   {
    "line": 3,
    "arrays": [
     {
      "name": "int a[4]",
      "vals": [
       10,
       20,
       30,
       40
      ],
      "ptrs": {
       "p": 1
      },
      "hl": [
       0
      ]
     }
    ],
    "vars": {
     "x": 10
    },
    "note": "<code>*p++</code>: 지금 가리키는 값 10을 x에 넣고, 그다음 <b>포인터</b>가 한 칸 이동합니다."
   },
   {
    "line": 4,
    "arrays": [
     {
      "name": "int a[4]",
      "vals": [
       10,
       21,
       30,
       40
      ],
      "ptrs": {
       "p": 1
      },
      "hl": [
       1
      ]
     }
    ],
    "vars": {
     "x": 10,
     "y": 20
    },
    "note": "<code>(*p)++</code>: 괄호 때문에 값이 대상입니다. y에 20을 넣고 그다음 <b>a[1]의 값</b>이 21이 됩니다. p는 그대로."
   },
   {
    "line": 5,
    "arrays": [
     {
      "name": "int a[4]",
      "vals": [
       10,
       21,
       30,
       40
      ],
      "ptrs": {
       "p": 2
      },
      "hl": [
       2
      ]
     }
    ],
    "vars": {
     "x": 10,
     "y": 20,
     "z": 30
    },
    "note": "<code>*++p</code>: 먼저 p를 a[2]로 옮기고 그 값 30을 읽습니다."
   },
   {
    "line": 6,
    "arrays": [
     {
      "name": "int a[4]",
      "vals": [
       10,
       21,
       30,
       40
      ],
      "ptrs": {
       "p": 2
      },
      "hl": []
     }
    ],
    "vars": {
     "x": 10,
     "y": 20,
     "z": 30
    },
    "out": "10 20 30\n",
    "note": "x, y, z 출력."
   },
   {
    "line": 7,
    "arrays": [
     {
      "name": "int a[4]",
      "vals": [
       10,
       21,
       30,
       40
      ],
      "ptrs": {
       "p": 2
      },
      "hl": [
       1
      ]
     }
    ],
    "vars": {
     "x": 10,
     "y": 20,
     "z": 30
    },
    "out": "10 20 30\n10 21 30 40\n",
    "note": "a[1]이 21로 바뀌어 있습니다."
   },
   {
    "line": 8,
    "arrays": [
     {
      "name": "int a[4]",
      "vals": [
       10,
       21,
       30,
       40
      ],
      "ptrs": {
       "p": 2
      },
      "hl": [
       2
      ]
     }
    ],
    "vars": {
     "x": 10,
     "y": 20,
     "z": 30
    },
    "out": "10 20 30\n10 21 30 40\n32\n",
    "note": "<code>*p + 2</code>는 값(30)에 2를 더합니다. 두 칸 뒤가 아닙니다."
   },
   {
    "line": 9,
    "arrays": [
     {
      "name": "int a[4]",
      "vals": [
       10,
       21,
       30,
       40
      ],
      "ptrs": {
       "p": 2
      },
      "hl": [
       3
      ]
     }
    ],
    "vars": {
     "x": 10,
     "y": 20,
     "z": 30
    },
    "out": "10 20 30\n10 21 30 40\n32\n40",
    "note": "<code>*(p + 1)</code>은 한 칸 뒤 a[3]의 값 40입니다. p 자체는 움직이지 않습니다."
   }
  ]
 },
 "c-bubble": {
  "lang": "c",
  "title": "버블 정렬",
  "code": "int a[4] = {5, 3, 8, 1};\nfor (int i = 0; i < 3; i++)\n    for (int j = 0; j < 3 - i; j++)\n        if (a[j] > a[j + 1]) {\n            int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;\n        }",
  "steps": [
   {
    "line": 1,
    "arrays": [
     {
      "name": "a",
      "vals": [
       5,
       3,
       8,
       1
      ]
     }
    ],
    "note": "오름차순 버블 정렬. 이웃한 두 칸을 비교해서 앞이 크면 바꿉니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 0,
     "j": 0
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       5,
       3,
       8,
       1
      ],
      "cmp": [
       0,
       1
      ],
      "dim": []
     }
    ],
    "note": "a[0]=5, a[1]=3 비교 → 5 &gt; 3 는 참, 교환합니다"
   },
   {
    "line": 5,
    "vars": {
     "i": 0,
     "j": 0
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       5,
       8,
       1
      ],
      "hl": [
       0,
       1
      ],
      "dim": []
     }
    ],
    "note": "t를 거쳐 두 값을 맞바꿉니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 0,
     "j": 1
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       5,
       8,
       1
      ],
      "cmp": [
       1,
       2
      ],
      "dim": []
     }
    ],
    "note": "a[1]=5, a[2]=8 비교 → 5 &gt; 8 는 거짓, 그대로"
   },
   {
    "line": 4,
    "vars": {
     "i": 0,
     "j": 2
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       5,
       8,
       1
      ],
      "cmp": [
       2,
       3
      ],
      "dim": []
     }
    ],
    "note": "a[2]=8, a[3]=1 비교 → 8 &gt; 1 는 참, 교환합니다"
   },
   {
    "line": 5,
    "vars": {
     "i": 0,
     "j": 2
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       5,
       1,
       8
      ],
      "hl": [
       2,
       3
      ],
      "dim": []
     }
    ],
    "note": "t를 거쳐 두 값을 맞바꿉니다."
   },
   {
    "line": 2,
    "vars": {
     "i": 0
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       5,
       1,
       8
      ],
      "dim": [
       3
      ]
     }
    ],
    "note": "i=0 한 바퀴가 끝나면 남은 것 중 가장 큰 값(8)이 맨 뒤로 갑니다. 흐린 칸은 자리가 확정된 칸입니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 1,
     "j": 0
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       5,
       1,
       8
      ],
      "cmp": [
       0,
       1
      ],
      "dim": [
       3
      ]
     }
    ],
    "note": "a[0]=3, a[1]=5 비교 → 3 &gt; 5 는 거짓, 그대로"
   },
   {
    "line": 4,
    "vars": {
     "i": 1,
     "j": 1
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       5,
       1,
       8
      ],
      "cmp": [
       1,
       2
      ],
      "dim": [
       3
      ]
     }
    ],
    "note": "a[1]=5, a[2]=1 비교 → 5 &gt; 1 는 참, 교환합니다"
   },
   {
    "line": 5,
    "vars": {
     "i": 1,
     "j": 1
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       1,
       5,
       8
      ],
      "hl": [
       1,
       2
      ],
      "dim": [
       3
      ]
     }
    ],
    "note": "t를 거쳐 두 값을 맞바꿉니다."
   },
   {
    "line": 2,
    "vars": {
     "i": 1
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       1,
       5,
       8
      ],
      "dim": [
       2,
       3
      ]
     }
    ],
    "note": "i=1 한 바퀴가 끝나면 남은 것 중 가장 큰 값(5)이 맨 뒤로 갑니다. 흐린 칸은 자리가 확정된 칸입니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 2,
     "j": 0
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       3,
       1,
       5,
       8
      ],
      "cmp": [
       0,
       1
      ],
      "dim": [
       2,
       3
      ]
     }
    ],
    "note": "a[0]=3, a[1]=1 비교 → 3 &gt; 1 는 참, 교환합니다"
   },
   {
    "line": 5,
    "vars": {
     "i": 2,
     "j": 0
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       1,
       3,
       5,
       8
      ],
      "hl": [
       0,
       1
      ],
      "dim": [
       2,
       3
      ]
     }
    ],
    "note": "t를 거쳐 두 값을 맞바꿉니다."
   },
   {
    "line": 2,
    "vars": {
     "i": 2
    },
    "arrays": [
     {
      "name": "a",
      "vals": [
       1,
       3,
       5,
       8
      ],
      "dim": [
       1,
       2,
       3
      ]
     }
    ],
    "note": "정렬 완료: 1 3 5 8. 바깥 반복 i가 한 번 돌 때마다 큰 값이 하나씩 뒤에 확정됩니다."
   }
  ]
 },
 "c-list": {
  "lang": "c",
  "title": "맨 앞 삽입은 순서를 뒤집는다",
  "code": "Node *head = NULL;\nfor (int i = 0; word[i] != '\\0'; i++) {\n    Node *n = malloc(sizeof(Node));\n    n->ch = word[i];\n    n->next = head;\n    head = n;\n}",
  "steps": [
   {
    "line": 1,
    "list": {
     "nodes": {},
     "next": {},
     "ptrs": {
      "head": null
     }
    },
    "note": "word = \"CODE\". 처음엔 리스트가 비어 있어서 head는 NULL입니다."
   },
   {
    "line": 3,
    "vars": {
     "i": 0
    },
    "list": {
     "nodes": {
      "n0": "?"
     },
     "next": {
      "n0": null
     },
     "ptrs": {
      "head": null,
      "n": "n0"
     },
     "hl": [
      "n0"
     ]
    },
    "note": "새 노드 하나를 만듭니다. 아직 값은 비어 있습니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 0
    },
    "list": {
     "nodes": {
      "n0": "C"
     },
     "next": {
      "n0": null
     },
     "ptrs": {
      "head": null,
      "n": "n0"
     },
     "hl": [
      "n0"
     ]
    },
    "note": "n->ch = 'C'"
   },
   {
    "line": 5,
    "vars": {
     "i": 0
    },
    "list": {
     "nodes": {
      "n0": "C"
     },
     "next": {
      "n0": null
     },
     "ptrs": {
      "head": null,
      "n": "n0"
     },
     "hl": [
      "n0"
     ]
    },
    "note": "처음이라 head가 NULL이므로 next도 NULL."
   },
   {
    "line": 6,
    "vars": {
     "i": 0
    },
    "list": {
     "nodes": {
      "n0": "C"
     },
     "next": {
      "n0": null
     },
     "ptrs": {
      "head": "n0"
     },
     "hl": [
      "n0"
     ]
    },
    "note": "head를 새 노드로 옮깁니다. 이제 'C'가 맨 앞입니다."
   },
   {
    "line": 3,
    "vars": {
     "i": 1
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "?"
     },
     "next": {
      "n0": null,
      "n1": null
     },
     "ptrs": {
      "head": "n0",
      "n": "n1"
     },
     "hl": [
      "n1"
     ]
    },
    "note": "새 노드 하나를 만듭니다. 아직 값은 비어 있습니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 1
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O"
     },
     "next": {
      "n0": null,
      "n1": null
     },
     "ptrs": {
      "head": "n0",
      "n": "n1"
     },
     "hl": [
      "n1"
     ]
    },
    "note": "n->ch = 'O'"
   },
   {
    "line": 5,
    "vars": {
     "i": 1
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O"
     },
     "next": {
      "n0": null,
      "n1": "n0"
     },
     "ptrs": {
      "head": "n0",
      "n": "n1"
     },
     "hl": [
      "n1"
     ]
    },
    "note": "새 노드의 next가 <b>지금의 맨 앞</b>을 가리키게 합니다."
   },
   {
    "line": 6,
    "vars": {
     "i": 1
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O"
     },
     "next": {
      "n0": null,
      "n1": "n0"
     },
     "ptrs": {
      "head": "n1"
     },
     "hl": [
      "n1"
     ]
    },
    "note": "head를 새 노드로 옮깁니다. 이제 'O'가 맨 앞입니다."
   },
   {
    "line": 3,
    "vars": {
     "i": 2
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O",
      "n2": "?"
     },
     "next": {
      "n0": null,
      "n1": "n0",
      "n2": null
     },
     "ptrs": {
      "head": "n1",
      "n": "n2"
     },
     "hl": [
      "n2"
     ]
    },
    "note": "새 노드 하나를 만듭니다. 아직 값은 비어 있습니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 2
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O",
      "n2": "D"
     },
     "next": {
      "n0": null,
      "n1": "n0",
      "n2": null
     },
     "ptrs": {
      "head": "n1",
      "n": "n2"
     },
     "hl": [
      "n2"
     ]
    },
    "note": "n->ch = 'D'"
   },
   {
    "line": 5,
    "vars": {
     "i": 2
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O",
      "n2": "D"
     },
     "next": {
      "n0": null,
      "n1": "n0",
      "n2": "n1"
     },
     "ptrs": {
      "head": "n1",
      "n": "n2"
     },
     "hl": [
      "n2"
     ]
    },
    "note": "새 노드의 next가 <b>지금의 맨 앞</b>을 가리키게 합니다."
   },
   {
    "line": 6,
    "vars": {
     "i": 2
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O",
      "n2": "D"
     },
     "next": {
      "n0": null,
      "n1": "n0",
      "n2": "n1"
     },
     "ptrs": {
      "head": "n2"
     },
     "hl": [
      "n2"
     ]
    },
    "note": "head를 새 노드로 옮깁니다. 이제 'D'가 맨 앞입니다."
   },
   {
    "line": 3,
    "vars": {
     "i": 3
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O",
      "n2": "D",
      "n3": "?"
     },
     "next": {
      "n0": null,
      "n1": "n0",
      "n2": "n1",
      "n3": null
     },
     "ptrs": {
      "head": "n2",
      "n": "n3"
     },
     "hl": [
      "n3"
     ]
    },
    "note": "새 노드 하나를 만듭니다. 아직 값은 비어 있습니다."
   },
   {
    "line": 4,
    "vars": {
     "i": 3
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O",
      "n2": "D",
      "n3": "E"
     },
     "next": {
      "n0": null,
      "n1": "n0",
      "n2": "n1",
      "n3": null
     },
     "ptrs": {
      "head": "n2",
      "n": "n3"
     },
     "hl": [
      "n3"
     ]
    },
    "note": "n->ch = 'E'"
   },
   {
    "line": 5,
    "vars": {
     "i": 3
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O",
      "n2": "D",
      "n3": "E"
     },
     "next": {
      "n0": null,
      "n1": "n0",
      "n2": "n1",
      "n3": "n2"
     },
     "ptrs": {
      "head": "n2",
      "n": "n3"
     },
     "hl": [
      "n3"
     ]
    },
    "note": "새 노드의 next가 <b>지금의 맨 앞</b>을 가리키게 합니다."
   },
   {
    "line": 6,
    "vars": {
     "i": 3
    },
    "list": {
     "nodes": {
      "n0": "C",
      "n1": "O",
      "n2": "D",
      "n3": "E"
     },
     "next": {
      "n0": null,
      "n1": "n0",
      "n2": "n1",
      "n3": "n2"
     },
     "ptrs": {
      "head": "n3"
     },
     "hl": [
      "n3"
     ]
    },
    "note": "반복이 끝났습니다. head부터 읽으면 E D O C, 입력의 역순입니다.",
    "out": ""
   }
  ]
 },
 "c-cqueue": {
  "lang": "c",
  "title": "원형 큐: % 로 한 바퀴 돈다",
  "code": "int q[4], front = 0, rear = 0;\nvoid enq(int x) { rear = (rear + 1) % 4; q[rear] = x; }\nint deq(void)   { front = (front + 1) % 4; return q[front]; }\n\nenq(1); enq(2); enq(3);\nprintf(\"%d \", deq());\nenq(4);\nprintf(\"%d \", deq());\nprintf(\"%d\", deq());",
  "steps": [
   {
    "line": 1,
    "arrays": [
     {
      "name": "q[4]",
      "vals": [
       "·",
       "·",
       "·",
       "·"
      ],
      "ptrs": {
       "front": 0,
       "rear": 0
      },
      "hl": [],
      "dim": []
     }
    ],
    "vars": {
     "front": 0,
     "rear": 0
    },
    "note": "front와 rear가 같으면 비어 있는 큐. 이 방식은 칸 하나를 비워 두므로 최대 3개까지 들어갑니다."
   },
   {
    "line": 5,
    "arrays": [
     {
      "name": "q[4]",
      "vals": [
       "·",
       1,
       "·",
       "·"
      ],
      "ptrs": {
       "front": 0,
       "rear": 1
      },
      "hl": [
       1
      ],
      "dim": []
     }
    ],
    "vars": {
     "front": 0,
     "rear": 1
    },
    "note": "enq(1): rear를 먼저 한 칸 옮기고(0→1) 그 자리에 넣습니다."
   },
   {
    "line": 5,
    "arrays": [
     {
      "name": "q[4]",
      "vals": [
       "·",
       1,
       2,
       "·"
      ],
      "ptrs": {
       "front": 0,
       "rear": 2
      },
      "hl": [
       2
      ],
      "dim": []
     }
    ],
    "vars": {
     "front": 0,
     "rear": 2
    },
    "note": "enq(2): rear 1→2"
   },
   {
    "line": 5,
    "arrays": [
     {
      "name": "q[4]",
      "vals": [
       "·",
       1,
       2,
       3
      ],
      "ptrs": {
       "front": 0,
       "rear": 3
      },
      "hl": [
       3
      ],
      "dim": []
     }
    ],
    "vars": {
     "front": 0,
     "rear": 3
    },
    "note": "enq(3): rear 2→3. (rear+1)%4 == front 이므로 지금 가득 찬 상태입니다."
   },
   {
    "line": 6,
    "arrays": [
     {
      "name": "q[4]",
      "vals": [
       "·",
       1,
       2,
       3
      ],
      "ptrs": {
       "front": 1,
       "rear": 3
      },
      "hl": [
       1
      ],
      "dim": []
     }
    ],
    "vars": {
     "front": 1,
     "rear": 3
    },
    "out": "1 ",
    "note": "deq(): front를 먼저 옮기고(0→1) 그 자리 값 1을 꺼냅니다. 먼저 넣은 것이 먼저 나옵니다(FIFO)."
   },
   {
    "line": 7,
    "arrays": [
     {
      "name": "q[4]",
      "vals": [
       4,
       1,
       2,
       3
      ],
      "ptrs": {
       "front": 1,
       "rear": 0
      },
      "hl": [
       0
      ],
      "dim": [
       1
      ]
     }
    ],
    "vars": {
     "front": 1,
     "rear": 0
    },
    "out": "1 ",
    "note": "enq(4): rear = (3 + 1) % 4 = <b>0</b>. 끝까지 간 rear가 맨 앞으로 돌아옵니다. 이게 '원형'입니다."
   },
   {
    "line": 8,
    "arrays": [
     {
      "name": "q[4]",
      "vals": [
       4,
       1,
       2,
       3
      ],
      "ptrs": {
       "front": 2,
       "rear": 0
      },
      "hl": [
       2
      ],
      "dim": [
       1
      ]
     }
    ],
    "vars": {
     "front": 2,
     "rear": 0
    },
    "out": "1 2 ",
    "note": "front 1→2, 값 2를 꺼냅니다."
   },
   {
    "line": 9,
    "arrays": [
     {
      "name": "q[4]",
      "vals": [
       4,
       1,
       2,
       3
      ],
      "ptrs": {
       "front": 3,
       "rear": 0
      },
      "hl": [
       3
      ],
      "dim": [
       1,
       2
      ]
     }
    ],
    "vars": {
     "front": 3,
     "rear": 0
    },
    "out": "1 2 3",
    "note": "front 2→3, 값 3. 큐에는 4 하나가 남아 있습니다. 꺼낸 칸의 값은 지워지지 않고 남아 있을 뿐입니다."
   }
  ]
 },
 "c-fact": {
  "lang": "c",
  "title": "재귀 호출은 스택에 쌓였다가 거꾸로 풀린다",
  "code": "int fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\n\nprintf(\"%d\", fact(3));",
  "steps": [
   {
    "line": 6,
    "frames": [
     {
      "name": "main",
      "vars": {}
     }
    ],
    "note": "fact(3)을 호출합니다."
   },
   {
    "line": 2,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "fact",
      "vars": {
       "n": 3
      }
     }
    ],
    "note": "n=3. 1 이하가 아니므로 아래로."
   },
   {
    "line": 3,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "fact",
      "vars": {
       "n": 3
      }
     }
    ],
    "note": "3 * fact(2)를 계산하려면 fact(2)의 답이 필요합니다. 여기서 <b>멈춰 두고</b> 새로 호출합니다."
   },
   {
    "line": 2,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "fact",
      "vars": {
       "n": "3 (대기)"
      }
     },
     {
      "name": "fact",
      "vars": {
       "n": 2
      }
     }
    ],
    "note": "n=2. 같은 함수지만 n이 따로 있는 새 칸입니다."
   },
   {
    "line": 3,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "fact",
      "vars": {
       "n": "3 (대기)"
      }
     },
     {
      "name": "fact",
      "vars": {
       "n": 2
      }
     }
    ],
    "note": "2 * fact(1)을 위해 또 호출."
   },
   {
    "line": 2,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "fact",
      "vars": {
       "n": "3 (대기)"
      }
     },
     {
      "name": "fact",
      "vars": {
       "n": "2 (대기)"
      }
     },
     {
      "name": "fact",
      "vars": {
       "n": 1
      }
     }
    ],
    "note": "n=1. 종료 조건에 걸려 1을 반환합니다. 이제부터 거꾸로 풀립니다."
   },
   {
    "line": 3,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "fact",
      "vars": {
       "n": "3 (대기)"
      }
     },
     {
      "name": "fact",
      "vars": {
       "n": 2,
       "반환": "2 * 1 = 2"
      }
     }
    ],
    "note": "fact(1)이 1을 돌려줘서 2 * 1 = 2를 반환."
   },
   {
    "line": 3,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "fact",
      "vars": {
       "n": 3,
       "반환": "3 * 2 = 6"
      }
     }
    ],
    "note": "fact(2)가 2를 돌려줘서 3 * 2 = 6을 반환."
   },
   {
    "line": 6,
    "frames": [
     {
      "name": "main"
     }
    ],
    "out": "6",
    "note": "가장 나중에 부른 것이 가장 먼저 끝납니다(스택, LIFO)."
   }
  ]
 },
 "j-ref": {
  "lang": "java",
  "title": "Java 변수는 화살표를 들고 있다",
  "heapTitle": "힙에 있는 객체",
  "code": "static void change(int[] arr, String s, Box b) {\n    arr[0] = 9;\n    s = \"Z\";\n    b.v = 5;\n    b = new Box();\n    b.v = 100;\n}\n// main\nint[] arr = {1}; String s = \"A\"; Box b = new Box(); b.v = 1;\nchange(arr, s, b);\nSystem.out.print(arr[0] + s + b.v);",
  "steps": [
   {
    "line": 9,
    "frames": [
     {
      "name": "main",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "int[]",
      "val": "[1]"
     },
     {
      "id": "#2",
      "label": "String",
      "val": "\"A\""
     },
     {
      "id": "#3",
      "label": "Box",
      "val": "v = 1"
     }
    ],
    "note": "객체 세 개가 힙에 생기고, main의 변수 세 개는 각각 그 객체를 가리키는 <b>화살표(주소)</b>를 갖습니다."
   },
   {
    "line": 10,
    "frames": [
     {
      "name": "main",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     },
     {
      "name": "change",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "int[]",
      "val": "[1]"
     },
     {
      "id": "#2",
      "label": "String",
      "val": "\"A\""
     },
     {
      "id": "#3",
      "label": "Box",
      "val": "v = 1"
     }
    ],
    "note": "메서드를 부르면 화살표가 <b>복사</b>되어 넘어갑니다. 양쪽이 같은 객체를 가리킵니다."
   },
   {
    "line": 2,
    "frames": [
     {
      "name": "main",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     },
     {
      "name": "change",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "int[]",
      "val": "[9]",
      "hl": true
     },
     {
      "id": "#2",
      "label": "String",
      "val": "\"A\""
     },
     {
      "id": "#3",
      "label": "Box",
      "val": "v = 1"
     }
    ],
    "note": "같은 배열 #1의 안을 고쳤습니다. main에서도 보입니다."
   },
   {
    "line": 3,
    "frames": [
     {
      "name": "main",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     },
     {
      "name": "change",
      "vars": {
       "arr": "→#1",
       "s": "→#4",
       "b": "→#3"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "int[]",
      "val": "[9]"
     },
     {
      "id": "#2",
      "label": "String",
      "val": "\"A\""
     },
     {
      "id": "#3",
      "label": "Box",
      "val": "v = 1"
     },
     {
      "id": "#4",
      "label": "String",
      "val": "\"Z\"",
      "hl": true
     }
    ],
    "note": "change 쪽 화살표 s만 새 문자열 #4로 돌렸습니다. main의 s는 여전히 #2(\"A\")."
   },
   {
    "line": 4,
    "frames": [
     {
      "name": "main",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     },
     {
      "name": "change",
      "vars": {
       "arr": "→#1",
       "s": "→#4",
       "b": "→#3"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "int[]",
      "val": "[9]"
     },
     {
      "id": "#2",
      "label": "String",
      "val": "\"A\""
     },
     {
      "id": "#3",
      "label": "Box",
      "val": "v = 5",
      "hl": true
     },
     {
      "id": "#4",
      "label": "String",
      "val": "\"Z\""
     }
    ],
    "note": "같은 Box #3의 안을 고쳤습니다. main에서도 보입니다."
   },
   {
    "line": 5,
    "frames": [
     {
      "name": "main",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     },
     {
      "name": "change",
      "vars": {
       "arr": "→#1",
       "s": "→#4",
       "b": "→#5"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "int[]",
      "val": "[9]"
     },
     {
      "id": "#2",
      "label": "String",
      "val": "\"A\""
     },
     {
      "id": "#3",
      "label": "Box",
      "val": "v = 5"
     },
     {
      "id": "#4",
      "label": "String",
      "val": "\"Z\""
     },
     {
      "id": "#5",
      "label": "Box",
      "val": "v = 0",
      "hl": true
     }
    ],
    "note": "change의 b가 새 Box #5를 가리키게 됐습니다. main의 b는 그대로 #3."
   },
   {
    "line": 6,
    "frames": [
     {
      "name": "main",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     },
     {
      "name": "change",
      "vars": {
       "arr": "→#1",
       "s": "→#4",
       "b": "→#5"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "int[]",
      "val": "[9]"
     },
     {
      "id": "#2",
      "label": "String",
      "val": "\"A\""
     },
     {
      "id": "#3",
      "label": "Box",
      "val": "v = 5"
     },
     {
      "id": "#4",
      "label": "String",
      "val": "\"Z\""
     },
     {
      "id": "#5",
      "label": "Box",
      "val": "v = 100",
      "hl": true
     }
    ],
    "note": "100은 새 객체 #5에 들어갑니다. main과는 상관없습니다."
   },
   {
    "line": 10,
    "frames": [
     {
      "name": "main",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "int[]",
      "val": "[9]"
     },
     {
      "id": "#2",
      "label": "String",
      "val": "\"A\""
     },
     {
      "id": "#3",
      "label": "Box",
      "val": "v = 5"
     },
     {
      "id": "#4",
      "label": "String",
      "val": "\"Z\"",
      "gone": true
     },
     {
      "id": "#5",
      "label": "Box",
      "val": "v = 100",
      "gone": true
     }
    ],
    "note": "메서드가 끝나면 change의 변수들은 사라집니다. 아무도 가리키지 않는 #4, #5는 나중에 정리됩니다."
   },
   {
    "line": 11,
    "frames": [
     {
      "name": "main",
      "vars": {
       "arr": "→#1",
       "s": "→#2",
       "b": "→#3"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "int[]",
      "val": "[9]"
     },
     {
      "id": "#2",
      "label": "String",
      "val": "\"A\""
     },
     {
      "id": "#3",
      "label": "Box",
      "val": "v = 5"
     }
    ],
    "out": "9A5",
    "note": "arr[0]은 9, s는 \"A\", b.v는 5. 안을 고친 것만 남았습니다."
   }
  ]
 },
 "j-ctor": {
  "lang": "java",
  "title": "부모 생성자 → 자식 필드 → 자식 생성자 본문",
  "heapTitle": "만들어지는 객체",
  "code": "class P {\n    P() { show(); }\n    void show() { System.out.print(\"P\"); }\n}\nclass C extends P {\n    int v = 7;\n    C() { show(); }\n    void show() { System.out.print(\"C\" + v); }\n}\n// main\nnew C();",
  "steps": [
   {
    "line": 11,
    "frames": [
     {
      "name": "main"
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "C 객체",
      "val": "v = 0",
      "hl": true
     }
    ],
    "note": "먼저 객체 공간이 생기고 필드는 기본값(int는 0)으로 채워집니다. <code>= 7</code>은 아직 실행 전입니다."
   },
   {
    "line": 7,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "C()"
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "C 객체",
      "val": "v = 0"
     }
    ],
    "note": "C 생성자에 들어왔습니다. 첫 줄에 보이지 않는 <code>super();</code>가 있어서 본문보다 부모 생성자가 먼저입니다."
   },
   {
    "line": 2,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "C()"
     },
     {
      "name": "P()"
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "C 객체",
      "val": "v = 0"
     }
    ],
    "note": "P 생성자 안에서 show()를 부릅니다. this는 C 객체이므로..."
   },
   {
    "line": 8,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "C()"
     },
     {
      "name": "P()"
     },
     {
      "name": "C.show()"
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "C 객체",
      "val": "v = 0"
     }
    ],
    "out": "C0",
    "note": "재정의된 <b>C의 show()</b>가 불립니다. 그런데 v는 아직 0이라 C0이 찍힙니다."
   },
   {
    "line": 6,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "C()"
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "C 객체",
      "val": "v = 7",
      "hl": true
     }
    ],
    "out": "C0",
    "note": "부모 생성자가 끝난 뒤에야 자식 필드 초기화 <code>v = 7</code>이 실행됩니다."
   },
   {
    "line": 7,
    "frames": [
     {
      "name": "main"
     },
     {
      "name": "C()"
     },
     {
      "name": "C.show()"
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "C 객체",
      "val": "v = 7"
     }
    ],
    "out": "C0C7",
    "note": "이제 C 생성자 본문의 show()가 실행되어 C7."
   }
  ]
 },
 "py-names": {
  "lang": "python",
  "title": "대입과 얕은 복사",
  "heapTitle": "객체",
  "code": "a = [1, [2, 3]]\nb = a\nc = a[:]\na[0] = 100\na[1][0] = 200\nprint(b, c)",
  "steps": [
   {
    "line": 1,
    "vars": {
     "a": "→#1"
    },
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[1, →#2]",
      "hl": true
     },
     {
      "id": "#2",
      "label": "list",
      "val": "[2, 3]"
     }
    ],
    "note": "리스트 두 개가 생깁니다. 바깥 #1 안의 두 번째 칸은 숫자가 아니라 #2를 가리키는 화살표입니다."
   },
   {
    "line": 2,
    "vars": {
     "a": "→#1",
     "b": "→#1"
    },
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[1, →#2]"
     },
     {
      "id": "#2",
      "label": "list",
      "val": "[2, 3]"
     }
    ],
    "note": "대입은 복사가 아닙니다. 같은 #1에 이름표 b를 하나 더 붙였을 뿐입니다."
   },
   {
    "line": 3,
    "vars": {
     "a": "→#1",
     "b": "→#1",
     "c": "→#3"
    },
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[1, →#2]"
     },
     {
      "id": "#2",
      "label": "list",
      "val": "[2, 3]"
     },
     {
      "id": "#3",
      "label": "list",
      "val": "[1, →#2]",
      "hl": true
     }
    ],
    "note": "얕은 복사는 바깥 리스트 #3만 새로 만들고, 안의 화살표는 그대로 베낍니다. 그래서 #3도 #2를 가리킵니다."
   },
   {
    "line": 4,
    "vars": {
     "a": "→#1",
     "b": "→#1",
     "c": "→#3"
    },
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[100, →#2]",
      "hl": true
     },
     {
      "id": "#2",
      "label": "list",
      "val": "[2, 3]"
     },
     {
      "id": "#3",
      "label": "list",
      "val": "[1, →#2]"
     }
    ],
    "note": "#1의 첫 칸만 바뀌었습니다. #3은 따로라 1 그대로."
   },
   {
    "line": 5,
    "vars": {
     "a": "→#1",
     "b": "→#1",
     "c": "→#3"
    },
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[100, →#2]"
     },
     {
      "id": "#2",
      "label": "list",
      "val": "[200, 3]",
      "hl": true
     },
     {
      "id": "#3",
      "label": "list",
      "val": "[1, →#2]"
     }
    ],
    "note": "공유 중인 #2를 고쳤습니다. #1과 #3 모두에서 보입니다."
   },
   {
    "line": 6,
    "vars": {
     "a": "→#1",
     "b": "→#1",
     "c": "→#3"
    },
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[100, →#2]"
     },
     {
      "id": "#2",
      "label": "list",
      "val": "[200, 3]"
     },
     {
      "id": "#3",
      "label": "list",
      "val": "[1, →#2]"
     }
    ],
    "out": "[100, [200, 3]] [1, [200, 3]]",
    "note": "b는 a와 완전히 같고, c는 바깥만 따로라 첫 칸은 1, 안쪽은 200."
   }
  ]
 },
 "py-default": {
  "lang": "python",
  "title": "기본값 리스트는 한 번만 만들어진다",
  "heapTitle": "객체",
  "code": "def add(x, lst=[]):\n    lst.append(x)\n    return lst\n\nprint(add(1))\nprint(add(2))\nprint(add(3, []))",
  "steps": [
   {
    "line": 1,
    "vars": {
     "add.기본값": "→#1"
    },
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[]",
      "hl": true
     }
    ],
    "note": "def 줄이 실행되는 순간 기본값 리스트 #1이 <b>딱 한 번</b> 만들어져 함수에 붙어 있습니다."
   },
   {
    "line": 2,
    "frames": [
     {
      "name": "add",
      "vars": {
       "x": 1,
       "lst": "→#1"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[1]",
      "hl": true
     }
    ],
    "note": "lst를 안 넘겼으니 #1을 씁니다."
   },
   {
    "line": 5,
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[1]"
     }
    ],
    "out": "[1]\n",
    "note": ""
   },
   {
    "line": 2,
    "frames": [
     {
      "name": "add",
      "vars": {
       "x": 2,
       "lst": "→#1"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[1, 2]",
      "hl": true
     }
    ],
    "out": "[1]\n",
    "note": "두 번째 호출도 <b>같은 #1</b>을 씁니다. 새 빈 리스트가 아닙니다."
   },
   {
    "line": 6,
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[1, 2]"
     }
    ],
    "out": "[1]\n[1, 2]\n",
    "note": ""
   },
   {
    "line": 2,
    "frames": [
     {
      "name": "add",
      "vars": {
       "x": 3,
       "lst": "→#2"
      }
     }
    ],
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[1, 2]"
     },
     {
      "id": "#2",
      "label": "list",
      "val": "[3]",
      "hl": true
     }
    ],
    "out": "[1]\n[1, 2]\n",
    "note": "직접 [ ]를 넘기면 그 새 리스트를 씁니다."
   },
   {
    "line": 7,
    "heap": [
     {
      "id": "#1",
      "label": "list",
      "val": "[1, 2]"
     }
    ],
    "out": "[1]\n[1, 2]\n[3]",
    "note": "그래서 기본값으로는 None을 쓰고 함수 안에서 새로 만드는 것이 관례입니다."
   }
  ]
 }
};
