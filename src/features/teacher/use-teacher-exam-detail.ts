"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/features/auth/session";
import {
  addTeacherQuestion,
  getTeacherExam,
  publishTeacherExam,
  type CreateTeacherQuestionPayload,
  type TeacherExamDetail,
} from "./api";

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

  return { addQuestion, error, exam, loading, publish, saving };
}

function getError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
