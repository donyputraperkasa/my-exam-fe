import { apiFetch } from "@/lib/api/client";
import type { ExamPackage, PaginatedResponse } from "@/types/exam";

export function fetchStudentPackages() {
  return apiFetch<PaginatedResponse<ExamPackage>>("/exam-packages?limit=50");
}

export function fetchStudentPackage(id: string) {
  return apiFetch<ExamPackage>(`/exam-packages/${id}`);
}
