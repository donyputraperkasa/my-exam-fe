import type { LucideIcon } from "lucide-react";

type ActionButtonProps = {
  Icon: LucideIcon;
  soft?: boolean;
  text: string;
};

type InfoCardProps = {
  Icon: LucideIcon;
  label: string;
  text: string;
  value: string;
};

export function ActionButton({ Icon, soft, text }: ActionButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${
        soft
          ? "border border-violet-200 bg-white text-violet-600"
          : "bg-accent text-foreground shadow-lg shadow-amber-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      {text}
    </button>
  );
}

export function InfoCard({ Icon, label, text, value }: InfoCardProps) {
  return (
    <article className="rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm">
      <Icon className="h-7 w-7 text-violet-500" />
      <p className="mt-5 text-sm font-black text-muted">{label}</p>
      <h3 className="mt-1 text-4xl font-black">{value}</h3>
      <p className="mt-2 text-sm font-bold text-muted">{text}</p>
    </article>
  );
}
