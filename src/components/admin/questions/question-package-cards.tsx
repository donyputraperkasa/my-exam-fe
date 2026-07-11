import { Box, Layers3 } from "lucide-react";
import type { ExamPackage } from "@/types/exam";

type QuestionPackageCardsProps = {
  onSelect: (id: string) => void;
  packages: ExamPackage[];
  selectedId: string;
};

export function QuestionPackageCards({
  onSelect,
  packages,
  selectedId,
}: QuestionPackageCardsProps) {
  return (
    <section className="rounded-2xl border border-border bg-white/88 p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-black uppercase text-secondary">Card Paket Soal</p>
        <button
          type="button"
          onClick={() => onSelect("")}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-black ${selectedId ? "border-border bg-white text-muted" : "border-accent bg-accent text-foreground"}`}
        >
          <Layers3 className="h-4 w-4" /> Semua Paket
        </button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${selectedId === item.id ? "border-primary bg-primary/10" : "border-border bg-background/70"}`}
          >
            <Box className="mb-3 h-7 w-7 text-primary" />
            <p className="text-xs font-black uppercase text-secondary">
              {item.grade?.name} - {item.subject?.name}
            </p>
            <h3 className="mt-2 line-clamp-2 text-lg font-black">{item.title}</h3>
            <p className="mt-3 text-xs font-bold text-muted">
              {item.accessType} · {item._count?.questions ?? 0} soal
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
