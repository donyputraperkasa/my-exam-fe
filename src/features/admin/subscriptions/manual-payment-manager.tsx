"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Eye, X } from "lucide-react";
import { getToken } from "@/features/auth/session";
import {
  getAdminManualPayments,
  reviewManualPayment,
  type ManualPaymentRequest,
} from "@/features/payments/manual-payments-api";
import {
  formatRupiah,
  getProductLabel,
  getStatusLabel,
} from "@/features/payments/payment-format";
import { AdminDataTable, AdminTableCell } from "./admin-data-table";
import { AdminListSearch } from "./admin-list-search";
import { PaymentProofModal } from "./payment-proof-modal";
import { formatAdminDate } from "./subscription-admin-format";

const headers = ["Nama", "Jenis pembayaran", "Tanggal", "Nominal", "Status", "Aksi"];

export function ManualPaymentManager() {
  const [items, setItems] = useState<ManualPaymentRequest[]>([]);
  const [selectedProof, setSelectedProof] = useState<ManualPaymentRequest | null>(null);
  const [reviewing, setReviewing] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const filteredItems = useMemo(() => {
    const keyword = query.toLowerCase();
    return items.filter((item) =>
      [item.user?.name, item.user?.email, item.invoiceCode, getProductLabel(item.product)]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }, [items, query]);

  const load = useCallback(async () => {
    const token = getToken();
    if (token) setItems(await getAdminManualPayments(token));
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    getAdminManualPayments(token)
      .then(setItems)
      .catch((caught) => setError(getMessage(caught)));
  }, []);

  async function review(id: string, approved: boolean) {
    const token = getToken();
    if (!token) return;
    setReviewing(id);
    setError("");
    try {
      await reviewManualPayment(id, approved, token);
      await load();
      window.dispatchEvent(new Event("subscription-updated"));
    } catch (caught) {
      setError(getMessage(caught));
    } finally {
      setReviewing("");
    }
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <p className="text-sm font-black uppercase text-pink-400">Antrean pembayaran</p>
      <h2 className="mt-1 text-2xl font-black">Verifikasi transfer manual</h2>
      <AdminListSearch value={query} onChange={setQuery} placeholder="Cari nama, email, invoice, atau produk..." />
      {error ? <p className="mt-3 text-sm font-bold text-red-500">{error}</p> : null}
      <AdminDataTable headers={headers} empty={!filteredItems.length} emptyMessage="Data pembayaran tidak ditemukan." minWidth="min-w-[1100px]">
        {filteredItems.map((item) => (
          <PaymentRow key={item.id} item={item} reviewing={reviewing === item.id} onProof={() => setSelectedProof(item)} onReview={review} />
        ))}
      </AdminDataTable>
      <PaymentProofModal item={selectedProof} onClose={() => setSelectedProof(null)} />
    </section>
  );
}

type PaymentRowProps = {
  item: ManualPaymentRequest;
  onProof: () => void;
  onReview: (id: string, approved: boolean) => Promise<void>;
  reviewing: boolean;
};

function PaymentRow({ item, onProof, onReview, reviewing }: PaymentRowProps) {
  const statusClass = getPaymentStatusClass(item.status);
  return (
    <tr className="font-bold transition hover:bg-violet-50/35">
      <AdminTableCell><p className="font-black">{item.user?.name ?? "-"}</p><p className="mt-1 text-xs text-muted">{item.user?.email}</p></AdminTableCell>
      <AdminTableCell><p>{getProductLabel(item.product)}</p><p className="mt-1 text-xs text-muted">{item.invoiceCode}</p></AdminTableCell>
      <AdminTableCell>{formatAdminDate(item.createdAt)}</AdminTableCell>
      <AdminTableCell><span className="font-black text-violet-700">{formatRupiah(item.amount)}</span></AdminTableCell>
      <AdminTableCell><span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${statusClass}`}>{getStatusLabel(item.status)}</span></AdminTableCell>
      <AdminTableCell><div className="flex flex-wrap gap-2"><button type="button" onClick={onProof} className="inline-flex h-9 items-center gap-2 rounded-lg border border-violet-200 px-3 text-xs font-black text-violet-700 hover:bg-violet-50"><Eye className="h-4 w-4" /> Bukti</button>{item.status === "PENDING" ? <ReviewButtons disabled={reviewing} itemId={item.id} onReview={onReview} /> : null}</div></AdminTableCell>
    </tr>
  );
}

function ReviewButtons({ disabled, itemId, onReview }: { disabled: boolean; itemId: string; onReview: PaymentRowProps["onReview"] }) {
  return <><button type="button" disabled={disabled} onClick={() => void onReview(itemId, true)} className="inline-flex h-9 items-center gap-1 rounded-lg bg-emerald-50 px-3 text-xs font-black text-emerald-700 disabled:opacity-50"><Check className="h-4 w-4" /> Setujui</button><button type="button" disabled={disabled} onClick={() => void onReview(itemId, false)} className="inline-flex h-9 items-center gap-1 rounded-lg bg-red-50 px-3 text-xs font-black text-red-600 disabled:opacity-50"><X className="h-4 w-4" /> Tolak</button></>;
}

function getPaymentStatusClass(status: ManualPaymentRequest["status"]) {
  if (status === "PAID") return "bg-emerald-50 text-emerald-700";
  if (status === "PENDING") return "bg-amber-50 text-amber-700";
  if (status === "FAILED") return "bg-red-50 text-red-600";
  return "bg-slate-100 text-slate-600";
}

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Gagal memuat pembayaran";
}
