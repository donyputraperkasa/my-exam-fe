import { apiFetch } from "@/lib/api/client";

export type RecapAttempt = {
  answers: Array<{ isCorrect: boolean }>;
  id: string;
  score: number | null;
  submittedAt: string | null;
  createdAt: string;
  package: { title: string; subject: { name: string } };
};

export type TrialResult = {
  id: string;
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  createdAt: string;
};

export type StudentRecapResponse = {
  subscription: {
    activeUntil: string | null;
    isActive: boolean;
  };
  summary: {
    attemptTotal: number;
    submittedTotal: number;
    trialTotal: number;
    averageScore: number;
    bestScore: number;
  };
  recentAttempts: RecapAttempt[];
  recentTrialResults: TrialResult[];
};

export function fetchStudentRecap(token: string) {
  return apiFetch<StudentRecapResponse>("/dashboard/me", { token });
}
