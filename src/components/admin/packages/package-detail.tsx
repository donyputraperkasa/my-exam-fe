import Link from "next/link";
import { ArrowLeft, ImageIcon, ListChecks, Pencil, Video } from "lucide-react";
import type { ExamPackage, Question } from "@/types/exam";

type PackageDetailProps = {
  item: ExamPackage | null;
  onBack: () => void;
};

export function PackageDetail({ item, onBack }: PackageDetailProps) {
  if (!item) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-white/70 p-5">
        <p className="flex items-center gap-2 text-sm font-black uppercase text-secondary">
          <ListChecks className="h-4 w-4" /> Isi Paket
        </p>
        <p className="mt-3 text-sm font-bold text-muted">
          Klik salah satu kartu paket untuk melihat daftar soal di dalamnya.
        </p>
      </div>
    );
  }

  const questions = item.questions ?? [];

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full rounded-2xl border border-border bg-white/90 p-5 shadow-sm sm:p-6 lg:p-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-black text-foreground transition hover:-translate-y-0.5 hover:bg-background hover:shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke daftar paket
      </button>

      <div className="mt-6 flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-secondary">Detail Paket</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">{item.title}</h2>
          <p className="mt-2 text-sm font-bold text-muted sm:text-base">
            {item.grade?.name} - {item.subject?.name} · {item.accessType}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm font-black">
          <span className="rounded-full bg-background px-4 py-2">
            {questions.length} soal
          </span>
          {item.durationMinutes ? (
            <span className="rounded-full bg-background px-4 py-2">
              {item.durationMinutes} menit
            </span>
          ) : null}
        </div>
      </div>

      {!questions.length ? (
        <div className="mt-8 rounded-2xl border border-dashed border-danger/40 bg-danger/5 p-8 text-center">
          <p className="text-sm font-black text-danger">Paket ini belum berisi soal.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-4">
          {questions.map((entry, index) => (
            <QuestionRow
              key={entry.question.id}
              index={index}
              question={entry.question}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionRow({ index, question }: { index: number; question: Question }) {
  return (
    <article className="group relative w-full rounded-2xl border border-border/70 bg-background/75 p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase text-secondary">Soal {index + 1}</p>
          <h3 className="mt-2 line-clamp-3 text-base font-black leading-7 sm:text-lg">
            {question.question}
          </h3>
        </div>

        <Link
          href={`/admin/questions?edit=${question.id}`}
          aria-label={`Edit soal ${index + 1}`}
          title="Edit soal"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-foreground shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
        >
          <Pencil className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-muted">
        <span>{question.options.length} opsi</span>
        {question.explanation ? <span>Pembahasan teks</span> : null}
        {question.explanationImageUrl ? (
          <span className="inline-flex items-center gap-1">
            <ImageIcon className="h-3 w-3" /> Foto
          </span>
        ) : null}
        {question.explanationVideoUrl ? (
          <span className="inline-flex items-center gap-1">
            <Video className="h-3 w-3" /> Video
          </span>
        ) : null}
      </div>
    </article>
  );
}
