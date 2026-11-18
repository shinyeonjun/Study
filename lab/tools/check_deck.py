"""덱 자동 검사: python lab/tools/check_deck.py s03 [s04 …]  (저장소 루트에서, 로컬 서버 127.0.0.1:8765 필요)

- 슬라이드마다 그림(넓은·좁은 두 벌 모두) 글자 겹침, 그림 밖으로 나감
- 1280px과 390px 화면에서 슬라이드 내용이 화면 아래로 넘치는지(넘치면 스크롤해야 보임)
- 덱의 data-q가 모두 문제 파일에 있는지, 문제 파일 형식(보기 why, 정답 범위)
- 콘솔 오류
문제 없으면 'OK'만 찍는다."""
import sys
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8765/lab/decks/"

FIGS = r"""() => {
  const slides=[...document.querySelectorAll('.slide')]; const out=[];
  slides.forEach((s,si)=>{ slides.forEach(x=>x.classList.toggle('on',x===s));
    s.querySelectorAll('svg.fig-svg').forEach(svg=>{ const keep=svg.style.display; svg.style.display='block';
      const vb=svg.viewBox.baseVal;
      const bs=[...svg.querySelectorAll('text')].map(t=>{const b=t.getBBox();return {t:t.textContent.trim(),x1:b.x,y1:b.y,x2:b.x+b.width,y2:b.y+b.height}}).filter(b=>b.t);
      const kind=svg.classList.contains('fig-narrow')?'좁은':'넓은';
      bs.forEach(b=>{ if(b.x1<vb.x-1||b.y1<vb.y-1||b.x2>vb.x+vb.width+1||b.y2>vb.y+vb.height+1) out.push(`장 ${si+1} ${kind} 그림: 밖으로 나감 「${b.t}」`);});
      for(let i=0;i<bs.length;i++)for(let j=i+1;j<bs.length;j++){const a=bs[i],c=bs[j];
        const ox=Math.min(a.x2,c.x2)-Math.max(a.x1,c.x1), oy=Math.min(a.y2,c.y2)-Math.max(a.y1,c.y1);
        if(ox>3&&oy>3) out.push(`장 ${si+1} ${kind} 그림: 겹침 「${a.t}」「${c.t}」`);}
      svg.style.display=keep; });
  });
  return out;
}"""

OVERFLOW = r"""() => {
  const slides=[...document.querySelectorAll('.slide')]; const out=[];
  slides.forEach((s,si)=>{ slides.forEach(x=>x.classList.toggle('on',x===s));
    if (s.scrollHeight > s.clientHeight + 4 && !s.querySelector('pre, table')) out.push(si+1+'(넘침)');  // 코드·표 장은 스크롤 허용
    s.querySelectorAll('svg.fig-svg').forEach(svg=>{ if(getComputedStyle(svg).display==='none') return;
      const r=svg.getBoundingClientRect(), vb=svg.viewBox.baseVal, want=r.width*vb.height/vb.width;
      if (r.height < want*0.9 || r.width < 300) out.push(si+1+'(그림 눌림 '+Math.round(r.width)+'×'+Math.round(r.height)+')'); }); });
  return out;
}"""

QUIZ = r"""(id) => {
  const out=[]; const qs=(window.BDA_QUIZ||{})[id]||[]; const ids=qs.map(q=>q.id);
  [...document.querySelectorAll('.check[data-q]')].forEach(b=>{ if(!ids.includes(b.dataset.q)) out.push('문제 없음: '+b.dataset.q); });
  qs.forEach(q=>{
    if(q.type==='mc'){ if(!(q.options&&q.options.length===4)) out.push(q.id+': 보기 4개 아님');
      else { if(!(q.answer>=0&&q.answer<q.options.length)) out.push(q.id+': 정답 범위 밖');
        q.options.forEach((o,k)=>{ if(!o.why) out.push(q.id+': 보기 '+k+' why 없음'); if(/^정답/.test(o.why||'')) out.push(q.id+': why가 정답으로 시작'); }); } }
    else if(q.type==='num'){ if(typeof q.answer!=='number') out.push(q.id+': 숫자 답 아님'); if(!q.a) out.push(q.id+': 풀이 a 없음'); }
  });
  return {n:qs.length, out};
}"""

def run(names):
    bad = 0
    with sync_playwright() as p:
        br = p.chromium.launch()
        for name in names:
            name = name.lower().removesuffix(".html")
            did = name.upper()
            probs = []
            for w, h in ((1280, 800), (390, 760)):
                pg = br.new_page(viewport={"width": w, "height": h})
                errs = []
                pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
                pg.on("pageerror", lambda e: errs.append(str(e)))
                pg.goto(BASE + name + ".html", wait_until="networkidle")
                pg.wait_for_timeout(300)
                if w == 1280:
                    probs += pg.evaluate(FIGS)
                    q = pg.evaluate(QUIZ, did)
                    probs += q["out"]
                    if not 3 <= q["n"] <= 6:
                        probs.append(f"문제 수 {q['n']} (3~5 권장)")
                    n = pg.evaluate("document.querySelectorAll('.slide').length")
                    if not 12 <= n <= 20:
                        probs.append(f"슬라이드 {n}장 (12~18 권장)")
                ov = pg.evaluate(OVERFLOW)
                if ov:
                    probs.append(f"{w}px 화면: {ov}")
                probs += [f"{w}px 콘솔 오류: {e}" for e in errs]
                pg.close()
            print(f"== {name}: " + ("OK" if not probs else ""))
            for x in probs:
                print("  - " + x)
            bad += len(probs)
        br.close()
    return bad

if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(1 if run(sys.argv[1:]) else 0)
