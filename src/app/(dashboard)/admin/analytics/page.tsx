import { DashboardShell } from "@/components/layout/dashboard-shell";
import { OwnerAnalytics } from "@/features/admin/analytics/owner-analytics";

export default function AdminAnalyticsPage() {
  return (
    <DashboardShell eyebrow="Admin Panel" role="ADMIN" title="Analytics Bisnis">
      <OwnerAnalytics />
    </DashboardShell>
  );
}
