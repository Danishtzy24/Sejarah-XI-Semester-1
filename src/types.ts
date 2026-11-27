export interface Detail { title: string; html: string; }
export interface LessonSection {
  id: string;
  number: string;
  title: string;
  lead: string;
  details: Detail[];
  search: string;
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
  prompt: string;
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
export interface QuizSession {
  order: string[];
  options: Record<string, string[]>;
  answers: Record<string, string>;
  submitted: boolean;
}
export interface SavedState {
  version: number;
  current: number;
  sessions: Record<string, QuizSession>;
}
