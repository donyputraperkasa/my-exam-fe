import { apiFetch } from "@/lib/api/client";

export type PublicGrade = {
  id: string;
  name: string;
};

export function fetchPublicGrades() {
  return apiFetch<PublicGrade[]>("/grades");
}
