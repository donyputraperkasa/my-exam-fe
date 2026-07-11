import { DashboardShell } from "@/components/layout/dashboard-shell";
import { QuestionManager } from "@/features/admin/questions/question-manager";

export default function AdminQuestionsPage() {
  return (
    <DashboardShell
      eyebrow="Admin Panel"
      role="ADMIN"
      title="Soal dan Pembahasan"
    >
      <QuestionManager />
    </DashboardShell>
  );
}
