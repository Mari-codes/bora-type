import { useNavigate, useLocation } from 'react-router-dom';
import { Keyboard, Baby } from 'lucide-react';
import styles from './ModeSelector.module.scss';

export const ModeSelector = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isKids = pathname.startsWith('/kids');

  return (
    <div className={styles['mode-switch']}>
      <span className={styles['mode-switch__label']}>Mode</span>

      <div
        className={styles['mode-switch__track']}
        onClick={() => navigate(isKids ? '/type' : '/kids')}
      >
        <div
          className={`${styles['mode-switch__thumb']} ${
            isKids ? styles['mode-switch__thumb--kids'] : ''
          }`}
        >
          {isKids ? <Baby size={16} /> : <Keyboard size={16} />}
        </div>
      </div>
    </div>
  );
};
