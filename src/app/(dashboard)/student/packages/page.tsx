import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StudentPackageList } from "@/features/student/packages/student-package-list";

export default function StudentPackagesPage() {
  return (
    <DashboardShell eyebrow="Ruang Belajar" role="STUDENT" title="Paket Latihan">
      <StudentPackageList />
    </DashboardShell>
  );
}
