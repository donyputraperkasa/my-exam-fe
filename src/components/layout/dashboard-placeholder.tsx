import { DashboardShell } from "./dashboard-shell";
import type { UserRole } from "@/types/auth";

type DashboardPlaceholderProps = {
  description: string;
  eyebrow: string;
  role: UserRole;
  title: string;
};

export function DashboardPlaceholder({
  description,
  eyebrow,
  role,
  title,
}: DashboardPlaceholderProps) {
  return (
    <DashboardShell eyebrow={eyebrow} role={role} title={title}>
      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-secondary">
          Tahap berikutnya
        </p>
        <h2 className="mt-3 text-2xl font-extrabold">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          {description}
        </p>
      </section>
    </DashboardShell>
  );
}
