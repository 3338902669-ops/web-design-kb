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
## 动效库质量规范（2026-09-04 固化）
- **受控词表（20 标签）**：光效脉冲/粒子/视差/3D/流体/文字动画/视频背景/扫描划屏/悬停交互/滚动触发/玻璃拟态/渐变/HUD数据/磁吸弹性/遮罩揭示/噪声纹理/分屏切换/音画节奏/舞台聚光/入场离场。每条含 tags[]（检索按标签聚合）。
- **来源 nature**：prompt（描述提炼自完整 prompt 原文，优先采信）/ visual（帧视觉推断）/ component（官方组件）。
- **质检 status**：valid / suspect（黑屏/无可见动效等无效内容不入有效集）。
- **反向链接**：条目含 id/key/url，按 id 寻址，改名不失联。
- 选取时优先 nature=prompt 且 status=valid 的条目；检索示例：`node motion-search.mjs -k 粒子 -s 强`（标签命中可用 -k 直接查标签名）。