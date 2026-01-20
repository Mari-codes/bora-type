import { useState, useCallback } from 'react';

export const useTypingGameLogic = () => {
  const [refreshSeed, setRefreshSeed] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [finalErrors, setFinalErrors] = useState<{ index: number; expected: string; typed: string }[]>([]);

  const handleNewText = useCallback(() => {
    setRefreshSeed((s) => s + 1);
    setTimerKey((k) => k + 1);
    setWpm(0);
    setAccuracy(100);
    setCorrect(0);
    setMistakes(0);
    setIsActive(false);
    setIsFinished(false);
    setIsNewRecord(false);
    setIsFirstTime(false);
    setFinalErrors([]);
  }, []);

  const handleStatsUpdate = useCallback((stats: any) => {
    setWpm(stats.wpm);
    setAccuracy(stats.accuracy);
    setCorrect(stats.correct);
    setMistakes(stats.mistakes);
  }, []);

  return {
    wpm,
    accuracy,
    isActive,
    isFinished,
    correct,
    mistakes,
    isNewRecord,
    isFirstTime,
    refreshSeed,
    timerKey,
    finalErrors,
    setFinalErrors,
    handleNewText,
    handleStatsUpdate,
    setIsActive,
    setIsFinished,
    setIsNewRecord,
    setIsFirstTime,
  };
};
