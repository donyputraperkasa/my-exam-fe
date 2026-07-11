import { apiFetch } from "@/lib/api/client";
import type { AuthResponse } from "@/types/auth";

type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
  accountType: "STUDENT" | "TEACHER";
  gradeId?: string;
  schoolName?: string;
  teacherSubject?: string;
  schoolAddress?: string;
};

export function login(payload: LoginPayload) {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function register(payload: RegisterPayload) {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
