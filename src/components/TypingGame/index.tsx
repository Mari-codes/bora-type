import { useState, useRef, useEffect } from 'react';
import styles from './TypingGame.module.scss';
import { TypingDisplay } from '../TypingDisplay';
import type { TypingGameProps } from './types';

export const TypingGame = ({
  text,
  category,
  isFinished,
  onStatsUpdate,
  onComplete,
  onStart,
}: TypingGameProps) => {
  const [userInput, setUserInput] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [totalKeysPressed, setTotalKeysPressed] = useState(0);

  const [stats, setStats] = useState({ wpm: 0, accuracy: 100 });

  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number | null>(null);

  const wakeUpGame = () => {
    if (hasStarted || isFinished) return;

    setHasStarted(true);
    startTimeRef.current = Date.now();
    onStart();

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;
      if (e.key === 'Tab' || e.ctrlKey || e.metaKey) return;

      if (!hasStarted) {
        e.preventDefault();
        wakeUpGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, isFinished]);

  useEffect(() => {
    if (!hasStarted || isFinished || !startTimeRef.current) return;

    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTimeRef.current!;
      const elapsedMin = elapsedMs / 1000 / 60;

      let correctChars = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === text[i]) correctChars++;
      }

      const safeElapsedMin = Math.max(elapsedMin, 0.02);

      const wpm = Math.floor(correctChars / 5 / safeElapsedMin);

      const accuracy =
        totalKeysPressed > 0
          ? Math.floor(((totalKeysPressed - mistakes) / totalKeysPressed) * 100)
          : 100;

      setStats({ wpm, accuracy });
    }, 500);

    return () => clearInterval(interval);
  }, [hasStarted, isFinished, userInput, text, mistakes, totalKeysPressed]);

  useEffect(() => {
    onStatsUpdate({
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      active: hasStarted && !isFinished,
    });
  }, [stats, hasStarted, isFinished, onStatsUpdate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasStarted || isFinished) return;

    const value = e.target.value;

    if (value.length > userInput.length) {
      const idx = value.length - 1;

      if (text[idx] !== undefined) {
        setTotalKeysPressed((p) => p + 1);
        if (value[idx] !== text[idx]) {
          setMistakes((m) => m + 1);
        }
      }
    }

    if (value.length <= text.length) {
      setUserInput(value);
    }

    if (value.length === text.length && text.length > 0) {
      onComplete();
    }
  };

  return (
    <div
      className={`${styles['typing-game']} ${
        !hasStarted ? styles['typing-game--unfocused'] : ''
      }`}
      onClick={wakeUpGame}
    >
      {!hasStarted && !isFinished && (
        <div className={styles['typing-game__focus-notice']}>
          CLICK OR ANY KEY TO START
        </div>
      )}

      <input
        ref={inputRef}
        type="text"
        className={styles['typing-game__input']}
        value={hasStarted ? userInput : ''}
        onChange={handleInputChange}
        autoComplete="off"
        spellCheck={false}
      />

      <TypingDisplay
        text={text}
        userInput={userInput}
        active={hasStarted && !isFinished}
        category={category}
      />
    </div>
  );
};
