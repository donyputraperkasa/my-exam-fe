import type { ManualPaymentProduct, ManualPaymentStatus } from "./manual-payments-api";

export function formatRupiah(value: number | string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function getProductLabel(product: ManualPaymentProduct) {
  const labels: Record<ManualPaymentProduct, string> = {
    STUDENT_MONTH_1: "Subscription Siswa 1 Bulan",
    STUDENT_MONTH_3: "Subscription Siswa 3 Bulan",
    TEACHER_PUBLISH_CREDIT: "Kredit Publish Guru",
  };
  return labels[product];
}

export function getStatusLabel(status: ManualPaymentStatus) {
  const labels: Record<ManualPaymentStatus, string> = {
    PENDING: "Menunggu approval",
    PAID: "Disetujui",
    FAILED: "Ditolak",
    EXPIRED: "Kedaluwarsa",
  };
  return labels[status];
}
