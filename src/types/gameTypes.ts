export interface Passage {
  id: string;
  text: string;
}

export interface DifficultyLevels {
  easy: Passage[];
  medium: Passage[];
  hard: Passage[];
}

export type AdultCategory = 'standard' | 'quotes' | 'lyrics' | 'code';
export type KidsCategory = 'standard' | 'quotes' | 'lyrics' | 'code';

export type GameData<C extends string> = {
  [key in C]: DifficultyLevels;
};

export type AdultData = GameData<AdultCategory>;
export type KidsData = GameData<KidsCategory>;

export type Category = AdultCategory | KidsCategory;
