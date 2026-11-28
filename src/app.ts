import { COURSE } from './data/course';
import { ringkasFor } from './data/ringkas';
import { TIMELINE, FLASHCARDS, PINS, PIN_KIND, PHASES, partTone, partLabel } from './data/atlas';
import { questionsBySet } from './data/soal';
import { renderRingkas } from './blocks';
import { materiView, mountReader, readerClick } from './reader';
import { quizView, startQuiz, quizClick, resetQuiz } from './quiz';
import type { Flashcard, MapPin, Part, Question, TimelineEvent } from './types';
import {
  $, $$, esc, md, icon, hydrateIcons, chapterById, toneOf, img, pad,
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
  { href: '#/bab/3', label: 'Materi', i: 'book', match: /^#\/bab/ },
  { href: '#/timeline', label: 'Timeline', i: 'clock', match: /^#\/timeline/ },
  { href: '#/peta', label: 'Peta', i: 'map', match: /^#\/peta/ },
  { href: '#/kartu', label: 'Kartu', i: 'cards', match: /^#\/kartu/ },
  { href: '#/ujian', label: 'Asesmen', i: 'target', match: /^#\/ujian/ },
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
const CH = 3;
const SECS = () => chapterById(CH)!.sections;
const secHref = (id: string) => `#/bab/${CH}/materi/${id}`;
const secTitle = (id: string) => SECS().find(s => s.id === id)?.title ?? '';
const PART_POINTS: Record<Part, string> = {
  fisik: 'Sekutu datang membawa NICA. Rakyat melawan di berbagai daerah, lalu menghadapi dua kali agresi Belanda dengan perang gerilya.',
  diplomasi: 'Indonesia membawa masalahnya ke PBB dan berunding langsung dengan Belanda, sampai kedaulatan diakui pada 27 Desember 1949.',
};

/* kartu subbab untuk carousel horizontal */
function secCard(id: string) {
  const s = SECS().find(x => x.id === id)!; const tone = partTone(s.part!);
  return `<a class="strip-item sec-item t-${tone}" href="${secHref(s.id)}"><span class="no">${esc(s.number)}</span><span class="d">${esc(s.date ?? '')}</span><b>${esc(s.title)}</b><p>${esc(s.sum ?? '')}</p><span class="tag">${partLabel(s.part!)} ${icon('arrow')}</span></a>`;
}

function home() {
  const big = TIMELINE.filter(e => e.big);
  const ch = chapterById(CH)!;
  const nPg = ch.sections.length;
  onMount(async () => {
    const m = await loadMap(); const host = $('#mini-map'); if (!host) return;
    host.innerHTML = `<svg class="mini-map" viewBox="0 0 ${m.MAP_W} ${m.MAP_H}" aria-hidden="true">${m.ISLAND_PATHS.map(d => `<path d="${d}"/>`).join('')}${PINS.map(p => { const [x, y] = m.proj(p.lon, p.lat); return `<circle cx="${x}" cy="${y}" r="7"/>`; }).join('')}</svg>`;
    host.classList.add('ok');
  });
  return `<div class="view home">
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-txt">
        <span class="eyebrow reveal"><span class="dot"></span>Sejarah Indonesia &middot; Kelas XI &middot; Bab III</span>
        <h1 class="reveal">Strategi mempertahankan <em>kemerdekaan</em></h1>
        <div class="hero-cta reveal">
          <a class="btn btn-primary btn-lg" href="#/bab/${CH}">${icon('play')} Mulai belajar</a>
          <a class="btn btn-ghost btn-lg" href="#/ujian">${icon('target')} Kerjakan asesmen</a>
        </div>
        <ol class="steps reveal" aria-label="Urutan belajar">
          <li><span class="n">1</span><span><b>Ringkas</b><small>Poin inti bab</small></span></li>
          <li><span class="n">2</span><span><b>Materi</b><small>${nPg} subbab</small></span></li>
          <li><span class="n">3</span><span><b>Latihan</b><small>Soal asesmen</small></span></li>
        </ol>
      </div>
      <div class="hero-art reveal">
        <div class="frame">${lazyImg(img('arsip-hero'), 'Ilustrasi arsip perjuangan kemerdekaan: buku, radio, pena, dan bendera Merah Putih', '', true)}</div>
        <div class="stamp"><span class="flag" aria-hidden="true"><i></i><i></i></span><div><b>10 November 1945</b><small>Pertempuran Surabaya</small></div></div>
        <div class="stamp2"><span>${icon('award')}</span><div><b>27 Desember 1949</b><small>Pengakuan kedaulatan</small></div></div>
      </div>
    </div>
    <div class="wrap"><dl class="facts reveal">
      <div><dt>2</dt><dd>Jalur perjuangan</dd></div>
      <div><dt>${nPg}</dt><dd>Subbab</dd></div>
      <div><dt>${COURSE.counts.questions}</dt><dd>Soal asesmen</dd></div>
      <div><dt>${FLASHCARDS.length}</dt><dd>Kartu hafalan</dd></div>
      <div><dt>${PINS.length}</dt><dd>Lokasi di peta</dd></div>
    </dl></div>
  </section>

  <section class="wrap sec" id="gambaran">
    <div class="sec-head reveal"><div><span class="eyebrow"><span class="dot"></span>Peta konsep</span><h2>Dua jalur, satu tujuan</h2></div></div>
    <ol class="era era-2">${PHASES.map((ph, i) => `
      <li class="era-col t-${ph.tone} reveal">
        <div class="era-top"><span class="era-n">${'AB'[i]}</span></div>
        <span class="era-range">${ph.range}</span>
        <h3>${ph.label}</h3>
        <p class="era-p">${esc(PART_POINTS[ph.id])}</p>
        <div class="era-links">${ch.sections.filter(s => s.part === ph.id && s.number.includes('.')).map(s => `<a href="${secHref(s.id)}">${esc(s.title.replace(/^(Pertempuran|Perjanjian|Perundingan) /, ''))}</a>`).join('')}</div>
      </li>`).join('')}</ol>
  </section>

  ${PHASES.map(ph => `<section class="sec sec-bleed">
    <div class="wrap sec-head reveal"><div><span class="eyebrow"><span class="dot"></span>Bagian ${ph.id === 'fisik' ? 'A' : 'B'}</span><h2>${ph.label}</h2></div><a class="btn btn-ghost btn-sm" href="${secHref(ph.sec)}">Baca dari awal ${icon('arrow')}</a></div>
    <div class="reveal">${hscroll(ch.sections.filter(s => s.part === ph.id).map(s => secCard(s.id)).join(''), { label: ph.label, cls: 'hs-bleed' })}</div>
  </section>`).join('')}

  <section class="sec sec-bleed">
    <div class="wrap sec-head reveal"><div><span class="eyebrow"><span class="dot"></span>Tanggal penting</span><h2>Yang paling sering ditanyakan</h2></div><a class="btn btn-ghost btn-sm" href="#/timeline">Timeline lengkap ${icon('arrow')}</a></div>
    <div class="reveal">${hscroll(big.map(e => `<a class="strip-item t-${partTone(e.phase)}" href="${secHref(e.sec)}"><span class="d">${esc(e.date)}</span><b>${esc(e.title)}</b><p>${esc(e.text)}</p><span class="tag">${partLabel(e.phase)} ${icon('arrow')}</span></a>`).join(''), { label: 'Tanggal penting', cls: 'hs-bleed' })}</div>
  </section>

  <section class="wrap sec">
    <div class="sec-head reveal"><div><span class="eyebrow"><span class="dot"></span>Alat belajar</span><h2>Ulangi materi dengan cara lain</h2></div></div>
    <div class="tools">
      <a class="tool big t-blue reveal" href="#/peta"><span class="mini-wrap" id="mini-map"></span><div><span class="ti">${icon('map')}</span><h3>Peta perjuangan</h3><p>${PINS.length} lokasi, dari Medan sampai Surabaya.</p></div><span class="arrow">${icon('arrow')}</span></a>
      <a class="tool t-amber reveal" href="#/timeline"><div><span class="ti">${icon('clock')}</span><h3>Garis waktu</h3><p>${TIMELINE.length} peristiwa berurutan.</p></div><span class="arrow">${icon('arrow')}</span></a>
      <a class="tool t-violet reveal" href="#/kartu"><div><span class="ti">${icon('cards')}</span><h3>Kartu hafalan</h3><p>Tokoh, istilah, dan tanggal.</p></div><span class="arrow">${icon('arrow')}</span></a>
      <a class="tool t-teal reveal" href="#/bab/${CH}"><div><span class="ti">${icon('layers')}</span><h3>Ringkasan visual</h3><p>Tabel perundingan, tokoh, dan hal yang sering tertukar.</p></div><span class="arrow">${icon('arrow')}</span></a>
      <a class="tool t-red reveal" href="#/ujian"><div><span class="ti">${icon('target')}</span><h3>Asesmen</h3><p>Soal perjuangan bersenjata dan diplomasi.</p></div><span class="arrow">${icon('arrow')}</span></a>
    </div>
  </section></div>`;
}

/* =============================================================
   CHAPTER
   ============================================================= */
type Tab = 'ringkas' | 'materi' | 'latihan';
function chapterBody(n: number, tab: Tab) {
  const r = ringkasFor(n);
  if (tab === 'ringkas' && r) return renderRingkas(r, n);
  if (tab === 'materi') return materi(n);
  return asesmen();
}
function chapterTabs(n: number, tab: Tab) {
  const ch = chapterById(n)!;
  const t = (k: Tab, href: string, num: number, label: string, small: string) =>
    `<a href="${href}" data-tab="${k}" aria-current="${tab === k}"><span class="st">${num}</span><span>${label}</span><small>${small}</small></a>`;
  return `<nav class="tabs" id="ch-tabs" aria-label="Bagian bab">
    ${t('ringkas', `#/bab/${n}`, 1, 'Ringkas', 'poin inti')}
    ${t('materi', `#/bab/${n}/materi`, 2, 'Materi', `${ch.sections.length} subbab`)}
    ${t('latihan', `#/bab/${n}/latihan`, 3, 'Latihan', `${COURSE.questions.length} soal`)}
  </nav>`;
}
function chapter(n: number, tab: Tab) {
  const ch = chapterById(n); if (!ch) return notFound();
  const r = ringkasFor(n); const tone = toneOf(n);
  onMount(() => { moveIndicator($('#ch-tabs'), 'a[aria-current="true"]', true); });
  return `<div class="view t-${tone}" data-ch="${n}">
  <div class="wrap">
    <section class="ch-hero">
      <div class="txt">
        <nav class="crumbs" aria-label="Lokasi"><a href="#/">Beranda</a>${icon('arrow')}<span>Bab III</span></nav>
        <div class="bignum"><span class="tagno">Bab III</span><span>${esc(ch.subtitle)}</span><span class="sep"></span><span>${esc(r?.phase ?? '')}</span></div>
        <h1>${esc(ch.fullTitle)}</h1>
        <p class="tagline">${md(r?.tagline ?? ch.intro)}</p>
        <div class="q"><span class="qi">${icon('quiz')}</span><div><small>Pertanyaan kunci</small><p>${esc(r?.pertanyaan ?? ch.intro)}</p></div></div>
      </div>
      <div class="art">${lazyImg(img(ch.hero), '', '', true)}</div>
    </section>
    ${chapterTabs(n, tab)}
    <div id="ch-body">${chapterBody(n, tab)}</div>
    <nav class="next-ch" aria-label="Halaman lain">
      <a href="#/timeline"><small>${icon('clock')} Ulangi urutannya</small><b>Garis waktu peristiwa</b></a>
      <a class="n" href="#/kartu"><small>Hafalkan ${icon('arrow')}</small><b>Kartu tokoh, istilah, dan tanggal</b></a>
    </nav>
  </div></div>`;
}

const materi = (n: number) => materiView(n);

/* =============================================================
   ASESMEN (dipakai di tab Latihan dan halaman Asesmen)
   ============================================================= */
type QSet = Part | 'acak';
let qset: QSet = 'fisik';
const ACAK_N = 25;
const SETS: Record<QSet, { label: string; title: string; tone: string; qs: () => Question[] }> = {
  fisik: { label: 'Perjuangan bersenjata', title: 'Asesmen Perjuangan Bersenjata', tone: 'red', qs: () => questionsBySet('fisik') },
  diplomasi: { label: 'Perjuangan diplomasi', title: 'Asesmen Perjuangan Diplomasi', tone: 'blue', qs: () => questionsBySet('diplomasi') },
  acak: { label: 'Campuran acak', title: `Campuran acak ${ACAK_N} soal`, tone: 'violet', qs: () => shuffle(COURSE.questions.filter(q => q.kind === 'mcq')).slice(0, ACAK_N) },
};
function setView() { const S = SETS[qset]; return quizView(qset, S.title, S.qs(), S.tone); }
function asesmen() {
  const cnt = (k: QSet) => (k === 'acak' ? `${ACAK_N} soal` : `${SETS[k].qs().length} soal`);
  return `<div class="qset">
    <div class="seg qset-seg">${hscroll((Object.keys(SETS) as QSet[]).map(k => `<button class="t-${SETS[k].tone}" data-act="qset" data-v="${k}" aria-pressed="${qset === k}"><i></i>${SETS[k].label} <small>${cnt(k)}</small></button>`).join(''), { label: 'Pilih paket soal', controls: false })}</div>
    <p class="qset-note">Soal diambil dari lembar asesmen modul Bab III. Modul tidak menyertakan kunci pilihan ganda, jadi kunci dan pembahasan di sini disusun dari isi materi.</p>
    <div id="qset-body">${setView()}</div>
  </div>`;
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
  : `<a class="tl-ev ${r.side} t-${partTone(r.e.phase)}${r.e.big ? ' big' : ''}" href="${secHref(r.e.sec)}"><div class="card"><span class="d">${esc(r.e.date)}</span><b>${esc(r.e.title)}</b><p>${esc(r.e.text)}</p><span class="go">${esc(secTitle(r.e.sec))} ${icon('arrow')}</span></div></a>`;
let tlList: VList<TLRow> | null = null;
function timeline() {
  onMount(() => {
    const host = $('#tl-list'); if (!host) return;
    tlList = new VList<TLRow>({ host, scroller: window, items: tlRows(), render: tlRow, estimate: r => (r.t === 'y' ? 76 : innerWidth < 760 ? 168 : 150), overscan: 700 });
    onDispose(() => { tlList?.destroy(); tlList = null; });
  });
  return `<div class="view wrap">
    <header class="page-head reveal"><span class="eyebrow"><span class="dot"></span>Garis waktu</span><h1>Peristiwa <span style="white-space:nowrap">1945&ndash;1949</span></h1><p>Merah untuk perjuangan fisik, biru untuk diplomasi. Kartu bergaris tebal adalah peristiwa kunci. Klik kartu untuk membuka materinya.</p></header>
    <div class="filters reveal">${hscroll(`<button data-act="tl" data-v="all" aria-pressed="${tlFilter === 'all'}">Semua <small>${TIMELINE.length}</small></button>
      ${PHASES.map(p => `<button class="t-${p.tone}" data-act="tl" data-v="${p.id}" aria-pressed="${tlFilter === p.id}"><i></i>${p.label} <small>${TIMELINE.filter(e => e.phase === p.id).length}</small></button>`).join('')}`, { label: 'Filter jalur perjuangan', controls: false })}</div>
    <div class="big-tl" id="tl-list"></div></div>`;
}

/* =============================================================
   MAP (modul peta dimuat saat dibutuhkan)
   ============================================================= */
let pinSel = 'surabaya';
const MINOR = new Set(['berandan', 'brastagi', 'linggarjati', 'ambarawa']);
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
  return `<div class="pin-detail" style="--pc:${k.color}"><span class="k"><i></i>${k.label}</span><h3>${esc(p.title)}</h3><span class="d">${icon('pin')} ${esc(p.name)} &middot; ${esc(p.date)}</span><p>${esc(p.text)}</p><a class="btn btn-dark btn-sm" href="${secHref(p.sec)}">Baca materinya ${icon('arrow')}</a></div>`;
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
    <header class="page-head reveal"><span class="eyebrow"><span class="dot"></span>Peta interaktif</span><h1>Peta perjuangan 1945&ndash;1949</h1><p>Pilih titik di peta atau di daftar untuk membaca peristiwanya.</p></header>
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
const FC = { deck: 'all' as 'all' | Flashcard['deck'], part: '' as '' | Part, queue: [] as Flashcard[], i: 0, flip: false, known: new Set<string>(), unknown: [] as Flashcard[] };
const cardKey = (c: Flashcard) => c.deck + ':' + c.front;
function deckCards() { return FLASHCARDS.filter(c => (FC.deck === 'all' || c.deck === FC.deck) && (!FC.part || c.part === FC.part)); }
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
    <div class="fc-stage"><div class="fc t-${partTone(c.part)}${FC.flip ? ' flip' : ''}${dir ? ' enter' + (dir > 0 ? ' from-r' : ' from-l') : ''}" id="fc" data-act="fc-flip" role="button" tabindex="0" aria-label="Kartu: ${esc(c.front)}. Klik untuk membalik.">
      <div class="fc-face fc-front"><span class="deck">${icon(DECK[c.deck].i)}${DECK[c.deck].label}</span><span class="ch">${partLabel(c.part)}</span><h2>${esc(c.front)}</h2><span class="hint">${icon('flip')} Ketuk untuk membalik</span></div>
      <div class="fc-face fc-back"><span class="deck">${icon(DECK[c.deck].i)}${DECK[c.deck].label}</span><span class="ch">${partLabel(c.part)}</span><span class="front-mini">${esc(c.front)}</span><p>${md(c.back)}</p><span class="hint">Sudah hafal?</span></div>
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
        <label class="select">${icon('book')}<select id="fc-ch" aria-label="Filter jalur perjuangan"><option value="">Fisik dan diplomasi</option>${PHASES.map(p => `<option value="${p.id}" ${FC.part === p.id ? 'selected' : ''}>${p.label}</option>`).join('')}</select></label>
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
   ASESMEN (halaman)
   ============================================================= */
function ujian() {
  return `<div class="view wrap t-red">
    <header class="page-head reveal"><span class="eyebrow"><span class="dot"></span>Evaluasi Bab III</span><h1>Asesmen</h1><p>Pilih paket soal. Pilihan ganda langsung dikoreksi, uraian dicocokkan dengan poin kunci jawaban dari modul.</p></header>
    ${asesmen()}
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
  const pages: [string, string, string][] = [['#/timeline', 'Garis waktu', 'clock'], ['#/peta', 'Peta perjuangan', 'map'], ['#/kartu', 'Kartu hafalan', 'cards'], ['#/ujian', 'Asesmen', 'target']];
  pages.forEach(([href, t, i]) => h.push({ href, title: t, sub: 'Halaman', icon: i, tone: 'ink', group: 'Halaman', q: norm(t) }));
  const c = chapterById(CH)!; const r = ringkasFor(CH);
  h.push({ href: `#/bab/${CH}`, title: `Bab III: ${c.fullTitle}`, sub: plain(r?.tagline ?? c.intro), icon: 'swords', tone: toneOf(CH), group: 'Bab', q: norm(c.fullTitle + ' ' + (r?.tagline ?? '')) });
  c.sections.forEach(s => h.push({ href: secHref(s.id), title: s.title, sub: `${s.number} · ${plain(s.lead).slice(0, 120)}`, icon: 'book', tone: partTone(s.part!), group: 'Materi', q: norm(s.title + ' ' + s.search) }));
  TIMELINE.forEach(e => h.push({ href: secHref(e.sec), title: `${e.date}: ${e.title}`, sub: e.text, icon: 'calendar', tone: partTone(e.phase), group: 'Peristiwa', q: norm(e.date + ' ' + e.title + ' ' + e.text) }));
  FLASHCARDS.forEach(f => h.push({ href: secHref(f.sec), title: f.front, sub: plain(f.back), icon: DECK[f.deck].i, tone: partTone(f.part), group: DECK[f.deck].label, q: norm(f.front + ' ' + f.back) }));
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
    if (!hits.length) { list.setItems([]); res.innerHTML = `<div class="pal-empty">Tidak ada hasil untuk &ldquo;${esc(raw)}&rdquo;. Coba <b>Linggarjati</b> atau <b>Mallaby</b>.</div>`; return; }
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
let lastPath = '';
let lastCh = 0;

function parse() {
  const h = location.hash || '#/';
  return h.replace(/^#\/?/, '').split('/').filter(Boolean);
}

function pageHTML(parts: string[]) {
  if (!parts.length) return home();
  if (parts[0] === 'bab') {
    const tab = (parts[2] as Tab) || 'ringkas';
    return chapter(Number(parts[1]), ['ringkas', 'materi', 'latihan'].includes(tab) ? tab : 'ringkas');
  }
  if (parts[0] === 'timeline') return timeline();
  if (parts[0] === 'peta') return peta();
  if (parts[0] === 'kartu') { if (!FC.queue.length && FC.i === 0) buildDeck(); return kartu(); }
  if (parts[0] === 'ujian') return ujian();
  return notFound();
}

function afterRender(root: ParentNode, animateReveal: boolean) {
  initHScroll(root); initLazy(root);
  $$<HTMLElement>('.prose .table-scroll, .tbl-wrap', root as HTMLElement).forEach(t => attachScrollbar(t, 'x'));
  if ($('.rd')) onDispose(mountReader());
  observe(animateReveal);
  const run = mounts; mounts = []; run.forEach(f => f());
}

function render() {
  const parts = parse();
  if (parts[0] === 'bab' && parts[1] !== String(CH)) { location.replace(`#/bab/${CH}${parts[2] ? '/' + parts.slice(2).join('/') : ''}`); return; }
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
    if (target) requestAnimationFrame(() => { const el = document.getElementById(target); if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 90 - (parseFloat(getComputedStyle(el).getPropertyValue('--scroll-extra')) || 0), behavior: 'auto' }); });
    else if (changed) scrollTo({ top: 0, behavior: 'auto' });
    afterRender(app, changed);
    updateBars();
  };
  const vt = (document as any).startViewTransition;
  if (changed && vt && !reduced() && lastPath !== '') { const t = vt.call(document, swap); t.ready?.catch(() => {}); t.finished?.catch(() => {}); }
  else swap();

  const title = parts[0] === 'bab' ? ({ materi: 'Materi', latihan: 'Latihan' } as Record<string, string>)[parts[2]] ?? 'Ringkas' : ({ timeline: 'Garis waktu', peta: 'Peta', kartu: 'Kartu hafalan', ujian: 'Asesmen' } as Record<string, string>)[parts[0]] ?? '';
  document.title = (title ? title + ' · ' : '') + 'Bab III Strategi Mempertahankan Kemerdekaan';
}

function observe(animate: boolean) {
  io?.disconnect();
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
  if (readerClick(act, el)) return;
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
    case 'qset': {
      qset = el.dataset.v as QSet; resetQuiz();
      $$('[data-act="qset"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === qset)));
      const body = $('#qset-body'); if (body) { body.innerHTML = setView(); body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap'); }
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
  if (t.id === 'fc-ch') { FC.part = t.value as '' | Part; buildDeck(); drawFc(1); }
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
  const S = SETS[key as QSet]; if (!S) return;
  startQuiz(key, S.title, S.qs());
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
