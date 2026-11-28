/* =============================================================
   UI engine: scrollbar kustom, area scroll horizontal, virtual list,
   lazy image, animasi akordeon. Tanpa dependensi.
   ============================================================= */
import { icon } from './lib';

export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const fine = () => matchMedia('(pointer: fine)').matches;

/* ---------- easing & tween ---------- */
export const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
export const easeInOutCubic = (t: number) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const tweens = new WeakMap<object, number>();
export function tween(key: object, from: number, to: number, ms: number, step: (v: number) => void, ease = easeOutQuint, done?: () => void) {
  cancelAnimationFrame(tweens.get(key) ?? 0);
  if (reduced() || Math.abs(to - from) < 1) { step(to); done?.(); return; }
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / ms);
    step(from + (to - from) * ease(p));
    if (p < 1) tweens.set(key, requestAnimationFrame(tick)); else { tweens.delete(key); done?.(); }
  };
  tweens.set(key, requestAnimationFrame(tick));
}
export const stopTween = (key: object) => { cancelAnimationFrame(tweens.get(key) ?? 0); tweens.delete(key); };

/** scroll halaman yang halus dengan kurva yang konsisten di semua browser */
export function smoothScrollTo(y: number, ms = 760) {
  const se = document.scrollingElement as HTMLElement;
  const max = se.scrollHeight - innerHeight;
  tween(se, scrollY, Math.max(0, Math.min(max, y)), ms, v => se.scrollTop = v, easeInOutCubic);
}
export function scrollToEl(el: Element, offset = 0) {
  const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
  const extra = parseFloat(getComputedStyle(el).getPropertyValue('--scroll-extra')) || 0;
  smoothScrollTo(el.getBoundingClientRect().top + scrollY - navH - 16 - extra - offset);
}

/* =============================================================
   CUSTOM SCROLLBAR
   Native scrollbar disembunyikan lewat CSS; setiap area scroll
   mendapat thumb buatan sendiri yang bisa di-drag.
   ============================================================= */
type Axis = 'x' | 'y';
interface Bar { el: HTMLElement; view: HTMLElement | null; axis: Axis; thumb: HTMLElement; update: () => void; destroy: () => void; }
const bars = new Set<Bar>();

function makeBar(view: HTMLElement | null, axis: Axis, host: HTMLElement, fixed = false): Bar {
  const el = document.createElement('div');
  el.className = `cs-bar cs-${axis}${fixed ? ' cs-page' : ''}`;
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<i class="cs-thumb"></i>';
  host.append(el);
  const thumb = el.firstElementChild as HTMLElement;
  const se = () => (view ?? document.scrollingElement) as HTMLElement;
  const metrics = () => {
    const s = se();
    const client = view ? (axis === 'x' ? s.clientWidth : s.clientHeight) : innerHeight;
    const total = axis === 'x' ? s.scrollWidth : s.scrollHeight;
    const pos = axis === 'x' ? s.scrollLeft : (view ? s.scrollTop : scrollY);
    const track = axis === 'x' ? el.clientWidth : el.clientHeight;
    return { client, total, pos, track };
  };
  let raf = 0; let hideT = 0;
  const paint = () => {
    raf = 0;
    const { client, total, pos, track } = metrics();
    const over = total - client > 2;
    el.classList.toggle('off', !over);
    if (!over) return;
    const size = Math.max(28, (client / total) * track);
    const off = (pos / (total - client)) * (track - size);
    thumb.style[axis === 'x' ? 'width' : 'height'] = size + 'px';
    thumb.style.transform = axis === 'x' ? `translate3d(${off}px,0,0)` : `translate3d(0,${off}px,0)`;
  };
  const update = () => { if (!raf) raf = requestAnimationFrame(paint); };
  const wake = () => { el.classList.add('act'); clearTimeout(hideT); hideT = window.setTimeout(() => el.classList.remove('act'), 1100); update(); };
  const target: HTMLElement | Window = view ?? window;
  target.addEventListener('scroll', wake, { passive: true });
  const ro = new ResizeObserver(update);
  if (view) { ro.observe(view); Array.from(view.children).slice(0, 3).forEach(c => ro.observe(c)); } else ro.observe(document.body);
  if (!view) addEventListener('resize', update);

  // drag thumb
  let dragging = false, startP = 0, startPos = 0;
  thumb.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation();
    dragging = true; thumb.setPointerCapture(e.pointerId); el.classList.add('drag');
    (se() as any).__ctl?.stop(); startP = axis === 'x' ? e.clientX : e.clientY; startPos = metrics().pos; stopTween(se());
  });
  thumb.addEventListener('pointermove', e => {
    if (!dragging) return;
    const { client, total, track } = metrics();
    const size = Math.max(28, (client / total) * track);
    const d = ((axis === 'x' ? e.clientX : e.clientY) - startP) * (total - client) / (track - size);
    const s = se();
    if (axis === 'x') s.scrollLeft = startPos + d; else if (view) s.scrollTop = startPos + d; else s.scrollTop = startPos + d;
  });
  const end = () => { dragging = false; el.classList.remove('drag'); };
  thumb.addEventListener('pointerup', end); thumb.addEventListener('pointercancel', end);
  // klik di track = lompat halus
  el.addEventListener('pointerdown', e => {
    if (e.target === thumb) return;
    const r = el.getBoundingClientRect();
    const { client, total } = metrics();
    const ratio = axis === 'x' ? (e.clientX - r.left) / r.width : (e.clientY - r.top) / r.height;
    const to = ratio * total - client / 2;
    const s = se();
    if (axis === 'x') { const c = (s as any).__ctl; if (c) c.go(to); else s.scrollLeft = to; }
    else if (view) tween(s, s.scrollTop, Math.max(0, Math.min(total - client, to)), 520, v => s.scrollTop = v);
    else smoothScrollTo(to, 620);
  });
  if (view) view.addEventListener('pointerenter', wake);
  update();
  const bar: Bar = {
    el, view, axis, thumb, update,
    destroy() { ro.disconnect(); target.removeEventListener('scroll', wake); el.remove(); bars.delete(bar); },
  };
  bars.add(bar);
  return bar;
}

/** pasang scrollbar kustom ke elemen yang bisa di-scroll (membungkusnya bila perlu) */
export function attachScrollbar(view: HTMLElement, axis: Axis): Bar | null {
  if ((view as any).__bar) return (view as any).__bar;
  let host = view.parentElement!;
  if (!host.classList.contains('cs-host')) {
    const w = document.createElement('div');
    w.className = 'cs-host';
    view.before(w); w.append(view); host = w;
  }
  view.classList.add('cs-view');
  const b = makeBar(view, axis, host);
  (view as any).__bar = b;
  return b;
}

let pageBar: Bar | null = null;
export function initPageScrollbar() {
  if (pageBar) return pageBar.update();
  pageBar = makeBar(null, 'y', document.body, true);
}
export const updateBars = () => bars.forEach(b => b.update());

/** bersihkan scrollbar milik elemen yang sudah tidak ada di DOM */
export function gcBars() { bars.forEach(b => { if (b.view && !b.view.isConnected) b.destroy(); }); }

/* =============================================================
   AREA SCROLL HORIZONTAL
   drag dengan mouse + inertia, snap halus, tombol prev/next,
   fade di tepi, scrollbar kustom.
   ============================================================= */
export function hscroll(inner: string, opts: { label: string; cls?: string; controls?: boolean } ) {
  return `<div class="hs ${opts.cls ?? ''}" data-hs>
    ${opts.controls !== false ? `<div class="hs-ctl"><button class="hs-btn" data-hs-dir="-1" aria-label="Geser ke kiri">${icon('back')}</button><button class="hs-btn" data-hs-dir="1" aria-label="Geser ke kanan">${icon('arrow')}</button></div>` : ''}
    <div class="hs-track" tabindex="0" role="region" aria-label="${opts.label}">${inner}</div>
  </div>`;
}

function snapPoints(track: HTMLElement) {
  const cs = getComputedStyle(track);
  const pad = parseFloat(cs.scrollPaddingLeft) || parseFloat(cs.paddingLeft) || 0;
  const max = track.scrollWidth - track.clientWidth;
  return Array.from(track.children).map(c => Math.min(max, Math.max(0, (c as HTMLElement).offsetLeft - pad)));
}
function nearest(track: HTMLElement, x: number, dir = 0) {
  const pts = snapPoints(track); if (!pts.length) return 0;
  if (dir > 0) return pts.find(p => p > x + 4) ?? pts[pts.length - 1];
  if (dir < 0) { const r = pts.filter(p => p < x - 4); return r.length ? r[r.length - 1] : 0; }
  return pts.reduce((b, p) => (Math.abs(p - x) < Math.abs(b - x) ? p : b), pts[0]);
}

type HSCtl = { go: (to: number) => void; stop: () => void; target: () => number };
const ctlOf = (t: HTMLElement): HSCtl | undefined => (t as any).__ctl;

/**
 * Satu pengendali gerak per area: pegas teredam kritis (critically damped spring).
 * Target boleh berubah kapan saja (roda, tombol, drag) tanpa gerakan patah,
 * karena kecepatan terakhir selalu dibawa ke target berikutnya.
 */
function motion(track: HTMLElement, onIdle?: () => void): HSCtl {
  let x = track.scrollLeft, v = 0, target = x, raf = 0, last = 0;
  const W = 15; // kekakuan pegas: makin besar makin cepat (± 0,35 dtk sampai diam)
  const max = () => Math.max(0, track.scrollWidth - track.clientWidth);
  const tick = (now: number) => {
    let dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    // integrasi semi-implisit dengan sub-langkah agar stabil di 30–144 Hz
    while (dt > 0) {
      const h = Math.min(dt, 1 / 240); dt -= h;
      v += (W * W * (target - x) - 2 * W * v) * h;
      x += v * h;
    }
    const m = max();
    if (x < 0) { x = 0; v = 0; } else if (x > m) { x = m; v = 0; }
    if (Math.abs(target - x) < 0.4 && Math.abs(v) < 8) {
      x = target; track.scrollLeft = x; raf = 0; v = 0; track.classList.remove('free'); onIdle?.(); return;
    }
    track.scrollLeft = x;
    raf = requestAnimationFrame(tick);
  };
  const ctl: HSCtl = {
    go(to) {
      target = Math.max(0, Math.min(max(), to));
      if (reduced()) { track.scrollLeft = x = target; return; }
      if (!raf) { x = track.scrollLeft; last = performance.now(); track.classList.add('free'); raf = requestAnimationFrame(tick); }
    },
    stop() { cancelAnimationFrame(raf); raf = 0; v = 0; x = target = track.scrollLeft; track.classList.remove('free'); },
    target: () => (raf ? target : track.scrollLeft),
  };
  (ctl as any).kick = (vel: number) => { v = vel; };
  (track as any).__ctl = ctl;
  return ctl;
}

export function initHScroll(root: ParentNode = document) {
  gcBars();
  root.querySelectorAll<HTMLElement>('[data-hs]').forEach(hs => {
    if ((hs as any).__hs) return; (hs as any).__hs = 1;
    const track = hs.querySelector<HTMLElement>('.hs-track')!;
    attachScrollbar(track, 'x');
    const btns = hs.querySelectorAll<HTMLButtonElement>('[data-hs-dir]');
    const snaps = getComputedStyle(track).scrollSnapType !== 'none';
    const mouse = fine();
    // di perangkat mouse, snap dikerjakan JS (bukan CSS) supaya tidak saling tarik
    if (mouse) hs.classList.add('js');

    let er = 0;
    const edges = () => {
      er = 0;
      const max = track.scrollWidth - track.clientWidth;
      const s = track.scrollLeft <= 2, e = track.scrollLeft >= max - 2;
      hs.classList.toggle('at-s', s); hs.classList.toggle('at-e', e); hs.classList.toggle('no-ov', max <= 2);
      btns[0] && (btns[0].disabled = s); btns[1] && (btns[1].disabled = e);
    };
    track.addEventListener('scroll', () => { if (!er) er = requestAnimationFrame(edges); }, { passive: true });
    new ResizeObserver(() => edges()).observe(track);
    edges();

    const ctl = motion(track);
    const kick = (ctl as any).kick as (v: number) => void;
    const settle = (x: number) => (snaps ? nearest(track, x, 0) : x);

    const step = (dir: number) => {
      const cur = ctl.target();
      if (!snaps) return ctl.go(cur + dir * track.clientWidth * 0.7);
      let to = nearest(track, cur + dir * track.clientWidth * 0.75, 0);
      if (Math.abs(to - cur) < 8) to = nearest(track, cur, dir);
      ctl.go(to);
    };
    btns.forEach(b => b.addEventListener('click', () => step(Number(b.dataset.hsDir))));
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1); }
    });

    if (!mouse) return; // layar sentuh: pakai scroll native + CSS snap (paling mulus di HP)

    // trackpad geser ke samping / Shift + roda. Roda vertikal biasa tetap menggulir halaman.
    let idle = 0;
    track.addEventListener('wheel', e => {
      const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!horiz && !e.shiftKey) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? track.clientWidth : 1;
      const d = (horiz ? e.deltaX : e.deltaY) * unit;
      ctl.go(ctl.target() + d);
      clearTimeout(idle);
      idle = window.setTimeout(() => ctl.go(settle(ctl.target())), 130);
    }, { passive: false });

    // drag mouse 1:1, lalu dilempar dengan kecepatan yang sama ke kartu terdekat
    let down = false, moved = false, sx = 0, sl = 0;
    let samples: { t: number; x: number }[] = [];
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; samples = [{ t: e.timeStamp, x: e.clientX }];
      ctl.stop();
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 4) { moved = true; track.classList.add('free', 'grab'); sx = e.clientX; sl = track.scrollLeft; }
      if (!moved) return;
      track.scrollLeft = sl - (e.clientX - sx);
      samples.push({ t: e.timeStamp, x: e.clientX });
      if (samples.length > 8) samples.shift();
    });
    addEventListener('pointerup', e => {
      if (!down) return; down = false;
      track.classList.remove('grab');
      if (!moved) { track.classList.remove('free'); return; }
      // kecepatan dari ±100 ms terakhir (px/detik, arah scroll)
      const recent = samples.filter(p => e.timeStamp - p.t < 100);
      const a = recent[0] ?? samples[0], z = samples[samples.length - 1];
      const dt = Math.max(16, z.t - a.t);
      let vel = e.timeStamp - z.t > 80 ? 0 : -((z.x - a.x) / dt) * 1000;
      vel = Math.max(-5000, Math.min(5000, vel));
      const x = track.scrollLeft;
      let to = settle(x + vel * 0.22);
      if (snaps && Math.abs(to - x) < 4 && Math.abs(vel) > 300) to = nearest(track, x, Math.sign(vel));
      ctl.go(to); kick(vel * 0.6);
    });
    // cegah klik link setelah drag
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    track.addEventListener('dragstart', e => e.preventDefault());
  });
}

/** gulir item aktif ke tengah area horizontal tanpa menggeser halaman */
export function centerInTrack(el: HTMLElement | null, smooth = false) {
  if (!el) return;
  const track = el.closest<HTMLElement>('.hs-track'); if (!track) return;
  const to = el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2;
  const max = track.scrollWidth - track.clientWidth;
  const t = Math.max(0, Math.min(max, to));
  const c = ctlOf(track);
  if (smooth && c) c.go(t);
  else { c?.stop(); track.scrollLeft = t; }
}

/* =============================================================
   VIRTUAL LIST
   Hanya item yang terlihat (+ cadangan) yang dirender ke DOM.
   Tinggi item diukur otomatis lalu disimpan.
   ============================================================= */
export interface VOpts<T> {
  host: HTMLElement;                 // elemen yang menampung list
  scroller: HTMLElement | Window;    // elemen yang di-scroll
  items: T[];
  render: (item: T, i: number) => string;
  estimate: (item: T, i: number) => number;
  overscan?: number;                 // px cadangan di atas & bawah
  gap?: number;
}
export class VList<T> {
  o: VOpts<T>;
  h: number[] = []; off: number[] = []; total = 0;
  spacer: HTMLElement;
  live = new Map<number, HTMLElement>();
  ro: ResizeObserver; raf = 0; dead = false;
  constructor(o: VOpts<T>) {
    this.o = { overscan: 600, gap: 0, ...o };
    this.spacer = document.createElement('div');
    this.spacer.className = 'vl';
    o.host.innerHTML = ''; o.host.append(this.spacer);
    this.ro = new ResizeObserver(es => {
      let changed = false;
      for (const e of es) {
        const el = e.target as HTMLElement; const i = Number(el.dataset.vi);
        const hh = el.offsetHeight;
        if (hh && Math.abs(hh - this.h[i]) > .5) { this.h[i] = hh; changed = true; }
      }
      if (changed) { this.layout(); this.schedule(); }
    });
    this.onScroll = this.onScroll.bind(this);
    o.scroller.addEventListener('scroll', this.onScroll, { passive: true });
    addEventListener('resize', this.onScroll);
    this.setItems(o.items);
  }
  setItems(items: T[]) {
    this.o.items = items;
    this.live.forEach(el => { this.ro.unobserve(el); el.remove(); }); this.live.clear();
    this.h = items.map((it, i) => this.o.estimate(it, i));
    this.layout(); this.paint();
  }
  layout() {
    const g = this.o.gap!; let y = 0;
    this.off = this.h.map(hh => { const t = y; y += hh + g; return t; });
    this.total = Math.max(0, y - g);
    this.spacer.style.height = this.total + 'px';
    this.live.forEach((el, i) => el.style.transform = `translate3d(0,${this.off[i]}px,0)`);
  }
  viewport() {
    const s = this.o.scroller;
    const top = this.spacer.getBoundingClientRect().top;
    if (s === window) return { a: -top, b: -top + innerHeight };
    const el = s as HTMLElement;
    const rel = top - el.getBoundingClientRect().top + el.scrollTop;
    return { a: el.scrollTop - rel, b: el.scrollTop - rel + el.clientHeight };
  }
  find(y: number) { let lo = 0, hi = this.off.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (this.off[m] <= y) lo = m; else hi = m - 1; } return lo; }
  onScroll() { this.schedule(); }
  schedule() { if (!this.raf && !this.dead) this.raf = requestAnimationFrame(() => { this.raf = 0; this.paint(); }); }
  paint() {
    if (this.dead || !this.spacer.isConnected) return;
    const n = this.o.items.length; if (!n) { this.live.forEach(el => el.remove()); this.live.clear(); return; }
    const { a, b } = this.viewport(); const os = this.o.overscan!;
    const s = this.find(Math.max(0, a - os)); let e = s;
    while (e < n - 1 && this.off[e + 1] < b + os) e++;
    this.live.forEach((el, i) => { if (i < s || i > e) { this.ro.unobserve(el); el.remove(); this.live.delete(i); } });
    const frag = document.createDocumentFragment(); const fresh: HTMLElement[] = [];
    for (let i = s; i <= e; i++) {
      if (this.live.has(i)) continue;
      const t = document.createElement('template'); t.innerHTML = this.o.render(this.o.items[i], i).trim();
      const el = t.content.firstElementChild as HTMLElement;
      el.classList.add('vl-item'); el.dataset.vi = String(i);
      el.style.transform = `translate3d(0,${this.off[i]}px,0)`;
      this.live.set(i, el); frag.append(el); fresh.push(el);
    }
    if (fresh.length) { this.spacer.append(frag); fresh.forEach(el => this.ro.observe(el)); }
  }
  /** pastikan item ke-i terlihat (untuk navigasi keyboard) */
  reveal(i: number) {
    const s = this.o.scroller as HTMLElement; if ((s as unknown) === window) return;
    const top = this.off[i], bot = top + this.h[i];
    if (top < s.scrollTop) s.scrollTop = top - 8; else if (bot > s.scrollTop + s.clientHeight) s.scrollTop = bot - s.clientHeight + 8;
    this.paint();
  }
  el(i: number) { return this.live.get(i); }
  destroy() {
    this.dead = true; cancelAnimationFrame(this.raf); this.ro.disconnect();
    this.o.scroller.removeEventListener('scroll', this.onScroll); removeEventListener('resize', this.onScroll);
  }
}

/* =============================================================
   LAZY IMAGE: fade-in halus setelah gambar termuat
   ============================================================= */
export function lazyImg(src: string, alt = '', cls = '', eager = false) {
  return `<img class="lz ${cls}" src="${src}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
export function initLazy(root: ParentNode = document) {
  root.querySelectorAll<HTMLImageElement>('img.lz:not(.ok)').forEach(img => { if (img.complete && img.naturalWidth) img.classList.add('ok'); });
}
document.addEventListener('load', e => { const t = e.target as HTMLElement; if (t.tagName === 'IMG' && t.classList.contains('lz')) t.classList.add('ok'); }, true);

/* =============================================================
   AKORDEON <details> dengan animasi tinggi yang halus
   ============================================================= */
export function animateDetails(d: HTMLDetailsElement) {
  const body = d.querySelector(':scope > :not(summary)') as HTMLElement | null;
  if (!body || reduced()) { d.open = !d.open; return; }
  const running = (d as any).__anim as Animation | undefined; running?.cancel();
  const opening = !d.open;
  const sumH = (d.querySelector('summary') as HTMLElement).offsetHeight;
  const start = d.offsetHeight;
  if (opening) d.open = true;
  const bw = (parseFloat(getComputedStyle(d).borderTopWidth) || 0) + (parseFloat(getComputedStyle(d).borderBottomWidth) || 0);
  const end = opening ? d.offsetHeight : sumH + bw;
  d.style.overflow = 'hidden';
  d.classList.toggle('opening', opening);
  const a = d.animate({ height: [start + 'px', end + 'px'] }, { duration: opening ? 460 : 340, easing: 'cubic-bezier(.22,1,.36,1)' });
  (d as any).__anim = a;
  a.onfinish = () => { (d as any).__anim = null; if (!opening) d.open = false; d.style.overflow = ''; d.classList.remove('opening'); updateBars(); };
  a.oncancel = () => { d.style.overflow = ''; };
}
document.addEventListener('click', e => {
  const s = (e.target as HTMLElement).closest('summary');
  if (!s) return;
  const d = s.parentElement as HTMLDetailsElement;
  if (!d.matches('.prose details, .lk-toc')) return;
  e.preventDefault(); animateDetails(d);
});

/* =============================================================
   INDIKATOR (pill yang meluncur di nav & tab)
   ============================================================= */
export function moveIndicator(container: HTMLElement | null, activeSel: string, instant = false) {
  if (!container) return;
  let ind = container.querySelector<HTMLElement>(':scope > .ind');
  if (!ind) { ind = document.createElement('span'); ind.className = 'ind'; ind.setAttribute('aria-hidden', 'true'); container.prepend(ind); instant = true; }
  const a = container.querySelector<HTMLElement>(activeSel);
  if (!a) { ind.style.opacity = '0'; return; }
  if (instant) ind.classList.add('now');
  ind.style.opacity = '1';
  ind.style.width = a.offsetWidth + 'px';
  ind.style.height = a.offsetHeight + 'px';
  ind.style.transform = `translate3d(${a.offsetLeft}px,${a.offsetTop}px,0)`;
  if (instant) { void ind.offsetWidth; ind.classList.remove('now'); }
}
