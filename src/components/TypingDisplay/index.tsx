import type { TypingDisplayProps } from './types';
import styles from './TypingDisplay.module.scss';

export const TypingDisplay = ({
  text,
  userInput,
  active,
  category,
}: TypingDisplayProps) => {
  const targetChars = text.split('');

  return (
    <div
      className={`
      ${styles['typing-display']} 
      ${active ? styles['typing-display--active'] : ''} 
      ${styles[`typing-display--${category}`]}
    `}
    >
      {targetChars.map((char, index) => {
        let modifier = '';
        const isCurrent = index === userInput.length;

        if (index < userInput.length) {
          modifier =
            userInput[index] === char
              ? styles['typing-display__char--correct']
              : styles['typing-display__char--incorrect'];
        }

        return (
          <span
            key={index}
            className={`
              ${styles['typing-display__char']} 
              ${modifier} 
              ${isCurrent ? styles['typing-display__char--current'] : ''}
            `}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
