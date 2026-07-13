import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StudentRecap } from "@/features/student/recap/student-recap";

export default function StudentRecapPage() {
  return (
    <DashboardShell
      eyebrow="Ruang Belajar"
      role="STUDENT"
      title="Recap Nilai"
    >
      <StudentRecap />
    </DashboardShell>
  );
}
