"use client";

import { useState } from "react";
import {
  saveTeacherExamAnswer,
  submitTeacherExam,
  type PublicTeacherExam,
} from "./public-api";

type PublicTeacherExamRunnerProps = {
  exam: PublicTeacherExam;
  participantToken: string;
};

export function PublicTeacherExamRunner({
  exam,
  participantToken,
}: PublicTeacherExamRunnerProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const question = exam.questions[index];

  async function choose(optionId: string) {
    setAnswers({ ...answers, [question.id]: optionId });
    await saveTeacherExamAnswer(participantToken, question.id, optionId);
  }

  async function submit() {
    const data = await submitTeacherExam(participantToken);
    setResult(`Nilai ${data.score ?? 0}. Benar ${data.correctAnswers}, salah ${data.wrongAnswers}.`);
  }

  if (result) {
    return (
      <ResultCard result={result} />
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground">
      <section className="mx-auto w-full max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-black text-muted">
            Soal {index + 1} dari {exam.questions.length}
          </p>
          <button
            type="button"
            onClick={submit}
            className="rounded-xl bg-accent px-5 py-3 text-sm font-black"
          >
            Submit
          </button>
        </div>
        <article className="mt-6 rounded-3xl border border-violet-100 bg-white/90 p-8 shadow-sm">
          <h1 className="text-3xl font-black">{question.question}</h1>
          {question.explanation ? (
            <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-muted">
              <p className="mb-1 font-black uppercase text-pink-400">Keterangan</p>
              <p>{question.explanation}</p>
            </div>
          ) : null}
        </article>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => choose(option.id)}
              className={`rounded-2xl border p-4 text-left text-lg font-black ${
                answers[question.id] === option.id
                  ? "border-violet-400 bg-violet-50"
                  : "border-violet-100 bg-white"
              }`}
            >
              {option.label}. {option.text}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <NavButton disabled={index === 0} onClick={() => setIndex(index - 1)} text="Back" />
          <NavButton
            disabled={index === exam.questions.length - 1}
            onClick={() => setIndex(index + 1)}
            text="Next"
          />
        </div>
      </section>
    </main>
  );
}

function NavButton({ disabled, onClick, text }: {
  disabled: boolean;
  onClick: () => void;
  text: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="h-12 rounded-xl border border-violet-100 bg-white text-sm font-black disabled:opacity-40"
    >
      {text}
    </button>
  );
}

function ResultCard({ result }: { result: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <section className="w-full max-w-xl rounded-3xl border border-violet-100 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-black uppercase text-pink-400">Ujian selesai</p>
        <h1 className="mt-3 text-3xl font-black">{result}</h1>
      </section>
    </main>
  );
}
