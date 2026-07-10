"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppBackground } from "@/components/layout/app-background";
import { NavButton, QuestionNav, TopBar } from "./trial-controls";
import { TrialQuestionCard } from "./trial-question-card";
import { TrialResult } from "./trial-result";
import { getTrialSetup } from "./trial-setup";

type TrialExamProps = {
  embedded?: boolean;
};

export function TrialExam({ embedded = false }: TrialExamProps) {
  const [setup] = useState(getTrialSetup);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [current, setCurrent] = useState(0);
  const [seconds, setSeconds] = useState(600);
  const [submitted, setSubmitted] = useState(false);
  const [trialQuestions] = useState(setup.questions);
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

  const trialContent = (
    <section className="relative mx-auto grid w-full max-w-5xl gap-5">
        <TopBar
          backHref={setup.backHref}
          backLabel={setup.backLabel}
          minutes={minutes}
          restSeconds={restSeconds}
        />
        <QuestionNav current={current} setCurrent={setCurrent} total={trialQuestions.length} />
        <div className="relative grid gap-5 rounded-[2rem]">
          <TrialQuestionCard
            current={current}
            onSelect={selectAnswer}
            options={activeQuestion.options}
            question={activeQuestion.question}
            selectedAnswer={answers[current]}
            total={trialQuestions.length}
          />

          <div className="grid gap-3 md:grid-cols-3">
            <NavButton disabled={current === 0} onClick={() => setCurrent(current - 1)}>
              <ArrowLeft className="h-5 w-5" /> Back
            </NavButton>
            <NavButton
              disabled={current === trialQuestions.length - 1}
              onClick={() => setCurrent(current + 1)}
            >
              Next <ArrowRight className="h-5 w-5" />
            </NavButton>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="ml-auto w-full rounded-xl bg-primary px-5 py-4 text-sm font-black text-white shadow-sm transition hover:bg-purple-700 md:w-80"
            >
              Submit
            </button>
          </div>

          {submitted ? (
            <TrialResult
              answeredCount={answeredCount}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              isAuthenticated={setup.isAuthenticated}
              onRetry={resetTrial}
              score={score}
            />
          ) : null}
        </div>
      </section>
  );

  if (embedded) {
    return trialContent;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-5 py-6 text-foreground">
      <AppBackground />
      {trialContent}
    </main>
  );
}
