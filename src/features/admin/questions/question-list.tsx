import { ImageIcon, Pencil, Trash2, Video } from "lucide-react";
import type { Question } from "@/types/exam";

type QuestionListProps = {
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (item: Question) => void;
  questions: Question[];
};

export function QuestionList({
  loading,
  onDelete,
  onEdit,
  questions,
}: QuestionListProps) {
  if (loading) {
    return <p className="mt-4 text-sm text-muted">Memuat soal...</p>;
  }

  if (!questions.length) {
    return <p className="mt-4 text-sm text-muted">Belum ada soal.</p>;
  }

  return (
    <div className="mt-4 grid gap-3">
      {questions.map((item) => (
        <article key={item.id} className="rounded-lg bg-background/80 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-secondary">
                {item.grade?.name} - {item.subject?.name}
              </p>
              <h2 className="mt-2 font-black leading-6">{item.question}</h2>
              <p className="mt-2 text-xs font-bold text-muted">
                {item.isPublicPreview ? "Trial gratis" : "Paket latihan"} ·{" "}
                {item.difficulty}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(item)} className="rounded-md border border-border p-2">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => void onDelete(item.id)} className="rounded-md border border-border p-2 text-danger">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-muted">
            {item.explanationImageUrl ? <span className="inline-flex items-center gap-1"><ImageIcon className="h-3 w-3" /> Foto</span> : null}
            {item.explanationVideoUrl ? <span className="inline-flex items-center gap-1"><Video className="h-3 w-3" /> Video</span> : null}
            {item.explanation ? <span>Pembahasan teks</span> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
