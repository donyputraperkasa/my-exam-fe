"use client";

import { useState } from "react";
import { Coins, ReceiptText, UsersRound, type LucideIcon } from "lucide-react";
import { ActiveSubscriptionList } from "./active-subscription-list";
import { ManualPaymentManager } from "./manual-payment-manager";
import { TeacherCreditManager } from "./teacher-credit-manager";

type SubscriptionView = "payments" | "students" | "teachers";

const cards: Array<{
  Icon: LucideIcon;
  description: string;
  id: SubscriptionView;
  title: string;
}> = [
  {
    Icon: ReceiptText,
    description: "Review bukti transfer dan tentukan status pembayaran.",
    id: "payments",
    title: "Antrean Pembayaran",
  },
  {
    Icon: UsersRound,
    description: "Lihat siswa dengan subscription yang masih aktif.",
    id: "students",
    title: "Subscription Siswa",
  },
  {
    Icon: Coins,
    description: "Pantau saldo dan aktivasi kredit publish guru.",
    id: "teachers",
    title: "Kredit Guru",
  },
];

export function SubscriptionAdminWorkspace() {
  const [view, setView] = useState<SubscriptionView>();

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-3">
        {cards.map(({ Icon, description, id, title }) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            className={`min-h-48 rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${view === id ? "border-amber-300 bg-amber-50" : "border-violet-100 bg-white/90"}`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-xl font-black">{title}</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-muted">{description}</p>
          </button>
        ))}
      </section>
      <div className="mt-5">
        {!view ? (
          <p className="rounded-2xl border border-violet-100 bg-white/90 p-6 text-center text-sm font-bold text-muted shadow-sm">
            Pilih salah satu card untuk membuka data.
          </p>
        ) : null}
        {view === "payments" ? <ManualPaymentManager /> : null}
        {view === "students" ? <ActiveSubscriptionList /> : null}
        {view === "teachers" ? <TeacherCreditManager /> : null}
      </div>
    </>
  );
}
