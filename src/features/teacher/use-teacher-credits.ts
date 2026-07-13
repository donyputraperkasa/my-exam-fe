"use client";

import { useCallback, useEffect, useState } from "react";
import { getToken } from "@/features/auth/session";
import { getTeacherCredits, type TeacherCreditSummary } from "./credit-api";

export function useTeacherCredits() {
  const [credits, setCredits] = useState<TeacherCreditSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setCredits(null);
      setError("Sesi login tidak ditemukan. Silakan login kembali.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getTeacherCredits(token);
      setCredits(result);
    } catch (caughtError) {
      setCredits(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Gagal mengambil data kredit guru.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      Promise.resolve().then(() => {
        setError("Sesi login tidak ditemukan. Silakan login kembali.");
        setLoading(false);
      });
      return;
    }
    getTeacherCredits(token)
      .then((result) => {
        setCredits(result);
        setError(null);
      })
      .catch((caughtError) => {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Gagal mengambil data kredit guru.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return { credits, error, loading, refresh };
}
