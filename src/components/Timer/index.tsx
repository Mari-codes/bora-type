import { useEffect, useRef, useState } from 'react';
import styles from './Timer.module.scss';
import type { TimerProps } from './types';

const Timer = ({ duration, isActive, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      finishedRef.current = false;
    }

    const tick = () => {
      if (!startTimeRef.current) return;

      const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;

      const remaining = Math.max(0, duration - Math.floor(elapsedSeconds));

      setTimeLeft(remaining);

      if (remaining === 0 && !finishedRef.current) {
        finishedRef.current = true;
        onTimeUp();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, duration, onTimeUp]);

  useEffect(() => {
    setTimeLeft(duration);
    startTimeRef.current = null;
    finishedRef.current = false;
  }, [duration]);

  return (
    <div className={styles['timer']}>
      <span
        className={`${styles['timer__value']} ${
          timeLeft <= 5 && isActive ? styles['timer__value--low'] : ''
        }`}
      >
        {timeLeft}s
      </span>
    </div>
  );
};

export default Timer;
