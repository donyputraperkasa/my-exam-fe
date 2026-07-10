import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DashboardStatCard } from "@/components/layout/dashboard-stat-card";
import {
  BookOpenCheck,
  ChartNoAxesCombined,
  Clock,
  Trophy,
} from "lucide-react";

const studentStats = [
  {
    title: "Soal Gratis",
    value: "10",
    description: "Coba paket publik sebelum register.",
    Icon: BookOpenCheck,
  },
  {
    title: "Skor Terakhir",
    value: "86",
    description: "Pantau hasil latihan dan target berikutnya.",
    Icon: Trophy,
  },
  {
    title: "Recap Nilai",
    value: "Live",
    description: "Lihat progres numerasi dan geometri secara ringkas.",
    Icon: ChartNoAxesCombined,
  },
  {
    title: "Waktu Latihan",
    value: "8m",
    description: "Latihan singkat yang tetap fokus.",
    Icon: Clock,
  },
];

const focusItems = ["Numerasi", "Geometri", "Pembahasan salah"];

export default function StudentPage() {
  return (
    <DashboardShell eyebrow="Ruang Belajar" role="STUDENT" title="Dashboard Siswa">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {studentStats.map((item) => (
          <DashboardStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-secondary">
            Paket Rekomendasi
          </p>
          <h2 className="mt-3 text-2xl font-extrabold">Paket Gratis 10 Soal</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Cocok untuk mencicipi alur latihan sebelum masuk paket premium.
          </p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e5edf5]">
            <span className="block h-full w-3/4 rounded-full bg-primary" />
          </div>
          <p className="mt-2 text-xs font-semibold text-muted">
            Progress simulasi 75%
          </p>
        </div>
        <div className="rounded-lg border border-white/60 bg-[linear-gradient(145deg,#2f6bff,#38bdf8)] p-5 text-white">
          <p className="text-sm font-bold text-amber-100">Status Akun</p>
          <h2 className="mt-3 text-2xl font-extrabold">Free Access</h2>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Upgrade subscription nanti setelah payment gateway siap.
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-surface p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-secondary">
          Fokus Belajar
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {focusItems.map((item) => (
            <div key={item} className="rounded-lg bg-[#f8fafc] p-4">
              <p className="text-sm font-bold">{item}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Kerjakan latihan pendek, lalu baca pembahasan sampai paham.
              </p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
