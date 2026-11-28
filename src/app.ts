import { COURSE } from './data/course';
import { ringkasFor } from './data/ringkas';
import { TIMELINE, FLASHCARDS, PINS, PIN_KIND, PHASES } from './data/atlas';
import { renderRingkas } from './blocks';
import { quizView, startQuiz, quizClick, resetQuiz } from './quiz';
import type { Flashcard, MapPin, TimelineEvent } from './types';
import {
  $, $$, esc, md, icon, hydrateIcons, CHAPTERS, chapterById, toneOf, iconOf, questionsOf, img, pad,
  prefs, savePrefs, shuffle, norm, plain,
} from './lib';
import {
  hscroll, initHScroll, attachScrollbar, initPageScrollbar, gcBars, updateBars, VList, lazyImg, initLazy,
  moveIndicator, centerInTrack, scrollToEl, smoothScrollTo, reduced,
} from './ui';

const app = $('#app')!;
const loadMap = () => import('./map');

/* lifecycle per halaman */
let mounts: (() => void)[] = [];
let disposers: (() => void)[] = [];
const onMount = (f: () => void) => mounts.push(f);
const onDispose = (f: () => void) => disposers.push(f);

/* =============================================================
   NAV
   ============================================================= */
const NAV = [
  { href: '#/', label: 'Beranda', i: 'home', match: /^#\/?$/ },
  { href: '#/bab', label: 'Materi', i: 'book', match: /^#\/bab/ },
  { href: '#/timeline', label: 'Timeline', i: 'clock', match: /^#\/timeline/ },
  { href: '#/peta', label: 'Peta', i: 'map', match: /^#\/peta/ },
  { href: '#/kartu', label: 'Kartu', i: 'cards', match: /^#\/kartu/ },
  { href: '#/ujian', label: 'Ujian', i: 'target', match: /^#\/ujian/ },
];
let navBuilt = false;
function drawNav() {
  const h = location.hash || '#/';
  if (!navBuilt) {
    $('#nav-links')!.innerHTML = NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join('');
    $('#tabbar')!.innerHTML = NAV.filter(n => n.label !== 'Timeline').map(n => `<a href="${n.href}">${icon(n.i)}<span>${n.label}</span></a>`).join('');
    navBuilt = true;
  }
  $$<HTMLAnchorElement>('#nav-links a, #tabbar a').forEach(a => {
    const n = NAV.find(x => x.href === a.getAttribute('href'))!;
    if (n.match.test(h)) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  moveIndicator($('#nav-links'), 'a[aria-current]');
  moveIndicator($('#tabbar'), 'a[aria-current]');
}
function drawTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  $('#theme')!.innerHTML = icon(dark ? 'sun' : 'moon');
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', dark ? '#111513' : '#f5f1e8');
}

/* =============================================================
   HOME
   ============================================================= */
const PHASE_POINTS: Record<string, string[]> = {
  'Menuju Merdeka': ['Jepang terdesak dan menjanjikan kemerdekaan', 'BPUPKI merumuskan dasar negara Pancasila', 'Rengasdengklok, lalu Proklamasi 17 Agustus 1945'],
  'Negara Terbentuk': ['PPKI mengesahkan UUD 1945 dan memilih Presiden', 'Kementerian, 8 provinsi, KNIP, dan BKR dibentuk', 'Rakyat dan daerah berdiri di belakang Republik'],
  'Mempertahankan': ['Sekutu datang membonceng NICA (Belanda)', 'Pertempuran Surabaya, Ambarawa, Bandung, Margarana', 'Linggarjati, Renville, dan dua Agresi Militer'],
  'Kedaulatan': ['Roem-Royen dan Konferensi Inter-Indonesia', 'Konferensi Meja Bundar di Den Haag', 'Belanda mengakui kedaulatan, 27 Desember 1949'],
};
const phaseOf = (id: number) => PHASES.find(p => p.chapters.includes(id));
const intiOf = (id: number) => (ringkasFor(id)?.blocks.find(b => b.type === 'inti') as { items: { title: string }[] } | undefined)?.items ?? [];

/* kartu bab untuk carousel horizontal */
function chapterCard(id: number) {
  const ch = chapterById(id)!; const r = ringkasFor(id); const ph = phaseOf(id);
  return `<a class="chc t-${toneOf(id)}" href="#/bab/${id}">
    <span class="chc-img">${lazyImg(img(ch.hero))}<span class="chc-no">${pad(id)}</span></span>
    <span class="chc-body">
      <span class="chc-meta"><span>${esc(ph?.label ?? '')}</span><span>${esc(ch.subtitle)}</span></span>
      <span class="chc-title">${esc(ch.fullTitle)}</span>
      <span class="chc-text">${md(r?.tagline ?? ch.intro)}</span>
    </span>
    <span class="chc-foot"><span>${ch.sections.length} subbab &middot; ${questionsOf(id).length} soal</span><span class="go">${icon('arrow')}</span></span>
  </a>`;
}

/* baris bab untuk halaman daftar */
function chapterRow(id: number) {
  const ch = chapterById(id)!; const r = ringkasFor(id);
  return `<a class="row t-${toneOf(id)} reveal" href="#/bab/${id}">
    <span class="row-num">${pad(id)}</span>
    <span class="row-img">${lazyImg(img(ch.hero))}</span>
    <span class="row-body">
      <span class="row-period">${icon(iconOf(id))}${esc(ch.subtitle)}</span>
      <span class="row-title">${esc(ch.fullTitle)}</span>
      <span class="row-text">${md(r?.tagline ?? ch.intro)}</span>
      <span class="row-tags">${intiOf(id).map(i => `<span>${md(i.title)}</span>`).join('')}</span>
    </span>
    <span class="row-meta"><span>${ch.sections.length} subbab</span><span>${questionsOf(id).length} soal</span><span class="go">Buka ${icon('arrow')}</span></span>
  </a>`;
}
function chapterList() {
  return PHASES.map((ph, i) => `
    <div class="toc-phase t-${ph.tone} reveal"><span class="n">Babak ${i + 1}</span><b>${ph.label}</b><span class="line"></span><span class="r">${ph.range}</span></div>
    <div class="rows">${ph.chapters.map(chapterRow).join('')}</div>`).join('');
}

function home() {
  const big = TIMELINE.filter(e => e.big);
  onMount(async () => {
    const m = await loadMap(); const host = $('#mini-map'); if (!host) return;
    host.innerHTML = `<svg class="mini-map" viewBox="0 0 ${m.MAP_W} ${m.MAP_H}" aria-hidden="true">${m.ISLAND_PATHS.map(d => `<path d="${d}"/>`).join('')}${PINS.map(p => { const [x, y] = m.proj(p.lon, p.lat); return `<circle cx="${x}" cy="${y}" r="7"/>`; }).join('')}</svg>`;
    host.classList.add('ok');
  });
  return `<div class="view home">
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-txt">
        <span class="eyebrow reveal"><span class="dot"></span>Kelas XI &middot; Semester 1</span>
        <h1 class="reveal">Dari janji Jepang sampai Indonesia <em>berdaulat</em></h1>
        <div class="hero-cta reveal">
          <a class="btn btn-primary btn-lg" href="#/bab/1">${icon('play')} Mulai dari Bab 1</a>
          <a class="btn btn-ghost btn-lg" href="#/bab">${icon('list')} Lihat semua bab</a>
        </div>
        <ol class="steps reveal" aria-label="Urutan belajar setiap bab">
          <li><span class="n">1</span><span><b>Ringkas</b><small>Poin inti bab</small></span></li>
          <li><span class="n">2</span><span><b>Materi</b><small>Penjelasan lengkap</small></span></li>
          <li><span class="n">3</span><span><b>Latihan</b><small>Soal &amp; pembahasan</small></span></li>
        </ol>
      </div>
      <div class="hero-art reveal">
        <div class="frame">${lazyImg(img('arsip-hero'), 'Ilustrasi arsip perjuangan kemerdekaan: buku, radio, pena, dan bendera Merah Putih', '', true)}</div>
        <div class="stamp"><span class="flag" aria-hidden="true"><i></i><i></i></span><div><b>17 Agustus 1945</b><small>Proklamasi</small></div></div>
        <div class="stamp2"><span>${icon('award')}</span><div><b>27 Desember 1949</b><small>Pengakuan kedaulatan</small></div></div>
      </div>
    </div>
    <div class="wrap"><dl class="facts reveal">
      <div><dt>8</dt><dd>Bab materi</dd></div>
      <div><dt>${COURSE.counts.sections}</dt><dd>Subbab</dd></div>
      <div><dt>${COURSE.counts.questions}</dt><dd>Soal latihan</dd></div>
      <div><dt>${FLASHCARDS.length}</dt><dd>Kartu hafalan</dd></div>
      <div><dt>${PINS.length}</dt><dd>Lokasi di peta</dd></div>
    </dl></div>
  </section>

  <section class="wrap sec" id="gambaran">
    <div class="sec-head reveal"><div><span class="eyebrow"><span class="dot"></span>Alur besar</span><h2>Empat babak, 1944&ndash;1950</h2></div></div>
    <ol class="era">${PHASES.map((ph, i) => `
      <li class="era-col t-${ph.tone} reveal">
        <div class="era-top"><span class="era-n">${pad(i + 1)}</span></div>
        <span class="era-range">${ph.range}</span>
        <h3>${ph.label}</h3>
        <ul>${PHASE_POINTS[ph.id].map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        <div class="era-links">${ph.chapters.map(c => `<a href="#/bab/${c}">Bab ${c}</a>`).join('')}</div>
      </li>`).join('')}</ol>
  </section>

  <section class="sec sec-bleed" id="daftar-bab">
    <div class="wrap sec-head reveal"><div><span class="eyebrow"><span class="dot"></span>Daftar bab</span><h2>Delapan bab, berurutan</h2></div><a class="btn btn-ghost btn-sm" href="#/bab">Tampilan daftar ${icon('list')}</a></div>
    <div class="reveal">${hscroll(CHAPTERS.map(c => chapterCard(c.id)).join(''), { label: 'Daftar bab', cls: 'hs-bleed' })}</div>
  </section>

  <section class="sec sec-bleed">
    <div class="wrap sec-head reveal"><div><span class="eyebrow"><span class="dot"></span>Tanggal penting</span><h2>Yang paling sering keluar di ujian</h2></div><a class="btn btn-ghost btn-sm" href="#/timeline">Timeline lengkap ${icon('arrow')}</a></div>
    <div class="reveal">${hscroll(big.map(e => `<a class="strip-item t-${toneOf(e.chapter)}" href="#/bab/${e.chapter}"><span class="d">${esc(e.date)}</span><b>${esc(e.title)}</b><p>${esc(e.text)}</p><span class="tag">Bab ${e.chapter} ${icon('arrow')}</span></a>`).join(''), { label: 'Tanggal penting', cls: 'hs-bleed' })}</div>
  </section>

  <section class="wrap sec">
    <div class="sec-head reveal"><div><span class="eyebrow"><span class="dot"></span>Alat belajar</span><h2>Ulangi materi dengan cara lain</h2></div></div>
    <div class="tools">
      <a class="tool big t-blue reveal" href="#/peta"><span class="mini-wrap" id="mini-map"></span><div><span class="ti">${icon('map')}</span><h3>Peta perjuangan</h3><p>${PINS.length} lokasi peristiwa, dari Aceh sampai Biak.</p></div><span class="arrow">${icon('arrow')}</span></a>
      <a class="tool t-amber reveal" href="#/timeline"><div><span class="ti">${icon('clock')}</span><h3>Garis waktu</h3><p>${TIMELINE.length} peristiwa berurutan.</p></div><span class="arrow">${icon('arrow')}</span></a>
      <a class="tool t-violet reveal" href="#/kartu"><div><span class="ti">${icon('cards')}</span><h3>Kartu hafalan</h3><p>Tokoh, istilah, dan tanggal.</p></div><span class="arrow">${icon('arrow')}</span></a>
      <a class="tool t-red reveal" href="#/ujian"><div><span class="ti">${icon('target')}</span><h3>Ujian semester</h3><p>${questionsOf(10).length} soal dari semua bab.</p></div><span class="arrow">${icon('arrow')}</span></a>
      <a class="tool t-teal reveal" href="#/atlas"><div><span class="ti">${icon('table')}</span><h3>Tabel &amp; glosarium</h3><p>Rekap dan kamus istilah.</p></div><span class="arrow">${icon('arrow')}</span></a>
    </div>
  </section></div>`;
}

function babList() {
  return `<div class="view wrap"><header class="page-head reveal"><span class="eyebrow"><span class="dot"></span>Materi</span><h1>Semua bab</h1><p>Urut dari persiapan kemerdekaan sampai pengakuan kedaulatan.</p></header><div class="sec">${chapterList()}</div></div>`;
}

/* =============================================================
   CHAPTER
   ============================================================= */
type Tab = 'ringkas' | 'materi' | 'latihan';
function chapterBody(n: number, tab: Tab) {
  const r = ringkasFor(n);
  if (tab === 'ringkas' && r) return renderRingkas(r, n);
  if (tab === 'materi') return materi(n);
  return quizView('bab-' + n, `Latihan Bab ${n}`, questionsOf(n), toneOf(n));
}
function chapterTabs(n: number, tab: Tab) {
  const ch = chapterById(n)!;
  const t = (k: Tab, href: string, num: number, label: string, small: string) =>
    `<a href="${href}" data-tab="${k}" aria-current="${tab === k}"><span class="st">${num}</span><span>${label}</span><small>${small}</small></a>`;
  return `<nav class="tabs" id="ch-tabs" aria-label="Bagian bab">
    ${t('ringkas', `#/bab/${n}`, 1, 'Ringkas', 'poin inti')}
    ${t('materi', `#/bab/${n}/materi`, 2, 'Materi', `${ch.sections.length} subbab`)}
    ${t('latihan', `#/bab/${n}/latihan`, 3, 'Latihan', `${questionsOf(n).length} soal`)}
  </nav>`;
}
function chapter(n: number, tab: Tab) {
  const ch = chapterById(n); if (!ch || n > 8) return notFound();
  const r = ringkasFor(n); const tone = toneOf(n);
  const prev = n > 1 ? chapterById(n - 1) : undefined, next = n < 8 ? chapterById(n + 1) : undefined;
  onMount(() => { centerInTrack($('.ch-switch a[aria-current="page"]')); moveIndicator($('#ch-tabs'), 'a[aria-current="true"]', true); });
  return `<div class="view t-${tone}" data-ch="${n}">
  <div class="wrap">
    <div class="ch-switch">${hscroll(CHAPTERS.map(c => `<a class="t-${toneOf(c.id)}" href="#/bab/${c.id}${tab !== 'ringkas' ? '/' + tab : ''}" ${c.id === n ? 'aria-current="page"' : ''}><span class="k">${pad(c.id)}</span>${esc(c.title)}</a>`).join(''), { label: 'Pindah bab', controls: false })}</div>
    <section class="ch-hero">
      <div class="txt">
        <nav class="crumbs" aria-label="Lokasi"><a href="#/">Beranda</a>${icon('arrow')}<a href="#/bab">Materi</a>${icon('arrow')}<span>Bab ${n}</span></nav>
        <div class="bignum"><span class="tagno">Bab ${n}</span><span>${esc(ch.subtitle)}</span><span class="sep"></span><span>${esc(r?.phase ?? '')}</span></div>
        <h1>${esc(ch.fullTitle)}</h1>
        <p class="tagline">${md(r?.tagline ?? ch.intro)}</p>
        <div class="q"><span class="qi">${icon('quiz')}</span><div><small>Pertanyaan kunci</small><p>${esc(r?.pertanyaan ?? ch.intro)}</p></div></div>
      </div>
      <div class="art">${lazyImg(img(ch.hero), '', '', true)}</div>
    </section>
    ${chapterTabs(n, tab)}
    <div id="ch-body">${chapterBody(n, tab)}</div>
    <nav class="next-ch" aria-label="Bab lain">
      ${prev ? `<a href="#/bab/${prev.id}"><small>${icon('back')} Bab ${prev.id}</small><b>${esc(prev.fullTitle)}</b></a>` : `<a href="#/"><small>${icon('back')} Kembali</small><b>Beranda</b></a>`}
      ${next ? `<a class="n" href="#/bab/${next.id}"><small>Bab ${next.id} ${icon('arrow')}</small><b>${esc(next.fullTitle)}</b></a>` : `<a class="n" href="#/ujian"><small>Selanjutnya ${icon('arrow')}</small><b>Ujian akhir semester</b></a>`}
    </nav>
  </div></div>`;
}

function materi(n: number) {
  const ch = chapterById(n)!;
  return `<div class="lk">
    <aside class="lk-side cs-host">
      <details class="lk-toc" ${innerWidth > 980 ? 'open' : ''}>
        <summary><span>${icon('list')} Daftar subbab</span><small>${ch.sections.length} bagian</small>${icon('down', 'ico chev')}</summary>
        <nav>${ch.sections.map(s => `<a href="#/bab/${n}/materi/${s.id}" data-sec="${s.id}"><span class="no">${esc(s.number)}</span><span>${esc(s.title)}</span></a>`).join('')}</nav>
      </details>
    </aside>
    <div class="lk-sections">${ch.sections.map((s, i) => `
      <article class="sec-card reveal" id="s-${s.id}">
        <header class="sec-h"><span class="no">${esc(s.number)}</span><h2>${esc(s.title)}</h2>${s.extra ? '<span class="extra">Pendalaman</span>' : ''}</header>
        <div class="sec-b prose">${s.lead}${s.details.map(d => `<details><summary>${esc(d.title)}</summary><div class="detail-content">${d.html}</div></details>`).join('')}</div>
        ${i < ch.sections.length - 1 ? `<footer class="sec-f"><a href="#/bab/${n}/materi/${ch.sections[i + 1].id}">Berikutnya: ${esc(ch.sections[i + 1].title)} ${icon('arrow')}</a></footer>` : ''}
      </article>`).join('')}
      <div class="rk-end reveal"><div><span class="eyebrow light">Akhir materi</span><b>Lanjut ke latihan</b><p>${questionsOf(n).length} soal Bab ${n} dengan pembahasan.</p></div><div class="btns"><a class="btn btn-primary" href="#/bab/${n}/latihan">${icon('target')} Mulai latihan</a></div></div>
    </div></div>`;
}

/* =============================================================
   TIMELINE (virtual list pada scroll halaman)
   ============================================================= */
let tlFilter = 'all';
type TLRow = { t: 'y'; year: number } | { t: 'e'; e: TimelineEvent; side: 'l' | 'r' };
function tlRows(): TLRow[] {
  const rows: TLRow[] = []; let year = 0; let k = 0;
  TIMELINE.filter(e => tlFilter === 'all' || e.phase === tlFilter).forEach(e => {
    if (e.year !== year) { year = e.year; rows.push({ t: 'y', year }); }
    rows.push({ t: 'e', e, side: k++ % 2 ? 'r' : 'l' });
  });
  return rows;
}
const tlRow = (r: TLRow) => r.t === 'y'
  ? `<div class="year-mark"><span>${r.year}</span></div>`
  : `<a class="tl-ev ${r.side} t-${toneOf(r.e.chapter)}${r.e.big ? ' big' : ''}" href="#/bab/${r.e.chapter}"><div class="card"><span class="d">${esc(r.e.date)}</span><b>${esc(r.e.title)}</b><p>${esc(r.e.text)}</p><span class="go">Bab ${r.e.chapter} ${icon('arrow')}</span></div></a>`;
let tlList: VList<TLRow> | null = null;
function timeline() {
  onMount(() => {
    const host = $('#tl-list'); if (!host) return;
    tlList = new VList<TLRow>({ host, scroller: window, items: tlRows(), render: tlRow, estimate: r => (r.t === 'y' ? 76 : innerWidth < 760 ? 168 : 150), overscan: 700 });
    onDispose(() => { tlList?.destroy(); tlList = null; });
  });
  return `<div class="view wrap">
    <header class="page-head reveal"><span class="eyebrow"><span class="dot"></span>Garis waktu</span><h1>Peristiwa <span style="white-space:nowrap">1944&ndash;1950</span></h1><p>Kartu bergaris warna adalah peristiwa kunci. Klik kartu untuk membuka babnya.</p></header>
    <div class="filters reveal">${hscroll(`<button data-act="tl" data-v="all" aria-pressed="${tlFilter === 'all'}">Semua <small>${TIMELINE.length}</small></button>
      ${PHASES.map(p => `<button class="t-${p.tone}" data-act="tl" data-v="${p.id}" aria-pressed="${tlFilter === p.id}"><i></i>${p.label} <small>${TIMELINE.filter(e => e.phase === p.id).length}</small></button>`).join('')}`, { label: 'Filter babak', controls: false })}</div>
    <div class="big-tl" id="tl-list"></div></div>`;
}

/* =============================================================
   MAP (modul peta dimuat saat dibutuhkan)
   ============================================================= */
let pinSel = 'jakarta';
const MINOR = new Set(['rengasdengklok', 'bandung', 'linggarjati', 'ambarawa']);
const pinOff = new Set<string>();
async function mapSVG() {
  const { ISLAND_PATHS, NEIGHBOR_PATH, MAP_W, MAP_H, proj } = await loadMap();
  const grid = [] as string[];
  for (let lon = 95; lon <= 141; lon += 5) { const [x] = proj(lon, 0); grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${MAP_H}"/>`); }
  for (let lat = 5; lat >= -10; lat -= 5) { const [, y] = proj(0, lat); grid.push(`<line x1="0" y1="${y}" x2="${MAP_W}" y2="${y}"/>`); }
  const lbl = (t: string, lo: number, la: number) => { const [x, y] = proj(lo, la); return `<text class="lbl" x="${x}" y="${y}">${t}</text>`; };
  const pins = PINS.map(p => {
    const [x, y] = proj(p.lon, p.lat); const c = PIN_KIND[p.kind].color;
    const lx = x + (p.dx ?? 0), ly = y + (p.dy ?? 0) - 13;
    return `<g class="pin-g${MINOR.has(p.id) ? ' minor' : ''}${p.id === pinSel ? ' on' : ''}${pinOff.has(p.kind) ? ' off' : ''}" data-act="pin" data-id="${p.id}" data-kind="${p.kind}" style="--pc:${c}" tabindex="0" role="button" aria-label="${esc(p.name)}: ${esc(p.title)}">
      <circle class="halo" cx="${x}" cy="${y}" r="10"/><circle class="dot" cx="${x}" cy="${y}" r="6.5"/><text x="${lx}" y="${ly}" text-anchor="middle">${esc(p.name)}</text></g>`;
  }).join('');
  return `<svg viewBox="0 0 ${MAP_W} ${MAP_H}" role="img" aria-label="Peta Indonesia dengan lokasi peristiwa perjuangan">
    <g class="grid">${grid.join('')}</g>
    ${lbl('Samudra Hindia', 97, -8)}${lbl('Laut Natuna', 108.6, 4)}${lbl('Laut Jawa', 111, -5)}${lbl('Samudra Pasifik', 130, 4)}${lbl('Laut Banda', 124.5, -6.6)}
    <path class="nb" d="${NEIGHBOR_PATH}"/>
    ${ISLAND_PATHS.map(d => `<path class="land" d="${d}"/>`).join('')}
    ${pins}</svg>`;
}
function pinDetail(p: MapPin) {
  const k = PIN_KIND[p.kind];
  return `<div class="pin-detail" style="--pc:${k.color}"><span class="k"><i></i>${k.label}</span><h3>${esc(p.title)}</h3><span class="d">${icon('pin')} ${esc(p.name)} &middot; ${esc(p.date)}</span><p>${esc(p.text)}</p><a class="btn btn-dark btn-sm" href="#/bab/${p.chapter}">Buka Bab ${p.chapter} ${icon('arrow')}</a></div>`;
}
const pinRow = (p: MapPin) => `<button data-act="pin" data-id="${p.id}" class="${p.id === pinSel ? 'on' : ''}${pinOff.has(p.kind) ? ' off' : ''}" style="--pc:${PIN_KIND[p.kind].color}"><i></i><span><b>${esc(p.name)}</b> ${esc(p.title)}</span><small>${esc((p.date.match(/\d{4}/g) ?? ['']).pop()!)}</small></button>`;
let pinList: VList<MapPin> | null = null;
function peta() {
  const sel = PINS.find(p => p.id === pinSel) ?? PINS[0];
  onMount(async () => {
    const box = $('#map-box'); if (!box) return;
    box.innerHTML = await mapSVG(); box.classList.add('ok');
    attachScrollbar(box, 'x');
    if (box.scrollWidth > box.clientWidth) box.scrollLeft = (box.scrollWidth - box.clientWidth) * 0.3;
    const lv = $('#pin-list')!;
    pinList = new VList<MapPin>({ host: lv, scroller: lv, items: PINS, render: pinRow, estimate: () => 44, overscan: 200 });
    attachScrollbar(lv, 'y');
    onDispose(() => { pinList?.destroy(); pinList = null; });
  });
  return `<div class="view wrap">
    <header class="page-head reveal"><span class="eyebrow"><span class="dot"></span>Peta interaktif</span><h1>Perjuangan di seluruh Nusantara</h1><p>Pilih titik di peta atau di daftar untuk membaca peristiwanya.</p></header>
    <div class="map-layout">
      <div>
        <div class="map-box cs-host"><div class="map-view" id="map-box"><div class="map-skel" aria-hidden="true"></div></div></div>
        <p class="map-hint">${icon('arrow')} Geser peta ke samping</p>
        <div class="legend">${hscroll(Object.entries(PIN_KIND).map(([k, v]) => `<button data-act="pinkind" data-k="${k}" class="${pinOff.has(k) ? 'off' : ''}" style="--pc:${v.color}" aria-pressed="${!pinOff.has(k)}"><i></i>${v.label}</button>`).join(''), { label: 'Filter jenis peristiwa', controls: false })}</div>
      </div>
      <aside class="pin-panel"><div id="pin-detail">${pinDetail(sel)}</div>
        <div class="pin-list cs-host"><div class="pin-view" id="pin-list"></div></div>
      </aside>
    </div></div>`;
}

/* =============================================================
   FLASHCARDS (per sesi, tanpa penyimpanan)
   ============================================================= */
const DECK: Record<Flashcard['deck'], { label: string; i: string }> = { tokoh: { label: 'Tokoh', i: 'user' }, istilah: { label: 'Istilah', i: 'type' }, tanggal: { label: 'Tanggal', i: 'calendar' } };
const FC = { deck: 'all' as 'all' | Flashcard['deck'], ch: 0, queue: [] as Flashcard[], i: 0, flip: false, known: new Set<string>(), unknown: [] as Flashcard[] };
const cardKey = (c: Flashcard) => c.deck + ':' + c.front;
function deckCards() { return FLASHCARDS.filter(c => (FC.deck === 'all' || c.deck === FC.deck) && (!FC.ch || c.chapter === FC.ch)); }
function buildDeck(doShuffle = false, only?: Flashcard[]) {
  let list = only ?? deckCards();
  if (doShuffle) list = shuffle(list);
  FC.queue = list; FC.i = 0; FC.flip = false; FC.unknown = [];
  if (!only) FC.known.clear();
}
function fcStage(dir = 0) {
  const total = FC.queue.length;
  const c = FC.queue[FC.i];
  if (!c) return `<div class="fc-done"><span class="qz-badge">${icon('trophy')}</span><h2>Satu putaran selesai</h2><p>${FC.known.size} kartu sudah hafal, ${FC.unknown.length} kartu perlu diulang.</p><div class="row-c">${FC.unknown.length ? `<button class="btn btn-primary" data-act="fc-retry">${icon('repeat')} Ulangi ${FC.unknown.length} kartu</button>` : ''}<button class="btn btn-ghost" data-act="fc-again">${icon('shuffle')} Mulai lagi</button></div></div>`;
  return `
    <div class="fc-stage"><div class="fc t-${toneOf(c.chapter)}${FC.flip ? ' flip' : ''}${dir ? ' enter' + (dir > 0 ? ' from-r' : ' from-l') : ''}" id="fc" data-act="fc-flip" role="button" tabindex="0" aria-label="Kartu: ${esc(c.front)}. Klik untuk membalik.">
      <div class="fc-face fc-front"><span class="deck">${icon(DECK[c.deck].i)}${DECK[c.deck].label}</span><span class="ch">Bab ${c.chapter}</span><h2>${esc(c.front)}</h2><span class="hint">${icon('flip')} Ketuk untuk membalik</span></div>
      <div class="fc-face fc-back"><span class="deck">${icon(DECK[c.deck].i)}${DECK[c.deck].label}</span><span class="ch">Bab ${c.chapter}</span><span class="front-mini">${esc(c.front)}</span><p>${md(c.back)}</p><span class="hint">Sudah hafal?</span></div>
    </div></div>
    <div class="fc-actions"><button class="btn btn-no" data-act="fc-no">${icon('x')} Belum hafal</button><button class="btn btn-ghost icon-only" data-act="fc-flip" aria-label="Balik kartu">${icon('flip')}</button><button class="btn btn-yes" data-act="fc-yes">${icon('check')} Sudah hafal</button></div>
    <div class="fc-meta"><span>Kartu ${FC.i + 1} dari ${total}</span><div class="bar"><i style="width:${(FC.i / total) * 100}%"></i></div><span class="kbd-hint">Spasi untuk membalik &middot; panah kiri: belum &middot; panah kanan: sudah</span></div>`;
}
function kartu() {
  return `<div class="view wrap">
    <header class="page-head reveal"><span class="eyebrow"><span class="dot"></span>Kartu hafalan</span><h1>Kartu hafalan</h1><p>Tebak isi kartu dalam hati, lalu balik untuk mengecek jawabannya.</p></header>
    <div class="fc-bar">
      <div class="seg">${hscroll(`<button data-act="fc-deck" data-v="all" aria-pressed="${FC.deck === 'all'}">Semua</button>${(Object.keys(DECK) as Flashcard['deck'][]).map(d => `<button data-act="fc-deck" data-v="${d}" aria-pressed="${FC.deck === d}">${icon(DECK[d].i)}${DECK[d].label}</button>`).join('')}`, { label: 'Pilih dek', controls: false })}</div>
      <div class="fc-tools">
        <label class="select">${icon('book')}<select id="fc-ch" aria-label="Filter bab"><option value="0">Semua bab</option>${CHAPTERS.map(c => `<option value="${c.id}" ${FC.ch === c.id ? 'selected' : ''}>Bab ${c.id} &middot; ${esc(c.title)}</option>`).join('')}</select></label>
        <button class="btn btn-ghost btn-sm" data-act="fc-again">${icon('shuffle')} Acak</button>
      </div>
    </div>
    <div id="fc-area">${fcStage()}</div></div>`;
}
function drawFc(dir = 0) { const a = $('#fc-area'); if (a) a.innerHTML = fcStage(dir); }
function fcMark(known: boolean) {
  const c = FC.queue[FC.i]; if (!c) return;
  if (known) FC.known.add(cardKey(c)); else FC.unknown.push(c);
  FC.i++; FC.flip = false; drawFc(known ? 1 : -1);
}
function fcFlip() { FC.flip = !FC.flip; $('#fc')?.classList.remove('enter'); $('#fc')?.classList.toggle('flip', FC.flip); }

/* =============================================================
   ATLAS (tabel bab 9 + glosarium virtual)
   ============================================================= */
type Gl = Flashcard;
let glList: VList<Gl> | null = null;
const GL = () => FLASHCARDS.filter(c => c.deck === 'istilah');
const glRow = (g: Gl) => `<div class="gl"><b>${esc(g.front)}</b><p>${esc(g.back)}</p><a href="#/bab/${g.chapter}">Bab ${g.chapter} ${icon('arrow')}</a></div>`;
function atlas() {
  const ch9 = chapterById(9);
  const gl = GL();
  onMount(() => {
    const v = $('#gl-view'); if (!v) return;
    glList = new VList<Gl>({ host: v, scroller: v, items: gl, render: glRow, estimate: () => (innerWidth < 640 ? 96 : 64), gap: 8, overscan: 300 });
    attachScrollbar(v, 'y');
    onDispose(() => { glList?.destroy(); glList = null; });
  });
  return `<div class="view wrap t-teal">
    <header class="page-head reveal"><span class="eyebrow"><span class="dot"></span>Rekap</span><h1>Tabel dan glosarium</h1><p>Tabel ringkasan seluruh materi dan kamus istilah dalam satu halaman.</p></header>
    <div class="lk-sections solo">${(ch9?.sections ?? []).map(s => `<article class="sec-card reveal" id="s-${s.id}"><header class="sec-h"><span class="no">${icon('table')}</span><h2>${esc(s.title)}</h2></header><div class="sec-b prose">${s.lead}</div></article>`).join('')}</div>
    <div class="sec-head reveal" style="margin-top:56px"><div><span class="eyebrow"><span class="dot"></span>Glosarium</span><h2>${gl.length} istilah penting</h2></div><label class="searchbox">${icon('search')}<input id="gl-q" placeholder="Saring istilah" aria-label="Saring istilah"></label></div>
    <div class="glossary cs-host reveal"><div class="gl-view" id="gl-view"></div><p class="gl-empty" id="gl-empty" hidden>Istilah tidak ditemukan.</p></div></div>`;
}

/* =============================================================
   UJIAN
   ============================================================= */
function ujian() {
  const ch = chapterById(10)!;
  return `<div class="view wrap t-red">
    <header class="page-head reveal"><span class="eyebrow"><span class="dot"></span>Evaluasi</span><h1>${esc(ch.fullTitle)}</h1><p>Soal campuran dari seluruh bab: pilihan ganda, benar atau salah, dan uraian.</p></header>
    ${quizView('ujian', 'Ujian Akhir Semester', questionsOf(10), 'red')}
    <div class="sec-head reveal" style="margin-top:64px"><div><span class="eyebrow"><span class="dot"></span>Latihan per bab</span><h2>Pemanasan per bab</h2></div></div>
    <div class="practice">${CHAPTERS.map(c => `<a class="pr t-${toneOf(c.id)} reveal" href="#/bab/${c.id}/latihan"><span class="pi">${icon(iconOf(c.id))}</span><span class="pb"><small>Bab ${c.id} &middot; ${questionsOf(c.id).length} soal</small><b>${esc(c.title)}</b></span>${icon('arrow')}</a>`).join('')}</div>
  </div>`;
}

function notFound() {
  return `<div class="view wrap"><header class="page-head"><h1>Halaman tidak ditemukan</h1><p><a href="#/">Kembali ke beranda</a></p></header></div>`;
}

/* =============================================================
   SEARCH PALETTE (hasil dirender dengan virtual list)
   ============================================================= */
type Hit = { href: string; title: string; sub: string; icon: string; tone: string; group: string; q: string };
type PRow = { g: string } | { h: Hit; k: number };
let INDEX: Hit[] = [];
function buildIndex() {
  const h: Hit[] = [];
  const pages: [string, string, string][] = [['#/timeline', 'Garis waktu', 'clock'], ['#/peta', 'Peta perjuangan', 'map'], ['#/kartu', 'Kartu hafalan', 'cards'], ['#/ujian', 'Ujian semester', 'target'], ['#/atlas', 'Tabel & glosarium', 'table']];
  pages.forEach(([href, t, i]) => h.push({ href, title: t, sub: 'Halaman', icon: i, tone: 'ink', group: 'Halaman', q: norm(t) }));
  CHAPTERS.forEach(c => {
    const r = ringkasFor(c.id);
    h.push({ href: `#/bab/${c.id}`, title: `Bab ${c.id}: ${c.fullTitle}`, sub: plain(r?.tagline ?? c.intro), icon: iconOf(c.id), tone: toneOf(c.id), group: 'Bab', q: norm(c.fullTitle + ' ' + c.title + ' ' + (r?.tagline ?? '')) });
    c.sections.forEach(s => h.push({ href: `#/bab/${c.id}/materi/${s.id}`, title: s.title, sub: `Bab ${c.id} · ${s.number} · ${plain(s.lead).slice(0, 120)}`, icon: 'book', tone: toneOf(c.id), group: 'Materi', q: norm(s.title + ' ' + s.search + ' ' + plain(s.lead)) }));
  });
  TIMELINE.forEach(e => h.push({ href: `#/bab/${e.chapter}`, title: `${e.date}: ${e.title}`, sub: e.text, icon: 'calendar', tone: toneOf(e.chapter), group: 'Peristiwa', q: norm(e.date + ' ' + e.title + ' ' + e.text) }));
  FLASHCARDS.forEach(f => h.push({ href: `#/bab/${f.chapter}`, title: f.front, sub: plain(f.back), icon: DECK[f.deck].i, tone: toneOf(f.chapter), group: DECK[f.deck].label, q: norm(f.front + ' ' + f.back) }));
  INDEX = h;
}
function hl(text: string, terms: string[]) {
  let s = esc(text);
  terms.forEach(t => { if (t.length > 1) s = s.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>'); });
  return s;
}
function openSearch() {
  if (!INDEX.length) buildIndex();
  if ($('.pal-back')) return;
  const back = document.createElement('div'); back.className = 'pal-back';
  back.innerHTML = `<div class="pal" role="dialog" aria-modal="true" aria-label="Cari materi"><div class="pal-in">${icon('search')}<input id="pal-q" placeholder="Cari tokoh, peristiwa, istilah, tanggal" autocomplete="off"><kbd>Esc</kbd></div><div class="pal-res cs-host"><div class="pal-view" id="pal-res"></div></div><div class="pal-foot"><span id="pal-count"></span><span><kbd>Enter</kbd> buka</span></div></div>`;
  document.body.append(back);
  requestAnimationFrame(() => back.classList.add('in'));
  const input = $<HTMLInputElement>('#pal-q')!; const res = $('#pal-res')!;
  let rows: PRow[] = []; let hitIdx: number[] = []; let sel = 0; let terms: string[] = [];
  const renderRow = (r: PRow, i: number) => 'g' in r
    ? `<div class="pal-group">${r.g}</div>`
    : `<a href="${r.h.href}" class="t-${r.h.tone}${hitIdx[sel] === i ? ' sel' : ''}"><span class="pi">${icon(r.h.icon)}</span><span><b>${hl(r.h.title, terms)}</b><small>${hl(r.h.sub, terms)}</small></span></a>`;
  const list = new VList<PRow>({ host: res, scroller: res, items: [], render: renderRow, estimate: r => ('g' in r ? 30 : 58), overscan: 240 });
  attachScrollbar(res, 'y');
  const mark = () => { res.querySelectorAll('a.sel').forEach(a => a.classList.remove('sel')); list.el(hitIdx[sel])?.classList.add('sel'); };
  const run = () => {
    const raw = input.value.trim(); terms = norm(raw).split(/\s+/).filter(Boolean);
    let hits: Hit[];
    if (!terms.length) hits = INDEX.filter(x => x.group === 'Bab' || x.group === 'Halaman');
    else hits = INDEX.map(x => { let sc = 0; for (const t of terms) { if (!x.q.includes(t)) return null; sc += norm(x.title).includes(t) ? 3 : 1; } return { x, sc }; }).filter(Boolean).sort((a, b) => b!.sc - a!.sc).map(o => o!.x);
    const groups = new Map<string, Hit[]>(); hits.forEach(x => { if (!groups.has(x.group)) groups.set(x.group, []); groups.get(x.group)!.push(x); });
    rows = []; hitIdx = []; let k = 0;
    groups.forEach((arr, g) => { rows.push({ g }); arr.forEach(h => { hitIdx.push(rows.length); rows.push({ h, k: k++ }); }); });
    sel = 0; res.scrollTop = 0;
    $('#pal-count')!.textContent = terms.length ? `${hits.length} hasil` : 'Ketik untuk mencari';
    if (!hits.length) { list.setItems([]); res.innerHTML = `<div class="pal-empty">Tidak ada hasil untuk &ldquo;${esc(raw)}&rdquo;. Coba <b>Linggarjati</b> atau <b>BPUPKI</b>.</div>`; return; }
    if (!res.contains(list.spacer)) { res.innerHTML = ''; res.append(list.spacer); }
    list.setItems(rows); updateBars();
  };
  const close = () => { list.destroy(); back.classList.remove('in'); back.classList.add('out'); setTimeout(() => back.remove(), reduced() ? 0 : 220); gcBars(); };
  input.addEventListener('input', run);
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!hitIdx.length) return; sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + hitIdx.length) % hitIdx.length; list.reveal(hitIdx[sel]); mark(); }
    if (e.key === 'Enter') { e.preventDefault(); const r = rows[hitIdx[sel]]; if (r && 'h' in r) { location.hash = r.h.href; close(); } }
    if (e.key === 'Escape') close();
  });
  back.addEventListener('click', e => { if (e.target === back || (e.target as HTMLElement).closest('a')) close(); });
  run(); input.focus();
}

/* =============================================================
   ROUTER
   ============================================================= */
let io: IntersectionObserver | null = null;
let spy: IntersectionObserver | null = null;
let lastPath = '';
let lastCh = 0;

function parse() {
  const h = location.hash || '#/';
  return h.replace(/^#\/?/, '').split('/').filter(Boolean);
}

function pageHTML(parts: string[]) {
  if (!parts.length) return home();
  if (parts[0] === 'bab' && !parts[1]) return babList();
  if (parts[0] === 'bab') {
    const tab = (parts[2] as Tab) || 'ringkas';
    return chapter(Number(parts[1]), ['ringkas', 'materi', 'latihan'].includes(tab) ? tab : 'ringkas');
  }
  if (parts[0] === 'timeline') return timeline();
  if (parts[0] === 'peta') return peta();
  if (parts[0] === 'kartu') { if (!FC.queue.length && FC.i === 0) buildDeck(); return kartu(); }
  if (parts[0] === 'atlas') return atlas();
  if (parts[0] === 'ujian') return ujian();
  return notFound();
}

function afterRender(root: ParentNode, animateReveal: boolean) {
  initHScroll(root); initLazy(root);
  $$<HTMLElement>('.prose .table-scroll, .tbl-wrap', root as HTMLElement).forEach(t => attachScrollbar(t, 'x'));
  const toc = $<HTMLElement>('.lk-toc'); if (toc) attachScrollbar(toc, 'y');
  observe(animateReveal);
  const run = mounts; mounts = []; run.forEach(f => f());
}

function render() {
  const parts = parse();
  const path = parts.slice(0, 3).join('/');
  const changed = path !== lastPath;
  const ch = parts[0] === 'bab' && parts[1] ? Number(parts[1]) : 0;
  const tab = ((parts[2] as Tab) || 'ringkas');
  const target = parts[0] === 'bab' && parts[3] ? 's-' + parts[3] : '';

  // pindah tab di bab yang sama: ganti isi saja, tanpa memuat ulang halaman
  if (changed && ch && ch === lastCh && $('#ch-body') && ['ringkas', 'materi', 'latihan'].includes(tab)) {
    resetQuiz(); lastPath = path;
    disposers.forEach(f => f()); disposers = [];
    $$<HTMLAnchorElement>('#ch-tabs a').forEach(a => a.setAttribute('aria-current', String(a.dataset.tab === tab)));
    $$<HTMLAnchorElement>('.ch-switch a').forEach(a => { const id = a.getAttribute('href')!.split('/')[2]; a.setAttribute('href', `#/bab/${id}${tab !== 'ringkas' ? '/' + tab : ''}`); });
    moveIndicator($('#ch-tabs'), 'a[aria-current="true"]');
    const body = $('#ch-body')!;
    body.innerHTML = chapterBody(ch, tab);
    body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap');
    gcBars(); afterRender(body, false);
    const tabs = $('#ch-tabs')!;
    if (target) requestAnimationFrame(() => { const el = document.getElementById(target); if (el) scrollToEl(el); });
    else if (tabs.getBoundingClientRect().top < 0 || scrollY > tabs.offsetTop) smoothScrollTo(tabs.offsetTop - 80, 600);
    return;
  }
  if (!changed && target) { const el = document.getElementById(target); if (el) { scrollToEl(el); return; } }

  const swap = () => {
    if (changed) resetQuiz();
    lastPath = path; lastCh = ch;
    disposers.forEach(f => f()); disposers = []; mounts = [];
    app.innerHTML = pageHTML(parts);
    gcBars();
    drawNav();
    if (target) requestAnimationFrame(() => { const el = document.getElementById(target); if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 90, behavior: 'auto' }); });
    else if (changed) scrollTo({ top: 0, behavior: 'auto' });
    afterRender(app, changed);
    updateBars();
  };
  const vt = (document as any).startViewTransition;
  if (changed && vt && !reduced() && lastPath !== '') { const t = vt.call(document, swap); t.ready?.catch(() => {}); t.finished?.catch(() => {}); }
  else swap();

  const title = parts[0] === 'bab' && parts[1] ? `Bab ${parts[1]}: ${chapterById(Number(parts[1]))?.title ?? ''}` : ({ timeline: 'Garis waktu', peta: 'Peta', kartu: 'Kartu hafalan', atlas: 'Tabel & glosarium', ujian: 'Ujian', bab: 'Materi' } as Record<string, string>)[parts[0]] ?? '';
  document.title = (title ? title + ' · ' : '') + 'Sejarah Indonesia XI';
}

function observe(animate: boolean) {
  io?.disconnect(); spy?.disconnect();
  const els = $$('.reveal:not(.in)');
  if (!animate || reduced()) { els.forEach(e => e.classList.add('in')); }
  else {
    io = new IntersectionObserver(es => {
      let k = 0;
      es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        .forEach(e => { (e.target as HTMLElement).style.setProperty('--d', String(Math.min(k++, 6))); e.target.classList.add('in'); io!.unobserve(e.target); });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.01 });
    els.forEach(el => io!.observe(el));
  }
  const toc = $$<HTMLAnchorElement>('.lk-toc a');
  if (toc.length) {
    spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { const id = e.target.id.slice(2); toc.forEach(a => a.classList.toggle('active', a.dataset.sec === id)); }
    }), { rootMargin: '-30% 0px -60% 0px' });
    $$('.sec-card').forEach(s => spy!.observe(s));
  }
}

/* =============================================================
   EVENTS
   ============================================================= */
function selectPin(id: string, fromMap: boolean) {
  pinSel = id; const p = PINS.find(x => x.id === pinSel)!;
  $$('.pin-g').forEach(g => g.classList.toggle('on', g.dataset.id === pinSel));
  $$('#pin-list button').forEach(b => b.classList.toggle('on', b.dataset.id === pinSel));
  const d = $('#pin-detail')!; d.innerHTML = pinDetail(p);
  if (innerWidth <= 980 && fromMap) scrollToEl(d);
}
document.addEventListener('click', e => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
  if (!el) return;
  const act = el.dataset.act!;
  if (quizClick(act, el)) return;
  switch (act) {
    case 'scroll': { const t = document.getElementById(el.dataset.to!); if (t) scrollToEl(t); break; }
    case 'tl': {
      tlFilter = el.dataset.v!;
      $$('[data-act="tl"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === tlFilter)));
      const host = $('#tl-list'); if (host) { host.classList.remove('swap'); void host.offsetWidth; host.classList.add('swap'); }
      tlList?.setItems(tlRows());
      if (host && host.getBoundingClientRect().top < 0) smoothScrollTo(host.offsetTop - 160, 500);
      break;
    }
    case 'pin': selectPin(el.dataset.id!, !!el.closest('svg')); break;
    case 'pinkind': {
      const k = el.dataset.k!; pinOff.has(k) ? pinOff.delete(k) : pinOff.add(k);
      el.classList.toggle('off', pinOff.has(k)); el.setAttribute('aria-pressed', String(!pinOff.has(k)));
      $$('.pin-g').forEach(g => g.classList.toggle('off', pinOff.has(g.dataset.kind!)));
      pinList?.setItems(PINS.filter(p => !pinOff.has(p.kind)));
      break;
    }
    case 'fc-flip': fcFlip(); break;
    case 'fc-yes': fcMark(true); break;
    case 'fc-no': fcMark(false); break;
    case 'fc-deck': FC.deck = el.dataset.v as typeof FC.deck; $$('[data-act="fc-deck"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === FC.deck))); buildDeck(); drawFc(1); break;
    case 'fc-again': buildDeck(true); drawFc(1); break;
    case 'fc-retry': buildDeck(true, FC.unknown.slice()); drawFc(1); break;
  }
});
document.addEventListener('change', e => {
  const t = e.target as HTMLSelectElement;
  if (t.id === 'fc-ch') { FC.ch = Number(t.value); buildDeck(); drawFc(1); }
});
document.addEventListener('input', e => {
  const t = e.target as HTMLInputElement;
  if (t.id === 'gl-q' && glList) {
    const q = norm(t.value);
    const items = GL().filter(g => norm(g.front + ' ' + g.back).includes(q));
    glList.setItems(items); $('#gl-empty')!.hidden = items.length > 0; updateBars();
  }
});
document.addEventListener('keydown', e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName);
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); return; }
  if (typing) return;
  if (e.key === '/') { e.preventDefault(); openSearch(); return; }
  if (location.hash.startsWith('#/kartu') && FC.queue[FC.i]) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); fcFlip(); }
    if (e.key === 'ArrowRight') fcMark(true);
    if (e.key === 'ArrowLeft') fcMark(false);
  }
  if ((e.key === 'Enter' || e.key === ' ') && (e.target as HTMLElement).classList?.contains('pin-g')) { e.preventDefault(); (e.target as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true })); }
});
window.addEventListener('quiz-start', (e: Event) => {
  const key = (e as CustomEvent).detail as string;
  if (key === 'ujian') startQuiz(key, 'Ujian Akhir Semester', questionsOf(10));
  else { const n = Number(key.split('-')[1]); startQuiz(key, `Latihan Bab ${n}`, questionsOf(n)); }
  const q = $('#quiz'); if (q) scrollToEl(q);
});
$('#open-search')!.addEventListener('click', openSearch);
$('#theme')!.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => { document.documentElement.dataset.theme = next; prefs.theme = next; savePrefs(); drawTheme(); };
  const vt = (document as any).startViewTransition;
  if (vt && !reduced()) { document.documentElement.classList.add('theme-vt'); const t = vt.call(document, apply); t.ready?.catch(() => {}); t.finished.catch(() => {}).finally(() => document.documentElement.classList.remove('theme-vt')); } else apply();
});
let navScrolled = false;
addEventListener('scroll', () => {
  const s = scrollY > 8;
  if (s !== navScrolled) { navScrolled = s; $('.nav')?.classList.toggle('scrolled', s); }
}, { passive: true });
addEventListener('resize', () => { moveIndicator($('#nav-links'), 'a[aria-current]', true); moveIndicator($('#tabbar'), 'a[aria-current]', true); moveIndicator($('#ch-tabs'), 'a[aria-current="true"]', true); });
addEventListener('hashchange', () => render());
document.fonts?.ready.then(() => { moveIndicator($('#nav-links'), 'a[aria-current]', true); moveIndicator($('#ch-tabs'), 'a[aria-current="true"]', true); updateBars(); });

hydrateIcons();
drawTheme();
initPageScrollbar();
render();
