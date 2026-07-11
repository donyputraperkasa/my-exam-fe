import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StudentPackageExam } from "@/features/student/packages/student-package-exam";

type StudentPackageDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StudentPackageDetailPage({
  params,
}: StudentPackageDetailPageProps) {
  const { id } = await params;

  return (
    <DashboardShell eyebrow="Ruang Belajar" role="STUDENT" title="Kerjakan Paket">
      <StudentPackageExam packageId={id} />
    </DashboardShell>
  );
}
