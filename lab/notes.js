/* 슬라이드 교재의 목록. 빅분기 노트 notes.js와 같은 모양(core.js·home.js·deck.js가 그대로 읽는다).
   과목 = 공부 순서의 단계(공부 교재 learn/의 PLAN 1~5단계: 모델 내부 해석까지 최단 경로).
   plan = 그 단계 안의 묶음. 노트 = 덱 하나(decks/sNN.html, 슬라이드 15장 안팎).
   id는 "S01"처럼 덱 번호. 공부 기록이 이 번호로 저장되므로 한번 정하면 바꾸지 않는다.
   덱 작성 기준: DECK_GUIDE.md */
window.BDA_SUBJECTS = [
  {
    code: "1", name: "1단계 · 선형회귀까지", short: "1단계 · 선형회귀까지", title: "선형회귀까지",
    plan: ["벡터와 행렬", "변화와 미분", "손실과 경사하강", "선형회귀 완성"],
    notes: [
      { id: "S01", title: "AI는 숫자를 곱해서 더한다", href: "decks/s01.html", area: 0 }
    ]
  },
  {
    code: "2", name: "2단계 · 확률로 분류하고 평가하기", short: "2단계 · 분류와 평가", title: "확률로 분류하고 평가하기",
    plan: ["확률의 언어", "분포와 기댓값", "로지스틱 회귀", "평가와 일반화"],
    notes: []
  },
  {
    code: "3", name: "3단계 · 신경망", short: "3단계 · 신경망", title: "신경망",
    plan: ["층과 활성화", "역전파", "학습을 안정시키기"],
    notes: []
  },
  {
    code: "4", name: "4단계 · Transformer", short: "4단계 · Transformer", title: "Transformer",
    plan: ["표현과 attention", "Transformer 블록"],
    notes: []
  },
  {
    code: "5", name: "5단계 · 모델 내부 들여다보기", short: "5단계 · 모델 내부", title: "모델 내부 들여다보기",
    plan: ["내부 표현", "탐침과 개입"],
    notes: []
  }
];
