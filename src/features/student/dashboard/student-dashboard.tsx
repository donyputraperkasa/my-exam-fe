"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpenCheck,
  ChartNoAxesCombined,
  Clock,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DashboardStatCard } from "@/components/layout/dashboard-stat-card";
import { getToken } from "@/features/auth/session";
import {
  fetchStudentRecap,
  type StudentRecapResponse,
} from "@/features/student/recap/recap-api";
import { appRoutes } from "@/lib/routes";

const focusItems = ["Numerasi", "Geometri", "Pembahasan salah"];

export function StudentDashboard() {
  const [dashboard, setDashboard] = useState<StudentRecapResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    void fetchStudentRecap(token)
      .then(setDashboard)
      .catch((reason: Error) => setError(reason.message));
  }, []);

  const isPremium = dashboard?.subscription.isActive ?? false;
  const stats = buildStats(dashboard, isPremium);

  return (
    <DashboardShell eyebrow="Ruang Belajar" role="STUDENT" title="Dashboard Siswa">
      {error ? <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p> : null}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => <DashboardStatCard key={item.title} {...item} />)}
      </section>
      <section className="mt-6 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Recommendation premium={isPremium} />
        <AccountStatus dashboard={dashboard} premium={isPremium} />
      </section>
      <section className="mt-6 rounded-lg border border-violet-100 bg-surface p-5 shadow-sm">
        <p className="text-sm font-bold uppercase text-primary">Fokus Belajar</p>
        <div className="mt-4 grid divide-y divide-violet-100 md:grid-cols-3 md:divide-x md:divide-y-0">
          {focusItems.map((item) => (
            <div key={item} className="px-1 py-4 first:pt-0 md:px-5 md:py-1 md:first:pl-0 md:last:pr-0">
              <p className="text-sm font-bold">{item}</p>
              <p className="mt-2 text-sm leading-6 text-muted">Kerjakan latihan, periksa skor, lalu pelajari kembali materi yang belum dikuasai.</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}

function Recommendation({ premium }: { premium: boolean }) {
  return (
    <div className="rounded-lg border border-violet-100 bg-surface p-5 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-100 text-primary">
        <Sparkles className="h-5 w-5" />
      </span>
      <p className="mt-5 text-sm font-bold uppercase text-primary">Paket Rekomendasi</p>
      <h2 className="mt-3 text-2xl font-extrabold">{premium ? "Lanjutkan Paket Premium" : "Paket Gratis 10 Soal"}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{premium ? "Semua paket sesuai jenjangmu sudah terbuka dan siap dikerjakan." : "Mulai dari latihan gratis sebelum membuka seluruh paket premium."}</p>
      <Link href={premium ? appRoutes.student.packages : appRoutes.student.trial} className="mt-5 inline-flex rounded-lg bg-primary px-4 py-3 text-sm font-black text-white transition hover:bg-violet-800">
        {premium ? "Lihat Paket Premium" : "Mulai Paket Gratis"}
      </Link>
    </div>
  );
}

function AccountStatus({ dashboard, premium }: { dashboard: StudentRecapResponse | null; premium: boolean }) {
  const activeUntil = dashboard?.subscription.activeUntil;
  return (
    <div className={`rounded-lg border p-5 shadow-sm ${premium ? "border-violet-700 bg-primary text-white" : "border-violet-200 bg-violet-50 text-foreground"}`}>
      <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${premium ? "bg-white/10 text-violet-100" : "bg-violet-100 text-primary"}`}>
        <ShieldCheck className="h-5 w-5" />
      </span>
      <p className={`mt-5 text-sm font-bold uppercase ${premium ? "text-violet-200" : "text-primary"}`}>Status Akun</p>
      <h2 className="mt-3 text-2xl font-extrabold">{dashboard ? (premium ? "Premium Aktif" : "Free Access") : "Memuat status..."}</h2>
      <p className={`mt-2 text-sm leading-6 ${premium ? "text-violet-100" : "text-muted"}`}>{premium && activeUntil ? `Akses premium aktif sampai ${formatDate(activeUntil)}.` : "Aktifkan subscription untuk membuka semua paket latihan."}</p>
    </div>
  );
}

function buildStats(data: StudentRecapResponse | null, premium: boolean) {
  return [
    { title: premium ? "Akses Paket" : "Soal Gratis", value: premium ? "Full" : "10", description: premium ? "Semua paket sesuai jenjang sudah terbuka." : "Satu paket awal tersedia setelah register.", Icon: BookOpenCheck },
    { title: "Skor Terbaik", value: data ? String(data.summary.bestScore) : "-", description: "Nilai terbaik dari seluruh latihan yang selesai.", Icon: Trophy },
    { title: "Latihan Selesai", value: data ? String(data.summary.submittedTotal) : "-", description: "Jumlah latihan yang sudah masuk ke recap nilai.", Icon: ChartNoAxesCombined },
    { title: "Aktivitas", value: data ? String(data.summary.attemptTotal) : "-", description: "Total latihan dimulai dan diselesaikan.", Icon: Clock },
  ];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(value));
}
