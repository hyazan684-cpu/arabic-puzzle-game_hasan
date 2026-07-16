// Project-wide TypeScript types for the Arabic Ocean Puzzles app

export type PuzzleType =
  | 'multiple_choice'
  | 'missing_letters'
  | 'word_search'
  | 'timed_challenge'
  | 'crossword';

export interface Puzzle {
  id: string;
  type: PuzzleType | string;
  // Human-readable prompt or question
  prompt?: string;
  // Generic payload for puzzle-specific data (grid, letters, choices, etc.)
  data?: any;
  // For multiple choice
  choices?: string[];
  // Correct answer or answers
  answer?: string | string[];
}

export interface Level {
  id: string;
  title: string;
  description?: string;
  unlocked?: boolean;
  // 0..3 stars
  stars?: number;
  puzzles: Puzzle[];
}

export interface Island {
  id: string;
  title: string;
  description?: string;
  artwork?: string; // path to image asset
  levels: Level[];
}

export interface Settings {
  sound: boolean;
  music: boolean;
  language?: string;
}

export interface Stats {
  totalStars: number;
  playedLevels: Record<string, { attempts: number; lastPlayed: string | null }>;
}

export interface GameState {
  islands: Island[];
  currentIslandId?: string | null;
  currentLevelId?: string | null;
  settings: Settings;
  stats: Stats;
}

export type StorageKey = 'game_state' | 'settings' | 'stats';

// Simple utility types
export type VoidFn = () => void;

// Allow importing common asset types in TypeScript without errors
// (This is intentionally included here to avoid a separate .d.ts file while
// keeping the repository changes minimal.)
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.json';
