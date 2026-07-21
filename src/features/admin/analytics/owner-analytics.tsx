"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/features/auth/session";
import {
  getAdminAnalyticsSummary,
  type AnalyticsSummary,
} from "@/features/analytics/api";
import { AnalyticsFunnel } from "./analytics-funnel";
import { AnalyticsMetrics } from "./analytics-metrics";

const periods = [7, 30, 90] as const;

export function OwnerAnalytics() {
  const [days, setDays] = useState<(typeof periods)[number]>(30);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    let active = true;
    void getAdminAnalyticsSummary(days, token)
      .then((data) => {
        if (active) setSummary(data);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        const message = reason instanceof Error ? reason.message : "Analytics gagal dimuat.";
        setError(message.includes("404") ? "Endpoint analytics belum tersedia di backend Railway. Deploy backend terbaru lalu jalankan migrasi Prisma." : message);
      });
    return () => {
      active = false;
    };
  }, [days]);

  function selectPeriod(period: (typeof periods)[number]) {
    setError("");
    setSummary(null);
    setDays(period);
  }

  return (
    <div className="min-w-0">
      <div className="mb-5 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase text-secondary">
            Pertumbuhan My Exam
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-muted">
            Pantau pengguna dari coba gratis sampai pembayaran.
          </p>
        </div>
        <div className="grid w-full grid-cols-3 rounded-lg border border-violet-100 bg-white p-1 shadow-sm sm:w-auto">
          {periods.map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => selectPeriod(period)}
              className={`whitespace-nowrap rounded-md px-2 py-2 text-xs font-black transition sm:px-4 sm:text-sm ${days === period ? "bg-primary text-white" : "text-muted hover:bg-violet-50"}`}
            >
              {period} hari
            </button>
          ))}
        </div>
      </div>
      {error ? (
        <p className="break-words rounded-lg border border-red-200 bg-red-50 p-4 font-bold text-red-600">
          {error}
        </p>
      ) : null}
      {!summary && !error ? (
        <p className="rounded-lg bg-white p-5 font-bold text-muted">
          Memuat analytics...
        </p>
      ) : null}
      {summary ? (
        <>
          <AnalyticsMetrics summary={summary} />
          <AnalyticsFunnel summary={summary} />
        </>
      ) : null}
    </div>
  );
}
