import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './GameOption.module.scss';
import type { GameOptionProps } from './types';

export const GameOption = <T extends string | number>({
  options,
  currentValue,
  onChange,
  label,
  mode = 'adults',
}: GameOptionProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getOptionData = (opt: any) => {
    const isObject = typeof opt === 'object' && opt !== null;
    return {
      value: isObject ? opt.value : opt,
      label: isObject ? opt.label : opt,
    };
  };

  const activeOption = options.find(
    (opt) => getOptionData(opt).value === currentValue,
  );

  const activeLabel = activeOption
    ? getOptionData(activeOption).label
    : currentValue;

  const handleKeyDown = (e: React.KeyboardEvent, value: T) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(value);
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`${styles['option-group']} ${
        mode === 'kids' ? styles['option-group--kids'] : ''
      }`}
      ref={dropdownRef}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      {label && <span className={styles['option-group__label']}>{label}</span>}

      <div
        className={`${styles['custom-dropdown']} ${
          isOpen ? styles['custom-dropdown--open'] : ''
        }`}
      >
        <button
          type="button"
          className={styles['custom-dropdown__header']}
          onClick={() => setIsOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen((v) => !v);
            }
          }}
        >
          <span>{activeLabel}</span>
          <ChevronDown size={14} className={styles['custom-dropdown__icon']} />
        </button>

        {isOpen && (
          <ul className={styles['custom-dropdown__list']} role="listbox">
            {options.map((option, index) => {
              const { value, label } = getOptionData(option);
              const isActive = value === currentValue;

              return (
                <li key={index} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`${styles['custom-dropdown__item']} ${
                      isActive ? styles['custom-dropdown__item--active'] : ''
                    }`}
                    onClick={() => {
                      onChange(value as T);
                      setIsOpen(false);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, value as T)}
                  >
                    {label}
                    {typeof value === 'number' ? 's' : ''}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className={styles['option-group__buttons']}>
        {options.map((option, index) => {
          const { value, label } = getOptionData(option);
          const isActive = value === currentValue;

          return (
            <button
              key={index}
              type="button"
              className={`${styles['option-btn']} ${
                isActive ? styles['option-btn--active'] : ''
              }`}
              onClick={() => onChange(value as T)}
              onKeyDown={(e) => handleKeyDown(e, value as T)}
            >
              {label}
              {typeof value === 'number' ? 's' : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};
