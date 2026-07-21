import { CheckCircle2, MousePointerClick, PlayCircle, Users } from "lucide-react";
import type { AnalyticsSummary } from "@/features/analytics/api";

export function AnalyticsMetrics({ summary }: { summary: AnalyticsSummary }) {
  const metrics = [
    { label: "Pengunjung coba gratis", value: summary.uniqueVisitors, Icon: Users },
    { label: "Percobaan dimulai", value: summary.trialStarts, Icon: PlayCircle },
    { label: "Tryout selesai", value: summary.trialCompletions, Icon: CheckCircle2 },
    { label: "Klik register", value: summary.registerClicks, Icon: MousePointerClick },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ Icon, label, value }) => (
        <article
          key={label}
          className="min-w-0 rounded-lg border border-violet-100 bg-white p-5 shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <p className="mt-5 text-3xl font-black text-foreground">{value}</p>
          <p className="mt-1 break-words text-sm font-semibold text-muted">
            {label}
          </p>
        </article>
      ))}
    </section>
  );
}
