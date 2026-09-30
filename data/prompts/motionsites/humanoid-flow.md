# Humanoid Flow

> **Source:** Framesbase (MCP)  
> **Type:** sites  
> **Category:** Web3  
> **Deliverable:** prompt  
> **Opened via:** framesbase MCP on 2026-09-30

---

Build a single, self-contained, production-quality HTML landing page for a fictional
blockchain-infrastructure product called "BridgeFlow". Everything (HTML, CSS, JS) must live
in ONE .html file — no build step, no frameworks, no local asset files. All media is loaded
from the remote CloudFront URLs listed below, used exactly as written.

════════════════════════════════════════════════════════════════════════
0. EXACT MEDIA URLS — use verbatim, do not substitute or re-host
════════════════════════════════════════════════════════════════════════
HERO VIDEO (mouse-scrubbed, 4.04s, H.264 all-intra, 1600x900):
https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/912ac054-b803-49a0-aca6-1a36a128d2bc.mp4

HERO POSTER (generated first frame):
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260921_214656_0e2b6820-5209-47dd-9430-8dd91ed26e44.png

SECTION-2 VIDEO (scroll-scrubbed, 6.04s, H.264 all-intra, 1600x900):
https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b3474ab5-b135-413a-95c8-5671713f62b2.mp4

SECTION-2 POSTER:
https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/3ff7592e-f403-4e84-9ec0-dc90c5ba79ca.jpg

SECTION-3 CARD 1 IMAGE (cyan wireframe globe, upper-right, royal-blue bg):
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260921_201617_7f35a86e-8900-44c6-8714-e28a332ca548.png

SECTION-3 CARD 2 IMAGE (particle sphere with orbital trails, centred):
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260921_201618_d8210fb1-0933-43af-8c0a-7f776df144a8.png

SECTION-3 CARD 3 IMAGE (cyan diamond in a swirling vortex ring):
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260921_201617_a48ec584-1106-4925-a9d3-3eb53158b87c.png

Both videos are already encoded ALL-INTRA (every frame a keyframe) with +faststart so that
random seeking costs ~8ms. Do NOT re-encode, proxy, or wrap them.

════════════════════════════════════════════════════════════════════════
1. GLOBAL SETUP
════════════════════════════════════════════════════════════════════════
<title>BridgeFlow — Connect every blockchain with one</title>
Meta description: "BridgeFlow unifies transactions, balances, events and smart contracts
across chains — with a single, reliable developer stack."
Viewport: width=device-width, initial-scale=1, viewport-fit=cover

FONT — Geist from Google Fonts, preconnect to fonts.googleapis.com and fonts.gstatic.com:
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
body font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
body: margin 0; background #ffffff; color #0b0b0d; font-weight 400;
      -webkit-font-smoothing antialiased; -moz-osx-font-smoothing grayscale; overflow-x hidden
Reset: *,*::before,*::after{box-sizing:border-box}; html{-webkit-text-size-adjust:100%}
       img,video{display:block;max-width:100%}; a{color:inherit;text-decoration:none}
       button{font:inherit;color:inherit;border:0;background:none;cursor:pointer}

CSS CUSTOM PROPERTIES on :root
  --blue:#4e78fb;  --blue-deep:#3f68f2;  --blue-soft:#7ba6f5;
  --ink:#0b0b0d;  --ink-2:#141a26;  --page:#ffffff;
  --page-gap:clamp(10px,1.25vw,18px);
  --radius:clamp(18px,1.9vw,28px);
  --gutter:clamp(22px,5.7vw,82px);
  --hero-pad:clamp(22px,4.5vw,65px);
  --nav-h:clamp(48px,4vw,57px);
  --ease-out-expo:cubic-bezier(.16,1,.3,1);
  --rev-dur:.95s;

The page is white; each dark section is an inset rounded card with --page-gap margin.

════════════════════════════════════════════════════════════════════════
2. REVEAL SYSTEM (staggered scroll-in, used page-wide)
════════════════════════════════════════════════════════════════════════
[data-anim]{
  opacity:0;
  transform:translate3d(0,var(--ry,30px),0) scale(var(--rs,1));
  filter:blur(var(--rb,10px));
  transition:opacity var(--rev-dur) var(--ease-out-expo) var(--d,0ms),
             transform var(--rev-dur) var(--ease-out-expo) var(--d,0ms),
             filter var(--rev-dur) var(--ease-out-expo) var(--d,0ms);
}
[data-anim].is-in{opacity:1;transform:none;filter:blur(0)}
[data-anim="fade"]{--ry:0px;--rb:6px}
[data-anim="card"]{--ry:46px;--rs:.965;--rb:12px}
[data-anim="rise"]{--ry:.24em;--rb:14px}
[data-anim="pop"]{--ry:14px;--rs:.7;--rb:4px}

JS: one IntersectionObserver, threshold 0.12, rootMargin "0px 0px -7% 0px". On intersect add
.is-in, unobserve, and after 1600ms set el.style.willChange="auto". Before observing, set
willChange="opacity, transform, filter". If prefers-reduced-motion or no IntersectionObserver,
immediately add .is-in to every node.

Per-element delays via inline style="--d:Nms" (exact values in the sections below).

════════════════════════════════════════════════════════════════════════
3. NAVBAR — fixed centred pill with backdrop blur
════════════════════════════════════════════════════════════════════════
.nav: position fixed; top clamp(12px,2.6vh,30px); left 50%; transform translateX(-50%);
  z-index 100; display flex; align-items center; gap clamp(10px,1.5vw,22px);
  height var(--nav-h); padding-left/right clamp(9px,0.8vw,11px); border-radius 999px;
  border 1px solid rgba(255,255,255,.26); background rgba(0,0,0,.30);
  backdrop-filter + -webkit-backdrop-filter: blur(22px) saturate(160%);
  box-shadow 0 8px 34px rgba(8,12,28,.16); max-width calc(100vw - 24px);
  animation: navIn 1s var(--ease-out-expo) both;
  transition: border-radius .45s var(--ease-out-expo), background .45s ease;

@keyframes navIn{
  from{opacity:0;transform:translateX(-50%) translateY(-22px);filter:blur(9px)}
  to  {opacity:1;transform:translateX(-50%) translateY(0);filter:blur(0)}
}
(The keyframe MUST carry translateX(-50%) in both stops or the pill jumps off-centre.)

.nav.is-open{border-radius:26px;background:rgba(0,0,0,.42)}

Because the pill has a semi-transparent DARK background over a backdrop blur, it reads near-black
over the dark hero and light grey over the white section 3 — this is intended, do not add
scroll-based colour switching.

CONTENTS (in order): logo, link list, "Free trial" pill, burger button.

LOGO — inline SVG, 36x36 viewBox, width clamp(32px,2.6vw,37px), aspect-ratio 1:
  <rect x="1.4" y="1.4" width="33.2" height="33.2" rx="10" stroke="#fff" stroke-width="2.1"/>
  <path d="M14.2 10.6h5.4a3.5 3.5 0 0 1 0 7h-5.4m0-7-2.6 2.3m2.6-2.3v14.8h6.3a3.7 3.7 0 0 0 0-7.5h-6.3"
        stroke="#fff" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>

LINKS (.nav__links, display flex, gap clamp(12px,1.45vw,21px)):
  About us | How it works (#problems) | Features (#works) | Cases | Pricing
  font-size clamp(13px,1.04vw,15px); color rgba(255,255,255,.92); letter-spacing -.005em;
  white-space nowrap; transition color .22s ease; hover -> #fff

.nav__cta "Free trial": display grid, place-items center, height clamp(32px,2.6vw,37px),
  padding 0 clamp(13px,1.2vw,17px), border-radius 999px, background #fff, color #0e0e11,
  font-size clamp(13px,1.04vw,15px); hover: translateY(-1px) + 0 6px 18px rgba(255,255,255,.22)

BURGER -> X MORPH (.nav__burger, display none by default; grid at <=860px):
  34x34, border-radius 999px, transition background .3s; hover background rgba(255,255,255,.1)
  span: 17px x 1.7px, background #fff, border-radius 2px, position relative,
        transition background .2s ease .16s
  span::before / ::after: same 17x1.7 bars at top -5px / +5px, background #fff,
        transition transform .44s var(--ease-out-expo), width .44s var(--ease-out-expo)
  .nav.is-open span{background:transparent;transition-delay:0s}
  .nav.is-open span::before{transform:translateY(5px) rotate(45deg)}
  .nav.is-open span::after {transform:translateY(-5px) rotate(-45deg)}

MOBILE SHEET — CRITICAL STRUCTURAL REQUIREMENT:
  .nav__sheet must be a SIBLING of <nav>, placed directly after </nav> in the body — NOT a
  child. An element that already has backdrop-filter becomes a backdrop root, so a nested
  backdrop-filter has nothing left to sample and renders completely unblurred. As a sibling
  it blurs the page correctly.

  .nav__sheet{
    position:fixed; z-index:99;
    top:calc(clamp(12px,2.6vh,30px) + var(--nav-h) + 10px);
    left:50%; width:min(calc(100vw - 28px),320px);
    padding:10px 18px 14px; border-radius:24px;
    border:1px solid rgba(255,255,255,.22); background:rgba(0,0,0,.52);
    backdrop-filter:blur(26px) saturate(170%);
    box-shadow:0 22px 60px rgba(4,8,22,.45);
    display:flex; flex-direction:column; transform-origin:50% 0;
    opacity:0; visibility:hidden;
    transform:translateX(-50%) translateY(-14px) scale(.93);
    filter:blur(10px);
    transition:opacity .46s var(--ease-out-expo),
               transform .46s var(--ease-out-expo),
               filter .46s var(--ease-out-expo),
               visibility 0s linear .46s;
  }
  body.menu-open .nav__sheet{
    opacity:1; visibility:visible;
    transform:translateX(-50%) translateY(0) scale(1);
    filter:blur(0); transition-delay:0s,0s,0s,0s;
  }
  .nav__sheet a{
    font-size:16.5px; letter-spacing:-.012em; color:rgba(255,255,255,.92);
    padding:11px 2px; border-bottom:1px solid rgba(255,255,255,.07);
    opacity:0; transform:translateY(12px);
    transition:opacity .55s var(--ease-out-expo), transform .55s var(--ease-out-expo), color .2s ease;
  }
  .nav__sheet a:last-child{border-bottom:0}
  body.menu-open .nav__sheet a{opacity:1;transform:none}
  Per-link cascade delays: nth-child(1) .10s, (2) .15s, (3) .20s, (4) .25s, (5) .30s
  (written as transition-delay:.10s,.10s,0s etc.)

  Sheet contains the same 5 links.
  Burger markup: <button class="nav__burger" id="burger" aria-label="Open menu"
                 aria-expanded="false" aria-controls="sheet"><span></span></button>

MENU JS:
  menuIsOpen() = document.body.classList.contains("menu-open")
  setMenu(open): toggle "menu-open" on body (drives the sheet) AND "is-open" on nav (drives the
    burger->X), set aria-expanded, set aria-label to "Close menu"/"Open menu".
  Close on: link click inside sheet; click outside BOTH nav and sheet; Escape keydown;
    scroll of more than 28px while open (track lastY, passive listener); resize above 860px.
  Burger click calls e.stopPropagation() then setMenu(!menuIsOpen()).

════════════════════════════════════════════════════════════════════════
4. SECTION 1 — HERO (mouse-scrubbed video card)
════════════════════════════════════════════════════════════════════════
<header class="hero" id="hero"> containing, in order:
  .hero__media > <video id="heroVideo" muted playsinline preload="auto" disablepictureinpicture
                  poster="[HERO POSTER]" src="[HERO VIDEO]">
  .hero__scrim
  .hero__inner (h1 + .hero__right)
  .hero__wordmark

.hero{position:relative; margin:var(--page-gap);
  height:calc(100svh - (var(--page-gap) * 2)); min-height:540px;
  border-radius:var(--radius); overflow:hidden; background:#03060f; isolation:isolate}
.hero__media{position:absolute;inset:0;z-index:0}
.hero__media video{position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;object-position:center 42%}
.hero__scrim{position:absolute;inset:0;z-index:2;pointer-events:none;background:
  linear-gradient(to bottom, rgba(3,6,15,.72) 0%, rgba(3,6,15,.18) 22%, rgba(3,6,15,0) 40%),
  linear-gradient(to top,   rgba(3,6,15,.55) 0%, rgba(3,6,15,0) 34%),
  radial-gradient(120% 80% at 50% 45%, rgba(3,6,15,0) 40%, rgba(3,6,15,.45) 100%)}
.hero__inner{position:relative;z-index:3;height:100%;
  padding:calc(var(--nav-h) + clamp(54px,9.5vh,112px)) var(--hero-pad) 0;
  display:grid; grid-template-columns:minmax(0,1fr) minmax(0,.46fr);
  gap:clamp(18px,3vw,40px); align-content:start; pointer-events:none}
.hero__inner a,.hero__inner button{pointer-events:auto}

h1 (attribute data-reveal, NOT data-anim):
  text "Connect every blockchain with one"
  font-size clamp(32px,4.9vw,72px); font-weight 400; line-height .98;
  letter-spacing -.033em; color #fff; max-width 11ch; margin 0

.hero__right{padding-top:clamp(4px,1.4vh,10px)}
  <p data-anim="up" style="--d:420ms">BridgeFlow unifies transactions, balances, events and
  smart contracts across chains — with a single, reliable developer stack.</p>
    margin 0 0 clamp(16px,2.2vw,26px); font-size clamp(13.5px,1.06vw,15.5px);
    line-height 1.62; letter-spacing -.004em; color rgba(255,255,255,.74); max-width 34ch
  <a class="btn" href="#" data-anim="up" style="--d:540ms">Get free trial</a>

.btn{display:inline-grid;place-items:center;height:clamp(36px,2.9vw,41px);
  padding:0 clamp(16px,1.5vw,22px);border-radius:999px;background:var(--blue);color:#fff;
  font-size:clamp(13px,1.04vw,15px);letter-spacing:-.005em;white-space:nowrap;
  transition:transform .24s cubic-bezier(.22,1,.36,1),box-shadow .24s ease,background .24s ease}
.btn:hover{transform:translateY(-2px);background:var(--blue-deep);
  box-shadow:0 10px 28px rgba(78,120,251,.4)}

WORDMARK — <p class="hero__wordmark" data-anim="rise" style="--d:260ms">BridgeFlow</p>
  position:absolute; left:0; right:0; text-align:center;   <-- centre with left/right +
  bottom:clamp(2px,.35vw,6px); z-index:3; margin:0;             text-align, NEVER with
  font-size:clamp(68px,18.6vw,276px);                           translateX(-50%), because the
  font-weight:400; line-height:.82; letter-spacing:-.045em;     reveal animation owns `transform`
  color:#fff; white-space:nowrap; pointer-events:none; user-select:none
  (In Geist this renders at ~90% of the card width: 1264px text inside a 1404px card at
   1440px viewport, ~70px side margin. Geist is narrower than most grotesques — if you
   substitute a font, re-measure so it does not overflow.)

HEADLINE CHARACTER REVEAL (JS):
  Split h1 textContent on whitespace. Wrap EACH WORD in <span class="reveal-word"> (which is
  display:inline-block;white-space:nowrap) so a word can never break mid-word, then wrap each
  character in <span class="reveal-char"> with inline animationDelay = (120 + index*22) + "ms",
  where index counts characters across the whole headline. Re-insert a plain space text node
  between words. Skip entirely if prefers-reduced-motion.
  .reveal-char{display:inline-block;opacity:0;transform:translateY(.42em);filter:blur(7px);
    animation:charIn .78s cubic-bezier(.22,1,.36,1) forwards}
  @keyframes charIn{to{opacity:1;transform:none;filter:blur(0)}}

HERO MOUSE-SCRUB BEHAVIOUR (the centrepiece):
  The video is never played. It stays paused and JS drives currentTime from the cursor's
  horizontal position over the hero:
    mouse at the RIGHT edge  -> t = 0            (figure faces right)
    mouse at the CENTRE      -> t = duration/2
    mouse at the LEFT edge   -> t = duration     (figure faces left)
  Moving left plays forward; moving right plays it backward.

  Implementation:
  - finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches
  - On loadedmetadata/loadeddata/canplay (and immediately if readyState>=1): capture duration,
    video.pause(), set currentTime = 0.001, start the rAF loop.
  - Listener on "play" re-pauses if finePointer.
  - pointermove (passive) over .hero: x = clamp((e.clientX - rect.left)/rect.width, 0, 1);
    target = (1 - x) * (duration - 0.04)
  - pointerleave (passive) resets target = 0
  - rAF loop, frame-rate independent smoothing:
      dt = min((now-last)/1000, 0.05)
      k = 1 - Math.pow(0.0009, dt)
      current += (target - current) * k
      if (video.readyState >= 2 && !video.seeking && Math.abs(video.currentTime - current) > 0.012)
        video.currentTime = current      // 12ms deadband prevents seek thrash
  - Touch / coarse pointer fallback (and not reduced motion): drive target automatically with
    an eased ping-pong over the same timeline:
      autoT += dt;  e = 0.5 - 0.5*Math.cos(autoT * 0.62);  target = e * (duration - 0.04)
  - IntersectionObserver (threshold 0) on .hero pauses the rAF loop when off-screen and
    restarts it when visible.

════════════════════════════════════════════════════════════════════════
5. SECTION 2 — STICKY CARD STACK over a SCROLL-SCRUBBED video
════════════════════════════════════════════════════════════════════════
<section class="problems" id="problems">
  .problems__sticky > .problems__card#problemsCard containing:
     <video id="problemsVideo" muted playsinline preload="auto" disablepictureinpicture
            poster="[S2 POSTER]" src="[S2 VIDEO]">   <-- NO loop attribute
     .problems__scrim
     .problems__copy (h2 + p.solve)
     .stack#stack (4 .stack__card articles)

.problems{position:relative;height:460vh;margin-top:clamp(28px,5vw,64px)}
.problems__sticky{position:sticky;top:0;height:100svh;display:grid;place-items:center;
  padding:var(--page-gap)}
.problems__card{position:relative;width:100%;height:100%;border-radius:var(--radius);
  overflow:hidden;background:#02040c;transform-origin:50% 50%;will-change:transform;
  isolation:isolate}
.problems__card video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.problems__scrim{position:absolute;inset:0;z-index:1;pointer-events:none;background:
  linear-gradient(to bottom, rgba(2,4,12,.60) 0%, rgba(2,4,12,0) 26%),
  linear-gradient(to top,   rgba(2,4,12,.50) 0%, rgba(2,4,12,0) 32%)}
.problems__copy{position:absolute;inset:0;z-index:2;pointer-events:none;
  padding:calc(var(--nav-h) + clamp(26px,5.5vh,58px)) var(--hero-pad) clamp(20px,4vh,44px)}
  h2 (data-anim="up" --d:60ms):  "Problems that<br>people have"   (top-left)
  p.solve (data-anim="up" --d:220ms): "And BridgeFlow<br>solve"   (bottom-right)
  Both: margin 0; font-size clamp(28px,4.35vw,64px); font-weight 400; line-height 1.0;
        letter-spacing -.032em; color #fff
  p.solve additionally: position absolute; right var(--hero-pad);
        bottom clamp(20px,4vh,44px); text-align right

.stack{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);z-index:3;
  width:clamp(258px,34.4vw,495px);aspect-ratio:495/375;pointer-events:none}
.stack__card{position:absolute;inset:0;border-radius:clamp(16px,1.6vw,24px);
  background:linear-gradient(158deg,#f2f4fe 0%,#e6eafb 46%,#dbe2f8 100%);
  box-shadow:0 26px 70px rgba(2,8,32,.42);padding:clamp(16px,1.9vw,28px);
  display:flex;flex-direction:column;justify-content:space-between;color:#10161f;
  opacity:0;will-change:transform,opacity;backface-visibility:hidden}
  h3: margin 0; font-size clamp(14px,1.2vw,17.5px); font-weight 600; letter-spacing -.016em
  .stack__foot{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
  p: margin 0; font-size clamp(11px,.93vw,13.5px); line-height 1.5; letter-spacing -.004em;
     color #25303f; max-width 24ch
  .stack__num: font-size clamp(34px,4.2vw,60px); font-weight 300; line-height .85;
     letter-spacing -.03em; color #131a24

FOUR CARDS (exact copy):
 01 "Fragmented Ecosystems" — Every blockchain has its own RPC rules, endpoints, gas logic and
    tooling. Teams waste time switching between incompatible standards instead of shipping features.
 02 "Complex Integrations" — Cross-chain transfers, gas fees, confirmations and bridge logic force
    developers to build custom flows. What should take hours often turns into weeks of work.
 03 "Security Risks" — Broken bridges, outdated nodes and inconsistent validations expose apps to
    exploits. One weak integration can compromise entire multichain operations.
 04 "Operational Overhead" — Maintaining multiple nodes, monitoring uptime, handling rate limits and
    troubleshooting RPC failures create constant infrastructure overhead for teams.

SECTION-2 JS — one scroll handler, rAF-throttled via a `ticking` flag, on scroll + resize:
  rect = section.getBoundingClientRect(); vh = innerHeight
  (a) ENTRY SCALE: enter = clamp(1 - rect.top/vh, 0, 1); easeOut(t)=1-Math.pow(1-t,3)
      card.style.transform = "scale(" + (0.93 + 0.07*easeOut(enter)) + ")"
      card.style.borderRadius = (28 + (1-enter)*14) + "px"
  (b) STACK PROGRESS: total = section.offsetHeight - vh;
      p = clamp(-rect.top/total, 0, 1);  pos = p * 4
  (c) VIDEO SCRUB TARGET: vTarget = p * (vDuration - 0.04)
  (d) PER-CARD STATE, local = pos - i:
      local <= -0.85 or >= 1.85  -> opacity 0, visibility hidden, skip
      local < 0   (arriving): t = clamp((local+0.85)/0.85,0,1);
                  op=t; rot=5*(1-t); sc=0.94+0.06*t; ty=26*(1-t)
      local <= 1  (holding):  op=1; rot=-3.4*local+1.6; sc=1; ty=-6*local
      local > 1   (leaving):  u = clamp((local-1)/0.85,0,1);
                  op=1-u; rot=-1.8-4*u; sc=1-0.05*u; ty=-6-24*u
      The LAST card pins once arrived: if (i===3 && local>1) op=1; rot=-1.8; sc=1; ty=-6
      Apply: transform = translate3d(0,TYpx,0) rotate(ROTdeg) scale(SC); zIndex = 10 + i

SECTION-2 VIDEO IS SCROLL-SCRUBBED, NOT LOOPED:
  The clip shows the particle figure lifting its head and dissolving, so it cannot loop without
  a hard cut. Drive it from the same progress p:
  - Never call play(); add a "play" listener that immediately re-pauses.
  - On loadedmetadata/loadeddata/canplay: capture vDuration, pause, currentTime = 0.001.
  - Separate rAF loop with smoothing constant 0.0012:
      dt = min((now-vLast)/1000, 0.05); k = 1 - Math.pow(0.0012, dt)
      vCurrent += (vTarget - vCurrent) * k
      if (readyState>=2 && !seeking && Math.abs(currentTime - vCurrent) > 0.012)
        currentTime = vCurrent
  - IntersectionObserver (threshold 0) on the section starts/stops that rAF loop.
  Expected result: scrolling 0%->100% through the section maps linearly to 0s->6.0s.

════════════════════════════════════════════════════════════════════════
6. SECTION 3 — "HOW BRIDGEFLOW WORKS" (white, blue blob, 3 staggered cards)
════════════════════════════════════════════════════════════════════════
<section class="works" id="works"> with .works__blob, .works__head, .works__grid

.works{position:relative;padding:clamp(70px,11vw,150px) var(--gutter) clamp(60px,8vw,110px);
  background:#fff;overflow:hidden}
.works__blob{position:absolute;inset:0;z-index:0;pointer-events:none;background:
  radial-gradient(78% 62% at 14% 118%, #2f62fb 0%, #5c84fc 26%, #9db9fd 46%, #d6e0fe 64%, rgba(255,255,255,0) 78%),
  radial-gradient(52% 46% at 104% 46%, #b9cbfd 0%, #dce4fe 40%, rgba(255,255,255,0) 72%)}
.works__head{position:relative;z-index:1;display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,.46fr);gap:clamp(18px,3vw,40px);
  align-items:start;margin-bottom:clamp(38px,5.6vw,80px)}

h2 (data-anim="up" --d:0ms): <h2>How <em>BridgeFlow</em> works</h2>
  margin 0; font-size clamp(32px,5.3vw,78px); font-weight 400; line-height .96;
  letter-spacing -.036em; max-width 10ch
  .works h2 em{font-style:normal;color:var(--blue)}   <-- only "BridgeFlow" is blue
Right column:
  <p data-anim="up" style="--d:140ms">Everything your team needs to launch reliable multichain
  flows — without learning every blockchain.</p>
    margin 0 0 clamp(16px,2.2vw,26px); font-size clamp(13.5px,1.06vw,15.5px);
    line-height 1.62; letter-spacing -.004em; color #3b4354; max-width 34ch
  <a class="btn" href="#" data-anim="up" style="--d:250ms">Get free trial now</a>

.works__grid{position:relative;z-index:1;display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,2vw,29px);align-items:start}

CARD STRUCTURE — each card is wrapped in a slot div:
  <div class="wcard-slot" data-anim="card" style="--d:0ms|120ms|240ms">
    <article class="wcard">
      <img class="wcard__bg" src="[CARD IMAGE N]" alt="" loading="lazy" decoding="async">
      <div class="wcard__top"><h3>TITLE</h3><span class="wcard__num">0N</span></div>
      <p>BODY</p>
    </article>
  </div>

  The vertical stagger MUST live on the slot as margin-top, never as a transform on .wcard —
  otherwise it collides with both the reveal transform and the hover transform:
  .wcard-slot:nth-child(2){margin-top:clamp(8px,1.1vw,16px)}
  .wcard-slot:nth-child(3){margin-top:clamp(16px,2.2vw,32px)}

.wcard{position:relative;aspect-ratio:406/384;border-radius:clamp(14px,1.7vw,24px);
  overflow:hidden;background:var(--blue);padding:clamp(14px,1.75vw,26px);
  display:flex;flex-direction:column;justify-content:space-between;color:#fff;
  isolation:isolate;
  transition:transform .45s cubic-bezier(.22,1,.36,1),box-shadow .45s ease}
.wcard:hover{transform:translateY(-6px);box-shadow:0 26px 60px rgba(50,90,230,.34)}
.wcard__bg{position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover}
  IMPORTANT: z-index 0 with the text layers at z-index 1. Do NOT use z-index:-1 on the image —
  .wcard has isolation:isolate, so a negative z-index puts the image BEHIND the card's own
  blue background and it disappears entirely.
.wcard__top{position:relative;z-index:1;display:flex;align-items:flex-start;
  justify-content:space-between;gap:12px}
.wcard h3{margin:0;font-size:clamp(14px,1.35vw,20px);font-weight:500;letter-spacing:-.018em}
.wcard__num{font-size:clamp(38px,5vw,72px);font-weight:300;line-height:.78;
  letter-spacing:-.035em;color:rgba(255,255,255,.96)}
.wcard p{position:relative;z-index:1;margin:0;font-size:clamp(11.5px,1.03vw,15px);
  line-height:1.5;letter-spacing:-.004em;color:rgba(255,255,255,.93);max-width:26ch}

THREE CARDS (exact copy):
 01 "One unified API" — One unified API with consistent methods and responses, removing the need
    to learn separate rules for each blockchain.
 02 "Intelligent routing" — Intelligent routing selects the fastest, cheapest cross-chain path and
    automatically manages fees and gas logic.
 03 "Secure execution" — Secure MPC signing with automated validation and live monitoring ensures
    safe execution of every multichain operation.

════════════════════════════════════════════════════════════════════════
7. RESPONSIVE BREAKPOINTS (exact)
════════════════════════════════════════════════════════════════════════
@media (max-width:1000px){
  .hero__inner,.works__head{grid-template-columns:minmax(0,1fr)}
  .hero h1{max-width:14ch}
  .hero__right{max-width:44ch}
}
@media (max-width:860px){
  .nav__links{display:none}
  .nav__burger{display:grid}
  .nav{gap:10px;padding-left:10px;padding-right:10px}
  .works__grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .wcard-slot:nth-child(2),.wcard-slot:nth-child(3){margin-top:0}
}
@media (max-width:680px){
  .hero{height:calc(100svh - (var(--page-gap) * 2));min-height:480px}
  .hero__inner{padding-top:calc(var(--nav-h) + clamp(42px,11vh,84px));align-content:start}
  .hero h1{font-size:clamp(30px,8.6vw,44px);max-width:12ch}
  .hero__right p{font-size:14px;max-width:32ch}
  .hero__wordmark{font-size:18.6vw;bottom:clamp(6px,1.6vw,12px)}
  .problems{height:420vh}
  .problems__copy h2,.problems__copy p.solve{font-size:clamp(26px,7.4vw,38px)}
  .problems__copy{padding-left:clamp(18px,5vw,26px);padding-right:clamp(18px,5vw,26px)}
  .problems__copy p.solve{right:clamp(18px,5vw,26px)}
  .stack{width:min(80vw,340px);top:50%}
  .stack__card p{max-width:none}
  .works__grid{grid-template-columns:minmax(0,1fr);gap:16px}
  .wcard{aspect-ratio:16/11}
  .wcard p{max-width:34ch}
}
@media (max-width:420px){
  .hero__wordmark{font-size:19.4vw;letter-spacing:-.05em}
}
@media (prefers-reduced-motion:reduce){
  .reveal-char{animation:none;opacity:1;transform:none;filter:none}
  .nav{animation:none}
  [data-anim],[data-anim].is-in{opacity:1;transform:none;filter:none;transition:none}
  .nav__sheet,.nav__sheet a{transition-duration:.01ms}
  *{scroll-behavior:auto!important}
}

════════════════════════════════════════════════════════════════════════
8. ACCEPTANCE CRITERIA — verify each of these
════════════════════════════════════════════════════════════════════════
- Wrap all JS in one IIFE with "use strict". Zero console errors.
- Hero scrub: cursor at right edge -> currentTime ~0.07s; centre -> ~2.0s; left edge -> ~3.9s;
  moving back right runs the clip backward.
- Section 2: scrolling 0%->100% maps linearly to 0s->6.0s on the background video; the card
  scales 0.93 -> 1 on entry; the four cards cross-fade with rotation; card 04 stays pinned.
- The wordmark is horizontally centred within the hero card to within 1px and never overflows
  it at 1920/1600/1440/1280/1024/680/420/390px wide; no horizontal page scroll at any width.
- The mobile sheet's backdrop-filter genuinely blurs the hero behind it (proof that it was
  placed outside <nav>).
- Burger animates into an X; menu closes on link tap, outside tap, Escape, scroll and resize.
- All three section-3 card images are visible over the blue card fill.
- No decorative floating dots/bubbles anywhere in the hero.
- Both <video> elements carry a poster so browsers that cannot decode the file show a still
  frame rather than a black box.
