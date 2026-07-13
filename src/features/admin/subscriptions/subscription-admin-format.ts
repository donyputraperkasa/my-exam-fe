export function formatAdminDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

export function getSubscriptionStatus(
  status: "ACTIVE" | "EXPIRED" | "CANCELLED",
  expiredAt: string,
) {
  if (status === "ACTIVE" && new Date(expiredAt) > new Date()) {
    return { label: "Aktif", className: "bg-emerald-50 text-emerald-700" };
  }
  if (status === "CANCELLED") {
    return { label: "Dibatalkan", className: "bg-red-50 text-red-600" };
  }
  return { label: "Kedaluwarsa", className: "bg-slate-100 text-slate-600" };
}
