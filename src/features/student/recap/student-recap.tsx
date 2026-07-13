"use client";

import { useEffect, useState } from "react";
import { Award, BarChart3, ClipboardCheck } from "lucide-react";
import { getToken } from "@/features/auth/session";
import { RecapHistory } from "./recap-history";
import { fetchStudentRecap, type StudentRecapResponse } from "./recap-api";

export function StudentRecap() {
  const [recap, setRecap] = useState<StudentRecapResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    void fetchStudentRecap(token).then(setRecap).catch((reason: Error) => setError(reason.message));
  }, []);

  if (error) return <p className="rounded-lg bg-red-50 p-5 text-sm font-bold text-red-600">{error}</p>;
  if (!recap) return <p className="rounded-lg bg-white/80 p-5 text-sm font-bold text-muted">Memuat recap nilai...</p>;

  const cards = [
    { label: "Latihan selesai", value: recap.summary.submittedTotal, icon: ClipboardCheck },
    { label: "Rata-rata skor", value: recap.summary.averageScore, icon: BarChart3 },
    { label: "Skor terbaik", value: recap.summary.bestScore, icon: Award },
  ];
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        {cards.map(({ icon: Icon, label, value }) => (
          <article key={label} className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
            <Icon className="h-6 w-6 text-primary" />
            <p className="mt-4 text-sm font-bold text-muted">{label}</p>
            <p className="mt-1 text-3xl font-black">{value}</p>
          </article>
        ))}
      </section>
      <RecapHistory attempts={recap.recentAttempts} trials={recap.recentTrialResults} />
    </div>
  );
}
