/* S19 · 확인 문제 */
(window.BDA_QUIZ = window.BDA_QUIZ || {})["S19"] = [
  {
    "id": "q1",
    "type": "mc",
    "q": "PyTorch에서 앞 배치의 경사를 비우고 싶다. 어느 단계인가?",
    "answer": 2,
    "options": [
      {
        "t": "model.eval()",
        "why": "평가 모드로 바꾼다."
      },
      {
        "t": "loss.backward()",
        "why": "새 경사를 계산해 누적한다."
      },
      {
        "t": "optimizer.zero_grad()",
        "why": "이전 경사를 비운다."
      },
      {
        "t": "optimizer.step()",
        "why": "누적 경사를 사용해 가중치를 갱신한다."
      }
    ]
  },
  {
    "id": "q2",
    "type": "mc",
    "q": "eval()과 no_grad()의 관계는?",
    "answer": 1,
    "options": [
      {
        "t": "둘 다 언제나 똑같다",
        "why": "모델의 모드와 미분 추적은 별개다."
      },
      {
        "t": "eval은 층 동작, no_grad는 경사 추적",
        "why": "평가에서 보통 둘 다 사용한다."
      },
      {
        "t": "eval을 하면 가중치 파일이 저장된다",
        "why": "가중치 저장은 별도 호출이다."
      },
      {
        "t": "no_grad가 Dropout 모드를 수정한다",
        "why": "그 모드는 모델의 train/eval이 정한다."
      }
    ]
  },
  {
    "id": "q3",
    "type": "num",
    "q": "w=1.5에서 경사가 −2.5, 학습률 0.1로 SGD 한 번. 새 w는?",
    "answer": 1.75,
    "a": "1.5−0.1(−2.5)=1.75."
  }
];
