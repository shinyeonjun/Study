/* U05-2 터미널에서 .py 파일 실행하기 · 확인 문제
   형식은 quiz/1-01.js 맨 위 설명과 같다. id는 한번 정하면 바꾸지 않는다. */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["U05-2"] = [
  {
    id: "q1", type: "mc",
    q: "PowerShell 프롬프트가 PS C:\\Users\\me\\Desktop> 입니다. 지금 현재 위치는?",
    options: [
      { t: "C:\\Users\\me\\Desktop 폴더", why: "프롬프트의 PS와 > 사이가 현재 위치입니다." },
      { t: "PowerShell이 설치된 폴더", why: "프롬프트는 프로그램이 설치된 곳이 아니라 지금 들어가 있는 폴더를 보여 줍니다." },
      { t: "Python이 설치된 폴더", why: "Python과 관계없습니다. 이 프롬프트는 PowerShell의 것입니다." },
      { t: "C 드라이브 맨 위(C:\\)", why: "C:\\ 에서 Users, me, Desktop으로 세 칸 내려간 곳입니다." }
    ],
    answer: 0
  },
  {
    id: "q2", type: "mc",
    q: "현재 위치가 C:\\Users\\me\\Documents\\python-study 일 때 cd .. 을 치면 어디로 갈까요?",
    options: [
      { t: "C:\\Users\\me\\Documents", why: "점 두 개(..)는 부모 폴더, 곧 한 칸 바깥입니다." },
      { t: "C:\\Users\\me", why: "한 번의 cd .. 은 한 칸만 나갑니다. 두 칸 나가려면 두 번 쳐야 합니다." },
      { t: "C:\\", why: "맨 위까지 한 번에 가지 않습니다." },
      { t: "C:\\Users\\me\\Documents\\python-study\\.. 라는 새 폴더", why: ".. 은 새 폴더 이름이 아니라 '부모 폴더'를 뜻하는 약속입니다." }
    ],
    answer: 0
  },
  {
    id: "q3", type: "mc",
    q: "PS C:\\Users\\me> 에서 차례로 cd Documents, cd python-study, cd .., cd .. 를 쳤습니다. 마지막 프롬프트는?",
    options: [
      { t: "PS C:\\Users\\me>", why: "두 칸 들어갔다가(Documents → python-study) 두 칸 나왔으니 처음 자리로 돌아옵니다." },
      { t: "PS C:\\Users\\me\\Documents>", why: "cd .. 을 두 번 쳤으므로 Documents에서 한 칸 더 나갑니다." },
      { t: "PS C:\\Users>", why: "들어간 칸 수(2)와 나온 칸 수(2)가 같으므로 처음 자리 C:\\Users\\me 입니다." },
      { t: "PS C:\\Users\\me\\Documents\\python-study>", why: "이것은 두 번째 명령 뒤의 위치입니다. 그 뒤로 두 번 나갔습니다." }
    ],
    answer: 0
  },
  {
    id: "q4", type: "mc",
    q: "hello.py의 두 줄 순서를 바꿔서 1번 줄에 print(2 + 3), 2번 줄에 print(\"안녕하세요\")를 두고 python hello.py로 실행했습니다. 화면에 나오는 것은?",
    options: [
      { t: "5 다음 줄에 안녕하세요", why: "파일은 위에서 아래로 한 줄씩 실행되므로 1번 줄의 결과 5가 먼저 나옵니다." },
      { t: "안녕하세요 다음 줄에 5", why: "이것은 원래 순서일 때의 결과입니다. 실행 순서는 파일에 적힌 순서를 따릅니다." },
      { t: "2 + 3 다음 줄에 안녕하세요", why: "print(2 + 3)은 괄호 안을 계산한 값 5를 보여 줍니다. 글자 '2 + 3'을 보여 주려면 따옴표로 감싸야 합니다(PY01·1)." },
      { t: "아무것도 나오지 않는다", why: "두 줄 모두 print를 썼으므로 파일 실행에서도 화면에 나옵니다." }
    ],
    answer: 0
  },
  {
    id: "q5", type: "mc",
    q: "파일 calc.py에 두 줄이 있습니다. 1번 줄 10 * 3, 2번 줄 print(10 + 3). python calc.py로 실행하면 화면에 무엇이 나올까요?",
    options: [
      { t: "13 하나만", why: "파일 실행은 값을 자동으로 보여 주지 않으므로 print가 없는 1번 줄(30)은 계산만 되고 화면에 나오지 않습니다." },
      { t: "30 다음 줄에 13", why: "대화형 실행이라면 30도 보이겠지만, 파일 실행에는 자동 보여 주기 단계가 없습니다." },
      { t: "30 하나만", why: "print가 있는 쪽은 2번 줄(10 + 3)입니다." },
      { t: "아무것도 나오지 않는다", why: "2번 줄에 print가 있으므로 13은 나옵니다." }
    ],
    answer: 0
  },
  {
    id: "q6", type: "mc",
    q: "python hello.py를 쳤더니 python.exe: can't open file '…\\hello.py': [Errno 2] No such file or directory 가 나왔습니다. 원인으로 볼 수 없는 것은?",
    options: [
      { t: "현재 위치가 hello.py가 든 폴더가 아니다", why: "가장 흔한 원인입니다. 프롬프트를 확인하고 cd 합니다." },
      { t: "파일 실제 이름이 hello.py.txt다", why: "원인이 될 수 있습니다. ls로 실제 이름을 확인합니다." },
      { t: "파일 이름을 helo.py처럼 잘못 쳤다", why: "원인이 될 수 있습니다. 실제로는 '쳤다고 생각한 이름'이 아니라 '친 이름'을 찾습니다." },
      { t: "Python 폴더가 PATH에 없다", why: "정답(원인이 아님). 이 메시지를 낸 것이 python.exe이므로 Python은 이미 잘 찾아 실행되었습니다. PATH 문제였다면 PowerShell이 '인식되지 않습니다'라고 말합니다." }
    ],
    answer: 3
  },
  {
    id: "q7", type: "mc",
    q: "python hello.py를 쳤더니 SyntaxError: invalid syntax 가 나왔고, 줄 맨 앞에 >>> 가 보입니다. 무엇이 문제일까요?",
    options: [
      { t: "hello.py 안의 코드에 문법 오류가 있다", why: "파일은 실행되지도 않았습니다. 문제는 명령을 친 자리입니다." },
      { t: "Python 대화형 실행 안에서 PowerShell 명령을 쳤다", why: ">>> 에서는 Python 코드를 칩니다. exit()로 나와 PowerShell 프롬프트에서 다시 칩니다." },
      { t: "현재 위치가 틀렸다", why: "위치가 틀렸다면 can't open file 오류가 납니다. SyntaxError는 Python이 줄을 코드로 읽다가 실패했다는 뜻입니다." },
      { t: "PATH 설정이 잘못되었다", why: ">>> 가 보인다는 것은 Python이 이미 실행 중이라는 뜻입니다." }
    ],
    answer: 1
  },
  {
    id: "q8", type: "short",
    q: "대화형 실행(>>>)과 파일 실행(python 파일.py)의 차이를 두 가지 이상 적어 보세요.",
    a: "① 대화형 실행은 계산한 값을 자동으로 보여 주지만, 파일 실행은 print로 내보낸 것만 보여 준다. ② 대화형 실행은 exit()를 칠 때까지 계속 기다리고 창을 닫으면 코드가 사라지지만, 파일 실행은 마지막 줄 뒤에 저절로 끝나고 코드가 파일로 남아 몇 번이고 다시 실행할 수 있다."
  },
  {
    id: "q9", type: "mc",
    q: "'스크립트'를 가장 잘 설명한 것은?",
    options: [
      { t: "코드를 .py 같은 파일로 저장해 두고 통째로 실행하는 것", why: "할 일이 처음부터 끝까지 적힌 대본(script)이라는 뜻입니다." },
      { t: ">>> 에 한 줄씩 치는 코드", why: "그것은 대화형 실행입니다." },
      { t: "PowerShell의 프롬프트", why: "프롬프트는 입력을 기다린다는 표시입니다." },
      { t: "Python을 설치하는 프로그램", why: "설치 프로그램은 스크립트와 관계없습니다." }
    ],
    answer: 0
  },
  {
    id: "q10", type: "num",
    q: "파일 show.py에 다섯 줄이 있습니다: print(\"시작\") / 5 * 5 / print(5 * 5) / x = 3 / print(x). python show.py로 실행하면 화면에 몇 줄이 나올까요?",
    answer: 3,
    a: "print가 있는 줄만 화면에 나옵니다. print(\"시작\") → 시작, print(5 * 5) → 25, print(x) → 3. 5 * 5 와 x = 3 줄은 실행은 되지만 아무것도 보여 주지 않습니다. 모두 3줄."
  },
  {
    id: "q11", type: "mc",
    q: "탐색기에는 hello.py로 보이는데 python hello.py가 파일을 찾지 못합니다. ls를 쳐 보니 hello.py.txt가 보입니다. 알맞은 대처는?",
    options: [
      { t: "파일 이름을 hello.py로 바꾸고(또는 메모장에서 '모든 파일' 형식으로 다시 저장) 실행한다", why: "탐색기가 확장자 .txt를 숨겨서 hello.py처럼 보였던 것입니다. 탐색기에서 '파일 확장명' 보기를 켜 두면 다음부터 바로 보입니다." },
      { t: "Python을 다시 설치한다", why: "Python은 잘 실행되었습니다(오류를 낸 것이 python.exe). 파일 이름 문제입니다." },
      { t: "python hello.py를 여러 번 친다", why: "같은 이름을 다시 쳐도 실제 파일 이름이 다르면 계속 못 찾습니다." },
      { t: "cd .. 로 한 칸 나간다", why: "파일은 이 폴더에 있습니다. 위치가 아니라 이름이 문제입니다." }
    ],
    answer: 0
  },
  {
    id: "q12", type: "mc",
    q: "다음 중 PowerShell(셸)이 낸 오류는?",
    options: [
      { t: "'pyhton' 용어는 cmdlet, 함수, 스크립트 파일 또는 실행 프로그램의 이름으로 인식되지 않습니다", why: "명령 이름에 맞는 프로그램을 PATH에서 찾지 못했을 때 셸이 내는 말입니다." },
      { t: "python.exe: can't open file '…\\hello.py': [Errno 2] No such file or directory", why: "맨 앞에 python.exe가 있듯이 Python이 낸 오류입니다. Python은 실행되었고 파일을 못 찾은 것입니다." },
      { t: "SyntaxError: invalid syntax", why: "Python이 줄을 코드로 읽다가 낸 오류입니다." },
      { t: "NameError: name 'python' is not defined", why: "Python 대화형 실행 안에서 python이라는 이름을 찾지 못해 Python이 낸 오류입니다." }
    ],
    answer: 0
  },
  {
    id: "q13", type: "mc",
    q: "PowerShell에서 현재 위치에 든 파일과 폴더 목록을 보는 명령은?",
    options: [
      { t: "ls (또는 dir)", why: "파일 이름을 확장자까지 그대로 보여 줘서, 실제 이름을 확인할 때 가장 확실합니다." },
      { t: "cd", why: "cd는 현재 위치를 옮기는 명령입니다." },
      { t: "mkdir", why: "mkdir은 새 폴더를 만드는 명령입니다." },
      { t: "python --version", why: "Python 버전을 묻는 명령입니다." }
    ],
    answer: 0
  }
];
