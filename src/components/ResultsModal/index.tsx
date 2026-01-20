import { Share2 } from 'lucide-react';
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
  mode,
}: ResultsModalProps) => {
  const handleShare = () => {
    const gameLink = 'https://bora-type.vercel.app/';
    const star = '\u2B50';

    const text =
      mode === 'kids'
        ? ` ${star}I played BoraKids!\nI scored ${wpm} WPM with ${accuracy}% accuracy! Correct: ${correct}, Mistakes: ${mistakes}.\nCan you beat my score? Try it here: ${gameLink}`
        : `I just completed a Typing Test on Bora Type!\nResult: ${wpm} WPM, Accuracy: ${accuracy}%\nCorrect: ${correct}, Mistakes: ${mistakes}.\nChallenge yourself and see if you can do better: ${gameLink}`;
    if (navigator.share) {
      navigator
        .share({
          title: 'Meu resultado no Bora Type!',
          text,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
    }
  };

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
            <span className={styles['results-modal__label']}>Characters</span>
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

        <div className={styles['results-modal__actions']}>
          <button
            className={styles['results-modal__btn-primary']}
            onClick={onRestart}
          >
            Restart Test
          </button>
          <button
            className={styles['results-modal__btn-icon']}
            onClick={handleShare}
          >
            <Share2 className={styles['results-modal__icon-small']} />
          </button>
        </div>
      </div>
    </div>
  );
};
