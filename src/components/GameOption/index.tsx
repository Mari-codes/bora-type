import styles from './GameOption.module.scss';
import type { GameOptionProps } from './types';

export const GameOption = <T extends string | number>({
  options,
  currentValue,
  onChange,
  label,
}: GameOptionProps<T>) => {
  return (
    <div className={styles['option-group']}>
      {label && <span className={styles['option-group__label']}>{label}</span>}
      <div className={styles['option-group__buttons']}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles['option-btn']} ${currentValue === option ? styles['option-btn--active'] : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
            {typeof option === 'number' ? 's' : ''}
          </button>
        ))}
      </div>
    </div>
  );
};
