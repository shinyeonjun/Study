/* 슬라이드 교재의 목록. 빅분기 노트 notes.js와 같은 모양(core.js·home.js·deck.js가 그대로 읽는다).
   과목 = AI 기초부터 강화학습으로 이어지는 공부 순서의 단계.
   plan = 그 단계 안의 묶음. 노트 = 덱 하나(decks/sNN.html, 슬라이드 15장 안팎).
   id는 "S01"처럼 덱 번호. 공부 기록이 이 번호로 저장되므로 한번 정하면 바꾸지 않는다.
   덱 작성 기준: DECK_GUIDE.md */
window.BDA_SUBJECTS = [
  {
    code: "1", name: "1단계 · 선형회귀까지", short: "1단계 · 선형회귀까지", title: "선형회귀까지",
    plan: ["벡터와 행렬", "변화와 미분", "손실과 경사하강", "선형회귀 완성"],
    notes: [
      { id: "S01", title: "AI는 숫자를 곱해서 더한다", href: "decks/s01.html", area: 0 },
      { id: "S02", title: "행렬 = 숫자를 바꾸는 기계", href: "decks/s02.html", area: 0 },
      { id: "S03", title: "곱을 합으로", href: "decks/s03.html", area: 1 },
      { id: "S04", title: "변화를 재다", href: "decks/s04.html", area: 1 },
      { id: "S05", title: "여러 변수와 기울기 벡터", href: "decks/s05.html", area: 1 },
      { id: "S06", title: "틀린 만큼 고친다: 손실과 경사하강", href: "decks/s06.html", area: 2 },
      { id: "S07", title: "학습 문제를 세우는 법", href: "decks/s07.html", area: 2 },
      { id: "S08", title: "선형회귀 완성", href: "decks/s08.html", area: 3 },
      { id: "S09", title: "자료를 표와 배열로", href: "decks/s09.html", area: 3 }
    ]
  },
  {
    code: "2", name: "2단계 · 확률로 분류하고 평가하기", short: "2단계 · 분류와 평가", title: "확률로 분류하고 평가하기",
    plan: ["확률의 언어", "분포와 기댓값", "로지스틱 회귀", "평가와 일반화"],
    notes: [
      { id: "S10", title: "자료를 요약하다", href: "decks/s10.html", area: 0 },
      { id: "S11", title: "확률의 언어", href: "decks/s11.html", area: 0 },
      { id: "S12", title: "독립과 베이즈", href: "decks/s12.html", area: 0 },
      { id: "S13", title: "확률변수·기댓값·분포", href: "decks/s13.html", area: 1 },
      { id: "S14", title: "많이 반복하면: 추정과 불확실성", href: "decks/s14.html", area: 1 },
      { id: "S15", title: "확률로 분류하다", href: "decks/s15.html", area: 2 },
      { id: "S16", title: "잘 맞는다는 것", href: "decks/s16.html", area: 3 }
    ]
  },
  {
    code: "3", name: "3단계 · 신경망", short: "3단계 · 신경망", title: "신경망",
    plan: ["층과 활성화", "역전파", "학습을 안정시키기"],
    notes: [
      { id: "S17", title: "작은 신경망", href: "decks/s17.html", area: 0 },
      { id: "S18", title: "역전파", href: "decks/s18.html", area: 1 },
      { id: "S19", title: "학습 코드와 안정화", href: "decks/s19.html", area: 2 }
    ]
  },
  {
    code: "4", name: "4단계 · Transformer", short: "4단계 · Transformer", title: "Transformer",
    plan: ["표현과 attention", "Transformer 블록"],
    notes: [
      { id: "S20", title: "무엇을 볼지 고르다", href: "decks/s20.html", area: 0 },
      { id: "S21", title: "Transformer = 블록을 쌓아 다음 토큰 맞히기", href: "decks/s21.html", area: 1 }
    ]
  },
  {
    code: "5", name: "5단계 · 모델 내부 들여다보기", short: "5단계 · 모델 내부", title: "모델 내부 들여다보기",
    plan: ["실험 설계", "내부 표현과 개입"],
    notes: [
      { id: "S22", title: "실험을 믿을 수 있게", href: "decks/s22.html", area: 0 },
      { id: "S23", title: "모델 안을 들여다보다", href: "decks/s23.html", area: 1 }
    ]
  },
  {
    code: "6", name: "6단계 · 강화학습", short: "6단계 · 강화학습", title: "강화학습",
    plan: ["확률에서 MDP까지", "벨만식으로 가치 계산", "경험에서 Q러닝"],
    notes: [
      { id: "S24", title: "강화학습 첫걸음 · 확률에서 MDP까지", href: "decks/s24.html", area: 0 },
      { id: "S25", title: "벨만식 · 오늘의 보상과 다음 상태의 가치", href: "decks/s25.html", area: 1 },
      { id: "S26", title: "Q러닝 · 한 번의 경험으로 표 고치기", href: "decks/s26.html", area: 2 }
    ]
  }
];
