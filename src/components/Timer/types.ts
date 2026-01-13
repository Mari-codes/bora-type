export interface TimerProps {
  duration: number;
  isActive: boolean;
  onTimeUp: () => void;
}
