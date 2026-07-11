import { useEffect, useMemo, useState } from "react";
import { fetchPublicTrialQuestions, submitPublicTrial } from "./trial-api";
import { getTrialSetup } from "./trial-setup";
import type { TrialScore } from "./trial-types";

export function useTrialExam() {
  const [setup] = useState(getTrialSetup);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [current, setCurrent] = useState(0);
  const [isRemote, setIsRemote] = useState(false);
  const [questions, setQuestions] = useState(setup.questions);
  const [result, setResult] = useState<TrialScore | null>(null);
  const [seconds, setSeconds] = useState(600);
  const activeQuestion = questions[current];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    void fetchPublicTrialQuestions()
      .then((items) => {
        if (!items.length) {
          return;
        }
        setAnswers({});
        setCurrent(0);
        setIsRemote(true);
        setQuestions(items);
      })
      .catch(() => undefined);
  }, []);

  const localResult = useMemo(() => {
    const answeredCount = Object.keys(answers).length;
    const correctCount = questions.filter((item, index) => {
      return answers[index] === item.answerId;
    }).length;
    return {
      totalQuestions: questions.length,
      answeredCount,
      correctCount,
      incorrectCount: answeredCount - correctCount,
      unansweredCount: questions.length - answeredCount,
      score: Math.round((correctCount / questions.length) * 100),
    };
  }, [answers, questions]);

  async function submitTrial() {
    if (!isRemote) {
      setResult(localResult);
      return;
    }

    const answerByQuestionId = Object.fromEntries(
      questions
        .map((question, index) => [question.id, answers[index]])
        .filter(([, optionId]) => Boolean(optionId)),
    ) as Record<string, string>;
    setResult(await submitPublicTrial(answerByQuestionId));
  }

  function resetTrial() {
    setAnswers({});
    setCurrent(0);
    setResult(null);
    setSeconds(600);
  }

  return {
    activeQuestion,
    answers,
    current,
    localResult,
    questions,
    resetTrial,
    result,
    seconds,
    selectAnswer: (answer: string) => {
      setAnswers((previous) => ({ ...previous, [current]: answer }));
    },
    setCurrent,
    setup,
    submitTrial,
  };
}
