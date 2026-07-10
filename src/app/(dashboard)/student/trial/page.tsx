import { DashboardShell } from "@/components/layout/dashboard-shell";
import { TrialExam } from "@/features/trial/trial-exam";

export default function StudentTrialPage() {
  return (
    <DashboardShell eyebrow="Paket Gratis" role="STUDENT" title="Coba Gratis">
      <TrialExam embedded />
    </DashboardShell>
  );
}
