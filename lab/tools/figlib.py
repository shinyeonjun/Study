"""슬라이드 덱 그림 도우미. 덱 생성 스크립트에서 import 해서 쓴다.

그림은 넓은 화면(viewBox 가로 760)과 좁은 화면(가로 390) 두 벌을 만든다.
style.css가 700px 이하에서 .fig-wide를 숨기고 .fig-narrow를 보여 준다.

    from figlib import R, T, TS, L, P, dot, grid, axes, fig
    wide = [R(20, 20, 200, 60, "f-soft"), T(120, 56, "집 1", "f-cap")]
    narrow = [...]
    html = fig("그림 내용을 글로", (760, 120, wide), (390, 160, narrow))

글자 크기(viewBox 단위): f-t 14, f-s 12.5, f-cap 14.5 굵게. 한글 한 글자 ≈ 글자 크기만큼 넓다.
"""
import html as _h

def esc(s):
    return _h.escape(str(s))

def R(x, y, w, h, c="f-box", rx=5):
    """칸. c: f-box(흰) f-soft(연한) f-over(붉은: 틀림·오류) f-none(테두리만)"""
    return f'<rect class="{c}" x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}" rx="{rx}"/>'

def T(x, y, s, c="f-t", a="middle"):
    """글자 한 줄. a: start | middle | end. c: f-t f-s f-cap"""
    return f'<text class="{c}" x="{x:g}" y="{y:g}" text-anchor="{a}">{esc(s)}</text>'

def TS(x, y, parts, c="f-t", a="middle"):
    """한 줄 안에 굵은 조각 섞기. parts = ["가격 = ", ("3", "f-b"), "×면적"]"""
    inner = "".join(esc(p) if isinstance(p, str) else f'<tspan class="{p[1]}">{esc(p[0])}</tspan>' for p in parts)
    return f'<text class="{c}" x="{x:g}" y="{y:g}" text-anchor="{a}">{inner}</text>'

def L(x1, y1, x2, y2, c="f-line", arrow=True):
    """선. c: f-line(강조) f-ink(회색) f-dash(점선). arrow=True면 끝에 화살촉"""
    m = ' marker-end="url(#f-arrow)"' if arrow else ""
    return f'<line class="{c}" x1="{x1:g}" y1="{y1:g}" x2="{x2:g}" y2="{y2:g}"{m}/>'

def P(d, c="f-line", arrow=False):
    """path. d는 SVG 경로 문자열(M… L… Q… H… V…)"""
    m = ' marker-end="url(#f-arrow)"' if arrow else ""
    return f'<path class="{c}" d="{d}"{m}/>'

def dot(x, y, r=4, c="f-fill"):
    return f'<circle class="{c}" cx="{x:g}" cy="{y:g}" r="{r}"/>'

def grid(x0, y0, cw, ch, rows, cols, vals, soft=(), over=(), gap=4, row_dx=10):
    """숫자 표. rows/cols = 줄·칸 이름(빈 문자열이면 생략). soft/over = 강조할 (i, j) 칸 목록.
    soft에 ("row", i)나 ("col", j)를 넣으면 줄·칸 전체."""
    def hit(sel, i, j):
        return any(s == (i, j) or s == ("row", i) or s == ("col", j) for s in sel)
    o = []
    for j, c in enumerate(cols):
        if c:
            o.append(T(x0 + j * (cw + gap) + cw / 2, y0 - 10, c, "f-s"))
    for i, row in enumerate(vals):
        y = y0 + i * (ch + gap)
        if i < len(rows) and rows[i]:
            o.append(T(x0 - row_dx, y + ch / 2 + 5, rows[i], "f-s", "end"))
        for j, v in enumerate(row):
            x = x0 + j * (cw + gap)
            cls = "f-over" if hit(over, i, j) else "f-soft" if hit(soft, i, j) else "f-box"
            o += [R(x, y, cw, ch, cls), T(x + cw / 2, y + ch / 2 + 5, v, "f-cap")]
    return o

def axes(ox, oy, ux, uy, xmin, xmax, ymin, ymax, xticks=(), yticks=(), xlabel="", ylabel="", fmt=str):
    """좌표축. (ox, oy) = 값 (0, 0)이 놓일 화면 위치, ux·uy = 한 단위의 화면 길이.
    반환: (그림 조각 목록, 좌표 변환 함수 xy(a, b) -> (x, y))"""
    def xy(a, b):
        return ox + a * ux, oy - b * uy
    o = []
    x1, _ = xy(xmin, 0); x2, _ = xy(xmax, 0)
    _, y1 = xy(0, ymin); _, y2 = xy(0, ymax)
    o.append(L(x1, oy, x2 + 10, oy, "f-ink", False))
    o.append(L(ox, y1, ox, y2 - 10, "f-ink", False))
    for t in xticks:
        x, _ = xy(t, 0)
        o += [L(x, oy, x, oy + 4, "f-ink", False), T(x, oy + 18, fmt(t), "f-s")]
    for t in yticks:
        _, y = xy(0, t)
        o += [L(ox - 4, y, ox, y, "f-ink", False), T(ox - 8, y + 4, fmt(t), "f-s", "end")]
    if xlabel:
        o.append(T(x2 + 14, oy + 4, xlabel, "f-s", "start"))
    if ylabel:
        o.append(T(ox, y2 - 16, ylabel, "f-s"))
    return o, xy

def curve(xy, f, a, b, n=80, c="f-line"):
    """함수 f를 a..b에서 꺾은선으로. xy는 axes가 준 변환 함수"""
    pts = []
    for k in range(n + 1):
        t = a + (b - a) * k / n
        x, y = xy(t, f(t))
        pts.append(f"{x:.1f} {y:.1f}")
    return P("M" + " L".join(pts), c)

def _svg(w, h, label, body, kind):
    return (f'<svg class="fig-svg fig-{kind}" viewBox="0 0 {w} {h}" role="img" aria-label="{esc(label)}">'
            + "".join(body) + "</svg>")

def fig(label, wide, narrow=None):
    """wide/narrow = (가로, 세로, 조각 목록). narrow를 안 주면 한 벌만(좁은 화면에서도 같은 그림)."""
    if narrow is None:
        w, h, body = wide
        return (f'<figure class="fig"><svg class="fig-svg" viewBox="0 0 {w} {h}" role="img" aria-label="{esc(label)}">'
                + "".join(body) + "</svg></figure>")
    return f'<figure class="fig">{_svg(wide[0], wide[1], label, wide[2], "wide")}{_svg(narrow[0], narrow[1], label, narrow[2], "narrow")}</figure>'

HEAD = '''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} · 슬라이드 교재</title>
<script>try{{var t=localStorage.getItem("bda-theme");if(t)document.documentElement.setAttribute("data-theme",t)}}catch(e){{}}</script>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%238a4b14'/%3E%3Cpath d='M10 8l12 8-12 8z' fill='%23fff'/%3E%3C/svg%3E">
<link rel="stylesheet" href="../style.css">
</head>
<body class="deck-body" data-note="{id}">
<header class="top"><div class="top-in wide">
<a class="brand" href="../index.html">슬라이드 교재</a>
<span class="crumb">덱 {no}</span>
<button class="tool theme-btn" type="button">어둡게</button>
</div></header>
<svg class="fig-defs" width="0" height="0" aria-hidden="true"><defs><marker id="f-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="f-fill" d="M0 0L10 5L0 10z"/></marker></defs></svg>
<main class="deck">

'''
TAIL = '''

</main>
<script src="../notes.js"></script>
<script src="../js/core.js"></script>
<script src="../js/deck.js"></script>
</body>
</html>
'''

def page(deck_id, no, title, slides):
    """덱 HTML 전체. slides = <section> 문자열 목록"""
    return HEAD.format(title=esc(title), id=deck_id, no=no) + "\n\n".join(slides) + TAIL

def check(q):
    return f'<section class="slide check-slide">\n<h2>잠깐, 직접</h2>\n<div class="check" data-q="{q}"></div>\n</section>'
