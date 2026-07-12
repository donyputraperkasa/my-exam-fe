import { apiFetch } from "@/lib/api/client";

export type TeacherCreditSummary = {
  balance: number | null;
  isUnlimited: boolean;
  history: Array<{
    amount: number;
    createdAt: string;
    exam: { title: string } | null;
    id: string;
    note: string | null;
    type: "GRANT" | "USE" | "REFUND";
  }>;
};

export function getTeacherCredits(token: string) {
  return apiFetch<TeacherCreditSummary>("/teacher-exams/credits/me", { token });
}
