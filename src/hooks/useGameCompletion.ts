import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export const useGameCompletion = (
  game: any,
  personalBest: number,
  updatePersonalBest: (wpm: number) => boolean,
) => {
  const handleTimeUp = useCallback(() => {
    if (game.isFinished) return;

    const wasFirstTime = personalBest === 0;
    const wasRecord = updatePersonalBest(game.wpm);

    if (!wasFirstTime && wasRecord) {
      const config = {
        particleCount: 200,
        spread: 60,
        colors: ['#e2b714', '#ffffff'],
      };
      confetti({ ...config, origin: { x: 0.2, y: 0.8 } });
      confetti({ ...config, origin: { x: 0.8, y: 0.8 } });
    }

    if (wasFirstTime) game.setIsFirstTime(true);
    else if (wasRecord) game.setIsNewRecord(true);

    game.setIsActive(false);
    game.setIsFinished(true);
  }, [game, personalBest, updatePersonalBest]);

  return { handleTimeUp };
};
