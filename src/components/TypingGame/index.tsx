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
  const [hasStarted, setHasStarted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const totalKeystrokesRef = useRef(0);
  const totalErrorsRef = useRef(0);
  const currentInputRef = useRef('');
  const firstKeyIgnoredRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const wakeUpGame = (fromClick = false) => {
    if (hasStarted || isFinished) return;

    setHasStarted(true);
    startTimeRef.current = Date.now();
    onStart();

    setTimeout(() => inputRef.current?.focus(), 10);

    if (fromClick) firstKeyIgnoredRef.current = true;
  };

  const wpmRef = useRef(0);

  useEffect(() => {
    if (!hasStarted || isFinished || !startTimeRef.current) return;

    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTimeRef.current!;
      const elapsedMin = elapsedMs / 1000 / 60;

      if (elapsedMs < 2000) return;

      const correct = currentInputRef.current
        .split('')
        .filter((c, i) => c === text[i]).length;

      const instantWpm = correct / 5 / elapsedMin;

      wpmRef.current = wpmRef.current * 0.7 + instantWpm * 0.3;
      const wpm = Math.floor(wpmRef.current);

      const accuracy =
        totalKeystrokesRef.current === 0
          ? 100
          : Math.floor(
              ((totalKeystrokesRef.current - totalErrorsRef.current) /
                totalKeystrokesRef.current) *
                100,
            );

      onStatsUpdate({
        wpm,
        accuracy,
        correct,
        mistakes: totalErrorsRef.current,
        active: true,
      });
    }, 100);

    return () => clearInterval(interval);
  }, [hasStarted, isFinished, onStatsUpdate, text]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;

      if (['Tab', 'Shift', 'Alt'].includes(e.key) || e.ctrlKey || e.metaKey)
        return;

      if (!firstKeyIgnoredRef.current) {
        wakeUpGame();
        firstKeyIgnoredRef.current = true;
        return;
      }

      if (e.key === 'Backspace') {
        currentInputRef.current = currentInputRef.current.slice(0, -1);
        setUserInput(currentInputRef.current);
        return;
      }

      if (e.key.length === 1) {
        const idx = currentInputRef.current.length;
        const expected = text[idx];
        const typed = e.key;

        totalKeystrokesRef.current += 1;
        if (!expected || typed !== expected) totalErrorsRef.current += 1;

        currentInputRef.current += typed;
        setUserInput(currentInputRef.current);

        if (currentInputRef.current.length >= text.length) {
          const finalErrors = [];
          for (let i = 0; i < text.length; i++) {
            if (currentInputRef.current[i] !== text[i]) {
              finalErrors.push({
                index: i,
                expected: text[i],
                typed: currentInputRef.current[i],
              });
            }
          }

          onComplete(finalErrors);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, text, onComplete]);

  return (
    <div
      className={`${styles['typing-game']} ${!hasStarted ? styles['typing-game--unfocused'] : ''}`}
      onClick={() => wakeUpGame(true)}
    >
      {!hasStarted && !isFinished && (
        <div className={styles['typing-game__focus-notice']}>
          click or type to start
        </div>
      )}

      <input
        className={styles['typing-game__input']}
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={() => {}}
        autoComplete="off"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        inputMode="text"
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
