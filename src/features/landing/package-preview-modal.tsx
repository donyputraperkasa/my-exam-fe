"use client";

import { BookOpenCheck, Lock, Trophy, X } from "lucide-react";

type PackagePreviewModalProps = {
  open: boolean;
  onClose: () => void;
  onStartFree: () => void;
};

const packages = [
  { title: "Paket Pemanasan", meta: "10 soal publik", Icon: BookOpenCheck },
  { title: "TKA Numerasi", meta: "Premium per jenjang", Icon: Trophy },
  { title: "ASPD Intensif", meta: "Pembahasan lengkap", Icon: Lock },
];

export function PackagePreviewModal({
  open,
  onClose,
  onStartFree,
}: PackagePreviewModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/50 px-4 backdrop-blur-sm"
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-white/70 bg-white/95 p-5 text-foreground shadow-2xl shadow-secondary/20"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">
              Pilihan Paket
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">
              Mulai dari gratis, lanjut saat siap.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Siswa bisa mencoba soal awal dulu, lalu membuka paket premium
              setelah subscription aktif.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border p-2 text-muted transition hover:text-foreground"
            aria-label="Tutup modal paket"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          {packages.map(({ title, meta, Icon }) => (
            <div key={title} className="flex items-center gap-3 rounded-lg bg-[#f8fafc] p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="mt-1 text-xs font-semibold text-muted">{meta}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onStartFree}
          className="mt-5 h-11 w-full rounded-md bg-accent text-sm font-bold text-foreground transition hover:bg-amber-400"
        >
          Coba 10 Soal Gratis
        </button>
      </section>
    </div>
  );
}
