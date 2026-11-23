"""움직이는 AI 화면 검사: python viz/tools/shot.py act [softmax …] [--out 폴더] [--wait 초]
(저장소 루트에서, 로컬 서버 127.0.0.1:8765 필요)

- 1280px·390px로 열어 몇 초 움직이게 둔 뒤 화면을 찍는다(<out>/<id>-1280.png, <id>-390.png).
- 콘솔 오류, SVG 글자끼리 겹침·글자가 viewBox 밖으로 나감, 가로로 넘치는 페이지(body 너비)를 알린다.
문제 없으면 'OK'만 찍는다. 화면 사진은 Read 도구로 열어 눈으로 본다."""
import sys, os, argparse
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8765/viz/p/"

TEXTS = r"""() => {
  const out=[];
  document.querySelectorAll('.viz svg').forEach((svg,fi)=>{
    if (getComputedStyle(svg).display==='none') return;
    const vb=svg.viewBox.baseVal;
    const bs=[...svg.querySelectorAll('text')].filter(t=>t.textContent.trim() && getComputedStyle(t).display!=='none' && +getComputedStyle(t).opacity>0.05)
      .map(t=>{try{const b=t.getBBox();return {t:t.textContent.trim().slice(0,30),x1:b.x,y1:b.y,x2:b.x+b.width,y2:b.y+b.height}}catch(e){return null}}).filter(Boolean);
    bs.forEach(b=>{ if(vb.width && (b.x1<vb.x-2||b.y1<vb.y-2||b.x2>vb.x+vb.width+2||b.y2>vb.y+vb.height+2)) out.push(`그림 ${fi+1}: 밖으로 나감 「${b.t}」`);});
    for(let i=0;i<bs.length;i++)for(let j=i+1;j<bs.length;j++){const a=bs[i],c=bs[j];
      const ox=Math.min(a.x2,c.x2)-Math.max(a.x1,c.x1), oy=Math.min(a.y2,c.y2)-Math.max(a.y1,c.y1);
      if(ox>3&&oy>3) out.push(`그림 ${fi+1}: 겹침 「${a.t}」「${c.t}」`);}
  });
  if (document.documentElement.scrollWidth > window.innerWidth + 2) out.push('페이지가 가로로 넘침: '+document.documentElement.scrollWidth+'px');
  return out;
}"""

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ids", nargs="+")
    ap.add_argument("--out", default=os.path.join(os.environ.get("TEMP", "."), "vizshots"))
    ap.add_argument("--wait", type=float, default=2.5)
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    bad = 0
    with sync_playwright() as p:
        br = p.chromium.launch()
        for pid in a.ids:
            probs = []
            for w, h in ((1280, 860), (390, 844)):
                pg = br.new_page(viewport={"width": w, "height": h})
                errs = []
                pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
                pg.on("pageerror", lambda e: errs.append(str(e)))
                pg.goto(BASE + pid + ".html", wait_until="networkidle")
                pg.wait_for_timeout(int(a.wait * 1000))
                probs += [f"{w}px: {x}" for x in pg.evaluate(TEXTS)]
                probs += [f"{w}px 콘솔 오류: {e}" for e in errs]
                path = os.path.join(a.out, f"{pid}-{w}.png")
                pg.screenshot(path=path, full_page=True)
                pg.close()
            print(f"== {pid}: " + ("OK" if not probs else ""))
            for x in dict.fromkeys(probs):
                print("  - " + x)
            print(f"   사진: {os.path.join(a.out, pid)}-1280.png, -390.png")
            bad += len(probs)
        br.close()
    return bad

if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(1 if main() else 0)
