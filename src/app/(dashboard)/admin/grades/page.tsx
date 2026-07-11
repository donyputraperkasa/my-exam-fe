import { DashboardShell } from "@/components/layout/dashboard-shell";
import { GradeManager } from "@/features/admin/grades/grade-manager";

export default function AdminGradesPage() {
  return (
    <DashboardShell eyebrow="Admin Panel" role="ADMIN" title="Kelola Jenjang">
      <GradeManager />
    </DashboardShell>
  );
}
