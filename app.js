const data = window.REPORT_DATA;

const fmt = new Intl.NumberFormat('zh-CN');
const percent = (n, d) => (d ? Math.round((n / d) * 100) + '%' : '0%');
const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'html') node.innerHTML = value;
    else node.setAttribute(key, value);
  });
  children.forEach((child) => node.append(child));
  return node;
};

function adUrl(id) {
  return 'https://www.facebook.com/ads/library/?id=' + encodeURIComponent(id);
}

function renderKpis() {
  const k = data.kpis;
  const m = data.material;
  const cards = [
    ['素材库 ad id', fmt.format(m.collectedAdIds), '滚动收集后逐条查询/下载'],
    ['HD 素材文件', fmt.format(m.hdFiles), m.hdVideos + ' 视频 / ' + m.hdImages + ' 图片'],
    ['去重素材', fmt.format(m.uniqueMediaRepresentatives), '按文件 SHA-256 精确去重'],
    ['主玩法素材', fmt.format((m.categories.find((x) => x.category === '01_arrows') || {}).count || 0), 'Arrows / arrow maze 类'],
    ['卡片元数据样本', fmt.format(k.totalAds), 'API 切片 + 浏览器补采，非素材总量'],
    ['主页数量', fmt.format(k.pages), k.earliestStart + ' 至 ' + k.latestStart],
    ['停投均值', k.avgInactiveRunDays + ' 天', '仅基于卡片元数据样本'],
    ['Android 主包', k.androidMainShare + '%', k.androidMainAds + '/' + k.totalAds + ' 指向 ' + k.androidMainPackage],
    ['爆发周', k.peakWeek.week, k.peakWeek.adsStarted + ' 条上新，' + k.peakWeek.activeStarted + ' 条仍活跃'],
    ['Amaze 测试', fmt.format(k.amaze.ads), k.amaze.activeAds + ' 条仍活跃，最早 ' + k.amaze.firstStart],
    ['查询覆盖', data.meta.okQueries + '/' + data.meta.querySlices, '公开资料库高信号切片'],
  ];
  const root = document.querySelector('#kpi-grid');
  root.replaceChildren(...cards.map(([label, value, note]) => el('div', { class: 'kpi' }, [
    el('div', { class: 'label', text: label }),
    el('div', { class: 'value', text: value }),
    el('div', { class: 'note', text: note }),
  ])));
}

function renderTakeaways() {
  const root = document.querySelector('#takeaways');
  const m = data.material;
  const arrows = (m.categories.find((x) => x.category === '01_arrows') || {}).count || 0;
  root.append(el('ul', {}, [
    el('li', { text: '素材库真实基数是 ' + fmt.format(m.collectedAdIds) + ' 个 ad id、' + fmt.format(m.hdFiles) + ' 个 HD 文件，不是 ' + fmt.format(data.kpis.totalAds) + '。' + fmt.format(data.kpis.totalAds) + ' 只代表卡片元数据样本。' }),
    el('li', { text: '去重后 ' + fmt.format(m.uniqueMediaRepresentatives) + ' 个素材代表里，' + fmt.format(arrows) + ' 个是 Arrows / arrow maze 主玩法素材，另有真人、其他玩法和不确定素材。' }),
    el('li', { text: '这组主页更像同一个产品集群的多主页矩阵，而不是 6 个独立竞品。' }),
    el('li', { text: 'Arrows 是主线品牌，Amaze 是近期放量测试方向；具体上新节奏仍需继续补齐大页停投卡片元数据。' }),
  ]));
  document.querySelector('#caveat').append(el('p', { text: data.meta.caveat }));
  document.querySelector('#generated').textContent = '生成时间 ' + new Date(data.meta.generatedAt).toLocaleString('zh-CN');
}

function renderMaterials() {
  const m = data.material;
  const cards = [
    ['收集 ad id', fmt.format(m.collectedAdIds), m.finalQueryFailures + ' 个最终查询失败'],
    ['高清视频', fmt.format(m.hdVideos), Object.entries(m.videoDimensions || {}).map(([k, v]) => k + ' x' + v).join(' / ')],
    ['高清图片', fmt.format(m.hdImages), Object.entries(m.imageDimensions || {}).map(([k, v]) => k + ' x' + v).join(' / ')],
    ['删除重复', fmt.format(m.removedDuplicateFiles), '精确重复文件未重复计入素材代表'],
  ];
  document.querySelector('#material-kpi-grid').replaceChildren(...cards.map(([label, value, note]) => el('div', { class: 'kpi' }, [
    el('div', { class: 'label', text: label }),
    el('div', { class: 'value', text: value }),
    el('div', { class: 'note', text: note }),
  ])));
  document.querySelector('#material-caveat').replaceChildren(el('p', { text: m.caveat }));
  document.querySelector('#material-page-list').replaceChildren(...m.pages.map((page) => el('article', { class: 'winner-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: page.pageId }),
      el('div', { class: 'row-count', text: fmt.format(page.collectedAdIds) + ' ad id' }),
    ]),
    el('p', { class: 'row-text', text: 'HD 视频 ' + fmt.format(page.actualHDVideosSaved) + '，HD 图片 ' + fmt.format(page.actualHDImagesSaved) + '，候选视频 ' + fmt.format(page.candidateVideos) + '，候选图片 ' + fmt.format(page.candidateImages) }),
  ])));
  const maxCat = Math.max(...m.categories.map((x) => x.count));
  document.querySelector('#material-category-list').replaceChildren(...m.categories.map((cat) => el('article', { class: 'app-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: cat.category }),
      el('div', { class: 'row-count', text: fmt.format(cat.count) }),
    ]),
    el('p', { class: 'row-text', text: cat.description }),
    el('div', { class: 'bar-track' }, [
      el('div', { class: 'bar-active', style: 'width:' + ((cat.count / maxCat) * 100) + '%' }),
    ]),
  ])));
}

function renderPages() {
  const root = document.querySelector('#page-list');
  const cards = data.pages.map((page) => {
    const copyTags = page.topCopyTags.map((x) => el('span', { class: 'chip', text: x.value + ' ' + x.count }));
    const names = page.nameWindows.map((w) => w.name + ': ' + w.ads + '条/' + w.active + '活跃/' + w.firstStart + '~' + w.lastStart).join('；');
    return el('article', { class: 'page-card' }, [
      el('h3', { text: page.name }),
      el('p', { class: 'muted', text: names }),
      el('div', { class: 'metric-row' }, [
        metric(page.sampledAds, '样本'),
        metric(page.activeAds, '活跃'),
        metric(page.videoAds, '含视频'),
        metric(page.uniqueCreatives, '创意key'),
      ]),
      el('p', { class: 'muted', text: '上新窗口 ' + page.earliestStart + '~' + page.latestStart + '；停投均值 ' + page.avgInactiveRunDays + ' 天；最大合集 ' + page.maxCollationCount }),
      el('div', { class: 'chips' }, copyTags),
    ]);
  });
  root.replaceChildren(...cards);
}

function metric(value, label) {
  return el('div', { class: 'metric' }, [
    el('strong', { text: fmt.format(value) }),
    el('span', { text: label }),
  ]);
}

function renderWeekly() {
  const max = Math.max(...data.weekly.map((w) => w.adsStarted));
  const root = document.querySelector('#weekly-chart');
  document.querySelector('#cadence-caveat').replaceChildren(
    el('p', {
      text:
        '这里不是全量素材上新数。这个图只统计 ' +
        fmt.format(data.kpis.totalAds) +
        ' 条有开始日期的广告卡片元数据；' +
        fmt.format(data.material.hdFiles) +
        ' 是下载到本地的 HD 媒体文件数量，一条广告可能对应视频+图片，也可能多个广告复用同一素材。全量素材库目前有规模和分类口径，但不是每个素材都有可靠用于分周的开始日期。'
    })
  );
  const rows = data.weekly.slice().reverse().map((week) => {
    const activeWidth = (week.activeStarted / max) * 100;
    const inactiveWidth = (week.inactiveStarted / max) * 100;
    return el('div', { class: 'week-row' }, [
      el('div', { class: 'week-label', text: week.week }),
      el('div', { class: 'bar-track', title: week.adsStarted + ' 条' }, [
        el('div', { class: 'bar-active', style: 'width:' + activeWidth + '%' }),
        el('div', { class: 'bar-inactive', style: 'width:' + inactiveWidth + '%' }),
      ]),
      el('div', { class: 'week-count', text: fmt.format(week.adsStarted) }),
    ]);
  });
  root.replaceChildren(...rows);
}

function renderReuse() {
  const select = document.querySelector('#page-filter');
  const pageOptions = ['全部主页', ...data.pages.map((p) => p.name)];
  select.replaceChildren(...pageOptions.map((name) => el('option', { value: name, text: name })));
  select.addEventListener('change', () => renderWinners(select.value));
  renderWinners('全部主页');
  renderCopies();
}

function renderWinners(pageName) {
  const root = document.querySelector('#winner-list');
  const filtered = data.creativeGroups.filter((row) => pageName === '全部主页' || row.pageName === pageName).slice(0, 16);
  root.replaceChildren(...filtered.map(winnerRow));
}

function winnerRow(row) {
  const body = row.bodyText || '(空文案)';
  const title = row.title || '(空标题)';
  return el('article', { class: 'winner-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: row.pageName }),
      el('div', { class: 'row-count', text: row.ads + ' 条 / ' + row.activeAds + ' 活跃' }),
    ]),
    el('p', { class: 'row-text', text: row.firstStart + '~' + row.lastStart + '，最大合集 ' + row.maxCollationCount + '，跨度 ' + row.dateSpanDays + ' 天' }),
    el('p', { class: 'row-text', text: body + ' · ' + title }),
    renderAdLinks(row.sampleAdIds),
  ]);
}

function renderCopies() {
  const root = document.querySelector('#copy-list');
  root.replaceChildren(...data.crossCopy.map((row) => el('article', { class: 'copy-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: row.sampleBody || '(空文案)' }),
      el('div', { class: 'row-count', text: row.ads + ' 条 / ' + row.pageCount + ' 主页' }),
    ]),
    el('p', { class: 'row-text', text: (row.sampleTitle || '(空标题)') + '；' + row.firstStart + '~' + row.lastStart + '；' + row.activeAds + ' 条仍活跃' }),
    renderAdLinks(row.sampleAdIds),
  ])));
}

function renderAdLinks(ids) {
  return el('div', { class: 'ad-links' }, ids.map((id) => el('a', {
    href: adUrl(id),
    target: '_blank',
    rel: 'noopener',
    text: id,
  })));
}

function renderApps() {
  const root = document.querySelector('#app-list');
  const max = Math.max(...data.apps.map((app) => app.ads));
  root.replaceChildren(...data.apps.map((app) => el('article', { class: 'app-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: app.appKey }),
      el('div', { class: 'row-count', text: app.share + '%' }),
    ]),
    el('p', { class: 'row-text', text: app.ads + ' 条样本，' + app.activeAds + ' 条仍活跃，' + app.firstStart + '~' + app.lastStart }),
    el('div', { class: 'bar-track' }, [
      el('div', { class: 'bar-active', style: 'width:' + ((app.ads / max) * 100) + '%' }),
    ]),
  ])));
}

function renderDeep() {
  const deep = data.deep || {};
  const summary = deep.summary || {};
  const kpis = [
    ['已解析卡片', fmt.format(summary.mergedRows || 0), '合并原始样本、浏览器卡片、ad id 补抓'],
    ['有日期卡片', fmt.format(summary.datedRows || 0), (summary.earliestStart || '-') + ' 至 ' + (summary.latestStart || '-')],
    ['仍活跃卡片', fmt.format(summary.activeRows || 0), '用于判断当前保留素材'],
    ['ad id 补抓卡片', fmt.format(summary.adIdRows || 0), '会随缓存补齐继续增长'],
    ['全量素材 ad id', fmt.format(summary.fullAdIds || data.material.collectedAdIds || 0), '素材规模口径'],
    ['国家过滤器行', fmt.format(summary.countryRows || (deep.countryRows || []).length || 0), '不是逐条广告国家'],
  ];
  document.querySelector('#deep-kpi-grid').replaceChildren(...kpis.map(([label, value, note]) => el('div', { class: 'kpi' }, [
    el('div', { class: 'label', text: label }),
    el('div', { class: 'value', text: value }),
    el('div', { class: 'note', text: note }),
  ])));
  document.querySelector('#deep-caveat').replaceChildren(el('p', {
    text: '这个时间线只统计已经成功解析出 startDate 的广告卡片。全量 8,862 个 ad id 已有素材规模，但不是每个 ad id 都能公开返回完整日期；失效或隐藏的不会硬补。'
  }));

  document.querySelector('#deep-week-list').replaceChildren(...(deep.timelineWeeks || []).slice(0, 14).map((row) => el('article', { class: 'winner-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: row.week }),
      el('div', { class: 'row-count', text: fmt.format(Number(row.adsStarted || 0)) + ' 条' }),
    ]),
    el('p', { class: 'row-text', text: '活跃开始 ' + (row.activeStarted || 0) + '，停投开始 ' + (row.inactiveStarted || 0) + '，主页 ' + (row.pageCount || 0) }),
    el('p', { class: 'row-text', text: '阶段：' + (row.phaseMix || '-') }),
    el('p', { class: 'row-text', text: '主页：' + (row.topPages || '-') }),
  ])));

  document.querySelector('#deep-day-list').replaceChildren(...(deep.timelineDays || []).slice(0, 18).map((row) => el('article', { class: 'copy-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: row.date }),
      el('div', { class: 'row-count', text: fmt.format(Number(row.adsStarted || 0)) + ' 条' }),
    ]),
    el('p', { class: 'row-text', text: '活跃 ' + (row.activeStarted || 0) + '，停投 ' + (row.inactiveStarted || 0) + '；' + (row.topPages || '-') }),
    el('p', { class: 'row-text', text: row.topTags || '-' }),
  ])));

  document.querySelector('#retained-list').replaceChildren(...(deep.retained || []).slice(0, 14).map((row) => el('article', { class: 'winner-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: row.pageName || row.pageId }),
      el('div', { class: 'row-count', text: (row.runDays || 0) + ' 天' }),
    ]),
    el('p', { class: 'row-text', text: '开始 ' + (row.startDate || '-') + '；同族广告 ' + (row.familyAds || 1) + '；跨主页 ' + (row.familyPageCount || 1) + '；分数 ' + (row.reuseScore || 0) }),
    el('p', { class: 'row-text', text: (row.bodyText || row.title || row.creativeKey || '').slice(0, 180) }),
    renderAdLinks((row.sampleAdIds || row.adArchiveId || '').split('|').filter(Boolean).slice(0, 8)),
  ])));

  document.querySelector('#material-reuse-list').replaceChildren(...(deep.materialReuse || []).slice(0, 14).map((row) => el('article', { class: 'winner-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: (row.category || '-') + ' / ' + (row.kind || '-') }),
      el('div', { class: 'row-count', text: '重复 ' + (row.occurrenceCount || 0) + ' 次' }),
    ]),
    el('p', { class: 'row-text', text: '覆盖 ' + (row.pageCount || 0) + ' 个主页 / ' + (row.adCount || 0) + ' 个 ad id；已知日期 ' + (row.firstKnownStart || '-') + '~' + (row.lastKnownStart || '-') }),
    el('p', { class: 'row-text', text: row.representative || row.outputFile || '' }),
    renderAdLinks((row.sampleAdIds || '').split('|').filter(Boolean).slice(0, 8)),
  ])));

  document.querySelector('#family-list').replaceChildren(...(deep.families || []).slice(0, 10).map((row) => el('article', { class: 'copy-row' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'row-title', text: row.bodyText || row.title || row.familyKey }),
      el('div', { class: 'row-count', text: (row.familyAds || 0) + ' 条' }),
    ]),
    el('p', { class: 'row-text', text: '活跃 ' + (row.activeAds || 0) + '；主页 ' + (row.pageCount || 0) + '；日期 ' + (row.firstStart || '-') + '~' + (row.lastStart || '-') + '；阶段 ' + (row.phaseMix || '-') }),
    renderAdLinks((row.sampleAdIds || '').split('|').filter(Boolean).slice(0, 8)),
  ])));

  document.querySelector('#country-caveat').replaceChildren(el('p', {
    text: '国家覆盖来自 Facebook 广告资料库 country filter 的返回数量，用来观察市场覆盖和活跃/停投结构；它不是单条广告的精准 targeting 字段。'
  }));
  const countryList = document.querySelector('#country-list');
  const countries = deep.countrySummary || [];
  if (!countries.length) {
    countryList.replaceChildren(el('article', { class: 'winner-row' }, [
      el('div', { class: 'row-title', text: '国家过滤器统计尚未完成' }),
      el('p', { class: 'row-text', text: '脚本会在 page_country_counts.csv 生成后自动显示这里。' }),
    ]));
  } else {
    countryList.replaceChildren(...countries.map((row) => el('article', { class: 'winner-row' }, [
      el('div', { class: 'row-top' }, [
        el('div', { class: 'row-title', text: row.pageName || row.pageId }),
        el('div', { class: 'row-count', text: 'active ' + fmt.format(row.activeAll || 0) }),
      ]),
      el('p', { class: 'row-text', text: 'inactive ' + fmt.format(row.inactiveAll || 0) + '；all ' + fmt.format(row.allAll || 0) }),
      el('p', { class: 'row-text', text: '活跃 top 国家：' + ((row.topActiveCountries || []).map((x) => x.country + ' ' + x.count).join(' / ') || '-') }),
      el('p', { class: 'row-text', text: '停投 top 国家：' + ((row.topInactiveCountries || []).map((x) => x.country + ' ' + x.count).join(' / ') || '-') }),
    ])));
  }
}

function renderDownloads() {
  const root = document.querySelector('#downloads');
  root.replaceChildren(...data.downloads.map((item) => el('a', { href: item.href, text: item.label })));
}

renderKpis();
renderTakeaways();
renderMaterials();
renderPages();
renderWeekly();
renderReuse();
renderApps();
renderDeep();
renderDownloads();
