const VISITOR_KEY = "my-exam-analytics-visitor";
const SESSION_KEY = "my-exam-analytics-session";

export type AnalyticsContext = {
  visitorId: string;
  sessionId?: string;
};

export function getOrCreateAnalyticsVisitorId() {
  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;

  const visitorId = createUuid();
  localStorage.setItem(VISITOR_KEY, visitorId);
  return visitorId;
}

export function getAnalyticsSessionId() {
  return sessionStorage.getItem(SESSION_KEY) ?? undefined;
}

export function createAnalyticsSessionId() {
  const sessionId = createUuid();
  sessionStorage.setItem(SESSION_KEY, sessionId);
  return sessionId;
}

export function getRegistrationAnalyticsContext(): AnalyticsContext {
  return {
    visitorId: getOrCreateAnalyticsVisitorId(),
    sessionId: getAnalyticsSessionId(),
  };
}

function createUuid() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();

  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (value) =>
    (Number(value) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(value) / 4)))).toString(16),
  );
}
