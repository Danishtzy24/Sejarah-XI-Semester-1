import { COURSE } from './content';
import type { Chapter, Question, QuizSession, SavedState } from './types';

const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector(sel) as unknown as T;
const $$ = <T extends Element = HTMLElement>(sel: string) => [...document.querySelectorAll(sel) as unknown as T[]];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- icons ---------- */
const ICONS: Record<string, string> = {
  arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  'arrow-down': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  'arrow-up': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  home: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H10v7H5a1 1 0 0 1-1-1z"/></svg>',
  book: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 5.5v14"/></svg>',
  quiz: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1.5 1-1.5 2"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>',
  'check-circle': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
  expand: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 10 5 5 5-5"/></svg>',
  flag: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></svg>',
  note: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 13h6M9 17h4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6z"/></svg>',
  redo: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.3-5.6"/><path d="M4 4v5h5"/></svg>',
};
function icon(name: string): string { return ICONS[name] || ''; }
function fillIcons(root: ParentNode = document): void {
  root.querySelectorAll('[data-icon]').forEach(n => {
    const el = n as HTMLElement;
    el.innerHTML = icon(el.dataset.icon || '');
  });
}

/* ---------- escape ---------- */
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- storage (persist full sessions — fixed pattern) ---------- */
const KEY = 'sejarah-xi-course-v1';
let storageOK = true;
let current = 1;
let saved: SavedState = { version: 1, current: 1, sessions: {} };
try {
  const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
  if (raw?.version === 1 && raw.sessions && typeof raw.sessions === 'object' && !Array.isArray(raw.sessions)) {
    saved = raw;
    current = Number.isInteger(raw.current) && raw.current >= 1 && raw.current <= 10 ? raw.current : 1;
  }
} catch { storageOK = false; }
function save(): void {
  saved.current = current;
  try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { storageOK = false; }
}

/* ---------- session helpers ---------- */
function sid(): string { return String(current); }
function session(): QuizSession | null { return saved.sessions[sid()] || null; }
function chapter(): Chapter { return COURSE.chapters.find(c => c.id === current) || COURSE.chapters[0]; }
function Q(id: string): Question | undefined { return COURSE.questions.find(q => q.id === id); }

function validSession(s: QuizSession | undefined, key: string): boolean {
  if (!s || !Array.isArray(s.order) || !s.options || !s.answers || typeof s.submitted !== 'boolean') return false;
  const expected = key === '10' ? null : (COURSE.chapters.find(c => String(c.id) === key)?.questions ?? null);
  if (expected) {
    if (s.order.length !== expected.length || new Set(s.order).size !== s.order.length) return false;
    for (const id of s.order) if (!expected.includes(id)) return false;
  } else {
    if (s.order.length !== 25 || new Set(s.order).size !== s.order.length) return false;
  }
  for (const id of s.order) {
    const q = Q(id);
    if (!q) return false;
    const opts = s.options[id];
    if (!Array.isArray(opts) || opts.length !== q.options.length || new Set(opts).size !== opts.length) return false;
    if (opts.some(o => !q.options.some(v => v.id === o))) return false;
    if (s.answers[id]) {
      const parts = s.answers[id].split('|');
      if (parts.some(p => !opts.includes(p))) return false;
    }
  }
  return true;
}
for (const key of Object.keys(saved.sessions)) {
  if (!['1','2','3','4','5','6','7','8','9','10'].includes(key) || !validSession(saved.sessions[key], key)) delete saved.sessions[key];
}

function shuffled<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function differentOrder(pool: string[], previous?: string[]): string[] {
  if (!previous || pool.length < 2) return shuffled(pool);
  for (let t = 0; t < 8; t++) {
    const next = shuffled(pool);
    if (next.some((id, i) => id === previous[i])) return next;
  }
  return shuffled(pool);
}
function makeSession(key = sid()): QuizSession {
  const previous = saved.sessions[key];
  const pool = key === '10'
    ? COURSE.questions.filter(q => q.chapter === 10).map(q => q.id)
    : (COURSE.chapters.find(c => String(c.id) === key)?.questions ?? []);
  const order = differentOrder(pool, previous?.order);
  const options: Record<string, string[]> = {};
  order.forEach(id => {
    const q = Q(id);
    if (!q) return;
    const opts = q.options.map(o => o.id);
    options[id] = opts.length === 2 ? opts : differentOrder(opts, previous?.options?.[id]);
  });
  saved.sessions[key] = { order, options, answers: {}, submitted: false };
  save();
  return saved.sessions[key];
}

/* ---------- grading ---------- */
function isRightAns(q: Question, answer: string | undefined): boolean {
  if (!answer) return false;
  if (q.kind === 'tf' || q.kind === 'mcq') return answer === q.correct;
  return false; // essay graded manually
}
function score(s: QuizSession): { correct: number; wrong: number; blank: number; total: number; value: number } {
  let correct = 0, wrong = 0, blank = 0;
  for (const id of s.order) {
    const q = Q(id);
    if (!q || q.kind === 'essay') continue;
    const a = s.answers[id];
    if (!a) blank++;
    else if (isRightAns(q, a)) correct++;
    else wrong++;
  }
  const total = correct + wrong + blank;
  const value = total ? Math.round((correct / total) * 100) : 0;
  return { correct, wrong, blank, total, value };
}

/* ---------- rendering: chapters nav ---------- */
function renderChapters(): void {
  const nav = $('#chapter-nav');
  const core = COURSE.chapters.filter(c => c.id <= 8);
  nav.innerHTML = core.map(c => {
    const s = saved.sessions[String(c.id)];
    const grade = s?.submitted ? score(s).value : null;
    return `<button class="chapter-button ${c.id === current ? 'active' : ''}" data-chapter="${c.id}" aria-pressed="${c.id === current}">
      <span class="chapter-mini"><img src="./assets/${c.hero}.webp" alt="" width="80" height="60" loading="lazy"></span>
      <span class="chapter-card-copy">
        <small>BAB ${String(c.id).padStart(2, '0')}</small>
        <strong>${esc(c.title)}</strong>
        <span class="chapter-card-meta">${c.sections.length} topik<i></i>${c.questions.length} soal${grade !== null ? `<span class="chapter-score" aria-label="Nilai terakhir ${grade}">${grade}</span>` : ''}</span>
      </span>
    </button>`;
  }).join('') + `<button class="chapter-button chapter-mixed ${current === 9 ? 'active' : ''}" data-chapter="9" aria-pressed="${current === 9}">
      <span class="chapter-mini"><img src="./assets/arsip-hero.webp" alt="" width="80" height="60" loading="lazy"></span>
      <span class="chapter-card-copy">
        <small>ATLAS BELAJAR</small>
        <strong>Kronologi &amp; Tokoh</strong>
        <span class="chapter-card-meta">4 topik<i></i>1945–1950</span>
      </span>
    </button>
    <button class="chapter-button chapter-mixed ${current === 10 ? 'active' : ''}" data-chapter="10" aria-pressed="${current === 10}">
      <span class="chapter-mini"><img src="./assets/arsip-hero.webp" alt="" width="80" height="60" loading="lazy"></span>
      <span class="chapter-card-copy">
        <small>EVALUASI SEMESTER</small>
        <strong>25 Soal Akhir</strong>
        <span class="chapter-card-meta">PG · B/S · Uraian<i></i>diacak</span>
      </span>
    </button>`;
}

/* ---------- rendering: lessons ---------- */
function renderLessons(): void {
  const c = chapter();
  const content = $('#lesson-content');
  if (current >= 9) {
    content.innerHTML = c.sections.map(s => sectionHTML(s.id, s.number, s.title, s.lead)).join('');
    $('#chapter-intro').innerHTML = c.intro ? `<p>${esc(c.intro)}</p>` : '';
    $('#chapter-intro').hidden = !c.intro;
    return;
  }
  content.innerHTML = c.sections.map(s => sectionHTML(s.id, s.number, s.title, s.lead)).join('');
  $('#chapter-intro').innerHTML = c.intro ? `<p>${esc(c.intro)}</p>` : '';
  $('#chapter-intro').hidden = !c.intro;
  $('#toc').innerHTML = c.sections.map((s, i) =>
    `<a href="#sec-${s.id}" class="${i === 0 ? 'active' : ''}"><span>${esc(s.number)}</span>${esc(s.title)}</a>`
  ).join('');
  $('#topic-position').textContent = `01 / ${String(c.sections.length).padStart(2, '0')}`;
  observeSections();
}
function sectionHTML(id: string, number: string, title: string, lead: string): string {
  return `<section class="lesson-section" id="sec-${id}" aria-labelledby="heading-${id}">
    <div class="section-heading"><span class="section-number">${esc(number)}</span><h3 id="heading-${id}">${esc(title)}</h3></div>
    <div class="section-body prose">${lead}</div>
  </section>`;
}

let sectionObs: IntersectionObserver | null = null;
function observeSections(): void {
  sectionObs?.disconnect();
  const readSet = new Set<string>();
  sectionObs = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (!visible.length) return;
    const id = visible[0].target.id.replace(/^sec-/, '');
    $$('#toc a').forEach(a => {
      const active = a.getAttribute('href') === `#sec-${id}`;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
    const c = chapter();
    const idx = c.sections.findIndex(s => s.id === id);
    if (idx >= 0) $('#topic-position').textContent = `${String(idx + 1).padStart(2, '0')} / ${String(c.sections.length).padStart(2, '0')}`;
    if (!readSet.has(id)) {
      readSet.add(id);
      const rf = $('#read-fill');
      if (rf) rf.style.width = `${(readSet.size / c.sections.length) * 100}%`;
    }
  }, { rootMargin: '-80px 0px -55% 0px', threshold: 0 });
  $$('.lesson-section').forEach(s => sectionObs!.observe(s));
}

/* ---------- set chapter ---------- */
function setChapter(value: number, scroll = true): void {
  if (value < 1 || value > 10 || !COURSE.chapters.some(c => c.id === value)) return;
  current = value;
  save();
  renderChapters();
  const c = chapter();
  $('#chapter-kicker').textContent = current === 10 ? 'EVALUASI AKHIR SEMESTER' : current === 9 ? 'ATLAS BELAJAR' : `BAB ${String(c.id).padStart(2, '0')} · ${c.subtitle}`;
  $('#chapter-title').textContent = c.fullTitle + (c.fullTitle.endsWith('.') ? '' : '.');
  $('#chapter-subtitle').textContent = c.subtitle;
  $('#example-text').textContent = c.example;
  $('#material-number').textContent = current === 10 ? '—' : String(c.id).padStart(2, '0');
  $('#toolbar-sub').textContent = `${c.sections.length} topik · ${c.questions.length} soal`;
  $('#hero-question-count').textContent = current === 10 ? '25 soal evaluasi' : `${c.questions.length} soal latihan`;
  const heroImg = $('#hero-image') as HTMLImageElement;
  heroImg.src = `./assets/${c.hero}.webp`;
  heroImg.alt = `Ilustrasi materi ${c.title}`;
  $('#end-title').textContent = c.title;
  const next = $('#next-chapter') as HTMLButtonElement;
  if (current < 8) next.innerHTML = `Bab berikutnya ${icon('arrow')}`;
  else if (current === 8) next.innerHTML = `Atlas belajar ${icon('arrow')}`;
  else if (current === 9) next.innerHTML = `Evaluasi semester ${icon('arrow')}`;
  else next.innerHTML = `Kembali ke pilihan bab ${icon('arrow-up')}`;
  renderLessons();
  renderQuiz();
  // Atlas & Evaluasi: hide sub-materi toolbar / TOC detail controls
  const isAux = current >= 9;
  $('.material-toolbar')!.hidden = isAux;
  $('.toc-panel')!.hidden = isAux;
  $('.lesson-options')!.hidden = isAux;
  $('#chapter-intro').hidden = isAux || !c.intro;
  if (isAux) {
    $('#toc')!.innerHTML = '';
    $('#lesson-content').innerHTML = c.sections.map(s => sectionHTML(s.id, s.number, s.title, s.lead)).join('');
    if (current === 10) {
      $('#lesson-content').innerHTML = `<section class="lesson-section"><div class="section-body prose"><p>Evaluasi akhir semester memuat <strong>25 soal</strong> campuran: pilihan ganda, benar–salah, dan uraian. Urutan soal serta pilihan jawaban diacak setiap kali dimulai. Kerjakan setelah membaca seluruh materi.</p></div></section>`;
    }
  }
  if (scroll) {
    $('.chapter-hero')?.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
    $('#chapter-title')?.setAttribute('tabindex', '-1');
    ($('#chapter-title') as HTMLElement)?.focus({ preventScroll: true });
  }
}

/* ---------- search ---------- */
let searchTimer: ReturnType<typeof setTimeout> | undefined;
function searchTopics(): void {
  const term = ($('#search') as HTMLInputElement).value.trim().toLocaleLowerCase('id');
  const c = chapter();
  const matches = new Set(c.sections.filter(s => !term || s.search.includes(term)).map(s => s.id));
  for (const sec of c.sections) {
    const node = document.getElementById(`sec-${sec.id}`);
    if (!node) continue;
    node.hidden = !matches.has(sec.id);
    const link = $(`#toc a[href="#sec-${sec.id}"]`);
    if (link) link.hidden = !matches.has(sec.id);
  }
  $('#chapter-intro').hidden = !!term;
  $('#search-empty').hidden = matches.size > 0;
  ($('#search-clear') as HTMLButtonElement).hidden = !term;
  $('#search-status').textContent = term ? `${matches.size} dari ${c.sections.length} topik cocok` : '';
  updateDetailToggle();
}
function updateDetailToggle(): void {
  const all = $$<HTMLDetailsElement>('details.source-details');
  const opened = all.length && all.every(d => d.open);
  const btn = $('#detail-toggle');
  btn.lastElementChild!.textContent = opened ? 'Tutup semua detail' : 'Buka semua detail';
  btn.setAttribute('aria-expanded', String(!!opened));
  btn.hidden = all.length === 0;
}

/* ---------- quiz ---------- */
function quizStartHTML(): string {
  const c = chapter();
  const isEval = current === 10;
  const nObj = c.questions.filter(id => Q(id)?.kind !== 'essay').length;
  const nEss = c.questions.filter(id => Q(id)?.kind === 'essay').length;
  return `<div class="quiz-start" data-enter>
    <span class="quiz-emblem">${icon('check-circle')}</span>
    <div>
      <span class="eyebrow">${isEval ? 'EVALUASI AKHIR SEMESTER' : 'LATIHAN BAB'}</span>
      <h3>Coba tanpa melihat catatan.</h3>
      <p>${nObj} soal objektif dinilai otomatis.<br>${nEss} uraian untuk analisis dan refleksi mandiri.</p>
      <span class="quiz-hint">${icon('shuffle')} Urutan soal &amp; pilihan diacak.</span>
    </div>
    <button class="button primary" data-start>Mulai ${isEval ? 'evaluasi' : 'latihan'} ${icon('arrow')}</button>
  </div>`;
}

function questionHTML(q: Question, i: number, s: QuizSession): string {
  const answer = s.answers[q.id];
  const submitted = s.submitted;
  const isObj = q.kind !== 'essay';
  const isRight = isObj && isRightAns(q, answer);
  const blank = isObj && !answer;
  const kindLabel = q.kind === 'tf' ? 'BENAR / SALAH' : q.kind === 'essay' ? 'URAIAN' : 'PILIHAN GANDA';
  const opts = s.options[q.id] || q.options.map(o => o.id);
  const optionsHTML = q.kind === 'essay'
    ? `<div class="essay-box">${submitted ? `<p><strong>Pedoman:</strong> ${esc(q.rubric || '')}</p>` : `<p>Tuliskan jawabanmu, lalu cocokkan dengan pedoman setelah pemeriksaan mandiri.</p>`}</div>`
    : `<fieldset class="question-options" ${submitted ? 'disabled' : ''} aria-labelledby="prompt-${q.id}">
        <legend>Pilihan jawaban soal ${i + 1}</legend>
        ${opts.map(oid => {
          const o = q.options.find(v => v.id === oid)!;
          const correct = submitted && oid === q.correct;
          const wrong = submitted && answer === oid && !isRight;
          const checked = answer === oid;
          return `<label class="option ${correct ? 'is-correct' : wrong ? 'is-wrong' : ''}">
            <input type="radio" name="answer-${q.id}" value="${oid}" data-answer="${q.id}" ${checked ? 'checked' : ''}>
            <span class="option-letter" aria-hidden="true">${oid}</span>
            <span class="option-text">${esc(o.text)}</span>
            ${correct || wrong ? `<span class="option-status" aria-label="${correct ? 'Jawaban benar' : 'Jawaban salah'}">${icon(correct ? 'check' : 'close')}</span>` : ''}
          </label>`;
        }).join('')}
      </fieldset>`;
  const feedback = submitted && isObj
    ? `<div class="question-feedback">
        <span class="feedback-label ${blank ? 'blank' : isRight ? '' : 'wrong'}">${icon(blank ? 'note' : isRight ? 'check-circle' : 'close')}${blank ? 'Tidak dijawab' : isRight ? 'Jawaban benar' : 'Jawaban kurang tepat'}</span>
        ${!isRight && q.correct ? `<p class="correct-answer">Jawaban benar: <strong>${esc(q.correct)}</strong> — ${esc(q.options.find(o => o.id === q.correct)?.text || '')}</p>` : ''}
        ${q.explanation ? `<details class="feedback-detail"><summary>Lihat pembahasan ${icon('arrow-down')}</summary><div class="detail-content prose">${esc(q.explanation)}</div></details>` : ''}
      </div>`
    : submitted && q.kind === 'essay'
      ? `<div class="question-feedback"><span class="feedback-label">${icon('note')}Uraian — periksa mandiri</span><details class="feedback-detail" open><summary>Pedoman jawaban ${icon('arrow-down')}</summary><div class="detail-content prose">${esc(q.rubric || '')}</div></details></div>`
      : '';
  return `<article class="question-card" id="q-${q.id}" data-question="${q.id}">
    <div class="question-top">
      <span class="question-counter"><b>${String(i + 1).padStart(2, '0')}</b> / ${s.order.length}</span>
      <span class="question-id">${q.id}</span>
      <span class="q-kind">${kindLabel}</span>
      ${isObj ? '<span class="q-points">DINILAI</span>' : '<span class="q-points q-essay">URAAN</span>'}
    </div>
    <div class="question-prompt prose" id="prompt-${q.id}">${esc(q.prompt)}</div>
    ${optionsHTML}
    ${feedback}
  </article>`;
}

function renderQuiz(): void {
  const s = session();
  const c = chapter();
  const isEval = current === 10;
  $('#quiz-title').textContent = isEval ? 'Evaluasi Akhir Semester.' : `Latihan Bab ${String(c.id).padStart(2, '0')}.`;
  $('#quiz-count').textContent = `${c.questions.length} soal · PG, benar–salah, uraian`;
  const ws = $('#quiz-workspace');
  if (!s) {
    ws.innerHTML = quizStartHTML();
    return;
  }
  const result = s.submitted ? score(s) : null;
  ws.innerHTML = `
    ${result ? resultHTML(result, isEval) : ''}
    <div class="quiz-session-header">
      <span>${s.submitted ? 'Jawaban sudah dikunci' : 'Pilih satu jawaban pada setiap nomor. Jawaban dapat diubah sebelum dikumpulkan.'}</span>
      <button data-restart>${icon('shuffle')}Acak ulang</button>
    </div>
    <div class="question-list">${s.order.map((id, i) => { const q = Q(id); return q ? questionHTML(q, i, s) : ''; }).join('')}</div>
    ${s.submitted
      ? `<div class="quiz-submit"><span>${icon('shield')} Jawaban objektif sudah dikunci.</span><button class="button secondary" data-restart>${icon('redo')}Acak &amp; coba lagi</button></div>`
      : `<div class="quiz-submit"><span>${icon('note')} Uraian dibandingkan dengan pedoman setelah pemeriksaan.</span><button class="button primary" id="quiz-submit">${isEval ? 'Kumpulkan Jawaban' : 'Cek Jawaban'} ${icon('check-circle')}</button></div>`}
  `;
  if (!s.submitted) updateProgress();
  fillIcons(ws);
}
function resultHTML(r: { correct: number; wrong: number; blank: number; total: number; value: number }, isEval: boolean): string {
  return `<div class="quiz-result" id="quiz-result" role="status">
    <div class="score-ring" style="--score:${r.value}"><span><strong>${r.value}</strong><small>DARI 100</small></span></div>
    <div class="result-copy">
      <span class="eyebrow">${isEval ? 'HASIL EVALUASI' : 'HASIL LATIHAN'}</span>
      <h3 tabindex="-1" id="result-title">${r.correct} dari ${r.total} benar · nilai ${r.value}.</h3>
      <div class="score-breakdown"><span>${r.correct} benar</span><span>${r.wrong} salah</span><span>${r.blank} kosong</span></div>
      <p>Buka pembahasan jika diperlukan. Uraian dinilai mandiri dengan pedoman.</p>
      <span class="sr-only" role="status">Nilai ${r.value} dari 100. ${r.correct} benar, ${r.wrong} salah, ${r.blank} kosong.</span>
    </div>
    <button class="button secondary" data-restart>${icon('redo')}${isEval ? 'Ulangi evaluasi' : 'Coba lagi'}</button>
  </div>`;
}
function updateProgress(): void {
  const s = session();
  if (!s || s.submitted) return;
  const n = s.order.filter(id => { const q = Q(id); return q && q.kind !== 'essay' && s.answers[id]; }).length;
  const total = s.order.filter(id => Q(id)?.kind !== 'essay').length;
  const bar = $('.quiz-submit');
  if (bar) {
    let p = bar.querySelector('.quiz-progress') as HTMLElement | null;
    if (!p) {
      p = document.createElement('div');
      p.className = 'quiz-progress';
      bar.prepend(p);
    }
    p.innerHTML = `<strong>${n} / ${total}</strong> soal terjawab`;
  }
}

/* ---------- quiz actions ---------- */
let confirmPending: ((v: boolean) => void) | null = null;
function askConfirm(title: string, text: string, accept = 'Lanjutkan'): Promise<boolean> {
  if (confirmPending) return Promise.resolve(false);
  const d = $('#confirm-dialog') as HTMLDialogElement;
  $('#confirm-title').textContent = title;
  $('#confirm-description').textContent = text;
  ($('#confirm-accept') as HTMLButtonElement).textContent = accept;
  d.showModal();
  ($('#confirm-cancel') as HTMLButtonElement).focus();
  return new Promise(resolve => { confirmPending = resolve; });
}
function resolveConfirm(value: boolean): void {
  const d = $('#confirm-dialog') as HTMLDialogElement;
  d.close();
  const r = confirmPending;
  confirmPending = null;
  r?.(value);
}
async function submitQuiz(): Promise<void> {
  const s = session();
  if (!s || s.submitted || confirmPending) return;
  const blanks = s.order.filter(id => { const q = Q(id); return q && q.kind !== 'essay' && !s.answers[id]; }).length;
  if (blanks && !await askConfirm(`Masih ada ${blanks} soal belum dijawab.`, 'Jawaban kosong bernilai 0. Setelah dikumpulkan, semua jawaban dikunci. Tetap kumpulkan sekarang?', 'Kumpulkan')) return;
  s.submitted = true;
  save();
  renderChapters();
  renderQuiz();
  $('#quiz-result')?.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'center' });
  ($('#result-title') as HTMLElement | null)?.focus({ preventScroll: true });
}
function startQuizFlow(): void {
  makeSession();
  renderQuiz();
  $('#latihan')?.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
  ($('.question-card input') as HTMLElement | null)?.focus({ preventScroll: true });
}
function restartQuiz(): void {
  makeSession();
  renderQuiz();
  ($('.question-card input') as HTMLElement | null)?.focus({ preventScroll: true });
}

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const t = e.target as HTMLElement;
  const chBtn = t.closest<HTMLElement>('.chapter-button');
  if (chBtn) { setChapter(Number(chBtn.dataset.chapter)); return; }
  if (t.closest('[data-start]')) { startQuizFlow(); return; }
  if (t.closest('#quiz-submit')) { submitQuiz(); return; }
  if (t.closest('[data-restart]')) { restartQuiz(); return; }
  if (t.closest('#next-chapter')) {
    const next = current < 10 ? current + 1 : 1;
    setChapter(next);
    return;
  }
  if (t.closest('#evaluasi-launch')) { setChapter(10); return; }
  if (t.closest('#back-top')) { setChapter(1); return; }
  if (t.closest('#detail-toggle')) {
    const all = $$<HTMLDetailsElement>('details.source-details');
    const shouldOpen = !all.every(d => d.open);
    all.forEach(d => { d.open = shouldOpen; });
    updateDetailToggle();
    return;
  }
  if (t.closest('#search-clear') || t.closest('#search-reset')) {
    ($('#search') as HTMLInputElement).value = '';
    searchTopics();
    return;
  }
  if (t.closest('#confirm-cancel')) { resolveConfirm(false); return; }
  if (t.closest('#confirm-accept')) { resolveConfirm(true); return; }
  const summary = t.closest<HTMLElement>('#lesson-content summary, #quiz-workspace summary');
  if (summary) {
    e.preventDefault();
    const d = summary.parentElement as HTMLDetailsElement;
    d.open = !d.open;
    updateDetailToggle();
  }
});
document.addEventListener('change', e => {
  const input = e.target as HTMLInputElement;
  if (!input.matches('input[data-answer]')) return;
  const s = session();
  if (!s || s.submitted) return;
  const id = input.dataset.answer!;
  if (input.checked) {
    s.answers[id] = input.value;
    save();
    updateProgress();
    const label = input.closest('.option');
    if (label && !reduced.matches) {
      label.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }],
        { duration: 220, easing: 'ease-out' }
      );
    }
  }
});
$('#search')?.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(searchTopics, 180);
});

/* scroll progress + back-top */
addEventListener('scroll', () => {
  const doc = document.documentElement;
  const pct = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
  const bar = $('#scroll-progress');
  if (bar) bar.style.transform = `scaleX(${pct})`;
  const bt = $('#back-top');
  if (bt) bt.classList.toggle('show', doc.scrollTop > 480);
}, { passive: true });

/* ---------- init ---------- */
fillIcons();
setChapter(current, false);
save();
