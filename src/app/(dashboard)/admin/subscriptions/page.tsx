import { DashboardShell } from "@/components/layout/dashboard-shell";
import { SubscriptionAdminWorkspace } from "@/features/admin/subscriptions/subscription-admin-workspace";

export default function AdminSubscriptionsPage() {
  return (
    <DashboardShell
      eyebrow="Admin Panel"
      role="ADMIN"
      title="Subscription & Kredit"
    >
      <SubscriptionAdminWorkspace />
    </DashboardShell>
  );
}
