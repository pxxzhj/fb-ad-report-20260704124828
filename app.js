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
  const cards = [
    ['去重广告样本', fmt.format(k.totalAds), k.activeAds + ' 活跃 / ' + k.inactiveAds + ' 已停'],
    ['主页数量', fmt.format(k.pages), k.earliestStart + ' 至 ' + k.latestStart],
    ['含视频广告', fmt.format(k.videoAds), percent(k.videoAds, k.totalAds) + ' 的样本含视频素材'],
    ['停投均值', k.avgInactiveRunDays + ' 天', '短周期素材筛选信号'],
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
  root.append(el('ul', {}, [
    el('li', { text: '这组主页更像同一个产品集群的多主页矩阵，而不是 6 个独立竞品。' }),
    el('li', { text: '6 月 29 日周明显批量上新，不是平滑日更；随后快速筛选、保留活跃版本。' }),
    el('li', { text: 'Arrows 是主线品牌，Amaze 是近期放量测试方向，值得单独跟踪画面变化。' }),
    el('li', { text: '文案母版高度复用，真正变量更可能在前 3 秒、关卡、主页名、标题和落地链路。' }),
  ]));
  document.querySelector('#caveat').append(el('p', { text: data.meta.caveat }));
  document.querySelector('#generated').textContent = '生成时间 ' + new Date(data.meta.generatedAt).toLocaleString('zh-CN');
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

function renderDownloads() {
  const root = document.querySelector('#downloads');
  root.replaceChildren(...data.downloads.map((item) => el('a', { href: item.href, text: item.label })));
}

renderKpis();
renderTakeaways();
renderPages();
renderWeekly();
renderReuse();
renderApps();
renderDownloads();
