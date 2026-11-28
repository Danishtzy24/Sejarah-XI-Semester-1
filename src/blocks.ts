import type { Block, Ringkas } from './types';
import { md, esc, icon, initials, hashColor } from './lib';
import { hscroll } from './ui';

const H = (ic: string, title: string, sub = '') => `<header class="blk-h"><span class="hi">${icon(ic)}</span><div><h3>${md(title)}</h3>${sub ? `<p>${sub}</p>` : ''}</div></header>`;

function callout(cls: string, ic: string, title: string, items: string[]) {
  return `<aside class="callout ${cls} reveal"><div class="ci">${icon(ic)}</div><div><h4>${esc(title)}</h4><ul>${items.map(i => `<li>${md(i)}</li>`).join('')}</ul></div></aside>`;
}

export function renderBlock(b: Block): string {
  switch (b.type) {
    case 'inti':
      return `<section class="inti-wrap reveal"><div class="inti-head"><span class="pill">${icon('zap')} Inti bab</span><span>Tiga hal terpenting di bab ini</span></div><div class="inti">${b.items.map((it, i) => `
        <article class="inti-card"><div class="inti-top"><span class="i">${icon(it.icon)}</span><span class="k">${String(i + 1).padStart(2, '0')}</span></div><h4>${md(it.title)}</h4><p>${md(it.text)}</p></article>`).join('')}</div></section>`;
    case 'timeline':
      return `<section class="blk reveal">${H('calendar', b.title, 'Titik penuh menandai peristiwa kunci')}<ol class="vt">${b.items.map(it => `
        <li class="vt-item${it.hot ? ' hot' : ''}"><time class="d">${esc(it.date)}</time><span class="pin"></span><div class="c"><b>${md(it.title)}</b>${it.text ? `<p>${md(it.text)}</p>` : ''}</div></li>`).join('')}</ol></section>`;
    case 'alur':
      return `<section class="blk reveal">${H('route', b.title, 'Urutan dari kiri ke kanan')}<ol class="flow">${b.steps.map((s, i) => `
        <li class="flow-step"><div class="box"><span class="n">${i + 1}</span><div><b>${md(s.label)}</b><p>${md(s.text)}</p></div></div><span class="arr">${icon('arrow')}</span></li>`).join('')}</ol></section>`;
    case 'tokoh':
      return `<section class="blk blk-hs reveal">${H('users', b.title, `${b.items.length} tokoh &middot; geser untuk melihat semua`)}${hscroll(b.items.map(t => `
        <div class="tk"><span class="av" style="--av:${hashColor(t.name)}" aria-hidden="true">${esc(initials(t.name))}</span><div>${t.tag ? `<span class="tag">${esc(t.tag)}</span>` : ''}<b>${md(t.name)}</b><p>${md(t.role)}</p></div></div>`).join(''), { label: b.title, cls: 'tokoh' })}</section>`;
    case 'vs':
      return `<section class="blk reveal">${H('columns', b.title)}<div class="vs" style="--ta:var(--c-${b.a.tone});--tb:var(--c-${b.b.tone})">
        <div class="vs-head"><div></div><div class="a">${esc(b.a.label)}</div><div class="b">${esc(b.b.label)}</div></div>
        ${b.rows.map(r => `<div class="vs-row"><div class="asp">${esc(r.aspect)}</div><div class="a">${md(r.a)}</div><div class="b">${md(r.b)}</div></div>`).join('')}</div></section>`;
    case 'table':
      return `<section class="blk reveal">${H('table', b.title)}<div class="tbl-wrap" tabindex="0" role="region" aria-label="${esc(b.title)}"><table class="tbl"><thead><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`;
    case 'grid':
      return `<section class="blk reveal">${H('grid', b.title)}<div class="gcards">${b.items.map(g => `
        <article class="gc${g.tone ? ' t-' + g.tone : ''}"><div class="top">${g.icon ? `<span class="gi">${icon(g.icon)}</span>` : ''}<b>${md(g.title)}</b>${g.tag ? `<span class="tg">${esc(g.tag)}</span>` : ''}</div>${g.meta ? `<span class="meta">${md(g.meta)}</span>` : ''}<p>${md(g.text)}</p></article>`).join('')}</div></section>`;
    case 'list':
      return `<section class="blk reveal">${H(b.ordered ? 'ordered' : 'list', b.title)}<ol class="rlist${b.ordered ? '' : ' ul'}">${b.items.map(i => `<li><span class="m">${b.ordered ? '' : icon('check')}</span><span>${md(i)}</span></li>`).join('')}</ol></section>`;
    case 'quote':
      return `<figure class="quote reveal"><span class="qm">${icon('quote')}</span><blockquote><p>${md(b.text)}</p></blockquote><figcaption>${esc(b.by)}</figcaption></figure>`;
    case 'ingat': return callout('c-ingat', 'bulb', 'Wajib ingat', b.items);
    case 'jebakan': return callout('c-jebak', 'alert', 'Awas, sering tertukar', b.items);
    case 'jembatan': return callout('c-jembatan', 'key', 'Cara gampang menghafal', b.items);
    case 'note': return callout('c-note', 'info', b.title, b.items);
  }
  return '';
}

export function renderRingkas(r: Ringkas, chapter: number): string {
  return `<div class="rk">${r.blocks.map(renderBlock).join('')}
    <div class="rk-end reveal"><div><span class="eyebrow light">Akhir ringkasan</span><b>Lanjut ke langkah 2 atau 3</b><p>Baca penjelasan lengkap, atau langsung kerjakan soal.</p></div>
    <div class="btns"><a class="btn btn-line" href="#/bab/${chapter}/materi">${icon('book')} Materi lengkap</a><a class="btn btn-primary" href="#/bab/${chapter}/latihan">${icon('target')} Latihan soal</a></div></div></div>`;
}
