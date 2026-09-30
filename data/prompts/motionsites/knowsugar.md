# KnowSugar

> **Source:** Framesbase (MCP)  
> **Type:** sites  
> **Category:** Healthcare  
> **Deliverable:** prompt  
> **Opened via:** framesbase MCP on 2026-09-30

---

Build a single, standalone, production-ready `index.html` file — no build step, no
external JS, no frameworks, no CSS files. Everything inline. It is a scroll-driven
landing page for a fictional blood-sugar awareness brand called "KnowSugar".

═══════════════════════════════════════════════════════════════════════
1. THE CORE IDEA
═══════════════════════════════════════════════════════════════════════
A single 8-second background video is scrubbed by scroll position. The page has
340vh of scroll track; everything visible is `position: fixed`. Scrolling from top
to bottom plays the video from 0s to its end, and two overlaid "scenes" of copy
cross-fade over it.

The video shows: a glowing sugar cube → it shatters into crystals → the crystals
reassemble into a human bust.

Scene 1 (hero) sits inside an INSET ROUNDED CARD. As you scroll, that card EXPANDS
to full-bleed, and the navbar's ink inverts from dark to white. Scene 2 then
staggers in over the now-full-bleed video.

═══════════════════════════════════════════════════════════════════════
2. VIDEO ASSET
═══════════════════════════════════════════════════════════════════════
Use exactly this URL as the <video> src:

https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/88cfbf35-fe4d-4461-a21b-1e581c69ba18.mp4

Properties (rely on these): H.264 High profile, 8-bit yuv420p, 1920x1080, 24 fps,
8.04 s, ~9.2 MB, ALL-INTRA (every one of its 193 frames is a keyframe), faststart,
no audio track.

All-intra matters: any seek decodes exactly one frame (~4-5 ms), which is what makes
scroll scrubbing smooth. Do not assume sparse keyframes.

<video> attributes: id="bgv" muted playsinline webkit-playsinline preload="auto"
disablepictureinpicture. No `loop`, no `autoplay`, no `controls`.

═══════════════════════════════════════════════════════════════════════
3. FONTS
═══════════════════════════════════════════════════════════════════════
Google Fonts, with preconnect to fonts.googleapis.com and fonts.gstatic.com
(crossorigin):

https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@1,400;1,500&display=swap

--sans:  "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif
--serif: "Playfair Display",Georgia,"Times New Roman",serif

Inter is the UI/body face. Playfair Display ITALIC is used ONLY for: the second
headline line of each section, and the "i" glyph in the info badge.

═══════════════════════════════════════════════════════════════════════
4. DESIGN TOKENS (:root)
═══════════════════════════════════════════════════════════════════════
--ink:#1A1A1E;  --slate:#7C819B;  --slate-soft:#8B90A8;
--nav-h:88px;  --card-gap:24px;  --card-r:16px;  --pad:24px;
--r-btn:8px;   --r-card:12px;

Driven per-frame from JS (declare with these initial values):
--inset-x:24px; --inset-t:96px; --radius:16px;
--nav-ink:#1A1A1E; --nav-accent:#8B90A8; --nav-icon:#7C819B;
--pill-bg:#7C819B; --pill-ink:#FFFFFF;

body: margin 0, background #FFFFFF, color var(--ink), font-family var(--sans),
-webkit-font-smoothing:antialiased, -moz-osx-font-smoothing:grayscale,
overscroll-behavior-y:none. Universal `box-sizing:border-box`.

═══════════════════════════════════════════════════════════════════════
5. DOM STRUCTURE (exact order)
═══════════════════════════════════════════════════════════════════════
<html lang="en" class="intro">
  head → meta charset, viewport (width=device-width, initial-scale=1,
         viewport-fit=cover), title, description, then a small inline <script>
         (see §9), then font links, then <style>
  body →
    div.stage#stage         → video#bgv, div.scrim.top, div.scrim.bottom
    header.nav.rv#nav       → a.logo, nav.nav-right(button.pill, button.menu)
    div.scenes              → section.scene#scene1, section.scene#scene2
    div.track
    <script>

═══════════════════════════════════════════════════════════════════════
6. THE HERO CARD (.stage)
═══════════════════════════════════════════════════════════════════════
.stage{ position:fixed; top:var(--inset-t); left:var(--inset-x);
  right:var(--inset-x); bottom:0; overflow:hidden; z-index:0;
  border-radius:var(--radius) var(--radius) 0 0; background:#8F96AD; }

Note bottom:0 — the card is inset on left/right/top only and BLEEDS OFF the bottom
edge of the viewport. Only the top two corners are rounded.

#bgv{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  object-position:center; display:block; background:#8F96AD; }

Two legibility scrims, both position:absolute; inset:0; pointer-events:none; z-index:1
.scrim.top    background:linear-gradient(to bottom,rgba(32,36,50,.30) 0%,rgba(32,36,50,.08) 26%,rgba(32,36,50,0) 46%)
.scrim.bottom background:linear-gradient(to top,  rgba(32,36,50,.40) 0%,rgba(32,36,50,.12) 30%,rgba(32,36,50,0) 56%)

═══════════════════════════════════════════════════════════════════════
7. NAVBAR — no background, inverting ink
═══════════════════════════════════════════════════════════════════════
The navbar NEVER paints a background of its own. In section 1 the white behind it
is simply the page showing around the inset card. Do not add a white bar, a blur,
or a border.

.nav{ position:fixed; top:0; left:0; right:0; min-height:var(--nav-h); z-index:40;
  display:flex; align-items:center; justify-content:space-between;
  padding:0 clamp(18px,2vw,26px); padding-top:env(safe-area-inset-top);
  background:transparent; transition:none; }

.logo → `Know` + <span>Sugar</span>. font-size:clamp(19px,1.6vw,23px); weight 400;
  letter-spacing:-.018em; color:var(--nav-ink); text-decoration:none; white-space:nowrap.
  .logo span{ color:var(--nav-accent) }

.nav-right{ display:flex; align-items:center; gap:clamp(14px,1.8vw,26px) }

.pill (text "Free risk test"): font-size 14px; weight 400; letter-spacing:-.005em;
  color:var(--pill-ink); background:var(--pill-bg); border:0;
  border-radius:var(--r-btn) /* 8px — lightly rounded, NOT a pill */;
  padding:11px 21px; cursor:pointer; white-space:nowrap;
  transition:filter .25s ease,transform .25s ease
  :hover{ filter:brightness(.94); transform:translateY(-1px) }

.menu button: display:flex; align-items:center; gap:11px; background:none; border:0;
  cursor:pointer; padding:6px 2px; color:var(--nav-ink); font-size:14px; weight 400.
  aria-label="Menu". Contains .menu-grid (a 2x2 grid of four <i>, gap 3px, each
  10x10px, background:var(--nav-icon), border-radius:2.5px, display:block) then
  a <span>Menu</span>.

═══════════════════════════════════════════════════════════════════════
8. SCENES
═══════════════════════════════════════════════════════════════════════
.scenes{ position:fixed; inset:0; z-index:20; pointer-events:none }
.scene{ position:absolute; display:flex; flex-direction:column }
.scene > *{ pointer-events:auto }

⚠ CRITICAL: do NOT put `will-change` on .scene. `will-change` naming
opacity/transform/filter makes the element a BACKDROP ROOT, which would cut
section 2's cards off from the video behind them and silently kill their
backdrop-filter.

Scene 1 lives INSIDE the card, so its box tracks the card as it expands:
#scene1{ top:calc(var(--inset-t) + var(--pad) + 6px);
         left:calc(var(--inset-x) + var(--pad));
         right:calc(var(--inset-x) + var(--pad));
         bottom:var(--pad); }
Scene 2 is always full-bleed (it only appears after expansion):
#scene2{ top:calc(var(--nav-h) + var(--pad)); left:var(--pad);
         right:var(--pad); bottom:var(--pad); }

--- shared type ---
.micro-row{ display:flex; justify-content:space-between; gap:28px; align-items:flex-start }
.micro{ font-size:clamp(12px,.95vw,14px); line-height:1.48; font-weight:400;
        color:rgba(255,255,255,.90); max-width:26ch }
.micro p{margin:0}  .micro p + p{margin-top:14px}  .micro.right{max-width:34ch}

.h-line1{ font-size:clamp(2.4rem,5.2vw,4.75rem); font-weight:300;
          letter-spacing:-.05em; line-height:1.02; color:#fff; margin:0 }
.h-line2{ font-family:var(--serif); font-style:italic; font-weight:400;
          font-size:clamp(2.5rem,5.5vw,5rem); line-height:1.04;
          letter-spacing:-.028em; color:#fff; margin:.02em 0 0 }

--- SECTION 1 ---
.micro-row with two .micro blocks:
  LEFT  (two <p>): "Over [540 million] adults worldwide live with diabetes." /
                   "Nearly half don’t know they’re already at risk."
  RIGHT (.micro.right.hide-sm, one <p>): "Blood sugar changes silently for years.
        Understanding your numbers today can help prevent serious health problems
        tomorrow."
  (Use the ’ right-single-quote entity, not a straight apostrophe.)

Then ONE bottom row containing headline (left) and buttons (right):
.hero-foot{ margin-top:auto; display:flex; align-items:flex-end;
            justify-content:space-between; gap:clamp(24px,4vw,64px) }
  > div.headline → h1.h-line1 "Know Your Sugar."
                   p.h-line2  "Protect Your Future."
  > div.cta-row{display:flex;gap:10px;flex-wrap:wrap}
      button.btn.btn-solid "Free risk test"
      button.btn.btn-ghost "Learn the Basics"

There is NO scroll indicator / "Scroll" hint anywhere.

.btn{ font-size:14px; weight 400; letter-spacing:-.005em; padding:11px 21px;
      border-radius:var(--r-btn); cursor:pointer; white-space:nowrap;
      transition:transform .25s ease,background .25s ease,border-color .25s ease }
.btn-solid{ background:#fff; color:var(--ink); border:1px solid #fff }
  :hover{ transform:translateY(-1px); background:#F1F2F6 }
.btn-ghost{ background:rgba(255,255,255,.08); color:#fff;
            border:1px solid rgba(255,255,255,.55);
            backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px) }
  :hover{ transform:translateY(-1px); background:rgba(255,255,255,.20) }

--- SECTION 2 ---
.micro-row containing:
  div.headline → h2.h-line1 "Small Numbers." / p.h-line2 "Big Consequences."
  div.info{ display:flex; gap:13px; align-items:flex-start; max-width:36ch }
    span.info-badge{ flex:none; width:22px; height:22px; border-radius:5px;
      background:#fff; display:grid; place-items:center; font-family:var(--serif);
      font-style:italic; font-size:14px; line-height:1; color:var(--ink);
      margin-top:2px } containing the letter "i", aria-hidden
    p.micro (inline style margin:0): "Blood sugar is one of the clearest indicators
      of long-term metabolic health. Understanding how it changes can help prevent
      problems before symptoms appear."

Then .cards pinned to the bottom:
.cards{ margin-top:auto; display:grid; grid-template-columns:repeat(4,1fr);
        gap:clamp(12px,1.4vw,18px) }

.card{ position:relative; border-radius:var(--r-card);
  border:1px solid rgba(255,255,255,.14);
  background:rgba(0,0,0,.20);                       /* low-opacity BLACK glass */
  backdrop-filter:blur(16px) saturate(120%);
  -webkit-backdrop-filter:blur(16px) saturate(120%);
  padding:clamp(18px,1.7vw,24px); min-height:clamp(172px,20vh,208px);
  display:flex; flex-direction:column; overflow:hidden;
  transition:background .3s ease,transform .3s ease,border-color .3s ease }
.card::after{ content:""; position:absolute; inset:0; border-radius:inherit;
  pointer-events:none;
  background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,0) 55%) }
.card:hover{ background:rgba(0,0,0,.30); border-color:rgba(255,255,255,.24);
  transform:translateY(-4px) }

Card internals, in this DOM order:
  span.card-num  → position:absolute; top:clamp(16px,1.5vw,22px);
                   right:clamp(16px,1.5vw,22px); font-size:13.5px;
                   color:rgba(255,255,255,.62); letter-spacing:.02em
  span.card-ico  → 27x27px, color:#fff, opacity:.95; svg fills it 100%, display:block
  div.card-rule  → height:1px; background:rgba(255,255,255,.24);
                   margin:clamp(16px,1.6vw,22px) 0 clamp(12px,1.2vw,17px); width:45%
  h3.card-title  → font-size:clamp(16px,1.35vw,21px); weight 400;
                   letter-spacing:-.018em; color:#fff; margin:0
  p.card-body    → margin:clamp(10px,1vw,15px) 0 0;
                   font-size:clamp(12px,.9vw,13.5px); line-height:1.48;
                   color:rgba(255,255,255,.80)

All four icons are inline SVG, viewBox "0 0 24 24", fill="none" stroke="currentColor"
stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round":

01 Nutrition (cloche):
  <path d="M5 16.4a7 7 0 0 1 14 0"/><path d="M3.4 16.4h17.2"/><path d="M2.6 19.3h18.8"/>
  <circle cx="12" cy="6.6" r=".85"/><path d="M12 7.9v1.5"/>
  Body: "Balanced meals slow glucose spikes and help maintain steady energy
  throughout the day."

02 Recovery (bolt in circle):
  <circle cx="12" cy="12" r="9"/>
  <path d="M12.9 6.9 9.4 12.4h2.7l-.9 4.7 3.5-5.5h-2.7l.9-4.7Z"/>
  Body: "Poor sleep can affect insulin sensitivity even after a single night."

03 Movement (X in rounded square):
  <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5"/>
  <path d="M8.6 8.6l6.8 6.8M15.4 8.6l-6.8 6.8"/>
  Body: "Physical activity naturally improves the body’s ability to regulate glucose."

04 Prevention (shield + check):
  <path d="M12 3.2l7 2.7v5.5c0 4.3-2.9 7.6-7 9.4-4.1-1.8-7-5.1-7-9.4V5.9l7-2.7Z"/>
  <path d="M8.9 12.1l2.2 2.2 4-4.3"/>
  Body: "Knowing your baseline is often the first step toward preventing serious
  complications."

--- scroll track ---
.track{ position:relative; z-index:1; height:340vh; pointer-events:none }

═══════════════════════════════════════════════════════════════════════
9. PAGE-LOAD INTRO
═══════════════════════════════════════════════════════════════════════
On load the page is blank white; the hero card opens from a VERTICAL LINE AT THE
CENTRE out to its full width, then the copy staggers in.

Use clip-path, NOT scaleX — scaling would squash the footage. Clipping reveals the
real frame.

Inline <script> in <head>, placed AFTER the meta tags so charset comes first. It runs
before first paint:
  - if matchMedia('(prefers-reduced-motion: reduce)').matches → remove the `intro`
    class from <html>, so nothing ever starts hidden for those viewers
  - if 'scrollRestoration' in history → history.scrollRestoration='manual'
  (wrap the matchMedia call in try/catch)

Keyframes:
@keyframes stageOpen{
  from{ clip-path:inset(0 50% 0 50% round var(--radius) var(--radius) 0 0) }
  to  { clip-path:inset(0 0   0 0   round var(--radius) var(--radius) 0 0) } }
@keyframes rvUp{ from{opacity:0;transform:translate3d(0,20px,0)} to{opacity:1;transform:none} }
@keyframes rvWipe{   /* left-to-right wipe; the ±30% vertical slack keeps the
                        italic's ascenders/descenders from being clipped */
  from{ opacity:0; clip-path:inset(-30% 100% -30% -4%); transform:translate3d(0,14px,0) }
  to  { opacity:1; clip-path:inset(-30% -30% -30% -4%); transform:none } }
@keyframes fadeIn{ from{opacity:0} to{opacity:1} }

HELD state (while waiting for the first decoded video frame):
.intro .stage{ clip-path:inset(0 50% 0 50% round var(--radius) var(--radius) 0 0) }
.intro #bgv{ opacity:0 }
.intro .rv, .intro .rv-wipe{ opacity:0 }

RELEASED state — add class `intro-go` to <html>:
.intro-go .stage{ clip-path:none;
  animation:stageOpen 840ms cubic-bezier(.66,0,.24,1) backwards }
.intro-go #bgv{ opacity:1; animation:fadeIn 680ms ease 60ms backwards }
.intro-go .rv{ opacity:1;
  animation:rvUp 720ms cubic-bezier(.22,.7,.2,1) backwards;
  animation-delay:var(--d,0ms) }
.intro-go .rv-wipe{ opacity:1;
  animation:rvWipe 820ms cubic-bezier(.22,.7,.2,1) backwards;
  animation-delay:var(--d,0ms) }

⚠ Use fill-mode `backwards`, never `forwards`/`both`. With `backwards` an element
holds its from-state during its delay and afterwards returns to its OWN normal
styles. A `forwards` fill would freeze a clip-path on .stage and keep rounded
corners forever after the card goes full-bleed.

Per-element delays via an inline `style="--d:…"`:
  header.nav          .rv        --d:140ms
  micro LEFT          .rv        --d:700ms
  micro RIGHT         .rv        --d:780ms
  h1.h-line1          .rv-wipe   --d:870ms
  p.h-line2           .rv-wipe   --d:1000ms
  button.btn-solid    .rv        --d:1280ms
  button.btn-ghost    .rv        --d:1360ms

RELEASE LOGIC (at the end of the main script): if <html> has class `intro`, hold
until the first frame has actually decoded so the card never opens onto an empty
placeholder — if v.readyState >= 2 release now, else release on `loadeddata` (once)
and on `error` (once), plus a setTimeout(release, 2200) fallback. Guard with a
`released` boolean. Inside release(), add `intro-go` inside a requestAnimationFrame
so the held state paints at least once first.

Resulting timeline: card is a centre line at ~70ms, ~40% open at 300ms, essentially
open by 700ms, corner copy ~700-950ms, headline lines wipe 870→1350ms, buttons
1280→1900ms.

═══════════════════════════════════════════════════════════════════════
10. THE SCROLL ENGINE (main script, IIFE at end of body)
═══════════════════════════════════════════════════════════════════════
State: duration=8, metaReady=false, smoothTime=0, lastApplied=-1,
lastFrame=performance.now(), seeking=false, smoothExp=0, lastP=-1, idle=0, FPS=24,
reduce = matchMedia('(prefers-reduced-motion: reduce)').matches.

readGeom() reads --card-gap, --card-r from getComputedStyle(documentElement) and
NAV_H from nav.offsetHeight (fallbacks 24/16/88); call it once and on `resize`, so
the CSS breakpoints stay the single source of truth.

Helpers:
  clamp01(n)
  ease(t){ t=clamp01(t); return t*t*t*(t*(t*6-15)+10) }   // smootherstep
  range(p,a,b){ return ease((p-a)/(b-a)) }
  progress(): scrollY / (documentElement.scrollHeight - innerHeight), clamped 0..1
  mix(a,b,t): lerp two [r,g,b,a] arrays → "rgba(...)" string

Video priming:
  onMeta() → if v.duration finite and > 0 set duration; metaReady=true;
             try{ v.pause(); v.currentTime=0.001 }catch{}
  bind to `loadedmetadata` and `durationchange`; call immediately if readyState>=1.
  Safari/iOS will not decode frames until the element is activated once: on the
  first of touchstart/pointerdown/wheel/keydown/click (once, passive) and on
  `canplay` (once), call v.play() and immediately pause it (handle the promise).
  Track `seeking` via the `seeking`/`seeked` events.

ONE requestAnimationFrame loop does everything:
  dt = min((now-lastFrame)/1000, 0.05); k = reduce ? 1 : (1 - Math.exp(-dt*7.5))
    → frame-rate-independent damping; this is what makes it feel liquid.
  p = progress()
  targetTime = p * max(duration-0.06, 0.06)      // LINEAR, so scrub tracks 1:1
  expTarget  = range(p, 0.10, 0.38)              // card expansion

  IDLE SHORT-CIRCUIT (do this before any style writes):
    busy = p !== lastP || |targetTime-smoothTime| > 0.003
                       || |expTarget-smoothExp|   > 0.0015
    lastP = p; idle = busy ? 0 : idle+1
    if (idle > 3) { requestAnimationFrame(frame); return }
    → once scroll stops and both springs converge, stop churning style every frame.

  smoothTime += (targetTime - smoothTime) * k
  SEEK, quantised to the frame grid (source is all-intra, so one decode per frame):
    if (metaReady && !seeking) {
      q = Math.round(smoothTime*FPS)/FPS
      if (q !== lastApplied) { try{ v.currentTime = q; lastApplied = q }catch{} } }
    Do NOT use fastSeek and do NOT seek on sub-frame deltas.

  smoothExp += (expTarget - smoothExp) * k;  e = smoothExp;  ie = 1 - e
  Write, via documentElement.style.setProperty:
    --inset-x : (CARD_GAP * ie) px
    --inset-t : ((NAV_H + CARD_GAP*0.34) * ie) px
    --radius  : (CARD_R * ie) px
  Navbar ink inversion (interpolated every frame, never threshold-switched):
    --nav-ink    [26,26,30,1]    → [255,255,255,1]
    --nav-accent [139,144,168,1] → [255,255,255,.70]
    --nav-icon   [124,129,155,1] → [255,255,255,1]
    --pill-bg    [124,129,155,1] → [255,255,255,1]
    --pill-ink   [255,255,255,1] → [26,26,30,1]
  (The navbar background itself is never touched — it stays transparent.)

  SCENE 1 out, range(p, 0.20, 0.45) → out1:
    rest1 = out1 <= 0.002
    opacity    = String(1-out1)
    transform  = rest1 ? "none" : `translate3d(0,${-52*out1}px,0)`
    filter     = rest1 ? "none" : `blur(${out1*7}px)`
    visibility = out1 >= 0.999 ? "hidden" : "visible"

  SCENE 2 in, range(p, 0.62, 0.88) → in2:
    scene2.style.visibility = in2 <= 0.001 ? "hidden" : "visible"
    The CONTAINER is never faded, blurred or transformed — each child animates,
    so the container never becomes a backdrop root and the cards keep the video
    behind their backdrop-filter.
    Collect s2Items = scene2.querySelectorAll("[data-s2]") — mark with a bare
    `data-s2` attribute, in DOM order: h-line1, h-line2, .info, then the 4 .card
    elements (7 items).
    S2_STEP = 0.07;  S2_SPAN = 1 - S2_STEP*(s2Items.length-1)
    for each item i:
      t = ease((in2 - i*S2_STEP) / S2_SPAN)
      if (t >= 0.998) → set style.opacity = "" and style.transform = "" (clear them
        to empty strings, NOT to "1"/"none"), guarded by a cached s2Applied[i]
      else → opacity = String(t); transform = `translate3d(0,${30*(1-t)}px,0)`
    Mid-reveal the four cards should cascade roughly 0.98 / 0.88 / 0.71 / 0.50.

  Initial state before the first rAF:
    scene2.style.visibility = "hidden"
    each s2Item.style.opacity = "0"
    ⚠ Do NOT set opacity on the scene2 container — nothing would ever clear it and
    section 2 would stay invisible forever.

⚠ BACKDROP-ROOT RULE (applies throughout): an ancestor with `filter`, `opacity < 1`,
`clip-path`, or `will-change` naming any of those becomes a backdrop root and
silently disables descendants' backdrop-filter. At rest, every ancestor of a .card
must have transform `none`, filter `none`, opacity exactly 1, and no will-change.
Always clear to the keyword `none` / an empty string, never to identity values like
`translate3d(0,0,0)` or `blur(0px)`.

═══════════════════════════════════════════════════════════════════════
11. RESPONSIVE
═══════════════════════════════════════════════════════════════════════
@media (max-width:900px){
  :root{ --nav-h:64px; --card-gap:12px; --card-r:14px; --pad:18px }
  .micro-row{ flex-direction:column; gap:14px }
  .micro, .micro.right{ max-width:46ch }
  .hero-foot{ flex-direction:column; align-items:flex-start; gap:18px }
  .cards{ grid-template-columns:none; grid-auto-flow:column;
          grid-auto-columns:minmax(210px,72vw); gap:10px;
          overflow-x:auto; overscroll-behavior-x:contain;
          scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch;
          scrollbar-width:none;
          margin:auto calc(var(--pad) * -1) 0;      /* ⚠ see note */
          padding:0 var(--pad) 4px }
  .cards::-webkit-scrollbar{ display:none }
  .card{ scroll-snap-align:start; min-height:168px }
}
⚠ The card row is pinned to the bottom by `margin-top:auto`. Writing the bleed as
`margin:0 calc(...)` would reset margin-top to 0 and float the cards up under the
copy. It MUST be `margin:auto calc(var(--pad) * -1) 0`.

@media (max-width:560px){
  .h-line1{ font-size:clamp(1.7rem,8.4vw,2.5rem) }   /* keeps each line on one row */
  .h-line2{ font-size:clamp(1.78rem,8.8vw,2.6rem) }
  .micro{ font-size:12.5px }
  .micro.hide-sm{ display:none }
  .card-rule{ width:60% }
  .btn, .pill{ font-size:13px; padding:10px 17px }
  .menu span:last-child{ display:none }
  .menu-grid i{ width:9px; height:9px }
}

Short viewports — the card row must never be pushed off screen, so shrink the copy
above it instead of moving the row:
@media (max-height:660px){
  .cards{ gap:8px }
  .card{ min-height:clamp(132px,23vh,168px); padding:14px }
  .card-rule{ margin:11px 0 9px }
  .card-body{ font-size:11.5px; line-height:1.42 }
  .card-ico{ width:22px; height:22px }
  .micro p + p{ margin-top:9px }
}
@media (max-height:520px){
  :root{ --nav-h:52px; --pad:14px }
  .h-line1{ font-size:clamp(1.35rem,5vh,2rem) }
  .h-line2{ font-size:clamp(1.4rem,5.2vh,2.1rem) }
  .micro{ font-size:11.5px; line-height:1.4 }
  #scene2 .info{ display:none }        /* secondary copy yields first */
  .micro.hide-sm{ display:none }
  .card{ min-height:112px; padding:12px }
  .card-ico{ width:18px; height:18px }
  .card-rule{ margin:8px 0 7px }
  .card-num{ top:11px; right:12px; font-size:11.5px }
  .card-body{ margin-top:6px }
}

═══════════════════════════════════════════════════════════════════════
12. ACCEPTANCE CRITERIA
═══════════════════════════════════════════════════════════════════════
□ There are ZERO text-shadow and ZERO box-shadow declarations in the whole file.
□ At scroll 0: card inset 24px L/R, 16px top radius, bleeding off the bottom;
  navbar transparent with DARK ink and a slate #7C819B button; white page margin
  visible around the card.
□ At scroll 1: stage fills the viewport (inset 0, radius 0); navbar transparent with
  WHITE ink and a WHITE button with dark text; cards flush to the bottom edge.
□ Scroll 0→1 maps linearly to video 0→~7.98s.
□ The hero headline and the CTA buttons share ONE row, space-between, both bottom
  edges on the same line. No scroll hint exists.
□ The four cards sit flush on the bottom of the viewport (gap 0) at EVERY size,
  desktop and mobile alike — verify at 1440x900, 1280x720, 768x1024, 430x932,
  390x844, 360x640, 844x390, 667x375.
□ No vertical overflow in either scene and no horizontal page overflow at any size.
□ A card's computed backdrop-filter is `blur(16px) saturate(1.2)` AND it visibly
  blurs the footage behind it at rest.
□ After the intro finishes: zero running animations, .stage clip-path `none`, and
  every revealed element back to opacity 1 / transform none with no inline leftovers.
