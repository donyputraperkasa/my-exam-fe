"use client";

import { useEffect, useMemo, useState } from "react";
import { getToken } from "@/features/auth/session";
import { AdminDataTable, AdminTableCell } from "./admin-data-table";
import { AdminListSearch } from "./admin-list-search";
import {
  fetchAdminSubscriptions,
  type AdminSubscription,
} from "./subscription-admin-api";
import { formatAdminDate, getSubscriptionStatus } from "./subscription-admin-format";

const headers = ["Nama", "Jenis subscription", "Tanggal mulai", "Kadaluarsa", "Status"];

export function ActiveSubscriptionList() {
  const [items, setItems] = useState<AdminSubscription[]>([]);
  const [query, setQuery] = useState("");
  const filteredItems = useMemo(() => {
    const keyword = query.toLowerCase();
    return items.filter((item) =>
      `${item.user.name} ${item.user.email} ${item.plan.name} ${item.status}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [items, query]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    const load = () => {
      void fetchAdminSubscriptions(token).then((response) => setItems(response.data));
    };
    load();
    window.addEventListener("subscription-updated", load);
    return () => window.removeEventListener("subscription-updated", load);
  }, []);

  return (
    <section className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <p className="text-sm font-black uppercase text-pink-400">Subscription siswa</p>
      <h2 className="mt-1 text-2xl font-black">Data subscription siswa</h2>
      <AdminListSearch value={query} onChange={setQuery} placeholder="Cari nama, email, paket, atau status..." />
      <AdminDataTable headers={headers} empty={!filteredItems.length} emptyMessage="Subscription tidak ditemukan.">
        {filteredItems.map((item) => <SubscriptionRow key={item.id} item={item} />)}
      </AdminDataTable>
    </section>
  );
}

function SubscriptionRow({ item }: { item: AdminSubscription }) {
  const status = getSubscriptionStatus(item.status, item.expiredAt);
  return (
    <tr className="font-bold transition hover:bg-violet-50/35">
      <AdminTableCell><p className="font-black">{item.user.name}</p><p className="mt-1 text-xs text-muted">{item.user.email}</p></AdminTableCell>
      <AdminTableCell>{item.plan.name}</AdminTableCell>
      <AdminTableCell>{formatAdminDate(item.startedAt)}</AdminTableCell>
      <AdminTableCell>{formatAdminDate(item.expiredAt)}</AdminTableCell>
      <AdminTableCell><span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${status.className}`}>{status.label}</span></AdminTableCell>
    </tr>
  );
}
