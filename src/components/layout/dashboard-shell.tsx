"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu, Sparkles } from "lucide-react";
import { useAuthGuard } from "@/features/auth/use-auth-guard";
import { clearSession } from "@/features/auth/session";
import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";
import { AppBackground } from "./app-background";
import { DashboardNav } from "./dashboard-nav";
import { FloatingContact } from "./floating-contact";

type DashboardShellProps = {
  allowedRoles?: UserRole[];
  children: ReactNode;
  eyebrow: string;
  role: UserRole;
  title: string;
};

export function DashboardShell({
  allowedRoles,
  children,
  eyebrow,
  role,
  title,
}: DashboardShellProps) {
  const router = useRouter();
  const { ready, user } = useAuthGuard(allowedRoles ?? role);

  function handleLogout() {
    clearSession();
    router.replace(appRoutes.home);
  }

  if (!ready || !user) {
    return <LoadingDashboard />;
  }

  return (
    <main className="relative h-screen overflow-hidden bg-background text-foreground">
      <AppBackground />
      <div className="relative grid h-screen w-full gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="flex flex-col border-b border-border bg-white/82 px-5 py-5 backdrop-blur-xl lg:h-screen lg:border-b-0 lg:border-r">
          <div className="w-full">
            <Link href={appRoutes.home} className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-extrabold">My Exam</p>
                <p className="text-xs font-medium text-muted">{eyebrow}</p>
              </div>
            </Link>
            <div className="mt-6 rounded-lg border border-border bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase text-muted">Akun</p>
              <p className="mt-1 text-sm font-bold">{user.name}</p>
              <p className="mt-1 truncate text-xs text-muted">{user.email}</p>
            </div>
            <div className="mt-6">
              <DashboardNav role={role} />
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-bold text-muted transition hover:border-primary hover:bg-primary/10 hover:text-primary lg:mt-auto"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </aside>

        <section className="min-h-0 min-w-0 overflow-y-auto px-5 py-6 md:px-8 xl:px-10">
          <header className="relative mb-6 overflow-hidden rounded-lg border border-white/60 bg-[linear-gradient(120deg,rgba(124,58,237,0.86)_0%,rgba(255,107,107,0.74)_58%,rgba(251,191,36,0.68)_100%)] p-6 text-white shadow-sm">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.32),transparent_35%),radial-gradient(circle_at_30%_80%,rgba(251,191,36,0.24),transparent_30%)]" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                {eyebrow}
              </p>
              <h1 className="mt-2 text-2xl font-extrabold md:text-4xl">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                Kelola progres belajar, paket soal, dan akses pengguna dari satu
                ruang kerja yang lebih fokus.
              </p>
            </div>
          </header>
          {children}
        </section>
      </div>
      {role !== "ADMIN" ? <FloatingContact /> : null}
    </main>
  );
}

function LoadingDashboard() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="rounded-lg border border-border bg-surface p-6 text-sm font-semibold text-muted shadow-sm">
        <Menu className="mx-auto mb-3 h-6 w-6 text-secondary" />
        Menyiapkan dashboard...
      </div>
    </main>
  );
}
