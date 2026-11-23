/* 움직이는 AI · 화면 목록. id는 주소·순서에 쓰므로 한번 정하면 바꾸지 않는다.
   group = 목차의 묶음, kw = 목차 카드의 낱말, deck = 이어 볼 슬라이드 덱 번호들, ready = 확인을 마치고 올린 화면 */
window.VIZ_GROUPS = ["부품", "학습", "합성곱 신경망", "순환 신경망", "Transformer", "더 크게"];
window.VIZ_PAGES = [
  { id: "act",       group: 0, title: "활성함수",            kw: "ReLU · Sigmoid · Tanh · GELU · SiLU", href: "p/act.html",       deck: [17], ready: true },
  { id: "softmax",   group: 0, title: "Softmax와 온도",      kw: "점수 → 확률 · 온도",                href: "p/softmax.html",   deck: [15, 20] },
  { id: "neuron",    group: 0, title: "뉴런 하나",           kw: "곱해서 더하기 · 경계선",            href: "p/neuron.html",    deck: [1, 15] },
  { id: "mlp",       group: 1, title: "신경망이 배우는 모습", kw: "층 · 경계가 휘어짐 · 실시간 학습",  href: "p/mlp.html",       deck: [17, 19] },
  { id: "backprop",  group: 1, title: "역전파",              kw: "값은 앞으로 · 기울기는 뒤로",       href: "p/backprop.html",  deck: [18] },
  { id: "optim",     group: 1, title: "경사하강과 옵티마이저", kw: "SGD · 모멘텀 · Adam · 학습률",      href: "p/optim.html",     deck: [6, 19] },
  { id: "conv",      group: 2, title: "합성곱",              kw: "필터가 미끄러지며 곱해서 더하기",   href: "p/conv.html",      deck: [] },
  { id: "cnn",       group: 2, title: "CNN 전체",            kw: "합성곱 → ReLU → 풀링 → 분류",       href: "p/cnn.html",       deck: [] },
  { id: "rnn",       group: 3, title: "RNN",                 kw: "기억을 다음 칸으로 · 사라지는 기울기", href: "p/rnn.html",     deck: [] },
  { id: "lstm",      group: 3, title: "LSTM",                kw: "잊기 · 넣기 · 내보내기 게이트",     href: "p/lstm.html",      deck: [] },
  { id: "embed",     group: 4, title: "임베딩 공간",          kw: "단어 = 점 · 내적 = 가까움",         href: "p/embed.html",     deck: [20] },
  { id: "posenc",    group: 4, title: "위치 인코딩",          kw: "빠른 바늘 · 느린 바늘",             href: "p/posenc.html",    deck: [21] },
  { id: "attention", group: 4, title: "Self-Attention",      kw: "Q · K · V · 점수 · 마스크 · 섞기",  href: "p/attention.html", deck: [20] },
  { id: "multihead", group: 4, title: "Multi-Head",          kw: "머리마다 다른 곳을 본다",           href: "p/multihead.html", deck: [20, 21] },
  { id: "transformer", group: 4, title: "Transformer 전체",  kw: "블록 · 잔차 · Add & Norm · FFN",   href: "p/transformer.html", deck: [21] },
  { id: "generate",  group: 4, title: "한 토큰씩 생성",       kw: "다음 토큰 · 온도 · top-k",          href: "p/generate.html",  deck: [21] },
  { id: "norm",      group: 5, title: "정규화와 Dropout",     kw: "LayerNorm · BatchNorm · 끄기",     href: "p/norm.html",      deck: [19, 21] },
  { id: "moe",       group: 5, title: "Mixture of Experts",  kw: "라우터 · 전문가 · 쏠림",            href: "p/moe.html",       deck: [] }
];
