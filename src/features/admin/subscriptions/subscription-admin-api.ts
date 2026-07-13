import { apiFetch } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/exam";

export type ActiveSubscription = {
  expiredAt: string;
  id: string;
  startedAt: string;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  plan: { durationDays: number; id: string; name: string };
  user: { email: string; id: string; name: string };
};

export function fetchActiveSubscriptions(token: string) {
  return apiFetch<PaginatedResponse<ActiveSubscription>>(
    "/admin/subscriptions?status=ACTIVE&limit=100",
    { token },
  );
}
