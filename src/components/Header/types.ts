import type { GameMode } from '../../types/gameTypes';

export interface HeaderProps {
  variant: GameMode;
  personalBestWpm?: number;
}
