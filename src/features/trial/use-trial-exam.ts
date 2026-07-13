import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { getToken } from "@/features/auth/session";
import {
  fetchPublicTrialQuestions,
  fetchStudentTrialAccess,
  submitStudentTrial,
} from "./trial-api";
import { getTrialSetup } from "./trial-setup";
import type { TrialScore } from "./trial-types";

export function useTrialExam({ studentFlow }: { studentFlow: boolean }) {
  const token = useSyncExternalStore(subscribeToken, getToken, () => null);
  const [setup] = useState(() => getTrialSetup(studentFlow));
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [current, setCurrent] = useState(0);
  const [isRemote, setIsRemote] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
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

  // Hanya trial di dalam dashboard yang membaca status subscription akun.
  // Trial landing harus tetap dapat berjalan tanpa token maupun backend.
  useEffect(() => {
    if (!studentFlow || !token) return;
    void fetchStudentTrialAccess(token)
      .then(setIsSubscribed)
      .catch(() => setIsSubscribed(false));
  }, [studentFlow, token]);

  // Soal backend dipakai untuk trial akun supaya hasilnya dapat diverifikasi dan
  // disimpan ke recap. Trial publik tetap memakai tepat 10 soal lokal dari setup.
  useEffect(() => {
    if (!studentFlow) return;
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
  }, [studentFlow]);

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
    // Alur publik dihitung seluruhnya di browser dan tidak meninggalkan data BE.
    if (!studentFlow || !isRemote || !token) {
      setResult(localResult);
      return;
    }

    const answerByQuestionId = Object.fromEntries(
      questions
        .map((question, index) => [question.id, answers[index]])
        .filter(([, optionId]) => Boolean(optionId)),
    ) as Record<string, string>;
    const score = await submitStudentTrial(answerByQuestionId, token);
    setResult(score);
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
    isAuthenticated: studentFlow && Boolean(token),
    isSubscribed: studentFlow && isSubscribed,
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

function subscribeToken(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}
