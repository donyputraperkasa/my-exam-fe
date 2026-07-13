import { apiFetch } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/exam";

export type AdminSubscription = {
  expiredAt: string;
  id: string;
  startedAt: string;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  plan: { durationDays: number; id: string; name: string };
  user: { email: string; id: string; name: string };
};

export function fetchAdminSubscriptions(token: string) {
  return apiFetch<PaginatedResponse<AdminSubscription>>(
    "/admin/subscriptions?limit=100",
    { token },
  );
}
