"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { NavButton, QuestionNav, TopBar } from "@/features/trial/trial-controls";
import { TrialQuestionCard } from "@/features/trial/trial-question-card";
import { appRoutes } from "@/lib/routes";
import { PackageExamResult } from "./package-exam-result";
import { usePackageExam } from "./use-package-exam";

export function StudentPackageExam({ packageId }: { packageId: string }) {
  const exam = usePackageExam(packageId);

  if (exam.isLocked) return <LockedPackage />;
  if (!exam.examPackage) return <PageMessage text="Memuat paket..." />;

  const questions = exam.examPackage.questions ?? [];
  const active = questions[exam.current]?.question;

  if (!active) return <PageMessage text="Paket ini belum memiliki soal." />;

  const minutes = String(Math.floor(exam.seconds / 60)).padStart(2, "0");
  const restSeconds = String(exam.seconds % 60).padStart(2, "0");
  const options = active.options.map((item) => ({
    id: item.id ?? item.label,
    label: item.label,
    text: item.text,
  }));

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-5">
      <TopBar
        backHref={appRoutes.student.packages}
        backLabel="Kembali ke paket"
        minutes={minutes}
        restSeconds={restSeconds}
      />
      <QuestionNav
        answered={questions.map((item) => Boolean(exam.answers[item.question.id]))}
        current={exam.current}
        setCurrent={exam.setCurrent}
        total={questions.length}
      />

      <div className="relative grid gap-5 rounded-[2rem]">
        <TrialQuestionCard
          current={exam.current}
          onSelect={(optionId) => exam.selectAnswer(active.id, optionId)}
          options={options}
          question={active.question}
          selectedAnswer={exam.answers[active.id]}
          total={questions.length}
        />

        {exam.error ? (
          <p className="rounded-lg bg-red-50 p-4 text-sm font-bold text-red-600">
            {exam.error}
          </p>
        ) : null}

        <div className="grid gap-3 md:grid-cols-3">
          <NavButton
            disabled={exam.current === 0}
            onClick={() => exam.setCurrent(exam.current - 1)}
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </NavButton>
          <NavButton
            disabled={exam.current === questions.length - 1}
            onClick={() => exam.setCurrent(exam.current + 1)}
          >
            Next <ArrowRight className="h-5 w-5" />
          </NavButton>
          <button
            type="button"
            disabled={exam.isSubmitting}
            onClick={() => void exam.submit()}
            className="rounded-xl bg-primary px-5 py-4 text-sm font-black text-white shadow-sm disabled:opacity-50"
          >
            {exam.isSubmitting ? "Menyimpan..." : "Submit"}
          </button>
        </div>

        {exam.result ? (
          <PackageExamResult
            result={exam.result}
            onRetry={() => exam.setResult(null)}
          />
        ) : null}
      </div>
    </section>
  );
}

function PageMessage({ text }: { text: string }) {
  return (
    <p className="rounded-lg bg-white/88 p-5 text-sm font-bold text-muted">
      {text}
    </p>
  );
}

function LockedPackage() {
  return (
    <div className="rounded-lg border border-purple-100 bg-white/88 p-8 text-center shadow-sm">
      <LockKeyhole className="mx-auto h-10 w-10 text-primary" />
      <h2 className="mt-3 text-2xl font-black">Paket premium terkunci</h2>
      <p className="mt-2 text-sm font-bold text-muted">
        Aktifkan subscription untuk membuka paket ini.
      </p>
      <Link
        href={appRoutes.student.subscription}
        className="mt-5 inline-flex rounded-md bg-accent px-4 py-3 text-sm font-black"
      >
        Lihat Akses
      </Link>
    </div>
  );
}
