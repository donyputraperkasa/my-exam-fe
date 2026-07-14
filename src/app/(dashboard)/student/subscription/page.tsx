"use client";

import { useState } from "react";
import { BookOpenCheck, CalendarDays, GraduationCap, Lock, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ManualPaymentHistory } from "@/features/payments/manual-payment-history";
import { ManualPaymentModal } from "@/features/payments/manual-payment-modal";
import type { ManualPaymentProduct } from "@/features/payments/manual-payments-api";
import { formatRupiah } from "@/features/payments/payment-format";
import { useManualPayments } from "@/features/payments/use-manual-payments";

const descriptions: Record<string, string> = {
  STUDENT_MONTH_1: "Cocok untuk persiapan intensif menjelang ujian.",
  STUDENT_MONTH_3: "Lebih hemat untuk latihan bertahap sampai siap.",
};

const additionalPackages = [
  {
    id: "FREE",
    label: "Free",
    price: "Rp0",
    description: "Coba alur latihan My Exam sebelum berlangganan.",
    features: ["10 soal publik tanpa login", "1 paket free setelah register", "Cocok untuk mencoba fitur dasar"],
    Icon: BookOpenCheck,
    badge: "Starter",
    actionLabel: "Sudah Aktif",
  },
  {
    id: "COMING_SOON",
    label: "Paket Premium 3",
    price: "Segera hadir",
    description: "Paket lanjutan untuk drilling per materi.",
    features: ["Pembahasan mendalam", "Latihan tambahan", "Target skor lebih tinggi"],
    Icon: Lock,
    badge: "Segera Hadir",
    actionLabel: "Segera Hadir",
  },
] as const;

export default function StudentSubscriptionPage() {
  const payment = useManualPayments();
  const [selected, setSelected] = useState<ManualPaymentProduct>();

  return (
    <DashboardShell eyebrow="Akses Premium" role="STUDENT" title="Riwayat Subscribe">
      {payment.error ? <p className="mb-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-500">{payment.error}</p> : null}
      <section className="grid gap-4 lg:grid-cols-4">
        {additionalPackages.slice(0, 1).map((product) => {
          const Icon = product.Icon;
          return (
            <article key={product.id} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{product.badge}</span>
              </div>
              <h2 className="mt-5 text-2xl font-black">{product.label}</h2>
              <p className="mt-2 text-sm font-bold leading-6 text-muted">{product.description}</p>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-muted">
                {product.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-2xl font-black text-slate-700">{product.price}</p>
                <button type="button" disabled className="cursor-not-allowed rounded-xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-500">
                  {product.actionLabel}
                </button>
              </div>
            </article>
          );
        })}

        {payment.loading ? <p className="text-sm font-bold text-muted">Memuat paket...</p> : null}
        {payment.config?.products.map((product, index) => {
          const Icon = index ? Sparkles : CalendarDays;
          return (
            <article key={product.id} className="rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-2xl font-black">{product.label}</h2>
              <p className="mt-2 text-sm font-bold leading-6 text-muted">
                {descriptions[product.id]}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-2xl font-black text-violet-600">{formatRupiah(product.amount)}</p>
                <button type="button" onClick={() => setSelected(product.id)} className="rounded-xl bg-accent px-5 py-3 text-sm font-black">
                  Transfer Sekarang
                </button>
              </div>
            </article>
          );
        })}

        {additionalPackages.slice(1).map((product) => {
          const Icon = product.Icon;
          return (
            <article key={product.id} className="rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-600">{product.badge}</span>
              </div>
              <h2 className="mt-5 text-2xl font-black">{product.label}</h2>
              <p className="mt-2 text-sm font-bold leading-6 text-muted">{product.description}</p>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-muted">
                {product.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-2xl font-black text-violet-600">{product.price}</p>
                <button type="button" disabled className="cursor-not-allowed rounded-xl bg-violet-100 px-5 py-3 text-sm font-black text-violet-400">
                  {product.actionLabel}
                </button>
              </div>
            </article>
          );
        })}
      </section>
      <ManualPaymentHistory requests={payment.requests} />
      <ManualPaymentModal
        config={payment.config}
        onClose={() => setSelected(undefined)}
        onSubmit={payment.submit}
        open={Boolean(selected)}
        product={selected}
      />
    </DashboardShell>
  );
}
