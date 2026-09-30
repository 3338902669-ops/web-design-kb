# 3D on the web: routing, budgets, acceptance

Adding 3D to a marketing page is where budgets and delivery risk explode. This document is the decision
layer that sits beside the 8-step workflow: **decide whether you need a model at all before you build
one.**

## 0. Rules that override everything else

- **Narrative first, tool second.** Choose the scenes from the client's content and the interaction mode,
  then decide whether 3D is required. Never generate a model and then look for a page to put it on.
- **One engine per visual class.**
  - real-time particles / point clouds / fields -> **procedural WebGL**, see `04-particle-field-method.md`
  - physical structures, materials, precise geometry -> **DCC pipeline** (model in a 3D tool, export glTF)
  - photoreal people / products / architecture -> **real or licensed photography**, never generated
- **Do not one-shot a complex final model.** Generate or model a rough, clean it up, then export.
- **Automation is not a waiver.** A generative service uploads your assets and spends account quota; only
  submit jobs the client authorised, and never place API keys in the repo, prompts or reports.

## 1. Route selection

| Need | First choice | Escalate when |
|---|---|---|
| Particle planet, point-cloud sculpture, scroll-driven field | Procedural WebGL + parameter uniforms | You need solid surfaces, cutting, collisions or realistic material |
| Precise geometry: architecture, towers, installations, structural demo | Scripted parametric DCC modelling | The form is too organic to script |
| A single complex organic/decorative model | Generative 3D service | Always: clean up in a DCC tool before shipping |
| Real object reconstruction from photos | Photogrammetry / reconstruction service (more images = more stable) | Too few images: model from reference instead, do not fake it |
| Interior / space reconstruction | Gaussian splat or space reconstruction | For a lightweight web asset, retopologise and simplify - never ship the raw heavy scene |
| PBR material transfer | Material transfer tools | Verify colour space, normal strength, seams, licence in the DCC tool |

## 2. Where it plugs into the 8 steps

1. Content mapping (step 1) - what each scene must communicate.
2. Interaction confirmation (step 2).
3. Motion-library search (step 3) as usual; a 3D library candidate informs composition and pacing, but a
   procedural build is not a library component and must not be described as one.
4. **3D route card** (new): per scene - is a model needed, which engine, why, asset source, budget, fallback.
5. Keyframe design (conditional): only when the real scene count needs it; freeze camera axis, light
   direction, material language, text-safe area, and model continuity across frames.
6. **Model spec freeze**: units, axis, dimensions, silhouette, material slots, detachable parts, animation
   joints, target triangles, texture budget, LODs, mobile substitute.
7. Rough build: scripted/parametric in the DCC tool, or a generative service for exploration only.
8. DCC clean-up: non-manifold check, normals, transforms applied, retopology/decimation, UVs, PBR
   materials, naming, pivots, LODs, licence recorded.
9. Web export: glTF/GLB, textures local; use Draco/Meshopt/KTX2 only if the runtime is verified to support
   them. Copy and CTA stay as real DOM text.
10. Interaction: GSAP drives camera/model parameters, never per-vertex JS updates.
11. Degradation: at 390 px choose lightweight GLB / Canvas / static frame by measurement; reduced-motion
    keeps the same narrative state.
12. Acceptance: pass both the model gate below and the page gate.

## 3. Per-model task card

- business purpose / which scene / what the user must understand
- reference images and their licensing
- route chosen and rejected alternatives
- units, axis, target size, pivot
- structures that must be selectable/visible
- material slots and colour space
- desktop/mobile triangle budget
- texture budget (count, resolution, format)
- LOD0/1/2 and mobile substitute
- export format and naming
- expected camera / light direction / background
- failure fallback

## 4. Model acceptance gate

- **Geometry**: no unexpected non-manifold edges, duplicate faces, inverted normals; transforms applied;
  scale/axis/pivot correct.
- **Structure**: parts that must be shown can be selected/toggled; naming is stable.
- **Materials**: baseColor/roughness/metallic/normal sensible; no missing textures; licence and source
  traceable.
- **Web budget**: record source and exported triangles, draw calls, material count, texture memory, file
  bytes. No "looks small enough".
- **Visual**: judge composition, silhouette, lighting, occlusion and text-safe area in a frozen camera at
  desktop and 390 px. The model author's own screenshot is not independent review.
- **Runtime**: real-window frame time, GPU/CPU load, first load, decode time, context loss, console. No
  evidence means no performance claim.
- **Security**: DCC/MCP plugins that can execute arbitrary scripts or reach the network are privileged.
  Install only from a known source, pin the version, listen on localhost only, and close the server when
  done. Never expose a modelling socket to the public internet.
