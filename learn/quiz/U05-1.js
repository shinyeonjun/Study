/* U05-1 Python 설치와 인터프리터 · 확인 문제
   형식은 quiz/1-01.js 맨 위 설명과 같다. id는 한번 정하면 바꾸지 않는다. */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["U05-1"] = [
  {
    id: "q1", type: "mc",
    q: "\"Windows에 Python을 설치한다\"는 것은 무엇을 컴퓨터에 넣는 일일까요?",
    options: [
      { t: "Python이라는 언어의 문법 규칙 책", why: "언어(문법 규칙)는 설치하는 것이 아니라 배우는 것입니다. 'Python'이라는 낱말의 두 뜻을 다시 보세요." },
      { t: "코드를 읽고 실행해 주는 프로그램(인터프리터, python.exe)과 그에 딸린 파일", why: "정답. 코드 파일은 글자일 뿐이고, 그것을 읽어 실행하는 인터프리터가 있어야 결과가 나옵니다." },
      { t: "코드를 적는 메모장", why: "메모장은 글자를 적고 고치는 프로그램입니다. 글자가 뜻하는 일을 해 주지는 않습니다." },
      { t: "인터넷에 있는 Python 사이트로 가는 바로가기", why: "설치하면 내 컴퓨터 안에서 실행됩니다. 인터넷 연결 없이도 코드를 실행할 수 있습니다." }
    ],
    answer: 1
  },
  {
    id: "q2", type: "mc",
    q: "설치 첫 화면에서 \"Add python.exe to PATH\"를 체크하면 무엇이 달라질까요?",
    options: [
      { t: "Python이 더 빨리 실행된다", why: "PATH는 속도와 상관없습니다. 터미널이 프로그램을 '찾는' 데 쓰는 목록입니다." },
      { t: "Python 설치 폴더가 PATH 목록에 들어가서, 터미널에 python만 쳐도 찾아 실행한다", why: "정답. 터미널은 PATH 목록의 폴더만 차례로 들여다보므로, 설치 폴더가 목록에 있어야 python이라는 이름을 찾습니다." },
      { t: "Python이 인터넷에서 최신 버전을 자동으로 받아 온다", why: "PATH는 폴더 목록일 뿐, 자동 업데이트와 관계없습니다." },
      { t: "체크하지 않으면 Python이 아예 설치되지 않는다", why: "체크하지 않아도 설치는 됩니다. 다만 터미널이 python이라는 이름을 찾지 못할 뿐입니다." }
    ],
    answer: 1
  },
  {
    id: "q3", type: "mc",
    q: "설치 후 PowerShell에 python --version을 쳤더니 \"'python' 용어는 … 인식되지 않습니다\"가 나왔습니다. 해 볼 일로 알맞지 않은 것은?",
    options: [
      { t: "철자가 맞는지 확인한다 (pyhton처럼 쳤는지)", why: "알맞은 일. 이 오류의 원인 하나는 이름을 잘못 친 것입니다." },
      { t: "PowerShell 창을 닫고 새로 열어 다시 쳐 본다", why: "알맞은 일. PATH가 바뀐 뒤에는 새 터미널에서만 반영됩니다." },
      { t: "py --version을 쳐 본다", why: "알맞은 일. 실행 도우미 py는 PATH 체크를 빠뜨려도 동작하는 경우가 많아, 설치 자체가 되었는지 확인할 수 있습니다." },
      { t: "메모장에 python --version을 적어 저장한다", why: "정답(알맞지 않은 일). 메모장에 적은 글자는 아무것도 실행하지 않습니다. 명령은 터미널에 쳐야 합니다." }
    ],
    answer: 3
  },
  {
    id: "q4", type: "mc",
    q: "다음 Python 버전 가운데 가장 오래된(번호가 가장 작은) 판은?",
    options: [
      { t: "3.9.13", why: "정답. 둘째 칸끼리 정수로 비교하면 9 < 10 < 12 < 14입니다. 셋째 칸 13이 커도 둘째 칸에서 이미 순서가 정해집니다." },
      { t: "3.10.2", why: "둘째 칸 10은 9보다 큽니다. 3.10을 소수 3.1로 읽으면 안 됩니다." },
      { t: "3.12.7", why: "둘째 칸 12는 9보다 큽니다." },
      { t: "3.14.0", why: "둘째 칸 14가 가장 크므로 가장 새 판입니다. 3.14를 소수로 읽어 3.9보다 작다고 착각하기 쉽습니다." }
    ],
    answer: 0
  },
  {
    id: "q5", type: "mc",
    q: "화면 맨 앞에 >>> 가 보이는 상태에서 python --version을 쳤더니 NameError: name 'python' is not defined가 나왔습니다. 가장 알맞은 설명은?",
    options: [
      { t: "Python 설치가 잘못되었다", why: "Python이 이미 실행 중이라서 >>> 가 보이는 것입니다. 설치는 잘 되어 있습니다." },
      { t: "Python에게 PowerShell 명령을 쳤기 때문이다. exit()로 나간 뒤 PowerShell 프롬프트에서 쳐야 한다", why: "정답. >>> 에서는 Python 코드를 칩니다. Python 코드 안에서 python이라는 이름은 정해진 적이 없어서 NameError가 납니다." },
      { t: "--version 대신 -version이라고 쳐야 한다", why: "옵션 철자의 문제가 아닙니다. 어디(어느 프롬프트)에 쳤느냐의 문제입니다." },
      { t: "PATH에 Python 폴더가 없기 때문이다", why: "PATH 문제라면 PowerShell이 '인식되지 않습니다'라고 말합니다. NameError는 Python이 낸 오류입니다." }
    ],
    answer: 1
  },
  {
    id: "q6", type: "mc",
    q: "화면에 네 줄이 차례로 보입니다. ① PS C:\\Users\\me> python ② Python 3.14.6 (tags/…) on win32 ③ >>> 7 * 6 ④ 42. 이 가운데 사람이 직접 친 글자만 바르게 고른 것은?",
    options: [
      { t: "python 과 7 * 6", why: "정답. 프롬프트(PS C:\\Users\\me> 와 >>>) 뒤의 글자만 사람이 친 것이고, 나머지는 프로그램이 보여 준 것입니다." },
      { t: "PS C:\\Users\\me> python 과 >>> 7 * 6", why: "프롬프트는 프로그램이 보여 주는 표시입니다. 따라 치면 오류가 납니다." },
      { t: "python, 7 * 6, 42", why: "42는 Python이 계산해서 보여 준 답입니다." },
      { t: "7 * 6 하나뿐", why: "첫 줄의 python도 사람이 쳐서 대화형 실행을 연 것입니다." }
    ],
    answer: 0
  },
  {
    id: "q7", type: "mc",
    q: "Windows에서 py -0 이라고 치면 무엇을 알 수 있나요?",
    options: [
      { t: "설치된 Python 목록과 기본으로 쓰는 버전(* 표시)", why: "정답. 이 책의 컴퓨터에서는 -V:3.14 *  Python 3.14 (64-bit) 한 줄이 나왔습니다." },
      { t: "Python을 0번 실행했다는 기록", why: "-0은 '설치 목록 보기' 옵션입니다. 실행 횟수와 관계없습니다." },
      { t: "py를 지우는 명령", why: "설치된 것을 지우지 않습니다. 목록만 보여 줍니다." },
      { t: "PATH 목록 전체", why: "PATH는 py가 보여 주는 것이 아닙니다. py -0은 Python 설치 목록입니다." }
    ],
    answer: 0
  },
  {
    id: "q8", type: "mc",
    q: "대화형 실행을 뜻하는 REPL에서 네 글자가 가리키는 단계를 순서대로 바르게 쓴 것은?",
    options: [
      { t: "읽는다 → 계산한다 → 보여 준다 → 다시 기다린다", why: "정답. Read, Eval(계산), Print, Loop입니다. 셋째 단계 Print 때문에 print 없이도 값이 보입니다." },
      { t: "읽는다 → 저장한다 → 보여 준다 → 끝낸다", why: "대화형 실행은 끝나지 않고 다시 >>> 로 돌아옵니다(Loop). 저장 단계도 없습니다." },
      { t: "계산한다 → 읽는다 → 보여 준다 → 다시 기다린다", why: "친 줄을 먼저 읽어야 계산할 수 있습니다." },
      { t: "읽는다 → 계산한다 → 다시 기다린다 → 보여 준다", why: "값을 보여 준 다음에 다시 >>> 를 띄우고 기다립니다." }
    ],
    answer: 0
  },
  {
    id: "q9", type: "short",
    q: "PATH가 무엇인지, 그리고 Python 설치 때 PATH에 넣지 않으면 어떤 일이 생기는지 두 문장으로 적어 보세요.",
    a: "PATH는 터미널이 명령 이름(예: python)에 맞는 프로그램을 찾으러 차례로 들여다보는 폴더 목록입니다. Python 설치 폴더를 PATH에 넣지 않으면, 설치는 되어 있어도 터미널이 python을 찾지 못해 '인식되지 않습니다' 오류를 냅니다."
  },
  {
    id: "q10", type: "mc",
    q: "macOS나 Linux의 터미널에서 Python 버전을 확인할 때 보통 쓰는 명령은?",
    options: [
      { t: "py --version", why: "py 실행 도우미는 Windows용입니다. macOS·Linux에는 보통 없습니다." },
      { t: "python3 --version", why: "정답. macOS·Linux에서는 명령 이름이 보통 python3입니다." },
      { t: "python.exe --version", why: ".exe는 Windows 실행 파일에 붙는 이름입니다." },
      { t: ">>> --version", why: ">>> 는 프롬프트(표시)이지 명령이 아닙니다." }
    ],
    answer: 1
  },
  {
    id: "q11", type: "num",
    q: "대화형 실행에서 >>> 뒤에 1200 * 3 을 쳤을 때 아랫줄에 나오는 수는?",
    answer: 3600,
    a: "* 는 곱하기입니다. 1200 × 3 = 3600. 대화형 실행은 계산한 값을 자동으로 보여 주므로 print 없이도 3600이 나옵니다."
  },
  {
    id: "q12", type: "mc",
    q: "Windows에서 Python 대화형 실행(>>>)을 닫는 방법이 아닌 것은?",
    options: [
      { t: "exit() 를 치고 Enter", why: "닫는 방법입니다. 프롬프트가 PS C:\\…> 로 돌아옵니다." },
      { t: "Ctrl+Z 를 누른 뒤 Enter", why: "Windows에서 닫는 방법입니다. macOS·Linux는 Ctrl+D입니다." },
      { t: "Python 3.13 이상에서 exit 만 치고 Enter", why: "Python 3.13부터는 괄호 없이 exit만 쳐도 닫힙니다." },
      { t: "Ctrl+C", why: "정답(닫는 방법이 아님). Ctrl+C는 지금 하던 일을 멈추게 할 뿐, 대화형 실행은 그대로 >>> 를 다시 띄웁니다." }
    ],
    answer: 3
  },
  {
    id: "q13", type: "mc",
    q: "Python을 설치하기 전에 PowerShell에 python을 쳤더니 Microsoft Store 화면이 열렸습니다. 가장 알맞은 해석은?",
    options: [
      { t: "Python이 이미 설치되어 있다는 뜻이다", why: "설치된 것이 아니라, Windows가 python이라는 이름을 가로채서 Store 안내를 연 것입니다(앱 실행 별칭)." },
      { t: "Windows의 앱 실행 별칭이 Store 안내를 연 것이다. python.org에서 설치한 뒤 새 터미널에서 다시 확인한다", why: "정답. 설치 후 새 터미널에서 python --version이 버전을 보여 주면 됩니다." },
      { t: "PowerShell이 고장 났다", why: "정상 동작입니다. Windows 10·11에 들어 있는 장치 때문입니다." },
      { t: "Python은 Store에서만 설치할 수 있다", why: "python.org 공식 설치 프로그램으로 설치할 수 있습니다. 이 교재는 python.org 설치를 기준으로 합니다." }
    ],
    answer: 1
  }
];
