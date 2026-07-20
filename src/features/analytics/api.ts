import { apiFetch } from "@/lib/api/client";

export type PublicAnalyticsEvent = {
  eventType: "TRIAL_STARTED" | "TRIAL_COMPLETED" | "REGISTER_CLICKED";
  visitorId: string;
  sessionId: string;
  score?: number;
  correctCount?: number;
  incorrectCount?: number;
  totalQuestions?: number;
};

export type AnalyticsSummary = {
  days: number;
  uniqueVisitors: number;
  trialStarts: number;
  trialCompletions: number;
  registerClicks: number;
  registrations: number;
  subscriptionRequests: number;
  paymentsApproved: number;
  averageTrialScore: number;
  rates: {
    completion: number;
    registration: number;
    payment: number;
  };
};

export function trackPublicAnalytics(payload: PublicAnalyticsEvent) {
  return apiFetch<{ tracked: boolean }>("/public/analytics/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getAdminAnalyticsSummary(days: number, token: string) {
  return apiFetch<AnalyticsSummary>(`/admin/analytics/summary?days=${days}`, {
    token,
  });
}
