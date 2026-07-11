import type { TeacherQuestion } from "./api";

type TeacherQuestionListProps = {
  questions: TeacherQuestion[];
};

export function TeacherQuestionList({ questions }: TeacherQuestionListProps) {
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
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </section>
  );
}

function QuestionCard({ question }: { question: TeacherQuestion }) {
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
    </article>
  );
}
