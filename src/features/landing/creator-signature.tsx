import { ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

type CreatorSignatureProps = {
  onOpenLicense: () => void;
  variant?: "floating" | "dashboard";
};

const baseClasses =
  "group relative isolate flex max-w-full flex-wrap items-center justify-center gap-2 overflow-hidden border border-border bg-surface/90 text-muted shadow-lg shadow-primary/10 backdrop-blur-xl";

const variants = {
  dashboard: "rounded-2xl px-4 py-3 text-xs sm:text-sm",
  floating: "rounded-full px-4 py-3 text-xs sm:gap-3 sm:px-5 sm:text-sm",
};

export function CreatorSignature({
  onOpenLicense,
  variant = "floating",
}: CreatorSignatureProps) {
  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      <span className="absolute inset-x-8 top-0 h-px bg-accent opacity-80" />
      <span className="flex items-center gap-2 font-semibold text-primary">
        <Sparkles className="h-4 w-4 text-accent" />
        My Exam v1.0
      </span>
      <Dot />
      <span>created by</span>
      <a
        href="https://portofolio-ku-gold.vercel.app/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 font-bold text-primary transition hover:text-secondary"
      >
        Dony Putra Perkasa
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
      <Dot />
      <button
        type="button"
        onClick={onOpenLicense}
        className="inline-flex items-center gap-1 font-semibold text-primary transition text-secondary hover:text-foreground"
      >
        <ShieldCheck className="h-4 w-4" />
        Lisensi
      </button>
    </div>
  );
}

function Dot() {
  return (
    <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(245,158,11,0.16)]" />
  );
}
