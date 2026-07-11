import { DashboardPlaceholder } from "@/components/layout/dashboard-placeholder";

export default function TeacherMonitorPage() {
  return (
    <DashboardPlaceholder
      description="Nanti guru bisa melihat siapa yang sudah masuk ujian, progress pengerjaan, dan aktivitas fokus siswa selama ujian berjalan."
      eyebrow="Teacher Mode"
      role="TEACHER"
      title="Pantau Siswa"
    />
  );
}
