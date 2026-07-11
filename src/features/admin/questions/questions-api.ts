import { apiFetch } from "@/lib/api/client";
import { env } from "@/lib/env";
import type { PaginatedResponse, Question } from "@/types/exam";

export type QuestionPayload = {
  difficulty: Question["difficulty"];
  explanation?: string;
  explanationImageUrl?: string;
  explanationVideoUrl?: string;
  gradeId: string;
  isActive: boolean;
  isPublicPreview: boolean;
  options: Array<{ label: string; text: string; isCorrect: boolean }>;
  packageIds: string[];
  question: string;
  subjectId: string;
};

export type QuestionQuery = {
  gradeId?: string;
  subjectId?: string;
};

export function fetchAdminQuestions(query: QuestionQuery, token: string) {
  const params = new URLSearchParams({ limit: "50" });
  if (query.gradeId) params.set("gradeId", query.gradeId);
  if (query.subjectId) params.set("subjectId", query.subjectId);

  return apiFetch<PaginatedResponse<Question>>(
    `/admin/questions?${params.toString()}`,
    { token },
  );
}

export function createQuestion(payload: QuestionPayload, token: string) {
  return apiFetch<Question>("/admin/questions", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function updateQuestion(id: string, payload: QuestionPayload, token: string) {
  return apiFetch<Question>(`/admin/questions/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(payload),
  });
}

export function deleteQuestion(id: string, token: string) {
  return apiFetch<{ message: string }>(`/admin/questions/${id}`, {
    method: "DELETE",
    token,
  });
}

export async function uploadExplanationImage(file: File, token: string) {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch(
    `${env.apiBaseUrl}/admin/uploads/explanation-images`,
    { method: "POST", headers: { Authorization: `Bearer ${token}` }, body },
  );

  if (!response.ok) {
    throw new Error("Upload foto pembahasan gagal");
  }

  return response.json() as Promise<{ url: string }>;
}
