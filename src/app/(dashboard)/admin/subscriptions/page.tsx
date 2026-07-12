import { DashboardShell } from "@/components/layout/dashboard-shell";
import { TeacherCreditManager } from "@/features/admin/subscriptions/teacher-credit-manager";

export default function AdminSubscriptionsPage() {
  return (
    <DashboardShell
      eyebrow="Admin Panel"
      role="ADMIN"
      title="Subscription & Kredit"
    >
      <TeacherCreditManager />
    </DashboardShell>
  );
}
