import { useState } from 'react';
import confetti from 'canvas-confetti';

interface UseConfettiPBProps {
  currentValue: number;
  storageKey: string;
  onFirstTime?: () => void;
  onNewRecord?: () => void;
}

export const useConfettiPB = ({
  currentValue,
  storageKey,
  onFirstTime,
  onNewRecord,
}: UseConfettiPBProps) => {
  const savedPB = Number(localStorage.getItem(storageKey) || 0);
  const [personalBest, setPersonalBest] = useState(savedPB);

  const isFirstTime = savedPB === 0;
  const isNewRecord = currentValue > savedPB;

  const handlePB = () => {
    if (isNewRecord) {
      localStorage.setItem(storageKey, currentValue.toString());
      setPersonalBest(currentValue);

      if (!isFirstTime && onNewRecord) onNewRecord();

      if (!isFirstTime) {
        const colors = ['#FFD700', '#C0C0C0', '#E6BE8A', '#ffffff'];
        const fire = (particleRatio: number, opts: any) => {
          confetti({
            ...opts,
            colors,
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
            colors,
            particleCount: 40,
            origin: { x: 0.5, y: -0.2 },
            gravity: 0.3,
            startVelocity: 10,
            ticks: 600,
            zIndex: 1100,
          });
        }, 300);
      }
    }

    if (isFirstTime && onFirstTime) onFirstTime();

    return { firstTime: isFirstTime, newRecord: isNewRecord };
  };

  return { handlePB, personalBest, isFirstTime, isNewRecord };
};
