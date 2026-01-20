export type GameMode = 'type' | 'kids';

export type BaseCategory = 'standard' | 'quotes' | 'lyrics' | 'code';
export type TypeCategory = BaseCategory;
export type KidsCategory = BaseCategory;

export interface Passage {
  id: string;
  text: string;
}

export interface DifficultyLevels {
  easy: Passage[];
  medium: Passage[];
  hard: Passage[];
}

export type GameData<C extends string> = {
  [key in C]: DifficultyLevels;
};

export type TypeData = GameData<TypeCategory>;
export type KidsData = GameData<KidsCategory>;

export type Category = TypeCategory | KidsCategory;
