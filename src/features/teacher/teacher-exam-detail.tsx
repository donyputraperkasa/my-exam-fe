"use client";

import { useState } from "react";
import { Copy, Send } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { UserRole } from "@/types/auth";
import { filterTeacherQuestions } from "./filter-teacher-questions";
import { TeacherExamBreadcrumbs } from "./teacher-exam-breadcrumbs";
import { TeacherExamToolbar } from "./teacher-exam-toolbar";
import { TeacherQuestionList } from "./teacher-question-list";
import { TeacherQuestionModal } from "./teacher-question-modal";
import { useTeacherExamDetail } from "./use-teacher-exam-detail";

type TeacherExamDetailProps = {
  allowedRoles?: UserRole[];
  examId: string;
  eyebrow: string;
  role: UserRole;
  title: string;
};

export function TeacherExamDetail(props: TeacherExamDetailProps) {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { addQuestion, error, exam, loading, publish, saving } =
    useTeacherExamDetail(props.examId);

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
          <TeacherExamBreadcrumbs role={props.role} />
          <ExamInfo
            pin={exam.pin}
            publish={publish}
            saving={saving}
            shareToken={exam.shareToken}
            status={exam.status}
            title={exam.title}
          />
          <TeacherExamToolbar
            query={query}
            onSearch={setQuery}
            onCreate={() => setIsQuestionModalOpen(true)}
          />
          <TeacherQuestionList questions={filterTeacherQuestions(exam.questions, query)} />
          <TeacherQuestionModal
            onClose={() => setIsQuestionModalOpen(false)}
            onCreate={addQuestion}
            open={isQuestionModalOpen}
            saving={saving}
          />
        </section>
      ) : null}
    </DashboardShell>
  );
}

function ExamInfo({ pin, publish, saving, shareToken, status, title }: {
  pin: string;
  publish: () => Promise<void>;
  saving: boolean;
  shareToken: string;
  status: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    const link = `${window.location.origin}/teacher-exams/${shareToken}`;
    void navigator.clipboard?.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <p className="text-sm font-black uppercase text-pink-400">Detail ujian</p>
      <h2 className="mt-2 text-3xl font-black">{title}</h2>
      <div className="mt-5 grid gap-3 text-sm font-bold text-muted">
        <p>PIN: <span className="text-foreground">{pin}</span></p>
        <p>Status: <span className="text-foreground">{status}</span></p>
        <p className="break-all">Token: {shareToken}</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-black transition ${copied ? "border-green-100 bg-green-50 text-green-600" : "border-violet-100 text-violet-500"}`} onClick={copyLink} type="button">
          <Copy className="h-4 w-4" />
          {copied ? "Link Tersalin" : "Salin Link"}
        </button>
        <button
          type="button"
          disabled={saving || status !== "DRAFT"}
          onClick={publish}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-black text-foreground disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          Publish
        </button>
      </div>
    </section>
  );
}

function Notice({ danger, text }: { danger?: boolean; text: string }) {
  return (
    <p className={`mb-5 rounded-xl border p-4 text-sm font-bold ${danger ? "border-red-100 bg-red-50 text-red-500" : "border-violet-100 bg-white/80 text-muted"}`}>
      {text}
    </p>
  );
}
