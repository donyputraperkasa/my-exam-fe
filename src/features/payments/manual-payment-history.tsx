import { Clock3 } from "lucide-react";
import type { ManualPaymentRequest } from "./manual-payments-api";
import { formatRupiah, getProductLabel, getStatusLabel } from "./payment-format";

export function ManualPaymentHistory({ requests }: { requests: ManualPaymentRequest[] }) {
  return (
    <section className="mt-6 rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-pink-400">Riwayat pembayaran</p>
      <div className="mt-4 grid gap-3">
        {!requests.length ? (
          <p className="rounded-xl bg-background/70 p-4 text-sm font-bold text-muted">
            Belum ada transaksi.
          </p>
        ) : null}
        {requests.map((request) => (
          <article key={request.id} className="grid gap-3 rounded-xl bg-background/70 p-4 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-black">{getProductLabel(request.product)}</p>
              <p className="mt-1 text-sm font-bold text-muted">
                {request.invoiceCode} - {formatRupiah(request.amount)}
              </p>
              {request.reviewNote ? <p className="mt-1 text-xs text-red-500">{request.reviewNote}</p> : null}
            </div>
            <div className="text-sm font-black md:text-right">
              <p className={request.status === "PAID" ? "text-green-600" : "text-violet-600"}>
                {getStatusLabel(request.status)}
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-xs text-muted">
                <Clock3 className="h-3.5 w-3.5" />
                {new Date(request.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
