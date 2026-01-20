import type { ReactNode } from 'react';
import type { GameMode } from '../../types/gameTypes';

export interface GameOptionProps<T> {
  label?: string;
  options: (T | { value: T; label: ReactNode })[];
  currentValue: T;
  onChange: (value: T) => void;
  mode?: GameMode;
}
