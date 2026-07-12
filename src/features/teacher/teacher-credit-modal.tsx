"use client";

import { Coins, X } from "lucide-react";
import { itWhatsappUrl } from "@/lib/constants/contact";

type TeacherCreditModalProps = {
  onClose: () => void;
  open: boolean;
};

export function TeacherCreditModal({ onClose, open }: TeacherCreditModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-5 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="w-full max-w-lg rounded-2xl border border-violet-100 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Coins className="h-6 w-6" />
          </span>
          <button type="button" onClick={onClose} aria-label="Tutup modal">
            <X className="h-6 w-6 text-muted" />
          </button>
        </div>
        <p className="mt-5 text-sm font-black uppercase text-pink-400">Kredit habis</p>
        <h2 className="mt-2 text-3xl font-black">Tambah kredit untuk publish.</h2>
        <p className="mt-3 text-sm font-bold leading-6 text-muted">
          Draft dan akunmu tetap tersimpan. Hubungi admin untuk mengaktifkan satu kali publikasi ujian.
        </p>
        <a
          href={itWhatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex h-12 items-center justify-center rounded-xl bg-accent text-sm font-black"
        >
          Hubungi Admin
        </a>
      </section>
    </div>
  );
}
