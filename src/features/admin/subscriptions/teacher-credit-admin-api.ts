import { apiFetch } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/exam";

export type AdminTeacherAccount = {
  email: string;
  id: string;
  name: string;
  teacherCreditBalance: number;
};

export function fetchTeacherAccounts(token: string) {
  return apiFetch<PaginatedResponse<AdminTeacherAccount>>(
    "/admin/users?role=TEACHER&limit=100",
    { token },
  );
}

export function grantTeacherCredit(teacherId: string, token: string) {
  return apiFetch<{ balance: number }>(
    `/teacher-exams/credits/${teacherId}/grant`,
    {
      method: "POST",
      body: JSON.stringify({ amount: 1, note: "Aktivasi manual owner" }),
      token,
    },
  );
}
