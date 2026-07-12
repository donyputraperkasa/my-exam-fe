"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { UserRole } from "@/types/auth";
import { TeacherMonitorParticipants } from "./teacher-monitor-participants";
import { useTeacherMonitor } from "./use-teacher-monitor";

type TeacherMonitorDetailProps = {
  allowedRoles?: UserRole[];
  examId: string;
  eyebrow: string;
  role: UserRole;
};

export function TeacherMonitorDetail({
  allowedRoles,
  examId,
  eyebrow,
  role,
}: TeacherMonitorDetailProps) {
  const monitor = useTeacherMonitor(examId);

  return (
    <DashboardShell
      allowedRoles={allowedRoles}
      eyebrow={eyebrow}
      role={role}
      title="Monitor Peserta"
    >
      {monitor.error ? (
        <p className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-500">
          {monitor.error}
        </p>
      ) : null}
      <TeacherMonitorParticipants
        exam={monitor.selectedExam}
        participants={monitor.participants}
        showTableWhenEmpty
      />
      <p className="mt-4 text-sm font-semibold text-muted">
        Data peserta diperbarui otomatis setiap 5 detik.
      </p>
    </DashboardShell>
  );
}
