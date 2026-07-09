"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppBackground } from "@/components/layout/app-background";
import { NavButton, QuestionNav, TopBar } from "./trial-controls";
import { trialQuestions } from "./trial-data";
import { TrialResult } from "./trial-result";

export function TrialExam() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [current, setCurrent] = useState(0);
  const [seconds, setSeconds] = useState(600);
  const [submitted, setSubmitted] = useState(false);
  const activeQuestion = trialQuestions[current];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const restSeconds = String(seconds % 60).padStart(2, "0");
  const answeredCount = Object.keys(answers).length;
  const correctCount = trialQuestions.filter((item, index) => {
    return answers[index] === item.answer;
  }).length;
  const incorrectCount = answeredCount - correctCount;
  const score = trialQuestions.reduce((total, item, index) => {
    return total + (answers[index] === item.answer ? 10 : 0);
  }, 0);

  function selectAnswer(answer: string) {
    setAnswers((previous) => ({ ...previous, [current]: answer }));
  }

  function resetTrial() {
    setAnswers({});
    setCurrent(0);
    setSeconds(600);
    setSubmitted(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-5 py-6 text-foreground">
      <AppBackground />
      <section className="relative mx-auto grid w-full max-w-5xl gap-5">
        <TopBar minutes={minutes} restSeconds={restSeconds} />
        <QuestionNav current={current} setCurrent={setCurrent} />
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="ml-auto w-full rounded-xl bg-primary px-5 py-4 text-sm font-black text-white shadow-sm transition hover:bg-purple-700 md:w-80"
        >
          Submit
        </button>

        <div className="relative grid gap-5 rounded-[2rem]">
          <section className="rounded-[2rem] border border-border bg-surface/95 p-6 text-center shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-wide text-secondary">
              Soal {current + 1} dari 10
            </p>
            <h1 className="mt-4 text-2xl font-black md:text-4xl">
              {activeQuestion.question}
            </h1>
          </section>

          <div className="grid gap-3 md:grid-cols-2">
            {activeQuestion.options.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => selectAnswer(option)}
                className={`rounded-xl border px-5 py-4 text-left text-lg font-black shadow-sm transition ${
                  answers[current] === option
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface/95 hover:border-primary"
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <NavButton disabled={current === 0} onClick={() => setCurrent(current - 1)}>
              <ArrowLeft className="h-5 w-5" /> Back
            </NavButton>
            <NavButton
              disabled={current === trialQuestions.length - 1}
              onClick={() => setCurrent(current + 1)}
            >
              Next <ArrowRight className="h-5 w-5" />
            </NavButton>
          </div>

          {submitted ? (
            <TrialResult
              answeredCount={answeredCount}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              onRetry={resetTrial}
              score={score}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}
