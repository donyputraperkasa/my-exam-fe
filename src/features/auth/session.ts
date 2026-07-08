"use client";

import type { AuthResponse, AuthUser } from "@/types/auth";

const TOKEN_KEY = "my-exam-token";
const USER_KEY = "my-exam-user";

export function saveSession(session: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, session.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  const value = localStorage.getItem(USER_KEY);
  return value ? (JSON.parse(value) as AuthUser) : null;
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
