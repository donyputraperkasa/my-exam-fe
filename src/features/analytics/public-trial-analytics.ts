import type { TrialScore } from "@/features/trial/trial-types";
import {
  createAnalyticsSessionId,
  getAnalyticsSessionId,
  getOrCreateAnalyticsVisitorId,
} from "./analytics-context";
import { trackPublicAnalytics } from "./api";

export function startPublicTrialAnalytics(fresh = false) {
  const sessionId = fresh
    ? createAnalyticsSessionId()
    : getAnalyticsSessionId() ?? createAnalyticsSessionId();

  return trackSafely({
    eventType: "TRIAL_STARTED",
    visitorId: getOrCreateAnalyticsVisitorId(),
    sessionId,
  });
}

export function completePublicTrialAnalytics(result: TrialScore) {
  return trackSafely({
    eventType: "TRIAL_COMPLETED",
    visitorId: getOrCreateAnalyticsVisitorId(),
    sessionId: getAnalyticsSessionId() ?? createAnalyticsSessionId(),
    score: result.score,
    correctCount: result.correctCount,
    incorrectCount: result.incorrectCount,
    totalQuestions: result.totalQuestions,
  });
}

export function trackPublicRegisterClick() {
  return trackSafely({
    eventType: "REGISTER_CLICKED",
    visitorId: getOrCreateAnalyticsVisitorId(),
    sessionId: getAnalyticsSessionId() ?? createAnalyticsSessionId(),
  });
}

function trackSafely(payload: Parameters<typeof trackPublicAnalytics>[0]) {
  return trackPublicAnalytics(payload).catch(() => undefined);
}
