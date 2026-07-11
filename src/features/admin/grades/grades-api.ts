import { apiFetch } from "@/lib/api/client";
import type { Grade } from "@/types/exam";

type GradePayload = {
  name: string;
};

export function fetchGrades() {
  return apiFetch<Grade[]>("/grades");
}

export function createGrade(payload: GradePayload, token: string) {
  return apiFetch<Grade>("/admin/grades", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function updateGrade(id: string, payload: GradePayload, token: string) {
  return apiFetch<Grade>(`/admin/grades/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(payload),
  });
}

export function deleteGrade(id: string, token: string) {
  return apiFetch<{ message: string }>(`/admin/grades/${id}`, {
    method: "DELETE",
    token,
  });
}
