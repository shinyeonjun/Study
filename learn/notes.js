/* 공부 교재의 목록. 두 부분으로 되어 있다.

   0) BDA_SKIP — 건너뛰는 단원(이미 아는 기초).
   1) CHAPTERS — 실제로 쓴 장. 새 장을 쓰면 여기에 한 줄만 추가한다(손으로 고치는 곳).
      단원 ID 아래에 { id, title, href }.
        id    : 공부 기록이 저장되는 번호. 장의 <body data-note="...">와 같아야 하고, 한번 정하면 바꾸지 않는다.
        title : 장 제목
        href  : bigdata/ 폴더 기준 경로
   2) BDA_MAP — 지식 지도(분야 22개, 단원 199개, 선수관계, 경로). tools/build_map.py가 만든다.

   홈 목차, 단원 안내, 장의 위치 표시, 이전·다음, 복습이 모두 이 파일에서 만들어진다. */

window.BDA_CHAPTERS = {
  U01: [
    {"id": "U01-1", "title": "궁금함을 질문으로 바꾸기", "href": "notes/u/u01-1.html"},
    {"id": "U01-2", "title": "사실·추측·가정 가려 읽기", "href": "notes/u/u01-2.html"},
    {"id": "U01-3", "title": "모르는 낱말 노트", "href": "notes/u/u01-3.html"}
  ],
  U02: [
    {"id": "U02-1", "title": "파일과 확장자", "href": "notes/u/u02-1.html"},
    {"id": "U02-2", "title": "폴더와 경로", "href": "notes/u/u02-2.html"},
    {"id": "U02-3", "title": "저장·열기·복사·백업", "href": "notes/u/u02-3.html"}
  ],
  U03: [
    {"id": "U03-1", "title": "입력·처리·출력·저장", "href": "notes/u/u03-1.html"},
    {"id": "U03-2", "title": "부품과 프로그램", "href": "notes/u/u03-2.html"},
    {"id": "U03-3", "title": "브라우저와 서버", "href": "notes/u/u03-3.html"}
  ],
  U04: [
    {"id": "U04-1", "title": "등호·부등호·괄호", "href": "notes/u/u04-1.html"},
    {"id": "U04-2", "title": "변수·첨자·단위", "href": "notes/u/u04-2.html"},
    {"id": "U04-3", "title": "비트·바이트와 kB·KiB", "href": "notes/u/u04-3.html"}
  ],
  U05: [
    {"id": "U05-1", "title": "Python 설치와 인터프리터", "href": "notes/u/u05-1.html"},
    {"id": "U05-2", "title": "터미널에서 .py 파일 실행하기", "href": "notes/u/u05-2.html"},
    {"id": "U05-3", "title": "노트북의 실행 순서와 오류 메시지 읽기", "href": "notes/u/u05-3.html"}
  ],
  U06: [
    {"id": "U06-1", "title": "자료의 종류와 믿을 정도", "href": "notes/u/u06-1.html"},
    {"id": "U06-2", "title": "검색어 만들기와 AI 답 확인하기", "href": "notes/u/u06-2.html"}
  ],
  AR06: [
    {"id": "AR06-1", "title": "비와 비례, 단위당 양", "href": "notes/ar/ar06-1.html"},
    {"id": "AR06-2", "title": "단위 환산과 속도·처리량", "href": "notes/ar/ar06-2.html"}
  ],
  AR07: [
    {"id": "AR07-1", "title": "백분율과 퍼센트포인트", "href": "notes/ar/ar07-1.html"},
    {"id": "AR07-2", "title": "증가율과 거듭된 변화", "href": "notes/ar/ar07-2.html"}
  ],
  AR10: [
    {"id": "AR10-1", "title": "합과 평균, 합 기호 Σ", "href": "notes/ar/ar10-1.html"},
    {"id": "AR10-2", "title": "가중평균과 평균의 평균 함정", "href": "notes/ar/ar10-2.html"}
  ],
  AL04: [
    {"id": "AL04-1", "title": "함수: 정의역·치역, 합성, 역함수", "href": "notes/al/al04-1.html"}
  ],
  AL05: [
    {"id": "AL05-1", "title": "직선과 변화율: 기울기, 일차함수, 잔차", "href": "notes/al/al05-1.html"}
  ],
  AL06: [
    {"id": "AL06-1", "title": "다항식을 펼치고, 약분 뒤에도 정의역 남기기", "href": "notes/al/al06-1.html"},
    {"id": "AL06-2", "title": "이차함수의 뿌리, 꼭짓점과 최솟값", "href": "notes/al/al06-2.html"}
  ],
  AL07: [
    {"id": "AL07-1", "title": "지수와 지수함수: 같은 양을 더할 때와 같은 배를 곱할 때", "href": "notes/al/al07-1.html"},
    {"id": "AL07-2", "title": "로그: 몇 번 곱했는지 거꾸로 찾기", "href": "notes/al/al07-2.html"}
  ],
  AL09: [
    {"id": "AL09-1", "title": "등차와 등비: 항의 번호와 변화 규칙", "href": "notes/al/al09-1.html"},
    {"id": "AL09-2", "title": "유한합과 유한곱, 조건을 세는 지시함수", "href": "notes/al/al09-2.html"}
  ],
  PY01: [
    {"id": "PY01-1", "title": "print와 변수", "href": "notes/py/py01-1.html"},
    {"id": "PY01-2", "title": "값의 종류: int, float, str, bool", "href": "notes/py/py01-2.html"},
    {"id": "PY01-3", "title": "숫자 계산과 연산자", "href": "notes/py/py01-3.html"}
  ],
  PY02: [
    {"id": "PY02-1", "title": "문자열 다루기", "href": "notes/py/py02-1.html"},
    {"id": "PY02-2", "title": "입력과 형 변환", "href": "notes/py/py02-2.html"},
    {"id": "PY02-3", "title": "참·거짓과 비교, 흔한 오류", "href": "notes/py/py02-3.html"}
  ],
  PY03: [
    {"id": "PY03-1", "title": "if·elif·else와 들여쓰기", "href": "notes/py/py03-1.html"},
    {"id": "PY03-2", "title": "and·or·not으로 조건 묶기", "href": "notes/py/py03-2.html"},
    {"id": "PY03-3", "title": "경계값과 조건 설계", "href": "notes/py/py03-3.html"}
  ],
  PY04: [
    {"id": "PY04-1", "title": "리스트와 인덱스·슬라이싱", "href": "notes/py/py04-1.html"},
    {"id": "PY04-2", "title": "for 반복과 누적값", "href": "notes/py/py04-2.html"},
    {"id": "PY04-3", "title": "while 반복과 종료 조건", "href": "notes/py/py04-3.html"}
  ],
  PY05: [
    {"id": "PY05-1", "title": "함수 만들기: 매개변수와 반환값", "href": "notes/py/py05-1.html"},
    {"id": "PY05-2", "title": "지역변수와 문제 분해", "href": "notes/py/py05-2.html"}
  ],
  PY06: [
    {"id": "PY06-1", "title": "딕셔너리·집합·튜플", "href": "notes/py/py06-1.html"},
    {"id": "PY06-2", "title": "바뀌는 값과 참조·복사", "href": "notes/py/py06-2.html"}
  ],
  PY07: [
    {"id": "PY07-1", "title": "텍스트 파일·경로·인코딩", "href": "notes/py/py07-1.html"},
    {"id": "PY07-2", "title": "CSV와 JSON 주고받기", "href": "notes/py/py07-2.html"}
  ],
  PY08: [
    {"id": "PY08-1", "title": "오류 읽기·재현·assert", "href": "notes/py/py08-1.html"},
    {"id": "PY08-2", "title": "예외 처리와 입력 검증", "href": "notes/py/py08-2.html"}
  ],
  PY09: [
    {"id": "PY09-1", "title": "import와 가상환경: 어떤 Python을 쓰고 있나", "href": "notes/py/py09-1.html"},
    {"id": "PY09-2", "title": "다시 실행할 수 있게 버전과 작업 조건 남기기", "href": "notes/py/py09-2.html"}
  ],
  PY10: [
    {"id": "PY10-1", "title": "NumPy 배열의 모양·축·자료형", "href": "notes/py/py10-1.html"},
    {"id": "PY10-2", "title": "배열에서 값을 골라 계산하고 집계하기", "href": "notes/py/py10-2.html"},
    {"id": "PY10-3", "title": "브로드캐스팅과 재현할 수 있는 난수 실험", "href": "notes/py/py10-3.html"}
  ],
  PY11: [
    {"id": "PY11-1", "title": "pandas로 표 읽고 필요한 행 고르기", "href": "notes/py/py11-1.html"},
    {"id": "PY11-2", "title": "pandas로 묶어 세고 키로 두 표 잇기", "href": "notes/py/py11-2.html"},
    {"id": "PY11-3", "title": "Matplotlib로 그래프 그리고 오차 막대 읽기", "href": "notes/py/py11-3.html"}
  ],
  DA01: [
    {"id": "DA01-1", "title": "관측과 변수, 행과 열", "href": "notes/da/da01-1.html"},
    {"id": "DA01-2", "title": "한 행의 단위와 수집 맥락", "href": "notes/da/da01-2.html"}
  ],
  DA02: [
    {"id": "DA02-1", "title": "변수의 종류: 수치·범주·순서·시간", "href": "notes/da/da02-1.html"},
    {"id": "DA02-2", "title": "데이터의 모양, 그리고 결측과 0", "href": "notes/da/da02-2.html"}
  ],
  DA03: [
    {"id": "DA03-1", "title": "도수와 비율, 막대그래프와 히스토그램", "href": "notes/da/da03-1.html"},
    {"id": "DA03-2", "title": "산점도와 선 그래프, 그림을 의심하는 법", "href": "notes/da/da03-2.html"}
  ],
  DA04: [
    {"id": "DA04-1", "title": "평균·중앙값·최빈값", "href": "notes/da/da04-1.html"},
    {"id": "DA04-2", "title": "분위수와 상자 그림, 분포의 모양", "href": "notes/da/da04-2.html"}
  ],
  DA05: [
    {"id": "DA05-1", "title": "범위·분산·표준편차", "href": "notes/da/da05-1.html"},
    {"id": "DA05-2", "title": "표준화와 z 점수", "href": "notes/da/da05-2.html"}
  ],
  DA06: [
    {"id": "DA06-1", "title": "중복·결측·단위·범주 검사", "href": "notes/da/da06-1.html"},
    {"id": "DA06-2", "title": "관측 시점과 데이터 누출", "href": "notes/da/da06-2.html"}
  ],
  DA07: [
    {"id": "DA07-1", "title": "실전 분석 1: 마우나로아 관측 CSV 읽고 검사하기", "href": "notes/da/da07-1.html"},
    {"id": "DA07-2", "title": "실전 분석 2: 변화량·요약표·분석 보고서", "href": "notes/da/da07-2.html"}
  ],
  DA08: [
    {"id": "DA08-1", "title": "모집단·표본·선택 편향: 결과를 어디까지 말할 수 있나", "href": "notes/da/da08-1.html"},
    {"id": "DA08-2", "title": "표본을 반복해서 뽑아 보면: 정확한 계산과 시뮬레이션", "href": "notes/da/da08-2.html"}
  ],
  DM01: [
    {"id": "DM01-1", "title": "집합과 연산: 조건을 만족하는 행 모으기", "href": "notes/dm/dm01-1.html"},
    {"id": "DM01-2", "title": "명제와 논리식: 기준을 코드로 옮기기", "href": "notes/dm/dm01-2.html"}
  ],
  DM02: [
    {"id": "DM02-1", "title": "모든·어떤, 조건과 결론을 정확히 읽기", "href": "notes/dm/dm02-1.html"},
    {"id": "DM02-2", "title": "반례와 증명: 예시에서 일반 주장으로", "href": "notes/dm/dm02-2.html"}
  ],
  DM03: [
    {"id": "DM03-1", "title": "경우의 수를 세는 두 법칙과 순열", "href": "notes/dm/dm03-1.html"},
    {"id": "DM03-2", "title": "순서를 빼고 세기: 조합과 이항계수", "href": "notes/dm/dm03-2.html"}
  ],
  NW01: [
    {"id": "NW01-1", "title": "호스트가 어떻게 역할을 나눠 통신하는가", "href": "notes/nw/nw01-1.html"},
    {"id": "NW01-2", "title": "집의 LAN에서 여러 네트워크로 건너가기", "href": "notes/nw/nw01-2.html"}
  ],
  NW02: [
    {"id": "NW02-1", "title": "웹 주소에서 HTTP 요청과 응답 읽기", "href": "notes/nw/nw02-1.html"},
    {"id": "NW02-2", "title": "브라우저로 웹 요청을 관찰하고 API 값 읽기", "href": "notes/nw/nw02-2.html"}
  ],
  NW03: [
    {"id": "NW03-1", "title": "패킷으로 나눠 보내고 계층을 따라 다시 읽기", "href": "notes/nw/nw03-1.html"},
    {"id": "NW03-2", "title": "지연·용량·처리량·손실을 단위로 계산하기", "href": "notes/nw/nw03-2.html"}
  ],
  LA01: [
    {"id": "LA01-1", "title": "벡터와 성분: 한 관측을 숫자 여러 개로 나타내기", "href": "notes/la/la01-1.html"},
    {"id": "LA01-2", "title": "벡터 덧셈과 스칼라곱: 방향과 성분으로 계산하기", "href": "notes/la/la01-2.html"}
  ],
  LA02: [
    {"id": "LA02-1", "title": "내적과 노름: 가중합과 거리 계산", "href": "notes/la/la02-1.html"},
    {"id": "LA02-2", "title": "직교·사영·코사인 유사도: 방향을 따로 읽기", "href": "notes/la/la02-2.html"}
  ],
  LA03: [
    {"id": "LA03-1", "title": "행렬의 두 관점: 숫자 표와 선형변환", "href": "notes/la/la03-1.html"}
  ],
  LA04: [
    {"id": "LA04-1", "title": "행렬 곱과 전치: 계산 전에 모양부터 읽기", "href": "notes/la/la04-1.html"},
    {"id": "LA04-2", "title": "행렬 곱의 순서와 변환의 합성", "href": "notes/la/la04-2.html"}
  ],
  LA05: [
    {"id": "LA05-1", "title": "가우스 소거: 연립식의 해가 한 개·없음·여러 개인 경우", "href": "notes/la/la05-1.html"},
    {"id": "LA05-2", "title": "역행렬과 선형계 풀이: 어떻게 되돌릴 것인가", "href": "notes/la/la05-2.html"}
  ],
  LA06: [
    {"id": "LA06-1", "title": "선형결합과 기저로 벡터의 좌표 읽기", "href": "notes/la/la06-1.html"},
    {"id": "LA06-2", "title": "열공간과 영공간으로 선형계의 해 읽기", "href": "notes/la/la06-2.html"},
    {"id": "LA06-3", "title": "직교정규기저와 QR로 가장 가까운 해 찾기", "href": "notes/la/la06-3.html"}
  ],
  CA01: [
    {"id": "CA01-1", "title": "항을 크게 보낼 때와 두 점을 좁힐 때", "href": "notes/ca/ca01-1.html"},
    {"id": "CA01-2", "title": "함수의 극한과 연속: 그 점과 그 주변", "href": "notes/ca/ca01-2.html"}
  ],
  CA02: [
    {"id": "CA02-1", "title": "미분계수 · 한 순간의 변화율과 접선", "href": "notes/ca/ca02-1.html"},
    {"id": "CA02-2", "title": "도함수 · 증가와 감소, 극값 찾기", "href": "notes/ca/ca02-2.html"}
  ],
  CA03: [
    {"id": "CA03-1", "title": "미분 계산 · 다항식, 곱·몫, 지수·로그", "href": "notes/ca/ca03-1.html"},
    {"id": "CA03-2", "title": "합성함수의 연쇄법칙과 작은 계산 그래프", "href": "notes/ca/ca03-2.html"}
  ],
  CA04: [
    {"id": "CA04-1", "title": "편미분과 기울기: 어느 쪽으로 움직이면 더 빨리 변할까", "href": "notes/ca/ca04-1.html"},
    {"id": "CA04-2", "title": "다변수 연쇄법칙과 야코비 행렬", "href": "notes/ca/ca04-2.html"}
  ],
  CA05: [
    {"id": "CA05-1", "title": "정적분: 순간 변화율을 합해 순변화를 구하기", "href": "notes/ca/ca05-1.html"},
    {"id": "CA05-2", "title": "부정적분·치환과 측정값의 수치 적분", "href": "notes/ca/ca05-2.html"}
  ],
  CA06: [
    {"id": "CA06-1", "title": "부분적분과 이상적분", "href": "notes/ca/ca06-1.html"},
    {"id": "CA06-2", "title": "이중적분과 좌표가 바꾸는 넓이", "href": "notes/ca/ca06-2.html"}
  ],
  PR01: [
    {"id": "PR01-1", "title": "가능한 결과와 그중에 묻는 사건", "href": "notes/pr/pr01-1.html"}
  ],
  PR02: [
    {"id": "PR02-1", "title": "조건이 주어지면 분모가 달라진다", "href": "notes/pr/pr02-1.html"},
    {"id": "PR02-2", "title": "확률나무에서 경로를 곱하고 더하기", "href": "notes/pr/pr02-2.html"}
  ],
  PR03: [
    {"id": "PR03-1", "title": "독립과 배반을 구별하기", "href": "notes/pr/pr03-1.html"},
    {"id": "PR03-2", "title": "경고를 받은 뒤 이상일 확률", "href": "notes/pr/pr03-2.html"}
  ],
  PR04: [
    {"id": "PR04-1", "title": "확률변수 · 한 값의 확률과 누적확률", "href": "notes/pr/pr04-1.html"},
    {"id": "PR04-2", "title": "기댓값·분산과 실제 보상", "href": "notes/pr/pr04-2.html"}
  ],
  PR05: [
    {"id": "PR05-1", "title": "베르누이와 이항분포: 정해진 시행에서 성공 횟수 세기", "href": "notes/pr/pr05-1.html"},
    {"id": "PR05-2", "title": "기하분포: 첫 성공을 만날 때까지 몇 번인가", "href": "notes/pr/pr05-2.html"},
    {"id": "PR05-3", "title": "포아송분포: 정해진 구간 안에서 몇 건인가", "href": "notes/pr/pr05-3.html"}
  ],
  PR06: [
    {"id": "PR06-1", "title": "확률밀도·누적확률·분위수", "href": "notes/pr/pr06-1.html"},
    {"id": "PR06-2", "title": "정규분포와 첫 도착의 지수분포", "href": "notes/pr/pr06-2.html"}
  ],
  PR07: [
    {"id": "PR07-1", "title": "결합분포표에서 주변분포와 조건부분포 읽기", "href": "notes/pr/pr07-1.html"},
    {"id": "PR07-2", "title": "연속 결합밀도: 삼각형을 세로와 가로로 자르기", "href": "notes/pr/pr07-2.html"},
    {"id": "PR07-3", "title": "공분산과 상관: 함께 움직이는 방향을 수로 읽기", "href": "notes/pr/pr07-3.html"}
  ],
  PR08: [
    {"id": "PR08-1", "title": "난수로 표본을 만들고 경험분포 읽기", "href": "notes/pr/pr08-1.html"},
    {"id": "PR08-2", "title": "대수의 법칙으로 표본평균의 안정성을 설명하기", "href": "notes/pr/pr08-2.html"},
    {"id": "PR08-3", "title": "중심극한정리로 표본평균의 분포 읽기", "href": "notes/pr/pr08-3.html"}
  ],
  PR09: [
    {"id": "PR09-1", "title": "조건부기댓값과 전기댓값: 집단 비율로 평균을 합치기", "href": "notes/pr/pr09-1.html"},
    {"id": "PR09-2", "title": "전분산: 집단 안의 차이와 집단 사이의 차이", "href": "notes/pr/pr09-2.html"}
  ],
  PR10: [
    {"id": "PR10-1", "title": "현재 상태와 여러 단계의 전이", "href": "notes/pr/pr10-1.html"},
    {"id": "PR10-2", "title": "정상분포가 있을 때 어디로 수렴하는가", "href": "notes/pr/pr10-2.html"}
  ],
  ST01: [
    {"id": "ST01-1", "title": "기술과 추론 · 어떤 평균을 추정하는가", "href": "notes/st/st01-1.html"},
    {"id": "ST01-2", "title": "반복 관측·표집 편향·측정 편향", "href": "notes/st/st01-2.html"}
  ],
  ST02: [
    {"id": "ST02-1", "title": "모수·통계량·우도: 관측을 잘 설명하는 값을 찾기", "href": "notes/st/st02-1.html"},
    {"id": "ST02-2", "title": "추정량의 편향과 변동: 한 번의 오차와 반복의 성질", "href": "notes/st/st02-2.html"}
  ],
  ST03: [
    {"id": "ST03-1", "title": "표집분포와 표준오차, 구간의 포괄률", "href": "notes/st/st03-1.html"},
    {"id": "ST03-2", "title": "평균의 t 신뢰구간을 손으로 만들기", "href": "notes/st/st03-2.html"},
    {"id": "ST03-3", "title": "부트스트랩: 가지고 있는 표본에서 다시 뽑기", "href": "notes/st/st03-3.html"}
  ],
  ST04: [
    {"id": "ST04-1", "title": "귀무가설, 검정통계량, p값", "href": "notes/st/st04-1.html"},
    {"id": "ST04-2", "title": "틀릴 확률과 검정력, 표본 수를 정하는 법", "href": "notes/st/st04-2.html"}
  ],
  OP03: [
    {"id": "OP03-1", "title": "최솟값을 정의하고 한 변수에서 내려가기", "href": "notes/op/op03-1.html"},
    {"id": "OP03-2", "title": "두 매개변수에서 기울기를 계산하고 멈추기", "href": "notes/op/op03-2.html"}
  ],
  AI01: [
    {"id": "AI01-1", "title": "인공지능이 푸는 문제와 출력 읽기", "href": "notes/ai/ai01-1.html"},
    {"id": "AI01-2", "title": "규칙과 학습을 구분하고 AI 계열 연결하기", "href": "notes/ai/ai01-2.html"}
  ],
  ML01: [
    {"id": "ML01-1", "title": "한 행의 뜻과 예측할 값부터 정하기", "href": "notes/ml/ml01-1.html"},
    {"id": "ML01-2", "title": "정답 열 없이 군집과 자기지도 과제 만들기", "href": "notes/ml/ml01-2.html"}
  ],
  ML02: [
    {"id": "ML02-1", "title": "기준 모델과 훈련·검증·테스트", "href": "notes/ml/ml02-1.html"},
    {"id": "ML02-2", "title": "새 거점과 미래 주문을 위한 분할과 누출 방지", "href": "notes/ml/ml02-2.html"}
  ],
  ML03: [
    {"id": "ML03-1", "title": "회귀 오차를 평균 내는 세 가지 방법", "href": "notes/ml/ml03-1.html"},
    {"id": "ML03-2", "title": "혼동행렬로 보고 정밀도·재현율 계산하기", "href": "notes/ml/ml03-2.html"},
    {"id": "ML03-3", "title": "ROC와 PR 곡선, AP와 면적 읽기", "href": "notes/ml/ml03-3.html"}
  ],
  RL01: [
    {"id": "RL01-1", "title": "에이전트와 환경: 무엇을 보고 무엇을 바꾸나", "href": "notes/rl/rl01-1.html"},
    {"id": "RL01-2", "title": "정책을 따라 경험 한 줄씩 기록하기", "href": "notes/rl/rl01-2.html"}
  ],
  RL02: [
    {"id": "RL02-1", "title": "밴딧의 행동 가치를 보상 평균으로 추정하기", "href": "notes/rl/rl02-1.html"},
    {"id": "RL02-2", "title": "ε-greedy: 평균을 쓰면서 새 선택지도 확인하기", "href": "notes/rl/rl02-2.html"}
  ],
  RL03: [
    {"id": "RL03-1", "title": "반환과 할인: 나중의 보상을 지금 비교하기", "href": "notes/rl/rl03-1.html"},
    {"id": "RL03-2", "title": "에피소드의 종료와 기록의 중단을 가려내기", "href": "notes/rl/rl03-2.html"}
  ],
  RS01: [
    {"id": "RS01-1", "title": "질문에서 가설로: 조작적 정의와 측정", "href": "notes/rs/rs01-1.html"},
    {"id": "RS01-2", "title": "큰 질문을 작은 비교로: 가정과 반례", "href": "notes/rs/rs01-2.html"}
  ]
};

/* 건너뛰는 단원: 사용자가 이미 아는 기초라서 쓰지 않는다(2026-11-18 결정: 기초 산술과 중학교 대수 제외. 사용자는 고등학교 수학까지 대략 아는 대학생).
   목차에는 '건너뜀'으로 흐리게 남고, 경로의 앞내용에는 나오지 않는다. */
window.BDA_SKIP = ["AR01", "AR02", "AR03", "AR04", "AR05", "AR08", "AR09", "AL01", "AL02", "AL03"];

// ---- 지도 시작 (tools/build_map.py가 만든다. 직접 고치지 않는다)
window.BDA_MAP = {
  source: "LEARNING_MAP.md (2026-11-18)",
  groups: [{"name": "출발과 연구", "areas": ["U", "RS"]}, {"name": "수학", "areas": ["AR", "AL", "DM", "LA", "CA", "PR", "ST", "OP"]}, {"name": "코딩과 컴퓨터", "areas": ["PY", "CS", "SY", "NW", "DB"]}, {"name": "데이터와 AI", "areas": ["DA", "AI", "ML", "DL", "RL"]}, {"name": "시험과 확장", "areas": ["BD", "SP"]}],
  areas: [
    {"code": "U", "name": "공부·컴퓨터 사용의 출발점", "depth": "입문"},
    {"code": "AR", "name": "산술과 수 감각", "depth": "입문"},
    {"code": "AL", "name": "대수·함수·그래프", "depth": "입문에서 기초"},
    {"code": "PY", "name": "Python과 프로그래밍 사고", "depth": "입문에서 기초"},
    {"code": "DA", "name": "데이터 읽기와 탐색", "depth": "입문에서 기초"},
    {"code": "DM", "name": "논리·이산수학·증명", "depth": "기초"},
    {"code": "CS", "name": "자료구조·알고리즘", "depth": "기초"},
    {"code": "SY", "name": "컴퓨터 구조·운영체제·개발 도구", "depth": "기초"},
    {"code": "NW", "name": "컴퓨터 네트워크와 인터넷", "depth": "입문에서 핵심"},
    {"code": "DB", "name": "데이터베이스와 데이터 처리", "depth": "기초에서 핵심"},
    {"code": "LA", "name": "선형대수", "depth": "기초"},
    {"code": "CA", "name": "미적분과 변화", "depth": "기초"},
    {"code": "PR", "name": "확률", "depth": "기초"},
    {"code": "ST", "name": "통계와 실험 설계", "depth": "기초에서 핵심"},
    {"code": "OP", "name": "수치계산·최적화·정보이론", "depth": "기초에서 핵심"},
    {"code": "AI", "name": "문제 해결·추론·의사결정", "depth": "입문에서 핵심"},
    {"code": "ML", "name": "머신러닝", "depth": "입문에서 핵심"},
    {"code": "DL", "name": "딥러닝", "depth": "핵심"},
    {"code": "RL", "name": "강화학습", "depth": "입문에서 핵심"},
    {"code": "RS", "name": "연구하고 설명하는 방법", "depth": "반복"},
    {"code": "BD", "name": "빅데이터분석기사 연결", "depth": "시험"},
    {"code": "SP", "name": "관심 연구로 갈라지는 확장 지도", "depth": "선택"}
  ],
  units: [
    {"id": "U01", "area": "U", "title": "질문과 배움", "concepts": "알고 싶은 것, 설명과 예측, 가정·사실·추측, 모르는 낱말 적기", "pre": []},
    {"id": "U02", "area": "U", "title": "파일과 폴더", "concepts": "파일·확장자·폴더·경로, 저장과 열기, 복사와 백업, 텍스트 파일", "pre": []},
    {"id": "U03", "area": "U", "title": "컴퓨터의 큰 그림", "concepts": "입력·처리·출력·저장, 하드웨어·소프트웨어, 데이터·프로그램, 브라우저·서버", "pre": []},
    {"id": "U04", "area": "U", "title": "기호와 단위 읽기", "concepts": "등호·부등호·괄호·아래첨자, 수학 변수와 측정 단위, bit/byte, kB/KiB 구분", "pre": []},
    {"id": "U05", "area": "U", "title": "코드를 실행하는 자리", "concepts": "Python 인터프리터, 스크립트와 노트북, 셀 실행 순서, 터미널, 오류 메시지", "pre": ["U02", "U03"]},
    {"id": "U06", "area": "U", "title": "자료를 읽고 질문하기", "concepts": "공식 문서·교재·논문·블로그 구분, 영문 용어 대조, 출처·날짜, 검색어, AI 답 검증", "pre": ["U01"]},
    {"id": "AR01", "area": "AR", "title": "수와 수직선", "concepts": "자연수·0·자리값·크기 비교, 수직선, 개수와 측정값", "pre": []},
    {"id": "AR02", "area": "AR", "title": "사칙연산", "concepts": "덧셈·뺄셈·곱셈·나눗셈의 뜻, 나머지, 괄호·연산 순서", "pre": ["AR01"]},
    {"id": "AR03", "area": "AR", "title": "음수와 거리", "concepts": "정수·부호, 음수 계산, 절댓값, 차이와 거리", "pre": ["AR02"]},
    {"id": "AR04", "area": "AR", "title": "분수", "concepts": "전체와 부분, 약수·배수·공약수·공배수, 동치분수, 약분·통분, 분수의 사칙연산", "pre": ["AR02"]},
    {"id": "AR05", "area": "AR", "title": "소수와 근삿값", "concepts": "소수와 분수 변환, 유한·반복 소수, 반올림, 오차와 유효한 자릿수", "pre": ["AR04"]},
    {"id": "AR06", "area": "AR", "title": "비와 단위", "concepts": "비·비례·단위당 양, 단위 환산, 속도·처리량, 차원 확인", "pre": ["AR05", "U04"]},
    {"id": "AR07", "area": "AR", "title": "백분율과 변화", "concepts": "비율·퍼센트·퍼센트포인트, 증가율, 기준값, 복합 변화", "pre": ["AR06"]},
    {"id": "AR08", "area": "AR", "title": "거듭제곱과 제곱근", "concepts": "지수 규칙, 음수·0 지수, 제곱과 제곱근, 괄호와 부호", "pre": ["AR03", "AR04"]},
    {"id": "AR09", "area": "AR", "title": "아주 큰 수와 작은 수", "concepts": "과학적 표기법, 10의 거듭제곱, 크기 추정, 자릿수 비교", "pre": ["AR05", "AR08"]},
    {"id": "AR10", "area": "AR", "title": "합과 평균", "concepts": "합·개수·단순평균·가중평균, 총합 기호 Σ, 같은 값의 다른 표현", "pre": ["AR04", "AR07"]},
    {"id": "AL01", "area": "AL", "title": "문자를 쓰는 이유", "concepts": "변수·상수·계수·항, 식에 값 넣기, 등식과 대입의 차이", "pre": ["AR03", "AR04"]},
    {"id": "AL02", "area": "AL", "title": "방정식과 부등식", "concepts": "일차방정식·비례식·연립방정식 기초, 양변 변형, 부등식의 범위, 분모 0 제외", "pre": ["AL01", "AR06"]},
    {"id": "AL03", "area": "AL", "title": "좌표와 그래프", "concepts": "좌표축·순서쌍·눈금·단위, 표를 점으로 바꾸기, 축 왜곡 읽기", "pre": ["AR03", "AR07"]},
    {"id": "AL04", "area": "AL", "title": "함수", "concepts": "입력·출력·정의역·치역, 함수값, 합성·역함수의 뜻, 식·표·그림 연결", "pre": ["AL01", "AL03"]},
    {"id": "AL05", "area": "AL", "title": "직선과 변화율", "concepts": "기울기·절편, 일차함수, 두 점 사이 변화, 예측과 오차", "pre": ["AL02", "AL04"]},
    {"id": "AL06", "area": "AL", "title": "다항식과 이차함수", "concepts": "전개·인수분해·유리식의 약분 조건, 이차방정식, 포물선, 최솟값의 그림", "pre": ["AL02", "AR08"]},
    {"id": "AL07", "area": "AL", "title": "지수와 로그", "concepts": "분수 지수·정의되는 범위, 지수·로그의 역관계, 밑의 조건·입력 양수, e·ln·로그 축", "pre": ["AL04", "AR08"]},
    {"id": "AL08", "area": "AL", "title": "각도·삼각함수·복소수", "concepts": "피타고라스·라디안·단위원·sin/cos, 주기, 복소평면; 신호·제어·그래픽스 경로에서 심화", "pre": ["AL03", "AR08"]},
    {"id": "AL09", "area": "AL", "title": "수열과 합 기호", "concepts": "등차·등비수열·유한합, Σ·Π·첨자·범위·지시함수, 반복 계산과 연결", "pre": ["AL04", "AL07", "AR10"]},
    {"id": "PY01", "area": "PY", "title": "첫 프로그램", "concepts": "실행·출력·변수·자료형, 숫자 계산, 코드와 결과의 구분", "pre": ["U05", "AR02"]},
    {"id": "PY02", "area": "PY", "title": "값과 표현식", "concepts": "문자열, 입력과 형 변환, 참·거짓, 비교, 흔한 문법·타입 오류", "pre": ["PY01"]},
    {"id": "PY03", "area": "PY", "title": "조건과 분기", "concepts": "if/elif/else, 논리 연산, 경계값, 조건이 달라질 때의 결과", "pre": ["PY02"]},
    {"id": "PY04", "area": "PY", "title": "반복과 목록", "concepts": "리스트·인덱스·슬라이싱, for/while/range, 누적값, 종료 조건", "pre": ["PY03"]},
    {"id": "PY05", "area": "PY", "title": "함수와 분해", "concepts": "매개변수·반환값·지역변수, 반복 작업 묶기, 작은 함수, 문제 분해", "pre": ["PY04"]},
    {"id": "PY06", "area": "PY", "title": "자료를 담는 방법", "concepts": "딕셔너리·집합·튜플, 변경 가능성, 참조와 복사, 컨테이너 선택", "pre": ["PY04"]},
    {"id": "PY07", "area": "PY", "title": "파일과 자료 교환", "concepts": "텍스트·CSV·JSON 읽기/쓰기, 인코딩, 경로, 데이터 형태 확인, with와 파일 정리", "pre": ["PY05", "PY06", "U02"]},
    {"id": "PY08", "area": "PY", "title": "디버깅과 검증", "concepts": "오류 재현·traceback·assert, try/except·오류 전달, 입력 검증·경계값", "pre": ["PY05"]},
    {"id": "PY09", "area": "PY", "title": "패키지와 환경", "concepts": "import, 가상환경, 의존성·버전, 실행 명령, 재현 가능한 환경", "pre": ["PY08", "U05"]},
    {"id": "PY10", "area": "PY", "title": "수치 배열", "concepts": "NumPy 배열·shape·dtype·인덱싱, 원소별 연산, broadcasting, 난수", "pre": ["PY06", "AR10"]},
    {"id": "PY11", "area": "PY", "title": "표와 시각화 코드", "concepts": "pandas 선택·필터·집계·결합, matplotlib 축·범례·오차 막대의 기초", "pre": ["PY07", "PY10", "DA02"]},
    {"id": "PY12", "area": "PY", "title": "코드가 커질 때", "concepts": "객체·클래스 기초, 반복자·생성기, 모듈 분리, 읽기 쉬운 코드와 간단한 타입 표기", "pre": ["PY09"]},
    {"id": "DA01", "area": "DA", "title": "질문을 데이터로 바꾸기", "concepts": "관측·측정·변수·행·열, 한 행의 단위, 분석 목적과 수집 맥락", "pre": ["U03"]},
    {"id": "DA02", "area": "DA", "title": "데이터의 종류", "concepts": "수치·범주·순서·시간, 정형·반정형·비정형, 결측과 0의 차이", "pre": ["DA01"]},
    {"id": "DA03", "area": "DA", "title": "표와 그림 읽기", "concepts": "도수·비율, 막대·히스토그램·산점도·선 그래프, 축·분모·표본 수", "pre": ["DA02", "AR07"]},
    {"id": "DA04", "area": "DA", "title": "중심과 분포", "concepts": "평균·중앙값·최빈값·분위수, 왜도·이상값, 중심 하나의 한계", "pre": ["DA03", "AR10"]},
    {"id": "DA05", "area": "DA", "title": "흩어진 정도", "concepts": "범위·분산·표준편차, 제곱의 이유, 표준화와 단위, z 점수", "pre": ["DA04", "AR08"]},
    {"id": "DA06", "area": "DA", "title": "데이터 품질", "concepts": "중복·누락·단위 혼동·잘못된 범주, 관측 시점, 정답 정보의 유출", "pre": ["DA02", "PY07"]},
    {"id": "DA07", "area": "DA", "title": "탐색 보고서", "concepts": "정리·집계·분포 비교·그림 선택, 발견과 추측 구분, 변환 기록", "pre": ["DA05", "DA06", "PY11"]},
    {"id": "DA08", "area": "DA", "title": "표본과 시뮬레이션", "concepts": "모집단·표본, 선택 편향, 상관과 인과의 첫 구분, 반복 추출 실험", "pre": ["DA04", "PY04"]},
    {"id": "DM01", "area": "DM", "title": "집합과 논리", "concepts": "원소·부분집합·합집합·교집합, 명제·and/or/not, 조건과 논리식", "pre": ["AL01"]},
    {"id": "DM02", "area": "DM", "title": "정확한 주장", "concepts": "모든/어떤, 필요·충분조건, 역·대우, 예와 반례, 직접증명·귀류법", "pre": ["DM01"]},
    {"id": "DM03", "area": "DM", "title": "경우의 수", "concepts": "합·곱의 법칙, 순열·조합·이항계수, 중복과 순서의 영향", "pre": ["DM01", "AR02"]},
    {"id": "DM04", "area": "DM", "title": "귀납과 재귀", "concepts": "수학적 귀납법, 재귀 정의, 점화식, 기저 조건", "pre": ["DM02", "PY05"]},
    {"id": "DM05", "area": "DM", "title": "그래프라는 표현", "concepts": "정점·간선·방향·가중치·경로·연결, 트리·사이클, 인접 표현", "pre": ["DM01"]},
    {"id": "DM06", "area": "DM", "title": "증가 속도와 불변식", "concepts": "다항·로그·지수의 성장, 알고리즘 불변식, O 표기의 수학적 뜻", "pre": ["AL07", "DM02"]},
    {"id": "CS01", "area": "CS", "title": "알고리즘의 표현", "concepts": "절차·의사코드·입출력·정확성, 추적표, 작은 입력으로 검증", "pre": ["PY05", "DM02"]},
    {"id": "CS02", "area": "CS", "title": "시간과 공간", "concepts": "시간·공간 복잡도, 입력 크기, 측정과 이론의 차이, 병목", "pre": ["CS01", "DM06"]},
    {"id": "CS03", "area": "CS", "title": "순서가 있는 자료구조", "concepts": "배열·연결리스트·스택·큐, 연산 비용, 구현과 추상 자료형", "pre": ["PY06", "CS01"]},
    {"id": "CS04", "area": "CS", "title": "해시와 검색", "concepts": "해시 함수·충돌, 딕셔너리·집합, 평균과 최악의 비용", "pre": ["CS03"]},
    {"id": "CS05", "area": "CS", "title": "재귀와 트리", "concepts": "호출 스택, 트리 순회·이진 탐색 트리·힙, 분할 정복", "pre": ["CS03", "DM04"]},
    {"id": "CS06", "area": "CS", "title": "정렬과 이진 탐색", "concepts": "정렬 기준, 안정성, 비교 정렬의 생각, 정렬 후 검색", "pre": ["CS02", "CS05"]},
    {"id": "CS07", "area": "CS", "title": "그래프 알고리즘", "concepts": "BFS·DFS·최단경로·위상순서, 방문 기록, 자료구조 선택", "pre": ["CS03", "DM05"]},
    {"id": "CS08", "area": "CS", "title": "문제 해결 전략", "concepts": "탐욕·동적 계획법·메모이제이션, 상태 설계, 계산 가능성·NP 문제 입문", "pre": ["CS06", "CS07"]},
    {"id": "SY01", "area": "SY", "title": "정보의 표현", "concepts": "이진수·비트 연산, 정수·문자 인코딩, 이미지·소리의 데이터 표현", "pre": ["U03", "AR08"]},
    {"id": "SY02", "area": "SY", "title": "계산하는 기계", "concepts": "CPU·메모리·저장장치·명령, 캐시, 데이터가 이동하는 비용", "pre": ["SY01"]},
    {"id": "SY03", "area": "SY", "title": "프로그램이 실행될 때", "concepts": "소스·컴파일·인터프리트, 실행 파일·프로세스, 언어와 실행 환경", "pre": ["SY02", "PY05"]},
    {"id": "SY04", "area": "SY", "title": "운영체제", "concepts": "프로세스·스레드·스케줄링·시스템 호출, 자원과 격리", "pre": ["SY03"]},
    {"id": "SY05", "area": "SY", "title": "메모리와 파일", "concepts": "주소·포인터, 가상메모리, 파일시스템·버퍼, 메모리 수명; C 실습은 여기서 선택", "pre": ["SY04"]},
    {"id": "SY06", "area": "SY", "title": "터미널과 Linux", "concepts": "명령·경로·권한·환경변수·파이프·리다이렉션; 프로세스 관찰은 SY04 뒤 확장", "pre": ["U05", "PY01"]},
    {"id": "SY07", "area": "SY", "title": "Git와 재현 가능한 작업", "concepts": "변경 이력·diff·commit·branch, README·입력·결과 보관, 비밀정보 제외; 환경 기록은 PY09와 연결", "pre": ["U02", "PY01", "SY06"]},
    {"id": "SY08", "area": "SY", "title": "동시성과 성능", "concepts": "경쟁 상태·잠금·비동기·병렬, CPU/GPU 역할, 프로파일링·메모리 사용량", "pre": ["SY04", "SY05", "CS02"]},
    {"id": "NW01", "area": "NW", "title": "연결된 컴퓨터", "concepts": "클라이언트·서버·호스트·공유기·LAN·인터넷, 통신의 목적", "pre": ["U03"]},
    {"id": "NW02", "area": "NW", "title": "웹 요청 한 번", "concepts": "URL·HTTP 요청/응답·상태코드·헤더·본문, 브라우저 관찰, API의 뜻", "pre": ["NW01", "U02"]},
    {"id": "NW03", "area": "NW", "title": "패킷과 성능", "concepts": "패킷 교환·계층·캡슐화, 지연·대역폭·처리량·손실, 단위 계산", "pre": ["NW01", "AR06"]},
    {"id": "NW04", "area": "NW", "title": "이름·주소·문", "concepts": "DNS·IP 주소·포트·DHCP, 이름 해석과 주소 할당, 클라이언트와 서버의 종점", "pre": ["NW02", "NW03"]},
    {"id": "NW05", "area": "NW", "title": "IP와 길 찾기", "concepts": "IPv4/IPv6·서브넷·CIDR·NAT, 라우팅/포워딩·그래프 경로, OSPF/BGP의 역할", "pre": ["NW04", "AR08", "DM05"]},
    {"id": "NW06", "area": "NW", "title": "TCP와 UDP", "concepts": "전달 보장·순서·재전송·흐름 제어·혼잡 제어, 연결, 스트림과 메시지", "pre": ["NW03", "NW04"]},
    {"id": "NW07", "area": "NW", "title": "가까운 장치의 통신", "concepts": "Ethernet·Wi-Fi·MAC·ARP, 링크와 매체, 공유 채널", "pre": ["NW03", "NW05"]},
    {"id": "NW08", "area": "NW", "title": "안전한 웹 연결", "concepts": "HTTPS·TLS·인증서, 암호화·해시·서명·인증·인가의 역할 구분", "pre": ["NW02", "NW06"]},
    {"id": "NW09", "area": "NW", "title": "소켓 프로그래밍", "concepts": "주소와 포트로 연결, 송수신·부분 읽기·시간초과·종료, 로컬 echo 실습; OS 내부는 SY04와 연결", "pre": ["PY07", "PY08", "NW06"]},
    {"id": "NW10", "area": "NW", "title": "관찰과 문제 해결", "concepts": "DNS 조회·브라우저 관찰·HTTP 실패 구분, ping/traceroute·패킷 관찰·지연/손실; 소켓 로그·큐는 NW09 뒤 확장", "pre": ["NW04", "NW06", "DA04"]},
    {"id": "DB01", "area": "DB", "title": "관계형 데이터", "concepts": "표·행·열·스키마·키, 식별자, 관계의 의미", "pre": ["DA02"]},
    {"id": "DB02", "area": "DB", "title": "SQL 기초", "concepts": "SELECT·WHERE·ORDER BY·GROUP BY·집계, 행과 그룹 구분; 앱에서 쓸 때 매개변수 바인딩", "pre": ["DB01", "DA04"]},
    {"id": "DB03", "area": "DB", "title": "여러 표 연결", "concepts": "JOIN·일대다·다대다, 행 수 변화, NULL, 서브쿼리·윈도 함수 입문", "pre": ["DB02", "DM01"]},
    {"id": "DB04", "area": "DB", "title": "일관된 데이터", "concepts": "제약조건·정규화·트랜잭션·ACID, 중복·갱신 이상", "pre": ["DB03"]},
    {"id": "DB05", "area": "DB", "title": "데이터베이스 내부", "concepts": "인덱스·B-tree·실행 계획, 스캔과 검색, 저장·쿼리 비용", "pre": ["DB04", "CS06"]},
    {"id": "DB06", "area": "DB", "title": "외부 데이터 받기", "concepts": "API·JSON·페이지 구조, 요청·응답·인증 정보 관리, 키를 코드·로그에 남기지 않기, 출처·이용 조건", "pre": ["PY07", "PY08", "NW02", "U06"]},
    {"id": "DB07", "area": "DB", "title": "데이터 파이프라인", "concepts": "수집·변환·적재, 배치·스트리밍, 검증·스키마 변화·계보·재실행", "pre": ["DB04", "DB06", "SY07"]},
    {"id": "DB08", "area": "DB", "title": "분산 데이터 입문", "concepts": "복제·분할·일관성·가용성, 장애·재시도·중복, 메시지 큐·CAP의 전제", "pre": ["DB05", "NW06", "SY08"]},
    {"id": "LA01", "area": "LA", "title": "벡터와 차원", "concepts": "스칼라·벡터·성분·좌표, 행/열, 데이터의 특징 수, 벡터 덧셈·스칼라곱", "pre": ["AL03", "AR10"]},
    {"id": "LA02", "area": "LA", "title": "내적과 거리", "concepts": "가중합·내적·노름·거리·직교·사영의 그림, 코사인 유사도는 삼각함수와 연결", "pre": ["LA01", "AL05"]},
    {"id": "LA03", "area": "LA", "title": "행렬의 뜻", "concepts": "행·열·shape, 선형변환, 표와 변환의 다른 관점, 항등행렬", "pre": ["LA01", "AL02"]},
    {"id": "LA04", "area": "LA", "title": "행렬 계산", "concepts": "곱·전치·차원 확인, 곱의 순서, 합성, 행렬과 벡터의 연산", "pre": ["LA03", "AR10"]},
    {"id": "LA05", "area": "LA", "title": "연립식 풀기", "concepts": "가우스 소거·해의 유무·역행렬, rank의 첫 의미, 역행렬 계산과 선형계 풀이 구분", "pre": ["LA04", "AL02"]},
    {"id": "LA06", "area": "LA", "title": "공간과 기저", "concepts": "선형결합·생성공간·독립·기저·차원·영공간, 직교기저·QR·최소제곱", "pre": ["LA05", "LA02"]},
    {"id": "LA07", "area": "LA", "title": "변환의 고유한 방향", "concepts": "행렬식의 의미, 고유값·고유벡터·대각화, 대칭·양의 준정부호", "pre": ["LA06"]},
    {"id": "LA08", "area": "LA", "title": "행렬분해와 근사", "concepts": "SVD·유사역행렬·저랭크 근사, 정보 압축, PCA는 공분산을 배운 뒤 연결", "pre": ["LA07"]},
    {"id": "CA01", "area": "CA", "title": "극한과 연속", "concepts": "수열의 접근, 평균변화율, 극한의 직관, 연속과 불연속", "pre": ["AL04", "AL05", "AL09"]},
    {"id": "CA02", "area": "CA", "title": "미분의 뜻", "concepts": "차분몫·미분계수·도함수·접선, 변화율의 단위, 증가·감소·극값", "pre": ["CA01", "AL06"]},
    {"id": "CA03", "area": "CA", "title": "미분 계산과 연쇄법칙", "concepts": "다항·지수·로그의 미분, 합·곱·몫·합성함수, 작은 계산그래프", "pre": ["CA02", "AL07"]},
    {"id": "CA04", "area": "CA", "title": "여러 변수의 변화", "concepts": "편미분·기울기·방향미분, 다변수 연쇄법칙, Jacobian의 모양", "pre": ["CA03", "LA04"]},
    {"id": "CA05", "area": "CA", "title": "적분과 누적", "concepts": "면적·부호 있는 누적·정적분·부정적분·기본정리, 간단한 치환·수치합", "pre": ["CA03", "AR10"]},
    {"id": "CA06", "area": "CA", "title": "적분의 확장", "concepts": "부분적분·이상적분·다중적분, 변수변환과 적분 범위, 연속확률과 연결", "pre": ["CA05", "CA04"]},
    {"id": "CA07", "area": "CA", "title": "근사와 곡률", "concepts": "Taylor 근사·이계도함수·Hessian, 국소와 전역, 근사오차", "pre": ["CA04", "LA04"]},
    {"id": "CA08", "area": "CA", "title": "시간에 따라 변하는 시스템", "concepts": "차분·미분방정식 입문, 초기조건·고정점·안정성, Euler 수치해", "pre": ["CA03", "AL09"]},
    {"id": "PR01", "area": "PR", "title": "확률의 언어", "concepts": "표본공간·사건·여사건·합사건, 확률과 관측 빈도", "pre": ["DM01", "AR04"]},
    {"id": "PR02", "area": "PR", "title": "조건이 붙는 확률", "concepts": "조건부확률, 확률나무·분할표, 곱셈법칙, 분모가 바뀌는 이유", "pre": ["PR01", "AR07"]},
    {"id": "PR03", "area": "PR", "title": "독립과 베이즈", "concepts": "독립·배반의 차이, 기저율·Bayes 규칙, 증거에 따른 갱신", "pre": ["PR02"]},
    {"id": "PR04", "area": "PR", "title": "확률변수와 평균", "concepts": "이산 확률변수·확률질량·누적분포, 기댓값·분산, 평균 보상", "pre": ["PR01", "AR10", "DA05"]},
    {"id": "PR05", "area": "PR", "title": "이산분포", "concepts": "Bernoulli·이항·기하·Poisson, 시도·성공·대기·횟수의 차이", "pre": ["PR04", "DM03"]},
    {"id": "PR06", "area": "PR", "title": "연속분포", "concepts": "확률밀도·누적확률·분위수, 균등·정규·지수분포, 면적과 높이 구분", "pre": ["PR04", "CA05"]},
    {"id": "PR07", "area": "PR", "title": "함께 변하는 양", "concepts": "결합·주변·조건부분포, 공분산·상관·공분산 행렬, 독립과 무상관", "pre": ["PR03", "PR04", "LA02"]},
    {"id": "PR08", "area": "PR", "title": "반복 시행과 극한", "concepts": "난수·시드·경험분포, 대수의 법칙·중심극한정리, 표본평균의 분포", "pre": ["PR04", "PR06", "PY10"]},
    {"id": "PR09", "area": "PR", "title": "조건부 평균", "concepts": "조건부기댓값·전기댓값·전분산, 확률변수 변환, 작은 표에서의 계산", "pre": ["PR07", "PR03"]},
    {"id": "PR10", "area": "PR", "title": "마르코프 연쇄", "concepts": "상태·전이·전이행렬, 여러 단계 이동, 정상분포의 조건과 의미", "pre": ["PR07", "LA04"]},
    {"id": "ST01", "area": "ST", "title": "무엇을 추정하는가", "concepts": "모집단·표본·관측 단위, 표집·측정 편향·의존성, 기술과 추론", "pre": ["DA08", "PR04"]},
    {"id": "ST02", "area": "ST", "title": "모수와 추정", "concepts": "모수·통계량·추정량·우도·최대우도, 편향·변동, 모형 가정", "pre": ["ST01", "PR05", "AL07"]},
    {"id": "ST03", "area": "ST", "title": "불확실성을 나타내기", "concepts": "표집분포·표준오차·신뢰구간, bootstrap·포괄률, 원자료 산포와 구분", "pre": ["ST02", "PR08", "PY10"]},
    {"id": "ST04", "area": "ST", "title": "가설검정", "concepts": "귀무·대립가설·검정통계량·p값, 1종/2종 오류·검정력·표본 수", "pre": ["ST03"]},
    {"id": "ST05", "area": "ST", "title": "기본 검정 선택", "concepts": "평균·비율·짝지은 비교, t·카이제곱·F·분산분석, 가정·효과크기", "pre": ["ST04", "PR06"]},
    {"id": "ST06", "area": "ST", "title": "여러 번 비교하기", "concepts": "다중검정·FDR·선택 편향·사후 가설, 유의성과 실질적 중요성", "pre": ["ST04"]},
    {"id": "ST07", "area": "ST", "title": "회귀와 진단", "concepts": "단순·다중회귀·상호작용·잔차, 계수 해석·모형 가정·외삽", "pre": ["ST02", "LA05"]},
    {"id": "ST08", "area": "ST", "title": "실험의 설계", "concepts": "무작위배정·대조군·짝짓기·블록, 교란·통제변수, 인과효과의 첫 구분", "pre": ["ST01", "ST04"]},
    {"id": "ST09", "area": "ST", "title": "베이즈 통계", "concepts": "사전·우도·사후·사후예측, 신용구간, 빈도주의 구간과의 차이", "pre": ["PR03", "ST02"]},
    {"id": "ST10", "area": "ST", "title": "시간·반복 자료", "concepts": "자기상관·정상성·추세·계절성, 반복 측정, 시간순 평가·재표집", "pre": ["ST07", "PR07"]},
    {"id": "OP01", "area": "OP", "title": "컴퓨터 계산의 오차", "concepts": "부동소수점·반올림·상쇄·overflow/underflow, 수치 안정성·오차 확인", "pre": ["SY01", "AR09"]},
    {"id": "OP02", "area": "OP", "title": "안정적으로 계산하기", "concepts": "조건수·선형계 수치해·수치미분·기울기 검산, 정확도와 비용", "pre": ["OP01", "LA05", "CA03"]},
    {"id": "OP03", "area": "OP", "title": "손실과 경사하강", "concepts": "목적함수·변수·제약, min/argmin, 기울기 방향·학습률·반복·종료", "pre": ["AL05", "CA04", "PY10"]},
    {"id": "OP04", "area": "OP", "title": "확률적 최적화", "concepts": "SGD·미니배치·모멘텀·Adam, 표본 기울기의 변동·보폭", "pre": ["OP03", "PR04"]},
    {"id": "OP05", "area": "OP", "title": "볼록·제약 최적화", "concepts": "볼록집합·볼록함수, 전역성, Lagrange·KKT·쌍대성은 선택 심화", "pre": ["OP03", "CA07", "LA07"]},
    {"id": "OP06", "area": "OP", "title": "정규화", "concepts": "L1/L2·벌점과 제약·규모·희소성, MAP 해석은 베이즈 통계 뒤", "pre": ["OP03", "LA02"]},
    {"id": "OP07", "area": "OP", "title": "정보량", "concepts": "자기정보량·entropy·cross-entropy·KL, 압축·예측 손실; 상호정보량은 PR07 뒤 연결", "pre": ["PR03", "PR04", "AL07"]},
    {"id": "OP08", "area": "OP", "title": "표본으로 계산하기", "concepts": "Monte Carlo·중요도추출; 베이즈 MCMC는 ST09, 변분추론·ELBO는 ST09·OP03 뒤 확장", "pre": ["PR09", "PY10", "OP01", "OP07"]},
    {"id": "AI01", "area": "AI", "title": "AI의 전체 지도", "concepts": "규칙과 학습, 예측·추론·계획·생성·행동, AI/ML/DL/RL의 관계", "pre": ["U01", "U03"]},
    {"id": "AI02", "area": "AI", "title": "탐색", "concepts": "상태·목표·상태공간, BFS·균일비용·휴리스틱·A*, 완전성·최적성", "pre": ["CS07"]},
    {"id": "AI03", "area": "AI", "title": "제약·논리·계획", "concepts": "제약충족·백트래킹, 지식표현·명제/술어 논리, 행동과 계획", "pre": ["AI02", "DM02"]},
    {"id": "AI04", "area": "AI", "title": "게임과 의사결정", "concepts": "minimax·alpha–beta·expectimax, 게임 트리, MCTS의 입구", "pre": ["AI02", "PR04"]},
    {"id": "AI05", "area": "AI", "title": "불확실한 추론", "concepts": "Bayes network·조건부독립·확률적 추론, 숨은 상태와 HMM", "pre": ["PR09", "DM05", "LA04"]},
    {"id": "AI06", "area": "AI", "title": "합리적 선택", "concepts": "효용·기대효용·정보 가치·순차 의사결정, 관측과 상태의 차이", "pre": ["AI05", "PR04"]},
    {"id": "ML01", "area": "ML", "title": "학습 문제 정의", "concepts": "특성·목표·표본, 지도/비지도/자기지도, 회귀·분류, 학습과 추론", "pre": ["DA02", "AI01"]},
    {"id": "ML02", "area": "ML", "title": "공정한 첫 비교", "concepts": "평균·다수결 기준 모델, train/validation/test, 그룹·시간 분할, 데이터 누출", "pre": ["ML01", "DA06", "PY11"]},
    {"id": "ML03", "area": "ML", "title": "오차와 평가", "concepts": "손실과 지표, MAE/MSE/RMSE, 혼동행렬·정밀도·재현율·F1·ROC/PR, 불균형·임계값", "pre": ["ML02", "AR10"]},
    {"id": "ML04", "area": "ML", "title": "선형 회귀의 원리", "concepts": "잔차·최소제곱·설계행렬, NumPy 구현, 경사하강과 선형계 방식", "pre": ["ML03", "LA05", "OP03"]},
    {"id": "ML05", "area": "ML", "title": "확률로 분류하기", "concepts": "logistic regression·sigmoid·softmax·cross-entropy, 확률과 경계", "pre": ["ML04", "OP07"]},
    {"id": "ML06", "area": "ML", "title": "거리와 나무", "concepts": "k-NN·거리·스케일, 결정나무·불순도·깊이·pruning", "pre": ["ML03", "LA02"]},
    {"id": "ML07", "area": "ML", "title": "여러 모델 합치기", "concepts": "bagging·random forest·boosting, 표본과 순차적 보완", "pre": ["ML06"]},
    {"id": "ML08", "area": "ML", "title": "전처리와 특징", "concepts": "결측·범주 인코딩·표준화·특성 변환·pipeline, 훈련자료에서만 적합", "pre": ["ML02", "PY11"]},
    {"id": "ML09", "area": "ML", "title": "비지도 학습", "concepts": "k-means·계층·밀도 군집, PCA·설명분산·SVD, 이상탐지와 시각화 한계", "pre": ["ML08", "LA08", "PR07"]},
    {"id": "ML10", "area": "ML", "title": "일반화와 모델 선택", "concepts": "과대/과소적합·bias–variance·정규화·교차검증·튜닝·학습 곡선", "pre": ["ML03", "ML08", "ST03"]},
    {"id": "ML11", "area": "ML", "title": "신뢰성과 실패 분석", "concepts": "확률 보정·불확실성·분포 변화·강건성·공정성·특성 중요도의 한계", "pre": ["ML10", "ST04"]},
    {"id": "ML12", "area": "ML", "title": "모델 계열의 확장", "concepts": "Naive Bayes·생성/판별, SVM·kernel, 혼합모형·EM·밀도추정; 각각 별도 장으로 확장", "pre": ["ML05", "LA06", "PR09"]},
    {"id": "DL01", "area": "DL", "title": "작은 신경망", "concepts": "tensor·axis·batch·dtype, 선형층·활성함수·MLP·함수 합성, 입출력 모양", "pre": ["PY10", "LA04", "ML05"]},
    {"id": "DL02", "area": "DL", "title": "신경망의 학습 원리", "concepts": "계산그래프·연쇄법칙·역전파·autograd, 매개변수와 입력의 미분", "pre": ["DL01", "CA04", "OP03"]},
    {"id": "DL03", "area": "DL", "title": "학습 코드", "concepts": "PyTorch·학습루프·데이터 로더·평가모드·저장/복원, Sequential부터 시작; 클래스 기반 모델은 PY12 연결", "pre": ["DL02", "PY09", "ML02"]},
    {"id": "DL04", "area": "DL", "title": "학습을 안정시키기", "concepts": "초기화·SGD/Adam·정규화·dropout·normalization·residual, 기울기 소실/폭주", "pre": ["DL03", "OP04", "ML10"]},
    {"id": "DL05", "area": "DL", "title": "영상과 합성곱", "concepts": "filter·channel·stride·padding·pooling·CNN, 작은 영상의 계산", "pre": ["DL03", "AL04"]},
    {"id": "DL06", "area": "DL", "title": "순서와 기억", "concepts": "RNN·LSTM·GRU·BPTT, 시간 의존·긴 문맥, 순서 정보", "pre": ["DL03", "DL02", "AL09"]},
    {"id": "DL07", "area": "DL", "title": "표현과 attention", "concepts": "embedding·내적 유사도·Q/K/V·softmax·mask, 가중합과 차원", "pre": ["DL03", "LA04", "OP07"]},
    {"id": "DL08", "area": "DL", "title": "Transformer", "concepts": "위치 정보·잔차·정규화·attention 블록, 토큰·자기회귀·학습목표", "pre": ["DL07", "DL04"]},
    {"id": "DL09", "area": "DL", "title": "생성모형", "concepts": "autoencoder·VAE·GAN·diffusion 개관, 분포·잠재변수·학습목표; VAE 유도는 ST09·OP08 뒤 연결", "pre": ["DL04", "PR06", "OP07"]},
    {"id": "DL10", "area": "DL", "title": "전이와 자기지도", "concepts": "사전학습·미세조정·대조학습·표현 평가, 데이터 규모·추론 효율; Transformer 예제는 DL08, 신뢰성은 ML11 연결", "pre": ["DL04", "ML10"]},
    {"id": "RL01", "area": "RL", "title": "행동으로 배우기", "concepts": "에이전트·환경·관측·상태·행동·보상·정책, 경험의 순서", "pre": ["AI01", "PY04"]},
    {"id": "RL02", "area": "RL", "title": "밴딧과 탐험", "concepts": "표본/증분 평균·탐험/활용·ε-greedy, UCB·regret는 로그와 불확실성 뒤", "pre": ["RL01", "PR04", "PY10"]},
    {"id": "RL03", "area": "RL", "title": "장기적인 보상", "concepts": "return·discount·horizon·episode, 즉시 보상과 누적 보상, 종료와 중단", "pre": ["RL01", "PR04", "AL09"]},
    {"id": "RL04", "area": "RL", "title": "MDP와 가치", "concepts": "Markov 성질·전이·정책, V/Q·Bellman 기대/최적 관계, 상태와 관측", "pre": ["RL03", "PR09"]},
    {"id": "RL05", "area": "RL", "title": "모형을 알 때 계획", "concepts": "동적 계획법·정책평가·정책개선·가치반복, 수렴의 조건", "pre": ["RL04", "LA04"]},
    {"id": "RL06", "area": "RL", "title": "경험으로 가치 추정", "concepts": "Monte Carlo 예측·제어, 표본평균·에피소드·반환값의 분산", "pre": ["RL04", "PR04", "PY10"]},
    {"id": "RL07", "area": "RL", "title": "한 단계씩 배우기", "concepts": "TD error·bootstrap, SARSA·Q-learning, on/off-policy, 탐험 정책", "pre": ["RL05", "RL06", "RL02"]},
    {"id": "RL08", "area": "RL", "title": "시간 간격 연결", "concepts": "n-step·eligibility trace·λ, 편향과 분산, 보상 전달의 시간 범위", "pre": ["RL07"]},
    {"id": "RL09", "area": "RL", "title": "함수근사와 DQN", "concepts": "선형 가치근사→신경망, replay·target network·Double DQN, deadly triad", "pre": ["RL07", "DL03", "ML04"]},
    {"id": "RL10", "area": "RL", "title": "정책을 직접 개선", "concepts": "확률적 정책·정책경사·REINFORCE·baseline, 작은 표 정책의 미분", "pre": ["RL06", "PR09", "CA04", "OP03"]},
    {"id": "RL11", "area": "RL", "title": "Actor–Critic", "concepts": "가치와 정책의 역할, advantage·GAE·PPO, 연속행동·TD3/SAC는 선택 심화", "pre": ["RL10", "RL09", "OP07"]},
    {"id": "RL12", "area": "RL", "title": "RL 실험 평가", "concepts": "환경·버전·seed, 학습/평가 분리, 반복·구간추정·상호작용 예산, 보상 설계와 실패", "pre": ["RL07", "ST03", "ML02"]},
    {"id": "RS01", "area": "RS", "title": "연구 가능한 질문", "concepts": "질문·가설·조작적 정의·가정·측정·반례, 범위를 작은 비교로 줄이기", "pre": ["U01", "DA01"]},
    {"id": "RS02", "area": "RS", "title": "자료와 선행연구", "concepts": "검색어·원문·인용·관련연구·정정, 기술 영어·기호 사전, 출처 기록", "pre": ["U06", "RS01"]},
    {"id": "RS03", "area": "RS", "title": "논문 읽기", "concepts": "문제·기여·방법·그림·근거·한계, 여러 번 읽기, 모르는 선수개념 역추적", "pre": ["RS02", "DA03"]},
    {"id": "RS04", "area": "RS", "title": "재현 가능한 실험", "concepts": "원자료·코드·환경·버전·설정·난수·실행 기록, 작은 검산", "pre": ["SY07", "PY08", "RS01"]},
    {"id": "RS05", "area": "RS", "title": "비교의 타당성", "concepts": "baseline·통제변수·ablation·동일 예산·누출·선택 편향", "pre": ["RS04", "ML02", "ST03"]},
    {"id": "RS06", "area": "RS", "title": "결과를 표현하기", "concepts": "효과크기·불확실성·오차 막대·실패 사례, 적절한 축·단위·캡션", "pre": ["RS04", "DA03", "ST03"]},
    {"id": "RS07", "area": "RS", "title": "작은 재현", "concepts": "교재 예제→공개 결과 일부→조건 하나 변경, 재현 실패의 분류", "pre": ["RS03", "RS04", "PY11"]},
    {"id": "RS08", "area": "RS", "title": "자원과 비용", "concepts": "실행시간·CPU/GPU·메모리·프로파일링, 실험 예산·비용 기록", "pre": ["SY08", "RS04"]},
    {"id": "RS09", "area": "RS", "title": "연구 보고서", "concepts": "질문·방법·결과·해석·한계·다음 실험, 재실행 명령·인용·검토 반영", "pre": ["RS05", "RS06", "RS07"]},
    {"id": "RS10", "area": "RS", "title": "연구 윤리와 데이터", "concepts": "데이터 권리·개인정보·동의·허가, 편향·영향, 저자표시·AI 도움 공개", "pre": ["U06", "RS01"]},
    {"id": "BD01", "area": "BD", "title": "분석 기획", "concepts": "빅데이터 특징·활용, 분석 문제·계획·수집·품질·거버넌스·윤리", "pre": ["DA01", "RS10"]},
    {"id": "BD02", "area": "BD", "title": "데이터 탐색", "concepts": "정제·전처리·변수·기술통계·분포·추론, 공식 문제 표현과 연결", "pre": ["DA07", "ST05"]},
    {"id": "BD03", "area": "BD", "title": "모델링", "concepts": "회귀·분류·군집·특성·학습·모델 선택, 알고리즘 간 비교", "pre": ["ML09", "ML10"]},
    {"id": "BD04", "area": "BD", "title": "결과 해석", "concepts": "평가·검증·오류 분석·해석·시각화·보고, 지표 선택", "pre": ["ML11", "RS06"]},
    {"id": "BD05", "area": "BD", "title": "분석 실무 연습", "concepts": "Python 데이터 처리·통계·모델링·출력 형식·시간 제한 과제", "pre": ["PY11", "ST07", "ML08"]},
    {"id": "SP01", "area": "SP", "title": "언어모델·검색·추천", "concepts": "토큰화·언어확률·decoding·perplexity, 검색/순위 지표·추천·RAG, 정렬·근거성·평가", "pre": ["DL08", "DL10", "ML11", "RS05"]},
    {"id": "SP02", "area": "SP", "title": "비전·멀티모달", "concepts": "분류·검출·분할·증강·표현 정렬, 영상/문자/소리의 결합", "pre": ["DL05", "DL10", "RS05"]},
    {"id": "SP03", "area": "SP", "title": "시계열 예측", "concepts": "AR 계열·상태공간·변화점·시간 분할, 예측 구간·계절성·누출", "pre": ["ST10", "ML10", "DL06"]},
    {"id": "SP04", "area": "SP", "title": "인과추론", "concepts": "DAG·교란·충돌변수·개입·반사실, 식별·효과 추정·민감도", "pre": ["ST08", "ST07", "AI05"]},
    {"id": "SP05", "area": "SP", "title": "그래프·네트워크 과학", "concepts": "중심성·군집·연결·랜덤 네트워크, 확산·링크 예측, GNN·메시지 전달", "pre": ["DM05", "LA08", "PR07", "DL03"]},
    {"id": "SP06", "area": "SP", "title": "강화학습 심화", "concepts": "offline·모방·inverse RL·계층·다중에이전트, model-based·Dyna·world model·POMDP", "pre": ["RL11", "RL12", "RS05"]},
    {"id": "SP07", "area": "SP", "title": "제어·로봇·동적 시스템", "concepts": "피드백·안정성·상태공간·Kalman filter·최적제어·계획, 제어와 RL의 관계", "pre": ["CA08", "LA07", "PR07", "RL04"]},
    {"id": "SP08", "area": "SP", "title": "신호·통신 이론", "concepts": "복소수·Fourier·FFT·합성곱·표본화·aliasing, 압축·채널·잡음", "pre": ["AL08", "CA05", "LA04", "OP07"]},
    {"id": "SP09", "area": "SP", "title": "모델 내부·해석 가능성", "concepts": "표현·probe·ablation·activation 개입·회로·희소 표현, 관측과 인과 주장 구분", "pre": ["DL08", "ST08", "RS05"]},
    {"id": "SP10", "area": "SP", "title": "연구 수학·학습이론", "concepts": "해석학·측도·수렴·집중부등식·PAC/VC·표본복잡도, Bayesian ML·확률과정·대기행렬", "pre": ["DM02", "PR09", "OP05", "ML10"]},
    {"id": "SP11", "area": "SP", "title": "시스템·분산·대규모 학습", "concepts": "사건 순서·합의·Raft·복구·분산 저장, MapReduce·GPU/분산 학습·꼬리 지연", "pre": ["NW10", "DB08", "SY08"]},
    {"id": "SP12", "area": "SP", "title": "보안·암호", "concepts": "위협모델·권한·웹 보안·메모리 안전·암호 프로토콜, 정수론·합동은 필요 시 확장", "pre": ["NW08", "SY05", "DM02"]},
    {"id": "SP13", "area": "SP", "title": "언어·컴파일러·계산이론", "concepts": "타입·구문·의미·자동자·계산가능성, 정적분석·형식 검증", "pre": ["CS08", "DM04", "SY03"]},
    {"id": "SP14", "area": "SP", "title": "그래픽스·사람과 컴퓨터", "concepts": "기하·변환·렌더링, HCI·인터랙션·접근성·사용성 평가·실험", "pre": ["LA04", "AL08", "ST08"]},
    {"id": "SP15", "area": "SP", "title": "다른 학문과의 연구", "concepts": "과학계산·물리·생물·신경과학·경제·복잡계 중 질문에 맞는 도메인 지식", "pre": ["RS07", "RS01"]}
  ],
  paths: [
    {"id": "start", "name": "공통 출발", "targets": ["U01", "U02", "U03", "U04", "U05", "AR01", "AR02", "AR03", "AR04", "AR05", "AR06", "AR07", "AR10", "PY01", "PY02", "PY03", "PY04", "PY05", "PY06", "PY07", "PY08", "AL01", "AL02", "AL03", "AL04", "AL05", "DA01", "DA02", "DA03", "DA04", "U06", "RS01"]},
    {"id": "analysis", "name": "데이터 분석 실습", "targets": ["PY09", "PY10", "PY11", "DA05", "DA06", "DA07", "DA08"]},
    {"id": "bd", "name": "빅분기", "targets": ["BD01", "BD02", "BD03", "BD04", "BD05"]},
    {"id": "data", "name": "데이터·통계", "targets": ["DA07", "DB02", "DA08", "ST01", "ST02", "ST03", "ST04", "ST05", "ST06", "ST07", "ST08", "ST09", "ML02", "ML10", "ML11", "RS05", "RS06", "RS07", "RS08", "RS09"]},
    {"id": "ml", "name": "머신러닝", "targets": ["ML01", "ML02", "ML03", "ML04", "ML05", "ML06", "ML07", "ML08", "ML09", "ML10", "ML11", "ML12"]},
    {"id": "dl", "name": "AI·딥러닝", "targets": ["AI01", "DL01", "DL02", "DL03", "DL04", "DL05", "DL06", "DL07", "DL08", "DL09", "DL10", "SP01", "SP02", "SP09"]},
    {"id": "rl", "name": "강화학습", "targets": ["RL01", "RL02", "RL03", "RL04", "RL05", "RL06", "RL07", "RL08", "RL09", "RL10", "RL11", "RL12", "SP06"]},
    {"id": "nw", "name": "네트워크", "targets": ["NW01", "NW02", "NW03", "NW04", "NW05", "NW06", "NW07", "NW08", "NW09", "NW10", "DB08", "SP11"]},
    {"id": "math", "name": "수학 심화", "targets": ["AR01", "AR02", "AR03", "AR04", "AR05", "AR06", "AR07", "AR08", "AR09", "AR10", "AL01", "AL02", "AL03", "AL04", "AL05", "AL06", "AL07", "AL08", "AL09", "DM01", "DM02", "DM03", "DM04", "DM05", "DM06", "LA01", "LA02", "LA03", "LA04", "LA05", "LA06", "LA07", "LA08", "CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "PR01", "PR02", "PR03", "PR04", "PR05", "PR06", "PR07", "PR08", "PR09", "PR10", "OP01", "OP02", "OP03", "OP04", "OP05", "OP06", "OP07", "OP08", "SP10"]}
  ]
};
// ---- 지도 끝

/* 장 목록을 분야별로 묶어 core.js가 쓰는 모양(BDA_SUBJECTS)으로 만든다.
   분야 안에서는 단원 순서 → 장 순서. 이전·다음 장도 이 순서를 따른다. */
(function () {
  var M = window.BDA_MAP, C = window.BDA_CHAPTERS, subjects = [];
  M.areas.forEach(function (a) {
    var notes = [];
    M.units.forEach(function (u) {
      if (u.area !== a.code) return;
      (C[u.id] || []).forEach(function (ch) {
        notes.push({ id: ch.id, title: ch.title, href: ch.href, unit: u.id });
      });
    });
    subjects.push({ code: a.code, name: a.code + " " + a.name, short: a.name, notes: notes });
  });
  window.BDA_SUBJECTS = subjects;
})();
