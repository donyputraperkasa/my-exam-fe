import type { LucideIcon } from "lucide-react";

type DashboardStatCardProps = {
  description: string;
  Icon: LucideIcon;
  title: string;
  value: string;
};

export function DashboardStatCard({
  description,
  Icon,
  title,
  value,
}: DashboardStatCardProps) {
  return (
    <article className="relative overflow-hidden rounded-lg border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <span className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2f6bff,#ff6b6b,#fbbf24)]" />
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-5 text-sm font-semibold text-muted">{title}</p>
      <p className="mt-2 text-3xl font-extrabold text-foreground">{value}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
