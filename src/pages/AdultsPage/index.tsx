import { useState, useMemo, useCallback, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { adultPassages } from '../../data/adultContent';
import styles from './AdultsPage.module.scss';
import { TypingGame } from '../../components/TypingGame';
import { GameOption } from '../../components/GameOption';
import type { Category } from '../../types/gameTypes';
import Timer from '../../components/Timer';
import { Header } from '../../components/Header';
import { usePersonalBest } from '../../hooks/usePersonalBest';
import { ResultsModal } from '../../components/ResultsModal';

export const AdultsPage = () => {
  const { personalBest, updatePersonalBest } = usePersonalBest('type');

  const [category, setCategory] = useState<Category>('standard');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy',
  );
  const [duration, setDuration] = useState(30);
  const [refreshSeed, setRefreshSeed] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleNewText = useCallback(() => {
    setRefreshSeed((s) => s + 1);
    setTimerKey((k) => k + 1);

    setWpm(0);
    setAccuracy(100);
    setIsActive(false);
    setIsFinished(false);
  }, []);

  const handleCategoryChange = (val: string) => {
    setCategory(val as Category);
    handleNewText();
  };

  const handleDifficultyChange = (val: string) => {
    setDifficulty(val as any);
    handleNewText();
  };

  const handleDurationChange = (val: string | number) => {
    setDuration(Number(val));
    handleNewText();
  };

  const currentText = useMemo(() => {
    const list = adultPassages[category][difficulty];
    return list[Math.floor(Math.random() * list.length)].text;
  }, [category, difficulty, refreshSeed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        handleNewText();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNewText]);

  const handleStatsUpdate = useCallback(
    (stats: { wpm: number; accuracy: number; active: boolean }) => {
      setWpm(stats.wpm);
      setAccuracy(stats.accuracy);
    },
    [],
  );

  const handleGameStart = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleTimeUp = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    updatePersonalBest(wpm);
  }, [wpm, updatePersonalBest]);

  return (
    <div className={styles['adults-page']}>
      <Header variant="type" personalBestWpm={personalBest} />

      <div className={styles['adults-page__toolbar']}>
        <div
          className={`${styles['adults-page__stats']} ${
            isActive ? styles['adults-page__stats--active'] : ''
          }`}
        >
          <div className={styles['adults-page__stat']}>
            <span className={styles['adults-page__label']}>WPM:</span>
            <strong className={styles['adults-page__value']}>{wpm}</strong>
          </div>

          <div className={styles['adults-page__stat']}>
            <span className={styles['adults-page__label']}>Accuracy:</span>
            <strong className={styles['adults-page__value']}>
              {accuracy}%
            </strong>
          </div>

          <div className={styles['adults-page__stat']}>
            <span className={styles['adults-page__label']}>Time:</span>
            <Timer
              key={timerKey}
              duration={duration}
              isActive={isActive && !isFinished}
              onTimeUp={handleTimeUp}
            />
          </div>
        </div>

        <nav className={styles['adults-page__config']}>
          <GameOption
            label="Mode:"
            options={['standard', 'quotes', 'code', 'lyrics']}
            currentValue={category}
            onChange={handleCategoryChange}
          />
          <GameOption
            label="Difficulty:"
            options={['easy', 'medium', 'hard']}
            currentValue={difficulty}
            onChange={handleDifficultyChange}
          />
          <GameOption
            label="Time:"
            options={[15, 30, 60, 120]}
            currentValue={duration}
            onChange={handleDurationChange}
          />
        </nav>
      </div>

      <main className={styles['adults-page__main']}>
        {!isFinished && (
          <TypingGame
            key={`${category}-${difficulty}-${duration}-${refreshSeed}`}
            text={currentText}
            category={category}
            isFinished={isFinished}
            onStatsUpdate={handleStatsUpdate}
            onComplete={handleTimeUp}
            onStart={handleGameStart}
          />
        )}
      </main>

      <div className={styles['adults-page__actions']}>
        <button
          className={styles['adults-page__btn-refresh']}
          onClick={handleNewText}
        >
          <RotateCcw size={24} strokeWidth={2.5} />
        </button>

        <span className={styles['adults-page__hint']}>
          <kbd>tab</kbd> - restart test
        </span>
      </div>

      {isFinished && (
        <ResultsModal wpm={wpm} accuracy={accuracy} onRestart={handleNewText} />
      )}
    </div>
  );
};
