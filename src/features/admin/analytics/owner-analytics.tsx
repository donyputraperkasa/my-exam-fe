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
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase text-secondary">Pertumbuhan My Exam</p>
          <p className="mt-1 text-sm font-semibold text-muted">Pantau pengguna dari coba gratis sampai pembayaran.</p>
        </div>
        <div className="inline-flex rounded-lg border border-violet-100 bg-white p-1 shadow-sm">
          {periods.map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => selectPeriod(period)}
              className={`rounded-md px-4 py-2 text-sm font-black transition ${days === period ? "bg-primary text-white" : "text-muted hover:bg-violet-50"}`}
            >
              {period} hari
            </button>
          ))}
        </div>
      </div>
      {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-4 font-bold text-red-600">{error}</p> : null}
      {!summary && !error ? <p className="rounded-lg bg-white p-5 font-bold text-muted">Memuat analytics...</p> : null}
      {summary ? <><AnalyticsMetrics summary={summary} /><AnalyticsFunnel summary={summary} /></> : null}
    </>
  );
}
