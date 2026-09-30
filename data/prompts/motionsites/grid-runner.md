# Grid Runner

> **Source:** Framesbase (MCP)  
> **Type:** sites  
> **Category:** Interactive  
> **Deliverable:** prompt  
> **Opened via:** framesbase MCP on 2026-09-30

---

Build a single standalone index.html file (inline CSS + inline JS, no frameworks, no local assets) containing ONE full-screen hero section (height: 100vh, then 100dvh; min-height 520px) for a fictional superhero brand called "grid runner". It must be fully mobile responsive and look/behave exactly as specified below.

════════════════════════════════════════
1. ASSETS (use these exact CloudFront URLs directly — no other images, no video)
════════════════════════════════════════
BACKGROUND plate (16:9, 2752×1536, empty dark navy scene with a soft purple haze in the centre, no person):
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260930_032112_83df5417-b938-40cb-ab08-277e681c0058.png

FRONT hero, transparent PNG (2752×1536): superhero in a closed dark-purple armoured helmet with glowing electric-blue neon circuit lines and a cyan LED visor, shoulders/chest at the bottom:
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260930_032107_cf0bca78-1a51-492b-8607-1303fcc44eb7.png

BACK hero, transparent PNG (2752×1536), pixel-aligned with FRONT: the same suit but with no helmet, showing the kid underneath (young Black man, short fade haircut):
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260930_032109_4f2b4ad4-61bb-4a4a-8662-bdf3a12d757b.png

CARD image (9:16, 1536×2752): the hero crouched on a neon cyberpunk rooftop with a purple lightning-bolt billboard:
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260930_025529_046b4b9a-5da8-48e9-89d6-42e85c35521a.png

Add <link rel="preconnect"> for fonts.googleapis.com, fonts.gstatic.com (crossorigin) and d8j0ntlcm91z4.cloudfront.net (crossorigin), plus <link rel="preload" as="image"> for the background, front and back URLs.

════════════════════════════════════════
2. FONTS (Google Fonts, one stylesheet link)
════════════════════════════════════════
https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wdth,wght@62..125,500..900&family=Outfit:wght@400;500;600;700&family=Permanent+Marker&display=swap
- Anton → big headline and menu-overlay links
- Outfit → body, logo, nav pills, subtitle, footer-left, card paragraph
- Archivo → PLAY TRAILER button, badge, card title, "voltline" wordmark
- Permanent Marker → graffiti tag

════════════════════════════════════════
3. DESIGN TOKENS
════════════════════════════════════════
:root {
  --bg:#05060d; --ink:#ffffff; --violet:#6c4bff; --violet-2:#8a6bff; --cyan:#35d3ff;
  --line:rgba(255,255,255,.88);
  --s:min(1vw, 1.78vh);   /* scale unit: the design was drawn on a 2000px-wide 16:9 canvas, so 1 --s = 20 design px. All desktop sizes are calc(var(--s)*N). */
}
Reset: * { box-sizing:border-box; margin:0; padding:0 }. html, body: height 100%, background var(--bg), colour white. body: Outfit, antialiased, overflow-x hidden. Links inherit colour with no underline; buttons have no background/border.

════════════════════════════════════════
4. LAYER STACK inside <section class="hero"> (bottom → top)
════════════════════════════════════════
.hero: position relative, overflow hidden, background var(--bg), isolation isolate, touch-action none, user-select none, cursor crosshair (links/buttons inside use cursor pointer).

z1  <img id="bg">: the background plate, ALWAYS FULL SCREEN at every screen size: position absolute; inset 0; width 100%; height 100%; object-fit cover; object-position 50% 50%; pointer-events none. It is NOT positioned by JS and is independent of the hero rect. Starts at opacity 0 and fades in (.9s ease) when the section gets class "ready".
z2  .shade (full-size layer), legibility gradients:
    radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(5,6,13,.55) 100%),
    linear-gradient(90deg, rgba(5,6,13,.55) 0%, rgba(5,6,13,0) 34%),
    linear-gradient(0deg, rgba(5,6,13,.55) 0%, rgba(5,6,13,0) 18%)
z3  .tag: graffiti text, HTML, sitting BEHIND the hero:
    <span>THE CITY</span> <span class="glow">RUNS</span> <span class="w-on">ON US</span>
    position absolute; left 4.6%; top 63%; font Permanent Marker; font-size calc(var(--s)*7.1); line-height 1; letter-spacing -.045em; word-spacing -.05em; nowrap;
    colour rgba(128,136,158,.6); use the INDIVIDUAL properties rotate:-10deg; scale:1 1.85; transform-origin left center (not `transform`, so the entrance animation can't cancel them); filter drop-shadow(0 0 1px rgba(0,0,0,.4)); pointer-events none.
    Each span is display inline-block. .glow: colour #56dcff; text-shadow 0 0 calc(var(--s)*.6) rgba(53,211,255,.9), 0 0 calc(var(--s)*2.2) rgba(53,160,255,.65). .w-on: transform translateY(-8%).
z4  <canvas id="front">: full-size layer that renders the hero (FRONT/BACK composite, see §9). Opacity 0 → 1 (.9s ease, .15s delay) on .ready.
z5  <canvas id="sparks">: full-size layer, mix-blend-mode screen, for sparks and lightning.
z6  copy, card, footer text; z10 header; z30 loader. The menu overlay sits outside the section (position fixed, z40).
No custom cursor, no cursor ring, no hint circle.

════════════════════════════════════════
5. HEADER (absolute, top 0, full width, flex, space-between, align centre)
════════════════════════════════════════
padding: calc(var(--s)*1.6) calc(var(--s)*2.8) 0 calc(var(--s)*3.2)
LEFT, logo link: an inline SVG lightning bolt (viewBox 0 0 26 40, path "M18.5 0 2 23.2h9.4L6.8 40 24 15.6h-9.6L18.5 0Z", vertical linearGradient #b9a6ff → #6c4bff), width calc(var(--s)*2.5), height calc(var(--s)*3.9), filter drop-shadow(0 0 calc(var(--s)*.5) rgba(124,92,255,.7)), followed by the text "grid runner" (Outfit 700, calc(var(--s)*1.85), letter-spacing -.02em, gap calc(var(--s)*1.1)).
CENTRE, nav pills (absolute, left 50%, top calc(var(--s)*1.9), translateX(-50%), flex, gap calc(var(--s)*.85)): six links "home", "origin", "gear", "villains", "gallery", "game". Each pill: display grid, centred text, height calc(var(--s)*2.85), min-width calc(var(--s)*5.7), padding 0 calc(var(--s)*1.6), border calc(var(--s)*.1) solid var(--line), radius 999px, Outfit 500, calc(var(--s)*1.05), letter-spacing .005em, background rgba(5,6,13,.35), backdrop-filter blur(6px). Hover: background #fff, colour #07080f. Transition .25s.
RIGHT (flex, gap calc(var(--s)*1.5)):
  • Menu button: circle calc(var(--s)*3.5), border calc(var(--s)*.1) solid rgba(255,255,255,.22), background rgba(10,12,24,.55). Inside, a 2×2 grid of dots (gap calc(var(--s)*.3)), each dot calc(var(--s)*.5), colour var(--violet-2), box-shadow 0 0 calc(var(--s)*.4) rgba(138,107,255,.8). Hover: border colour var(--violet-2), rotate(45deg), .25s. Clicking opens the menu overlay.
  • "PLAY TRAILER" pill link (<span>PLAY</span><span class="lbl-long">TRAILER</span>, gap calc(var(--s)*.6)): height calc(var(--s)*3.45), padding 0 calc(var(--s)*2), radius 999px, Archivo 600, calc(var(--s)*1.12), letter-spacing .02em, uppercase, background linear-gradient(180deg, #7a5bff 0%, #5f3ff6 100%), box-shadow 0 0 calc(var(--s)*1.6) rgba(108,75,255,.55), inset 0 1px 0 rgba(255,255,255,.25). Hover: translateY(-2px), glow 0 0 calc(var(--s)*2.6) rgba(108,75,255,.85). No click behaviour.

════════════════════════════════════════
6. COPY, FOOTER, CARD
════════════════════════════════════════
.copy: absolute, left calc(var(--s)*3.3), top calc(var(--s)*12.4), pointer-events none.
  h1 (two block spans): "UNPLUG" / "THE HERO". Anton 400, uppercase, font-size calc(var(--s)*10), line-height .96 (the lines must NOT overlap), letter-spacing -.025em, text-shadow 0 calc(var(--s)*.3) calc(var(--s)*2) rgba(0,0,0,.35).
  p.sub: "draw to reveal <em>→</em> powered by a normal kid". Margin-top calc(var(--s)*1.05), Outfit 400, calc(var(--s)*1.5), colour #f2f3fa. The em is not italic, inline-block, margin 0 .2em.
Footer left (absolute, bottom calc(var(--s)*2.8), left calc(var(--s)*2.7)): "jay okoro · east grid", Outfit calc(var(--s)*1.2), #e9ebf5.
Footer right (bottom calc(var(--s)*2.8), right calc(var(--s)*2.8)): "voltline", Archivo 800, calc(var(--s)*1.45), letter-spacing -.02em, font-stretch 95%.
CARD (a link; absolute, right calc(var(--s)*2.7), top calc(var(--s)*11)): width calc(var(--s)*17.3), aspect-ratio 346/602, radius calc(var(--s)*1.35), overflow hidden, border calc(var(--s)*.12) solid rgba(170,178,230,.55), background #0a0b17, box-shadow 0 calc(var(--s)*1) calc(var(--s)*3) rgba(0,0,0,.55), 0 0 calc(var(--s)*2.4) rgba(108,75,255,.18).
  Hover: translateY(-6px) rotate(-.6deg), stronger violet glow, .5s cubic-bezier(.2,.8,.2,1). The image scales to 1.06 over 1.2s.
  img: absolute, width 100%, height 78%, object-fit cover, object-position 50% 28%.
  ::after overlay: linear-gradient(180deg, rgba(10,11,23,0) 44%, rgba(10,11,23,.85) 70%, #0a0b17 80%).
  Badge "SEASON TWO" (top-left, left calc(var(--s)*1.05), top calc(var(--s)*1.2)): padding calc(var(--s)*.42) calc(var(--s)*.85), pill, border calc(var(--s)*.1) solid rgba(116,170,255,.65), background rgba(8,12,34,.75), Archivo 600, calc(var(--s)*.82), colour #9cc4ff, uppercase.
  Body (bottom calc(var(--s)*1.1), left calc(var(--s)*1.05), right calc(var(--s)*1)): h3 "Voltline <br>Overload" (keep the space before the <br>) in Archivo 800, font-stretch 92%, calc(var(--s)*2.05), line-height .93, letter-spacing -.02em, uppercase; p "the grid is going dark", Outfit calc(var(--s)*1.17), rgba(220,224,240,.62), margin-top calc(var(--s)*.55).

════════════════════════════════════════
7. MENU OVERLAY, LOADER, ENTRANCE
════════════════════════════════════════
Menu (.menu, fixed inset 0, z40): background rgba(5,6,13,.86), backdrop blur(14px), flex column centred, gap 14px, opacity 0 / visibility hidden → .open shows it (.35s). Close button: top-right 22px, 48px circle, border 1.5px rgba(255,255,255,.3), "✕". Links are the same six nav items in Anton, clamp(40px,9vw,84px), uppercase, opacity .85; hover turns cyan and moves translateX(6px). Close on: ✕, clicking a link, or Escape. All href="#" links preventDefault.
Loader (z30, inside the section, bg colour): a 46px spinning ring (2px border rgba(138,107,255,.2), top border var(--violet-2), .9s linear infinite). Fades out (.8s, .2s delay) when .ready is set.
Entrance (.rise): opacity 0, translateY(24px) → none on .ready, .9s cubic-bezier(.2,.8,.2,1). Delays: header 0s, h1 .15s, sub .3s, tag + footers .45s, card .6s.
prefers-reduced-motion: disable the rise/card transitions.

════════════════════════════════════════
8. HERO RECT (JS; used ONLY for the FRONT and BACK hero images, not the background; recomputed via ResizeObserver)
════════════════════════════════════════
W,H = hero size; DPR = min(devicePixelRatio, 2); ar = 2752/1536.
w = max(W, H*ar)                                        // landscape: classic cover
if (W < H) w = max(W, min(H*ar, W * (W < 600 ? 2.3 : 1.9)))   // portrait: cap the zoom so the whole helmet fits
h = w/ar; x = (W-w)/2; y = (h >= H) ? (H-h)/2 : H-h     // bottom-anchor when shorter than the screen
Draw FRONT and BACK on the canvas at exactly this rect so they stay pixel-aligned with each other.
Brush radius = max(38, min(W,H) * (W < 820 ? .11 : .075)).
Size the front canvas, sparks canvas and one scratch canvas to W*DPR × H*DPR, plus an offscreen MASK canvas at 0.5× resolution.

════════════════════════════════════════
9. DRAW-TO-REVEAL INTERACTION (user-driven only: no auto sweep, no cursor ring)
════════════════════════════════════════
• Input: mouse reveals on plain hover (pointermove); touch/pen reveal while dragging (buttons or pressure > 0). Use getCoalescedEvents() for smooth strokes. Ignore pointers over header, card or menu (reset the stroke there). Reset the stroke on pointerenter/leave, and on pointerup for touch. Nothing reveals unless the user moves the pointer.
• Brush stamp: a 256px offscreen canvas holding a radial gradient (alpha 1 at 0, .95 at .5, .45 at .78, 0 at 1), plus 220 random bristle ellipses around the rim (radius 55–97%, length 6–28px, width .8–3.2px, alpha .15–.65, rotated roughly tangentially), then 140 speckle holes erased with destination-out (radius 35–95%, size .8–4px), giving a dry-brush look.
• Stroke points: interpolate from the last point with step = max(3, r*.22), where r = brushR * min(1.35, .9 + dist/180), plus ±6% jitter and per-stamp size ×(.9–1.1). Each point stores x, y, r, direction angle, random rotation and time; cap at 900 points.
• Heal lifetime: HOLD 650ms at full strength, then FADE 1100ms; alpha = smoothstep(1 - (age-HOLD)/FADE); the radius shrinks to 75% while healing. Draw each stamp on the half-res mask, rotated to the stroke angle (+ rot*.15) and stretched scale(1.25,1).
• Composite each frame (only while points exist):
    front canvas ← BACK image; then destination-in with the mask   (the kid only inside the brush)
    scratch     ← FRONT image; then destination-out with the mask  (helmet minus the brush)
    front canvas ← draw scratch on top (source-over)
  With no points, just draw FRONT. Where the brush goes past the smaller head, the background and graffiti show through.
• Sparks (sparks canvas, 'lighter' blending): per move, up to 6 particles (min(6, dist/10)), speed 1–5.5 px/frame with drag .94, gravity +.05, life decay .025–.065, hue 195 (70%) or 262, drawn as short lines. With probability min(.5, dist/90), add a 6-segment jagged bolt starting brushR*.55 from the cursor, length brushR*(.7–1.6), life -0.12 per frame, colour rgba(150,230,255,life), shadow rgba(53,211,255,.9) blur 12, width 1.4.
• Ambient crackle: each frame, with 16% chance, spawn a 5-segment bolt from one collar/shoulder anchor (image-relative u,v,angle): [.41,.70,-2.4] [.59,.70,-.7] [.36,.80,-2.8] [.64,.80,-.35] [.45,.66,-2.0] [.55,.66,-1.1], angle ±.45 rad, length cover.w*(.02–.055).
• Boot: wait for the FRONT, BACK and BG images and document.fonts.ready, then run layout, add .ready, and start the requestAnimationFrame loop.

════════════════════════════════════════
10. RESPONSIVE
════════════════════════════════════════
The background image stays full screen (object-fit cover) at every size.
≤1180px: hide the nav pills (the menu button opens the overlay).
≤820px: --s = 1vw; header padding 18px 16px 0; logo 20px (SVG 20×30, gap 8px); actions gap 10px; menu button 44px (dots 6px, gap 4px); trailer height 44px, padding 0 18px, 13px.
  .copy: left/right 16px, top clamp(92px,15vh,130px); h1 clamp(64px,19.5vw,130px); sub clamp(14px,4vw,20px), margin-top 12px.
  .tag: clamp(24px,7.6vw,60px), left 4%, top 47% (peeks out behind the top of the helmet).
  Card becomes a horizontal strip: left/right 16px, bottom 58px, height 88px, auto width, max-width 460px, margin-left auto, radius 16px, border 1.5px; img width 36%, height 100%, object-position 50% 34%; overlay linear-gradient(90deg, rgba(10,11,23,0) 22%, #0a0b17 37%); badge at left calc(36% + 12px), top 12px, 9.5px, padding 3px 8px; body at left calc(36% + 12px), right 10px, bottom 12px; h3 clamp(15px,4.3vw,20px), line-height 1, <br> hidden; p 12px.
  Footer: left/right 16px, bottom 24px; left text 13px, "voltline" 17px.
  Shade becomes linear-gradient(180deg, rgba(5,6,13,.7) 0%, transparent 38%), linear-gradient(0deg, rgba(5,6,13,.75) 0%, transparent 30%).
≤350px: hide the "TRAILER" word.
≤820px landscape with max-height 520px: copy top 70px, h1 15vh, hide the card, tag top 52%.
There must be no horizontal scroll at any width.

Page <title>: "Grid Runner — Unplug the Hero". The section has aria-label "Grid Runner — draw to reveal"; the front canvas has role="img" and aria-label "Grid Runner in his helmet; draw to reveal Jay Okoro underneath"; decorative layers are aria-hidden.
