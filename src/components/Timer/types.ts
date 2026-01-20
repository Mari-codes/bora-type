export interface TimerProps {
  duration: number | 'inf';
  isActive: boolean;
  onTimeUp: () => void;
}
