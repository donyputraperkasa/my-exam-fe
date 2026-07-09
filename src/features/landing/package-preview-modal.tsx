"use client";

import { BookOpenCheck, Lock, Trophy, X } from "lucide-react";

type PackagePreviewModalProps = {
  open: boolean;
  onClose: () => void;
  onStartFree: () => void;
};

const packages = [
  {
    title: "Free",
    price: "Rp0",
    meta: "Coba soal awal tanpa biaya untuk mengenal sistem latihan My Exam.",
    features: ["10 soal publik tanpa login", "10 soal gratis setelah register", "Cocok untuk mencoba fitur dasar"],
    Icon: BookOpenCheck,
    badge: "Starter",
    cardClass: "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 hover:border-slate-400",
    iconClass: "bg-slate-900 text-white",
    badgeClass: "bg-slate-900 text-white",
    priceClass: "text-slate-900",
  },
  {
    title: "Premium 1 Bulan",
    price: "Rp39.000",
    meta: "Paket fleksibel untuk siswa yang ingin latihan intensif selama 30 hari.",
    features: ["Akses semua paket sesuai jenjang", "Pembahasan lengkap", "Riwayat nilai dan recap latihan"],
    Icon: Trophy,
    badge: "⭐ Paling Populer",
    cardClass: "border-violet-200 bg-gradient-to-br from-white via-violet-50 to-indigo-100 hover:border-violet-400 ring-2 ring-violet-200",
    iconClass: "bg-violet-600 text-white",
    badgeClass: "bg-violet-600 text-white",
    priceClass: "text-violet-700",
  },
  {
    title: "Premium 3 Bulan",
    price: "Rp99.000",
    meta: "Lebih hemat untuk siswa yang ingin latihan rutin dan konsisten.",
    features: ["Semua fitur Premium 1 Bulan", "Masa aktif 90 hari", "Lebih hemat untuk persiapan jangka panjang"],
    Icon: Lock,
    badge: "👑 Best Value",
    cardClass: "border-amber-200 bg-gradient-to-br from-white via-amber-50 to-yellow-100 hover:border-amber-400",
    iconClass: "bg-amber-600 text-white",
    badgeClass: "bg-amber-600 text-white",
    priceClass: "text-amber-700",
  },
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
        className="w-full max-w-6xl rounded-3xl border border-white/70 bg-gradient-to-br from-white via-slate-50 to-stone-100 p-8 text-foreground shadow-2xl shadow-secondary/20"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">
              Pilihan Paket
            </p>
            <h2 className="mt-2 text-3xl font-black bg-gradient-to-r from-slate-800 via-violet-700 to-amber-700 bg-clip-text text-transparent">
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

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {packages.map(
            ({
              title,
              price,
              meta,
              features,
              Icon,
              badge,
              cardClass,
              iconClass,
              badgeClass,
              priceClass,
            }) => (
              <button
                key={title}
                type="button"
                onClick={title === "Free" ? onStartFree : undefined}
                className={`relative flex h-full min-h-[420px] flex-col rounded-3xl border p-6 text-left transition hover:-translate-y-1 hover:bg-white shadow-lg shadow-sky-100/50 hover:shadow-2xl hover:shadow-violet-200/40 ${cardClass}`}
              >
                {title === "Premium 1 Bulan" && (
                  <div className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-black text-white shadow-lg">
                    BEST SELLER
                  </div>
                )}
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-black ${badgeClass}`}
                  >
                    {badge}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-lg font-black text-foreground">{title}</p>
                  <div className="mt-2 inline-flex items-center rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700 shadow-sm">
                    {title === "Free"
                      ? "Cocok untuk mencoba"
                      : title === "Premium 1 Bulan"
                        ? "Rekomendasi"
                        : "Paling Hemat"}
                  </div>
                  <p className={`mt-1 text-3xl font-black ${priceClass}`}>
                    {price}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                    {meta}
                  </p>
                </div>

                <ul className="mt-5 flex-1 space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs font-bold leading-5 text-foreground/80"
                    >
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${priceClass.replace("text", "bg")}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <div
                    className={`w-full rounded-xl px-4 py-3 text-center text-sm font-black ${badgeClass} ${title === "Free" ? "cursor-pointer" : "opacity-90"}`}
                  >
                    {title === "Free" ? "Mulai Gratis" : "Segera Hadir"}
                  </div>
                </div>
              </button>
            ),
          )}
        </div>

      </section>
    </div>
  );
}
