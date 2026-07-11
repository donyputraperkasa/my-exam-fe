import type { TrialOption } from "./trial-types";

type TrialQuestionCardProps = {
  current: number;
  onSelect: (answer: string) => void;
  options: TrialOption[];
  question: string;
  selectedAnswer?: string;
  total: number;
};

export function TrialQuestionCard({
  current,
  onSelect,
  options,
  question,
  selectedAnswer,
  total,
}: TrialQuestionCardProps) {
  return (
    <>
      <section className="rounded-[2rem] border border-border bg-surface/95 p-6 text-center shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-wide text-secondary">
          Soal {current + 1} dari {total}
        </p>
        <h1 className="mt-4 text-2xl font-black md:text-4xl">{question}</h1>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option, index) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`rounded-xl border px-5 py-4 text-left text-lg font-black shadow-sm transition ${
              selectedAnswer === option.id
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface/95 hover:border-primary"
            }`}
          >
            {option.label || String.fromCharCode(65 + index)}. {option.text}
          </button>
        ))}
      </div>
    </>
  );
}
