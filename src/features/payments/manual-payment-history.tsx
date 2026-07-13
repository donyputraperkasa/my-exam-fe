import type { ManualPaymentRequest } from "./manual-payments-api";
import { formatRupiah, getProductLabel, getStatusLabel } from "./payment-format";

export function ManualPaymentHistory({ requests }: { requests: ManualPaymentRequest[] }) {
  return (
    <section className="mt-6 rounded-lg border border-violet-100 bg-white/90 p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-pink-400">Riwayat pembayaran</p>
      {!requests.length ? (
        <p className="mt-4 rounded-lg bg-background/70 p-4 text-sm font-bold text-muted">Belum ada transaksi.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[850px] w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-xs font-black uppercase text-muted">
                <Header>Nama subscription</Header>
                <Header>Harga</Header>
                <Header>Tanggal subscribe</Header>
                <Header>Kadaluarsa</Header>
                <Header>Status</Header>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => <HistoryRow key={request.id} request={request} />)}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function HistoryRow({ request }: { request: ManualPaymentRequest }) {
  const status = getDisplayStatus(request);
  return (
    <tr className="border-t border-border font-bold">
      <Cell><p className="font-black">{getProductLabel(request.product)}</p><p className="mt-1 text-xs text-muted">{request.invoiceCode}</p></Cell>
      <Cell>{formatRupiah(request.amount)}</Cell>
      <Cell>{formatDate(request.subscription?.startedAt ?? request.createdAt)}</Cell>
      <Cell>{request.subscription ? formatDate(request.subscription.expiredAt) : "-"}</Cell>
      <Cell><span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${status.className}`}>{status.label}</span>{request.reviewNote ? <p className="mt-1 text-xs text-red-500">{request.reviewNote}</p> : null}</Cell>
    </tr>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <th className="border-b border-border bg-background/60 px-4 py-3">{children}</th>;
}

function Cell({ children }: { children: React.ReactNode }) {
  return <td className="border-b border-border/70 px-4 py-4 text-foreground">{children}</td>;
}

function getDisplayStatus(request: ManualPaymentRequest) {
  if (request.subscription) {
    const expired = new Date(request.subscription.expiredAt) <= new Date() || request.subscription.status !== "ACTIVE";
    return expired ? { label: "Kedaluwarsa", className: "bg-slate-100 text-slate-600" } : { label: "Aktif", className: "bg-emerald-50 text-emerald-600" };
  }
  const classes = request.status === "PENDING" ? "bg-amber-50 text-amber-600" : request.status === "FAILED" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600";
  return { label: getStatusLabel(request.status), className: classes };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(value));
}
