# Facebook 广告资料库竞品投放策略分析

生成时间：2026-07-04T04:31:09.759Z

## 口径和可信度

- 数据来源：公开 Meta/Facebook Ad Library GraphQL 返回的广告卡片信息。
- 查询范围：6 个去重 pageId；按 active / inactive / all、all / video / image、total impressions / time active 共 108 个查询切片采集。
- 查询结果：108 个切片成功，0 个失败；去重后 693 条广告样本。
- 重要限制：Facebook 的分页接口在浏览器外触发限流，所以本报告是“高信号样本”，覆盖头部曝光、当前活跃、最近上新和最近停投广告；不能等同于页面全部长尾广告总量。
- 没有读取或导出浏览器 cookie、localStorage、sessionStorage 或登录凭据。

## 结论先看

1. 这更像同一个产品集群的多主页矩阵，而不是 6 个独立竞品。样本里 613/693 条都指向 Android 包 `play.google.com:com.oakever.arrows`，iOS/Appsflyer 也集中在同一个 `6758326278`。
2. 主页矩阵有明显生命周期：`Arrows GO - escape` 和 `Arrows GO - puzzle game` 已没有活跃广告；`Arrows GO GO`、`Go Arrow / Go Amaze`、`Arrow Go`、`Arrows GO！ / Amaze GO！` 仍在跑。
3. 6 月 29 日这一周是最强爆发周：样本里 274 条新广告，其中 153 条到采集时仍活跃。这不是平滑上新，而是批量铺素材、快速筛选。
4. 停投广告平均存活约 12.2 天，说明测试周期偏短：通常 1 到 2 周内决定保留、停掉或换主页/换文案继续测。
5. 创意形态是视频优先但每条都有图片/封面：564/693 条样本含视频，693/693 条样本含图片。素材主题高度集中在箭头、清除、解压、脑力训练、轻挑战。
6. `Amaze` 命名是近期重点：样本里 95 条含 `Amaze`，67 条仍活跃，最早从 2026-06-09 出现，7 月 2 到 7 月 3 日在 `Amaze GO！` 下集中上新。

## 页面矩阵

| 主页名/历史名 | 样本 | 活跃 | 已停 | 含视频 | 创意key数 | 上新窗口 | 停投均值(天) | 最大合集数 |
|---|---:|---:|---:|---:|---:|---|---:|---:|
| Arrows GO！ / Amaze GO！ | 170 | 68 | 102 | 127/75% | 132 | 2026-03-20~2026-07-03 | 10.6 | 39 |
| Go Arrow / Go Amaze | 154 | 74 | 80 | 131/85% | 122 | 2026-03-19~2026-07-03 | 11.6 | 24 |
| Arrow Go / Amaze Go GO！ | 129 | 68 | 61 | 128/99% | 97 | 2026-03-17~2026-07-03 | 13.9 | 14 |
| Arrows GO GO | 118 | 57 | 61 | 116/98% | 66 | 2026-03-19~2026-07-03 | 13.0 | 18 |
| Arrows GO - puzzle game | 65 | 0 | 65 | 56/86% | 31 | 2026-03-19~2026-05-19 | 13.7 | 8 |
| Arrows GO - escape | 57 | 0 | 57 | 6/11% | 38 | 2026-03-21~2026-04-18 | 11.6 | 2 |

### 主页名称变化

- 899629066577253: Arrows GO！: 137条/37活跃/2026-03-20~2026-07-03；Amaze GO！: 33条/31活跃/2026-07-02~2026-07-03
- 1083595128159871: Go Arrow: 107条/43活跃/2026-03-19~2026-07-03；Go Amaze: 47条/31活跃/2026-06-09~2026-07-03
- 1094680553722830: Arrow Go: 127条/68活跃/2026-03-17~2026-07-03；Amaze Go GO！: 2条/0活跃/2026-06-29~2026-06-29
- 1003176282885386: Arrows GO GO: 118条/57活跃/2026-03-19~2026-07-03
- 1029066410292901: Arrows GO - puzzle game: 65条/0活跃/2026-03-19~2026-05-19
- 993669333838225: Arrows GO - escape: 57条/0活跃/2026-03-21~2026-04-18

## 上新节奏

| 周起始 | 新广告数 | 仍活跃 | 已停 | 涉及主页名 |
|---|---:|---:|---:|---|
| 2026-06-29 | 274 | 153 | 121 | Arrows GO GO / Go Arrow / Go Amaze / Amaze Go GO！ / Arrow Go / Arrows GO！ / Amaze GO！ |
| 2026-04-13 | 53 | 5 | 48 | Arrows GO GO / Arrows GO - puzzle game / Go Arrow / Arrow Go / Arrows GO！ / Arrows GO - escape |
| 2026-05-11 | 50 | 5 | 45 | Arrows GO GO / Arrows GO - puzzle game / Go Arrow / Arrow Go / Arrows GO！ |
| 2026-05-18 | 47 | 20 | 27 | Arrows GO GO / Arrows GO - puzzle game / Go Arrow / Arrow Go / Arrows GO！ |
| 2026-03-23 | 45 | 0 | 45 | Arrows GO GO / Arrows GO - puzzle game / Arrow Go / Arrows GO - escape |
| 2026-06-22 | 37 | 26 | 11 | Arrows GO GO / Go Amaze / Arrow Go / Arrows GO！ |
| 2026-04-06 | 29 | 11 | 18 | Go Arrow / Arrow Go / Arrows GO！ |
| 2026-03-30 | 29 | 6 | 23 | Arrows GO GO / Go Arrow / Arrow Go / Arrows GO！ |
| 2026-03-16 | 28 | 0 | 28 | Arrows GO GO / Arrows GO - puzzle game / Go Arrow / Arrow Go / Arrows GO！ / Arrows GO - escape |
| 2026-06-15 | 25 | 3 | 22 | Arrows GO GO / Go Amaze / Arrow Go / Arrows GO！ |

节奏判断：

- 3 月中下旬开始建初始素材池，两个早期页面主要承担冷启动测试。
- 4 月到 5 月是持续迭代期，停投样本较多，说明筛素材和落地页。
- 6 月 29 日周进入集中放量/重启期，四个仍活跃主页同时大量上新。
- 7 月 2 到 7 月 3 日仍有新广告出现，说明这组账户不是历史残留，当前仍在投。

## 落地页和产品指向

| 应用/落地域 | 广告数 | 占比 | 活跃 | 时间窗口 |
|---|---:|---:|---:|---|
| play.google.com:com.oakever.arrows | 613 | 88.5% | 237 | 2026-03-17~2026-07-03 |
| app.appsflyer.com:6758326278 | 50 | 7.2% | 28 | 2026-03-20~2026-06-23 |
| apps.apple.com:6758326278 | 20 | 2.9% | 1 | 2026-03-20~2026-06-23 |
| itunes.apple.com:6758326278 | 10 | 1.4% | 1 | 2026-04-01~2026-06-25 |

判断：

- Android 是主战场，Google Play 直连占比最高。
- iOS 流量体量小，更多像补量或验证；Appsflyer 链接用于归因和活动参数回传。
- 同一 Android 包出现在所有主页名下，说明多主页不是不同产品，而是同一产品/相近壳的投放入口矩阵。

## 素材复用和测试方式

| 主页 | 同创意广告数 | 活跃 | 时间窗口 | 文案 | 标题 |
|---|---:|---:|---|---|---|
| Arrows GO GO | 11 | 1 | 2026-04-04~2026-07-02 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! 2026 for Brain Training |
| Arrows GO GO | 9 | 1 | 2026-04-03~2026-07-02 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! 2026 for Brain Training |
| Arrows GO GO | 8 | 1 | 2026-04-03~2026-07-02 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! 2026 for Brain Training |
| Go Arrow / Go Amaze | 7 | 1 | 2026-03-19~2026-07-02 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! - Your Puzzle Master 2026 |
| Arrows GO GO | 7 | 1 | 2026-04-04~2026-07-02 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! 2026 for Brain Training |
| Go Arrow / Go Amaze | 5 | 1 | 2026-04-06~2026-07-02 | (空文案) | (空标题) |
| Arrows GO GO | 5 | 1 | 2026-05-12~2026-07-02 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! - Your Puzzle Master 2026 |
| Arrows GO GO | 5 | 1 | 2026-03-26~2026-07-02 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! - Your Puzzle Master 2026 |
| Arrow Go / Amaze Go GO！ | 4 | 1 | 2026-04-11~2026-07-02 | 🏹 Find Your Flow with Arrows Go! | Arrows Go! - Your Puzzle Master 2026 |
| Arrow Go / Amaze Go GO！ | 4 | 1 | 2026-04-24~2026-07-02 | 🏹 Find Your Flow with Arrows Go! | Arrows Go! - Your Puzzle Master 2026 |
| Arrows GO GO | 4 | 1 | 2026-05-21~2026-06-29 | 🏹 Find Your Flow with Arrows Go! | Arrows Go! - Your Puzzle Master 2026 |
| Go Arrow / Go Amaze | 3 | 1 | 2026-06-29~2026-07-02 | (空文案) | (空标题) |

复用判断：

- 大量重复创意不是偶然重复上传，而是系统性矩阵测试：同素材换主页、换标题、换落地链路、换 CTA。
- `Tap, clear, and relax with Arrows Go!` 和 `Find Your Flow with Arrows Go/Amaze Go` 是两条核心文案母版。
- 活跃+已停同时存在的创意组值得重点看：它们很可能是“曾经测试过、现在仍有版本存活”的素材方向。

## 跨主页文案复用

| 广告数 | 活跃 | 覆盖主页数 | 时间窗口 | 样本文案 | 样本标题 |
|---:|---:|---:|---|---|---|
| 156 | 63 | 5 | 2026-03-19~2026-07-03 | 🏹 Find Your Flow with Arrows Go! | Arrows Go! - Your Puzzle Master 2026 |
| 139 | 4 | 4 | 2026-03-23~2026-07-02 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! 2026 for Brain Training |
| 100 | 64 | 4 | 2026-03-20~2026-07-03 | (空文案) | (空标题) |
| 85 | 27 | 5 | 2026-03-19~2026-07-03 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! - Your Puzzle Master 2026 |
| 83 | 31 | 3 | 2026-04-05~2026-07-02 | 🧩 Tap, clear, and relax with Arrows Go! 🌟✨ | Arrows Go! - Tap, Move, and Clear |
| 70 | 59 | 2 | 2026-06-09~2026-07-03 | 🏹 Find Your Flow with Amaze GO! 🪐 | Amaze GO! - Your Puzzle Master 2026 |
| 8 | 0 | 3 | 2026-03-17~2026-07-02 | Arrows GO - The Only Arrows Puzzle Game You'll Ever Need | A Satisfying Brain Teaser |

这说明他们不是为每个主页单独写内容，而是先建立少数高复用文案公式，再通过不同 pageId 和素材变体放大测试规模。

## 文案和定位

- 主定位：轻度休闲 puzzle，强调 tap / clear / relax / flow。
- 情绪钩子：解压、放松、短休息、轻挑战，不强调硬核难度。
- 能力钩子：brain training、puzzle master、logic break，把简单玩法包装成“脑力训练”。
- 视觉/语言风格：emoji 密度高，标题短，CTA 基本是安装/玩游戏，适合移动端信息流快速扫过。
- 品牌测试：`Arrows Go` 是主线，`Amaze Go` 从 6 月上旬开始试，6 月下旬到 7 月初明显放量。

## 对他们投放策略的判断

1. 多主页矩阵投放：用多个 pageId 分摊测试、降低单页疲劳，并保留不同命名方向。
2. 短周期素材筛选：停投均值约 12.2 天，说明他们偏快速止损，不长期保留弱素材。
3. 批量上新而非日更：关键节点一次性上几十条，随后根据表现关停/保留。
4. 素材池复用程度高：核心玩法和核心文案高度固定，真正变化可能在前 3 秒画面、关卡状态、标题、落地页和主页名。
5. Android 主投、iOS 辅测：Google Play 占主要流量，iOS 相关链路体量小且更分散。
6. 近期重点从 `Arrows` 往 `Amaze` 延展：这可能是换壳、换品牌名、或同玩法新包的市场接受度测试。

## 建议你重点追踪的对象

- 2026-06-29 之后仍活跃的广告：这是他们当前最重视的批次。
- 同 creativeKey 下同时有活跃和已停版本的素材：这类最像优胜方向。
- 含 `Amaze` 的广告：它们出现晚、活跃率高，值得单独拉素材看画面是否变化。
- 走 Appsflyer / iOS 的广告：量不大，但能暴露他们是否准备扩平台或拆 campaign。

## 产物文件

- `ads_clean.csv`：广告级清洗表。
- `page_strategy_scorecard.csv`：中文报告使用的主页策略记分表。
- `weekly_launch_pivot.csv`：按周聚合的上新节奏。
- `winner_candidates.csv`：活跃且有复用/长时间跨度/合集信号的候选赢家素材组。
- `cross_page_copy_reuse.csv`：跨主页复用文案和标题。
- `creative_reuse.csv`、`copy_themes.csv`、`landing_summary.csv`：基础复用、文案主题、落地域统计。
- `strategy_report.md`：英文基础自动报告。
