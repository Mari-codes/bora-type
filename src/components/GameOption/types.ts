import type { ReactNode } from 'react';

export interface GameOptionProps<T> {
  label?: string;
  options: (T | { value: T; label: ReactNode })[];
  currentValue: T;
  onChange: (value: T) => void;
  mode?: 'kids' | 'adults';
}

export type GameMode = 'kids' | 'adults';
