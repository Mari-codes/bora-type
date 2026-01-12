export interface Passage {
  id: string;
  text: string;
}

export interface DifficultyLevels {
  easy: Passage[];
  medium: Passage[];
  hard: Passage[];
}

export type Category = 'standard' | 'quotes' | 'lyrics' | 'code';

export type AdultData = {
  [key in Category]: DifficultyLevels;
};
