# Facebook 广告资料库深度挖掘报告

生成时间：2026/7/5 02:16:47

## 口径先说清楚

- 全量素材库：已下载高清素材对应 8,862 个 ad id、11,226 个高清文件，适合判断素材规模和复用。
- 元数据时间线：当前已拿到 9,482 条可解析广告卡片，其中 9,482 条有开始日期，8,692 条仍显示活跃。这个口径来自原始高信号样本、浏览器滚动卡片、ad id 补抓缓存合并去重。
- 国家分析：单条普通广告没有公开暴露精确投放国家；报告里的国家是 Facebook 资料库 country filter 的返回量，用来判断覆盖/可见市场，不等同于逐条定向。

## 时间线和上新节奏

- 已有日期的素材集中在 2026-03-17 到 2026-07-03。
- 当前最大上新周：2026-06-29，已解析 4061 条开始投放，其中活跃 3940 条。
- 节奏上不是“少量常青广告”，而是批量复制/变体测试：同一玩法、同一文案模板、同一素材会拆到多个 page 和多个 ad id 上跑。
- Arrows 到 Amaze 的切换明显：Amaze 相关广告多集中在后段，说明他们不是完全换品类，而是把 arrow/puzzle 核心玩法换品牌壳继续买量。

## 一直保留/疑似赢家

元数据口径的“保留”定义为：仍活跃、已有开始日期、运行天数较长，且最好伴随高 collationCount / 多广告复用 / 跨主页复用。

1. Go Amaze|Arrows GO！|Amaze GO！|Arrow Go|Amaze Go GO！ · 2026-06-09 起跑 · 26 天 · 2986 个同族广告 · 🏹 Find Your Flow with Amaze GO! 🪐
2. Arrows GO GO|Arrows GO - puzzle game|Go Arrow|Go Amaze|Arrow Go|Arrows GO！|Amaze GO！ · 2026-03-19 起跑 · 82 天 · 2291 个同族广告 · 🏹 Find Your Flow with Arrows Go!
3. Arrows GO GO|Go Arrow|Arrow Go|Arrows GO！|Arrows GO - escape|Amaze GO！ · 2026-03-19 起跑 · 89 天 · 406 个同族广告 · 🧩 Tap, clear, and relax with Arrows Go! 🌟✨
4. Go Arrow|Arrow Go|Amaze Go GO！|Arrows GO！|Go Amaze|Amaze GO！ · 2026-03-31 起跑 · 96 天 · 414 个同族广告 · 🧩 Tap, clear, and relax with Arrows Go! 🌟✨
5. Arrows GO GO|Arrows GO - puzzle game|Arrows GO！|Arrows GO - escape · 2026-03-23 起跑 · 45 天 · 171 个同族广告 · 🧩 Tap, clear, and relax with Arrows Go! 🌟✨
6. Arrows GO！ · 2026-04-07 起跑 · 37 天 · 45 个同族广告 · 🧠 Challenge your brain and find your way to victory! 🏹
7. Go Arrow|Arrow Go|Arrows GO！ · 2026-03-17 起跑 · 32 天 · 10 个同族广告 · Arrows GO - The Only Arrows Puzzle Game You'll Ever Need
8. Go Amaze · 2026-06-10 起跑 · 25 天 · 74 个同族广告 · 🏹 Finde deinen Flow mit Amaze GO! 🪐

素材文件口径的“赢家”定义为：完全相同文件 SHA-256 在多个 ad id/page 中重复出现。这比文案相似更硬，说明他们反复把同一素材重新投放或复制到不同主页。

1. 01_arrows/image · 重复 33 次 · 覆盖 3 个主页 / 33 个 ad id · page_1083595128159871/images/ad_1040687898397831_image_aee13c822028.jpg
2. 03_live_action_real_people/image · 重复 27 次 · 覆盖 3 个主页 / 27 个 ad id · page_1083595128159871/images/ad_1305391948331975_image_4e2f435d4267.jpg
3. 04_non_game_or_uncertain/image · 重复 27 次 · 覆盖 3 个主页 / 27 个 ad id · page_1083595128159871/images/ad_1041321418388368_image_d1adcc3f0874.jpg
4. 01_arrows/image · 重复 26 次 · 覆盖 3 个主页 / 26 个 ad id · page_1083595128159871/images/ad_1054250706937811_image_114e50749307.jpg
5. 01_arrows/image · 重复 25 次 · 覆盖 3 个主页 / 25 个 ad id · page_1083595128159871/images/ad_1042982064719819_image_bcbf854e49e9.jpg
6. 01_arrows/image · 重复 24 次 · 覆盖 3 个主页 / 24 个 ad id · page_1083595128159871/images/ad_1006590108796090_image_4baec32a4d34.jpg
7. 01_arrows/image · 重复 24 次 · 覆盖 3 个主页 / 24 个 ad id · page_1083595128159871/images/ad_1024442626600419_image_25dc4545e52b.jpg
8. 01_arrows/image · 重复 24 次 · 覆盖 3 个主页 / 24 个 ad id · page_1083595128159871/images/ad_1028671076271619_image_9a88dadfc234.jpg

## 主页矩阵

- Go Amaze: 已解析 4211 条，活跃 4131，日期跨度 2026-03-19 到 2026-07-03，主阶段 Amaze GO，主标签 emoji_heavy(2510); urgency(2459); puzzle_core(2392); relax(2386); challenge(2244); uncategorized(1689)。
- Arrows GO！: 已解析 3927 条，活跃 3825，日期跨度 2026-03-20 到 2026-07-03，主阶段 Amaze GO，主标签 emoji_heavy(3462); puzzle_core(3444); relax(3326); urgency(3225); challenge(3140); brand_amaze(1742)。
- Arrow Go: 已解析 724 条，活跃 663，日期跨度 2026-03-17 到 2026-07-03，主阶段 Arrows GO，主标签 puzzle_core(523); relax(520); emoji_heavy(519); arrow_pin(389); challenge(354); urgency(351)。
- Arrows GO GO: 已解析 422 条，活跃 73，日期跨度 2026-03-19 到 2026-07-03，主阶段 Arrows GO，主标签 arrow_pin(326); emoji_heavy(326); relax(326); brand_arrows(261); puzzle_core(206); urgency(123)。

## 国家覆盖

- Arrows GO - puzzle game: active ALL 0; top countries US:0; GB:0; CA:0; AU:0; NZ:0; FR:0; DE:0; ES:0
- Arrows GO - escape: active ALL 0; top countries US:0; CA:0; GB:0; AU:0; NZ:0; DE:0; FR:0; ES:0
- Arrows GO GO: active ALL 73; top countries BR:56; MY:49; ES:45; IT:44; FR:41; TH:37; CA:28; JP:27
- Amaze Go GO！: active ALL 689; top countries US:354; DE:144; AU:141; BR:141; IT:139; MY:137; ES:125; FR:124
- Go Amaze: active ALL 4456; top countries BR:751; GB:684; IN:670; MY:613; FR:607; JP:602; IT:598; ES:597
- Amaze GO！: active ALL 3984; top countries BR:1207; MY:1116; IT:1066; PH:1015; FR:1010; ES:1002; JP:994; US:979

## 策略判断

1. 他们的核心不是单素材长跑，而是“素材池 + 多主页 + 大量 ad id 复制”的放量结构。完全重复文件出现几十次，说明优胜素材会被多次重开，而不是只保留一个原广告。
2. 主玩法仍是 arrow/maze/puzzle。live action 和 non-game/uncertain 素材更多像包装层，用来提高停留和首屏差异，不像主投方向。
3. 文案模板非常稳定：relax、challenge、puzzle_core、arrow_pin、2026/now 等词反复出现。创意迭代主要在画面、素材组合和品牌名，而不是重新发明卖点。
4. 多主页矩阵用于承接不同品牌壳和测试批次。Go Amaze 看起来是 Arrows GO 的后续放量或换壳测试，而不是完全独立策略。
5. 后续监控要盯三件事：每周新启 ad id 数、重复 SHA 素材是否继续扩散、Amaze 相关素材是否替代 Arrows 文案成为主包。
