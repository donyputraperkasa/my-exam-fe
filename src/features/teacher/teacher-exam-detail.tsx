"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { UserRole } from "@/types/auth";
import { TeacherExamInfo } from "./teacher-exam-info";
import { TeacherCreditModal } from "./teacher-credit-modal";
import { TeacherQuestionWorkspace } from "./teacher-question-workspace";
import { useTeacherExamDetail } from "./use-teacher-exam-detail";
import { useTeacherCredits } from "./use-teacher-credits";

type TeacherExamDetailProps = {
  allowedRoles?: UserRole[];
  examId: string;
  eyebrow: string;
  role: UserRole;
  title: string;
};

export function TeacherExamDetail(props: TeacherExamDetailProps) {
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const {
    addQuestion,
    deleteQuestion,
    error,
    exam,
    loading,
    publish,
    saving,
    updateQuestion,
  } =
    useTeacherExamDetail(props.examId);
  const creditState = useTeacherCredits();

  async function handlePublish() {
    await publish();
    await creditState.refresh();
  }

  return (
    <DashboardShell
      allowedRoles={props.allowedRoles}
      eyebrow={props.eyebrow}
      role={props.role}
      title={props.title}
    >
      {loading ? <Notice text="Memuat detail ujian..." /> : null}
      {error ? <Notice danger text={error} /> : null}
      {exam ? (
        <section className="grid gap-5">
          <TeacherExamInfo
            accessExpiresAt={exam.accessExpiresAt}
            credits={creditState.credits}
            creditsLoading={creditState.loading}
            onNeedCredit={() => setIsCreditModalOpen(true)}
            pin={exam.pin}
            publish={handlePublish}
            saving={saving}
            shareToken={exam.shareToken}
            status={exam.status}
            title={exam.title}
          />
          <TeacherQuestionWorkspace
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
            participantCount={exam.participants.length}
            questions={exam.questions}
            saving={saving}
            status={exam.status}
            updateQuestion={updateQuestion}
          />
          <TeacherCreditModal
            onClose={() => setIsCreditModalOpen(false)}
            open={isCreditModalOpen}
          />
        </section>
      ) : null}
    </DashboardShell>
  );
}

function Notice({ danger, text }: { danger?: boolean; text: string }) {
  return (
    <p className={`mb-5 rounded-xl border p-4 text-sm font-bold ${danger ? "border-red-100 bg-red-50 text-red-500" : "border-violet-100 bg-white/80 text-muted"}`}>
      {text}
    </p>
  );
}
