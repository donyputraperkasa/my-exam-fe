import { DashboardShell } from "@/components/layout/dashboard-shell";
import { SubjectManager } from "@/features/admin/subjects/subject-manager";

export default function AdminSubjectsPage() {
  return (
    <DashboardShell eyebrow="Admin Panel" role="ADMIN" title="Kelola Mapel">
      <SubjectManager />
    </DashboardShell>
  );
}
