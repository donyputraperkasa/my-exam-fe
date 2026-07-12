import { apiFetch } from "@/lib/api/client";
import type { CreateTeacherQuestionPayload, TeacherQuestion } from "./api";

export function addTeacherQuestion(
  examId: string,
  payload: CreateTeacherQuestionPayload,
  token: string,
) {
  return apiFetch<TeacherQuestion>(`/teacher-exams/${examId}/questions`, {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

export function updateTeacherQuestion(
  examId: string,
  questionId: string,
  payload: CreateTeacherQuestionPayload,
  token: string,
) {
  return apiFetch<TeacherQuestion>(
    `/teacher-exams/${examId}/questions/${questionId}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
      token,
    },
  );
}

export function deleteTeacherQuestion(
  examId: string,
  questionId: string,
  token: string,
) {
  return apiFetch<{ message: string }>(
    `/teacher-exams/${examId}/questions/${questionId}`,
    { method: "DELETE", token },
  );
}
