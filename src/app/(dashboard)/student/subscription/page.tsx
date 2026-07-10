import { CalendarDays, Clock3, CreditCard, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const plans = [
  {
    name: "Subscribe 1 Bulan",
    price: "Rp39.000",
    description: "Cocok untuk pemanasan intensif sebelum ujian.",
    icon: CalendarDays,
  },
  {
    name: "Subscribe 3 Bulan",
    price: "Rp99.000",
    description: "Lebih hemat untuk latihan bertahap sampai siap.",
    icon: Sparkles,
  },
];

const histories = [
  {
    plan: "Belum ada transaksi",
    status: "Menunggu integrasi pembayaran",
    date: "-",
  },
];

export default function StudentSubscriptionPage() {
  return (
    <DashboardShell
      eyebrow="Akses Premium"
      role="STUDENT"
      title="Riwayat Subscribe"
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {plans.map(({ description, icon: Icon, name, price }) => (
          <article
            key={name}
            className="rounded-lg border border-purple-100 bg-white/88 p-5 shadow-sm"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-2xl font-black">{name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-2xl font-black text-secondary">{price}</p>
              <button
                type="button"
                className="rounded-md bg-accent hover:bg-purple-600 hover:text-white px-4 py-3 text-sm font-black text-foreground"
              >
                Pilih Paket
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-lg border border-border bg-white/88 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <CreditCard className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-black uppercase text-secondary">
              Riwayat
            </p>
            <h2 className="text-xl font-black">Aktivitas subscribe</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {histories.map((item) => (
            <div
              key={item.plan}
              className="grid gap-2 rounded-lg bg-background/80 p-4 md:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="font-black">{item.plan}</p>
                <p className="mt-1 text-sm text-muted">{item.status}</p>
              </div>
              <p className="inline-flex items-center gap-2 text-sm font-bold text-muted">
                <Clock3 className="h-4 w-4" />
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
