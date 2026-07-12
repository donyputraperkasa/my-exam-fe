import { Pencil, Trash2 } from "lucide-react";
import type { TeacherQuestion } from "./api";

type TeacherQuestionListProps = {
  editable: boolean;
  onDelete: (id: string) => void;
  onEdit: (question: TeacherQuestion) => void;
  questions: TeacherQuestion[];
};

export function TeacherQuestionList({
  editable,
  onDelete,
  onEdit,
  questions,
}: TeacherQuestionListProps) {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <p className="text-sm font-black uppercase text-pink-400">Daftar soal</p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {!questions.length ? (
          <p className="rounded-xl bg-background/70 p-4 text-sm font-bold text-muted">
            Belum ada soal. Tambahkan soal pertama dulu.
          </p>
        ) : null}
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            editable={editable}
            onDelete={onDelete}
            onEdit={onEdit}
            question={question}
          />
        ))}
      </div>
    </section>
  );
}

function QuestionCard({ editable, onDelete, onEdit, question }: {
  editable: boolean;
  onDelete: (id: string) => void;
  onEdit: (question: TeacherQuestion) => void;
  question: TeacherQuestion;
}) {
  const correct = question.options.find((option) => option.isCorrect);
  return (
    <article className="rounded-xl bg-background/80 p-4">
      <p className="text-xs font-black uppercase text-pink-400">
        Soal {question.order}
      </p>
      <h3 className="mt-2 font-black">{question.question}</h3>
      <p className="mt-2 text-sm font-bold text-muted">
        Kunci jawaban: {correct?.label ?? "-"}
      </p>
      {editable ? (
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => onEdit(question)} className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-violet-100 text-xs font-black text-violet-600">
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button type="button" onClick={() => onDelete(question.id)} className="inline-flex h-9 w-10 items-center justify-center rounded-lg border border-red-100 text-red-500" aria-label="Hapus soal">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}
    </article>
  );
}
