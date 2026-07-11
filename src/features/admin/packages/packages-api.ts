import { apiFetch } from "@/lib/api/client";
import type { AccessType, ExamPackage, PaginatedResponse } from "@/types/exam";

export type PackagePayload = {
  accessType: AccessType;
  durationMinutes?: number;
  gradeId: string;
  isActive: boolean;
  questionIds: string[];
  subjectId: string;
  title: string;
};

export function fetchAdminPackages(token: string) {
  return apiFetch<PaginatedResponse<ExamPackage>>(
    "/admin/exam-packages?limit=50",
    { token },
  );
}

export function fetchAdminPackage(id: string, token: string) {
  return apiFetch<ExamPackage>(`/admin/exam-packages/${id}`, { token });
}

export function createExamPackage(payload: PackagePayload, token: string) {
  return apiFetch<ExamPackage>("/admin/exam-packages", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function updateExamPackage(id: string, payload: PackagePayload, token: string) {
  return apiFetch<ExamPackage>(`/admin/exam-packages/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(payload),
  });
}

export function deleteExamPackage(id: string, token: string) {
  return apiFetch<{ message: string }>(`/admin/exam-packages/${id}`, {
    method: "DELETE",
    token,
  });
}
