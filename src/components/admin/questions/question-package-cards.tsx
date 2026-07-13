import { Boxes, Check, CircleDashed, Gift, PackageCheck } from "lucide-react";
import {
  isUnassignedQuestion,
  QUESTION_FILTER,
} from "@/features/admin/questions/question-category";
import type { ExamPackage, Question } from "@/types/exam";

type QuestionPackageCardsProps = {
  onSelect: (id: string) => void;
  packages: ExamPackage[];
  questions: Question[];
  selectedId: string;
};

export function QuestionPackageCards({
  onSelect,
  packages,
  questions,
  selectedId,
}: QuestionPackageCardsProps) {
  const summaryCards = [
    {
      id: QUESTION_FILTER.all,
      label: "Semua Soal",
      count: questions.length,
      icon: Boxes,
      color: "border-sky-200 bg-sky-50/80 text-sky-700",
    },
    {
      id: QUESTION_FILTER.free,
      label: "Soal Gratis",
      count: questions.filter((item) => item.isPublicPreview).length,
      icon: Gift,
      color: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
    },
    {
      id: QUESTION_FILTER.unassigned,
      label: "Belum Masuk Paket",
      count: questions.filter(isUnassignedQuestion).length,
      icon: CircleDashed,
      color: "border-amber-200 bg-amber-50/80 text-amber-700",
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-white/90 p-5 shadow-sm">
      <div>
        <p className="text-sm font-black uppercase text-secondary">
          Kategori Bank Soal
        </p>
        <p className="mt-1 text-sm font-semibold text-muted">
          Pilih kategori untuk melihat soal di dalamnya.
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((item) => {
          const Icon = item.icon;
          const selected = selectedId === item.id;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`relative flex min-h-28 items-center gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${item.color} ${selected ? "ring-2 ring-current ring-offset-2" : ""}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                <Icon className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-black text-foreground">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm font-bold">
                  {item.count} soal
                </span>
              </span>
              {selected ? (
                <Check className="absolute right-3 top-3 h-4 w-4" />
              ) : null}
            </button>
          );
        })}

        {packages.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`relative min-h-28 rounded-xl border p-4 text-left text-violet-700 transition hover:-translate-y-0.5 hover:shadow-md ${selectedId === item.id ? "border-violet-400 bg-violet-100/80 ring-2 ring-violet-500 ring-offset-2" : "border-violet-200 bg-violet-50/70"}`}
          >
            {selectedId === item.id ? (
              <Check className="absolute right-3 top-3 h-4 w-4" />
            ) : null}
            <PackageCheck className="mb-3 h-6 w-6" />
            <p className="text-xs font-black uppercase text-secondary">
              {item.grade?.name} - {item.subject?.name}
            </p>
            <h3 className="mt-1 line-clamp-2 text-base font-black text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-xs font-bold uppercase text-violet-700">
              {item.accessType === "FREE" ? "Paket Gratis" : "Paket Premium"} ·{" "}
              {item._count?.questions ?? 0} soal
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
