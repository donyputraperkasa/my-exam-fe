"use client";

import { useEffect, useMemo, useState } from "react";
import { getToken } from "@/features/auth/session";
import { fetchActiveSubscriptions, type ActiveSubscription } from "./subscription-admin-api";
import { AdminListSearch } from "./admin-list-search";

export function ActiveSubscriptionList() {
  const [items, setItems] = useState<ActiveSubscription[]>([]);
  const [query, setQuery] = useState("");
  const filteredItems = useMemo(() => {
    const keyword = query.toLowerCase();
    return items.filter((item) =>
      `${item.user.name} ${item.user.email} ${item.plan.name}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [items, query]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    const load = () => {
      void fetchActiveSubscriptions(token).then((response) => setItems(response.data));
    };
    load();
    window.addEventListener("subscription-updated", load);
    return () => window.removeEventListener("subscription-updated", load);
  }, []);

  return (
    <section className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <p className="text-sm font-black uppercase text-pink-400">Subscription aktif</p>
      <h2 className="mt-1 text-2xl font-black">Siswa yang sudah subscribe</h2>
      <AdminListSearch value={query} onChange={setQuery} placeholder="Cari nama, email, atau paket..." />
      <div className="mt-5 grid gap-3">
        {!filteredItems.length ? <p className="rounded-xl bg-background/70 p-4 text-sm font-bold text-muted">Subscription tidak ditemukan.</p> : null}
        {filteredItems.map((item) => (
          <article key={item.id} className="grid gap-2 rounded-xl bg-background/70 p-4 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-black">{item.user.name}</p>
              <p className="mt-1 text-sm font-bold text-muted">{item.user.email} · {item.plan.name}</p>
            </div>
            <p className="text-sm font-black text-green-600">
              Aktif sampai {new Date(item.expiredAt).toLocaleDateString("id-ID")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
