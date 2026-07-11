"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, LockKeyhole } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import type { ExamPackage } from "@/types/exam";
import { fetchStudentPackage } from "./student-packages-api";

type StudentPackageExamProps = {
  packageId: string;
};

export function StudentPackageExam({ packageId }: StudentPackageExamProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [examPackage, setExamPackage] = useState<ExamPackage | null>(null);

  useEffect(() => {
    void fetchStudentPackage(packageId).then(setExamPackage).catch(() => undefined);
  }, [packageId]);

  if (!examPackage) {
    return <div className="rounded-lg border border-border bg-white/88 p-5 text-sm font-bold text-muted">Memuat paket...</div>;
  }

  if (examPackage.accessType === "PREMIUM") {
    return <LockedPackage />;
  }

  const questions = examPackage.questions ?? [];

  return (
    <section className="grid gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link href={appRoutes.student.packages} className="inline-flex items-center gap-2 text-sm font-black text-primary"><ArrowLeft className="h-4 w-4" />Kembali ke paket</Link>
        <span className="inline-flex items-center gap-2 rounded-md border border-border bg-white/88 px-4 py-3 text-sm font-black"><Clock className="h-4 w-4 text-secondary" />{examPackage.durationMinutes ?? 10} menit</span>
      </div>
      <div className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
        <p className="text-sm font-black uppercase text-secondary">{examPackage.grade?.name} - {examPackage.subject?.name}</p>
        <h1 className="mt-2 text-3xl font-black">{examPackage.title}</h1>
        <p className="mt-2 text-sm font-bold text-muted">{questions.length} soal dalam paket ini.</p>
      </div>
      {questions.map((entry, index) => <QuestionBlock key={entry.question.id} answer={answers[entry.question.id]} index={index} onAnswer={(value) => setAnswers((previous) => ({ ...previous, [entry.question.id]: value }))} question={entry.question} />)}
      <button className="rounded-xl bg-primary px-5 py-4 text-sm font-black text-white">Submit Jawaban</button>
    </section>
  );
}

function QuestionBlock({ answer, index, onAnswer, question }: { answer?: string; index: number; onAnswer: (value: string) => void; question: NonNullable<ExamPackage["questions"]>[number]["question"] }) {
  return (
    <article className="rounded-2xl border border-border bg-white/88 p-5 shadow-sm">
      <p className="text-xs font-black uppercase text-secondary">Soal {index + 1}</p>
      <h2 className="mt-2 text-xl font-black">{question.question}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {question.options.map((option) => <button key={option.id ?? option.label} type="button" onClick={() => onAnswer(option.id ?? option.label)} className={`rounded-xl border px-4 py-3 text-left text-sm font-black ${answer === (option.id ?? option.label) ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>{option.label}. {option.text}</button>)}
      </div>
    </article>
  );
}

function LockedPackage() {
  return <div className="rounded-lg border border-purple-100 bg-white/88 p-8 text-center shadow-sm"><LockKeyhole className="mx-auto h-10 w-10 text-primary" /><h2 className="mt-3 text-2xl font-black">Paket premium terkunci</h2><p className="mt-2 text-sm font-bold text-muted">Aktifkan subscription untuk membuka paket ini.</p><Link href={appRoutes.student.subscription} className="mt-5 inline-flex rounded-md bg-accent px-4 py-3 text-sm font-black">Lihat Akses</Link></div>;
}
