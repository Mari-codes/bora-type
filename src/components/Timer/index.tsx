import { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.scss';
import type { TimerProps } from './types';

const Timer = ({ duration, isActive, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const prevDurationRef = useRef(duration);

  useEffect(() => {
    if (prevDurationRef.current !== duration) {
      setTimeLeft(duration);
      prevDurationRef.current = duration;
    }

    if (!isActive && (timeLeft === 0 || timeLeft === duration)) {
      setTimeLeft(duration);
    }
  }, [duration, isActive, timeLeft]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      onTimeUp();
    }

    return () => window.clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

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
