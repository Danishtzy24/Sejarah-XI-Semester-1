import type { Question } from './types';
import { esc, icon } from './lib';
import { hscroll, initHScroll, centerInTrack } from './ui';

type Ans = { pick?: string; text?: string; self?: number; shown?: boolean };
interface Session { key: string; title: string; qs: Question[]; i: number; ans: Record<string, Ans>; done: boolean; }
let S: Session | null = null;

const KIND: Record<Question['kind'], string> = { mcq: 'Pilihan ganda', tf: 'Benar atau salah', essay: 'Uraian' };
const srcLabel = (q: Question) => `Modul: ${q.set === 'fisik' ? 'bersenjata' : 'diplomasi'} ${q.kind === 'essay' ? 'uraian ' + (q.no - 100) : 'no. ' + q.no}`;

function score(q: Question, a?: Ans): number | null {
  if (!a) return null;
  if (q.kind === 'essay') return a.self ?? null;
  if (!a.pick) return null;
  return a.pick === q.correct ? 1 : 0;
}

export function quizView(key: string, title: string, qs: Question[], tone: string): string {
  const c = { mcq: 0, tf: 0, essay: 0 }; qs.forEach(q => c[q.kind]++);
  return `<div class="qz t-${tone}" id="quiz" data-key="${key}">
    <div class="qz-start">
      <div class="qz-badge">${icon('target')}</div>
      <h2>${esc(title)}</h2>
      <p>${c.essay ? 'Pilihan ganda langsung dikoreksi. Untuk uraian, tulis jawabanmu lalu cocokkan dengan poin kunci jawaban.' : 'Setiap jawaban langsung dikoreksi dan diberi pembahasan singkat.'}</p>
      <div class="qz-kinds" style="--n:${[c.mcq, c.tf, c.essay].filter(Boolean).length}">
        ${c.mcq ? `<div><b>${c.mcq}</b><span>Pilihan ganda</span></div>` : ''}${c.tf ? `<div><b>${c.tf}</b><span>Benar/Salah</span></div>` : ''}${c.essay ? `<div><b>${c.essay}</b><span>Uraian</span></div>` : ''}
      </div>
      <button class="btn btn-primary btn-lg" data-act="qz-start">${icon('play')} Mulai ${qs.length} soal</button>
    </div></div>`;
}

export function startQuiz(key: string, title: string, qs: Question[]) {
  S = { key, title, qs, i: 0, ans: {}, done: false };
  draw();
}

function dots() {
  return `<div class="qz-dots">${hscroll(S!.qs.map((q, i) => {
    const s = score(q, S!.ans[q.id]);
    const cls = i === S!.i ? 'cur' : s === null ? '' : s === 1 ? 'ok' : s === 0 ? 'no' : 'mid';
    return `<button class="${cls}" data-act="qz-go" data-i="${i}" aria-label="Soal ${i + 1}">${i + 1}</button>`;
  }).join(''), { label: 'Nomor soal', controls: false })}</div>`;
}

function optsHTML(q: Question, a: Ans) {
  const answered = !!a.pick;
  const tf = q.kind === 'tf';
  return `<div class="opts${tf ? ' tf' : ''}" role="group" aria-label="Pilihan jawaban">${q.options.map(o => {
    let cls = '';
    if (answered) cls = o.id === q.correct ? 'right' : o.id === a.pick ? 'wrong' : 'dim';
    const label = tf ? icon(o.id === 'T' ? 'check' : 'x') : o.id;
    const mark = answered && o.id === q.correct ? icon('check') : answered && o.id === a.pick ? icon('x') : '';
    return `<button class="opt ${cls}" data-act="qz-pick" data-id="${o.id}" ${answered ? 'disabled' : ''}><span class="l">${label}</span><span class="t">${o.html}</span><span class="r">${mark}</span></button>`;
  }).join('')}</div>`;
}

function feedback(q: Question, a: Ans) {
  if (q.kind === 'essay') {
    if (!a.shown) return '';
    return `<div class="fb info"><span class="fi">${icon('book')}</span><div><b>Kunci jawaban</b><p>${esc(q.rubric ?? '')}</p>
      <p class="self-q">Seberapa cocok jawabanmu?</p>
      <div class="self"><button class="chip-btn ${a.self === 1 ? 'on ok' : ''}" data-act="qz-self" data-v="1">${icon('check')} Sudah tepat</button>
      <button class="chip-btn ${a.self === 0.5 ? 'on mid' : ''}" data-act="qz-self" data-v="0.5">Sebagian</button>
      <button class="chip-btn ${a.self === 0 ? 'on no' : ''}" data-act="qz-self" data-v="0">${icon('x')} Belum</button></div></div></div>`;
  }
  if (!a.pick) return '';
  const ok = a.pick === q.correct;
  const right = q.options.find(o => o.id === q.correct);
  const ans = q.kind === 'tf' ? (q.correct === 'T' ? 'Benar' : 'Salah') : `${q.correct}. ${right?.text ?? ''}`;
  return `<div class="fb ${ok ? 'ok' : 'no'}" role="status"><span class="fi">${icon(ok ? 'check' : 'x')}</span><div><b>${ok ? 'Jawabanmu benar' : `Kurang tepat. Jawaban: ${esc(ans)}`}</b><p>${esc(q.explanation ?? '')}</p></div></div>`;
}

function draw() {
  const root = document.getElementById('quiz'); if (!root || !S) return;
  if (S.done) return result(root);
  const q = S.qs[S.i]; const a = S.ans[q.id] ?? (S.ans[q.id] = {});
  const answeredCount = S.qs.filter(x => score(x, S!.ans[x.id]) !== null).length;
  const canNext = score(q, a) !== null;
  const last = S.i === S.qs.length - 1;
  root.innerHTML = `
    <div class="qz-top"><button class="icon-btn" data-act="qz-quit" aria-label="Keluar dari kuis">${icon('x')}</button><div class="bar"><i style="width:${(answeredCount / S.qs.length) * 100}%"></i></div><span class="count">${answeredCount}/${S.qs.length} dijawab</span></div>
    ${dots()}
    <article class="qz-card" aria-live="polite">
      <div class="qz-meta"><span class="qz-num">Soal ${S.i + 1}</span><span class="qz-kind">${KIND[q.kind]}</span><span class="qz-src">${srcLabel(q)}</span></div>
      <div class="qz-prompt">${esc(q.prompt)}</div>
      ${q.img ? `<figure class="qz-img"><img src="${q.img}" alt="Gambar untuk soal ${S.i + 1}" decoding="async"></figure>` : ''}
      ${q.kind === 'essay'
        ? `<div class="essay"><label class="sr" for="essay">Jawabanmu</label><textarea id="essay" placeholder="Tulis jawabanmu di sini, boleh dalam bentuk poin…">${esc(a.text ?? '')}</textarea>
           ${a.shown ? '' : `<div class="self"><button class="btn btn-dark btn-sm" data-act="qz-show">${icon('book')} Lihat kunci jawaban</button></div>`}</div>`
        : optsHTML(q, a)}
      ${feedback(q, a)}
      <div class="qz-nav">
        <button class="btn btn-ghost btn-sm" data-act="qz-prev" ${S.i === 0 ? 'disabled' : ''}>${icon('back')} Sebelumnya</button>
        ${last
          ? `<button class="btn btn-primary btn-sm" data-act="qz-finish">Lihat hasil ${icon('arrow')}</button>`
          : `<button class="btn ${canNext ? 'btn-primary' : 'btn-ghost'} btn-sm" data-act="qz-next">${canNext ? 'Soal berikutnya' : 'Lewati'} ${icon('arrow')}</button>`}
      </div>
    </article>`;
  initHScroll(root); centerInTrack(root.querySelector<HTMLElement>('.qz-dots .cur'));
  const ta = root.querySelector<HTMLTextAreaElement>('#essay');
  ta?.addEventListener('input', () => { a.text = ta.value; });
}

function result(root: HTMLElement) {
  const s = S!;
  let sum = 0, ok = 0, no = 0, blank = 0;
  s.qs.forEach(q => { const v = score(q, s.ans[q.id]); if (v === null) blank++; else { sum += v; if (v === 1) ok++; else if (v === 0) no++; } });
  const half = s.qs.length - ok - no - blank;
  const val = Math.round((sum / s.qs.length) * 100);
  const msg = val >= 85 ? ['Luar biasa', 'Kamu sudah menguasai materi ini dengan sangat baik.'] : val >= 70 ? ['Bagus', 'Sebagian besar sudah paham. Bahas lagi soal yang salah, ya.'] : val >= 50 ? ['Lumayan, terus semangat', 'Baca ulang bagian Ringkas, lalu coba lagi.'] : ['Ayo coba lagi', 'Mulai dari ringkasan visual dulu. Pelan-pelan pasti bisa.'];
  const tone = val >= 70 ? 'var(--c-green)' : val >= 50 ? 'var(--c-amber)' : 'var(--c-red)';
  root.innerHTML = `<div class="qz-result">
    <div class="score" style="--p:${val};--tone:${tone}"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="tr"/><circle cx="60" cy="60" r="52" class="fg" pathLength="100" style="stroke-dasharray:${val} 100"/></svg><div><b>${val}</b><span>nilai</span></div></div>
    <h2>${msg[0]}</h2><p>${msg[1]}</p>
    <div class="qz-stats"><div><b style="color:var(--c-green)">${ok}</b><span>Benar</span></div><div><b style="color:var(--c-red)">${no}</b><span>Salah</span></div>${half ? `<div><b style="color:var(--c-amber)">${half}</b><span>Sebagian</span></div>` : ''}<div><b>${blank}</b><span>Dilewati</span></div></div>
    <div class="row-c"><button class="btn btn-primary" data-act="qz-start">${icon('repeat')} Ulangi</button><button class="btn btn-ghost" data-act="qz-review">${icon('list')} Lihat pembahasan</button></div>
    <div class="review" id="review" hidden>${s.qs.map((q, i) => {
      const v = score(q, s.ans[q.id]);
      const cls = v === 1 ? 'ok' : v === 0 ? 'no' : v === null ? 'none' : 'mid';
      const right = q.kind === 'essay' ? q.rubric : (q.kind === 'tf' ? (q.correct === 'T' ? 'Benar' : 'Salah') : q.correct + '. ' + (q.options.find(o => o.id === q.correct)?.text ?? '')) + '. ' + (q.explanation ?? '');
      return `<div class="rv"><span class="s ${cls}">${i + 1}</span><div><b>${esc(q.prompt)}</b><p>${esc(right ?? '')}</p></div></div>`;
    }).join('')}</div></div>`;
}

export function quizClick(act: string, el: HTMLElement): boolean {
  if (!act.startsWith('qz-')) return false;
  const root = document.getElementById('quiz');
  if (act === 'qz-start') {
    const key = root?.dataset.key; if (!key) return true;
    window.dispatchEvent(new CustomEvent('quiz-start', { detail: key }));
    return true;
  }
  if (!S) return true;
  const q = S.qs[S.i]; const a = S.ans[q.id] ?? (S.ans[q.id] = {});
  switch (act) {
    case 'qz-pick': if (!a.pick) { a.pick = el.dataset.id; draw(); } break;
    case 'qz-show': a.shown = true; draw(); break;
    case 'qz-self': a.self = Number(el.dataset.v); draw(); break;
    case 'qz-prev': if (S.i > 0) { S.i--; draw(); } break;
    case 'qz-next': if (S.i < S.qs.length - 1) { S.i++; draw(); } break;
    case 'qz-go': S.i = Number(el.dataset.i); draw(); break;
    case 'qz-finish': {
      const blank = S.qs.filter(x => score(x, S!.ans[x.id]) === null).length;
      if (blank && !confirm(`Masih ada ${blank} soal yang belum dijawab. Tetap lihat hasil?`)) break;
      S.done = true; draw(); break;
    }
    case 'qz-review': { const r = document.getElementById('review'); if (r) r.hidden = !r.hidden; break; }
    case 'qz-quit': if (confirm('Keluar dari latihan? Jawabanmu akan hilang.')) { S = null; window.dispatchEvent(new HashChangeEvent('hashchange')); } break;
  }
  if (['qz-prev', 'qz-next', 'qz-finish', 'qz-go'].includes(act)) document.getElementById('quiz')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  return true;
}

export const resetQuiz = () => { S = null; };
