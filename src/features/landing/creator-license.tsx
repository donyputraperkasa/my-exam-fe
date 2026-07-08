"use client";

import { X } from "lucide-react";
import { licenseItems } from "./license-data";

type CreatorLicenseProps = {
  open: boolean;
  onClose: () => void;
};

export function CreatorLicense({ open, onClose }: CreatorLicenseProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0f172a]/45 px-3 py-6 backdrop-blur-sm sm:px-4"
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/70 bg-white/95 p-4 text-[#1f2f46] shadow-2xl shadow-primary/20 backdrop-blur-xl sm:rounded-3xl sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-[#d8e3f4] bg-white/80 p-2 text-[#617089] transition hover:bg-[#f4f7fb] hover:text-secondary"
          aria-label="Tutup modal lisensi"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 pr-9 sm:mb-6 sm:pr-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent sm:text-xs sm:tracking-[0.35em]">
            Verified License
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-secondary sm:mt-3 sm:text-3xl">
            My Exam
          </h2>
          <p className="mt-2 text-sm font-medium leading-6 text-[#55657f] sm:text-base">
            Platform latihan ujian matematika, dirancang dan dikembangkan oleh
            Dony Putra Perkasa.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
            <Badge tone="green">Verified Original Software</Badge>
            <Badge tone="blue">Student Platform</Badge>
            <Badge tone="amber">Commercial License</Badge>
          </div>
          <div className="mt-3 rounded-2xl border border-[#dce8f7] bg-[#f7fbff] px-3 py-3 text-xs leading-6 text-[#44536b] sm:px-4 sm:text-sm">
            <span className="font-semibold text-secondary">
              Creator Statement
            </span>
            <br />
            My Exam adalah produk software original untuk latihan TKA dan ASPD
            matematika. Source code, arsitektur, UI, branding, dokumentasi, dan
            desain sistem merupakan karya intelektual pemilik hak cipta.
          </div>
        </div>

        <div className="space-y-2">
          {licenseItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#e2eaf6] bg-[#f8fbff]/80 px-3 py-2.5 sm:px-4"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[#7a8aa0]">
                {item.label}
              </p>
              <p className="mt-1 break-words text-sm font-semibold">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/10 px-3 py-4 text-xs leading-6 text-[#675b1f] sm:px-4 sm:text-sm">
          <p className="font-bold text-[#7a5b00]">
            Copyright 2026 Dony Putra Perkasa. All Rights Reserved.
          </p>
          <p className="mt-3">
            My Exam dibuat, dirancang, dan dikembangkan secara eksklusif oleh
            Dony Putra Perkasa. Penyalinan, penjualan ulang, penghapusan
            atribusi developer, atau penggunaan komersial ulang tanpa izin
            tertulis dari pemilik hak cipta tidak diperbolehkan.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary/20 transition hover:bg-[#0b5f59]"
        >
          Close
        </button>
      </section>
    </div>
  );
}

function Badge({ children, tone }: { children: string; tone: string }) {
  const tones: Record<string, string> = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex justify-center rounded-full border px-3 py-1 text-center text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
