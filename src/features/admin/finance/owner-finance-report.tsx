"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/features/auth/session";
import { getRevenueReport, type RevenuePeriod, type RevenueReport } from "./api";
import { RevenueBreakdown } from "./revenue-breakdown";
import { RevenueSummary } from "./revenue-summary";
import { RevenueTransactions } from "./revenue-transactions";

const periods: { label: string; value: RevenuePeriod }[] = [
  { label: "30 hari", value: 30 },
  { label: "90 hari", value: 90 },
  { label: "1 tahun", value: 365 },
  { label: "Semua", value: 0 },
];

export function OwnerFinanceReport() {
  const [days, setDays] = useState<RevenuePeriod>(30);
  const [report, setReport] = useState<RevenueReport | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    let active = true;
    void getRevenueReport(days, token)
      .then((result) => {
        if (active) setReport(result);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        const message = reason instanceof Error ? reason.message : "Laporan gagal dimuat.";
        const endpointUnavailable =
          message.includes("404") || message.includes("Cannot GET");
        setError(
          endpointUnavailable
            ? "Laporan keuangan belum tersedia di server. Deploy backend terbaru terlebih dahulu."
            : message,
        );
      });
    return () => {
      active = false;
    };
  }, [days]);

  function selectPeriod(value: RevenuePeriod) {
    setDays(value);
    setReport(null);
    setError("");
  }

  return (
    <div className="min-w-0">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-primary">
            Pendapatan My Exam
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-muted">
            Ringkasan dari pembayaran manual yang sudah disetujui owner.
          </p>
        </div>
        <div className="grid grid-cols-2 rounded-lg border border-violet-100 bg-white p-1 shadow-sm sm:grid-cols-4">
          {periods.map((period) => (
            <button
              key={period.value}
              type="button"
              onClick={() => selectPeriod(period.value)}
              className={`rounded-md px-3 py-2 text-xs font-black transition ${days === period.value ? "bg-primary text-white" : "text-muted hover:bg-violet-50"}`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 font-bold text-red-600">
          {error}
        </p>
      ) : null}
      {!report && !error ? (
        <p className="rounded-lg bg-white p-5 font-bold text-muted shadow-sm">
          Menyiapkan laporan keuangan...
        </p>
      ) : null}
      {report ? (
        <>
          <RevenueSummary report={report} />
          <RevenueBreakdown report={report} />
          <RevenueTransactions items={report.transactions} />
        </>
      ) : null}
    </div>
  );
}
