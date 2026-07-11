"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppBackground } from "@/components/layout/app-background";
import { NavButton, QuestionNav, TopBar } from "./trial-controls";
import { TrialQuestionCard } from "./trial-question-card";
import { TrialResult } from "./trial-result";
import { useTrialExam } from "./use-trial-exam";

type TrialExamProps = {
  embedded?: boolean;
};

export function TrialExam({ embedded = false }: TrialExamProps) {
  const trial = useTrialExam();

  const minutes = String(Math.floor(trial.seconds / 60)).padStart(2, "0");
  const restSeconds = String(trial.seconds % 60).padStart(2, "0");

  const trialContent = (
    <section className="relative mx-auto grid w-full max-w-5xl gap-5">
        <TopBar
          backHref={trial.setup.backHref}
          backLabel={trial.setup.backLabel}
          minutes={minutes}
          restSeconds={restSeconds}
        />
        <QuestionNav current={trial.current} setCurrent={trial.setCurrent} total={trial.questions.length} />
        <div className="relative grid gap-5 rounded-[2rem]">
          <TrialQuestionCard
            current={trial.current}
            onSelect={trial.selectAnswer}
            options={trial.activeQuestion.options}
            question={trial.activeQuestion.question}
            selectedAnswer={trial.answers[trial.current]}
            total={trial.questions.length}
          />

          <div className="grid gap-3 md:grid-cols-3">
            <NavButton disabled={trial.current === 0} onClick={() => trial.setCurrent(trial.current - 1)}>
              <ArrowLeft className="h-5 w-5" /> Back
            </NavButton>
            <NavButton
              disabled={trial.current === trial.questions.length - 1}
              onClick={() => trial.setCurrent(trial.current + 1)}
            >
              Next <ArrowRight className="h-5 w-5" />
            </NavButton>
            <button
              type="button"
              onClick={() => void trial.submitTrial()}
              className="ml-auto w-full rounded-xl bg-primary px-5 py-4 text-sm font-black text-white shadow-sm transition hover:bg-purple-700 md:w-80"
            >
              Submit
            </button>
          </div>

          {trial.result ? (
            <TrialResult
              isAuthenticated={trial.setup.isAuthenticated}
              onRetry={trial.resetTrial}
              result={trial.result}
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
