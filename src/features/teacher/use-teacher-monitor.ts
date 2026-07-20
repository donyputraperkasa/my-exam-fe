"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getToken } from "@/features/auth/session";
import {
  getTeacherExamParticipants,
  getTeacherExams,
  unblockTeacherExamParticipant,
  type TeacherExam,
  type TeacherExamParticipant,
} from "./api";

export function useTeacherMonitor(initialExamId = "") {
  const [error, setError] = useState("");
  const [exams, setExams] = useState<TeacherExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState<TeacherExamParticipant[]>([]);
  const [selectedExamId, setSelectedExamId] = useState(initialExamId);
  const [unblockingId, setUnblockingId] = useState("");
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

  const loadParticipants = useCallback(async () => {
    const token = getToken();
    if (!token || !selectedExamId) return;

    try {
      const data = await getTeacherExamParticipants(selectedExamId, token);
      setParticipants(data);
      setError("");
    } catch (caughtError) {
      setError(getError(caughtError, "Gagal memperbarui data peserta"));
    }
  }, [selectedExamId]);

  useEffect(() => {
    if (!selectedExamId) return;

    const initialLoad = window.setTimeout(() => {
      void loadParticipants();
    }, 0);
    const interval = window.setInterval(() => {
      void loadParticipants();
    }, 5000);
    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
    };
  }, [loadParticipants, selectedExamId]);

  async function unblockParticipant(participantId: string) {
    const token = getToken();
    if (!token || !selectedExamId) return;

    setUnblockingId(participantId);
    try {
      await unblockTeacherExamParticipant(selectedExamId, participantId, token);
      await loadParticipants();
    } catch (caughtError) {
      setError(getError(caughtError, "Gagal mengizinkan peserta melanjutkan"));
    } finally {
      setUnblockingId("");
    }
  }

  return {
    error,
    exams,
    loading,
    participants,
    selectedExam,
    selectedExamId,
    setSelectedExamId,
    unblockParticipant,
    unblockingId,
  };
}

function getError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
