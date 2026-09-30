# Verkos Robotics

> **Source:** Framesbase (MCP)  
> **Type:** sites  
> **Category:** Robotics  
> **Deliverable:** prompt  
> **Opened via:** framesbase MCP on 2026-09-30

---

Build one standalone index.html (HTML + CSS + vanilla JS only, no frameworks, no build step) that recreates the Verkos landing page exactly. White page, Inter, sticky scroll scenes, mobile responsive. Use the CloudFront PNG URLs below as the real image sources. Do not substitute placeholders, stock photos, or generated images. Do not add a <video> element. The hero is two full-bleed still images that crossfade on scroll.

PAGE
Title: Verkos — The Nervous System for Physical Operations
Meta description: Verkos is an AI-native operational intelligence platform that transforms industrial facilities into autonomous entities.
Language: en. Viewport: width=device-width, initial-scale=1.
Background #fff. Text color #0A0A0B. Body margin 0, overflow-x hidden, -webkit-font-smoothing antialiased.
Font: Google Fonts Inter weights 300, 400, 500, 600, 700. Preconnect fonts.googleapis.com and fonts.gstatic.com. Stack: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif. Body weight 400.
Reset: border-box. img { max-width:100%; display:block }. h1,h2,h3,p margin 0. button inherits font and color, border 0, background none, cursor pointer.

TOKENS
--ink:#0A0A0B
--ink-2:#3A3A42
--muted:#B1AFB6
--faint:#D6D5DC
--purple:#6C31D9
--purple-lt:#7C4DEA
--panel:#F6F4FB
--line:rgba(108,49,217,.22)
--slab-top-a:#DCD2FE
--slab-top-b:#B49BF6
--slab-side-a:#9B6DF7
--slab-side-b:#6D28D9
--alert:#E23B3B
--ok-bg:rgba(219,245,224,.92)
--ok-ink:#17311F
--nav-h:74px
--gutter:clamp(16px,4vw,40px)
--ease:cubic-bezier(.22,.61,.36,1)
Hero A: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_195936_f0de7dcd-eb12-4db3-8964-5403dc6472f6.png
Hero B: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_200129_317be2c2-73fc-461c-9980-139305628bc2.png
Quadruped: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_200245_6438a01f-b0be-4ca6-84b5-05c2335db1ce.png
Drone: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_200248_94585d80-5f12-4dd6-88f2-c51530810ddc.png
Humanoid: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_200428_597e31e2-e842-4d6d-99fb-9759055df68d.png
Drone-in-a-box: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_200456_60a2f7ce-7fc6-47dd-acf2-33c7cb3d10f4.png
Rover: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_200242_24e51f89-a6a2-4a3d-817c-ea972debc06c.png
Sensors: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_200256_95687c15-d5b4-44e9-b347-85c779cd7e0f.png
Cameras: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_200300_a342388e-ee99-4f7a-aeca-c4b19ee78106.png

SHARED
Pill: inline-flex, center, gap 9px, white, radius 999px, padding 6px 16px 6px 6px, 13.5px weight 500, letter-spacing -0.005em, color ink, shadow 0 2px 14px rgba(24,16,56,.10), nowrap. Badge 26×26 SVG: circle r=12 fill #6C31D9, circle r=5.8 fill none stroke #fff stroke-width 2.2, circle r=2.3 fill #fff.
Small pill: 12.5px, padding 5px 14px 5px 5px, badge 22×22.
Beta button: inline-flex, background #6C31D9, white, radius 999px, padding 11px 22px, 14px weight 600, letter-spacing -0.01em, no underline, shadow 0 6px 20px rgba(108,49,217,.30). Hover: translateY(-1px), background #7C4DEA, shadow 0 10px 28px rgba(108,49,217,.38). Transition 0.35s --ease on transform, box-shadow, background.
Word reveal: split text into .w spans, keep whitespace and <br>. Each .w starts color #D6D5DC and turns #0A0A0B in 0.32s linear when .on is added.

1. NAV
Fixed, inset top, height 74px, z-index 90, flex space-between, padding 0 gutter. The bar is pointer-events none; children are pointer-events auto.
Logo href="#top": letters v e r k, then an outlined circle as the o, then s. 23px weight 500 letter-spacing 0.20em line-height 1 color ink, no underline. The o SVG is 0.72em, color #6C31D9, viewBox 0 0 24 24, circle cx 12 cy 12 r 8.6, fill none, stroke currentColor, stroke-width 2.7, margin 0 0.20em 0 0.02em.
Right link "Apply for Beta" href="#" uses the beta button.

2. HERO
section.hero#top height 380vh. .hero-stage sticky top 0, height 100vh, overflow hidden, background #eef0f4.
Two absolute inset layers, background-size cover, background-position center 42%, will-change opacity,transform.
Layer A = Hero A, opacity 1. Accessible name: "Isometric render of an industrial facility with one equipment rack glowing red".
Layer B = Hero B, opacity 0, aria-hidden.
Veil, pointer-events none:
linear-gradient(to bottom, rgba(255,255,255,.55) 0, rgba(255,255,255,0) 22%),
linear-gradient(to top, rgba(255,255,255,.88) 0, rgba(255,255,255,.28) 26%, rgba(255,255,255,0) 46%).

Chips: position absolute, left var(--x), top var(--y), flex, gap 9px, padding 8px 15px, radius 999px, 13px weight 450, letter-spacing -0.005em, line-height 1.28, white-space pre-line. Shadow 0 5px 20px rgba(22,16,50,.13). Start opacity 0 and transform translate(-50%,-50%) scale(.72). .show: opacity 1 and scale(1). Transition opacity .45s and transform .55s with --ease. backdrop-filter blur(7px).
Alert chip: background rgba(255,255,255,.93), color ink, 8×8 dot #E23B3B with shadow 0 0 0 3px rgba(226,59,59,.18).
Alerts in order:
53.6% / 6.7% Vibration Spike
65.1% / 28.0% Motion Alert
49.7% / 42.9% Access Repeated Attempt
27.5% / 51.4% Manual Log Pending
80.9% / 52.4% Safety Violation
52.4% / 63.8% Heat Signature Anomaly
20.6% / 66.4% Loitering Detected
Resolved chip: background rgba(219,245,224,.92), color #17311F. Icon 15×15: white circle, path "M5.8 10.3l2.7 2.7 5.7-5.9" stroke #3E9A57 width 1.9 round caps. Keep the line break inside the label.
Resolved in order:
55.6% / 10.2% Abnormal Vibration — / Rover Patrol Initiated
66.2% / 27.9% False Alert Suppressed / via Multi-Cam Validation
49.4% / 41.7% SOP Protocol Initiated
78.5% / 50.6% Copilot Triggered / EHS Alert
51.7% / 60.8% Thermal Inspection / Triggered
24.1% / 63.3% Drone Recon & Forensic / Package Auto-Created

Copy: absolute, left gutter, bottom clamp(40px,7vh,70px), z-index 4, max-width min(760px,86vw).
Pill: AI-Native Operational Intelligence Platform. Margin-bottom 22px.
H1 weight 400, clamp(34px,5.1vw,70px), letter-spacing -0.035em, line-height 1.035:
The Nervous System
for Physical Operations.

CTA: absolute, right gutter, same bottom, z-index 4, flex, gap 16px.
Play: 58×58 circle, background rgba(120,120,130,.34), grid center, backdrop blur 5px. Hover background rgba(120,120,130,.48) and scale 1.05. White triangle 17×17 path "M0 0l12 7-12 7z", margin-left 3px. aria-label "Play showreel".
Glass card href="#": flex gap 15px, background rgba(255,255,255,.55), radius 18px, padding 12px 20px 12px 12px, blur 14px, shadow 0 8px 30px rgba(22,16,50,.10), color ink, no underline.
Mark 56×56 radius 15px white, shadow 0 2px 10px rgba(22,16,50,.09). SVG 32×32 fill #5B12E0 fill-rule evenodd, path:
M18.4 3h11.2a7 7 0 0 1 4.95 2.05l8.4 8.4A7 7 0 0 1 45 18.4v11.2a7 7 0 0 1-2.05 4.95l-8.4 8.4A7 7 0 0 1 29.6 45H18.4a7 7 0 0 1-4.95-2.05l-8.4-8.4A7 7 0 0 1 3 29.6V18.4a7 7 0 0 1 2.05-4.95l8.4-8.4A7 7 0 0 1 18.4 3Zm3.1 14.2h5a4.6 4.6 0 0 1 3.25 1.35l2.7 2.7A4.6 4.6 0 0 1 33.8 24.5a4.6 4.6 0 0 1-1.35 3.25l-2.7 2.7a4.6 4.6 0 0 1-3.25 1.35h-5a4.6 4.6 0 0 1-3.25-1.35l-2.7-2.7A4.6 4.6 0 0 1 14.2 24.5a4.6 4.6 0 0 1 1.35-3.25l2.7-2.7a4.6 4.6 0 0 1 3.25-1.35Z
Line 1: flex gap 26px, 14.5px weight 500 letter-spacing -0.01em, text "Apply for Beta", arrow 11×11 stroke currentColor width 1.6 opacity .75, path "M2.5 9.5L9.5 2.5M4 2.5h5.5V8".
Line 2: block, margin-top 10px, 13.5px line-height 1.35 color #3A3A42:
Shape the Future of
Operational Intelligence.

Rail: absolute, right calc(gutter - 12px), top 50%, translateY(-50%), z-index 4, column, gap 7px, aria-hidden. Track 3×52 radius 2px background rgba(30,26,50,.16). Fill height starts 0, background rgba(30,26,50,.62), JS sets height to progress*100%. Three 3×3 dots rgba(30,26,50,.30).

HERO SCROLL, progress p from 0 to 1 across 380vh:
inT = map(p, 0.10, 0.36). outT = map(p, 0.40, 0.50).
Each alert shows when inT >= (i+1)/count * 0.92 AND outT < 0.55.
x = map(p, 0.38, 0.55). Image B opacity = x. Image A opacity = 1 - x*0.92.
okT = map(p, 0.52, 0.80). Each resolved chip shows when okT >= (i+1)/count * 0.9.
Both backgrounds transform scale(1 + p*0.055).
Rail fill height = p*100%.

3. TRUST
Padding clamp(56px,9vh,104px) 0 clamp(44px,7vh,78px). Inner max-width 1440px, gutter, flex, center, gap clamp(20px,4vw,48px).
Label nowrap, 13px, line-height 1.4, weight 450:
Built by FlytBase
with the trust of:
Marquee flex 1, overflow hidden, border-left 1px #E8E7EE, padding-left clamp(20px,3vw,40px). Mask: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent). Track flex, width max-content, animation slide 34s linear infinite to translateX(-50%). Pause on hover. JS duplicates the brand row once so the loop is seamless.
Brands color #C6C5CE, size clamp(17px,1.6vw,25px), padding 0 clamp(24px,3.4vw,56px), nowrap. Hover color #B4B3BE, transition .4s.
Statnett weight 600 letter-spacing -0.01em
CSX weight 800 letter-spacing 0.02em
Dole weight 800 letter-spacing -0.02em
Xcel Energy weight 700 italic letter-spacing -0.02em
AngloAmerican weight 600 letter-spacing -0.01em
NSW | Transport / for NSW — weight 500, size clamp(14px,1.2vw,18px), line-height 1.15, text-align left, line break before "for NSW"
Rule under the strip: 1px #EEEDF3 inside the same 1440px gutter box.

4. ABOUT — section#about, height 260vh
This is the second content section. The three product images are small white cards pinned to the paragraph. They are not a gallery, not circles, and they do not bob on a keyframe loop.

DOM, exactly:
section.about
  div.about-stage
    div.about-in
      div > span.pill.sm "About Company"
      div.about-copy
        p.reveal
        figure.float.f1
        figure.float.f2
        figure.float.f3

.about-stage: sticky top 0, min-height 100vh, flex, align-items center.
.about-in: relative, width 100%, max-width 1440px, margin auto, padding 0 gutter, grid columns minmax(0,300px) minmax(0,1fr), gap clamp(20px,4vw,60px), align-items start.
Pill margin-top 12px.
.about-copy: position relative, max-width 700px. The figures are position absolute children of THIS box only. Percentages resolve against the paragraph column, not the section and not the viewport.
Paragraph: clamp(23px,2.9vw,41px), weight 400, letter-spacing -0.028em, line-height 1.24. Word-reveal across about progress 0.06 to 0.78:
While every digital system became intelligent, $47 trillion in physical infrastructure still runs on manual processes. Verkos transforms industrial facilities into autonomous entities — sites that secure and inspect themselves, predict their own failures, and coordinate their own responses with human oversight.

Card CSS, all three:
position absolute; margin 0; z-index 3;
width and height var(--s);
border-radius 16px; background #fff;
box-shadow 0 8px 26px rgba(22,16,50,.13);
display grid; place-items center; padding 9px;
opacity 0;
transform: translate3d(0,26px,0) scale(.86);
transition: opacity .7s var(--ease), transform .9s var(--ease);
will-change transform, opacity.
.float.in { opacity 1; transform: translate3d(0,0,0) scale(1); }
img { width 100%; height 100%; object-fit contain; } so the transparent product PNG sits inside the padding and never crops.
No rotate. No infinite animation. No float keyframes. The only motion after entrance is margin-top set from scroll.

Desktop anchors:
f1: left -4%; top 23%; --s 88px. Quadruped URL. alt "Quadruped inspection robot"
f2: right 2%; top 31%; --s 96px. Drone URL. alt "Autonomous inspection drone"
f3: left 52%; top 70%; --s 84px. Humanoid URL. alt "Humanoid field robot"
f1 hangs slightly off the left edge of the text column. f2 sits on the right edge, higher than center. f3 sits low, just right of the text midpoint. They overlap the paragraph.

Scroll, about progress p:
Add class "in" when p > 0.10 + index*0.09. Once on, leave it on. Index 0 at 0.10, index 1 at 0.19, index 2 at 0.28.
Every frame also set:
marginTop = (-26 * p * (index % 2 ? 1 : -1)) + "px"
Index 0 and 2 move downward as p grows, up to +26px. Index 1 moves upward, up to -26px. This is a slow parallax drift, not a hover bob.

5. LEARNING LOOP — section#technology, height 100vh, overflow hidden, display grid, place-items center
Static scene. Do not make this section 260vh or 380vh.

The three purple dots must sit ON the circle stroke for the whole spin. Do not position them with left/top percentages inside the ring. Do not use a separate orbit radius. Use this structure only:

div.ring-wrap
  div.ring
  div.orb style="--a:0deg" > i
  div.orb style="--a:128deg" > i
  div.orb style="--a:243deg" > i

.ring-wrap: position absolute; left 50%; top 50%; width min(62vh, 560px); aspect-ratio 1; transform translate(-50%,-50%).
.ring: position absolute; inset 0; border-radius 50%; border 1px solid rgba(108,49,217,.22); background transparent.
.orb: position absolute; inset 0; transform-origin center center; transform rotate(var(--a)); animation orb-spin 28s linear infinite.
.orb i: position absolute; left 50%; top 0; width 15px; height 15px; margin -7.5px 0 0 -7.5px; border-radius 50%; background #6C31D9; box-shadow 0 2px 10px rgba(108,49,217,.35).
@keyframes orb-spin {
  from { transform: rotate(var(--a, 0deg)); }
  to { transform: rotate(calc(var(--a, 0deg) + 360deg)); }
}

Why this puts the dot on the circle: .orb is the same square as the ring. top:0 and left:50% is the top-center of that square, which is a point on the circular border. The -7.5px margins center the 15px dot on that point. Rotating .orb around its own center carries the dot along the circumference. 0deg is 12 o'clock. 128deg and 243deg are clockwise from there. Animate the .orb wrapper. Do not animate the dot with translate, offset-path, or a different transform-origin.

Center copy, position relative, z-index 2, text-align center, display grid, justify-items center, gap 20px. It sits in front of the ring.
Small pill: The Technology
H2 weight 400, clamp(26px,3.6vw,46px), letter-spacing -0.032em, line-height 1.14:
Essence of Verkos:
The Learning Loop
IntersectionObserver on the section, threshold 0.4, adds .on to every word once, then unobserves.

6. DATA ENGINE — section#data-engine height 560vh
Sticky stage: top 0, height 100vh, display grid, place-items center, overflow hidden.
Two children of .engine-stage, in this order:
1. div.engine-card
2. div.stackwrap > div.stackpos
The stack is a sibling of the card, not a child of it. The card is overflow hidden. If the stack is placed inside the card, the travel and the globe get clipped. Do not do that.

CARD
max-width 1440px, width calc(100% - gutter*2), background #F6F4FB, radius 26px, aspect-ratio 16/8.3, max-height 82vh, min-height 440px, overflow hidden, position relative.
Title "Verkos Data Engine": absolute, left 50%, top 78%, translate(-50%,-50%), clamp(24px,3.1vw,42px), weight 400, letter-spacing -0.03em, color #B1AFB6, nowrap, z-index 1, opacity 0, transition opacity 1.1s. When the card has .in, CSS sets opacity 1. JS later overwrites opacity during the merge. Add .in with IntersectionObserver threshold 0.22, once.

ARC OF SEVEN DEVICES
div.stage data-arc is position absolute, inset 0, z-index 2, transform-origin 50% 56%, --device: min(7.6vw, 96px), will-change transform, opacity.
Do not add perspective. Do not draw the pedestals as images or SVG. Build them with CSS 3D transforms exactly as follows.

Each node:
position absolute; left var(--l); top var(--t); width var(--w); transform translate(-50%,-50%); z-index var(--z).
.lift: position relative; opacity 0; transform translate3d(0,70px,0); transition opacity .8s and transform 1s with --ease; transition-delay var(--d).
When card has .in, .lift becomes opacity 1 and transform translate3d(0,0,0).

.ped: position relative; width 70.7%; margin 0 auto; aspect-ratio 1.
The 70.7% is required. A square rotated 45deg is 1.414 times wider than its side, so the square must be 70.7% of --w for the visible diamond to match --w.
Both faces: position absolute; inset 0; border-radius 8% 30% 30% 30%. The small 8% corner is top-left, and rotateZ(45deg) carries that chamfer to the far point of the diamond.
.side: background linear-gradient(200deg, #9B6DF7, #6D28D9); transform: translateY(24%) rotateX(58deg) rotateZ(45deg).
.top: background linear-gradient(200deg, #DCD2FE, #B49BF6); transform: rotateX(58deg) rotateZ(45deg); box-shadow: 0 0 0 4px rgba(255,255,255,.92), inset 0 0 0 1px rgba(255,255,255,.5).
DOM order inside .ped: span.side, span.top, img.device. Side first so the top face paints over it. The white 4px ring is the lit edge.

The device image is a sibling of the faces, not a child of .top, so it stays upright and is not skewed by rotateX/rotateZ.
img.device: position absolute; left 50%; bottom 36%; width var(--device); height var(--device); object-fit contain; object-position center bottom; z-index 3; filter drop-shadow(0 10px 16px rgba(70,40,140,.20));
animation hover 5.5s ease-in-out infinite; animation-delay var(--d).
The flying drone node uses animation-duration 4s.
@keyframes hover {
  0%,100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-6px); }
}
The keyframes must keep translateX(-50%). A translateY-only keyframe will throw the image off the pedestal.

Nodes, left to right. --z equals the top percent so lower pedestals paint above higher ones:
13% / 79% / --w 18% / z 79 / delay 0.00s — drone-in-a-box, alt "Autonomous drone-in-a-box docking station"
20% / 57% / 15% / z 57 / 0.08s / class "flying" — drone, alt "Autonomous inspection drone"
33% / 42% / 16% / z 42 / 0.16s — humanoid, alt "Humanoid field robot"
50% / 36% / 15% / z 36 / 0.24s — rover, alt "Rugged autonomous ground rover"
67% / 42% / 15% / z 42 / 0.32s — quadruped, alt "Quadruped inspection robot"
80% / 57% / 14% / z 57 / 0.40s — sensors, alt "Industrial IoT sensor modules"
87% / 79% / 15% / z 79 / 0.48s — cameras, alt "CCTV and access-control camera cluster"

LAYER STACK
.stackwrap: position absolute; inset 0; z-index 4; pointer-events none. Covers the sticky stage.
.stackpos: position absolute; left 80%; top 62%; width min(43vw, 620px); aspect-ratio 1; opacity 0; will-change transform, opacity.
CSS transform starts as translate(-50%,-50%). JS replaces style.transform every frame and must repeat that centering translate inside the JS string.

Do not put a CSS transition on .stackpos, .slab, .stage, or the globe opacity. Those values are scrubbed 1:1 from scroll. A transition will make the illustration lag and look wrong.

Globe SVG.orbit inside .stackpos: viewBox 0 0 400 400; position absolute; left 50%; top 48%; width 112%; aspect-ratio 1; transform translate(-50%,-50%); opacity 0; overflow visible; z-index 5.
circle.rim cx 200 cy 200 r 199.
ellipse.mer cx 200 cy 200 ry 199, with rx 199, then 140, then 68.
Stroke rgba(108,49,217,.34), stroke-width 1, fill none, vector-effect non-scaling-stroke.
Meridians: transform-box fill-box; transform-origin center; animation meridian 11s linear infinite. Second delay -3.6s, third -7.2s.
@keyframes meridian {
  0% { transform: scaleX(1); }
  25% { transform: scaleX(.03); }
  50% { transform: scaleX(-1); }
  75% { transform: scaleX(-.03); }
  100% { transform: scaleX(1); }
}
Four rim nodes, painted on the circle, each a group with halo r 11 fill rgba(124,77,237,.13) and pip r 2.2 fill #6C31D9:
translate(12,136), translate(60,59), translate(152,7), translate(268,13).
Groups pulse opacity .85 to 1 over 3.4s ease-in-out. Even groups delay -1.7s.
The globe is z-index 5 and the slabs are z-index 1, so the wireframe is a cage drawn over the stack.

Four slabs, all position absolute, inset 0, z-index 1, same box, later DOM paints on top. No perspective.
Faces: position absolute; inset 0; border-radius 10% 30% 30% 30%.
.side: linear-gradient(200deg, #CBB8FC 0%, #9B6DF7 42%, #6D28D9 100%); transform translateY(11%) rotateX(58deg) rotateZ(45deg).
.top: linear-gradient(200deg, #D2C4FD, #9C83F3); transform rotateX(58deg) rotateZ(45deg); box-shadow 0 0 0 5px rgba(255,255,255,.92), inset 0 0 0 1px rgba(255,255,255,.5).
The label is an em INSIDE .top, so it is painted in the isometric plane. Then the em itself is rotate(-90deg), which turns the words to run up-and-right along the slab. Do not position these labels in screen space.
em: position absolute; left 50%; top 50%; transform translate(-50%,-50%) rotate(-90deg); font-style normal; font-weight 500; font-size min(3.6vw,48px); line-height 1.04; letter-spacing 0.005em; color #fff; text-transform uppercase; text-align center; white-space pre; text-shadow 0 1px 10px rgba(80,40,170,.18).

Slab DOM order, bottom to top. Keep these four labels even though the left copy has three articles. Do not rename slabs to match the copy.
0 Memory / Layer
1 Multimodal / Intelligence / Processing
2 Agentic Action / Orchestration
3 Reinforcement / Learning From / Human Feedback

LEFT COPY, inside the card
Three dots: position absolute; left 3.6%; top 7.4%; display grid; gap 10px; z-index 3. Each i is 7×7 radius 50% background #DAD7E7. .on: background #6C31D9 and scale 1.18. Transition background and transform .45s.
Copy block: position absolute; left 5%; bottom 7%; width min(48%,560px); z-index 3.
Three articles occupy the same corner: position absolute; left 0; bottom 0; width 100%; opacity 0; transform translateY(16px); transition opacity .55s and transform .7s. .on: opacity 1; transform none.
H2: clamp(21px,2.6vw,37px), weight 400, letter-spacing -0.032em, line-height 1.14, margin 18px 0 15px.
P: clamp(11.5px,.9vw,13px), line-height 1.55, color #3A3A42, max-width 500px.
Article 0, pill Cognition Layer, heading From Raw Data to / Actionable Intelligence, body: Raw data becomes operational intelligence. The system identifies trends before they become problems, recognizes patterns humans miss, generates smart alerts that matter, and detects anomalies before they cascade into failures.
Article 1, pill Action Layer, heading Intelligence Without Action / Is Just Expensive Monitoring, body: The moment intelligence identifies a need, autonomous action begins. Drones launch for closer inspection. Maintenance teams receive prioritized alerts. Emergency protocols activate automatically. The gap between detection and response disappears.
Article 2, pill Memory Layer, heading Getting Smarter from / Every Human Interaction, body: Every operator decision teaches the system. Every feedback loop improves performance. The AI learns not just from data, but from human expertise—capturing institutional knowledge and making it permanent, scalable, and instantly accessible.

CALLOUTS, inside .stackpos so percentages track the stack box
.olabels absolute inset 0, z-index 6, pointer-events none.
.olab: position absolute; left var(--x); top var(--y); transform translate(var(--tx), var(--ty)); font clamp(9px,.86vw,12px); line-height 1.4; letter-spacing 0.045em; uppercase; white-space pre-line; color #2A2A33; background #fff; box-shadow 0 1px 7px rgba(22,16,50,.09); padding 5px 9px; border-radius 3px; opacity 0; transition opacity .5s.
.aside: --tx calc(-100% - 15px); --ty -50%.
.atop: --tx -50%; --ty calc(-100% - 13px).
data-olab follows the COPY index, not the slab index.
olab 0 aside, x -2.6% y 30.1%: Anomaly / Detection
olab 1 aside, x -2.6% y 30.1%: Drone / Dispatch
olab 1 aside, x 10.8% y 8.5%: Auto Task / Creation
olab 2 aside, x -2.6% y 30.1%: Drones & / Payloads
olab 2 aside, x 10.8% y 8.5%: Rovers & UGVs
olab 2 atop, x 36.6% y -6%: CCTV & Access / Control

ENGINE SCROLL — implement this math, do not approximate it
Constants: STEP_AT = [0.42, 0.60, 0.78], MERGE = [0.17, 0.29], TRAVEL = [0.27, 0.43], LAYER_GAP = 5.
map(v,a,b) = clamp((v-a)/(b-a), 0, 1).
Let W and H be the sticky stage's clientWidth and clientHeight.

Arc, every frame:
m = map(p, 0.17, 0.29)
stage transform = scale(1 - m*0.8)   // 1.00 down to 0.20, origin 50% 56%
stage opacity = 1 - m
title opacity = 1 - map(p, 0.17, 0.23)
This overwrites the CSS title fade, so the title is visible after .in and then disappears as the arc collapses.

Stack travel, every frame:
t = map(p, 0.27, 0.43)
dx = (1 - t) * (0.50 - 0.78) * W    // starts at -0.28*W, ends at 0
dy = (1 - t) * (0.585 - 0.55) * H   // starts at +0.035*H, ends at 0
s = 0.80 + t * 0.20                 // 0.800 to 1.000
stack opacity = map(p, 0.19, 0.29)
stack transform = translate(-50%,-50%) translate(dx px, dy px) scale(s)
At p=0.27 the merged slab is left of its rest slot and slightly lower, at 80% scale. By p=0.43 it is centered on left 80% top 62% at full scale. That reads as a move from the middle of the stage out to the right.
Globe opacity = map(p, 0.34, 0.47). JS sets this on the SVG every frame.

Slab drop, every frame. Slab 0 stays transform translateY(0%) and its own opacity stays 1. The parent stack opacity reveals it.
For k = 1, 2, 3:
a = map(p, STEP_AT[k-1], STEP_AT[k-1] + 0.10)
slab opacity = a
slab transform = translateY( (-k * 5 + (1-a) * -58) % )
Resting offsets are -5%, -10%, -15%. Negative Y moves the upper plates UP into a tight stack. At the start of each drop the plate is an extra 58% above that rest point, then eases onto it while fading from 0 to 1.
Timing of the drops:
k1 Multimodal begins at p 0.42 and finishes at 0.52
k2 Agentic begins at p 0.60 and finishes at 0.70
k3 Reinforcement begins at p 0.78 and finishes at 0.88

Copy and dots, every frame:
shown = p > 0.33
cur = 0 while p < 0.60, then 1 while p < 0.78, then 2
Article i and dot i are .on only when shown and i === cur.
A callout is .on only when shown, its data-olab equals cur, and p > STEP_AT[cur] + 0.04.
So Cognition copy is on from 0.33 to 0.60, and its callout from 0.46.
Action copy is on from 0.60 to 0.78, and its callouts from 0.64.
Memory copy is on from 0.78 to 1, and its callouts from 0.82.
Leave this pairing as written. The base slab already says "Memory Layer" while the first visible article still says "Cognition Layer".

SCROLL LOOP
progress(el) = clamp(-rect.top / (rect.height - innerHeight), 0, 1). If the span is <= 0, return 1 when top <= 0, else 0.
One requestAnimationFrame on scroll and resize, passive. Each frame runs hero, about, and engine.
prefers-reduced-motion: set animation-duration and transition-duration to .001ms and animation-iteration-count to 1. Stop the marquee. Show hero B and the resolved chips. Add .in on the floats and the engine card. Turn all reveal words on. Call engineFrame(0) so the arc stays fully visible and the stack stays hidden.

RESPONSIVE
Max-width 1100px:
Hide the glass CTA card. Keep the play button.
About grid becomes 1 column, gap 26px.
Rewrite the float anchors completely, because the desktop left/top values would otherwise remain:
f1: left auto; right 4%; top -8%
f2: right -2%; top 40%
f3: left 4%; top auto; bottom -10%
Device size min(6.5vw, 84px).

Max-width 860px:
--nav-h 64px. Logo 19px, letter-spacing 0.16em. Beta padding 9px 16px, 12.5px.
Hero height 320vh. Chips 11px, padding 6px 11px, gap 6px, dot 6px.
Hero copy bottom clamp(96px,15vh,128px), max-width calc(100% - gutter*2 - 58px).
Hero pill 11.5px, padding 5px 12px 5px 5px, white-space normal, line-height 1.35, badge 21px.
H1 clamp(28px,7.8vw,42px).
CTA: left gutter, right auto, bottom clamp(28px,6vh,52px). Hide the rail.
Trust: column, align start, gap 22px. Marquee width 100%, border-left 0, padding-left 0.
About paragraph clamp(21px,5.4vw,32px).
Ring width min(70vw, 40vh). Loop copy padding 0 gutter, max-width 100%. Loop h2 clamp(22px,6.2vw,34px). Orb dots 12×12 with margin -6px 0 0 -6px, still at left 50% top 0 so they stay on the circle.
Engine height 440vh. Card aspect-ratio 3/4.1, max-height 84vh, min-height 0.
Title 20px, top 40%.
Arc transform-origin 50% 40%. --device min(10vw, 56px).
Each node: width calc(var(--w) * 1.4); top calc(var(--t) * .52 + 12%).
Stack: left 58%; top 26%; width 72vw.
Slab em font-size min(5.8vw, 28px).
Layer copy left 7%, bottom 7%, width 86%. H2 clamp(20px,5.6vw,26px), margin 14px 0 12px. Paragraph 12.5px, max-width none.
Dots: left 7%, top 3.5%, grid-auto-flow column.
Hide .olabels.

Max-width 560px:
--nav-h 58px. Logo 17px, letter-spacing 0.14em. Beta padding 8px 14px, 12px.
CTA gap 10px. Play 46×46.
Chips 9.5px, padding 5px 9px, max-width min(46vw,170px), white-space normal, line-height 1.25.
Hero copy bottom clamp(88px,14vh,112px), max-width calc(100% - gutter*2 - 52px).
H1 clamp(26px,7.4vw,34px).
Trust label white-space normal.
About paragraph clamp(19px,5.2vw,26px).
All three floats: --s 68px !important. Keep the 1100px anchors.
Ring width min(68vw, 34vh). Loop h2 clamp(20px,5.8vw,28px).

OUTPUT
Return only the finished index.html. Match every URL, label, breakpoint, and the scroll formulas above. Order: nav, hero, trust, about, learning loop, data engine.
