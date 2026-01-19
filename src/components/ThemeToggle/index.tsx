import { Paintbrush } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import styles from './ThemeToggle.module.scss';
import type { ThemeToggleProps } from './types';

export function ThemeToggle({
  themes,
  storageKey,
  defaultTheme,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme,
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className={styles.themeToggle} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.themeToggle__trigger} ${isOpen ? styles['themeToggle__trigger--active'] : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(!isOpen))}
      >
        <Paintbrush
          size={18}
          strokeWidth={2.5}
          className={`${styles.themeToggle__icon} ${isOpen ? styles['themeToggle__icon--rotated'] : ''}`}
        />
        <span className={styles.themeToggle__currentName}>{theme}</span>
      </button>

      {isOpen && (
        <div className={styles.themeToggle__dropdown} role="listbox">
          {themes.map((t) => (
            <button
              type="button"
              key={t}
              className={`${styles.themeToggle__option} ${theme === t ? styles['themeToggle__option--selected'] : ''}`}
              onClick={() => {
                setTheme(t);
                setIsOpen(false);
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, () => {
                  setTheme(t);
                  setIsOpen(false);
                })
              }
            >
              {t}
              {theme === t && <div className={styles.themeToggle__dot} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
