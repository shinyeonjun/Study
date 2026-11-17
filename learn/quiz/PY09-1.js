/* PY09-1 import와 가상환경: 어떤 Python을 쓰고 있나 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["PY09-1"] = [
  {
    "id": "q1",
    "type": "mc",
    "q": "statistics의 mean을 현재 파일에서 stats.mean으로 쓰려면?",
    "answer": 1,
    "options": [
      {
        "t": "pip install stats",
        "why": "statistics는 표준 라이브러리이며 설치 명령은 이름을 만들지 않습니다."
      },
      {
        "t": "import statistics as stats",
        "why": "모듈을 가져오고 현재 이름을 stats로 정합니다."
      },
      {
        "t": "import stats",
        "why": "stats라는 모듈을 찾으라는 뜻입니다."
      },
      {
        "t": "print(stats)",
        "why": "stats를 만들지 않고 곧바로 사용합니다."
      }
    ]
  },
  {
    "id": "q2",
    "type": "mc",
    "q": "가상환경 B에서 실행 중인데 NumPy는 가상환경 A에만 설치했습니다. 일반적인 venv 기본 설정에서 어떤 결과인가요?",
    "answer": 2,
    "options": [
      {
        "t": "자동으로 A를 찾아 실행",
        "why": "서로 독립인 환경의 설치 위치를 자동으로 공유하지 않습니다."
      },
      {
        "t": "A의 Python이 자동 실행",
        "why": "이미 B의 Python을 선택했습니다."
      },
      {
        "t": "B에서는 NumPy를 찾을 수 없다",
        "why": "B의 설치 위치에 NumPy가 없습니다."
      },
      {
        "t": "Windows 전체의 Python이 삭제된다",
        "why": "가상환경 실행은 다른 설치를 삭제하지 않습니다."
      }
    ]
  },
  {
    "id": "q3",
    "type": "mc",
    "q": "Windows에서 특정 .venv에 NumPy를 설치하는 가장 명확한 명령은?",
    "answer": 0,
    "options": [
      {
        "t": ".\\.venv\\Scripts\\python.exe -m pip install numpy",
        "why": "pip를 실행하는 Python을 경로로 지정했습니다."
      },
      {
        "t": "pip install numpy",
        "why": "어느 pip가 실행되는지 현재 검색 경로에 따릅니다."
      },
      {
        "t": "import numpy",
        "why": "설치 명령이 아니라 Python 문장입니다."
      },
      {
        "t": "python -m venv numpy",
        "why": "numpy라는 이름의 환경을 만드는 명령입니다."
      }
    ]
  },
  {
    "id": "q4",
    "type": "mc",
    "q": "import numpy가 성공한 뒤 numpy.array가 없습니다. 어떤 정보를 먼저 확인할까요?",
    "answer": 1,
    "options": [
      {
        "t": "모니터 해상도",
        "why": "모듈을 찾는 위치와 관계없습니다."
      },
      {
        "t": "numpy.__file__",
        "why": "충돌하는 연습 파일을 불러온 것인지 경로에서 확인할 수 있습니다."
      },
      {
        "t": "배열의 평균",
        "why": "아직 배열을 만들 수 없는 상황입니다."
      },
      {
        "t": "현재 날짜",
        "why": "패키지에서 가져온 파일의 경로를 알려 주지 않습니다."
      }
    ]
  },
  {
    "id": "q5",
    "type": "num",
    "q": "가상환경 A, B, C 중 A와 C에만 pandas를 설치했습니다. 기본 설정에서 이 세 환경 각각을 실행할 때 pandas를 가져올 수 있는 환경은 몇 개인가요?",
    "answer": 2,
    "a": "A와 C의 두 환경입니다. B에는 설치하지 않았습니다."
  },
  {
    "id": "q6",
    "type": "mc",
    "q": "편집기와 PowerShell이 같은 Python을 쓰는지 가장 직접 확인하는 값은?",
    "answer": 0,
    "options": [
      {
        "t": "sys.executable",
        "why": "실행 중인 Python의 경로입니다."
      },
      {
        "t": "len('python')",
        "why": "문자 수만 계산합니다."
      },
      {
        "t": "numpy.mean",
        "why": "평균을 구하는 함수입니다."
      },
      {
        "t": "datetime의 오늘 날짜",
        "why": "실행 파일을 식별할 수 없습니다."
      }
    ]
  },
  {
    "id": "q7",
    "type": "mc",
    "q": "venv 활성화가 막혔지만 .venv가 만들어져 있습니다. 안전한 다음 단계는?",
    "answer": 2,
    "options": [
      {
        "t": "PC의 실행 정책을 전부 꺼야 한다",
        "why": "실행 파일을 직접 호출할 수 있습니다."
      },
      {
        "t": "항상 전역 Python으로 설치한다",
        "why": "프로젝트별 설치 분리를 잃습니다."
      },
      {
        "t": "그 .venv 안의 Python 실행 파일을 직접 사용한다",
        "why": "활성화 없이 대상 환경을 지정할 수 있습니다."
      },
      {
        "t": ".venv 폴더 이름을 python.py로 바꾼다",
        "why": "폴더 이름을 바꿔도 실행 파일을 지정하는 효과는 없습니다."
      }
    ]
  },
  {
    "id": "q8",
    "type": "mc",
    "q": "import numpy as np에서 np는 무엇인가요?",
    "answer": 2,
    "options": [
      {
        "t": "pip에서 설치하는 두 번째 패키지",
        "why": "별도 패키지가 아닙니다."
      },
      {
        "t": "항상 필요한 예약어",
        "why": "다른 별칭도 지정할 수 있습니다."
      },
      {
        "t": "현재 코드에서 numpy를 가리키는 별칭",
        "why": "같은 모듈을 참조하는 짧은 이름입니다."
      },
      {
        "t": "배열 자료형 자체",
        "why": "모듈의 별칭이며 배열은 그 안의 기능을 호출해 만듭니다."
      }
    ]
  },
  {
    "id": "q9",
    "type": "short",
    "q": "설치는 성공했는데 편집기에서 ModuleNotFoundError가 납니다. 두 단계로 조사해 보세요.",
    "a": "편집기와 설치 명령 쪽에서 sys.executable로 Python 경로를 비교합니다. 의도한 환경을 선택한 뒤, 그 Python으로 -m pip show를 실행해 패키지가 설치되었는지 확인합니다."
  }
];
