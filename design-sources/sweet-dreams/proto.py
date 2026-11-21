"""Builds proto.html: a playable version of the Sweet Dreams H5 campaign."""
import random
import build as B

random.seed(11)

# ---------- art ----------
d1, a1 = B.screen1()
cb1 = B.creature("a", "awake")[1]
a1 = a1.replace(f'<g transform="translate(195 482)">{cb1}</g>',
                f'<g transform="translate(195 482)"><g class="breathe">{cb1}</g></g>')
a1 = a1.replace('<g opacity="', '<g class="drift" opacity="')

d3, a3 = B.screen3()
cb3 = B.creature("c", "sleep")[1]
a3 = a3.replace(f'<g transform="translate(178 468) rotate(-4)">{cb3}</g>',
                f'<g transform="translate(178 468) rotate(-4)"><g class="breathe slow">{cb3}</g></g>')
a3 = a3.replace(f'<g transform="translate(300 448)">{B.pip("c")}</g>',
                f'<g transform="translate(300 448)"><g class="pip">{B.pip("c")}</g></g>')
a3 = a3.replace('<g opacity="', '<g class="drift" opacity="')


def screen2_bg():
    p = "b"
    cdefs, cbody = B.creature(p, "awake")
    defs = (f'<linearGradient id="{p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F1442"/>'
            f'<stop offset=".45" stop-color="#232A78"/><stop offset=".8" stop-color="#3E3F9C"/><stop offset="1" stop-color="#5A55B0"/></linearGradient>'
            f'<linearGradient id="{p}hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B3C98"/><stop offset="1" stop-color="#171A52"/></linearGradient>'
            + B.glow(p, "ff", "#FFF2A8") + B.glow(p, "calm", "#B9A3FF") + B.grain(p) + cdefs)
    art = (f'<rect width="390" height="844" fill="url(#{p}sky)"/>'
           f'<circle id="calm" cx="195" cy="330" r="320" fill="url(#{p}calm)" opacity="0"/>'
           + B.dots(110, 0, 390, 40, 520, .4, 1.4, "#FFFFFF", .25, .85)
           + B.cloud(230, 470, 1.2, "#8C88E0", .35).replace('<g ', '<g class="drift" ')
           + B.cloud(-40, 440, 1.3, "#8C88E0", .3).replace('<g ', '<g class="drift" ')
           + '<path d="M0 520 C90 482 170 494 250 520 C320 542 360 516 390 508 V844 H0Z" fill="#2E3283"/>'
           + f'<path d="M-10 600 C60 545 130 532 195 532 C260 532 330 545 400 600 V844 H-10Z" fill="url(#{p}hill)"/>'
           + B.grass(40, 355, lambda x: B.hill_y(x, top=532), "#5B5DB8")
           + '<ellipse cx="195" cy="536" rx="64" ry="9" fill="#0E1040" opacity=".45"/>'
           + f'<g transform="translate(195 462) scale(.88)"><g id="hop"><g class="breathe">{cbody}</g></g></g>'
           + f'<rect width="390" height="844" filter="url(#{p}grain)" opacity=".08"/>')
    return defs, art


d2, a2 = screen2_bg()


def svg(d, a):
    return f'<svg class="art" width="390" height="844" viewBox="0 0 390 844"><defs>{d}</defs>{a}</svg>'


def twinkles(n, y0=60, y1=470):
    out = []
    for _ in range(n):
        s = random.uniform(6, 13)
        out.append(f'<i class="tw" style="left:{random.uniform(10,370):.0f}px;top:{random.uniform(y0,y1):.0f}px;'
                   f'width:{s:.0f}px;height:{s:.0f}px;animation-delay:{random.uniform(0,4):.2f}s;animation-duration:{random.uniform(2.4,4.5):.2f}s"></i>')
    return '<div class="fx">' + "".join(out) + "</div>"


def fireflies(n, y0=380, y1=640):
    out = []
    for _ in range(n):
        out.append(f'<i class="ff" style="left:{random.uniform(20,360):.0f}px;top:{random.uniform(y0,y1):.0f}px;'
                   f'animation-delay:-{random.uniform(0,8):.2f}s;animation-duration:{random.uniform(6,11):.2f}s"></i>')
    return '<div class="fx">' + "".join(out) + "</div>"


SOUND = B.SOUND.replace('<div class="iconbtn">', '<div class="iconbtn snd" data-act="sound" role="button" aria-label="Sound">')
BACK = B.BACK.replace('<div class="iconbtn">', '<div class="iconbtn" data-act="back" role="button" aria-label="Back">')

ui1 = (B.ui1.replace(B.SOUND, SOUND)
       .replace('<div class="cta cta-moon"', '<div class="cta cta-moon" data-act="begin" role="button"'))
ui3 = (B.ui3.replace(B.SOUND, SOUND)
       .replace('<div class="cta cta-lav"', '<div class="cta cta-lav" data-act="discover" role="button"')
       .replace('<u>Replay the night</u>', '<u data-act="replay" role="button">Replay the night</u>')
       .replace('Share with a friend', '<span data-act="share" role="button">Share with a friend</span>'))

STAR = '<svg viewBox="-20 -20 40 40" width="40" height="40"><path class="sp" d="M0 -15 Q2.7 -2.7 15 0 Q2.7 2.7 0 15 Q-2.7 2.7 -15 0 Q-2.7 -2.7 0 -15Z"/><circle class="core" r="4"/></svg>'
STARS = [(60, 392), (334, 380), (236, 290), (118, 340), (300, 300)]
stars_html = "".join(f'<div class="star" data-i="{i}" style="left:{x-30}px;top:{y-30}px;animation-delay:-{i*0.7:.1f}s" role="button" aria-label="Star">'
                     f'<div class="halo"></div>{STAR}</div>' for i, (x, y) in enumerate(STARS))

MOON_SVG = B.crescent(60, 60, 34, "#FFF1B8")
segs = "".join('<span></span>' for _ in range(5))

ui2 = (f'<div class="topbar">{BACK}<div class="steplabel">Step 2 of 3</div>{SOUND}</div>'
       '<div class="glass progress" style="top:108px">'
       '<div class="prow"><div class="ptitle"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2 Q13.5 10.5 22 12 Q13.5 13.5 12 22 Q10.5 13.5 2 12 Q10.5 10.5 12 2Z" fill="#FFEDA6"/></svg>Night peace</div>'
       '<div class="pcount"><b id="pc">0</b> / 5 stars</div></div>'
       f'<div class="segs" id="segs">{segs}</div></div>'
       '<svg class="trail" width="390" height="844" viewBox="0 0 390 844"><defs><linearGradient id="tg" gradientUnits="userSpaceOnUse" x1="96" y1="0" x2="330" y2="0">'
       '<stop offset="0" stop-color="#FFF1B8" stop-opacity=".9"/><stop offset="1" stop-color="#C9B6FF" stop-opacity=".1"/></linearGradient></defs>'
       '<path id="guide" d="M126 240 C185 200 252 192 300 214" stroke="#C9C6FF" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="2 9" opacity=".55"/>'
       '<path id="trailGlow" d="" stroke="#FFF1B8" stroke-width="16" fill="none" stroke-linecap="round" opacity=".18"/>'
       '<path id="trail" d="" stroke="#FFF1B8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 8" opacity=".9"/></svg>'
       '<div id="target" style="left:298px;top:192px"></div>'
       f'{stars_html}'
       f'<div id="moon" style="left:36px;top:184px" role="button" aria-label="Moon, drag me"><div class="mglow"></div><div class="mring"></div><div class="mring r2"></div>'
       f'<svg width="120" height="120" viewBox="0 0 120 120">{MOON_SVG}</svg></div>'
       '<div class="chip" id="chipDrag" style="left:44px;top:300px">Drag</div>'
       '<div class="chip" id="chipTap" style="left:94px;top:364px">Tap</div>'
       '<div class="glass panel" style="top:600px">'
       '<h2 id="pTitle">Make the Night Peaceful</h2><p class="sub" id="pSub">Tap the stars and move the moon</p>'
       '<div class="hints">'
       '<div class="hint" id="hTap"><span class="hicon"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2 Q13.5 10.5 22 12 Q13.5 13.5 12 22 Q10.5 13.5 2 12 Q10.5 10.5 12 2Z" fill="#FFEDA6"/></svg></span><span id="tTap"><b>Tap</b> 5 stars</span></div>'
       '<div class="hint" id="hMoon"><span class="hicon"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M14 2a10 10 0 1 0 8 15A8 8 0 0 1 14 2z" fill="#FFEDA6"/></svg></span><span id="tMoon"><b>Drag</b> the moon</span></div>'
       '</div>'
       f'<div class="panelfoot">{B.steps(1)}<div class="ring"><svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="4"/>'
       '<circle id="ringArc" cx="22" cy="22" r="19" fill="none" stroke="#FFE7A0" stroke-width="4" stroke-linecap="round" stroke-dasharray="0 119.4" transform="rotate(-90 22 22)"/></svg><span id="ringPct">0%</span></div></div>'
       '</div>')

SHEET = ('<div id="sheet"><div class="sheetcard"><div class="grab"></div>'
         '<div class="sheeticon"><svg width="34" height="34" viewBox="0 0 24 24"><path d="M14 2a10 10 0 1 0 8 15A8 8 0 0 1 14 2z" fill="#FFEDA6"/></svg></div>'
         '<h2>More dreams are coming</h2><p class="sub">New bedtime stories with Nubi &amp; Pip arrive every week.</p>'
         '<div class="cta cta-moon sheetcta" data-act="close" role="button">Remind me tonight</div></div></div>'
         '<div id="toast"></div>')

EXTRA_CSS = """
html,body{height:100%}
body{display:flex;align-items:center;justify-content:center;overflow:hidden;
 background:radial-gradient(900px 600px at 20% 0%,#25286E 0%,rgba(37,40,110,0) 70%),radial-gradient(800px 700px at 100% 100%,#2D2266 0%,rgba(45,34,102,0) 70%),#0A0C2C}
#wrap{position:relative}
#stage{position:absolute;left:0;top:0;transform-origin:0 0;user-select:none;-webkit-user-select:none;touch-action:none}
.screen{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity .9s ease,transform .9s ease,visibility 0s .9s;transform:scale(1.04)}
.screen.on{opacity:1;visibility:visible;transform:none;transition:opacity .9s ease,transform .9s ease}
[data-act]{cursor:pointer}
.cta{transition:transform .15s ease,filter .2s}
.cta:hover{filter:brightness(1.05)}
.cta:active{transform:scale(.97)}
.iconbtn:active{transform:scale(.92)}
.snd.off svg path:not(:first-child){display:none}
.fx{position:absolute;inset:0;pointer-events:none}
.tw{position:absolute;background:#FFF6D6;clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);animation:tw 3s ease-in-out infinite;opacity:.2}
@keyframes tw{0%,100%{opacity:.15;transform:scale(.6)}50%{opacity:1;transform:scale(1)}}
.ff{position:absolute;width:22px;height:22px;margin:-11px;border-radius:50%;background:radial-gradient(circle,#FFF6C9 0 12%,rgba(255,242,168,.45) 22%,rgba(255,242,168,0) 70%);animation:ff 8s ease-in-out infinite}
@keyframes ff{0%{transform:translate(0,0);opacity:.3}25%{transform:translate(14px,-18px);opacity:1}50%{transform:translate(-6px,-34px);opacity:.5}75%{transform:translate(-16px,-12px);opacity:1}100%{transform:translate(0,0);opacity:.3}}
.breathe{transform-box:fill-box;transform-origin:50% 100%;animation:breathe 3.6s ease-in-out infinite}
.breathe.slow{animation-duration:5s}
@keyframes breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.025,.975)}}
.drift{animation:drift 14s ease-in-out infinite alternate}
.drift:nth-of-type(2n){animation-duration:19s;animation-direction:alternate-reverse}
@keyframes drift{from{transform:translateX(-10px)}to{transform:translateX(14px)}}
#hop{transform-box:fill-box;transform-origin:50% 100%}
#hop.go{animation:hop .5s cubic-bezier(.3,1.6,.5,1)}
@keyframes hop{0%{transform:scale(1)}30%{transform:scale(1.08,.9)}60%{transform:translateY(-14px) scale(.96,1.05)}100%{transform:none}}
.pip{transform-box:fill-box;transform-origin:center}
#s3.on .pip{animation:pipIn 1.6s cubic-bezier(.2,.8,.2,1) .5s both,bob 3s ease-in-out 2.1s infinite}
@keyframes pipIn{from{transform:translate(120px,-160px) scale(.2);opacity:0}to{transform:none;opacity:1}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
#s3 svg text{animation:z 3.6s ease-in infinite;transform-box:fill-box;transform-origin:center}
#s3 svg text:nth-of-type(2){animation-delay:1.2s}
#s3 svg text:nth-of-type(3){animation-delay:2.4s}
@keyframes z{0%{opacity:0;transform:translate(-10px,16px) scale(.6)}30%{opacity:1}100%{opacity:0;transform:translate(10px,-22px) scale(1.1)}}
#s3.on .badge{animation:pop .7s cubic-bezier(.3,1.6,.5,1) .9s both}
#s3.on .pipname{animation:fadeUp .6s ease 2.1s both}
#s3.on .block,#s1.on .block{animation:fadeUp .9s ease .2s both}
#s3.on .cta,#s1.on .cta{animation:fadeUp .9s ease .45s both}
@keyframes pop{from{transform:translateX(-50%) scale(.4);opacity:0}to{transform:translateX(-50%) scale(1);opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.cta-lav{animation:none}
#s3.on .cta-lav{animation:fadeUp .9s ease .45s both,pulse 2.8s ease-in-out 1.4s infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 6px rgba(185,163,255,.16),0 0 40px rgba(185,163,255,.55),0 14px 30px -8px rgba(120,100,240,.6),inset 0 1px 0 rgba(255,255,255,.6)}50%{box-shadow:0 0 0 10px rgba(185,163,255,.1),0 0 64px rgba(185,163,255,.8),0 14px 30px -8px rgba(120,100,240,.6),inset 0 1px 0 rgba(255,255,255,.6)}}
/* interactive night */
.trail{position:absolute;left:0;top:0;pointer-events:none}
.star{position:absolute;width:60px;height:60px;display:flex;align-items:center;justify-content:center;animation:float 4s ease-in-out infinite;-webkit-tap-highlight-color:transparent}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.star svg{position:relative;overflow:visible;transition:transform .4s cubic-bezier(.3,1.6,.5,1)}
.star .sp{fill:rgba(255,255,255,.04);stroke:#C9C6FF;stroke-width:1.6;stroke-dasharray:3 3;transition:fill .3s,stroke .3s}
.star .core{fill:#fff;opacity:0;transition:opacity .3s}
.star .halo{position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle,rgba(255,233,160,.8) 0,rgba(255,233,160,.25) 30%,rgba(255,233,160,0) 68%);opacity:0;transform:scale(.4);transition:opacity .5s,transform .6s cubic-bezier(.3,1.6,.5,1)}
.star:not(.lit)::after{content:"";position:absolute;inset:6px;border-radius:50%;border:1.2px solid rgba(201,198,255,.45);animation:ping 2.4s ease-out infinite}
@keyframes ping{from{transform:scale(.7);opacity:.9}to{transform:scale(1.5);opacity:0}}
.star.lit .sp{fill:#FFF1B8;stroke:#FFF1B8;stroke-dasharray:none}
.star.lit .core{opacity:1}
.star.lit .halo{opacity:1;transform:scale(1)}
.star.lit svg{transform:scale(1.15)}
.ripple{position:absolute;width:60px;height:60px;border-radius:50%;border:2px solid #FFF1B8;pointer-events:none;animation:rip .9s ease-out forwards}
@keyframes rip{from{transform:scale(.4);opacity:1}to{transform:scale(2.2);opacity:0}}
.spark{position:absolute;width:6px;height:6px;margin:-3px;border-radius:50%;background:#FFF1B8;box-shadow:0 0 8px #FFE9A0;pointer-events:none;animation:spark .8s ease-out forwards}
@keyframes spark{to{transform:translate(var(--dx),var(--dy)) scale(.2);opacity:0}}
#moon{position:absolute;width:120px;height:120px;cursor:grab;z-index:5;-webkit-tap-highlight-color:transparent}
#moon.drag{cursor:grabbing}
#moon svg{position:absolute;inset:0;transition:transform .3s;filter:drop-shadow(0 0 12px rgba(255,241,184,.6))}
#moon.drag svg{transform:scale(1.12)}
#moon .mglow{position:absolute;inset:-70px;border-radius:50%;background:radial-gradient(circle,rgba(255,241,184,.55) 0,rgba(255,241,184,.18) 30%,rgba(255,241,184,0) 66%);pointer-events:none}
#moon .mring{position:absolute;inset:12px;border-radius:50%;border:1.5px solid rgba(255,241,184,.5);animation:breatheRing 2.4s ease-in-out infinite}
#moon .mring.r2{inset:2px;border-width:1px;opacity:.5;animation-delay:.6s}
#moon.placed .mring{display:none}
#moon.placed .mglow{inset:-110px;transition:inset .8s}
@keyframes breatheRing{0%,100%{transform:scale(.95);opacity:.7}50%{transform:scale(1.06);opacity:.25}}
#target{position:absolute;width:60px;height:60px;border-radius:50%;border:1.5px dashed rgba(201,198,255,.7);animation:tgt 1.8s ease-in-out infinite;pointer-events:none}
#target::after{content:"";position:absolute;inset:18px;border-radius:50%;background:rgba(255,241,184,.18)}
#target.near{border-color:#FFF1B8;border-style:solid;box-shadow:0 0 24px rgba(255,241,184,.6)}
#target.gone{opacity:0;transition:opacity .4s}
@keyframes tgt{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
.chip{transition:opacity .4s,transform .4s;pointer-events:none}
.chip.hide{opacity:0;transform:translateY(-6px)}
.hint{transition:background .4s,border-color .4s}
.hint.done{background:rgba(255,231,160,.16);border-color:rgba(255,231,160,.45)}
.segs span{transition:background .4s,box-shadow .4s}
#ringArc{transition:stroke-dasharray .6s cubic-bezier(.3,1,.4,1)}
#calm{transition:opacity 1.2s}
.pcount b{display:inline-block}
.pcount b.bump{animation:pop2 .4s cubic-bezier(.3,1.6,.5,1)}
@keyframes pop2{50%{transform:scale(1.5)}}
/* sheet + toast */
#sheet{position:absolute;inset:0;background:rgba(8,8,36,.55);opacity:0;visibility:hidden;transition:opacity .35s,visibility 0s .35s;z-index:20}
#sheet.on{opacity:1;visibility:visible;transition:opacity .35s}
.sheetcard{position:absolute;left:12px;right:12px;bottom:12px;padding:14px 24px 28px;border-radius:36px;text-align:center;
 background:linear-gradient(170deg,#3A3592,#221F63);border:1px solid rgba(255,255,255,.16);transform:translateY(110%);transition:transform .5s cubic-bezier(.2,.9,.2,1)}
#sheet.on .sheetcard{transform:none}
.grab{width:40px;height:5px;border-radius:3px;background:rgba(255,255,255,.3);margin:0 auto 18px}
.sheeticon{width:72px;height:72px;border-radius:36px;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(255,241,184,.3),rgba(255,241,184,0) 70%)}
.sheetcta{position:relative;left:auto;width:100%;margin-top:22px}
#toast{position:absolute;left:50%;top:60px;transform:translate(-50%,-20px);opacity:0;padding:10px 16px;border-radius:18px;background:rgba(255,255,255,.95);color:#2C2A6B;font:800 13px/1 'Nunito';white-space:nowrap;transition:all .35s;z-index:30;pointer-events:none}
#toast.on{opacity:1;transform:translate(-50%,0)}
@media (max-width:600px){.phone{border-radius:0;box-shadow:none}}
"""

JS = r"""
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const stage=$('#stage'), wrap=$('#wrap');
let scale=1;
function fit(){const m=innerWidth>600?48:0;scale=Math.min((innerWidth-m)/390,(innerHeight-m)/844);if(innerWidth>600)scale=Math.min(scale,1.15);
 stage.style.transform=`scale(${scale})`;wrap.style.width=390*scale+'px';wrap.style.height=844*scale+'px';}
addEventListener('resize',fit);fit();

// ---- sound ----
let ac=null, muted=false;
function audio(){if(!ac){try{ac=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(ac&&ac.state==='suspended')ac.resume();return ac}
function tone(f,delay=0,dur=1.4,vol=.10,type='sine'){const c=audio();if(!c||muted)return;const t=c.currentTime+delay;
 const o=c.createOscillator(),g=c.createGain(),o2=c.createOscillator(),g2=c.createGain();
 o.type=type;o.frequency.value=f;o2.type='sine';o2.frequency.value=f*2.01;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
 g2.gain.setValueAtTime(0,t);g2.gain.linearRampToValueAtTime(vol*.25,t+.02);g2.gain.exponentialRampToValueAtTime(.0001,t+dur*.6);
 o.connect(g).connect(c.destination);o2.connect(g2).connect(c.destination);o.start(t);o2.start(t);o.stop(t+dur);o2.stop(t+dur);}
const NOTES=[523.25,587.33,659.25,783.99,880];
function setMuted(m){muted=m;$$('.snd').forEach(b=>b.classList.toggle('off',m));toast(m?'Sound off':'Sound on')}

// ---- toast ----
let tt;function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),1600)}

// ---- screens ----
function go(n){$$('.screen').forEach((s,i)=>s.classList.toggle('on',i===n-1));
 if(n===3){[523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(f,.3+i*.18,2.4,.08))}}

// ---- interactive night ----
const START={x:96,y:244}, TARGET={x:328,y:222};
let lit=new Set(), moonDone=false, finished=false;
function update(){
 const n=lit.size; $('#pc').textContent=n; $('#pc').classList.remove('bump'); void $('#pc').offsetWidth; $('#pc').classList.add('bump');
 $$('#segs span').forEach((s,i)=>s.classList.toggle('lit',i<n));
 const pct=Math.round((n+(moonDone?1:0))/6*100);
 $('#ringArc').setAttribute('stroke-dasharray',`${119.4*pct/100} 119.4`); $('#ringPct').textContent=pct+'%';
 $('#calm').style.opacity=(pct/100)*.9;
 const left=5-n; $('#tTap').innerHTML=left?`<b>Tap</b> ${left} star${left>1?'s':''}`:'<b>Stars</b> all lit ✓';
 $('#hTap').classList.toggle('done',!left);
 $('#tMoon').innerHTML=moonDone?'<b>Moon</b> placed ✓':'<b>Drag</b> the moon';
 $('#hMoon').classList.toggle('done',moonDone);
 if(!left&&moonDone&&!finished){finished=true;
  $('#pTitle').textContent='The night is peaceful';$('#pSub').textContent='Nubi is getting sleepy…';
  setTimeout(()=>go(3),1700)}
}
function burst(x,y){const s=$('#s2');for(let i=0;i<10;i++){const p=document.createElement('i');p.className='spark';const a=Math.PI*2*i/10+Math.random()*.4,r=30+Math.random()*28;
 p.style.left=x+'px';p.style.top=y+'px';p.style.setProperty('--dx',Math.cos(a)*r+'px');p.style.setProperty('--dy',Math.sin(a)*r+'px');s.appendChild(p);setTimeout(()=>p.remove(),850)}
 const r=document.createElement('div');r.className='ripple';r.style.left=x-30+'px';r.style.top=y-30+'px';s.appendChild(r);setTimeout(()=>r.remove(),950)}
function hop(){const h=$('#hop');h.classList.remove('go');void h.getBoundingClientRect();h.classList.add('go')}
$$('.star').forEach(st=>st.addEventListener('pointerdown',e=>{e.stopPropagation();const i=+st.dataset.i;
 const x=parseFloat(st.style.left)+30,y=parseFloat(st.style.top)+30;burst(x,y);
 $('#chipTap').classList.add('hide');
 if(lit.has(i)){tone(NOTES[i]*.5,0,.6,.05);return}
 lit.add(i);st.classList.add('lit');tone(NOTES[lit.size-1]);hop();update()}));

// moon drag
const moon=$('#moon');let drag=null,pos={...START};
function placeMoon(p){pos=p;moon.style.left=p.x-60+'px';moon.style.top=p.y-60+'px';
 const d=`M${START.x+30} ${START.y-4} Q${(START.x+p.x)/2} ${Math.min(START.y,p.y)-60} ${p.x} ${p.y}`;
 const show=Math.hypot(p.x-START.x,p.y-START.y)>24;$('#trail').setAttribute('d',show?d:'');$('#trailGlow').setAttribute('d',show?d:'')}
function local(e){const r=stage.getBoundingClientRect();return{x:(e.clientX-r.left)/scale,y:(e.clientY-r.top)/scale}}
moon.addEventListener('pointerdown',e=>{if(moonDone)return;e.preventDefault();moon.setPointerCapture(e.pointerId);const l=local(e);drag={dx:pos.x-l.x,dy:pos.y-l.y};moon.classList.add('drag');$('#chipDrag').classList.add('hide');$('#guide').style.opacity=.2;audio()});
moon.addEventListener('pointermove',e=>{if(!drag)return;const l=local(e);const p={x:Math.max(40,Math.min(350,l.x+drag.dx)),y:Math.max(190,Math.min(520,l.y+drag.dy))};placeMoon(p);
 $('#target').classList.toggle('near',Math.hypot(p.x-TARGET.x,p.y-TARGET.y)<44)});
function endDrag(){if(!drag)return;drag=null;moon.classList.remove('drag');
 if(Math.hypot(pos.x-TARGET.x,pos.y-TARGET.y)<44){moonDone=true;moon.style.transition='left .45s cubic-bezier(.3,1.4,.5,1),top .45s cubic-bezier(.3,1.4,.5,1)';placeMoon({...TARGET});
  moon.classList.add('placed');$('#target').classList.add('gone');burst(TARGET.x,TARGET.y);tone(392,0,1.6,.09);tone(587.33,.15,2,.08);hop();update()}
 else{$('#target').classList.remove('near');toast('Bring the moon to the glowing ring')}}
moon.addEventListener('pointerup',endDrag);moon.addEventListener('pointercancel',endDrag);
// keyboard fallback for the moon
moon.tabIndex=0;moon.addEventListener('keydown',e=>{if(e.key==='Enter'&&!moonDone){placeMoon({...TARGET});drag={};endDrag()}});

function resetNight(){lit.clear();moonDone=false;finished=false;$$('.star').forEach(s=>s.classList.remove('lit'));
 moon.style.transition='none';moon.classList.remove('placed');placeMoon({...START});$('#target').classList.remove('gone','near');
 $('#chipTap').classList.remove('hide');$('#chipDrag').classList.remove('hide');$('#guide').style.opacity='';
 $('#pTitle').textContent='Make the Night Peaceful';$('#pSub').textContent='Tap the stars and move the moon';
 update();$('#pc').textContent='0'}

// ---- actions ----
document.addEventListener('click',e=>{const a=e.target.closest('[data-act]');if(!a)return;audio();
 switch(a.dataset.act){
  case 'begin':tone(659.25,0,1,.08);tone(987.77,.12,1.4,.06);go(2);break;
  case 'back':go(1);break;
  case 'sound':setMuted(!muted);break;
  case 'discover':$('#sheet').classList.add('on');tone(783.99,0,1,.07);break;
  case 'close':$('#sheet').classList.remove('on');toast('We’ll remind you at bedtime ✦');break;
  case 'replay':resetNight();go(1);break;
  case 'share':toast('Link copied ✦');break;}});
$('#sheet').addEventListener('click',e=>{if(e.target.id==='sheet')$('#sheet').classList.remove('on')});
update();$('#pc').textContent='0';
"""

html = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Sweet Dreams</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>{B.CSS}{EXTRA_CSS}</style></head><body>
<div id="wrap"><div id="stage" class="phone">
<section class="screen on" id="s1">{svg(d1, a1)}{twinkles(14)}{fireflies(7)}{B.STATUS}{ui1}</section>
<section class="screen" id="s2">{svg(d2, a2)}{twinkles(16, 60, 520)}{fireflies(6, 440, 600)}{B.STATUS}{ui2}</section>
<section class="screen" id="s3">{svg(d3, a3)}{twinkles(18)}{fireflies(8)}{B.STATUS}{ui3}</section>
{B.HOME}{SHEET}
</div></div>
<script>{JS}</script></body></html>"""

open("proto.html", "w").write(html)
print("ok", len(html))
