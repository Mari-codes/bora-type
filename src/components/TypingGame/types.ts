export interface TypingGameProps {
  text: string;
  category: string;
  isFinished: boolean;
  onStatsUpdate: (stats: {
    wpm: number;
    accuracy: number;
    active: boolean;
  }) => void;
  onComplete: () => void;
  onStart: () => void;
}
