export type Part = 'fisik' | 'diplomasi';
export interface Detail { title: string; html: string; }
export interface LessonSection {
  id: string;
  number: string;
  title: string;
  lead: string;
  details: Detail[];
  search: string;
  extra?: boolean;
  part?: Part;
  date?: string;
  sum?: string;
}
export interface Chapter {
  id: number;
  title: string;
  fullTitle: string;
  subtitle: string;
  intro: string;
  example: string;
  translation: string;
  hero: string;
  sections: LessonSection[];
  questions: string[];
}
export interface Option { id: string; html: string; text: string; }
export interface Question {
  id: string;
  chapter: number;
  set: Part;
  no: number;
  prompt: string;
  img?: string;
  kind: 'mcq' | 'tf' | 'essay';
  options: Option[];
  correct: string;
  explanation?: string;
  rubric?: string;
}
export interface Course {
  chapters: Chapter[];
  questions: Question[];
  summary: string;
  counts: { chapters: number; sections: number; questions: number };
}

/* ---------- Ringkas (visual summary) ---------- */
export type Tone = 'red' | 'green' | 'blue' | 'amber' | 'teal' | 'violet' | 'ink';
export interface IntiItem { icon: string; title: string; text: string; }
export type Block =
  | { type: 'inti'; items: IntiItem[] }
  | { type: 'alur'; title: string; steps: { label: string; text: string }[] }
  | { type: 'timeline'; title: string; items: { date: string; title: string; text?: string; hot?: boolean }[] }
  | { type: 'tokoh'; title: string; items: { name: string; role: string; tag?: string }[] }
  | { type: 'vs'; title: string; a: { label: string; tone: Tone }; b: { label: string; tone: Tone }; rows: { aspect: string; a: string; b: string }[] }
  | { type: 'table'; title: string; head: string[]; rows: string[][] }
  | { type: 'grid'; title: string; items: { title: string; meta?: string; text: string; tag?: string; tone?: Tone; icon?: string }[] }
  | { type: 'list'; title: string; icon?: string; ordered?: boolean; items: string[] }
  | { type: 'quote'; text: string; by: string }
  | { type: 'ingat'; items: string[] }
  | { type: 'jebakan'; items: string[] }
  | { type: 'jembatan'; items: string[] }
  | { type: 'note'; title: string; items: string[] };

export interface Ringkas {
  chapter: number;
  phase: string;
  tone: Tone;
  icon: string;
  tagline: string;
  pertanyaan: string; // pertanyaan besar bab
  blocks: Block[];
}

/* ---------- Atlas ---------- */
export interface TimelineEvent { date: string; year: number; title: string; text: string; chapter: number; phase: Part; sec: string; big?: boolean; }
export interface Flashcard { deck: 'tokoh' | 'istilah' | 'tanggal'; front: string; back: string; chapter: number; part: Part; sec: string; }
export interface MapPin { id: string; name: string; lon: number; lat: number; kind: 'jepang' | 'sekutu' | 'belanda' | 'politik'; date: string; title: string; text: string; chapter: number; sec: string; dx?: number; dy?: number; }
