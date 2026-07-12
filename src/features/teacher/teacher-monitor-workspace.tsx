"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { UserRole } from "@/types/auth";
import { appRoutes } from "@/lib/routes";
import { TeacherMonitorExamList } from "./teacher-monitor-exam-list";
import { TeacherMonitorParticipants } from "./teacher-monitor-participants";
import { useTeacherMonitor } from "./use-teacher-monitor";

type TeacherMonitorWorkspaceProps = {
  allowedRoles?: UserRole[];
  eyebrow: string;
  role: UserRole;
  title: string;
};

export function TeacherMonitorWorkspace({
  allowedRoles,
  eyebrow,
  role,
  title,
}: TeacherMonitorWorkspaceProps) {
  const monitor = useTeacherMonitor();
  const monitorHref = monitor.selectedExam
    ? role === "ADMIN"
      ? appRoutes.admin.teacherMonitorDetail(monitor.selectedExam.id)
      : appRoutes.teacher.monitorDetail(monitor.selectedExam.id)
    : undefined;

  return (
    <DashboardShell
      allowedRoles={allowedRoles}
      eyebrow={eyebrow}
      role={role}
      title={title}
    >
      {monitor.error ? (
        <p className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-500">
          {monitor.error}
        </p>
      ) : null}
      <section className="grid gap-5 lg:grid-cols-[0.75fr_1.1fr]">
        <TeacherMonitorExamList
          exams={monitor.exams}
          loading={monitor.loading}
          onSelect={monitor.setSelectedExamId}
          selectedExamId={monitor.selectedExamId}
        />
        <TeacherMonitorParticipants
          exam={monitor.selectedExam}
          href={monitorHref}
          participants={monitor.participants}
        />
      </section>
    </DashboardShell>
  );
}
