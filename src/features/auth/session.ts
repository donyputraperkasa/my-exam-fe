"use client";

import type { AuthResponse, AuthUser, StudentGrade } from "@/types/auth";

const TOKEN_KEY = "my-exam-token";
const USER_KEY = "my-exam-user";
const GRADE_KEY = "my-exam-grade";

export function saveSession(session: AuthResponse) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(TOKEN_KEY, session.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = localStorage.getItem(USER_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    clearSession();
    return null;
  }
}

export function saveSelectedGrade(grade: StudentGrade) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(GRADE_KEY, grade);
}

export function getSelectedGrade(): StudentGrade | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(GRADE_KEY) as StudentGrade | null;
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(GRADE_KEY);
}
