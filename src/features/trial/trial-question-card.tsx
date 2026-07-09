type TrialQuestionCardProps = {
  index: number;
  question: string;
};

export function TrialQuestionCard({ index, question }: TrialQuestionCardProps) {
  return (
    <article className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-secondary">
        Soal {index + 1}
      </p>
      <h2 className="mt-2 text-base font-extrabold text-foreground">
        {question}
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-semibold">
        {["A", "B", "C", "D"].map((option) => (
          <button
            key={option}
            type="button"
            className="rounded-md border border-border px-3 py-2 text-left transition hover:border-primary hover:bg-primary/5"
          >
            {option}. Pilihan jawaban
          </button>
        ))}
      </div>
    </article>
  );
}
