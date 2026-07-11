"use client";

import { Plus, Search } from "lucide-react";

type TeacherExamToolbarProps = {
  onCreate: () => void;
  onSearch: (value: string) => void;
  query: string;
};

export function TeacherExamToolbar({
  onCreate,
  onSearch,
  query,
}: TeacherExamToolbarProps) {
  return (
    <section className="rounded-3xl border border-violet-100 bg-white/90 p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="flex h-14 items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 text-muted">
          <Search className="h-5 w-5" />
          <input
            value={query}
            onChange={(event) => onSearch(event.target.value)}
            className="w-full bg-transparent text-sm font-bold outline-none"
            placeholder="Cari soal, keterangan, atau pilihan..."
          />
        </label>
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-sm font-black text-foreground shadow-lg shadow-amber-100 transition hover:brightness-105"
        >
          <Plus className="h-5 w-5" />
          Buat Soal
        </button>
      </div>
    </section>
  );
}
