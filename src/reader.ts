/* =============================================================
   MATERI — tampilan baca
   - daftar isi tetap di kiri (desktop) / lembar bawah (ponsel)
   - tiap subbab: judul, "Intinya", isi, kotak Sekilas, cek pemahaman
   - tabel kronologi, tokoh, dan perbandingan diubah jadi komponen visual
   ============================================================= */
import { COURSE } from './data/course';
import { PHASES, partTone } from './data/atlas';
import { SEKILAS, CEK, CEK_EXTRA } from './data/sekilas';
import type { LessonSection, Part, Question } from './types';
import { $, $$, esc, icon, initials, hashColor, chapterById, prefs, savePrefs } from './lib';
import { attachScrollbar, reduced } from './ui';

const QMAP = new Map<string, Question>([...COURSE.questions, ...CEK_EXTRA].map(q => [q.id, q]));
const PART_TEXT: Record<Part, string> = {
  fisik: 'Sekutu datang membawa NICA. Rakyat melawan di berbagai daerah, lalu menghadapi dua kali agresi Belanda dengan perang gerilya.',
  diplomasi: 'Indonesia membawa masalahnya ke PBB dan berunding langsung dengan Belanda, sampai kedaulatan diakui pada 27 Desember 1949.',
};
const partLetter = (p: Part) => (p === 'fisik' ? 'A' : 'B');
const partName = (p: Part) => PHASES.find(x => x.id === p)!.label;

/* ukuran teks baca */
type FS = 's' | 'm' | 'l';
const FS_LABEL: Record<FS, string> = { s: 'Kecil', m: 'Sedang', l: 'Besar' };
export function applyFs() { document.documentElement.dataset.fs = prefs.fs ?? 'm'; }
applyFs();

/* ---------------- pengubah HTML materi ---------------- */
const cleanName = (n: string) => n.replace(/<[^>]+>/g, '').replace(/\(.*?\)/g, '').replace(/^((Kolonel|Letkol|Mayor|Mayjen|Brigjen|Jenderal|Laksamana|Teungku|HR|R\.|Dr\.|dr\.|Mr\.|Prof\.)\s+)+/g, '').trim();
function avatar(name: string) {
  const n = cleanName(name);
  return `<span class="av" style="--av:${hashColor(n)}" aria-hidden="true">${esc(initials(n))}</span>`;
}

function enhance(html: string): { body: string; inti: string } {
  let inti = '';
  let h = html.replace(/<p class="inti"><strong>Inti:<\/strong>\s*([\s\S]*?)<\/p>/, (_, t) => { inti = t.trim(); return ''; });

  // kronologi: tabel Tanggal | Peristiwa -> garis waktu vertikal
  h = h.replace(/<div class="table-scroll"><table><thead><tr><th>Tanggal<\/th><th>[^<]*<\/th><\/tr><\/thead><tbody>([\s\S]*?)<\/tbody><\/table><\/div>/g, (_, rows: string) => {
    const items = [...rows.matchAll(/<tr><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><\/tr>/g)];
    return `<ol class="kron">${items.map(m => `<li><time>${m[1]}</time><div>${m[2]}</div></li>`).join('')}</ol>`;
  });

  // delegasi: tabel Pihak | Anggota -> kartu per pihak
  h = h.replace(/<div class="table-scroll"><table><thead><tr><th>Pihak<\/th><th>Anggota<\/th><\/tr><\/thead><tbody>([\s\S]*?)<\/tbody><\/table><\/div>/g, (_, rows: string) => {
    const items = [...rows.matchAll(/<tr><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><\/tr>/g)];
    const tone = (p: string) => (/indonesia/i.test(p) ? 'red' : /belanda/i.test(p) ? 'blue' : 'amber');
    return `<div class="delg">${items.map(m => {
      const lead = m[2].match(/<strong>([\s\S]*?)<\/strong>(\s*\([^)]*\))?/);
      const rest = m[2].replace(/<strong>[\s\S]*?<\/strong>(\s*\([^)]*\))?,?\s*/, '').trim();
      return `<div class="delg-c t-${tone(m[1])}"><span class="delg-k"><i></i>${m[1]}</span>${lead ? `<div class="delg-lead">${avatar(lead[1])}<div><b>${lead[1]}</b><small>${(lead[2] ?? '').replace(/[()]/g, '').trim() || 'ketua'}</small></div></div>` : ''}${rest ? `<p>${rest}</p>` : ''}</div>`;
    }).join('')}</div>`;
  });

  // tabel satu baris (perbandingan / ketua delegasi) -> kartu berdampingan
  h = h.replace(/<div class="table-scroll"><table><thead><tr>((?:<th>[^<]+<\/th>){2,3})<\/tr><\/thead><tbody>\s*<tr>((?:<td>[\s\S]*?<\/td>){2,3})<\/tr>\s*<\/tbody><\/table><\/div>/g, (all, ths: string, tds: string) => {
    const hs = [...ths.matchAll(/<th>([^<]+)<\/th>/g)].map(m => m[1]);
    const ds = [...tds.matchAll(/<td>([\s\S]*?)<\/td>/g)].map(m => m[1]);
    if (hs.length !== ds.length) return all;
    const tone = (p: string) => (/indonesia/i.test(p) ? 'red' : /belanda/i.test(p) ? 'blue' : 'amber');
    return `<div class="cmp n${hs.length}">${hs.map((t, i) => `<div class="cmp-c t-${tone(t)}"><span class="delg-k"><i></i>${t}</span><p>${ds[i]}</p></div>`).join('')}</div>`;
  });

  // daftar tokoh -> kartu dengan inisial
  h = h.replace(/<ul class="tk-list">([\s\S]*?)<\/ul>/g, (_, lis: string) =>
    `<ul class="tk-grid">${[...lis.matchAll(/<li><strong>([\s\S]*?)<\/strong>\s*&ndash;\s*([\s\S]*?)<\/li>/g)].map(m =>
      `<li>${avatar(m[1])}<div><b>${m[1]}</b><span>${m[2].replace(/\.$/, '')}</span></div></li>`).join('')}</ul>`);

  // catatan modul dan kotak kunci lain
  h = h.replace(/<p class="catatan"><strong>Catatan:<\/strong>\s*([\s\S]*?)<\/p>/g, (_, t) =>
    `<aside class="rd-note"><span class="ni">${icon('info')}</span><div><b>Catatan</b><p>${t}</p></div></aside>`);
  h = h.replace(/<p class="inti"><strong>([\s\S]*?)<\/strong>\s*([\s\S]*?)<\/p>/g, (_, k, t) =>
    `<aside class="rd-key"><span class="ni">${icon('key')}</span><div><b>${k.replace(/:$/, '')}</b><p>${t}</p></div></aside>`);

  // tabel lain: tetap tabel, dengan wadah geser
  return { body: h, inti };
}

/* ---------------- potongan tampilan ---------------- */
function facts(id: string) {
  const f = SEKILAS[id]; if (!f) return '';
  const row = (ic: string, k: string, v: string, cls = '') => `<div class="${cls}"><dt>${icon(ic)}${k}</dt><dd>${v}</dd></div>`;
  return `<aside class="rd-facts" aria-label="Sekilas">
    <span class="rd-facts-h">Sekilas</span>
    <dl>
      ${row('calendar', 'Kapan', esc(f.kapan))}
      ${row('pin', 'Di mana', esc(f.dimana))}
      ${row('users', 'Pihak', esc(f.pihak))}
      ${row('user', 'Tokoh', f.tokoh.map(t => `<span class="chip">${esc(t)}</span>`).join(''), 'tk')}
      ${row('flag', 'Hasil', esc(f.hasil), 'res')}
    </dl>
  </aside>`;
}

function cekBlock(id: string) {
  const qs = (CEK[id] ?? []).map(q => QMAP.get(q)).filter((q): q is Question => !!q && q.kind === 'mcq');
  if (!qs.length) return '';
  return `<section class="rd-cek" aria-label="Cek pemahaman">
    <header><span class="ci">${icon('target')}</span><div><b>Cek pemahaman</b><small>${qs.length} soal singkat dari subbab ini. Pilih satu jawaban.</small></div></header>
    ${qs.map((q, n) => `<div class="cek-q" data-q="${q.id}">
      <p class="cek-p"><span class="cek-n">${n + 1}</span><span>${esc(q.prompt)}</span></p>
      <div class="cek-opts">${q.options.map(o => `<button type="button" data-act="cek" data-q="${q.id}" data-o="${o.id}"><span class="k">${o.id}</span><span class="t">${o.html}</span></button>`).join('')}</div>
      <div class="cek-fb" aria-live="polite"></div>
    </div>`).join('')}
  </section>`;
}

function partIntro(p: Part, secs: LessonSection[]) {
  const list = secs.filter(s => s.part === p);
  return `<section class="rd-part t-${partTone(p)}" id="part-${p}">
    <span class="rd-part-l" aria-hidden="true">${partLetter(p)}</span>
    <div class="rd-part-t">
      <span class="eyebrow"><span class="dot"></span>Bagian ${partLetter(p)} &middot; ${list.length} subbab</span>
      <h2>${esc(partName(p))}</h2>
      <p>${esc(PART_TEXT[p])}</p>
    </div>
    <ol class="rd-part-list">${list.map(s => `<li><a href="#/bab/3/materi/${s.id}"><span>${esc(s.number)}</span>${esc(s.title)}</a></li>`).join('')}</ol>
  </section>`;
}

function section(s: LessonSection, i: number, secs: LessonSection[]) {
  const { body, inti } = enhance(s.lead);
  const tone = partTone(s.part!);
  const inPart = secs.filter(x => x.part === s.part);
  const pos = inPart.indexOf(s) + 1;
  const prev = secs[i - 1]; const next = secs[i + 1];
  const pn = `<nav class="rd-pn" aria-label="Subbab lain">
    ${prev ? `<a class="prev" href="#/bab/3/materi/${prev.id}"><small>${icon('back')} Sebelumnya</small><b><span>${esc(prev.number)}</span>${esc(prev.title)}</b></a>` : '<span></span>'}
    ${next ? `<a class="next" href="#/bab/3/materi/${next.id}"><small>Berikutnya ${icon('arrow')}</small><b><span>${esc(next.number)}</span>${esc(next.title)}</b></a>`
      : `<a class="next end" href="#/bab/3/latihan"><small>Selesai ${icon('arrow')}</small><b>Kerjakan latihan soal</b></a>`}
  </nav>`;
  return `<article class="rd-sec t-${tone}" id="s-${s.id}" data-sec="${s.id}">
    <header class="rd-h">
      <div class="rd-kick"><span class="rd-no">${esc(s.number)}</span><span>${esc(partName(s.part!))}</span><span class="sep"></span><span>${pos} dari ${inPart.length}</span></div>
      <h2>${esc(s.title)}</h2>
      ${s.date ? `<p class="rd-date">${icon('calendar')}${esc(s.date)}</p>` : ''}
    </header>
    <div class="rd-gist"><span class="lbl">Intinya</span><p>${inti || esc(s.sum ?? '')}</p></div>
    <div class="rd-grid">
      <div class="rd-body prose">${body}</div>
      ${facts(s.id)}
    </div>
    ${cekBlock(s.id)}
    ${pn}
  </article>`;
}

function toc(secs: LessonSection[]) {
  const parts: Part[] = ['fisik', 'diplomasi'];
  return `<aside class="rd-toc" id="rd-toc" aria-label="Daftar subbab">
    <div class="rd-toc-in">
      <div class="rd-toc-head"><span><b>Daftar isi</b><small>Bab III &middot; ${secs.length} subbab</small></span><button type="button" class="rd-x" data-act="toc-close" aria-label="Tutup daftar isi">${icon('x')}</button></div>
      <div class="rd-toc-scroll"><nav class="rd-toc-nav"><span class="ind" aria-hidden="true"></span>
        ${parts.map(p => `<div class="grp t-${partTone(p)}"><a class="gl" href="#/bab/3/materi/${secs.find(s => s.part === p)!.id}"><i></i>${partLetter(p)} &middot; ${esc(partName(p))}</a>
          ${secs.filter(s => s.part === p).map(s => `<a href="#/bab/3/materi/${s.id}" data-sec="${s.id}"><span class="no">${esc(s.number)}</span><span class="t">${esc(s.title)}</span></a>`).join('')}
        </div>`).join('')}
      </nav></div>
      <div class="rd-toc-foot"><span>Ukuran teks</span><div class="fs-seg" role="group" aria-label="Ukuran teks">${(['s', 'm', 'l'] as FS[]).map(v => `<button type="button" data-act="fs" data-v="${v}" aria-pressed="${(prefs.fs ?? 'm') === v}" aria-label="${FS_LABEL[v]}" class="fs-${v}">A</button>`).join('')}</div></div>
    </div>
  </aside>
  <div class="rd-scrim" data-act="toc-close"></div>`;
}

export function materiView(n: number) {
  const ch = chapterById(n)!; const secs = ch.sections;
  let last: Part | undefined;
  const first = secs[0];
  return `<div class="rd-wrap">
    <button type="button" class="rd-bar t-${partTone(first.part!)}" data-act="toc-open" aria-controls="rd-toc" aria-label="Buka daftar isi">
      <span class="ic">${icon('list')}</span><span class="no" id="rd-bar-no">${esc(first.number)}</span><span class="t" id="rd-bar-t">${esc(first.title)}</span><span class="cnt" id="rd-bar-c">1/${secs.length}</span>${icon('down', 'ico chev')}
    </button>
    <div class="rd">
      ${toc(secs)}
      <div class="rd-main">
        ${secs.map((s, i) => { const head = s.part !== last ? partIntro(s.part!, secs) : ''; last = s.part; return head + section(s, i, secs); }).join('')}
        <div class="rk-end"><div><span class="eyebrow light">Akhir materi</span><b>Lanjut ke latihan</b><p>Soal asesmen perjuangan bersenjata dan diplomasi, lengkap dengan pembahasan.</p></div><div class="btns"><a class="btn btn-primary" href="#/bab/${n}/latihan">${icon('target')} Mulai latihan</a></div></div>
      </div>
    </div>
  </div>`;
}

/* ---------------- perilaku ---------------- */
let spy: IntersectionObserver | null = null;
let active = '';

function moveInd(a: HTMLElement | null, instant = false) {
  const ind = $<HTMLElement>('.rd-toc-nav .ind'); if (!ind || !a) return;
  if (instant) ind.style.transition = 'none';
  ind.style.transform = `translate3d(0, ${a.offsetTop}px, 0)`;
  ind.style.height = `${a.offsetHeight}px`;
  ind.style.opacity = '1';
  if (instant) { void ind.offsetWidth; ind.style.transition = ''; }
}

function setActive(id: string, instant = false) {
  if (id === active && !instant) return; active = id;
  const secs = chapterById(3)!.sections; const s = secs.find(x => x.id === id); if (!s) return;
  let link: HTMLElement | null = null;
  $$<HTMLAnchorElement>('.rd-toc-nav a[data-sec]').forEach(a => { const on = a.dataset.sec === id; a.classList.toggle('active', on); if (on) { a.setAttribute('aria-current', 'location'); link = a; } else a.removeAttribute('aria-current'); });
  moveInd(link, instant);
  const bar = $<HTMLElement>('.rd-bar');
  if (bar) {
    bar.classList.remove('t-red', 't-blue'); bar.classList.add('t-' + partTone(s.part!));
    $('#rd-bar-no')!.textContent = s.number; $('#rd-bar-t')!.textContent = s.title; $('#rd-bar-c')!.textContent = `${secs.indexOf(s) + 1}/${secs.length}`;
  }
  // jaga tautan aktif tetap terlihat di daftar isi desktop
  const sc = $<HTMLElement>('.rd-toc-scroll');
  if (sc && link && innerWidth > 980) {
    const l = link as HTMLElement; const top = l.offsetTop; const h = sc.clientHeight;
    if (top < sc.scrollTop + 40 || top > sc.scrollTop + h - 80) sc.scrollTo({ top: Math.max(0, top - h / 3), behavior: reduced() ? 'auto' : 'smooth' });
  }
}

function openToc() {
  document.documentElement.classList.add('toc-open');
  const a = $<HTMLElement>('.rd-toc-nav a.active');
  requestAnimationFrame(() => { moveInd(a, true); a?.scrollIntoView({ block: 'center' }); });
}
function closeToc() { document.documentElement.classList.remove('toc-open'); }

export function mountReader(): () => void {
  const root = $('.rd'); if (!root) return () => {};
  const sc = $<HTMLElement>('.rd-toc-scroll'); if (sc) attachScrollbar(sc, 'y');
  spy?.disconnect();
  spy = new IntersectionObserver(es => {
    const vis = es.filter(e => e.isIntersecting);
    if (vis.length) setActive((vis[0].target as HTMLElement).dataset.sec!);
  }, { rootMargin: '-28% 0px -66% 0px' });
  $$('.rd-sec').forEach(s => spy!.observe(s));
  active = '';
  setActive(chapterById(3)!.sections[0].id, true);
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeToc(); };
  const onResize = () => { if (innerWidth > 980) closeToc(); moveInd($('.rd-toc-nav a.active'), true); };
  addEventListener('keydown', onKey); addEventListener('resize', onResize);
  document.fonts?.ready.then(() => moveInd($('.rd-toc-nav a.active'), true));
  return () => { spy?.disconnect(); spy = null; closeToc(); removeEventListener('keydown', onKey); removeEventListener('resize', onResize); };
}

function answer(el: HTMLElement) {
  const q = QMAP.get(el.dataset.q!); if (!q) return;
  const box = el.closest<HTMLElement>('.cek-q')!;
  if (box.classList.contains('done')) return;
  const pick = el.dataset.o!; const ok = pick === q.correct;
  box.classList.add('done', ok ? 'ok' : 'no');
  $$<HTMLButtonElement>('button[data-act="cek"]', box).forEach(b => {
    b.disabled = true;
    if (b.dataset.o === q.correct) b.classList.add('right');
    else if (b.dataset.o === pick) b.classList.add('wrong');
  });
  const ans = q.options.find(o => o.id === q.correct)!;
  box.querySelector('.cek-fb')!.innerHTML = `<div class="fbx ${ok ? 'ok' : 'no'}"><span class="fi">${icon(ok ? 'check' : 'x')}</span><div><b>${ok ? 'Tepat' : `Belum tepat. Jawabannya ${ans.id}. ${esc(ans.text)}`}</b><p>${esc(q.explanation ?? '')}</p><button type="button" class="cek-re" data-act="cek-re">${icon('repeat')} Ulangi soal</button></div></div>`;
}
function resetQ(el: HTMLElement) {
  const box = el.closest<HTMLElement>('.cek-q')!;
  box.classList.remove('done', 'ok', 'no');
  $$<HTMLButtonElement>('button[data-act="cek"]', box).forEach(b => { b.disabled = false; b.classList.remove('right', 'wrong'); });
  box.querySelector('.cek-fb')!.innerHTML = '';
}

/** menangani klik data-act milik halaman Materi; true bila ditangani */
export function readerClick(act: string, el: HTMLElement): boolean {
  switch (act) {
    case 'toc-open': openToc(); return true;
    case 'toc-close': closeToc(); return true;
    case 'cek': answer(el); return true;
    case 'cek-re': resetQ(el); return true;
    case 'fs': {
      const anchor = $$<HTMLElement>('.rd-sec').find(s => s.getBoundingClientRect().bottom > 120);
      const before = anchor?.getBoundingClientRect().top ?? 0;
      prefs.fs = el.dataset.v as FS; savePrefs(); applyFs();
      $$('[data-act="fs"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === prefs.fs)));
      if (anchor) scrollBy(0, anchor.getBoundingClientRect().top - before);
      moveInd($('.rd-toc-nav a.active'), true);
      return true;
    }
  }
  return false;
}

/* tutup lembar daftar isi saat tautan dipilih (ponsel) */
document.addEventListener('click', e => {
  const a = (e.target as HTMLElement).closest('.rd-toc a');
  if (a && document.documentElement.classList.contains('toc-open')) closeToc();
});
