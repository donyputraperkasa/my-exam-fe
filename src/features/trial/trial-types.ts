export type TrialOption = {
  id: string;
  label: string;
  text: string;
};

export type TrialQuestion = {
  id: string;
  question: string;
  options: TrialOption[];
  answerId?: string;
};

export type TrialScore = {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  score: number;
};
