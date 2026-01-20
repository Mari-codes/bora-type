import { useEffect, useRef, useState } from 'react';
import styles from './Timer.module.scss';
import type { TimerProps } from './types';

const Timer = ({ duration, isActive, onTimeUp }: TimerProps) => {
  const isInfinite = duration === 0 || duration === 'inf';
  const [timeLeft, setTimeLeft] = useState(isInfinite ? 0 : duration);

  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      startTimeRef.current = null;
      return;
    }

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      finishedRef.current = false;
    }

    const tick = () => {
      if (!startTimeRef.current) return;

      const elapsedSeconds = Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );

      if (isInfinite) {
        setTimeLeft(elapsedSeconds);
      } else {
        const remaining = Math.max(0, duration - elapsedSeconds);
        setTimeLeft(remaining);

        if (remaining === 0 && !finishedRef.current) {
          finishedRef.current = true;
          onTimeUp();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, duration, onTimeUp, isInfinite]);

  useEffect(() => {
    setTimeLeft(isInfinite ? 0 : duration);
    startTimeRef.current = null;
    finishedRef.current = false;
  }, [duration, isInfinite]);

  return (
    <div className={styles['timer']}>
      <span
        className={`${styles['timer__value']} ${
          !isInfinite && timeLeft <= 5 && isActive
            ? styles['timer__value--low']
            : ''
        }`}
      >
        {timeLeft}s
      </span>
    </div>
  );
};

export default Timer;
