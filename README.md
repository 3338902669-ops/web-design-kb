# web-design-kb — 网页业务知识库（私有）

> 内部使用：网页设计标准流程、动效叙事契约模板、外国客户设计基准、动效库元数据与检索。仅供工作室/代理内部，勿对外分发。

## 目录
- docs/ — WEB-DESIGN-STANDARD-PROCESS.md（设计→验收环节规范）、web-motion-narrative-contract.md（动效叙事契约模板）、design-baseline-pinterest.md（外国客户基准十律）
- motion-lib/ — motion-db.json（750 条动效：Framesbase 620 + Aceternity 108 + React Bits 22，含描述/强度/来源/官方url）、motion-search.mjs（检索 CLI）、README、backgrounds-index.json、site-components-motion.json、framesbase-motion-merged.json

## 检索
node motion-lib/motion-search.mjs -k <关键词> -s <轻|强|电影级> -src <Framesbase|Aceternity UI|React Bits> -cat <Sites|Apps|Sections|组件|Backgrounds>

## 维护
- 规则分发数据源不在本仓（见 .shared\rules）。
- 更新动效库 → 替换 motion-lib/motion-db.json 后提交。