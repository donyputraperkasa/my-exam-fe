"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { UserRole } from "@/types/auth";
import { TeacherExamForm } from "./teacher-exam-form";
import { TeacherExamList } from "./teacher-exam-list";
import { useTeacherExams } from "./use-teacher-exams";

type TeacherExamWorkspaceProps = {
  allowedRoles?: UserRole[];
  eyebrow: string;
  role: UserRole;
  title: string;
};

export function TeacherExamWorkspace({
  allowedRoles,
  eyebrow,
  role,
  title,
}: TeacherExamWorkspaceProps) {
  const { creating, createExam, error, exams, loading } = useTeacherExams();

  return (
    <DashboardShell
      allowedRoles={allowedRoles}
      eyebrow={eyebrow}
      role={role}
      title={title}
    >
      {error ? (
        <p className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-500">
          {error}
        </p>
      ) : null}
      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <TeacherExamForm creating={creating} onCreate={createExam} />
        <TeacherExamList exams={exams} loading={loading} />
      </section>
    </DashboardShell>
  );
}
