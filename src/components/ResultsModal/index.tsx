import styles from './ResultsModal.module.scss';
import type { ResultsModalProps } from './types';

export const ResultsModal = ({
  wpm,
  accuracy,
  onRestart,
}: ResultsModalProps) => {
  return (
    <div className={styles['results-modal']}>
      <div className={styles['results-modal__card']}>
        <h2 className={styles['results-modal__title']}>Final Results</h2>

        <div className={styles['results-modal__grid']}>
          <div className={styles['results-modal__item']}>
            <span>WPM</span>
            <strong>{wpm}</strong>
          </div>

          <div className={styles['results-modal__item']}>
            <span>Accuracy</span>
            <strong>{accuracy}%</strong>
          </div>
        </div>

        <button className={styles['results-modal__btn']} onClick={onRestart}>
          Restart Test
        </button>
      </div>
    </div>
  );
};
