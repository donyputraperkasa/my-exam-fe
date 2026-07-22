import {
  BadgeDollarSign,
  GraduationCap,
  ReceiptText,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import type { RevenueReport } from "./api";
import { formatRupiah } from "./finance-format";

export function RevenueSummary({ report }: { report: RevenueReport }) {
  const metrics: Metric[] = [
    {
      label: "Pendapatan masuk",
      value: formatRupiah(report.summary.totalRevenue),
      detail: `${report.summary.paidTransactions} pembayaran disetujui`,
      Icon: BadgeDollarSign,
    },
    {
      label: "Subscription siswa",
      value: formatRupiah(report.summary.studentRevenue),
      detail: "Paket belajar 1 dan 3 bulan",
      Icon: GraduationCap,
    },
    {
      label: "Kredit guru",
      value: formatRupiah(report.summary.teacherRevenue),
      detail: "Kredit publish mode ujian",
      Icon: Presentation,
    },
    {
      label: "Rata-rata transaksi",
      value: formatRupiah(report.summary.averageTransaction),
      detail: "Rata-rata pembayaran berstatus PAID",
      Icon: ReceiptText,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ Icon, detail, label, value }) => (
        <article
          key={label}
          className="min-w-0 rounded-lg border border-violet-100 bg-white p-5 shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <p className="mt-5 text-sm font-bold text-muted">{label}</p>
          <p className="mt-1 break-words text-2xl font-black text-foreground">
            {value}
          </p>
          <p className="mt-2 text-xs font-semibold leading-5 text-muted">
            {detail}
          </p>
        </article>
      ))}
    </section>
  );
}

type Metric = {
  label: string;
  value: string;
  detail: string;
  Icon: LucideIcon;
};
