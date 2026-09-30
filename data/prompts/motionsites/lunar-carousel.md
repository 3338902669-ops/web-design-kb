# Lunar Carousel

> **Source:** Framesbase (MCP)  
> **Type:** sites  
> **Category:** Draggable  
> **Deliverable:** prompt  
> **Opened via:** framesbase MCP on 2026-09-30

---

Build a static, single-page, full-screen interactive hero called "Orbitals — Dark Moon": a dark lunar mission site with a 3D perspective card carousel floating over an animated moonscape, orbit-line decorations, and a big condensed title. Plain HTML + one CSS file + two JS files (no frameworks, no build step): `index.html`, `assets/css/styles.css`, `assets/js/intro.js` (in `<head>`), `assets/js/main.js` (end of `<body>`). Reproduce every number below exactly — they are measured from a 1280×800 reference. Do not round, restyle, or add sections.

## 1. Assets

### Videos
Silent seamless loops, all 1586×992, H.264, 24 fps. Every image is shown as a looping video layered over its still.

| key | video URL | loop | motion |
|---|---|---|---|
| bg | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/25a64166-bd9e-4ab6-b8db-afa9d6b3c64b.mp4 | 9 s | moonscape, meteors, fireball beside a crescent planet top-right, rolling dust |
| tower | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c9fcd901-b7de-44cd-b7bb-340a5cc1c75f.mp4 | 9 s | comms tower + base modules, rover drives by, searchlight, flashing beacons, sun flare top-left |
| habitat | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f26c235a-a58f-447f-805a-9d73a201d70b.mp4 | 9 s | huge transit tube on pylons, glowing pod races through, steam bursts, sparks |
| crater | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e7e301c9-fe14-4cbf-8eb5-7cc3811326d5.mp4 | 9 s | crater field, meteor impact, billowing dust |
| crescent | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/35a8953d-1e28-46bb-96a4-4dd190058e70.mp4 | 20 s | large crescent moon in deep space waxing/waning |
| dish | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/16d316a2-a97e-450e-a2e1-734426b0d5e5.mp4 | 20 s | radio telescope dish sweeping, blinking lights |

### Still images
Posters/fallbacks, each 1586×992 WebP, used as CSS custom properties:

```css
:root{--i-bg:url(/assets/images/background.webp);--i-tower:url(/assets/images/tower.webp);--i-dish:url(/assets/images/dish.webp);--i-habitat:url(/assets/images/habitat.webp);--i-crater:url(/assets/images/crater.webp);--i-crescent:url(/assets/images/crescent.webp);}
:root{--orange:#f47a3b;--u:1;--s:1;}
```

### Fonts
All are Google Fonts; self-host them as WOFF2 with `font-display:block`:

- 'Saira ExtraCondensed' 800 → `saira-extra-condensed-800.woff2`
- 'Saira ExtraCondensed' 900 → `saira-extra-condensed-900.woff2`
- 'DM Sans' 500 → `dm-sans-500.woff2`
- 'DM Mono' 400 and 500 → `dm-mono-400.woff2`, `dm-mono-500.woff2`

## 2. Base CSS

```css
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden;background:#03060b}
body{font-family:'DM Sans',system-ui,sans-serif;color:#fff;-webkit-font-smoothing:antialiased;user-select:none;touch-action:pan-y}
#app{position:fixed;inset:0;overflow:hidden;background:#03060b;--arch:desktop}
.stage{position:absolute;left:0;top:0;width:1280px;height:800px;transform-origin:0 0}
.grp{position:absolute;left:0;top:0;width:1280px;height:800px;transform-origin:0 0;pointer-events:none}
.grp a,.grp button,.grp .hit{pointer-events:auto}
.tx{position:absolute;white-space:nowrap;line-height:1;transform-origin:0 0}
.disp{font-family:'Saira ExtraCondensed',Impact,sans-serif;font-weight:900}
.mono{font-family:'DM Mono',ui-monospace,monospace}
.mask{position:absolute;overflow:hidden}
.mask>.tx{position:absolute;left:0;top:0;transition:transform .7s cubic-bezier(.19,1,.22,1),opacity .5s}
```

## 3. HTML structure

Everything lives inside `<div id="app">`, in this order.

### 3.1 Scene (background)
`div.stage#scene[aria-hidden]` containing:
- `.bg` — `inset:0; background:var(--i-bg) center/100% 100% no-repeat`
- `.haze` — `linear-gradient(180deg, rgba(62,84,112,.03) 0%, rgba(62,84,112,.12) 13%, rgba(62,84,112,.12) 38%, rgba(62,84,112,0) 55%)`
- `.vig` — `radial-gradient(circle at 1280px 800px, rgba(4,7,12,.94) 0, rgba(4,7,12,.85) 220px, rgba(4,7,12,.3) 440px, rgba(4,7,12,0) 560px)`

### 3.2 Deck (carousel)
`div.stage#deck[role=region][aria-label="Map carousel, drag to browse"]`, `touch-action:pan-y`. Contains:

`svg#rings` — width 1280, height 800, viewBox `0 0 1280 800`, absolute at 0,0, `overflow:visible`, `pointer-events:none`. Its `<defs>`:
- `linearGradient#gL` (userSpaceOnUse, x1 0, y1 0, x2 0, y2 260), stops:
  - 0 → `#e7a57b` @ .24
  - .45 → `#ef8a4d` @ .5
  - 1 → `#f27a37` @ .72
- `linearGradient#gG` (userSpaceOnUse, 0,20 → 0,260), stops:
  - 0 → `#c3d0e0` @ .07
  - 1 → `#c3d0e0` @ .32

The svg then holds two empty groups: `g#ringpaths[fill=none]` and `g#ringdots`. After the svg come `div#cards` and `div#deckhit` (`position:absolute; inset:0`).

### 3.3 Header rule
`div.rule#rule` — `position:absolute; left:0; right:0; height:2px; background:rgba(255,255,255,.28); transform-origin:0 0`.

### 3.4 Top-left group `.grp#g-tl`: logo
`a.logo[aria-label="Orbitals home"]`:
- Box: `left:25.9px; top:31.3px; width:142.4px; height:47.8px; border:3.3px solid #f6f7f7; color:#f6f7f7`.
- Inside, `span.tx` "ORBITALS":
  - Inline style: `left:40px; top:37px; font-size:37.225px; letter-spacing:7px; transform:scaleX(.7156)`.
  - CSS: Saira ExtraCondensed 800, `margin:-34.6px 0 0 -29.2px`.

### 3.5 Top-centre group `.grp#g-tc`: nav
`nav.nav#nav[aria-label=Primary]` with four `a.tx` links:
- Shared style: colour `#abafb4` → `#fff` on hover/focus (`transition:color .25s`), Saira ExtraCondensed 800, 25.467px, letter-spacing .3px, top 41px.
- Individual positions:
  - `#n1` "MISSION" — left 474, `scaleX(.782)`
  - `#n2` "RADAR" — left 574, `scaleX(.7714)`
  - `#n3` "DOCKS" — left 660, `scaleX(.8)`
  - `#n4` "UPLINK" — left 747, `scaleX(.7941)`

### 3.6 Top-right group `.grp#g-tr`: burger (mobile only)
`button.burger#burger[aria-controls=nav][aria-expanded=false][aria-label="Open menu"]` containing two `<i>`.

Box and ring (identical ring to the arrows, §3.7):
- `display:none`; `left:1196px; top:26.2px; 58×58; border-radius:50%`.
- `border:2.1px solid transparent`; `backdrop-filter:blur(8px)`.
- Background: `linear-gradient(rgba(2,3,6,.93),rgba(2,3,6,.93)) padding-box, conic-gradient(from 0deg, #e25a1f 0deg, #ec7534 38deg, #f0a878 66deg, #f2d6b8 92deg, #dfe0e3 135deg, #e9e4dc 178deg, #ea9f72 222deg, #eeb896 246deg, #e6bcc0 270deg, #b8a6e2 305deg, #b09ade 318deg, #dc6a34 346deg, #e25a1f 360deg) border-box`.

Bars and icon animation:
- The two `<i>` bars are 22×2.4px, `#eeeeee`, centred, at `translateY(∓4.6px)`.
- When `aria-expanded=true` they rotate to ±45°, with `transition:transform .6s cubic-bezier(.19,1,.22,1)`.
- `::after` extends the hit area to `inset:-9px`.

Also add `<i id="safe">`: fixed, invisible, with padding = `env(safe-area-inset-*)`.

### 3.7 Right group `.grp#g-r`: arrows
Two `button.arrow`, each `left:1176.6px`, 66.4×66.4, circle, with the same glass + conic ring as the burger. Arrows only: `transition:transform .25s cubic-bezier(.2,.7,.2,1)`, hover `scale(1.06)`, active `.94`.

- `.next` — top 357.9, `aria-label="Next map"`. SVG: viewBox `-12 -12 24 24`, 24px, centred, path `M-2.8 -4 L4.4 0 L-2.8 4Z` fill `#eeeeee`.
- `.prev` — top 437.6, `aria-label="Previous map"`. Path `M2.8 -4 L-4.4 0 L2.8 4Z`.

### 3.8 Bottom-left group `.grp#g-bl`: content block

Background elements:
- `.shade` — `inset:0; radial-gradient(ellipse 330px 190px at 260px 600px, rgba(6,12,22,.92) 0%, rgba(6,12,22,.75) 45%, rgba(6,12,22,0) 100%)`.
- `i.odot` — left 126.5, top 511.5, 20×20 circle, `#fa7a39`.
- `div.pill#pill` — left 203.5, top 509.5, height 24, width 118, radius 6, `background:rgba(206,214,232,.19)`, `backdrop-filter:blur(10px) saturate(1.1)`.

Text, each in its own mask (`.mask` spans the full 1280 width at left 0):

| mask | mask top / height | span | span style |
|---|---|---|---|
| `#m-top` | 500 / 40 | `span.tx.disp#t-top` "TOP" | left 156, top 4, 34.3px, letter-spacing .4, `scaleX(.75)` |
| `#m-tag` | 509.5 / 24 | `span.tx#t-tag` "STARVOYAGERS" | left 212, top 7.5, 12.8px, letter-spacing .291, DM Sans 500, `#fbfcff` |
| `#m-title` | 540 / 112 | `span.tx.disp#t-title` "DARK MOON" | left 126, top −7, 130px, letter-spacing 1.5, `scaleX(.6988)` |
| `#m-desc` | 652 / 40 | `span.tx.desc#t-desc` "DARK MOON IS A SKY PLATFORM BUILT FOR THE FAR, WITH SUPPORT FOR ORBITALS" | left 127, top 7, 12.6px, letter-spacing .475 |

`.desc` is `white-space:normal; width:318px; line-height:17px; font-weight:500; color:#f9faff`.

Button `a.btn#btn`:
- Box: left 125.7, top 708.6, 159.6×43.7, radius 12, `border:2px solid #f37a3e`, white background, text `#0b0b0b`.
- Hover `#fff3ea`; active `scale(.97)`; `transition:background .25s, transform .25s`.
- Label `span.tx` "ASCEND": `margin:-710.6px 0 0 -127.7px; left:180px; top:726px; font-size:12.8px; letter-spacing:.4px; font-weight:500`.

### 3.9 Bottom-right group `.grp#g-br`: thumbnails
- `a.see` — "SEE ALL MAPS": `span.tx.mono` at left 1020, top 666, 14px, letter-spacing .762, weight 500. Plus an SVG triangle (viewBox `0 0 8 9`, path `M0 0 L8 4.5 L0 9Z`, white) at left 1134.6, top 668.6, 7.4×9.
- `div#thumbs` — filled by JS.

`.thumb` styles:
- Box: top 696.7, 47×46.6, radius 6, `overflow:hidden`, `border:1px solid rgba(255,255,255,.5)`, `background-repeat:no-repeat`, `transition:border-color .3s`.
- `::after` — overlay `rgba(2,4,8,.12)`, hidden when `.is-focus`.
- States: `.is-focus` → `2px solid #f3f3f3`; `.is-active` → `2px solid #ef7b3c`.

### 3.10 Drag cursor
`div.dcur#dcur[aria-hidden]`:
- Fixed, 50×50, `margin:-25px 0 0 -25px`, circle, `background:#f47a3b`, `border:2.3px solid #fff`, `box-shadow:0 4px 18px rgba(0,0,0,.35)`, z-index 50.
- Initial state: `transform:translate3d(-100px,-100px,0) scale(0)`.
- Icon: SVG viewBox `0 0 26 12` (26×12, centred) with path `M0.5 6 L9 0.8 L9 11.2Z M25.5 6 L17 0.8 L17 11.2Z` in white.
- `.has-dcur #deck, .has-dcur #deckhit { cursor:none }`.

## 4. Carousel content (ring order)

```js
const DW=1280, DH=800, IW=1586, IH=992, CW=1000, CH=600, CM=48;
const MAPS=[
 {key:'tower',   label:'TOP',    tag:'STARVOYAGERS', title:'DARK MOON',  desc:'DARK MOON IS A SKY PLATFORM BUILT FOR THE FAR, WITH SUPPORT FOR ORBITALS'},
 {key:'habitat', label:'NEW',    tag:'FARSIDE WORKS',title:'IRON SPINE', desc:'IRON SPINE IS A PRESSURISED TRANSIT HUB LINKING THE FAR SIDE DOCKS TO ORBITALS'},
 {key:'crater',  label:'HOT',    tag:'SURVEY CORPS', title:'ASH SEA',    desc:'ASH SEA IS A CRATER FIELD MAPPED FOR LANDERS, WITH ROUTES LOGGED IN ORBITALS'},
 {key:'crescent',label:'RISING', tag:'DEEP FIELD',   title:'CRESCENT',   desc:'CRESCENT IS A HIGH ORBIT RELAY WATCHING THE DARK LIMB, ROUTED THROUGH ORBITALS'},
 {key:'dish',    label:'LIVE',   tag:'DEEP ARRAY',   title:'LONG EAR',   desc:'LONG EAR IS A LISTENING ARRAY PAST THE FAR SIDE, WITH UPLINK TO ORBITALS'}];
const THUMBS=[ // crop of each image inside the 47px thumb: background-size width, x, y offsets
 {key:'tower',size:80,x:-22.5,y:-1},{key:'habitat',size:138,x:-76,y:-19.7},{key:'crater',size:140,x:-74,y:-32},
 {key:'crescent',size:260,x:-198.8,y:-80.7},{key:'dish',size:90,x:0,y:-4.5}];
```

### 4.1 Slot keyframes
Values are design px for slots −3…3:
- `c` = card quad TL, TR, BR, BL.
- `m` = image quad.
- `bt` / `bb` = top/bottom edge bulge.
- `blur`, `br` = brightness.

```js
const S={
 '-3':{c:[-720,430,-440,408,-430,700,-710,722], m:[-900,380,-330,380,-330,736,-900,736], bt:3,bb:1,blur:3,  br:.7},
 '-2':{c:[-60,372,200,392,205,722,-50,728],       m:[-400,348,234,348,234,745,-400,745], bt:3,bb:1,blur:2.4,br:.8},
 '-1':{c:[-240,340,90,257,103,722,-230,745],      m:[-167.9,234.6,571.6,234.6,572,739.5,-167.5,739.5], bt:5,bb:1,blur:0,br:.9},
 '0': {c:[155,237,990,137,1067,640,172,722],      m:[140.5,185.5,1039.2,148.8,1070.6,721,145.8,755.9], bt:15,bb:2,blur:0,br:.9},
 '1': {c:[1067,137,1560,186,1575,558,1142,637],   m:[1051.9,130.4,1886,148.7,1886.2,647.3,1067.4,714], bt:6,bb:2,blur:0,br:.9},
 '2': {c:[930,300,1330,250,1340,600,940,660],     m:[900,290,1540,290,1540,690,900,690], bt:3,bb:1,blur:.8,br:.85},
 '3': {c:[1440,300,1820,262,1830,570,1450,612],   m:[1400,240,2000,240,2000,615,1400,615], bt:3,bb:1,blur:3,br:.7}};
```

**Slot interpolation.** `slotAt(k)` clamps k to [−3, 3] and interpolates every value with Catmull-Rom (`cr(p0,p1,p2,p3,t) = .5*((2p1)+(−p0+p2)t+(2p0−5p1+4p2−p3)t²+(−p0+3p1−3p2+p3)t³)`) between neighbouring slots. Neighbour indices are clamped at the ends.

**Projective maths.**
- `sq2q(quad)` returns the standard unit-square → quad homography (3×3).
- `rect2q(w,h,q)` divides its columns by w and h.
- `m3d(m)` → `matrix3d(m0,m3,0,m6, m1,m4,0,m7, 0,0,1,0, m2,m5,0,m8)`.

**Card DOM** (per MAP, appended to `#cards`):
1. `div.slab > i` — `i` is 1000×600, `#000103`.
2. `div.card > div.shape > div.img`:
   - `.card` / `.slab`: 0×0, `transform-origin:0 0`, `will-change:transform`, `pointer-events:none`.
   - `.shape`: `top:-48px; height:696px; width:1000px; background:#020304; overflow:hidden`.
   - `.img`: `top:48px; width:1586px; height:992px; transform-origin:0 0; background-size:100% 100%; background-image:var(--i-KEY)`.

**`renderCards(pos)`**, for each card i:
- Position and paint:
  - `k = wrap(i − pos)`, where `wrap(k) = ((((k+N/2)%N)+N)%N) − N/2`, and `ak = |k|`.
  - `Hc = rect2q(1000,600,sl.c)` → `card.style.transform = m3d(Hc)`.
  - `.img` transform = `m3d(inv(Hc)·rect2q(1586,992,sl.m))`.
  - `opacity = 1 − smoothstep(2.05, 2.5, ak)`; `zIndex = 100 − round(ak·10)`; set `visibility:hidden` below .002.
- Bulge, brightness and blur:
  - Screen-to-local factors: `fy = 600 / (avg left/right edge length of sl.c)`, `fx = 1000 / max(1, top edge length)`.
  - `.shape` clip-path: a polygon of 19 points along the top edge at `y = 48 − bt·fy·sin(πt)` for t=0…1, then back along the bottom at `y = 648 + bb·fy·sin(πt)` (x = t·1000). Cache it.
  - `.shape` filter: `brightness(br)`, plus `blur(blur·fx px)` when blur > .05.
- Slab (dark shadow under the card):
  - `P(u,v)` = bilinear point on quad c.
  - Corners `a = P(.615,.2)`, `b = (TRx, TRy+60)`, `c = (BRx+2, BRy+32)`, `d = P(.615,1) + (0,31)`.
  - Transform = `m3d(rect2q(1000,600,[a,b,c,d]))`; `zIndex = z−1`; `opacity = clamp(1 − ak·1.4, 0, 1)·op`.

### 4.2 Orbit rings
Built into `#ringpaths` / `#ringdots`. `arcPath(cx,cy,r,a0,a1)` = SVG arc between the angles (degrees, y-down), with the large-arc flag set when the span exceeds 180°.

1. Faded arc: `arcPath(335.4,250,305.3,178.1,236.5)`, stroke `url(#gL)`, width 1.6.
2. Orange sweep: a Catmull-Rom → cubic-Bézier spline through these points, stroke `#f27a38`, width 1.5, stroke-opacity .62:
   `[27.5,261],[95,333.3],[163.3,380],[300,478],[460,598],[639.5,687.5],[664,705.5],[695.5,725],[720,737],[752,749],[782,759],[811.5,766],[834,770],[879,774],[914,775],[968.5,771],[991,767],[1016,757],[1058,749],[1090.5,739],[1140,722],[1183,699],[1265,620],[1300,572]`
   (control points: `p1 ± (p2−p0)/6`).
3. Arcs:
```js
const RINGS=[
 {c:[418.4,279.7,390.3], a:[-181,-133], st:'url(#gG)', w:1.1, d:'4 4.6'},
 {c:[556.5,297.9,432.7], a:[-192,-19],  st:'rgba(196,210,228,.27)', w:1.2},
 {c:[551.7,324.4,365.5], a:[-172,-108], st:'#f0793a', w:1.5, o:.55, dot:{a:-138.4,t:'o'}},
 {c:[631.5,364.4,419.7], a:[-168,-34],  st:'rgba(205,218,236,.19)', w:1.3, d:'6.2 3.9'},
 {c:[607.2,341.5,358.6], a:[-168,-33],  st:'rgba(205,218,236,.25)', w:1.35},
 {c:[571.8,337.7,268.8], a:[-160,-43.5],st:'rgba(205,218,236,.29)', w:1.35, dot:{a:-143.3,t:'w'}},
 {c:[936.3,323.4,473.6], a:[36,96],     st:'rgba(214,224,238,.26)', w:1.4, d:'7 5.6'},
 {c:[956.9,9.2,723],     a:[95,113],    st:'rgba(214,224,238,.25)', w:1.3, d:'6 5', dot:{a:95.7,t:'p'}}];
```
   Each ring's stroke is `st`, width `w`, dash array `d`, stroke-opacity `o`.
4. Dots (r 6.4, stroke-width 1.4):
   - `o` = fill `rgba(150,138,126,.42)`, stroke `#dc7a45`
   - `w` = fill `rgba(135,160,190,.42)`, stroke `#c9d4e2`
   - `p` = fill `#b98b6c`, stroke `#e58c57`
   - Extra orbit dot on the orange spline: fill `rgba(150,130,112,.45)`, stroke `#e0773f`.
   - `renderDots(pos)`:
     - Each ring dot sits at angle `a0 + pos·5.5°` on its circle.
     - The spline dot sits at length `(ORB0 − pos·38) mod L`, where ORB0 is the path length closest to point (1183,699).
   - `#ringdots circle { transform-box:fill-box; transform-origin:center }`.

### 4.3 Thumbnails
Five `button.thumb`, one per THUMBS entry:
- `left: 870.6 + i·56.2 px`; `aria-label "Show <title>"`.
- Background: `var(--i-KEY)`, `background-size: <size>px auto`, `background-position: <x>px <y>px`.
- Focus state:
  - Initial `.is-focus` on index 4.
  - `pointerenter` moves `.is-focus`.
  - Click → `goTo` that map.
- `.is-active` marks the current map.

## 5. Video plates

Add this after `const N=MAPS.length`:

```js
const VIDEO={ bg:'…25a64166….mp4', tower:'…c9fcd901….mp4', habitat:'…f26c235a….mp4', crater:'…e7e301c9….mp4', crescent:'…35a8953d….mp4', dish:'…16d316a2….mp4' }; // full URLs from §1
const STILL=matchMedia('(prefers-reduced-motion: reduce)').matches;   // reduced motion keeps the stills
function plate(el,key){ if(STILL)return; const v=document.createElement('video');
  v.muted=v.loop=v.autoplay=v.playsInline=true; v.preload='auto';
  v.setAttribute('muted',''); v.setAttribute('playsinline',''); v.setAttribute('aria-hidden','true');
  v.src=VIDEO[key]; el.appendChild(v); }
plate(document.querySelector('#scene .bg'),'bg');   // and plate(card .img, mp.key) right after each card is appended
```

- CSS: `#scene .bg video, .card .img video { position:absolute; left:0; top:0; width:100%; height:100%; object-fit:fill; display:block; pointer-events:none }`.
- **Thumbnails must not get their own `<video>`** (11 decoders stall browsers).
  - Instead, append to each thumb a `<canvas width=141 height=140 aria-hidden>` styled `position:absolute; inset:0; width:100%; height:100%`.
  - Every animation frame, if the matching card video has `readyState ≥ 2` and a new `currentTime`: clear the canvas and `drawImage(video, x·k, y·k, size·k, size·992/1586·k)`, where `k = canvas.width / canvas.clientWidth`.
- Playback kick, after the first render:
  - `kick()` calls `play()` (swallowing rejections) on every paused video.
  - Call it immediately, on each video's first `canplay`, on `visibilitychange` when the page becomes visible, and once on the first `pointerdown` / `touchstart` / `keydown` / `wheel`.

## 6. Text transitions

- On load, store each text span's original inline style (`BASE`).
- `swap(key,text,dir)`:
  1. Clone the current span with the new text, starting at `translateY(dir·105%)` (no transition). Reflow.
  2. Give the clone transition-delay: top/tag .04s, title .08s, desc .14s. Animate it to `BASE transform + translateY(0)`.
  3. Send the old span to `translateY(−dir·105%)`, opacity 0. Remove it after 900 ms. Move the id to the clone.
- `showText(idx,dir)`:
  - Swaps top/label, tag, title and desc.
  - Resizes the pill:
    - On first run, record `pillExtra = 118 − tagWidth`, `pillGap = 203.5 − (topLeft + topWidth)`, `TAGOFF = tagLeft − 203.5`.
    - Then `pill.left = topRight + pillGap`, `pill.width = tagWidth + pillExtra`, `tag.left = pill.left + TAGOFF`.
  - Toggles `.is-active` on the matching thumb.
  - The pill is also sized once after `document.fonts.ready`.

## 7. Motion and interaction

State: `pos`, `target`. Per frame (rAF):
- `pos = lerp(pos, target, 1 − e^(−rate·dt))`, with `rate` 11 while dragging, 5.2 otherwise, and `dt ≤ 64 ms`. Snap to target below 1e−4.
- Render cards and dots only when `pos` changed.
- With reduced motion and no drag, `pos = target` immediately.

**Current map.** `commit()` shows the text of `round(target) mod N`, with direction `sign(target − pos)`. `goTo(idx)` travels the shortest way round the ring.

**Drag** (on `#deckhit`, pointer capture, left button only):
- `SPAN = 560`: `target = startPos − dx / (560·deckScale)`.
- Track velocity: `vel = lerp(vel, dx/dt, .35)` px/ms.
- On release, with `flick = −vel / (560·deckScale)·260`:
  - Moved < 6 px (a click): x in design px < 150 → −1; x > 1070 → +1; otherwise stay.
  - `|delta + flick| < .12`: snap back.
  - Otherwise advance `sign(delta+flick) · max(1, round(|delta + flick·.5|))`.
- `#app.is-dragging` is set while dragging.

**Other inputs:**
- Arrows: next = +1, prev = −1.
- ArrowRight / ArrowLeft keys.
- Wheel: dominant axis, |d| > 12, 650 ms lock.
- All `a[href="#"]` call `preventDefault`.

**Drag cursor** (only on `(pointer:fine)`, adds `.has-dcur`):
- Follows the pointer with lerp rate 28.
- Scale lerps (rate 16) to 1 over `#deckhit` below the header line, else 0.
- Press scale .86 (lerp 20).
- While dragging, rotate by `clamp(vel·6, −14, 14)` degrees.
- Size `50·clamp(U, .75, 1.6)`.

## 8. Layout engine

`place(el,s,ax,ay,vx,vy)` sets `translate(vx − ax·s, vy − ay·s) scale(s)`.

On every resize, with `cover = max(vw/1280, vh/800)`, `contain = min(…)`, and `U = min(cover, max(contain, min(vw/900, vh/560)))`, pick the mode from `--arch`:

**Desktop:**
- Scene and deck: `place(…, cover, 640, 400, vw/2, vh/2)`.
- Groups, all at scale U:
  - tl → (0,0)
  - tc: anchor (640,0) → (vw/2, 0)
  - tr: anchor (1280,0) → (vw, 0)
  - r: anchor (1280,400) → (vw, vh/2)
  - bl: anchor (0,800) → (0, vh)
  - br: anchor (1280,800) → (vw, vh)
- Rule: top `99·U`, height `2·U`. `headerY = 101·U`.

**Tablet** — `@media (max-aspect-ratio:32/25) and (min-width:680px)`, `--arch:tablet`:
- Scales and card frame:
  - `T = clamp(min(vw/786, vh/800), .8, 1.35)`; `header = 101T`; `gap = 36T`; `textTop = vh − 291T`.
  - `ds = min((vw − 160T)/912, (vh − 215T)/585)`.
  - `cardTop = header + gap + max(0, (textTop − gap − header − gap − 585ds)/2)`.
  - `cardLeft = 48T + max(0, (vw − 160T − 912ds)/2)`.
  - Deck at scale ds, positioned so design point (155,137) lands on (cardLeft, cardTop).
- Group placement:
  - Nav anchor (640,0) at `x = min(max(vw/2, 381T), vw − 204T)`.
  - Arrows: anchor (1280,431) → (vw, `cardTop + 293ds`).
  - Content: anchor (126,800) → (`min(max(26T, cardLeft − 29T), vw − 760.4T)`, vh).
  - Thumbs: bottom-right corner.
- Rings: `#rings { top:-360px; height:1520px; mask-image:linear-gradient(#0000 290px, #000 360px, #000 1130px, #0000 1170px) }`.

**Mobile:**
- `stack` — `(max-aspect-ratio:32/25) and (max-width:679.98px)`.
- `split` — `(min-aspect-ratio:1281/1000) and (max-height:447.98px)`.
- Both: the same ring mask, the burger visible, and the nav becomes a fixed full-screen menu:
  - Backdrop: `rgba(3,6,11,.8)`, `blur(18px) saturate(1.1)`, opacity .45 s.
  - Links stacked at `font-size:var(--menu-fs)` with `1px rgba(255,255,255,.2)` separators.
  - Links rise from `translateY(.6em)`, staggered .05 s.
  - Focus is trapped (burger + links); Esc closes; tapping outside closes.
- Scales and spacing, with m = margin, M = interface scale, h = header scale:
  - Margin: split `clamp(w·.035, 14, 24)`; stack `clamp(w·.05, 16, 28)`.
  - `M`: split `clamp(min(h/430, w/940), .86, 1.1)`; stack `clamp((w − 2m)/TITLE_W, .8, 1.2)`.
    - TITLE_W = widest title × its scaleX, + 4.
  - `h`: split `clamp(M·.62, .5, .7)`; stack `clamp(M·.7, .56, .8)`.
- Header:
  - Logo placed from anchor (25.9,31.3).
  - Burger from anchor (1254,55.2).
  - Rule under the header.
  - Menu variables: `--menu-top`, `--menu-x`, and `--menu-fs = clamp(min(vw·.11, (vh − header)·.105), 26, 56)`.
- Stack layout:
  - Thumbs at the bottom-right.
  - Content block above them.
  - Card between the header and the content, ds fitted to width minus a 44 px arrow "peek".
  - Arrows at scale 46/66.4, on the peek strip.
- Split layout: content column left, card right, CTA on the thumbnail row.

## 9. Entrance (plays once)

**`intro.js` in `<head>`:** if WAAPI is available and reduced motion is off, add `intro-pending` to `<html>`, with a 2.5 s failsafe that removes it unless `window.__orbitalsIntro` is set.
- CSS: `.intro-pending #deck, .intro-pending .grp, .intro-pending #rule { opacity:0 }`.
- The background never animates.

**Start** once fonts are ready and the tower image has decoded (max 1.5 s wait), the tab is visible, then 1 rAF.
- All tweens use `fill:'backwards'`.
- Transforms use `composite:'add'`.

Easings:
- `EXPO = cubic-bezier(.19,1,.22,1)`
- `WIPE = cubic-bezier(.55,0,.1,1)`
- `DRAW = cubic-bezier(.45,0,.15,1)`
- `SETTLE = cubic-bezier(.22,1,.36,1)`

Timeline:

| t (s) | element | animation |
|---|---|---|
| .05 | rule | scaleX 0→1, 1.1 s WIPE |
| .1 | logo | clip `inset(0 100% 0 0)`→`inset(0 0 0 0)`, .9 s WIPE |
| .35 | burger | iris: clip `circle(0%)`→`circle(71%)`, .7 s SETTLE, plus fade |
| .1 + n·.07 | rings, order `[7,6,5,4,3,2,0,1,8,9]` | dashed: opacity 0 + dashoffset 40 → 0, 1.4 s DRAW. Solid: dasharray L, dashoffset L→0, 1.6 s DRAW |
| .2 | main card | `.shape` clip from "top edge folded onto bottom edge" → its curved clip, 1.05 s WIPE. `.img` adds `scale(1.08)→1` around (793,496), 1.5 s SETTLE |
| .44 + (ak−1)·.12 | neighbour cards | same, .9 s wipe / 1.3 s settle |
| .34 + k·.05 | nav links (not on mobile) | rise 10 px + fade, .8 s EXPO |
| .44 | `.shade` | fade 1.0 s |
| .56 | `.odot` | iris .6 s |
| .60 | TOP label | roll: translate from below its mask, .8 s EXPO |
| .64 | pill | clip `inset(0 100% 0 0 round 6px)`→full, .7 s WIPE |
| .72 | tag | roll .7 s |
| .64 | title | roll 1.0 s |
| .84 | desc | roll .9 s |
| .96 | CTA | rise 14 px, .8 s EXPO |
| .96 | main card's slab | fade .6 s |
| 1.02 + k·.08 | arrows | iris .8 s |
| 1.08 | "see all" | rise 8 px, .7 s |
| 1.12 + k·.05 | thumbs | rise 12 px, .7 s |
| 1.2 + k·.06 | ring dots | `scale(.4)`→1, .6 s SETTLE |

- In the same frame the tweens start, remove `intro-pending`.
- Any `pointerdown` / `keydown` / `wheel` finishes all tweens at once.
- When all tweens finish: cancel them, then toggle `#rings` `display:none` → `''` once to force a clean repaint.

## 10. Final check

At 1440×900 in Chrome:
- **Header:** outlined "ORBITALS" logo top-left, grey condensed nav centred, a hairline under the header.
- **Carousel:** a large perspective-warped main card (tower video) with a curved top edge. The habitat card is on the right under the two round gradient-ring arrows. The dish and crescent cards are dimmer and blurred on the left.
- **Rings:** orange and blue-grey orbit arcs with dots sweep across the scene.
- **Content block, bottom-left:** orange dot, "TOP", frosted pill "STARVOYAGERS", a huge condensed "DARK MOON", two lines of copy, and a white "ASCEND" button with an orange border.
- **Bottom-right:** "SEE ALL MAPS ▸" and five 47 px animated thumbnails.
- **Motion:** every image moves (meteors, rover, steam, dust, moon, dish). Dragging swaps the cards smoothly with an orange drag cursor.
