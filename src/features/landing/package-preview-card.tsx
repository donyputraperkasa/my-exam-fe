import type { LucideIcon } from "lucide-react";

type PackagePreviewCardProps = {
  Icon: LucideIcon;
  badge: string;
  features: string[];
  meta: string;
  onStartFree: () => void;
  price: string;
  title: string;
  tone: string;
};

const tones: Record<string, string> = {
  amber: "border-amber-200 from-white via-amber-50 to-yellow-100 text-amber-700",
  slate: "border-slate-200 from-white via-slate-50 to-slate-100 text-slate-900",
  violet: "border-violet-200 from-white via-violet-50 to-indigo-100 text-violet-700",
};

export function PackagePreviewCard({
  Icon,
  badge,
  features,
  meta,
  onStartFree,
  price,
  title,
  tone,
}: PackagePreviewCardProps) {
  const free = title === "Free";

  return (
    <button
      type="button"
      onClick={free ? onStartFree : undefined}
      className={`flex min-h-[360px] flex-col rounded-3xl border bg-gradient-to-br p-5 text-left shadow-lg transition hover:-translate-y-1 ${tones[tone]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-white">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-black">
          {badge}
        </span>
      </div>
      <p className="mt-4 text-lg font-black text-foreground">{title}</p>
      <p className="mt-1 text-3xl font-black">{price}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-muted">{meta}</p>
      <ul className="mt-5 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="text-xs font-bold leading-5 text-foreground/80">
            - {feature}
          </li>
        ))}
      </ul>
      
      <span className="mt-6 w-full rounded-xl bg-accent px-4 py-3 text-center text-sm font-black text-foreground">
        {free ? "Mulai Gratis" : "Segera Hadir"}
      </span>
    </button>
  );
}
