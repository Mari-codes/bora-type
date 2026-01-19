import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import beeIcon from '../../assets/img/bee.png';

export const Home = () => {
  return (
    <main className={styles['home-split']}>
      <Link
        to="/kids"
        className={`${styles['home-split__side']} ${styles['home-split__side--kids']}`}
      >
        <img
          src={beeIcon}
          className={`${styles['home-split__bee']} ${styles['home-split__bee--1']}`}
          alt=""
        />
        <img
          src={beeIcon}
          className={`${styles['home-split__bee']} ${styles['home-split__bee--2']}`}
          alt=""
        />
        <div className={styles['home-split__content']}>
          <h2 className={styles['home-split__logo']}>
            <span className={styles['home-split__title']}>Bora</span>
            <span className={styles['home-split__subtitle']}>kids</span>
          </h2>

          <p className={styles['home-split__text']}>Let's play with letters!</p>
          <span className={styles['home-split__button']}>Play Now</span>
        </div>
      </Link>

      <Link
        to="/type"
        className={`${styles['home-split__side']} ${styles['home-split__side--adults']}`}
      >
        <div className={styles['home-split__content']}>
          <h2 className={styles['home-split__logo']}>
            <span className={styles['home-split__title']}>Bora</span>
            <span className={styles['home-split__subtitle']}>type</span>
          </h2>

          <p className={styles['home-split__text']}>
            Master your typing speed.
          </p>
          <span className={styles['home-split__button']}>Start Test</span>
        </div>
      </Link>
    </main>
  );
};
