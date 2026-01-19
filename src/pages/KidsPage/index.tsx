import { useState, useMemo } from 'react';
import { RotateCcw, Star, PartyPopper, Rocket } from 'lucide-react';
import styles from './KidsPage.module.scss';
import { TypingGame } from '../../components/TypingGame';
import { GameOption } from '../../components/GameOption';
import Timer from '../../components/Timer';
import { Header } from '../../components/Header';
import { ResultsModal } from '../../components/ResultsModal';
import type { KidsCategory, DifficultyLevels } from '../../types/gameTypes';
import { usePersonalBest } from '../../hooks/usePersonalBest';
import { useFocusRescue } from '../../hooks/useFocusRescue';
import { useTypingGameLogic } from '../../hooks/useTypingGameLogic';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { kidsPassages } from '../../data/kidsContent';
import { ModeSelector } from '../../components/ModeSelector';

export const KidsPage = () => {
  const { personalBest, updatePersonalBest } = usePersonalBest('kids');
  const game = useTypingGameLogic();
  const [category, setCategory] = useState<KidsCategory>('standard');
  const [difficulty, setDifficulty] = useState<keyof DifficultyLevels>('easy');
  const [duration, setDuration] = useState<number>(30);

  useFocusRescue(game.handleNewText, game.isFinished);

  const { handleTimeUp } = useGameCompletion(
    game,
    personalBest,
    updatePersonalBest,
  );

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
            <span className={styles['kids-page__label']}>Timer:</span>
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
            options={['standard', 'quotes', 'lyrics']}
            currentValue={category}
            onChange={(v) => {
              setCategory(v);
              game.handleNewText();
            }}
            mode="kids"
          />
          <GameOption
            label="Level:"
            options={['easy', 'medium', 'hard']}
            currentValue={difficulty}
            onChange={(v) => {
              setDifficulty(v as any);
              game.handleNewText();
            }}
            mode="kids"
          />
          <GameOption
            label="Timer:"
            options={timeOptions}
            currentValue={duration}
            onChange={(val) => {
              setDuration(val as number);
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
            onComplete={handleTimeUp}
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
          wpm={game.wpm}
          accuracy={game.accuracy}
          correct={game.correct}
          mistakes={game.mistakes}
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
