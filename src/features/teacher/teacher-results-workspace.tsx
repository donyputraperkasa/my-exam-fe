"use client";

import { Download } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { UserRole } from "@/types/auth";
import { downloadTeacherResults } from "./download-teacher-results";
import { TeacherMonitorExamList } from "./teacher-monitor-exam-list";
import { ParticipantTable } from "./teacher-monitor-participants";
import { useTeacherMonitor } from "./use-teacher-monitor";

type TeacherResultsWorkspaceProps = {
  allowedRoles?: UserRole[];
  eyebrow: string;
  role: UserRole;
};

export function TeacherResultsWorkspace({
  allowedRoles,
  eyebrow,
  role,
}: TeacherResultsWorkspaceProps) {
  const data = useTeacherMonitor();
  return (
    <DashboardShell allowedRoles={allowedRoles} eyebrow={eyebrow} role={role} title="Hasil & Unduh">
      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.1fr]">
        <TeacherMonitorExamList
          exams={data.exams}
          loading={data.loading}
          onSelect={data.setSelectedExamId}
          selectedExamId={data.selectedExamId}
        />
        <section className="rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase text-pink-400">Hasil ujian</p>
              <h2 className="mt-1 text-2xl font-black">{data.selectedExam?.title ?? "Pilih ujian"}</h2>
            </div>
            <button
              type="button"
              disabled={!data.selectedExam || !data.participants.length}
              onClick={() => data.selectedExam && downloadTeacherResults(data.selectedExam, data.participants)}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-3 text-sm font-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Download className="h-4 w-4" />
              Unduh CSV
            </button>
          </div>
          {data.participants.length ? (
            <ParticipantTable participants={data.participants} />
          ) : (
            <p className="mt-5 rounded-xl bg-background/70 p-4 text-sm font-bold text-muted">
              Belum ada hasil peserta untuk diunduh.
            </p>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
