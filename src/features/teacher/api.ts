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

export type CreateTeacherExamPayload = {
  title: string;
  description?: string;
  durationMinutes: number;
  pin: string;
};

export function getTeacherExams(token: string) {
  return apiFetch<TeacherExam[]>("/teacher-exams", { token });
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
