import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DashboardStatCard } from "@/components/layout/dashboard-stat-card";
import {
  BookOpenCheck,
  FileQuestion,
  PackageCheck,
  Users,
} from "lucide-react";

const adminStats = [
  {
    title: "Bank Soal",
    value: "CRUD",
    description: "Kelola soal, opsi jawaban, dan pembahasan per jenjang.",
    Icon: FileQuestion,
  },
  {
    title: "Paket Ujian",
    value: "Siap",
    description: "Susun paket free dan premium untuk TKA maupun ASPD.",
    Icon: PackageCheck,
  },
  {
    title: "Mapel & Jenjang",
    value: "Rapi",
    description: "Atur struktur belajar sebelum siswa mulai mengerjakan.",
    Icon: BookOpenCheck,
  },
  {
    title: "Subscription",
    value: "Manual",
    description: "Pantau siswa premium sambil menunggu integrasi Xendit.",
    Icon: Users,
  },
];

const setupItems = ["Jenjang aktif", "Mapel numerasi", "Paket free", "Bank soal"];
const queueItems = ["Review 10 soal baru", "Lengkapi pembahasan", "Cek akses premium"];

export default function AdminPage() {
  return (
    <DashboardShell eyebrow="Admin Panel" role="ADMIN" title="Dashboard Admin">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((item) => (
          <DashboardStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-secondary">
            Setup Platform
          </p>
          <h2 className="mt-3 text-2xl font-extrabold">
            Siapkan alur belajar sebelum promosi.
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {setupItems.map((item, index) => (
              <div key={item} className="rounded-lg bg-[#f8fafc] p-4">
                <p className="text-2xl font-extrabold text-primary">
                  0{index + 1}
                </p>
                <p className="mt-2 text-sm font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/60 bg-[linear-gradient(145deg,#ff6b6b,#ff9f6e)] p-5 text-white shadow-sm">
          <p className="text-sm font-bold text-white">Antrian Admin</p>
          <div className="mt-4 grid gap-3">
            {queueItems.map((item) => (
              <div key={item} className="rounded-lg bg-white/18 p-3">
                <p className="text-sm font-semibold">{item}</p>
                <p className="mt-1 text-xs text-white/80">Prioritas awal MVP</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
