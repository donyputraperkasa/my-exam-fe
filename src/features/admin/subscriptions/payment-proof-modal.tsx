"use client";

import { Download, FileImage, X } from "lucide-react";
import type { ManualPaymentRequest } from "@/features/payments/manual-payments-api";
import { getProductLabel } from "@/features/payments/payment-format";

type PaymentProofModalProps = {
  item: ManualPaymentRequest | null;
  onClose: () => void;
};

export function PaymentProofModal({ item, onClose }: PaymentProofModalProps) {
  if (!item) return null;
  const downloadUrl = `${item.proofImageUrl}${item.proofImageUrl.includes("?") ? "&" : "?"}download=1`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bukti transfer"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
    >
      <section className="w-full max-w-3xl rounded-2xl border border-violet-100 bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <FileImage className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-black uppercase text-pink-400">Bukti transfer</p>
              <h2 className="mt-1 text-lg font-black">{getProductLabel(item.product)}</h2>
              <p className="text-xs font-bold text-muted">{item.user?.name} · {item.invoiceCode}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup modal" className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-100 text-muted hover:bg-violet-50 hover:text-violet-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <object data={item.proofImageUrl} className="mt-5 h-[min(62vh,620px)] w-full rounded-xl border border-violet-100 bg-background object-contain" aria-label="File bukti transfer">
          <p className="p-6 text-center text-sm font-bold text-muted">Preview tidak tersedia.</p>
        </object>

        <a href={downloadUrl} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-black text-foreground shadow-sm hover:brightness-95">
          <Download className="h-4 w-4" /> Unduh Bukti
        </a>
      </section>
    </div>
  );
}
