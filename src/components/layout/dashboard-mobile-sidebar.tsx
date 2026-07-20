"use client";

import { X } from "lucide-react";
import type { AuthUser, UserRole } from "@/types/auth";
import { DashboardSidebar } from "./dashboard-sidebar";

type DashboardMobileSidebarProps = {
  eyebrow: string;
  onClose: () => void;
  onLogout: () => void;
  open: boolean;
  role: UserRole;
  user: AuthUser;
};

export function DashboardMobileSidebar({
  eyebrow,
  onClose,
  onLogout,
  open,
  role,
  user,
}: DashboardMobileSidebarProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        aria-label="Tutup menu navigasi"
        onClick={onClose}
        className={`absolute inset-0 bg-foreground/35 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        id="dashboard-mobile-sidebar"
        role="dialog"
        aria-label="Menu dashboard"
        aria-modal="true"
        className={`absolute inset-y-0 left-0 w-[min(86vw,320px)] border-r border-violet-200 bg-[#ede9fe] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <DashboardSidebar
          eyebrow={eyebrow}
          onLogout={onLogout}
          onNavigate={onClose}
          role={role}
          user={user}
        />
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          onClick={onClose}
          className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-white text-muted transition hover:border-primary hover:text-primary"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
