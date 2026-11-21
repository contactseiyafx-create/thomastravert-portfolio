"""Generates the Sweet Dreams 3-screen presentation as a single HTML file."""
import random

random.seed(7)

# ---------- primitives ----------

def sparkle(cx, cy, r, fill, op=1.0):
    k = r * 0.18
    return (f'<path d="M{cx} {cy-r} Q{cx+k} {cy-k} {cx+r} {cy} Q{cx+k} {cy+k} {cx} {cy+r} '
            f'Q{cx-k} {cy+k} {cx-r} {cy} Q{cx-k} {cy-k} {cx} {cy-r}Z" fill="{fill}" opacity="{op}"/>')


def dots(n, x0, x1, y0, y1, rmin, rmax, fill, omin=0.35, omax=0.95):
    out = []
    for _ in range(n):
        out.append(f'<circle cx="{random.uniform(x0,x1):.1f}" cy="{random.uniform(y0,y1):.1f}" '
                   f'r="{random.uniform(rmin,rmax):.2f}" fill="{fill}" opacity="{random.uniform(omin,omax):.2f}"/>')
    return "".join(out)


def cloud(x, y, s, fill, op):
    return (f'<g opacity="{op}" fill="{fill}">'
            f'<circle cx="{x}" cy="{y}" r="{18*s}"/>'
            f'<circle cx="{x+22*s}" cy="{y-12*s}" r="{25*s}"/>'
            f'<circle cx="{x+50*s}" cy="{y-4*s}" r="{20*s}"/>'
            f'<circle cx="{x+70*s}" cy="{y+4*s}" r="{14*s}"/>'
            f'<rect x="{x}" y="{y}" width="{70*s}" height="{18*s}" rx="{9*s}"/></g>')


def crescent(cx, cy, R, fill, k=0.72):
    return (f'<path d="M{cx} {cy-R} A{R} {R} 0 1 0 {cx} {cy+R} '
            f'A{R*k:.1f} {R} 0 1 1 {cx} {cy-R}Z" fill="{fill}"/>')


def glow(p, gid, color):
    return (f'<radialGradient id="{p}{gid}"><stop offset="0" stop-color="{color}" stop-opacity=".85"/>'
            f'<stop offset=".35" stop-color="{color}" stop-opacity=".28"/>'
            f'<stop offset="1" stop-color="{color}" stop-opacity="0"/></radialGradient>')


def firefly(p, x, y, r=3):
    return (f'<circle cx="{x}" cy="{y}" r="{r*5}" fill="url(#{p}ff)"/>'
            f'<circle cx="{x}" cy="{y}" r="{r*0.7}" fill="#FFF6C9"/>')


# ---------- original creature "Nubi" ----------

def creature(p, mode="awake"):
    """Rounded plush 'Nubi' with cloud-puff ears and a moon sprout. mode: awake | sleep"""
    defs = (f'<linearGradient id="{p}body" x1="0" y1="0" x2="0" y2="1">'
            f'<stop offset="0" stop-color="#C9D1FF"/><stop offset=".55" stop-color="#A7B2F6"/>'
            f'<stop offset="1" stop-color="#8590E2"/></linearGradient>'
            f'<radialGradient id="{p}sheen" cx=".35" cy=".25" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".55"/>'
            f'<stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>')
    sleep = mode == "sleep"
    sprout = ('<path d="M0 -78 C -4 -92 -22 -98 -34 -92" stroke="#7E88D8" stroke-width="5" fill="none" stroke-linecap="round"/>'
              + crescent(-38, -92, 9, "#FFEDA6", 0.6)) if sleep else \
             ('<path d="M0 -78 C 2 -94 10 -102 12 -110" stroke="#7E88D8" stroke-width="5" fill="none" stroke-linecap="round"/>'
              + '<circle cx="14" cy="-116" r="18" fill="#FFF1B8" opacity=".25"/>' + crescent(14, -116, 10, "#FFEDA6", 0.6))
    ears = "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#BAC3FB"/>' for x, y, r in
                   [(-42, -66, 17), (-58, -54, 12), (-30, -76, 10), (42, -66, 17), (58, -54, 12), (30, -76, 10)])
    body = ('<path d="M-72 34 C-80 -32 -44 -80 0 -80 C44 -80 80 -32 72 34 C68 70 34 84 0 84 C-34 84 -68 70 -72 34Z" '
            f'fill="url(#{p}body)"/>'
            f'<path d="M-72 34 C-80 -32 -44 -80 0 -80 C44 -80 80 -32 72 34 C68 70 34 84 0 84 C-34 84 -68 70 -72 34Z" fill="url(#{p}sheen)"/>')
    belly = ('<ellipse cx="0" cy="36" rx="44" ry="38" fill="#EEEBFF" opacity=".9"/>'
             + crescent(0, 34, 12, "#C8BEFA", 0.55))
    arms = ('<ellipse cx="-64" cy="30" rx="12" ry="20" fill="#97A2EE" transform="rotate(20 -64 30)"/>'
            '<ellipse cx="64" cy="30" rx="12" ry="20" fill="#97A2EE" transform="rotate(-20 64 30)"/>')
    feet = ('<ellipse cx="-32" cy="82" rx="20" ry="10" fill="#DCDDFF"/>'
            '<ellipse cx="32" cy="82" rx="20" ry="10" fill="#DCDDFF"/>')
    cheeks = ('<ellipse cx="-42" cy="-12" rx="11" ry="7" fill="#F7A8CB" opacity=".75"/>'
              '<ellipse cx="42" cy="-12" rx="11" ry="7" fill="#F7A8CB" opacity=".75"/>')
    if sleep:
        eyes = ('<path d="M-34 -28 Q-24 -20 -14 -28" stroke="#2C2A6B" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
                '<path d="M14 -28 Q24 -20 34 -28" stroke="#2C2A6B" stroke-width="3.4" fill="none" stroke-linecap="round"/>')
        mouth = '<ellipse cx="0" cy="-8" rx="4" ry="3" fill="#5B3F7E"/>'
        blanket = ('<path d="M-84 30 C-40 14 40 14 84 30 C86 60 60 92 0 94 C-60 92 -86 60 -84 30Z" fill="#6F63C9"/>'
                   '<path d="M-84 30 C-40 14 40 14 84 30" stroke="#B8AEF5" stroke-width="5" fill="none" stroke-linecap="round"/>'
                   + sparkle(-40, 56, 7, "#FFEDA6") + sparkle(22, 66, 5, "#FFEDA6") + sparkle(52, 44, 4, "#FFEDA6")
                   + '<circle cx="-10" cy="48" r="2" fill="#FFEDA6"/><circle cx="62" cy="70" r="2" fill="#FFEDA6"/>')
        return defs, (ears + body + sprout + cheeks + eyes + mouth + blanket)
    eyes = ('<ellipse cx="-24" cy="-26" rx="7" ry="8" fill="#2C2A6B"/><ellipse cx="24" cy="-26" rx="7" ry="8" fill="#2C2A6B"/>'
            '<circle cx="-21" cy="-24" r="2.2" fill="#fff"/><circle cx="27" cy="-24" r="2.2" fill="#fff"/>'
            # sleepy lids
            '<path d="M-33 -30 Q-24 -38 -15 -30 L-15 -36 L-33 -36Z" fill="#B3BCF9"/>'
            '<path d="M15 -30 Q24 -38 33 -30 L33 -36 L15 -36Z" fill="#B3BCF9"/>'
            '<path d="M-33 -29 Q-24 -34 -15 -29" stroke="#2C2A6B" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
            '<path d="M15 -29 Q24 -34 33 -29" stroke="#2C2A6B" stroke-width="2.6" fill="none" stroke-linecap="round"/>')
    mouth = '<path d="M-6 -8 Q0 -3 6 -8" stroke="#2C2A6B" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
    return defs, (ears + arms + body + belly + feet + sprout + cheeks + eyes + mouth)


def pip(p):
    """Tiny original dream companion: a glowing star-moth."""
    return (f'<circle cx="0" cy="0" r="46" fill="url(#{p}pipglow)"/>'
            '<ellipse cx="-14" cy="-6" rx="13" ry="8" fill="#D9CCFF" opacity=".85" transform="rotate(-25 -14 -6)"/>'
            '<ellipse cx="14" cy="-6" rx="13" ry="8" fill="#D9CCFF" opacity=".85" transform="rotate(25 14 -6)"/>'
            '<ellipse cx="-10" cy="6" rx="8" ry="5" fill="#C6B6FF" opacity=".8" transform="rotate(20 -10 6)"/>'
            '<ellipse cx="10" cy="6" rx="8" ry="5" fill="#C6B6FF" opacity=".8" transform="rotate(-20 10 6)"/>'
            '<circle cx="0" cy="0" r="10" fill="#FFF3C2"/>'
            '<path d="M-4.5 -1 Q-3 1 -1.5 -1" stroke="#5B4A8F" stroke-width="1.4" fill="none" stroke-linecap="round"/>'
            '<path d="M1.5 -1 Q3 1 4.5 -1" stroke="#5B4A8F" stroke-width="1.4" fill="none" stroke-linecap="round"/>'
            '<circle cx="-5" cy="3" r="1.6" fill="#F7A8CB"/><circle cx="5" cy="3" r="1.6" fill="#F7A8CB"/>'
            '<path d="M-3 -9 Q-6 -16 -9 -17 M3 -9 Q6 -16 9 -17" stroke="#FFF3C2" stroke-width="1.4" fill="none" stroke-linecap="round"/>'
            '<circle cx="-9" cy="-17" r="1.8" fill="#FFF3C2"/><circle cx="9" cy="-17" r="1.8" fill="#FFF3C2"/>')


def grain(p):
    return (f'<filter id="{p}grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>'
            f'<feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/></filter>')


def grass(x0, x1, y_fn, color):
    out = []
    x = x0
    while x < x1:
        y = y_fn(x)
        h = random.uniform(5, 10)
        out.append(f'<path d="M{x:.1f} {y:.1f} q1 {-h*0.6:.1f} {random.choice([-2,2])} {-h:.1f}" stroke="{color}" stroke-width="2" fill="none" stroke-linecap="round"/>')
        x += random.uniform(7, 13)
    return "".join(out)


def hill_y(x, cx=195, top=560, half=170):
    t = (x - cx) / half
    return top + 60 * t * t


# ---------- screens ----------

def screen1():
    p = "a"
    cdefs, cbody = creature(p, "awake")
    defs = (f'<linearGradient id="{p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E3485"/>'
            f'<stop offset=".42" stop-color="#6466C6"/><stop offset=".72" stop-color="#A493DF"/><stop offset="1" stop-color="#CDB6EE"/></linearGradient>'
            f'<linearGradient id="{p}hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E5CBC"/><stop offset="1" stop-color="#2B2B78"/></linearGradient>'
            f'<linearGradient id="{p}fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262670" stop-opacity="0"/><stop offset="1" stop-color="#1E1E60" stop-opacity=".95"/></linearGradient>'
            + glow(p, "moon", "#FFF1B8") + glow(p, "ff", "#FFF2A8") + glow(p, "warm", "#F6C8E6") + grain(p) + cdefs)
    art = (f'<rect width="390" height="844" fill="url(#{p}sky)"/>'
           f'<circle cx="200" cy="520" r="260" fill="url(#{p}warm)" opacity=".5"/>'
           + dots(70, 0, 390, 40, 470, .5, 1.5, "#FFFFFF")
           + sparkle(58, 170, 9, "#FFF6D6") + sparkle(132, 118, 6, "#FFF6D6", .8) + sparkle(352, 300, 7, "#FFF6D6", .9)
           + sparkle(40, 330, 5, "#FFF6D6", .7) + sparkle(228, 210, 5, "#FFF6D6", .8)
           + f'<circle cx="300" cy="160" r="150" fill="url(#{p}moon)"/>' + crescent(300, 160, 40, "#FFF1B8")
           + cloud(-20, 260, 1.3, "#E9E2FF", .55) + cloud(250, 360, 1.1, "#F2EBFF", .5) + cloud(120, 300, .8, "#FFFFFF", .35)
           + '<path d="M0 500 C80 455 160 470 235 500 C300 525 350 485 390 478 V844 H0Z" fill="#8A82D6"/>'
           + cloud(-30, 486, 1.4, "#E7DDFF", .55) + cloud(270, 470, 1.2, "#EDE4FF", .5)
           + '<path d="M0 560 C90 525 170 545 250 572 C320 595 360 575 390 566 V844 H0Z" fill="#6E69C8"/>'
           + f'<path d="M-10 640 C60 575 130 560 195 560 C260 560 330 575 400 640 V844 H-10Z" fill="url(#{p}hill)"/>'
           + grass(40, 355, hill_y, "#8F8CE0")
           + f'<ellipse cx="195" cy="566" rx="72" ry="10" fill="#1F1F5E" opacity=".35"/>'
           + f'<g transform="translate(195 482)">{cbody}</g>'
           + "".join(firefly(p, x, y, r) for x, y, r in [(70, 540, 3), (330, 520, 3.2), (300, 600, 2.4), (96, 610, 2.2), (260, 430, 2), (40, 450, 2.4)])
           + f'<rect y="560" width="390" height="284" fill="url(#{p}fade)"/>'
           + f'<rect width="390" height="844" filter="url(#{p}grain)" opacity=".09"/>')
    return defs, art


def screen2():
    p = "b"
    cdefs, cbody = creature(p, "awake")

    def lit(x, y, r):
        return (f'<circle cx="{x}" cy="{y}" r="{r*3.4}" fill="url(#{p}star)"/>'
                + sparkle(x, y, r * 1.25, "#FFF1B8") + f'<circle cx="{x}" cy="{y}" r="{r*0.35}" fill="#FFFFFF"/>')

    def unlit(x, y, r):
        k = r * 0.18
        return (f'<circle cx="{x}" cy="{y}" r="{r*2}" fill="#FFFFFF" opacity=".06"/>'
                f'<path d="M{x} {y-r} Q{x+k} {y-k} {x+r} {y} Q{x+k} {y+k} {x} {y+r} Q{x-k} {y+k} {x-r} {y} Q{x-k} {y-k} {x} {y-r}Z" '
                f'fill="none" stroke="#C9C6FF" stroke-width="1.6" stroke-dasharray="3 3" opacity=".8"/>')

    defs = (f'<linearGradient id="{p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F1442"/>'
            f'<stop offset=".45" stop-color="#232A78"/><stop offset=".8" stop-color="#3E3F9C"/><stop offset="1" stop-color="#5A55B0"/></linearGradient>'
            f'<linearGradient id="{p}hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B3C98"/><stop offset="1" stop-color="#171A52"/></linearGradient>'
            f'<linearGradient id="{p}trail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF1B8" stop-opacity=".9"/><stop offset="1" stop-color="#C9B6FF" stop-opacity="0"/></linearGradient>'
            + glow(p, "moon", "#FFF1B8") + glow(p, "ff", "#FFF2A8") + glow(p, "star", "#FFE9A0") + grain(p) + cdefs)
    art = (f'<rect width="390" height="844" fill="url(#{p}sky)"/>'
           + dots(110, 0, 390, 40, 520, .4, 1.4, "#FFFFFF", .25, .85)
           + cloud(230, 470, 1.2, "#8C88E0", .35) + cloud(-40, 440, 1.3, "#8C88E0", .3)
           # moon trail + target ghost
           + f'<path d="M126 240 C185 200 252 192 320 218" stroke="url(#{p}trail)" stroke-width="14" fill="none" stroke-linecap="round" opacity=".35"/>'
           + f'<path d="M126 240 C185 200 252 192 320 218" stroke="url(#{p}trail)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 9"/>'
           + sparkle(170, 214, 4, "#FFF1B8", .9) + sparkle(222, 199, 3, "#FFF1B8", .7) + sparkle(268, 200, 2.5, "#FFF1B8", .5)
           + '<circle cx="328" cy="222" r="26" fill="none" stroke="#C9C6FF" stroke-width="1.5" stroke-dasharray="4 5" opacity=".6"/>'
           + '<path d="M300 212 l8 10 l-8 10" stroke="#C9C6FF" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".7" transform="translate(-6 0)"/>'
           + f'<circle cx="96" cy="244" r="130" fill="url(#{p}moon)"/>'
           + '<circle cx="96" cy="244" r="48" fill="none" stroke="#FFF1B8" stroke-width="1.5" opacity=".5"/>'
           + '<circle cx="96" cy="244" r="58" fill="none" stroke="#FFF1B8" stroke-width="1" opacity=".22"/>'
           + crescent(96, 244, 34, "#FFF1B8")
           # stars
           + lit(60, 392, 13) + lit(334, 380, 15) + lit(236, 290, 12)
           + '<circle cx="236" cy="290" r="26" fill="none" stroke="#FFF1B8" stroke-width="1.4" opacity=".55"/>'
           + '<circle cx="236" cy="290" r="38" fill="none" stroke="#FFF1B8" stroke-width="1" opacity=".25"/>'
           + unlit(118, 340, 12) + unlit(300, 300, 11)
           + '<circle cx="118" cy="340" r="24" fill="none" stroke="#C9C6FF" stroke-width="1.2" opacity=".45"/>'
           # hills
           + '<path d="M0 520 C90 482 170 494 250 520 C320 542 360 516 390 508 V844 H0Z" fill="#2E3283"/>'
           + f'<path d="M-10 600 C60 545 130 532 195 532 C260 532 330 545 400 600 V844 H-10Z" fill="url(#{p}hill)"/>'
           + grass(40, 355, lambda x: hill_y(x, top=532), "#5B5DB8")
           + f'<ellipse cx="195" cy="536" rx="64" ry="9" fill="#0E1040" opacity=".45"/>'
           + f'<g transform="translate(195 462) scale(.88)">{cbody}</g>'
           + "".join(firefly(p, x, y, r) for x, y, r in [(54, 500, 2.6), (340, 488, 3), (300, 568, 2.2), (90, 572, 2)])
           + f'<rect width="390" height="844" filter="url(#{p}grain)" opacity=".08"/>')
    return defs, art


def screen3():
    p = "c"
    cdefs, cbody = creature(p, "sleep")
    defs = (f'<linearGradient id="{p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0C30"/>'
            f'<stop offset=".5" stop-color="#1D1B57"/><stop offset=".85" stop-color="#352C78"/><stop offset="1" stop-color="#43358A"/></linearGradient>'
            f'<linearGradient id="{p}hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A3290"/><stop offset="1" stop-color="#14123F"/></linearGradient>'
            f'<linearGradient id="{p}fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14123F" stop-opacity="0"/><stop offset="1" stop-color="#0E0C33" stop-opacity=".95"/></linearGradient>'
            f'<linearGradient id="{p}beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1B8" stop-opacity=".18"/><stop offset="1" stop-color="#FFF1B8" stop-opacity="0"/></linearGradient>'
            + glow(p, "moon", "#FFF1B8") + glow(p, "ff", "#FFF2A8") + glow(p, "pipglow", "#FFE9A0") + glow(p, "lav", "#B9A3FF") + grain(p) + cdefs)
    zs = ('<text x="262" y="392" font-family="Fredoka, Nunito, sans-serif" font-weight="600" font-size="16" fill="#D9D2FF" opacity=".55">z</text>'
          '<text x="276" y="372" font-family="Fredoka, Nunito, sans-serif" font-weight="600" font-size="21" fill="#D9D2FF" opacity=".75">z</text>'
          '<text x="294" y="346" font-family="Fredoka, Nunito, sans-serif" font-weight="600" font-size="27" fill="#EDE8FF" opacity=".95">Z</text>')
    art = (f'<rect width="390" height="844" fill="url(#{p}sky)"/>'
           + dots(130, 0, 390, 40, 540, .4, 1.4, "#FFFFFF", .25, .9)
           + f'<circle cx="300" cy="230" r="190" fill="url(#{p}moon)" opacity=".9"/>' + crescent(300, 230, 42, "#FFF1B8")
           + sparkle(70, 150, 8, "#FFF6D6") + sparkle(150, 96, 5, "#FFF6D6", .8) + sparkle(50, 300, 6, "#FFF6D6", .8) + sparkle(352, 330, 5, "#FFF6D6", .7)
           + cloud(-50, 250, 1.4, "#6C63C2", .45) + cloud(200, 320, 1.0, "#6C63C2", .4)
           + f'<circle cx="190" cy="470" r="170" fill="url(#{p}lav)" opacity=".45"/>'
           + '<path d="M0 520 C90 486 170 498 250 520 C320 540 360 516 390 510 V844 H0Z" fill="#2A246E"/>'
           + cloud(-30, 500, 1.5, "#7E74D0", .4) + cloud(268, 488, 1.3, "#7E74D0", .35)
           + f'<path d="M-10 610 C60 553 130 540 195 540 C260 540 330 553 400 610 V844 H-10Z" fill="url(#{p}hill)"/>'
           + grass(40, 355, lambda x: hill_y(x, top=540), "#5B52B6")
           + f'<ellipse cx="180" cy="546" rx="78" ry="10" fill="#0B0A30" opacity=".5"/>'
           + f'<g transform="translate(178 468) rotate(-4)">{cbody}</g>'
           + zs
           + f'<g transform="translate(300 448)">{pip(p)}</g>'
           + '<path d="M300 448 C320 470 330 500 318 520" stroke="#FFF1B8" stroke-width="1.2" fill="none" stroke-dasharray="1 6" stroke-linecap="round" opacity=".7"/>'
           + dots(40, 20, 370, 380, 600, .8, 2, "#FFEFB0", .3, .9)
           + "".join(firefly(p, x, y, r) for x, y, r in [(60, 470, 2.4), (100, 560, 2), (340, 560, 2.4), (236, 410, 1.8)])
           + f'<rect y="580" width="390" height="264" fill="url(#{p}fade)"/>'
           + f'<rect width="390" height="844" filter="url(#{p}grain)" opacity=".08"/>')
    return defs, art


# ---------- UI chrome ----------

STATUS = ('<div class="status"><span>9:41</span><span class="sicons">'
          '<svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="#fff"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="#fff"/><rect x="10" y="3" width="3" height="9" rx="1" fill="#fff"/><rect x="15" y="0" width="3" height="12" rx="1" fill="#fff"/></svg>'
          '<svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 11.5 L5.6 8.9 a3.4 3.4 0 0 1 4.8 0Z M2.9 6.3 a7.3 7.3 0 0 1 10.2 0 l-1.5 1.5 a5.2 5.2 0 0 0 -7.2 0Z M0.2 3.6 a11.2 11.2 0 0 1 15.6 0 l-1.4 1.4 a9.2 9.2 0 0 0 -12.8 0Z" fill="#fff"/></svg>'
          '<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="#fff" opacity=".5"/><rect x="2.5" y="2.5" width="19" height="8" rx="2" fill="#fff"/><rect x="25" y="4.5" width="1.6" height="4" rx=".8" fill="#fff" opacity=".5"/></svg>'
          '</span></div>')

SOUND = ('<div class="iconbtn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
         '<path d="M11 5 6 9H3v6h3l5 4V5z" fill="#fff"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg></div>')
BACK = ('<div class="iconbtn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></div>')
LOGO = ('<div class="logo"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M14 2a10 10 0 1 0 8 15A8 8 0 0 1 14 2z" fill="#FFEDA6"/></svg>Sweet Dreams</div>')
HOME = '<div class="home"></div>'


def steps(active):
    return '<div class="steps">' + "".join(
        f'<span class="{"on" if i == active else ("done" if i < active else "")}"></span>' for i in range(3)) + '</div>'


def phone(art, ui):
    d, a = art
    return (f'<div class="phone"><svg class="art" width="390" height="844" viewBox="0 0 390 844"><defs>{d}</defs>{a}</svg>'
            f'{STATUS}{HOME}{ui}</div>')


ui1 = (f'<div class="topbar">{LOGO}{SOUND}</div>'
       f'<div class="block" style="top:610px">{steps(0)}'
       '<h1>Let’s Dream Together</h1><p class="sub">A little magic before bedtime</p></div>'
       '<div class="cta cta-moon" style="top:722px">Let’s Begin'
       '<span class="ctaicon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2A6B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>'
       '<div class="caption" style="top:796px">Best with sound on · 2 min experience</div>')

seg = "".join(f'<span class="{"lit" if i < 3 else ""}"></span>' for i in range(5))
ui2 = (f'<div class="topbar">{BACK}<div class="steplabel">Step 2 of 3</div>{SOUND}</div>'
       '<div class="glass progress" style="top:108px">'
       '<div class="prow"><div class="ptitle"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2 Q13.5 10.5 22 12 Q13.5 13.5 12 22 Q10.5 13.5 2 12 Q10.5 10.5 12 2Z" fill="#FFEDA6"/></svg>Night peace</div>'
       '<div class="pcount"><b>3</b> / 5 stars</div></div>'
       f'<div class="segs">{seg}</div></div>'
       '<div class="chip" style="left:44px;top:300px">Drag</div>'
       '<div class="chip" style="left:94px;top:364px">Tap</div>'
       '<div class="glass panel" style="top:600px">'
       '<h2>Make the Night Peaceful</h2><p class="sub">Tap the stars and move the moon</p>'
       '<div class="hints">'
       '<div class="hint"><span class="hicon"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2 Q13.5 10.5 22 12 Q13.5 13.5 12 22 Q10.5 13.5 2 12 Q10.5 10.5 12 2Z" fill="#FFEDA6"/></svg></span><span><b>Tap</b> 2 stars</span></div>'
       '<div class="hint"><span class="hicon"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M14 2a10 10 0 1 0 8 15A8 8 0 0 1 14 2z" fill="#FFEDA6"/></svg></span><span><b>Drag</b> the moon</span></div>'
       '</div>'
       f'<div class="panelfoot">{steps(1)}<div class="ring"><svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="4"/>'
       '<circle cx="22" cy="22" r="19" fill="none" stroke="#FFE7A0" stroke-width="4" stroke-linecap="round" stroke-dasharray="71.6 119.4" transform="rotate(-90 22 22)"/></svg><span>60%</span></div></div>'
       '</div>')

ui3 = (f'<div class="topbar">{LOGO}{SOUND}</div>'
       '<div class="badge" style="top:108px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2C2A6B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Night complete · 5/5 stars</div>'
       '<div class="pipname" style="left:268px;top:478px">Meet Pip ✦</div>'
       f'<div class="block" style="top:610px">{steps(2)}'
       '<h1 class="big">Sweet Dreams!</h1><p class="sub">Your magical night is complete</p></div>'
       '<div class="cta cta-lav" style="top:722px">Discover More'
       '<span class="ctaicon light"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>'
       '<div class="caption" style="top:796px"><u>Replay the night</u> &nbsp;·&nbsp; Share with a friend</div>')

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
body{background:#080A24;font-family:'Nunito',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.canvas{position:relative;width:1560px;height:1260px;overflow:hidden;
 background:radial-gradient(900px 600px at 20% 0%,#25286E 0%,rgba(37,40,110,0) 70%),radial-gradient(800px 700px at 100% 100%,#2D2266 0%,rgba(45,34,102,0) 70%),#0A0C2C}
.head{position:absolute;left:130px;top:72px;right:130px;display:flex;justify-content:space-between;align-items:flex-end}
.kicker{font:700 13px/1 'Nunito';letter-spacing:.22em;text-transform:uppercase;color:#A9A6F2}
.title{font:600 54px/1.05 'Fredoka';color:#fff;margin-top:14px;letter-spacing:-.01em}
.title em{font-style:normal;color:#FFE7A0}
.desc{font:500 16px/1.5 'Nunito';color:#B9B6E8;margin-top:10px;max-width:520px}
.system{display:flex;gap:28px;align-items:flex-end}
.swatches{display:flex;gap:10px}
.sw{width:52px}
.sw i{display:block;width:52px;height:44px;border-radius:14px;border:1px solid rgba(255,255,255,.12)}
.sw b{display:block;font:700 9.5px/1.2 'Nunito';color:#C9C6F2;margin-top:8px;text-align:center}
.type{padding-left:28px;border-left:1px solid rgba(255,255,255,.12)}
.type .aa{font:600 40px/1 'Fredoka';color:#fff}
.type .tl{font:600 11px/1.5 'Nunito';color:#C9C6F2;margin-top:8px}
.row{position:absolute;left:130px;top:300px;display:flex;gap:65px}
.col{width:390px}
.label{display:flex;align-items:center;gap:10px;margin-bottom:18px;font:700 13px/1 'Nunito';color:#fff;letter-spacing:.04em}
.label .num{font:600 12px/1 'Fredoka';color:#2C2A6B;background:#FFE7A0;border-radius:99px;padding:5px 9px}
.label .lt{color:#9C99DC;font-weight:600;margin-left:auto}
.note{margin-top:20px;font:500 13px/1.55 'Nunito';color:#9C99DC}
.note b{color:#E4E1FF;font-weight:700}
.phone{position:relative;width:390px;height:844px;border-radius:48px;overflow:hidden;
 box-shadow:0 0 0 1px rgba(255,255,255,.08),0 40px 80px -20px rgba(0,0,0,.65),0 0 120px -30px rgba(150,140,255,.45)}
.art{position:absolute;left:0;top:0}
.status{position:absolute;left:0;top:0;width:390px;height:50px;padding:16px 30px 0 36px;display:flex;justify-content:space-between;font:700 16px/1 'Nunito';color:#fff}
.sicons{display:flex;gap:6px;align-items:center}
.home{position:absolute;left:128px;bottom:9px;width:134px;height:5px;border-radius:3px;background:rgba(255,255,255,.75)}
.topbar{position:absolute;left:20px;right:20px;top:54px;height:40px;display:flex;justify-content:space-between;align-items:center}
.iconbtn{width:40px;height:40px;border-radius:20px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(12px)}
.logo{display:flex;gap:7px;align-items:center;height:36px;padding:0 14px;border-radius:18px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);font:600 14px/1 'Fredoka';color:#fff;letter-spacing:.01em}
.steplabel{font:700 12px/1 'Nunito';letter-spacing:.16em;text-transform:uppercase;color:#D7D3FF}
.block{position:absolute;left:24px;right:24px;text-align:center}
.steps{display:flex;gap:6px;justify-content:center;margin-bottom:16px}
.steps span{width:8px;height:8px;border-radius:4px;background:rgba(255,255,255,.28)}
.steps span.done{background:rgba(255,231,160,.6)}
.steps span.on{width:26px;background:#FFE7A0;box-shadow:0 0 12px rgba(255,231,160,.7)}
h1{font:600 34px/1.1 'Fredoka';color:#fff;letter-spacing:-.005em;text-shadow:0 2px 24px rgba(40,30,120,.5)}
h1.big{font-size:40px}
h2{font:600 26px/1.15 'Fredoka';color:#fff}
.sub{font:600 16px/1.4 'Nunito';color:#DAD6FF;margin-top:8px}
.cta{position:absolute;left:32px;width:326px;height:60px;border-radius:30px;display:flex;align-items:center;justify-content:center;font:600 19px/1 'Fredoka';letter-spacing:.01em}
.cta-moon{background:linear-gradient(100deg,#FFF0B8 0%,#F8D3E6 52%,#C8B8FF 100%);color:#2C2A6B;box-shadow:0 14px 30px -8px rgba(255,214,170,.45),inset 0 1px 0 rgba(255,255,255,.8)}
.cta-lav{background:linear-gradient(100deg,#D9C9FF 0%,#A796FF 55%,#8B7BF5 100%);color:#fff;box-shadow:0 0 0 6px rgba(185,163,255,.16),0 0 46px rgba(185,163,255,.65),0 14px 30px -8px rgba(120,100,240,.6),inset 0 1px 0 rgba(255,255,255,.6);text-shadow:0 1px 8px rgba(80,60,180,.4)}
.ctaicon{position:absolute;right:8px;top:8px;width:44px;height:44px;border-radius:22px;background:rgba(255,255,255,.6);display:flex;align-items:center;justify-content:center}
.ctaicon.light{background:rgba(255,255,255,.22)}
.caption{position:absolute;left:0;right:0;text-align:center;font:600 13px/1 'Nunito';color:#B4AFEA}
.caption u{text-decoration-color:rgba(180,175,234,.5);text-underline-offset:3px;color:#E3DFFF}
.glass{position:absolute;left:20px;right:20px;background:linear-gradient(160deg,rgba(255,255,255,.18),rgba(255,255,255,.07));border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(18px);box-shadow:0 20px 40px -18px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.2)}
.progress{height:70px;border-radius:24px;padding:14px 18px}
.prow{display:flex;justify-content:space-between;align-items:center}
.ptitle{display:flex;gap:7px;align-items:center;font:600 15px/1 'Fredoka';color:#fff}
.pcount{font:600 13px/1 'Nunito';color:#CFCBFF}
.pcount b{font:600 15px/1 'Fredoka';color:#FFE7A0}
.segs{display:flex;gap:6px;margin-top:12px}
.segs span{flex:1;height:7px;border-radius:4px;background:rgba(255,255,255,.16)}
.segs span.lit{background:linear-gradient(90deg,#FFE7A0,#F8C9E2);box-shadow:0 0 10px rgba(255,231,160,.55)}
.chip{position:absolute;height:24px;padding:0 10px;border-radius:12px;background:rgba(255,255,255,.92);color:#2C2A6B;font:800 11px/24px 'Nunito';letter-spacing:.06em;text-transform:uppercase;box-shadow:0 6px 14px -4px rgba(0,0,0,.4)}
.panel{height:212px;border-radius:32px;padding:22px 22px 0;text-align:center;background:linear-gradient(160deg,rgba(40,44,120,.78),rgba(26,28,84,.82))}
.hints{display:flex;gap:10px;margin-top:16px}
.hint{flex:1;height:46px;border-radius:23px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);display:flex;align-items:center;gap:8px;padding:0 6px;font:600 13px/1 'Nunito';color:#DAD6FF}
.hint b{color:#fff;font-weight:800}
.hicon{width:34px;height:34px;border-radius:17px;background:rgba(255,231,160,.16);display:flex;align-items:center;justify-content:center}
.panelfoot{position:absolute;left:22px;right:22px;bottom:14px;display:flex;justify-content:space-between;align-items:center}
.panelfoot .steps{margin:0}
.ring{position:relative;width:44px;height:44px}
.ring span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 10px/1 'Nunito';color:#fff}
.badge{position:absolute;left:50%;transform:translateX(-50%);height:32px;padding:0 14px 0 10px;border-radius:16px;background:linear-gradient(100deg,#FFF0B8,#F8D3E6);color:#2C2A6B;font:800 12px/32px 'Nunito';display:flex;gap:6px;align-items:center;white-space:nowrap;box-shadow:0 0 30px rgba(255,231,160,.35)}
.pipname{position:absolute;font:600 11px/1 'Fredoka';color:#FFE7A0;letter-spacing:.04em;background:rgba(20,18,63,.55);border:1px solid rgba(255,231,160,.35);padding:5px 9px;border-radius:12px}
"""

swatches = [("#0F1442", "Midnight"), ("#2E3485", "Indigo"), ("#6466C6", "Periwinkle"), ("#A796FF", "Lavender"),
            ("#CDB6EE", "Haze"), ("#F8D3E6", "Blush"), ("#FFF1B8", "Moonlight")]

html = f"""<!doctype html><html><head><meta charset="utf-8"><title>Sweet Dreams — H5 Campaign UI</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body><div class="canvas">
<div class="head"><div><div class="kicker">H5 Campaign · Mobile UI Concept</div>
<div class="title">Sweet <em>Dreams</em></div>
<div class="desc">An interactive bedtime ritual in three moments. Meet Nubi, a sleepy plush cloud-creature with a moon sprout, and help them drift off.</div></div>
<div class="system"><div class="swatches">{''.join(f'<div class="sw"><i style="background:{c}"></i><b>{n}</b></div>' for c,n in swatches)}</div>
<div class="type"><div class="aa">Aa</div><div class="tl">Fredoka SemiBold — Display<br>Nunito Bold — Interface</div></div></div></div>
<div class="row">
<div class="col"><div class="label"><span class="num">01</span>Welcome<span class="lt">Onboarding</span></div>{phone(screen1(), ui1)}
<div class="note"><b>Moonlight CTA</b> — pill 326×60, warm gradient anchors the eye at the bottom of the hill.</div></div>
<div class="col"><div class="label"><span class="num">02</span>Interactive Night<span class="lt">Gameplay</span></div>{phone(screen2(), ui2)}
<div class="note"><b>Tactile hints</b> — dashed stars await a tap, ripples confirm it; the moon leaves a glowing drag trail.</div></div>
<div class="col"><div class="label"><span class="num">03</span>Sweet Dreams<span class="lt">Reward</span></div>{phone(screen3(), ui3)}
<div class="note"><b>Reveal</b> — Pip, a tiny star-moth, appears as Nubi sleeps. Glowing lavender CTA drives discovery.</div></div>
</div></div></body></html>"""

open("sweet-dreams.html", "w").write(html)
print("ok", len(html))
