# motion-db 检索手册（2026-09-04 版）

## 数据文件
- `motion-db.json`（750 条，主库，结构见下）
- `framesbase-library.json`（Framesbase 镜像站 620 条全量：id/name/tag/key）
- `framesbase-motion-merged.json`（469 条：name/cat/key/motion/strength）
- `backgrounds-index.json`（Backgrounds 150 条效果描述索引）
- `site-components-motion.json`（React Bits 22 + Aceternity 108 组件）
- `pinterest-design-study/`（pinterest.design 视觉学习证据：截图+tokens+视觉分析）
完整 prompt 源：`C:\Users\33389\.shared\motionsites\edge-cache\<slug>.json#prompt_text` 与 `prompts\<Name>.md`

## motion-db.json 条目结构
```
{ cat, name, tag, style, motion, strength(轻/强/电影级), source(Framesbase/Aceternity UI/React Bits), slug?, url? }
```

## 选取流程（固定）
1. 客户主题 → 查库筛选 2-3 候选（记录条目+来源）→ 呈现给用户确认。
2. 有完整 prompt 的候选：复制 `prompt_text` 原文作为实现规格（禁二手转述）；组件类（Aceternity/ReactBits）：实现源=官方 url。
3. 客户化重构（真实品牌/内容/图片/字体配色；禁照抄演示品牌与假数据）。
4. 外国客户默认 pinterest.design 克制基准（见 design-baseline-pinterest.md），不套重动效。
5. GSAP 落地 + reduced-motion/390 降级 → 运行时验收 + codex-security。

## 检索示例
```bash
node motion-search.mjs -k 粒子 -s 强          # 关键词+强度
node motion-search.mjs -src "Aceternity"      # 按来源
node motion-search.mjs -cat Backgrounds -s 电影级
```