import { DashboardShell } from "@/components/layout/dashboard-shell";
import { OwnerFinanceReport } from "@/features/admin/finance/owner-finance-report";

export default function AdminFinancePage() {
  return (
    <DashboardShell eyebrow="Admin Panel" role="ADMIN" title="Laporan Keuangan">
      <OwnerFinanceReport />
    </DashboardShell>
  );
}
