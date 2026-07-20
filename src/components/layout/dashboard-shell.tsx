"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useAuthGuard } from "@/features/auth/use-auth-guard";
import { clearSession } from "@/features/auth/session";
import { useIdleLogout } from "@/features/auth/use-idle-logout";
import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";
import { AppBackground } from "./app-background";
import { DashboardMobileSidebar } from "./dashboard-mobile-sidebar";
import { DashboardRouteBreadcrumbs } from "./dashboard-route-breadcrumbs";
import { DashboardSidebar } from "./dashboard-sidebar";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSidebarOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const handleLogout = useCallback(() => {
    setSidebarOpen(false);
    clearSession();
    router.replace(appRoutes.home);
  }, [router]);

  useIdleLogout(handleLogout);

  if (!ready || !user) {
    return <LoadingDashboard />;
  }

  return (
    <main className="relative h-screen overflow-hidden bg-background text-foreground">
      <AppBackground />
      <div className="relative grid h-screen w-full gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
        <DashboardSidebar
          className="hidden border-r border-border lg:flex"
          eyebrow={eyebrow}
          onLogout={handleLogout}
          role={role}
          user={user}
        />

        <section className="min-h-0 min-w-0 overflow-x-hidden overflow-y-auto px-5 py-6 md:px-8 xl:px-10">
          <div className="sticky top-0 z-30 -mx-5 -mt-6 mb-5 flex items-center justify-between border-b border-border bg-white/90 px-5 py-3 backdrop-blur-xl md:-mx-8 md:px-8 lg:hidden">
            <div>
              <p className="text-sm font-extrabold">My Exam</p>
              <p className="text-xs font-medium text-muted">{eyebrow}</p>
            </div>
            <button
              type="button"
              aria-controls="dashboard-mobile-sidebar"
              aria-expanded={sidebarOpen}
              aria-label="Buka menu navigasi"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white text-foreground shadow-sm transition hover:border-primary hover:text-primary"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          <header className="relative mb-6 overflow-hidden rounded-lg border border-violet-400/30 bg-[#5b21b6] p-6 text-white shadow-sm">
            <div className="absolute inset-y-0 right-0 w-1/3 border-l border-white/10 bg-white/5" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-wide text-violet-200">
                {eyebrow}
              </p>
              <h1 className="mt-2 text-2xl font-extrabold md:text-4xl">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-violet-100">
                Kelola progres belajar, paket soal, dan akses pengguna dari satu
                ruang kerja yang lebih fokus.
              </p>
            </div>
          </header>
          <DashboardRouteBreadcrumbs role={role} title={title} />
          {children}
        </section>
      </div>
      <DashboardMobileSidebar
        eyebrow={eyebrow}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        open={sidebarOpen}
        role={role}
        user={user}
      />
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
