import { useState, useMemo } from 'react';
import { RotateCcw, Star, PartyPopper, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';
import styles from './KidsPage.module.scss';
import { TypingGame } from '../../components/TypingGame';
import { GameOption } from '../../components/GameOption';
import Timer from '../../components/Timer';
import { Header } from '../../components/Header';
import { ResultsModal } from '../../components/ResultsModal';
import type { KidsCategory, DifficultyLevels } from '../../types/gameTypes';
import { useFocusRescue } from '../../hooks/useFocusRescue';
import { useTypingGameLogic } from '../../hooks/useTypingGameLogic';
import { kidsPassages } from '../../data/kidsContent';
import { ModeSelector } from '../../components/ModeSelector';

export const KidsPage = () => {
  const game = useTypingGameLogic();
  const [category, setCategory] = useState<KidsCategory>('standard');
  const [difficulty, setDifficulty] = useState<keyof DifficultyLevels>('easy');
  const [duration, setDuration] = useState<number>(30);

  useFocusRescue(game.handleNewText, game.isFinished);

  const handleTimeUp = () => {
    if (game.isFinished) return;

    const storageKey = 'typing-pb-kids';
    const savedPB = Number(localStorage.getItem(storageKey) || 0);

    const isFirstTime = savedPB === 0;
    const isNewRecord = game.wpm > savedPB;

    if (isNewRecord) {
      localStorage.setItem(storageKey, game.wpm.toString());
    }

    if (isNewRecord && !isFirstTime) {
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

    if (isFirstTime) game.setIsFirstTime(true);
    else if (isNewRecord) game.setIsNewRecord(true);

    game.setIsActive(false);
    game.setIsFinished(true);
  };

  const personalBest = Number(localStorage.getItem('typing-pb-kids') || 0);

  const timeOptions = useMemo(() => [15, 30, 45, 60], []);

  const currentText = useMemo(() => {
    const list = kidsPassages[category][difficulty];
    return list[Math.floor(Math.random() * list.length)].text;
  }, [category, difficulty, game.refreshSeed]);

  const modalContent = useMemo(() => {
    if (!game.isFinished) return null;
    if (game.isFirstTime)
      return {
        title: 'First Star!',
        description: 'You did it! Welcome to the game!',
        icon: (
          <Star
            className={`${styles['kids-page__modal-icon']} ${styles['kids-page__modal-icon--star']}`}
          />
        ),
      };
    if (game.isNewRecord)
      return {
        title: 'Super Speed!',
        description: 'You are getting so fast!',
        icon: (
          <Rocket
            className={`${styles['kids-page__modal-icon']} ${styles['kids-page__modal-icon--rocket']}`}
          />
        ),
      };
    return {
      title: 'Great Job!',
      description: 'Practice makes perfect!',
      icon: (
        <PartyPopper
          className={`${styles['kids-page__modal-icon']} ${styles['kids-page__modal-icon--party-popper']}`}
        />
      ),
    };
  }, [game.isFinished, game.isNewRecord, game.isFirstTime]);

  const handleTypingComplete = (
    finalErrors: { index: number; expected: string; typed: string }[],
  ) => {
    game.setFinalErrors(finalErrors);
    handleTimeUp();
  };

  return (
    <div className={styles['kids-page']}>
      <Header variant="kids" personalBestWpm={personalBest} />

      <div className={styles['kids-page__toolbar']}>
        <div
          className={`${styles['kids-page__stats']} ${game.isActive ? styles['kids-page__stats--active'] : ''}`}
        >
          <div className={styles['kids-page__stat']}>
            <span className={styles['kids-page__label']}>Stars (WPM):</span>
            <strong className={styles['kids-page__value']}>{game.wpm}</strong>
          </div>
          <div className={styles['kids-page__stat']}>
            <span className={styles['kids-page__label']}>Accuracy:</span>
            <strong className={styles['kids-page__value']}>
              {game.accuracy}%
            </strong>
          </div>
          <div className={styles['kids-page__stat']}>
            <span className={styles['kids-page__label']}>Time:</span>
            <Timer
              key={game.timerKey}
              duration={duration}
              isActive={game.isActive && !game.isFinished}
              onTimeUp={handleTimeUp}
            />
          </div>
        </div>

        <nav className={styles['kids-page__config']}>
          <GameOption<KidsCategory>
            label="Mode:"
            options={['standard', 'quotes', 'lyrics', 'code']}
            currentValue={category}
            onChange={(v) => {
              setCategory(v);
              game.handleNewText();
            }}
            mode="kids"
          />
          <GameOption<keyof DifficultyLevels>
            label="Level:"
            options={['easy', 'medium', 'hard']}
            currentValue={difficulty}
            onChange={(v) => {
              setDifficulty(v);
              game.handleNewText();
            }}
            mode="kids"
          />
          <GameOption<number>
            label="Time:"
            options={timeOptions}
            currentValue={duration}
            onChange={(val) => {
              setDuration(val);
              game.handleNewText();
            }}
            mode="kids"
          />
        </nav>
      </div>

      <main className={styles['kids-page__main']}>
        {!game.isFinished && (
          <TypingGame
            key={`${category}-${difficulty}-${duration}-${game.refreshSeed}`}
            text={currentText}
            category="kids"
            isFinished={game.isFinished}
            onStatsUpdate={game.handleStatsUpdate}
            onComplete={handleTypingComplete}
            onStart={() => game.setIsActive(true)}
          />
        )}
      </main>

      <button
        className={styles['kids-page__btn-refresh']}
        onClick={game.handleNewText}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            game.handleNewText();
          }
        }}
        aria-label="Restart Game"
      >
        <RotateCcw className={styles['kids-page__btn-refresh-icon']} />
      </button>

      {game.isFinished && modalContent && (
        <ResultsModal
          mode="kids"
          wpm={game.wpm}
          accuracy={game.accuracy}
          correct={game.correct}
          mistakes={game.finalErrors.length}
          onRestart={game.handleNewText}
          title={modalContent.title}
          description={modalContent.description}
          icon={modalContent.icon}
        />
      )}

      <ModeSelector />
    </div>
  );
};
