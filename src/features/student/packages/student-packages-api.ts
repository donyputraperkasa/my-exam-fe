import { apiFetch } from "@/lib/api/client";
import type { ExamPackage, PaginatedResponse } from "@/types/exam";

export function fetchStudentPackages(token: string) {
  return apiFetch<PaginatedResponse<ExamPackage>>(
    "/student/exam-packages?limit=50",
    { token },
  );
}

export function fetchStudentPackage(id: string, token: string) {
  return apiFetch<ExamPackage>(`/student/exam-packages/${id}`, { token });
}
