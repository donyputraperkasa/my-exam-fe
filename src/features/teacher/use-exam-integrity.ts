"use client";

import { useEffect, useRef, useState } from "react";
import {
  recordTeacherExamEvent,
  type TeacherExamEventType,
} from "./public-api";

export function useExamIntegrity(participantToken: string, active: boolean) {
  const [blockedReason, setBlockedReason] = useState("");
  const reported = useRef(false);

  useEffect(() => {
    if (!active || !participantToken) {
      return;
    }

    async function report(type: TeacherExamEventType) {
      if (reported.current) {
        return;
      }
      reported.current = true;
      try {
        const participant = await recordTeacherExamEvent(participantToken, type);
        if (participant.status === "BLOCKED") {
          setBlockedReason(participant.blockReason ?? "Ujian diblokir karena pelanggaran fokus.");
        } else {
          reported.current = false;
        }
      } catch {
        reported.current = false;
      }
    }

    const onVisibility = () => document.hidden && void report("TAB_HIDDEN");
    const onBlur = () => void report("WINDOW_BLUR");
    const onCopy = (event: ClipboardEvent) => {
      event.preventDefault();
      void report("COPY_ATTEMPT");
    };
    const onPaste = (event: ClipboardEvent) => {
      event.preventDefault();
      void report("PASTE_ATTEMPT");
    };
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      void report("RIGHT_CLICK");
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onPaste);
    document.addEventListener("contextmenu", onContextMenu);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("paste", onPaste);
      document.removeEventListener("contextmenu", onContextMenu);
    };
  }, [active, participantToken]);

  return blockedReason;
}
