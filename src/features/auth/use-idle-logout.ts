"use client";

import { useEffect } from "react";
import {
  getLastSessionActivity,
  recordSessionActivity,
} from "./session";

const IDLE_LIMIT_MS = 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 30 * 1000;
const WRITE_THROTTLE_MS = 15 * 1000;
const activityEvents = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

export function useIdleLogout(onIdle: () => void) {
  useEffect(() => {
    let lastWrite = 0;

    function expireIfIdle() {
      const lastActivity = getLastSessionActivity();
      if (!lastActivity) {
        recordSessionActivity();
        return false;
      }
      if (Date.now() - lastActivity < IDLE_LIMIT_MS) return false;
      onIdle();
      return true;
    }

    function recordActivity() {
      const now = Date.now();
      if (now - lastWrite < WRITE_THROTTLE_MS) return;
      lastWrite = now;
      recordSessionActivity(now);
    }

    function handleVisibilityChange() {
      if (document.visibilityState !== "visible") return;
      if (!expireIfIdle()) recordActivity();
    }

    if (expireIfIdle()) return;
    activityEvents.forEach((event) => window.addEventListener(event, recordActivity, { passive: true }));
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const interval = window.setInterval(expireIfIdle, CHECK_INTERVAL_MS);

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, recordActivity));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(interval);
    };
  }, [onIdle]);
}
