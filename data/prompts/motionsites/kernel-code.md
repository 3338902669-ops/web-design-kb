# Kernel Code

> **Source:** Framesbase (MCP)  
> **Type:** sites  
> **Category:** 3D  
> **Deliverable:** prompt  
> **Opened via:** framesbase MCP on 2026-09-30

---

Build one standalone file, index.html, with all CSS and JavaScript inline. No framework, no build step, no external CSS or JS except the two CDNs below. The page is a full-viewport, black, scroll-hijacked KernelCode landing experience: a loader, a custom cursor, a fixed header, a photographic hero with a live 3D voxel wordmark, then three particle panels. Match every token, copy string, URL, timing, and breakpoint below. Do not substitute assets, fonts, or layout.

The particle canvas is a required visible layer on sections 2, 3, and 4. Section 2 is a white fibonacci sphere. Section 3 is a white particle photograph of the keyboard. Section 4 is a white particle <K> wordmark. Those three clouds are large, dense, and obviously on screen. Implement the particle block below as real running code, including the shader source verbatim.

FONTS AND LIBRARIES
- Google font, preconnect fonts.googleapis.com and fonts.gstatic.com:
  https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap
- Body font stack: 'Schibsted Grotesk', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif. Weight 400, letter-spacing -0.02em, antialiased, color #fff, background #000.
- Import map:
  "three" -> https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js
  "three/addons/" -> https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/
- Import THREE and mergeGeometries from three/addons/utils/BufferGeometryUtils.js.
- Title: KernelCode — Learn Coding With KernelCode
- Viewport meta: width=device-width, initial-scale=1, viewport-fit=cover
- html and body: height 100% and 100dvh, overflow hidden, overscroll-behavior none. body.loading also overflow hidden and height 100vh.
- On any-pointer:fine, hide the native cursor on body, a, and button.

CLOUDFRONT ASSETS — use these URLs exactly, do not download or rehost
CDN base: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/
- Hero photographic plate (PNG, CSS background-image, cover, center):
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260923_000931_48441d07-5cf5-450a-8407-d0c86799b8a7.png
- Voxel K cutout (transparent PNG, crossOrigin anonymous):
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_225529_59ddf7d1-9a17-489b-931d-404bd48f65d0.png
- Voxel chevron cutout (transparent PNG, mirrored on X to make the right bracket):
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_225510_bd69a786-7cc4-4340-8ffe-2c49228d2483.png
- Keyboard photograph sampled into the particle cloud:
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_215237_121b02c2-4f84-43ad-91c1-9f44e6b5faf1.png

DESIGN TOKENS
:root {
  --bg:#000; --pad:22px; --nav-h:98px;
  --fs-hero: clamp(42px, 7.05vw, 112px);
  --fs-h2:   clamp(38px, 6.17vw, 104px);
  --fs-note: clamp(11.5px, 1.04vw, 18px);
  --fs-nav:  clamp(11.5px, 1.05vw, 17px);
  --fs-logo: clamp(19px, 2.18vw, 36px);
  --fs-btn:  clamp(12px, 1.13vw, 19px);
  --ls-disp:-.038em; --btn-h:47px; --header-h:var(--nav-h);
  --ease:cubic-bezier(.16,1,.3,1);
  --hair:rgba(255,255,255,.17);
  --dots: inline SVG data-uri, 13x13 view, white 10x10 rect (halftone squares).
}
canvas { display:block; width:100%; height:100%; }
a { color:inherit; text-decoration:none; }

LOADER
Fixed full-screen #loader, z-index 200, background #000. Fades out over 0.7s with --ease (opacity and visibility) when class "done" is added.
Bottom 3px track rgba(255,255,255,.13). White 3px fill grows from the left.
Percent label sits on the fill’s right edge (left = percent, transform translateX(-100%), padding-right 13px, bottom 17px), color #e8e8e8, font-size clamp(20px, 2.15vw, 34px), letter-spacing -0.035em. Starts visually at 0%.
Gate on four ready keys: bg, glb, keys, font. Percent eases toward got.size/4*100 from a shown value that starts at 6, step Math.max(0.5, (real-shown)*0.10) per frame. At 100, add .done, remove body.loading, refit the 3D hero, run layout, then reveal hero lines. Fallback: after 15s mark every key ready. Font ready = document.fonts.ready. Hero image onload/onerror marks bg. Glyph load marks glb. Keyboard image onload/onerror marks keys.

CUSTOM CURSOR (hidden on any-pointer:coarse)
#cursor: fixed 20x20 circle, margin -10px 0 0 -10px, 1.5px white border, border-radius 50%, mix-blend-mode difference, z-index 190, pointer-events none. Follows the pointer with lerp 0.22 each frame via transform translate.
.dot: 11x11, margin -5.5px, border 0, inner white 11px dot (pseudo ::after).
.big: 31x31, margin -15.5px, inner white 16px dot.
#cursorLabel "Scroll Down": fixed, z 190, pointer-events none, 11.5px, weight 600, letter-spacing -0.015em, opacity 0 until .on, translated to cursor x/y plus translate(-50%, 25px).
.dot while pointer is over the hero WebGL canvas (and while dragging). .big and label .on once scroll progress y > 0.70 * viewport height; label hides again once y >= 2.55 * vh.

HEADER (fixed, z-index 120)
Height: calc(var(--nav-h) + safe-area-inset-top). Padding: safe-area top, and horizontal max(var(--pad), safe-area). Flex, align center. touch-action manipulation.
Brand: "Kernel" in rgba(255,255,255,.60) italic-styled but font-style normal, then "Code" in white. font-size var(--fs-logo), letter-spacing -0.045em, line-height 1, nowrap.
Center pill nav, absolutely centered: height 42px, pill radius, background rgba(255,255,255,.10), 1px border rgba(255,255,255,.09), backdrop-filter blur(10px). Links, each with 1px left border rgba(255,255,255,.15) except the first: /About  /Programs  /AI Workflows  /Projects  /Pricing. href="#". font-size var(--fs-nav), letter-spacing -0.03em, padding 0 16px, color rgba(255,255,255,.95), hover #fff. Horizontal scroll, scrollbar hidden, when the pill is in the second header row.
Right CTA, margin-left auto: a circular white arrow button (var(--btn-h), color #131313, z-index 2) overlapped by a white pill "Start Learning" (height var(--btn-h), color #141414, padding 0 18px, margin-left -7px, font-size var(--fs-btn), letter-spacing -0.035em). Arrow SVG 13x13, viewBox 0 0 16 16, path "M4.2 11.8 11.8 4.2M11.8 4.2H5.6M11.8 4.2v6.2", stroke currentColor, stroke-width 1.7, round caps and joins. On hover of .cta or .btnpair (hover:hover and pointer:fine), the arrow rotates 45 degrees over 0.45s --ease.
Hamburger .navtoggle is display:none until the short+narrow breakpoint. var(--btn-h) circle, 1px border rgba(255,255,255,.22), background rgba(255,255,255,.10), three 15x1.5px white bars 5px apart. .open turns the middle bar transparent and rotates the other two into an X. aria-label Open menu / Close menu, aria-expanded, aria-controls="sitenav". Escape closes it. Clicking a nav link closes it. If the button is display:none on resize, force-close.

SCROLL SHELL
main is fixed inset 0, z-index 10, overflow hidden, background transparent. Each section is absolute inset 0, opacity 0, visibility hidden, pointer-events none. .show: opacity 1, visible, pointer-events auto, z-index 2, opacity transition 0.75s --ease. Leaving: .out-up translates Y -100% and fades; .out-down translates Y 100% and fades; those transitions are 0.9s --ease on opacity and transform, z-index 3. main and section have touch-action:none, except the step scroller and nav.
Four sections, full viewport each. Wheel, touch, and keys move one section at a time. There is no native document scroll.
Wheel: preventDefault unless the event target is inside #steps, .navpill, .note, .step, or #heroAside AND that box can still scroll in the gesture direction. Accumulate deltaY (line mode *32, page mode *vh). Reset the accumulator if more than 160ms since the last wheel event. Threshold 48px, then go one section. Ignore wheel while a transition is running and for 420ms after it finishes (coolUntil).
Touch: record start. On end, if the same inner scroller can consume the delta, do nothing. If |dx| > |dy|, do nothing. If |dy| > 48, go next (swipe up) or previous (swipe down).
Keys: ArrowDown, PageDown, Space go forward; ArrowUp, PageUp go back. preventDefault.
Transition: LEAVE_MS 900, ENTER_MS 750. Current section gets out-up or out-down. Particle/chrome view tweens from sectionIndex*vh to next*vh over 900ms (linear lerp of the progress value). On transform transitionend (or 980ms fallback), hide the old section, reset its reveals, then present the next: force opacity 0 with transition none, add .show, reflow, clear inline opacity/transition so the 0.75s fade runs, and play its reveals. Unlock after the entering section’s opacity transitionend or 830ms fallback.

Progress value y is in pixels and is the only input to the particle morph. Every section change must tween y. When a section settles, y equals sectionIndex * innerHeight. Call this same function on resize.
- y = 0: hero. Particle canvas opacity is 0.
- y = 1 * innerHeight: section 2. Canvas opacity is 1. Weights are exactly wA=1, wB=0, wC=0. The sphere fills the view.
- y = 2 * innerHeight: section 3. Weights are exactly wB=1. The keyboard cloud fills the view.
- y = 3 * innerHeight: section 4. Weights are exactly wC=1. The <K> cloud fills the view.
Also during the tween:
- hero photo translateY(y * 0.30)
- #stage class "on" when y > 0.55 * vh. #stage.on sets opacity to 1. Without this class the canvas stays invisible, so the class is mandatory.
- #rail class "on" when y > 0.75 * vh
- t = clamp(y/vh - 1, 0, 2). Weights:
  t < 0.30: wA=1, wB=0, wC=0, squeeze=1
  t < 0.70: k = smoothstep((t-0.30)/0.40), wA=1-k, wB=k, wC=0, squeeze = 1 - 0.93*sin(pi*clamp(k,0,1))
  t < 1.30: wA=0, wB=1, wC=0, squeeze=1
  t < 1.70: k = smoothstep((t-1.30)/0.40), wA=0, wB=1-k, wC=k, squeeze = 1 - 0.93*sin(pi*clamp(k,0,1))
  else: wA=0, wB=0, wC=1, squeeze=1
  smoothstep is t*t*(3-2*t). Write squeeze = max(squeeze, 0.02) into the uniform.
- rail fill height = clamp(y / (vh*3), 0, 1) * 100%
- cursor .big and label .on when y > 0.70*vh; label off when y >= 2.55*vh

RIGHT RAIL
#rail fixed, right 25px, vertically centered, 2px wide, 158px tall, z-index 110, opacity 0 until .on (0.4s). Track is a repeating linear gradient: rgba(255,255,255,.26) for 32px, transparent for 10px (period 42px). #railFill is the same pattern in solid white, height animated 0.22s linear.

HERO (#hero starts with class show)
Background of the section itself: linear-gradient to bottom, #466e87 0, #58829b 40%, #6d96b2 100% (letterbox sky).
#heroBg: absolute, left 0, right 0, top 6%, height 100%, z 0, background-size cover, background-position center, will-change transform, filter saturate(0.86) brightness(1). Image is the hero plate URL above.
#heroSky: absolute inset 0, z 1, pointer-events none. linear-gradient to bottom, rgba(20,80,130,.42) from 0 to 34%, fading to transparent at 46%.
#heroNums canvas: absolute inset 0, z 2. CSS mask linear-gradient to bottom: #000 0–20%, rgba(0,0,0,.55) at 36%, rgba(0,0,0,.14) at 48%, transparent at 58%. Same for -webkit-mask-image.
#heroShade: z 3, pointer-events none. linear-gradient to bottom: transparent at 50%, rgba(0,0,0,.18) at 62%, .45 at 74%, .80 at 84%, .90 at 100%.
#heroGL canvas: absolute inset 0, z 4. On coarse pointers, pointer-events none.
#heroCopy: absolute inset 0, z 5, pointer-events none (buttons re-enable via .btnpair).

Hero copy, bottom-left:
h1, font-size var(--fs-hero), weight 400, letter-spacing var(--ls-disp), line-height 1.011, position absolute, left max(pad, safe-area-left), bottom calc(4.4vh + safe-area-bottom), max-width calc(100vw - 2*pad).
Two lines, each a .rv span:
  Learn Coding
  With KernelCode   — this line has data-dot="1" and data-d="240"
Aside, absolute, right max(pad, safe-area-right), bottom calc(4.43vh + safe-area-bottom), width 20.1vw, min-width 200px:
Paragraph, class fade, font-size var(--fs-note), weight 500, line-height 1.31, letter-spacing -0.02em, text-align justify, margin-bottom clamp(13px, 2.0vh, 22px):
"Master programming, AI workflows and product thinking in one modern curriculum. Learn to build faster, automate repetitive work and focus on solving real problems."
Button pair, class "btnpair fade", pointer-events auto, width max-content: same arrow circle + pill, pill text "Explore Curriculum".

DOT-MATRIX TYPE
.dotfill: background-image var(--dots), background-size 6.5px 6.5px, repeat, background-clip text, color transparent, -webkit-text-stroke 0.4px rgba(255,255,255,.11).
Word split: each .rv’s text is split on spaces into inline-block spans; spaces become nbsp spans. If data-dot="1", every span including the space span gets class dotfill. After layout, re-base each dot span’s background-position so the 6.5px grid is continuous across the line: offset = -((spanRect - hostRect) mod 6.5) on x and y.

REVEALS
.rv > span starts opacity 0, filter blur(13px), translateY(0.12em). .rv.in brings them to opacity 1, blur 0, transform none, transition 0.85s --ease. Per-word delay = (data-d or 0) + index*55 ms.
.fade starts opacity 0, translateY(14px). .fade.in clears that, transition 0.9s --ease.
revealSection staggers each .rv and .fade by setTimeout(40 + i*90). Hero’s first play uses 140 + i*110 instead, and only #hero .rv and #hero .fade. Resetting a section deletes data-done, removes .in, and clears transition-delays. play() no-ops if data-done is set.
fitHeadings: shrink h1/h2 font-size by 4% steps down to 20px until the widest .rv line fits the available width (for the hero, that width stops before the absolutely positioned aside, with 28px gap). Run on load and resize, then regrid(). Also set --header-h to the header’s offsetHeight.

HERO NUMBER FIELD
2D canvas, devicePixelRatio capped at 2. Grid pitch COL=47, ROW=33. Columns = ceil(width/47)+1. Rows cover the top 66% of the height. Font: 500 20px "Schibsted Grotesk", Helvetica, sans-serif, textBaseline top. Hash(c,r) = fract(sin(c*127.1 + r*311.7) * 43758.5453). Skip a cell when hash < 0.12. Value = clamp(round(50 + 49 * sin(c*0.19 + r*0.075 + t*0.22) * cos(r*0.14 - t*0.09 + c*0.03)), 0, 99), drawn at (c*47+10, r*33+7). Fill rgba(255,255,255, 0.17 + 0.33*hash(r,c)). t increases by 0.08 every 110ms. Redraw on resize.

HERO 3D WORDMARK < K >
WebGLRenderer on #heroGL, antialias true, alpha true, pixel ratio min(dpr, 2), ACESFilmic tone mapping, exposure 1.05, output SRGB.
Camera: PerspectiveCamera fov 32, near 1, far 6000, z = 600 before fit. Scene environment is a PMREM of a 1024x512 equirect canvas: sky gradient #eef5fb at 0, #b6cddc at 0.55, #6d8ea3 at 1 (top half); ground from y=254: #f6efe6, #a8836c at 0.07, #5a3b2e at 0.26, #241812 at 1; plus a white radial key light centered near (300, 84) radius 210. Hemisphere light 0xe6f1fa / 0x4a352c intensity 0.22. Directional 0xffffff intensity 0.60 at (-3, 2.4, 3.4). Directional 0xffe6c9 intensity 0.22 at (2.7, -1.5, 1.5).
Build voxels from the two cutout PNGs. Draw each into a 320 canvas, alpha > 128 is on. Crop to the opaque bounding box. For row counts in a range, pick the grid the alpha agrees with most, resampling onto that cell size (cell is on when coverage >= 50% of the cell). K searches 7–10 rows. Chevron searches 5–8 rows. Extrude every live cell as a box: depth 1.15 if hash<0.14 (z +0.20), 0.60 if hash<0.30 (z -0.10), else 0.82 (z 0). Scale each box 0.97, 0.97, depth so seams show. Merge with mergeGeometries. Center each glyph on its own bbox, Y up.
Materials, MeshPhysicalMaterial:
- Chevrons: color 0xeef3f8, metalness 0.88, roughness 0.09, clearcoat 1, clearcoatRoughness 0.05, iridescence 1, iridescenceIOR 1.32, iridescenceThicknessRange [130, 540], envMapIntensity 1.45, reflectivity 0.94.
- K: color 0x5d768d, metalness 0.94, roughness 0.15, clearcoat 1, clearcoatRoughness 0.09, iridescence 0.45, iridescenceIOR 1.28, iridescenceThicknessRange [160, 470], envMapIntensity 1.15, reflectivity 0.86.
Layout: left chevron, K, right chevron (scale.x = -1 on a second chevron mesh). GAP = 1 cell. Center the row on the origin. Parent group scale = 1/max(rows) so the wordmark height is 1 world unit.
Hierarchy: root (screen offset) > bobber (idle float) > spinner (drag/sway) > wordmark.
Fit: default frac 0.535 of viewport width, rise 84px. worldPerPx = span.x / (frac * width). Camera z = (height * worldPerPx / 2) / tan(fov/2). root.position.y = rise * worldPerPx. Below 1100px wide or 700px tall, shrink frac so the flat wordmark stays inside the band between the header bottom + 8px and the hero text top - 46px, using about 52% of that band, frac clamped between 0.16 and 0.535, and place the vertical center at 32% down that band. Under 560px height, also cap the flat height to the room between header and text and center it in that gap.
Idle: sway amplitude 0.30 rad (0.35× that amplitude when height < 560), period 13s. Target rotY starts 0.22, rotX -0.07. When not dragging, rotX eases toward -0.06 + pointerY*0.10. Drag on the canvas: bias += dx*0.0092, rotX target += dy*0.0062 clamped to [-0.62, 0.62], velocity vY = dx*0.0007. On release vY *= 0.955 and bias *= 0.992 per frame. Displayed rotation lerps toward the target at 0.085. Bobber Y = sin(t*0.62) * 7 * worldPerPx. Bobber roll z = sin(t*0.43)*0.012. Bobber yaw += pointerX*0.09. Pointer is normalized clientX/width-0.5 and clientY/height-0.5. Render every frame.

PARTICLE CANVAS — THIS LAYER MUST BE VISIBLE
DOM, in this order, as siblings: #loader, #cursor, #cursorLabel, header, canvas#stage, #rail, main. The particle canvas is not inside a section. It is not inside main.

CSS, required exactly:
#stage {
  position: fixed;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  background: transparent;
  transition: opacity .5s linear;
}
#stage.on { opacity: 1; }
main, .panel, #s2, #s3, #s4 { background: transparent; }
The hero section is the only opaque panel. Sections 2, 3, and 4 paint no background color, no background image, and no pseudo-element fill, so the white points show through the type onto the black page.

Renderer: one THREE.WebGLRenderer on canvas#stage (the classic WebGL renderer, alpha true, antialias false, pixel ratio min(devicePixelRatio, 1.75)). Call setSize(innerWidth, innerHeight, false) immediately and on every resize. Scene background stays null. Camera is PerspectiveCamera(45, innerWidth/innerHeight, 1, 8000). Position z so 1 world unit equals 1 CSS pixel at z = 0:
  camera.position.z = (innerHeight / 2) / Math.tan(22.5 * Math.PI / 180)
Update the projection matrix after every resize. A requestAnimationFrame loop runs for the whole page lifetime and always calls renderer.render(scene, camera). Create the Points object at startup and add it to the scene immediately. The sphere positions exist before any image loads, so section 2 is visible even while the keyboard image is still loading.

Count: PN = 30000. Allocate Float32Arrays pA, pB, pC of length PN*3. Also sd, sc, al of length PN.
For each i: sd[i] = Math.random(); sc[i] = 0.50 + Math.random()*0.85; u = Math.random(); al[i] = 0.22 + 0.78*u*u.
Form A, written into pA at startup, fibonacci sphere:
  R = 302
  golden = Math.PI * (3 - Math.sqrt(5))
  y = 1 - (i / (PN-1)) * 2
  r = Math.sqrt(max(0, 1-y*y))
  theta = golden * i
  j = 1 + (Math.random()-0.5)*0.06
  pA[i*3]   = Math.cos(theta)*r*R*j
  pA[i*3+1] = y*R*j
  pA[i*3+2] = Math.sin(theta)*r*R*j
Keep a copy pA0 = pA.slice(). On viewports below 1100x700, multiply pA by min(1, innerWidth/1100, innerHeight/780). On the film frame (width >= 1100 and height >= 700), pA stays at radius 302, which is a ~600px sphere and must read as a large cloud, not a dot.

BufferGeometry attributes, all of them present:
  position = new BufferAttribute(pA.slice(), 3)
  pA, pB, pC as BufferAttribute(..., 3)
  sd, sc, al as BufferAttribute(..., 1)
Set geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3000) so the cloud is never frustum-culled.
Uniforms object, mutated in place (same object the material holds):
  wA: 1, wB: 0, wC: 0, squeeze: 1, time: 0, psize: 2.2
ShaderMaterial settings: transparent true, depthWrite false, blending THREE.AdditiveBlending, no lights, no fog. Use this vertex shader verbatim:

attribute vec3 pA;
attribute vec3 pB;
attribute vec3 pC;
attribute float sd;
attribute float sc;
attribute float al;
uniform float wA, wB, wC, squeeze, time, psize;
varying float vA;
varying float vBoost;
void main(){
  vec3 p = pA*wA + pB*wB + pC*wC;
  float s = sd*6.2831;
  p += vec3(sin(time*.55+s*3.1), cos(time*.47+s*2.3), sin(time*.61+s*4.7))*1.8;
  p.x *= squeeze;
  p.z *= squeeze;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = psize * sc * (760.0 / max(1.0, -mv.z));
  vA = al * clamp(1.0 - (-mv.z - 520.0) / 2600.0, .22, 1.0);
  vBoost = clamp(wB + wC, 0.0, 1.0);
}

Fragment shader verbatim:

precision mediump float;
varying float vA;
varying float vBoost;
void main(){
  float m = 1.0 - smoothstep(.30, .5, length(gl_PointCoord - 0.5));
  if (m <= 0.002) discard;
  float a = m * vA * mix(1.0, 1.9, vBoost);
  gl_FragColor = vec4(1.0, 1.0, 1.0, min(a, 1.0));
}

Points are pure white. Keyboard and wordmark get the 1.9 brightness boost from vBoost. Additive blending over the transparent canvas on the black body is what makes them visible. Keep gl_PointSize in the vertex shader. Keep gl_FragColor. Use THREE.WebGLRenderer so this WebGL1 shader compiles. Add the Points to the scene before the first render.

Each frame:
  uniforms.time = now/1000
  spin += dt * (0.085*wA + 0.006*(wB+wC))
  points.rotation.y = spin*wA + pointerX*0.16
  points.rotation.x = pointerY*0.09
  renderer.render(scene, camera)
Only the sphere spins. When wB or wC is 1, rotation.y from spin is 0, so the keyboard and the wordmark stay flat to the camera.

FORM B — keyboard cloud, required for section 3
Load the keyboard PNG with crossOrigin anonymous. On load, draw it into a canvas 200px wide, height = round(200 * img.height/img.width). Read pixels. For every pixel, luminance L = (r*0.299 + g*0.587 + b*0.114)/255. Keep the pixel when L > 0.12. Store x, y, L.
Build a cumulative weight array, weight of site i = 0.25 + L*L. For each of the 30000 particles, binary-search a site by random()*totalWeight, and store three jitters in [-0.5, 0.5].
Place them in pB. Film frame (width>=1100 and height>=700): SRC_W=1605, TOP_Y=148, OX=-12, zScale=1.
Smaller screens: SRC_W = min(innerWidth*1.08, 1605*(innerWidth/1440)), then if the resulting height exceeds innerHeight*0.62, shrink SRC_W to fit. TOP_Y = min(148*(innerHeight/900), innerHeight*0.18). OX = -12*(innerWidth/1440). zScale = min(1, innerWidth/1440).
k = SRC_W / sampleWidth. srcH = SRC_W * sampleHeight / sampleWidth.
pB[i*3]   = (sx/sampleWidth - 0.5)*SRC_W + OX + j1*k*0.34
pB[i*3+1] = TOP_Y - (sy/sampleHeight)*srcH + j2*k*0.34
pB[i*3+2] = j3 * 52 * (0.35+L) * zScale
Then geo.attributes.pB.needsUpdate = true.
The keyboard cloud is about 1605px wide on a desktop, sitting in the upper-middle of the screen, brighter keys denser than dark gaps. It is a field of white grains, large enough to recognize a keyboard. On image error, still mark the loader key "keys" ready. Section 2 keeps working from pA.

FORM C — <K> particle wordmark, required for section 4
After the voxel glyphs exist, build a second wordmark group (same layout as the solid one: chevron, K, mirrored chevron, height normalized to 1). Update its world matrix. Collect every triangle in world space with its area. Cumulative-area sample 30000 points (barycentric, flip u,w when u+w>1). Subtract the bounding-box center so the cloud is centered.
Store those centered samples in a raw array. Scale them into pC:
Film frame: markW = 1108, OY = -23.
Smaller: markW = min(innerWidth*0.88, 1108*(innerWidth/1440)). If markW * (size.y*0.669) / size.x exceeds max(80, innerHeight*0.36), shrink markW to that cap. OY = -min(36, innerHeight*0.03).
KX = markW / size.x. KY = KX * 0.669.
pC[i*3] = rawX * KX
pC[i*3+1] = rawY * KY + OY
pC[i*3+2] = rawZ * KX
Then geo.attributes.pC.needsUpdate = true.
On a desktop this cloud is about 1108px wide, slightly above center, clearly the characters < K >, made of the same white grains. It clears the step cards.

Relayout A, B, and C on every resize, and set needsUpdate on pA, pB, and pC.

Coupling: the scroll function writes stage.uni.wA/wB/wC/squeeze.value. It also does stageEl.classList.toggle('on', y > innerHeight*0.55). Initial call is applyView(0), so the hero shows the photograph and the particle canvas is hidden. The first scroll to section 2 sets y to innerHeight, adds class "on", and sets wA=1. If class "on" is missing, the user sees an empty black panel, which is a failed result.

SECTIONS 2–4 (class panel, background transparent)
h2: absolute until the 900px breakpoint, font-size var(--fs-h2), weight 400, letter-spacing -0.038em, line-height 1.011, z-index 6.
#s2 h2 left 13.60vw, top max(12.50vh, header-h + 12px):
  "AI isn't replacing" / "developers." (second line data-d="140")
#s2 note, right side, bottom calc(3.71vh + safe-area), width 22.3vw, min-width 210px:
  "Great developers solve problems, make decisions, and design systems. AI accelerates the process, but creativity, critical thinking, and product vision still belong to the person behind the keyboard."
#s3 h2 right 15.10vw, same top, text-align right. BOTH lines data-dot="1", second line also data-d="140":
  "It's replacing" / "repetition."
#s3 note, left, bottom same, width 21.2vw, min-width 200px:
  "Let AI handle research, boilerplate code, debugging, and documentation while you focus on architecture, user experience, and building products that create real value."
Notes: font-size var(--fs-note), weight 500, line-height 1.31, letter-spacing -0.02em, color rgba(255,255,255,.95), class "note fade".
#s4 h2 left max(pad, safe-area-left), same top rule:
  "We learn a modern" / "approach." (second line data-d="140")
No note on section 4. Five step cards fill the bottom.

STEP CARDS
#steps: absolute, left 0, right 0, bottom calc(2.8vh + safe-area), z-index 7, horizontal padding = pad/safe-area, display grid, 5 equal columns, border-top 1px solid var(--hair), touch-action pan-x.
Each .step: relative, padding 17px 15px 33px, height clamp(168px, 23.9vh, 250px), flex column, overflow-x hidden, overflow-y auto, scrollbar hidden, isolation isolate. A left hairline separates cards. ::before is a white sheet translated Y 101% that slides to 0 on hover (0.55s --ease). On hover (fine pointer): title and body become #000, the index becomes rgba(0,0,0,.40) with the number #000.
::after is a 3px white bar at the bottom, scaleX 0, origin left. .act runs @keyframes stepfill from scaleX(0) to scaleX(1) over var(--dwell) linear.
Index line class st-n, align-self flex-end, font-size clamp(10px, .90vw, 15px), weight 500, color rgba(255,255,255,.36). The number is a b in #fff weight 500. Literal text is the characters <p> then the number then </p>.
Title st-t: margin-top auto, font-size clamp(15px, 1.46vw, 24px), weight 700, letter-spacing -0.04em.
Body st-b: margin-top 21px, font-size clamp(10px, .90vw, 15px), weight 500, line-height 1.33, letter-spacing -0.02em.
Cards, in order:
01 Idea — Every great product begins with an idea. Define the problem, understand the user, and outline the value before writing a single line of code.
02 AI Planning — Use AI to research, generate architecture, break down complex tasks, compare approaches, and create a clear development roadmap.
03 Prototype — Create a working prototype in hours instead of weeks. Test assumptions, iterate quickly, and focus on learning before investing in production code.
04 Review — Review architecture, optimize performance, improve readability, eliminate bugs, and let AI assist with debugging, documentation, and code quality.
05 Ship — Deploy your product, gather feedback, monitor real usage, and continue improving through rapid AI-assisted iterations.
Auto-advance every 4200ms: remove .act, advance the index, set --dwell to 4200ms, force reflow, add .act. If #steps overflows horizontally, smooth-scroll the active card to the left padding. A pointerdown on the scroller pauses autoplay for 12 seconds.

MOBILE AND SHORT VIEWPORTS — implement every query
max-width 1040px:
  --nav-h 108px; --pad 16px; --btn-h 40px; --fs-nav 13px.
  Header becomes a 2-column grid: row 1 is brand (ellipsis if needed) and CTA; row 2 is the nav pill, height 38px, position static, full width of the grid, horizontal scroll, scrollbar hidden. Pill padding 0 14px. Rows are 40px and 38px with 8px row gap and 10px column gap.
max-width 900px:
  #s2, #s3, #s4 become flex columns, padding top calc(header-h + 14px), bottom max(14px, safe-area), gap 14px. Headings and notes become position relative, width auto, max-width 100%. #s3 heading stays right-aligned. Notes sit at margin-top auto, max-height 36%, overflow auto. Rail moves to right max(8px, safe-area) and height 120px. #steps becomes a horizontal flex scroller, position relative, margin-top auto, scroll-snap x mandatory, scrollbar hidden. Each card flex 0 0 min(86vw, 340px), height auto, scroll-snap-align start, scroll-snap-stop always. Card type: index 12px, title 18px, body 14px / line-height 1.35.
  Particle clouds use the smaller-screen formulas above so the sphere, keyboard, and <K> stay inside the viewport and remain visible between the heading and the note or cards.
max-width 800px:
  #heroCopy is a flex column, justify flex-end, padding pad and safe areas, bottom padding max(18px, safe-area), gap 12px. h1 and the aside become position relative, width auto. Aside paragraph text-align left, max-height 28dvh, overflow auto.
max-width 720px:
  --fs-hero clamp(28px, 9.2vw, 56px); --fs-h2 clamp(26px, 8.4vw, 48px); --fs-note 13.5px; --fs-logo clamp(18px, 5.4vw, 28px); --fs-btn 13px. Aside paragraph stays left-aligned.
max-height 640px: #steps max-height 48dvh; cards can scroll vertically inside that cap.
max-height 560px: hero and h2 use clamp(22px, min(7.05vw, 7.2vh), 64px) and clamp(22px, min(6.17vw, 6.4vh), 56px); note 12.5px; aside margin-bottom 8px; card padding 8px 10px 14px; body margin-top 8px.
max-height 560px AND min-width 901px: card height clamp(110px, 32vh, 180px), padding 8px 10px 16px, body margin-top 10px.
max-height 560px AND min-width 1041px: --nav-h 64px, --btn-h 36px, nav pill height 34px.
max-width 1040px AND max-height 560px: --nav-h 62px, --btn-h 36px. Header returns to a single flex row. Show the hamburger. Hide the pill until .open, then show it as a fixed dropdown under the header: left/right 10px plus safe areas, top calc(header-h + 8px), column, radius 16px, max-height calc(100dvh - header-h - 24px), each link min-height 44px, dividers on the top border instead of the left.
max-width 380px: --pad 12px, --fs-btn 12px, --btn-h 36px, pill padding 0 11px, arrow svg 12x12.
max-height 430px: aside paragraph max-height 18vh; if still absolutely positioned, h1 and aside bottom become calc(1.6vh + safe-area).
max-height 520px: #heroCopy becomes the flex column with gap 8px and bottom padding max(10px, safe-area). h1 and aside relative, max-width min(100%, 36rem). h1 gets text-shadow 0 2px 16px rgba(0,0,0,.55). Aside paragraph max-height 24vh, text-align left.
Also listen to visualViewport resize and window resize: resync header height, refit headings, regrid dot type, refit the 3D wordmark, relayout all three particle forms, and if no section transition is running re-apply the view for the current section index.

PARTICLE ACCEPTANCE
Section 2 shows thousands of white grains in a slowly rotating sphere, roughly 600px across on desktop, behind the heading. Section 3 shows those grains morphed into a bright keyboard the width of the viewport. Section 4 shows them morphed into a bright <K> wider than half the viewport, above the step cards. The morph squeezes on X/Z halfway between shapes. The canvas element #stage has class "on" on those three sections and opacity 1. Panels #s2 #s3 #s4 have a transparent background. pB and pC are filled from the CloudFront keyboard PNG and the voxel wordmark, with needsUpdate set. The render loop never stops.

OUTPUT
One complete index.html. Black full-viewport app. Schibsted Grotesk. The four CloudFront URLs above and no others. Loader, difference cursor, header, hero plate plus sky tint, number field, shade, draggable iridescent voxel <K>, then the sphere, the keyboard cloud, and the <K> cloud as one 30,000-point additive white particle system. All motion uses --ease except the linear loader, rail, particle opacity, and step fill. Every breakpoint above is required.
