"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import type { AuthUser, UserRole } from "@/types/auth";
import { getDashboardPath } from "./redirect";
import { getToken, getUser } from "./session";

type AuthState = {
  ready: boolean;
  user: AuthUser | null;
};

type SessionSnapshot = {
  token: string | null;
  user: AuthUser | null;
};

export function useAuthGuard(requiredRole?: UserRole): AuthState {
  const router = useRouter();
  const snapshot = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSnapshot,
  );
  const session = parseSessionSnapshot(snapshot);

  useEffect(() => {
    if (!session.token || !session.user) {
      router.replace(appRoutes.auth.login);
      return;
    }

    if (requiredRole && session.user.role !== requiredRole) {
      router.replace(getDashboardPath(session.user.role));
    }
  }, [requiredRole, router, session]);

  return {
    ready: Boolean(
      session.token && session.user && (!requiredRole || session.user.role === requiredRole),
    ),
    user: session.user,
  };
}

function subscribeSession(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getSessionSnapshot() {
  return JSON.stringify({ token: getToken(), user: getUser() });
}

function getServerSnapshot() {
  return "";
}

function parseSessionSnapshot(snapshot: string): SessionSnapshot {
  if (!snapshot) {
    return { token: null, user: null };
  }

  return JSON.parse(snapshot) as SessionSnapshot;
}
