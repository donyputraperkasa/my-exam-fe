"use client";

import { useEffect, useMemo, useState } from "react";
import { getToken } from "@/features/auth/session";
import {
  getTeacherExamParticipants,
  getTeacherExams,
  type TeacherExam,
  type TeacherExamParticipant,
} from "./api";

export function useTeacherMonitor(initialExamId = "") {
  const [error, setError] = useState("");
  const [exams, setExams] = useState<TeacherExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState<TeacherExamParticipant[]>([]);
  const [selectedExamId, setSelectedExamId] = useState(initialExamId);
  const selectedExam = useMemo(
    () => exams.find((exam) => exam.id === selectedExamId) ?? null,
    [exams, selectedExamId],
  );

  useEffect(() => {
    async function load() {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getTeacherExams(token);
        setExams(data);
        const fallbackId = data.find((exam) => exam.status === "PUBLISHED")?.id ?? data[0]?.id ?? "";
        setSelectedExamId((currentId) => currentId || fallbackId);
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : "Gagal memuat ujian");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  useEffect(() => {
    if (!selectedExamId) {
      return;
    }

    async function loadParticipants() {
      const token = getToken();
      if (!token) {
        return;
      }
      const data = await getTeacherExamParticipants(selectedExamId, token);
      setParticipants(data);
    }

    void loadParticipants();
    const interval = window.setInterval(() => {
      void loadParticipants();
    }, 5000);
    return () => window.clearInterval(interval);
  }, [selectedExamId]);

  return {
    error,
    exams,
    loading,
    participants,
    selectedExam,
    selectedExamId,
    setSelectedExamId,
  };
}
