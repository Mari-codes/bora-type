export interface ResultsModalProps {
  wpm: number;
  accuracy: number;
  correct: number;
  mistakes: number;
  onRestart: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
}
