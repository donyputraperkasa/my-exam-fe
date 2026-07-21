import type { AnalyticsSummary } from "@/features/analytics/api";

export function AnalyticsFunnel({ summary }: { summary: AnalyticsSummary }) {
  const funnel = [
    ["Tryout selesai", summary.trialCompletions],
    ["Registrasi akun", summary.registrations],
    ["Permintaan subscription", summary.subscriptionRequests],
    ["Pembayaran disetujui", summary.paymentsApproved],
  ] as const;

  return (
    <section className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[1.35fr_0.65fr]">
      <div className="min-w-0 rounded-lg border border-violet-100 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm font-black uppercase text-secondary">
          Alur konversi
        </p>
        <div className="mt-4 grid gap-2 sm:hidden">
          {funnel.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3 rounded-lg bg-violet-50/70 p-3"
            >
              <span className="min-w-0 text-sm font-bold leading-5">
                {label}
              </span>
              <span className="shrink-0 text-lg font-black text-primary">
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 hidden sm:block">
          <table className="w-full table-fixed text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted">
              <tr>
                <th className="px-3 py-3">Tahap</th>
                <th className="w-28 px-3 py-3">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {funnel.map(([label, value]) => (
                <tr key={label} className="border-b border-border/70 last:border-0">
                  <td className="break-words px-3 py-4 font-bold">{label}</td>
                  <td className="px-3 py-4 text-lg font-black text-primary">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="min-w-0 rounded-lg border border-violet-100 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm font-black uppercase text-secondary">
          Kualitas funnel
        </p>
        <Rate label="Selesai tryout" value={summary.rates.completion} />
        <Rate label="Daftar setelah tryout" value={summary.rates.registration} />
        <Rate label="Pembayaran disetujui" value={summary.rates.payment} />
        <div className="mt-5 rounded-lg bg-accent/20 p-4">
          <p className="text-xs font-black uppercase text-muted">
            Rata-rata skor trial
          </p>
          <p className="mt-1 text-3xl font-black text-foreground">
            {summary.averageTrialScore}
          </p>
        </div>
      </div>
    </section>
  );
}

function Rate({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-5">
      <div className="flex items-start justify-between gap-4 text-sm font-bold">
        <span className="min-w-0">{label}</span>
        <span className="shrink-0">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-violet-100">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}
