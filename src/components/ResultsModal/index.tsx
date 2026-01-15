import styles from './ResultsModal.module.scss';
import type { ResultsModalProps } from './types';

export const ResultsModal = ({
  wpm,
  accuracy,
  onRestart,
  correct,
  mistakes,
  icon,
  title,
  description,
}: ResultsModalProps) => {
  return (
    <div className={styles['results-modal']}>
      <div className={styles['results-modal__card']}>
        <header className={styles['results-modal__header']}>
          {icon && <div className={styles['results-modal__icon']}>{icon}</div>}
          <h2 className={styles['results-modal__title']}>{title}</h2>
          <p className={styles['results-modal__description']}>{description}</p>
        </header>

        <div className={styles['results-modal__stats']}>
          <div className={styles['results-modal__item']}>
            <span className={styles['results-modal__label']}>WPM</span>
            <strong className={styles['results-modal__value']}>{wpm}</strong>
          </div>

          <div className={styles['results-modal__item']}>
            <span className={styles['results-modal__label']}>Accuracy</span>
            <strong className={styles['results-modal__value']}>
              {accuracy}%
            </strong>
          </div>

          <div className={styles['results-modal__item']}>
            <span className={styles['results-modal__label']}>Characteres</span>
            <strong
              className={`${styles['results-modal__chars']} ${styles['results-modal__value']}`}
            >
              <span className={styles['results-modal__chars--correct']}>
                {correct}
              </span>
              <span className={styles['results-modal__chars--separator']}>
                /
              </span>
              <span className={styles['results-modal__chars--mistakes']}>
                {mistakes}
              </span>
            </strong>
          </div>
        </div>

        <button className={styles['results-modal__btn']} onClick={onRestart}>
          Restart Test
        </button>
      </div>
    </div>
  );
};
