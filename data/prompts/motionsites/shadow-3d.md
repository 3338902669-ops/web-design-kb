# Shadow 3D

> **Source:** Framesbase (MCP)  
> **Type:** sites  
> **Category:** Interactive 3D  
> **Deliverable:** prompt  
> **Opened via:** framesbase MCP on 2026-09-30

---

# Prompt: Recreate "Never Stop Exploring — The North Face" (exact build)

Build a single-page, scroll-driven product experience for a North Face concept jacket. It has three stages on one continuous, reversible scroll timeline:

1. **Hero:** an orange full-screen stage. A real-time 3D jacket is soaked by a GPU-assisted rain simulation, with live "surface wetness" feedback.
2. **Collection:** the jacket spins 360° and pulls back. A white panel wipes in from the left and shows an infinite vertical gallery, specs and a price.
3. **Gear bag / checkout:** the 3D jacket shrinks and flies into the first cart thumbnail. The page becomes a two-column cart + checkout.

Reproduce everything below exactly: values, copy, timings, and easing. Do not invent extra sections, copy, colors or effects.

---

## 1. Stack & project setup

- **Vite 7** vanilla JS (ES modules, `"type": "module"`), no framework. Node 24, pnpm.
- Dependencies: `three@^0.180.0`, `@fontsource-variable/manrope@^5.3.0`, `@fontsource/libre-barcode-128@^5.3.0`. Dev: `vite@^7.1.0`.
- Scripts: `dev: vite --host 127.0.0.1`, `build: vite build`, `preview: vite preview --host 127.0.0.1`, `test: node --test tests/*.test.js`.
- Files: `index.html`, `main.js`, `rain.js`, `rain-wetness.js`, `scroll-scene.js`, `cart.js`, `cart-transition.js`, `mobile-layout.js`, `style.css`, `cart.css`, `cart-transition.css`, `mobile.css`.
- Import order in `main.js`: `@fontsource-variable/manrope/index.css`, `@fontsource/libre-barcode-128/400.css`, `three`, `GLTFLoader` from `three/addons/loaders/GLTFLoader.js`, `./rain.js`, `./scroll-scene.js`, `./cart.js`, `./cart-transition.js`, `./mobile-layout.js`, `./style.css`, `./mobile.css`. `cart.js` imports `./cart.css`; `cart-transition.js` imports `./cart-transition.css`.
- **There are no local image or model files.** Every asset is a remote URL (see §2).

## 2. Assets (use these exact URLs)

| Asset | URL | Notes |
|---|---|---|
| 3D jacket model (GLB, 30 MB, CORS `*`) | `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d2c9b756-aca1-4eb9-9640-727bac0c5864.glb` | Loaded with `GLTFLoader` |
| The North Face logo (SVG, 183×85) | `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e3fd8516-ed00-4335-a597-0959d318d71b.svg` | Favicon, hero logo, cart footer logo. Always rendered white via `filter: brightness(0) invert(1)` |
| Hero emblem (SVG, 960×1200, the TNF "half dome" arcs, white→#FF3300 vertical gradient at 16% opacity) | `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/73767fe8-1b23-4350-9b5e-fda6b0a45d78.svg` | Background decoration, top-left |
| Gallery jacket 1 "Alpine": long parka, translucent panels (1360×2048, grey studio bg) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_224644_fd755abf-6b69-419c-b31f-2e5ce60d25c0.png` | Gallery |
| Gallery jacket 2 "Shadow": belted expedition jacket (1360×2048, grey bg) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_224644_8daad37e-44bf-4ff4-89fb-ba2741557ef4.png` | Gallery |
| Gallery jacket 3 "Storm": asymmetric cape shell (1360×2048, grey bg) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_224644_91f44d16-c296-4181-a7b3-f0c3f532c8df.png` | Gallery |
| Goggles close-up (2160×1920, grey bg) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_224644_452ee6ca-2f00-4a74-9234-e92f8ba1cfe8.png` | Hero product callout |
| Cart: Shadow Falcon 750 (transparent PNG) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_224645_1c41021a-7ce1-46d0-a06d-05a46ee679b9.png` | Cart thumbnail |
| Cart: Alpine Shield (transparent PNG) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_224645_f56b2e3e-1205-45ca-8a37-8476c9b91d14.png` | Cart thumbnail |
| Cart: Storm Veil (transparent PNG) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_224644_e439d297-5d9a-4750-9100-41e3b1c7578a.png` | Cart thumbnail |
| Cart: Summit Goggles (transparent PNG, whole goggles) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_224646_eeb5a878-9bbf-475c-88a2-f78490fa9394.png` | Cart thumbnail |

## 3. Design tokens

- **Brand orange:** `#ff3300` (page background, `theme-color`, hero, cart bag). Hover orange for the checkout button: `#df2d00`. Selected tint: `#fff8f5`.
- **Text:** white `#fff` on orange. On white panels: `#191919` / `#171717`, muted `#666`, `#686868`, `#777`, `#888`, placeholder `#939393`. Near-black nav: `#0d0d0d`, `#111`. Grey nav text: `#777`.
- **Neutral surfaces:** input fill `#f2f2f0`, borders `#e4e4e2`, `#e1e1de`, `#d5d5d2`, radio border `#bcbcb7`, delivery icon `#8d8d87`.
- **Fonts:** `'Manrope Variable', Manrope, sans-serif` for everything. Weights used: 200, 300, 400, 500, 600, 700. `'Libre Barcode 128'` for decorative barcodes only.
- `:root`: `--page-inset: 40px`, `font-synthesis: none`, `text-rendering: optimizeLegibility`, `-webkit-font-smoothing: antialiased`, color `#fff`, background `#ff3300`.
- **No rounded corners anywhere** (`border-radius: 0`) except the wetness pill (`999px`) and radio dots (`50%`).
- `* { box-sizing: border-box }`, `html { scroll-behavior: smooth }`, `body { margin: 0; min-width: 1024px }` on desktop.
- Recurring motif: a small **solid white square** (`clamp(8px, .8333vw, 22px)`) as a "corner marker" on frames and line ends.

## 4. Document structure & copy (verbatim)

`<head>`: charset UTF-8; viewport `width=device-width, initial-scale=1.0, viewport-fit=cover`; `theme-color #ff3300`; SVG favicon = TNF logo URL; description "Never stop exploring. Outdoor gear for every peak and trail."; title **"Never Stop Exploring — The North Face"**.

```
main
└ div.experience#home
  ├ div.hero  (sticky stage)
  │ ├ img.hero__emblem (emblem SVG, aria-hidden)
  │ ├ section.collection-panel (aria-hidden, inert initially)
  │ │ └ div.collection-gallery
  │ │   ├ div.collection-gallery__track
  │ │   │ ├ div.collection-gallery__group  → 3 imgs (Alpine, Shadow, Storm; width=1360 height=2048, with alt text)
  │ │   │ └ div.collection-gallery__group[aria-hidden] → same 3 imgs, alt=""
  │ │   └ button.collection-gallery__pause (pause/play SVG icons)
  │ ├ div.hero__model#model-stage (WebGL canvas goes here)
  │ ├ section.rain-panel
  │ ├ nav.site-nav
  │ ├ h1.hero__title
  │ ├ aside.surface-readout
  │ ├ div.hero__intro
  │ ├ aside.product-callout
  │ ├ section.collection-copy (inert initially)
  │ ├ h2.collection-title (aria-hidden)
  │ ├ a.collection-mobile-prompt (mobile only)
  │ └ svg.collection-focus (corner-bracket viewfinder)
  └ div.experience__gear-anchor#gear
section.mobile-collection-details#details[hidden]
div.cart-stage#cart
  └ section.cart (tabindex -1): div.cart-bag + div.cart-checkout#checkout
template#cart-item-template
dialog.order-preview
```

Gallery alt texts: "Technical black hooded jacket with chest straps and front pockets", "Black expedition jacket with a belted waist and layered shoulder panels", "Black hooded shell with an asymmetric cape and diagonal harness".

**Rain panel:** `h2` "Test your gear". A mobile-only chevron toggle button (`aria-controls="rain-controls"`, chevron path `m3 6 5 5 5-5`). A pause button with two SVG paths: pause `M4 3h3v10H4zM9 3h3v10H9z` and play `m5 2 9 6-9 6z`, toggled via `.is-paused`. Three range sliders (0–100), each with a label and an `<output>`:
- "Rain intensity": name `intensity`, default **35**
- "Drop speed": name `speed`, default **80**
- "Drop size": name `size`, default **24**

**Nav** links: Explore (`#home`, active, `aria-current="page"`), Gear (`#gear`), Stories (`#stories`, secondary), Contact (`#contact`, secondary), Bag (`#cart`, mobile only).

**Title:** `<h1>` with three block spans: "never" / "stop" / "exploring".

**Surface readout:** A diagonal connector SVG (viewBox `0 0 280 200`, `preserveAspectRatio="none"`, path `M0 200 280 0`, stroke 2, `vector-effect: non-scaling-stroke`). A drop icon (viewBox `0 0 24 32`, path `M12 0C9 6 1 16 1 21a11 11 0 0 0 22 0C23 16 15 6 12 0Z`). A pill containing `<span.number>00</span><span.unit>%</span>`. Caption "Jacket surface<br>wetness". aria-label "Jacket surface wetness: 0 percent. Illustrative simulation." and title "Illustrative surface response, not a laboratory measurement".

**Hero intro:** TNF logo img. `h2` with 4 block spans: "We equip" / "explorers for" / "every peak and" / "trail". Paragraph: "From the highest peaks to urban trails, The North Face creates premium sportswear that combines cutting-edge technology with iconic design."

**Product callout** (aria-label "Performance eyewear"): a framed goggles image (alt "Black reflective snow goggles"). A barcode block with three rows: "NEVERSTOPEXPLORINGGEARS"; a split row "THENORTH" / "FACE1966" / "GEAR" (flex space-between); a short row (75% width) "EXPLORINGWITHOUTS". Then the paragraph "Performance sportswear<br>engineered for the world’s harshest<br>conditions".

**Collection copy:** `h2#collection-heading` "Beyond<br>the forecast". Two paragraphs: "A sculpted cape, an enveloping hood and adjustable details. Shadow Falcon 750, seen from every angle." and the same "From the highest peaks…" sentence. Then the table `.collection-features` with caption "Illustrative specifications" and rows (number + small unit span | `th`):
`100` `%` Recycled nylon · `180` `g/m²` Fabric weight · `20k` `mm` Water resistance · `−10` `°C` Temperature rating · `3` `L` Shell construction.
The purchase block has the price `<span>$</span>759` (aria-label "759 dollars"), the caption "Performance sportswear engineered for the world’s harshest conditions", and the link `a.collection-copy__order[href=#cart]` "Order jacket" + an arrow-up-right SVG (`M5 19 19 5M5 5h14v14`).

**Collection title:** "shadow" / "falcon" / "750" as block spans. **Mobile prompt:** "Discover the details" + "↓" (`href=#details`). **Focus brackets SVG:** viewBox `0 0 80 80`, stroke 2, path `M1 23V1h22M57 1h22v22M79 57v22H57M23 79H1V57`.

**Cart bag:**
- Back arrow link `href=#gear` (viewBox `0 0 48 24`, `M46 12H2m10-10L2 12l10 10`).
- Eyebrow "Ready for what’s next". `h2` "Your gear bag" + `span.cart-count` "04". Intro "You have 4 items ready for your next adventure."
- Table headers: Equipment / Quantity / Total / (visually hidden "Remove"). The tbody is filled from the template.
- Empty state: "Your next adventure starts with an empty bag." + button "Restore items ↗".
- Summary: Subtotal $2,436.00 / Delivery Complimentary / Total amount **$2,436.00**.
- Mobile link "Continue to checkout ↓" (`#checkout`).
- Receipt barcode "NEVERSTOP EXPLORING" with small text "THE NORTH FACE · EXPEDITION EQUIPMENT".
- A visually hidden live region `#cart-announcement`.
- Footer: TNF logo + "Never stop exploring.<br><span>From the first step to the next summit.</span>"

**Checkout:**
- `h3` "Checkout" + a padlock SVG (rect 5,10,14×11 + `M8 10V6a4 4 0 0 1 8 0v4M12 14v3`).
- Intro "A few details, then you’re ready to go.<br>Choose how your gear gets to you."
- Fields:
  - Full name: placeholder "Your full name", maxlength 100
  - Phone number: tel, "+380 00 000 00 00", maxlength 40
  - Email address: "you@example.com", maxlength 150
  - Payment method: select with a card icon, options "Credit / debit card" and "Pay on delivery", plus a chevron
- Fieldset legend "Delivery method" with two radio cards:
  - Store pickup / "Collect from a store near you" / "Complimentary", with a storefront icon. Checked by default.
  - Doorstep delivery / "Delivered to your address" / "$15.00", with a truck icon.
- Submit button "Checkout — $2,436.00" + right arrow. Note: "Design preview. No payment will be taken."
- Footer: "Built for the journey." / "Since 1966 ↗".

**Cart row template:** image 88×100. `h3` name. `.cart-item__variant`. `.cart-item__unit-price`. A quantity stepper (− value +). Line total. A remove ✕ (`m3 3 10 10M3 13 13 3`).

**Dialog `.order-preview`:** a close "×". Eyebrow "One step closer to the outdoors". `h2` "Your order preview". Text "This is a preview of your gear bag. No order has been placed and no payment has been taken." A `dl` with Equipment / Delivery / Total. Button "Back to your bag ↗".

## 5. Desktop layout (≥1024px): exact CSS

**Scroll container:** `.experience { position: relative; height: 360svh }` (with the cart transition active). `#gear` anchor is absolutely positioned at `top: 160svh`, height 1px.

**`.hero`:** `position: sticky; top: 0; width: 100%; height: 100svh; overflow: hidden; isolation: isolate; background: #ff3300`. It holds the CSS vars `--intro-opacity:1`, `--intro-shift:0px`, `--panel-reveal:0`, `--collection-opacity:0`, `--collection-shift:40px`.

**Emblem:** absolute top-left, `width: 50%; height: 111.1111%; object-fit: fill`, no pointer events.

**Model stage:** absolute `inset: 0; z-index: 1`. Starts at `opacity: 0` and fades to 1 over `.5s ease` when the model loads (`.hero__model--ready`). The canvas fills it.

**Intro fade group** (`.rain-panel, .site-nav, .hero__title, .surface-readout, .hero__intro, .product-callout`): `opacity: var(--intro-opacity); translate: 0 var(--intro-shift)`.

**Rain panel:** absolute at top/left `--page-inset`, `z-index: 5`, `width: clamp(260px, 16.25vw, 312px)`, `padding: 24px`, `border: 1px solid rgb(255 255 255/24%)`, `background: rgb(255 255 255/8%)`, `backdrop-filter: blur(16px)` (glass).
- Heading: flex, space-between, `margin-bottom: 14px`. `h2` is `clamp(17px,1.0417vw,20px)`, weight 700, line-height 1.2, letter-spacing −.035em, uppercase.
- Pause button: 24×24, padding 4px, same glass border/background, icon 14px. Hover background 20%.
- Controls: grid gap 12px. Label row: 14px, weight 300, line-height 20px; the output is tabular-nums at `.72` opacity.
- Range styling: height 24px, transparent background. Track is 2px tall, `linear-gradient(to right, #fff var(--range-progress), rgb(255 255 255/32%) var(--range-progress))`, with `--range-progress` set by JS. Firefox uses `::-moz-range-progress` in white.
- Thumb: a 12×12 **square**, white, `margin-top: -5px`, `box-shadow: 0 0 0 3px rgb(255 255 255/16%)`. On hover the ring grows to 5px at 20%.

**Site nav:** absolute top/right `--page-inset`, `z-index: 5`, flex gap 4px, padding 1px, `border: 3px solid rgba(255,255,255,.28)`, `background: rgba(255,255,255,.2)`, blur 16px.
- Links: `min-height: clamp(36px,1.9vw,50px)`, `padding: 0 clamp(12px,.63vw,17px)`, white background, `#777` text, `clamp(16px,.84vw,22px)`, line-height 1, no underline.
- Hover: `#f4f4f4` / `#111`. Active: `#0d0d0d` background, white text.

**Hero title:** absolute `top: 24.3%; left: 39.7%; z-index: 2`, white, **`mix-blend-mode: difference`** (it inverts over the black jacket).
- `font-size: clamp(90px, min(9.0625vw, 16.1111svh), 242px)`, weight 700, letter-spacing −.07em, line-height .78161, nowrap.
- The first line "never" has `margin-left: .58em`.
- Breakpoints: `max-width:1400px` → top 27%. `max-width:1150px` → top 28%, left 35.2%.

**Surface readout:** absolute `top: 18.5%; right: var(--page-inset); z-index: 3`. Vars:
- `--readout-height: clamp(76px, min(6.0417vw,10.7407svh), 156px)`
- `--readout-width: clamp(270px, 25.3vw, 680px)`
- `--drop-size: clamp(14px,1.0417vw,28px)`
- `--readout-gap: clamp(12px,1.0417vw,28px)`

Contents:
- Measurement row: flex, center, gap `--readout-gap`. The drop is `--drop-size` wide.
- Pill: height `--readout-height`, `min-width: clamp(126px, min(9.8vw,17.4074svh), 254px)`, padding `.08em .28em .14em`, `border: 2px solid #fff`, `border-radius: 999px`, `font-size: clamp(50px, min(4.1667vw,7.4074svh), 108px)`, weight **200**, line-height 1.15, letter-spacing −.055em, tabular-nums. The "%" unit is `.6em`.
- Caption: `margin: clamp(20px,1.875vw,42px) 0 0 30%`, `clamp(14px,1.0417vw,28px)`, weight 300, line-height 1.15, letter-spacing −.045em, uppercase.
- Connector: absolute at `top: var(--readout-height)`, with `left: var(--connector-start)` where `--connector-start: calc(-50vw + 25.3svh + var(--page-inset) + var(--readout-width))`. It runs to `--connector-end: calc(var(--drop-size) + var(--readout-gap) + var(--readout-height)*.5 + 4px)`, height `calc(28.2svh - var(--readout-height))`. The line goes from bottom-left to top-right (pointing at the jacket), with a white corner-marker square centered on its bottom-left end (`transform: translate(-50%, 50%)`).

**Hero intro:** absolute bottom/left `--page-inset`, `width: clamp(300px, 26vw, 680px)`, z 3.
- Logo: `width: clamp(125px, 9.5vw, 250px)`, white filter, `margin-bottom: clamp(23px,1.82vw,48px)`.
- `h2`: `clamp(31px, 2.55vw, 70px)`, weight 700, line-height .83, uppercase. Each span is a nowrap block, and the first span has `padding-left: 50%`.
- Paragraph: `max-width: clamp(300px,20.5vw,520px)`, `margin-top: clamp(25px,1.667vw,44px)`, `clamp(12px,.8333vw,22px)`, weight 300, line-height 1.3, letter-spacing −.025em, `text-indent: 20.5%`.

**Product callout:** absolute bottom/right `--page-inset`, z 3, `--product-image-size: clamp(168px, min(14.1vw,25.0667svh), 370px)`, width `size × 1.44`.
- Frame: `width: size`, padding 9px, `1px solid rgba(255,255,255,.35)`, with a white corner square at its top-right via `::after` (`transform: translate(100%, -100%)`).
- Image: `aspect-ratio: 1.12`, cover, inside an `overflow: hidden` wrapper. On frame hover it scales to 1.12 over `.45s cubic-bezier(.2,.7,.2,1)`.
- Barcode: `width: size; margin-top: 22px`, Libre Barcode 128 at `size × .103`, line-height .7, letter-spacing .09em.
- Paragraph: `width: max(224px, size × .95)`, pushed right (`margin: 2px 0 0 auto`), `clamp(12px, min(.8333vw,1.4815svh), 22px)`, line-height 1.3, `text-indent: 30%`.

**Collection panel (white wipe):** absolute `inset: 0 0 0 50.83%`, z 0, white, `clip-path: inset(0 calc((1 - var(--panel-reveal)) * 100%) 0 0)`, so it reveals left→right. Its `left` becomes `var(--collection-panel-left, 50.83%)` during the cart transition.

**Gallery:** absolute, full height, at `right: var(--page-inset)`, with `--gallery-width: min(24vw, 51svh)` and `--gallery-gap: clamp(14px,1.0417vw,28px)`, overflow hidden.
- Track `top: calc((100svh - W*1.5)/2 - (W*1.5 + gap))`. Animation `collection-loop 27s linear infinite` (`to { transform: translateY(-50%) }`), `animation-play-state: paused` by default.
- Groups: flex column with gap and bottom padding equal to the gap. Images: 2:3, cover.
- Pause button: bottom-right (right 12px, bottom `--page-inset`), 32×32, `rgb(255 255 255/80%)` background, blur 12px, `1px solid rgb(0 0 0/24%)`, `#111` icon 16px. `opacity: 0` → 1 on gallery hover, focus-within or `.is-paused`.

**Collection copy (left column):** absolute top/bottom/left `--page-inset`, `width: clamp(230px,19vw,480px)`, flex column, z 3, `opacity: var(--collection-opacity); translate: 0 var(--collection-shift)`.
- `h2`: `clamp(30px, min(2.55vw,5svh), 70px)`, 700, line-height 1, uppercase, letter-spacing −.025em.
- Description: max 22em, `margin-top: clamp(20px,3svh,36px)`, `clamp(12px,.7292vw,18px)`, 300, line-height 1.5. Paragraphs are 12px apart.
- Features table: max 390px, `margin-top: clamp(20px,2.8svh,32px)`.
  - Caption: 10px, 300, uppercase, letter-spacing .06em, opacity .7, 10px bottom padding.
  - Cells: `padding: clamp(8px,1svh,14px) 0`, `border-top: 1px solid rgb(255 255 255/28%)`. The `td` is 48% wide.
  - Number: `clamp(26px,1.875vw,44px)`, weight **200**, letter-spacing −.055em, tabular-nums. Unit: `.42em`, 300, `margin-left: .22em`.
  - `th`: `clamp(11px,.7292vw,16px)`, 400.
- Purchase block pinned to the bottom (`margin-top: auto`).
  - Price: `clamp(68px, min(6.25vw,12svh), 156px)`, weight 200, line-height .9, letter-spacing −.09em. The "$" is `.55em`, top-aligned.
  - Caption: max 28em.
  - Order button: white background, `#ff3300` text, 13px, 700, uppercase, letter-spacing −.035em, `min-height: 44px`, padding 12px 18px, gap 30px, 16px arrow icon. Hover: text `#111` and the arrow moves `translate(2px,-2px)` (.2s).
- **Short-height tweaks (`max-height: 760px`)** compress these: h2 `clamp(24px, min(2.55vw,4.6svh), 34px)`, description 12px, features number 22px, price `clamp(48px,8.5svh,64px)`, rain panel padding 20px, and so on.

**Collection title:** absolute `top: 33.2%; left: 30.5%; z 2`, same type spec as the hero title (`clamp(88px, min(9.0625vw,16.1111svh), 242px)`, 700, −.07em, line-height .78161), white with `mix-blend-mode: difference`, following `--collection-opacity` / `--collection-shift`.

**Focus brackets:** absolute `top: 7.6%; left: 38%; width: clamp(40px,4.1667vw,110px)`, following `--collection-opacity`.

## 6. The 3D scene (Three.js)

- Renderer: `WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })`. Pixel ratio `min(dpr, 1.5)` (1.25 on mobile). Clear `0x000000` at alpha 0. `SRGBColorSpace`, `ACESFilmicToneMapping`, exposure **0.9**.
- Camera: `PerspectiveCamera(35, aspect, 0.01, 10)`.
  - Hero pose `(-0.02, 0.77, 0.77)`, looking at `(x, y, 0)` of its own position, i.e. straight ahead. This is an extreme close-up of the hood and goggles filling the screen.
  - Collection pose `(0, 0.55, 1.6 + max(0, 40/h − 40/1080)·2.4)`, which shows the full figure.
- Lights: `AmbientLight(#fff, 1.3)`. Key `DirectionalLight(#fff, 2.1)` at `(-1.2, 1.6, 1.8)`. Cool rim `DirectionalLight(#b8bec8, 1.25)` at `(1, 1.3, -1)`.
- The model goes into a `modelPivot` Group: `position.y = 0.8`, `rotation.order = 'YXZ'`, base yaw **0.6 rad**. The loaded scene is offset by `-0.8` in y. Set `frustumCulled = false` on all meshes.
- **Mouse parallax** (not on touch or reduced motion): the pointer is normalized to −1..1 over the hero. Target yaw = `x · 6°`, pitch = `y · 2°`, scaled by `(1 − camera·0.7)·(1 − cartTravel)`. Damp with `MathUtils.damp(…, 9, dt)`. Reset on `pointerleave` / window `blur`.
- Final rotation: `(pitch, baseYaw + scroll.turn + cart.turn + yaw, 0)`.
- Render on demand only: a single rAF loop continues while scroll, cart, parallax or rain are unsettled. `dt` is clamped to 0.1 s.
- Resize via `ResizeObserver` on the stage. Pause the gallery with an `IntersectionObserver` on the hero (threshold 0.01). Handle `visibilitychange`.

## 7. Scroll timeline (`scroll-scene.js`), which must be deterministic and reversible

```js
const clamp = v => Math.max(0, Math.min(1, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
export function getScrollScene(p, reduced = false) {
  const camera = smooth(0.02, 0.84, p);
  return { camera,
    turn: reduced ? 0 : Math.PI * 2 * smooth(0.05, 0.85, p),   // full 360° spin
    intro: 1 - smooth(0.02, 0.27, p),
    rain: 1 - smooth(0.02, 0.22, p),
    panel: smooth(0.34, 0.88, p),
    collection: smooth(0.57, 0.92, p),
    galleryActive: p > 0.88 };
}
export function getCartScene(p, reduced = false) {
  return { progress: p,
    exit: smooth(0.02, 0.3, p), galleryExit: smooth(0.02, 0.4, p),
    travel: smooth(0.04, 0.68, p),
    turn: reduced ? 0 : Math.PI * 0.65 * smooth(0.02, 0.7, p),
    model: 1 - smooth(0.57, 0.8, p),
    boundary: smooth(0.12, 0.76, p), surface: smooth(0.68, 0.94, p),
    accessible: p > 0.985 };
}
```

- Scroll progress = `clamp((scrollY − experience.offsetTop) / (gearAnchorY − scrollStart))`. Cart progress = `clamp((scrollY − gearY) / (cartStageTop − gearY))`.
- Both values are smoothed with `THREE.MathUtils.damp`: λ = **8** for scroll and **10** for cart. With reduced motion they jump straight to the target.
- Applied as CSS vars on `.hero`:
  - `--intro-opacity = intro`
  - `--intro-shift = −(1−intro)·80px`
  - `--panel-reveal = panel`
  - `--collection-opacity = collection`
  - `--collection-shift = (1−collection)·48px`
- Camera: `lerpVectors(heroPose, collectionPose, camera)`, then `z += cart.travel · 0.16`.
- Intro elements become `inert` + `aria-hidden` when intro ≤ 0.1. Collection elements become interactive when `collection·(1−cart.exit) > 0.5`.
- The gallery animation runs only when `galleryActive && cartProgress < 0.02 && hero visible && !paused && !document.hidden`.
- Rain visibility = `rain` (it fades out as you scroll).

## 8. Rain simulation (`rain.js`), the signature effect

- Wind direction: `DIRECTION = normalize(-0.55, -1, -0.3)`. Pools: `MAX_DROPS = 2600`, `MAX_SPLASHES = 6000`, `MAX_BEADS = 900`.
- **Collider (no raycasting):**
  - Every refresh, render the scene with an override `ShaderMaterial` (DoubleSide, NoBlending) into a **384×384** `WebGLRenderTarget` (Nearest filtering), from an `OrthographicCamera(-0.8, 0.8, 0.8, -0.8, 0.1, 4)` placed at `center(0, 0.55, 0) − DIRECTION·2` and looking at the center (the view is along the rain direction).
  - The fragment shader packs depth into RG (`packDepthToRG(gl_FragCoord.z)` from `<packing>`) and the world normal into BA using octahedral encoding.
  - Clear to white. Read the pixels back with `readRenderTargetPixels`, and hide the particle group during this pass.
  - Refresh only when age ≥ 0.12 s **and** the model quaternion has rotated more than 0.006 rad since the last refresh.
  - Intersection: project a drop's previous and next positions with the collider's view-projection matrix and look up the texel. Depth is `(R + G/255)/256`; skip if ≥ 0.999. A hit occurs when the segment crosses the stored depth. Lerp to get the hit point, decode the octahedral normal, and flip it so it faces against DIRECTION.
- **WaterBatch:** an `InstancedBufferGeometry` quad (positions `[-1,0,0, 1,0,0, -1,1,0, 1,1,0]`, index `[0,1,2,2,1,3]`) with dynamic instanced attributes `dropHead` (vec3), `dropTail` (vec3) and `dropStyle` (vec2: width, opacity).
  - The vertex shader builds camera-facing strips: `axis = normalize(tail−head)`, `center = mix(head, tail, position.y)`, `side = normalize(cross(axis, cameraPosition − center))`, `world = center + side·position.x·width`.
  - The fragment shader uses color `vec4(0.85, 0.94, 1.0, alpha)`. For streaks, `edge = 1 − smoothstep(.3, 1, |u|)` and `tip = smoothstep(0, .15, v)·(1 − smoothstep(.75, 1, v))`. For round beads, `bead = 1 − smoothstep(.45, 1, length(u, v·2−1))`. Multiply by the `visibility` uniform and discard below 0.005.
  - Material: transparent, `depthWrite: false`, `depthTest: true`, `renderOrder: 2`, `frustumCulled: false`, `toneMapped: false`.
  - Three batches: rain (streaks), splashes (round), beads (round).
- **Per-frame parameters** from the sliders:
  - `speed = 0.32 + speed%·1.15`
  - `width = 0.00025 + size%·0.00095`
  - `length = 0.008 + size%·0.012 + speed·0.009`
  - The spawn budget increases by `intensity%·1550·speed·dt`.
  - Each drop has a random `variation` of 0.7–1.3.
- **Spawn volume:** x in `[−halfW, halfW + 0.8]`, where `halfH = tan(fov/2)·0.95` and `halfW = halfH·aspect + 0.25`; y in `[1.2, 1.52]`; z in `[−0.2, 0.62]`.
- **Drops** move `DIRECTION·dt·speed·variation`. Kill a drop at y < 0.22 or x < −2.5. Draw each as a streak with tail `pos − DIRECTION·length·variation` and opacity `0.23 + variation·0.2`.
- **On hit (`burst`):**
  - Feed the wetness model with `impact(0.025 + size%·0.075)`.
  - Spawn `4 + round(size/25)` splash droplets. Velocity = `normal·rand(.04, .11) + reflect(DIRECTION, normal)·0.07·speed`, plus a tangential spread of `rand(.03, .11)·(0.6+speed)` at a random angle. Force the outward component ≥ 0.035. Life is 0.22–0.5 s and width is `width·rand(.6, 1.4)`.
  - Gravity on splashes: `vy −= 0.36·dt`. Tail = `pos − vel·0.022`, `tail.y += width·1.7`. Opacity `0.9·min(1, life/duration·2)`.
  - Also spawn one **bead** stored in model-local space, so it sticks to and rotates with the jacket. Life 0.25–0.95 s, width `width·rand(1, 1.9)`, drawn as a tiny vertical blob (`tail.y += width·2.6`) with opacity `0.8·min(1, life/duration·3)`.
- API: `setSettings`, `setPaused` (hides the group), `setVisibility(0..1)` (feeds the uniform), `update(dt)`, `get active`, `dispose`.

**Wetness model (`rain-wetness.js`)**, an illustrative response:

```js
setExposure(e) { if (e > this.exposure + 1e-4) { this.responseAge = 0; this.shedding *= 0.35; } this.exposure = e; }
update(dt) {
  this.responseAge += dt;
  const target = this.responseAge > 1.6 || this.exposure === 0 ? 1 : 0;   // beading/runoff kicks in after 1.6 s
  this.shedding += (target - this.shedding) * (1 - Math.exp(-dt * 1.7));
  this.value += this.pendingWater * (1 - this.shedding * 0.82); this.pendingWater = 0;
  this.value *= Math.exp(-dt * (0.22 + this.shedding * 0.95));
  this.value = Math.min(95, this.value);
  if (this.exposure === 0 && this.value < 0.025) this.value = 0;
  return this.value;
}
```

- Exposure = `intensity/100 · (0.3 + speed/100·0.7) · (0.5 + size/100)`.
- The UI updates every 0.1 s: round the value, zero-pad it to 2 digits ("07", "42") in `.surface-readout__number`, and update the aria-label.
- Slider `input` events update `--range-progress`, the `<output>` ("35%"), and the rain settings.
- Pause/resume toggles `.is-paused`, the aria-label ("Pause rain simulation" / "Resume rain simulation") and the title ("Pause rain" / "Resume rain").
- With `prefers-reduced-motion`, rain and gallery start paused.

## 9. Cart fly-in transition (`cart-transition.js` + `.css`)

- Add `html.has-cart-transition`. Then `.experience` is 360svh, the gear anchor is at `top: 160svh`, and `.cart-stage` has `margin-top: -100svh; z-index: 4; pointer-events: none`.
- The cart is pinned with `transform: translate3d(0, var(--cart-pin), 0)`, where `--cart-pin = −clamp(cartTop − scrollY, 0, distance)`. It stays fixed during the transition and scrolls normally afterwards.
- `measure()` finds the Shadow Falcon thumbnail's untransformed position (summing the `offsetParent` chain) relative to the viewport center. It sets `x`, `y`, `scale = thumbHeight / heroHeight`, and `split = cartBag.offsetWidth / heroWidth`.
- `render(state)` writes on `.hero`:
  - `--cart-exit`, `--cart-gallery-exit`, `--cart-model-opacity`
  - `--cart-model-x = x·travel`, `--cart-model-y = y·travel`, `--cart-model-scale = 1 + (scale−1)·travel`
  - `--cart-edge-feather = travel·14%`
  - `--collection-panel-left = (0.5083 + (split − 0.5083)·boundary)·100%`. The white panel slides left to become the checkout column.

  On `.cart` it writes `--cart-progress` and `--cart-surface`. `.hero--cart` is on while progress > 0.001. The cart is inert until `accessible`.
- The model stage gets `transform: translate3d(x, y, 0) scale(s)` and a bottom-edge `mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% − feather), transparent 100%)`, with `opacity: var(--cart-model-opacity)`. The jacket visibly shrinks into the first cart thumbnail while turning another `0.65π`.
- The gallery fades out and translates by `−18svh·galleryExit`. The collection copy slides `−60px·exit` and fades. The collection title slides `−100px·exit`. The emblem fades with `1 − exit`.
- The cart backgrounds are transparent. `::before` layers (orange gradient `linear-gradient(135deg, rgb(255 255 255/5%), transparent 58%), #ff3300` for the bag, white for checkout) fade in with `--cart-surface`.
- **Staggered reveal:** each cart element has `--enter-start` and `--reveal: clamp(0, (progress − start)/.2, 1)`, giving `opacity: reveal; transform: translateY((1−reveal)·32px)`. Start values:

  | Element | Start |
  |---|---|
  | back arrow, heading | .38 |
  | table (fades over .36→.54) | .36 |
  | thead | .48 |
  | items 1–4 | .58 / .63 / .68 / .73 |
  | summary | .74 |
  | receipt | .77 |
  | bag footer | .8 |
  | checkout heading | .44 |
  | checkout intro | .48 |
  | fields 1–4 | .52 / .56 / .60 / .64 |
  | delivery | .68 |
  | submit | .76 |
  | note, checkout footer | .8 |

- **Programmatic navigation:** clicking any `a[href="#cart"]` or the back arrow (`a.cart-back[href="#gear"]`) calls `preventDefault` and `pushState`s the hash. It then scrolls with a custom rAF tween: **1450 ms** (900 ms on mobile), eased `(1 − cos(πt))/2`, using `scrollTo({behavior:'instant'})` each frame. It cancels on wheel, touchstart, navigation keys, popstate, resize or reduced-motion change. When done, focus the cart (or the Order link / mobile prompt).
- A `ResizeObserver` on the cart re-measures.

## 10. Cart logic (`cart.js`)

- Products (prices in cents; no orders are ever submitted):

  | id | name | variant | price | image |
  |---|---|---|---|---|
  | shadow | Shadow Falcon 750 | Black / Size M | 75900 | Shadow cutout |
  | alpine | Alpine Shield | Black / Size M | 68900 | Alpine cutout |
  | storm | Storm Veil | Black / Size M | 82900 | Storm cutout |
  | goggles | Summit Goggles | Black / One size | 15900 | Goggles cutout |

- Money format: `Intl.NumberFormat('en-US', {style:'currency', currency:'USD'})`.
- Quantities are clamped 1–9 (− is disabled at 1, + at 9). Courier delivery adds **$15.00** (1500) when quantity > 0; otherwise delivery shows "Complimentary".
- Update the count (zero-padded "04"), the intro ("You have N item(s) ready for your next adventure." / "There’s room for your next adventure."), subtotal, delivery, total, and the submit label "— $X". Disable submit when empty. Toggle the table and empty state.
- Announce to the live region: "N items in your bag. Total $X."
- Remove moves focus to the neighboring remove button (or Restore). Restore re-adds all 4 products. Clicking "Order jacket" re-adds Shadow Falcon if it was removed.
- Submit calls `preventDefault` and opens the `<dialog>` via `showModal()`, filling in the item count, "Doorstep delivery" / "Store pickup", and the total.
- Return a dispose function (`AbortController` for all listeners).

## 11. Cart visual spec (`cart.css`, desktop)

- `.cart`: grid `minmax(0,2fr) minmax(360px,1fr)`, min-height 100svh, orange, white text. All controls `font: inherit`. Focus ring: `2px solid currentColor`, offset 4px.
- **Bag column:**
  - Padding `--page-inset`, background `linear-gradient(135deg, rgb(255 255 255/5%), transparent 58%)`.
  - Back arrow: absolute at `top: inset+33px`, 48px wide. Hover `translate: -4px 0`.
  - Content: `width: calc(100% − clamp(68px,5.3vw,104px))`, max 1050px, right-aligned.
  - Eyebrow: 10px, letter-spacing .1em, uppercase.
  - `h2`: `clamp(30px,2.6vw,68px)`, 600, line-height 1.05, letter-spacing −.055em, uppercase, flex gap 16px. The count is `.32em`, weight 300, superscript-aligned.
  - Intro: `clamp(12px,.85vw,18px)`, 300.
  - Table: fixed layout. Column widths auto / 104 (center) / 120 (right) / 44. Header 10px uppercase at 70% white.
  - Rows: `border-top: 1px solid rgb(255 255 255/28%)`, padding `clamp(12px,1.5svh,22px) 0`.
  - Thumbnail: `clamp(56px, min(5.3vw,7.2svh), 90px) × clamp(70px, min(6.25vw,8svh), 104px)`, cover, `object-position: center 24%` (the goggles row is centered).
  - Name: `clamp(13px,1.04vw,22px)`, 500. Variant: 72% white, 300. Unit price: 500, tabular.
  - Stepper: 92px wide, `1px solid rgb(255 255 255/36%)`, buttons 28×32 at 18px/300, hover 16% white.
  - Line total: `clamp(13px,.94vw,20px)`, 600, right-aligned.
  - Remove: 28×32 at 75% opacity.
  - Summary: top and bottom borders, lines right-aligned within 320px. Total `clamp(24px,2vw,46px)`, 400, letter-spacing −.055em.
  - Receipt barcode: 36px Libre Barcode, letter-spacing .08em. Small text 8px, letter-spacing .1em.
  - Footer: logo `clamp(76px,5.2vw,112px)`, right-aligned text with a 65%-opacity second line.
- **Checkout column:** white, padding `--page-inset`, text `#191919`.
  - `h3`: `clamp(24px,1.8vw,42px)`, 600, uppercase. Lock icon 22px orange.
  - Inputs: height `clamp(42px,4.5svh,54px)`, `#f2f2f0` fill, no radius. Hover border `#d5d5d2`. Focus `outline: 1px solid #ff3300` on a white background.
  - Select: left card icon and right chevron, both orange.
  - Delivery cards: min-height 92px, padding 14px, `1px solid #e1e1de`. Checked (`:has(input:checked)`): orange border, `#fff8f5` fill, orange icon, and a custom radio (15px circle) filled orange with an inset 3px white ring.
  - Submit: full width, min-height 56px, orange, white `clamp(13px,.9vw,18px)`/500, space-between with a 20px arrow. Hover `#df2d00`.
- **Dialog:** `min(480px, 100vw−80px)`, padding 40px, white. Backdrop `rgb(0 0 0/40%)` + blur 8px. Orange eyebrow. `h2` 32px/500. `dl` rows with top borders. Orange return button.
- Breakpoints: `max-width:1400px` and `1100px` narrow the columns. `max-height:800px` compacts the vertical rhythm.

## 12. Mobile (`max-width: 1023px`, `mobile-layout.js` + `mobile.css`)

- `--page-inset: max(24px, safe-area insets)` (20px under 600px). `--scene-height: max(740px, 100svh)`. The hero is `top: −scene-overflow`. `.experience` is `scene-height × 2.6`.
- JS moves `.collection-copy` into `section.mobile-collection-details` (shown as a normal orange section below the hero) and moves the logo to the hero's top-left (86px wide; 76px under 600px).
- Nav: hide Stories/Contact and show **Bag**. Links are 44px tall at 13px.
- Rain panel: sits under the nav (top +64px) and is full width. It collapses to a header with a 44px chevron toggle (rotates 180° when open) and a 44px pause button. When open, the controls show as a 3-column grid with 18px thumbs and 40px-tall ranges.
- Title: `top: 34%; left: inset; clamp(68px, 17.6vw, 142px)`, line-height .83.
- Readout: top 22%, right-aligned, pill 88×50 at 38px with a 1px border, no connector. When the rain panel is open (`:has(...[aria-expanded=true])`) it moves to top 58%.
- Collection:
  - Panel at left 58%, gallery 27vw wide, pause button always visible (44px).
  - Title `clamp(68px, 18.4vw, 148px)`.
  - A "Discover the details ↓" white button at the bottom-left.
  - The details section switches to a 2-column grid at 600–1023px.
  - The camera is re-framed so the full model is visible above the fold.
- Cart: stacked flex column, no pin transform. The "Continue to checkout ↓" white button appears. Under 600px each cart row becomes a 2-row grid (product on top; stepper 112px with 44px buttons + total below; remove at top-right). All touch targets are ≥ 44px.
- Landscape phones (`max-height: 500px`): `--scene-height: 640px` and a smaller title (10vw).

## 13. Accessibility & motion

- Honor `prefers-reduced-motion`: no spin, no camera dolly, no parallax, rain and gallery start paused, instant scroll jumps, and no hover or transform transitions. Everything must still be reachable.
- Toggle `inert` + `aria-hidden` on sections that aren't currently shown. Use real `<label for>` pairs, `<output for>`, `<fieldset>/<legend>`, a live region, and a native `<dialog>`. Visible `:focus-visible` rings on everything.
- On load failure, log "Could not load the 3D model:" and add `.hero__model--error` (the page should still work without the model).

## 14. Acceptance checklist

- [ ] On first paint: orange screen, emblem arcs top-left, and the glass rain panel (35/80/24) and glass nav. The black hooded 3D jacket fades in as an extreme close-up of the goggles, with fine blue-white rain streaks slanting from the top-right.
- [ ] "never stop exploring" in huge white Manrope Bold with `mix-blend-mode: difference`, so it reads dark over the jacket and white over orange.
- [ ] The wetness pill counts up from 00% while it rains, then settles as beading kicks in after about 1.6 s. The diagonal connector line with a square end points from the pill toward the jacket.
- [ ] Splashes burst off the jacket surface and tiny beads stick to it and rotate with it. Moving the mouse tilts the jacket slightly (±6° yaw, ±2° pitch).
- [ ] Scrolling fades the hero UI up and out, pulls the camera back to the full figure, spins the jacket 360°, wipes the white panel in left→right, and reveals "Beyond the forecast", the specs, the $759 price, and the "shadow falcon 750" title. The 3-image gallery then loops upward every 27 s.
- [ ] Clicking "Order jacket" (or continuing to scroll) shrinks the jacket into the Shadow Falcon cart thumbnail. The white panel slides left to become the checkout column, and cart rows stagger in.
- [ ] The cart math is correct ($2,436.00 default; +$15 for doorstep delivery). The dialog opens on submit and no payment is taken.
- [ ] Every image, the logo, the emblem and the GLB load from the URLs in §2. No local assets.
