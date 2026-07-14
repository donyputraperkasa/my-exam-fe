"use client";

import { X } from "lucide-react";
import { PackagePreviewCard } from "./package-preview-card";
import { previewPackages } from "./package-preview-data";

type PackagePreviewModalProps = {
  open: boolean;
  onClose: () => void;
  onRegister: () => void;
  onStartFree: () => void;
};

export function PackagePreviewModal({
  open,
  onClose,
  onRegister,
  onStartFree,
}: PackagePreviewModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/50 px-4 py-8 backdrop-blur-sm"
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-4xl rounded-3xl border border-white/70 bg-white/95 p-6 text-foreground shadow-2xl shadow-secondary/20 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">
              Pilihan Paket
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Mulai gratis, lanjut saat siap.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Siswa bisa mencoba soal publik, lalu register untuk paket lebih
              dalam dan pembahasan lengkap.
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
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {previewPackages.map((item) => (
            <PackagePreviewCard
              key={item.title}
              {...item}
              onRegister={onRegister}
              onStartFree={onStartFree}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
