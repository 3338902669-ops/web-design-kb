# 网页设计·设计到验收环节规范（v2026-09-04 · 权威文档）

> 本文件是既有 11 步全流程（客户旅程，介绍单-v4）中『设计-实现-终验收』环节的详细执行规范（嵌入第 7 步设计契约之后并贯穿 8-9 步），非替代全流程；商务端以桌面《网页制作全流程介绍单-v4-2026-09-02.md》与 /start 引擎为准。精简版已注入四方 AGENTS（shared-rules web-design-process v1）。

## 配套文件
- 动效叙事契约（建页必填模板）：`web-motion-narrative-contract.md` → 项目内复制为 `design/动效叙事契约.md` 填写
- 外国客户设计基准：`design-baseline-pinterest.md`
- 动效主库：`motion-db.json`（750 条）+ 检索 `motion-search.mjs` + README `motion-db-README.md`
- Backgrounds 描述索引：`backgrounds-index.json`
- 完整 prompt 源：`.shared\motionsites\edge-cache\*.json#prompt_text` / `prompts\*.md` / GitHub raw
- 设计知识库（学术档位标注）：workspace AGENTS『网页设计新规则』节

## 本环节子步骤（设计契约 → 实现 → 终验收，对应全流程第 7-9 步）

### 1. 客户分析与主题解构
- 真实客户画像（场合/受众/目的/CTA）；风格基准判定：外国客户→pinterest.design 白底杂志式克制（十律见基准文档）；国内/明确要暗色炫酷→冲击优先。
- 输出：0 主题解构卡（品牌/目的/受众/情绪基调/核心隐喻×1/内容支柱≤3/CTA/风格基准）。

### 2. 交互方式前置（用户选择）
- 罗列 14 种交互方式（滚动/点击分段/横向/视差/时间线/键盘/Hover/3D/拖拽/Bento/视频开场/Prezi/问答）→ 用户确认后写入契约 1 节；禁止默认滚动下滑。

### 3. 动效选材（强制查 motion-db）
- 命令：`node workspace\motion-search.mjs -k <关键词> -s <轻|强|电影级> -src <Framesbase|Aceternity UI|React Bits> -cat <Sites|Apps|Sections|组件|Backgrounds>`
- 按主题筛 2-3 候选，记录条目+来源+语义匹配理由+意图+强度，呈现用户确认（未确认不实现）。
- 背景类走 backgrounds-index.json（效果描述检索）；镜像站预览 app.framesbase.app（已登录）。

### 4. 动效叙事契约（先解构、后选材、禁硬切）
- 填写 2 幕结构表、3 逐幕选材表、3.1 适配改写指令、4 转场语言、5 master timeline、6 验收意图表（模板各字段见 web-motion-narrative-contract.md）。
- 强制：核心隐喻≥1；全页≥1 共享锚点贯穿；幕间用 共享元素连续/morph/节奏桥 衔接；统一缓动/时长/方向；整页单一 master timeline（GSAP ScrollTrigger 总进度驱动子时间线）。

### 5. 复制完整 prompt 作为实现规格
- 候选确认后：edge-cache prompt_text / prompts .md / GitHub raw 复制全文，或组件官方 url；禁止二手转述。
- 改写指令必须落在 3.1：品牌色/真实文案/内容锚点/节奏/去演示内容 → 禁止直出照搬。

### 6. ComfyUI 仅定制兜底
- 库有高对应→直接用库流程，不开 ComfyUI；仅库无高对应或有定制→ComfyUI 生成氛围素材与库内动效合成（127.0.0.1:8188；AnimateDiff 视频背景可选）。
- 红线：AI 素材属设计元素；客户可见产品/人物/建筑图必须真实或授权。

### 7. 实现
- 动效统一 GSAP/ScrollTrigger（库复制进项目 assets/，勿引绝对路径；插件 SplitText/Scramble 按需）。
- 每块为 master timeline 子时间线；prefers-reduced-motion 完整降级；390px 无溢出；console 零报错。

### 8. 验收（双门禁）
- 运行时：按契约 6 节意图表逐块核对（语义贴合/转场共享/降级叙事主链/390）+ 桌面 1440/390/reduced-motion/console/像素帧差证据闭环；交互与键盘可用。
- 安检：codex-security scan（命令见 AGENTS security-gate 节），high/critical 必须修复复扫；报告目录在仓库外。
- 实现者不自宣 PASS；交付源码按交付规则打包（去密钥/内部文件）。

## 2026-09-03/04 更新记录
- 09-03：外国客户基准(pinterest.design，视觉学习版十律)；动效选后复制完整 prompt 规则。
- 09-04：动效叙事契约（内容适配×幕转场×意图）；动效库补全 750 条（Framesbase 465/469 动效描述 + Aceternity 108 + React Bits 22，中转视觉模型识别）；ComfyUI 降级为定制兜底；检索脚本+README；以上合并为本流程并分发四方。