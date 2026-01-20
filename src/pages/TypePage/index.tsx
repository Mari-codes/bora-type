import { useState, useMemo, useEffect } from 'react';
import {
  RotateCcw,
  Trophy,
  Target,
  CheckCircle2,
  Settings,
  X,
} from 'lucide-react';
import { typePassages } from '../../data/typeContent';
import styles from './TypePage.module.scss';
import { TypingGame } from '../../components/TypingGame';
import { GameOption } from '../../components/GameOption';
import Timer from '../../components/Timer';
import { Header } from '../../components/Header';
import { ResultsModal } from '../../components/ResultsModal';
import type { Category, DifficultyLevels } from '../../types/gameTypes';
import { useFocusRescue } from '../../hooks/useFocusRescue';
import { useTypingGameLogic } from '../../hooks/useTypingGameLogic';
import { ModeSelector } from '../../components/ModeSelector';
import { useConfettiPB } from '../../hooks/useConfettiPB';

export const AdultsPage = () => {
  const game = useTypingGameLogic();

  const [category, setCategory] = useState<Category>('standard');
  const [difficulty, setDifficulty] = useState<keyof DifficultyLevels>('easy');
  const [duration, setDuration] = useState<number | 'inf'>(30);
  const [tempCategory, setTempCategory] = useState<Category>(category);
  const [tempDifficulty, setTempDifficulty] = useState<
    'easy' | 'medium' | 'hard'
  >(difficulty);
  const [tempDuration, setTempDuration] = useState<number | 'inf'>(duration);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useFocusRescue(game.handleNewText, game.isFinished);

  const { handlePB, personalBest } = useConfettiPB({
    currentValue: game.wpm,
    storageKey: 'typing-pb-type',
    onFirstTime: () => game.setIsFirstTime(true),
    onNewRecord: () => game.setIsNewRecord(true),
  });

  const handleTimeUp = () => {
    if (game.isFinished) return;
    handlePB();
    game.setIsActive(false);
    game.setIsFinished(true);
  };

  const timeOptions = useMemo<
    (number | { value: number | 'inf'; label: React.ReactNode })[]
  >(() => [15, 30, 60, 120, { value: 'inf', label: 'inf' }], []);

  const currentText = useMemo(() => {
    const list = typePassages[category][difficulty];
    return list[Math.floor(Math.random() * list.length)].text;
  }, [category, difficulty, game.refreshSeed]);

  const handleActionKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1126 && isConfigOpen) {
        setIsConfigOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isConfigOpen]);

  useEffect(() => {
    if (game.isFinished && isConfigOpen) {
      setIsConfigOpen(false);
    }
  }, [game.isFinished, isConfigOpen]);

  const modalContent = useMemo(() => {
    if (!game.isFinished) return null;
    if (game.isFirstTime) {
      return {
        title: 'Baseline Established!',
        description: 'You’ve set the bar.',
        icon: (
          <Target
            className={`${styles['type-page__modal-icon']} ${styles['type-page__modal-icon--target']}`}
          />
        ),
      };
    }
    if (game.isNewRecord) {
      return {
        title: 'High Score Smashed!',
        description: 'Faster than ever!',
        icon: (
          <Trophy
            className={`${styles['type-page__modal-icon']} ${styles['type-page__modal-icon--trophy']}`}
          />
        ),
      };
    }
    return {
      title: 'Test Completed!',
      description: 'Solid run.',
      icon: (
        <CheckCircle2
          className={`${styles['type-page__modal-icon']} ${styles['type-page__modal-icon--check-circle']}`}
        />
      ),
    };
  }, [game.isFinished, game.isNewRecord, game.isFirstTime]);

  const handleTypingComplete = (
    finalErrors: { index: number; expected: string; typed: string }[],
  ) => {
    game.setFinalErrors(finalErrors);
    game.setIsFinished(true);
    handleTimeUp();
  };

  return (
    <div className={`${styles['type-page']} adults-mode`}>
      <Header variant="type" personalBestWpm={personalBest} />

      <div className={styles['type-page__toolbar']}>
        <div className={styles['type-page__stats']}>
          <div className={styles['type-page__stat']}>
            <span className={styles['type-page__label']}>WPM:</span>
            <strong className={styles['type-page__value']}>{game.wpm}</strong>
          </div>

          <div className={styles['type-page__stat']}>
            <span className={styles['type-page__label']}>Accuracy:</span>
            <strong className={styles['type-page__value']}>
              {game.accuracy}%
            </strong>
          </div>

          <div className={styles['type-page__stat']}>
            <span className={styles['type-page__label']}>Time:</span>
            <Timer
              key={game.timerKey}
              duration={duration === 'inf' ? 0 : duration}
              isActive={game.isActive && !game.isFinished}
              onTimeUp={handleTimeUp}
            />
          </div>
        </div>

        <nav className={styles['type-page__config']}>
          <GameOption<Category>
            label="Mode"
            options={['standard', 'quotes', 'code', 'lyrics']}
            currentValue={category}
            onChange={(v) => {
              setCategory(v);
              game.handleNewText();
            }}
          />
          <GameOption<keyof DifficultyLevels>
            label="Difficulty"
            options={['easy', 'medium', 'hard']}
            currentValue={difficulty}
            onChange={(v) => {
              setDifficulty(v);
              game.handleNewText();
            }}
          />
          <GameOption<number | 'inf'>
            label="Time"
            options={timeOptions}
            currentValue={duration}
            onChange={(v) => {
              setDuration(v);
              game.handleNewText();
            }}
          />
        </nav>

        <button
          className={styles['type-page__config-btn']}
          aria-label="Open Settings"
          onClick={() => {
            setTempCategory(category);
            setTempDifficulty(difficulty);
            setTempDuration(duration);
            setIsConfigOpen(true);
          }}
          onKeyDown={(e) => handleActionKeyDown(e, () => setIsConfigOpen(true))}
        >
          <Settings size={20} />
        </button>
      </div>

      <main className={styles['type-page__main']}>
        {!game.isFinished && (
          <TypingGame
            key={`${category}-${difficulty}-${duration}-${game.refreshSeed}`}
            text={currentText}
            category={category}
            isFinished={game.isFinished}
            onStatsUpdate={game.handleStatsUpdate}
            onComplete={handleTypingComplete}
            onStart={() => game.setIsActive(true)}
          />
        )}
      </main>
      <button
        className={styles['type-page__btn-refresh']}
        aria-label="Restart Game"
        onClick={game.handleNewText}
        onKeyDown={(e) => handleActionKeyDown(e, game.handleNewText)}
      >
        <RotateCcw size={24} />
      </button>
      {game.isFinished && modalContent && (
        <ResultsModal
          mode="type"
          wpm={game.wpm}
          accuracy={game.accuracy}
          correct={game.correct}
          mistakes={game.finalErrors.length}
          onRestart={game.handleNewText}
          {...modalContent}
        />
      )}

      {isConfigOpen && (
        <div
          className={styles['config-modal__overlay']}
          onClick={() => setIsConfigOpen(false)}
        >
          <div
            className={styles['config-modal']}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <header className={styles['config-modal__header']}>
              <h3>Settings</h3>
              <button
                onClick={() => setIsConfigOpen(false)}
                onKeyDown={(e) =>
                  handleActionKeyDown(e, () => setIsConfigOpen(false))
                }
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </header>

            <div className={styles['config-modal__content']}>
              <GameOption<Category>
                label="Mode"
                options={['standard', 'quotes', 'code', 'lyrics']}
                currentValue={tempCategory}
                onChange={(v) => setTempCategory(v)}
              />
              <GameOption<keyof DifficultyLevels>
                label="Difficulty"
                options={['easy', 'medium', 'hard']}
                currentValue={tempDifficulty}
                onChange={(v) => setTempDifficulty(v)}
              />
              <GameOption<number | 'inf'>
                label="Time"
                options={timeOptions}
                currentValue={tempDuration}
                onChange={(v) => setTempDuration(v)}
              />
            </div>

            <footer className={styles['config-modal__footer']}>
              <button
                className={styles['config-modal__cancel']}
                onClick={() => setIsConfigOpen(false)}
                onKeyDown={(e) =>
                  handleActionKeyDown(e, () => setIsConfigOpen(false))
                }
              >
                Cancel
              </button>
              <button
                className={styles['config-modal__apply']}
                onClick={() => {
                  setCategory(tempCategory);
                  setDifficulty(tempDifficulty);
                  setDuration(tempDuration);
                  game.handleNewText();
                  setIsConfigOpen(false);
                }}
                onKeyDown={(e) =>
                  handleActionKeyDown(e, () => {
                    setCategory(tempCategory);
                    setDifficulty(tempDifficulty);
                    setDuration(tempDuration);
                    game.handleNewText();
                    setIsConfigOpen(false);
                  })
                }
              >
                Apply
              </button>
            </footer>
          </div>
        </div>
      )}
      <ModeSelector />
    </div>
  );
};
