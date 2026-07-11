import { apiFetch } from "@/lib/api/client";

export type TeacherExamStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

export type TeacherExam = {
  id: string;
  title: string;
  description: string | null;
  durationMinutes: number;
  pin: string;
  shareToken: string;
  status: TeacherExamStatus;
  createdAt: string;
  _count?: {
    participants: number;
    questions: number;
  };
};

export type TeacherQuestionOption = {
  id: string;
  isCorrect: boolean;
  label: string;
  text: string;
};

export type TeacherQuestion = {
  id: string;
  explanation: string | null;
  options: TeacherQuestionOption[];
  order: number;
  question: string;
};

export type TeacherExamDetail = TeacherExam & {
  questions: TeacherQuestion[];
};

export type CreateTeacherExamPayload = {
  title: string;
  description?: string;
  durationMinutes: number;
  pin: string;
};

export type CreateTeacherQuestionPayload = {
  explanation?: string;
  options: Array<{
    isCorrect: boolean;
    label: string;
    text: string;
  }>;
  question: string;
};

export function getTeacherExams(token: string) {
  return apiFetch<TeacherExam[]>("/teacher-exams", { token });
}

export function getTeacherExam(id: string, token: string) {
  return apiFetch<TeacherExamDetail>(`/teacher-exams/${id}`, { token });
}

export function createTeacherExam(
  payload: CreateTeacherExamPayload,
  token: string,
) {
  return apiFetch<TeacherExam>("/teacher-exams", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

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

export function publishTeacherExam(examId: string, token: string) {
  return apiFetch<TeacherExam>(`/teacher-exams/${examId}/publish`, {
    method: "PATCH",
    token,
  });
}
