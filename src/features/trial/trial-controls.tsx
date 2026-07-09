import type { ReactNode } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { trialQuestions } from "./trial-data";

export function TopBar({
  minutes,
  restSeconds,
}: {
  minutes: string;
  restSeconds: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <Link href={appRoutes.home} className="text-sm font-bold text-primary">
        Kembali ke beranda
      </Link>
      <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/95 px-6 py-3 text-xl font-black shadow-sm">
        <Clock className="h-5 w-5 text-secondary" />
        {minutes}:{restSeconds}
      </div>
    </div>
  );
}

export function QuestionNav({
  current,
  setCurrent,
}: {
  current: number;
  setCurrent: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {trialQuestions.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setCurrent(index)}
          className={`h-12 w-12 rounded-full border text-sm font-black ${
            current === index
              ? "border-primary bg-accent text-foreground shadow-sm"
              : "border-border bg-surface/95 hover:border-primary"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export function NavButton({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-surface/95 px-5 py-4 text-lg font-black text-primary shadow-sm transition hover:bg-primary/5 disabled:opacity-40"
    >
      {children}
    </button>
  );
}
