import { apiFetch } from "@/lib/api/client";
import type { Subject } from "@/types/exam";

type SubjectPayload = {
  gradeId: string;
  name: string;
};

export function fetchSubjects(gradeId?: string) {
  const query = gradeId ? `?gradeId=${gradeId}` : "";
  return apiFetch<Subject[]>(`/subjects${query}`);
}

export function createSubject(payload: SubjectPayload, token: string) {
  return apiFetch<Subject>("/admin/subjects", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function updateSubject(id: string, payload: SubjectPayload, token: string) {
  return apiFetch<Subject>(`/admin/subjects/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(payload),
  });
}

export function deleteSubject(id: string, token: string) {
  return apiFetch<{ message: string }>(`/admin/subjects/${id}`, {
    method: "DELETE",
    token,
  });
}
