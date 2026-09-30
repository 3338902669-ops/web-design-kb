# Real-time particles and point fields

When a page needs a 3D volume, a particle nebula, a point-cloud sculpture, a flow field, or a "brand
grain" look, **build it procedurally** rather than reaching for a component or rendering a video. This
document is the implementation spec and the measurement protocol for that class of visual.

It is the default for step 3 when the candidate is 3D/particle-like **and** the page needs real-time
parameter response, a brand-grain look, or zero external assets.

## 0. When to use it

Any one of:

- real-time 3D volume / particle nebula / point-cloud sculpture / fluid field
- a brand-grain look (fine, dense, low-glow, reads as connected strokes)
- zero external assets (no video, no textures, no third-party runtime) or offline/weak-network use
- must react to parameters in real time (scroll progress, pointer, audio, form state)

Not for: photoreal products/people/architecture (use real or licensed assets), realistic photography,
or purely 2D entrances/transitions (use GSAP and a library pattern).

## 1. Build recipe

1. **Compute the shape in the vertex shader.** No mesh, no textures. Each point's position comes from a
   parametric shape function of vertex attributes (u, v, w). Morphing between shapes becomes a uniform
   blend, so no buffers are rebuilt.
2. **Every point carries size + normal + seed**, not just a position. Normals are what makes a point cloud
   look solid rather than like noise; seeds decorrelate flicker and size variation.
3. **Fix the equivalent diameter first, then the formula.** Do not tune `gl_PointSize` by eye.
   - scene tier (with depth falloff): perspective-scaled size, clamped to roughly 0.8-10.5 px at the
     reference tier
   - brand-grain tier (flat, uniform): a small base size modulated by seed, ~3-3.5 px
   - judge by the **mean length of connected ink runs**, not by the coefficient in the formula
4. **Material: one key light, a hard terminator, a rim light; brand grain turns additive glow OFF.**
   A soft disc (core + halo) plus depth fade is enough. Stacking large cores with heavy additive glow is
   what turns a field into mush; a measured build went from "6 px core plus 2.6x glow" (mush) to
   "3 px grains with glow multiplier ~0.10 and 3.5x the density" (clean brand grain).
5. **Density beats size** - the most commonly botched step.
   - "The grains are still too big" is often a density problem. When grain diameter went from 4.31 px to
     2.40 px in a measured build, the countable grains actually **rose** (23,234 -> 26,712) because
     density was increased at the same time.
   - When you shrink the diameter, **add points proportional to the lost area**. In that build the total
     budget went 110k -> 200k while the ground and road counts stayed fixed; the extra 90k went to the
     subject.
   - Whether it reads as brand grain is about **connectivity** (do the grains join into strokes), not
     about single-grain size.
6. **Blending and depth.** Additive blending, depth test off (for the field), alpha fade with distance,
   `discard` outside the disc radius. This produces volume instead of a flat wash.
7. **Budget tiers + no-GPU fallback + reduced motion.**
   - a measured tiering: desktop WebGL ~88k points at dpr <= 2; mobile WebGL ~38k at dpr <= 1.6; no-GPU
     Canvas batched sprites ~11k (mobile measured ~61 fps)
   - `prefers-reduced-motion`: render **one static frame** from the same seed - not a blank page, and no
     endless animation
   - point count and frame rate are not linear: 200k points measured 24.0 fps vs 110k at 25.4 fps, because
     the bottleneck was fill rate/glow rather than vertex count. **Measure before "optimising" by cutting
     density.**
8. **Lifecycle and error handling (a delivery-gate item).** Check shader compile and program link status,
   delete shaders after linking, delete buffers/programs on dispose, handle `webglcontextlost` by
   preventing default, switching to the Canvas fallback, and redrawing the last state. For high-resolution
   still exports, resize the canvas backing store by dpr - never upscale with CSS.

## 2. Measurement protocol (run before and after every change)

Same camera, same frame, before/after:

| Metric | How | Expectation |
|---|---|---|
| Equivalent grain diameter | mean length of connected ink runs in a target-colour region | matches the intended tier (~3 px for brand grain) |
| Visible grain count | number of connected runs in the region | rises when diameter shrinks |
| Edge transition | sum of first differences in the region | rises with density |
| Coverage / ink | share of target-colour pixels | shrinking diameter loses ink - compensate with density |
| Frame rate | **real window**, not headless | >= 24-30 fps for the tier |
| Console | console/pageerror | 0 |

To decide whether the shape reads as a letterform rather than a blob, use the **empty-column ratio**
against a mask baseline. To locate points while debugging, use a debug tint switch instead of guessing.

## 3. Common failures

| Symptom | Real cause | Fix |
|---|---|---|
| "Grains still too big" | only material changed, or extra larger layers added | audit per-layer size attributes; judge by equivalent diameter |
| Grains separate, look like noise | density too low for the diameter | add points by area; do not touch the fixed parts |
| Mush | large grains plus heavy additive glow | drop to the ~3 px tier, glow multiplier ~0.10, lean on density |
| Cloud looks flat | points lack normals, or all normals identical | add per-point normals; split geometry by face |
| Rebuilding buffers to morph | positions computed in JS | move position to a vertex-shader shape function, blend with uniforms |
| Mobile stutter / black screen | desktop-tier budget, or no fallback | budget tiers + Canvas fallback + reduced-motion static frame |
| Blurry exports | backing store not scaled by dpr | resize canvas width/height to the target resolution before export |

## 4. Interface with the 8 steps

- **Step 3** - still search the library first. When the candidate class is particle/point cloud and the
  page needs real-time response, brand grain, or zero assets, build procedurally and use library entries
  for composition and pacing reference only.
- **Step 6** - this method covers real-time geometric particles. Generative imagery/video remains for
  ambience and textures; the two can be composited.
- **Step 7** - the field's own motion lives in the shader. GSAP drives parameters only (scroll progress to
  uniforms, camera, entrance/exit). Never animate point coordinates per frame from JS.
- **Step 8** - the six measurements above are required in addition to the standard runtime evidence.
