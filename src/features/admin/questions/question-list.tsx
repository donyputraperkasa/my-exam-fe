import type { Question } from "@/types/exam";
import { QuestionCard } from "./question-card";

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
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {questions.map((item) => (
        <QuestionCard
          key={item.id}
          question={item}
          onEdit={() => onEdit(item)}
          onDelete={() => void onDelete(item.id)}
        />
      ))}
    </div>
  );
}
