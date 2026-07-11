import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PackageManager } from "@/features/admin/packages/package-manager";

export default function AdminPackagesPage() {
  return (
    <DashboardShell eyebrow="Admin Panel" role="ADMIN" title="Paket Soal">
      <PackageManager />
    </DashboardShell>
  );
}
