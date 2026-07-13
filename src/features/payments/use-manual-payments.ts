"use client";

import { useCallback, useEffect, useState } from "react";
import { getToken } from "@/features/auth/session";
import {
  createManualPayment,
  getManualPaymentConfig,
  getMyManualPayments,
  uploadPaymentProof,
  type ManualPaymentConfig,
  type ManualPaymentProduct,
  type ManualPaymentRequest,
} from "./manual-payments-api";

export function useManualPayments() {
  const [config, setConfig] = useState<ManualPaymentConfig | null>(null);
  const [requests, setRequests] = useState<ManualPaymentRequest[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    const [nextConfig, nextRequests] = await Promise.all([
      getManualPaymentConfig(token),
      getMyManualPayments(token),
    ]);
    setConfig(nextConfig);
    setRequests(nextRequests);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    Promise.all([getManualPaymentConfig(token), getMyManualPayments(token)])
      .then(([nextConfig, nextRequests]) => {
        setConfig(nextConfig);
        setRequests(nextRequests);
      })
      .catch((caught) => setError(getMessage(caught)))
      .finally(() => setLoading(false));
  }, []);

  async function submit(product: ManualPaymentProduct, file: File) {
    const token = getToken();
    if (!token) throw new Error("Sesi tidak ditemukan");
    setError("");
    const proof = await uploadPaymentProof(file, token);
    await createManualPayment(product, proof.url, token);
    await refresh();
  }

  return { config, error, loading, refresh, requests, submit };
}

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Gagal memuat pembayaran";
}
