export interface TypingGameProps {
  text: string;
  category: string;
  isFinished: boolean;
  onStatsUpdate: (stats: {
    wpm: number;
    correct: number;
    mistakes: number;
    accuracy: number;
    active: boolean;
  }) => void;
   onComplete: (finalErrors: { index: number; expected: string; typed: string }[]) => void; // <- muda aqui

  onStart: () => void;
}
