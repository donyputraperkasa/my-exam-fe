"use client";

import { FormEvent, useState } from "react";
import { Landmark, Upload, X } from "lucide-react";
import { ManualPaymentBankList } from "./manual-payment-bank-list";
import { ManualPaymentProofField } from "./manual-payment-proof-field";
import type {
  ManualPaymentConfig,
  ManualPaymentProduct,
} from "./manual-payments-api";
import { formatRupiah } from "./payment-format";

type ManualPaymentModalProps = {
  config: ManualPaymentConfig | null;
  onClose: () => void;
  onSubmit: (product: ManualPaymentProduct, file: File) => Promise<void>;
  open: boolean;
  product?: ManualPaymentProduct;
};

export function ManualPaymentModal(props: ManualPaymentModalProps) {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  if (!props.open || !props.product) return null;
  const item = props.config?.products.find(
    (product) => product.id === props.product,
  );

  function close() {
    setFile(undefined);
    setError("");
    props.onClose();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || !props.product) return setError("Pilih foto bukti transfer.");
    setSaving(true);
    setError("");
    try {
      await props.onSubmit(props.product, file);
      close();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Gagal mengirim pembayaran",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && close()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-3 backdrop-blur-sm sm:p-5"
    >
      <form
        onSubmit={submit}
        className="max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-violet-100 bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2.5rem)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <Landmark className="h-6 w-6" />
          </span>
          <button type="button" onClick={close} aria-label="Tutup modal">
            <X className="h-6 w-6 text-muted" />
          </button>
        </div>
        <p className="mt-5 text-sm font-black uppercase text-pink-400">Transfer manual</p>
        <h2 className="mt-2 text-2xl font-black">{item?.label ?? "Pembayaran MyExam"}</h2>
        <p className="mt-2 text-3xl font-black text-violet-600">
          {formatRupiah(item?.amount ?? 0)}
        </p>
        {props.config?.configured ? (
          <ManualPaymentBankList config={props.config} />
        ) : (
          <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-500">
            Rekening belum diatur oleh admin.
          </p>
        )}
        <ManualPaymentProofField
          file={file}
          onChange={setFile}
          onError={setError}
        />
        {error ? <p className="mt-3 text-sm font-bold text-red-500">{error}</p> : null}
        <button
          disabled={saving || !props.config?.configured}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-black text-white hover:bg-accent/80 disabled:opacity-50"
        >
          <Upload className="h-4 w-4" />
          {saving ? "Mengirim..." : "Kirim untuk Direview"}
        </button>
      </form>
    </div>
  );
}
