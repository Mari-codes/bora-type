import { useState, useCallback } from 'react';

export const usePersonalBest = (mode: 'type' | 'kids') => {
  const storageKey = `typing-pb-${mode}`;
  const [personalBest, setPersonalBest] = useState<number>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? Number(saved) : 0;
  });

  const updatePersonalBest = useCallback(
    (newWpm: number) => {
      const currentSaved = Number(localStorage.getItem(storageKey) || 0);

      if (newWpm > currentSaved) {
        localStorage.setItem(storageKey, newWpm.toString());
        setPersonalBest(newWpm);
        return true;
      }
      return false;
    },
    [storageKey],
  );

  return { personalBest, updatePersonalBest };
};
