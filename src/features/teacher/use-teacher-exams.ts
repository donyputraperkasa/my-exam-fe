"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/features/auth/session";
import {
  createTeacherExam,
  getTeacherExams,
  type CreateTeacherExamPayload,
  type TeacherExam,
} from "./api";

export function useTeacherExams() {
  const [exams, setExams] = useState<TeacherExam[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  async function refresh() {
    const token = getToken();
    if (!token) {
      return;
    }
    setError("");
    const data = await getTeacherExams(token);
    setExams(data);
  }

  async function createExam(payload: CreateTeacherExamPayload) {
    const token = getToken();
    if (!token) {
      return;
    }
    setCreating(true);
    setError("");
    try {
      await createTeacherExam(payload, token);
      await refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Gagal menyimpan ujian");
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    async function loadExams() {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getTeacherExams(token);
        setExams(data);
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : "Gagal memuat ujian");
      } finally {
        setLoading(false);
      }
    }

    void loadExams();
  }, []);

  return { creating, createExam, error, exams, loading };
}
