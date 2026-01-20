import { Trophy } from 'lucide-react';
import styles from './Header.module.scss';
import { Logo } from '../Logo';
import type { HeaderProps } from './types';
import { ThemeToggle } from '../ThemeToggle';
import { TYPE_THEMES, KIDS_THEMES } from '../../constants/themes';

export const Header = ({ variant, personalBestWpm }: HeaderProps) => {
  return (
    <header className={`${styles.header} ${styles[`header--${variant}`]}`}>
      <div className={styles.header__container}>
        <Logo mode={variant} />

        <div className={styles.header__personalBest}>
          <div className={styles.header__bestContent}>
            <Trophy
              size={18}
              strokeWidth={2.5}
              className={styles.header__icon}
            />

            <div className={styles.header__info}>
              <span className={styles.header__label}>Personal Best:</span>

              <div className={styles.header__valueWrapper}>
                <span className={styles.header__value}>{personalBestWpm}</span>
                <span className={styles.header__unit}>WPM</span>
              </div>
            </div>
          </div>

          <ThemeToggle
            themes={variant === 'type' ? [...TYPE_THEMES] : [...KIDS_THEMES]}
            storageKey={variant === 'type' ? 'type-theme' : 'kids-theme'}
            defaultTheme={variant === 'type' ? 'dark' : 'candy'}
          />
        </div>
      </div>
    </header>
  );
};
