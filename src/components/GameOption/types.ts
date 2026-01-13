export interface GameOptionProps<T> {
  options: T[];
  currentValue: T;
  onChange: (value: T) => void;
  label?: string;
}
