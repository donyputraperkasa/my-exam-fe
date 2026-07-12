"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/features/auth/session";
import {
  getTeacherExam,
  publishTeacherExam,
  type CreateTeacherQuestionPayload,
  type TeacherExamDetail,
} from "./api";
import {
  addTeacherQuestion,
  deleteTeacherQuestion,
  updateTeacherQuestion,
} from "./teacher-question-api";

export function useTeacherExamDetail(examId: string) {
  const [exam, setExam] = useState<TeacherExamDetail | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function refresh() {
    const token = getToken();
    if (!token) {
      return;
    }
    setExam(await getTeacherExam(examId, token));
  }

  async function addQuestion(payload: CreateTeacherQuestionPayload) {
    const token = getToken();
    if (!token) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      await addTeacherQuestion(examId, payload, token);
      await refresh();
    } catch (caughtError) {
      setError(getError(caughtError, "Gagal menyimpan soal"));
    } finally {
      setSaving(false);
    }
  }

  async function updateQuestion(
    questionId: string,
    payload: CreateTeacherQuestionPayload,
  ) {
    await changeQuestion(() => {
      const token = getToken();
      return token
        ? updateTeacherQuestion(examId, questionId, payload, token)
        : Promise.resolve(null);
    });
  }

  async function deleteQuestion(questionId: string) {
    await changeQuestion(() => {
      const token = getToken();
      return token
        ? deleteTeacherQuestion(examId, questionId, token)
        : Promise.resolve(null);
    });
  }

  async function changeQuestion(action: () => Promise<unknown>) {
    setSaving(true);
    setError("");
    try {
      await action();
      await refresh();
    } catch (caughtError) {
      setError(getError(caughtError, "Gagal mengubah soal"));
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    const token = getToken();
    if (!token) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      await publishTeacherExam(examId, token);
      await refresh();
    } catch (caughtError) {
      setError(getError(caughtError, "Gagal publish ujian"));
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    getTeacherExam(examId, getToken() ?? "")
      .then(setExam)
      .catch((caughtError) => setError(getError(caughtError, "Gagal memuat ujian")))
      .finally(() => setLoading(false));
  }, [examId]);
  return {
    addQuestion,
    deleteQuestion,
    error,
    exam,
    loading,
    publish,
    saving,
    updateQuestion,
  };
}

function getError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
