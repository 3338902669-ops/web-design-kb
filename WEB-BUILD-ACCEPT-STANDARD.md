# 网页制作 + 验收 · 详细操作手册（2026-09-04）

> 范围：设计契约(九) → 实现与验证(十) → 安检+终验收(十一)。依据：AGENTS 各门禁节 + web-design-process v1 + 动效叙事契约。

## A. 设计契约（动手前冻结）
### A1 主题与风格
- 客户/受众/场合/情绪基调；外国客户默认 pinterest 白底克制（design-baseline-pinterest.md），否则冲击优先档。
- 核心隐喻×1、内容支柱≤3、CTA；填 0 节主题卡。产出：主题卡。
### A2 交互方式（前置，14 选 1）
- 列选项给用户选并记录；禁止默认滚动下滑。
### A3 选材（强制查库 + 用户确认）
- 命令：node C:\Users\33389\.openclaw\workspace\motion-search.mjs -k 关键词 -s 轻|强|电影级 -src Framesbase|Aceternity UI|React Bits -cat Sites|Apps|Sections|组件|Backgrounds
- 按主题筛 2-3 候选，记录：条目/来源/语义匹配理由/意图/强度/完整 prompt 来源 → 呈现用户确认（未确认不实现）。
### A4 动效叙事契约（design/动效叙事契约.md，建页必填）
- 2 幕结构表（每幕=叙事单元：目的/内容/情绪/意图句）
- 3 逐幕选材表（语义+意图+强度+prompt 来源）；3.1 适配改写指令（品牌色/真实文案/内容锚点/节奏/去演示）
- 4 转场语言：≥1 全页共享锚点贯穿；幕间 共享元素连续/morph/节奏桥；统一缓动/时长/方向；禁硬切
- 5 master timeline 规格：整页单一 GSAP 总进度驱动子时间线；6 验收意图表留空待填
### A5 实现规格
- 复制候选完整 prompt（edge-cache\<slug>.json#prompt_text / prompts\<Name>.md / GitHub raw）或组件官方 url；禁二手转述。
- ComfyUI 仅库无高对应或定制时兜底（生成氛围素材与库内动效合成）。
### A6 静态稿确认
- 版式/字体层级/配色令牌/组件静态落地 → 截图给用户确认 → 才进入动画。

## B. 实现（十 · 四方流水线）
- 主写入单一（网页类 Codex 主制；冲突时用户指令>交接单>规则）；本项目本地 assets 化：gsap.min.js/ScrollTrigger（+SplitText/Scramble 按需）复制进项目，勿引绝对路径/CDN。
- 全页滚动叙事=单一 master timeline：ScrollTrigger 总进度(0-100%)映射叙事，各动效块作子时间线挂 master，禁止各块自定随机触发。
- 入场时长基准 100-500ms（NN/g），段落不超 500ms，整段 ≤2-3s；淡入建议 100-400ms；reduced-motion 下跳过全部动画并保证内容可读。
- 降级三件：prefers-reduced-motion 完整静态可读；390px 无横向溢出且信息完整；console 0 error、0 4xx。
- 里程碑交付节奏：按幕/区块分批给用户看（首屏→各幕→整体），每批验收通过再继续。

## C. 验收（十一 · 双门禁）
### C1 运行时终验收（实现者提供，证据要可复现 E1）
- 意图表逐块核对：内容语义贴合？进出转场共享元素/无硬切？reduced-motion 下叙事主链仍可读？390 成立？
- 六维证据：①桌面 1440 全流程滚动 ②390px ③prefers-reduced-motion ④console/pageerror 0 + HTTP 4xx 0 ⑤动画确在动（两帧像素签名不同）⑥交互与键盘可用（tab/Enter/焦点可见）。
- 无头 Edge：C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe + puppeteer-core；截图存 evidence-*。
- 证据等级如实标注：E1 可复现 / E2 同体系互检 / E3 自证 / E4 待验证；实现者不自宣 PASS。
### C2 安全门禁（独立，报告存仓库外）
- codex-security scan <项目根> --model <模型> --effort medium --provider <provider> --output-dir C:\Users\33389\.shared\security-reports\<项目名> --fail-on-severity high --headless
- high/critical 修复后复扫通过；medium/low 记录风险与处置；退出码+复扫结论写入 CURRENT-TASK.md。
### C3 终局
- 双门禁齐备 → OpenClaw 最终确认 → 进入部署（客户旅程第 10 步）。

## D. 常用自检命令速查
- node --check assets\js\*.mjs|js（语法）
- 无头验收脚本：workspace\xhs-scraper 下历史脚本可复用（verify-*/v5v/v6b 模式）
- 检索动效：motion-search.mjs（见 A3）