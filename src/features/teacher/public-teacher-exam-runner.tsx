"use client";

import { useState } from "react";
import { Clock3 } from "lucide-react";
import {
  saveTeacherExamAnswer,
  submitTeacherExam,
  type PublicTeacherExam,
} from "./public-api";
import { PublicTeacherExamState } from "./public-teacher-exam-state";
import { useExamIntegrity } from "./use-exam-integrity";

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
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [message, setMessage] = useState("");
  const integrity = useExamIntegrity(participantToken, !result);
  const question = exam.questions[index];

  async function choose(optionId: string) {
    setAnswers({ ...answers, [question.id]: optionId });
    try {
      await saveTeacherExamAnswer(participantToken, question.id, optionId);
      setMessage("");
    } catch (error) {
      setMessage(getError(error, "Jawaban belum tersimpan"));
    }
  }

  async function submit() {
    try {
      const data = await submitTeacherExam(participantToken);
      setResult(`Nilai ${data.score ?? 0}. Benar ${data.correctAnswers}, salah ${data.wrongAnswers}.`);
    } catch (error) {
      setMessage(getError(error, "Ujian belum dapat dikumpulkan"));
    }
  }

  async function resume() {
    setCheckingAccess(true);
    try {
      await integrity.checkAccess();
    } catch (error) {
      setMessage(getError(error, "Gagal memeriksa status ujian"));
    } finally {
      setCheckingAccess(false);
    }
  }

  if (integrity.blockedReason) {
    return <PublicTeacherExamState blocked message={integrity.blockedReason} onAction={() => void resume()} actionPending={checkingAccess} />;
  }

  if (result) {
    return <PublicTeacherExamState message={result} />;
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-5 sm:py-8">
      <section className="mx-auto w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-black text-muted">
            {exam.title}
          </p>
          <span className="inline-flex items-center gap-2 rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm font-black"><Clock3 className="h-4 w-4 text-red-400" />{exam.durationMinutes} menit</span>
        </div>
        <nav aria-label="Nomor soal" className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {exam.questions.map((item, itemIndex) => (
            <button key={item.id} type="button" onClick={() => setIndex(itemIndex)} aria-label={`Soal ${itemIndex + 1}`} className={`h-10 w-10 shrink-0 rounded-full border text-sm font-black ${itemIndex === index ? "border-violet-500 bg-accent" : answers[item.id] ? "border-emerald-300 bg-emerald-100 text-emerald-700" : "border-violet-100 bg-white"}`}>{itemIndex + 1}</button>
          ))}
        </nav>
        <article className="mt-4 rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm sm:p-8">
          <p className="text-xs font-black uppercase text-pink-400">Soal {index + 1} dari {exam.questions.length}</p>
          <h1 className="mt-3 break-words text-2xl font-black sm:text-3xl">{question.question}</h1>
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
              className={`min-h-14 rounded-xl border p-4 text-left text-base font-black sm:text-lg ${
                answers[question.id] === option.id
                  ? "border-violet-400 bg-violet-50"
                  : "border-violet-100 bg-white"
              }`}
            >
              {option.label}. {option.text}
            </button>
          ))}
        </div>
        {message ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-500">{message}</p> : null}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1fr]">
          <NavButton disabled={index === 0} onClick={() => setIndex(index - 1)} text="Back" />
          <NavButton
            disabled={index === exam.questions.length - 1}
            onClick={() => setIndex(index + 1)}
            text="Next"
          />
          <button type="button" onClick={submit} className="col-span-2 h-12 rounded-xl bg-accent text-sm font-black shadow-sm sm:col-span-1">Submit</button>
        </div>
      </section>
    </main>
  );
}

function getError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
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
