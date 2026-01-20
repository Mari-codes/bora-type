import styles from './Logo.module.scss';
import type { LogoProps } from './types';

export const Logo = ({ mode }: LogoProps) => {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div
      className={`${styles.logo} ${styles[`logo--${mode}`]}`}
      onClick={goHome}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') goHome();
      }}
    >
      <span className={styles.logo__brand}>BORA</span>
      <span className={styles.logo__suffix}>
        {mode === 'type' ? 'type' : 'kids'}
      </span>
    </div>
  );
};
