"use client";

import Link from "next/link";
import { LogOut, Sparkles } from "lucide-react";
import type { AuthUser, UserRole } from "@/types/auth";
import { appRoutes } from "@/lib/routes";
import { DashboardNav } from "./dashboard-nav";

type DashboardSidebarProps = {
  className?: string;
  eyebrow: string;
  onLogout: () => void;
  onNavigate?: () => void;
  role: UserRole;
  user: AuthUser;
};

export function DashboardSidebar({
  className = "",
  eyebrow,
  onLogout,
  onNavigate,
  role,
  user,
}: DashboardSidebarProps) {
  return (
    <aside
      className={`flex h-full flex-col bg-[#ede9fe] px-5 py-5 backdrop-blur-xl ${className}`}
    >
      <div className="w-full">
        <Link
          href={appRoutes.home}
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-extrabold">My Exam</p>
            <p className="text-xs font-medium text-muted">{eyebrow}</p>
          </div>
        </Link>

        <div className="mt-6 rounded-lg border border-border bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase text-muted">Akun</p>
          <p className="mt-1 text-sm font-bold">{user.name}</p>
          <p className="mt-1 truncate text-xs text-muted">{user.email}</p>
        </div>

        <div className="mt-6">
          <DashboardNav role={role} onNavigate={onNavigate} />
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md border border-violet-200 bg-white px-4 py-3 text-sm font-bold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Keluar
      </button>
    </aside>
  );
}
