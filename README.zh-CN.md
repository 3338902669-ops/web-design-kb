# Web Design Workflow（中文说明）

**一套可复用的「设计 -> 实现 -> 验收」网页工作流。** 动效优先、证据说话、实现者不自签。

[English](README.md) · [流程](docs/00-workflow.md) · [验收标准](docs/02-acceptance-standard.md)

## 它解决什么问题

- 风格靠感觉定：**改为开局由客户/任务指定**，未指定必须先问，不套用上一个项目的口味。
- 交互方式默认滚动：**改为 14 选 1，做完并记录才动工**。
- 动效凭记忆拼：**改为从可检索的动效库选，记录来源与完整 prompt/官方 URL**。
- 一页动效各演各的：**改为一个核心隐喻 + 共享锚点 + 单一 master timeline**。
- 「做完了」= 开发者自己看了一眼：**改为可复现证据（命令、退出码、截图、像素差、帧时间）+ 独立核验**。

## 8 步流程

| # | 步骤 | 通过条件 |
|---|---|---|
| 1 | 客户与主题解构 | 主题卡：目的、受众、情绪、**1 个核心隐喻**、<=3 内容支柱、CTA、风格基准 |
| 2 | 交互方式前置 | 14 种交互选 1，**并已确认** |
| 3 | 动效选材 | 逐区块列出候选：每区块 >=3 个、>=1 个 3D、排序并记录完整 prompt/URL |
| 4 | 动效叙事契约 | 幕结构、共享锚点、幕间衔接、单一 master timeline |
| 5 | 实现规格 | 复制完整 prompt/官方 URL + 写品牌化适配指令 |
| 6 | 定制兜底 | 仅当库无高对应时使用程序化/生成式素材 |
| 7 | 实现 | GSAP + 本地资源；只动 transform/opacity；减动效降级；390px；console 干净 |
| 8 | 验收 | 意图表 + 六维运行时证据 + 安全门禁；由未参与实现的人核验 |

## 快速开始

~~~bash
git clone https://github.com/<your-org>/web-design-kb.git
cd web-design-kb
node tools/motion-inspect.mjs --db data/motion-db.json
node tools/motion-search.mjs --db data/motion-db.json -k 粒子
~~~

工具支持自带库：`node tools/motion-search.mjs --db ./my-library.json -k 玻璃` 或设 `MOTION_DB`。

## 仓库结构

~~~
docs/        流程正文，按顺序读
  00-workflow.md                   8 步详解
  01-motion-narrative-contract.md  契约怎么填
  02-acceptance-standard.md        双门禁：运行时证据 + 安全/许可
  03-3d-web-pipeline.md            何时用 3D、预算与导出
  04-particle-field-method.md      实时粒子/点云的实现与测量
  05-motion-library.md             库结构、来源规则、如何自建
  06-evidence-levels.md            E1-E4：什么才算证据
  07-multi-agent-handoff.md        单写入者与交接纪律（多智能体协作）
  08-security-gate.md              安全门禁要产出什么
templates/   可直接填写的模板（契约、意图表、交接单、开工卡）
tools/       零依赖 Node 小工具
data/        内置动效库与索引（先读 THIRD-PARTY-NOTICE.md）
~~~

## 三种角色

| 角色 | 负责 |
|---|---|
| **Author / Lead** | 需求、风格决策、交互选择、契约确认、客户沟通 |
| **Implementer** | 代码、素材、实现证据 |
| **Verifier** | 独立重跑验收命令并签字 |

一个人可以兼任多个角色，但同一交付物上 **Implementer 与 Verifier 不能是同一人**。

## 许可

- 代码（`tools/`、`.github/`、任何脚本）：[MIT](LICENSE)
- 文档与模板（`docs/`、`templates/`、`README*`）：[CC BY 4.0](LICENSE-docs)
- 内置动效库数据（`data/`）：第三方元数据，商用/再分发前**必读** [THIRD-PARTY-NOTICE.md](THIRD-PARTY-NOTICE.md)
