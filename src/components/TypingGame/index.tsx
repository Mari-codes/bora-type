import { useState, useRef, useEffect, useMemo } from 'react';
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

  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);

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

  const correctChars = useMemo(() => {
    let count = 0;

    for (let i = 0; i < userInput.length; i++) {
      const expected = text[i];
      const typed = userInput[i];

      if (!expected || !/[a-zA-Z]/.test(expected)) continue;

      if (typed === expected) {
        count++;
      }
    }

    return count;
  }, [userInput, text]);

  const mistakes = useMemo(() => {
    let count = 0;

    for (let i = 0; i < userInput.length; i++) {
      const expected = text[i];
      const typed = userInput[i];

      if (!expected || !/[a-zA-Z]/.test(expected)) continue;

      if (typed !== expected) {
        count++;
      }
    }

    return count;
  }, [userInput, text]);

  useEffect(() => {
    if (!hasStarted || isFinished || !startTimeRef.current) return;

    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTimeRef.current!;
      const elapsedMin = Math.max(elapsedMs / 1000 / 60, 1 / 60);

      const wpm = Math.floor(correctChars / 5 / elapsedMin);

      const accuracy =
        totalKeystrokes === 0
          ? 100
          : Math.floor(
              ((totalKeystrokes - totalErrors) / totalKeystrokes) * 100,
            );

      onStatsUpdate({
        wpm,
        accuracy,
        correct: correctChars,
        mistakes,
        active: true,
      });
    }, 250);

    return () => clearInterval(interval);
  }, [
    hasStarted,
    isFinished,
    correctChars,
    mistakes,
    totalKeystrokes,
    totalErrors,
    onStatsUpdate,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasStarted || isFinished) return;

    const value = e.target.value;

    if (value.length > userInput.length) {
      const idx = value.length - 1;
      const expected = text[idx];
      const typed = value[idx];

      if (expected && /[a-zA-Z]/.test(expected)) {
        setTotalKeystrokes((k) => k + 1);

        if (typed !== expected) {
          setTotalErrors((e) => e + 1);
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
