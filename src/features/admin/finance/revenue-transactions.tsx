"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { RevenueTransaction } from "./api";
import { formatDate, formatRupiah } from "./finance-format";

export function RevenueTransactions({ items }: { items: RevenueTransaction[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) =>
      [item.invoiceCode, item.customerName, item.customerEmail, item.productLabel]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }, [items, query]);

  return (
    <section className="mt-5 min-w-0 rounded-lg border border-violet-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-primary">
            Transaksi disetujui
          </p>
          <p className="mt-1 text-sm font-semibold text-muted">
            Hanya pembayaran berstatus PAID yang masuk laporan.
          </p>
        </div>
        <label className="flex w-full items-center gap-2 rounded-lg border border-violet-100 bg-white px-3 py-2 sm:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari invoice, nama, atau produk..."
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-muted/70"
          />
        </label>
      </div>

      {!filtered.length ? (
        <p className="mt-5 rounded-lg bg-violet-50 p-4 text-sm font-semibold text-muted">
          Tidak ada transaksi yang sesuai.
        </p>
      ) : (
        <TransactionList items={filtered} />
      )}
    </section>
  );
}

function TransactionList({ items }: { items: RevenueTransaction[] }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[760px] table-fixed text-left text-sm">
        <thead className="border-b border-violet-100 text-xs uppercase text-muted">
          <tr>
            <th className="w-36 px-3 py-3">Tanggal</th>
            <th className="w-48 px-3 py-3">Invoice</th>
            <th className="px-3 py-3">Pelanggan</th>
            <th className="px-3 py-3">Produk</th>
            <th className="w-36 px-3 py-3 text-right">Nominal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-violet-100/70 last:border-0">
              <td className="px-3 py-4 font-semibold text-muted">
                {formatDate(item.paidAt)}
              </td>
              <td className="break-all px-3 py-4 font-bold">{item.invoiceCode}</td>
              <td className="px-3 py-4">
                <p className="break-words font-bold">{item.customerName}</p>
                <p className="break-all text-xs font-semibold text-muted">
                  {item.customerEmail}
                </p>
              </td>
              <td className="break-words px-3 py-4 font-semibold">
                {item.productLabel}
              </td>
              <td className="px-3 py-4 text-right font-black text-primary">
                {formatRupiah(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
