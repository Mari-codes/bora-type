import { useState, useEffect } from 'react';

export const usePersonalBest = (mode: 'type' | 'kids') => {
  const storageKey = `typing-pb-${mode}`;
  const [personalBest, setPersonalBest] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setPersonalBest(Number(saved));
  }, [storageKey]);

  const updatePersonalBest = (newWpm: number) => {
    if (newWpm > personalBest) {
      localStorage.setItem(storageKey, newWpm.toString());
      setPersonalBest(newWpm);
      return true;
    }
    return false;
  };

  return { personalBest, updatePersonalBest };
};
