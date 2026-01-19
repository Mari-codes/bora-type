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
      const premiumColors = ['#FFD700', '#C0C0C0', '#E6BE8A', '#ffffff'];

      const fire = (particleRatio: number, opts: any) => {
        confetti({
          ...opts,
          colors: premiumColors,
          shapes: ['circle', 'square'],
          ticks: 500,
          gravity: 0.4,
          scalar: Math.random() * 0.3 + 0.8,
          zIndex: 1100,
          particleCount: Math.floor(150 * particleRatio),
        });
      };

      fire(0.5, {
        spread: 60,
        startVelocity: 20,
        origin: { x: 0.2, y: -0.1 },
        angle: 280,
      });

      fire(0.5, {
        spread: 60,
        startVelocity: 20,
        origin: { x: 0.8, y: -0.1 },
        angle: 260,
      });

      setTimeout(() => {
        confetti({
          colors: premiumColors,
          particleCount: 40,
          origin: { x: 0.5, y: -0.2 },
          gravity: 0.3,
          startVelocity: 10,
          ticks: 600,
          zIndex: 1100,
        });
      }, 300);
    }

    if (wasFirstTime) {
      game.setIsFirstTime(true);
    } else if (wasRecord) {
      game.setIsNewRecord(true);
    }

    game.setIsActive(false);
    game.setIsFinished(true);
  }, [game, personalBest, updatePersonalBest]);

  return { handleTimeUp };
};
