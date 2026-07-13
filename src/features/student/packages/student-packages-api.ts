import { apiFetch } from "@/lib/api/client";
import type { ExamPackage, PaginatedResponse } from "@/types/exam";

export function fetchStudentPackages(token: string) {
  return apiFetch<PaginatedResponse<ExamPackage>>(
    "/student/exam-packages?limit=50",
    { token },
  );
}

export function fetchStudentPackage(id: string, token: string) {
  return apiFetch<ExamPackage>(`/student/exam-packages/${id}`, { token });
}

export type PackageAttempt = {
  id: string;
  score: number | null;
  answers: Array<{ isCorrect: boolean }>;
};

export function startPackageAttempt(packageId: string, token: string) {
  return apiFetch<PackageAttempt>("/attempts/start", {
    method: "POST",
    body: JSON.stringify({ packageId }),
    token,
  });
}

export function savePackageAnswer(attemptId: string, questionId: string, selectedOptionId: string, token: string) {
  return apiFetch<{ message: string }>(`/attempts/${attemptId}/answers`, {
    method: "POST",
    body: JSON.stringify({ questionId, selectedOptionId }),
    token,
  });
}

export function submitPackageAttempt(attemptId: string, token: string) {
  return apiFetch<PackageAttempt>(`/attempts/${attemptId}/submit`, {
    method: "POST",
    token,
  });
}
