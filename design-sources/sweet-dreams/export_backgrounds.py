"""Exports the static background layers of the 3 Figma screens as standalone SVG files.

Animated parts (Nubi, Pip, sky clouds, stars and moon of screen 02) are drawn live by the H5 app,
so they are intentionally left out here. Output goes to ../dream-challenge/assets/backgrounds/.
"""
import os
import random
import build as B

OUT = os.path.join(os.path.dirname(__file__), "..", "dream-challenge", "assets", "backgrounds")
os.makedirs(OUT, exist_ok=True)


def svg(defs, art):
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">'
            f'<defs>{defs}</defs>{art}</svg>')


def welcome():
    random.seed(7)
    p = "a"
    defs = (f'<linearGradient id="{p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E3485"/>'
            f'<stop offset=".42" stop-color="#6466C6"/><stop offset=".72" stop-color="#A493DF"/><stop offset="1" stop-color="#CDB6EE"/></linearGradient>'
            f'<linearGradient id="{p}hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E5CBC"/><stop offset="1" stop-color="#2B2B78"/></linearGradient>'
            + B.glow(p, "moon", "#FFF1B8") + B.glow(p, "warm", "#F6C8E6") + B.grain(p))
    art = (f'<rect width="390" height="844" fill="url(#{p}sky)"/>'
           f'<circle cx="200" cy="520" r="260" fill="url(#{p}warm)" opacity=".5"/>'
           + B.dots(70, 0, 390, 40, 470, .5, 1.5, "#FFFFFF")
           + B.sparkle(58, 170, 9, "#FFF6D6") + B.sparkle(132, 118, 6, "#FFF6D6", .8) + B.sparkle(352, 300, 7, "#FFF6D6", .9)
           + B.sparkle(40, 330, 5, "#FFF6D6", .7) + B.sparkle(228, 210, 5, "#FFF6D6", .8)
           + f'<circle cx="300" cy="160" r="150" fill="url(#{p}moon)"/>' + B.crescent(300, 160, 40, "#FFF1B8")
           + '<path d="M0 500 C80 455 160 470 235 500 C300 525 350 485 390 478 V844 H0Z" fill="#8A82D6"/>'
           + B.cloud(-30, 486, 1.4, "#E7DDFF", .55) + B.cloud(270, 470, 1.2, "#EDE4FF", .5)
           + '<path d="M0 560 C90 525 170 545 250 572 C320 595 360 575 390 566 V844 H0Z" fill="#6E69C8"/>'
           + f'<path d="M-10 640 C60 575 130 560 195 560 C260 560 330 575 400 640 V844 H-10Z" fill="url(#{p}hill)"/>'
           + B.grass(40, 355, B.hill_y, "#8F8CE0")
           + f'<rect width="390" height="844" filter="url(#{p}grain)" opacity=".09"/>')
    return svg(defs, art)


def night():
    random.seed(8)
    p = "b"
    defs = (f'<linearGradient id="{p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F1442"/>'
            f'<stop offset=".45" stop-color="#232A78"/><stop offset=".8" stop-color="#3E3F9C"/><stop offset="1" stop-color="#5A55B0"/></linearGradient>'
            f'<linearGradient id="{p}hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B3C98"/><stop offset="1" stop-color="#171A52"/></linearGradient>'
            + B.grain(p))
    art = (f'<rect width="390" height="844" fill="url(#{p}sky)"/>'
           + B.dots(110, 0, 390, 40, 520, .4, 1.4, "#FFFFFF", .25, .85)
           + B.cloud(230, 470, 1.2, "#8C88E0", .35) + B.cloud(-40, 440, 1.3, "#8C88E0", .3)
           + '<path d="M0 520 C90 482 170 494 250 520 C320 542 360 516 390 508 V844 H0Z" fill="#2E3283"/>'
           + f'<path d="M-10 600 C60 545 130 532 195 532 C260 532 330 545 400 600 V844 H-10Z" fill="url(#{p}hill)"/>'
           + B.grass(40, 355, lambda x: B.hill_y(x, top=532), "#5B5DB8")
           + f'<rect width="390" height="844" filter="url(#{p}grain)" opacity=".08"/>')
    return svg(defs, art)


def dreams():
    random.seed(9)
    p = "c"
    defs = (f'<linearGradient id="{p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0C30"/>'
            f'<stop offset=".5" stop-color="#1D1B57"/><stop offset=".85" stop-color="#352C78"/><stop offset="1" stop-color="#43358A"/></linearGradient>'
            f'<linearGradient id="{p}hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A3290"/><stop offset="1" stop-color="#14123F"/></linearGradient>'
            + B.glow(p, "moon", "#FFF1B8") + B.glow(p, "lav", "#B9A3FF") + B.grain(p))
    art = (f'<rect width="390" height="844" fill="url(#{p}sky)"/>'
           + B.dots(130, 0, 390, 40, 540, .4, 1.4, "#FFFFFF", .25, .9)
           + f'<circle cx="300" cy="230" r="190" fill="url(#{p}moon)" opacity=".9"/>' + B.crescent(300, 230, 42, "#FFF1B8")
           + B.sparkle(70, 150, 8, "#FFF6D6") + B.sparkle(150, 96, 5, "#FFF6D6", .8) + B.sparkle(50, 300, 6, "#FFF6D6", .8) + B.sparkle(352, 330, 5, "#FFF6D6", .7)
           + f'<circle cx="190" cy="470" r="170" fill="url(#{p}lav)" opacity=".45"/>'
           + '<path d="M0 520 C90 486 170 498 250 520 C320 540 360 516 390 510 V844 H0Z" fill="#2A246E"/>'
           + B.cloud(-30, 500, 1.5, "#7E74D0", .4) + B.cloud(268, 488, 1.3, "#7E74D0", .35)
           + f'<path d="M-10 610 C60 553 130 540 195 540 C260 540 330 553 400 610 V844 H-10Z" fill="url(#{p}hill)"/>'
           + B.grass(40, 355, lambda x: B.hill_y(x, top=540), "#5B52B6")
           + f'<rect width="390" height="844" filter="url(#{p}grain)" opacity=".08"/>')
    return svg(defs, art)


for name, fn in [("welcome", welcome), ("night", night), ("dreams", dreams)]:
    with open(os.path.join(OUT, f"{name}.svg"), "w") as f:
        f.write(fn())
    print("wrote", name)
