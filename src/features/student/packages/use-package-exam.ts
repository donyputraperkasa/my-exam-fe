import { useEffect, useState } from "react";
import { getToken } from "@/features/auth/session";
import type { TrialScore } from "@/features/trial/trial-types";
import type { ExamPackage } from "@/types/exam";
import {
  fetchStudentPackage,
  savePackageAnswer,
  startPackageAttempt,
  submitPackageAttempt,
} from "./student-packages-api";

export function usePackageExam(packageId: string) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [examPackage, setExamPackage] = useState<ExamPackage | null>(null);
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<TrialScore | null>(null);
  const [seconds, setSeconds] = useState(0);

  // Backend menjadi sumber kebenaran akses premium dan isi paket.
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    void fetchStudentPackage(packageId, token)
      .then((item) => {
        setExamPackage(item);
        setSeconds((item.durationMinutes ?? 10) * 60);
      })
      .catch(() => setIsLocked(true));
  }, [packageId]);

  // Timer berhenti setelah result muncul agar waktu tidak terus berkurang.
  useEffect(() => {
    if (!examPackage || result) return;

    const timer = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [examPackage, result]);

  async function submit() {
    const token = getToken();
    const questions = examPackage?.questions ?? [];

    if (!token || !examPackage || !questions.length || isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      // Attempt dibuat lebih dulu, lalu semua jawaban disimpan sebelum submit
      // menghitung skor final dan menandai paket sebagai sudah dikerjakan.
      const attempt = await startPackageAttempt(examPackage.id, token);
      await Promise.all(
        Object.entries(answers).map(([questionId, optionId]) =>
          savePackageAnswer(attempt.id, questionId, optionId, token),
        ),
      );

      const completed = await submitPackageAttempt(attempt.id, token);
      const correctCount = completed.answers.filter(
        (item) => item.isCorrect,
      ).length;
      const answeredCount = Object.keys(answers).length;

      setResult({
        totalQuestions: questions.length,
        answeredCount,
        correctCount,
        incorrectCount: answeredCount - correctCount,
        unansweredCount: questions.length - answeredCount,
        score: completed.score ?? 0,
      });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Paket gagal disubmit");
    } finally {
      setIsSubmitting(false);
    }
  }

  function selectAnswer(questionId: string, optionId: string) {
    setAnswers((value) => ({ ...value, [questionId]: optionId }));
  }

  return {
    answers,
    current,
    error,
    examPackage,
    isLocked,
    isSubmitting,
    result,
    seconds,
    setCurrent,
    setResult,
    submit,
    selectAnswer,
  };
}
