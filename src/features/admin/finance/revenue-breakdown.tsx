import type { RevenueReport } from "./api";
import { formatMonth, formatRupiah } from "./finance-format";

export function RevenueBreakdown({ report }: { report: RevenueReport }) {
  const maxRevenue = Math.max(...report.months.map((item) => item.revenue), 1);

  return (
    <section className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <article className="min-w-0 rounded-lg border border-violet-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-black uppercase text-primary">
          Pendapatan per produk
        </p>
        <div className="mt-4 grid gap-3">
          {report.products.map((product) => (
            <div
              key={product.product}
              className="rounded-lg border border-violet-100 bg-violet-50/60 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="break-words font-bold">{product.label}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">
                    {product.transactions} transaksi
                  </p>
                </div>
                <p className="shrink-0 text-sm font-black text-primary">
                  {formatRupiah(product.revenue)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="min-w-0 rounded-lg border border-violet-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-black uppercase text-primary">
          Tren pendapatan bulanan
        </p>
        {report.months.length ? (
          <div className="mt-5 grid gap-4">
            {report.months.map((month) => (
              <div key={month.month}>
                <div className="flex items-start justify-between gap-4 text-sm">
                  <span className="font-bold capitalize">
                    {formatMonth(month.month)}
                  </span>
                  <span className="shrink-0 font-black text-primary">
                    {formatRupiah(month.revenue)}
                  </span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-violet-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(month.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-xs font-semibold text-muted">
                  {month.transactions} transaksi
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-lg bg-violet-50 p-4 text-sm font-semibold text-muted">
            Belum ada pembayaran yang disetujui pada periode ini.
          </p>
        )}
      </article>
    </section>
  );
}
