import type { Tone } from './types';
import { COURSE } from './data/course';
import { RINGKAS } from './data/ringkas';

/* ---------- DOM & text helpers ---------- */
export const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T | null;
export const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll(s)) as T[];
export const esc = (s: string) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** escape + **tebal** */
export const md = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
export const plain = (s: string) => String(s ?? '').replace(/\*\*/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
export const norm = (s: string) => plain(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/* ---------- icons (inline SVG, gaya garis) ---------- */
const P: Record<string, string> = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  map: '<path d="m9 4-6 2.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
  cards: '<rect x="3" y="6" width="14" height="15" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
  quiz: '<circle cx="12" cy="12" r="9.5"/><path d="M9.5 9.3a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1.1.9-1.1 1.6v.5"/><path d="M12 17h.01"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  flip: '<path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/>',
  shuffle: '<path d="M3 6h3.5c2 0 3.2 1 4.3 2.7l2.4 3.6c1.1 1.7 2.3 2.7 4.3 2.7H21M3 18h3.5c2 0 3.2-1 4.3-2.7M14 9.3C15 7.8 16 7 17.5 7H21M18 4l3 3-3 3M18 14l3 3-3 3"/>',
  list: '<path d="M9 6h12M9 12h12M9 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  ordered: '<path d="M10 6h11M10 12h11M10 18h11"/><path d="M4 4h1v4M4 8h2M4 14.5a1.2 1.2 0 0 1 2 .9c0 .9-2 1.6-2 2.6h2"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/>',
  play: '<path d="M7 4.5v15l12-7.5z"/>',
  target: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.5"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20v-.5A5.5 5.5 0 0 1 8 14h2a5.5 5.5 0 0 1 5.5 5.5v.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14a5.5 5.5 0 0 1 3 4.9v1.1"/>',
  columns: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18"/>',
  grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
  bulb: '<path d="M9 18h6M10 21.5h4"/><path d="M8.5 14.5C7 13.3 6 11.6 6 9.5a6 6 0 1 1 12 0c0 2.1-1 3.8-2.5 5-.6.5-1 1.3-1 2V17h-5v-.5c0-.7-.4-1.5-1-2z"/>',
  alert: '<path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4M12 17h.01"/>',
  key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.8 12.2 9.7-9.7M16 7l3 3M18.5 4.5l2 2"/>',
  note: '<path d="M14.5 2.5H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h6M8 13h8M8 17h5"/>',
  quote: '<path d="M4 18v-4.5C4 9 6 6.5 10 5.5M14 18v-4.5c0-4.5 2-7 6-8"/><path d="M4 14h5v4H4zM14 14h5v4h-5z"/>',
  scroll: '<path d="M8 21h11a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>',
  swords: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/><path d="M14.5 6.5 18 3h3v3l-3.5 3.5M5 14l4 4M7 17l-3 3M3 19l2 2"/>',
  landmark: '<path d="M3 21h18M5 18v-7M9.7 18v-7M14.3 18v-7M19 18v-7"/><path d="M12 3 21 8H3z"/>',
  handshake: '<path d="m11 17 2 2a1.4 1.4 0 1 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 1 0 2-2l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1.4 1.4 0 1 1-2-2l2.8-2.8a5.8 5.8 0 0 1 7-.9l.5.3a2 2 0 0 0 1.4.3L21 4"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 1 0 2-2M3 4h8"/>',
  hourglass: '<path d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2"/>',
  bomb: '<circle cx="11" cy="13.5" r="8"/><path d="m16.5 7.5 2-2M19.5 4.5 21 3M14 4.6 15.6 3a2 2 0 0 1 2.8 0l2.6 2.6a2 2 0 0 1 0 2.8L19.4 10"/>',
  speech: '<path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.4-5.6A8.5 8.5 0 1 1 21 12z"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  flag: '<path d="M4 22V15M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4"/>',
  radio: '<path d="M4.9 19.1a10 10 0 0 1 0-14.2M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4M19.1 4.9a10 10 0 0 1 0 14.2"/><circle cx="12" cy="12" r="2"/>',
  newspaper: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-9 5.7a2 2 0 0 1-2 0L2 7"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  crown: '<path d="m2 6 3 12h14l3-12-6 6-4-8-4 8z"/><path d="M5 21h14"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1-2.1-.2-4.1 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  ship: '<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.4 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.9 5.3 2.8 7.8M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6M12 10v4M12 2v3"/>',
  mask: '<path d="M3 4h18v6a9 9 0 0 1-18 0z"/><path d="M8 9h.01M16 9h.01M9 14.5a4 4 0 0 0 6 0"/>',
  compass: '<circle cx="12" cy="12" r="9.5"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><path d="M12 2.5a14.5 14.5 0 0 0 0 19 14.5 14.5 0 0 0 0-19M2.5 12h19"/>',
  award: '<circle cx="12" cy="8.5" r="6"/><path d="M15.5 13.4 17 22l-5-3-5 3 1.5-8.6"/>',
  scale: '<path d="M12 3v18M7 21h10M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/><path d="m16 16 3-8 3 8a4.4 4.4 0 0 1-6 0zM2 16l3-8 3 8a4.4 4.4 0 0 1-6 0z"/>',
  type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 16v-4.5M12 8h.01"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a4 4 0 0 1-4 4M7 5H4v2a4 4 0 0 0 4 4"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
};
export const icon = (n: string, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] ?? P.spark}</svg>`;
export function hydrateIcons(root: ParentNode = document) { $$('[data-i]', root).forEach(el => { el.innerHTML = icon(el.getAttribute('data-i')!); el.removeAttribute('data-i'); }); }

/* ---------- course meta ---------- */
export const CHAPTERS = COURSE.chapters.filter(c => c.id <= 8);
export const chapterById = (n: number) => COURSE.chapters.find(c => c.id === n);
export const toneOf = (n: number): Tone => RINGKAS.find(r => r.chapter === n)?.tone ?? 'ink';
export const iconOf = (n: number): string => RINGKAS.find(r => r.chapter === n)?.icon ?? 'book';
export const questionsOf = (n: number) => COURSE.questions.filter(q => q.chapter === n);
export const img = (hero: string) => `./assets/${hero}.webp`;
export const pad = (n: number) => String(n).padStart(2, '0');

/* ---------- preferensi (hanya tema) ---------- */
const KEY = 'sejarah-xi-v2';
export const prefs: { theme?: 'light' | 'dark' } = (() => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } })();
export function savePrefs() { try { localStorage.setItem(KEY, JSON.stringify({ theme: prefs.theme })); } catch { /* privat */ } }

/* ---------- misc ---------- */
export const AV_COLORS = ['#c8372c', '#17867f', '#2f6bd1', '#7a4fd4', '#c97d12', '#2d8a55', '#b5466b', '#3d5a80'];
export function initials(name: string) {
  const clean = name.replace(/\(.*?\)/g, '').replace(/^(dr\.|Dr\.|Ir\.|Mr\.|KH|K\.H\.|Brigjen|Jenderal|Kol\.|Letjen|Mayjen|Laksamana|Marsekal|Sri Sultan|Sri|Bung|Sultan|Gubernur|PM|Menlu)\s+/g, '').replace(/[^\p{L}\s.'&-]/gu, '').trim();
  const parts = clean.split(/[\s.&]+/).filter(p => p.length > 1 || /\p{Lu}/u.test(p));
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase().replace(/^(.)(.)$/, (_, a, b) => a + b.toLowerCase());
  return ((parts[0]?.[0] ?? '?') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}
export function hashColor(s: string) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return AV_COLORS[h % AV_COLORS.length]; }
export function toast(msg: string) {
  $('.toast')?.remove();
  const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.append(t); setTimeout(() => t.remove(), 2200);
}
export function shuffle<T>(a: T[]): T[] { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
