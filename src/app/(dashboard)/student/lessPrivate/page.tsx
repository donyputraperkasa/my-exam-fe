import { GraduationCap } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function StudentLessPrivatePage() {
  return (
    <DashboardShell eyebrow="Ruang Belajar" role="STUDENT" title="Booking Les Private">
      <section className="rounded-lg border border-border bg-surface p-6 text-center shadow-sm">
        <GraduationCap className="mx-auto h-12 w-12 text-primary" />
        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-secondary">
          Dalam Pengembangan
        </p>
        <h2 className="mt-2 text-3xl font-extrabold">
          Booking les private sedang dalam pengembangan.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
          Nanti siswa bisa memilih sesi pendampingan untuk membahas soal yang
          masih sulit secara lebih personal.
        </p>
      </section>
    </DashboardShell>
  );
}
