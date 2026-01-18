import { useEffect } from 'react';

export const useFocusRescue = (
  onThemeChange: () => void,
  isFinished: boolean,
) => {
  useEffect(() => {
    const getGameInput = () =>
      document.querySelector('input[type="text"]') as HTMLInputElement;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          onThemeChange();
          setTimeout(() => getGameInput()?.focus(), 50);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.ctrlKey || e.metaKey || isFinished) return;

      const activeEl = document.activeElement;
      const input = getGameInput();

      if (input && activeEl !== input) {
        input.focus();
      }
    };

    const recoverFocus = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('button') && !target.closest('select')) {
        getGameInput()?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);
    window.addEventListener('click', recoverFocus);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleGlobalKeyDown, true);
      window.removeEventListener('click', recoverFocus);
    };
  }, [onThemeChange, isFinished]);
};
