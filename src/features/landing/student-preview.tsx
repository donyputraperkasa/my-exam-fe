import { BookOpenCheck, Target, Trophy } from "lucide-react";
import { MathPattern } from "./math-pattern";

const previewRows = [
  { label: "Paket direkomendasikan", value: "Numerasi", Icon: BookOpenCheck },
  { label: "Skor terakhir", value: "86", Icon: Trophy },
  { label: "Perlu dikejar", value: "Geometri", Icon: Target },
];

export function StudentPreview() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb] px-6 pb-12">
      <MathPattern />
      <div className="relative mx-auto grid max-w-6xl gap-6 rounded-lg border border-border bg-surface/95 p-6 shadow-sm shadow-primary/5 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
            Dashboard Siswa
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">
            Rasanya seperti punya peta belajar pribadi.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Setelah latihan, siswa langsung melihat skor, paket yang cocok,
            dan bagian yang perlu diperkuat sebelum ujian.
          </p>
        </div>
        <div className="grid gap-3">
          {previewRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-lg bg-[#f8fafc] p-4 transition hover:bg-secondary/5"
            >
              <span className="flex items-center gap-3 text-sm font-medium text-muted">
                <row.Icon className="h-5 w-5 text-secondary" />
                {row.label}
              </span>
              <span className="text-lg font-bold text-secondary">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
