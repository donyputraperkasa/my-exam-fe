import { env } from "@/lib/env";
import { apiFetch } from "@/lib/api/client";

export type ManualPaymentProduct =
  | "STUDENT_MONTH_1"
  | "STUDENT_MONTH_3"
  | "TEACHER_PUBLISH_CREDIT";
export type ManualPaymentStatus = "PENDING" | "PAID" | "FAILED" | "EXPIRED";

export type ManualPaymentConfig = {
  bank: { accountHolder: string; accountNumber: string; name: string };
  configured: boolean;
  products: Array<{ amount: number; id: ManualPaymentProduct; label: string }>;
};

export type ManualPaymentRequest = {
  amount: string | number;
  createdAt: string;
  id: string;
  invoiceCode: string;
  product: ManualPaymentProduct;
  proofImageUrl: string;
  reviewNote: string | null;
  status: ManualPaymentStatus;
  user?: { email: string; id: string; name: string; role: string };
};

export function getManualPaymentConfig(token: string) {
  return apiFetch<ManualPaymentConfig>("/manual-payments/config", { token });
}

export function getMyManualPayments(token: string) {
  return apiFetch<ManualPaymentRequest[]>("/manual-payments/me", { token });
}

export function createManualPayment(
  product: ManualPaymentProduct,
  proofImageUrl: string,
  token: string,
) {
  return apiFetch<ManualPaymentRequest>("/manual-payments", {
    method: "POST",
    body: JSON.stringify({ product, proofImageUrl }),
    token,
  });
}

export async function uploadPaymentProof(file: File, token: string) {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch(`${env.apiBaseUrl}/uploads/payment-proofs`, {
    method: "POST",
    body,
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Gagal mengunggah bukti transfer");
  return response.json() as Promise<{ url: string }>;
}

export function getAdminManualPayments(token: string) {
  return apiFetch<ManualPaymentRequest[]>("/admin/manual-payments", { token });
}

export function reviewManualPayment(
  id: string,
  approved: boolean,
  token: string,
) {
  return apiFetch<ManualPaymentRequest>(`/admin/manual-payments/${id}/review`, {
    method: "PATCH",
    body: JSON.stringify({ approved }),
    token,
  });
}
