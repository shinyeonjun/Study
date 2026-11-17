/* 노트 목록. 새 노트를 만들면 해당 과목 notes에 한 줄만 추가한다.
   홈 목차, 진행 표시, 노트의 과목 이름, 이전·다음 링크가 모두 이 목록에서 만들어진다.

   과목
     code  : 번호 대신 표시할 구분(실기). 필기는 목차 순서의 번호를 쓴다.
     name  : 과목 전체 이름 (복습 화면 등)
     short : 노트 위쪽에 보이는 짧은 이름
     title : 홈 지도 카드의 제목
     desc  : 홈 지도 카드의 한 줄 설명
     plan  : 시험 출제 기준의 큰 항목. 홈 지도에서 이 칸 아래에 장이 놓인다. 바뀔 수 있으니 공식 공지로 확인.
   노트
     id    : 공부 기록이 저장되는 번호. 노트의 <body data-note="...">와 같아야 하고, 한번 정하면 바꾸지 않는다.
     title : 장 제목
     href  : bigdata/ 폴더 기준 경로
     area  : plan의 몇 번째 칸에 속하는지 (0부터) */
window.BDA_SUBJECTS = [
  {
    name: "1과목 · 빅데이터 분석 기획", short: "1과목 · 분석 기획", title: "빅데이터 분석 기획",
    desc: "빅데이터가 무엇이고, 분석을 어떻게 계획하고, 데이터를 어떻게 모으고 저장하는지",
    plan: ["빅데이터의 이해", "데이터 분석 계획", "데이터 수집 및 저장 계획"],
    notes: [
      { id: "1-01", title: "빅데이터란 무엇인가", href: "notes/1-planning/01-빅데이터란.html", area: 0 },
      { id: "1-02", title: "빅데이터의 가치와 활용에서 생기는 위험", href: "notes/1-planning/02-빅데이터의-가치와-활용.html", area: 0 },
      { id: "1-03", title: "분석 과제의 목표·성공 기준·우선순위 정하기", href: "notes/1-planning/03-분석-과제-정의와-우선순위.html", area: 1 },
      { id: "1-04", title: "CRISP-DM과 분석 방법론의 단계 구분하기", href: "notes/1-planning/04-분석-방법론.html", area: 1 },
      { id: "1-05", title: "분석 프로젝트의 작업·일정·위험 계획하기", href: "notes/1-planning/05-분석-프로젝트-일정과-위험.html", area: 1 },
      { id: "1-06", title: "데이터를 수집하고 시간·중복 기준 정하기", href: "notes/1-planning/06-데이터-수집과-시간기준.html", area: 2 },
      { id: "1-07", title: "저장소 역할을 나누고 용량과 조회 범위 계산하기", href: "notes/1-planning/07-저장소-선택과-용량.html", area: 2 },
      { id: "1-08", title: "데이터 품질·거버넌스·개인정보를 관리하기", href: "notes/1-planning/08-데이터-품질과-거버넌스.html", area: 2 }
    ]
  },
  {
    name: "2과목 · 빅데이터 탐색", short: "2과목 · 탐색", title: "빅데이터 탐색",
    desc: "데이터를 다듬고, 살펴보고, 통계로 요약하는 법",
    plan: ["데이터 전처리", "데이터 탐색", "통계기법 이해"],
    notes: [
      { id: "2-01", title: "결측·중복·형식 오류를 구별해 정제하기", href: "notes/2-exploration/01-누락·중복·형식-문제-점검.html", area: 0 },
      { id: "2-02", title: "이상치 후보를 찾아 확인하고 입력을 변환하기", href: "notes/2-exploration/02-이상치와-값의-변환.html", area: 0 },
      { id: "2-03", title: "특성을 선택·추출하고 불균형을 다루기", href: "notes/2-exploration/03-특징-선택과-불균형.html", area: 0 },
      { id: "2-04", title: "평균·중앙값·분산과 분포 그림을 함께 읽기", href: "notes/2-exploration/04-기술통계와-분포-그림.html", area: 1 },
      { id: "2-05", title: "집단 구성까지 살피는 탐색적 데이터 분석", href: "notes/2-exploration/05-집단별-탐색과-시각화.html", area: 1 },
      { id: "2-06", title: "이항·포아송·정규분포를 고르고 평균의 산포 읽기", href: "notes/2-exploration/06-확률분포와-표본평균.html", area: 2 },
      { id: "2-07", title: "신뢰구간과 p값이 답하는 질문 구별하기", href: "notes/2-exploration/07-추정과-가설검정.html", area: 2 },
      { id: "2-08", title: "관측의 종류와 짝을 보고 검정 고르기", href: "notes/2-exploration/08-검정-선택과-분할표.html", area: 2 }
    ]
  },
  {
    name: "3과목 · 빅데이터 모델링", short: "3과목 · 모델링", title: "빅데이터 모델링",
    desc: "분석 모형을 고르고 설계해서 데이터에 적용하는 법",
    plan: ["분석모형 설계", "분석기법 적용"],
    notes: [
      { id: "3-01", title: "분석 목적에서 모형 종류와 기준선 정하기", href: "notes/3-modeling/01-모형-설계와-기준선.html", area: 0 },
      { id: "3-02", title: "검증 자료를 나누고 비용에 맞춰 임계값 고르기", href: "notes/3-modeling/02-검증-분할과-판정-기준.html", area: 0 },
      { id: "3-03", title: "선형회귀식 만들기와 잔차 읽기", href: "notes/3-modeling/03-선형회귀와-잔차.html", area: 1 },
      { id: "3-04", title: "로지스틱 회귀와 여러 분류기 비교하기", href: "notes/3-modeling/04-로지스틱-회귀와-분류기.html", area: 1 },
      { id: "3-05", title: "앙상블과 신경망이 예측을 만드는 방식", href: "notes/3-modeling/05-앙상블과-신경망.html", area: 1 },
      { id: "3-06", title: "군집으로 묶고 주성분으로 요약하기", href: "notes/3-modeling/06-군집화와-주성분분석.html", area: 1 },
      { id: "3-07", title: "거래에서 연관 규칙과 향상도 구하기", href: "notes/3-modeling/07-연관규칙과-향상도.html", area: 1 },
      { id: "3-08", title: "시계열의 순서를 지켜 미래를 예측하기", href: "notes/3-modeling/08-시계열과-예측.html", area: 1 },
      { id: "3-09", title: "문장을 특징으로, 관계를 그래프로 표현하기", href: "notes/3-modeling/09-텍스트와-그래프-분석.html", area: 1 },
      { id: "3-10", title: "범주형 교차표와 순위·부호 검정", href: "notes/3-modeling/10-범주형-검정과-순위.html", area: 1 },
      { id: "3-11", title: "베이지안 갱신과 다변량 분석 기법 고르기", href: "notes/3-modeling/11-베이지안과-다변량-기법.html", area: 1 }
    ]
  },
  {
    name: "4과목 · 빅데이터 결과 해석", short: "4과목 · 결과 해석", title: "빅데이터 결과 해석",
    desc: "모형을 평가하고, 결과를 해석하고, 보여 주는 법",
    plan: ["분석모형 평가 및 개선", "분석결과 해석 및 활용"],
    notes: [
      { id: "4-01", title: "혼동행렬에서 어떤 오류를 줄일지 결정하기", href: "notes/4-interpretation/01-혼동행렬과-분류지표.html", area: 0 },
      { id: "4-02", title: "ROC·PR 곡선과 확률의 오차 읽기", href: "notes/4-interpretation/02-roc-pr-곡선과-확률평가.html", area: 0 },
      { id: "4-03", title: "회귀 예측의 오차와 결정계수 계산하기", href: "notes/4-interpretation/03-회귀평가와-결정계수.html", area: 0 },
      { id: "4-04", title: "잔차 진단과 모수·적합도 검정을 구분하기", href: "notes/4-interpretation/04-잔차-진단과-모형-검정.html", area: 0 },
      { id: "4-05", title: "교차검증 오차로 과적합을 진단하고 모형 개선하기", href: "notes/4-interpretation/05-과적합-진단과-모형-개선.html", area: 0 },
      { id: "4-06", title: "모형의 예측 근거와 특징 중요도 해석하기", href: "notes/4-interpretation/06-예측-해석과-특징-중요도.html", area: 1 },
      { id: "4-07", title: "효과 크기·불확실성을 그림과 보고서에 담기", href: "notes/4-interpretation/07-결과-시각화와-보고.html", area: 1 },
      { id: "4-08", title: "모형 배포 뒤에 자료와 성능을 감시하기", href: "notes/4-interpretation/08-모형-전개와-운영-모니터링.html", area: 1 }
    ]
  },
  {
    code: "실기", name: "실기 · 빅데이터 분석 실무", short: "실기 · 분석 실무",
    title: "빅데이터 분석 실무",
    desc: "표를 가공하고 모형을 평가해 답안과 예측 파일을 제출하는 연습",
    plan: ["시험 환경과 답안 형식", "제1유형 · 데이터 가공", "제2유형 · 모형과 예측 파일", "제3유형 · 통계 분석", "세 유형 통합 연습"],
    notes: [
      { id: "5-01", title: "문제를 풀기 전에 제출할 답을 확인한다", href: "notes/practical/01-체험-환경과-답안-형식.html", area: 0 },
      { id: "5-02", title: "필터와 결측 대체를 순서대로 적용한다", href: "notes/practical/02-가공과-그룹-집계.html", area: 1 },
      { id: "5-03", title: "양성 확률을 만들어 평가 행 순서로 제출한다", href: "notes/practical/03-분류-확률-예측과-CSV.html", area: 2 },
      { id: "5-04", title: "시간을 지켜 회귀 검증을 하고 예측 CSV를 만든다", href: "notes/practical/04-회귀-검증과-예측-CSV.html", area: 2 },
      { id: "5-05", title: "분산비, 합동분산, 양측 p값을 차례로 구한다", href: "notes/practical/05-합동분산과-독립표본-t-검정.html", area: 3 },
      { id: "5-06", title: "기울기와 결정계수, p값이 답하는 질문을 나눈다", href: "notes/practical/06-회귀계수와-검정-해석.html", area: 3 },
      { id: "5-07", title: "계산 결과, 예측 파일, 검정 답안을 한 번씩 완성한다", href: "notes/practical/07-세-유형-통합-실전-연습.html", area: 4 }
    ]
  }
];
