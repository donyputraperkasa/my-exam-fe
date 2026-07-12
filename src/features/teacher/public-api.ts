import { apiFetch } from "@/lib/api/client";

export type PublicTeacherExam = {
  description: string | null;
  durationMinutes: number;
  questions: Array<{
    id: string;
    explanation: string | null;
    options: Array<{ id: string; label: string; text: string }>;
    order: number;
    question: string;
  }>;
  title: string;
};

export type JoinTeacherExamPayload = {
  attendanceNumber: string;
  className: string;
  name: string;
  pin: string;
};

export type TeacherExamParticipant = {
  id: string;
  name: string;
  participantToken: string;
};

export type SubmitTeacherExamResult = {
  correctAnswers: number;
  score: number | null;
  wrongAnswers: number;
};

export type TeacherExamEventType =
  | "TAB_HIDDEN"
  | "WINDOW_BLUR"
  | "COPY_ATTEMPT"
  | "PASTE_ATTEMPT"
  | "RIGHT_CLICK";

export type TeacherExamIntegrityResult = {
  blockReason: string | null;
  status: "IN_PROGRESS" | "SUBMITTED" | "BLOCKED";
  violationCount: number;
};

export function getPublicTeacherExam(shareToken: string) {
  return apiFetch<PublicTeacherExam>(`/teacher-exams/public/${shareToken}`);
}

export function joinTeacherExam(
  payload: JoinTeacherExamPayload,
  shareToken: string,
) {
  return apiFetch<TeacherExamParticipant>(
    `/teacher-exams/public/${shareToken}/join`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export function saveTeacherExamAnswer(
  participantToken: string,
  questionId: string,
  selectedOptionId: string,
) {
  return apiFetch(`/teacher-exams/participants/${participantToken}/answers`, {
    method: "POST",
    body: JSON.stringify({ questionId, selectedOptionId }),
  });
}

export function submitTeacherExam(participantToken: string) {
  return apiFetch<SubmitTeacherExamResult>(
    `/teacher-exams/participants/${participantToken}/submit`,
    { method: "POST" },
  );
}

export function recordTeacherExamEvent(
  participantToken: string,
  type: TeacherExamEventType,
) {
  return apiFetch<TeacherExamIntegrityResult>(
    `/teacher-exams/participants/${participantToken}/events`,
    {
      method: "POST",
      body: JSON.stringify({ type }),
    },
  );
}
