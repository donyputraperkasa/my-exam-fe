"use client";

import { Coins } from "lucide-react";
import { useTeacherCredits } from "./use-teacher-credits";

export function TeacherCreditStatus() {
  const { credits, loading } = useTeacherCredits();
  const value = loading
    ? "Memuat..."
    : credits?.isUnlimited
      ? "Tanpa batas"
      : `${credits?.balance ?? 0} kredit`;

  return (
    <section className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <Coins className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-black uppercase text-pink-400">Kredit publikasi</p>
          <p className="mt-1 text-xl font-black">{value}</p>
        </div>
      </div>
      <p className="max-w-lg text-sm font-bold leading-6 text-muted">
        Membuat draft gratis. Satu kredit digunakan saat ujian dipublikasikan.
      </p>
    </section>
  );
}
