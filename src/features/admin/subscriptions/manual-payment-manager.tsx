"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, ExternalLink, X } from "lucide-react";
import { getToken } from "@/features/auth/session";
import {
  getAdminManualPayments,
  reviewManualPayment,
  type ManualPaymentRequest,
} from "@/features/payments/manual-payments-api";
import { formatRupiah, getProductLabel, getStatusLabel } from "@/features/payments/payment-format";
import { AdminListSearch } from "./admin-list-search";

export function ManualPaymentManager() {
  const [items, setItems] = useState<ManualPaymentRequest[]>([]);
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
      <div className="mt-5 grid gap-3">
        {!filteredItems.length ? <p className="rounded-xl bg-background/70 p-4 text-sm font-bold text-muted">Data pembayaran tidak ditemukan.</p> : null}
        {filteredItems.map((item) => (
          <article key={item.id} className="grid gap-4 rounded-xl bg-background/70 p-4 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-black">{item.user?.name} - {getProductLabel(item.product)}</p>
              <p className="mt-1 text-sm font-bold text-muted">{item.user?.email} · {item.invoiceCode}</p>
              <p className="mt-2 text-lg font-black text-violet-600">{formatRupiah(item.amount)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a href={item.proofImageUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-lg border border-violet-100 px-3 text-sm font-black text-violet-600">
                <ExternalLink className="h-4 w-4" /> Bukti
              </a>
              {item.status === "PENDING" ? (
                <>
                  <button disabled={reviewing === item.id} onClick={() => void review(item.id, true)} className="inline-flex h-10 items-center gap-2 rounded-lg bg-green-100 px-3 text-sm font-black text-green-700"><Check className="h-4 w-4" /> Setujui</button>
                  <button disabled={reviewing === item.id} onClick={() => void review(item.id, false)} className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-50 px-3 text-sm font-black text-red-600"><X className="h-4 w-4" /> Tolak</button>
                </>
              ) : <span className="rounded-lg bg-violet-50 px-3 py-2 text-sm font-black text-violet-600">{getStatusLabel(item.status)}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Gagal memuat pembayaran";
}
